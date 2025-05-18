document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".resizable-container");

    var footerDiv = document.createElement("div");
    footerDiv.id = "mixed-content-footer";
    footerDiv.className = "mcf-en";
    footerDiv.dataset.numberOfWikiArticles = "8";
    footerDiv.dataset.numberOfNsArticles = "0";

    var wrapperDiv = document.createElement("div");
    wrapperDiv.className = "mcf-wrapper";

    var contentDiv = document.createElement("div");
    contentDiv.className = "mcf-content";
    contentDiv.style.display = "block";

    var header = document.createElement("h2");
    header.className = "mcf-header";
    header.textContent = "Xorum Feed";

    var mosaicDiv = document.createElement("div");
    mosaicDiv.className = "mcf-mosaic";
    
    var categories = [
        { href: "https://xorumian-things.fandom.com/de/wiki/Category:Hauptcharaktere", title: "Hauptcharaktere" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Category:Nebencharaktere", title: "Nebencharaktere" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Category:Hintergrundcharaktere", title: "Hintergrundcharaktere" }
    ];

    var columnDiv1 = document.createElement("div");
    columnDiv1.className = "mcf-column";

    var wikiCardDiv = document.createElement("div");
    wikiCardDiv.className = "mcf-card mcf-card-wiki-articles";

    var wikiHeader = document.createElement("header");
    wikiHeader.className = "mcf-card-wiki-articles__header";

    var headerText = document.createElement("span");
    headerText.className = "mcf-card-wiki-articles__header-text";
    headerText.textContent = "More Xorum Wiki";

    wikiHeader.appendChild(headerText);
    wikiCardDiv.appendChild(wikiHeader);

    var wikiList = document.createElement("ul");
    wikiList.className = "mcf-card-wiki-articles__list";

    categories.forEach((category, index) => {
        var listItem = document.createElement("li");
        listItem.className = "mcf-card-wiki-articles__item";

        var link = document.createElement("a");
        link.href = category.href;
        link.className = "mcf-card-wiki-articles__item-link";
        link.dataset.tracking = `more-wiki-${index}`;
        link.title = category.title;

        var circleSpan = document.createElement("span");
        circleSpan.className = "mcf-card-wiki-articles__circle";
        circleSpan.textContent = index + 1;

        var titleSpan = document.createElement("span");
        titleSpan.className = "mcf-card-wiki-articles__title";
        titleSpan.textContent = category.title;

        link.appendChild(circleSpan);
        link.appendChild(titleSpan);
        listItem.appendChild(link);
        wikiList.appendChild(listItem);
    });

    wikiCardDiv.appendChild(wikiList);
    columnDiv1.appendChild(wikiCardDiv);
    mosaicDiv.appendChild(columnDiv1);

    var articleCards = [
        { href: "https://xorumian-things.fandom.com/de/wiki/Zovin", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/0/0b/Zovin.png/revision/latest?cb=20240714130000&path-prefix=de", title: "Zovin" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Heinrych", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest?cb=20241007193623&path-prefix=de", title: "Heinrych" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Luq", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/3/38/Itslgd.png/revision/latest/scale-to-width-down/1000?cb=20241207175816&path-prefix=de", title: "Luq" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Qara", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/0/04/Qara.png/revision/latest/scale-to-width-down/1000?cb=20250504181934&path-prefix=de", title: "Qara" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Atrae", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/1/11/Atrae.png/revision/latest/scale-to-width-down/1000?cb=20241207204943&path-prefix=de", title: "Atrae" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Luna", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/1/13/Luna.png/revision/latest/scale-to-width-down/1000?cb=20241208195552&path-prefix=de", title: "Luna" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Rolfin", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/6/63/Rolfin.png/revision/latest/scale-to-width-down/1000?cb=20241215162139&path-prefix=de", title: "Rolfin" },
        { href: "https://xorumian-things.fandom.com/de/wiki/Gorior", imgSrc: "https://static.wikia.nocookie.net/xorumian-things/images/b/b5/Gorior.png/revision/latest/scale-to-width-down/1000?cb=20241103184643&path-prefix=de", title: "Gorior" }
    ];
    
    var columnDiv2 = document.createElement("div");
    columnDiv2.className = "mcf-column";

    articleCards.forEach(card => {
        var cardDiv = document.createElement("div");
        cardDiv.className = "mcf-card-article__link";

        var link = document.createElement("a");
        link.href = card.href;
        link.className = "mcf-card mcf-card-article";
        link.title = card.title;

        var img = document.createElement("img");
        img.className = "mcf-card-article__thumbnail";
        img.src = card.imgSrc;
        img.loading = "lazy";
        img.alt = card.title;

        var wrapperSpan = document.createElement("span");
        wrapperSpan.className = "mcf-card-article__wrapper has-thumbnail";

        var titleSpan = document.createElement("span");
        titleSpan.className = "mcf-card-article__title";
        titleSpan.textContent = card.title;

        var subtitleSpan = document.createElement("span");
        subtitleSpan.className = "mcf-card-article__subtitle";
        subtitleSpan.textContent = "Xorum Wiki";

        wrapperSpan.appendChild(titleSpan);
        wrapperSpan.appendChild(subtitleSpan);
        link.appendChild(img);
        link.appendChild(wrapperSpan);
        cardDiv.appendChild(link);
        columnDiv2.appendChild(cardDiv);
    });

    mosaicDiv.appendChild(columnDiv2);
    contentDiv.appendChild(header);
    contentDiv.appendChild(mosaicDiv);
    wrapperDiv.appendChild(contentDiv);
    footerDiv.appendChild(wrapperDiv);
    container.appendChild(footerDiv);
});