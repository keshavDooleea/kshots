export const isLocal = process.env.NODE_ENV !== "production";
export const serverURL = isLocal ? "http://localhost:3000/api/routes" : "";

// FOLDER
export const COLORS = ["rosybrown", "#fbae3c", "#a5a58d", "#669bbc", "#177e89", "#3b3e46"];

// POSTGRESS
export const USERS_SCHEMA = "kshots.Users";
export const FOLDERS_SCHEMA = "kshots.Folders";
export const IMAGES_SCHEMA = "kshots.Images";
export const IMG_SRC = `convert_from(decode(encode(src, 'base64'), 'base64'), 'UTF8')`;

export const isOnlyNumber = (id: string): boolean => {
  return !(id as string).match(/^[0-9]+$/);
};

export const getBase64 = (file: File): Promise<ArrayBuffer | string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getDate = (date: Date) => new Date(date).toDateString();

export const getDecodedBase64 = (src: string): string => {
  // format is decode(realBase64String, 'base64')

  const startIndex = src.indexOf("(") + 1;
  const endIndex = src.indexOf(",");

  const encoded = src.substring(startIndex, endIndex);
  const base64 = `data:image/png;base64,${encoded}`;

  return base64;
};
