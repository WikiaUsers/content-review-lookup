/*ChatTags*/
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
// Wait until object will be in loaded or in scope.
var checkExist = setInterval(function() {
    if (typeof chatags === 'undefined') {
        return;
    }
 
    chatags.tags['wd'] = function(s,t) {  
        return (t.charAt(0) === '/') ? 
            s.replace('[/wd]', '</span>') :
            s.replace('[wd]', '<span style="font-family: Wingdings">');
    };
    clearInterval(checkExist);
}, 1000);