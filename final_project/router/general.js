const express = require("express");
let {
  books,
  getAllBooks,
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
  getReviewsByISBN,
} = require("./booksdb.js");
const { checkInput } = require("./auth_users.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  const { success, message } = checkInput(username, password);
  if (!success) {
    return res.status(400).json({ message });
  }
  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
  //Write your code here
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    let allBooks = await getAllBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(404).json({ message: "No books found" });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    let book = await getBookByISBN(req.params.isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  try {
    let book = await getBookByAuthor(req.params.author);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  //Write your code here
  try {
    let book = await getBookByTitle(req.params.title);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  //Write your code here
  try {
    let reviews = await getReviewsByISBN(req.params.isbn);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(404).json({ message: "No reviews found" });
  }
});

module.exports.general = public_users;
