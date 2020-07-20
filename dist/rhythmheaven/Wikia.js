importArticles({
   type:'script',
   articles: [
        /*####################################*/
        /*##### Developer's Wiki Imports #####*/
        /*####################################*/
		// Adds button to toolbar that brings you to the top of the page
	'w:c:dev:BackToTopButton/code.js',
		// Adds customized table collapsing
	'w:c:dev:ShowHide/code.js',
		// Automatically drops-down edit button when hovered hover
	'w:c:dev:ListFiles/code.js',
		// Adds "View Source" to edit drop-down
	'w:c:dev:AutoEditDropdown/code.js',
		// Adds purge option to edit button drop-down
	'w:c:dev:PurgeButton/code.js',
		// Adds "edit intro" to edit drop-down
	'w:c:dev:EditIntroButton/code.js',
		// Reveals IP address instead of "A Wikia Contributor"
	'w:c:dev:RevealAnonIP/code.js',
		// Removes redirects to Special:ListFiles
	'w:c:dev:View_Source/code.js',
		// Adds reference popups like on Wikipedia
	'w:c:dev:ReferencePopups/code.js',
		// Adds Javascript countdown option
	'w:c:dev:Countdown/code.js',
        /*####################################*/
        /*######## Other Wiki Imports ########*/
        /*####################################*/
		// Adds "cancel" button in editing screen
	'w:c:admintools:MediaWiki:Wikia.js/cancelButton.js',
		// Adds standard edit summaries
	'w:c:terraria:MediaWiki:Common.js/StandardEditSummaries.js',
		// Adds display timer to global navigation with link to ?action=purge
	'w:c:avatar:MediaWiki:Common.js/wallgreetingbutton.js',
		// Adds Ajax RC
	'w:c:candybox:MediaWiki:Common.js/ajax.js',
		// Adds custom user tags to profile mastheads
	'MediaWiki:Wikia.js/userRightsIcons.js',
		// Adds ticker sliding message
	'MediaWiki:Wikia.js/Ticker.js',
		// Adds "edit count" to user tabs
	'MediaWiki:Wikia.js/editCount.js',
	]
});
 
var monoBookText = 'MonoBook',
    oasisText = 'Oasis';
 
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}
 
/* Insert username for {{USERNAME}} */
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

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
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
     "speedTip": "Support",
     "tagOpen": "{{Support}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
     "speedTip": "Oppose",
     "tagOpen": "{{Oppose}}",
     "sampleText": "Insert text"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
     "speedTip": "Neutral",
     "tagOpen": "{{Neutral}}",
     "sampleText": "Insert text"};
  }

/* Adds icons to page header bottom border */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

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
} );