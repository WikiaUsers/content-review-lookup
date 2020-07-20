/**
 * 
 * 
 * 
 * @STAFF, DECLINE THIS SCRIPT IF SUBMITTED. IT'S NOT READY FOR PRODUCTION
 * 
 * 
 * 
 * <nowiki>
 * @name Solicitudes
 * @description Gestor de solicitudes para Comunidad Central
 * @author Unai01
 */
require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], function ($, mw, BannerNotification, ui, t) {
    var Solicitudes = {
        name: 'Solicitudes',
        version: '0.0.1',
        author: [
            'Unai01'
        ],
        config: mw.config.get([
            'wgNamespaceNumber',
            'wgTitle',
            'wgSiteName'
        ]),
        init: function () {
            if (this.config.wgNamespaceNumber !== -1 && this.config.wgTitle !== this.name) {
                return;
            }
            this.setTitle();
            this.render();
        },
        setTitle: function () {
            document.title = this.name + ' | ' + this.config.wgSiteName + ' | FANDOM powered by Wikia';
            $('#PageHeader').find('.page-header__title').text(this.name);
        },
        render: function () {
            $('.WikiaArticle').prepend('<svg class="wds-spinner loading-spinner wds-spinner__block" width="78" height="78" viewBox="0 0 78 78" xmlns="http://www.w3.org/2000/svg"><g transform="translate(39, 39)"><circle class="wds-spinner__stroke" fill="none" stroke-width="2" stroke-dasharray="239" stroke-dashoffset="239" stroke-linecap="round" r="38"</circle></g></svg>')
            $('#mw-content-text').fadeOut('slow')
            $.when.apply($, $.get(mw.util.wikiScript('load'), {
                mode: 'articles',
                articles: 'MediaWiki:Custom-requests-types',
                only: 'styles'
            }).done(function (d) {
                importStylesheet('MediaWiki:Solicitudes.css');
                var json = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
                $('#mw-content-text').html(
                    $('<div>', {
                        id: 'CCRequests'
                    }).append(
                        $('<h1>', {
                            class: 'requests--header',
                            text: 'Solicitudes'
                        }),
                        $('<section>', {
                            class: 'requests--types'
                        })
                    ))
                $(Object.keys(json).map(function (map) {

                    new mw.Api().get({
                        action: 'parse',
                        text: [
                            '{{#dpl:',
                            '    | category =' + json[map].categories['ongoing'],
                            '    | include = {Solicitud de adopción}:Enlace',
                            '    | format = ,<li data-link="%NAMESPACE%:%TITLE%">[[%NAMESPACE%:%TITLE%|²{#sub:%TITLE%|0|-10}²]] <span class="author">[[User:%USER%¦%USER%]]</span> ([[w:c:,]])<br />',
                            '    | count = 10',
                            '    | addauthor   = true',
                            '    }}',
                        ].join('\n'),
                        disablepp: true
                    }).done(function (d) {
                        $('.requests--types').append($('<div>', {
                            id: map
                        }).html($('<h3>', {
                            text: map
                        })))
                        $('.requests--types').find('#' + map).append(
                            $('<div>').append(d.parse.text['*']))
                    })

                }))

            })).then(function () {
                $('#mw-content-text').fadeIn('slow')
                $('.loading-spinner').remove()
              })
        }

    }
    Solicitudes.init();
});