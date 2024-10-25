/* eslint-disable no-unused-vars */
import BooksServices from "../services/books.js";
import httpStatus from "http-status";

const { OK, CREATED, ACCEPTED } = httpStatus;

const BooksController = {
  async listBooks(req, res, next) {
    const { limit } = req.query;

    const books = await BooksServices.listBooks({ limit });

    return res.status(OK).send(books);
  },

  async addBook(req, res, next) {
    const result = await BooksServices.addBook({ ...req.body });

    return res.status(CREATED).json(result);
  },

  async updateBook(req, res, next) {
    const { id } = req.params;
    const result = await BooksServices.updateBook({ id, ...req.body });

    return res.status(ACCEPTED).json(result);
  },
};

export default BooksController;
