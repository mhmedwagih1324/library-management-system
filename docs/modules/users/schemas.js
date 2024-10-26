export const ListBorrowersResponseSchema = {
  type: "object",
  required: ["borrowers"],
  properties: {
    borrowers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "69b16029-3eef-4ffe-8077-355443d15ad3",
          },
          name: {
            type: "string",
            example: "David Brown",
          },
          email: {
            type: "string",
            example: "david.brown@example.com",
          },
          registerDate: {
            type: "string",
            format: "date-time",
            example: "2023-04-05T12:45:00.000Z",
          },
          role: {
            type: "string",
            example: "borrower",
          },
        },
      },
      example: [
        {
          id: "69b16029-3eef-4ffe-8077-355443d15ad3",
          name: "David Brown",
          email: "david.brown@example.com",
          registerDate: "2023-04-05T12:45:00.000Z",
          role: "borrower",
        },
      ],
    },
  },
};

export const RegisterBorrowerResponseSchema = {
  type: "object",
  required: ["borrower"],
  properties: {
    borrower: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "f2125cb1-1fec-4ea6-ba38-00b138564b9a",
        },
        registerDate: {
          type: "string",
          format: "date-time",
          example: "2024-10-26T17:51:24.422Z",
        },
        role: {
          type: "string",
          example: "borrower",
        },
        name: {
          type: "string",
          example: "Mohamed Wagih",
        },
        email: {
          type: "string",
          example: "wigo@coligo111.com",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2024-10-26T17:51:24.423Z",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2024-10-26T17:51:24.423Z",
        },
      },
    },
  },
};

export const RegisterBorrowerRequestSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: {
      type: "string",
      example: "Adam Smith",
    },

    email: {
      type: "string",
      example: "user@example.com",
    },

    password: {
      type: "string",
      example: "password123",
    },
  },
};

export const UpdateBorrowerRequestSchema = {
  ...RegisterBorrowerRequestSchema,
  required: [],
};

export const UpdateBorrowerResponseSchema = RegisterBorrowerResponseSchema;

export const DeleteBorrowerResponseSchema = RegisterBorrowerResponseSchema;

export const AuthenticateUserRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      example: "user@example.com",
    },

    password: {
      type: "string",
      example: "password123",
    },
  },
};

export const AuthenticateUserResponseSchema = {
  type: "object",
  required: ["jwtToken"],
  properties: {
    jwtToken: {
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0OTU4ZWMyLTJjOGYtNGUwYi1hNGY0LWI1NTdlMjIwMDU4NyIsIm5hbWUiOiJBbGljZSBTbWl0aCIsImVtYWlsIjoiYWxpY2Uuc21pdGhAZXhhbXBsZS5jb20iLCJyZWdpc3RlckRhdGUiOiIyMDIzLTAxLTE1VDEwOjAwOjAwLjAwMFoiLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTI2VDE3OjAwOjE4LjgwOVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTI2VDE3OjAwOjE4LjgwOVoiLCJpYXQiOjE3Mjk5NjYyNDcsImV4cCI6MTcyOTk2OTg0N30.cq-kv_m8Wp3ZTd7UzY-AlGe5wk6E711CthIkCKm7LRY",
    },
  },
};

export const ListCallerBorrowingProcessesResponseSchema = {
  type: "object",
  required: ["borrowingProcesses"],
  properties: {
    borrowingProcesses: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "669ebab8-3364-412e-a02b-183d8429a61d",
          },
          dueDate: {
            type: "string",
            format: "date-time",
            example: "2024-11-02T18:24:25.314Z",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-10-26T18:24:25.316Z",
          },
          "Book.title": {
            type: "string",
            example: "Fundamentals of C++",
          },
          "Book.author": {
            type: "string",
            example: "Linus Torvalds",
          },
          "Book.availableQuantity": {
            type: "integer",
            format: "int32",
            example: "2",
          },
        },
      },
      example: [
        {
          id: "669ebab8-3364-412e-a02b-183d8429a61d",
          dueDate: "2024-11-02T18:24:25.314Z",
          createdAt: "2024-10-26T18:24:25.316Z",
          "Book.title": "Fundamentals of C++",
          "Book.author": "Linus Torvalds",
          "Book.availableQuantity": 2,
        },
      ],
    },
  },
};
