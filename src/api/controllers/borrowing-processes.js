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
};

export default BorrowingProcessController;
