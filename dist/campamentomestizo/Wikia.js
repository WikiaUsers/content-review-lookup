/*Spoilers*/
SpoilerAlert = {
    question: 'Esta p�gina contiene Spoilers. �Est�s seguro de que quieres leerla?',
    yes: 'S� por favor',
    no: 'No, todav�a no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');