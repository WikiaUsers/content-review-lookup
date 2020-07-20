/** <pre>
 * Adding links to Special:WhatLinksHere and Special:PrefixIndex to edit dropdown
 */

;(function ($, mw) {
    'use strict';

    var conf = mw.config.get([
            'wgAction',
            'wgPageName'
        ]);

    $(function() {
        if (conf.wgAction !== 'view') {
            return;
        }

        $('.page-header__contribution-buttons .wds-dropdown__content li:last-child, .UserProfileActionButton .wikia-menu-button .WikiaMenuElement li:last-child')
            .after(
                $('<li>')
                    .append(
                        $('<a>')
                            .attr('href', '/wiki/Special:PrefixIndex/' + conf.wgPageName)
                            .text('Subpages')
                    ),

                $('<li>')
                    .append(
                        $('<a>')
                            .attr('href', '/wiki/Special:WhatLinksHere/' + conf.wgPageName)
                            .text('What links here')
                    )
            );
    });

}(jQuery, mediaWiki));