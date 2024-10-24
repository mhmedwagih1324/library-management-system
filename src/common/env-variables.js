import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server variables
  PORT: process.env.PORT,

  // Database variables
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT,
  PG_LOCAL_CONNECTION_STRING: process.env.PG_LOCAL_CONNECTION_STRING,
  PG_TEST_CONNECTION_STRING: process.env.PG_TEST_CONNECTION_STRING,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,

  JWT_SECRET: process.env.JWT_SECRET,
};
