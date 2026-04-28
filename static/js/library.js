import { Book } from "./book.js";

/**
 * @class Library
 * @classdesc Manages collection of books with add/remove/display operations.
 */
class Library {
  constructor() {
    this._books = [];
  }

  /**
   * Initializes the library with a default set of books.
   * @returns {void}
   */
  init() {
    //initial set of books for display in the library.
    const BOOKS = [
      new Book("Moby Dick", "Herman Melville", 585),
      new Book("The Lord of the Flies", "William Golding", 224),
      new Book("The Catcher in the Rye", "J.D. Salinger", 277),
      new Book("The Great Gatsby", "F.Scott Fitzgerald", 180),
      new Book("To Kill a Mockingbird", "Harper Lee", 281),
      new Book("Pride and Prejudice", "Jane Austen", 328),
    ];

    this._books = BOOKS;
  }

  /**
   * Gets the list of books in the library.
   *
   * @returns {Book[]} List of books in the library.
   */
  get books() {
    return this._books;
  }

  /**
   * Assign a list of books to the library.
   *
   * @param {Book[]} book_arr - Array of book objects.
   * @returns {void}
   */
  set books(book_arr) {
    this._books = book_arr;
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
    this._books.push(book);
  }

  /**
   * Retrieves a book from the library by its id.
   *
   * @param {string} id - The id of the book
   * @returns {?Book} - The book, or null if not found
   */
  getBook(id) {
    return this._books.find((book) => book.id === id);
  }

  /**
   * Removes the provided book from the library.
   *
   * @param {Book} book - The book to remove.
   * @returns {void}
   */
  removeBook(book) {
    const index = this._books.indexOf(book);

    if (index === -1) {
      return;
    }

    this._books.splice(index, 1);
  }
}

export { Library };
