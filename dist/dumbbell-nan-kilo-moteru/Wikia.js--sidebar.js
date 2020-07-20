/*
 * Discord sidebar module loader.
 * Adapted from the One Piece Wiki
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for Dumbbell Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', 'https://discord.gg/wVuUhaF')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/dumbbell-nan-kilo-moteru/images/4/42/DiscordLogoDumbbell.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Dumbbell Nan-Kilo Moteru? Wiki has a Discord Server! Click the button below to join and chat with fellow fans and editors live!'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/wVuUhaF')
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