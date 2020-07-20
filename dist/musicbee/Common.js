/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function () {
    if ($('#commentfeed').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
            myWidget = Widgets.newPages();
            myWidget.selector = '#commentfeed';
            Widgets.add(myWidget);
        }
    }
});