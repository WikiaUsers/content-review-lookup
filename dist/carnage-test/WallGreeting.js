/**
 * WallGreeting
 * 
 * @author		Ultimate Dark Carnage
 * @author		HumanCanWinElves
 * @version		v1.5
 * 
 * @note	This script is currently in beta. If you need to
 *          make any changes that will make this script run better,
 *          you are welcome to make them.
 * @note	Some improvements and fixes were made by HumanCanWinElves
 **/
( function( window, $, mw ) { 
	"use strict";
	
	// MediaWiki configuration variables
	const config = mw.config.get( [ 
		"wgTitle",
		"wgFormattedNamespaces",
		"wgNamespaceNumber",
		"wgUserGroups",
		"wgUserName",
		"wgServer"
	] );
	
	// Creating the UCP object
	window.UCP = window.UCP || { };
	
	// Creating the dev object
	window.dev = window.dev || { };
	
	// If no message walls are present, stop the function
	if ( config.wgNamespaceNumber !== 1200 || window.UCP.WallGreeting ) return;
	
	// Ensures I18n-js is loaded
	if ( !window.dev.i18n ) { 
		importArticle( { 
			type : "script", 
			article : "u:dev:MediaWiki:I18n-js/code.js" 
		} );
	}
	
	// Ensures WDSIcons is loaded
	if ( !window.dev.wds ) { 
		importArticle( { 
			type : "script",
			article : "u:dev:MediaWiki:WDSIcons/code.js"
		} );
	}
	
	function WallGreeting( ) { 
		const g = this;
		g.target = document.querySelector( "#MessageWall" );
		g.wrapper = document.createElement( "section" );
		g.loaded = false;
		g.backcompat = false;
		
		g.init = function( i18n ) { 
			g.i18n = i18n;
			g.dev = window.dev;
			mw.loader
				.using( "mediawiki.api" )
				.then( g.check.bind( g ) );
		};
		
		g.check = function( ) { 
			const check = new Promise( function( r, j ) { 
				var t = setInterval( function( ) { 
					if ( !document.querySelector( "#MessageWall" ) ) return;
					clearInterval( t );
					r( );
				} );
			} );
			
			check.then( g.render.bind( g ) );
		};
		
		g.canEdit = function( ) { 
			return new Promise( function( r, j ) { 
				const user = config.wgTitle;
				const userName = config.wgUserName;
				const isOwnWall = user === userName;
				
				const allowedGroups = Object.freeze( [ 
					"sysop",
					"staff",
					"helper",
					"soap",
					"content-team-member",
					"wiki-manager"
				] );
				
				const isAllowed = allowedGroups.some( function( gr ) { 
					return config.wgUserGroups.includes( gr );
				} );
				
				const canEdit = isOwnWall || isAllowed;
				
				if ( canEdit ) r( user );
				else j( );
			} );
		};
		
		g.render = function( ) { 
			const ajax = g.fetchGreeting( config.wgTitle );
			
			ajax.then( function( res ) { 
				if ( res.error ) throw "API ERROR: " + res.error;
				
				g.allMessages = false;
				
				function addGreeting( ) { 
					const singleThread = g.target.querySelectorAll( ".MessageWallSingleThread" ).length;
					const forum = g.target.querySelectorAll( ".MessageWallForum" ).length;
					
					if ( ( singleThread && !forum ) && g.allMessages ) { 
						const button = g.target.querySelector( ".SingleThreadToolbar > button" );
						button.addEventListener( "click", function( ) { 
							g.allMessages = true;
							addGreeting( );
						} );
						return;
					}
					
					g.wrapper.classList.add( "MessageWallGreeting" );
					g.wrapper.setAttribute( "id", "MessageWallGreeting" );
					
					g.target.insertAdjacentElement( "beforebegin", g.wrapper );
					
					g.content = document.createElement( "div" );
					
					g.wrapper.insertAdjacentElement( "beforeend", g.content );
					
					g.content.classList.add( "MessageWallGreetingContent" );
					g.content.setAttribute( "id", "MessageWallGreetingContent" );
					
					g.content.innerHTML = res.parse ? res.parse.text : "";
				}
				
				mw.hook( "wikipage.content" ).add( addGreeting );
			} );
		};
	}
} )( window, jQuery, mediaWiki );