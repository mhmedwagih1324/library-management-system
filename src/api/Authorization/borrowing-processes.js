import { ADMIN, BORROWER } from "../constants/index.js";

const BorrowingProcessesAuthorization = {
  checkoutBook: {
    roles: [BORROWER],
  },

  returnBook: {
    roles: [BORROWER],
  },

  listOverdueBorrows: {
    roles: [ADMIN],
  },
};

export default BorrowingProcessesAuthorization;
