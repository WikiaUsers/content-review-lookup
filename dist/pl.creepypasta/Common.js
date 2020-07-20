/*--- IPKI ---*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};

/* --- NIEAKTYWNY UŻYTKOWNIK --- */
InactiveUsers = {
    text: 'nieobecny'
};

/*--- Szablon:Username ---*/
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
}

/*--- Licencje ---*/
function emptyLicenseAlert(form) {
    var msg = "<font style='color:red;text-shadow:0 0 5px darkred'>Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji mogą zostać usunięte.</font>";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
// Licencje plików
var LicenseOptions = {
    '{{Brak_licencji}}': 'Nie znam licencji',
        '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
        '{{CC-BY-SA}}': 'Pliki na licencji Creative Commons',
        '{{Copyright}}': 'Zastrzeżone prawa autorskie',
        '{{PD}}': 'Plik znajduje się w domenie publicznej',
        '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
// Komunikat licencji
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została dodana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji mogą zostać usunięte przez administrację po 3 dniach od ich wstawienia.";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function (e) {
    return emptyLicenseAlert(this);
});

$('#mw-upload-form').submit(function (e) {
    return emptyLicenseAlert(this);
});

/*--- Stare blogi ---*/
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
    nonexpiryCategory: "Niearchiwizowane blogi"
};

/*--- Informowanie o braku licencji ---*/
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Proszę o dodanie odpowiedniej licencji.";
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function (e) {
    return emptyLicenseAlert(this);
});

/*--- Blokada starych blogów i wątków ---*/
window.LockForums = {
    expiryDays: 15,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 15 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum"
};

window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Nikt nie skomentował tego blogu od ponad 30 dni. Nowy komentarz zostałby i tak prawdopodobnie uznany za odkopywanie starych dyskusji, więc możliwość komentowania została automatycznie wyłączona. Jeśli jesteś autorem bloga i chcesz, aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktualne"
};

/*--- Import skryptów ---*/
importArticles({
    type: "script",
    articles: [
        'u:dev:LockOldBlogs/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:pl.gothic:MediaWiki:Common.js/wandalizm.js',
        'u:pl.tes:MediaWiki:Change.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:SocialIcons/code.js',
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js",
        'u:dev:RevealAnonIP/code.js',
        'u:dev:InactiveUsers/code.js'
    ]
});

/*--- Automatyczne odświeżanie Ostatnich Zmian ---*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});
 
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża tę stronę';
window.ajaxRefresh = 60000;