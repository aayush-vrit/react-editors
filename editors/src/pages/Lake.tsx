import "lakelib/lib/lake.css";
import { Editor, Toolbar } from "lakelib";
import { useRef, useEffect } from "react";

export default function Lake({ defaultValue = "hello" }) {
  const toolbarRef = useRef(null);
  const contentRef = useRef(null);

  // Define the toolbar items you want to use
  const toolbarItems = [
    "undo",
    "redo",
    "|",
    "heading",
    "code",
    "image",
    "file", // File button for uploading PDFs, Docs, etc.
    "video",
    "bold",
  ];

  useEffect(() => {
    const toolbar = new Toolbar({
      root: toolbarRef.current,
      items: toolbarItems,
    });

    const imageUrl = "https://api.imgbb.com/1/upload";
    const apiKey = import.meta.env.VITE_SECRET_KEY; // Make sure you have the secret key correctly stored

    const editor = new Editor({
      root: contentRef.current,
      toolbar,
      value: defaultValue,
      image: {
        requestMethod: "POST",
        requestFieldName: "image",
        requestAction: `${imageUrl}?key=${apiKey}`,
        requestTypes: ["image/gif", "image/jpeg", "image/png"], // Allowed image types
        transformResponse: (body: any) => {
          console.log("body", body);
          return {
            url: body.data.url,
          };
        },
      },
      file: {
        requestMethod: "POST",
        requestFieldName: "image",
        requestAction: `${imageUrl}?key=${apiKey}`, // Define the server endpoint for files
        requestTypes: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ], // Supported file types
      },
    });

    // Initialize the editor
    editor.render();

    // Log value changes
    editor.event.on("change", (value) => {
      console.log(value);
    });

    return () => editor.unmount();
  }, []);

  return (
    <div className="my-editor">
      <div className="my-toolbar" ref={toolbarRef}></div>
      <div className="my-content" ref={contentRef}></div>
    </div>
  );
}
