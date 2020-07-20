/*================================================================================

			Common.js on BlazBlue Fanon RP Wiki. Original: Gothicpedia and BlazBlue Wiki

   Placed here JavaScript will be loaded by every user, during page loading.

===============================================================================*/


//===============================================================================
// SCRIPT IMPORT
// In the last line don't put a comma!
//===============================================================================

importArticles({
	type: "script",
	articles: [
// Scripts on Wiki
	"MediaWiki:Common.js/userTags.js",			/* Descriptions of users groups in the user profile */
	"MediaWiki:Common.js/sourceButtons.js",		/* Additional buttons in source mode */
	"MediaWiki:Common.js/extraRollbacks.js",	/* Additional buttons for rollbackers - by Monchoman45 */ 
	"MediaWiki:Common.js/articleDropdown.js",	/* Additional options for dropdown menu */
	"MediaWiki:Common.js/slider.js",			/* New slider */
	"MediaWiki:Common.js/sliderjQuery.js",		/* Slider jQuery by Tierrie */
	"MediaWiki:Common.js/editSummaries.js",		/* Edit summaries */
	"MediaWiki:Common.js/addLicense.js",		/* Easy adding the license for uploaded files */
	"MediaWiki:Common.js/licences.js",			/* License select */
	"MediaWiki:Common.js/withoutLicense.js",	/* Warning for uploading files without license */
	"MediaWiki:Common.js/showhide.js",			/* Dropdown tables */
	"MediaWiki:Common.js/oldBlogPosts.js",		/* Block commenting for 90 days old blog posts */
	"MediaWiki:Common.js/userIP.js",			/* Show IP address */
	"MediaWiki:Common.js/ajax.js",              /* Auto-refresh */
	"MediaWiki:Common.js/displayTimer.js",		/* UTC clock above articles */
 // Import scripts from other Wiki
	"u:dev:VisualSpellCheck/code.js",			/* Spellcheck in visual mode */
	"u:dev:BackToTopButton/code.js",			/* Back to top button */
	"w:dev:ReferencePopups/code.js",			/* References */
    "u:dev:ListFiles/code.js",                  /* */
	"u:dev:DupImageList/code.js",               /* List of duplicated files */
	"u:dev:SearchSuggest/code.js",              /* Suggestions for search results */
	"u:dev:WallGreetingButton/code.js",         /* Edit button for greeting on Message Wall */
	"u:dev:ListAdmins/code.js",                 /* Automatic update of list of admins and bureaucrats */
	"u:dev:LockOldBlogs/code.js",				/* Disables commenting on old blog posts */
	"u:dev:MassRename/code.js",                 /* Mass Renaming of pages on the wiki */
	"u:dev:AjaxBatchDelete/code.js",            /* Mass Deletion of pages no-longer wanted by the wiki's community */
    "u:dev:MassNullEdit/code.js",               /* Mass Null Edit of pages which have not refreshed due to edits on other pages */
    "u:dev:MassProtect/code.js",                /* Mass protection. */
    "u:dev:UserTags/code.js",                   /* Customizes Usertags */
    "u:dev:YoutubePlayer/code.js",              /* Revives MPC */
    "u:dev:MediaWiki:DiscordIntegrator/code.js",
	]
});

/* Link to Answers */
$('ul.tools li:first-child').after('<li><a href="http://blazblue-fanon-rp.wikia.com/wiki/BlazBlue_Fanon_RP_Wiki:About">Got a question about BlazBlue Fanon RP Wiki?</a></li>');

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		templates: { u: 'Template Specialist', order:-2 },
		templatesh: { u: 'Template Helper', order:-1 },
		css: { u: 'CSS Specialist', order:-2 },
		cssh: { u: 'CSS Helper', order:-1 },
		java: { u: 'Java Specialist', order:-2 },
		javah: { u: 'Java Helper', order:-1 },
		inactive: { u: 'Inactive', },
		newuser: { u: 'Rookie' },
		sysop: { u: 'Administrator', link:'BlazBlue Fanon RP Wiki:Admins', order:-1/0 },
		superadmin: { u: 'Super Admin', link:'BlazBlue Fanon RP Wiki:Admins', order:-1/0 },
		superuser: { u: 'Super User', order:-1/0 },
		coding: { u: 'Coding Specialist', order:-2 },
		codingh: { u: 'Coding Helper', order:-1 },
		lst: { u: 'Loyal Stormtrooper', order:1 },
		tr8r: { u: 'Traitor', order:1 },
		inunyan: { u: 'Inunyan', order:1 },
		drawer: { u: 'Drawer', order:1 },
		kor: { u: 'Knight of Ren', order:1 }
		}
};
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = { //Tags users with custom templates tag
	'BlackRoseIXA': ['drawer', 'templates', 'css', 'java'],
	'ZeroXEbony': ['templatesh', 'cssh'],
	'StyleMazter': ['templatesh', 'cssh', 'javah'],
	'TheKeyofTwilight': ['templatesh', 'lst', 'kor'],
	'Ethank14': ['tr8r'],
	'JYokai': ['inunyan', 'tr8r']
};
UserTagsJS.modules.implode = {
	'superadmin': ['bureaucrat', 'sysop'], // Combines bureaucrat and sysop tags together into superadmin tag
	'superuser': ['rollback', 'chatmoderator'], // Combines rollback and chat moderator tags together into superuser tag
	'coding': ['templates', 'css', 'java'], // Combines templates, css, and java specialist tags together into coding tag
	'codingh': ['templatesh', 'cssh', 'javah'], // Combines templates, css, and java helper tags together into coding helper tag
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'], // Remove rollback from all admins
};
 
nullEditDelay = 1000;
 
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
}