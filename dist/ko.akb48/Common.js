/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/**<pre><nowiki>
 *
 * Some tips when editing this page...
 *
 ** Make sure that your code has been tested in the latest version of Firefox AND Internet Explorer! (Nobody cares about older versions)
 ** No compressed JS. Ever. As of MediaWiki 1.19+ we have [[mw:ResourceLoader]] to compress JS and make it fugly.
 ** Make sure that your code follows some coding conventions, preferrably MediaWiki's (see http://www.mediawiki.org/wiki/Manual:Coding_conventions)
 *
 * Your friendly neighborhood MediaWiki developer,
 * --Jack Phoenix, 26 July 2009
 * <jack@countervandalism.net>
 */
// Tools: [http://uncyclopedia.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]

/* Nachteule told me to add this on my talkpage - Dr. S */
window.wgMWSuggestTemplate = "http://uncyclopedia.wikia.com/api.php?action=opensearch\x26search={searchTerms}\x26namespace={namespaces}\x26suggest";
window.wgSearchNamespaces = [0];

/* Google Analytics - if you're going to fuck with this, TEST IT first */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23952241-1']);
_gaq.push(['_trackPageview']);

( function() {
	var ga = document.createElement( 'script' );
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ( 'https:' == document.location.protocol ? 'https://ssl' : 'http://www' ) + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName( 'script' )[0];
	s.parentNode.insertBefore( ga, s );
})();

/* Non-namespace logos */
//===================================================
// faux-namespace fixes
//	(including hack for browsers with NO CSS3 support [IE6, etc])
//	- Bizzeebeever, 2011 (if this breaks shit, you know who to ban)
//===================================================
//add faux namespaces to {namespaces} as follows:
//	"namespaceName" : { tabText : "Tab text goes here", className : "Logo CSS class name" }
//		//tabText: [optional] default is namespaceName
//		//className [optional] will be given prefix "ns-". default is "ns-[namespaceName]"
//make sure if you are adding more than one to use a comma after each line except the last.
//<body> element for specified namespaces will be given the "ns-[className]" class.
//create your new stylesheet selector + rule in MediaWiki:Common.css accordingly
//	i.e. "body.ns-why #p-logo > a { background-image:url( someimage.png ) };")

YAHOO.util.Event.onContentReady( 'p-logo', function() {
	var namespaces = {
		$className: function( str ) {
			if ( str in this ) {
				return ' ns-' + ( this[str].className || str ).replace( /[\W]*/g, '' ).toLowerCase();
			}
		},
		$tabText: function ( str ) {
			if ( str in this ) {
				return this[str].tabText || str;
			}
		},
		//===add faux-namespaces below this line===
		'Un-Bestiary': { tabText: 'Bestiary' },
		'Uncycloversity': { tabText: 'Resource' }
	}
	var namespace = wgPageName.match( /^(Talk:)?[-\w\?]+/ )[0].replace( 'Talk:', '' );
	// grab namespace, stripping off "Talk:" if this is a talk page
	if ( !namespace ) {
		return;
	}
	// if empty namespace, probably an error
	if ( namespace in namespaces ) {
		// if a namespace hack is defined above...
		try {
			document.body.className += namespaces.$className( namespace );
			// apply custom style
			document.getElementById( 'ca-nstab-main' ).firstChild.innerHTML = namespaces.$tabText( namespace );
			// Change tab text
		} catch( e ) { return; }
	}
} );
// end faux-namespace fixes

/** Reskin parser ***********************************************************
 * Instructions:
 * 1) Add the page title and namespace exactly ("Name_space:Page_name") as new skin, use
 *	UNDERSCORES *NOT* SPACES: ("Main_Page": "", should be first line). The next parameter
 *	is optionally an existing "MediaWiki:Skin/"-prefixed file (in which case you can skip
 *	step 2).
 * 2) Create MediaWiki:Skin/Name_Space:Page_Name.css and place reskin CSS content there.
 */
reskin = {
	'Main_Page': '',
	'Main_Page_test': 'Fullscreen.css',
	'UnNews:Main_Page': 'UnNewsNew.css',
	'UnNews:Main_Page_Beta': 'UnNewsNew.css',
	'UnNews:Religion_Section': 'UnNewsNew.css',
	')': 'Sdrawkcab.css',
	'AAAAAAAAA!': 'Aaaa.css',
	'An:': '',
	'Babel:666': '',
	'Babel:96': '',
	'Babel:Aa': 'Aaaa.css',
	'Babel:Ap': 'Fullscreen.css',
	'Babel:APPL': 'Fullscreen.css',
	'Babel:CaD': '',
	'Babel:Communpedia': 'Communpedia.css',
	'Babel:F@H': '',
	'Babel:Gbs': '',
	'Babel:Hi': '',
	'Babel:Pumpkin': 'Fullscreen.css',
	'Babel:Newspeak': '',
	'Babel:Vogon': 'Vg:.css',
	'Babel:W2': 'Fullscreen.css',
	'Bad_title': 'Nocategories.css',
	'Broken_Redirect': 'Nocategories.css',
	'Cart': 'Fullscreen.css',
	'Drawing': 'Nocategories.css',
	'EBay': '',
	'Ea:': 'Fullscreen.css',
	'Em:': '',
	'File_8AO4F:_The_God_Case': 'Fullscreen.css',
	'Gullible': 'Nocategories.css',
	'Half-Life_2:_Episode_Three': 'Fullscreen.css',
	'Holocaust_denial_denial_denial_denial_denial': 'Nocategories.css',
	'International_Page_Blanking_Day': 'Nocategories.css',
	'Kenny_McCormick': '',
	'Loneliness': 'Em:.css',
	'Talk:Loneliness': 'Em:.css',
	'Marty_Friedman': 'Nocategories.css',
	'Memento': '',
	'Misleading': 'Nocategories.css',
	'Movie_Trailer_Announcer_Guy': '',
	'MS_Paint': '',
	'Namespace:Main_Page': '',
	'Nihilism': '',
	'Rafael_Nadal': '',
	'Rp:': '',
	'ROT13': '',
	'Sdrawkcab': '',
	'Socratic_method': 'Nocategories.css',
	'Slime_Cube': '',
	'Time_Cubicle': 'Slime Cube.css',
	'The_Consumerist': '',
	'Tlh:': '',
	'Tx:': '',
	'UnTunes:Artsy_and_Misunderstood:_A_Bedroom_Emo_Song': 'Em:.css',
	'Uncyclopedia!_Answers': 'Fullscreen.css',
	'Upside_Down': '',
	'User:02barryc/UnNews/Site2': '',
	'User:Algorithm': 'Nocategories.css',
	'User:Bradaphraser/SupperBowl': '',
	'User:Codeine/Em:': 'Em:.css',
	'User:Lyrithya/Twm': 'TWM.css',
	'User:Mhaille/UnTube': 'UnTube.css',
	'User:Mhaille/Rufus': 'Rufus.css',
	'User:Nacky/Phantom_of_the_Drama': 'Phantom_of_the_Drama.css',
	'User:Severian/Germ_Warfare': 'Germ_Warfare.css',
	'User:Spintherism/Penmanship': '',
	'User:Xamralco/Christianity': 'Blue.css',
	'User:Zombiebaron/wip/Deeply_Undercovered': 'Fullscreen.css',
	'User:Zombiebaron/Uncyclopedia_Reskin_Committee/Defacebook': 'Defacebook.css',
	'User:Kelpan/Conservapedia': 'Conservapedia.css',
	'Vd:': '',
	'Visual_puns': 'Nocategories.css',
	'Wikimedia_fundraising': '',
	'Wikimedia_fundraising/Zombiebaron': '',
	'Wikipedia': '',
	'Yahoo!': 'Fullscreen.css'
	// Make sure all lines in this list except the last one have a comma after!
}

var skinName;

if( reskin[wgPageName] != undefined && wgIsArticle == true ) {
	skinName = ( reskin[wgPageName].length > 0 ) ? reskin[wgPageName] : wgPageName + '.css';
	document.write( '<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>' );
}

/* Force the skin to Monobook on TWM (someone remind me to update this once it's mainspaced) -Athyria */
if ( wgPageName == 'User:Lyrithya/Twm' && wgAction == 'view' ) {
	var currentURI = document.location.href;
	if( currentURI.indexOf( 'useskin=monobook' ) == -1 && skin != 'monobook' ) {
		if( currentURI.indexOf( '/index.php?' ) == -1 ) {
			document.location.href = document.location.href + '?useskin=monobook';
		} else {
			document.location.href = document.location.href + '&useskin=monobook';
		}
	}
}
importScript( 'MediaWiki:Spackling of cats.js' );

/* Special reskin (skin specific) for [[SOPA]] -L */
if ( wgPageName == 'SOPA' ) {
	if ( skin == 'uncyclopedia' ) {
		importStylesheet( 'MediaWiki:Skin/black vector.css' );
	} else if ( skin == 'monobook' ) {
		importStylesheet( 'MediaWiki:Skin/Black monobook.css' );
	}
}

/* drop-downs for cactions tabs and whatnot */
importScript( 'User:Lyrithya/dropdown.js' );

function noLogo() {
	if( document.getElementById( 'nologo' ) ) {
		document.getElementById( 'p-logo' ).style.display = 'none';
	}
}
YAHOO.util.Event.onContentReady( 'p-logo', noLogo );

function noTitle() {
	if( document.getElementById( 'notitle' ) ) {
		document.getElementById( 'firstHeading' ).style.display = 'none';
	}
}
YAHOO.util.Event.onContentReady( 'firstHeading', noTitle );

function noCategories() {
	if( document.getElementById( 'nocategories' ) ) {
		document.getElementById( 'catlinks' ).style.display = 'none';
	}
}
YAHOO.util.Event.onContentReady( 'catlinks', noCategories );

function validateImageURL( textval ) {
	var urlregex = new RegExp(
		"^(http|https)\://(images[0-9]|images)\.wikia.([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*\.(gif|GIF|jpg|JPG|jpeg|JPEG|png|PNG)$" );
	return ( urlregex.test( textval ) & ( textval.length < 200 ) );
}

function logotipo() {
	if( document.getElementById( 'logotipo' ) ) {
		if ( document.getElementById( 'logotipo' ).firstChild.src != null ) {
 			var logoURL = document.getElementById( 'logotipo' ).firstChild.src;
			if ( validateImageURL( logoURL ) ) {
				document.getElementById( 'p-logo' ).innerHTML= '<a style="background-image: url(' + logoURL + ')" href="/wiki/Main_Page" title="Visit the main page"/>';
			}
		} else {
			if ( document.getElementById( 'logotipo' ).firstChild.firstChild.src != null) {
				logoURL = document.getElementById( 'logotipo' ).firstChild.firstChild.src;
				if ( validateImageURL( logoURL ) ) {
					document.getElementById( 'p-logo' ).innerHTML= '<a style="background-image: url(' + logoURL + ')" href="/wiki/Main_Page" title="Visit the main page"/>';
				}
			}
		}
	}
}
YAHOO.util.Event.onContentReady('p-logo', logotipo);

// - addOnloadHook only fires after all content on the page has loaded, including images. Which is not very useful if you're trying to hide an image.
//   It's especially bad if there's a large image(s) in the article. This YUI function will fire it as soon as the logo div is loaded. Which is better.

/** Dismiss notice remover
 * (only removes if you have made a custom sitenotice designed to use its own close button)
 */
function removeSitenoticeDismiss() {
	snh = document.getElementById( 'siteNoticehide' );
	if( !snh ) {
		return;
	}
	snh = snh.parentNode;
	snh.href = 'javascript:dismissNotice();';
	noticetr = document.getElementById( 'mw-dismissable-notice' );
	if( !noticetr ) {
		snh.parentNode.removeChild( snh );
		return;
	}
	noticetr = noticetr.firstChild.firstChild;
	noticetr.removeChild( noticetr.lastChild );
}
YAHOO.util.Event.onContentReady('siteNoticehide', removeSitenoticeDismiss);

/** Username replace function ([[template:USERNAME]]) *******************************
 * Inserts user name into <span class="insertusername"></span>
 * Originally by [[wikia:User:Splarka|Splarka]]
 * New version by [[User:Spang|Spang]]
 */
function UserNameReplace() {
	if( typeof( disableUsernameReplace ) != 'undefined' && disableUsernameReplace || wgUserName == null ) {
		return;
	}
	var n = YAHOO.util.Dom.getElementsByClassName( 'insertusername', 'span', document.getElementById( 'bodyContent' ) );
	for ( var x in n ) {
		n[x].innerHTML = wgUserName;
	}
}
addOnloadHook( UserNameReplace );

/** Title rewrite ********************************************************
 * Rewrites the page's title, used by [[Template:Title]]
 * By [[User:Sikon|Sikon]]
 */
function rewriteTitle() {
	if( typeof( SKIP_TITLE_REWRITE ) != 'undefined' && SKIP_TITLE_REWRITE ) {
		return;
	}

	var titleDiv = document.getElementById( 'title-meta' );

	if( titleDiv == null || titleDiv == undefined ) {
		return;
	}

	var cloneNode = titleDiv.cloneNode( true );
	var firstHeading = document.getElementById( 'firstHeading' );
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild( cloneNode, node );
	cloneNode.style.display = 'inline';
	if ( titleDiv.childNodes[0].nodeValue.toLowerCase() == wgPageName.replace( /_/g, ' ' ).toLowerCase() ) {
		document.title = titleDiv.childNodes[0].nodeValue;
	}

	var titleAlign = document.getElementById( 'title-align' );
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

// You can use addOnloadHook (MW native function, defined in wikibits.js) or
// jQuery( document ).ready( rewriteTitle ); (jQuery implementation) if you're
// copying this code over to another wiki
YAHOO.util.Event.onDOMReady( rewriteTitle );

/** Dynamic navigation bars ************************************************
 * Allows navigations templates to expand and collapse their content to save space
 * Documentation on Wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
 */

// set up the words in your language
var NavigationBarHide = '[hide]';
var NavigationBarShow = '[show]';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 1;

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//	indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar( indexNavigationBar ) {
	var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
	var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );

	if( !NavFrame || !NavToggle ) {
		return false;
	}

	// if shown now
	if( NavToggle.firstChild.data == NavigationBarHide ) {
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if( NavChild.className == 'NavPic' ) {
				NavChild.style.display = 'none';
			}
			if( NavChild.className == 'NavContent' ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;

	// if hidden now
	} else if( NavToggle.firstChild.data == NavigationBarShow ) {
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if( NavChild.className == 'NavPic' ) {
				NavChild.style.display = 'block';
			}
			if( NavChild.className == 'NavContent' ) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	for(
			var i = 0;
			NavFrame = document.getElementsByTagName( 'div' )[i];
			i++
		) {
		// if found a navigation bar
		if( NavFrame.className == 'NavFrame' ) {
			indexNavigationBar++;
			var NavToggle = document.createElement( 'a' );
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
			NavToggle.setAttribute( 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');' );

			var NavToggleText = document.createTextNode( NavigationBarHide );
			NavToggle.appendChild( NavToggleText );
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
				if( NavFrame.childNodes[j].className == 'NavHead' ) {
					NavFrame.childNodes[j].appendChild( NavToggle );
				}
			}
			NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
		}
	}
	// if more Navigation Bars found than Default: hide all
	if( NavigationBarShowDefault < indexNavigationBar ) {
		for( var i = 1; i <= indexNavigationBar; i++ ) {
			toggleNavigationBar( i );
		}
	}

}

addOnloadHook( createNavigationBarToggleButton, false );


/** Another collapsible whatnits implementation - for the sidebar mostly, but can be used with whatever
	I'd write some documentation or something, but I can't be arsed. -Lyrithya

********************************************* star */

jQuery( document ).ready( function() {
	$( '.collapsed > *' ).next().css( 'display', 'none' );
	$( '.expanded > *' ).click( function() {
		$( this ).next().toggle();
		$( this ).parent().toggleClass( 'expanded' );
		$( this ).parent().toggleClass( 'collapsed' );
	});
	$( '.collapsed > *' ).click( function() {
		$( this ).next().toggle();
		$( this ).parent().toggleClass( 'collapsed' );
		$( this ).parent().toggleClass( 'expanded' );
	});
});

/*
 * Trivial plugin for hiding the portals in the sidebar panel
 * Written by Silent Penguin
 */
(function( $ ) {
	$.fn.hidingToolbox = function( options ) {
		var settings = {
			'initClosed': true,
			'duration': 200,
			'contentSelector': '.pBody',
			'handleSelector': 'h5',
			'slide': function( visible ) {
				if( visible ) {
					this.parent().addClass( 'hidden' ).removeClass( 'visible' );
				} else {
					this.parent().addClass( 'visible' ).removeClass( 'hidden' );
				}
			}
		};

		// where the magic happens
		var handleClick = function() {
			var handle = $( this ).parent().find( settings['contentSelector'] );
			var visible = handle.is( ':visible' )
			handle[visible ? 'slideUp' : 'slideDown'](settings['duration'], function() {
				return settings['slide'].apply( $( this ), [visible] );
			} );
		}

		var handleHoverIn = function() {
			$( this ).addClass( 'hover' );
		}

		var handleHoverOut = function() {
			$( this ).removeClass( 'hover' );
		}

		var length = this.length;

		if ( typeof( options ) == typeof( Object() ) ) {
			$.extend( settings, options );
		}
		// If options exist and is the right type, lets merge them with our default settings

		if (
			typeof( settings['initClosed'] ) == typeof( Array() ) &&
			!settings['initClosed'].length
		)
		{
			settings['initClosed'] = true;
		}
		// if our init closed is an empty array, define it to the default again.

		return this.each( function( key ) {
			var self = $( this );
			self.find( settings['handleSelector'] )
				.hover( handleHoverIn, handleHoverOut ) // detect hovers, style accordingly
				.click( handleClick ); // click event to open and close
			var initClosed = typeof( settings['initClosed'] ) == typeof( Array() )
				? settings['initClosed'][Math.min( key, length - 1 )]
				: settings['initClosed'];
			self.find( settings['contentSelector'] )[initClosed ? 'hide' : 'show']().parent().addClass( initClosed ? 'hidden' : 'visible' );
		});
	};
})( jQuery );

jQuery( document ).ready( function() {
	jQuery( '.generated-sidebar:not(#p-navigation), #p-tb, #p-wikicities-nav, #p-lang' ).hidingToolbox({'initClosed': [false, true, false, false]});
	jQuery( '#column-one' ).addClass( 'collapsible_pile' );
});

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById( 'ca-edit' ) || !document.getElementById( 'old-forum-warning' ) ) {
		return;
	}
	editLink = document.getElementById( 'ca-edit' ).firstChild;
	editLink.removeAttribute( 'href', 0 );
	editLink.style.color = 'gray';
	editLink.innerHTML = 'No Editing';
}
addOnloadHook( disableOldForumEdit );

/** Forum talkpages - adds talkpage tab back if present.
 * Blame <name missing>
 */
function forumTalkTab() {
	if( document.getElementById( 'talkforum' ) ) {
		document.getElementById( 'talkforum' ).style.display = 'none';
		document.getElementById( 'ca-talk' ).style.display = 'block !important';
	}
}
addOnloadHook( forumTalkTab );

/** Add section tab disabling *************************************
 * Disables the add section tab on any page you like, mainly useful for your userpage
 * (depending on how you have your userpage setup)
 * In order to use it, simply include any HTML element with an ID of disableAddSection such as <div id="disableAddSection"></div>
 * By [[User:Olipro|Olipro]]
 */
function disableAddSection() {
	if( !( addsect = document.getElementById( 'ca-addsection' ) ) || !document.getElementById( 'disableAddSection' ) ) {
		return;
	}
	addsect.parentNode.removeChild( addsect );
}
addOnloadHook( disableAddSection );

/** Remove example text **************************************************
 * Automatically removes any example text left on the page upon saving.
 * By [[User:Spang]]
 */
function stripExamples() {
	try {
		var tb = document.forms[0].wpTextbox1;
		var tbh = tb.scrollTop;
		tb.value = tb.value.replace(/(\'\'\'Bold text\'\'\'|\'\'Italic text\'\'|\[\[Link title\]\]|\[http:\/\/www\.example\.com link title\]|\n== Headline text ==\n|\[\[Image:Example\.jpg\]\]|\[\[File:Example\.jpg\]\]|<math>Insert formula here<\/math>|<nowiki>Insert non-formatted text here<\/nowiki>|<code><\/code>|\[\[Media:Example\.ogg\]\]|\n(?=\n\n\n))/g,'');
		tb.scrollTop = tbh;
		return true;
	} catch( e ) {
		return true;
	}
}
addOnloadHook(
	function() {
		if ( ( wgAction == 'edit' || wgAction == 'submit' ) && wgCanonicalSpecialPageName == false ) {
			document.forms[0].wpSave.setAttribute( 'onclick', 'return stripExamples()' );
		}
	}
)

/** Embed flash movies **************************************************
 * Allows embedding of flash files in a page. Only enabled in userspace currently.
 * See [[Template:Flash]]
 * By [[User:Olipro|Olipro]]
 */
var flashOk;

function embedFlashMovie( flashOk ) {
	mainbody = document.getElementById( 'bodyContent' );
	mainbody.innerHTML = contentTempHolder;
	spancheck = document.getElementsByTagName( 'span' );
	for( i = 0; i < spancheck.length; i++ ) {
		if( spancheck[i].getAttribute( 'id' ) != 'embedFlashDoc' ) {
			continue;
		}
		obj = spancheck[i].innerHTML.split( '@' );
		flwidth = obj[0];
		flheight = obj[1];
		flfile = obj[2].replace( 'fullurl://', 'http://' );
		showFlash = ' ';
		if( flashOk ) {
			showFlash = '<object width="' + flwidth + '" height="' + flheight + '"';
			showFlash += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
			showFlash += 'codebase="http://fpdownload.macromedia.com/pub/';
			showFlash += 'shockwave/cabs/flash/swflash.cab#version=8,0,0,0">';
			showFlash += '<param name="movie" value="' + flfile + '" />';
			showFlash += '<embed src="' + flfile + '" width="' + flwidth + '" height=';
			showFlash += '"' + flheight + '" type="application/x-shockwave-flash" ';
			showFlash += 'pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			showFlash += '</object>';
		} else {
			showFlash = '<a class="plainlinks" href="javascript:embedFlashMovie(true)" onClick="embedFlashMovie(true)">' + flfile + '</a> (Click to Show)';
		}
		spancheck[i].innerHTML = showFlash;
		spancheck[i].style.display = 'inline';
	}
}

var contentTempHolder;
function embedFlashCheck() {
	if( !document.getElementById( 'embedFlashDoc' ) ) {
		return;
	}
	mainbody = document.getElementById( 'bodyContent' );
	contentTempHolder = mainbody.innerHTML;
	if( typeof displayFlashOverride != 'undefined' ) {
		embedFlashMovie( displayFlashOverride );
		return;
	}
	askmessage = '<div align="center" id="askflash">This page contains ';
	askmessage += '<a href="/wiki/Flash_Gordon" class="plainlinks">Flash</a>; would you ';
	askmessage += 'like to see it? <b><a href="javascript:embedFlashMovie(true)" ';
	askmessage += 'onClick="embedFlashMovie(true)">Yes</a> | <a ';
	askmessage += 'href="javascript:embedFlashMovie(false)" ';
	askmessage += 'onClick="embedFlashMovie(false)">No</a> | <a ';
	askmessage += 'href="/index.php?title=User:' + wgUserName + '/' + skin + '.js&';
	askmessage += 'action=edit&section=new&preload=Template:Flash/disable">';
	askmessage += 'Don\'t show this again</a></b></div>';
	mainbody.innerHTML = askmessage;
}
addOnloadHook( embedFlashCheck );

/** Edit Link remover *****************************************************
 * Removes the little edit links from the UnNews Main Page if you're not
 * signed in as a user since these pages are semi-protected and always
 * will be.
 */
function unNewsEditLinkChecker() {
	if( wgPageName != 'UnNews:Main_Page' || wgIsLogin ) {
		return;
	}

	editlinks = document.getElementsByTagName( 'span' );
	for( i = 0; i < editlinks.length; i++ ) {
		if( editlinks[i].className != 'editor' ) {
			continue;
		}
		editlinks[i].parentNode.removeChild( editlinks[i] );
	}
}
addOnloadHook( unNewsEditLinkChecker );

/** Sortable table fixes **************************************************
 * Fixes some problems the default sortable table script has.
 * Slightly modifies the ts_resortTable function found in wikibits.js
 */
function ts_resortTable( lnk ) {
	var span = lnk.getElementsByTagName( 'span' )[0];
	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;
	var table = tr.parentNode;

	while( table && !( table.tagName && table.tagName.toLowerCase() == 'table' ) ) {
		table = table.parentNode;
	}

	if( !table ) {
		return;
	}

	if( table.rows.length <= 1 ) {
		return;
	}

	if( ts_number_transform_table == null ) {
		ts_initTransformTable();
	}

	var rowStart = table.tHead && table.tHead.rows.length > 0 ? 0 : 1;
	var itm = '';
	for( var i = rowStart; i < table.rows.length; i++ ) {
		if( table.rows[i].cells.length > column ) {
			itm = ts_getInnerText( table.rows[i].cells[column] );
			itm = itm.replace(/^[\s\xa0]+/,"").replace(/[\s\xa0]+$/,"");
			if( itm != '' ) {
				break;
			}
		}
	}
	var sortfn = ts_sort_generic;
	var preprocessor = ts_toLowerCase;
	if( /^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /^\d\d[\/.-]\d\d[\/.-]\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /(^[\u00a3$\u20ac\u00a4\u00a5]|\u00a2$)/.test( itm ) ) {
		preprocessor = ts_currencyToSortKey;
	} else if( ts_number_regex.test( itm ) || /sm=n$/.test( itm ) ) {
		preprocessor = ts_parseFloat;
	}
	var reverse = span.getAttribute( 'sortdir' ) == 'down';
	var newRows = new Array;
	var staticRows = new Array;
	for( var j = rowStart; j < table.rows.length; j++ ) {
		var row = table.rows[j];
		if( ( ' ' + row.className + ' ' ).indexOf( ' unsortable ' ) < 0 ) {
			var keyText = ts_getInnerText( row.cells[column] );
			var oldIndex = reverse ? -j : j;
			var preprocessed = preprocessor( keyText );
			newRows[newRows.length] = new Array( row, preprocessed, oldIndex );
		} else {
			staticRows[staticRows.length] = new Array( row, false, j-rowStart );
		}
	}
	newRows.sort( sortfn );
	var arrowHTML;
	if( reverse ) {
		arrowHTML = "<img src=\"" + ts_image_path + ts_image_down + "\" alt=\"&darr;\"/>";
		newRows.reverse();
		span.setAttribute( 'sortdir', 'up' );
	} else {
		arrowHTML = "<img src=\"" + ts_image_path + ts_image_up + "\" alt=\"&uarr;\"/>";
		span.setAttribute( 'sortdir', 'down' );
	}
	for( var i = 0; i < staticRows.length; i++ ) {
		var row = staticRows[i];
		newRows.splice( row[2], 0, row );
	}
	for( var i = 0; i < newRows.length; i++ ) {
		if( ( ' ' + newRows[i][0].className + ' ' ).indexOf( ' sortbottom ' ) == -1 ) {
			table.tBodies[0].appendChild( newRows[i][0] )
		}
	}
	for( var i = 0; i < newRows.length; i++ ) {
		if( ( ' ' + newRows[i][0].className + ' ' ).indexOf( ' sortbottom ' ) != -1 ) {
			table.tBodies[0].appendChild( newRows[i][0] )
		}
	}
	var spans = getElementsByClassName( tr, 'span', 'sortarrow' );
	for( var i = 0; i < spans.length; i++ ) {
		spans[i].innerHTML = "<img src=\"" + ts_image_path + ts_image_none + "\" alt=\"&darr;\"/>";
	}
	span.innerHTML = arrowHTML;
	if( ts_alternate_row_colors ) {
		ts_alternate( table );
	}
}

/** IP template for ban patrol ******
 * Others can be added for other or all pages.
 */
if( mwCustomEditButtons && wgPageName == 'Uncyclopedia:Ban_Patrol' ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		'imageFile': 'http://images1.wikia.com/uncyclopedia/images/d/d7/IP_button.png',
		'speedTip': 'IP template',
		'tagOpen': '{' + '{' + 'IP|',
		'tagClose': '}' + '}',
		'sampleText': '127.0.0.1'
	};
}

/** Fastdelete *******************************
 * By Splarka
 * The page that uses this is http://wikia.50webs.com/massdelete/uncyclopedia/index.htm .
 */
if( wgUserGroups && wgUserGroups.join( ' ' ).indexOf( 'sysop' ) != -1 ) {
	importScriptURI( 'http://community.wikia.com/index.php?title=User:Splarka/fastdelete.js&action=raw&ctype=text/javascript&dontcountme=s' );
}

/** Fix XML bugs *******************************
 * By [[User:Spang|Spang]]
 * Eliminates bugs caused by invalid XHTML
 * The first parameter is the text of the page. Default is to return the XML, set the second parameter to false to return as text.
 */
function fixXML( text, parsetext ) {
	var bug1a = text.indexOf( '<head>' );
	var bug1b = text.indexOf( '<!-- start content -->' );
	if( bug1a != -1 || bug1b != -1 ) {
		var text = text.substring( 0, bug1a ) + '<body><div id="bodyContent">' + text.substring( bug1b );
	}

	var bug2 = text.indexOf( '<!-- end content -->' );
	if( bug2 != -1 ) {
		var text = text.substring( 0, bug2 ) + '</div></body></html>';
	} else {
		return null;
	}

	if( parsetext == false ) {
		return text;
	}

	try {
		var fixedXML = new ActiveXObject("Microsoft.XMLDOM");
		fixedXML.async = 'false';
		fixedXML.loadXML( text );
		return fixedXML;
	} catch( e ) {
		try {
			var parser = new DOMParser();
			var fixedXML = parser.parseFromString( text, "text/xml" );
			return fixedXML;
		} catch( e ) {
			return false;
		}
	}
}


/** Featured Interwiki *******************************
 * Stolen from Wikipedia
 */
function linkFA() {
	if ( document.getElementById( 'p-lang' ) ) {
		interwikiLinks = document.getElementById( 'p-lang' ).getElementsByTagName( 'li' );

		for ( var i in interwikiLinks ) {
			if ( document.getElementById( interwikiLinks[i].className + '-fa' ) ) {
				interwikiLinks[i].className += ' FA';
				interwikiLinks[i].title = 'This is a featured article in another language';
			}
		}
	}
};
YAHOO.util.Event.onContentReady( 'column-one', linkFA );

importScript( 'User:Spang/vote.js' );

/** StatCounter Code *******************************
 * To count stats, eh.
 */
var sc_project = 4143615;
var sc_invisible = 1;
var sc_partition = 51;
var sc_click_stat = 1;
var sc_security = '936a4d05';

var sc_width = screen.width;
var sc_height = screen.height;
var sc_referer = '' + document.referrer;

try {
	sc_referer = '' + parent.document.referrer;
} catch( ex ) {
	sc_referer = '' + document.referrer;
}

var sc_os = '';
var sc_title = '';
var sc_url = '';
var sc_unique = 0;
var sc_returning = 0;
var sc_returns = 0;
var sc_base_dir;
var sc_click_dir;
var sc_error = 0;
var sc_remove = 0;
var sc_http_url = 'http';
var sc_link_back_start = '';
var sc_link_back_end = '';
var sc_security_code = '';
var sc_cls = -1;
var sc_host = 'statcounter.com';

if( window.sc_click_stat ) {
	sc_cls = window.sc_click_stat;
}
if( window.sc_https ) {
	if( sc_https == 1 ) {
		sc_doc_loc = '' + document.location;
		myRE = new RegExp( "^https", "i" );
		if( sc_doc_loc.match( myRE ) ) {
			sc_http_url = 'https';
		}
	}
}
if( window.sc_local ) {
	sc_base_dir = sc_local;
} else {
	if( window.sc_partition ) {
		if( sc_cls == -1 && sc_partition == 3 ) {
			sc_cls = 1;
		}
		var sc_counter = '';
		if( window.sc_partition != 34 && sc_partition <= 45 ) {
			sc_counter = sc_partition + 1;
		}
		sc_base_dir = sc_http_url + '://c' + sc_counter + '.' + sc_host + '/';
	} else {
		sc_base_dir = sc_http_url + '://c1.' + sc_host + '/';
	}
}
sc_click_dir = sc_base_dir;
if( window.sc_text ) {
	sc_base_dir += 'text.php?';
} else {
	sc_base_dir += 't.php?';
}
if( window.sc_project ) {
	sc_base_dir += "sc_project=" + sc_project;
} else if( window.usr ) {
	sc_base_dir += "usr=" + usr;
} else {
	sc_error = 1;
}
if( window.sc_remove_link ) {
	sc_link_back_start = '';
	sc_link_back_end = '';
} else {
	sc_link_back_start = "<a class=\"statcounter\" href=\"http://www." + sc_host + "\" target=\"_blank\">";
	sc_link_back_end = "<\/a>";
}
sc_date = new Date();
sc_time = sc_date.getTime();
sc_time_difference = 3600000;
sc_title = '' + document.title;
sc_url= '' + document.location;
sc_referer = sc_referer.substring( 0, 255 );
sc_title = sc_title.substring( 0, 150 );
sc_url = sc_url.substring( 0, 150 );
sc_referer = escape( sc_referer );
if( encodeURIComponent ) {
	sc_title = encodeURIComponent( sc_title );
} else {
	sc_title = escape( sc_title );
}
sc_url = escape( sc_url );
if( window.sc_security ) {
	sc_security_code = sc_security;
}
var sc_tracking_url = sc_base_dir + '&resolution=' + sc_width + '&h=' + sc_height + '&camefrom=' + sc_referer + '&u=' + sc_url + '&t=' + sc_title + '&java=1&security=' + sc_security_code + '&sc_random=' + Math.random();
var sc_clstr = '<span class="statcounter">';
var sc_cltext = "\" alt=\"StatCounter - Free Web Tracker and Counter\" border=\"0\">";
var sc_strout = sc_clstr + sc_link_back_start + "<img src=\"" + sc_tracking_url + sc_cltext + sc_link_back_end + '</span>';
if( sc_error == 1 ) {
	document.writeln( 'Code corrupted. Insert fresh copy.' );
} else if( sc_remove == 1 ) {
} else if( window.sc_invisible ) {
	if( window.sc_invisible == 1 ) {
		if( window.sc_call ) {
			sc_call++;
		} else {
			sc_call = 1;
		}
		eval( "var sc_img" + sc_call + " = new Image();sc_img" + sc_call + ".src = \"" + sc_tracking_url + "&invisible=1\"" );
	} else {
		document.writeln( sc_strout );
	}
} else if( window.sc_text ) {
	document.writeln( '<scr' + 'ipt language="JavaScript"' + ' src=' + sc_tracking_url + "&text=" + sc_text + '></scr' + 'ipt>' );
} else {
	document.writeln( sc_strout );
}

if( sc_cls > 0 ) {
	if( clickstat_done != 1 ) {
		var clickstat_done = 1;
		var clickstat_project = window.sc_project;
		var clickstat_security = window.sc_security_code;
		var dlext = "7z|aac|avi|csv|doc|exe|flv|gif|gz|jpe?g|js|mp(3|4|e?g)|mov|pdf|phps|png|ppt|rar|sit|tar|torrent|txt|wma|wmv|xls|xml|zip";
		if( typeof( window.sc_download_type ) == 'string' ) {
			dlext = window.sc_download_type;
		}
		var ltype = "https?|ftp|telnet|ssh|ssl|mailto";
		var second = "ac|co|gov|ltd|me|mod|net|nic|nhs|org|plc|police|sch|com";
		var dl = new RegExp( "\\.(" + dlext + ")$", "i" );
		var lnk = new RegExp( "^(" + ltype + "):", "i" );
		var domsec = new RegExp( "\^(" + second + ")$", "i" );
		var host_name = location.host.replace(/^www\./i, "");
		var host_splitted = host_name.split( '.' );
		var domain = host_splitted.pop();
		var host_split = host_splitted.pop();
		if( domsec.test( host_split ) ) {
			domain = host_split + '.' + domain;
			host_split = host_splitted.pop();
		}
		domain = host_split + '.' + domain;
		var lnklocal_mask = "^https?:\/\/(.*)" + domain;
		var lnklocal = new RegExp( lnklocal_mask, "i" );
		if( document.getElementsByTagName ) {
			var anchors = document.getElementsByTagName( 'a' );
			for( var i = 0; i < anchors.length; i++ ) {
				var anchor = anchors[i];
				if( anchor.onmousedown ) {
					var original_click = anchor.onmousedown;
					var s = original_click.toString().split( "\n" ).join( ' ' );
					var bs = s.indexOf( '{' );
					var head = s.substr( 0, bs );
					var ps = head.indexOf( '(' );
					var pe = head.indexOf( ')' );
					var params = head.substring( ps + 1, pe );
					var plist = params.split( ',' );
					var body = s.substr( bs + 1, s.length - bs - 2 );
					var insert = "sc_clickstat_call(this,'" + sc_click_dir + "');";
					var final_body = insert + body;
					var ev_head = "new Function (";
					var ev_params = '';
					var ev_sep = '';
					for( var sc_i = 0; sc_i < plist.length; sc_i++ ) {
						ev_params = ev_sep + "'" + plist[sc_i] + "'";
						ev_sep = ',';
					}
					if( ev_sep == ',' ) {
						ev_params += ',';
					}
					var ev_foot = "final_body);";
					var ev_final = ev_head + ev_params + ev_foot;
					anchor.onmousedown = eval( ev_final );
				} else {
					anchor.onmousedown = new Function( "event", "sc_clickstat_call(this,'" + sc_click_dir + "');return true;" );
				}
			}
		}
		function sc_none() {
			return;
		}
		function sc_clickstat_call( adata, sc_click_dir ) {
			if( adata ) {
				var clickmode = 0;
				if( lnk.test( adata ) ) {
					if( ( lnklocal.test( adata ) ) ) {
						if( dl.test( adata ) ) {
							clickmode = 1;
						} else {
							if( sc_cls == 2 ) {
								clickmode = 2;
							}
						}
					} else {
						clickmode = 2;
					}
				}
				if( clickmode != 0 ) {
					var sc_link = escape( adata );
					if( sc_link.length > 0 ) {
						var sc_req = sc_click_dir + 'click.gif?sc_project=' + clickstat_project + '&security=' + clickstat_security + '&c=' + sc_link + '&m=' + clickmode + '&rand=' + Math.random();
						var sc_req_image = new Image( 1, 1 );
						sc_req_image.onload = sc_none;
						sc_req_image.src = sc_req;
						var d = typeof( window.sc_delay ) != 'undefined' ? sc_delay : 250;
						var n = new Date();
						var t = n.getTime() + d;
						while( n.getTime() < t ) {
							var n = new Date();
						}
					}
				}
			}
		}
	}
}

// </nowiki></pre>

/* 디스플레이 시계 */
importScript('MediaWiki:Common.js/displayTimer.js');