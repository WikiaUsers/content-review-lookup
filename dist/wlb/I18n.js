/*
 * i18n.js
 * A utility library for using MediaWiki messages in JavaScript without access to adding them via ResourceLoader on
 *   the backend (using PHP).
 * THIS MUST BE LOADED AT THE TOP OF COMMON.JS, WIKIA.JS, OR MONOBOOK.JS, OR ELSE FUNCTIONS THAT USE THIS LIBRARY WILL NOT WORK
 *
 * @author sactage
 * @version 1.0.1
 *
 * TODO: Make this less messy
 * TODO: Less saving/loading from localStorage
 * TODO: Track cache expiry time
 * TODO: ALL the things!
 */

window.i18n = {
    registerMessages: function ( group, messageList, expiry ) {
        return $.Deferred(function (dfd) {
            var messagePackage = JSON.parse( localStorage.getItem( 'i18n-' + group ) );
            if ( messagePackage === null ) { // We haven't seen this message grouping before
                messagePackage = {
                    lang: mw.config.get( 'wgUserLanguage' ),
                    expires: new Date(Date.now() + (expiry || 7) * 8.64e7),
                    messageCache: {},
                    messages: messageList
                };
                localStorage.setItem( 'i18n-' + group, JSON.stringify( messagePackage ) );
            }
            dfd.resolve();
        }).promise();
    },

    loadMessages: function ( group ) {
        var lang = mw.config.get( 'wgUserLanguage'),
            api = new mw.Api(),
            messagePackage = JSON.parse( localStorage.getItem( 'i18n-' + group ) );
        if ( messagePackage === null ) {
            return $.Deferred().promise();
        }
        return api.get({
            action: 'query',
            meta: 'allmessages',
            amlimit: 500,
            ammessages: messagePackage.messages.join( '|' ),
            uselang: lang
        });

    },
    require: function ( group, callback ) {
        var self = this; // TODO get rid of this filth somehow
        return $.Deferred(function (defer) {
            var messagePackage = JSON.parse( localStorage.getItem( 'i18n-' + group ) ),
                lang = mw.config.get( 'wgUserLanguage' );
            if ( messagePackage === null ) {
                console.warn( 'i18n.js: No messages registered for group "' + group + '" - skipping!' );
                defer.resolve();
            } else {
                if ( messagePackage.lang !== lang || new Date( messagePackage.expires ) < new Date()) {
                    console.info( 'i18n.js: Reloading messages for group "' + group + '" due to expiry or language mismatch' );
                    self.loadMessages( group ).done(function (data) {
                        var am = data.query.allmessages;
                        for ( var i = 0; i < am.length; i++ ) {
                            messagePackage.messageCache[am[i].name] = am[i]['*'];
                            mw.messages.set( am[i].name, am[i]['*']);
                        }
                        messagePackage.lang = lang;
                        messagePackage.expires = new Date( Date.now() + 7 * 8.64e7 );
                        localStorage.setItem( 'i18n-' + group, JSON.stringify( messagePackage ) );
                        defer.resolve();
                    });
                } else if ( Object.keys( messagePackage.messageCache ).length === 0 ) {
                    console.info( 'i18n.js: Loading messages for group "' + group + '".' );
                    self.loadMessages( group ).done(function (data) {
                        var am = data.query.allmessages;
                        for ( var i = 0; i < am.length; i++ ) {
                            messagePackage.messageCache[am[i].name] = am[i]['*'];
                            mw.messages.set( am[i].name, am[i]['*']);
                        }
                        localStorage.setItem( 'i18n-' + group, JSON.stringify( messagePackage ) );
                        defer.resolve();
                    });
                } else {
                    console.info( 'i18n.js: Using cached messages for group "' + group + '".' );
                    $.Deferred(function (dfd) {
                        for (var message in messagePackage.messageCache) {
                            mw.messages.set(message, messagePackage.messageCache[message]);
                        }
                        defer.resolve();
                    });
                }
            }
        }).promise();
    },
    languages: {
        EN: 'en - English',
        AR: 'ar - العربية',
        BE: 'be - Беларуская',
        BG: 'bg - Български',
        BN: 'bn - বাংলা',
        BS: 'bs - Bosanski',
        CA: 'ca - Català',
        CS: 'cs - Česky',
        CY: 'cy - Cymraeg',
        DA: 'da - Dansk',
        DE: 'de - Deutsch',
        EO: 'eo - Esperanto',
        ES: 'es - Español',
        ET: 'et - Eesti',
        EU: 'eu - Euskara',
        FA: 'fa - فارسی',
        FI: 'fi - Suomi',
        FR: 'fr - Français',
        GA: 'ga - Gaeilge',
        GD: 'gd - Gàidhlig',
        GL: 'gl - Galego',
        HE: 'he - עברית',
        HI: 'hi - हिन्दी',
        HR: 'hr - Hrvatski',
        HU: 'hu - Magyar',
        HY: 'hy - Հայերեն',
        ID: 'id - Bahasa Indonesia',
        IT: 'it - Italiano',
        JA: 'ja - 日本語',
        JV: 'jv - Basa Jawa',
        KK: 'kk - Қазақша',
        KO: 'ko - 한국어',
        LA: 'la - Latina',
        LB: 'lb - Lëtzebuergesch',
        MI: 'mi - Māori',
        ML: 'ml - മലയാളം',
        MN: 'mn - Монгол',
        MO: 'mo - Молдовеняскэ',
        MS: 'ms - Malay',
        MT: 'mt - Malti',
        NL: 'nl - Nederlands',
        NN: 'nn - ‪Norsk (nynorsk)‬',
        NO: 'no - Norsk (bokmål)‬',
        NV: 'nv - Diné bizaad',
        PL: 'pl - Polski',
        PT: 'pt - Português',
        RO: 'ro - Română',
        RU: 'ru - Русский',
        SK: 'sk - Slovenčina',
        SL: 'sl - Slovenščina',
        SR: 'sr - Српски / Srpski',
        SV: 'sv - Svenska',
        TG: 'tg - Тоҷикӣ',
        TK: 'tk - Türkmençe',
        TL: 'tl - Tagalog',
        TR: 'tr - Türkçe',
        UK: 'uk - Українська',
        UZ: 'uz - O\'zbek',
        VI: 'vi - Tiếng Việt',
        YI: 'yi - ייִדיש',
        ZH: 'zh - 中文',
        ZU: 'zu - isiZulu',
        XX: 'Other'
    }
};