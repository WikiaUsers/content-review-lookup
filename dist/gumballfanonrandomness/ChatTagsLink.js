/**
 * Chatags link
 * Allows for links to be added to the Chatags
 */
 
;(function(mw){
    if (mw.config.get('wgCanonicalSpecialPageName') != "Chat" || typeof chatags == "undefined") {
        return;
    }
    chatags.tags.link = function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/link]', '</a>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[link="' + t[1] + '"]', '<a href="http://' + mw.html.escape(t[1]) + '">');
            } catch(e) { 
                console.log(e); 
                }
            }
        return s;
    };
})(mediaWiki);