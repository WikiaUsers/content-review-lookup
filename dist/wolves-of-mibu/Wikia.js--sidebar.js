/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Wolves of Mibu Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/H26WJTC')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/wolves-of-mibu/images/b/be/DysOkami_Logo.png/revision/latest/scale-to-width-down/480?cb=20190114131517')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Wolves of Mibu Wiki has an Official Discord Server! Click the button below to come join and chat, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Project:Discord policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/H26WJTC')
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