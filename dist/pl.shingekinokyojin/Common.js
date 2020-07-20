/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

ajaxPages = ["Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki"];
AjaxRCRefreshText = 'Automatyczne odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża stronę';

// MW:Oasis-home override (LOVE IS FANDOM)
$(function() {
    $('body.mainpage .page-header__title').text($('.mainpage-title[data-title]').data('title'));
});