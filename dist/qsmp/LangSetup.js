/**
 * Name:        LangSetup
 * Description: Creates MediaWiki:Lang/xx pages required for
 *              [[Template:LangSelect]] to work
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 */
;(function($, mw) {
    'use strict';
    if (window.LangSetupLoaded) return;
    window.LangSetupLoaded = true;
    var api, languages,
        contentLang = mw.config.get('wgContentLanguage'),
        notCustom = /soap|helper|wiki-specialist|wiki-representative|staff|util/.test(mw.config.get('wgUserGroups').join('|')),
        // [[MediaWiki:Custom-language-codes.json]]
        languageCodeSortingId = 33075,
        modal;
    var preloads = 3;
    var msg;
    function log(text) {
        $('.langsetup-log').append('<br />' + text);
    }
    function createPage() {
        var language = languages.shift(),
            title = 'MediaWiki:' +
                (notCustom ? 'Lang' : 'Custom-lang') +
                (language === contentLang ? '' : '/' + language);
        if (language) {
            api.postWithEditToken({
                action: 'edit',
                title: title,
                text: language,
                bot: true,
                minor: true,
                summary: msg('summary').plain()
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
        modal.show();
    }
    function init(d) {
        if (!d || !d.batchcomplete) {
            console.error('[LangSetup] Failed to retrieve language code data');
            return;
        }
        languages = JSON.parse(d.query.pages[0].revisions[0].slots.main.content);
        api = new mw.Api();
        modal = new window.dev.modal.Modal({
            buttons: [
                {
                    id: 'langsetup-execute',
                    event: 'execute',
                    primary: true,
                    text: msg('execute').plain()
                }
            ],
            content: $('<div>', {
                'class': 'langsetup-log',
                text: msg('text').plain()
            }).prop('outerHTML'),
            events: {
                execute: createPage
            },
            id: 'langsetup-modal',
            size: 'large',
            title: msg('install').plain()
        });
        modal.create();
        $('#my-tools-menu').append(
            $('<li>').append(
                $('<a>', {
                    'class': 'langsetup-link',
                    text: msg('install').plain()  
                }).click(click).wrap('<li>')
            )
        );
    }
    function preload() {
        if (--preloads>0) return;
        window.dev.i18n.loadMessages('LangSetup').done(function (i18no) {
            msg = i18no.msg;
            $.ajax({
                type: 'GET',
                url: 'https://dev.fandom.com/api.php',
                data: {
                    action: 'query',
                    format: 'json',
                    pageids: languageCodeSortingId,
                    prop: 'revisions',
                    rvprop: 'content',
                    rvslots: 'main',
                    origin: '*',
                    formatversion: 2
                },
                dataType: 'json'
            }).then(function(data) {
                init(data);
            });
        });
    }
    mw.loader.using('mediawiki.api').then(preload);
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);
   
    importArticles({
        type: 'style',
        articles: [
        	'u:dev:MediaWiki:LangSetup.css'
    	]
    },
    {
        type: 'script',
        articles: [
        	'u:dev:MediaWiki:Modal.js',
        	'u:dev:MediaWiki:I18n-js/code.js'
    	]
    });
})(window.jQuery, window.mediaWiki);