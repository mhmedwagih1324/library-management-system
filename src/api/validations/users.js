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

  authenticateUser: {
    body: {
      email: Joi.string().min(6).max(320).regex(EMAIL_REGEX).required(),
      password: Joi.string().min(6).max(250).required(),
    },
  },
};

export default UsersValidation;
