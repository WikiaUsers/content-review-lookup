// LockOldBlogs config - http://dev.wikia.com/wiki/LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. Comments have been disabled.",
    nonexpiryCategory: "Not Archived"
};

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:LockOldBlogs/code.js',
        'w:c:dev:AutoEditDropdown/code.js',
        'u:dev:SearchSuggest/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:dev:InactiveUsers/code.js',
        'MediaWiki:Common.js/CEB.js',
        'w:c:dev:Countdown/code.js'
    ]
});


/* HoverImage */
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});

/** Collapsible tables *********************************************************
 *

 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
 
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		} else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ( element = element.parentNode ) {
				if ( hasClass( element, 'outercollapse' ) ) {
					collapseTable( i );
					break;
				}
			}
		}
	}
}
 
addOnloadHook( createCollapseButtons );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically Refreshes the Page';
var ajaxindicator = 'https://images.wikia.nocookie.net/__cb20120926174803/dev/images/8/82/Facebook_throbber.gif';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* News Ticker */

			function fixXMLData(data) {
				if ($.browser.msie && typeof data == 'string') {
					var xml = new ActiveXObject("Microsoft.XMLDOM");
					xml.async = false;
					data = data.replace(/<\?xml-stylesheet[^?>]*\?>/g, '');
					xml.loadXML(data);
					data = (data.indexOf('<?xml') != -1) ? xml.firstChild.nextSibling : xml.firstChild;
				} else {
					data = $.trim(data.replace('<?xml version="1.0" encoding="UTF-8"?>', ''));
				}
				return data;
			}

			var tickerItems = [];
			function listenFlash(action, data) {
				if (action == "setBlogData") {
					data = data.replace(/<title/g, '<entry_title').replace(/<\/title/g, '</entry_title');
					data = fixXMLData(data);
					$('entry', data).each(function() {
						tickerItems.push('News Ticker: <a href="javascript: location.href = \'http://piratesonline.go.com/#\' + NewBlogURLHash(\'' + $(this).find('id').text() + '\');">' + $(this).find('entry_title').text() + '</a>');
					});
					animateTicker();
				}
				if (action=="setFlashReady") {
					thisMovie('ticker_swf').callFlash("getBlogData", "<xml><jscall>listenFlash</jscall><url>http://blog.piratesonline.go.com/blog/pirates/feed2/entries/atom?numEntries=3</url></xml>");
				}
				if (action == "blogDataLoadError") {
					// Fail
				}
				if (action == "error") {
					// Fail
				}
			}
			function NewBlogURLHash(url) {
				var hash = "http://piratesonline.go.com/#/news_blog" + url.substring(n,url.length);
				return hash;
			}

			function animateTicker() {
				animateTicker.count = (++animateTicker.count >= tickerItems.length) ? 0 : animateTicker.count;

				$('.content .tickerItems .items').fadeOut('slow', function() {
					$('.content .tickerItems .items').html( tickerItems[animateTicker.count] ).fadeIn('slow', function() {
						setTimeout(animateTicker, 5000);
					});
				});
			}
			animateTicker.count = 0;
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/* End of the {{USERNAME}} replacement */
/* End News Ticker */