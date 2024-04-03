const modal = document.querySelector(".modalChild");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btnClose");
const openModalBtn = document.querySelector(".addBookBtn");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const booksGrid = document.getElementById("books");
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const checkboxRead = document.getElementById("read");
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
openModalBtn.addEventListener("click", openModal);

let submit = document.getElementById("addBook");
submit.addEventListener("click", () =>
  addBook(title.value, author.value, pages.value, checkboxRead.checked)
);

class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    let titles = title.replaceAll('"', "");
    this.books = this.books.filter((book) => book.title != titles);
    updateBooksGrid();
  }

  getBook(title) {
    let titles = title.replaceAll('"', "");
    const book = this.books.find((book) => book.title === titles);
    book.read = !book.read;
    console.log(book);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}
const library = new Library();

const addBook = (author, title, pages, read) => {
  console.log(author, title, pages);
  const newBook = new Book(author, title, pages, read);
  if (library.isInLibrary(newBook)) {
    alert("This book already exists in your library");
    return;
  }
  resetBooksGrid();

  library.addBook(newBook);
  library.books.map((book) => {
    createBookCard(book);
  });
};

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    createBookCard(book);
  }
};
const resetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  readBtn.addEventListener("click", () => {
    library.getBook(title.textContent);
    updateBooksGrid();
  });
  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");
  removeBtn.addEventListener("click", () =>
    library.removeBook(title.textContent)
  );

  if (book.read) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-light-red");
  }

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  booksGrid.appendChild(bookCard);
};
