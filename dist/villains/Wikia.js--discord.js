/*
 * Discord sidebar module loader. Pulled from Kenja no Mago Wiki
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for Villains Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/VKwEeDm')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/villains/images/0/09/2019012401493690345.png/revision/latest?cb=20190814232100')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'Villains Wiki now has an Official Discord Server founded in 2018! Click the button below to join and chat with others villainous users and our Overlords live! Welcome to our hideout!'
 ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/VKwEeDm')
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