/*
 * i18n.js
 * A utility library for using MediaWiki messages in JavaScript without access to adding them via ResourceLoader on
 *   the backend (using PHP).
 */

window.i18n = {
    registerMessages: function ( group, messageList, expiry ) {
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
    },

    loadMessages: function ( group, callback, setExpiry ) {
        var lang = mw.config.get( 'wgUserLanguage'),
            api = new mw.Api(),
            messagePackage = JSON.parse( localStorage.getItem( 'i18n-' + group ) );
        if ( messagePackage === null ) {
            return;
        }
        api.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: messagePackage.messages.join( '|' ),
            uselang: lang
        }).done(function (data) {
            var am = data.query.allmessages;
            for (var i = 0; i < am.length; am++) {
                messagePackage.messageCache[am[i].name] = am[i]['*'];
            }
            localStorage.setItem( 'i18n-' + group, JSON.stringify( messagePackage ) );
            if ( typeof callback === 'function' ) {
                callback( messagePackage, group, setExpiry );
            }
        });
    },
    require: function ( ) {
        for (var i = 0; i < arguments.length; i++) {
            var group = arguments[i],
                messagePackage = JSON.parse( localStorage.getItem( 'i18n-' + group ) ),
                lang = mw.config.get( 'wgUserLanguage' );
            if ( messagePackage === null ) {
                console.warn( 'i18n.js: No messages registered for group "' + group + '" - skipping!' );
                continue;
            } else {
                if ( messagePackage.lang !== lang || new Date( messagePackage.expires ) < new Date()) {
                    console.info( 'i18n.js: Reloading messages for group "' + group + '" due to expiry or language mismatch' );
                    this.loadMessages( group, this.__requireCallback );
                } else if ( Object.keys( messagePackage.messageCache ).length === 0 ) {
                    console.info( 'i18n.js: Loading messages for group "' + group + '".' );
                    this.loadMessages( group, this.__requireCallback );
                } else {
                    console.info( 'i18n.js: Using cached messages for group "' + group + '".' );
                    this.__requireCallback( messagePackage, group );
                }
            }
        }
    },
    __requireCallback: function ( mPackage, group, setExpiry ) {
        for ( var messageKey in mPackage.messageCache ) {
            if ( mPackage.messageCache.hasOwnProperty(messageKey) ) {
                mw.messages.set( messageKey, mPackage.messageCache[messageKey] );
            }
        }
        if ( typeof setExpiry !== 'undefined' ) {
            mPackage.lang = mw.config.get( 'wgUserLanguage' );
            mPackage.expires = new Date( Date.now() + 7 * 8.64e7 );
            localStorage.setItem( 'i18n-' + group, JSON.stringify( mPackage ) );
        }
        console.log( 'i18n.js: All messages for group "' + group + '" loaded.' );
    }
};