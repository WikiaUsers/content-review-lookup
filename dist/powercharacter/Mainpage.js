$(document).ready(function() {
    if ($('#info-widgets').length) {
        impart('u:dev:MediaWiki:InfoWidgets/code.js');
        window.widgetsLoaded = function() {

            np = Widgets.newPages();
            np.selector = '#new-pages';
            Widgets.add(np);

            rc = Widgets.recentChanges();
            rc.selector = '#recent-changes';
            Widgets.add(rc);

            nf = Widgets.newFiles();
            nf.selector = '#new-files';
            Widgets.add(nf);

            np.postload = rc.postload = nf.postload = function(div) {
                div.css({
                    backgroundImage: 'none'
                });
                $('#info-widgets a').each(function() {
                    var replacer = /\?/g;
                    this.href = this.href.replace(replacer, "%3F");
                    $('#info-widgets a').attr('target', '_blank');
                });
            };
        };
    }
});
$(window).load(function() {
    tabberAutomatic();
});