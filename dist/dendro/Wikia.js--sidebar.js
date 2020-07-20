/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for Infinite Dendrogram Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/98hqjRg')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/dendro/images/9/94/WikiIcon.png/revision/latest/scale-to-width-down/240?cb=20190217055247')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'The Infinite Dendrogram Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Infinite Dendrogram Wiki:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/98hqjRg')
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