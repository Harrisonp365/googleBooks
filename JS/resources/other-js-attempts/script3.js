const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const getAPIData = async(searchValue, container) => {
    const cardTitle = container.querySelector(".card__title");
    const cardImage = container.querySelector(".card__image");
    const cardAuthor = container.querySelector(".card__author");
    const response = await fetch(`${API_URL}${searchValue}`);
    //trying to deconstruct obj but unsure how to....
    const { title, thumbnail, authors } = await response.json();

    if(!response.ok){
        throw new Error (`Failed to fetch data: ${response.status}`);
    }
    
    //Clear cards at the start of each search
    cardTitle.innerHTML = "<div></div>";
    cardImage.innerHTML = "<img></img>";
    cardAuthor.innerHTML = "<div></div>";

    for(const titleText of title) {
        const titleElement = document.createElement("div");

        titleElement.textContent = titleText;
        cardTitle.querySelector("div").appendChild(titleElement);
    }   
}

getAPIData("java", document.querySelector(".card"));