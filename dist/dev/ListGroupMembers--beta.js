/**
 * ListGroupMembers
 * 
 * A script that loads a list of all users in
 * canonical (and custom) user groups.
 * 
 * @author  Ultimate Dark Carnage
 * @version 1.4
 **/
 ( function( window, $, mw ) { 
 	"use strict";
 	
 	if ( window.LGMLoaded ) return;
 	window.LGMLoaded = true;
 	
 	const mwc = mw.config.get( );
 	
 	const ListGroupMembers = { 
 		CONFIG: $.extend( 
 			{ }, 
 			window.listGroupMembers,
 			window.ListGroupMembersConfig, 
 			window.lgmConfig 
 		),
 		LIMIT: 500,
 		USER_GROUPS: Object.freeze( { 
 			GLOBAL: Object.freeze( [ 
	            "staff",
	            "wiki-representative",
	            "wiki-specialist",
	            "soap",
	            "global-discussion-moderator",
	            "voldev"
	        ] ),
	        LOCAL: Object.freeze( [
	            "bureaucrat",
	            "sysop",
	            "threadmoderator",
	            "content-moderator",
	            "rollback",
	            "bot"
	        ] )
 		} ),
 		getGroupType: function( group ) { 
 			const registry = $.extend( { }, this.USER_GROUPS );
 			const types = Object.keys( registry );
 			
 			for ( )
 		},
 		dispatchLoader: function( ) { 
 			const scripts = Object.freeze( [ 
 				{ name: "i18n", src: "u:dev:MediaWiki:I18n-js/code.js", hook: "dev.i18n" },
 				{ name: "wds", src: "u:dev:MediaWiki:WDSIcons/code.js", hook: "dev.wds" },
 				{ name: "dorui", src: "u:dev:MediaWiki:Dorui.js", hook: "doru.ui" }
 			] );
 			
 			const loader = { };
 			return Promise.all( scripts.map( function( script ) {
 				const name = script.name, src = script.src, hook = script.hook || "";
 				return new Promise( function( resolve ) {
 					if ( window.dev[ name ] ) resolve( window.dev[ name ] );
 					
	 				importArticle( { type: "script", article: src } )
	 					.then( function( ) { 
	 						if ( !hook ) resolve( loader[ name ] = window.dev[ name ] );
	 						mw.hook( hook ).add( function( value ) { 
	 							resolve( loader[ name ] = value );
	 						} );
	 					} );
 				} );
 			} ) ).then( function( ) { 
 				return new Proxy( loader, { 
 					get: function( object, property ) { 
 						return object[ property ] || null;
 					}
 				} );
 			} );
 		}
 	};
 } )( window, jQuery, mediaWiki );