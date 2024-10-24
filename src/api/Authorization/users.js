import { ADMIN } from "../constants.js";
import User from "../models/users";

/**
 * Checks if the user can register a borrower or not
 *
 * @param {Object} Args
 * @param {String} Args.callerId
 *
 * @returns {Promise<Boolean>}
 */
export const canRegisterBorrower = async ({ callerId }) => {
  const admin = await User.findOne({ id: callerId });

  return admin.role === ADMIN;
};
