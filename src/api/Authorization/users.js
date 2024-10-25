import { ADMIN } from "../constants/users.js";

const UsersAuthorization = {
  registerBorrower: {
    roles: [ADMIN],
  },
};

export default UsersAuthorization;
