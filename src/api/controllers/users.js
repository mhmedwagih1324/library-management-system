/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import UsersServices from "../services/users.js";

const { CREATED } = httpStatus;

const UsersController = {
  async registerBorrower(req, res, next) {
    const result = await UsersServices.registerBorrower({ ...req.body });

    return res.status(CREATED).json(result);
  },
};

export default UsersController;
