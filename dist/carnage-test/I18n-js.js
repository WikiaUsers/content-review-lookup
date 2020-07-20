( function( window, mw, $ ) { 
    "use strict";
    window.dev = Object.assign( { }, window.dev );
    if ( "i18njs" in window.dev ) return;
    
    const DEBUG = mw.config.get( "debug" );
    const CONTENT_LANG = mw.config.get( "wgContentLanguage" );
    const USER_LANG = mw.config.get( "wgUserLanguage" );
    const USER_NAME = mw.config.get( "wgUserName" );
    const SITE_NAME = mw.config.get( "wgSiteName" );
    const CACHE = { };
    const CACHE_PREFIX = "i18n-cache-";
    const NOW = Date.now( );
    const DAY = ( 1000 * 60 * 60 * 24 );
    const OVERRIDES = { };
    const MD_PATTERNS = new Map( [
        // Headings (level 1-6)
        [ /(#{1,6})\s+(.*)/g, function( match, level, string ) { 
            const length = String( level ).length;
            const elem = document.createElement( "h" + String( length ) );
            elem.innerHTML = mw.html.escape( String( string ).trim( ) );
            return elem.outerHTML;
        } ],
        // Bold
        [ /\*{2}(.*)\*{2}/g, function( match, s ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        [ /_{2}(.*)_{2}/g, function( match, s ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        // Italic
        [ /\*(.*)\*/g, function( match, s ) { 
            const elem = document.createElement( "em" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        [ /_(.*)_/g, function( match, s ) { 
            const elem = document.createElement( "em" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        // Bold and italic
        [ /\*{3}(.*)\*{3}/g, function( match, s ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = "<em>" + mw.html.escape( String( s ).trim( ) ) + "</em>";
            return elem.outerHTML;
        } ],
        [ /_{3}(.*)_{3}/g, function( match, s ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = "<em>" + mw.html.escape( String( s ).trim( ) ) + "</em>";
            return elem.outerHTML;
        } ],
        // Code
        [ /`([^`]*)`/g, function( match, s ) { 
            const elem = document.createElement( "code" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        [ /``(.*)``/g, function( match, s ) { 
            const elem = document.createElement( "code" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        // Links
        [ /\[(.+?)\]\(((?:https?\:)?\/\/.+?)\)/g, function( match, text, href ) {
            const a = document.createElement( "a" );
            a.href = href;
            a.innerHTML = mw.html.escape( String( text ).trim( ) );
            return a.outerHTML;
        } ],
        [ /\[(.+?)\]/g, function( match, href ) {
            const a = document.createElement( "a" );
            a.href = mw.util.getUrl( href );
            a.innerHTML = mw.html.escape( String( href ).trim( ) );
            return a.outerHTML;
        } ],
        [ /\[(.+?)\]\((.+?)\)/g, function( match, text, href ) {
            const a = document.createElement( "a" );
            a.href = mw.util.getUrl( href );
            a.innerHTML = mw.html.escape( String( text ).trim( ) );
            return a.outerHTML;
        } ]
    ] );
    const WIKITEXT_PATTERNS = new Map( [
        // Headings (levels 1-6)
        [ /(\={1,6})\s+(.*)\s+(?:\1)/g, function( match, level, string ) { 
            const length = String( level ).length;
            const elem = document.createElement( "h" + String( length ) );
            elem.innerHTML = mw.html.escape( String( string ).trim( ) );
            return elem.outerHTML;
        } ],
        // Links
        [ /\[((?:https?\:)?\/\/.+?)\s+(.+)\]/g, function( match, href, text ) { 
            const a = document.createElement( "a" );
            a.href = href;
            a.innerHTML = mw.html.escape( String( text ).trim( ) );
            return a.outerHTML;
        } ],
        [ /\[\[([^|]*?)\]\]/g, function( match, href ) {
            const a = document.createElement( "a" );
            a.href = mw.util.getUrl( href );
            a.innerHTML = mw.html.escape( String( href ).trim( ) );
            return a.outerHTML;
        } ],
        [ /\[\[(.+?)\|(.+?)\]\]/g, function( match, href, text ) {
            const a = document.createElement( "a" );
            a.href = mw.util.getUrl( href );
            a.innerHTML = mw.html.escape( String( text ).trim( ) );
            return a.outerHTML;
        } ],
        // Italic
        [ /\'{2}(.*)\'{2}/g, function( match, text ) { 
            const elem = document.createElement( "em" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        // Bold
        [ /\'{3}(.*)\'{3}/g, function( match, text ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = mw.html.escape( String( s ).trim( ) );
            return elem.outerHTML;
        } ],
        // Bold and italic
        [ /\'{5}(.*)\'{5}/g, function( match, text ) { 
            const elem = document.createElement( "strong" );
            elem.innerHTML = "<em>" + mw.html.escape( String( s ).trim( ) ) + "</em>";
            return elem.outerHTML;
        } ],
        // Templates
        [ /\{{2}PLURAL\:(\d+)\|(.+?)\}{2}/gi, function( match, count, forms ) { 
            return mw.language.convertPlural( Number( count ), Array.from( 
                forms.split( /\|/g )
            ) );
        } ],
        [ /\{{2}GENDER\:([^|]+)\|(.+?)\}{2}/gi, function( match, gender, forms ) { 
            return mw.language.gender( gender, Array.from( forms.split( /\|/g ) ) );
        } ],
        [ /\{{2}USERNAME\}{2}/gi, USER_NAME ],
        [ /\{{2}SITENAME\}{2}/gi, SITE_NAME ]
    ] );
    
    function remove( element ) {
        if ( !( element.remove ) ) {
            element.parentNode.removeChild( element );
        } else {
            element.remove( );
        }
    }
    
    function isAllowedURL( url ) {
        return Array.from( URL_PATTERNS ).some( function( pattern ) { 
            return pattern.test( url );
        } );
    }
    
    function sanitize( html ) {
        const placeholder = document.createElement( "div" );
        const wTags = Object.freeze( [
            "a", "span", "em", "u", "sup", "sub", "div",
            "strong", "kbd", "br", "hr", "b", "s",
            "h1", "h2", "h3", "h4", "h5", "h6",
            "ul", "ol", "li", "table", "thead", "tbody", "caption",
            "tr", "th", "td", "col", "colgroup", "section", "header",
            "article", "footer", "mark", "map", "area"
        ] );
        
        placeholder.innerHTML = html;
        
        const elements = placeholder.querySelectorAll( wTags.map( function( tag ) {
            return ":not(" + tag + ")";
        } ).join( "" ) );
        
        Array.from( elements ).forEach( remove );
        
        const allElements = placeholder.querySelectorAll( "*" );
        const bAttrs = Object.freeze( [
            /on.*/g, "tabindex", "style"
        ] );
        const bAttrVals = Object.freeze( [
            /(?:(?:java|ecma)script|data):.*/g
        ] );
        const bProps = Object.freeze( [ 
            /(?:-(?:ms|webkit|moz)-|)behavior/g, 
            "cursor", 
            /--(?:[\w\d][\w\d\-\_]*[\w\d]*)/g
        ] );
        const bCSSVals = Object.freeze( [
            /(?:-(?:webkit|ms)-|)url\(.*\)/g, 
            /var\(.*\)/g
        ] );
        
        Array.from( allElements ).forEach( function( currElement ) { 
            const attributes = currElement.attributes;
            const tagName = currElement.tagName.toLowerCase( );
            
            if ( [ "a", "area", "img" ].indexOf( tagName ) > -1 && isAllowedURL ) {
                const url = [ "a", "area" ].indexOf( tagName ) > -1 ? currElement.href : currElement.src;
                if ( !isAllowedURL( url ) ) remove( currElement );
            }
            
            Array.from( attributes ).forEach( function( attribute ) { 
                const name = attribute.name;
                const value = attribute.value;
                
                Array.from( bAttrs ).forEach( function( attr ) { 
                    if ( Object( attr ) instanceof RegExp ) {
                        if ( !attr.test( name ) ) return;
                        remove( currElement );
                    } else {
                        if ( attr === "style" ) {
                            const props = Array.from( value.split( /\s*;/g ) ).filter( function( x ) { 
                                return x !== "";
                            } );
                            Array.from( props ).forEach( function( item ) { 
                                if ( item === "" ) return;
                                const index = item.indexOf( ":", 0 );
                                const prop = item.slice( 0, index ).trim( );
                                const val = item.slice( index + 1 ).trim( );
                                
                                Array.from( bProps ).forEach( function( bProp ) { 
                                    if ( Object( bProp ) instanceof RegExp ) {
                                        if ( !bProp.test( prop ) ) return;
                                        remove( currElement );
                                    } else {
                                        if ( bProp !== prop ) return;
                                        remove( currElement );
                                    }
                                } );
                                
                                Array.from( bCSSVals ).forEach( function( bVal ) { 
                                    if ( Object( bVal ) instanceof RegExp ) {
                                        if ( !bVal.test( val ) ) return;
                                        remove( currElement );
                                    } else {
                                        if ( bVal !== val ) return;
                                        remove( currElement );
                                    }
                                } );
                            } );
                        } else if ( attr !== name ) { 
                            return;
                        }
                        remove( currElement );
                    }
                } );
                
                Array.from( bAttrVals ).forEach( function( bAttrVal ) { 
                    if ( Object( bAttrVal ) instanceof RegExp ) {
                        if ( !bAttrVal.test( value ) ) return;
                        remove( currElement );
                    } else {
                        if ( bAttrVal !== value ) return;
                        remove( currElement );
                    }
                } );
            } );
        } );
        return placeholder.innerHTML;
    }
    
    const FALLBACKS = Object.freeze( {
        'ab': 'ru',
        'ace': 'id',
        'aln': 'sq',
        'als': 'gsw',
        'an': 'es',
        'anp': 'hi',
        'arn': 'es',
        'arz': 'ar',
        'av': 'ru',
        'ay': 'es',
        'ba': 'ru',
        'bar': 'de',
        'bat-smg': 'sgs',
        'bcc': 'fa',
        'be-x-old': 'be-tarask',
        'bh': 'bho',
        'bjn': 'id',
        'bm': 'fr',
        'bpy': 'bn',
        'bqi': 'fa',
        'bug': 'id',
        'cbk-zam': 'es',
        'ce': 'ru',
        'ckb': 'ckb-arab',
        'crh': 'crh-latn',
        'crh-cyrl': 'ru',
        'csb': 'pl',
        'cv': 'ru',
        'de-at': 'de',
        'de-ch': 'de',
        'de-formal': 'de',
        'dsb': 'de',
        'dtp': 'ms',
        'eml': 'it',
        'ff': 'fr',
        'fiu-vro': 'vro',
        'frc': 'fr',
        'frp': 'fr',
        'frr': 'de',
        'fur': 'it',
        'gag': 'tr',
        'gan': 'gan-hant',
        'gan-hans': 'zh-hans',
        'gan-hant': 'zh-hant',
        'gl': 'pt',
        'glk': 'fa',
        'gn': 'es',
        'gsw': 'de',
        'hif': 'hif-latn',
        'hsb': 'de',
        'ht': 'fr',
        'ii': 'zh-cn',
        'inh': 'ru',
        'iu': 'ike-cans',
        'jut': 'da',
        'jv': 'id',
        'kaa': 'kk-latn',
        'kbd': 'kbd-cyrl',
        'kbd-cyrl': 'ru',
        'khw': 'ur',
        'kiu': 'tr',
        'kk': 'kk-cyrl',
        'kk-arab': 'kk-cyrl',
        'kk-cn': 'kk-arab',
        'kk-kz': 'kk-cyrl',
        'kk-latn': 'kk-cyrl',
        'kk-tr': 'kk-latn',
        'kl': 'da',
        'koi': 'ru',
        'ko-kp': 'ko',
        'krc': 'ru',
        'ks': 'ks-arab',
        'ksh': 'de',
        'ku': 'ku-latn',
        'ku-arab': 'ckb',
        'kv': 'ru',
        'lad': 'es',
        'lb': 'de',
        'lbe': 'ru',
        'lez': 'ru',
        'li': 'nl',
        'lij': 'it',
        'liv': 'et',
        'lmo': 'it',
        'ln': 'fr',
        'ltg': 'lv',
        'lzz': 'tr',
        'mai': 'hi',
        'map-bms': 'jv',
        'mg': 'fr',
        'mhr': 'ru',
        'min': 'id',
        'mo': 'ro',
        'mrj': 'ru',
        'mwl': 'pt',
        'myv': 'ru',
        'mzn': 'fa',
        'nah': 'es',
        'nap': 'it',
        'nds': 'de',
        'nds-nl': 'nl',
        'nl-informal': 'nl',
        'no': 'nb',
        'os': 'ru',
        'pcd': 'fr',
        'pdc': 'de',
        'pdt': 'de',
        'pfl': 'de',
        'pms': 'it',
        // 'pt': 'pt-br',
        'pt-br': 'pt',
        'qu': 'es',
        'qug': 'qu',
        'rgn': 'it',
        'rmy': 'ro',
        'rue': 'uk',
        'ruq': 'ruq-latn',
        'ruq-cyrl': 'mk',
        'ruq-latn': 'ro',
        'sa': 'hi',
        'sah': 'ru',
        'scn': 'it',
        'sg': 'fr',
        'sgs': 'lt',
        'shi': 'ar',
        'simple': 'en',
        'sli': 'de',
        'sr': 'sr-ec',
        'srn': 'nl',
        'stq': 'de',
        'su': 'id',
        'szl': 'pl',
        'tcy': 'kn',
        'tg': 'tg-cyrl',
        'tt': 'tt-cyrl',
        'tt-cyrl': 'ru',
        'ty': 'fr',
        'udm': 'ru',
        'ug': 'ug-arab',
        'uk': 'ru',
        'vec': 'it',
        'vep': 'et',
        'vls': 'nl',
        'vmf': 'de',
        'vot': 'fi',
        'vro': 'et',
        'wa': 'fr',
        'wo': 'fr',
        'wuu': 'zh-hans',
        'xal': 'ru',
        'xmf': 'ka',
        'yi': 'he',
        'za': 'zh-hans',
        'zea': 'nl',
        'zh': 'zh-hans',
        'zh-classical': 'lzh',
        'zh-cn': 'zh-hans',
        'zh-hant': 'zh-hans',
        'zh-hk': 'zh-hant',
        'zh-min-nan': 'nan',
        'zh-mo':  'zh-hk',
        'zh-my':  'zh-sg',
        'zh-sg':  'zh-hans',
        'zh-tw':  'zh-hant',
        'zh-yue': 'yue'
    } );
    
    function getMsg( messages, name, lang, key ) { 
        if ( lang === "qqx" ) return "(i18njs-" + key + "-" + name + ")";
        
        if ( OVERRIDES[ key ] && OVERRIDES[ key ][ name ] ) {
            return OVERRIDES[ key ][ name ];
        }
        
        if ( messages[ lang ] && messages[ lang ][ name ] ) {
            return messages[ lang ][ name ];
        }
        
        if ( lang === "en" ) return "<" + name + ">";
        lang = FALLBACKS[ lang ] || "en";
        return getMsg( messages, name, lang );
    }
    
    function handleArgs( message, args ) { 
        return Array.from( args || [ ] ).reduce( function( s, item, index ) { 
            const pattern = new RegExp( "\\$" + ( index + 1 ), "g" );
            return s.replace( pattern, item );
        }, String( message ) );
    }
    
    const COMMENT_PATTERN = /\/\*[\s\S]*?\*\//gm;
    
    function stripComments( json ) { 
        return String( json ).trim( ).replace( COMMENT_PATTERN, "" ).trim( );
    }
    
    function safeJSONParse( string ) {
        var result = null;
        try {
            result = JSON.parse( string );
        } catch ( e ) {
            return null;
        }
        return result;
    }
    
    const CONTROLLER_DEFAULTS = Object.freeze( { 
        cacheVersion : 0,
        endpoint : "https://dev.fandom.com/api.php",
        params : { },
        useCache: false,
        debug: false
    } );
    
    const SOURCE_PATTERN = /^u:(?:([a-z-]+)\.)?([a-z0-9-]+):/;
    
    const API_PATTERN = /api\.php$/;
    
    function Message( key, messages, lang, messageKey ) {
        const noMsg = "<" + key + ">";
        
        var msg = getMsg( messages, key, lang, messageKey );
        
        this.__base = msg;
        this.exists = msg !== noMsg;
        this.name = key;
        this.noMsg = noMsg;
    }
    
    Message.prototype.parse = function( ) { 
        if ( !this.exists ) return this.escape( );
        const result = sanitize( this.__base );
        return Array.from( WIKITEXT_PATTERNS.entries( ) ).reduce( function( s, entries ) {
            const pattern = entries[ 0 ];
            const replacer = entries[ 1 ];
            return s.replace( pattern, replacer );
        }.bind( this ), result );
    };
    
    Message.prototype.wikitext = Message.prototype.parse;
    
    Message.prototype.markdown = function( ) { 
        if ( !this.exists ) return this.escape( );
        const result = sanitize( this.__base );
        return Array.from( MD_PATTERNS.entries( ) ).reduce( function( s, entries ) {
            const pattern = entries[ 0 ];
            const replacer = entries[ 1 ];
            return s.replace( pattern, replacer );
        }.bind( this ), result );
    };
    
    Message.prototype.escape = function( ) {
        return mw.html.escape( this.__base );
    };
    
    Message.prototype.plain = function( ) { 
        return this.__base;
    };
    
    Message.prototype.toString = Message.prototype.plain;
    
    Message.prototype.encode = function( ) {
        return encodeURIComponent( this.__base );
    };
    
    Message.prototype.decode = function( ) {
        return decodeURIComponent( this.__base );
    };
    
    Message.prototype.replace = function( ) { 
        const args = Array.from( arguments ).map( String );
        this.__base = handleArgs( this._base, args );
        return this;
    };
    
    Message.prototype.render = function( renderer ) { 
        if ( typeof renderer !== "function" ) return this.plain( );
        const result = renderer.call( this, this.plain( ) );
        return ( result !== void 0 ) ? result : this.plain( );
    };
    
    function MessageView( name, messages ) {
        if ( !( this instanceof MessageView ) ) return new MessageView( name, messages );
        this.defaultLang = USER_LANG;
        this.tempLang = null;
        this.messageKey = null;
        
        if ( name.indexOf( "u:", 0 ) !== 0 ) {
            this.messageKey = name;
        }
        
        this.messages = this._messages = messages;
    }
    
    MessageView.prototype.useLang = function( lang ) {
        this.defaultLang = lang;
    };
    
    MessageView.prototype.inLang = function( lang ) { 
        this.tempLang = lang;
        return this;
    };
    
    MessageView.prototype.useContentLang = function( ) {
        this.useLang( CONTENT_LANG );
    };
    
    MessageView.prototype.inContentLang = function( ) {
        return this.inLang( CONTENT_LANG );
    };
    
    MessageView.prototype.isContentLang = function( callback ) {
        const isLang = ( this.defaultLang === CONTENT_LANG ) || ( this.tempLang === CONTENT_LANG );
        
        if ( arguments.length > 0 && isLang && typeof callback === "function" ) {
            const result = callback.call( this, this );
            
            return ( result !== void 0 || result !== null ) ? ( isLang ? result : null ) : isLang;
        }
        
        return isLang;
    };
    
    MessageView.prototype.useUserLang = function( ) {
        this.useLang( USER_LANG );
    };
    
    MessageView.prototype.inUserLang = function( ) {
        return this.inLang( USER_LANG );
    };
    
    MessageView.prototype.isUserLang = function( callback ) {
        const isLang = ( this.defaultLang === USER_LANG ) || ( this.tempLang === USER_LANG );
        
        if ( arguments.length > 0 && isLang && typeof callback === "function" ) {
            const result = callback.call( this, this );
            
            return ( result !== void 0 || result !== null ) ? ( isLang ? result : null ) : isLang;
        }
        
        return isLang;
    };
    
    MessageView.prototype.msg = function( key ) { 
        var lang = this.defaultLang;
        
        if ( this.tempLang ) {
            lang = this.tempLang;
            this.tempLang = null;
        }
        
        return new Message( key, this.messages, lang, this.messageKey );
    };
    
    function MessageController( ) { 
        if ( !( this instanceof MessageController ) ) return new MessageController( );
        this.loaded = false;
        this.settings = Object.assign( { }, CONTROLLER_DEFAULTS );
        this.endpoint = "https://dev.fandom.com/api.php";
    }
    
    MessageController.prototype.parseToObject = function( name, content, version ) { 
        const result = stripComments( content );
        const json = Object.assign( { }, safeJSONParse( result ) );
        
        const obj = new MessageView( name, json );
        CACHE[ name ] = obj;
        
        if ( typeof version === "number" ) {
            this.saveToCache( name, json, version );
        }
        
        return obj;
    };
    
    MessageController.prototype.saveToCache = function( name, json, version ) {
        const keyPrefix = CACHE_PREFIX + name;
        if ( Object.keys( json ).length === 0 ) return;
        localStorage.setItem( keyPrefix + "-content", JSON.stringify( json ) );
        localStorage.setItem( keyPrefix + "-timestamp", NOW );
        localStorage.setItem( keyPrefix + "-version", version || 0 );
    };
    
    MessageController.prototype.clearCacheEntries = function( ) { 
        const checkCacheKey = new RegExp("^(" + CACHE_PREFIX + ".+)-content$" );
        const cacheKeys = Object.keys( localStorage ).filter( function( key ) {
            return checkCacheKeys.test( key );
        } );
        
        Array.from( cacheKeys ).forEach( function( key ) { 
            const keyPrefix = key.match( checkCacheKey )[ 1 ];
            const timestamp = Number( localStorage.getItem( keyPrefix + "-timestamp" ) ) || 0;
            
            if ( ( NOW - timestamp ) < ( DAY * 5 ) ) return;
            
            localStorage.removeItem( keyPrefix + "-content" );
            localStorage.removeItem( keyPrefix + "-timestamp" );
            localStorage.removeItem( keyPrefix + "-version" );
        } );
    };
    
    MessageController.prototype.loadMessages = function( name, options ) {
        this.settings = Object.assign( { }, this.settings, options );
        this.useCache = ( this.settings.useCache || !this.settings.debug );
        this.cacheVersion = Number( this.settings.cacheVersion ) || 0;
        
        const source = Array.from( SOURCE_PATTERN.exec( name ) || [ ] );
        return new Promise( function( resolve, reject ) { 
            if ( USER_LANG === "qqx" ) return resolve( new MessageView( name, { } ) );
            if ( this.useCache ) this.loadFromCache( name, this.cacheVersion );
            
            if ( CACHE[ name ] && this.useCache ) {
                return resolve( CACHE[ name ] );
            }
            
            this.page = "MediaWiki:Custom-" + name + "/i18n.json";
            
            if ( source && source.length ) {
                const db = source[ 2 ];
                this.page = name.slice( source[ 0 ].length );
                
                this.endpoint = this.endpoint.replace( "dev", db );
                
                if ( source[ 1 ] ){
                    this.endpoint = this.endpoint.replace( API_PATTERN, source[ 1 ] + "/$&" );
                }
            }
            
            const params = Object.freeze( { 
                action : "query",
                format : "json",
                prop : "revisions",
                rvprop : "content",
                titles : this.page,
                indexpageids : 1
            } );
            
            this.settings.params = Object.assign( { }, params );
            
            this.loadFromAjax( this.settings.params, name ).then( resolve );
        }.bind( this ) );
    };
    
    MessageController.prototype.loadFromCache = function( name, minCacheVersion ) { 
        const keyPrefix = CACHE_PREFIX + name;
        
        const content = localStorage.getItem( keyPrefix + "-content" ) || "";
        const timestamp = Number( localStorage.getItem( keyPrefix + "-timestamp") ) || 0;
        const version = Number( localStorage.getItem( keyPrefix + "-version" ) ) || 0;
        
        if ( 
            content && 
            ( ( NOW - timestamp ) < ( DAY * 2 ) ) &&
            ( version >= Number( minCacheVersion ) )
        ) {
            this.parseToObject( name, content );
        }
    };
    
    const MW_DEPS = Object.freeze( [ 
        "mediawiki.language",
        "mediawiki.util"
    ] );
    
    MessageController.prototype.loadMwDependencies = function( ) { 
        return new Promise( function( resolve, reject ) { 
            $.when( mw.loader.using( MW_DEPS ) ).then( resolve );
        } );
    };
    
    MessageController.prototype.loadFromAjax = function( params, name ) { 
        return new Promise( function( resolve, reject ) { 
            this.loadMwDependencies( ).then( function( ) {
                $.ajax( this.endpoint, { 
                    data: params,
                    dataType: "jsonp"
                } ).always( function( data ) { 
                    const pageid = data.query.pageids[ 0 ];
                    if ( data.query.pages[ "-1" ] ) {
                        return resolve( null );
                    }
                    
                    const page = data.query.pages[ pageid ];
                    const revisions = page.revisions;
                    
                    if ( revisions ) {
                        const result = revisions[ 0 ][ "*" ];
                        resolve( this.parseToObject( name, result ) );
                    } else {
                        resolve( null );
                    }
                }.bind( this ) );
            }.bind( this ) );
        }.bind( this ) );
    };
    
    window.dev.i18njs = new MessageController( );
    Object.assign( window.dev.i18njs, { 
        _sanitize: sanitize,
        _stripComments: stripComments,
        _safeJSONParse: safeJSONParse,
        _getMsg: getMsg,
        _handleArgs: handleArgs,
        _fallbacks: Object.assign( { }, FALLBACKS )
    } );
    
    window.dev.i18njs.overrides = Object.assign( { }, window.dev.i18njs.overrides );
    
    Object.keys( window.dev.i18njs.overrides ).forEach( function( key ) { 
        const value = window.dev.i18njs.overrides[ key ];
        OVERRIDES[ key ] = ( typeof value === "function" ) ? value.call( window.dev.i18njs, key ) || "" : String( value );
    } );
    
    mw.hook( "dev.i18njs" ).fire( window.dev.i18njs );
} )( window, mediaWiki, jQuery );