SpoilerAlert = {
            question: 'This page may contain spoilers about unreleased stories. Are you sure you want to read it?',
            yes: 'Hit me with your best shot',
            no: 'Get me the hell out of here',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Contains spoilers');
    }
};
 
window.SpoilerAlert = {
    back: true
};
 
importScriptPage('SpoilerAlert/code.js', 'dev');