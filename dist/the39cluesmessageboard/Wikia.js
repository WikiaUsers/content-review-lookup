/* Spoiler alert */
window.SpoilerAlert = {
    question: 'This page is locked for certain people. Are you sure you wish to proceed?',
    yes: 'I'll risk it.',
    no: 'Nahhhhhh.',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');