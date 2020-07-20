/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Przycisk do góry*/
window.BackToTopModern = true;
window.BackToTopStart = 1000;

/* Przycisk anuluj by TK-999 i Rappy_4187 */
$(function addCancel() {
    if (typeof(wgIsEditPage) != 'undefined') {
    $('<span id="cancbutton" class="button" style="margin-top:2px"><a href="' + mw.util.wikiGetlink() + '"><span style="color:#FFFFFF">Anuluj</span></a></span>').appendTo('#EditPageHeader h2');
    }
});

/* InactiveUser polski tekst */
InactiveUsers = { text: 'nieaktywny' };

/* Usunięcie obrazka w podgladzie stron */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/200?cb=20160122074659&path-prefix=pl';