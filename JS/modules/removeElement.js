const removeElem = (parentId, childId) => {
    const parentNode = document.getElementById(parentId);
    const childNode = document.getElementById(childId);
    parentNode.removeChild(childNode);
};

export default removeElem;