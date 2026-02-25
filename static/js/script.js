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

function Book(title, author, numPages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = undefined;
}

Book.prototype.toggleReadStatus = function () {
    this.read = this.read ? false : true;
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

        let bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");

        let buttons = document.createElement("div");
        buttons.classList.add("buttons")

        let title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = book.title;

        let author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;

        let pages = document.createElement("div");
        pages.classList.add("pages");

        let numPages = document.createElement("p");
        numPages.classList.add("num-pages");
        numPages.textContent = book.numPages;

        let pagesLabel = document.createElement("span");
        pagesLabel.classList.add("pages-label")
        pagesLabel.textContent = book.numPages === 1 ? "page" : "pages";

        let removeButton = document.createElement("button");
        removeButton.classList.add(CLASS_BUTTON, CLASS_REMOVE_BUTTON);
        removeButton.textContent = REMOVE_BUTTON_TEXT;

        let readButton = document.createElement("button");
        readButton.classList.add(CLASS_BUTTON, CLASS_READ_BUTTON);
        readButton.textContent = READ_BUTTON_DISABLED_TEXT;

        pages.append(numPages, pagesLabel);
        bookInfo.append(title, author, pages);
        buttons.append(readButton, removeButton);
        card.append(bookInfo, buttons);
        bookContainer.appendChild(card);
    }
}

function clearLibrary() {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild)
    }
}

const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.classList.toggle(CLASS_VISIBLE);
});

const bookForm = document.querySelector(".book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numPages = Number(document.querySelector("#numPages").value);

    bookForm.reset();

    addBookToLibrary(title, author, numPages);

    displayLibrary();
});
