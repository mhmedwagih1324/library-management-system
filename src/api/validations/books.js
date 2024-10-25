import Joi from "joi";
import { ISBN_REGEX } from "../../common/constants.js";
import { SHELF_LOCATIONS, TOP_SHELF } from "../constants/index.js";

const BooksValidation = {
  listBooks: {
    query: {
      limit: Joi.number().min(1),
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
};

export default BooksValidation;
