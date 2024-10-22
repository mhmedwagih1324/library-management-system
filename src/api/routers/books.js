import { Router } from "express";
import BooksController from "../controllers/books.js";
import { validate } from "../../common/middleware/validate.js";
import BooksValidation from "../validations/books.js";
import tryCatch from "../../common/utils/tryCatch.js";

const router = new Router();

router.get(
  "/",
  validate(BooksValidation.listBooks),
  tryCatch(BooksController.listBooks)
);

export default router;
