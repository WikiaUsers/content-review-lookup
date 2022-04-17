/**
 * Name:        LangSetup
 * Description: Creates MediaWiki:Lang/xx pages required for
 *              [[Template:LangSelect]] to work
 * Version:     v1.1
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 */
(function(window, $, mw) {
    'use strict';
    if (window.LangSetupLoaded) {
        return;
    }
    window.LangSetupLoaded = true;
    var api, languages,
        contentLang = mw.config.get('wgContentLanguage'),
        notCustom = /soap|helper|wiki-specialist|wiki-representative|staff|util/.test(mw.config.get('wgUserGroups').join('|')),
        // [[MediaWiki:Custom-language-codes.json]]
        languageCodeSortingId = 33075,
        modal;
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:LangSetup.css'
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Modal.js'
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
            api.postWithEditToken({
                action: 'edit',
                title: title,
                text: language,
                bot: true,
                minor: true,
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
        modal.show();
    }
    function init(d, modalLib) {
        if (!d || d[1] !== 'success') {
            console.error('[LangSetup] Failed to retrieve language code data');
            return;
        }
        languages = JSON.parse(d[0].query.pages[languageCodeSortingId].revisions[0]['*']);
        api = new mw.Api();
        modal = new modalLib.Modal({
            buttons: [
                {
                    id: 'langsetup-execute',
                    event: 'execute',
                    primary: true,
                    text: 'Execute'
                }
            ],
            content: $('<div>', {
                'class': 'langsetup-log',
                text: 'Click on the "Execute" button to start creating MediaWiki pages required for LangSelect to work. Results will be logged here.'
            }).prop('outerHTML'),
            events: {
                execute: createPage
            },
            id: 'langsetup-modal',
            size: 'large',
            title: 'Install LangSelect'
        });
        modal.create();
        $('#my-tools-menu').append(
            $('<li>').append(
                $('<a>', {
                    'class': 'langsetup-link',
                    text: 'Install LangSelect'  
                }).click(click).wrap('<li>')
            )
        );
    }
    function modalLoaded() {
        var $promise = $.Deferred();
        mw.hook('dev.modal').add($promise.resolve);
        return $promise;
    }
    $.when(
        $.ajax({
            type: 'GET',
            url: 'https://dev.fandom.com/api.php',
            data: {
                action: 'query',
                format: 'json',
                pageids: languageCodeSortingId,
                prop: 'revisions',
                rvprop: 'content'
            },
            dataType: 'jsonp'
        }),
        modalLoaded(),
        mw.loader.using('mediawiki.api')
    ).then(init);
})(this, jQuery, mediaWiki);