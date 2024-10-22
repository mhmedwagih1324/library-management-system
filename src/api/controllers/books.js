import BooksServices from "../services/books.js";
import httpStatus from "http-status";

const { OK } = httpStatus;

const BooksController = {
  async listBooks(req, res, next) {
    try {
      const { limit } = req.query;

      const books = await BooksServices.listBooks({ limit });

      return res.status(OK).send(books);
    } catch (err) {
      return next(err);
    }
  },
};

export default BooksController;
