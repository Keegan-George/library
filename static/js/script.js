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
    let book = new Book(title, author, numPages);
    myLibrary.push(book);
}

function displayLibrary() {
    clearLibrary();

    const bookContainer = document.querySelector(".book-container");

    for (let book of myLibrary) {
        let card = document.createElement("div");
        let bookInfo = document.createElement("div");
        let buttons = document.createElement("div");
        let title = document.createElement("h3");
        let author = document.createElement("p");
        let pages = document.createElement("div");
        let numPages = document.createElement("p");
        let pagesLabel = document.createElement("span");
        let removeButton = document.createElement("button");
        let readButton = document.createElement("button");

        card.classList.add("card");
        card.setAttribute("data-id", book.id);

        bookInfo.classList.add("book-info");
        buttons.classList.add("buttons")
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        numPages.classList.add("num-pages");
        pagesLabel.classList.add("pages-label")

        removeButton.classList.add("btn", "remove");
        removeButton.addEventListener("click", () => {
            const bookToDelete = myLibrary.find(b => b.id === card.getAttribute("data-id"));
            const index_bookToDelete = myLibrary.indexOf(bookToDelete);
            myLibrary.splice(index_bookToDelete, 1);
            displayLibrary();
        });

        readButton.classList.add("btn", "read-button");
        readButton.addEventListener("click", () => {
            book.toggleReadStatus();
            readButton.textContent = book.read ? "read" : "not read";
            readButton.classList.toggle("read");
        });

        title.textContent = book.title;
        author.textContent = book.author
        numPages.textContent = book.numPages;
        pagesLabel.textContent = book.numPages === 1 ? "page" : "pages";
        removeButton.textContent = "remove";
        readButton.textContent = "not read";

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
    form.style.visibility = form.style.visibility === "" ? "visible" : "";
});

const bookForm = document.querySelector(".book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    numPages = Number(document.querySelector("#numPages").value);

    addBookToLibrary(title, author, numPages);

    displayLibrary();
});
