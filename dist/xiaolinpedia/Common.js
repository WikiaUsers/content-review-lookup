/* Script Imports */
importArticles({
    type: "script",
    articles: [
	"w:c:dev:Countdown/code.js",
	"w:c:dev:LockOldBlogs/code.js",
	"MediaWiki:Common.js/fanonmodule.js",
	"w:c:dev:ReferencePopups/code.js",
	"w:c:terraria:MediaWiki:Common.js/StandardEditSummaries.js",
	"w:c:dev:DisplayClock/code.js",
    ]
});
 
/* Wrappers */
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/11/Btn_toolbar_liste.png",
     "speedTip": "List",
     "tagOpen": "\n* ",
     "tagClose": "\n* Element B\n* Element C",
     "sampleText": "Element A"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/88/Btn_toolbar_enum.png",
     "speedTip": "Numbering",
     "tagOpen": "\n# ",
     "tagClose": "\n# Element 2\n# Element 3",
     "sampleText": "Element 1"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_blockquote.png",
     "speedTip": "Blockquote",
     "tagOpen": "<blockquote>",
     "tagClose": "</blockquote>",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Note",
     "tagOpen": "{{Info|Insert title|",
     "tagClose": "}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Category",
     "tagOpen": "[[Category:",
     "tagClose": "]]",
     "sampleText": "Category name"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png",
     "speedTip": "Picture gallery",
     "tagOpen": "\n<gallery>\nImage:",
     "tagClose": "|[[Xiaolinpedia]] Logo\nImage:Wiki.png|[[Xiaolinpedia]] Logo\nImage:Wiki.png|Eine [[Xiaolinpedia]] Logo\n<\/gallery>",
     "sampleText": "Wiki.png"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
     "speedTip": "Template",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Template"};
  }

/** Hiding things with JS ******
  *
  * This should only be used when necessary. You can also use CSS hiding, but must also be used when necessary.
*/

 function hideObjects() {
   if(skin=='oasis'){
     $('#WikiaArticle .jshidden').hide();
   } else if( skin=='monobook' ) {
     $('#bodyContent .jshidden').hide();
   }
 }

 addOnloadHook( hideObjects );

/* Sliders using jquery - by Tierrie */
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
} );
/* END Sliders using jquery - by Tierrie */

//From Admin tools Wiki
// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
// END Redesign of ProfileMastheads

/* Auto updating recent changes opt-in */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:NewFiles","Special:Forums"];
importScriptPage('AjaxRC/code.js', 'dev');



$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

var ShowHideConfig = { 
	autoCollapse: 3,
	en: {
		show: "+",
		hide: "-",
		showAll: "expand all",
		hideAll: "collapse all"
	}
};

importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('EditIntroButton/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

importScript('MediaWiki:Chat-headline');
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

$("table").delegate('td','mouseover mouseleave', function(e) {
    if (e.type == 'mouseover') {
      $(this).parent().addClass("hover");
      $("colgroup").eq($(this).index()).addClass("hover2");
    }
    else {
      $(this).parent().removeClass("hover");
      $("colgroup").eq($(this).index()).removeClass("hover2");
    }
});

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};

$( function ($) {
	var monoBookText = window.monoBookText || 'See in Monobook';
	var oasisText = window.oasisText || 'Oasis';
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">'+ monoBookText +'</a></li>' ).appendTo( '.WikiaPageHeader' );
		} else {
			$( '<li id="ca-skins"><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">'+ oasisText +'</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		}
	}
} );

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   LIRoptions = {
	bottomMessage: 'This appears below the buttons on Special:MovePage',
	editSummary: 'Updating file link (automatic)',
	singleButtonText: 'Replace',
        queueButtonText: 'Queue'
   }
 
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

addOnloadHook(function() {$('head').append('<style type="text/css">' + $('#css').html() + '</style>');});

importScript('MediaWiki:Common.js/userCSS.js');