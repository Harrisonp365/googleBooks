const appendChild = (elemType, input, parentNode) => {
    const newElem = document.createElement(elemType);
    const textNode = document.createTextNode(input);
    newElem.appendChild(textNode);
    parentNode.appendChild(newElem);
};

export default appendChild;