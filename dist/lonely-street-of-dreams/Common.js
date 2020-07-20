/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
	"w:c:dev:ShowHide/code.js",
	"w:c:dev:CollapsibleInfobox/code.js", // for examples on w:c:dev:CollapsibleInfobox
	"w:c:dev:AjaxRC/code.js",
	"w:c:dev:BackToTopButton/code.js",
	"w:c:dev:OasisToolbarButtons/code.js",
	"w:c:dev:AutoEditDropdown/code.js",
	"w:c:dev:PurgeButton/code.js",
	"w:c:dev:SearchGoButton/code.js",
	"w:c:dev:Standard_Edit_Summary/code.js", 
	"w:c:dev:UserTags/code.js",      
    ]
});
 
// Custom User Tags, including Inactive
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces, not user/walls/forum/blog
				days: 14,
				namespaces: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				zeroIsInactive: true
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			userfilter: {
				Pokenutter: ['bureaucrat'] // Founder
			}
		}
	};
	scriptList.push('w:dev:UserTags/code.js');