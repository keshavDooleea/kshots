import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiRequest, NextApiResponse } from "next";

const options: NextAuthOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
