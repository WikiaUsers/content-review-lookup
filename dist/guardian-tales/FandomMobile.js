var hashElem = document.getElementById(window.location.hash.substring(1));
if (hashElem) {
    hashElem.classList.add('target');
    hashElem.scrollIntoView();
}