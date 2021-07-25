import { serverURL } from "./config";
import { IResponse } from "./intefaces";

export const POST = async (endpoint: string, data: any) => {
  const res = await fetch(`${serverURL}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return (await res.json()) as IResponse;
};

export const GET = async (endpoint: string) => {
  const res = await fetch(`${serverURL}/${endpoint}`);
  return (await res.json()) as IResponse;
};

export const DELETE = async (endpoint: string) => {
  const res = await fetch(`${serverURL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  return (await res.json()) as IResponse;
};

export const PUT = async (endpoint: string, data: any) => {
  const res = await fetch(`${serverURL}/${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return (await res.json()) as IResponse;
};
