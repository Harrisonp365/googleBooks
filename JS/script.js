//const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
//const API_KEY = "&key=AIzaSyAoBhX42biXMhRoABCEDDmgG_f-mStlW7g";
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const getAPIData = async(searchValue) => {
    const response = await fetch(`${API_URL}${searchValue}`);
    const bookData = await response.json();
    //Title: console.log(bookData.items[0].volumeInfo.title);
    //Image: console.log(bookData.items[0].volumeInfo.imageLinks.thumbnail);
    //1st Author: console.log(bookData.items[0].volumeInfo.authors[0]);
    return bookData.items;
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let searchValue = document.querySelector(".searchBar__input").value;
    if(searchValue === "" || searchValue === null) {
        alert("Please enter a search value")
    }

    const books = await getAPIData(searchValue);
    //const bookTitle = books.items[1].volumeInfo.title;

    console.log(books);
    //appendChild("div", books, document.querySelectorAll(".card"));
    return books;
});


// const bookImg = book.volumeInfo.imageLinks
// ? book.volumeInfo.imageLinks.smallThumbnail
// : null;
// const bookTitle = book.volumeInfo.title;
// const bookPubDate = book.volumeInfo.publishedDate;
// const bookDesc = book.volumeInfo.description;
// const bookAuthors = book.volumeInfo.authors;

// const getBookData = (data) => {
//     return data.items.map((book) => {
//         return {
//             imageurl: book.volumeInfo.imageLinks
//               ? book.volumeInfo.imageLinks.smallThumbnail
//               : null,
//             title: book.volumeInfo.title,
//             publishedDate: book.volumeInfo.publishedDate,
//             description: book.volumeInfo.description,
//             ISBN: book.volumeInfo.industryIdentifiers
//               ? book.volumeInfo.industryIdentifiers.map((ident) => ident.type)
//               : undefined,
//             authors: book.volumeInfo.authors,
//         };
//     })
// }