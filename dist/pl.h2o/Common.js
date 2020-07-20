// Podpisy zamiast prefiksów
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu H2O Wiki</h2>');
    $('.ns-112 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader .header-title').append('<h2>Strona galerii</h2>');
});

// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = {
    text: 'Nieaktywny'
};

// PRZYCISK DO POWROTU NA GÓRĘ STRONY
$(function ToTop() {
    $('.WikiaBarWrapper .tools')
        .append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});

// PRZENOSI INTERWIKI DO STOPKI NA SPECJALNA:FORUM
$(function() {
    if ($('#forum-display').length) {
        $('#forum-display').insertBefore('#WikiaFooter');
    }
});

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
};

// OSTRZEŻENIE O BRAKU LICENCJI by Vuh
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});

// LICENCJE by Vuh
var LicenseOptions = {
    '{{Brak_licencji}}': 'Nie znam licencji',
    '{{Kadr WK}}': 'Kadr z serialu H2O - Wystarczy kropla',
    '{{Kadr MM}}': 'Kadr z serialu Mako Mermaids: Syreny z Mako',
    '{{Kadr MA}}': 'Kadr z serialu H2O: Syrenie przygody',
    '{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
    '{{Foto użytkownika}}': 'Plik do użytku użytkownika',
    '{{CC-BY-SA}}': 'Creative Commons BY-SA',
    '{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
    '{{Fairuse}}': 'Plik o dozwolonym użytku',
    '{{PD}}': 'Plik znajduje się w domenie publicznej',
    '{{Wikimedia}}': 'Plik z Wikipedii i fundacji Wikimedia',
};

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:Licenses.js"
    ]
});

// EDITBUTTONS by Szynka013
var ExMenu = $('.WikiaPageHeader ul.WikiaMenuElement'),
    ExMenu_Links = '<li><a href="?veaction=edit"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-desktop "></span> VisualEditor</a></li>' +
    '<li><a href="?action=delete"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-trash-o "></span> Usuń</a></li>' +
    '<li><a href="/wiki/Special:MovePage/' + wgPageName + '"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-reply "></span> Zmień nazwę</a></li>' +
    '<li><a href="?action=protect"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-lock "></span> Zabezpiecz</a></li>' +
    '<li><a href="?action=history"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-book "></span> Historia</a></li>' +
    '<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName + '"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-link "></span> Linkujące</a></li>' +
    '<li><a href="?action=purge"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-clock-o "></span> Odśwież</a></li>' +
    '<li><a href="?action=raw&ctype=text/javascript"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-code "></span> Surowa wersja</a></li>';

if (wgUserGroups != 'null') {
    ExMenu.html(ExMenu_Links);
}