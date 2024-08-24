// Configuration AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Videos", "Images"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/gumball/images/0/0f/AjaxRC_Load.gif/revision/latest?cb=20170709194656&path-prefix=fr';
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Rafraîchissement auto',
    'ajaxrc-refresh-hover': 'Rafraîchir automatiquement la page'
}}}}});

// Plugin GlobalEdit
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});