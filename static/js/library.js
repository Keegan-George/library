import { Book } from "./book.js";

/**
 * @class Library
 * @classdesc Manages collection of books with add/remove/display operations.
 */
class Library {
  books = [];
  constructor() {}

  /**
   * Gets the list of books in the library.
   *
   * @returns {Book[]} List of books in the library.
   */
  get books() {
    return this.books;
  }

  /**
   * Assign a list of books to the library.
   *
   * @param {Book[]} book_arr - Array of book objects.
   * @returns {void}
   */
  set books(book_arr) {
    this.books = book_arr;
  }

  /**
   * Creates a new Book and adds it to the library.
   *
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {number} pageCount - The number of pages in the book.
   * @returns {void}
   */
  addBook(title, author, pageCount) {
    const book = new Book(title, author, pageCount);
    this.books.push(book);
  }

  /**
   * Retrieves a book from the library by its id.
   *
   * @param {string} id - The id of the book
   * @returns {?Book} - The book, or null if not found
   */
  getBook(id) {
    return this.books.find((book) => book.id === id);
  }

  /**
   * Removes the provided book from the library.
   *
   * @param {Book} book - The book to remove.
   * @returns {void}
   */
  removeBook(book) {
    const index = this.books.indexOf(book);

    if (index === -1) {
      return;
    }

    this.books.splice(index, 1);
  }
}

export { Library };
