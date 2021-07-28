const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  async query(text, params) {
    const start = Date.now();

    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;

      // console.log("executed query", { text, duration, rows: res.rowCount });
      return res;
    } catch (error) {
      console.log("error in query", { text });
      throw error;
    }
  },
};
