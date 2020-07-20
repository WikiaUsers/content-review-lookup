/*
 * Discord sidebar module loader.
 */

;(function ($, mw) {
    'use strict';

    // add module for How NOT to Summon a Demon Lord Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.gg/bsyw96J')
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/isekai-maou-to-shoukan-shoujo-dorei-majutstu/images/8/84/RSD.png/revision/latest?cb=20180711075659&format=original')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'How NOT to Summon a Demon Lord Wiki has an Official Discord Server! Click the button below to join and chat with fellow fans live, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Project:Discord_Policy'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/bsyw96J')
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