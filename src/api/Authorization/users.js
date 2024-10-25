import { ADMIN, BORROWER } from "../constants/users.js";

const UsersAuthorization = {
  registerBorrower: {
    roles: [ADMIN],
  },
  updateBorrower: {
    roles: [ADMIN, BORROWER],
  },
};

export default UsersAuthorization;
