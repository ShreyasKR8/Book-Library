
const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector("dialog");
const confirmBtn = document.querySelector(".confirm-dialog-btn");
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

function displayBook() {
    let newBook = myLibrary[myLibrary.length - 1];

    let rowNo = document.createTextNode(`${newBook.id}`);
    let title = document.createTextNode(`${newBook.title}`);
    let author = document.createTextNode(`by ${newBook.author}`);
    let pages = document.createTextNode(`${newBook.pages} pages`);
    let hasRead = newBook.hasRead;

    /* cards */
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

    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add(`remove-card-${newBook.id}`);
    removeBookBtn.innerHTML = "Remove";
    removeBookBtn.addEventListener("click", () => {
        bookCards.removeChild(cardDiv);
    })
    cardDiv.appendChild(removeBookBtn);
    console.log(removeBookBtn)

    bookCards.appendChild(cardDiv);
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

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.querySelector("input[type=checkbox").checked;
    addBookToLibrary(title, author, pages, hasRead);
    
    dialog.close();
});