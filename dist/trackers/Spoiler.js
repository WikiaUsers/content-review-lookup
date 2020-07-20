window.SpoilerAlert = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes please',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');