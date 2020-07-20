/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
   $('#show_season_episodes').click(function(event) {
       event.preventDefault()
       $('#season_episodes').toggle();
       return true;
   }).find('a').attr('href', '#');
});
/* Credits to Dev Wiki and Sam and Cat Wiki */

importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		'w:dev:ReferencePopups/code.js',
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
		"w:dev:VisualSpellCheck/code.js",
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/displayclock.js",
		"MediaWiki:Common.js/insertusername.js",
	]
});
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u: 'Bureaucrat' },
		rollback: { u: 'Spam Team' },
	}
};
UserTagsJS.modules.custom = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


// Backwards compatibility CSS
importScriptPage('MediaWiki:Common.js/backupCSS.js', 'the pretender');

// Display Timer
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'the pretender');

// Edit intro button
importScriptPage('MediaWiki:Common.js/EditIntroButton.js', 'the pretender');

// Template:Username
importScriptPage('MediaWiki:Common.js/Username.js', 'the pretender');

// Custom edit button
importScriptPage('MediaWiki:Common.js/CEB.js', 'the pretender');

// Showhide
importScriptPage('ShowHide/code.js', 'dev');

// Standard edit summaries
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'the pretender');

// Title rewrite
importScriptPage('MediaWiki:Common.js/titlerewrite.js', 'the pretender');

// Additional UserRights Icons in profile mastheads
importScriptPage('MediaWiki:Common.js/userRightsIcons.js', 'the pretender');