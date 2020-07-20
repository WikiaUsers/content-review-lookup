/* JavaScript kod na ovoj stranici bit će izvršen kod svakog suradnika pri svakom učitavanju svake stranice wikija. */
/* Automatsko osvježavanje stranica nedavnih promjena */
window.ajaxPages = [];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Automatsko osvježavanje',
    'ajaxrc-refresh-hover': 'Automatski osvježavaj stranicu',
}}}}});