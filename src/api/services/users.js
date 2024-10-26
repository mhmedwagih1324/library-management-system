import bcrypt from "bcrypt";
import APIError from "../../common/lib/api-error.js";
import httpStatus from "http-status";
import { User, BorrowingProcess, Book } from "../models/index.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { config } from "../../common/env-variables.js";
import { TOKEN_EXPIRATION_PERIOD } from "../../common/constants/authentication.js";
import { ADMIN, BORROWER } from "../constants/users.js";
import { BORROWING_STATUS_BORROWED } from "../constants/index.js";

const { CONFLICT, NOT_FOUND, BAD_REQUEST, FORBIDDEN } = httpStatus;

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
      throw new APIError({
        status: FORBIDDEN,
        message: "Unauthorized Action",
      });
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
        message: `Couldn't update borrower details: ${err.message}`,
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
        status: FORBIDDEN,
        message: "Wrong email or password",
      });
    }

    const payload = { ..._.omit(user, "password") };

    const jwtToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION_PERIOD,
    });

    return { jwtToken };
  },

  /**
   * retrieves caller currently borrowed books
   *
   * @param {Object} args
   * @prop {Number} args.limit
   * @prop {Number} args.offset
   *
   * @param {Object} callerData
   * @prop {Object} callerData.callerId
   *
   * @returns {Promise<{Object}>} { borrowingProcesses }
   */
  async listCallerBorrowingProcesses({ limit, offset }, { callerId }) {
    const borrowerId = callerId;

    const borrowingProcesses = await BorrowingProcess.findAll({
      raw: true,
      where: { borrowerId, status: BORROWING_STATUS_BORROWED },
      limit: limit !== -1 ? limit : null,
      offset: limit !== -1 ? offset : null,
      attributes: ["id", "dueDate", "createdAt"],
      include: [
        {
          model: Book,
          attributes: ["title", "author", "availableQuantity"],
        },
      ],
    });

    return { borrowingProcesses };
  },

  /**
   * deletes a borrower from library
   *
   * @param {Object} args
   * @prop {String} args.borrowerId
   *
   * @return {Promise<Object>} { borrower }
   */
  async deleteBorrower({ borrowerId }) {
    const borrower = await User.findOne({
      raw: true,
      where: { id: borrowerId, role: BORROWER },
      attributes: ["id", "name", "email", "registerDate", "role"],
    });

    if (_.isNil(borrower)) {
      throw new APIError({ message: "borrower not found", status: NOT_FOUND });
    }

    try {
      await User.destroy({
        where: { id: borrowerId },
      });
    } catch (err) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't delete borrower, details: ${err.message}`,
      });
    }

    return { borrower };
  },

  /**
   * lists all borrowers in the library
   *
   * @param {Object} args
   * @prop {Number} args.limit
   * @prop {Number} args.offset
   *
   * @return {Promise<Object>} { borrowers }
   */
  async listBorrowers({ limit, offset }) {
    const borrowers = await User.findAll({
      raw: true,
      where: { role: BORROWER },
      limit: limit !== -1 ? limit : null,
      offset: limit !== -1 ? offset : null, // FIXME: Need to search about the effect of offset when scaling bigger
      attributes: ["id", "name", "email", "registerDate", "role"],
    });

    return { borrowers };
  },
};

export default UsersServices;
