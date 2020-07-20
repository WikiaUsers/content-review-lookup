/**
 * Name:        LangSetup
 * Description: Creates MediaWiki:Lang/xx pages required for
 *              [[Template:LangSelect]] to work
 * Version:     v1.0a
 * Author:      KockaAdmiralac <1405223@gmail.com>
 */
(function(window, $, mw) {
    'use strict';
    if (window.LangSetupLoaded) {
        return;
    }
    window.LangSetupLoaded = true;
    var api, languages,
        contentLang = mw.config.get('wgContentLanguage'),
        token = mw.user.tokens.get('editToken'),
        notCustom = /vstf|helper|util/.test(mw.config.get('wgUserGroups').join('|'));
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:LangSetup.css'
    });
    function log(text) {
        $('.langsetup-log').append('<br />' + text);
    }
    function createPage() {
        var language = languages.shift(),
            title = 'MediaWiki:' +
                (notCustom ? 'Lang' : 'Custom-lang') +
                (language === contentLang ? '' : '/' + language);
        if (language) {
            api.post({
                action: 'edit',
                title: title,
                text: language,
                bot: true,
                minor: true,
                token: token,
                summary: 'Creating page required for [[Template:LangSelect]] to work'
            }).done(function(d) {
                var link = mw.html.element('a', {
                    href: mw.util.getUrl(title)
                }, title);
                if (d.error) {
                    log('An error occurred while creating ' + link + ': ' + d.error.code);
                } else if (d.edit.nochange === '') {
                    log(link + ' already exists!');
                } else {
                    log(link + ' successfully created!');
                }
                createPage();
            });
        } else {
            log('Done installing!');
        }
    }
    function click() {
        $.showCustomModal(
            'Install LangSelect',
            $('<div>', {
                'class': 'langsetup-log',
                text: 'Click on the "Execute" button to start creating MediaWiki pages required for LangSelect to work. Results will be logged here.'
            }).prop('outerHTML'),
            {
                id: 'langselect-modal',
                width: 500,
                buttons: [
                    {
                        id: 'langselect-execute',
                        message: 'Execute',
                        defaultButton: true,
                        handler: createPage
                    },
                    {
                        id: 'langselect-close',
                        message: 'Close',
                        handler: function() {
                            $('#langselect-modal').closeModal();
                        }
                    }
                ]
            }
        );
    }
    function init(d) {
        if (!d || d[1] !== 'success') {
            console.error('[LangSelect] Failed to retrieve language code data');
            return;
        }
        languages = JSON.parse(d[0].replace(/\/\*.*\*\//g, ''));
        api = new mw.Api();
        $('#my-tools-menu').append(
            $('<li>').append(
                $('<a>', {
                    'class': 'langselect-link',
                    text: 'Install LangSelect'  
                }).click(click).wrap('<li>')
            )
        );
    }
    $.when(
        $.get(mw.util.wikiScript('load'), {
            mode: 'articles',
            articles: 'u:dev:MediaWiki:Custom-language-code-sorting',
            only: 'styles'
        }),
        mw.loader.using('mediawiki.api')
    ).then(init);
})(this, jQuery, mediaWiki);