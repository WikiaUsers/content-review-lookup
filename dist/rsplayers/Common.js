/* <pre> */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

importScript('User:Hairr/rights.js');

/* Ajax auto-refresh */
ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:NewFiles","Special:WikiActivity"];

var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');
 
/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');

/* Collapsible tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Reference popups */
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
/**
     * Collapses navboxes under certain conditions (taken from http://runescape.wikia.com/wiki/MediaWiki:Common.js)
     */
    function navbox() {
 
        var expand = 'show',
            navboxes = $('.navbox'),
            maxShow = 2,     // maximum number of navboxes before they all get collapsed
            maxHeight = 300, // maximum allowable height of navbox before it gets collapsed
            i;
 
        if (mw.config.get('wgCanonicalNamespace') !== '') {
            return;
        }
 
        if ($('.navbox').length === 0) {
            return;
        }
 
        // @param elem - navbox to be collapsed
        function collapseNavbox(elem) {
 
            var rows,
                j,
                toggle;
 
            // temp check until cache is updated
            if ($(elem).hasClass('mw-collapsible') === false) {
                return;
            }
 
            if ($(elem).hasClass('mw-collapsed')) {
                return;
            }
 
            // add the collapsed class
            $(elem).addClass('mw-collapsed');
 
            // make sure we aren't selecting any nested navboxes
            rows = $(elem).children('tbody').children('tr');
 
            // first tr is header
            for (j = 1; j < rows.length; j += 1) {
                $(rows[j]).css({
                    'display': 'none'
                });
            }
 
            // toggle is always in header
            toggle = $(rows[0]).find('.mw-collapsible-toggle');
 
            // this class is required to make expand work properly
            $(toggle).addClass('mw-collapsible-toggle-collapsed');
            $(toggle).children('a').text(expand);
 
        }
 
        if (navboxes.length > (maxShow - 1)) {
            for (i = 0; i < navboxes.length; i += 1) {
                collapseNavbox(navboxes[i]);
            }
        }
 
        for (i = 0; i < navboxes.length; i += 1) {
            if ($(navboxes[i]).height() > maxHeight) {
                collapseNavbox(navboxes[i]);
            }
        }
 
    }

    $(function () {
        navbox();
    });

/* </pre> */