// Official Wiki Badges, by Sophiedp and Aeywoo
$.when($.ready, mw.loader.using(["mediawiki.api"])).then(function() {
    "use strict";
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
        var officialBadge = $("<div class=\"official-wiki-badge\" aria-label=\"Official wiki\"><svg class=\"wds-icon official-wiki-badge__icon\"><use xlink:href=\"#wds-icons-official-wiki\"></use></svg><div class=\"official-wiki-badge__label\"><span>Official Wiki</span></div></div>");
        $(".resizable-container .fandom-community-header__top-container .fandom-community-header__community-name-wrapper").append(officialBadge);
    } else {
        return;
    }
});