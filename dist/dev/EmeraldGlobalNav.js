(function ($) {
    if (window.EmeraldGlobalNav) return;
    window.EmeraldGlobalNav = true;

    mw.loader.using(["mediawiki.cookie"], function () {
        var menuState = mw.cookie.get("menu-hidden", "emerald_");
        var linksState = mw.cookie.get("links-collapsed", "emerald_");

        var menuHidden;
        var linksCollapsed;

        if (menuState !== null) {
            menuHidden = JSON.parse(menuState);

            $(".global-navigation").toggleClass("emerald-is-hidden", menuHidden);
        } else {
            menuHidden = false;
        }

        if (linksState !== null) {
            linksCollapsed = JSON.parse(linksState);

            $(".global-navigation").toggleClass("emerald-is-collapsed", linksCollapsed);
        } else {
            linksCollapsed = false;
        }

        $('.global-navigation').prepend("<div class='emerald-toggler'></div>");
        $('.global-navigation').append("<div class='emerald-links-toggler'></div>");

        $('.emerald-toggler').click(function () {
            menuHidden = !menuHidden;

            mw.cookie.set("menu-hidden", menuHidden.toString(), {
                expires: 7776000,
                prefix: "emerald_"
            });

            $('.global-navigation').toggleClass("emerald-is-hidden");
        });

        $('.emerald-links-toggler').click(function () {
            linksCollapsed = !linksCollapsed;

            mw.cookie.set("links-collapsed", linksCollapsed.toString(), {
                expires: 7776000,
                prefix: "emerald_"
            });

            $('.global-navigation').toggleClass("emerald-is-collapsed");
        });
    });
})(jQuery);
importArticles({
    type: "style",
    articles: [
		"u:dev:MediaWiki:FontAwesome.css",
    ]
});