/* Any JavaScript here will be loaded for all users on every page load. */
/* Spoiler code - hides pages in Category:Spoiler */
window.SpoilerAlert = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes, I am',
    no: 'No, not yet',
 isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    },
    back: true
};
 
importScriptPage('SpoilerAlert/code.js', 'dev');