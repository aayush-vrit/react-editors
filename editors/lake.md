# Lake JS Editor - Cloud File Upload Guide

[Official Documentaion](https://lakejs.org/reference/ "Visit Docs")
A modern WYSIWYG editor with seamless cloud storage integration for images and files.

## Features

- 📁 Upload images/files to AWS S3 or any cloud service
- ✨ Clean React integration
- 🛠️ Highly customizable toolbar
- ✅ Built-in spell checking
- 🌙 Dark mode support
- 🔒 Read-only mode capability
- 🔄 Real-time change tracking

## Installation

```bash
npm install lakelib
# or
yarn add lakelib
```

### Basic Usaage

```lake.jsx
import React, { useRef, useEffect } from 'react';
import { Editor, Toolbar } from 'lakelib';
import 'lakelib/lib/lake.css';

function MyEditor() {
  const toolbarRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const toolbar = new Toolbar({
      root: toolbarRef.current,
      items: ['bold', 'italic', 'image', 'file']
    });

    const editor = new Editor({
      root: editorRef.current,
      toolbar: toolbar
    });

    return () => editor.unmount();
  }, []);

  return (
    <div className="editor-container">
      <div ref={toolbarRef} />
      <div ref={editorRef} />
    </div>
  );
}

```

### Cloud Upload Configuration

```jsx
new Editor({
  // ... other config
  image: {
    requestMethod: "POST",
    requestAction: "https://your-s3-upload-endpoint",
    requestFieldName: "file",
    requestHeaders: {
      Authorization: "Bearer your-token",
    },
    requestTypes: ["image/jpeg", "image/png", "image/gif"],
    transformResponse: (response) => {
      return {
        url: response.location, // S3 URL
        alt: "Uploaded image",
      };
    },
  },
});
```

### File Upload (PDF, Docs, etc.)

```jsx
new Editor({
  // ... other config
  file: {
    requestMethod: "POST",
    requestAction: "https://your-file-upload-endpoint",
    requestFieldName: "file",
    requestTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    transformResponse: (response) => ({
      url: response.fileUrl,
      name: response.originalName,
    }),
  },
});
```

### Tool bar configuration

```jsx
const toolbarItems = [
  "undo",
  "redo",
  "|",
  "bold",
  "italic",
  "|",
  "image",
  "file",
  "code",
  "|",
  "darkMode",
];

new Toolbar({
  root: ".toolbar",
  items: toolbarItems,
});
```

### Event Handling

```jsx
editor.event.on("change", (html) => {
  console.log("Content changed:", html);
});

editor.event.on("imageUploadSuccess", (response) => {
  console.log("Image uploaded:", response.url);
});
```

## Advanced Configuration

| Option              | Type       | Description                |
| ------------------- | ---------- | -------------------------- |
| `requestAction`     | `string`   | Your upload endpoint URL   |
| `requestMethod`     | `string`   | HTTP method (`POST`/`PUT`) |
| `requestFieldName`  | `string`   | Form field name for file   |
| `requestTypes`      | `string[]` | Allowed MIME types         |
| `transformResponse` | `function` | Processes server response  |
