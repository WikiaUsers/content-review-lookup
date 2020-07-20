( function ($, mw) {
    
    'use strict';
    
    var conf = mw.config.get([
        'wgPageName',
        'wgNamespaceNumber'
    ]);
    
    var users = [
        'AJWChatBot'
    ];
    
    function hideMW() {
        $('#Wall').hide();
    }
    
    function checkMW() {
        if($.inArray(wgPageName.split(":")[1], users) > -1) {
            hideMW();
        }
    }
    
    function init() {
        if (conf.wgNamespaceNumber == 1200) {
            mw.loader.using(['mediawiki.util'], checkMW());
        }
    }
    
    $(init);
    
}(jQuery, mediaWiki));