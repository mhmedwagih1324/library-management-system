import bcrypt from "bcrypt";
import APIError from "../../common/middleware/api-error.js";
import httpStatus from "http-status";
import User from "../models/users.js";

const { CONFLICT } = httpStatus;

const UsersServices = {
  /**
   * Registers a borrower in the system
   *
   * @param {Object} args
   * @param {String} args.name
   * @param {String} args.email
   * @param {String} args.password
   *
   * @returns {Promise<{Object}>} { borrower }
   */
  async registerBorrower({ name, email, password }) {
    let borrower;
    try {
      borrower = await User.create({
        name,
        email,
        password, // will be hashed by the beforeCreate hook
      });
    } catch (error) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't create borrower: ${error.message}`,
      });
    }
    return { borrower: _.omit(borrower.dataValues, ["password"]) };
  },
};

export default UsersServices;
