import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { IDBImage, INewSession, IResponse } from "../../../../../../../utils/lib/intefaces";
import { FOLDERS_SCHEMA, IMAGES_SCHEMA } from "../../../../../../../utils/lib/config";

const db = require("../../../../../../../postgres");

export const config = {
  api: {
    externalResolver: true,
  },
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const { id: folderid, imageid } = req.query;

  try {
    // get folder with id
    console.log(`Getting image #3 for folder with id ${folderid} for`, session.user?.name || session.user?.email || session.userId);
    const getQuery = `SELECT * FROM ${IMAGES_SCHEMA} WHERE userid = $1 AND folderid = $2 AND id = $3;`;
    let { rows } = await db.query(getQuery, [session.userId, folderid, imageid]);

    let response = {};

    if (rows[0]) {
      response = {
        code: 200,
        message: `Got image ${imageid} for folder with id ${folderid}`,
        data: rows[0],
      } as IResponse<IDBImage>;
    } else {
      response = {
        code: 404,
        message: `Image with id ${imageid} for Folder with id ${folderid} does not exist`,
      } as IResponse<null>;
    }

    res.json(response);
  } catch (err) {
    console.log(`Error getting image with id ${imageid} for folder with id ${folderid}`, err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error getting image with id ${imageid} for folder with id ${folderid}`,
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
