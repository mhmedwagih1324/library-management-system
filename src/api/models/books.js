import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import { ISBN_REGEX } from "../../common/constants.js";
import { BOOKS_TABLE, SHELF_LOCATIONS, TOP_SHELF } from "../constants/index.js";

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
    available_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    shelf_location: {
      type: DataTypes.ENUM,
      values: SHELF_LOCATIONS,
      defaultValue: TOP_SHELF,
    },
  },
  { tableName: BOOKS_TABLE }
);

export default Book;
