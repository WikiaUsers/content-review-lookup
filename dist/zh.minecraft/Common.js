/**
 * Scripts placed here are loaded for all skins on the desktop view
 * 
 * Global scripts which should be loaded on both desktop and mobile should go in
 * [[MediaWiki:Gadget-site.js]]
 * Mobile-only scripts should go in [[MediaWiki:Mobile.js]]
 */

( function() {
'use strict';

/* Variables for interface text used throughout the script, for ease of translating */
var i18n = {
	// File upload
	defaultLicense: 'License Mojang'
};

/**
 * Instead of cluttering up the global scope with
 * variables, they should instead be set as a
 * property of this global variable
 *
 * E.g: Instead of
 *   myVar = 'blah';
 * use
 *   mcw.myVar = 'blah';
 */
var mcw = window.mcw = {};

/* Fires when DOM is ready */
$( function() {

/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );


/**
 * Animated Site Announcement
 * 
 * To show mutiple announcements. 
 */
( function() {
	var $content = $( '#localNotice' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );


/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}


/**
 * Make simple search suggestions box separately styled
 */
mw.loader.using( 'mediawiki.searchSuggest', function() {
	setTimeout( function() {
		$( '.suggestions:first' ).addClass( 'searchbar' );
	} );
} );


/**
 * Set unlicensed as the default license on file pages
 *
 * That way the file will be categorised so someone can find a license for the file
 */
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	var $license = $( '#wpLicense' );
	if ( $license.length ) {
		if ( $license.val() === '' ) {
			$license.val( i18n.defaultLicense );
		}
		
		mw.loader.using( 'mediawiki.special.upload', function() {
			$license.change();
		} );
	}
}


/**
 * Creates minecraft style tooltips
 *
 * Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).
 */
( function() {
	var escapeChars = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };
	var escape = function( text ) {
		// "\" must be escaped first
		return text.replace( /\\\\/g, '&#92;' )
			.replace( /\\&|[<>]/g, function( char ) { return escapeChars[char]; } );
	};
	var $tooltip = $();
	var $win = $( window ), winWidth, winHeight, width, height;
	
	$( '#mw-content-text' ).on( {
		'mouseenter.minetip': function( e ) {
			$tooltip.remove();
			
			var $elem = $( this ), title = $elem.attr( 'data-minetip-title' );
			if ( title === undefined ) {
				title = $elem.attr( 'title' );
				if ( title !== undefined ) {
					title = $.trim( title.replace( /&/g, '\\&' ) );
					$elem.attr( 'data-minetip-title', title );
				}
			}
			
			// No title or title only contains formatting codes
			if ( title === undefined || title !== '' && title.replace( /&([0-9a-fl-or])/g, '' ) === '' ) {
				// Find deepest child title
				var childElem = $elem[0], childTitle;
				do {
					if ( childElem.hasAttribute( 'title' ) ) {
						childTitle = childElem.title;
					}
					childElem = childElem.firstChild;
				} while( childElem && childElem.nodeType === 1 );
				if ( childTitle === undefined ) {
					return;
				}
				
				// Append child title as title may contain formatting codes
				if ( !title ) {
					title = '';
				}
				title += $.trim( childTitle.replace( /&/g, '\\&' ) );
				
				// Set the retrieved title as data for future use
				$elem.attr( 'data-minetip-title', title );
			}
			
			if ( !$elem.data( 'minetip-ready' ) ) {
				// Remove title attributes so the native tooltip doesn't get in the way
				$elem.find( '[title]' ).addBack().removeAttr( 'title' );
				$elem.data( 'minetip-ready', true );
			}
			
			if ( title === '' ) {
				return;
			}
			
			var content = '<span class="minetip-title">' + escape( title ) + '&r</span>';
			
			var description = $.trim( $elem.attr( 'data-minetip-text' ) );
			if ( description ) {
				// Apply normal escaping plus "/"
				description = escape( description ).replace( /\\\//g, '&#47;' );
				content += '<span class="minetip-description">' + description.replace( /\//g, '<br>' ) + '&r</span>';
			}
			
			// Add classes for minecraft formatting codes
			while ( content.search( /&[0-9a-fl-o]/ ) > -1 ) {
				content = content.replace( /&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class="format-$1">$2</span>&r' );
			}
			// Remove reset formatting
			content = content.replace( /&r/g, '' );
			
			$tooltip = $( '<div id="minetip-tooltip">' );
			$tooltip.html( content ).appendTo( 'body' );
			
			// Cache current window and tooltip size
			winWidth = $win.width();
			winHeight = $win.height();
			width = $tooltip.outerWidth( true );
			height = $tooltip.outerHeight( true );
			
			// Trigger a mouse movement to position the tooltip
			$elem.trigger( 'mousemove', e );
		},
		'mousemove.minetip': function( e, trigger ) {
			if ( !$tooltip.length ) {
				$( this ).trigger( 'mouseenter' );
				return;
			}
			
			// Get event data from remote trigger
			e = trigger || e;
			
			// Get mouse position and add default offsets
			var top = e.clientY - 34;
			var left = e.clientX + 14;
			
			// If going off the right of the screen, go to the left of the cursor
			if ( left + width > winWidth ) {
				left -= width + 36;
			}
			
			// If now going off to the left of the screen, resort to going above the cursor
			if ( left < 0 ) {
				left = 0;
				top -= height - 22;
				
				// Go below the cursor if too high
				if ( top < 0 ) {
					top += height + 47;
				}
			// Don't go off the top of the screen
			} else if ( top < 0 ) {
				top = 0;
			// Don't go off the bottom of the screen
			} else if ( top + height > winHeight ) {
				top = winHeight - height;
			}
			
			// Apply the positions
			$tooltip.css( { top: top, left: left } );
		},
		'mouseleave.minetip': function() {
			if ( !$tooltip.length ) {
				return;
			}
			
			$tooltip.remove();
			$tooltip = $();
		}
	}, '.minetip, .invslot-item' );
}() );

/* [[Template:Tabs]] */
$(".tabtable").each(function(i, e) {
	var $table = $(e);
	var $nav = $table.find(".tabtable-nav");
	$table.find(".tabtable-cell").each(function(i, e) {
		var $cell = $(e);
		var $tab = $("<div class='tabtable-tab'><span>" + $cell.attr("data-title") +"</span></div>");
		$nav.append($tab);
		$tab.click(function() {
			$table.find(".tabtable-cell").removeClass("active");
			$cell.addClass("active");
			$nav.find(".tabtable-tab").removeClass("active");
			$tab.addClass("active");
		});
	});
	$table.find(".tabtable-cell").first().addClass("active");
	$nav.find(".tabtable-tab").first().addClass("active");
});

/* Minecraft Dungeons:Wiki logo redirect and title changes */
var imageUrl = $("a.mw-wiki-logo").css("backgroundImage");
if (imageUrl.indexOf("Dungeons") != -1){
   $("a.mw-wiki-logo").attr("href", "/zh/wiki/Minecraft_Dungeons:Wiki");
   var rawTitle = document.title;
   rawTitle = rawTitle.replace('Minecraft Wiki', 'Minecraft Dungeons Wiki');
   rawTitle = rawTitle.replace('我的世界', '我的世界 地下城');
   $('title').text(rawTitle);
}
} );

/* ANB, CP sign button */
if ( ( [ 'edit', 'submit' ].indexOf( mw.config.values.wgAction ) !== -1 ) && ( [ 'Minecraft_Wiki:管理员告示板', 'Minecraft_Wiki:社区专页' ].indexOf( mw.config.values.wgPageName ) !== -1 ) ) {
var insertSigx = function () {$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
	section: 'main',
	group: 'insert',
	tools: {
        "sigx": {
                label: '签名及时间戳',
                type: 'button',
                icon: '"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22%3E%3Ctitle%3Esignature%3C/title%3E%3Cpath d=%22M0 18h20v1H0zm-.003-6.155l1.06-1.06 4.363 4.362-1.06 1.06z%22/%3E%3Cpath d=%22M.004 15.147l4.363-4.363 1.06 1.061-4.362 4.363zM17 5c0 9-11 9-11 9v-1.5s8 .5 9.5-6.5C16 4 15 2.5 14 2.5S11 4 10.75 10c-.08 2 .75 4.5 3.25 4.5 1.5 0 2-1 3.5-1a2.07 2.07 0 0 1 2.25 2.5h-1.5s.13-1-.5-1C16 15 16 16 14 16c0 0-4.75 0-4.75-6S12 1 14 1c.5 0 3 0 3 4z%22/%3E%3C/svg%3E"',
                action: {
                        type: 'encapsulate',
                        options: {
                                pre: "--~~"+"~~"
	} } } } } );
};
$.when(
	mw.loader.using( 'ext.wikiEditor' ), $.ready
).then( insertSigx );
}
/* End DOM ready */

}() );