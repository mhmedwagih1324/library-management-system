import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import { ISBN_REGEX } from "../../common/constants.js";
import { BOOKS_TABLE, SHELF_LOCATIONS, TOP_SHELF } from "../constants/index.js";
import getTSValue from "../../common/utils/getTSValue.js";
import Promise from "bluebird";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(17),
      unique: true,
      validate: {
        is: ISBN_REGEX,
      },
    },
    availableQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    shelfLocation: {
      type: DataTypes.ENUM,
      values: SHELF_LOCATIONS,
      defaultValue: TOP_SHELF,
    },
    TSValue: {
      type: DataTypes.TSVECTOR,
    },
  },
  {
    tableName: BOOKS_TABLE,
    hooks: {
      beforeBulkCreate: async function (books) {
        await Promise.map(books, getTSValue);
      },

      beforeCreate: getTSValue,

      beforeUpdate: async function (books) {
        await Promise.map(books, getTSValue);
      },
    },
    indexes: [
      {
        name: "title-author-isbn",
        type: "fulltext",
        fields: ["TSValue"],
        using: "GIN",
        concurrently: true,
      },
    ],
  }
);

export default Book;
