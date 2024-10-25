import { BORROWER } from "../constants/index.js";

const BorrowingProcessesAuthorization = {
  checkoutBook: {
    roles: [BORROWER],
  },

  returnBook: {
    roles: [BORROWER],
  },
};

export default BorrowingProcessesAuthorization;
