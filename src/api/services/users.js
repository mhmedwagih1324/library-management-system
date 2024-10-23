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
    const hashedPassword = await bcrypt.hash(password, 10);

    let borrower;
    try {
      borrower = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw APIError({ status: CONFLICT, message: error });
    }

    return { borrower };
  },
};

export default UsersServices;
