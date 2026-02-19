const myLibrary = [];

function Book(title, author, numPages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = false;
}

function addBookToLibrary(title, author, numPages) {
    let book = new Book(title, author, numPages);
    myLibrary.push(book)
}

function displayBook() {
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


const addButton = document.querySelector(".btn.add");

addButton.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.style.visibility = form.style.visibility === "" ? "visible" : "";
});
