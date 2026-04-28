/**
 * @class Book
 * @classdesc Represents a Book object with title, author, pages, and read status.
 *
 * @property {string} id - Unique identifier.
 * @property {string} title - Book title.
 * @property {string} author - Book author.
 * @property {number} pageCount - Number of pages.
 * @property {boolean} read - Read status.
 */
class Book {
  /**
   * Creates a new Book instance
   *
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {number} pageCount - The number of pages in the book.
   */
  constructor(title, author, pageCount) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = false;
  }

  /**
   * Toggles the read status of the book.
   *
   * @returns {void}
   */
  toggleReadStatus() {
    this.read = !this.read;
  }
}

export { Book };
