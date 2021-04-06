const output = document.querySelector('#output');
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const radioInput = document.querySelectorAll('[name="radio"]')
const submitBtn = document.querySelector('#submitBtn')
let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.hasRead = hasRead
}

function addBookToLibrary(book) {
    myLibrary.push(book);
  // do stuff here
}

function displayBooks() {
    output.textContent = '';
    myLibrary.forEach(function(book) {
        var para = document.createElement('p');
        para.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Has the user read the book: ${book.hasRead}`;
        output.appendChild(para);
    }   );
}

function radioSelection()   {
    radioInput.forEach(btn => {
        if(btn.checked)    {
             read = btn.value
    }});
}

function clearFields()  {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

function createNewObject()   {
    let read;
    radioInput.forEach(btn => {
        if(btn.checked)    {
             read = btn.value
    }});
    let newAuthor = authorInput.value;
    let newTitle = titleInput.value;
    let newPages = pagesInput.value;
    const newBook = new Book(newTitle,newAuthor,newPages, read);
    addBookToLibrary(newBook);
    displayBooks();
    clearFields();
}

submitBtn.addEventListener('click' , createNewObject)

const bookOne = new Book('The Hobbit', 'Tolken', 298, 'Has Read');
const bookTwo = new Book('Dune', 'Herbert', 1298, 'Has Read');
addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
displayBooks();



