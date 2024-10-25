import { Router } from "express";
import { authenticate } from "../../common/middleware/authenticate.js";
import { authorize } from "../../common/middleware/authorization.js";
import { validate } from "../../common/middleware/validate.js";
import tryCatch from "../../common/utils/tryCatch.js";
import { BorrowingProcessesAuthorization } from "../Authorization/index.js";
import { BorrowingProcessValidation } from "../validations/index.js";
import { BorrowingProcessesController } from "../controllers/index.js";

const router = new Router();

router.post(
  "/checkout-book/:id",
  authenticate,
  authorize(BorrowingProcessesAuthorization.checkoutBook),
  validate(BorrowingProcessValidation.checkoutBook),
  tryCatch(BorrowingProcessesController.checkoutBook)
);

router.post(
  "/return-book/:id",
  authenticate,
  authorize(BorrowingProcessesAuthorization.returnBook),
  validate(BorrowingProcessValidation.returnBook),
  tryCatch(BorrowingProcessesController.returnBook)
);

export default router;
