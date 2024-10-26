import { ADMIN, ALL_ROLES } from "../constants/index.js";

const BooksAuthorization = {
  listBooks: {
    roles: ALL_ROLES,
  },

  addBook: {
    roles: [ADMIN],
  },

  updateBook: {
    roles: [ADMIN],
  },

  deleteBook: {
    roles: [ADMIN],
  },
};

export default BooksAuthorization;
