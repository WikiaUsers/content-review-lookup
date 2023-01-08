/*
 * Chargeur de module de barre latérale de Discord.
 */
 
;(function ($, mw) {
    'use strict';
 
    // ajout de module pour Wiki Vocaloid
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', ('https://discord.gg/s63bxtW'))
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/vocaloid/images/2/2d/Discord-Logo-Color.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                'Le Wiki VOCALOID a un serveur officiel de Discord ! Clique le bouton ci-dessous pour rejoindre et dialoguer avec les fans et des contributeurs en direct, ou clique ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Wiki Vocaloid:Discord'))
                                    .text('ici'),
                                ' pour lire les règles du tchat de ce serveur.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/s63bxtW')
                            .addClass('wds-button')
                            .text('Recevoir une invitation')
                    )
          )
          .insertBefore('#wikia-recent-activity');
    }
 
    function init() {
        //load once
        if ($('#rsw-discord').length) {
            mw.log('Module de Discord déjà lancé');
            return;
        }
 
        if ($('#WikiaRail').hasClass('loaded')) {
            addModule();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addModule);
        }
    }
 
    mw.log('Chargement en cours du module de Discord');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });
 
}(this.jQuery, this.mediaWiki));