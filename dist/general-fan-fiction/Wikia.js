// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

SpoilerAlert = {
            question: 'This page may contain sexual content not suitable for some readers. Are you sure you want to read it?',
            yes: 'Dis gon b gud',
            no: 'No',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Sexual Content');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');