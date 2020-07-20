/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];

$('.left').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll-600},800);
});
$('.right').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll+600},800);
});