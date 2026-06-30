import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = "dekvbrhxu";

const UPLOAD_PRESET = "socialmilk_unsigned";

export async function pickAndUploadImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (result.canceled) return null;

  const image = result.assets[0];

  const data = new FormData();

  data.append("file", {
    uri: image.uri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);

  data.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: data,
    },
  );

  const json = await response.json();

  console.log("CLOUDINARY STATUS:", response.status);

  console.log("CLOUDINARY RESPONSE:", json);

  return json.secure_url;
}
