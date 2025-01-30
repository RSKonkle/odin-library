// LIBRARY SCRIPT //
const myLibrary = [];
const catalog = document.querySelector(".catalog");

function Book(title, author, pages, read) { // object constructor function
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks(myLibrary); // Update book list after adding
}

function displayBooks(myLibrary) {
    catalog.innerHTML = ""; // Clear previous books before rendering new ones

    myLibrary.forEach((book) => {
        // Create variable for bookDisplay
        const bookDisplay = document.createElement("div");
        bookDisplay.classList.add("book-display");

        // Generate variables for book information (title, author, pages, read)
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("h4");
        const bookInfoWrap = document.createElement("div");
    
        bookInfoWrap.classList.add("bd-bw");
        const bookPages = document.createElement("p");
        const readWrap = document.createElement("div");
        readWrap.classList.add("read-wrap");

        const bookReadLabel = document.createElement("p");
        bookReadLabel.textContent = "Read:";
        const bookReadCheckbox = document.createElement("input");
        bookReadCheckbox.type = "checkbox";
        bookReadCheckbox.checked = book.read;

        // Add text content to newly created variables
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `Pages: ${book.pages}`;

        // Append checkbox elements inside readWrap
        readWrap.appendChild(bookReadLabel);
        readWrap.appendChild(bookReadCheckbox);

        // Append pages and read checkbox inside bookInfoWrap
        bookInfoWrap.appendChild(bookPages);
        bookInfoWrap.appendChild(readWrap);

        // Append all elements to parent bookDisplay
        bookDisplay.appendChild(bookTitle);
        bookDisplay.appendChild(bookAuthor);
        bookDisplay.appendChild(bookInfoWrap);

        // Append bookDisplay to catalog
        catalog.appendChild(bookDisplay);
    });
}

// Example books to test
addBookToLibrary("Book of Thunder", "Thor Odinson", 444, false)
addBookToLibrary("Book of Mischief", "Loki Laufeyson", 777, false);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 352, true)
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 256, true)
