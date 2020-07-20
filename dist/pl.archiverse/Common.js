// KONFIGURACJA AJAXRC
window.AjaxRCRefreshText = 'Auto-odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie odświeżaj stronę';
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:AllPages',
    'Special:UncategorizedPages',
    "Specjalna:Ostatnie_zmiany",
    "Specjalna:Aktywność_na_wiki",
    "Specjalna:Wszystkie_strony",
    "Specjalna:Nieskategoryzowane_strony"
];

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'staff', 'helper']
};

// KONFIGURACJA DISCUSSIONSRAILMODULE
window.discussionsModuleConfig = {
    'columns' : '1 ',
    'size' : '4',
    'mostrecent' : 'false'
};

// KONFIGURACJA INACTIVEUSERS
InactiveUsers = {
    text: 'nieobecny'
};

// LICENCJE by Vuh
var LicenseOptions = {
    '{{Brak licencji}}': 'Nie znam licencji',
    '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
    '{{CC-BY-SA}}': 'Plik używany zgodnie z zasadami Creative Commons BY-SA',
    '{{Copyright}}': 'Plik posiadający zastrzeżone prawa autorskie',
    '{{PD}}': 'Plik używany zgodnie z zasadami domeny publicznej',
    '{{Wikimedia}}': 'Plik używany zgodnie z zasadami projektów Fundacji Wikimedia',
};

// IMPORT SKRYPTÓW Z INNYCH WIKI
importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:APIQuery.js",
        "u:pl.tes:MediaWiki:Licenses.js"
    ]
});

// INNE MODYFIKACJE
;(function () {
    function ready () {
        if (!window.hasOwnProperty('DOMTools')) return setTimeout(ready, 1000);
        run();
    }
 
    function run () {
        // AVATARY W HISTORII WĄTKÓW NA TABLICY
        ;(function () {
            var fixDimensions, avatars;
 
            if (!document.getElementById('WallThreadHistory')) return;
 
            fixDimensions = function (avatar) {
                var src = avatar.getAttribute('src');
                avatar.setAttribute('height', '50');
                avatar.setAttribute('width', '50');
                avatar.setAttribute('src', src.slice(0, -2) + 50);
            };
 
            avatars = DOMTools.queryAll('.WallHistory #WallThreadHistory .avatar');
            avatars.forEach(fixDimensions);
        })();
    }
 
    addOnloadHook(ready);
})();

// OSTRZEŻENIE O BRAKU LICENCJI by Vuh
function emptyLicenseAlert(form) {
    var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane."
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() == '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true
        return false
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});