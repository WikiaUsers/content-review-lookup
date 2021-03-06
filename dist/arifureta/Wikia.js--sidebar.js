/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Arifureta Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/TBBuWQB')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/arifureta-shokugyou-de-sekai-saikyou/images/8/8a/Arifureta_Discord_Banner.png/revision/latest/scale-to-width-down/250?cb=20190420070113')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Arifureta Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Project:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/TBBuWQB')
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