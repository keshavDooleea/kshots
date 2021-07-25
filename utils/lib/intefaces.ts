export interface IFolder {
  name: string;
  color: string;
}

export interface IDBFolder {
  id: number;
  userId: number;
  createdat: Date;
  name: string;
  color: string;
}

type CODE = 200 | 500;

export interface IResponse<T> {
  code: CODE;
  message: string;
  data?: T;
}
