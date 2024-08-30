const express = require("express");
const jwt = require("jsonwebtoken");
let { books } = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "user123", password: "pass123" },
  { username: "johnDoe", password: "johnPass" },
  { username: "janeSmith", password: "janePass" },
  { username: "randomUser", password: "randomPass" },
  { username: "testUser1", password: "testPass1" },
  { username: "alphaBeta", password: "alphaPass" },
  { username: "gammaDelta", password: "gammaPass" },
  { username: "seif", password: "1234" },
];

const isValid = (username) => {
  return users.some((user) => user.username === username);
};

const checkInput = (username, password) => {
  if (!username && password) {
    return {
      success: false,
      message: "Invalid input please provide the username",
    };
  }
  if (!password && username) {
    return {
      success: false,
      message: "Invalid input please provide the password",
    };
  }
  if (!password && !username) {
    return {
      success: false,
      message: "Invalid input please provide both username and password",
    };
  }
  return {
    success: true,
    message: "Both the username and password are provided",
  };
};

const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  const { success, message } = checkInput(username, password);
  if (!success) {
    return res.status(400).json({ message });
  }
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign(
      { data: { username } },
      "fer34242213ws2e2dd893ev213",
      { expiresIn: "1h" }
    );
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.query;
  const username = req.user.username;

  if (!isbn || !review) {
    return res.status(400).json({ message: "Invalid input" });
  }
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[Number(isbn)].reviews[username] = review;
  return res.status(201).json({ message: "Review added successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (!isbn) {
    return res.status(400).json({ message: "Invalid input" });
  }
  if (!books[Number(isbn)]) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!books[Number(isbn)].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found" });
  }

  delete books[isbn].reviews[username];
  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.checkInput = checkInput;
