// const removeElem = (parentId, childId) => {
//     const parentNode = document.getElementById(parentId);
//     const childNode = document.getElementById(childId);
//     parentNode.removeChild(childNode);
// };

const removeAllElems = (parent) => {

    for(let i = 0; i < parent.children.length; i++) {
        parent.children[i].remove();
    }
    //parent.children.forEach((child) => child.remove());
}

export default removeAllElems;