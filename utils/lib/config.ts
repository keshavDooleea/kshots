export const isLocal = process.env.NODE_ENV !== "production";
export const serverURL = isLocal ? "http://localhost:3000/api/routes" : "";

// FOLDER
export const COLORS = ["rosybrown", "#fbae3c", "#a5a58d", "#669bbc", "#177e89"];

// POSTGRESS
export const USERS_SCHEMA = "kshots.Users";
export const FOLDERS_SCHEMA = "kshots.Folders";
