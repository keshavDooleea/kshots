import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log("in");
  res.json("in");
};
