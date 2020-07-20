//Hide pages from Wiki Activity
jQuery(function($) {
    "use strict";
    if ((window.wgCanonicalSpecialPageName || (window.mediaWiki && mediaWiki.config.get('wgCanonicalSpecialPageName'))) !== 'WikiActivity') return;
    var pagelist = ["Spoilers","Talk:Spoilers"]; // <-- Put pages in this list
    $("#wikiactivity-main a.title").each(function() {
         var i, l = pagelist.length, $this = $(this), t = $this.text();
         for (i = 0 ; i < l ; ++i) {
             if (t === pagelist[i]) {
                 $this.closest('li').css('display', 'none');
                 break;
             }
         }
    });
});