var ms = ':root { --theme-page-background-color: #2f2f2f; }';

var inlineStyleElement = document.createElement("style");
inlineStyleElement.setAttribute("type", "text/css");
inlineStyleElement.innerText = ms;
/* styling rules should only be seen in the F12 Console */
document.querySelector('head').append(inlineStyleElement);