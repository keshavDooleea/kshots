import { Session } from "next-auth";

export interface IFolder {
  name: string;
  color: string;
  islock: boolean;
}

// POSTGRES variables must be lowercase
export interface IDBFolder {
  id: number;
  userid: number;
  createdat: Date;

  name: string;
  color: string;
  islock: boolean;
}

/**
 * 200: SUCCESS
 * 404: NOT FOUND
 * 500: SERVER ERROR
 */
type CODE = 200 | 404 | 500;

export interface IResponse<T> {
  code: CODE;
  message: string;
  data?: T;
}

export interface INewSession extends Session {
  userId: number;
}
