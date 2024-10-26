import APIError from "../../common/lib/api-error.js";
import httpStatus from "http-status";
import _ from "lodash";

import { Book, BorrowingProcess, User } from "../models/index.js";
import {
  BORROWING_PROCESS_DEFAULT_PERIOD,
  BORROWING_STATUS_BORROWED,
  BORROWING_STATUS_RETURNED,
} from "../constants/borrowingProcess.js";
import moment from "moment";
import { Op } from "sequelize";

const { CONFLICT, NOT_FOUND, UNPROCESSABLE_ENTITY } = httpStatus;

const BorrowingProcessesServices = {
  /**
   * performs a book checkout process
   *
   * @param {Object} args
   * @prop {String} args.bookId
   *
   * @param {Object} callerData
   * @prop {Object} callerData.callerId
   *
   * @returns {Promise<{Object}>} { borrowingProcess }
   */
  async checkoutBook({ bookId }, { callerId }) {
    const borrowerId = callerId;

    const book = await Book.findOne({
      raw: true,
      where: { id: bookId },
      attributes: { exclude: ["TSValue"] },
    });

    if (_.isNil(book)) {
      throw new APIError({ message: "book not found", status: NOT_FOUND });
    }

    if (book.availableQuantity === 0) {
      throw new APIError({
        message: "book isn't available right now",
        status: UNPROCESSABLE_ENTITY,
      });
    }

    const earlierBorrowing = await BorrowingProcess.findOne({
      raw: true,
      where: { bookId, borrowerId, status: BORROWING_STATUS_BORROWED },
    });

    if (!_.isNil(earlierBorrowing)) {
      throw new APIError({
        message: "book is already borrowed by you",
        status: UNPROCESSABLE_ENTITY,
      });
    }

    /* NOTE: The following process doesn't need to be done as transaction, 
      as when creating a borrowing process for a book that is currently was available
      both try to decrement the book availableQuantity first and if this wasn't successful,
      the next transaction (creating the borrowing process) wouldn't run.
    */
    let borrowingProcess;
    try {
      await Book.decrement({ availableQuantity: 1 }, { where: { id: bookId } });

      borrowingProcess = await BorrowingProcess.create(
        {
          bookId,
          borrowerId,
          dueDate: new Date(
            moment().add({ days: BORROWING_PROCESS_DEFAULT_PERIOD })
          ),
        },
        { raw: true }
      );
    } catch (error) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't create borrowing-process: ${error.message}`,
      });
    }

    return {
      borrowingProcess: {
        ..._.omit(borrowingProcess.dataValues, ["bookId"]),
        book,
      },
    };
  },

  /**
   * performs a book return process
   *
   * @param {Object} args
   * @prop {String} args.bookId
   *
   * @param {Object} callerData
   * @prop {Object} callerData.callerId
   *
   * @returns {Promise<{Object}>} { borrowingProcess }
   */
  async returnBook({ bookId }, { callerId }) {
    const borrowerId = callerId;

    const book = await Book.findOne({
      raw: true,
      where: { id: bookId },
      attributes: { exclude: ["TSValue"] },
    });

    if (_.isNil(book)) {
      throw new APIError({ message: "book not found", status: NOT_FOUND });
    }

    const earlierBorrowing = await BorrowingProcess.findOne({
      raw: true,
      where: { bookId, borrowerId, status: BORROWING_STATUS_BORROWED },
    });

    if (_.isNil(earlierBorrowing)) {
      throw new APIError({
        message: "book is not currently borrowed by you",
        status: UNPROCESSABLE_ENTITY,
      });
    }

    let updatedBorrowingProcesses;
    try {
      await Book.increment({ availableQuantity: 1 }, { where: { id: bookId } });

      updatedBorrowingProcesses = await BorrowingProcess.update(
        {
          status: BORROWING_STATUS_RETURNED,
        },
        {
          where: {
            id: earlierBorrowing.id,
          },
          returning: true,
        }
      );
    } catch (error) {
      throw new APIError({
        status: CONFLICT,
        message: `Couldn't update borrowing-process: ${error.message}`,
      });
    }

    const [borrowingProcess] = updatedBorrowingProcesses[1];

    return {
      borrowingProcess: {
        ..._.omit(borrowingProcess.dataValues, ["bookId"]),
        book,
      },
    };
  },

  /**
   * lists overdue borrows
   *
   * @param {Object} args
   * @prop {Number} args.limit
   * @prop {Number} args.offset
   *
   * @returns {Promise<{Object}>} { overdueBorrows }
   */
  async listOverdueBorrows({ limit, offset }) {
    const overdueBorrows = await BorrowingProcess.findAll({
      raw: true,
      where: {
        status: BORROWING_STATUS_BORROWED,
        dueDate: { [Op.lt]: new Date() },
      },
      attributes: ["id", "dueDate", "createdAt"],
      include: [
        {
          model: Book,
          attributes: ["title", "author", "availableQuantity"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      limit: limit !== -1 ? limit : null,
      offset: limit !== -1 ? offset : null,
    });

    return { overdueBorrows };
  },
};

export default BorrowingProcessesServices;
