import Book from "../models/books.js";

const BooksServices = {
  /**
   * Lists books in the library
   *
   * @param {Object} args
   * @param {Object} args
   *
   */
  async listBooks() {
    const books = await Book.findAll();
    return books;
  },
};

export default BooksServices;
