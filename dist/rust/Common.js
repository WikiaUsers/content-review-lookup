/* Any JavaScript here will be loaded for all users on every page load. */

/* Test Script */

/* Test Script End */

window.dev = window.dev || {};

/*------------------------------------------------------------------------------*/

/* Standard Edit Summary Settings */
window.dev.editSummaries = {
     css: false,
     select: 'MediaWiki:StandardEditSummary'
};

/*------------------------------------------------------------------------------*/

/*AjaxRC Settings*/
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
function highlightUsers() {} //Workaround
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(highlightUsers);

/*------------------------------------------------------------------------------*/

/* Highlight Users Settings*/
highlight = {
    selectAll: false,
    rollback: 'lime',
    patroller: 'lime',
    sysop: 'gold',
    vstf: 'dodgerblue',
    staff: 'purple',
    bot: 'dimgray'
};
/*------------------------------------------------------------------------------*/

/* RevealAnonIP Settings */
window.RevealAnonIP = {
    permissions : ['rollback', 'patroller', 'sysop', 'bureaucrat']
};

/*------------------------------------------------------------------------------*/

/* UserTags Settings */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { u:'Administrator', link:'Project:User Rights#Administrators', order:-1/0 },
		newuser: { u:'New Rust Wiki Editor', title:'This user has made less than 10 edits and/or has been a member of this wiki for less then 5 days' },
		headadmin: { u:'Head-Administrator', link:'Project:User Rights#Bureaucrats', title:'This user is an admin and a bureaucrat', order:-1/0 },
                rollback: { link:'Project:User Rights#Rollback Users' },
                patroller: { link:'Project:User Rights#Patrollers' },
                bot: { link:'Help:Bots' },
                adminbot: { u:'Admin Bot', link:'Help:Bots', title:'This user is a bot with administrative powers' },
                wikiastars: { link:'http://wikia.com/Stars' },
		vstf: { link:'Help:SpamTaskForce', title:'This user is a member of the Volunteer Spam Task Force' },
                staff: { u:'Wikia Staff', link:'http://community.wikia.com/wiki/Community_Central:Staff', title:'This user is an official Wikia staff member'},
                inactive: { title:'This user has not made an edit in over two months' },
                blocked: { link:'Help:Blocking', title:'This user is blocked from editing on this wiki' }
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'patroller', 'bannedfromchat', 'staff', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = { // Remove tags from users in specified groups
	'newuser': ['sysop', 'bureaucrat', 'bot', 'bot-global'], 
	'notautoconfirmed': ['sysop', 'bureaucrat', 'bot', 'bot-global'],
    'inactive': ['bot', 'bot-global'],
	'headadmin': ['founder'],
	'sysop': ['vstf', 'staff']
};
UserTagsJS.modules.implode = {
	'headadmin': ['sysop', 'bureaucrat'], // Combine sysop and bureaucrat to make headadmin
    'adminbot': ['sysop', 'bot'] // Combine sysop and bot to make adminbot
};
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0, 'Talk', , 'User', 'User talk', 'File', 'File talk', 'User blog', 'User blog comment', 'Message Wall', 'Forum', 'Thread'],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

/*------------------------------------------------------------------------------*/

/*MsgWallGroupTags Settings */

window.MsgWallGroupTags = {
    glow: true,
    glowSize: '15px',
    groups: {
        sysop: { tag:'Admin', order:1, tagColor:'red', glowColor:'#f77', image:'' },
        bureaucrat: { tag:'Bureaucrat', order:10, tagColor:'yellow', glowColor:'gold', image:'' }
    },
    users: {}
};
/*------------------------------------------------------------------------------*/

/* AllPagesHideRedirect */
$(function() {
    var RedirectsHidden = false
	$('div.namespaceoptions').append('<div style="text-align: right;"><a href="#">Hide redirects</a></div>');
	$("div.namespaceoptions div a").click(function() {
            if (RedirectsHidden === false) {
		$('.allpagesredirect').css('display', 'none');
                $(this).html("Show redirects");
                RedirectsHidden = true
            } else {
		$('.allpagesredirect').css('display', '');
                $(this).html("Hide redirects");
                RedirectsHidden = false
            }
	});
});

/*------------------------------------------------------------------------------*/

/*USERNAME Template Script*/
$(function () {
    if (wgUserName) {
        $('.insertusername').html(wgUserName);
    } else {
        $('.insertusername').html("Wikia contributor");
    }
});

/*------------------------------------------------------------------------------*/

/*DisableBotMessageWalls Settings */
///window.DisableBotMessageWalls = {
//    exceptions: []
//};

/*------------------------------------------------------------------------------*/

/* Import Scripts */
importArticles({ type: 'script', articles: [ 
    'w:c:dev:RevealAnonIP/code.js', /* RevealAnonIP */
    'u:dev:HighlightUsers/code.js', /* Highlight Users */
    //'MediaWiki:Test.js', /* Temporary Script for Testing */
    'w:c:dev:UserTags/code.js', /* UserTags Script */
    'u:dev:Standard_Edit_Summary/code.js', /* Standard Edit Summary Dropdown. */
    'u:dev:AjaxRC/code.js', /* Auto Refresh */
    'u:dev:FloatingToc/code.js', /* Detach Table of Contents */
    'u:dev:DupImageList/code.js', /* List Duplicate Images */
    'u:dev:DisableBotMessageWalls/code.js', /* Disable Message Walls for Bots */
    'w:dev:WallGreetingButton/code.js', /* Easily Edit Message Wall Greeting */
    'w:c:dev:SignatureCheck/code.js', /* Inform users if they did not sign there posts */
    'u:dev:ListAdmins/code.js', /* Admin List */
    'w:c:dev:Countdown/code.js', /* Countdown */
    'MediaWiki:Popups.js', /* Popups */
    'MediaWiki:MsgWallGroupTags.js',
    'MediaWiki:VSTFReport.js',
    'w:c:dev:AntiUnicruft/code.js' /* AntiUnicruft Fix invisible characters for .css files */
    ]
});