/**
 * InactiveUsers
 *
 * documentation at: https://dev.fandom.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 * continued as UserTags: https://dev.fandom.com/wiki/UserTags
 * con modifiche di Sebastiano Marchi
 */
 (function ($, mw) {
    'use strict';
    window.provaProva = true;
    var module = $.extend({
        gone: [],
        months: 3
    }, window.InactiveUsers);

    function isoDateNDaysAgo(days) {
        return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    }

    function init(i18n) {
        var $container = $('#userProfileApp .user-identity-header__attributes');

        console.log('Container trovato:', $container.length > 0); // Verifica se l'elemento esiste

        var user = mw.config.get('profileUserName');

        new mw.Api().get({
            action: 'query',
            list: 'usercontribs|users',
            uclimit: 1,
            ucprop: 'title|timestamp',
            ucuser: user,
            ucstart: isoDateNDaysAgo(0),
            ucend: isoDateNDaysAgo(30 * Math.max(Number(module.months) || 1, 1)),
            ususers: user,
            usprop: 'gender',
            formatversion: 2
        }).done(function(data) {
            if (
                !data.batchcomplete ||
                data.query.users[0].missing ||
                data.query.usercontribs.length ||
                module.gone.indexOf(user) !== -1
            ) {
                return;
            }

            var gender = data.query.users[0].gender || 'unknown';
            var text = typeof module.text === 'string' ? 
                module.text : 
                typeof module.text === 'object' ? 
                    typeof module.text[gender] === 'string' ? 
                        module.text[gender] : 
                        module.text.unknown : 
                    i18n.msg('inactive-' + gender).plain();

            $container.append(
                $('<span>', {
                    'class': 'tag user-identity-header__tag inactive-user',
                    'text': text
                })
            );
        }).fail(function(error) {
            console.error('Errore durante la richiesta API:', error);
        });
    }

    // Usa setInterval per verificare se l'elemento è stato caricato
    var checkExist = setInterval(function () {
        if ($('.user-identity-header__attributes').length) {
            clearInterval(checkExist);
            window.dev.i18n.loadMessages('InactiveUsers').done(init);
        }
    }, 1000); // Controlla ogni 500ms

    mw.loader.using('mediawiki.api').then(function() {
        console.log('MediaWiki API caricata correttamente');
    });

    mw.hook('dev.i18n').add(function() {
        console.log('dev.i18n hook attivato');
    });

    // Carica l'articolo relativo a i18n-js
    importArticle({
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(window.jQuery, window.mediaWiki);