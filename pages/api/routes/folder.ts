import type { NextApiRequest, NextApiResponse } from "next";
import { USERS_SCHEMA } from "../../../utils/lib/config";
import { IFolder } from "../../../utils/lib/intefaces";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

const db = require("../../../postgres");

interface newSession extends Session {
  userId: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { userId } = (await getSession({ req })) as newSession;
  const folder = req.body as IFolder;

  console.log(folder, userId);
};
