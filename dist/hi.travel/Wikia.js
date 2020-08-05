//<nowiki>
/**
 * Admin highlighter 2.0
 * ---------------------
 * A jQuery/mediawiki-heavy rewrite of [[User:Amalthea/userhighlighter.js]]
 * 
 * This script highlights links to admins' userpages or talkpages in bodyContent
 * (that is, everything but the tabs, personal links at the top of the screen and sidebar)
 * by giving them a cyan background.
 *
 * See [[User:Theopolisme/Scripts/adminhighlighter]] for more details.
 *
 * @author theopolisme
 */
;(function($, mw){
	$.getJSON(mw.config.get('wgScriptPath')+'/index.php?action=raw&ctype=application/json&title=User:Amalthea_(bot)/userhighlighter.js/sysop.js', function(data){
		ADMINHIGHLIGHT_EXTLINKS = window.ADMINHIGHLIGHT_EXTLINKS || false;
		ADMINHIGHLIGHT_NAMESPACES = [-1,2,3];
		mw.loader.using(['mediawiki.util','mediawiki.Uri', 'mediawiki.Title'], function() {
			mw.util.addCSS(".userhighlighter_sysop.userhighlighter_sysop {background-color: #00FFFF !important}");
			$('#bodyContent a').each(function(index,linkraw){
				try {
					var link = $(linkraw);
					var url = link.attr('href');
					if (!url || url.charAt(0) === '#') return; // Skip <a> elements that aren't actually links; skip anchors
					if (url.lastIndexOf("http://", 0) != 0 && url.lastIndexOf("https://", 0) != 0 && url.lastIndexOf("/", 0) != 0) return; //require http(s) links, avoid "javascript:..." etc. which mw.Uri does not support
					var uri = new mw.Uri(url);
					if (!ADMINHIGHLIGHT_EXTLINKS && !$.isEmptyObject(uri.query)) return; // Skip links with query strings if highlighting external links is disabled
					if (uri.host == 'en.wikipedia.org') {
						var mwtitle = new mw.Title(mw.util.getParamValue('title',url) || decodeURIComponent(uri.path.slice(6))); // Try to get the title parameter of URL; if not available, remove '/wiki/' and use that
						if ($.inArray(mwtitle.getNamespaceId(), ADMINHIGHLIGHT_NAMESPACES)>=0) {
							var user = mwtitle.getMain().replace(/_/g," ");
							if (mwtitle.getNamespaceId() === -1) user = user.replace('Contributions/',''); // For special page "Contributions/<username>"
							if (data[user] == 1) {
								link.addClass('userhighlighter_sysop'); // Override the above color by using `a.userhighlighter_sysop.userhighlighter_sysop {background-color: COLOR !important}`
							}
						}
					}
				} catch (e) {
					// Sometimes we will run into unparsable links, so just log these and move on
					window.console && console.error('Admin highlighter recoverable error',e.message);
				}
			});
		});
	});
}(jQuery, mediaWiki));
//</nowiki>

/**
 * Highlights specific users' posts to discussion pages using a CSS class.
 *
 * Originally written by PleaseStand in 2010, updated for MediaWiki 1.17 in 2011
 * Rewrite completed in 2012
 *
 * Released to the public domain; see http://en.wikipedia.org/wiki/Template:PD-self
 */

( function ( mw, $ ) {

	"use strict";

	// Default settings
	var settings = {
		highlighterFunction: function ( hc ) {
			// Default highlighter function
			hc.addColorForUsers( '#ff7', [mw.config.get( 'wgUserName' )] );
			hc.wrapComments();
			hc.addMenuItem();
		}
	};

	/**
	 * Messages displayed by this script (in English).
	 * Any translations (see below) replace these at runtime.
	 */
	var msg = {
		highlightText: 'Highlight',
		highlightTooltip: 'Enable highlighting of your own comments on this page',
		unhighlightText: 'Unhighlight',
		unhighlightTooltip: 'Disable highlighting of your own comments on this page'
	};

	/**
	 * Translations for messages displayed by this script.
	 * To have your translations added, please contact this script's maintainer.
	 */
	var translations = {
	};

	// Load translations.
	$.extend( msg, translations[document.documentElement.lang] );

	// Initialize other enclosed variables.
	var linkMap = {}, classNumber = 0, pageRE = null, commentsAreHighlighted = false;

	/**
	 * Build pageRE, a regexp for the use of findPageNameFromHref().
	*/
	function buildPageRE() {
		var articlePathParts = mw.config.get( 'wgArticlePath' ).split( '$1' );
		var articlePathStartRE = mw.RegExp.escape( articlePathParts[0] );
		var articlePathEndRE = mw.RegExp.escape( articlePathParts[1] );
		var indexPathRE = mw.RegExp.escape( mw.util.wikiScript( 'index' ) );

		return new RegExp(
			'^(?:' + articlePathStartRE + '([^?#]+)' + articlePathEndRE + '|' +
			indexPathRE + '\\?(?:[^&#]*&)*title=([^&#]+))'
		);
	}

	/**
	 * Find a linked page's name (with underscores, not spaces) given a relative URL.
	 * This assumes the page is linked using a normal, intra-wiki link.
	 */
	function findPageNameFromHref( href ) {
		var m = pageRE.exec( href );
		return m ? decodeURIComponent(
			( m[1] || m[2] ).replace( /\+/g, '%20' )
		).replace( / /g, '_' ) : null;
	}

	/**
	 * Give comments linking to any given page a specific CSS class.
	 * @see unwrapComments
	 */
	function wrapComments() {
		wrapElementComments( $( '.mw-highlight-comments' ) );
		commentsAreHighlighted = true;
		addMenuItem( true );
	}

	/**
	 * Mechanics of wrapComments(), excluding the flag and menu item updates.
	 *
	 * Essentially, we need to find the comment's container and wrap (except where unnecessary)
	 * everything inside except replies to that comment. We can filter the replies out in that
	 * they are inside other element types that have the effect of indenting the text.
	 *
	 * @param content The DOM element(s) containing the content. This may be a jQuery object.
	 */
	function wrapElementComments( content ) {
		// Elements containing comments or indented text (replies to those comments)
		var commentTags = 'dd, li, p', indentTags = 'dl, ol, ul';

		$( 'a', content ).each( function () {
			var pageName = findPageNameFromHref( this.getAttribute( 'href' ) );
			// linkMap is from linked page names to CSS class names.
			if ( pageName && linkMap.hasOwnProperty( '$' + pageName ) ) {
				var className = linkMap['$' + pageName];
				$( this ).closest( commentTags ).contents().not( indentTags ).each( function () {
					if ( this.nodeType === 1 ) {
						var $elem = $( this );
						if ( !$elem.hasClass( className ) ) {
							$elem
								.addClass( className )
								.attr( 'data-mw-highlighted-comment-class', className );
						}
					} else {
						$( this ).wrap( $( '<span/>', {
							'class': className,
							'data-mw-highlighted-comment-wrapper': ''
						} ) );
					}
				} );
			}
		} );
	}

	/**
	 * Undo the actions performed by wrapComments().
	 */
	function unwrapComments() {
		// Remove added wrappers
		$( '[data-mw-highlighted-comment-wrapper]' ).replaceWith( function () {
			return this.childNodes;
		} );

		// Remove added classes
		$( '[data-mw-highlighted-comment-class]' ).removeClass( function () {
			var klass = $( this ).attr( 'data-mw-highlighted-comment-class' );
			$( this ).removeAttr( 'data-mw-highlighted-comment-class' );
			return klass;
		} );

		commentsAreHighlighted = false;
		addMenuItem( true );
	}

	/**
	 * Add a group of users whose comments should be given the same CSS class.
	 * @param className The CSS class name to use
	 * @param users An array of usernames
	 */
	function addClassForUsers( className, users ) {
		var ns = mw.config.get( 'wgFormattedNamespaces' );
		for ( var i = 0; i < users.length; ++i ) {
			var userName = users[i].replace( / /g, '_' );
			var userPage = ns[2] + ':' + userName, userTalkPage = ns[3] + ':' + userName;
			linkMap['$' + userPage] = className;
			linkMap['$' + userTalkPage] = className;
		}
	}

	/**
	 * Add a group of users whose comments should be highlighted in the same color.
	 * @param color The CSS background-color to use
	 * @param users An array of usernames
	 * @return The resulting CSSStyleSheet object
	 */
	function addColorForUsers( color, users ) {
		var className = 'highlighted-comment-' + classNumber++;
		addClassForUsers( className, users );
		return mw.util.addCSS( '.' + className + ' { background-color: ' + color + '; }' );
	}

	/**
	 * Adds or updates a "Highlight" or "Unhighlight" option in the content action menu.
	 * @param updateOnly Do nothing if the menu item does not already exist?
	 */
	function addMenuItem( updateOnly ) {
		var text, tooltip, $oldItem = $( '#ca-highlightcomments' );

		if ( updateOnly && !$oldItem.length ) {
			return;
		}

		if ( commentsAreHighlighted ) {
			text = msg.unhighlightText;
			tooltip = msg.unhighlightTooltip;
		} else {
			text = msg.highlightText;
			tooltip = msg.highlightTooltip;
		}

		var link = mw.util.addPortletLink(
			'p-cactions', '#', text, 'ca-highlightcomments', tooltip, null, $oldItem[0]
		);
		$oldItem.remove();

		$( link ).click(function () {
			if ( commentsAreHighlighted ) {
				unwrapComments();
			} else {
				wrapComments();
			}
		});
	}

	// Members exposed to custom highlighter functions
	var hc = {
		addClassForUsers: addClassForUsers,
		addColorForUsers: addColorForUsers,
		addMenuItem: addMenuItem,
		wrapComments: wrapComments
	};

	mw.loader.using( [ 'mediawiki.util', 'mediawiki.RegExp' ], function () {
		// Cache pageRE for performance.
		pageRE = buildPageRE();

		// Run either the user's highlighter function or the default one.
		$( function () {
			$.extend( settings, window.highlightCommentsSettings );
			settings.highlighterFunction( hc );
		} );

		// Now that all settings have been processed, get the elements
		// in which comments should be highlighted. Of course, actually
		// highlight them if that is desired.
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			$content.addClass( 'mw-highlight-comments' );
			if ( commentsAreHighlighted ) {
				wrapElementComments( $content );
			}
		} );
	} );

}( mediaWiki, jQuery ) );

//Custom user rights icons on userpages
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

$(function() {
    $(".WikiHeaderRestyle > nav li").not(".subnav-2.accent li").mouseenter(function() {
        $(this).addClass("marked");
        $(".WikiHeaderRestyle > nav li").not(this).removeClass();
    });
});

$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://ben10.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});