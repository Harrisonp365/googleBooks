import dataToObj from "../modules/dataToObj";
import getAPIData from "../modules/getAPIData";

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

export default updateDisplay;