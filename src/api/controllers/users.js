/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import UsersServices from "../services/users.js";

const { CREATED, OK, ACCEPTED } = httpStatus;

const UsersController = {
  async registerBorrower(req, res, next) {
    const result = await UsersServices.registerBorrower({ ...req.body });

    return res.status(CREATED).json(result);
  },

  async updateBorrower(req, res, next) {
    const { user: caller } = req;
    const { id: userId } = req.params;
    const result = await UsersServices.updateBorrower(
      { userId, ...req.body },
      { caller }
    );

    return res.status(ACCEPTED).json(result);
  },

  async authenticateUser(req, res, next) {
    const result = await UsersServices.authenticateUser({ ...req.body });

    return res.status(OK).json(result);
  },

  async listCallerBorrowingProcesses(req, res, next) {
    const { limit, offset } = req.query;
    const { id: callerId } = req.user;

    const result = await UsersServices.listCallerBorrowingProcesses(
      { limit, offset },
      { callerId }
    );

    return res.status(OK).json(result);
  },

  async deleteBorrower(req, res, next) {
    const { id: borrowerId } = req.params;

    const result = await UsersServices.deleteBorrower({ borrowerId });

    return res.status(ACCEPTED).json(result);
  },

  async listBorrowers(req, res, next) {
    const { limit, offset } = req.query;

    const result = await UsersServices.listBorrowers({ limit, offset });

    return res.status(OK).json(result);
  },
};

export default UsersController;
