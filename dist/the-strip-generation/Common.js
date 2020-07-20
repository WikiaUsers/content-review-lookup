/* Any JavaScript here will be loaded for all users on every page load. */

//************************************************
// Import Scripts
//************************************************
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});

//************************************************
// User Tag Config
//************************************************
//*** Make New Tags
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { u: 'Bureaucrat'},
                bot: { link:'', order:1 },
		sysop: { u: 'Administrator', order:2 },
		rollback: { u: 'Rollback', order:3 },
		chatmoderator: { u: 'Chat Moderator', order:4 },
		'inactivebcrat': { u: 'Inactive Bureaucrat', order:8 },
		'inactiveadmin': { u: 'Inactive Administrator', order:9 },
		'inactive': { u: 'Inactive User', order:10 },
		'fired': { u: 'Fired Administrator', order:11 },
		'leader': { u: 'Leader', order:-1/0 },
                'coder': { u: 'Coder', order: 1e24 },
                'founder': { u: 'Founder of the Wiki', order: -1000 },
                'blockedfromchat': { u: 'Blocked from Chat', order: 12 },
	}
};
 
UserTagsJS.modules.custom = {
	'MilezTailzPrower': ['coder'],
	'Carkle100': ['leader'],
};
 
//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;
 
//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};
 
//*** Tags Inactive Users - >=40 Days 
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0]
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot'];
//*** Combine Multiple Tags
UserTagsJS.modules.implode = {
	'inactivebcrat': ['bureaucrat', 'inactive'], //+inactivebcrat -bureaucrat -inactive -chatmoderator -rollback
	'inactiveadmin': ['sysop', 'inactive'] //+inactiveadmin -sysop -inactive -rollback -chatmoderator
};
 
UserTagsJS.modules.userfilter = {
};

//************************************************
// AJAX Auto-Refresh
//************************************************
 
var	ajaxIndicator = 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatically refresh this page',
	refreshHover = 'Enable auto-refreshing page loads',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
//*** Sets the cookie
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
//*** Gets the cookie
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
//*** Main function to start the Auto-refresh process
function preloadAJAXRL() {
	var	ajaxRLCookie = ( getCookie( "ajaxload-" + wgPageName ) == "on" ) ? true : false,
		appTo = ( $( '#WikiaPageHeader' ).length ) ? $( '#WikiaPageHeader' ) : ( $( '#AdminDashboardHeader' ).length ? $( '#AdminDashboardHeader > h1' ) : $( '.firstHeading' ) );
	appTo.append( '&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>' );
	$( '#ajaxLoadProgress' ).ajaxSend( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).show();
		}
	} ).ajaxComplete ( function ( event, xhr, settings ) {
		if ( location.href == settings.url ) {
			$( this ).hide();
			for( i in ajaxCallAgain ) {
				ajaxCallAgain[i]();
			}
		}
	} );
	$( '#ajaxToggle' ).click( toggleAjaxReload );
	$( '#ajaxToggle' ).attr( 'checked', ajaxRLCookie);
	if ( getCookie( "ajaxload-" + wgPageName ) == "on" ) {
		loadPageData();
	}
}
 
//*** Turn refresh on and off by toggling the checkbox
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
//** Does the actual refresh
function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC + " > *", function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 
//** Load the script on specific pages
$( function () { 
	for ( x in ajaxPages ) {
		if ( wgPageName == ajaxPages[x] && $( '#ajaxToggle' ).length === 0 ) {
			preloadAJAXRL();
		}
	}
} );