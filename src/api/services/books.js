import Book from "../models/books.js";

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
    return books;
  },
};

export default BooksServices;
