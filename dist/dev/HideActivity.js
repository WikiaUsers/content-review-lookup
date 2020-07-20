jQuery(function($) {
    "use strict";
    if (typeof pagelist === 'undefined' || mw.config.get('wgCanonicalSpecialPageName') !== 'WikiActivity') {
        return;
    }
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