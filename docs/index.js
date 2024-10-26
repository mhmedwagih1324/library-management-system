import { endpoints } from "./modules/index.js";

const swaggerDocument = {
  openapi: "3.1.0",

  info: {
    title: "Library Management System API",
    description: "A simple API for managing books and borrowers in a library",
    version: "1.0.0",
  },

  host: "localhost:5000",
  basePath: "/api",
  schemes: ["http"],
  tags: [
    {
      name: "Books",
      description: "Books Endpoints",
    },
    {
      name: "Users",
      description: "Users Endpoints",
    },
    {
      name: "Borrowing-Processes",
      description: "Borrowing Processes Endpoints",
    },
  ],

  paths: endpoints,
};

export default swaggerDocument;
