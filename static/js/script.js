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



