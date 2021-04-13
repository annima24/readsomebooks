const output = document.querySelector('#output');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const radioInput = document.querySelectorAll('[name="radio"]');
const submitBtn = document.querySelector('#submitBtn');
const entryForm = document.querySelector('#entryForm');
const addBookBtn = document.querySelector('#addBook');
let myLibrary = [];
let checked = 'true';

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function fillEmptyFieldAlert()  {
    alert('please fill in empty fields');
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
//the function that handles the creation of the cards on click after a check to make sure fields are properly filled out.
function createBookCard(book, i) {
    //creating the elements of the card
    const para = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    //setting attributs and text
    para.setAttribute('data-set', i)
    para.innerText = `Title: ${book.title}  
    Author: ${book.author} 
    Pages: ${book.pages}        
    Completed: ${book.hasRead}`;
    //setting attributes and putting event listeners on the btns. this controls the state of the hasread part of the object
    readBtn.setAttribute('class', 'read')
    readBtn.textContent = 'read';
    readBtn.setAttribute('data-read', i)
    readBtn.addEventListener('click', function()    {
        if (myLibrary[readBtn.dataset.read].hasRead === 'Yes')  {
            myLibrary[readBtn.dataset.read].hasRead = 'No', displayBooks();
        } else if (myLibrary[readBtn.dataset.read].hasRead === 'No')  {
            myLibrary[readBtn.dataset.read].hasRead = 'Yes', displayBooks();
    }})
    //setting attributes and putting event listeners on the btns. this removes the object from the array if the btn is clicked and then returns the new array
    removeBtn.textContent = 'remove';
    removeBtn.setAttribute('class', 'remove')
    removeBtn.setAttribute('data-remove', i)
    removeBtn.addEventListener('click', function()  {
        myLibrary.splice(removeBtn.dataset.remove, 1), displayBooks()
    });
    //adding the cards to the display
    output.appendChild(para);
    para.appendChild(readBtn)
    para.appendChild(removeBtn)    
}

//loops through the array that holds all the books and creates display cards for each.
function displayBooks() {
    output.textContent = '';
    myLibrary.forEach((book, i)=> createBookCard(book, i));
}

function checkFields()  {
    if (titleInput.value === '' || authorInput.value === '')    {
        fillEmptyFieldAlert();
    } else if (isNaN(parseInt(pagesInput.value)) === true)    {
        alert('numbers only please');
    } else createNewObject();
 }
 
function clearFields()  {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}
//when the submit button is clicked, this takes all the values and puts them into an object, it then pushes that object to the myLibrary array, then updates the view field with the new book being displayed and clears out the form.
function createNewObject()   {
    let read;
    radioInput.forEach(btn => read = btn.value);
    const newBook = new Book(titleInput.value,authorInput.value,pagesInput.value, read);
    addBookToLibrary(newBook);
    displayBooks();
    clearFields();
    
}

submitBtn.addEventListener('click' , checkFields);
addBookBtn.addEventListener('click', displayForm)

const bookOne = new Book('The Hobbit', 'Tolken', 298, 'Yes');
const bookTwo = new Book('Dune', 'Herbert', 1298, 'No');
addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
displayBooks();
// const removeBtns = document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', function() {
//     myLibrary.splice(btn.dataset.remove, 1), displayBooks();
// }))


