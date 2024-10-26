export const ListOverdueBorrowsResponseSchema = {
  type: "object",
  required: ["overdueBorrows"],
  properties: {
    overdueBorrows: {
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
            example: "2024-10-26T00:00:00.000Z",
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
          "User.name": {
            type: "string",
            example: "Bob Johnson",
          },
          "User.email": {
            type: "string",
            example: "bob.johnson@example.com",
          },
        },
      },
      example: [
        {
          id: "669ebab8-3364-412e-a02b-183d8429a61d",
          dueDate: "2024-10-26T00:00:00.000Z",
          createdAt: "2024-10-26T18:24:25.316Z",
          "Book.title": "Fundamentals of C++",
          "Book.author": "Linus Torvalds",
          "Book.availableQuantity": 2,
          "User.name": "Bob Johnson",
          "User.email": "bob.johnson@example.com",
        },
      ],
    },
  },
};

export const CheckoutBookResponseSchema = {
  type: "object",
  required: [
    "id",
    "status",
    "borrowerId",
    "dueDate",
    "updatedAt",
    "createdAt",
    "book",
  ],
  properties: {
    borrowingProcess: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "e299dcc7-ffa1-443a-bfbc-0f2d9cd8565e",
        },
        status: {
          type: "string",
          example: "borrowing-status-borrowed",
        },
        borrowerId: {
          type: "string",
          example: "602618d6-bdd0-4583-8619-f8cfaefbc96d",
        },
        dueDate: {
          type: "string",
          format: "date-time",
          example: "2024-11-02T20:14:04.048Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2024-10-26T20:14:04.051Z",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2024-10-26T20:14:04.051Z",
        },
        book: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "7ad427a8-a881-42a4-8eca-d6367cd12d42",
            },
            title: {
              type: "string",
              example: "Deep Learning with TensorFlow",
            },
            author: {
              type: "string",
              example: "Ada Lovelace",
            },
            isbn: {
              type: "string",
              example: "978-529-205-804-8",
            },
            availableQuantity: {
              type: "integer",
              format: "int32",
              example: "3",
            },
            shelfLocation: {
              type: "string",
              example: "top",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-10-26T17:00:18.781Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-10-26T20:10:41.377Z",
            },
          },
        },
      },
    },
  },
};

export const ReturnBookResponseSchema = CheckoutBookResponseSchema;
