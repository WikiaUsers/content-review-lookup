/* Any JavaScript here will be loaded for all users on every page load. */

// Create the "dev" namespace if it doesn't exist already:
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
        queen: { u:'Queen' }
	}
};

UserTagsJS.modules.custom = {
	'Ootwar': ['queen'], // Add Queen
};
 
/* ********** Notimodule ********** */
var notimoduleTitle = window.notimoduleTitle || 'Bulletin';
var notimodulePagename = window.notimodulePagename || 'Template:Notimodule';
 
var request = new XMLHttpRequest();
request.open("GET", '/wiki/'+ notimodulePagename +'?action=purge', true);
request.send(null);
 
$('#WikiaRail').prepend('<section class="rail-module" id="notimodule"><h2 class="has-icon"><span class="fa fa-list" style="color: rgba(213,212,212,0.75)"></span>&nbsp;&nbsp;'+ notimoduleTitle +'</h2><div></div></section>');
 
if ( wgUserGroups.indexOf("sysop") >= 0 ) {
    $('#notimodule h2').append('&nbsp;<small>(<a href="/wiki/'+ notimodulePagename +'?action=edit">Edit</a>)</small>');
}
 
$('#notimodule > div').load('/wiki/'+ notimodulePagename +'?action=render');

/** Heyo, this is for rail modules **/
window.AddRailModule = [
    {page: 'Template:RailModule', prepend: true, maxAge: 300},  // okay
];