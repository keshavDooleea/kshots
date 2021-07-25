export interface IFolder {
  name: string;
  color: string;
}

type CODE = 200 | 500;

export interface IResponse {
  code: CODE;
  message: string;
}
