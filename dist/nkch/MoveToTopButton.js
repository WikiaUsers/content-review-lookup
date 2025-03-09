/* MoveToTopButton.js • Не вики (https://nkch.fandom.com) */
/* [[Category:JS]], [[Category:JS - Преимущественно импорт]] */

(() => {
    const moveToTop = document.createElement("a");
    moveToTop.classList.add("nkch-move-to-top");

    window.addEventListener("scroll", () => {
        moveToTop.classList.toggle("is-visible", window.pageYOffset > 200);
    });

    moveToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const moveToTopText = document.createElement("span");
    moveToTopText.classList.add("nkch-move-to-top__text");
    moveToTopText.textContent = "Наверх";

    document.body.appendChild(moveToTop);
    moveToTop.appendChild(moveToTopText);

    importArticle({
        type: "style",
        article: "u:nkch:MediaWiki:MoveToTopButton.css"
    });
})();