/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import UsersServices from "../services/users.js";
import BorrowingProcessesServices from "../services/borrowing-processes.js";

const { CREATED, OK, ACCEPTED } = httpStatus;

const BorrowingProcessController = {
  async checkoutBook(req, res, next) {
    const { id: bookId } = req.params;
    const { id: callerId } = req.user;
    const result = await BorrowingProcessesServices.checkoutBook(
      { bookId },
      { callerId }
    );

    return res.status(CREATED).json(result);
  },

  async returnBook(req, res, next) {
    const { id: bookId } = req.params;
    const { id: callerId } = req.user;
    const result = await BorrowingProcessesServices.returnBook(
      { bookId },
      { callerId }
    );

    return res.status(ACCEPTED).json(result);
  },

  async listOverdueBorrows(req, res, next) {
    const result = await BorrowingProcessesServices.listOverdueBorrows({
      ...req.query,
    });

    return res.status(OK).json(result);
  },
};

export default BorrowingProcessController;
