( function( window, document, $, mw ) {
    "use strict";
    const VERSION = "v1.2";
    const NAME = "ListGroupMembers";
    const RIGHTS = Object.freeze( [
        "staff",
        "helper",
        "wiki-manager",
        "vstf",
        "content-team-member",
        "global-discussions-moderator",
        "bureaucrat",
        "sysop",
        "discussions-moderator",
        "chatmoderator",
        "rollback",
        "bot"
    ] );
    const API = new mw.Api( );
    const CORE_DEPS = Object.freeze( [ 
        "mediawiki.api",
        "mediawiki.util"
    ] );
    const DEV_SCRIPTS = Object.freeze( [ 
        "dev.colors",
        "dev.wds",
        "dev.i18n",
        "dev.url"
    ] );
    const SETTINGS = Object.freeze( { 
        sort : false,
        exclude: [ ],
        rights : Array.from( RIGHTS )
    } );
    const SETTERS = Object.freeze( { 
        
    } );
    const SORT = Object.freeze( { 
        random : function( ) { 
            return random( -1, 1 );
        },
        alpha : function( x, y ) {
            return String( x.name ).localeCompare( y.name );
        },
        alpharev : function( x, y ) {
            return String( x.name ).localeCompare( y.name ) * -1;
        },
        groups : function( x, y ) {
            if ( this.settings.compiled === false ) return 0;
            const groups = Array.from( this.settings.rights );
            const i = groups.indexOf( x.group ), j = groups.indexOf( y.group );
            return i - j;
        },
        groupsrev : function( x, y ) {
            if ( this.settings.compiled === false ) return 0;
            const groups = Array.from( this.settings.rights );
            const i = groups.indexOf( x.group ), j = groups.indexOf( y.group );
            return i - j;
        }
    } );
    const FILTER = Object.freeze( { 
        group: function( user, group ) { 
            return user.group === group;
        },
        startsWith: function( user, string ) {
            return user.name.startsWith( string );
        },
        endsWith: function( user, string ) {
            return user.name.endsWith( string );
        }
    } );
    const GROUP_CACHE = [ ];
    const BADGES = Object.freeze( { 
        staff : "staff",
        helper : "helper",
        vstf : "vstf",
        "wiki-manager" : "admin",
        "global-discussions-moderator" : "global-discussions-moderator",
        sysop : "admin",
        "discusssions-moderator" : "discussion-moderator",
        "content-moderator" : "content-moderator",
        chatmoderator : "discussion-moderator"
    } );
    function loadDeps( ) { 
        return new Promise( function( resolve, reject ) { 
            $.when( mw.loader.using( CORE_DEPS ) ).then( resolve );
        } );
    }
    function loadScripts( ) { 
        return Promise.all( Array.from( DEV_SCRIPTS ).map( function( script ) {
            return new Promise( function( resolve, reject ) { 
                mw.hook( script ).add( resolve );
            } );
        } ).concat( loadDeps( ) ) );
    }
    function loadI18n( ) { 
        return new Promise( function( resolve, reject ) {
            $.when( window.dev.i18n.loadMessages( NAME ) ).then( resolve );
        } );
    }
    function random( x, y ) {
        x = x || 0; y = y || 1;
        y = ( y === x ) ? y + 1 : y;
        const min = Math.min( x, y );
        const max = Math.max( x, y );
        
        return ( Math.random( ) * ( max - min + 1 ) ) + min;
    }
    function LGM( options ) {
        if ( !( this instanceof LGM ) ) return new LGM( options );
        this.users = { };
        this.userCache = [ ];
        this.i18n = { };
        this.debug = false;
        this.delay = 0;
        this.settings = Object.assign( { }, SETTINGS );
        this.actions = [ ];
        this.sort = "";
        this.loaded = false;
        this.configure( options );
    }
    LGM.prototype.configure = function( options ) { 
        Object.keys( this.settings ).forEach( function( key ) { 
            var orig = this.settings[ key ], value = options[ key ];
            
            if ( SETTERS.hasOwnProperty( key ) ) {
                var result = ( typeof setter === "function" ) ?
                    setter.call( this, orig, value ) : setter;
                this.settings[ key ] = result || orig;
            } else {
                this.settings[ key ] = value || orig;
            }
        }, this );
    };
    LGM.prototype.makeI18n = function( ) { 
        loadI18n( ).then( function( i18n ) { 
            const messages = Object.assign( { }, i18n._messages.en );
            Object.keys( messages ).forEach( function( key ) { 
                this.i18n[ key ] = this.getI18nObject( key, i18n );
            }, this );
            this.__i18n = i18n;
        }.bind( this ) );
    };
    LGM.prototype.getI18nObject = function( key, base ) {
        return {
            "escape" : function( ) { 
                return base.msg( key ).escape( );
            },
            parse : function( ) {
                return base.msg( key ).parse( );
            },
            plain : function( ) {
                return base.msg( key ).plain( );
            },
            markdown : function( ) {
                return base.msg( key ).markdown( );
            },
            replace : function( ) {
                const args = Array.from( arguments );
                args.unshift( key );
                const _base = base.msg.apply( base, args );
                return {
                    "escape" : _base.escape( ),
                    parse : _base.parse( ),
                    plain : _base.plain( ),
                    markdown : _base.markdown( )
                };
            }
        };
    };
} )( window, document, jQuery, mediaWiki );