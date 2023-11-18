// import React from "react";
// import * as ImageManipulator from "expo-image-manipulator";
// import * as Resizer from "react-image-file-resizer";
// import * as FileSystem from "expo-file-system";

// export const ConvertToJpgAndCompress = async (imageUri, width, height) => {
//  const editedImage =  Resizer.imageFileResizer(
//     imageUri, // Is the file of the image which will resized.
//     width, // Is the maxWidth of the resized new image.
//     height, // Is the maxHeight of the resized new image.
//     compressFormat, // Is the compressFormat of the resized new image.
//     quality, // Is the quality of the resized new image.
//     rotation, // Is the degree of clockwise rotation to apply to uploaded image.
//     responseUriFunc, // Is the callBack function of the resized new image URI.
//     outputType, // Is the output type of the resized new image.
//     minWidth, // Is the minWidth of the resized new image.
//     minHeight // Is the minHeight of the resized new image.
//   );
//   try {
//     const manipulatedImage = await ImageManipulator.manipulateAsync(
//       imageUri,
//       [{ resize: { width: width, height: height } }],
//       { compress: 1, format: "jpeg", base64: false }
//     );
    
//     // Generate a unique file name for the converted image
//     const jpgFileName = `converted_${Date.now()}.jpg`;

//     // Get the local file system URI for the converted image
//     const jpgUri = FileSystem.cacheDirectory + jpgFileName;

//     // Save the converted image to the local file system
//     await FileSystem.moveAsync({
//       from: manipulatedImage.uri,
//       to: jpgUri,
//     });

//     // Return the URI of the converted JPG image
//     return jpgUri;
//   } catch (error) {
//     console.error("Error converting image:", error);
//     throw error;
//   }
// };
