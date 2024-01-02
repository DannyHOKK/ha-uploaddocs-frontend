import React from "react";

const blobToUrl = (data) => {
  const binaryString = atob(data);

  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  return blob;
};

export default blobToUrl;
