// Official Wiki Badges, by Sophiedp and Aeywoo
$.when($.ready, mw.loader.using(["mediawiki.api"])).then(function() {
    "use strict";
    // Generate config function by Sophiedp
    function generateConfig () {
        var defaults = ["dev","help_gamepedia","infobox","janitors","starter","ucpinternalteststarter","ucpinternalteststartercommons","vstf","wikia","ca","de","es","fiwikia","frfr","idcommunity","it","ja","kowikia","nlwikia","plwikia","ptcommunity","ruwikia","trcommunity","ukhelp","vicommunity","zh"];
        if (!$.isArray((window.officialWikisBadge || {}).wikis)) {
            return defaults;
        }
        if (window.officialWikisBadge.override) {
            return window.officialWikisBadge.wikis;
        }
        var result = [].concat(defaults, window.officialWikisBadge.wikis);
        return result;
    }
    var wrapperQuery = document.querySelector(".main-container .community-header-wrapper");
    var officialSVGQuery = document.querySelector(".main-container .fandom-community-header__community-name-wrapper svg.official-wiki-badge");
    if ((wrapperQuery) && (officialSVGQuery)) {
        return;
    } if ($.inArray(mw.config.get("wgWikiID"), (generateConfig())) >= 0) {
        var officialBadge = $("<svg class=\"official-wiki-badge\"><use xlink:href=\"#wds-brand-fandom-official-wiki\"></use></svg>");
        $(".main-container .fandom-community-header__top-container .fandom-community-header__community-name-wrapper").append(officialBadge);
    } else {
        return;
    }
});