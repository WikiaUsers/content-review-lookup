/*---------------------- SpoilerAlert ----------------------------------*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
/*--------------------------------------------------------------------*/

/*---------------------- BackToTopButton ----------------------------------*/
importScriptPage('BackToTopButton/code.js', 'dev');
/*--------------------------------------------------------------------*/