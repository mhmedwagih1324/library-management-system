import APIError from "../../common/lib/api-error.js";
import httpStatus from "http-status";
import _ from "lodash";

import { Book, BorrowingProcess } from "../models/index.js";
import {
  BORROWING_PROCESS_DEFAULT_PERIOD,
  BORROWING_STATUS_BORROWED,
} from "../constants/borrowingProcess.js";
import moment from "moment";

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

    const book = await Book.findOne({ raw: true, where: { id: bookId } });

    if (_.isNil(book)) {
      throw new APIError({ message: "book not found", status: NOT_FOUND });
    }

    if (book.available_quantity === 0) {
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
      both try to decrement the book available_quantity first and if this wasn't successful,
      the next transaction (creating the borrowing process) wouldn't run.
    */
    let borrowingProcess;
    try {
      await Book.decrement(
        { available_quantity: 1 },
        { where: { id: bookId } }
      );

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
    return { borrowingProcess };
  },
};

export default BorrowingProcessesServices;
