export const isLocal = process.env.NODE_ENV !== "production";
export const serverURL = isLocal ? "http://localhost:3000/api/routes" : "https://kshots.vercel.app/api/routes";

export const MAX_LIMIT = "5mb";

// FOLDER
export const COLORS = ["rosybrown", "#fbae3c", "#a5a58d", "#669bbc", "#177e89", "#3b3e46"];

// POSTGRESS
const DB_NAME = isLocal ? "kshots" : process.env.HEROKU_DB_NAME;
export const USERS_SCHEMA = `${process.env.HEROKU_DB_NAME}.Users`;
export const FOLDERS_SCHEMA = `${process.env.HEROKU_DB_NAME}.Folders`;
export const IMAGES_SCHEMA = `${process.env.HEROKU_DB_NAME}.Images`;
export const IMG_SRC = `convert_from(decode(encode(src, 'base64'), 'base64'), 'UTF8')`;
export const DECODE_IMG = (src: string) => `decode(${src.split(",")[1]}, 'base64')`; // base64 encoding

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

export const generateRandomChar = (numberOfChar: number) => Math.random().toString(36).substring(numberOfChar);
