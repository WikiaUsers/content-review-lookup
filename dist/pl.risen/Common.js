// Importy
importArticles({
    type: "script",
    articles: [
        "u:pl.tes:MediaWiki:Change.js",
        "u:pl.tes:MediaWiki:APIQuery.js",
        "u:pl.tes:MediaWiki:Licenses.js",
        "u:pl.tes:MediaWiki:Change.js",
    ]
});

// Licencje
var LicenseOptions = {
    '{{Nieznana}}': 'Nie znam licencji',
    '{{Screenshot}}': 'Screenshot z gry',
    '{{Screenshot-wikia}}': 'Screenshot strony wiki',
    '{{Logo}}': 'Logo gry lub firmy',
    '{{CC-BY-SA}}': 'Creative Commons 3.0',
    '{{Fair-use}}': 'Plik ma dozwolone użycie',
    '{{PD}}': 'Plik należy do domeny publicznej',
    '{{Wikimedia}}': 'Plik pochodzi z Wikipedii'
};

// AjaxRC
window.ajaxSpecialPages = [
    "Recentchanges",
    "Log",
    "Newpages",
    "Newfiles",
    "WikiActivity"
];