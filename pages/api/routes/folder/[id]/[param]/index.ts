import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { IDBFolder, INewSession, IResponse } from "../../../../../../utils/lib/intefaces";
import { FOLDERS_SCHEMA } from "../../../../../../utils/lib/config";

const db = require("../../../../../../postgres");

export const config = {
  api: {
    externalResolver: true,
  },
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const { id, param } = req.query;

  try {
    // get folder color with id
    console.log(`Getting folder ${param}¨ with id ${id} for`, session.user?.name || session.user?.email || session.userId, "for /upload");
    const getQuery = `SELECT ${param} FROM ${FOLDERS_SCHEMA} WHERE userid = $1 AND id = $2;`;
    let { rows } = await db.query(getQuery, [session.userId, id]);

    let response = {};

    if (rows[0]) {
      response = {
        code: 200,
        message: `Got folder ${param} with id ${id}`,
        data: rows[0],
      } as IResponse<any>;
    } else {
      response = {
        code: 404,
        message: `Folder with ${id} does not exist`,
      } as IResponse<null>;
    }
    res.json(response);
  } catch (err) {
    console.log(`Error getting folder with id ${id}`, err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error getting folder with id ${id}`,
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
