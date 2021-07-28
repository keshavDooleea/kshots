import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { IDBImage, INewSession, IResponse } from "../../../../../../../utils/lib/intefaces";
import { DECODE_IMG, IMAGES_SCHEMA, IMG_SRC } from "../../../../../../../utils/lib/config";

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
    const getQuery = `SELECT id, userid, folderid, ${IMG_SRC} as src, createdat, title, description FROM ${IMAGES_SCHEMA} WHERE userid = $1 AND folderid = $2 AND id = $3;`;
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

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const { id, imageid } = req.query;

  try {
    console.log(`Deleting image with id ${imageid} folder with id ${id} for`, session.user?.name || session.user?.email || session.userId);
    const deleteImageQuery = `DELETE FROM ${IMAGES_SCHEMA} WHERE userid = $1 AND folderid = $2 AND id = $3;`;
    await db.query(deleteImageQuery, [session.userId, id, imageid]);

    const response = {
      code: 200,
      message: `Deleted image with ${imageid} in folder with id ${id} for user ${session.userid}`,
    } as IResponse<null>;

    res.json(response);
  } catch (err) {
    console.log(`Error deleting image with ${imageid} in folder with id ${id} for user ${session.userid}`, err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error deleing image with ${imageid} in folder with id ${id}`,
    };
    res.json(response);
  }
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  const image = req.body as IDBImage;
  const { id: folderid, imageid } = req.query;

  try {
    console.log(`Updating image with id ${imageid} for folder with id ${folderid} for`, session.user?.name || session.user?.email || session.userId);
    const postQuery = `UPDATE ${IMAGES_SCHEMA} SET src = $1, title = $2, description = $3 WHERE userid = $4 AND folderid = $5 AND id = $6;`;
    await db.query(postQuery, [DECODE_IMG(image.src), image.title, image.description, session.userId, folderid, imageid]);

    const response = {
      code: 200,
      message: `Updated image with id ${imageid} for folder with ${folderid} for user ${session.userid}`,
    } as IResponse<null>;

    res.json(response);
  } catch (err) {
    console.log(`Error updating image with id ${imageid} for folder with id ${folderid} for user ${session.userid}`, err);
    const response: IResponse<null> = {
      code: 500,
      message: `Error updating image with id ${imageid} for folder with id ${folderid}`,
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
    case "DELETE":
      handleDELETE(req, res, session);
      break;
    case "PUT":
      handlePUT(req, res, session);
      break;
  }
};
