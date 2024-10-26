import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
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
