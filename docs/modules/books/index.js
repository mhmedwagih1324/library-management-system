import { ADMIN, ALL_ROLES } from "../../../src/api/constants/index.js";
import { ListBooksQueryParams } from "./parameters.js";
import {
  AddBookRequestSchema,
  AddBookResponseSchema,
  ListBooksResponseSchema,
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
};

export default BooksDocs;
