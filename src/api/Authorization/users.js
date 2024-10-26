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

  deleteBorrower: {
    roles: [ADMIN],
  },

  listBorrowers: {
    roles: [ADMIN],
  },
};

export default UsersAuthorization;
