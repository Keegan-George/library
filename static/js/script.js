const myLibrary = [];

function Book(title, author, numPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
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
        let titleText = document.createElement("h3");
        let authorText = document.createElement("p");
        let numPagesText = document.createElement("p");
        let readText = document.createElement("p");

        card.classList.add("card");

        titleText.textContent = book.title;
        authorText.textContent = book.author
        numPagesText.textContent = book.numPages;
        readText.textContent = book.read;

        card.appendChild(titleText);
        card.appendChild(authorText);
        card.appendChild(numPagesText);
        card.appendChild(readText);

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

const submitButton = document.querySelector(".btn.submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    numPages = document.querySelector("numPages");
    read = document.querySelector("#read").value;

    addBookToLibrary(title, author, numPages, read);

    displayLibrary();
});
