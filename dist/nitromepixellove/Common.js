/* Any JavaScript here will be loaded for all users on every page load. */

/*Spoilers*/
(function () {
    var cats = mw.config.get('wgCategories'),
        spoiler = $.inArray('Spoiler', cats) !== -1,
        mature  = $.inArray('Mature content',cats) !== -1;
    window.SpoilerAlert = {};
    window.SpoilerAlert.isSpoiler = function () {    
        return spoiler || mature;
    }; 
back: true
    if (mature && spoiler) {
        window.SpoilerAlert.question = 'This page contains mature content and spoilers. Are you sure you want to read it?';
    } else if (mature) {
        window.SpoilerAlert.question = 'This page contains mature content. Are you sure  you want to read it?';
    } else if (spoiler) {
        window.SpoilerAlert.question = 'This page contains spoilers. Are you sure you want to read it?';
    }
}());
importScriptPage('SpoilerAlert/code.js', 'dev');

/*Showhide*/
importScriptPage('ShowHide/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
'w:c:dev:DisplayClock/code.js'
    ]
});