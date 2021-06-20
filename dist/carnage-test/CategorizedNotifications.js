( function( window ) { 
	"use strict";
	
	if ( 
		mw.config.get( "skin" ) !== "fandomdesktop" &&
		window.categorizedNotifications
	) return;
	
	window.categorizedNotifications = true;
	
	const categories = Object.freeze( { 
		bell: [ 'announcement' ],
		blocks: [ 'message-wall-post', 'message-wall-reply', 'talk-page-message' ],
		comment: [ 'article-comment-reply', 'article-comment-at-mention', 'article-comment-reply-at-mention' ],
		envelope: [ 'discussion-reply', 'discussion-upvote-post', 'post-at-mention', 'thread-at-mention' ],
		more: [ ]
	} );
	
	function translateCategory( attr ) { 
		attr = attr.slice( 19 );
		return Object.keys( categories ).find( function( category ) { 
			const list = categories[ category ];
			return list.includes( attr );
		} ) || "more";
	}
	
	
} )( window );