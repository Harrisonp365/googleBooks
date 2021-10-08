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
            author: item.volumeInfo.authors,
            image: item.volumeInfo?.imageLinks?.thumbnail ?? "JS/resources/no-book-image.png",
            description: item.volumeInfo.description,
        };

        if(item.volumeInfo.authors > 1)
            obj.author = item.volumeInfo.authors.join(", "); 
          
        return obj;
    });
    //console.log(objArr);
    return objArr;
}

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let searchValue = document.querySelector(".searchBar__input").value;

    if(!searchValue) {
        alert("Please enter a search value")
    }

    const objToRender = await dataToObj(searchValue);
    console.log(objToRender);
    updateDisplay(objToRender);
});

//move this out into a seperate file
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
        const authorText = `Authors: ${item.author}`;
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