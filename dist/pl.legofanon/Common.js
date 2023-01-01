/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*--- Fixy dla profilu użytkownika ---*/

$(function() {
    // Przeniesienie paska wyszukiwania na wysokość nicku
    $('#UserProfileMastheadSearch').appendTo('.masthead-info hgroup h1');
 
    // Przeniesienie przycisku edycji na bardziej logiczne miejsce
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

/*--- Zmiana "użytkownik wiki" na dokładny numer IP //  wersja dla moderatorów, adminów i biurokratów ---*/

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');

/*--- Dodanie przycisku "Odśwież" ---*/
 
PurgeButtonText = 'Odśwież';
importScriptPage('PurgeButton/code.js', 'dev');