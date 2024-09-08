window.SpoilerAlert = {
    question: 'Diese Seite enthält Spoiler. Möchten Sie sie trotzdem ansehen?',
    yes: 'Aber ja doch',
    no: 'Nein, noch nicht',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');