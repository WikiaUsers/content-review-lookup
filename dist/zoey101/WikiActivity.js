/**
 * WikiActivity
 * 
 * Recreates the classic Special:WikiActivity page
 * on the Unified Community Platform with a modernized look.
 * 
 * @author  Ultimate Dark Carnage
 * @version v0.7b
 * 
 * Note:
 * This script is in beta at this moment. If you feel the need to make
 * any changes that will be beneficial to the users of this script,
 * you are welcome to make them.
 * 
 * Fixes
 * 
 * TODO:
 * - Theming (almost done)
 * - Parse summaries
 * - UI options?
 * - WikiaURL integration (partial)
 * - Integration with existing WikiActivity scripts
 * - Fix image and category previews
 * - Fix "timeago" function
 **/
( function( window, $, mw ) { 
    "use strict";
    return;
    // MediaWiki version
    const MW_VERSION = parseFloat( mw.config.get( "wgVersion" ) );
    // If the wiki is on the legacy platform, do not run
    if ( MW_VERSION === 1.19 ) return;
    // Configuration object
    window.rwaOptions = window.rwaOptions || { };
    // UCP object
    window.UCP = window.UCP || { };
    // Dev object
    window.dev = window.dev || { };
    // Checks if the namespace name is "Special"
    const isSpecial = mw.config.get( "wgNamespaceNumber" ) === -1;
    // Checks if the title is "WikiActivity"
    const isActivity = /^WikiActivity/.test( mw.config.get( "wgTitle" ) );
    // Get localized namespace names
    const namespaceName = mw.config.get( 'wgFormattedNamespaces' );
    // If the WikiActivity object exists or it is not a special page
    // prevent running.
    if ( 
        ( !isSpecial || !isActivity ) && 
        window.UCP.hasOwnProperty( "WikiActivity" ) 
    ) return;
    // Overwriting the wgCanonicalSpecialPageName variable
    mw.config.set( "wgCanonicalSpecialPageName", "WikiActivity" );
    // Core scripts
    const coreScripts = Object.freeze( { 
        i18n : "MediaWiki:I18n-js/code.js",
        colors : "MediaWiki:Colors/code.js",
        wds : "MediaWiki:WDSIcons/code.js",
        url : "MediaWiki:WikiaURL.js"
    } );
    // Get script url
    const getScriptURL = function getScriptURL( name ) { 
        const path = mw.util.wikiScript( 'load' ) + "?";
        const q = { };
        Object.assign( q, { 
            debug : mw.config.get( "debug" ),
            lang : mw.config.get( "wgUserLanguage" ),
            mode : "articles",
            skin : mw.config.get( "skin" ),
            articles : String( name )
        } );
        if ( mw.config.get( "wgContentReviewExtEnabled" ) ) { 
            if ( q.articles.search( /mediawiki:/i ) !== -1 ) {
                if ( mw.config.get( "wgContentReviewTestModeEnabled" ) ) {
                    q.current = mw.config.get( "wgScriptsTimestamp" );
                } else {
                    q.reviewed = mw.config.get( "wgReviewedScriptsTimestamp" );
                }
            }
        }
        q.only = "scripts";
        const url = mw.config.get( "wgServer" ) + path + Object.keys( q )
            .map( function( k ) { 
                const v = q[ k ];
                return String( k ) + "=" + String( v );
            } ).join( "&" );
        return url;
    };
    // Searching for scripts
    Object.keys( coreScripts ).forEach( function( key ) { 
        const script = "u:dev:" + coreScripts[ key ];
        if ( !window.dev.hasOwnProperty( key ) ) {
            mw.loader.load( getScriptURL( script ) );
        }
    } );
    // Importing the main stylesheet
    importArticle( { 
        type : "style",
        article : "u:dev:MediaWiki:WikiActivity.css"
    } );
    // Create the WikiActivity object
    window.UCP.WikiActivity = ( function( window, $, mw ) { 
        // Script name
        const NAME = "WikiActivity";
        // Script version
        const VERSION = "v0.6b";
        // Supported namespaces
        const SUPPORTED_NAMESPACES = Object.freeze( [ 
            0, // Main
            1, // Talk
            2, // User
            3, // User talk,
            4, // Project
            5, // Project talk
            6, // File
            7, // File talk
            // Start TOCO
            /* 10, // Template */
            /* 11, // Template talk */
            /* 14, // Category */
            /* 15, // Category talk */
            // End TODO
            110, // Forum
            111, // Forum talk
            500, // User blog
            501, // User blog comment
            828, // Module
            829 // Module talk
        ] );
        // Checks if it is a comment namespace
        const IS_COMMENT = Object.freeze( [ 
            3, 5, 111, 501, 829
        ] );
        // Checks if it is a talk namespace
        const IS_TALK = Object.freeze( [ 
            3, 5, 111, 829
        ] );
        // Default configuration
        const DEFAULTS = Object.freeze( { 
            limit : 50,
            namespaces : Array.from( SUPPORTED_NAMESPACES )
        } );
        // Default configuration for feed entries
        const ENTRY_DEFAULTS = Object.freeze( { 
            isComment : false,
            isTalk : false,
            ns : 0,
            type : "",
            trueType : "",
            time : null,
            summary : "",
            user : "",
            title : "",
            userid : "",
            revid : 0,
            oldid : 0,
            categories : [ ],
            images : [ ],
            avatar : ""
        } );
        // Avatar cache
        const AVATAR_CACHE = { };
        // Icons for types
        const ICONS = Object.freeze( { 
            "edit" : "pencil",
            "new" : "add",
            "comment" : "comment",
            "categorize" : "tag",
            "diff" : "clock",
            "_default" : "pencil"
        } );
        // Function to parse HTML
        const parseHTML = function parseHTML( s ) { 
            const f = new DOMParser( );
            const d = f.parseFromString( s, "text/html" );
            const b = d.body;
            const m = b.firstChild;
            return m;
        };
        // Function to get the canonical icon name
        const getIconName = function getIconName( n ) {
            if ( !ICONS.hasOwnProperty( n ) ) return ICONS._default;
            else return ICONS[ String( n ) ];
        };
        // Creating the spinner element
        const spinner = parseHTML( 
            '<svg class="wds-spinner wds-block" width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + 
                '<g transform="translate(33, 33)">' +
                    '<circle class="wds-path" fill="none" stroke-width="2" stroke-dasharray="188.49555921538757" stroke-dashoffset="188.49555921538757" stroke-linecap="round" r="30"></circle>' +
                '</g>' +
            '</svg>'
        );
        // Creating the primary WikiActivity constructor
        function RWA( opts ) { 
            if ( !( this instanceof RWA ) ) return new RWA( opts );
            this.options = Object.assign( { }, DEFAULTS );
            this.configure( opts );
            this.namespaces = this.options.namespaces;
            this.limit = this.options.limit;
            this.target = document.querySelector( "#mw-content-text" );
            this.wrapper = parseHTML( '<section class="rwa-feed"></section>' );
            Object.assign( this.wrapper.dataset, { 
                type : "activity"
            } );
            this.target.innerHTML = "";
            this.target.insertAdjacentElement( "afterbegin", this.wrapper );
            this.loaded = false;
            this.loading = false;
            this.entries = [ ];
            this.length = 0;
            this.addSpinner( );
            this.load( );
        }
        // Creating the WikiActivity entry constructor
        function RWAEntry( opts, referrer ) { 
            if ( !( this instanceof RWAEntry ) ) return new RWAEntry( opts );
            this.options = Object.assign( { }, ENTRY_DEFAULTS );
            this.configure( opts );
            this.referrer = referrer;
            this.isComment = this.options.isComment;
            this.isTalk = this.options.isTalk;
            this.user = this.options.user;
            this.userid = this.options.userid;
            this.type = this.options.type;
            this.trueType = this.options.trueType || this.options.type;
            this.ns = this.options.ns;
            this.time = this.options.time !== null ? 
                new Date( this.options.time ) : null;
            this.summary = this.options.summary;
            this.revid = this.options.revid;
            this.oldid = this.options.oldid;
            this.title = this.options.title;
            this.categories = this.options.categories;
            this.images = this.options.images;
            this.avatar = this.options.avatar;
            this.i18n = this.referrer.i18n;
            this.wds = this.referrer.wds;
            this.url = this.referrer.url;
            this.timeago = this.referrer.timeago;
            this.parseDate = this.referrer.parseDate;
            this.create( );
        }
        // Creating static properties for the WikiActivity constructor
        Object.assign( RWA, {
            __VERSION : VERSION,
            __NAME : NAME,
            Entry : RWAEntry,
            fn : RWA.prototype
        } );
        // Creating methods for the WikiActivity constructor
        Object.assign( RWA.fn, { 
            // Configure properties
            configure : function( ) { 
                if ( arguments.length === 0 ) return;
                const r = Object( arguments[ 0 ] ), ctx = this;
                Object.keys( r ).forEach( function( k ) { 
                    const g = ctx.options[ k ], v = r[ k ];
                    if ( v === void 0 ) ctx.options[ k ] = g;
                    else ctx.options[ k ] = v;
                } );
            },
            // Adds a loading spinner to the wrapper
            addSpinner : function( ) { 
                this.wrapper.innerHTML = "";
                this.spinner = spinner.cloneNode( true );
                this.spinner.classList.replace(
                    "wds-block", "wds-spinner__block"
                );
                this.spinner.querySelector( "circle" ).classList
                    .replace( "wds-path", "wds-spinner__stroke" );
                this.wrapper.insertAdjacentElement( "afterbegin", this.spinner );
            },
            // Loads all core resources
            load : function( ) { 
                const ctx = this;
                this.loading = true;
                Promise.all( [
                    "I18n",
                    "Colors",
                    "Wds",
                    "Url"
                ].map( function( k ) { 
                    const s = String( k ).toLowerCase( );
                    switch ( s ) {
                        case "i18n" :
                            return ctx[ "load" + k ].call( ctx );
                        default :
                            return new Promise( function( res, rej ) { 
                                mw.hook( "dev." + s ).add( res );
                            } );
                    }
                } ) ).then( this.init.bind( this ) );
            },
            // Loads internationalization object
            loadI18no : function( ) { 
                return new Promise( function( res, rej ) { 
                    mw.hook( "dev.i18n" ).add( res );
                } );
            },
            // Loads i18n messages
            loadMessages : function( i18no ) { 
                return i18no.loadMessages( NAME );
            },
            // Sets i18n object
            loadI18n : function( ) { 
                const promise = this.loadI18no( ), ctx = this;
                return new Promise( function( res, rej ) { 
                    promise.then( function( i18no ) { 
                        ctx.loadMessages( i18no )
                            .done( function( i18n ) {
                                ctx.i18n = i18n;
                                res( );
                            } )
                            .fail( rej );
                    } );
                } );
            },
            // Shortcut to RWA.fn.i18n.msg
            msg : function( ) { 
                const a = Array.from( arguments );
                return this.i18n.msg.apply( this.i18n, a );
            },
            // Initializes the object
            init : function( ) { 
                this.wds = window.dev.wds;
                this.colors = window.dev.colors;
                this.url = window.dev.url;
                this.overwriteTitle( );
                this.setDefaultTheme( );
                this.loadRCData( );
            },
            // Overwrites existing document and header title
            overwriteTitle : function( ) {
                document.title = this.i18n.msg( 
                    "doc-title", mw.config.get( "wgSiteName" ) 
                ).escape( );
                document.querySelector( ".page-header__title" )
                    .textContent = this.i18n.msg( "heading-title" ).escape( );
            },
            // Setting the default theme for WikiActivity
            setDefaultTheme : function( ) { 
                this.theme = { };
                this.theme.borderColor = this.colors.parse( this.colors.fandom.header );
                this.theme.backgroundColor = this.theme.borderColor.lighten( 12 );
                this.theme.iconWrapper = this.colors.parse( this.colors.fandom.menu ).lighten( -5 );
                this.theme.link = this.colors.parse( this.colors.fandom.link );
                
                this.colors.replace( ":root{ " +
                    "--rwa-border__color: $borderColor;" +
                    "--rwa-background__color: $backgroundColor;" +
                    "--rwa-icon__wrapper: $iconWrapper;" +
                    "--rwa-link__color: $link;" +
                "}", this.theme );
            },
            // Loads recentchanges data
            loadRCData : function( ) { 
                this.loadRCAjax( )
                    .done( this.handleRCData.bind( this ) )
                    .fail( this.handleRCLoadException.bind( this ) );
            },
            // RecentChanges AJAX
            loadRCAjax : function( ) {
                return $.get( mw.util.wikiScript( 'api' ), { 
                    action : "query",
                    list : "recentchanges",
                    rcnamespace : this.namespaces.join( "|" ),
                    rcprop : [
                        "comment",
                        "timestamp",
                        "user",
                        "title",
                        "userid",
                        "ids"
                    ].join( "|" ),
                    rctype : [ 
                        "categorize",
                        "edit",
                        "new"
                    ].join( "|" ),
                    rcshow : "!minor",
                    rclimit : this.limit,
                    format : "json"
                } );
            },
            // Handles recentchanges data
            handleRCData : function( data ) {
                if ( data.error ) return this.renderException( "notfound" );
                const query = data.query, rc = query.recentchanges;
                Promise
                    .all( Array.from( rc ).map( this.loadEntryData, this ) )
                    .then( this.render.bind( this ) );
            },
            // Loads data from an entry
            loadEntryData : function( entry ) { 
                const params = { };
                Object.assign( params, { 
                    user : entry.user,
                    title : entry.title,
                    userid : entry.userid,
                    revid : entry.revid,
                    oldid : entry.old_revid,
                    summary : entry.comment,
                    ns : entry.ns,
                    time : entry.timestamp,
                    isComment : IS_COMMENT.indexOf( entry.ns ) > -1,
                    isTalk : IS_TALK.indexOf( entry.ns ) > -1
                } );
                if ( params.isComment ) { 
                    Object.assign( params, {
                        type : "comment",
                        trueType : entry.type
                    } );
                } else {
                    params.type = params.trueType = entry.type;
                }
                if ( params.trueType === "new" ) { 
                    const w = this.msg( "created-with" ).escape( );
                    const r = params.summary.indexOf( w, 0 ) === 0;
                    if ( r ) {
                        const l = w.length;
                        params.summary = params.summary.slice( l ).trim( );
                        params.summary = params.summary
                            .replace( /^\"\s*|\s*\"$/g, "" )
                            .trim( );
                    }
                }
                
                params.summary = this.parseSummary( params.summary );
                return this.generateEntryData( params );
            },
            // Parses summary content
            parseSummary : function ( summary ) {
                summary = mw.html.escape( summary );
                summary = summary.replace( /\[\[([^\[\]]+)\]\]/g, function( m, r1 ) { 
                    
                } );
                return summary;
            },
            // Creates the required AJAX object for Step 1
            generateDataAjax : function( revid ) { 
                return $.get( mw.util.wikiScript( 'api' ), { 
                    action : "query",
                    prop : [
                        "categories",
                        "images"
                    ].join( "|" ),
                    revids : revid,
                    indexpageids : true,
                    format : "json"
                } );
            },
            // Step 1: Generates data from feed entry
            generateEntryData : function( params ) { 
                const p = Object.assign( { }, params ), ctx = this;
                return new Promise( function( res, rej ) { 
                    ctx.generateDataAjax( p.revid ).done( function( d ) { 
                        const pageid = d.query.pageids[ 0 ];
                        if ( d.query.pages[ "-1" ] ) {
                            // If no category or image data exists,
                            // go directly to Step 4.
                            ctx.handleEntryData.call( ctx, p, res );
                        } else {
                            // Otherwise, go to the next step.
                            const page = d.query.pages[ pageid ];
                            ctx.handleEntryInfo.call( ctx, page, p, res );
                        }
                    } );
                } );
            },
            // Step 2: Handles info fetched from feed entry
            handleEntryInfo : function( page, params, callback ) { 
                const categories = Array.from( page.categories || [ ] )
                    .map( function( c ) { 
                        return c.title;
                    } );
                const files = Array.from( page.images || [ ] )
                    .map( function( f ) { 
                        return f.title;
                    } );
                params.categories = categories;
                if ( files.length ) { 
                    // If any images are added,
                    // go to Step 3.
                    this.getImageInfo( files, params, callback );
                } else {
                    // Otherwise, go directly to Step 4.
                    params.images = [ ];
                    this.handleEntryData( params, callback );
                }
            },
            // Creates required AJAX for Step 3.
            getImageInfoAjax : function( files ) { 
                return $.get( mw.util.wikiScript( 'api' ), { 
                    action : "query",
                    prop : "imageinfo",
                    iiprop : "url",
                    titles : files.join( "|" ),
                    indexpageids : true,
                    format : "json"
                } );
            },
            // Step 3: Fetches image URL and source from
            // files gained in Step 1.
            getImageInfo : function( files, params, callback ) { 
                const ctx = this;
                this.getImageInfoAjax( files ).done( function( data ) { 
                    const pageids = data.query.pageids;
                    if ( data.query.pages[ "-1" ] ) {
                        params.images = [ ];
                    } else {
                        params.images = Array.from( pageids ).map( function( pageid ) { 
                            const file = data.query.pages[ pageid ];
                            const obj = { };
                            Object.assign( obj, { 
                                src : file.imageinfo[ 0 ].url,
                                url : file.imageinfo[ 0 ].descriptionurl,
                                title : file.title
                            } );
                            return obj;
                        } ); 
                    }
                    // After Step 3, go to Step 4
                    ctx.handleEntryData.call( ctx, params, callback );
                } );
            },
            // Step 4: Handles data collected from Steps 1-3 and inserts
            // the data to the entries array
            handleEntryData : function( params, callback ) {
                const ctx = this;
                this.fetchAvatar( params )
                    .then( function( avatar ) { 
                        params.avatar = avatar;
                        const entry = new RWAEntry( params, ctx );
                        ctx.length = ctx.entries.push( entry );
                        return entry;
                    } )
                    .then( callback );
            },
            // Step 5: Generates the avatar from the user who made the edit
            fetchAvatar : function( params ) { 
                const ctx = this;
                return new Promise( function( res, rej ) {
                    if ( AVATAR_CACHE.hasOwnProperty( params.userid ) ) {
                        // If the user ID is in the avatar cache object,
                        // resolve the promise immediately
                        res( AVATAR_CACHE[ params.userid ] );
                    } else {
                        // Otherwise, go to Step 6 and resolve from there
                        ctx.generateAvatar( params.userid ).then( function( a ) { 
                            res( ( AVATAR_CACHE[ params.userid ] = a ) );
                        } );
                    }
                } );
            },
            // Create required AJAX for Step 6.
            getUserDataAjax : function( userid ) { 
                return $.get( mw.util.wikiScript( 'wikia' ), { 
                    controller : "UserProfile",
                    method : "getUserData",
                    userId : userid,
                    format : "json"
                } );
            },
            // Step 6: Fetches the user data from AJAX
            generateAvatar : function( userid ) { 
                const ctx = this;
                return new Promise( function( res, rej ) { 
                    ctx.getUserDataAjax( userid ).done( function( data ) { 
                        const user = data.userData;
                        res( user.avatar );
                    } );
                } );
            },
            // Handles exception for loading recentchanges
            handleRCLoadException : function( exception ) { 
                this.renderException( "failed", exception );
            },
            // Renders activity feed
            render : function( ) { 
                this.content = parseHTML( '<nav class="rwa-feed__content">' +
                    '<a class="rwa-rc__link"></a>' +
                    '<ul class="rwa-feed__list"></ul>' +
                '</nav>' );
                // Inserting the content element to its wrapper
                this.wrapper.innerHTML = '';
                this.wrapper.insertAdjacentElement( "afterbegin", this.content );
                // RecentChanges link
                this.rclink = this.content.querySelector( ".rwa-rc__link" );
                this.rclink.setAttribute( "href", mw.util.getUrl( namespaceName[-1] + ':RecentChanges' ) );
                this.rclink.textContent = 
                    this.msg( "recentchanges-text" ).escape( );
                // Activity feed list
                this.list = this.content.querySelector( ".rwa-feed__list" );
                // Adding entries to the list
                this.entries.forEach( this.renderEntry, this );
                this.loading = false;
                this.loaded = true;
            },
            // Render activity feed entries
            renderEntry : function( entry ) { 
                const li = entry.el;
                this.list.appendChild( li );
            },
            renderException : function( name, exception ) { },
            parseDate : function( date ) { 
                if ( Object( date ) instanceof Date ) {
                    return date;
                } else if ( 
                    typeof date === "number" ||
                    typeof date === "string"
                ) {
                    return new Date( date );
                } else {
                    return new Date( );
                }
            },
            timeago : function( d, options ) { 
                options = Object.assign( { }, options );
                const date = this.parseDate( d );
                const epochs = Object.freeze( [
                    "year",
                    "month",
                    "day",
                    "hour",
                    "minute"
                ] );
                const format = Object.freeze( { 
                    year : 31536000,
                    month : 2592000,
                    day : 86400,
                    hour : 3600,
                    minute : 60
                } );
                function getDuration( s ) { 
                    var interval = 0;
                    for ( var i = 0; i < epochs.length; i++ ) {
                        const epoch = epochs[ i ];
                        const duration = format[ epoch ];
                        if ( duration === void 0 ) continue;
                        interval = Math.floor( s / duration );
                        if ( interval < 1 ) continue;
                        return { interval : interval, epoch : epoch };
                    }
                }
                const diff = Math.floor( Date.now( ) - date.getTime( ) );
                const dur = getDuration( Math.abs( diff ) );
                const n = dur.interval, e = dur.epoch + ( (
                    Math.abs( n ) > 1 || Math.abs( n ) === 0
                ) ? "s" : "" );
                const suffixKey = ( diff < 0 ) ? "ago" : "fromnow";
                
                var finalSuffixKey = "";
                
                if ( options.justNow ) { 
                    options.cutoff = options.cutoff || 90;
                    if ( isNaN( options.cutoff ) || 
                        diff < Math.abs( options.cutoff ) ) {
                        finalSuffixKey = "justnow";
                    } else {
                        finalSuffixKey = suffixKey;
                    }
                } else {
                    finalSuffixKey = suffixKey;
                }
                
                return this.msg( "timeago-" + ( finalSuffixKey !== "justnow" ?
                    e + "-" : "" ) + finalSuffixKey, n )
                    .parse( );
            } 
        } );
        // Creating static properties for the activity feed entries
        Object.assign( RWAEntry, { 
            uid : 0,
            fn : RWAEntry.prototype
        } );
        // Create methods for the activity feed entry
        Object.assign( RWAEntry.fn, { 
            // Configure properties
            configure : function( ) { 
                if ( arguments.length === 0 ) return;
                const r = Object( arguments[ 0 ] ), ctx = this;
                Object.keys( r ).forEach( function( k ) { 
                    const g = ctx.options[ k ], v = r[ k ];
                    if ( v === void 0 ) ctx.options[ k ] = g;
                    else ctx.options[ k ] = v;
                } );
            },
            msg : function( ) { 
                const a = Array.from( arguments );
                return this.i18n.msg.apply( this.i18n, a );
            },
            create : function( ) { 
                this.el = parseHTML( '<li class="rwa-feed__item">' +
                    '<div class="rwa-icon__container">' +
                        '<span class="rwa-icon__wrapper"></span>' + 
                    '</div>' +
                    '<div class="rwa-details">' +
                        '<div class="rwa-title__wrapper">' +
                            '<a class="rwa-title"></a>' +
                        '</div>' +
                        '<div class="rwa-edited">' +
                            '<span class="rwa-edited__text"></span>' +
                            '<a class="rwa-edited__user">' +
                                '<div class="rwa-avatar wds-avatar">' +
                                    '<img class="rwa-avatar__image wds-avatar__image" />' +
                                '</div>' +
                                '<em class="rwa-edited__username"></em>' +
                            '</a>' +
                            '<span class="rwa-edited__timeago"></span>' +
                            '<a class="rwa-diff__button"></a>' +
                        '</div>' +
                    '</div>' +
                '</li>' );
                this.el.classList.add( "rwa-activity-ns-" + this.ns );
                Object.assign( this.el.dataset, { 
                    type : this.type,
                    ns : this.ns
                } );
                this.iconContainer = this.el.querySelector( ".rwa-icon__container" );
                this.iconWrapper = this.iconContainer.querySelector( ".rwa-icon__wrapper" );
                this.details = this.el.querySelector( ".rwa-details" );
                this.titleWrapper = this.details.querySelector( ".rwa-title__wrapper" );
                this.titleEl = this.titleWrapper.querySelector( ".rwa-title" );
                this.edited = this.details.querySelector( ".rwa-edited" );
                this.editedText = this.edited.querySelector( ".rwa-edited__text" );
                this.editedUser = this.edited.querySelector( ".rwa-edited__user" );
                this.editedAvatar = this.editedUser.querySelector( ".rwa-avatar" );
                this.editedAvatarImg = this.editedAvatar.querySelector( ".rwa-avatar__image" );
                this.editedUsername = this.editedUser.querySelector( ".rwa-edited__username" );
                this.diffButton = this.edited.querySelector( ".rwa-diff__button" );
                this.timeagoEl = this.edited.querySelector( ".rwa-edited__timeago" );
                this.summaryEl = null;
                this.categoriesEl = null;
                this.imagesEl = null;
                
                if ( this.summary !== "" ) {
                    const summaryKey = ( this.isTalk && this.type === "edit" ) ?
                        "edited-section" : ( ( this.type === "new" ) ? "new-page" : "summary" );
                    this.summaryEl = parseHTML( '<section class="rwa-summary rwa-section">' +
                        '<div class="rwa-summary__title rwa-section__title"></div>' +
                        '<div class="rwa-summary__comment rwa-section__desc"></div>' +
                    '</section>' );
                    this.details.insertAdjacentElement( "beforeend", this.summaryEl );
                    this.summaryTitle = this.summaryEl.querySelector( ".rwa-summary__title" );
                    this.summaryComment = this.summaryEl.querySelector( ".rwa-summary__comment" );
                    this.summaryTitle.textContent = this.msg( summaryKey ).escape( );
                    this.summaryComment.innerHTML = this.summary;
                }
                
                if ( this.categories && this.categories.length ) { 
                    this.categoriesEl = parseHTML( '<section class="rwa-categories rwa-section">' +
                        '<div class="rwa-categories__title rwa-section__title"></div>' +
                        '<div class="rwa-categories__list rwa-section__desc"></div>' +
                    '</section>' );
                    this.details.insertAdjacentElement( "beforeend", this.categoriesEl );
                    this.categoriesTitle = this.categoriesEl.querySelector( ".rwa-categories__title" );
                    this.categoriesList = this.categoriesEl.querySelector( ".rwa-categories__list" );
                    this.categoriesTitle.textContent = this.msg( "added-category", this.categories.length ).parse( );
                    this.renderCategories( );
                }
                
                if ( this.images && this.images.length ) { 
                    this.imagesEl = parseHTML( '<section class="rwa-images rwa-section">' +
                        '<div class="rwa-images__title rwa-section__title"></div>' +
                        '<div class="rwa-images__group rwa-section__desc"></div>' +
                    '</section>' );
                    this.details.insertAdjacentElement( "beforeend", this.imagesEl );
                    this.imagesTitle = this.imagesEl.querySelector( ".rwa-images__title" );
                    this.imagesGroup = this.imagesEl.querySelector( ".rwa-images__group" );
                    this.imagesTitle.textContent = this.msg( "added-image", this.images.length ).parse( );
                    this.renderImages( );
                }
                
                if ( this.oldid !== 0 ) {
                    this.diffButton.setAttribute( 
                        "href", this.url( 
                            mw.config.get( "wgServer" ) +
                            mw.config.get( "wgScriptPath" ) +
                            "/wiki/" + this.title
                            .split( /\s+/g ).join( "_" ), { 
                            diff : this.revid,
                            oldid : this.oldid
                        } )
                    );
                    this.diffButton.appendChild( 
                        this.wds.icon( getIconName( "diff" ) )
                    );
                }
                
                this.iconWrapper.insertAdjacentElement( 
                    "afterbegin", this.wds.icon( getIconName( this.type ), {
                        "class": "rwa-icon__" + this.type
                    } )
                );
                
                this.titleEl.textContent = this.title;
                this.titleEl.setAttribute( 
                    "href", mw.util.getUrl( encodeURIComponent( this.title ) )
                );
                
                const editedKey = ( this.type === "new" ) ? "created" : "edited";
                this.editedText.textContent = this.i18n.msg( editedKey )
                    .escape( );
                
                this.editedUser.setAttribute(
                    "href", mw.util.getUrl( namespaceName[2] + ":" + encodeURIComponent( this.user ) )
                );
                this.editedUsername.textContent = this.user;
                
                this.editedAvatarImg.setAttribute( "src", this.avatar );
                
                this.timeagoEl.textContent = this.timeago( this.time );
            },
            renderCategories : function( ) { 
                const categoryTitleRegex = new RegExp( '^' + namespaceName[14] + ':\\s*', 'g' );
                this.categories.forEach( function( category ) {
                    const categoryHref = mw.util.getUrl( category );
                    const categoryTitle = category.replace( categoryTitleRegex, '' );
                    const categoryEl = parseHTML( '<a class="rwa-category"></a>' );
                    categoryEl.setAttribute( "href", categoryHref );
                    categoryEl.textContent = categoryTitle;
                    console.log( categoryEl );
                    this.categoriesList.appendChild( categoryEl );
                }, this );
            },
            renderImages : function( ) { 
                this.images.forEach( function( image ) {
                    console.log( image );
                    const imageSrc = image.src;
                    const imageURL = image.url;
                    const imageTitle = image.title;
                    const imageWrapper = parseHTML( '<figure class="rwa-image__wrapper">' + 
                        '<a class="rwa-image__link">' +
                            '<img class="rwa-image" />' +
                        '</a>' +
                    '</figure>' );
                    const imageLink = imageWrapper.querySelector( ".rwa-image__link" );
                    imageLink.setAttribute( "href", imageURL );
                    const imageEl = imageLink.querySelector( ".rwa-image" );
                    imageEl.setAttribute( "src", imageSrc );
                    imageEl.setAttribute( "alt", imageTitle );
                    this.imagesGroup.appendChild( imageWrapper );
                }, this );
            }
        } );
        
        window.UCP.WikiActivityController = RWA;
        mw.hook( "ucp.wikiactivity.controller" ).fire( RWA );
        return new RWA( window.rwaOptions );
    } )( window, $, mw );
    mw.hook( "ucp.wikiactivity" ).fire( window.UCP.WikiActivity );
} )( this, jQuery, mediaWiki );