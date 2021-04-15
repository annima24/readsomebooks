const output = document.querySelector('#output');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const submitBtn = document.querySelector('#submitBtn');
const entryForm = document.querySelector('#entryForm');
const addBookBtn = document.querySelector('#addBook');
let myLibrary = [];
let checked = 'true';
let booksInStorage;

function Book(title, author, pages, hasRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
}

function addBookToLibrary(book) {
    addBookToStorage(book);
    myLibrary.push(book);
}

function addBookToStorage(book) {    
    localStorage.setItem(`${localStorage.length + 1}`, book.title);
    localStorage.setItem(`${localStorage.length + 1}`, book.author);
    localStorage.setItem(`${localStorage.length + 1}`, book.pages);
    localStorage.setItem(`${localStorage.length + 1}`, book.hasRead);
    
}

function removeFromStorage()    {
    localStorage.clear();
    myLibrary.forEach(book => addBookToStorage(book));
}

function fillEmptyFieldAlert()  {
    alert('Please fill in empty fields.');
}

function deleteBook(e)   {
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
    para.setAttribute('class', 'card')
    para.innerText = `Title: ${book.title}  
    Author: ${book.author} 
    Pages: ${book.pages}        
    Completed: ${book.hasRead}`;
    
    //setting attributes and putting event listeners on the btns. this controls the state of the hasread part of the object
    readBtn.setAttribute('class', 'read')
    readBtn.textContent = 'Change status';
    readBtn.setAttribute('data-read', i)
    readBtn.addEventListener('click', function()    {
        if (myLibrary[readBtn.dataset.read].hasRead === 'Yes')  {
            myLibrary[readBtn.dataset.read].hasRead = 'No', removeFromStorage() ,displayBooks();
        } else if (myLibrary[readBtn.dataset.read].hasRead === 'No')  {
            myLibrary[readBtn.dataset.read].hasRead = 'Yes', removeFromStorage(), displayBooks();
        }})
        
        //setting attributes and putting event listeners on the btns. this removes the object from the array if the btn is clicked and then returns the new array
    removeBtn.textContent = 'Remove book';
    removeBtn.setAttribute('class', 'remove')
    removeBtn.setAttribute('data-remove', i)
    removeBtn.addEventListener('click', function()  {       
        myLibrary.splice(removeBtn.dataset.remove, 1), removeFromStorage(), displayBooks();
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
    } else if (titleInput.value.length > 55)  {
        alert('Title is too long.')
    }   else if (authorInput.value.length > 25)  {
        alert('Authors name is too long.')
    }else if (isNaN(parseInt(pagesInput.value)) === true)    {
        alert('Numbers only, please.');
    } else createNewObject();
}

function clearFields()  {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

//when the submit button is clicked, this takes all the values and puts them into an object, it then pushes that object to the myLibrary array, then updates the view field with the new book being displayed and clears out the form.
function createNewObject()   {
    
    const newBook = new Book(titleInput.value,authorInput.value,pagesInput.value, 'Yes');
    addBookToLibrary(newBook);
    displayBooks();
    clearFields();
    
}

function numOfBooks()   {
    booksInStorage = localStorage.length/4;
}

function populateArray()    {
    for (i = 0; i < booksInStorage; i++)    {
        //this variable represents the actual key number in localStorage, calculated by multiplying i by 4, because books in storage just is the length of local storage divided by 4
        let x = (4*i)+1
        let title = localStorage.getItem(x);
        let author = localStorage.getItem(x + 1);
        let pages = localStorage.getItem(x + 2);
        let hasRead = localStorage.getItem(x + 3)
        const newBook = new Book(title, author, pages, hasRead)
        myLibrary.push(newBook);
        displayBooks();
        // console.log(localStorage.getItem(i));
    }
}

submitBtn.addEventListener('click' , checkFields);
addBookBtn.addEventListener('click', displayForm)

numOfBooks();
populateArray();
console.log('hi friend')




