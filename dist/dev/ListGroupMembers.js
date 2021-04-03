/**
 * ListGroupMembers
 * 
 * A script that loads a list of all users in
 * canonical (and custom) user groups.
 * 
 * @author  Ultimate Dark Carnage
 * @version 1.33
 **/
void ( function( window, $, mw ) { 
    "use strict";
    // Checks if the current namespace is a Special page
    const IS_SPECIAL = mw.config.get( "wgCanonicalNamespace" ) === "Special";
    // Current page name
    const IS_BLANKPAGE = mw.config.get( "wgCanonicalSpecialPageName" ) === "Blankpage";
    // Page title
    const TITLE = IS_BLANKPAGE ? mw.config.get( "wgTitle" ).split( "/" )[ 1 ] : mw.config.get( "wgTitle" );
    // Page check pattern
    const TITLE_CHECK = /^L(?:GM|istGroupMembers)$/i;
    // If the page does not match, do not run the script
    if ( !IS_SPECIAL || ( IS_SPECIAL && !TITLE_CHECK.test( TITLE ) ) ) return;
    // Current site name
    const SITENAME = mw.config.get( "wgSiteName" );
    // Configuration object
    const CONFIG = Object.assign( { }, window.lgmConfig );
    // Script name
    const NAME = "ListGroupMembers";
    // Version number
    const VERSION = 1.33;
    // Shortcut of window.getComputedStyle
    const gcs = window.getComputedStyle;
    // Shortcut to get property value
    const gpv = function( el, p ) { 
        if ( typeof el === "string" ) {
            el = document.querySelector( el );
        }
        return gcs( el ).getPropertyValue( p );
    };
    // Checks whether the page is viewing on the Unified Community Platform
    const isUCP = parseFloat( mw.config.get( "wgVersion" ) ) > 1.19;
    // Importing the core stylesheet
    importArticle( { 
        type : "style",
        article : "u:dev:MediaWiki:" + NAME + "/beta.css"
    } );
    // Creates the dev object if it does not exist
    window.dev = window.dev || { };
    // If the Colors library does not exist, load the script
    if ( !window.dev.hasOwnProperty( "colors" ) ) {
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:Colors/code.js"
        } );
    }
    // If the I18n-js library does not exist, load the script
    if ( !window.dev.hasOwnProperty( "i18n" ) ) {
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:I18n-js/code.js"
        } );
    }
    // Checks if an object is an instance of a constructor
    function isInst( o, c ) { 
        return Object( o ) instanceof c;
    }
    // Checks if a variable is set
    function isset( o ) { 
        return o !== void 0;
    }
    // Function that always returns true
    function returnTrue( ) { 
        return true;
    }
    // Parses HTML content
    function parseHTML( html, all ) { 
        const parser = new DOMParser( );
        const doc = parser.parseFromString( html, "text/html" );
        const body = doc.body;
        return all ? body.children : body.children[ 0 ];
    }
    // Generates a random number
    function random( x, y, seed ) { 
        x = ( !isNaN( x ) && isFinite( x ) ) ? Number( x ) : 0;
        y = ( !isNaN( y ) && isFinite( y ) ) ? Number( y ) : 0;
        const min = Math.min( x, y ), max = Math.max( x, y );
        if ( typeof seed !== "function" ) seed = Math.random;
        return seed( ) * ( max - min ) + min;
    }
    // Generates a random integer
    function randomInt( x, y, seed ) { 
        return Math.floor( random( x, y, seed ) );
    }
    // Seed generator
    function seedR( s, o ) { 
        const m = 0xffffffff;
 
        var w = ( 123456789 + s ) & m, z = ( 987654321 - s ) & m;
        function h( ) { 
            z = ( 36969 * ( z & 65535 ) + ( z >>> 16 ) ) & m;
            w = ( 18000 * ( w & 65535 ) + ( w >>> 16 ) ) & m;
 
            var r = ( ( z << 16 ) + ( w & 65535 ) ) >>> 0;
            r /= 4294967296;
            return r;
        }
        if ( o ) return h;
        return h( );
    }
    // User group registry
    const USER_GROUPS_REGISTRY = Object.freeze( { 
        global : Object.freeze( [ 
            "staff",
            "helper",
            "wiki-manager",
            "content-team-member",
            "soap",
            "global-discussion-moderator",
            "vanguard",
            "voldev",
            "councilor"
        ] ),
        local : Object.freeze( [
            "bureaucrat",
            "sysop",
            "discussions-moderator",
            "content-moderator",
            "chatmoderator", // deprecated
            "rollback",
            "bot"
        ] )
    } );
    // Function to get group type
    function getGroupType( group ) { 
        const registry = Object.assign( { }, USER_GROUPS_REGISTRY );
        const types = Object.keys( registry );
        while ( types.length ) { 
            const type = types.shift( );
            const groups = registry[ type ];
            if ( groups.indexOf( group ) > -1 ) {
                return type;
            }
        }
        return "other";
    }
    // User group order
    const USER_GROUP_ORDER = Object.freeze( [ 
        "staff",
        "helper",
        "wiki-manager",
        "content-team-member",
        "soap",
        "global-discussion-moderator",
        "vanguard",
        "voldev",
        "councilor",
        "bureaucrat",
        "sysop",
        "discussions-moderator",
        "content-moderator",
        "chatmoderator", // deprecated
        "rollback",
        "bot"
    ] );
    // Aliases for user groups
    const USER_GROUP_ALIASES = Object.freeze( { 
        "fandom-staff" : "staff",
        "fandom-helper" : "helper",
        "vstf" : "soap",
        "grasp" : "soap",
        "volunteer-developer" : "voldev",
        "council" : "councilor",
        "chatmod" : "chatmoderator", // deprecated
        "crat" : "bureaucrat",
        "admin" : "sysop",
        "rollbacker" : "rollback"
    } );
    // Sorting functions
    const SORT = Object.freeze( { 
        alpha : function( a, b ) { 
            return a.name.localeCompare( b.name );
        },
        alpha_desc : function( a, b ) { 
            return -a.name.localeCompare( b.name );
        },
        alphabetical : "alpha",
        alphadesc : "alpha_desc",
        registration : function( a, b ) { 
            return a.registration - b.registration;
        },
        registration_desc : function( a, b ) { 
            return b.registration - a.registration;
        },
        group : function( a, b ) { 
            if ( this.grouped ) { 
                return SORT.alpha.call( this, a, b );
            }
            const ag = USER_GROUP_ORDER.indexOf( a );
            const bg = USER_GROUP_ORDER.indexOf( b );
            return ag - bg;
        },
        random : function( ) { 
            return random( -1, 1 );
        },
        _default : "alpha"
    } );
    // Fetches the canonical user group name
    function getGroup( group, registry ) { 
        const reg = Array.isArray( registry ) ? registry : USER_GROUP_ORDER;
        
        var result = group, 
            i = 0, 
            maxIter = 8, 
            aliases = Object.assign( { }, USER_GROUP_ALIASES );
            
        while ( i < maxIter ) {
            if ( aliases.hasOwnProperty( result ) ) {
                result = aliases[ result ];
            }
            
            if ( reg.includes( result ) ) return result;
            i++;
        }
        
        return result;
    }
    // Fetches the sort function
    function getSort( name ) {
        if ( name === void 0 ) name = SORT._default;
        var result = String( name ),
            i = 0,
            maxIter = 8,
            sort = Object.assign( { }, SORT );
        
        while ( i < maxIter ) {
            if ( isInst( result, Function ) ) return result;
            result = sort[ result ];
            i++;
        }
        
        return SORT.alpha;
    }
    // HTML for lists
    const LIST_HTML = '<div class="LGMList lgm-item">' +
        '<figure class="LGMAvatarWrapper lgm-avatar__wrapper">' +
            '<div class="LGMAvatar lgm-avatar">' +
                '<img class="LGMAvatarImage lgm-avatar__image" />' +
            '</div>' +
        '</figure>' +
        '<section class="LGMUserInfo lgm-user__info">' + 
            '<div class="LGMUserName lgm-username">' + 
                '<strong></strong>' + 
            '</div>' +
            '<div class="LGMUserGroup lgm-user__group"></div>' +
        '</section>' +
    '</div>';
    // HTML for cards
    const CARD_HTML = '<div class="LGMCard lgm-item">' + 
        '<section class="LGMCardInfo lgm-card__info">' + 
            '<figure class="LGMAvatarWrapper lgm-avatar__wrapper">' + 
                '<div class="LGMAvatar lgm-avatar">' +
                    '<img class="LGMAvatarImage lgm-avatar__image" />' +
                '</div>' +
            '</figure>' +
            '<div class="LGMCardUserInfo lgm-card__user-info">' +
                '<div class="LGMUserName lgm-username">' + 
                    '<strong></strong>' + 
                '</div>' +
                '<div class="LGMUserGroup lgm-user__group">' +
                '</div>' +
            '</div>' +
        '</section>' +
    '</div>';
    // UI types
    const TYPES = Object.freeze( { 
        list : parseHTML( LIST_HTML ),
        card : parseHTML( CARD_HTML ),
        // portal : parseHTML( PORTAL_HTML ),
        _default : "list"
    } );
    // Fetches the type name
    function getTypeName( name ) { 
        if ( name === void 0 ) name = "_default";
        var result = String( name ),
            i = 0,
            maxIter = 8,
            types = Object.assign( { }, TYPES );
        
        while ( i < maxIter ) {
            var h = types[ result ];
            if ( isInst( h, Element ) ) return result;
            result = types[ result ];
            i++;
        }
        
        return types._default;
    }
    // Getting the UI type
    function getType( name ) { 
        const type = getTypeName( name );
        return TYPES[ type ] || TYPES[ TYPES._default ];
    }
    // Maximum UID for instances of the main constructor
    var MAX_UID = 9999999999,
        // Maximum UID for instances of the UI constructor
        MAX_UI_UID = 9999999999,
        // Founding date
        FOUNDING = "October 18, 2004";
        
    // Default configurations
    const DEFAULTS = Object.freeze( { 
        include : [ ],
        exclude : [ ],
        actions : [ ],
        type : "_default",
        grouped : true,
        sort : "alpha",
        search : false,
        useRegistry : false,
        lazyUpdate : false,
        enableActions : false,
        delay : 0
    } );
    // Internationalization fallbacks in case the 
    // I18n-js script fails or does not load on time
    const I18N_FALLBACKS = Object.freeze( { 
        en : Object.freeze( { 
            loading : "Loading essential resources...",
            "resources-loaded" : "Resources have been loaded. Waiting to fetch users..."
        } )
    } );
    // Default avatar source
    const DEFAULT_AVATAR = "https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/";
    // Creating the main constructor
    function LGM( options ) { 
        if ( !isInst( this, LGM ) ) return new LGM( options );
        this.target = document.querySelector( "#mw-content-text" );
        this.options = Object.assign( { }, DEFAULTS );
        this.configure( options );
        this.users = { };
        this.cache = { };
        this.actions = [ ];
        this.rights = Array.from( USER_GROUP_ORDER );
        this.initTime = Date.now( );
        this.loadedTime = null;
        this.loaded = false;
        this.rendered = false;
        this.elapsedTime = null;
        this.state = "inactive";
        
        if ( ( this.options.actions || [ ] ).length ) {
            Array.from( this.options.actions ).forEach( function( action ) { 
                if ( isInst( action, String ) || isInst( action, Object ) ) {
                    this.actions.push( action );
                }
            }, this );
        }
        
        if ( ( this.options.exclude || [ ] ).length ) {
            this.options.exclude = Array.isArray( this.options.exclude ) ?
                this.options.exclude : [ ];
            
            this.options.exclude.forEach( function( s ) { 
                if ( isInst( s, RegExp ) ) {
                    this.rights = this.rights.filter( function( group ) { 
                        return s.test( group );
                    }, this );
                } else {
                    const index = this.rights.indexOf( s );
                    if ( index === -1 ) return;
                    this.rights.splice( i, 1 );
                }
            }, this );
            
            if ( ( this.options.include || [ ] ).length ) { 
                this.options.include = this.options.include.filter( function( item ) { 
                    return !this.options.exclude.includes( item );
                }, this );
            }
        }
        
        if ( ( this.options.include || [ ] ).length ) {
            this.options.include.forEach( function( item ) { 
                this.rights.push( item );
            }, this );
        }
        
        this.type = getTypeName( this.options.type );
        
        this.grouped = Boolean( this.options.grouped );
        this.search = Boolean( this.options.search );
        this.useRegistry = Boolean( this.options.useRegistry );
        this.lazyUpdate = Boolean( this.options.lazyUpdate );
        this.enableActions = Boolean( this.options.enableActions );
        
        this.renderDelay = ( !isNaN( this.options.delay ) 
            && isFinite( this.options.delay ) ) ? Number( this.options.delay ) 
            : DEFAULTS.delay; // in seconds
        
        this.rights = this.rights.map( function( item ) { 
            return getGroup( item );
        } ).filter( function( item, index, arr ) { 
            return arr.indexOf( item ) === index;
        } ).sort( function( a, b ) { 
            const ai = USER_GROUP_ORDER.indexOf( a );
            const bi = USER_GROUP_ORDER.indexOf( b );
            return ai - bi;
        } );
        
        this.registry = Object.assign( { }, USER_GROUPS_REGISTRY );
        this.registry.other = [ ];
        
        this.rights.forEach( function( group ) { 
            if ( this.registry.local.includes( group ) || 
                this.registry.global.includes( group ) ) return;
            this.registry.other.push( group );
        }, this );
        
        if ( this.grouped ) { 
            if ( this.useRegistry ) { 
                Object.keys( this.registry ).forEach( function( type ) { 
                    this.users[ type ] = { };
                    this.registry[ type ].forEach( function( group ) { 
                        this.users[ type ][ group ] = [ ];
                    }, this );
                }, this );
            } else {
                this.rights.forEach( function( group ) { 
                    this.users[ group ] = [ ];
                }, this );
            }
        } else {
            this.users = [ ];
        }
        
        this.sort = getSort( this.options.sort );
        this.load( );
    }
    
    Object.assign( LGM, { 
        // Internal properties and methods
        _sort : SORT,
        _types : TYPES,
        _getGroup : getGroup,
        _getSort : getSort,
        _getTypeName : getTypeName,
        _getGroupType : getGroupType,
        _isset : isset,
        // Object properties
        fn : LGM.prototype,
        uid : randomInt( 1, MAX_UID )
    } );
    
    Object.assign( LGM.fn, { 
        configure : function( opts ) { 
            const o = Object.assign( { }, opts );
            Object.keys( o ).forEach( function( key ) { 
                const orig = this.options[ key ];
                const value = o[ key ];
                this.options[ key ] = isset( value ) ? value : orig;
            }, this );
        },
        loadColors : function( ) { 
            return new Promise( function( resolve, reject ) { 
                mw.hook( "dev.colors" ).add( resolve );
            } );
        },
        loadI18no : function( ) { 
            return new Promise( function( resolve, reject ) { 
                mw.hook( "dev.i18n" ).add( resolve );
            } );
        },
        loadI18n : function( ) { 
            return new Promise( function( resolve, reject ) { 
                this.loadI18no( ).then( function( i18no ){ 
                    this.i18no = i18no;
                    this.i18no.loadMessages( NAME )
                        .done( resolve )
                        .fail( reject );
                }.bind( this ) );
            }.bind( this ) );
        },
        setI18n : function( ) { 
            return new Promise( function( resolve, reject ) { 
                this.loadI18n( ).then( function( i18n ) { 
                    this.i18n = i18n;
                    resolve( );
                }.bind( this ) );
            }.bind( this ) );
        },
        setColors : function( ) { 
            return new Promise( function( resolve, reject ) { 
                this.loadColors( ).then( function( colors ) { 
                    this.colors = colors;
                    resolve( );
                }.bind( this ) );
            }.bind( this ) );
        },
        msg : function( name ) { 
            return this.i18n.msg( name );
        },
        setTitle : function( ) { 
            const title = this.msg( "doc-title" ).escape( ).replace( /\$SITENAME/g, SITENAME );
            document.title = title;
        },
        load : function( ) { 
            document.title = "Loading...";
            this.update( "loading" );
            Promise.all( [
                this.setI18n( ),
                this.setColors( )
            ] ).then( function( ) { 
                this.update( "resources-loaded" );
                this.setTitle( );
                Promise.all(
                    this.rights.map( this.loadUsers, this )
                ).then( function( ) { 
                    this.update( "users-loaded" );
                    this.loaded = true;
                    this.render( );
                }.bind( this ) );
            }.bind( this ) );
        },
        loadUsers : function( group ) { 
            const ajax = this[ "loadUsersAjax" + ( isUCP ? "UCP" : "" ) ];
            return new Promise( function( resolve, reject ) {
                ajax( group ).done( function( response ) {
                    const promise = this[ "handleUsersResponse" + 
                        ( isUCP ? "UCP" : "" ) ]
                        .call( this, response, group );
                    promise.then( resolve )[ "catch" ]( reject );
                }.bind( this ) );
            }.bind( this ) );
        },
        loadUsersAjax : function( group ) { 
            return $.get( mw.config.get( "wgScriptPath" ) + "/api.php", { 
                format : "json",
                action : "query",
                list : "groupmembers",
                gmgroups : group.split( "|" )[ 0 ],
                gmlimit : "max",
                cb : Date.now( )
            } );
        },
        loadUsersAjaxUCP : function( group ) { 
            return $.get( mw.config.get( "wgScriptPath" ) + "/api.php", { 
                format : "json",
                action : "query",
                list : "allusers",
                augroup : group.split( "|" )[ 0 ],
                aulimit : "max"
            } );
        },
        handleUsersResponse : function( response, group ) { 
            const users = Array.from( response.users ).map( function( item ) { 
                return ( { name : item.name, group : group, userid : item.userid } );
            } );
            return new Promise( function( resolve, reject ) {
                Promise.all( users.map( this.loadData, this ) )
                    .then( resolve )[ "catch" ]( reject );
            }.bind( this ) );
        },
        handleUsersResponseUCP : function( response, group ) { 
            const query = response.query;
            const users = Array.from( query.allusers ).map( function( item ) { 
                return ( { name : item.name, group : group, userid : item.userid } );
            } );
            return new Promise( function( resolve, reject ) {
                Promise.all( users.map( this.loadData, this ) )
                    .then( resolve )[ "catch" ]( reject );
            }.bind( this ) );
        },
        loadData : function( user ) { 
            return new Promise( function( resolve, reject ) { 
                const group = user.group, name = user.name, userid = user.userid;
                const ajax = this[ "loadDataAjax" + ( isUCP ? "UCP" : "" ) ];
                const target = isUCP ? userid : name;
                ajax( target ).done( function( data ) {
                    const promise = this[ "handleData" + 
                        ( isUCP ? "UCP" : "" ) ]
                        .call( this, data, name, group ); 
                    promise.then( resolve )[ "catch" ]( reject );
                }.bind( this ) );
            }.bind( this ) );
        },
        loadDataAjax : function( name ) { 
            return $.get( mw.config.get( "wgScriptPath" ) + "/wikia.php", { 
                controller : "UserProfilePage",
                method : "renderUserIdentityBox",
                format : "json",
                title : "User:" + name
            } );
        },
        loadDataAjaxUCP : function( userid ) { 
            return $.get( mw.config.get( "wgScriptPath" ) + "/wikia.php", {
                controller : "UserProfile",
                method : "getUserData",
                format : "json",
                userId : userid
            } );
        },
        handleData : function( data, name, group ) { 
            return new Promise( function( resolve, reject ) {
                const params = { name : name, groups : [ group ] };
                const user = data.user;
                params.avatar = user.avatar;
                params.registration = new Date( user.registration || FOUNDING );
                params.edits = parseInt( user.edits );
                if ( !this.cache.hasOwnProperty( name ) ) {
                    this.cache[ name ] = params;
                    if ( this.grouped ) { 
                        if ( this.useRegistry ) { 
                            const type = getGroupType( group );
                            this.users[ type ][ group ].push( this.cache[ name ] );
                        } else {
                            this.users[ group ].push( this.cache[ name ] );
                        }
                    } else { 
                        this.users.push( this.cache[ name ] );
                    }
                } else {
                    var index = -1;
                    if ( !this.grouped ) {
                        index = this.users.findIndex( function( u ) { 
                            return u.name === name; 
                        } );
                        this.users[ index ].groups.push( group );
                        this.cache[ name ].groups.push( group );
                    } else { 
                        console.log( this, this.cache );
                        const orig = this.cache[ name ].groups[ 0 ];
                        if ( this.useRegistry ) {
                            const type = getGroupType( orig );
                            index = this.users[ type ][ orig ].findIndex( function( u ) { 
                                return u.name === name;
                            } );
                            this.users[ type ][ orig ][ index ].groups
                                .push( group );
                        } else {
                            index = this.users[ orig ].findIndex( function( u ) { 
                                return u.name === name;
                            } );
                            this.users[ orig ][ index ].groups.push( group );
                        }
                    }
                }
                resolve( );
            }.bind( this ) );
        },
        handleDataUCP : function( data, name, group ) { 
            return new Promise( function( resolve, reject ) { 
                const params = { name : name, groups : [ group ] };
                const user = data.userData;
                params.registration = new Date( user.registration || FOUNDING );
                params.edits = parseInt( String( user.edits ).split( "," ).join( "" ) );
                params.avatar = user.avatar;
                if ( !this.cache.hasOwnProperty( name ) ) {
                    this.cache[ name ] = params;
                    if ( this.grouped ) { 
                        if ( this.useRegistry ) { 
                            const type = getGroupType( group );
                            this.users[ type ][ group ].push( this.cache[ name ] );
                        } else {
                            this.users[ group ].push( this.cache[ name ] );
                        }
                    } else { 
                        this.users.push( this.cache[ name ] );
                    }
                } else {
                    var index = -1;
                    if ( !this.grouped ) {
                        index = this.users.findIndex( function( u ) { 
                            return u.name === name; 
                        } );
                        this.users[ index ].groups.push( group );
                        this.cache[ name ].groups.push( group );
                    } else { 
                        console.log( this, this.cache, name );
                        const orig = this.cache[ name ].groups[ 0 ];
                        if ( this.useRegistry ) {
                            const type = getGroupType( orig );
                            index = this.users[ type ][ orig ].findIndex( function( u ) { 
                                return u.name === name;
                            } );
                            this.users[ type ][ orig ][ index ].groups
                                .push( group );
                        } else {
                            index = this.users[ orig ].findIndex( function( u ) { 
                                return u.name === name;
                            } );
                            this.users[ orig ][ index ].groups.push( group );
                        }
                    }
                }
                resolve( );
            }.bind( this ) );
        },
        hasUser : function( name, group ) { 
            var users = [ ];
            if ( arguments.length > -1 ) {
                if ( this.useRegistry ) {
                    const type = getGroupType( group );
                    users = this.users[ type ][ group ];
                } else {
                    users = this.users[ group ];
                }
                return users.includes( name );
            } else {
                return this.cache.hasOwnProperty( name );
            }
        },
        render : function( ) { 
            this.ui = new LGM.UI( this );
            if ( this.renderDelay > 0 ) {
                this.renderTimeout = setTimeout( function( ) { 
                    clearTimeout( this.renderTimeout );
                    this.renderTimeout = null;
                    this.ui.render( );
                    this.rendered = true;
                }.bind( this ), this.renderDelay * 1000 );
            } else {
                this.ui.render( );
                this.rendered = true;
            }
        },
        // TODO: Create a preloader.
        update : function( ) { }
    } );
    
    // UI cache
    const LGM_UI_CACHE = { };
    
    // Creating the UI constructor
    LGM.UI = function( referrer ) { 
        if ( !isInst( this, LGM.UI ) ) return new LGM.UI( referrer );
        if ( !isInst( referrer, LGM ) ) return { };
        this.referrer = referrer;
        this.search = this.referrer.search;
        this.grouped = this.referrer.grouped;
        this.useRegistry = this.referrer.useRegistry;
        this.users = this.referrer.users;
        this.sort = this.referrer.sort;
        this.actions = this.referrer.actions;
        this.enableActions = this.referrer.enableActions;
        this.target = this.referrer.target;
        this.type = this.referrer.type;
        return ( LGM_UI_CACHE[ random( 1, MAX_UI_UID ) ] = this );
    };
    
    LGM.UI.fn = LGM.UI.prototype;
    
    const WRAPPER_HTML = '<div class="LGMWrapper lgm-wrapper">' + 
        '<div class="LGMContent lgm-content"></div>' +
    '</div>';
    
    const SEARCH_HTML = '<form class="LGMSearch lgm-search">' +
        '<div class="LGMSearchInput lgm-search__input">' +
            '<input type="search" class="LGMSearchField lgm-search__field" />' +
        '</div>' +
    '</form>';
    
    const REG_SECTION_HTML = '<div class="LGMRegistryGroup lgm-registry__group">' + 
        '<header class="LGMRegistryHeader lgm-registry__header">' +
            '<h2 class="LGMRegistryTitle lgm-registry__title"></h2>' +
        '</header>' +
        '<div class="LGMRegistryContent lgm-registry__content"></div>' +
    '</div>';
    
    const SECTION_HTML = '<section class="LGMGroup">' +
        '<header class="LGMHeader lgm-header">' +
            '<h3 class="LGMTitle lgm-title"></h3>' +
        '</header>' +
        '<div class="LGMGroupContent lgm-group__content"></div>' +
    '</section>';
    
    const ROW_HTML = '<div class="LGMRow"></div>';
    
    const TAG_HTML = '<span class="LGMGroupTag"></span>';
    
    Object.assign( LGM.UI.fn, { 
        /* Commenting this part of the code out.
           May revisit in the future
        ----------------------------------------
        configure : function( options ) { 
            const o = Object.assign( { }, options );
            Object.keys( o ).forEach( function( key ) { 
                const orig = this.options[ key ];
                const value = o[ key ];
                this.options[ key ] = isset( value ) ? value : orig;
            }, this );
        },*/
        render : function( ) { 
            this.container = parseHTML( WRAPPER_HTML );
            this.container.classList.add( "lgm-type__" + this.type );
            this.container.dataset.type = this.type;
            
            if ( this.grouped ) {
                this.container.classList.add( "lgm-grouped" );
            }
            
            if ( this.search ) { 
                this.searchEl = parseHTML( SEARCH_HTML );
                this.searchInput = this.searchEl.querySelector( ".lgm-search__input" );
                this.searchField = this.searchEl.querySelector( "input" );
                this.searchField.setAttribute( "placeholder", 
                    this.referrer.msg( "search" ).plain( ) );
                this.searchField.addEventListener( "input", function( e ) { 
                    const value = e.target.value;
                    if ( value === "" ) {
                        this.showItems( );
                    } else {
                        this.showItems( function( item ) { 
                            return item.dataset.user.startsWith( value );
                        } );
                    }
                }.bind( this ) );
                this.container.insertAdjacentElement( 
                    "afterbegin", this.searchEl
                );
            }
            
            this.content = this.container.querySelector( ".LGMContent" );
            this.target.innerHTML = "";
            
            this.target.insertAdjacentElement( "afterbegin", this.container );
            this.renderItems( );
        },
        calculateRows : function( ) {
            const hasType = TYPES.hasOwnProperty( this.type );
            const tw = parseFloat( gpv( this.referrer.target, "width" ) );
            const ph = getType( this.type ).cloneNode( true );
            this.referrer.target.insertAdjacentElement( "afterbegin", ph );
            const elw = ph.clientWidth;
            this.referrer.target.removeChild( ph );
            const rows = Math.floor( tw / elw );
            return rows > 0 ? rows : 1;
        },
        addItem : function( item, group ) { 
            if ( this.grouped ) {
                if ( this.useRegistry ) {
                    const type = getGroupType( group );
                    if ( !this.sections[ type ].hasOwnProperty( group ) ) {
                        this.sections[ type ][ group ] = [ item ];
                    }  else {
                        this.sections[ type ][ group ].push( item );
                    }
                } else {
                    if ( !this.sections.hasOwnProperty( group ) ) {
                        this.sections[ group ] = [ item ];
                    } else {
                        this.sections[ group ].push( item );
                    }
                }
            } else {
                this.sections.push( item );
            }
        },
        getItemEl : function( item ) { 
            const typeEl = getType( this.type ).cloneNode( true );
            const avatar = typeEl.querySelector( ".lgm-avatar__image" );
            avatar.setAttribute( "src", item.avatar );
            avatar.setAttribute( "alt", ( typeEl.dataset.user = item.name ) );
            
            const name = typeEl.querySelector( ".lgm-username" );
            name.querySelector( "strong" ).textContent = typeEl.dataset.user;
            
            const group = typeEl.querySelector( ".lgm-user__group" );
            Array.from( item.groups ).forEach( function( g ) { 
                const tagEl = parseHTML( TAG_HTML );
                tagEl.classList.add( "lgm-user__tag-" + g );
                tagEl.textContent = this.referrer.msg( g ).escape( );
                group.insertAdjacentElement( "beforeend", tagEl );
            }, this );
            
            return typeEl;
        },
        renderItems : function( render ) { 
            if ( this.content.innerHTML !== "" ) {
                while ( this.content.lastChild ) 
                    this.content.removeChild( this.content.lastChild );
            }
            render = isInst( render, Function ) ? render : returnTrue;
            var registry = null;
            if ( this.grouped ) { 
                if ( this.useRegistry ) { 
                    registry = Object.keys( this.users )
                        .reduce( function( o, t ) { 
                            o[ t ] = Object.keys( this.users[ t ] )
                                .reduce( function( ob, gr ) { 
                                    ob[ gr ] = this.users[ t ][ gr ]
                                        .filter( render, this );
                                    return ob;
                                }.bind( this ), { } );
                            return o;
                        }.bind( this ), { } );
                } else {
                    registry = Object.keys( this.users )
                        .reduce( function( o, g ) { 
                            o[ g ] = this.users[ g ].filter( render, this );
                            return o;
                        }.bind( this ), { } );
                }
            } else {
                registry = this.users.filter( render, this );
            }
            
            const rows = this.calculateRows( );
            if ( this.grouped ) {
                if ( this.useRegistry ) { 
                    Object.keys( registry ).forEach( function( type, index ) { 
                        const registryObj = registry[ type ];
                        const registryEl = parseHTML( REG_SECTION_HTML );
                        const titleEl = registryEl.querySelector( 
                            ".lgm-registry__title" 
                        );
                        titleEl.textContent = this.referrer.msg( type )
                            .plain( );
                        const content = registryEl.querySelector( 
                            ".lgm-registry__content"
                        );
                        Object.keys( registryObj )
                            .sort( function( a, b ) { 
                                const ai = USER_GROUP_ORDER.indexOf( a );
                                const bi = USER_GROUP_ORDER.indexOf( b );
                                return ai - bi;
                            } )
                            .forEach( function( group, i ) { 
                                if ( registryObj[ group ].length === 0 ) return;
                                var section = parseHTML( SECTION_HTML );
                                section.dataset.group = group;
                                section.dataset.index = i;
                                var title = section.querySelector( ".lgm-title" );
                                title.textContent = this.referrer
                                    .msg( group ).escape( );
                                var contentWrapper = section.querySelector( ".lgm-group__content" ),
                                    row = parseHTML( ROW_HTML ),
                                    items = registryObj[ group ],
                                    lastIndex = items.length - 1;
                                Array.from( items )
                                    .sort( this.sort )
                                    .forEach( function( item, j ) { 
                                        if ( j % rows === 0 && j > 0 ) {
                                            contentWrapper
                                                .insertAdjacentElement( 
                                                    "beforeend", row
                                                );
                                            row = parseHTML( ROW_HTML );
                                        }
                                        const itemEl = this.getItemEl( item );
                                        row.insertAdjacentElement( 
                                            "beforeend", itemEl 
                                        );
                                        if ( j === lastIndex ) {
                                            contentWrapper
                                                .insertAdjacentElement(
                                                    "beforeend", row 
                                                );
                                        }
                                    }, this );
                                content.insertAdjacentElement(
                                    "beforeend", section 
                                );
                            }, this );
                        this.content.insertAdjacentElement(
                            "beforeend", registryEl 
                        );
                    }, this );
                } else { 
                    Object.keys( registry ).sort( function( a, b ) { 
                        const ai = USER_GROUP_ORDER.indexOf( a );
                        const bi = USER_GROUP_ORDER.indexOf( b );
                        return ai - bi;
                    } ).forEach( function( group, i ) { 
                        if ( registry[ group ].length === 0 ) return;
                        var section = parseHTML( SECTION_HTML );
                        section.dataset.group = group;
                        var title = section.querySelector( ".lgm-title" );
                        title.textContent = this.referrer.msg( group )
                            .escape( );
                        var wrapper = section.querySelector( ".lgm-group__content" ),
                            row = parseHTML( ROW_HTML ),
                            items = registry[ group ],
                            lastIndex = items.length - 1;
                        Array.from( items ).sort( this.sort, this )
                            .forEach( function( item, index ) { 
                            if ( index % rows === 0 && index > 0 ) {
                                wrapper.insertAdjacentElement(
                                    "beforeend", row
                                );
                                row = parseHTML( ROW_HTML );
                            }
                            const itemEl = this.getItemEl( item );
                            row.insertAdjacentElement(
                                "beforeend", itemEl
                            );
                            if ( index === lastIndex ) { 
                                wrapper.insertAdjacentElement( 
                                    "beforeend", row
                                );
                            }
                        }, this );
                        this.content.insertAdjacentElement( 
                            "beforeend", section
                        );
                    }, this );
                }
            } else {
                var row = parseHTML( ROW_HTML ),
                    last = registry.length - 1;
                Array.from( registry ).sort( this.sort )
                    .forEach( function( item, index ) {
                    if ( index % rows === 0 && index > 0 ) {
                        this.content.insertAdjacentElement( 
                            "beforeend", row
                        );
                        row = parseHTML( ROW_HTML );
                    }
                    const itemEl = this.getItemEl( item );
                    row.insertAdjacentElement( "beforeend", itemEl );
                    if ( index === last ) {
                        this.content.insertAdjacentElement( 
                            "beforeend", row
                        );
                    }
                }, this );
            }
        },
        showItems : function( filter ) { 
            return this.renderItems( filter );
        }
    } );
    window.dev.lgm = window.LGM = LGM( CONFIG );
    mw.hook( "dev.lgm" ).fire( window.dev.lgm );
    window.dev.lgmController = window.LGMController = LGM;
    mw.hook( "dev.lgm.controller" ).fire( window.dev.lgmController );
} )( this, jQuery, mediaWiki );