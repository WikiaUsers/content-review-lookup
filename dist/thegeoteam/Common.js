/* Any JavaScript here will be loaded for all users on every page load. */

/** == Collapsible tables == **/
/* importScriptPage('Project:JS/collapse.js', 'keroro'); */
importScriptPage('Project:JS/ShowHideHC.js', 'keroro');


/** == Hiding == **/
importScriptPage('Project:JS/hide.js', 'keroro');


/** == Tabber == **/
importScriptPage('Project:JS/tabber.js', 'keroro');

/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		eggy: { u:'Eggy Soulster' },
                geofan: { u:'The Geo Team Fan' },
                laser: { u:'Chanex' },
                tj: { u:'Tj' }
	}
};
UserTagsJS.modules.custom = {
	'Eggium': ['eggy', 'geofan'], // Add Eggy Soulster + The Geo Team Fan
        'KTMWikia8000': ['geofan'], // Add The Geo Team Fan
        'Greenyphatom2002': ['geofan', 'founder'], // Add The Geo Team Fan + Founder
        'Laser Pikachus': ['laser', 'sysop'], // Add Chanex + Member of The Geo Team
        'Tjdrum2000': ['tj'], // Add Tj
        'JBWikia9000': ['geofan'], // Add The Geo Team Fan
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:AjaxRC/code.js',
        'u:prototype:MediaWiki:Common.js/top.js'
    ]
});