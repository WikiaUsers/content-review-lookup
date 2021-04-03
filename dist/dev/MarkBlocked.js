/**
 * [[MarkBlocked]] - strike out links to the pages of blocked users
 *
 * @license https://creativecommons.org/licenses/by-sa/3.0/
 * @see https://ru.wikipedia.org/wiki/Википедия:Гаджеты/Зачеркнуть_заблокированных
 * @source https://ru.wikipedia.org/wiki/MediaWiki:Gadget-markblocked.js
 *
 */

( function ( $, mw ) {

	var mwConfig = mw.config.get( [
		'wgAction',
		'wgArticlePath',
		'wgDBname',
		'wgNamespaceIds',
		'wgScript',
		'wgServer',
		'wgUserLanguage'
	] );

	var mbTooltip =  window.mbTooltip;

	//get all aliases for user: & user_talk: & Message_Wall:
	var userNS = [];
	for ( var ns in mwConfig.wgNamespaceIds ) {
		if ( mwConfig.wgNamespaceIds[ ns ] === 2 || mwConfig.wgNamespaceIds[ ns ] === 3 || mwConfig.wgNamespaceIds[ ns ] === 1200 ) {
			userNS.push( ns.replace( /_/g, ' ' ) + ':' );
		}
	}

	//RegExp for links
	var articleRX = new RegExp(
		'^(?:' + mwConfig.wgServer + ')?' +
		mwConfig.wgArticlePath.replace( '$1', '' ) + '([^?#]+)'
	);
	var scriptRX = new RegExp(
		'^(?:' + mwConfig.wgServer + ')?' +
		mwConfig.wgScript + '\\?title=([^#&]+)'
	);

	var userTitleRX, waitingCSS;


	//--------Init functions

	function init( specialContribs ) {
		//RegExp  for all titles that are  User: | User_talk: | Special:Contributions/ (localized) | Special:Contributions/ (for userscripts)
		userTitleRX = new RegExp( '^'
			+ '(' + userNS.join( '|' )
			+ '|' + specialContribs + '\\/|Special:Contributions\\/'
			+ ')'
			+ '([^\\/#]+)$', 'i' );

		mw.util.addCSS(
			'.mediawiki .user-blocked-partial {'  + ( window.mbPartialStyle || 'opacity: 0.5' ) + '}'
			+ '.mediawiki .user-blocked-temp {' + ( window.mbTempStyle || 'opacity: 0.7; text-decoration: line-through' ) + '}'
			+ '.mediawiki .user-blocked-indef {' + ( window.mbIndefStyle || 'opacity: 0.4; font-style: italic; text-decoration: line-through' ) + '}'
			+ '.mediawiki .user-blocked-tipbox {' + ( window.mbTipBoxStyle || 'font-size:85%; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA' ) + '}'
		);

		waitingCSS = mw.util.addCSS( 'a.userlink {opacity:' + ( window.mbLoadingOpacity || 0.85 ) + '}' );
		waitingCSS.disabled = true;

		if ( window.mbNoAutoStart ) {
			$( function () {
				var portletLink = mw.util.addPortletLink( 'p-tb, .mytools', '#', 'Mark blocked users', 'ca-showblocks' );
				$( portletLink ).click( function( event ) {
					event.preventDefault();
					markBlocked();
				} );
			} );
		} else {
			markBlocked();
			mw.hook( 'wikipage.content' ).add( markBlocked );
		}

		//compatibility with AjaxRC
		window.ajaxCallAgain = window.ajaxCallAgain || [];
		window.ajaxCallAgain.push( markBlocked );
	}

	function initSpecialContribsString() {
		var promise = $.Deferred();
		var storageKey = 'MarkBlocked-specialcontribs_' + mwConfig.wgDBname;
		var specialContribs;

		try {
			specialContribs = localStorage.getItem( storageKey );
		} catch ( ignore ) {}

		if ( specialContribs ) {
			return promise.resolve( specialContribs );
		}

		$.getJSON( mw.util.wikiScript( 'api' ) , {
			action: 'parse',
			format: 'json',
			prop: 'text',
			text: '<span class="contribs">[[Special:Contributions]]</span>',
			disablepp: ''
		} ).done( function ( data ) {
			var $parsed = $( data.parse.text['*'] );
			var specialContribs = $parsed.find( '.contribs > a' ).attr( 'title' );

			promise.resolve( specialContribs );

			try {
				localStorage.setItem( storageKey, specialContribs );
			} catch ( ignore ) {}
		});

		return promise;
	}

	function initTooltipMessage() {
		var promise = $.Deferred();

		if ( mbTooltip ) {
			return promise.resolve();
		}

		if ( !( window.dev && dev.i18n && dev.i18n.loadMessages ) ) {
			mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js' );
		}

		mw.hook( 'dev.i18n' ).add( function ( i18njs ) {
			i18njs.loadMessages( 'MarkBlocked' ).done( function ( i18nData ) {
				mbTooltip = i18nData.msg( 'tooltip' ).plain();
				promise.resolve();
			} );
		} );

		return promise;
	}


	//--------Main function

	function markBlocked( container ) {
		var contentLinks = ( container || mw.util.$content ).find( 'a' )
				.not( '.editsection > a, .mw-editsection > a' )
				.add( '#ca-nstab-user a, li[data-id="profile"] > a' );

		var userLinks = {};
		var url, rlUrl, ma, pgTitle, user;


		//find all "user" links and save them in userLinks : { 'users': [<link1>, <link2>, ...], 'user2': [<link3>, <link3>, ...], ... }
		contentLinks.each( function( i, lnk ) {
			url = $( lnk ).attr( 'href' );
			rlUrl = $( lnk ).data( 'uncrawlableUrl' );
			if ( rlUrl ) {
				url = atob( rlUrl );
			}
			if ( !url || url.charAt( 0 ) !== '/' ) {
				return;
			}
			//multiple run protection
			if ( $( lnk ).hasClass( 'userlink' ) ) {
				return;
			}
			if ( ma = articleRX.exec( url ) ) {
				pgTitle = ma[ 1 ];
			} else if ( ma = scriptRX.exec( url ) ) {
				pgTitle = ma[ 1 ];
			} else {
				return;
			}
			pgTitle = decodeURIComponent( pgTitle ).replace( /_/g, ' ' );
			user = userTitleRX.exec( pgTitle );
			if ( !user ) {
				return;
			}
			user = user[ 2 ];
			$( lnk ).addClass( 'userlink' );
			if ( !userLinks[ user ] ) {
				userLinks[ user ] = [];
			}
			userLinks[ user ].push (lnk );
		} );


		//convert users into array
		var users = [];
		for ( var u in userLinks ) {
			users.push( u );
		}
		if ( users.length === 0 ) {
			return;
		}

		//API request
		var serverTime,
			apiRequests = 0;
		waitingCSS.disabled = false;
		while ( users.length > 0 ) {
			apiRequests++;
			$.post(
				mw.util.wikiScript( 'api' ) + '?format=json&action=query',
				{
					list: 'blocks',
					bklimit: 100,
					bkusers: users.splice( 0, 50 ).join( '|' ),
					bkprop: 'user|by|timestamp|expiry|reason|flags'
					//no need for 'id'
				},
				markLinks
			);
		}

		return; //the end


		//callback: receive data and mark links
		function markLinks( resp, status, xhr ) {

			serverTime = new Date( xhr.getResponseHeader('Date') );
			var list, blk, clss, blTime, tip, links, lnk, blPartial;
			if ( !resp || !( list = resp.query ) || !( list = list.blocks ) ) {
				return;
			}

			for ( var i = 0; i < list.length; i++ ) {
				blk = list[ i ];
				blPartial = '';
				if ( /^in/.test( blk.expiry ) ) {
					clss = 'user-blocked-indef';
					blTime = blk.expiry;
				} else {
					clss = 'user-blocked-temp';
					blTime = inHours ( parseTS( blk.expiry ) - parseTS( blk.timestamp ) );
				}
				if ('partial' in blk) {
					clss = 'user-blocked-partial';
					blPartial = ' partial';
				} 
				tip = mbTooltip//.replace( '$1', blPartial )
					.replace( '$1', blTime )
					.replace( '$2', blk.by )
					.replace( '$3', blk.reason )
					.replace( '$4', inHours ( serverTime - parseTS( blk.timestamp ) ) );
				links = userLinks[ blk.user ];
				for ( var k = 0; k < links.length; k++ ) {
					lnk = $( links[ k ] ).addClass( clss );
					if ( window.mbTipBox ) {
						$( '<span class=user-blocked-tipbox>#</span>' ).attr( 'title', tip ).insertBefore( lnk );
					} else {
						lnk.attr( 'title', lnk.attr( 'title' ) + '; ' + tip );
					}
				}
			}

			if ( --apiRequests === 0 ) { //last response
				waitingCSS.disabled = true;
				$( '#ca-showblocks' ).remove(); // remove added portlet link
			}

		}
	}// -- end of main function


	//--------AUX functions

	//20081226220605 or 2008-01-26T06:34:19Z -> date
	function parseTS( ts ) {
		var m = ts.replace( /\D/g, '' ).match( /(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/ );
		return new Date ( Date.UTC( m[ 1 ], m[ 2 ] - 1, m[ 3 ], m[ 4 ], m[ 5 ], m[ 6 ] ) );
	}

	function inHours( ms ) { //milliseconds -> "2:30" or 5,06d or 21d
		var mm = Math.floor( ms / 60000 );
		if ( !mm ) {
			return Math.floor( ms / 1000 ) + 's';
		}
		var hh = Math.floor( mm / 60 );
		mm = mm % 60;
		var dd = Math.floor( hh / 24 );
		hh = hh % 24;
		if ( dd ) {
			return dd + ( dd < 10 ? '.' + zz( hh ) : '' ) + 'd';
		}
		return hh + ':' + zz( mm );
	}

	function zz( v ) { // 6 -> '06'
		if ( v <= 9 ) {
			v = '0' + v;
		}
		return v;
	}


	//start on some pages
	switch ( mwConfig.wgAction ) {
		case 'edit':
		case 'submit':
		case 'delete':
			break;
		default: // 'history', 'view'
			$.when(
				initSpecialContribsString(),
				initTooltipMessage(),
				mw.loader.using( 'mediawiki.util' )
			).done( init );
	}

}( jQuery, mediaWiki ) );