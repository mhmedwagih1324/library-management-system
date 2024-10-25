import passport from "passport";
import { PASSPORT_TOKEN_EXPIRED_ERROR } from "../constants/authentication.js";
import APIError from "./api-error.js";
import httpStatus from "http-status";

const { UNAUTHORIZED } = httpStatus;

export const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (info && info.name === PASSPORT_TOKEN_EXPIRED_ERROR) {
      return next(
        new APIError({
          message: "JWT token expired",
          status: UNAUTHORIZED,
        })
      );
    }

    if (!user) {
      return next(
        new APIError({
          message: "User is not authenticated",
          status: UNAUTHORIZED,
        })
      );
    }

    if (err) {
      return next(err);
    }
    req.user = user;
    next();
  })(req, res, next);
};
