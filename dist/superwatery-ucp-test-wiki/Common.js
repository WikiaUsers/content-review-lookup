/* Any JavaScript here will be loaded for all users on every page load. */
// Report Forms
//importScript("MediaWiki:ReportV.js");
//importScript("MediaWiki:ReportS.js");
importScript("MediaWiki:Reports.js");

window.pageNames = [
'PAGENAMEWITHOUTPREFIX',
'ANOTHERPAGENAMEWITHOUTPREFIX'
];
window.pageData = [
'DATAFORFIRSTPAGEINABOVELIST',
'DATAFORSECONDPAGEINABOVELIST'
];
window.pagePurpose = [
'PURPOSEOFFIRSTPAGE',
'PURPOSEOFSECONDPAGE'
];

window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions", "AbuseLog", "BlockList"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
'ajaxrc-refresh-text': 'AJAX',
'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});