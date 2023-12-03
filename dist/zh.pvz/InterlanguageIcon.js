(function () {
    function kyyljInterlanguage() {
        const interlanguageLinksList = document.querySelector('.page-header__languages');
        if (interlanguageLinksList) {
            const interlanguageLinks = interlanguageLinksList.querySelectorAll(':scope li');
            interlanguageLinks.forEach(linkIcon);
        }
    }
    function linkIcon(link) {
        var linkElement = link.querySelector(':scope>a');
        if (linkElement.dataset.trackingLabel=="lang-en") {
            newEnLink(link);
        }
        linkElement.innerHTML = '<svg style="width: 1em; height: 1em; margin-right: .25em;"><use xlink:href="#wds-brand-fandom-logomark"></use></svg>' + linkElement.innerHTML;
    }
    function newEnLink(link) {
        const newLinkLi = link.cloneNode(true);
        link.parentNode.insertBefore(newLinkLi, link.nextSibling);
        var newLink = newLinkLi.querySelector(':scope>a');
        const newTitle = document.getElementById('en-wiki-alt-link');
        if (newTitle) {
            newLink.href = 'https://plantsvszombies.wiki.gg/' + newTitle.dataset.title;
        }
        else {
            newLink.href = newLink.href.replace('fandom.com', 'wiki.gg');
        }
        newLink.innerHTML = '<img style="width: 1em; margin-right: .25em;" src="https://static.wikia.nocookie.net/plantsvszombies/images/b/b6/Pvzgg-footer.webp/revision/latest?path-prefix=zh" alt="wiki.gg" />' + newLink.innerHTML;
    }
    mw.hook("wikipage.content").add(kyyljInterlanguage);
})();