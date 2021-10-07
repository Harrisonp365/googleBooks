// import { appendChild } from "./modules/appendChild";
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const getAPIData = async(searchValue) => {
    const response = await fetch(`${API_URL}${searchValue}`);
    const bookData = await response.json();
    //add check and error if no response
    if(bookData === "" || bookData === null) {
        alert("There are no books that match your search plese try again")
    }
    //Title: console.log(bookData.items[0].volumeInfo.title);
    //Image: console.log(bookData.items[0].volumeInfo.imageLinks.thumbnail);
    //1st Author: console.log(bookData.items[0].volumeInfo.authors[0]);
    return bookData;
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let searchValue = document.querySelector(".searchBar__input").value;
    if(searchValue === "" || searchValue === null) {
        alert("Please enter a search value")
    }

    const books = await getAPIData(searchValue);

    const bookTitle = books.items;
    //console.log(bookTitle.volumeInfo.value);
    
    let bookCard = "";
    bookTitle.map((val) => {
        console.log(val.volumeInfo.imageLinks.thumbnail);
       bookCard += `
       <div class="card">
        <img class="card__image" src="" alt="${val.volumeInfo.title}" />
        <div class="card__title">${val.volumeInfo.title}</div>
        <div class="card__author">${val.volumeInfo.authors}</div>
      </div>`;
        return bookCard;
    });
    document.getElementById("#gallery").innerHTML = bookCard;
    
});



// searchBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
    
//     let searchValue = document.querySelector(".searchBar__input").value;
//     if(searchValue === "" || searchValue === null) {
//         alert("Please enter a search value")
//     }

//     const books = await getAPIData(searchValue);

//     const bookTitle = books.items;

//     const cardTitleItems = bookTitle.map((title) => {
//         const element = document.createElement("p");
//         const titleText = `Book Title: ${title.volumeInfo.title}`;
//         //console.log(titleText); //map works
//         const textNode = document.createTextNode(titleText);
//         element.appendChild(textNode);
//         console.log(element);
//         return element;
//     });
//     const list = document.querySelectorAll(".card__title");
//     const append = parent => child => parent.appendChild(element)
//     cardTitleItems.forEach(append(list));

//     // console.log(bookTitle);
//     //appendChild("div", bookTitle, document.querySelectorAll(".card__title"));
//     return books;
// });

// const assignTitle = (books) => {
//     const bookTitle = books.items;

//     const cardTitleItems = bookTitle.map((title) => {
//         const element = document.createElement("div");
//         const titleText = `Book Title: ${title.volumeInfo.title}`;
//         console.log(titleText); //map works
//         const textNode = document.createTextNode(titleText);
//         appendChild("div", element, document.querySelectorAll(".card__title"));;
//         return element;
//     });

//     console.log(cardTitleItems);
// }

// const appendChild = (elemType, input, parentNode) => {
//     const newElem = document.createElement(elemType);
//     const textNode = document.createTextNode(input);
//     newElem.appendChild(textNode);
//     parentNode.appendChild(newElem);
// };

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


// const bookTitle = books.items;

    // const cardTitleItems = bookTitle.map((title) => {
    //     const element = document.createElement("p");
    //     const titleText = `Book Title: ${title.volumeInfo.title}`;
    //     console.log(titleText); //map works
    //     const textNode = document.createTextNode(titleText);
    //     element.appendChild(textNode);
    //     return element;
    // });

    // const list = document.querySelectorAll(".card__title");
    // const append = parent => child => parent.appendChild(element)
    // cardTitleItems.forEach(append(list));