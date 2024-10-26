import {
  PaginationLimitParameter,
  PaginationOffsetParameter,
} from "../../common/parameters.js";

export const ListBooksQueryParams = {
  PaginationLimitParameter,
  PaginationOffsetParameter,

  TitleSearchParameter: {
    in: "query",
    name: "title",
    schema: {
      type: "string",
      min: 3,
    },
    description: "title of the book",
  },

  IsbnSearchParameter: {
    in: "query",
    name: "isbn",
    schema: {
      type: "string",
      min: 3,
    },
    description: "isbn number of the book(with dashes ' -')",
  },

  AuthorSearchParameter: {
    in: "query",
    name: "author",
    schema: {
      type: "string",
      min: 3,
    },
    description: "author name of the book",
  },
};

export const BookIdParam = {
  in: "params",
  name: "id",
  schema: {
    type: "string",
    example: "a4958ec2-2c8f-4e0b-a4f4-b557e2200587",
  },
  description: "Book id",
};
