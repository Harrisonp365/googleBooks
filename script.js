const API_URL = "https://www.googleapis.com/books/v1"

//create get books func

const searchBtn = document.querySelector(".searchBar__submit");
searchBtn.addEventListener("click", async (e) => {
    const searchValue = document.querySelector(".searchBar__input");
    if(!searchValue)
        return;

    const books = await getBooks(searchValue);
})