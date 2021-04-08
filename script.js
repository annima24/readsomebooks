const output = document.querySelector('#output');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const radioInput = document.querySelectorAll('[name="radio"]');
const submitBtn = document.querySelector('#submitBtn');
const entryForm = document.querySelector('#entryForm');
const addBookBtn = document.querySelector('#addBook');
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

function deleteBook(removeBtn)   {
    myLibrary.splice(removeBtn.dataset.remove, 1), displayBooks()
}
function displayForm()  {
    if (entryForm.style.display === '') {
        entryForm.style.display = 'none'
    } else if (entryForm.style.display === 'none') {
        entryForm.style.display = ''
    } 
}

function createBookCard(book, i) {
    
    const para = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    
    para.setAttribute('data-set', i)
    para.innerText = `Title: ${book.title}  
    Author: ${book.author} 
    Pages: ${book.pages}        
    Completed: ${book.hasRead}`;
    
    readBtn.setAttribute('class', 'read')
    readBtn.textContent = 'read';
    readBtn.setAttribute('data-read', i)
    readBtn.addEventListener('click', function()    {
        if (myLibrary[readBtn.dataset.read].hasRead === 'Yes')  {
            myLibrary[readBtn.dataset.read].hasRead = 'No', displayBooks();
        } else if (myLibrary[readBtn.dataset.read].hasRead === 'No')  {
            myLibrary[readBtn.dataset.read].hasRead = 'Yes', displayBooks();
    }})
    
    removeBtn.textContent = 'remove';
    removeBtn.setAttribute('class', 'remove')
    removeBtn.setAttribute('data-remove', i)
    removeBtn.addEventListener('click', function()  {
        myLibrary.splice(removeBtn.dataset.remove, 1), displayBooks()
    });

    output.appendChild(para);
    para.appendChild(readBtn)
    para.appendChild(removeBtn)
    
}

function displayBooks() {
    output.textContent = '';
    myLibrary.forEach((book, i)=> createBookCard(book, i));
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
        const newBook = new Book(titleInput.value,authorInput.value,pagesInput.value, read);
        addBookToLibrary(newBook);
    displayBooks();
    clearFields();
}

submitBtn.addEventListener('click' , createNewObject);
addBookBtn.addEventListener('click', displayForm)

const bookOne = new Book('The Hobbit', 'Tolken', 298, 'Yes');
const bookTwo = new Book('Dune', 'Herbert', 1298, 'No');
addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
displayBooks();
// const removeBtns = document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', function() {
//     myLibrary.splice(btn.dataset.remove, 1), displayBooks();
// }))




