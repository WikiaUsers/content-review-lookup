/* Any JavaScript here will be loaded for all users on every page load. */

$.when( mw.loader.using( 'mediawiki.api' ), $.ready ).then( function () {

	// Cache purge shortcut
	// TODO: HydraDark only
	$( '#ca-cargo-purge' )
		.remove()
		.appendTo( '#p-views > ul' )
		.children()
		.wrap( '<span>' )
		.text( '⟳' )
		.attr( {
			title    : 'Purge the cache [alt-shift-g]',
			accesskey: 'g'
		} )
		.css( {
			'line-height': 0,
			'font-size'  : 'large'
		} );

	// Link titles
	$( '.notitle a' ).removeAttr( 'title' );

	// Slideshows
	slideshows.init( $( '.mw-parser-output' ) );

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

var slideshows = {
	/**
	 * @param {JQuery} $container 
	 */
	init: function ( $container ) {
		$container
			.find( '.infobox2-slideshow:not( .infobox2-slideshow-enabled, .infobox2-slideshow-disabled )' )
			.each( slideshows.initSlideshow );
	},

	/**
	 * @this HTMLElement
	 */
	initSlideshow: function () {
		var $slideshow = $( this ),
			$slides    = $slideshow.children( '.infobox2-slide' );
		if ( $slides.length < 2 ) {
			$slideshow.addClass( 'infobox2-slideshow-disabled' );
			$slides.children( '.infobox2-slide-title:first-of-type' ).remove();
			return;
		}
		$slideshow.addClass( 'infobox2-slideshow-enabled' );
		var $titleBar = $( '<div class="infobox2-slideshow-titlebar">' );
		function cycle() {
			var $nextTitle = $titleBar
				.children( '.infobox2-slide-title-active' )
				.removeClass( 'infobox2-slide-title-active' )
				.next();
			( $nextTitle.length
				? $nextTitle
				: $titleBar.children( '.infobox2-slide-title:first' )
			).addClass( 'infobox2-slide-title-active' );
			var $nextSlide = $slideshow
				.children( '.infobox2-slide-active' )
				.removeClass( 'infobox2-slide-active' )
				.next();
			( $nextSlide.length
				? $nextSlide
				: $slideshow.children( '.infobox2-slide:first' )
			).addClass( 'infobox2-slide-active' );
		}
		$slides.each( function () {
			var $slide = $( this ),
				$title = $slide.children( '.infobox2-slide-title:first' );
			$title
				.remove()
				.appendTo( $titleBar )
				.on( 'click', function () {
					$titleBar
						.children( '.infobox2-slide-title-active' )
						.removeClass( 'infobox2-slide-title-active' );
					$slideshow
						.children( '.infobox2-slide-active' )
						.removeClass( 'infobox2-slide-active' );
					$title.addClass( 'infobox2-slide-title-active' );
					$slide.addClass( 'infobox2-slide-active' );
				} );
		} );
		if ( $slideshow.hasClass( 'dlc-slideshow' ) ) {
			$slides.last().addClass( 'infobox2-slide-active' );
			$titleBar.children( ':last' ).addClass( 'infobox2-slide-title-active' );
		} else {
			$slides.first().addClass( 'infobox2-slide-active' );
			$titleBar.children( ':first' ).addClass( 'infobox2-slide-title-active' );
		}
		if ( $titleBar.children().length ) {
			$titleBar
				.prependTo( $slideshow )
				.find( 'a' ).each( function () {
				    $( this ).replaceWith( this.childNodes );
				} );
		}
		slideshows.fixMinHeight( $slideshow.get( 0 ) );
		if (
			!$slideshow.hasClass( 'infobox2-slideshow-hidden' ) &&
			!$slideshow.find( '.infobox2-slideshow' ).length
		) {
			$slides.on( 'click', cycle );
		}
		if ( $slideshow.hasClass( 'infobox2-slideshow-auto' ) ) {
			(function interval() {
				setTimeout( interval, 1500 );
				cycle();
			})();
		}
	},

	fixMinHeight: function ( slideshow ) {
		var slides      = slideshow.getElementsByClassName( 'infobox2-slide' ),
			activeSlide = slideshow.getElementsByClassName( 'infobox2-slide-active' )[ 0 ];
		if ( !activeSlide ) {
			return;
		}
		activeSlide.classList.remove( 'infobox2-slide-active' );
		var minHeight = 0;
		for ( var j = slides.length - 1; j >= 0; --j ) {
			var slide = slides[ j ];
			slide.classList.add( 'infobox2-slide-active' );
			minHeight = Math.max(
				minHeight,
				slideshow.getBoundingClientRect().height
			);
			slide.classList.remove( 'infobox2-slide-active' );
		}
		activeSlide.classList.add( 'infobox2-slide-active' );
		var titleBars = slideshow.getElementsByClassName( 'infobox2-title-bar' );
		if ( titleBars.length ) {
			minHeight += titleBars[ 0 ].getBoundingClientRect().height;
		} 
		slideshow.style.minHeight = minHeight + 'px';
	}
};

// TODO: HydraDark only
var dlcUtil = {
	/**
	 * The currently selected DLC filter.
	 */
	selectedFilter: 0,

	/**
	 * Gets the DLC filter of a DLC icon.
	 * @param {HTMLElement} img The DLC icon.
	 * @returns The DLC filter of the given DLC icon, 0 otherwise.
	 */
	getDlcFilter: function ( img ) {
		var classList = img.classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].startsWith( 'dlc-' ) ) {
				return +classList[ i ].substr( 4 );
			}
		}
		return 0;
	},

	/**
	 * @param {HTMLElement} element 
	 */
	update: function ( element ) {}
};

// TODO: HydraDark only
var dlcFilterUtil = {
	/**
	 * Indicates whether the DLC filtering has been loaded and finished
	 * modifying the DOM.
	 */
	loaded: false,

	/**
	 * The currently selected DLC filter.
	 */
	selectedFilter: 0,

	/**
	 * Gets the DLC filter of a DLC icon.
	 * @param {Element} icon The DLC icon.
	 * @returns The DLC filter of the given DLC icon, 0 otherwise.
	 */
	getDlcFilter: function ( icon ) { return 0 },

	/**
	 * Removes DLC icons from an element, according to the selected filter.
	 * @param {Element} element The element to remove DLC icons from.
	 */
	applyFilter: function ( element ) {}
};