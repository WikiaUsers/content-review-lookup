// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'rhythmheaven');
// END Additional UserRights Icons in profile mastheads


SpoilerAlert = {
    isSpoiler: function () {
        var h2s = document.getElementsByTagName('h2');
        for (var i = 0, c = h2s.length; i < c; i++) {
            if (/spoiler/i.test($(h2s[i]).text())) return true;
        }
        return false;
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');