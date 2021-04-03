/** 
 * WallGreeting
 * 
 * @author  Ultimate Dark Carnage
 * @author	HumansCanWinElves
 * @version v1.4 (some improvements and fixes by HumansCanWinElves)
 * 
 * @note    This script is currently in beta. If you need to
 *          make any changes that will make this script run better,
 *          you are welcome to make them.
 **/
( function( window, $, mw ) { 
    "use strict";
    // MediaWiki configuration variables
    const conf = mw.config.get( [ 
        "wgTitle",
        "wgFormattedNamespaces",
        "wgNamespaceNumber",
        "wgUserGroups",
        "wgUserName",
        "wgServer"
    ] );
    // Creating the UCP object
    window.UCP = window.UCP || { };
    // Fetching the dev object
    window.dev = window.dev || { };
    // If this is not a message wall page, do not run
    if ( conf.wgNamespaceNumber !== 1200 || window.UCP.WallGreeting ) return;
    // Loading I18n-js if it does not exist
    if ( !window.dev.i18n ) { 
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:I18n-js/code.js"
        } );
    }
    // Loading WDSIcons if it does not exist
    if ( !window.dev.wds ) { 
        importArticle( { 
            type : "script",
            article : "u:dev:MediaWiki:WDSIcons/code.js"
        } );
    }
    
    // A flag to know which edit button to add
    var backcompat;
    
    // Creating the primary Wall Greeting object
    const WallGreeting = window.UCP.WallGreeting = { 
        target : document.querySelector( "#MessageWall" ),
        wrapper : document.createElement( "section" ),
        loaded : false,
        init : function( i18n ) {
            const ctx = this;
            mw.loader.using( "mediawiki.api" ).then( function( ) {
                ctx.i18n = i18n;
                ctx.dev = window.dev;
                ctx.check( ).then( ctx.render.bind( ctx ) );
            } );
        },
        check : function( ) { 
            const ctx = this;
            return new Promise( function( res, rej ) { 
                var interval = setInterval( function( ) { 
                    if ( document.querySelector( "#MessageWall" ) ) { 
                        clearInterval( interval );
                        res( );
                    }
                }, 1000 );
            } );
        },
        editAllowed : function( ) { 
            return new Promise( function( res, rej ) { 
                const user = conf.wgTitle;
                const isOwnWall = user === conf.wgUserName;
                const allowedGroups = Object.freeze( [ 
                    "sysop",
                    "staff",
                    "helper",
                    "soap",
                    "wiki-manager"
                ] );
                const isAllowed = allowedGroups.some( function( g ) { 
                    return conf.wgUserGroups.includes( g );
                } );
                if ( isOwnWall || isAllowed ) { 
                    res( user );
                } else {
                    rej( );
                }
            } );
        },
        render : function( ) { 
            const ajax = this.fetchGreeting( conf.wgTitle );
            const ctx = this;
            ajax.then( function( response ) { 
                if ( response.error ) { 
                    throw "API error: " + response.error;
                }

                var allMessages;
                mw.hook( "wikipage.content" ).add( function addGreeting( ) { 
                    
                    // Not displaying the greeting above a single-thread view
                    if ($(ctx.target).find(".MessageWallSingleThread").length 
                    &&  !($(ctx.target).find(".MessageWallForum").length) 
                    &&  !allMessages) {
                        $(ctx.target).find(".SingleThreadToolbar > button")[0]
                            .addEventListener ("click", function () {
                                allMessages = true;
                                addGreeting();
                            });
                        return;
                    }
                    
                    ctx.wrapper.classList.add( "MessageWallGreeting" );
                    ctx.wrapper.setAttribute( "id", "MessageWallGreeting" );
                    
                    ctx.target.insertAdjacentElement( "beforebegin", ctx.wrapper );
                    
                    const content = document.createElement( "div" );
                    ctx.wrapper.insertAdjacentElement( "beforeend", content );
            
                    content.classList.add( "MessageWallGreetingContent" );
                    content.setAttribute( "id", "MessageWallGreetingContent" );
                    
                    content.innerHTML = response.parse ? 
                        response.parse.text : "";

                    ctx.editAllowed( ).then( ctx.renderButtons.bind( ctx ) );
                    
                    // Calling the hook to allow JS-based features (such as
                    // collapsibles) on the greeting.
                    mw.hook( "wikipage.content" ).remove
                        (addGreeting);
                    mw.hook( "wikipage.content" ).fire
                        ($("#MessageWallGreetingContent"));
                } );
            } )[ "catch" ]( function( error ) { 
                throw "Uncaught error: " + error;
            } );
        },
        renderButtons : function( user ) { 
            const subpage = this.i18n
                .inContentLang( )
                .msg( 'subpage-name' )
                .plain( );
                
            const buttons = document.createElement( "div" );
            buttons.style.marginBottom = "1em";
            buttons.style.textAlign = document.body.classList.contains("sitedir-rtl") ? "left" : "right";
            this.wrapper.insertAdjacentElement( "afterbegin", buttons );
            buttons.classList.add( "MessageWallButtons" );
            
            const editButton = document.createElement( "a" );
            
            const text = document.createElement( "span" );
            text.classList.add( "edit-button-text" );
            text.innerText = this.i18n.msg( "edit" ).plain( );
            
            editButton.append( text );
            const t = this;
            mw.hook( "dev.wds" ).add(function () {
                editButton.prepend( t.dev.wds.icon( "pencil-small" ) );
            });
            
            editButton.classList.add( "wds-button", "MessageWallEditButton" );
            
            // Setting the button target according to which greeting page 
            // is displayed
            var m;
            if (backcompat) {
                m = mw.util.getUrl( conf.wgFormattedNamespaces[ 1202 ] + 
                ":" + user, {
                    // ?action=edit currently doesn't work on the MWG namespace
                    action: "edit"
                } ).replace ("action=edit", "veaction=editsource");
            } else {
                const subpage = this.i18n
                    .inContentLang( )
                    .msg( 'subpage-name' )
                    .plain( );
                m = mw.util.getUrl( conf.wgFormattedNamespaces[ 2 ] + 
                ":" + user + "/" + subpage, {
                    action: "edit"
                } );
            }
            
            editButton.setAttribute( "href", conf.wgServer + m );
            
            buttons.appendChild( editButton );
            
            this.wrapper.insertAdjacentElement( "afterbegin", buttons );
        },
        fetchGreeting : function( user ) { 
            const t = this;
            
            return new Promise( function( res, rej ) { 
                t.fetchGreetingAjax( user )
                    .done( function ( response ) { return res( response ); } )
                    [ "catch" ]( function( ) { 
                        return t.fetchGreetingBackcompat( user )
                            .then(function ( response ) {
                                backcompat = true;
                                res ( response );
                            }).catch( function() {
                                // Empty text, just to allow the edit button
                                res ( "" );
                            });
                    } );
            } );
        },
        fetchGreetingAjax : function( user ) { 
            const subpage = this.i18n
                .inContentLang( )
                .msg( 'subpage-name' )
                .plain( );
                
            return ( new mw.Api( ) ).get( { 
               action : "parse",
               page : conf.wgFormattedNamespaces[ 2 ] + ":" + user + "/" + subpage,
               prop : "text",
               disabletoc : true,
               formatversion : 2
            } );
        },
        fetchGreetingBackcompat : function( user ) { 
            const t = this;
            return new Promise( function( res, rej ) { 
                const ajax = t.fetchGreetingBackcompatAjax( user );
                ajax.done( function( response ) { 
                    if ( response.error ) return rej( );
                    
                    const content = response.parse.text;
                    
                    if ( !content ) return rej( );
                    
                    res( response );
                }).fail( rej );
            } );
        },
        fetchGreetingBackcompatAjax : function( user ) { 
            return ( new mw.Api( ) ).get( { 
               action : "parse",
               page : conf.wgFormattedNamespaces[ 1202 ] + ":" + user,
               prop : "text",
               disabletoc : true,
               formatversion : 2
            } );
        }
    };
    
    mw.hook( "dev.i18n" ).add( function( i18no ) { 
        i18no.loadMessages( "WallGreeting" ).then( 
            WallGreeting.init.bind( WallGreeting ) 
        );
    } );
} )( this, jQuery, mediaWiki );