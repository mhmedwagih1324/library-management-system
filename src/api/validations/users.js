import Joi from "joi";
import { EMAIL_REGEX } from "../../common/constants.js";
import {
  PAGINATION_LIMIT_SCHEMA,
  PAGINATION_OFFSET_SCHEMA,
  UUIDV4Schema,
} from "../../common/schemas/joi-schemas.js";

const UsersValidation = {
  registerBorrower: {
    body: {
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX).required(),
      password: Joi.string().min(6).max(250).required(),
    },
  },

  updateBorrower: {
    params: {
      id: UUIDV4Schema,
    },
    body: {
      name: Joi.string().min(6),
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX),
      password: Joi.string().min(6).max(250),
    },
  },

  listCallerBorrowingProcesses: {
    query: {
      limit: PAGINATION_LIMIT_SCHEMA,
      offset: PAGINATION_OFFSET_SCHEMA,
    },
  },

  authenticateUser: {
    body: {
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX).required(),
      password: Joi.string().min(6).max(250).required(),
    },
  },

  deleteBorrower: {
    params: {
      id: UUIDV4Schema,
    },
  },

  listBorrowers: {
    query: {
      limit: PAGINATION_LIMIT_SCHEMA,
      offset: PAGINATION_OFFSET_SCHEMA,
    },
  },
};

export default UsersValidation;
