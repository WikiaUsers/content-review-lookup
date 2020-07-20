/* CSS loader v1
Simple script that loads stylesheets on demand.*/
$(function () {
    "use strict";
    var styleSheets = [];
    var themePage = "theme";
    // Load themes stored in subpage e.g. Themes/Rambo/theme.css
    var pageParts = wgTitle.split("/");
    var parentPage = pageParts[0].toLowerCase();

    if (parentPage === "themes") {
        var theme = wgTitle + "/" + themePage + ".css";

        importArticles({
            type: "style",
            articles: [theme]
        });
    }
});