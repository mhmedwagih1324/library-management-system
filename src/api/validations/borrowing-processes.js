import {
  PAGINATION_LIMIT_SCHEMA,
  PAGINATION_OFFSET_SCHEMA,
  UUIDV4Schema,
} from "../../common/schemas/joi-schemas.js";

const BorrowingProcessValidation = {
  checkoutBook: {
    params: {
      id: UUIDV4Schema,
    },
  },

  returnBook: {
    params: {
      id: UUIDV4Schema,
    },
  },

  listOverdueBorrows: {
    query: {
      limit: PAGINATION_LIMIT_SCHEMA,
      offset: PAGINATION_OFFSET_SCHEMA,
    },
  },
};

export default BorrowingProcessValidation;
