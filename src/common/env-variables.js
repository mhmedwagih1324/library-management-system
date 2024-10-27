import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server variables
  PORT: process.env.PORT,

  // Database Connection Strings:
  // should be commented when you need to run with docker-compose
  // PG_LOCAL_CONNECTION_STRING: process.env.PG_LOCAL_CONNECTION_STRING,

  // should be commented when you need to run with localhost (or an already running container)
  PG_LOCAL_CONNECTION_STRING: process.env.PG_DOCKER_CONNECTION_STRING,

  // testDB connection string
  PG_TEST_CONNECTION_STRING: process.env.PG_TEST_CONNECTION_STRING,

  // Variables used by docker-compose to connect to DB
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,

  JWT_SECRET: process.env.JWT_SECRET,
};
