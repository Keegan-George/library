import { Library } from "./library.js";

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

//DOM elements
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageCountInput = document.querySelector("#page-count");
const bookContainer = document.querySelector(".book-container");

//library
const library = new Library();

/**
 * @module LibraryDisplay
 *
 * @description Handles all DOM display logic for the library app.
 */
const LibraryDisplay = (() => {
  library.init();
  displayLibrary();

  /**
   * Clears custom validation messages when the user begins typing.
   *
   * @private
   * @returns {void}
   */
  [titleInput, authorInput, pageCountInput].forEach((input) => {
    input.addEventListener("input", () => input.setCustomValidity(""));
  });

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
      targetElement.textContent = book.read
        ? READ_BUTTON_ENABLED_TEXT
        : READ_BUTTON_DISABLED_TEXT;
      targetElement.classList.toggle(CLASS_READ);
    } else if (targetElement.classList.contains(CLASS_REMOVE_BUTTON)) {
      library.removeBook(book);
      displayLibrary();
    }
  });

  /**
   * Displays all books in the library to the DOM.
   * Clears the existing display and recreates each book card.
   *
   * @private
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
   * @private
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

    const title = titleInput.value;
    const author = authorInput.value;
    const pageCount = Number(pageCountInput.value);

    if (!validateForm()) {
      return;
    }

    form.reset();

    library.addBook(title, author, pageCount);

    displayLibrary();
  });

  /**
   * Escapes HTML special characters to prevent XSS injection.
   *
   * @private
   * @param {string} str - The string to sanitize.
   * @returns {string} The sanitized string with HTML entities encoded.
   */
  function escapeHTML(str) {
    return str.replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  }

  /**
   * Validates the add‑book form.
   * Applies custom error messages and reports the first invalid field.
   *
   * @private
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  function validateForm() {
    const formInputs = [
      { input: titleInput, message: "The title must be filled!" },
      { input: authorInput, message: "The author name must be filled!" },
      { input: pageCountInput, message: "Page count must be greater than 0!" },
    ];

    for (const formInput of formInputs) {
      const { input, message } = formInput;

      input.setCustomValidity("");

      if (!input.checkValidity()) {
        input.setCustomValidity(message);
        input.reportValidity();
        return false;
      }
    }

    return true;
  }
})();
