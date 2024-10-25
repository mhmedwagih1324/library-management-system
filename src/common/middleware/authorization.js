import _ from "lodash";
import APIError from "../lib/api-error.js";
import httpStatus from "http-status";

const { UNAUTHORIZED } = httpStatus;

/**
 * Middleware accepts roles array to validate on the caller role
 *
 * @param {Array} roles
 *
 * @returns {Boolean} haveAccess
 */
export const authorize =
  ({ roles }) =>
  (req, res, next) => {
    const { user } = req;

    let haveAccess = true;

    if (!_.isNil(roles) && _.isArray(roles)) {
      haveAccess = roles.includes(user.role);
    }

    return haveAccess
      ? next()
      : next(new APIError({ message: "Unauthorized", status: UNAUTHORIZED }));
  };
