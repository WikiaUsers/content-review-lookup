/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for The Rising of a Shield Hero Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/7FRuKPa')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/destruction-flag-otome/images/b/bb/Discord_Banner.png/revision/latest/scale-to-width-down/250?cb=20200416084312')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Destruction Flag Otome Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Project:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/7FRuKPa')
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