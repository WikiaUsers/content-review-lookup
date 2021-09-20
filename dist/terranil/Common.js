/* Any JavaScript here will be loaded for all users on every page load.                      */
/* JS placed here is optional and will force the equalization the main page layout columns   */
/*                                                                                           */
/* This section js has been moved to two different pages: MediaWiki:3colmainpage.js and      */
/* MediaWiki:2colmainpage.js                                                                 */
/* Wiki managers can either use one or the other for their wiki and overwrite this page with */
/* customized version, or use the import commands shown below                                */
/*                                                                                           */
/* The following is for the regular 2 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:2colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/*                                                                                           */
/* The following is for the regular 3 column responsive main page                            */
/*                                                                                           */
/* mw.loader.load('/index.php?title=MediaWiki:3colmainpage.js&action=raw&ctype=text/javascript'); */
/*                                                                                           */
/* ***************************************************************************************** */

// ArticlesAsResources.js by Sophie and Dorumin because Fandom haven't added their own version for ImportJS to work on Gamepedia.
mw.loader.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts').then(function() {
	importArticles({
		type: 'script',
		articles: [
			"u:dev:MediaWiki:AddRailModule/code.js", // dev.fandom.com/wiki/AddRailModule
			"u:dev:MediaWiki:BackToTopButton/code.js", // dev.fandom.com/wiki/BackToTopButton
			"u:dev:MediaWiki:BalancedTabber.js", // dev.fandom.com/wiki/BalancedTabber
			"u:dev:MediaWiki:DiscordIntegrator/code.js", // dev.fandom.com/wiki/DiscordIntegrator
			"u:dev:MediaWiki:MessageBlock/code.js", // dev.fandom.com/wiki/MessageBlock
			"u:dev:MediaWiki:ModernLightbox.js", // dev.fandom.com/wiki/ModernLightbox
			"u:dev:MediaWiki:ProtectionIcons.js", // dev.fandom.com/wiki/ProtectionIcons
			"u:dev:MediaWiki:PreloadTemplates.js", // dev.fandom.com/wiki/PreloadTemplates
			"u:dev:MediaWiki:ProfileTags.js" // dev.fandom.com/wiki/ProfileTags
		],
	});
});

// Credits to the Among Us Wiki for Rollbacks UserTag Customisation //
window.dev = window.dev || {};

window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};

// Prevents existing tags from being hidden
// https://dev.fandom.com/wiki/ProfileTags
window.dev.profileTags = { noHideTags: true };

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Add user tag to rollbacks
var rollbackTagLoader = setInterval(function() {
	if ($('.user-identity-box').length) {
		clearInterval(rollbackTagLoader);

		var user = mw.config.get('profileUserName'),
			$masthead = $('.user-identity-box .user-identity-header__attributes');

		if (user) { // This page has a user profile
			$.getJSON(mw.util.wikiScript('api') + '?action=query&format=json&list=users&usprop=groups&ususers=' + mw.util.rawurlencode(user), // Check user's groups
			function(data) {
				if (data.query.users[0].groups.includes('rollback')) { // The user is a rollback
					$span = $('<span />').addClass('user-identity-header__tag tag-rollback').text('Rollback');
					$masthead.append($span, ' ');
				}
			});
		}
	}
}, 100);