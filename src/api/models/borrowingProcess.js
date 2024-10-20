import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import { BOOKS_TABLE, USERS_TABLE } from "../constants/index.js";
import {
  BORROWING_PROCESS_TABLE,
  BORROWING_STATUS_BORROWED,
  BORROWING_STATUSES,
} from "../constants/borrowingProcess.js";

const BorrowingProcess = sequelize.define(
  "borrowingProcess",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BOOKS_TABLE,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    borrowerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: USERS_TABLE,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM,
      values: BORROWING_STATUSES,
      defaultValue: BORROWING_STATUS_BORROWED,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: BORROWING_PROCESS_TABLE }
);

export default BorrowingProcess;
