const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const getAPIData = async(searchValue) => {
    const response = await fetch(`${API_URL}${searchValue}`);
    const bookData = await response.json();
    //add check and error if no response
    if(bookData === "" || bookData === null) {
        alert("There are no books that match your search plese try again")
    }
    const html = bookData.items.map(items => {
        return `
        <div class="card">
         <img class="card__image" src="${items.volumeInfo.imageLinks.thumbnail}" alt="${items.volumeInfo.title}" />
         <div class="card__title">${items.volumeInfo.title}</div>
         <div class="card__author">${items.volumeInfo.authors}</div>
       </div>`;
    }).join("");
    console.log(html);
    document.querySelector("#gallery").insertAdjacentHTML("afterbegin", html);
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
    return books;
});


//---------------------------------------------------------------------------------------------------
// searchBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
    
//     let searchValue = document.querySelector(".searchBar__input").value;
//     if(searchValue === "" || searchValue === null) {
//         alert("Please enter a search value")
//     }

//     const books = await getAPIData(searchValue);

//     const bookTitle = books.items;
//     //console.log(bookTitle.volumeInfo.value);
    
//     let bookCard = "";
//     bookTitle.map((val) => {
//         console.log(val.volumeInfo.imageLinks.thumbnail);
//        bookCard += `
//        <div class="card">
//         <img class="card__image" src="" alt="${val.volumeInfo.title}" />
//         <div class="card__title">${val.volumeInfo.title}</div>
//         <div class="card__author">${val.volumeInfo.authors}</div>
//       </div>`;
//         return bookCard;
//     });
//     document.getElementById("#gallery").innerHTML = bookCard;
    
// });