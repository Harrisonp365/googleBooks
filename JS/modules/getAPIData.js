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

export default getAPIData;