"use client";

import { PageFactory } from "@/domain/page/PageFactory";
import { SectionIndexDatabaseManager } from "@/domain/section/SectionIndexDatabaseManager";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import Mention from "@tiptap/extension-mention";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import javascript from "highlight.js/lib/languages/javascript";
import { createLowlight } from "lowlight";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PreviewButton from "../components/PreviewButton/PreviewButton";
import SelectorMenu from "../components/SelectorMenu/SelectorMenu";
import styles from "./css/default.module.css";

const lowlight = createLowlight({ javascript });

//TODO: This component will be refactored at the end of the project
export default function PageEditor(): JSX.Element {
  const [sectionIndexDb, setSectionIndexDb] = useState<SectionIndexDatabaseManager | undefined>(undefined);
  const { sectionId, pageId } = useParams<{ sectionId: string; pageId: string }>();
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Typography,
      Text,
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript", languageClassPrefix: "language-" }),
      HorizontalRule,
      Heading,
      Image,
      OrderedList,
      Mention,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube,
      ListKeymap,
      Placeholder.configure({
        placeholder: "Escribe algo...",
      }),
      Bold,
      Italic,
      Blockquote,
    ],
    immediatelyRender: false,
    autofocus: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sectionIndexDb) {
        sectionIndexDb
          .getPage(pageId)
          .then((previousContent) => {
            if (!previousContent) {
              //TODO Get content from API
              return;
            }
            editor
              ?.chain()
              .setContent(previousContent?.content || "")
              .run();
          })
          .catch((error) => {
            console.error("Error loading previous content: ", error);
          });
      } else {
        getInstance();
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typeof window !== "undefined") {
        if (event.metaKey && event.key === "s" && sectionIndexDb && editor?.isEditable) {
          event.preventDefault();
          sectionIndexDb
            .savePage(PageFactory.createContentPage(pageId, editor?.getHTML() || ""))
            .then(() => {
              console.log("Page saved successfully");
            })
            .catch((error) => {
              console.error("Error saving page: ", error);
            });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sectionIndexDb]);

  async function getInstance() {
    const dbManager = await SectionIndexDatabaseManager.getInstance(sectionId);

    setSectionIndexDb(dbManager);
  }

  if (!editor) {
    return <p>[DEPELOPING... EDITOR NO CARGÓ]</p>;
  }
  return (
    <main>
      <PreviewButton editor={editor} />
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        -{" "}
        {(() => {
          //TODO: Add logic for to select the kind of element to add
          return null;
        })()}
      </FloatingMenu>
      <SelectorMenu editor={editor} />
      <EditorContent editor={editor} />
    </main>
  );
}
