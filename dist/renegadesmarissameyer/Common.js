/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
		tags: {
		founder: {
            u:'Renegade',
            color:'black',
            title:'Founder' 
        },
		bureaucrat: {
            u:'Renegade',
            color:'black',
            title:'Bureaucrat' 
        },
		sysop: {
            u:'Renegade',
            color:'black',
            title:'Admin' 
        },
		rollback: {
            u:'Renegade',
            color:'black',
            title:'Rollback' 
        },
	}
};

AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');