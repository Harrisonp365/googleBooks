//const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=quilting";


const getBooks = async() => {
    const response = await fetch(`${API_URL}`);
    const bookData = await response.json();
    console.log(bookData.bookData.items[2]);
    console.log("fetch working");
    return bookData.items;
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    //console.log("click working");
     let searchValue = document.querySelector(".searchBar__input").value;
     console.log(searchValue);
    //  if(searchValue === "" || searchValue === null)
    //      return;

    const books = await getBooks();
    console.log(books);
    return books;
});


