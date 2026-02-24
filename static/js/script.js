const myLibrary = [];

function Book(title, author, numPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = this.read === "yes" ? "no" : "yes";
}

function addBookToLibrary(title, author, numPages, read) {
    let book = new Book(title, author, numPages, read);
    myLibrary.push(book)
}

function displayLibrary() {
    clearLibrary();

    const bookContainer = document.querySelector(".book-container");

    for (let book of myLibrary) {
        let card = document.createElement("div");
        let bookInfo = document.createElement("div");
        let buttons = document.createElement("buttons");
        let titleText = document.createElement("h3");
        let authorText = document.createElement("p");
        let pagesText = document.createElement("p");
        let readText = document.createElement("p");
        let removeButton = document.createElement("button");
        let readButton = document.createElement("button");

        card.classList.add("card");
        card.setAttribute("data-id", book.id);

        bookInfo.classList.add("book-info");
        buttons.classList.add("buttons")
        titleText.classList.add("title");
        authorText.classList.add("author");
        pagesText.classList.add("pages");
        readText.classList.add("read");

        removeButton.classList.add("btn", "delete");
        removeButton.addEventListener("click", () => {
            const bookToDelete = myLibrary.find(b => b.id === card.getAttribute("data-id"));
            const index_bookToDelete = myLibrary.indexOf(bookToDelete);
            myLibrary.splice(index_bookToDelete, 1);
            displayLibrary();
        });

        readButton.classList.add("btn", "toggle-read");
        readButton.addEventListener("click", () => {
            book.toggleReadStatus();
            readText.textContent = book.read;
        });

        titleText.textContent = book.title;
        authorText.textContent = book.author
        pagesText.textContent = book.numPages;
        readText.textContent = book.read;
        removeButton.textContent = "remove";
        readButton.textContent = "read";

        bookInfo.append(titleText, authorText, pagesText);
        buttons.append(readText, removeButton, readButton)
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

const addButton = document.querySelector(".btn.add");

addButton.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.style.visibility = form.style.visibility === "" ? "visible" : "";
});

const bookForm = document.querySelector(".book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    numPages = document.querySelector("#numPages").value;
    read = document.querySelector("#read").checked ? "yes" : "no";

    addBookToLibrary(title, author, numPages, read);

    displayLibrary();
});
