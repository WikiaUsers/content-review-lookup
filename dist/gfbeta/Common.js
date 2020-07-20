/* Any JavaScript here will be loaded for all users on every page load. */

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://assassinscreed.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
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

/* External Image Loader */
importScriptPage('ExternalImageLoader/code.js', 'dev');

/* Wall Greeting */
importScriptPage('WallGreetingButton/code.js', 'dev')

/* Layout Switch Button */
window.monoBookText = "MonoBook Layout";
window.oasisText = "Wikia Layout";
window.mobileText = "Mobile View";
importScriptPage('SkinSwitchButton/code.js', 'dev');

/* Search Suggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Timed Slider */
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});

/* Visual Spell Check */
importScriptPage('VisualSpellCheck/code.js','dev');

/* Floating TOC */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

/* Reveal Anonymous IP */

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 15,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
			}
};
UserTagsJS.modules.custom = {
};
UserTagsJS.modules.userfilter = {
};
UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];

/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');

/* Clock */
importScriptPage('DisplayClock/code.js', 'dev');
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');