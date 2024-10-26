import _ from "lodash";
import APIError from "../../common/lib/api-error.js";
import Book from "../models/books.js";
import httpStatus from "http-status";
import { Op } from "sequelize";
import sequelize from "../../config/db.js";

const { NOT_FOUND, CONFLICT } = httpStatus;

const BooksServices = {
  /**
   * Lists books in the library
   *
   * @param {Object} args
   * @prop {String} args.title
   * @prop {String} args.author
   * @prop {String} args.isbn
   * @prop {Number} args.limit
   * @prop {Number} args.offset
   *
   * @returns {Promise<[Object]>} { books }
   */
  async listBooks({ title, author, isbn, limit, offset }) {
    // FIXME: The endpoint only matches a whole word, but doesn't match any of its prefixes
    let textSearchValue = ``;

    if (title && title !== "") {
      title = title.split(/\s+/).join(" <-> ");
      textSearchValue = textSearchValue.concat(title).concat("*");
    }

    if (author && author !== "") {
      author = author.split(/\s+/).join(" <-> ");
      textSearchValue = _.isEmpty(textSearchValue)
        ? textSearchValue.concat(author).concat("*")
        : textSearchValue.concat(" | ", author).concat("*");
    }

    if (isbn && isbn !== "") {
      isbn = isbn.split(/\s+/).join(" <-> ");
      textSearchValue = _.isEmpty(textSearchValue)
        ? textSearchValue.concat(isbn).concat("*")
        : textSearchValue.concat(" | ", isbn).concat("*");
    }
    textSearchValue = textSearchValue.trimEnd();

    const searchObject = !_.isEmpty(textSearchValue)
      ? {
          TSValue: {
            [Op.match]: sequelize.fn("to_tsquery", "english", textSearchValue),
          },
        }
      : {};

    const books = await Book.findAll({
      where: searchObject,
      limit: limit !== -1 ? limit : null,
      offset: limit !== -1 ? offset : null,
      attributes: ["id", "title", "author", "isbn", "available_quantity"],
    });

    return { books };
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
