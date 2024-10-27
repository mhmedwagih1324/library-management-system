# Library Management System

An open source API that manages & tracks books, borrowers & borrowing transactions in a library.

## Main Features

- Book Management:
    - Main CRUD operations.
    - Each book have the following info:
        - Title
        - Author
        - ISBN
        - Available Quantity
        - Shelf Location
- User Management:
    - Mainly focused on managing a borrower while still having the ADMIN role (who manages inserting & deleting and can update a borrowers info)
    - A borrower can read his info, update it, borrow a book, return one of his owned books & list his borrowed books.
- Borrowing Process Management:
    - A Borrowing Process is having a status from:
      - borrowing-status-borrowed
      - borrowing-status-returned
    - A Borrowing Process is having a default of borrowing duration `BORROWING_PROCESS_DEFAULT_PERIOD = 7 days`
    - A Borrowing Process is only deleted when a book or user is deleted (only done by ADMIN)
    - An ADMIN also can list overdue borrowing processes.

## Installation
- pull repo
- copy values from file `.env.sample` to file named `.env` 
- open terminal in the same directory of your pulled repo
- You can do one of the following:
  - run docker-compose through the following command:
    ```bash
    sudo docker-compose up --build // Your API is now running
    ```
  - Create DB on your own:
    - create your own DB container using the following command, (or create the DB with any method you want):
    ```bash
    sudo docker run --name new-pg-db -e POSTGRES_USER=dbadmin -e POSTGRES_PASSWORD=dbAdmin123 -e POSTGRES_DB=library_management_system -p 5431:5432 -d postgres:17.0
    ```
    - You should update this path in the repo `src/common/env-variables.js` to have the local connection string is the local connection string not the docker connection string (and of course comment the docker connection string).
    - You then run `npm run dev` to run the API

## Usage
You can call this API with any method you prefer but I preferred **postman** and included its exported collection containing all the info you need to test the API.
  - Make sure you're in the collections tab.
  - Click import and choose the file `Library-management-system.postman_collection.json` included in the repo 
  - Now all the requests are in new collection named `Library-management-system` (grouped by their related module)

Please note that the application's DB already starts with some template borrowers, books and an Admin, you can find their information at `src/database/seed.js`. You can authenticate any of them and call the API.
