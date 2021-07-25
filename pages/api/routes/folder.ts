import type { NextApiRequest, NextApiResponse } from "next";
import { FOLDERS_SCHEMA } from "../../../utils/lib/config";
import { IFolder, IResponse } from "../../../utils/lib/intefaces";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

const db = require("../../../postgres");

interface INewSession extends Session {
  userId: number;
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const folder = req.body as IFolder;

  try {
    // check if folder already exists
    // ...

    // save folder
    console.log("saving new folder", folder.name, "for", session.user?.name || session.user?.email || session.userId);
    const saveQuery = `INSERT INTO ${FOLDERS_SCHEMA} (userId, name, color, createdAt) VALUES ($1, $2, $3, $4)`;
    await db.query(saveQuery, [session.userId, folder.name, folder.color, new Date()]);

    const response: IResponse = {
      code: 200,
      message: "Saved folder successfully",
    };

    res.json(response);
  } catch (err) {
    console.log("saving folder error", err);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = (await getSession({ req })) as INewSession;

  switch (req.method) {
    case "POST":
      handlePOST(req, res, session);
      break;
  }
};
