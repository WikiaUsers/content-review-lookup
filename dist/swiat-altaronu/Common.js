/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
 question: 'Czytanie dokładnego opisu może zepsuć przyjemność z samodzielnego odkrywania tajemnic. Czy na pewno chcesz zobaczyć dokładny opis?',
            yes: 'Pokaż opis',
            no: 'Jednak zrezygnuję',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');