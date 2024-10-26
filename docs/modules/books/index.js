import { ADMIN, ALL_ROLES } from "../../../src/api/constants/index.js";
import { BookIdParam, ListBooksQueryParams } from "./parameters.js";
import {
  AddBookRequestSchema,
  AddBookResponseSchema,
  DeleteBookResponseSchema,
  ListBooksResponseSchema,
  UpdateBookRequestSchema,
  UpdateBookResponseSchema,
} from "./schemas.js";

const BooksDocs = {
  "/books": {
    get: {
      tags: ["Books"],
      summary: "List books in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ALL_ROLES}
      `,

      parameters: [...Object.values(ListBooksQueryParams)],

      responses: {
        200: {
          description: "Array of Books information",
          content: {
            "application/json": {
              schema: ListBooksResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        401: {
          description: "User is not authenticated",
        },

        403: {
          description: "Unauthorized",
        },
      },
    },

    post: {
      tags: ["Books"],
      summary: "Add book in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      requestBody: {
        content: {
          "application/json": {
            schema: AddBookRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: "Array of Books information",
          content: {
            "application/json": {
              schema: AddBookResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        401: {
          description: "User is not authenticated",
        },

        403: {
          description: "Unauthorized",
        },
      },
    },
  },

  "/books/{id}": {
    put: {
      tags: ["Books"],
      summary: "Update book in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      parameters: [BookIdParam],

      requestBody: {
        content: {
          "application/json": {
            schema: UpdateBookRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: "Updated Book information",
          content: {
            "application/json": {
              schema: UpdateBookResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        401: {
          description: "User is not authenticated",
        },

        403: {
          description: "Unauthorized",
        },

        404: {
          description: "book not found",
        },

        409: {
          description: "Couldn't update book details: error.message",
        },
      },
    },

    delete: {
      tags: ["Books"],
      summary: "Delete book from library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      parameters: [BookIdParam],

      responses: {
        200: {
          description: "Deleted Book info",
          content: {
            "application/json": {
              schema: DeleteBookResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        401: {
          description: "User is not authenticated",
        },

        403: {
          description: "Unauthorized",
        },

        404: {
          description: "book not found",
        },

        409: {
          description: "Couldn't delete book, details: error.message",
        },
      },
    },
  },
};

export default BooksDocs;
