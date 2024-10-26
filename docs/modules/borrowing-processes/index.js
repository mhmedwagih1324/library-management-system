import { ADMIN, BORROWER } from "../../../src/api/constants/index.js";
import { BookIdParam, ListOverdueBorrowsQueryParams } from "./parameters.js";
import {
  CheckoutBookResponseSchema,
  ListOverdueBorrowsResponseSchema,
} from "./schemas.js";

const BorrowingProcessesDocs = {
  "/borrowingProcesses/overdue": {
    get: {
      tags: ["Borrowing-Processes"],
      summary: "List overdue borrowing processes",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      parameters: [...Object.values(ListOverdueBorrowsQueryParams)],

      responses: {
        200: {
          description: "Array of Books information",
          content: {
            "application/json": {
              schema: ListOverdueBorrowsResponseSchema,
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

  "/borrowingProcesses/checkout-book/{id}": {
    post: {
      tags: ["Borrowing-Processes"],
      summary: "checkout book from library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${BORROWER}
      `,

      parameters: [BookIdParam],

      responses: {
        200: {
          description: "Book checkout Successfully",
          content: {
            "application/json": {
              schema: CheckoutBookResponseSchema,
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
          description:
            "Couldn't create borrowing-process, details: error.message",
        },

        422: {
          description: `Unprocessable Entity:
          - book isn't available right now
          - book is already borrowed by caller
          `,
        },
      },
    },
  },

  "/borrowingProcesses/return-book/{id}": {
    post: {
      tags: ["Borrowing-Processes"],
      summary: "return book to library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${BORROWER}
      `,

      parameters: [BookIdParam],

      responses: {
        200: {
          description: "Book returned successfully",
          content: {
            "application/json": {
              schema: CheckoutBookResponseSchema,
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
          description:
            "Couldn't update borrowing-process, details: error.message",
        },

        422: {
          description:
            "Unprocessable Entity: book isn' currently borrowed by caller",
        },
      },
    },
  },
};

export default BorrowingProcessesDocs;
