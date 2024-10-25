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
};

export default UsersController;
