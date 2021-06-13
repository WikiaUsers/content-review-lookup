var element = document.createElement("p"); //"p" is the type of element that will be created
element.style = "color:blue"; //to modify attributes to the element that will be created, just type element.(attribute you want to modify) = "whatever value"
element.contentText = "Paragraph text";//this sets the innerHTML of the element that will be created to "Paragraph text"
document.getElementById('mw-content-text').appendChild(element);//this adds the element to the page content