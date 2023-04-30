( function( window, $, mw ) { 
    "use strict";

    const MW_VERSION = parseFloat( mw.config.get( "wgVersion" ) );

    if ( MW_VERSION === 1.19 ) return;

    window.rwaOptions = window.rwaOptions || { };

    window.UCP = window.UCP || { };

    window.dev = window.dev || { };

    const isSpecial = mw.config.get( "wgNamespaceNumber" ) === -1;

    const isActivity = mw.config.get( "wgTitle" ) === "WikiActivity";


    if ( 
        ( !isSpecial || !isActivity ) && 
        window.UCP.hasOwnProperty( "WikiActivity" )
    ) return;

    mw.config.set( "wgCanonicalSpecialPageName", "WikiActivity" );

    const coreScripts = Object.freeze( { 
        i18n : "MediaWiki:I18n-js/code.js",
        colors : "MediaWiki:Colors/code.js",
        wds : "MediaWiki:WDSIcons/code.js",
        url : "MediaWiki:WikiaURL.js"
    } );

    const getScriptURL = function getScriptURL( name ) { 
        const path = mw.config.get( "wgScriptPath" ) + "/load.php?";
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

    Object.keys( coreScripts ).forEach( function( key ) { 
        const script = "u:dev:" + coreScripts[ key ];
        if ( !window.dev.hasOwnProperty( key ) ) {
            mw.loader.load( getScriptURL( script ) );
        }
    } );

    importArticle( { 
        type : "style",
        article : "u:dev:MediaWiki:WikiActivity.css"
    } );

    window.UCP.WikiActivity = ( function( window, $, mw ) { 

        const NAME = "WikiActivity";

        const VERSION = "v0.5b";

        const SUPPORTED_NAMESPACES = Object.freeze( [ 
            0, 
            1, 
            2, 
            3, 
            4, 
            5, 
            110, 
            111, 
            500, 
            501, 
            828, 
            829 
        ] );

        const IS_COMMENT = Object.freeze( [ 
            3, 5, 111, 501, 829
        ] );

        const IS_TALK = Object.freeze( [ 
            3, 5, 111, 829
        ] );

        const DEFAULTS = Object.freeze( { 
            limit : 50,
            namespaces : Array.from( SUPPORTED_NAMESPACES )
        } );

        const AVATAR_CACHE = { };

        const ICONS = Object.freeze( { 
            "edit" : "pencil",
            "new" : "add",
            "comment" : "comment",
            "categorize" : "gear",
            "_default" : "pencil"
        } );

        const parseHTML = function parseHTML( s ) { 
            const f = new DOMParser( );
            const d = f.parseFromString( s, "text/html" );
            const b = d.body;
            const m = b.firstChild;
            return m;
        };

        const getIconName = function getIconName( n ) {
            var key = "";
            if ( !ICONS.hasOwnProperty( n ) ) {
                key = "_default";
            } else {
                key = String( n );
            }
            return ICONS[ key ];
        };

        const SPINNER_HTML = '<svg class="wds-spinner wds-block" width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + 
            '<g transform="translate(33, 33)">' +
                '<circle class="wds-path" fill="none" stroke-width="2" stroke-dasharray="188.49555921538757" stroke-dashoffset="188.49555921538757" stroke-linecap="round" r="30"></circle>' +
            '</g>' +
            '</svg>';

        const SPINNER = parseHTML( SPINNER_HTML );

        function RWA( opts ) { 
            if ( new.target !== RWA ) return new RWA( opts );
            this.options = Object.assign( { }, DEFAULTS );
            this.configure( opts );
            this.namespaces = this.options.namespaces;
            this.limit = this.options.limit;
            this.target = document.querySelector( "#mw-content-text" );
            this.wrapper = document.createElement( "section" );
            this.wrapper.classList.add( "rwa-feed" );
            this.wrapper.dataset.type = "activity";
            
            this.target.innerHTML = "";
            this.target.insertAdjacentElement( "afterbegin", this.wrapper );
            this.loaded = false;
            this.loading = false;
            this.entries = [ ];
            this.length = 0;
            this.initSpinner( );
            this.load( );
        }

        Object.assign( RWA, { 
            __version : VERSION,
            __name : NAME,
            fn : RWA.prototype
        } );

        Object.assign( RWA.fn, { 

            configure : function( ) { 
                if ( arguments.length === 0 ) return;
                const r = Object( arguments[ 0 ] );
                Object.keys( r ).forEach( function( k ) { 
                    const g = this.options[ k ], v = r[ k ];
                    if ( v === void 0 ) this.options[ k ] = g;
                    else this.options[ k ] = v;
                }, this );
            },

            initSpinner : function( ) {
                this.wrapper.innerHTML = "";
                this.spinner = SPINNER.cloneNode( true );
                this.spinner.classList.replace( 
                    "wds-block", "wds-spinner__block" 
                );
                const circle = this.spinner.querySelector( "circle" );
                circle.classList.replace( 
                    "wds-path", "wds-spinner__stroke"
                );
                this.wrapper.insertAdjacentElement( 
                    "afterbegin", this.spinner
                );
            },

            load : function( ) { 
                Promise.all( [ 
                    "I18n",
                    "Colors",
                    "Wds",
                    "Url"
                ].map( function( k ) {
                    const s = String( k ).toLowerCase( );
                    if ( s === "i18n" ) {
                        return this[ "load" + k ].call( this );
                    } else {
                        return new Promise( function( res, rej ) { 
                            mw.hook( "dev." + s ).add( res );
                        } );
                    }
                }, this ) ).then( this.init.bind( this ) );
            },

            loadI18no : function( ) { 
                return new Promise( function( res, rej ) { 
                    mw.hook( "dev.i18n" ).add( res );
                } );
            },

            loadI18n : function( ) { 
                const promise = this.loadI18no( ), ctx = this;
                return new Promise( function( res, rej ) { 
                    promise.then( function( i18no ) {
                        i18no.loadMessages( NAME )
                            .done( function( i18n ) { 
                                ctx.i18n = i18n;
                                res( );
                            } )
                            .fail( rej );
                    } );
                } );
            },

            init : function( ) { 
                this.wds = window.dev.wds;
                this.colors = window.dev.colors;
                this.url = window.dev.url;
                this.overwriteTitle( );
                this.loadRCData( );
            },

            overwriteTitle : function( ) {
                const title = this.i18n.msg( 
                    "doc-title", mw.config.get( "wgSiteName" ) 
                ).escape( );
                document.title = title;
                const heading = document.querySelector( ".page-header__title" );
                heading.textContent = this.i18n.msg( "heading-title" )
                    .escape( );
            },

            loadRCData : function( ) { 
                const ajax = this.loadRCAjax( );
                ajax.done( this.handleRCData.bind( this ) )
                    .fail( this.handleRCLoadException.bind( this ) );
            },

            loadRCAjax : function( ) { 
                return $.get( mw.config.get( "wgScriptPath" ) + "/api.php", { 
                    action : "query",
                    list : "recentchanges",
                    rcprop : [
                        "comment",
                        "timestamp",
                        "user",
                        "title",
                        "userid"
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

            handleRCData : function( data ) { 
                if ( data.error ) return this.renderException( "notfound" );
                const q = data.query, rc = q.recentchanges;
                Promise.all( Array.from( rc ).map( function( item ) { 
                    const ns = item.ns, params = { };
                    if ( this.namespaces.indexOf( ns ) === -1 ) return;
                    Object.assign( params, { 
                        isComment : IS_COMMENT.indexOf( ns ) > -1,
                        isTalk : IS_TALK.indexOf( ns ) > -1
                    } );
                    if ( params.isComment ) {
                        Object.assign( params, { 
                            type : "comment",
                            trueType : item.type
                        } );
                    } else {
                        params.type = params.trueType = item.type;
                    }
                    Object.assign( params, { 
                        time : new Date( item.timestamp ),
                        summary : item.comment
                    } );
                    console.log( params );
                    if ( params.trueType === "new" ) {
                        const w = this.i18n.msg( "created-with" ).escape( );
                        const r = params.summary.indexOf( w ) === 0;
                        if ( r ) {
                            const l = w.length;
                            params.summary = params.summary.slice( l );
                            params.summary = params.summary.trim( );
                            params.summary = params.summary
                                .replace( /^\"|\"$/g, "" )
                                .trim( );
                        }
                    }
                    Object.assign( params, { 
                        user : item.user,
                        namespace : ns,
                        ns : ns,
                        title : item.title,
                        userid : item.userid
                    } );
                    return this.generateAvatar( params );
                }, this ) ).then( this.render.bind( this ) );
            },
            generateAvatar : function( params ) { 
                const userid = params.userid;
                const ctx = this;
                const p = Object.assign( { }, params );
                return new Promise( function( res, rej ) {
                    if ( AVATAR_CACHE.hasOwnProperty( userid ) ) {
                        p.avatar = AVATAR_CACHE[ userid ];
                        ctx.length = ctx.entries.push( p );
                        res( );
                    }
                    const ajax = ctx.getUserDataAjax( userid );
                    ajax.done( function( response ) {
                        const user = response.userData;
                        const avatar = user.avatar;
                        AVATAR_CACHE[ userid ] = avatar;
                        p.avatar = avatar;
                        ctx.length = ctx.entries.push( p );
                        res( );
                    } );
                } );
            },
            getUserDataAjax : function( userid ) { 
                return $.get( mw.config.get( "wgScriptPath" ) + "/wikia.php", { 
                    controller : "UserProfile",
                    method : "getUserData",
                    userId : userid,
                    format : "json"
                } );
            },
            handleRCLoadException : function( exception ) { 
                this.renderException( "failed", exception );
            },
            render : function( ) { 
                this.content = parseHTML( "<nav><a></a><ul></ul></nav>" );
                this.content.classList.add( "rwa-feed__content" );

                this.wrapper.innerHTML = "";
                this.wrapper.insertAdjacentElement( 
                    "afterbegin", this.content 
                );

                this.rclink = this.content.firstElementChild;
                this.rclink.setAttribute( 
                    "href", 
                    mw.config.get( "wgScriptPath" ) + "/wiki/" +
                    this.i18n.msg( "recentchanges-title" ).escape( )
                );
                this.rclink.textContent = 
                    this.i18n.msg( "recentchanges-text" ).escape( );

                this.list = this.content.lastElementChild;
                this.list.classList.add( "rwa-feed__list" );
                this.entries.forEach( this.renderEntry, this );
            },
            renderEntry : function( entry ) { 
                const li = parseHTML( '<li>' +
                    '<div class="rwa-icon__container"><span></span></div>' +
                    '<div class="rwa-details"></div>' +
                '</li>' );
                li.classList.add( 
                    "rwa-feed__item", "rwa-activity-ns-" + entry.ns 
                );
                Object.assign( li.dataset, { 
                    type : entry.type,
                    ns : entry.ns
                } );
                const iconContainer = li.querySelector( ".rwa-icon__container" );
                const iconWrapper = iconContainer.querySelector( "span" );
                iconWrapper.classList.add( "rwa-icon__wrapper" );
                iconWrapper.insertAdjacentElement(
                    "afterbegin", this.wds.icon( getIconName( entry.type ) )
                );
                const details = li.querySelector( ".rwa-details" );
                const titleWrapper = parseHTML( '<div class="rwa-title__wrapper">' +
                    '<a class="rwa-title"></a>' +
                '</div>' );
                const titleLink = titleWrapper.querySelector( "a" );
                titleLink.textContent = entry.title;
                titleLink.setAttribute( 
                    "href", "/wiki/" + encodeURIComponent( entry.title ) 
                );
                details.insertAdjacentElement( "afterbegin", titleWrapper );
                
                const edited = parseHTML( '<div class="rwa-edited">' +
                    '<span class="rwa-edited__text"></span>' +
                    '<a class="rwa-edited__user">' +
                        '<div class="rwa-avatar wds-avatar">' +
                            '<img class="wds-avatar__image" />' +
                        '</div>' +
                        '<em class="rwa-edited__username"></em>' +
                    '</a>' +
                    '<span class="rwa-timeago"></span>' +
                '</div>' );
                const editedText = edited.querySelector( ".rwa-edited__text" );
                editedText.textContent = this.i18n.msg( "edited" ).escape( );
                
                const username = edited.querySelector( ".rwa-edited__user" );
                username.setAttribute(
                    "href", mw.config.get( "wgScriptPath" ) +
                        "/index.php?title=User:" + encodeURIComponent( 
                            entry.user
                        )
                );
                
                const avatar = username.querySelector( ".rwa-avatar" );
                const avatarImage = avatar.querySelector( "img" );
                avatarImage.setAttribute( "src", entry.avatar );
                
                const usernameText = username.querySelector( "em" );
                usernameText.textContent = entry.user;
                
                details.insertAdjacentElement( "beforeend", edited );
                
                const summaryKey = ( entry.isTalk && entry.type === "edit" ) ?
                    "edited-section" : "summary";
                    
                if ( entry.summary !== "" ) {
                    const summary = parseHTML( '<div class="rwa-summary">' +
                        '<span class="rwa-summary__title"></span>' +
                        '<span class="rwa-summary__comment"></span>' +
                    '</div>' );
                    const summaryTitle = summary.querySelector( 
                        ".rwa-summary__title"
                    );
                    const summaryComment = summary.querySelector( 
                        ".rwa-summary__comment"
                    );
                    summaryTitle.textContent = this.i18n.msg( summaryKey )
                        .escape( );
                    summaryComment.innerHTML = entry.summary;
                    details.insertAdjacentElement( "beforeend", summary );
                }
                
                this.list.appendChild( li );
            },
            renderException : function( name, exception ) { }
        } );
        window.UCP.WikiActivityController = RWA;
        mw.hook( "ucp.wikiactivity.controller" ).fire( RWA );
        return new RWA( window.rwaOptions );
    } )( window, $, mw );
    mw.hook( "ucp.wikiactivity" ).fire( window.UCP.WikiActivity );
} )( this, jQuery, mediaWiki );