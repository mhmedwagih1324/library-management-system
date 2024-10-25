import _ from "lodash";
import APIError from "../../common/lib/api-error.js";
import Book from "../models/books.js";
import httpStatus from "http-status";

const { NOT_FOUND, CONFLICT } = httpStatus;

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

  /**
   * Adds new book in the library
   *
   * @param {Object} args
   * @prop {String} args.title
   * @prop {String} args.author
   * @prop {String} args.isbn
   * @prop {Number} args.availableQuantity
   * @prop {String} args.shelfLocation
   *
   * @return {Promise<Object>} { book }
   */
  async addBook({ title, author, isbn, availableQuantity, shelfLocation }) {
    let book;
    try {
      book = await Book.create({
        title,
        author,
        isbn,
        available_quantity: availableQuantity,
        shelf_location: shelfLocation,
      });
    } catch (err) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't create book: ${err.message}`,
      });
    }

    return { book };
  },

  /**
   * Updates details of a book in the library
   *
   * @param {Object} args
   * @prop {String} args.id
   * @prop {String} args.title
   * @prop {String} args.author
   * @prop {String} args.isbn
   * @prop {Number} args.availableQuantity
   * @prop {String} args.shelfLocation
   *
   * @return {Promise<Object>} { book }
   */
  async updateBook({
    id,
    title,
    author,
    isbn,
    availableQuantity,
    shelfLocation,
  }) {
    let book = await Book.findOne({ raw: true, where: { id } });

    if (_.isNil(book)) {
      throw new APIError({ message: "book not found", status: NOT_FOUND });
    }

    let updatedBooks;
    try {
      updatedBooks = await Book.update(
        {
          title,
          author,
          isbn,
          available_quantity: availableQuantity,
          shelf_location: shelfLocation,
        },
        {
          where: { id },
          returning: true,
        }
      );
    } catch (err) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't update book details: ${err.message}`,
      });
    }

    [book] = updatedBooks[1];

    return { book };
  },
};

export default BooksServices;
