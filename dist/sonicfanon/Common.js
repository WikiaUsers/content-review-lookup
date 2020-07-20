/*
DO NOT EDIT THIS PAGE UNLESS YOU ARE AUTHORIZED.
*/

// AjaxRC configuration option
window.ajaxRefresh = 30000;
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.AjaxRCRefreshText = "Auto Refresh";
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';


function LoadUserTags() {
    window.UserTagsJS = { //Configure UserTags
    	modules: {
    	    metafilter: {
    	        'sysop': ['legacy_staff'],
    	        'bureaucrat': ['legacy_staff'],
    	        'chatmoderator': ['legacy_staff'],
    	        'content-moderator': ['legacy_staff'],
    	        'patroller': ['legacy_staff'],
    	        'threadmoderator': ['legacy_staff']
    	    },
    	    implode: {
    	        'site_moderator': ['content-moderator','threadmoderator'],
    	        'vandal_patrol': ['patroller','rollback']
    	    },
    	    mwGroups: ['bureaucrat', 'sysop', 'patroller', 'rollback'],
    	    custom: {}
    	},
    	tags: {
    		bureaucrat: { u:'Bureaucrat', link:'Sonic_Fanon_Wiki:Staff#Bureaucrats' },
    		sysop: { u:'Administrator', link:'Sonic_Fanon_Wiki:Staff#Administrators' },
    		legacy_staff: { u:'Legacy Staff', link:'Sonic_Fanon_Wiki:Staff#Legacy_Staff' },
    		site_moderator: { u:'Site Moderator', link:'Sonic_Fanon_Wiki:Staff#Site_Moderators' },
    		vandal_patrol: { u:'Vandal Patrol', link:'Sonic_Fanon_Wiki:Staff#Vandal_Patrol' },
    		patroller: { u:'Patroller', link:'Sonic_Fanon_Wiki:Staff#Vandal_Patrol' },
    		rollback: { u:'Rollback', link:'Sonic_Fanon_Wiki:Staff#Vandal_Patrol' },
    		master_of_adoptions: { u:'Master of Adoptions', link:'Character_Adoption' }
    	}
    };
    $.get(mw.util.wikiScript(), { //Load Custom UserTags from MediaWiki:ProfileTags (code modified from ProfileTags)
    	action: 'raw',
    	title: 'MediaWiki:ProfileTags'
    }, function(data) {
    	if (!data.length) {
    		return;
    	}
    	var user = $.escapeRE(wgTitle),
    		re = new RegExp('(?:^|\\n)\\s*' + user + '\\s*\\|\\s*(.*?)\\s*(?:\\n|$)'),
    		match = re.exec(data),
    		tags;
    	if (match === null) {
    		return;
    	}
    	tags = match[1].split(/\s*,\s*/);
    	if (tags.length) {
    		window.UserTagsJS.modules.custom[user] = tags; //Insert the resulting tag list into UserTags
    	}
    	importScriptPage('UserTags/code.js','dev'); //UserTags deletes the window.UserTagsJS object when it is finished loading.  Loading the MediaWiki page takes longer than the cached script, so we have to load it here to stop it from deleting the object early.
    });
}

if ($('.UserProfileMasthead').length) {
    // wait for site RL module to load to ensure config is picked up correctly
    mw.loader.using(['mediawiki.util', 'site'], LoadUserTags);
}