import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS file

const Suneditor = () => {
  const options = [["image", "video", "preview"]];

  async function uploadImageToImgBB(imageFile, apiKey) {
    console.log("image file", imageFile);
    const url = "https://api.imgbb.com/1/upload";

    // Prepare form data
    const formData = new FormData();
    formData.append("image", imageFile);

    // Set up request headers (ImgBB requires API key in the URL, not the headers)
    const requestUrl = `${url}?key=${apiKey}`;

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully uploaded
        return result;
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
    }
  }
  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    let response = {};
    console.log("files", files);
    console.log("info", info);
    uploadImageToImgBB(files[0], import.meta.env.VITE_SECRET_KEY).then(
      (img) => {
        console.log("image", img);
        response = {
          result: [
            {
              url: img?.data?.url,
              name: img?.data?.title || "Imagem",
              size: img?.data?.size,
              width: img?.data?.width,
              height: img?.data?.height,
            },
          ],
        };
        console.log("response", response);

        uploadHandler(response);
      }
    );
  };
  return (
    <SunEditor
      setOptions={{
        buttonList: options,
      }}
      height="300px"
      width="500px"
      on
      onImageUploadBefore={handleImageUploadBefore}
    />
  );
};

export default Suneditor;
