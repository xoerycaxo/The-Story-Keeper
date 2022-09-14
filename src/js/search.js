
var bookName = document.querySelector("#bookInput");
var searchBook = document.querySelector("#searchBtn");
var hide = document.querySelector(".hide");

//create function to fetch api
// getBook = function () {
//   fetch()
//   `https://www.google-books.p.rapidapi.com=${bookName.value}&app_id=a1079b5475msh35d87f745ac1298p10461djsn632b1dc98309`
//     .then((response) => response.json())
//     .then((data) => displayRecipe(data.hits))
//     .catch((error) => console, log("Error"));
// };

var submitHandler = function (event) {
  event.preventDefault();
  var inputVal = bookName.value;
  getBook(inputVal);
};

//Display function
displayBooks = function (data) {
  console.log(data);
  hide.classList.remove("hide");

//   //map the data to the ouput elements
//   var bookList = data
//     .map((data) => {
//       return `
//         <div class="">
//         <h6 class=""> ${data.book.name}</h6> 
//         <div class="card-image">
//         <img class="" width="650" src = ${data.book.image} >
//         </div>
//         <div class="">
//         <span class="">Name: ${data.book.name}</span>
//         </div>
//         <div class="">
//         <span class="">Author: ${data.book.author}</span>
//         </div>
//       </div>`;
//     })
