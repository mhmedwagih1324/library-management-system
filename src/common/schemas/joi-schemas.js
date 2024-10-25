import Joi from "joi";
import { UUID_REGEX } from "../constants.js";

export const UUIDV4Schema = Joi.string().regex(UUID_REGEX).length(36);
