import { Router } from "express";
import BooksRouter from "../api/routers/books.js";
import BorrowersRouter from "../api/routers/borrowers.js";

const router = Router();

router.use("/books", BooksRouter);
router.use("/borrowers", BorrowersRouter);

export default router;
