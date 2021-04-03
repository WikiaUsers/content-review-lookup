// By Equazcion: http://terraria.gamepedia.com/User:Equazcion
// *** Mark-Blocked portion imported from Wikipedia's Mark Blocked gadget, author unknown.

var urlPre = 'https://terraria.gamepedia.com';
var tip = "Click to open this user's block log.";

$('#bodyContent a.mw-anonuserlink').each(function(){
  var $this = $(this);
  var user = $this.attr('href').replace(/\/Special:Contributions\//, '');
  $.getJSON(urlPre + '/api.php?format=json&action=query&list=logevents&leaction=block/block&leprop=user&letitle=User:' + user, function(data){
    var blocks = data.query.logevents;
    var numBlocks = blocks.length;
    if (numBlocks > 0){
      var plural = numBlocks > 1 ? 's' : '';
      var logLink = urlPre + '/index.php?title=Special:Log/block&page=User:' + user;
      $this.after('<small> (<b>' + numBlocks + '</b> <a href="' + logLink + '" title="'+ tip +'">block' + plural + '</a>)</small>');
    }
  });
});


// Mark Blocked script imported from Wikipedia
function markBlocked( container ) {
	var contentLinks;

	// Collect all the links in the page's content
	if ( container ) {
		contentLinks = $( container ).find( 'a.mw-anonuserlink, a.mw-userlink' );
	} else if ( mw.util.$content ) {
		contentLinks = mw.util.$content.find( 'a.mw-anonuserlink, a.mw-userlink' ).add( '#ca-nstab-user a' );
	} else {
		contentLinks = $();
	}

	var mbTooltip =  window.mbTooltip || '; blocked ($1) by $2: $3 ($4 ago)';

	//get all aliases for user: & user_talk:
	var userNS = [];
	for ( var ns in mw.config.get( 'wgNamespaceIds' ) ) {
		if ( mw.config.get( 'wgNamespaceIds' )[ns] == 2 || mw.config.get( 'wgNamespaceIds' )[ns] == 3 ) {
			userNS.push( ns.replace( /_/g, ' ' ) + ':' );
		}
	}

	//RegExp for all titles that are  User:| User_talk: | Special:Contributions/ (for userscripts)
	var userTitleRX = new RegExp( '^(' + userNS.join( '|' ) + '|Special:Contributions\\/)([^\\/#]+)$', 'i' );

	//RegExp for links
	var articleRX = new RegExp( '^' + mw.config.get( 'wgArticlePath' ).replace('$1', '') + '([^#]+)' );
	var scriptRX =  new RegExp( '^' + mw.config.get( 'wgScript' ) + '\\?title=([^#&]+)' );

	var userLinks = {};
	var url, ma, pgTitle;


	//find all "user" links and save them in userLinks : { 'users': [<link1>, <link2>, ...], 'user2': [<link3>, <link3>, ...], ... }
	contentLinks.each( function( i, lnk ) {
		url = $( lnk ).attr( 'href' );
		if ( !url || url.charAt(0) != '/' ) {
			return;
		}
		if ( ma = articleRX.exec( url ) ) {
			pgTitle = ma[1];
		} else if ( ma = scriptRX.exec( url ) ) {
			pgTitle = ma[1];
		} else {
			return;
		}
		pgTitle = decodeURIComponent( pgTitle ).replace( /_/g, ' ' );
		user = userTitleRX.exec( pgTitle );
		if ( !user ) {
			return;
		}
		user = user[2];
		$( lnk ).addClass( 'userlink' );
		if ( !userLinks[user] ) {
			userLinks[user] = [];
		}
		userLinks[user].push (lnk );
	} );


	//convert users into array
	var users = [];
	for ( var u in userLinks ) {
		users.push( u );
	}
	if ( users.length == 0 ) {
		return;
	}

	//API request
	var serverTime, apiRequests = 0;
	var waitingCSS = mw.util.addCSS( 'a.userlink {opacity:' + ( window.mbLoadingOpacity || 0.85 ) + '}' );
	while ( users.length > 0 ) {
		apiRequests++;
		$.post( 
			mw.util.wikiScript( 'api' ) + '?format=json&action=query',
			{
				list: 'blocks',
				bklimit: 100,
				bkusers: users.splice( 0, 50 ).join( '|' ),
				bkprop: 'user|by|timestamp|expiry|reason'
				//no need for 'id|flags'
			},
			markLinks
		);
	}

	return; //the end


	//callback: receive data and mark links
	function markLinks( resp, status, xhr ) {

		serverTime = new Date( xhr.getResponseHeader('Date') );
		var list, blk, tip, links, lnk;
		if ( !resp || !( list = resp.query ) || !( list = list.blocks ) ) {
			return;
		}

		for ( var i = 0; i < list.length; i++ ) {
			blk = list[i];
			if ( /^in/.test( blk.expiry ) ) {
				clss = 'user-blocked-indef';
				blTime = blk.expiry;
			} else {
				clss = 'user-blocked-temp';
				blTime = inHours ( parseTS( blk.expiry ) - parseTS( blk.timestamp ) );
			}
			tip = mbTooltip.replace( '$1', blTime )
				.replace( '$2', blk.by )
				.replace( '$3', blk.reason )
				.replace( '$4', inHours ( serverTime - parseTS( blk.timestamp ) ) );
			links = userLinks[blk.user];
			for ( var k = 0; k < links.length; k++ ) {
				lnk = $( links[k] ).addClass( clss );
				if ( window.mbTipBox ) {
					$( '<span class=user-blocked-tipbox>#</span>' ).attr( 'title', tip ).insertBefore( lnk );
				} else {
					lnk.attr( 'title', lnk.attr( 'title' ) + tip );
				}
			}
		}

		if ( --apiRequests == 0 ) { //last response
			waitingCSS.disabled = true;
			$( '#ca-showblocks' ).parent().remove(); // remove added portlet link
		}

	}


	//--------AUX functions

	//20081226220605  or  2008-01-26T06:34:19Z   -> date
	function parseTS( ts ) {
		var m = ts.replace( /\D/g, '' ).match( /(\d\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/ );
		return new Date ( Date.UTC( m[1], m[2]-1, m[3], m[4], m[5], m[6] ) );
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
}// -- end of main function


//start on some pages
switch ( mw.config.get( 'wgAction' ) ) {
	case 'edit':
	case 'submit':
		break;
	case 'view':
		if ( mw.config.get( 'wgNamespaceNumber' ) == 0 ) {
			break;
		}
		//otherwise continue with default
	default: // 'history', 'purge'
		$( function() {
			if ( mw.util.$content && mw.util.$content.hasClass( 'mw-body' ) ) {
				if ( window.mbNoAutoStart ) {
					addPortletLink( 'p-cactions', 'javascript:markBlocked()', 'XX', 'ca-showblocks' );
				} else {
					markBlocked();
				}
			}
  		} );
}