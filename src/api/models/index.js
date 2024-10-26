import Book from "./books.js";
import BorrowingProcess from "./borrowingProcess.js";
import User from "./users.js";

Book.hasMany(BorrowingProcess, { foreignKey: "bookId", sourceKey: "id" });
BorrowingProcess.belongsTo(Book, { foreignKey: "bookId", targetKey: "id" });
User.hasMany(BorrowingProcess, { foreignKey: "borrowerId", sourceKey: "id" });
BorrowingProcess.belongsTo(User, { foreignKey: "borrowerId", targetKey: "id" });

export { Book, User, BorrowingProcess };
