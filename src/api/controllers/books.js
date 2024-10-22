/* eslint-disable no-unused-vars */
import BooksServices from "../services/books.js";
import httpStatus from "http-status";

const { OK } = httpStatus;

const BooksController = {
  async listBooks(req, res, next) {
    const { limit } = req.query;

    const books = await BooksServices.listBooks({ limit });

    return res.status(OK).send(books);
  },
};

export default BooksController;
