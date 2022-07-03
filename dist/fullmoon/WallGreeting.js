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
    
    // A flag to mark if the old location is being used
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
                    "wiki-representative",
                    "wiki-specialist"
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
            const _this = this,
            	buttons = document.createElement( "div" ),
	        	editButton = document.createElement( "a" ),
	        	text = document.createElement( "span" ),
            	subpage = this.i18n
	                .inContentLang( )
	                .msg( 'subpage-name' )
	                .plain( ),
	        	pageName = conf.wgFormattedNamespaces[ 2 ] + ":" + user + "/" +
	        		subpage,
	        	editUrl = conf.wgServer + mw.util.getUrl( pageName, {
                    action: "edit"
                });
                
	        const moveUrl = conf.wgServer + mw.util.getUrl( "Special:MovePage/" +
            		conf.wgFormattedNamespaces[ 1202 ] + ":" + user, {
            			wpNewTitle: pageName,
            			wpReason: this.i18n.inContentLang( )
                			.msg( 'move-reason' ).plain()
            		}),
            	warning = document.createElement( "div" );

            buttons.style.marginBottom = "1em";
            buttons.style.textAlign =
            	document.body.classList.contains("sitedir-rtl") ? "left"
            													: "right";
            buttons.classList.add( "MessageWallButtons" );
	        	
            if (backcompat) {
            	warning.innerHTML = this.i18n.inContentLang().msg(
            		'warning-move-page', conf.wgFormattedNamespaces[ 2 ]
            		).parse( );
            	warning.style.background = "var(--theme-alert-label, #fff)";
            	warning.style.color = "var(--theme-alert-color, #e81a3f)";
            	warning.style.textAlign = "center";
            	warning.style.border = "1px solid";
            	buttons.appendChild( warning );

	            text.classList.add( "move-button-text" );
	            text.innerText = this.i18n.msg( 'move' ).plain( );
	            
	            editButton.append( text );
	            editButton.classList.add( "wds-button", "MessageWallEditButton" );

	            editButton.setAttribute( "href", moveUrl );
                
                editButton.addEventListener("click", function(event) {
                	// return if it's any mouse button other than left
                	if (event.button) return;
                	event.preventDefault();
                	
                	var api = new mw.Api();
                	api.postWithEditToken({
                		action: 'move',
                		from: conf.wgFormattedNamespaces[ 1202 ] + ":" + user,
                		to: pageName,
                		reason: _this.i18n.inContentLang( )
                			.msg( 'move-reason' ).plain()
                	}).done(function(response) {
                		if (!response.error) {
                			window.location.assign( mw.util.getUrl( pageName) );
                		} else {
                			window.location.assign(moveUrl);
                		}
                	}).fail(function() {
                		window.location.assign(moveUrl);
                	});
                });
            } else {
	            text.classList.add( "edit-button-text" );
	            text.innerText = this.i18n.msg( "edit" ).plain( );
	            
	            editButton.append( text );
	            
	            mw.hook( "dev.wds" ).add(function () {
	                editButton.prepend( _this.dev.wds.icon( "pencil-small" ) );
	            });
	            
	            editButton.classList.add( "wds-button", "MessageWallEditButton" );

	            editButton.setAttribute( "href", editUrl );
            }

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