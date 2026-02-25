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
const READ_BUTTON_DISABLED_TEXT = "not read";

//book container
const bookContainer = document.querySelector(".book-container");

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


//book constructor
function Book(title, author, numPages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = false;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, numPages) {
    const book = new Book(title, author, numPages);
    myLibrary.push(book);
}

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
                    <p class="num-pages">${escapeHTML(book.numPages)}</p><span class="pages-label">${escapeHTML(book.numPages) === 1 ? "page" : "pages"}</span>
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

function clearLibrary() {
    bookContainer.innerHTML = "";
}

const addButton = document.querySelector(".add-button");
const form = document.querySelector(".book-form");

addButton.addEventListener("click", () => {
    form.classList.toggle(CLASS_VISIBLE);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numPages = Number(document.querySelector("#numPages").value);

    form.reset();

    addBookToLibrary(title, author, numPages);

    displayLibrary();
});

function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}
