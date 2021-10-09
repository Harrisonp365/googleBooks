import getAPIData from "../modules/getAPIData";

const dataToObj = async (data) => {
    const apiData = await getAPIData(data);

    const objArr = apiData.map((item) => {
        const obj = {
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ?? "Sorry we could not find an author",
            image: item.volumeInfo?.imageLinks?.thumbnail ?? "JS/resources/no-book-image.png",
            description: item.volumeInfo.description ?? "There is no description for this book but we are sure it's great!",
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

export default dataToObj;