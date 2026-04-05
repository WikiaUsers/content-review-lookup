// Official Wiki Badges, by Sophiedp and Aeywoo
$.when($.ready, mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"])).then(function() {
    return new mw.Api().loadMessagesIfMissing(["fd-community-header-official-wiki"]);
}).then(function() {
    // Generate config function by Sophiedp
    function generateConfig () {
        var defaults = ["dev","help_gamepedia","infobox","janitors","starter","ucpinternalteststarter","ucpinternalteststartercommons","vstf","wikia","ca","de","es","fiwikia","frfr","idcommunity","it","ja","kowikia","nlwikia","plwikia","ptcommunity","ruwikia","trcommunity","ukhelp","vicommunity","zh","starsprogramtest"];
        if (!$.isArray((window.officialWikisBadge || {}).wikis)) {
            return defaults;
        }
        if (window.officialWikisBadge.override) {
            return window.officialWikisBadge.wikis;
        }
        var result = [].concat(defaults, window.officialWikisBadge.wikis);
        return result;
    }
    var wrapperQuery = document.querySelector(".resizable-container .community-header-wrapper");
    var officialSVGQuery = document.querySelector(".resizable-container .fandom-community-header__community-name-wrapper div.official-wiki-badge");
    if ((wrapperQuery) && (officialSVGQuery)) {
        return;
    } if ($.inArray(mw.config.get("wgWikiID"), (generateConfig())) >= 0) {
        var officialBadgeWrapper = $("<div>")
            .addClass("official-wiki-badge")
            .attr("aria-label", mw.msg("fd-community-header-official-wiki"));
        var officialBadgeSvg = $("<svg class=\"wds-icon official-wiki-badge__icon\" aria-hidden=\"true\" focusable=\"false\"><use xlink:href=\"#wds-icons-official-wiki\"></use></svg>");
        var officialBadgeText = $("<div>", {
            class: "official-wiki-badge__label",
            text: mw.msg("fd-community-header-official-wiki"),
        });
        $(".resizable-container .fandom-community-header__top-container .fandom-community-header__community-name-wrapper").append(officialBadgeWrapper);
        $(officialBadgeWrapper).append(officialBadgeSvg,officialBadgeText);
    } else {
        return;
    }
});