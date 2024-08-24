/*Spoilers*/
SpoilerAlert = {
    question: 'Esta página contiene Spoilers. ¿Estás seguro de que quieres leerla?',
    yes: 'Sí por favor',
    no: 'No, todavía no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');