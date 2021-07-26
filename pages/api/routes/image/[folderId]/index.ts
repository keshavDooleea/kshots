import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { IMAGES_SCHEMA } from "../../../../../utils/lib/config";
import { IDBImage, INewSession, IResponse } from "../../../../../utils/lib/intefaces";

const db = require("../../../../../postgres");

export const config = {
  api: {
    externalResolver: true,
  },
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const { folderId } = req.query;

  try {
    console.log("Getting all images for", session.user?.name || session.user?.email || session.userId);
    const source = `convert_from(decode(encode(src, 'base64'), 'base64'), 'UTF8')`;
    const getQuery = `SELECT id, userid, folderid, ${source} as src, createdat, title, description FROM ${IMAGES_SCHEMA} WHERE userid = $1 AND folderid = $2;`;
    let { rows } = await db.query(getQuery, [session.userId, folderId]);

    const response: IResponse<IDBImage[]> = {
      code: 200,
      message: `Got all images for folder id ${folderId}`,
      data: rows,
    };

    res.json(response);
  } catch (err) {
    console.log("Getting all images error", err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error getting all images for folder ${folderId}`,
    };
    res.json(response);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = (await getSession({ req })) as INewSession;

  switch (req.method) {
    case "GET":
      handleGET(req, res, session);
      break;
  }
};
