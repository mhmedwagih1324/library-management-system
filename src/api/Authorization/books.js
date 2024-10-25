import { ADMIN } from "../constants/index.js";

const BooksAuthorization = {
  addBook: {
    roles: [ADMIN],
  },
  updateBook: {
    roles: [ADMIN],
  },
};

export default BooksAuthorization;
