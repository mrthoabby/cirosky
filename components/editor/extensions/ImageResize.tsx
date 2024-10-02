import Image from "@tiptap/extension-image";

interface ImageAttributes {
  src: string | null;
  alt: string | null;
  style: string;
  title: string | null;
  loading: string | null;
  srcset: string | null;
  sizes: string | null;
  crossorigin: string | null;
  usemap: string | null;
  ismap: string | null;
  width: number | null;
  height: number | null;
  referrerpolicy: string | null;
  longdesc: string | null;
  decoding: string | null;
  class: string | null;
  id: string | null;
  name: string | null;
  draggable: boolean;
  tabindex: string | null;
  "aria-label": string | null;
  "aria-labelledby": string | null;
  "aria-describedby": string | null;
}

const ImageResize = Image.extend({
  addAttributes(): Record<string, { default: any; parseHTML?: (element: HTMLElement) => string }> {
    return {
      src: { default: null },
      alt: { default: null },
      style: {
        default: "width: 100%; height: auto; cursor: pointer;",
        parseHTML: (element: HTMLElement) => {
          const width = element.getAttribute("width");
          return width ? `width: ${width}px; height: auto; cursor: pointer;` : `${element.style.cssText}`;
        },
      },
      title: { default: null },
      loading: { default: null },
      srcset: { default: null },
      sizes: { default: null },
      crossorigin: { default: null },
      usemap: { default: null },
      ismap: { default: null },
      width: { default: null },
      height: { default: null },
      referrerpolicy: { default: null },
      longdesc: { default: null },
      decoding: { default: null },
      class: { default: null },
      id: { default: null },
      name: { default: null },
      draggable: { default: true },
      tabindex: { default: null },
      "aria-label": { default: null },
      "aria-labelledby": { default: null },
      "aria-describedby": { default: null },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const {
        view,
        options: { editable },
      } = editor;
      const { style } = node.attrs as ImageAttributes;
      const $wrapper = document.createElement("div");
      const $container = document.createElement("div");
      const $img = document.createElement("img");
      const iconStyle = "width: 24px; height: 24px; cursor: pointer; box-sizing: border-box;";

      const dispatchNodeView = () => {
        if (typeof getPos === "function") {
          const newAttrs = { ...node.attrs, style: `${$img.style.cssText}` };
          view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
        }
      };

      const paintPositionController = () => {
        const $positionController = document.createElement("div");
        $positionController.setAttribute(
          "style",
          "position: absolute; top: -5%; left: 50%; width: 100px; height: 25px; z-index: 999; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; border: 2px solid #6C6C6C; cursor: pointer; transform: translate(-50%, -50%); display: flex; justify-content: space-between; align-items: center; padding: 0 10px; box-sizing: content-box;"
        );

        $positionController.appendChild(
          (() => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "12");
            svg.setAttribute("height", "12");
            svg.setAttribute("fill", "currentColor");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z");
            svg.appendChild(path);

            svg.addEventListener("click", () => {
              $img.setAttribute("style", `${$img.style.cssText} margin: 0 auto 0 0;`);
              dispatchNodeView();
            });

            return svg;
          })()
        );

        $positionController.appendChild(
          (() => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "12");
            svg.setAttribute("height", "12");
            svg.setAttribute("fill", "currentColor");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z");
            svg.appendChild(path);

            svg.addEventListener("click", () => {
              $img.setAttribute("style", `${$img.style.cssText} margin: 0 auto;`);
              dispatchNodeView();
            });

            return svg;
          })()
        );

        $positionController.appendChild(
          (() => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "12");
            svg.setAttribute("height", "12");
            svg.setAttribute("fill", "currentColor");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z");
            svg.appendChild(path);

            svg.addEventListener("click", () => {
              $img.setAttribute("style", `${$img.style.cssText} margin: 0 0 0 auto;`);
              dispatchNodeView();
            });

            return svg;
          })()
        );

        $container.appendChild($positionController);
      };

      $wrapper.setAttribute("style", "display: flex;");
      $wrapper.appendChild($container);
      $container.setAttribute("style", `${style}`);
      $container.appendChild($img);

      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          $img.setAttribute(key, value);
        }
      });

      if (!editable) return { dom: $img };

      const dotsPosition = [
        "top: -4px; left: -4px; cursor: nwse-resize;",
        "top: -4px; right: -4px; cursor: nesw-resize;",
        "bottom: -4px; left: -4px; cursor: nesw-resize;",
        "bottom: -4px; right: -4px; cursor: nwse-resize;",
      ];

      let isResizing = false;
      let startX: number, startWidth: number;

      $container.addEventListener("click", () => {
        if ($container.childElementCount > 3) {
          for (let i = 0; i < 5; i++) {
            $container.removeChild($container.lastChild!);
          }
        }
        paintPositionController();
        $container.setAttribute(
          "style",
          `position: relative; border: 1px dashed #6C6C6C; ${style} cursor: pointer; padding: 4px; box-sizing: content-box;`
        );

        Array.from({ length: 4 }, (_, index) => {
          const $dot = document.createElement("div");
          $dot.setAttribute("style", `position: absolute; width: 15px; height: 15px; background-color: #242424; ${dotsPosition[index]}`);
          $dot.addEventListener("mousedown", (e) => {
            e.preventDefault();
            isResizing = true;
            startX = e.clientX;
            startWidth = $container.offsetWidth;

            const onMouseMove = (e: MouseEvent) => {
              if (!isResizing) return;
              const deltaX = index % 2 === 0 ? -(e.clientX - startX) : e.clientX - startX;
              const newWidth = startWidth + deltaX;
              $container.style.width = `${newWidth}px`;
              $img.style.width = `${newWidth}px`;
            };

            const onMouseUp = () => {
              if (isResizing) {
                isResizing = false;
              }
              dispatchNodeView();
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          });
          $container.appendChild($dot);
        });
      });

      document.addEventListener("click", (e: MouseEvent) => {
        const $target = e.target as HTMLElement;
        const isClickInside = $container.contains($target) || $target.style.cssText === iconStyle;
        if (!isClickInside) {
          const containerStyle = $container.getAttribute("style");
          const newStyle = containerStyle?.replace("border: 1px dashed #6C6C6C;", "");
          $container.setAttribute("style", newStyle || "");
          if ($container.childElementCount > 3) {
            for (let i = 0; i < 5; i++) {
              $container.removeChild($container.lastChild!);
            }
          }
        }
      });

      return {
        dom: $wrapper,
      };
    };
  },
});

export { ImageResize, ImageResize as default };
