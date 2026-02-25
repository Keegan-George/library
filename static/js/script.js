const myLibrary = [];

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

    const bookContainer = document.querySelector(".book-container");

    for (let book of myLibrary) {
        let card = document.createElement("div");
        card.classList.add("card");
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
        author.textContent = book.author

        let pages = document.createElement("div");
        pages.classList.add("pages");

        let numPages = document.createElement("p");
        numPages.classList.add("num-pages");
        numPages.textContent = book.numPages;
        
        let pagesLabel = document.createElement("span");
        pagesLabel.classList.add("pages-label")
        pagesLabel.textContent = book.numPages === 1 ? "page" : "pages";

        let removeButton = document.createElement("button");
        removeButton.classList.add("btn", "remove");
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", () => {
            const bookToDelete = myLibrary.find(b => b.id === card.getAttribute("data-id"));
            const index_bookToDelete = myLibrary.indexOf(bookToDelete);
            myLibrary.splice(index_bookToDelete, 1);
            displayLibrary();
        });

        let readButton = document.createElement("button");
        readButton.classList.add("btn", "read-button");
        readButton.textContent = "not read";
        readButton.addEventListener("click", () => {
            book.toggleReadStatus();
            readButton.textContent = book.read ? "read" : "not read";
            readButton.classList.toggle("read");
        });

        pages.append(numPages, pagesLabel);
        bookInfo.append(title, author, pages);
        buttons.append(readButton, removeButton);
        card.append(bookInfo, buttons);
        bookContainer.appendChild(card);
    }
}

function clearLibrary() {
    const bookContainer = document.querySelector(".book-container");

    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild)
    }
}

const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.classList.toggle("visible");
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
