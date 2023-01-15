/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Demon Accords Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/P5WXMVj')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/demon-accords/images/6/64/Demon_Accords_Server_Banner.png/revision/latest?cb=20191222020254')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'Demon Accords Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Demon Accords Wiki:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/P5WXMVj')
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