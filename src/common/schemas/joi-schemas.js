import Joi from "joi";
import { UUID_REGEX } from "../constants.js";

export const UUIDV4Schema = Joi.string().regex(UUID_REGEX).length(36);

export const PAGINATION_LIMIT_SCHEMA = Joi.number()
  .min(5)
  .max(100)
  .default(25)
  .allow(-1);

export const PAGINATION_OFFSET_SCHEMA = Joi.number().min(0).default(0);
