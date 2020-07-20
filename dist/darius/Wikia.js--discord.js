/*
 * Discord sidebar module loader.
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for Darius Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/w6vRMkm')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/darius/images/4/44/TAITO_logo.png/revision/latest?cb=20200305025828')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'We now have a official Discord server for all Taito-related wikis, Everything Taito! Join the server to discuss about the Darius series and other Taito games as well.'
 ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/w6vRMkm')
                            .addClass('wds-button')
                            .text('Get invite')
                    )
          )
          .insertBefore('#wikia-recent-activity');
    }
 
    function init() {
        //load once
        if ($('#rsw-discord').length) {
            mw.log('Discord module already loaded');
            return;
        }
 
        if ($('#WikiaRail').hasClass('loaded')) {
            addModule();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addModule);
        }
    }
 
    mw.log('Loading Discord module');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });
 
}(this.jQuery, this.mediaWiki));