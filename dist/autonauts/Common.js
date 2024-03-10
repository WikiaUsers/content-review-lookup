/* Any JavaScript here will be loaded for all users on every page load. */

function tag(els,type) {
    els.forEach(function(el) {
        if (type === "collapse") {
            el.classList.add('mw-collapsible');
        } else if (type === "scroll") {
            var tagged = document.createElement('div');
            el.parentNode.insertBefore(tagged, el);
            el.setAttribute('style','margin-bottom: 0');
            tagged.setAttribute('style','overflow-x: auto; margin-bottom: 1em');
            tagged.appendChild(el);
        } else if (type === "placeholder") {
            el.setAttribute('placeholder','Search the Autonauts Wiki');
        }
    })
};


tag(document.querySelectorAll('.overflow-scroll'),"scroll");
tag(document.querySelectorAll('table.cargoTable'),"collapse");
tag(document.querySelectorAll('.bodySearchWrap input:first-child'),"placeholder");