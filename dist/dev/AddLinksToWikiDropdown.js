//Personal Use only
//A script that allows one to customize their Wiki dropdown on the left
$(function() {
    window.wikiLinks = window.wikiLinks || [];
    var navContainer = document.querySelector(".global-navigation__links .wds-is-linked");
    wikiLinks.forEach(function(link) {
        var li = document.createElement('li'),
            a = document.createElement('a');
        a.href = link.url;
        a.className = 'customwikilink';
        a.textContent = link.text;
        li.appendChild(a);
        navContainer.appendChild(li);
    });
});