/* Any JavaScript here will be loaded for all users on every page load. */

// User tags
window.UserTagsJS = {
	modules: {
		inactive: 45,
		mwGroups: [
            'bureaucrat',
            'chatmoderator',
            'patroller',
            'rollback',
            'sysop',
            'bannedfromchat',
            'bot',
            'bot-global'
        ],
		autoconfirmed: true,
		metafilter: {
			sysop: ['bureaucrat'],
			chatmoderator: ['sysop'],
			rollback: ['sysop'],
		},
		newuser: true,
	},

	tags: {
		bureaucrat: {
            u:'Consul',
            link:'Project:Administrators',
            color:'white',
            title:'Bureaucrat' 
        },
		sysop: {
            u:'Council member',
            link:'Project:Administrators',
            color:'white',
            title:'Admin' 
        },
		patroller: { 
            u:'Inquisitor',
            link:'Project:Administrators',
            color:'white',
            title:'Patroller' 
        },
		rollback: {
            u:'Shadowhunter',
            link:'Project:Administrators',
            color:'white',
            title:'Rollback' 
        },
	}
};
// -end - User tags

// Spoiler and Not Final Alert
window.SpoilerAlertJS = {
    question: 'This page contains spoilers. Are you sure you want to proceed?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1200
};
// - end -  Spoiler and Not Final Alert

// LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 180,
    expiryMessage: "This blog is considered inactive and archived because it hasn\'t been commented on in 6 months and there is no longer an ongoing discussion in the comments section.",
};
 // - end -  LockOldBlogs

// Having TOC be collapsed by default on certain pages
mw.hook('wikipage.content').add(function () {
    var tocIgnorePages = [
        'Secrets_of_Blackthorn_Hall'
    ];

    if ($('.toctogglelabel').length && tocIgnorePages.includes(mw.config.get('wgPageName'))) {
        $('.toctogglelabel').click();
    }
});
// - end -  TOC collapse