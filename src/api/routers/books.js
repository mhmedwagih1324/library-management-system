import { Router } from "express";
import { BooksController } from "../controllers/index.js";
import { validate } from "../../common/middleware/validate.js";
import { BooksValidation } from "../validations/index.js";
import tryCatch from "../../common/utils/tryCatch.js";
import { authenticate } from "../../common/middleware/authenticate.js";
import { authorize } from "../../common/middleware/authorization.js";
import { BooksAuthorization } from "../Authorization/index.js";

const router = new Router();

router.get(
  "/",
  authenticate,
  authorize(BooksAuthorization.listBooks),
  validate(BooksValidation.listBooks),
  tryCatch(BooksController.listBooks)
);

router.post(
  "/",
  authenticate,
  authorize(BooksAuthorization.addBook),
  validate(BooksValidation.addBook),
  tryCatch(BooksController.addBook)
);

router.put(
  "/:id",
  authenticate,
  authorize(BooksAuthorization.updateBook),
  validate(BooksValidation.updateBook),
  tryCatch(BooksController.updateBook)
);

router.delete(
  "/:id",
  authenticate,
  authorize(BooksAuthorization.deleteBook),
  validate(BooksValidation.deleteBook),
  tryCatch(BooksController.deleteBook)
);

export default router;
