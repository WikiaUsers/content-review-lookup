/* from https://nkch.fandom.com/wiki/MediaWiki:ExploreMenuIcons.js */
(function () {
    mw.hook("dev.wds").add(
        function (wds) {
            var navDropdownLinks = document.querySelectorAll(".fandom-community-header__local-navigation .wds-dropdown:first-child .wds-list a");

            for (var i = 0; i < navDropdownLinks.length; i++) {
                var tracking = navDropdownLinks[i].dataset.tracking;

                switch (navDropdownLinks[i].dataset.tracking) {
                    case "explore-all-pages":
                        var icon = wds.icon("pages-tiny");
                        icon.classList.add("navigation-item-icon");
                        navDropdownLinks[i].querySelector("span").before(icon);
                        break
                    case "explore-community":
                        var icon = wds.icon("users-tiny");
                        icon.classList.add("navigation-item-icon");
                        navDropdownLinks[i].querySelector("span").before(icon);
                        break
                    case "explore-blogs":
                        var icon = wds.icon("blocks-tiny");
                        icon.classList.add("navigation-item-icon");
                        navDropdownLinks[i].querySelector("span").before(icon);
                        break
                    case "explore-random":
                        var icon = wds.icon("sitemap-tiny");
                        icon.classList.add("navigation-item-icon");
                        navDropdownLinks[i].querySelector("span").before(icon);
                        break
                }
            };
        }
    )

    importArticle({
        type: "script",
        articles: [
            "u:dev:MediaWiki:WDSIcons/code.js"
        ]
    });
})();