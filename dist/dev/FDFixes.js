( function( mw ) { 
	"use strict";
	
	importArticle( { type: "style", article: "u:carnage-test:MediaWiki:FDFixes.css" } );
	
	function fixContentReviewModule( ) { 
		importArticle( { type: "style", article: "u:carnage-test:MediaWiki:FDFixes/content-review.css" } );
		
		const conf = mw.config.get( );
		const pageName = conf.wgPageName;
		
		const isJS = /\.js$/.test( pageName );
		const target = document.querySelector( ".content-review__widget" );
		
		if ( !isJS || !target ) return;
		
		if ( target.classList.contains( "rail-module" ) ) return;
		
		const parentNode = document.querySelector( ".right-rail" );
		const descendants = Array.from( parentNode.querySelectorAll( "*" ) );
		
		if ( descendants.includes( target ) ) return;
		
		target.classList.add( "rail-module" );
		target.id = "content-review__widget";
		
		parentNode.insertAdjacentElement( "afterbegin", target );
	}
	
	function fixFDFonts( ) { 
		importArticle( { type: "style", article: "u:carnage-test:MediaWiki:FDFixes/fonts.css" } );
	}
	
	function fixRail( ) { 
		importArticle( { type: "style", article: "u:carnage-test:MediaWiki:FDFixes/rail.css" } );
	}
	
	window.FDFixes = { 
		contentReview: fixContentReviewModule,
		fonts: fixFDFonts,
		rail: fixRail
	};
} )( mediaWiki );