/* CSS loader v1
Simple script that loads stylesheets on demand.*/
$(function () {
    "use strict";
    var styleSheets = [];

    if ($("#load_css").length > 0) {
        var cssPage = $("#load_css").text();
        var api = new mw.Api();
        var stylePages;
        var validCSS = [];

        styleSheets.push(cssPage);
        stylePages = styleSheets.join("|");
        $("#load_css").html('<input type="button" id="btnload_css" value="Load Infobox themes">');

        if (styleSheets.length) {
            api.get({
                action: 'query',
                titles: stylePages
            }).done(function (data) {
                $.each(data.query.pages, function (key, page) {
                    if (page) {
                        validCSS.push(page.title);
                    }
                });
            });
        }

        $("input#btnload_css").on("click", function () {
            importArticles({
                type: "style",
                articles: validCSS
            });

            $("input#btnload_css").prop("disabled", true);
            console.log("loaded");
        });
    }
});