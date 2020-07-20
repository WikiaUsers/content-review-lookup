/** <nowiki>
 * Add contribs and watchlist links to Account navigation dropdown
 * Original author unknown
 *
 * @author Ryan PM
 * @author Cqm
 */
(function ($, console, document, rswiki) {

    'use strict';

    // make sure the gadgets property exists
    rswiki.gadgets = rswiki.gadgets || {};

    rswiki.gadgets.addContribs = function () {
        $('#AccountNavigation > li > .subnav > li:first-child').after(
            $('<li/>').attr({
                'id': 'MyContribs'
            }).append(
                $('<a/>').attr({
                    'href': '/wiki/Special:MyContributions'
                }).text('My contributions')
            ),
 
            $('<li/>').attr({
                'id': 'MyWatchlist'
            }).append(
                $('<a/>').attr({
                    'href': '/wiki/Special:Watchlist'
                }).text('My watchlist')
            )
        );
    };

    $(rswiki.gadgets.addContribs);

}(this.jQuery, this.console, this.document, this.rswiki = this.rswiki || {}));

/* </nowiki> */