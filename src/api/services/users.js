import bcrypt from "bcrypt";
import APIError from "../../common/lib/api-error.js";
import httpStatus from "http-status";
import User from "../models/users.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { config } from "../../common/env-variables.js";
import { TOKEN_EXPIRATION_PERIOD } from "../../common/constants/authentication.js";
import { ADMIN } from "../constants/users.js";

const { CONFLICT, NOT_FOUND, UNAUTHORIZED, BAD_REQUEST } = httpStatus;

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

  /**
   * Updates a borrower's information
   *
   * @param {Object} args
   * @prop {String} args.id
   * @prop {String} args.name
   * @prop {String} args.email
   * @prop {String} args.password
   *
   * @param {Object} callerData
   * @prop {String} callerData.caller
   *
   * @returns {Promise<{Object}>} { borrower }
   */
  async updateBorrower({ userId, name, email, password }, { caller }) {
    const user = await User.findOne({ raw: true, where: { id: userId } });

    if (_.isNil(user)) {
      if (_.isNil(user)) {
        throw new APIError({ status: NOT_FOUND, message: "User not found" });
      }
    }

    if (
      userId !== caller.id &&
      (caller.role !== ADMIN || user.role === ADMIN)
    ) {
      throw new APIError({ status: UNAUTHORIZED, message: "User not found" });
    }

    const updateObject = {};

    if (name && name !== user.name) {
      updateObject.name = name;
    }

    if (email && email !== user.email) {
      updateObject.email = email;
    }

    if (password) {
      updateObject.password = password;
    }

    if (_.isEmpty(updateObject)) {
      throw new APIError({ message: "Nothing to update", status: BAD_REQUEST });
    }

    let updatedBorrowers;
    try {
      updatedBorrowers = await User.update(updateObject, {
        where: { id: userId },
        returning: true,
      });
    } catch (err) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't update book details: ${err.message}`,
      });
    }

    const [borrower] = updatedBorrowers[1];
    return { borrower: _.omit(borrower.dataValues, ["password"]) };
  },

  /**
   * Authenticates a user in the system
   *
   * @param {Object} args
   * @param {String} args.email
   * @param {String} args.password
   *
   * @returns {Promise<{Object}>} { jwtToken }
   */
  async authenticateUser({ email, password }) {
    let user = await User.findOne({ where: { email }, raw: true });

    if (_.isNil(user)) {
      throw new APIError({ status: NOT_FOUND, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new APIError({
        status: UNAUTHORIZED,
        message: "Wrong email or password",
      });
    }

    const payload = { ..._.omit(user, "password") };

    const jwtToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_PERIOD,
    });

    return { jwtToken };
  },
};

export default UsersServices;
