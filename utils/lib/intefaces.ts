export interface IFolder {
  name: string;
  color: string;
  isLock: boolean;
}

export interface IDBFolder {
  id: number;
  userId: number;
  createdat: Date;
  name: string;
  color: string;
  isLock: boolean;
}

type CODE = 200 | 500;

export interface IResponse<T> {
  code: CODE;
  message: string;
  data?: T;
}
