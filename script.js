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
}

function displayBooks() {
    output.textContent = '';
    myLibrary.forEach(function(book) {
        const para = document.createElement('p');
        const readBtn = document.createElement('button');
        readBtn.textContent = 'read';
        para.textContent = `Title: ${book.title}  
        Author: ${book.author} 
        Pages: ${book.pages}        
        Has the user read the book: ${book.hasRead}`;
        output.appendChild(para);
        console.log(para)
    }   );
}

function clearFields()  {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}
//when the submit button is clicked, this takes all the values and puts them into an object, it then pushes that object to the myLibrary array, then updates the view field with the new book being displayed and clears out the form.
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




