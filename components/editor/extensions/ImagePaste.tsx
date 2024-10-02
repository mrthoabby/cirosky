import { mergeAttributes, Node } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

export interface ImagePasteOptions {
  onError: (error: Error) => void;
}

export const ExtendedImagePaste = Node.create<ImageOptions & ImagePasteOptions>({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      onError: (error: Error) => console.error(error),
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addProseMirrorPlugins() {
    const imagePastePlugin = new Plugin({
      key: new PluginKey("imagePaste"),
      props: {
        handleDOMEvents: {
          paste: (view, event) => {
            const items = Array.from(event.clipboardData?.items || []);
            const imageItems = items.filter((item) => item.type.startsWith("image/"));

            if (imageItems.length === 0) {
              return false;
            }

            event.preventDefault();

            imageItems.forEach((imageItem) => {
              const file = imageItem.getAsFile();
              if (!file) {
                this.options.onError(new Error("No se pudo obtener el archivo de imagen"));
                return;
              }

              const reader = new FileReader();
              reader.onload = (readerEvent) => {
                const result = readerEvent.target?.result;
                if (typeof result !== "string") {
                  this.options.onError(new Error("El resultado de FileReader no es una cadena"));
                  return;
                }

                if (!this.options.allowBase64 && result.startsWith("data:")) {
                  this.options.onError(new Error("Las imágenes base64 no están permitidas"));
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
            });

            return true;
          },
        },
      },
    });

    return [imagePastePlugin];
  },
});
