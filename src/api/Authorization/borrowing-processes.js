import { BORROWER } from "../constants/index.js";

const BorrowingProcessesAuthorization = {
  checkoutBook: {
    roles: [BORROWER],
  },
};

export default BorrowingProcessesAuthorization;
