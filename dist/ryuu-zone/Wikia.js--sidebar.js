/*
 * Discord sidebar module loader.
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for unOrdinary Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', 'https://discord.gg/NqpaCkb')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/ryuu-zone/images/6/6b/Uru-chan_Q%26A.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Official UnOrdinary Discord server will be hosting two uru-chan Q&As!! The first event will be on September 13 at 7:30PM EST and will consist of a chat on Discord where people can ask her questions through text! The second event will be on September 15 at 7:30PM EST and will consist of a voice chat on Discord! For more info, join the server! See you then!'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/NqpaCkb')
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