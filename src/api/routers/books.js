import { Router } from "express";
import BooksController from "../controllers/books.js";
import { validate } from "../../common/middleware/validate.js";
import BooksValidation from "../validations/books.js";

const router = new Router();

router.get("/", validate(BooksValidation.listBooks), BooksController.listBooks);

export default router;
