// KONFIGURACJA AJAXRC
window.ajaxPages = ["Special:RecentChanges", "Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

// KONFIGURACJA DISCUSSIONSRAILMODULE
window.discussionsModuleConfig = {
	'columns' : '1 ',
	'size' : '4',
	'mostrecent' : 'false'
};

// WIDOCZNOŚĆ IP DLA ADMINISTRACJI
window.RevealAnonIP = {
    permissions: ['sysop', 'bureaucrat']
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

importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:APIQuery.js",
        "u:pl.tes:MediaWiki:Licenses.js"
    ]
});

// TOOLTIPS by Nanaki
var tooltips_list = [
    {
        classname: 'hero-tooltip',
        parse: "{"+"{#dpl:|title=<#hero#>|count={"+"{#if:<#hero#>|1|0}}|uses=Szablon:Infobox/Bohatera|include={Infobox/Bohatera¦Bohater/Tooltip}|secseparators=,,<div style='text-align:center;border:2px solid #00c4ff;border-width:0 2px 2px;width:248px;'>[[File:,.svg¦50px]] , [[File:,.svg¦50px]]</div>|multisecseparators=,.svg¦50px]] [[File:,,]]|format=,|suppresserrors=true}}",
    },
];

// PODTYTUŁY BOHATERÓW by Szynka013, Luqreg
// $(".page-header__title").after('<div class="page-header__page-subtitle">' + $("span.changePageTitle").text() + '</div>');

// SECOND RAIL MODULE by Szynka013
$(function(){
    $('<section class="railModule2 rail-module"></section>')
    .appendTo('#WikiaRail')
    .load('/pl/index.php?title=Template:DiscordModule&action=render');
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
}