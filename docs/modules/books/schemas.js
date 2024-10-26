import {
  SHELF_LOCATIONS,
  TOP_SHELF,
} from "../../../src/api/constants/index.js";

export const ListBooksResponseSchema = {
  type: "object",
  required: ["books"],
  properties: {
    books: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          author: {
            type: "string",
          },
          isbn: {
            type: "string",
          },
          availableQuantity: {
            type: "integer",
            format: "int32",
          },
        },
      },
    },
  },
};

export const AddBookResponseSchema = {
  type: "object",
  required: ["book"],
  properties: {
    book: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        title: {
          type: "string",
        },
        author: {
          type: "string",
        },
        isbn: {
          type: "string",
        },
        availableQuantity: {
          type: "integer",
          format: "int32",
        },
        shelfLocation: {
          type: "string",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
  },
};

export const AddBookRequestSchema = {
  type: "object",
  required: ["title", "isbn", "author"],
  properties: {
    title: {
      type: "string",
      example: "Fundamentals of Statistics",
    },

    isbn: {
      type: "string",
      example: "3b014618-a0b4-4518-9aa8-55856f4469ca",
    },

    author: {
      type: "string",
      example: "Wagdy Kamel",
    },

    availableQuantity: {
      type: "integer",
      format: "int32",
      default: 0,
      min: 0,
    },

    shelfLocation: {
      type: "string",
      enum: SHELF_LOCATIONS,
      default: TOP_SHELF,
    },
  },
};

export const UpdateBookRequestSchema = {
  ...AddBookRequestSchema,
  required: [],
};

export const UpdateBookResponseSchema = AddBookResponseSchema;

export const DeleteBookResponseSchema = AddBookResponseSchema;
