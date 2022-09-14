let bookTitle;
let bookAuthor;
let saveBookBtn;
let newBookBtn;

if (window.location.pathname === "/mybooks") {
  bookTitle = document.querySelector("book-title");
  bookAuthor = document.querySelector(".book-author");
  saveBookBtn = document.querySelectior(".save-book");
  newBookBtn = document.querySelector(".new-book");
}

// const getBooks = () =>
//   fetch('/api/books', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
