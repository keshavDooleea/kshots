import type { NextApiRequest, NextApiResponse } from "next";
import { FOLDERS_SCHEMA } from "../../../utils/lib/config";
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

  try {
    // check if folder already exists
    // ...

    // save folder
    console.log("saving new folder", folder.name, "for", userId);
    const saveQuery = `INSERT INTO ${FOLDERS_SCHEMA} (userId, name, color, createdAt) VALUES ($1, $2, $3, $4)`;
    await db.query(saveQuery, [userId, folder.name, folder.color, new Date()]);
  } catch (err) {
    console.log("saving folder error", err);
  }

  console.log(folder, userId);
};
