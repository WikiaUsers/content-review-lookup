/* Any JavaScript here will be loaded for all users on every page load. */
//See also MediaWiki:ImportJS
importArticles({
    type: "script",
    articles: [
        'u:t3chbox:Wikia.js/vendorTimers.js',
        'MediaWiki:Common.js/countdown.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:MediaWiki:Countdown/code.js'
    ]
});

/* Adds bot flag to bot user pages */
if (wgPageName.match(/DestinyWikiBot|Silicon_Soldier_Bot/)) {
	if ($('.tag:contains("Admin")').length > 0) {
		$('.tag:contains("Admin")').text("Bot");
	} else {
		$('.masthead-info>hgroup').append("<span class=\"tag\">BOT</span>");
	}
}

// Core configuration. Adding in custom tags to replace user group defaults and adding custom user tags.
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Administrator', link:'Destiny_Wiki:Administrators' },
		bureaucrat: { u:'Bureaucrat', link:'Help:Group_rights#Bureaucrats' },
		newuser: { u:'Kinderguardian' },
		'content-moderator': { u:'Content Moderator', link:'Destiny_Wiki:Moderators#Content_moderator_abilities' },
		threadmoderator: { u:'Discussions Moderator', link:'Destiny_Wiki:Moderators#Discussion_moderator_abilities' },
		'mini-admin': { u: 'Wiki Moderator', link:'Destiny_Wiki:Moderators' },
		'discord-mod': { u: 'Discord Moderator' },
		lotd: { u: 'Lord of the Darkness' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Overlord Nazo': ['lotd']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 60; // Inactive if no edits in 60 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['content-moderator', 'threadmoderator'] // Replace content and discussion moderator tags, if both are present, and replace with 'mini-sysop'
};
UserTagsJS.modules.newuser = {
	days: 30, // Must have been on the Wiki for approximately a month
	edits: 15, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};