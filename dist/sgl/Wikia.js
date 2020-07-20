/* Any JavaScript here will be loaded for all users on every page load. */
/* Please don't change without Admin's permission. That means another Admin, not just you. */
 
// importScriptPage('MediaWiki:Wikia.js/rights-list.js', 'htmlcss');
// importScriptPage('MediaWiki:Wikia.js/to-do-list.js', 'htmlcss');
// importScriptPage('MediaWiki:Wikia.js/localScroll.js', 'htmlcss');
 
$().ready(function(){
 
});
 
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c7/B.WARNING_1.png/revision/latest?cb=20110102062219",
     "speedTip": "Header 1",
     "tagOpen": "==",
     "tagClose": "==",
     "sampleText": "Header Text"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/54/B.WARNING_2.png/revision/latest?cb=20110102062220",
     "speedTip": "Header 2",
     "tagOpen": "===",
     "tagClose": "===",
     "sampleText": "Header Text"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/4/43/Button-template.png/revision/latest?cb=20150823102547&format=webp",
     "speedTip": "Add template",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "templatename"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/c/c4/Button_ref.png/revision/latest?cb=20081020123248&format=webp",
     "speedTip": "Add a reference",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "reftext"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/4/49/Button_talk.png/revision/latest?cb=20080209054415&format=webp",
     "speedTip": "Add a wikia user link",
     "tagOpen": "[[user:",
     "tagClose": "]]",
     "sampleText": "username"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a4/TableStart.png/revision/latest?cb=20070927085428&format=webp",
     "speedTip": "Table start and end",
     "tagOpen": "{|",
     "tagClose": "|}",
     "sampleText": "add table code"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/e/ea/Button_align_left.png/revision/latest?cb=20090417031656&format=webp",
     "speedTip": "Move text left",
     "tagOpen": "<left>",
     "tagClose": "</left>",
     "sampleText": "text"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a5/Button_align_right.png/revision/latest?cb=20081020112018&format=webp",
     "speedTip": "Move text right",
     "tagOpen": "<right>",
     "tagClose": "</right>",
     "sampleText": "text"
   };
}
 
if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://vignette.wikia.nocookie.net/central/images/5/5f/Button_center.png/revision/latest?cb=20081020114414&format=webp",
     "speedTip": "Move text to center",
     "tagOpen": "<center>",
     "tagClose": "</center>",
     "sampleText": "text"
   };
} 
$(window).ready(function (){
        var nobr = $('#nobr'); // Use jQuery CSS-selector feature to find all elements with id="nobr".
        if(nobr.length > 0){ // If there are any...
            nobr.each(function (){ // call this function as a method of each one:
                    var that = $(this); // Get jQuery's representation of the element (needed within the click handler).
                    var contents = that.contents() // The contents are in jQuery representation too.
                        .replaceWith($(document.createElement('a')) // Replace them with a link...
                            .attr('href', '#') // that doesn't really point anywhere and says...
                            .append(document.createTextNode('Click here, but note that this will mess up the page\'s layout.'))
                            .click(function (event){ // When the link is clicked...
                                    that.contents().replaceWith(contents); // replace it with the original contents.
                                    event.preventDefault() // And make sure that # isn't added to the URL so the Back button still works.
                                    return false; // Ignored by jQuery, but doesn't hurt; this is the non-standard way to preventDefault.
                                        // It's necessary for cross-browser compatibility when jQuery is absent.
                                }));
                });
        }
    });
 
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length === 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
 
function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv === null || titleDiv === undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite
 
addOnloadHook(rewriteTitle);
 
/*
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=151981424827777&amp;connections=5" align="top" frameborder="0" width="300" height="175" scrolling="yes" />');
}
*/
 
$(fBox);
 
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);
 
 
/*
// Start of SSgtGriffin's personal YouTube widget 
function SSgtGriffinYouTubeBox() {
        $('#SSgtGriffinYouTubeBox').append('<iframe id="fr" src="http://www.youtube.com/subscribe_widget?p=SSgtGriffin" style="overflow: hidden; height: 105px; width: 300px; border: 0;" scrolling="no" frameBorder="0" />');
}
 
$(SSgtGriffinYouTubeBox);
 
// End of SSgtGriffin's personal YouTube widget
 
 
// Start of the SSgtGriffin Facebook like box
function SSgtGriffinFacebookBox() {
	$('#SSgtGriffinFacebookBox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=176961448998164&amp;connections=5" align="top" frameborder="0" width="300" height="175" scrolling="no" />');
}
 
$(SSgtGriffinFacebookBox);
// End of SSgtGriffin Facebook like box
 
 
function SSGfbButton() {
        $('#SSGfbButton').append('<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FSSgtGriffin%2F176961448998164&amp;layout=button_count&amp;show_faces=false&amp;width=450&amp;action=like&amp;font=arial&amp;colorscheme=dark&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>');
}
 
$(SSGfbButton);
 
// Start of SSgtGriffin's Twitter button
function SSgtGriffinTwitter() {
	$('#SSgtGriffinTwitter').append('<a href="http://www.twitter.com/SSgtGriffin"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-c.png" alt="Follow SSgtGriffin on Twitter"/></a>');
}
 
$(SSgtGriffinTwitter);
// End of SSgtGriffin Twitter button
 
/*
// SSgtGriffin Twitter Widget
function SSGTwitterBox() {
	$('#SSGTwitterBox').append('<script src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 4,
  interval: 6000,
  width: 250,
  height: 300,
  theme: {
    shell: {
      background: 'black',
      color: 'purple'
    },
    tweets: {
      background: '#000000',
      color: '#ffffff',
      links: '#4aed05'
    }
  },
  features: {
    scrollbar: false,
    loop: false,
    live: false,
    hashtags: true,
    timestamp: true,
    avatars: false,
    behavior: 'all'
  }
}).render().setUser('SSgtGriffin').start();
</script>');
}
 
$(SSGTwitterBox);
// End of SSgtGriffin Twitter Widget
*/
$(function() {
	if (wgCanonicalNamespace == 'Create') {   
		var replaceParagraph = $('#WikiaArticle #mw-content-text > p');
		var replaceParagraphContent = $('#WikiaArticle #mw-content-text > p').html();
		if(replaceParagraphContent == "Vote on more Community Choice Awards here!") {
			var replaceText = '<a href="http://www.wikia.com/Video_Games"; title="Vote on more Community Choice Awards here!"><img src="https://images.wikia.nocookie.net/wikiaglobal/images/7/78/Wikia_Community_Choice_awards.jpeg" alt="Vote on more Community Choice Awards here!" /></a>';
			replaceParagraph.html(replaceText);
		}
	}
// 05:22, December 25, 2013 (UTC)
// <source lang="JavaScript">
 
// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
importScriptPage('MediaWiki:Wikia.js/accountNavigation.js', 'admintools');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Wikia skin
 
// Restoring Special:Upload functionality
importScriptPage('MediaWiki:Wikia.js/uploadPhoto.js', 'admintools');
// END Restoring Special:Upload functionality
 
// Advertise new CHAT
importScript('MediaWiki:Wikia.js/chat.js');
// END Advertise new CHAT
 
// Restore Traditional [edit] button style
importScriptPage('MediaWiki:Wikia.js/editButton.js', 'admintools');
// END Restore Traditional [edit] button style
 
// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/copyright.js');
// END Adds copyright notice to siderail in Oasis
 
// Add CANCEL Button for new RTE
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
// END Add CANCEL Button for new RTE
 
// Add EditCount tab to user namespace
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'admintools');
// END Add EditCount tab to user namespace
 
// MediaWiki 1.19 fix
importScriptPage('MediaWiki:Wikia.js/personalSkin.js', 'admintools');
// END MediaWiki 1.19 fix
 
// </source>
});