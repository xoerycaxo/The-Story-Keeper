const onPageLoad = async () => {
    const response = await fetch("/api/books", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        },
    })
    if(response.ok) {
        const data = await response.json()
        console.log(data)
    }
}

onPageLoad();


function addToListClicked(event){
    var button = event.target;
    var bookItem = button.parentElement.parentElement;
    var title = bookItem.getElementByClassName('book-title')[0].innerText;
    var author = bookItem.getElementByClassName('book-author')[0].innerText;
    var imgSrc = bookItem.getElementByClassName('book-img')[0].innerText;
    console.log(title, author, imgSrc);
    addBook(title, author, imgSrc);
}
function addBook(title, author, imgSrc){
    var bookList = document.createElement('li');
    bookList.classList.add('books');
    var mybooks = document.getElementsByClassName('my-books')[0];
    for (var i = 0; i < mybooks.length; i++){
        if (mybooks[i].innerText == title){
            alert('You already have this book saved!');
            return;
        }
    }
    var bookLIstContent =
    ` 
    <li class="books">
        <h3 class="book-title">${title}</h3>
        <p class="book-author">${author}</p>
        <img src="${imgSrc}" class='book-img'/>
    </li>`
    bookList.innerHTML = bookLIstContent;
    mybooks.append(bookList);
}
