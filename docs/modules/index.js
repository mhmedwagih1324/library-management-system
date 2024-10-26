import BooksDocs from "./books/index.js";
import UsersDocs from "./users/index.js";
import BorrowingProcessesDocs from "./borrowing-processes/index.js";

export const endpoints = {
  ...BooksDocs,
  ...UsersDocs,
  ...BorrowingProcessesDocs,
};
