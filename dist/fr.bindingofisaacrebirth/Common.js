/* Tout javascript ici sera executé pour n'importe quel utilisateur. */
//style backbutton dev wiki
window.BackToTopModern = true;

$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function () {
	return mw.loader.getScript( 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts' );
} ).then( function () {

	// Link titles
	$( '.notitle a' ).removeAttr( 'title' );

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

	// Custom fonts
	$( '.custom-font' ).each( function () {
		for ( var i = 0; i < this.classList.length; ++i ) {
			if ( this.classList[ i ].substring( 0, 12 ) === 'custom-font-' ) {
				useCustomFont( this, this.classList[ i ].substr( 12 ) );
				return;
			}
		}
		useCustomFont( this, 'TeamMeat' );
	} );
	$(
		'.pi-header,' +
		':not( .pi-group ) > .pi-data > .pi-data-label,' +
		'.pi-smart-data-label'
	).each( function () { useCustomFont( this, 'TeamMeat-Bold' ) } );
	$(
		'.pi-group > .pi-data > .pi-data-label,' +
		'.pi-item[data-source="quote"] > .pi-data-value,' +
		'.pi-item[data-source="type"] > .pi-data-value'
	).each( function () { useCustomFont( this, 'TeamMeat' ) } );
	
	// Crafting recipes
	loadCraftingRecipes( 50 );
} );

var specialCharacters = {
	/* ! */ '\u0021': "emark",
	/* " */ '\u0022': "oquote",
	/* # */ '\u0023': "hash",
	/* $ */ '\u0024': "dol",
	/* % */ '\u0025': "percent",
	/* & */ '\u0026': "and",
	/* ' */ '\u0027': "apos",
	/* ( */ '\u0028': "oparen",
	/* ) */ '\u0029': "cparen",
	/* * */ '\u002A': "star",
	/* + */ '\u002B': "plus",
	/* . */ '\u002E': "point",
	/* / */ '\u002F': "slash",
	/* : */ '\u003A': "colon",
	/* ; */ '\u003B': "scolon",
	/* < */ '\u003C': "lthan",
	/* = */ '\u003D': "equal",
	/* > */ '\u003E': "gthan",
	/* ? */ '\u003F': "qmark",
	/* @ */ '\u0040': "at",
	/* [ */ '\u005B': "obrkt",
	/* \ */ '\u005C': "bslash",
	/* ] */ '\u005D': "cbrkt",
	/* { */ '\u007B': "obrace",
	/* | */ '\u007C': "vbar",
	/* } */ '\u007D': "cbrace",
	/* ~ */ '\u007E': "tilde",
	/* ¢ */ '\u00A2': "cent",
	/* £ */ '\u00A3': "pound",
	/* ¤ */ '\u00A4': "curren",
	/* § */ '\u00A7': "ss",
	/* © */ '\u00A9': "copy",
	/* ® */ '\u00AE': "regtm",
	/* ° */ '\u00B0': "degree",
	/* ± */ '\u00B1': "pm",
	/* ¶ */ '\u00B6': "pilcrow",
	/* “ */ '\u201C': "oquote",
	/* ” */ '\u201D': "cquote",
	/* † */ '\u2020': "dagger",
	/* ‡ */ '\u2021': "diesis",
	/* € */ '\u20AC': "euro"
};

function useCustomFont( element, name ) {
	var childNodes = element.childNodes;
	for ( var i = 0; i < childNodes.length; ++i ) {
		var childNode = childNodes[ i ];
		if ( childNode.nodeType !== Node.TEXT_NODE ) {
			continue;
		}

		var char     = '',
			str      = childNode.textContent,
			str2     = '<span style="white-space:nowrap">',
			font     = 'font-' + name,
			intro    = '<div class="' + font + ' ' + font + '-',
			j        = 0,
			len      = 0,
			charCode = 0;
		while ( j < str.length ) {
			charCode = str.charCodeAt( j );
			len      = charCode >= 0xD800 && charCode <= 0xDBFF ? 2 : 1;
			char     = str.substr( j, len );
			str2    += ( char === ' ' ? '</span> <span style="white-space:nowrap">' : intro + ( specialCharacters[ char ] || char ) + '">' + char + '</div>' );
			j       += len;
		}
		str2 += '</span>';

		var template = document.createElement( 'template' );
		template.innerHTML = '<span class="custom-font custom-font-enabled">' + str2 + '</span>';
		childNode.replaceWith( template.content.firstChild );
	}
}

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
!function( $, mw ) {
	var page  = mw.config.get( 'wgTitle' )
	  , pages = [
	  	    'Page de Collection (Rebirth)',
  'Page de Collection (Afterbirth)',
  'Page de Collection (Afterbirth †)',
  'Page de Collection (Repentance)'
	  	]; 

	if ( pages.indexOf( page ) == -1 ) return;

    $( 'img.lazyload' ).each( function() {
		$( this )
          .attr( 'src', $( this ).attr( 'data-src' ) )
          .attr( 'class', 'lazyloaded' );
    });
}( jQuery, mediaWiki );

$(function(){   
    switch ( mw.config.get('wgPageName') ) {
        case 'Page_de_Collection_(Repentance)':
            $('body').addClass('is-content-expanded');
            break;
        case 'Abel':
        	rng = Math.floor(Math.random() * 1000);
        	if (rng == 1) {
	            $('body').addClass('abel');
	            $('.page-header__title').addClass('abelTitle');
	            $('.page__main').addClass('abelPageMain');
        	}
        	break;
    }
    //Diplopia
    $("[data-image-name='Collectible Diplopia icon.png'").addClass("diplopie")
    $(".diplopie").click(function(){
	    $("a img[data-image-name~='Collectible'").each(function(i, a){
	        $(a).parent().append($(a).clone())
    	})
    	this.remove()
	})
});