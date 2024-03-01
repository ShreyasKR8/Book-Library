
const table = document.querySelector("tbody");
let bookId = 0;

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.id = ++bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function displayBook() {
    let newBook = myLibrary[myLibrary.length - 1];
    const newRow = table.insertRow();

    const newRowNo = newRow.insertCell();
    let rowNo = document.createTextNode(`${newBook.id}`);
    newRowNo.appendChild(rowNo);

    const newData1 = newRow.insertCell();
    let title = document.createTextNode(`${newBook.title}`);
    newData1.appendChild(title);
    
    const newData2 = newRow.insertCell();
    let author = document.createTextNode(`${newBook.author}`);
    newData2.appendChild(author);
    
    const newData3 = newRow.insertCell();
    let pages = document.createTextNode(`${newBook.pages}`);
    newData3.appendChild(pages);
    
    const newData4 = newRow.insertCell();
    let hasRead = document.createTextNode(`${newBook.hasRead}`);
    newData4.appendChild(hasRead);
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBook();
}

addBookToLibrary("The Hobbit", "J.R.R Tolkein", 295, "not read yet");
addBookToLibrary("A Game of Thrones", "George R R Martin", 694, "not read yet");
addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 400, "read");
addBookToLibrary("Swords of Destiny", "Andrzej Sapkowski", 455, "read");