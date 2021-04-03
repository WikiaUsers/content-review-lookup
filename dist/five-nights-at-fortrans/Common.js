/* Any JavaScript here will be loaded for all users on every page load. */
// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};

window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Admin'},
        blocked: { u:'Stuffed into a Fortran Suit'},
		rollback: { u:'Rollback'},
		threadmoderator: { u:'Moderator'},
		chatmoderator: { u:'Chat Moderator'},
        bureaucrat: { u:'Bureaucrat'},
        Founder: { u:'Founder'}, 
        Inactive: { u:'Inactive'}, 
        Patroller: { u:'Patroller'},
	} 
}; 

 
//***Adds tags to users
 
UserTagsJS.modules.custom = {
	'Angrybirds333': ['founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator'],
        'Waluigiofthegods': ['bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback'],
        'Lebunnie': ['chatmoderator', 'rollback'],
        'WyattMars The FNARI Developer': ['bureaucrat', 'sysop','patroller'],
        'SpongFreddy777': ['bureaucrat', 'patroller','chatmoderator'],

//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true

UserTagsJS.modules.userfilter = {
   'Angrybirds333': ['founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator'],
        'Waluigiofthegods': ['bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback'],
        'Lebunnie': ['chatmoderator', 'rollback'],
        'WyattMars The FNARI Developer': ['bureaucrat', 'sysop','patroller'],
        'SpongFreddy777': ['bureaucrat', 'patroller','chatmoderator'],
};
// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};
 
//Last Edited Config
window.lastEdited = {
    avatar: false
};
 
// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
 
    ]
});// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});
 
// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================
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
 
//************************************************
// Misc
//************************************************
 
$('.accountname').text(mw.config.get('wgUserName'));