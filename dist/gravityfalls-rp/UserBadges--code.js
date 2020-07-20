
//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/*jshint curly:false smarttabs:true laxbreak:true laxcomma:true jquery:true browser:true */
/*global importArticle mediaWiki */
 
/**
 * This script is a loader thunk.
 * It converts people still using UserBadges to UserTags by converting their
 * configuration data and importing UserTags instead.
 *
 * This should be avoided as it's slower than loading UserTags directly.
 */
 
 
importArticle({type: 'script', article:'w:c:dev:UserTags/code.js'});
 
// Convert configuration block to be usable with UserTags
// We don't enable all of UserTags' default features as I want the behaviour to be indistinguishable
if (!window.UserTagsJS)
window.UserTagsJS = (function(oldConf) {
	"use strict";
	var newConf = { tags: {}, modules: {} };
 
	// Legacy default configuration for mirroring purposes
	oldConf = $.extend({
		inactive: 30, // Inactive if no edits in this many days, 0=disabled
		gone: {},
		groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 /*Added->*/, bannedfromchat:1, bot:1, sysop:1, 'bot-global':1 },
		stopBlocked: true, // Don't display any non-custom badges for blocked users
		newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
		nonusers: true, // Tag global Wikia accounts that have never edited anything
		custom: {}, // Map of user names to arrays of strings
		names: {} // Badge display names
		//debug: false
	}, oldConf);
 
	// 1-to-1
	newConf.modules.inactive = oldConf.inactive;
	newConf.modules.stopblocked = !!oldConf.stopBlocked;
	newConf.modules.autoconfirmed = newConf.modules.newuser = !!oldConf.newusers;
	newConf.modules.nonuser = !!oldConf.nonusers;
 
	// Convert map to array
	newConf.modules.mwGroups = [];
	if (!$.isEmptyObject(oldConf.groups)) {
		for (var g in oldConf.groups) {
			if (oldConf.groups.hasOwnProperty(g)) {
				if (!oldConf.groups[g]) continue;
				newConf.modules.mwGroups.push(g);
			}
		}
	}
 
	// Forced config
	// These were forced in the old design but aren't forced in UserTags
	newConf.modules.mwGroups.push('bannedfromchat', 'sysop');
 
	// Now the hard part.
	// We need to convert both custom+names to tags AND configure the custom module
	if ($.isPlainObject(oldConf.names) && !$.isEmptyObject(oldConf.names)) {
		newConf.tags = oldConf.names;
	}
	var arr, user;
	if ($.isPlainObject(oldConf.custom) && !$.isEmptyObject(oldConf.custom)) {
		newConf.modules.custom = {};
		var i, len, guid = 0, id;
		for (user in oldConf.custom) {
			if (oldConf.custom.hasOwnProperty(user)) {
				arr = oldConf.custom[user];
				if (!$.isArray(arr)) continue;
 
				newConf.modules.custom[user] = [];
				for (i = 0, len = arr.length ; i < len ; ++i) {
					id = 'UserBadges-Legacy-' + guid++;
					// order:0 = mediaWiki, we want offset from those
					newConf.tags[id] = { u: arr[i], order: i+1 };
					newConf.modules.custom[user].push(id);
				}
			}
		}
	}
 
	// Gone list is more custom tags
	if ($.isPlainObject(oldConf.gone) && !$.isEmptyObject(oldConf.gone)) {
		newConf.modules.custom = (newConf.modules.custom || {});
		for (user in oldConf.gone) {
			if (oldConf.gone.hasOwnProperty(user)) {
				if (!oldConf.gone[user]) continue;
				arr = (newConf.modules.custom[user] || []);
				arr.push('inactive');
				newConf.modules.custom[user] = arr;
			}
		}
	}
 
	// Monobook styles, since UserBadges dealt with this itself
	if (({wikia:1, oasis:1})[mediaWiki.config.get('skin')] !== 1) {
		mediaWiki.util.addCSS(
			  '.tag:before {'
			+ 'content: "["'
			+ '}'
			+ '.tag:after {'
			+ 'content: "]"'
			+ '}'
			+ '.tag {'
			+ 'font-size: 10pt;'
			+ 'vertical-align: middle;'
			+ '}'
			+ '.tag-container > .tag:first-child {'
			+ 'margin-left: 1ex;'
			+ '}'
		);
	}
 
	return newConf;
})(window.UserBadgesJS || {});
try { delete window.UserBadgesJS; } catch(e) { window.UserBadgesJS = null; /* IE8 sucks */ }
 
//</syntaxhighlight>