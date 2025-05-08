# Sun Editor Image Upload to AWS or Any Cloud Service

The Sun Editor is a lightweight and highly customizable WYSIWYG text editor that supports image uploads. By default, it stores images as base64 in your database, but you can configure it to upload images to cloud storage like AWS S3 instead.

## Installation

```bash
npm install suneditor-react
```

## Basic Setup

```jsx
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const MyEditor = () => {
  const options = [
    ["bold", "italic", "underline", "strike"],
    ["align", "list", "table", "link", "image"],
    ["font", "fontSize", "formatBlock", "blockquote"],
  ];

  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    let response = {};

    // Replace this with your actual cloud upload function
    uploadToAWS(files[0]).then((img) => {
      response = {
        result: [
          {
            url: img?.data?.url,
            name: img?.data?.title || "Image",
            size: img?.data?.size,
            width: img?.data?.width,
            height: img?.data?.height,
          },
        ],
      };
      uploadHandler(response);
    });
  };

  return (
    <SunEditor
      setOptions={{
        buttonList: options,
      }}
      onImageUploadBefore={handleImageUploadBefore}
    />
  );
};

export default MyEditor;
```

## Cloud Upload Function Example

```
const uploadToAWS = async (file) => {
  // 1. Get upload URL from your backend
  const response = await fetch('/api/get-upload-url', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      filetype: file.type
    })
  });

  const { url, fields } = await response.json();

  // 2. Prepare form data for S3 upload
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);

  // 3. Upload to S3
  const uploadResponse = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!uploadResponse.ok) {
    throw new Error('Upload failed');
  }

  // 4. Return the URL and metadata
  return {
    data: {
      url: `${url}/${fields.key}`,
      title: file.name,
      size: file.size,
      width: 0, // You might need to get these from image processing
      height: 0
    }
  };
};
```

## Response Format

```jsx
{
  result: [
    {
      url: "https://your-cloud-storage.com/image.jpg",
      name: "Image",
      size: 1024,
      width: 800,
      height: 600,
    },
  ];
}
```

## Key Points

- **The `onImageUploadBefore` hook intercepts image uploads**  
  This callback runs before the default image upload behavior, allowing you to implement custom upload logic

- **You must call `uploadHandler` with the proper response format**  
  The editor expects you to call `uploadHandler(response)` with the formatted response object containing the image details

- **The response must include the image URL and metadata**  
  Required format:
  ```javascript
  {
    result: [
      {
        url: "image-url",
        name: "filename",
        size: 1234,
        width: 800,
        height: 600,
      },
    ];
  }
  ```
