const myLibrary = [];

//class constants
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

//book container
const bookContainer = document.querySelector(".book-container");

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
    const book = myLibrary.find(book => book.id === cardId)

    if (targetElement.classList.contains(CLASS_READ_BUTTON)) {
        book.toggleReadStatus();
        targetElement.textContent = book.read ? READ_BUTTON_ENABLED_TEXT : READ_BUTTON_DISABLED_TEXT;
        targetElement.classList.toggle(CLASS_READ);
    }

    else if (targetElement.classList.contains(CLASS_REMOVE_BUTTON)) {
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        displayLibrary();
    }
});


/**
 * Creates a new Book object and assigns it a unique ID.
 *
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pageCount - The number of pages in the book.
 */
function Book(title, author, pageCount) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = false;
}

/**
 * Toggles the read status of the book.
 *
 * @method
 * @returns {void}
 */
Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

/**
 * Creates a new Book object and adds it to the library.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {number} pageCount - The number of pages in the book.
 * @returns {void}
 */
function addBookToLibrary(title, author, pageCount) {
    const book = new Book(title, author, pageCount);
    myLibrary.push(book);
}

/**
 * Displays all books in the library to the DOM.
 * Clears the existing display and recreates each book card.
 *
 * @returns {void}
 */
function displayLibrary() {
    clearLibrary();

    for (let book of myLibrary) {
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
 * Removes all book from the DOM.
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

    addBookToLibrary(title, author, pageCount);

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
