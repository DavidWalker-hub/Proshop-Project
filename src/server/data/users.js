import bcrypt from "bcryptjs";

export const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Customer one",
    email: "customer1@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Customer two",
    email: "customer2@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
