import { Router } from "express";
import { validate } from "../../common/middleware/validate.js";
import UsersValidation from "../validations/users.js";
import tryCatch from "../../common/utils/tryCatch.js";
import UsersController from "../controllers/users.js";

const router = new Router();

router.post(
  "/register-borrower",
  validate(UsersValidation.registerBorrower),
  tryCatch(UsersController.registerBorrower)
);

router.post(
  "/authenticate",
  validate(UsersValidation.authenticateUser),
  tryCatch(UsersController.authenticateUser)
);

export default router;
