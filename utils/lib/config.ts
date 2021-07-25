export const isLocal = process.env.NODE_ENV !== "production";
export const serverURL = isLocal ? "http://localhost:3000/api/routes" : "";

// POSTGRESS
export const USERS_SCHEMA = "kshots.Users";
