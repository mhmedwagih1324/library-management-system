import { Book, User } from "../api/models/index.js";

const seedDatabase = async () => {
  const booksCount = await Book.count();
  const usersCount = await User.count();

  if (booksCount === 0) {
    const seedBooks = [
      {
        title: "fundamentals of c++",
        author: "Leonardo",
        isbn: "978-120-722-914-8",
      },
      {
        title: "Deep Learning with TensorFlow",
        author: "Leonardo",
        isbn: "978-924-381-872-3",
      },
      {
        title: "Deep Learning with TensorFlow",
        author: "Ada Lovelace",
        isbn: "978-529-205-804-8",
      },
      {
        title: "Data Structures and Algorithms",
        author: "Leonardo",
        isbn: "978-610-428-775-1",
      },
      {
        title: "Data Structures and Algorithms",
        author: "Grace Hopper",
        isbn: "978-011-774-914-1",
      },
      {
        title: "Fundamentals of C++",
        author: "Linus Torvalds",
        isbn: "978-727-369-697-5",
      },
    ];

    await Book.bulkCreate(seedBooks);
  }

  if (usersCount === 0) {
    const seedUsers = [
      {
        name: "Alice Smith",
        email: "alice.smith@example.com",
        registerDate: "2023-01-15T10:00:00Z",
        role: "admin",
        password: "hashed_password_1",
      },
      {
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        registerDate: "2023-02-20T14:30:00Z",
        role: "borrower",
        password: "hashed_password_2",
      },
      {
        name: "Carol Williams",
        email: "carol.williams@example.com",
        registerDate: "2023-03-10T09:15:00Z",
        role: "borrower",
        password: "hashed_password_3",
      },
      {
        name: "David Brown",
        email: "david.brown@example.com",
        registerDate: "2023-04-05T12:45:00Z",
        role: "borrower",
        password: "hashed_password_4",
      },
      {
        name: "Emma Davis",
        email: "emma.davis@example.com",
        registerDate: "2023-05-12T11:20:00Z",
        role: "borrower",
        password: "hashed_password_5",
      },
      {
        name: "Frank Miller",
        email: "frank.miller@example.com",
        registerDate: "2023-06-18T08:30:00Z",
        role: "borrower",
        password: "hashed_password_6",
      },
      {
        name: "Grace Wilson",
        email: "grace.wilson@example.com",
        registerDate: "2023-07-25T15:10:00Z",
        role: "borrower",
        password: "hashed_password_7",
      },
      {
        name: "Henry Taylor",
        email: "henry.taylor@example.com",
        registerDate: "2023-08-30T13:55:00Z",
        role: "borrower",
        password: "hashed_password_8",
      },
      {
        name: "Isabella Thomas",
        email: "isabella.thomas@example.com",
        registerDate: "2023-09-15T10:25:00Z",
        role: "borrower",
        password: "hashed_password_9",
      },
      {
        name: "James Jackson",
        email: "james.jackson@example.com",
        registerDate: "2023-10-01T16:40:00Z",
        role: "borrower",
        password: "hashed_password_10",
      },
    ];

    await User.bulkCreate(seedUsers);
  }
};

export default seedDatabase;
