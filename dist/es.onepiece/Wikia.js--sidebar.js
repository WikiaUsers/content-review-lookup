/*
 * Discord sidebar module loader.
 */
 
;(function ($, mw) {
    'use strict';
 
    // añadiendo un módulo para OP Wiki
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<a>')
                    .attr('href', mw.util.wikiGetlink('One Piece Wiki:Discord'))
                    .append(
                        $('<img>')
                            .attr('src', 'https://vignette.wikia.nocookie.net/shantae/images/b/bf/Finallyitsdone.png')
                    ),
                $('<div>')
                    .append(
                        $('<p>')
                            .append(
                                '¡One Piece Wiki tiene un servidor oficial de Discord! Hace clic en el botón de abajo para unirse y chatear con otros fans y editores de One Piece en vivo. Lee ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('One_Piece_Wiki:Guidebook/Blogs_and_Chat'))
                                    .text('aquí'),
                                ' nuestras normas del chat.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/exSUssW')
                            .addClass('discussions-button')
                            .text('Invitación')
                    )
          )
          .insertBefore('#wikia-recent-activity');
    }
 
    function init() {
        //load once
        if ($('#rsw-discord').length) {
            mw.log('El módulo de Discord ya ha cargado');
            return;
        }
 
        if ($('#WikiaRail').hasClass('loaded')) {
            addModule();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addModule);
        }
    }
 
    mw.log('Cargando módulo de Discord');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });
 
}(this.jQuery, this.mediaWiki));