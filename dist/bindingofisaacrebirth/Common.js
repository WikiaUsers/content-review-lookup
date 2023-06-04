/* Any JavaScript here will be loaded for all users on every page load. */

// <nowiki>

//style backbutton dev wiki
window.BackToTopModern = true;

$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function () {
	return mw.loader.getScript( 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts' );
} ).then( function () {

	// HTML attribute removal
	$( '.notitle a' ).removeAttr( 'title' );
	$( 'img.no-alt' ).removeAttr( 'alt' );

	// Slideshows
	importArticle( {
		type: 'script',
		article: 'MediaWiki:Slideshows.js'
	} ).then( function () {
		slideshows.init();
	} );

	// Collection pages
	$( 'div.collection' ).on( 'scroll', function () {
		$( 'div.collection' ).scrollLeft( $( this ).scrollLeft() );
	} );
	
	// Crafting recipes
	loadCraftingRecipes( 50 );
} );

function loadCraftingRecipes( n ) {
	var i, j, max, str, parserOutput, element, parent, clonedParent,
		api      = new mw.Api(),
		elements = [],
		template = document.createElement( 'template' );

	function parse() {
		if ( !elements.length || i >= elements.length ) {
			elements = document.querySelectorAll( '.crafting-recipe-async' );
			if ( !elements.length ) {
				return;
			}
			i = j = 0;
		}
		max = Math.min( i + n, elements.length );
		str = '';
		for ( ; i < max; ++i ) {
			str += '{{#invoke:bag of crafting recipes|recipe|' +
				elements[i].dataset.nextCraftingRecipe + '}}';
		}
		api.parse( str ).then( onParsed );
	}

	function onParsed( text ) {
		template.innerHTML = text;
		parserOutput = template.content.firstChild;
		for ( ; j < i; ++j ) {
			element = elements[j];
			element.classList.remove( 'crafting-recipe-async' );
			delete element.dataset.nextCraftingRecipe;
			parent = element.parentElement;
			clonedParent = parent.cloneNode();
			clonedParent.appendChild( parserOutput.firstChild );
			parent.insertAdjacentElement( 'afterend', clonedParent );
		}
		setTimeout( parse, 500 );
	}

	parse();
}

//Collection fast load icon
( function ( $, mw ) {
	var page  = mw.config.get( 'wgTitle' ),
	    pages = [
		    'Collection Page (Rebirth)',
		    'Collection Page (Afterbirth)',
		    'Collection Page (Afterbirth †)',
		    'Collection Page (Repentance)'
	    ];

	if ( pages.indexOf( page ) == -1 ) return;

	$( 'img.lazyload' ).each( function() {
		$( this )
			.attr( 'src', $( this ).attr( 'data-src' ) )
			.attr( 'class', 'lazyloaded' );
	});
} )( jQuery, mediaWiki );

$( function () {
	switch ( mw.config.get('wgPageName') ) {
		case 'Collection_Page_(Repentance)':
			$('body').addClass('is-content-expanded');
			break;
	}
} );

// </nowiki>