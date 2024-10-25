import { ADMIN, BORROWER } from "../constants/users.js";

const UsersAuthorization = {
  registerBorrower: {
    roles: [ADMIN],
  },

  updateBorrower: {
    roles: [ADMIN, BORROWER],
  },

  listCallerBorrowingProcesses: {
    roles: [BORROWER],
  },
};

export default UsersAuthorization;
