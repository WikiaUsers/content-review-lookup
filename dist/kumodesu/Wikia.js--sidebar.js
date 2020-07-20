/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Kumo Desu Ga, Nani Ka? Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://https://discord.gg/8mkvNuG')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/kumo-desu-ga-nani-ka/images/c/c5/Kumo_Desu_Ga_Nani_Ka_Wiki_Discord_Logo.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Kumo Desu Ga, Nani Ka? Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Kumo Desu Ga, Nani Ka? Wiki:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/8mkvNuG')
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