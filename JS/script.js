// import { dataToObj } from "./modules/dataToObj";
// import { updateDisplay } from "./modules/updateDisplay";
//import getAPIData from "./modules/getAPIData";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

//could set this up to take in api url as param to make more usable
const getAPIData = async(searchValue) => {
    const response = await fetch(`${API_URL}${searchValue}`);
    const data = await response.json();
    if(!response.ok){
        throw new Error (`Failed to fetch data: ${response.status}`);
    } 
    return data.items;
}

const dataToObj = async (data) => {
    const apiData = await getAPIData(data);

    const objArr = apiData.map((item) => {
        const obj = {
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ?? "Sorry we could not find an author",
            image: item.volumeInfo?.imageLinks?.thumbnail ?? "JS/resources/no-book-image.png",
            description: item.volumeInfo.description ?? "There is no description for this book but we are sure it's great!",
            //Modal items below
            previewLink: item.volumeInfo.previewLink,
            buyLink: item.volumeInfo.buyLink,
            avgRating: item.volumeInfo.averageRating,
            pubDate: item.volumeInfo.publishedDate,
            isbn: item.volumeInfo.industryIdentifiers.identifier,
        };

        //More than one author then join authors
        if(item.volumeInfo.authors && item.volumeInfo.authors > 1) {
            obj.author = "Authors: " + item.volumeInfo.authors?.join(", "); 
        }
            
        //Make desc only 200 chars long
        if( item.volumeInfo.description !== undefined && item.volumeInfo.description.length > 200) {
            const lastChar = item.volumeInfo.description.indexOf(".", 200);
            //Append fullstop to the end of desc
            obj.description = item.volumeInfo.description.slice(0, lastChar) + ".";
        } 
          
        return obj;
    });
    return objArr;
}

const updateDisplay = async (obj) => {
    const cards = obj.map((item) => {
        const cardElem = document.createElement("div");
        const cardImageElem = document.createElement("img");
        const cardTitleElem = document.createElement("h2");
        const cardAuthorElem = document.createElement("p");
        const cardDescElem = document.createElement("p");

        cardElem.className = "card";
        cardImageElem.className = "card__image";
        cardTitleElem.className = "card__title";
        cardAuthorElem.className = "card__author";
        cardDescElem.className = "card__desc";

        cardImageElem.src = `${item.image}`
        const titleText = `${item.title}`;
        const authorText = `${item.author}`;
        const descText = `${item.description}`;

        const titleTextNode = document.createTextNode(titleText);
        const authorTextNode = document.createTextNode(authorText);
        const descTextNode = document.createTextNode(descText);

        cardTitleElem.appendChild(titleTextNode);
        cardAuthorElem.appendChild(authorTextNode);
        cardDescElem.appendChild(descTextNode);

        cardElem.appendChild(cardImageElem);
        cardElem.appendChild(cardTitleElem);
        cardElem.appendChild(cardAuthorElem);
        cardElem.appendChild(cardDescElem);

        return cardElem;
    });

    const cardContainer = document.querySelector(".gallery")
    const append = (parent) => (child) => parent.appendChild(child);
    cards.forEach(append(cardContainer));
}

const createModal = async (obj) => {
    const cards = obj.map((item) => {
        const modalElem = document.createElement("div");
        const previewElem = document.createElement("a");
        const buyLinkElem = document.createElement("a");
        const avgRatingElem = document.createElement("p");
        const pubDateElem = document.createElement("p");
        const isbnElem = document.createElement("p");

        modalElem.className = "modal";
        previewElem.className = "modal__link";
        buyLinkElem.className = "modal__link";
        avgRatingElem.className = "modal__rating";
        pubDateElem.className = "modal__pubDate";
        isbnElem.className = "modal__isbn";

        previewElem.href = `${item.previewLink}`
        const previewText = "Book preview";
        buyLinkElem.href = `${item.buyLink}`;
        const buyLinkText = "Buy from here!";
        const avgRatingText = `${item.avgRating}`;
        const pubDateText = `${item.pubDate}`;
        const isbnText = `${item.isbn}`;

        const previewTextNode = document.createTextNode(previewText);
        const buyTextNode = document.createTextNode(buyLinkText);
        const avgRatingTextNode = document.createTextNode(avgRatingText);
        const pubDateTextNode = document.createTextNode(pubDateText);
        const isbnTextNode = document.createTextNode(isbnText);

        previewElem.appendChild(previewTextNode);
        buyLinkElem.appendChild(buyTextNode);
        avgRatingElem.appendChild(avgRatingTextNode);
        pubDateElem.appendChild(pubDateTextNode);
        isbnElem.appendChild(isbnTextNode);

        modalElem.appendChild(previewElem);
        modalElem.appendChild(buyLinkElem);
        modalElem.appendChild(avgRatingElem);
        modalElem.appendChild(pubDateElem);
        modalElem.appendChild(isbnElem);

        return modalElem;
    });

    const modalContainer = document.querySelector(".modal-container")
    const append = (parent) => (child) => parent.appendChild(child);
    cards.forEach(append(modalContainer));
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let searchValue = document.querySelector(".searchBar__input").value;

    if(!searchValue) {
        alert("Please enter a search value")
    }

    const objToRender = await dataToObj(searchValue);
    updateDisplay(objToRender);
});

//modal not working currently
const imageClick = document.querySelectorAll(".card");
imageClick.forEach(item => {
    item.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("on image click");
        const objToRender = await dataToObj();
        createModal(objToRender);
    })
});


