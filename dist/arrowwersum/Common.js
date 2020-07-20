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

// KONFIGURACJA ADDRAILMODULE
window.AddRailModule = [
    {
        page: 'Template:RailModule',
        prepend: true,
        maxAge: 86400
    }
];

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
        // LINK DO WĄTKU DOT. ODCINKA W DYSKUSJACH
        ;(function () {
            var button, header;
 
            if (!document.getElementById('EpisodeThread')) return;
            
            header = DOMTools.query('.page-header .wds-button-group');
            button = DOMTools.query('#EpisodeThread');
            
            DOMTools.after(header, button);
        })();
        
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
        
        // DISCORD WIDGET BOT
        // WidgetBot: https://github.com/widgetbot-io/widgetbot
        // Crate: https://github.com/widgetbot-io/widgetbot/tree/2.5/packages/crate
        ;(function () {
            var regex = /"(\w+)":/g;
 
            var crateOptions = {
                channel: '327221771088560128',
                server: '327221771088560128',
                shard: 'https://e.widgetbot.io',
                color: '#95623a',
                location: ['bottom', 'right']
            };
 
            var options = JSON.stringify(crateOptions, null, 4);
            options = options.replace(regex, '$1:');
 
            var popupData = {
                content: 'Chcesz porozmawiać o superbohaterach? Wbijaj na nasz serwer!',
                timeout: 10000,
                avatar: 'https://vignette.wikia.nocookie.net/szynka013/images/d/d9/DiscordModuleAW.jpg/revision/latest?cb=20191121095826&path-prefix=pl'
            };
 
            var popup = JSON.stringify(popupData, null, 4);
            popup = popup.replace(regex, '$1:');
 
            var script = document.createElement('script');
            script.setAttribute('id', 'WidgetCrate');
            script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3');
            script.setAttribute('async', '');
            script.setAttribute('defer', '');
            script.textContent = 'var crate = new Crate(' + options + ');\n\n';
            script.textContent += 'crate.notify(' + popup + ')';
 
            DOMTools.appendTo(document.head, script);
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

// DODATKOWE PRZYCISKI W EDYTORZE ŹRÓDŁA by Wedkarski
if (typeof(mwCustomEditButtons) != 'undefined') {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/8/85/Cudzyslow-icon.svg",
        "speedTip": "Wstaw polskie cudzysłowy",
        "tagOpen": "„",
        "tagClose": "”",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/d/d7/Ppauza.svg",
        "speedTip": "Wstaw półpauzę",
        "tagOpen": "–",
        "tagClose": "",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/szynka013/pl/images/8/8c/Apostrof.svg",
        "speedTip": "Wstaw apostrof",
        "tagOpen": "’",
        "tagClose": "",
        "sampleText": ""
    };
}