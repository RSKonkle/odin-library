// LIBRARY SCRIPT //
let myLibrary = [];
const catalog = document.querySelector(".catalog");

// Rework into class, rather than object constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this._read = read;
        this.id = crypto.randomUUID(); // Unique ID
    }

    // Getter for read status
    get read() {
        return this._read ? "Read" : "Unread";
    }

    // Setter for read status
    set read(value) {
        if (typeof value === "boolean") {
            this._read = value; // Only update if it's true/false
        } else {
            console.log("Read status must be true/false");
        }
    }

    // Method to toggle read status
    toggleRead() {
        this._read = !this._read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks(); // Update book list after adding
}

function removeBook(bookId) {
    myLibrary = myLibrary.filter(book => {return book.id !== bookId });
    displayBooks(); // Refresh UI
}

function displayBooks() {
    catalog.innerHTML = ""; // Clear previous books before rendering new ones

    myLibrary.forEach((book) => {
        // Create variable for bookDisplay
        const bookDisplay = document.createElement("div");
        bookDisplay.classList.add("book-display");

        // Generate variables for book information (title, author, pages, read)
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("h4");
        const titleAuthorWrap = document.createElement("div");
        const bookInfoWrap = document.createElement("div");
    
        bookInfoWrap.classList.add("bd-bw");
        const bookPages = document.createElement("p");
        const deleteX = document.createElement("span");
        deleteX.classList.add("delete-x");

        const readWrap = document.createElement("div");
        readWrap.classList.add("read-wrap");

        const bookReadLabel = document.createElement("p");
        bookReadLabel.textContent = "Read:";
        const bookReadCheckbox = document.createElement("input");
        bookReadCheckbox.type = "checkbox";
        bookReadCheckbox.checked = book.read === "Read";

        // Add event listener to update stored "read" status when checkbox is clicked
        bookReadCheckbox.addEventListener("change", () => {
            book.toggleRead();
        });

        // Add text content to newly created variables
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `Pages: ${book.pages}`;
        deleteX.innerHTML = "&times;"
        deleteX.addEventListener("click", () => removeBook(book.id));

        // Append checkbox elements inside readWrap
        readWrap.appendChild(bookReadLabel);
        readWrap.appendChild(bookReadCheckbox);

        // Append pages and read checkbox inside bookInfoWrap
        bookInfoWrap.appendChild(bookPages);
        bookInfoWrap.appendChild(readWrap);
        bookInfoWrap.appendChild(deleteX);
        titleAuthorWrap.appendChild(bookTitle);
        titleAuthorWrap.appendChild(bookAuthor);

        // Append all elements to parent bookDisplay
        bookDisplay.appendChild(titleAuthorWrap);
        bookDisplay.appendChild(bookInfoWrap);

        // Append bookDisplay to catalog
        catalog.appendChild(bookDisplay);
    });
}

// Generate variables for button and form
const showFormBtn = document.getElementById("showFormBtn");
const bookForm = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

// When the button is clicked, toggle the form visibility
showFormBtn.addEventListener("click", () => {
    bookForm.style.display = bookForm.style.display === "none" ? "grid" : "none";
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Get user input values
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value.trim();
    const read = readInput.checked; // Checkbox returns true/false value

    if (title === "" || author === "" || pages === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Add book to library and reset/close form
    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    bookForm.style.display = "none";
});
    
// Example books to test
addBookToLibrary("Book of Thunder", "Thor Odinson", 444, false)
addBookToLibrary("Book of Mischief", "Loki Laufeyson", 777, false)
addBookToLibrary("The Hunger Games", "Suzanne Collins", 352, true)
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 256, true)
