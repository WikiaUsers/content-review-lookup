(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoilers', cats) !== -1,
        underconstruction  = $.inArray('Under Construction',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || underconstruction;
    };
    if (spoiler && underconstruction) {
        window.SpoilerAlert.question = 'This page contains unfinished content and spoilers, would you like to continue?';
        window.SpoilerAlert.no = 'No, I will wait until it is done.';
        window.SpoilerAlert.yes = 'Yes, I would like to read this page.';
    } else if (spoiler) {
        window.SpoilerAlert.question = 'This page contains spoilers, would you like to continue?';
        window.SpoilerAlert.no = 'No, I will read it later.';
        window.SpoilerAlert.yes = 'Yes, I would like to read this page.';
    } else if (underconstruction) {
        window.SpoilerAlert.question = 'This page is currently unfinished, would you like to continue reading?';
        window.SpoilerAlert.no = 'No, I will wait until it is done.';
        window.SpoilerAlert.yes = 'Yes, I would like to continue reading.';
    }
}());
importScriptPage('MediaWiki:SpoilerAlert.js');