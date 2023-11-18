
import React from "react";
import * as Resizer from "react-image-file-resizer";


export function toCapitalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const ConvertToJpgAndCompress = async (imageUri, width, height) => {
  
  try {
    const resizeFile = new Promise((resolve) => {
      Resizer.imageFileResizer(
        imageUri,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

    // Generate a unique file name for the converted image
    const jpgFileName = `converted_${Date.now()}.jpg`;

    // Get the local file system URI for the converted image
    // const jpgUri = FileSystem.cacheDirectory + jpgFileName;

    // Save the converted image to the local file system
    // await FileSystem.moveAsync({
    //   from: resizeFile.uri,
    //   to: jpgUri,
    // });

    // // Return the URI of the converted JPG image
    // return jpgUri;
  } catch (error) {
    console.error("Error converting image:", error);
    throw error;
  }
};
