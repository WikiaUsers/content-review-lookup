/* ================================================== */
/* ====   Reddit Widget                          ==== */
/* ================================================== */
(function($, mw) {
    "use strict";
    var redditcontent = '';
    document.write = function insert(s) {
        redditcontent += s;
    };
    $.getScript('https://www.reddit.com/r/LightNovels/new/.embed?limit=20&t=all&sort=new&twocolumn=true&target=blank', function Reddit() {
        $('#reddit-LN').append(redditcontent);
    });
    mw.loader.using("mediawiki.util", function() {
        insert(s);
        if (window.MutationObserver) {
            var observer = new MutationObserver(function() {
                    Reddit();
                    this.disconnect();
                }),
                target = document.querySelector('#reddit-LN'),
                config = {
                    attributes: true,
                    childList: true,
                    characterData: true
                };
            observer.observe(target, config);
        } else $(window).load(Reddit);
    });
}(jQuery, mediaWiki));