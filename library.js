
const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector("dialog");
const confirmDialogBtn = document.querySelector(".confirm-dialog-btn");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const bookCards = document.querySelector(".book-cards");

let bookId = 0;

const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.id = ++bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.changeReadStatus = function () {
    this.hasRead = !this.hasRead;
}

function displayBook() {
    let newBook = myLibrary[myLibrary.length - 1];

    let title = document.createTextNode(`${newBook.title}`);
    let author = document.createTextNode(`by ${newBook.author}`);
    let pages = document.createTextNode(`${newBook.pages} pages`);
    let hasRead = newBook.hasRead;

    /* cards */
    const bookCard = createBookCard(title, author, pages, hasRead, newBook);

    bookCards.appendChild(bookCard);
}

function createBookCard(title, author, pages, hasRead, newBook) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const imgEl = document.createElement("img");
    cardDiv.appendChild(imgEl);

    const titleEl = document.createElement("h4");
    titleEl.textContent = title.textContent;
    cardDiv.appendChild(titleEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = author.textContent;
    cardDiv.appendChild(authorEl);

    const pagesEl = document.createElement("p");
    pagesEl.textContent = pages.textContent;
    cardDiv.appendChild(pagesEl);

    const hasReadDiv = document.createElement("div");
    hasReadDiv.classList.add("read-check-div");
    const hasReadInput = document.createElement("input");
    hasReadInput.setAttribute("type", "checkbox");
    hasReadInput.setAttribute("id", `read-check-${newBook.id}`);
    const hasReadLabel = document.createElement("label");
    hasReadLabel.setAttribute("for", `read-check-${newBook.id}`);
    hasReadInput.checked = hasRead;
    hasReadLabel.textContent = "Read";
    hasReadDiv.appendChild(hasReadLabel);
    hasReadDiv.appendChild(hasReadInput);
    cardDiv.appendChild(hasReadDiv);
    // change read status
    hasReadInput.addEventListener("change", () => {
        newBook.changeReadStatus();
    });
    console.log(myLibrary);

    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add(`remove-card-${newBook.id}`);
    removeBookBtn.setAttribute("data-book-id", `${myLibrary.length - 1}`);
    console.log(removeBookBtn);
    removeBookBtn.innerHTML = "Remove";
    removeBookBtn.addEventListener("click", (event) => {
        bookCards.removeChild(cardDiv);
        deleteBookFromLibrary(event.target);
    });
    cardDiv.appendChild(removeBookBtn);

    return cardDiv;
}

function deleteBookFromLibrary(removeBookBtn) {
    let bookId = removeBookBtn.getAttribute("data-book-id");
    myLibrary.splice(bookId, 1);
}

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);

    myLibrary.push(newBook);
    displayBook();
}

addBookToLibrary("The Hobbit", "J.R.R Tolkein", 295, false);
// addBookToLibrary("A Game of Thrones", "George R R Martin", 694, true);
// addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 400, false);
// addBookToLibrary("Swords of Destiny", "Andrzej Sapkowski", 455, true);

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

confirmDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.querySelector("input[type=checkbox").checked;
    addBookToLibrary(title, author, pages, hasRead);
    
    dialog.close();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})