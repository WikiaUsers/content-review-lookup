// InfoWidgets dla Strony głównej
$(document).ready(function () {
    if ($('#iw-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
            iwNewPages = Widgets.newPages();
            iwNewPages.selector = '#iw-newpages';
            Widgets.add(iwNewPages);
            iwRecentChanges = Widgets.recentChanges();
            iwRecentChanges.selector = '#iw-recentchanges';
            Widgets.add(iwRecentChanges);
            iwContribs = Widgets.contribs();
            iwContribs.selector = '#iw-contribs';
            Widgets.add(iwContribs);
        }
    }
});