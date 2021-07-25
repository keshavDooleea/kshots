import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { IDBFolder, INewSession, IResponse } from "../../../../../utils/lib/intefaces";
import { FOLDERS_SCHEMA } from "../../../../../utils/lib/config";

const db = require("../../../../../postgres/index");

export const config = {
  api: {
    externalResolver: true,
  },
};

const handleGET = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const { id } = req.query;

  try {
    // get folder with id
    console.log(`Getting folder with id ${id} for`, session.user?.name || session.user?.email || session.userId);
    const getQuery = `SELECT * FROM ${FOLDERS_SCHEMA} WHERE userid = $1 AND id = $2;`;
    let { rows } = await db.query(getQuery, [session.userId, id]);

    let response = {};

    if (rows[0]) {
      response = {
        code: 200,
        message: `Got folder with id ${id}`,
        data: rows[0],
      } as IResponse<IDBFolder[]>;
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

const handlePUT = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const folder = req.body as IDBFolder;

  try {
    // get folder with id
    console.log(`Updating folder with id ${folder.id} for`, session.user?.name || session.user?.email || session.userId);
    const putQuery = `UPDATE ${FOLDERS_SCHEMA} SET name = $1, color = $2, islock = $3 WHERE userid = $4 AND id = $5;`;
    await db.query(putQuery, [folder.name, folder.color, folder.islock, session.userId, folder.id]);

    const response = {
      code: 200,
      message: `Updated folder with ${folder.id} for user ${folder.userid}`,
    } as IResponse<null>;

    res.json(response);
  } catch (err) {
    console.log(`Error getting folder with id ${folder.id} for user ${folder.userid}`, err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error getting folder with id ${folder.id}`,
    };
    res.json(response);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = (await getSession({ req })) as INewSession;

  switch (req.method) {
    case "PUT":
      handlePUT(req, res, session);
      break;
    case "GET":
      handleGET(req, res, session);
      break;
  }
};
