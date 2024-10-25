import { Router } from "express";
import { validate } from "../../common/middleware/validate.js";
import UsersValidation from "../validations/users.js";
import tryCatch from "../../common/utils/tryCatch.js";
import UsersController from "../controllers/users.js";
import { authenticate } from "../../common/middleware/authenticate.js";
import { authorize } from "../../common/middleware/authorization.js";
import UsersAuthorization from "../Authorization/users.js";

const router = new Router();

router.post(
  "/register-borrower",
  authenticate,
  authorize(UsersAuthorization.registerBorrower),
  validate(UsersValidation.registerBorrower),
  tryCatch(UsersController.registerBorrower)
);

router.put(
  "/borrowers/:id",
  authenticate,
  authorize(UsersAuthorization.updateBorrower),
  validate(UsersValidation.updateBorrower),
  tryCatch(UsersController.updateBorrower)
);

router.post(
  "/authenticate",
  validate(UsersValidation.authenticateUser),
  tryCatch(UsersController.authenticateUser)
);

export default router;
