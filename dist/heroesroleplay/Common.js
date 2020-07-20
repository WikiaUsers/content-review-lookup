/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('DisplayClock/code.js', 'dev');

/* Auto updating recent changes opt-in

* See w:c:dev:AjaxRC for info & attribution
*/



AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:BlockList"]
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls

* See w:c:dev:PurgeButton for info & attribution
*/

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data },
                'ADDEPT': { u:'Administrative Services', m:'Administrative Services', f:'Administrative Services' },
		'FMDEPT': { u:'Sorting Department', m:'Sorting Department', f:'Sorting Department' },
		'AMDEPT': { u:'Activity Movement', m:'Activity Movement', f:'Activity Movement' },
		'USDEPT': { u:'General Support', m:'General Support', f:'General Support' },
                'RB': { u:'Rollback', m:'Rollback', f:'Rollback' },
                'CRAT': { u:'Bureaucrat', m:'Bureaucrat', f:'Bureaucrat' }
	}
};
 
UserTagsJS.modules.custom = {
// Administrative Sercices Department
'A Son of Hades': ['ADDEPT'],
'Shademoon': ['ADDEPT', 'RB'],
 
// Sorting Department
'Blue Butter': ['FMDEPT', 'CRAT'], // Add Faction Maintenance Tags
'YorkieWolf': ['FMDEPT', 'CRAT'],
 
// Activity Movement Department
// Add Activity Movement Tags
 
// General Support Department
'Jackyou': ['USDEPT', 'RB'], // Add User Support Tags
'Fernflight': ['USDEPT']
};

// Imports
EditIntroButtonText = 'Intro';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});