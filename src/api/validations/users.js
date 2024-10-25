import Joi from "joi";
import { EMAIL_REGEX } from "../../common/constants.js";

const UsersValidation = {
  registerBorrower: {
    body: {
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX).required(),
      password: Joi.string().min(6).max(250).required(),
    },
  },

  updateBorrower: {
    body: {
      name: Joi.string().min(6),
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX),
      password: Joi.string().min(6).max(250),
    },
  },

  listCallerBorrowingProcesses: {
    query: {
      limit: Joi.number().min(5).max(100).default(25).allow(-1),
      offset: Joi.number().min(0).default(0),
    },
  },

  authenticateUser: {
    body: {
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX).required(),
      password: Joi.string().min(6).max(250).required(),
    },
  },
};

export default UsersValidation;
