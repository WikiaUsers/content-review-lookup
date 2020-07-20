// 12:58, January 17, 2016 (UTC)
// <source lang="JavaScript">

// Setup  UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
        founder: { u:'Founder', order: 0 },
        adopter: { u:'Adopter', order:0 },
        bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats', order: 1 },
        sysop: { u:'Administrator', link:'Project:Administrators', order: 2 },
        testadmin: { u:'Testing Administrator', link:'Project:Administrators', order: 3 },
        abusefiltermanager: { u:'Abuse Filter Manager', link:'Help:AbuseFilter', order: 4 },
        bot: { u:'Bot', link:'Project:Bots', order: 5 },
        'content-moderator': { u:'Content Moderator', link:'Project:Content Moderators', order: 6 },
        threadmoderator: { u:'Discussion Moderator', link:'Project:Discussion Moderators', order: 7 },
        rollback: { u:'Rollback', link:'Project:Rollbacks', order: 8 },
        chatmoderator: { u:'Chat Moderator', link:'Project:Chat Moderators', order: 9 }
	}
};
 
UserTagsJS.modules.custom = {
        'Artix Kreiger': ['adopter'],
        'Bluegoblin7':  ['founder'],
	'RyanCross': ['adopter']
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'testadmin',
    'abusefiltermanager',
    'bot',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'chatmoderator'
];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.metafilter = {
	'inactive': ['nonuser'],
};
// END Setup UserTags

// Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Oasis
importScriptPage('MediaWiki:Wikia.js/accountNavigation.js', 'admintools');
// END Add Special:Contributions, Special:Watchlist, & Special:Following to AccountNavigation in Oasis

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

// Add additional choices to OnTheWiki
importScriptPage('MediaWiki:Wikia.js/OnTheWiki.js', 'admintools');
// END Add additional choices to OnTheWiki

// Add CategoryRenameAuto-update
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
    importScriptPage('MediaWiki:CategoryRenameAuto-update/code.js', 'dev');
}
// END Add CategoryRenameAuto-update

// Add script for positioning top icons
importScriptPage('MediaWiki:Wikia.js/icons.js', 'admintools');
// END Add script for positioning top icons

// </source>