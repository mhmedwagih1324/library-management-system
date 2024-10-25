import { UUIDV4Schema } from "../../common/schemas/joi-schemas.js";

const BorrowingProcessValidation = {
  checkoutBook: {
    params: {
      id: UUIDV4Schema,
    },
  },
};

export default BorrowingProcessValidation;
