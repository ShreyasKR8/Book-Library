//Get elements
const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector("dialog");
const bookForm = document.querySelector(".book-form");
const confirmDialogBtn = document.querySelector(".confirm-dialog-btn");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const bookCards = document.querySelector(".book-cards");

let bookID = 0;

const myLibrary = [];

function Book(title, author, pages, hasRead, imgURL) {
    this.id = ++bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.imgURL = imgURL;
}

Book.prototype.changeReadStatus = function () {
    this.hasRead = !this.hasRead;
}

function displayBook() {
    let newBook = myLibrary[myLibrary.length - 1];

    let bookID = newBook.bookID;
    let title = newBook.title
    let author = newBook.author
    let pages = newBook.pages
    let hasRead = newBook.hasRead;
    let imgURL = newBook.imgURL;

    /* cards */
    const bookCard = createBookCard(bookID, title, author, pages, hasRead, imgURL);

    bookCards.appendChild(bookCard);
}

function createBookCard(bookID, bookTitle, bookAuthor, bookPages, hasReadBook, bookImgURL) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const imgEl = document.createElement("img");
    if(bookImgURL) 
    {
        imgEl.setAttribute("src", `${bookImgURL}`);
    }
    else
    {
        imgEl.setAttribute("src", "images/book-icon.png");
    }
    cardDiv.appendChild(imgEl);

    const titleEl = document.createElement("h4");
    titleEl.textContent = bookTitle;
    cardDiv.appendChild(titleEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = "by " + bookAuthor;
    cardDiv.appendChild(authorEl);

    const pagesEl = document.createElement("p");
    pagesEl.textContent = bookPages + " pages";
    cardDiv.appendChild(pagesEl);

    const hasReadDiv = document.createElement("div");
    hasReadDiv.classList.add("read-check-div");
    const hasReadInput = document.createElement("input");
    hasReadInput.setAttribute("type", "checkbox");
    hasReadInput.setAttribute("id", `read-check-${bookID}`);
    const hasReadLabel = document.createElement("label");
    hasReadLabel.setAttribute("for", `read-check-${bookID}`);
    hasReadInput.checked = hasReadBook;
    hasReadLabel.textContent = "Read";
    hasReadDiv.appendChild(hasReadLabel);
    hasReadDiv.appendChild(hasReadInput);
    cardDiv.appendChild(hasReadDiv);
    // change read status
    hasReadInput.addEventListener("change", () => {
        newBook.changeReadStatus();
    });

    const removeBookBtn = document.createElement("button");
    removeBookBtn.setAttribute("data-book-id", `${myLibrary.length - 1}`);
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

function addBookToLibrary(title, author, pages, hasRead, imgURL) {
    const newBook = new Book(title, author, pages, hasRead, imgURL);

    myLibrary.push(newBook);
    displayBook();
}

// addBookToLibrary("The Hobbit", "J.R.R Tolkein", 295, false, "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907.jpg");
addBookToLibrary("A Game of Thrones", "George R R Martin", 694, true, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkmk8Bq5po0bxr1NZCkmXLz1YXGH6d4SFqruc2GOsyuwGYR0dw");
// addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 400, false, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1529591917i/40603587.jpg");
// addBookToLibrary("Swords of Destiny", "Andrzej Sapkowski", 455, true, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1671660198i/25454056.jpg");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

confirmDialogBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.querySelector("input[type=checkbox]").checked;
    const imgURL = document.getElementById("img-url").value;
    addBookToLibrary(title, author, pages, hasRead, imgURL);
    bookForm.reset();
    dialog.close();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})