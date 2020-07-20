/*<pre>*/
/* Recent Changes Auto Refresh */
importScriptPage( 'AjaxRC/code.js', 'dev' );

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=86400&templates=expand');

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
	
	if ( $.cookies.get("readernotice_bubble_dismiss") === "1" ) {
		doReaderNotice('Sorry if you already answered our survey, but we had issues with the last one. If you still have time please <a href="http://www.surveymonkey.com/s/narutopedia-look-survey">fill out our new survey</a>.', 2);
	} else {
		doReaderNotice('We\'d like to know what you think of Wikia\'s new look, if you have time please <a href="http://www.surveymonkey.com/s/narutopedia-look-survey">fill out this survey</a>.', 2);
	}
});*/
    // END Notification Bubble Integration
  } else {
    $('#mw-dismissable-notice > tbody > tr > td:last').remove();
  }
  if( ( wgAction === "edit" && wgNamespaceNumber > -1 && wgNamespaceNumber % 2 === 0 ) || wgPageName === "Special:CreatePage" )
    $("<div class=warningmessage>Do <strong>not</strong> add new manga information to the wiki until the entire chapter is available.</div>")
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

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
function FairUseRationale() {
	if((wgPageName == 'Special:Upload') && document.getElementById('wpDestFile').value == '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
}
addOnloadHook(FairUseRationale);
 
// ****** END: JavaScript for [[Special:Upload]] ******

/* Custom Edit buttons - http://en.wikipedia.org/wiki/User:MarkS/Extra_edit_buttons */
 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
     "speedTip": "Add a Chapter Reference",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "''Naruto'' chapter 0, page 0"};
  }

/*</pre>*/