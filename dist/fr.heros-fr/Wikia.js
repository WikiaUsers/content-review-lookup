(function ($, mw) {
    'use strict';
    
    // add module for Wiki Heroes Fr.
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                                        .attr('href', 'https://discord.com/invite/Mvas27K')
                    .append(
                        $('<img>')
                            .attr('src', 'data:image/jpeg;base64,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')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'Le Wiki Heroes Fr. poss�de un serveur Discord fond� en 2020. Passez y faire un tour.'
 ),
                        $('<a>')
                            .attr('href', 'https://discord.com/invite/Mvas27K')
                            .addClass('wds-button')
                            .text('Obtenir une invitation')
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