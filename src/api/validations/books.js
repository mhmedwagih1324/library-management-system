import Joi from "joi";
import { ISBN_REGEX } from "../../common/constants.js";
import { SHELF_LOCATIONS, TOP_SHELF } from "../constants/index.js";
import {
  PAGINATION_LIMIT_SCHEMA,
  PAGINATION_OFFSET_SCHEMA,
  UUIDV4Schema,
} from "../../common/schemas/joi-schemas.js";

const BooksValidation = {
  listBooks: {
    query: {
      title: Joi.string().min(3),
      isbn: Joi.string().min(3),
      author: Joi.string().min(3),

      limit: PAGINATION_LIMIT_SCHEMA,
      offset: PAGINATION_OFFSET_SCHEMA,
    },
  },

  addBook: {
    body: {
      title: Joi.string().min(6).required(),
      isbn: Joi.string().regex(ISBN_REGEX).required(),
      author: Joi.string().min(6).required(),
      availableQuantity: Joi.number().min(0).default(0),
      shelfLocation: Joi.string()
        .valid(...SHELF_LOCATIONS)
        .default(TOP_SHELF),
    },
  },

  updateBook: {
    params: {
      id: UUIDV4Schema,
    },
    body: {
      title: Joi.string().min(6),
      isbn: Joi.string().regex(ISBN_REGEX),
      author: Joi.string().min(6),
      availableQuantity: Joi.number().min(0).default(0),
      shelfLocation: Joi.string()
        .valid(...SHELF_LOCATIONS)
        .default(TOP_SHELF),
    },
  },

  deleteBook: {
    params: {
      id: UUIDV4Schema,
    },
  },
};

export default BooksValidation;
