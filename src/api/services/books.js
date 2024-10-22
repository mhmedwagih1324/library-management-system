import _ from "lodash";
import APIError from "../../common/middleware/api-error.js";
import Book from "../models/books.js";
import httpStatus from "http-status";

const { NOT_FOUND } = httpStatus;

const BooksServices = {
  /**
   * Lists books in the library
   *
   * @param {Object} args
   * @param {Object} args
   *
   */
  async listBooks({ limit }) {
    const books = await Book.findAll({ limit });
    if (_.isNil(books)) {
      throw new APIError({
        message: "hi this is me",
        status: NOT_FOUND,
      });
    }
    return books;
  },
};

export default BooksServices;
