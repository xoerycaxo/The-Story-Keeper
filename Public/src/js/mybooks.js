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
        for (let i = 0; i < data.length; i++) {
           addBook(data[i].title, data[i].author, data[i].bookImg)
        }
    }
}


// displaying books
// function displayBooks(data) {
//     const bookdata = data
//     for (let i = 0; i < bookdata.length; i++) {
//         const bookCol = document.createElement('li');
//         $(bookCol).attr('class', 'my-books');
//         $('.my-books').append(bookCol);
//         const bookH2 = document.createElement('h2');
//         $(bookH2).attr('class', 'book-title');
//         $(bookH2).text(item.volumeInfo.title);
//         $(bookH2).append(bookCol);
  
//     }
//   }


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
