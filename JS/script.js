import dataToObj from "./modules/dataToObj.js";
import updateDisplay from "./modules/updateDisplay.js";
import getAPIData from "./modules/getAPIData.js";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

const createModal = async (obj) => {
    const modal = obj.map((item) => {
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
    modal.forEach(append(modalContainer));
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let searchValue = document.querySelector(".searchBar__input").value;

    if(!searchValue) {
        alert("Please enter a search value")
    }

    getAPIData(searchValue);

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


