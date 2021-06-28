/***
 * @title			MoveToTopButton
 * @description		Adds a button to the right corner of the toolbar that takes you back to the top of the page.
 * @link			https://nkch.fandom.com/wiki/MediaWiki:MoveToTopButton.js
 * @author			Не кочан
 * @installation	@import url("/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:MoveToTopButton.js"); 
 ***/
$(
    function () {
        const moveToTop = document.createElement("a");

        moveToTop.id = "nkch-moveToTopButton";
        moveToTop.classList.add("nkch-moveToTopButton");

        function scrollListener() {
            var heightCurrent = window.pageYOffset;
            var height = 200;

            if (heightCurrent > height) {
                moveToTop.classList.add("nkch-moveToTopButton-is-visible");
            };

            if (heightCurrent <= height) {
                moveToTop.classList.remove("nkch-moveToTopButton-is-visible");
            };
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

        moveToTopText.id = "nkch-moveToTopText";
        moveToTopText.classList.add("nkch-moveToTopText");

        moveToTopText.innerHTML = "Up";

        document.body.appendChild(moveToTop);
        moveToTop.appendChild(moveToTopText);

        // .nkch-moveToTopButton
        mw.util.addCSS(".nkch-moveToTopButton { visibility: hidden; opacity: 0; position: fixed; bottom: 50px; right: 30px; cursor: pointer; transition: .3s }");

        // .nkch-moveToTopButton::before
        mw.util.addCSS(".nkch-moveToTopButton::before { content: ''; display: block; width: 1px; height: 65px; position: absolute; top: calc(-65px - 25px); right: 0; left: 0; margin: 0 auto; background-color: var(--theme-page-text-color); animation: moveToTop 1.6s cubic-bezier(0.87, 0, 0.13, 1) infinite; pointer-events: none; transition: .3s }");

        // .nkchmoveToTopButton-is-visible
        mw.util.addCSS(".nkch-moveToTopButton-is-visible { visibility: visible; opacity: 1; transition: .3s }");

        // .nkch-moveToTopText
        mw.util.addCSS(".nkch-moveToTopText { writing-mode: vertical-lr; text-transform: uppercase; letter-spacing: 0.1em; color: var(--theme-page-text-color); font-family: Rubik, sans-serif }");

        // animation
        mw.util.addCSS("@keyframes moveToTop { 0% { height: 64px; top: calc(-65px - 25px); } 50% { height: 0; top: calc(-65px - 25px); } 51% { height: 0; top: -25px; } 100% { height: 65px; } }");
    }
);