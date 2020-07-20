/*
 * Custom sidebar module loader.
 */
 
;(function ($, mw) {
    'use strict';
 
    // add module for [[RS:DISCORD]]
    function addDiscordModule() {
        $('<section>')
            .attr({
                'id': 'rsw-discord',
                'class': 'rsw-custom-module rail-module'
            })
            .append(
                $('<a />')
                    .attr('href', mw.util.wikiGetlink('RuneScape:Discord'))
                    .append($('<img />').attr('src', '//runescape.wikia.com/wiki/Special:FilePath/Discord_Partner_badge.svg')),
                $('<div />').append(
                    $('<p />').append(
                        'La RuneScape Wiki tiene su propio canal oficial en Discord! Haz click en el botón de abajo para unirte, o haz click ',
                        $('<a />')
                            .attr('href', mw.util.wikiGetlink('RuneScape:Discord'))
                            .text('aquí'),
                        ' para más detalles acerca de nuestro servidor.'
                    ),
                    $('<a />')
                        .attr('href', 'https://discord.gg/vgjxN8m')
                        .addClass('wds-button')
                        .text('Únete al servidor')
                )
            )
            .insertBefore('#wikia-recent-activity');
    }
 
    // add module for latest update
    // modified from <http://dev.wikia.com/wiki/AddRailModule>
    function addLatestUpdate() {
        (window.ARMModules || ['Template:RailModule']).forEach(function(el) {
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                text: '{' + '{' + el + '}}',
                title: mw.config.get('wgPageName'),
                format: 'json'
            }).done(function(d) {
                var $section = $('<section>', {
                    'id': 'rsw-update',
                    'class': 'rsw-custom-module rail-module',
                    html: d.parse.text['*']
                }).insertBefore('#wikia-recent-activity');
                mw.hook('wikipage.content').fire($section);
            });
        });
    }
 
    function init() {
        // load once
        if ($('#rsw-discord').length) {
            mw.log('RuneScape Wiki custom modules already loaded');
            return;
        }
 
        if ($('#WikiaRail').hasClass('loaded')) {
            addDiscordModule();
            addLatestUpdate();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addDiscordModule);
        }
    }
 
    mw.log('Loading RuneScape Wiki custom modules');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });
 
}(this.jQuery, this.mediaWiki));