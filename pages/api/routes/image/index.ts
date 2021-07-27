import type { NextApiRequest, NextApiResponse } from "next";
import { IMAGES_SCHEMA, MAX_LIMIT } from "../../../../utils/lib/config";
import { IDBImage, INewSession, IResponse } from "../../../../utils/lib/intefaces";
import { getSession } from "next-auth/client";

const db = require("../../../../postgres");

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: MAX_LIMIT,
    },
  },
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse<any>, session: INewSession) => {
  try {
    const image = req.body as IDBImage;
    image.src = image.src.split(",")[1];

    // save image
    console.log("saving new image for", session.user?.name || session.user?.email || session.userId);
    const saveQuery = `INSERT INTO ${IMAGES_SCHEMA} (userId, folderid, src, createdat, title, description) VALUES ($1, $2, $3, $4, $5, $6)`;
    await db.query(saveQuery, [session.userId, image.folderid, `decode(${image.src}, 'base64')`, new Date(), image.title, image.description]);

    const response: IResponse<null> = {
      code: 200,
      message: "Saved image successfully",
    };

    res.json(response);
  } catch (err) {
    console.log("Saving image error", err);
    const response: IResponse<null> = {
      code: 500,
      message: "Sorry! Your screenshot could not be uploaded!",
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
  }
};
