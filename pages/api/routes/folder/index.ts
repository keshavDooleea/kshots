import type { NextApiRequest, NextApiResponse } from "next";
import { FOLDERS_SCHEMA } from "../../../../utils/lib/config";
import { IDBFolder, IFolder, INewSession, IResponse } from "../../../../utils/lib/intefaces";
import { getSession } from "next-auth/client";

const db = require("../../../../postgres");

export const config = {
  api: {
    externalResolver: true,
  },
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const folder = req.body as IFolder;

  try {
    // check if folder already exists
    // ...

    // save folder
    console.log("saving new folder", folder.name, "for", session.user?.name || session.user?.email || session.userId);
    const saveQuery = `INSERT INTO ${FOLDERS_SCHEMA} (userId, name, color, islock, createdAt) VALUES ($1, $2, $3, $4, $5)`;
    await db.query(saveQuery, [session.userId, folder.name, folder.color, folder.islock, new Date()]);

    const response: IResponse<null> = {
      code: 200,
      message: "Saved folder successfully",
    };

    res.json(response);
  } catch (err) {
    console.log("saving folder error", err);
    const response: IResponse<null> = {
      code: 500,
      message: "Error saving folder",
    };
    res.json(response);
  }
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  try {
    // check if folder already exists
    // ...

    // save folder
    console.log("Getting all folders for", session.user?.name || session.user?.email || session.userId);
    const getQuery = `SELECT * FROM ${FOLDERS_SCHEMA} WHERE userId = $1;`;
    let { rows } = await db.query(getQuery, [session.userId]);

    const response: IResponse<IDBFolder[]> = {
      code: 200,
      message: "Got all folders",
      data: rows,
    };

    res.json(response);
  } catch (err) {
    console.log("Getting all folders error", err);
    const response: IResponse<null> = {
      code: 500,
      message: "Error getting all folders",
    };
    res.json(response);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = (await getSession({ req })) as INewSession;

  switch (req.method) {
    case "POST":
      handlePOST(req, res, session);
      break;
    case "GET":
      handleGET(req, res, session);
      break;
  }
};
