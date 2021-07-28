import NextAuth, { Account, NextAuthOptions, Profile, User } from "next-auth";
import Providers from "next-auth/providers";
import type { NextApiRequest, NextApiResponse } from "next";
import { isLocal, USERS_SCHEMA } from "../../../utils/lib/config";

const db = require("../../../postgres");

const userHandler = async (user: User, account: Account, profile: Profile) => {
  try {
    // check if user exists
    const getUserQuery = `SELECT * FROM ${USERS_SCHEMA} WHERE id = $1;`;
    let { rows: getUserRow } = await db.query(getUserQuery, [user.id]);

    // if user exists in table, then should not save
    if (getUserRow[0]) return;

    // save new user
    console.log("Saving new user", user);
    const saveUserQuery = `INSERT INTO ${USERS_SCHEMA} (id, email, name, createdAt) VALUES ($1, $2, $3, $4)`;
    await db.query(saveUserQuery, [user.id, user.email, user.name, new Date()]);
  } catch (err) {
    console.log("Error saving in DB", err);
  }
};

const options: NextAuthOptions = {
  providers: [
    Providers.GitHub({
      clientId: isLocal ? process.env.GITHUB_DEV_ID : process.env.GITHUB_PROD_ID,
      clientSecret: isLocal ? process.env.GITHUB_DEV_SECRET : process.env.GITHUB_PROD_SECRET,
      scope: "read:user",
    }),
  ],

  callbacks: {
    async signIn(user: User, account: Account, profile: Profile) {
      userHandler(user, account, profile);

      return true;
    },
    session: async (session, user) => {
      session.userId = user.sub || user.id;
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
