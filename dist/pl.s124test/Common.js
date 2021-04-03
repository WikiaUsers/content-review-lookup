/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Licencje do plików */
function emptyLicenseAlert(form) {
    var msg = "Dodaj licencje do pliku! W przeciwnym razie obrazek, który próbujesz wgrać zostanie usunięty!";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
/* Koniec */
 
/* Szablon:USERNAME */
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* Koniec */
 
/* Automatyczne odświeżanie - by Rappy 4187; thanks!  */
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20140403182112/emoticon/images/f/f2/1_%2873%29.gif';
window.ajaxPages = [
    'Specjalna:Filmy',
    'Specjalna:Ostatnie_zmiany',
    'Specjalna:Aktywność_na_wiki',
    'Specjalna:Nowe_pliki',
    'Specjalna:Forum'
];
window.ajaxRCRefreshText = 'Automatyczne odświeżanie strony';
window.ajaxRCRefreshHover = 'Włącza automatyczne odświeżanie tej strony.';
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
    ]
}, {
    type: 'style',
    article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});
/* Koniec */

/* Test tło nocne */
var bgrandom_nightmode = true,
    bgrandom_nightmode_list = ["Tosuu.gif"];