jQuery(function($) {
    "use strict";
    var mw = window.mediaWiki || { config: { get: function(p) { return window[p]; } } };
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity') return;
    var pagelist = ["Legendary Wars Wiki"]; // <-- Put pages in this list
    $("#wikiactivity-main a.title").each(function() {
         var i, l = pagelist.length, $this = $(this), t = $this.text();
         for (i = 0 ; i < l ; ++i) if (t === pagelist[i]) $this.closest('li').css('display', 'none');
    });
});
/* Script Import */
/********************************************************************************/
importArticles({
    type: "script",
    articles: [
        "external:dev:RevealAnonIP/code.js",
        "external:dev:Countdown/code.js",
        "external:dev:FixWantedFiles/code.js",
        "external:dev:EditIntroButton/code.js",
        "MediaWiki:Common.js/BackToTopButton.js",
        "external:dev:UserBadges/code.js",
        "MediaWiki:DynamicFunctions.js"
    ]
});