/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Mushoku Tensei Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/BPVmDNC')
                    .append(
                        $('<img>')
                            .attr('src', 'https://cdn.discordapp.com/attachments/1014328563878592672/1015757593270038598/Slime_Discord_Banner.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Tales of Aida have an Official Discord Server! Click the button below to join and chat with fellow fans live!'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/BPVmDNC')
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