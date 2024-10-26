import {
  ADMIN,
  ALL_ROLES,
  BORROWER,
} from "../../../src/api/constants/index.js";
import {
  ListBorrowersQueryParams,
  ListCallerBorrowingProcessesQueryParams,
  UserIdParam,
} from "./parameters.js";
import {
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
  DeleteBorrowerResponseSchema,
  ListBorrowersResponseSchema,
  ListCallerBorrowingProcessesResponseSchema,
  RegisterBorrowerRequestSchema,
  RegisterBorrowerResponseSchema,
  UpdateBorrowerRequestSchema,
  UpdateBorrowerResponseSchema,
} from "./schemas.js";

const UsersDocs = {
  "/users/borrowers": {
    get: {
      tags: ["Users"],
      summary: "List borrowers in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      parameters: [...Object.values(ListBorrowersQueryParams)],

      responses: {
        200: {
          description: "Array of Borrowers information",
          content: {
            "application/json": {
              schema: ListBorrowersResponseSchema,
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
      tags: ["Users"],
      summary: "Register borrower in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      requestBody: {
        content: {
          "application/json": {
            schema: RegisterBorrowerRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: "Registered Borrower Information",
          content: {
            "application/json": {
              schema: RegisterBorrowerResponseSchema,
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

        409: {
          description: "Couldn't register borrower: error.message",
        },
      },
    },
  },

  "/users/borrowers/{id}": {
    put: {
      tags: ["Users"],
      summary: "Update borrower in library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ALL_ROLES}
      `,

      parameters: [UserIdParam],

      requestBody: {
        content: {
          "application/json": {
            schema: UpdateBorrowerRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: "Updated Borrower information",
          content: {
            "application/json": {
              schema: UpdateBorrowerResponseSchema,
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
          description: "user not found",
        },

        409: {
          description: "Couldn't update borrower details: error.message",
        },
      },
    },

    delete: {
      tags: ["Users"],
      summary: "Delete borrower from library",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${ADMIN}
      `,

      parameters: [UserIdParam],

      responses: {
        200: {
          description: "Deleted Borrower info",
          content: {
            "application/json": {
              schema: DeleteBorrowerResponseSchema,
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
          description: "borrower not found",
        },

        409: {
          description: "Couldn't delete borrower, details: error.message",
        },
      },
    },
  },

  "/users/authenticate": {
    post: {
      tags: ["Users"],
      summary: "Authenticates user in library",

      requestBody: {
        content: {
          "application/json": {
            schema: AuthenticateUserRequestSchema,
          },
        },
      },

      responses: {
        200: {
          description: "User authenticated successfully",
          content: {
            "application/json": {
              schema: AuthenticateUserResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        403: {
          description: "Wrong email or password",
        },

        404: {
          description: "user not found",
        },
      },
    },
  },

  "/users/me/borrowing-processes": {
    get: {
      tags: ["Users"],
      summary: "Lists borrowing processes that are currently borrowed",
      description: `
  ### Requires Authentication: Yes
  ### Allowed Roles: ${BORROWER}
      `,

      parameters: [...Object.values(ListCallerBorrowingProcessesQueryParams)],

      responses: {
        200: {
          description: "User authenticated successfully",
          content: {
            "application/json": {
              schema: ListCallerBorrowingProcessesResponseSchema,
            },
          },
        },

        400: {
          description: "Bad Request",
        },

        401: {
          description: "Unauthorized",
        },
      },
    },
  },
};

export default UsersDocs;
