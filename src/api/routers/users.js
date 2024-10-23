import { Router } from "express";
import { validate } from "../../common/middleware/validate";
import UsersValidation from "../validations/users";
import tryCatch from "../../common/utils/tryCatch";
import UsersController from "../controllers/users";

const router = new Router();

router.get(
  "/register",
  validate(UsersValidation.registerBorrower),
  tryCatch(UsersController.registerBorrower)
);

export default router;
