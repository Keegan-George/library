//DOM class constants
const CLASS_CARD = "card";
const CLASS_BUTTON = "btn";
const CLASS_REMOVE_BUTTON = "remove-button";
const CLASS_READ_BUTTON = "read-button";
const CLASS_READ = "read";
const CLASS_VISIBLE = "visible";

//button labels
const REMOVE_BUTTON_TEXT = "remove";
const READ_BUTTON_ENABLED_TEXT = "read";
const READ_BUTTON_DISABLED_TEXT = "unread";


/**
 * Represents a Book object with title, author, pages, and read status.
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

/**
 * Represents a Library
 */
class Library {
    books = [];
    constructor() { }

    /**
     * Gets the list of books in the library.
     * 
     * @returns {Book[]} List of books in the library.
     */
    get books() {
        return this.books;
    };

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
     * @returns {Book} - The book
     */
    getBook(id) {
        return this.books.find(book => book.id === id);
    }

    /**
     * Removes the provided book from the library.
     * 
     * @param {Book} book - The book to remove.
     * @returns {void}
     */
    removeBook(book) {
        const index = this.books.indexOf(book);

        if (index === -1) { return; }

        this.books.splice(index, 1);
    }
}

//library
const library = new Library();

//book container
const bookContainer = document.querySelector(".book-container");

const LibraryDisplay = (() => {
    /**
     * Initializes the library with a default set of books.
     * Displays the library in the DOM.
     * @returns {void} 
     */
    function init() {
        //default set of books for display in library
        const BOOKS = [
            new Book("Moby Dick", "Herman Melville", 585),
            new Book("The Lord of the Flies", "William Golding", 224),
            new Book("The Catcher in the Rye", "J.D. Salinger", 277),
            new Book("The Great Gatsby", "F.Scott Fitzgerald", 180),
            new Book("To Kill a Mockingbird", "Harper Lee", 281),
            new Book("Pride and Prejudice", "Jane Austen", 328),
        ]
        library.books = BOOKS;
        displayLibrary();
    }
    init();

    /**
     * Handles click events inside the book container.
     * Detects whether the user clicked a read-toggle button or a remove button,
     * updates the corresponding book, and refreshes the display if needed.
     *
     * @param {MouseEvent} event - The click event.
     * @returns {void}
     */
    bookContainer.addEventListener("click", (event) => {
        const targetElement = event.target;
        const card = targetElement.closest(`.${CLASS_CARD}`);
        if (!card) return;

        const cardId = card.getAttribute("data-id");
        const book = library.getBook(cardId);

        if (targetElement.classList.contains(CLASS_READ_BUTTON)) {
            book.toggleReadStatus();
            targetElement.textContent = book.read ? READ_BUTTON_ENABLED_TEXT : READ_BUTTON_DISABLED_TEXT;
            targetElement.classList.toggle(CLASS_READ);
        }

        else if (targetElement.classList.contains(CLASS_REMOVE_BUTTON)) {
            library.removeBook(book);
            displayLibrary();
        }
    });

    /**
     * Displays all books in the library to the DOM.
     * Clears the existing display and recreates each book card.
     *
     * @returns {void}
     */
    function displayLibrary() {
        clearLibrary();

        for (let book of library.books) {
            let card = document.createElement("div");
            card.classList.add(CLASS_CARD);
            card.setAttribute("data-id", book.id);

            card.innerHTML = `
            <div class="book-info">
                <h3 class="title">${escapeHTML(book.title)}</h3>
                <p class="author">${escapeHTML(book.author)}</p>
                <div class="pages">
                    <p class="num-pages">${book.pageCount}</p><span class="pages-label">${book.pageCount === 1 ? "page" : "pages"}</span>
                </div>
            </div>

            <div class="buttons">
                <button class="${CLASS_BUTTON} ${CLASS_READ_BUTTON} ${book.read ? CLASS_READ : ""}">${book.read ? READ_BUTTON_ENABLED_TEXT : READ_BUTTON_DISABLED_TEXT}</button>
                <button class="${CLASS_BUTTON} ${CLASS_REMOVE_BUTTON}">${REMOVE_BUTTON_TEXT}</button>
            </div>
        `;

            bookContainer.appendChild(card);
        }
    }

    /**
     * Removes all books from the DOM.
     *
     * @returns {void}
     */
    function clearLibrary() {
        bookContainer.innerHTML = "";
    }

    const addButton = document.querySelector(".add-button");
    const form = document.querySelector(".book-form");

    addButton.addEventListener("click", () => {
        form.classList.toggle(CLASS_VISIBLE);
    });

    /**
     * Handles the book form submission.
     * Prevents page reload on form submission, extracts form values, 
     * adds a new book, resets the form, and updates the displayed library.
     *
     * @param {SubmitEvent} event - The form submission event.
     * @returns {void}
     */
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pageCount = Number(document.querySelector("#page-count").value);

        form.reset();

        library.addBook(title, author, pageCount);

        displayLibrary();
    });


    /**
     * Escapes HTML special characters to prevent XSS injection.
     *
     * @param {string} str - The string to sanitize.
     * @returns {string} The sanitized string with HTML entities encoded.
     */
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char]));
    }
})();