import Joi from "joi";

const BooksValidation = {
  listBooks: {
    query: {
      limit: Joi.number().min(1),
    },
  },
};

export default BooksValidation;
