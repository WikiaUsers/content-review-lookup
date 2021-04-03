/*<pre>*/

// ArchiveTool
var archiveListTemplate = 'ArchiveList';
var archivePageTemplate = 'ArchivePage';
importScriptPage('ArchiveTool/code.js', 'dev');

$(function() {
  if ( skin === "monaco" ) {
    var $siteNotice = $('#siteNotice');
    $siteNotice.find('script').remove();
    $siteNotice.insertBefore('#article');
    $siteNotice.find('table table').appendTo($siteNotice);
    $siteNotice.find('#mw-dismissable-notice').remove();
  } else if ( skin === "oasis" || skin === "wikia" ) {
    // START Notification Bubble Integration
/*jQuery(function($) {
	
	function hasNotificationBubble() {
		return !!$("#WikiaNotifications li").length;
	}
	
	function ensureWikiaNotificationsArea() {
		if ( $('#WikiaNotifications').length )
			return;
		$('<ul id="WikiaNotifications" class="WikiaNotifications" />').prependTo('#WikiaFooter .toolbar');
	}

function addNotificationBubble(msg, onclose) {
		var $li = $('<li />');
		var $div = $('<div data-type=2 />').html(msg).appendTo($li);
		$('<a class="sprite close-notification" />')
			.click(function() {
				$(this).closest('li').remove();
				if ( onclose )
					onclose.apply(this, arguments);
			})
			.prependTo($div);
		ensureWikiaNotificationsArea();
		$li.appendTo("#WikiaNotifications");
	}
	function doReaderNotice(msg, id) {
		if ( hasNotificationBubble() )
			// Only display a reader bubble when nothing else is using the area
			return;
		
		var cookieName = "readernotice_bubble_dismiss";
		
		if ( $.cookies.get(cookieName) === id.toString() )
			return;
		
		addNotificationBubble(msg, function() {
			$.cookies.set(cookieName, id.toString(), { hoursToLive: 30*24 });
		});
	}
});*/
    // END Notification Bubble Integration
  } else {
 $('#mw-dismissable-notice > tbody > tr > td:last').remove();
  }
if( ( wgAction === "edit" && wgNamespaceNumber > -1 && wgNamespaceNumber % 2 === 0 ) || wgPageName === "Special:CreatePage" )
    $("<div class=warningmessage><hr><center><strong> Ōkami Wiki contém spoilers! Leia sabendo do risco!</strong></center><hr></div>")
      .prependTo(skin === "oasis" || skin === "wikia" ? '#WikiaArticle' : '#bodyContent');
  if( wgAction === "edit" && wgNamespaceNumber === 8 && wgTitle === "Monaco-sidebar" ) {
    $("#bodyContent #wikiPreview ul li").each(function() {
      var n = this;
      var texts = this.firstChild.nodeValue.replace(/^\s+/, "").replace(/\s+$/, "").split("|");
      n.removeChild(n.firstChild);
      var before = n.firstChild; texts.forEach(function(text, i) {
        if ( i )
          n.insertBefore(document.createTextNode("|"), before);
        if ( /[#:]/.test(text) )
          n.insertBefore(document.createTextNode(text), before);
        else
          n.insertBefore($("<a/>").attr({href: wgArticlePath.replace("$1", "MediaWiki:"+text.replace(/^\s+/, ""))}).text(text)[0], before);
      });
    });
  }
});

/* Function to only let logged in users edit */
$wgGroupPermissions['anon']['edit']              = false;
$wgGroupPermissions['user']['edit']           = true;
$wgAutopromote['emailconfirmed'] = APCOND_EMAILCONFIRMED;
$wgImplicitGroups[] = 'emailconfirmed';
$wgGroupPermissions['emailconfirmed']['edit'] = true;

/* add contribs to user menu*/
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Contributions</a></li>');
}

/*</pre>*/

/*spoiler warning*/
if( ( wgAction === "edit" && wgNamespaceNumber > -1 && wgNamespaceNumber % 2 === 0 ) || wgPageName === "Special:CreatePage" )
    $("<div class=warningmessage><hr><center><strong> Ōkami Wiki contém spoilers! Leia sabendo do risco!</strong></center><hr></div>")
      .prependTo(skin === "oasis" || skin === "wikia" ? '#WikiaArticle' : '#bodyContent');

// ================================================================
// BEGIN - Username replace function 
// * Description: Inserts user name into <span class="insertusername"></span>
// ================================================================
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
 
// ================================================================
// END - Username replace function 
// ================================================================

// "expandable" class show/hide buttons showing

if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  var script  = document.createElement( 'script' );
  script.src  = 'bulbapedia.bulbagarden.net/wiki/index.php?title=User:Poke/CollapsibleTables.js&action=raw&ctype=text/javascript&smaxage=18000&action=raw&maxage=18000';
  script.type = 'text/javascript';
  document.getElementsByTagName( 'head' )[0].appendChild( script );
  
  hookEvent( 'load', function()
  { new CollapsibleTables(); } );
}