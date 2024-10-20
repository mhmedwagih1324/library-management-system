import { config } from "../common/env-variables.js";
import { Sequelize } from "sequelize";

const { PG_LOCAL_CONNECTION_STRING } = config;

const sequelize = new Sequelize(PG_LOCAL_CONNECTION_STRING);

export default sequelize;
