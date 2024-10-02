import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

interface ImagePasteOptions {
  onError: (error: Error) => void;
}

type FileReaderResult = string | ArrayBuffer | null;

export const ImagePaste = Extension.create<ImagePasteOptions>({
  name: "imagePaste",

  addOptions() {
    return {
      onError: (error: Error) => console.error(error),
    };
  },

  addProseMirrorPlugins() {
    const plugin = new Plugin({
      key: new PluginKey("imagePaste"),
      props: {
        handlePaste: (view: EditorView, event: ClipboardEvent): boolean => {
          const items = event.clipboardData?.items;
          if (!items) return false;

          const imageItem = Array.from(items).find((item) => item.type.startsWith("image/"));
          if (!imageItem) return false;

          event.preventDefault();

          const file = imageItem.getAsFile();
          if (!file) {
            this.options.onError(new Error("No se pudo obtener el archivo de imagen"));
            return true;
          }

          const reader = new FileReader();

          reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
            const result = readerEvent.target?.result as FileReaderResult;
            if (typeof result !== "string") {
              this.options.onError(new Error("El resultado de FileReader no es una cadena"));
              return;
            }

            const { schema } = view.state;
            const imageNode = schema.nodes.image.create({ src: result });

            const transaction = view.state.tr.replaceSelectionWith(imageNode);
            view.dispatch(transaction);
          };

          reader.onerror = () => {
            this.options.onError(new Error("Error al leer el archivo de imagen"));
          };

          reader.readAsDataURL(file);

          return true;
        },
      },
    });

    return [plugin];
  },
});
