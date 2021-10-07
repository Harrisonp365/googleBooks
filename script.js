//const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
//const API_KEY = "&key=AIzaSyAoBhX42biXMhRoABCEDDmgG_f-mStlW7g";
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const getAPIData = async(searchValue) => {
    const response = await fetch(`${API_URL}${searchValue}`);
    const bookData = await response.json();
    //Title: console.log(bookData.items[0].volumeInfo.title);
    console.log(bookData.items[0].volumeInfo.imageLinks.thumbnail);
    return bookData.items;
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
     let searchValue = document.querySelector(".searchBar__input").value;
     if(searchValue === "" || searchValue === null)
        return;

    const books = await getAPIData(searchValue);
    console.log(books.items[0].volumeInfo.imageLinks.thumbnail);
    appendChild("div", books.items[0].volumeInfo.imageLinks.thumbnail, document.querySelector(".gallery"));
    return books;
});

const appendChild = (elemType, input, parentNode) => {
    const newElem = document.createElement(elemType);
    const textNode = document.createTextNode(input);
    newElem.appendChild(textNode);
    parentNode.appendChild(newElem);
};

//console.log(getAPIData());

