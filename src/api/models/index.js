import User from "./users.js";
import Book from "./books.js";
import BorrowingProcess from "./borrowingProcess.js";

BorrowingProcess.belongsTo(Book);
BorrowingProcess.belongsTo(User);
Book.hasMany(BorrowingProcess, { foreignKey: "bookId" });
User.hasMany(BorrowingProcess, { foreignKey: "userId" });

export { Book, User, BorrowingProcess };
