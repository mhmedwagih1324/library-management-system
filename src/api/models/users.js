import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import { EMAIL_REGEX } from "../../common/constants.js";
import { ALL_ROLES, BORROWER, USERS_TABLE } from "../constants/users.js";
import Promise from "bluebird";
import hashPassword from "../../common/utils/hashPasswords.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: EMAIL_REGEX,
      },
    },
    registerDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM,
      values: ALL_ROLES,
      defaultValue: BORROWER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: USERS_TABLE,
    hooks: {
      beforeBulkCreate: async function (users) {
        await Promise.map(users, hashPassword);
      },

      beforeCreate: hashPassword,

      beforeUpdate: async function (users) {
        await Promise.map(users, hashPassword);
      },
    },
  }
);

export default User;
