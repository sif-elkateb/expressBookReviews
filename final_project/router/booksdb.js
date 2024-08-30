let books = {
  1: { author: "Chinua Achebe", title: "Things Fall Apart", reviews: {} },
  2: { author: "Hans Christian Andersen", title: "Fairy tales", reviews: {} },
  3: { author: "Dante Alighieri", title: "The Divine Comedy", reviews: {} },
  4: { author: "Unknown", title: "The Epic Of Gilgamesh", reviews: {} },
  5: { author: "Unknown", title: "The Book Of Job", reviews: {} },
  6: { author: "Unknown", title: "One Thousand and One Nights", reviews: {} },
  7: { author: "Unknown", title: "Nj\u00e1l's Saga", reviews: {} },
  8: { author: "Jane Austen", title: "Pride and Prejudice", reviews: {} },
  9: {
    author: "Honor\u00e9 de Balzac",
    title: "Le P\u00e8re Goriot",
    reviews: {},
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
};

function getAllBooks() {
  return new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject("No books found");
    }
  });
}

function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });
}

function getBookByAuthor(author) {
  return new Promise((resolve, reject) => {
    let book = Object.values(books).find((book) => book.author === author);
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });
}

function getBookByTitle(title) {
  return new Promise((resolve, reject) => {
    let book = Object.values(books).find((book) => book.title === title);
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });
}

function getReviewsByISBN(isbn) {
  return new Promise((resolve, reject) => {
    if (books[isbn].reviews) {
      resolve(books[isbn].reviews);
    } else {
      reject("No reviews found");
    }
  });
}

module.exports = {
  books,
  getAllBooks,
  getBookByISBN,
  getBookByAuthor,
  getBookByTitle,
  getReviewsByISBN,
};
