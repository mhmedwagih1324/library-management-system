import sequelize from "../../config/db.js";

const getTSValue = async (book) => {
  book.TSValue = await sequelize.fn(
    "to_tsvector",
    "english",
    sequelize.fn(
      "concat",
      book.title || "",
      " ",
      book.author || "",
      " ",
      book.isbn || ""
    )
  );
};

export default getTSValue;
