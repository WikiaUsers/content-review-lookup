(function () {
    const moveToTop = document.createElement("a");

    moveToTop.classList.add("nkch-move-to-top");

    function scrollListener() {
        switch (window.pageYOffset <= 200) {
            case false:
                moveToTop.classList.add("is-visible");
                break;
            case true:
                moveToTop.classList.remove("is-visible");
                break;
        }
    };

    function backToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    window.addEventListener("scroll", scrollListener);
    moveToTop.addEventListener("click", backToTop);

    const moveToTopText = document.createElement("span");

    moveToTopText.classList.add("nkch-move-to-top__text");

    moveToTopText.innerHTML = "Наверх";

    document.body.appendChild(moveToTop);
    moveToTop.appendChild(moveToTopText);

    /* ~ import stuff ~ */
    importArticle({
        type: "style",
        article: "u:nkch:MediaWiki:MoveToTopButton.css"
    });
})();