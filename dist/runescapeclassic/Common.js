/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/*** Cookie accessor functions ***/
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ";path=/" + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
function getCookie(name) {
	if (document.cookie.length > 0) {
		var start = document.cookie.indexOf(name + '=');
		if (start != -1) { 
			start = start + name.length + 1; 
			var end = document.cookie.indexOf(';', start);
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		} 
	}
	return '';
}

/*** Function for easier API calling ***/

function callAPI(data, method, callback, addurl) {
	data.format = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php' + (addurl?addurl:''),
		type: method,
		cache: false,
		success: function(response) {
			if (response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) { alert('AJAX error: ' + error) }
	});
}

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Intro for Exchange Namespace */
importScript('MediaWiki:Common.js/exchangeintro.js');

/* Intro for Update Namespace */
importScript('MediaWiki:Common.js/updateintro.js');

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

/* Shops interface interactivity */

importScript('MediaWiki:Common.js/shops.js');

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');

/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');

/*-- Collapsible Tables --*/
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Standard Edit Summaries- deleted by host on 2019-9-6.
importScript('MediaWiki:Common.js/standardeditsummaries.js');*/

/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log","Special:Contributions", "Forum:Yew_Grove",  "Special:NewFiles"];

var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxrefresh.js');

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Embedding hack for multi-media files */
importScript('MediaWiki:Common.js/embedding.js');

/* Added SiteNotice Functionality */
importScript('MediaWiki:Common.js/sitenotice.js');

/* Remove unnecessary items in Wikia Game Guides */
importScript('MediaWiki:Wikiaapp.js');

/* Add MyContributions to AccountNavigation */
importScript('MediaWiki:Common.js/accountNavigation.js');

// ==================================================================
// Item Compare Overlays
// ==================================================================
$(function() {
	if ($('#WikiaArticle .cioCompareLink,#bodyContent .cioCompareLink').size() > 0) {
		importScript('User:Quarenon/compare.js');
		importStylesheet('User:Quarenon/compare.css');
	}
});

// ==================================================================
// Dynamic Templates
// ==================================================================
$(function() {
	if ($('#WikiaArticle pre.jcConfig,#bodyContent pre.jcConfig').size() > 0) {
		importScript('MediaWiki:Common.js/calc.js');
		importStylesheet('MediaWiki:Common.css/calc.css');
	}
});

// ==================================================================
// Insert username 
// ==================================================================
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

// ==================================================================
// Hide Auto-uploads
// ==================================================================
if (wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Log") {
    importScript('User:AzBot/HideBotUploads.js');
}

// ==================================================================
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: Cacycle
// ==================================================================
if (wgArticleId == 0 && wgUserName) {
	var slash = wgPageName.indexOf('/');
	var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
	var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
	var ext = null;
	if (norm == test + 'js') ext = 'js';
	else if (norm == test + 'css') ext = 'css';
	if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
}

// ==================================================================
// Description: Adds row highlighting to various wiki-tables.
// ==================================================================

$(document).ready(function() {
	var lightCookieLen = 20;
	var lightCookie = getCookie('lightTable').split('');
 
	function HighlightRow(el, val) {
		var cssText = '';
		if (val == '2') {
			cssText = 'background-color: #CCC !important';
		} else if (val == '1') {
			cssText = 'background-color: #CFC !important';
		}
		$(el).children('td').css('cssText', cssText);
	}
 
	function save() {
		setCookie('lightTable', lightCookie.join(''), 60 * 60 * 24 * 7);
	}
 
	if ( wgCanonicalNamespace == 0 ) {
		while (lightCookie.length < lightCookieLen) {
			lightCookie.push('0');
		}
 
		$('#lighttable tr').each(function(i) {
			HighlightRow(this, lightCookie[i]);
 
			$(this).mouseover(function() {
				HighlightRow(this, 2);
			}).mouseout(function() {
				HighlightRow(this, lightCookie[i]);
			}).click(function() {
				lightCookie[i] = 1 - lightCookie[i];
				HighlightRow(this, lightCookie[i]);
				save();
			});
		});
 
		$('#lighttable').append(  //TODO: Apply to each table on page
			$('<tr />').append(
				$('<th />').attr('colspan', '7').append(
					$('<input />').attr('type', 'button').val('Reset').click(function() {
						$('#lighttable tr').each(function(i) {
							lightCookie[i] = '0';
							HighlightRow(this, lightCookie[i]);
						});
						save();
					})
				)
			)
		);
	}
});

/**
 * Switch Infobox -- Allows multiple infoboxes to be seamlessly switched.
 * Required template: http://runescape.wikia.com/wiki/Template:Switch_infobox
 * Required stylesheet: http://runescape.wikia.com/wiki/User:Matthew2602/SwitchInfobox.css
 */
 
// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
} );
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
        // The switch triggers
        var triggers = $( this ).children( '.switch-infobox-triggers' );
 
        $( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// Does the actual switching
$( '.switch-infobox' ).find( '.switch-infobox-triggers' ).children( '.trigger' ).click( function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $( this ).parents( '.switch-infobox' );
    // Hides items showing
    parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
    // Show the relevant item
    parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
} );
 
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent .wikia-gallery-add a').unbind('click').click(function(){return false;});
});

// =====================================================================
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
//
// =====================================================================
 
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

//Keeping the last tab you hover over opened

$(function() {
	$('.showbutton').mouseover(function() {
		// Get the outermost panel
		var $top = $(this).parents('.showbutton').last();
		$top = $top.size() > 0 ? $top : $(this);

		// Change the panel which has the deftext class based on the mouseover
		$('.deftext', $top).removeClass('deftext').addClass('showtext');
		$(this).children('.showtext').removeClass('showtext').addClass('deftext');

		// Stop event bubbling
		return false;
	});
});

addOnloadHook(function() {
        if ($('table.sortable th.autosort .sortheader').length) {
                ts_resortTable($('th.autosort .sortheader')[0]);
                ts_resortTable($('th.autosort .sortheader')[0]);
        }
})

/* </pre> */