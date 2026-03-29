/* from https://nkch.fandom.com/wiki/MediaWiki:ExploreMenuIcons.js */
(function () {
    mw.hook("dev.wds").add(
        function (wds) {
            var navDropdownLinks = document.querySelectorAll(".fandom-community-header__local-navigation .wds-dropdown:first-child .wds-list a");

            for (var i = 0; i < navDropdownLinks.length; i++) {
                var link = navDropdownLinks[i];
                var tracking = link.dataset.tracking;
                var iconName;

                switch (tracking) {
                    case "explore-all-pages":
                        iconName = "pages";
                        break;
                    case "explore-community":
                        iconName = "users";
                        break;
                    case "interactive-maps":
                        iconName = "map";
                        break;
                    case "explore-blogs":
                        iconName = "blocks";
                        break;
                    case "explore-random":
                        iconName = "external";
                        break;
                    case "explore-videos":
                        iconName = "video";
                        break;
                    case "explore-images":
                        iconName = "images";
                        break;
                    default:
                        iconName = "";
                }
                if (iconName) {
                    var icon = wds.icon(iconName + "-tiny");
                    icon.classList.add("navigation-item-icon");
                    link.querySelector("span").before(icon);
                }
            }
        }
    );

    importArticle({
        type: "script",
        articles: [
            "u:dev:MediaWiki:WDSIcons/code.js"
        ]
    });
})();