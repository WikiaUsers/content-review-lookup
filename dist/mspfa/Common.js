/* Any JavaScript here will be loaded for all users on every page load. */

// --------------------------------
// Script configurations
// -------------------------------

$.extend(true, window, {
    
    /** AJAX Auto-Refresh **/ 
    
    ajaxPages: new Array(
    	"Special:WikiActivity",
    	"Special:WikiActivity/watchlist",
    	"Special:MultipleActivity",
    	"Special:RecentChanges",
    	"Special:RecentChangesLinked",
    	"Special:Log",
    	"Special:ListFiles",
    	"Special:Contributions",
    	"Special:NewPages",
    	"Special:UncategorizedPages",
    	"Special:DoubleRedirects",
    	"Special:WhatLinksHere",
    	"Special:Categories",
    	"Special:Videos",
    	"Special:Watchlist",
    	"Special:LonelyPages",
    	"Special:BrokenRedirects",
    	"Special:DeadendPages",
    	"Special:Disambiguation",
    	"Special:Withoutimages",
    	"Blog:Recent_posts"
    ),
    
    ajaxRefresh: 30000,
    AjaxRCRefreshText: 'Auto-refresh',
    AjaxRCRefreshHoverText: 'Automatically refresh the page over time',
    ajaxIndicator: 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018',
    
    /** Spoiler blocks **/
    
    SpoilerAlertJS: {
	    question: 'This area contains spoilers for an official (e.g. Homestuck) or fan adventure. Are you sure you want to read it?',
	    yes: 'Yes.',
	    no: 'No.',
	    fadeDelay: 1600
	},
	
	/** UserTags **/
	
	UserTagsJS: {
		
		tags: {
			
			'headbureaucrat':    {order: 1,  u: "Head Bureaucrat", link: "MSPFAW:Administration#The_Head_Bureaucrat"},
			'bureaucrat':        {order: 2,  u: "Bureaucrat", link: "MSPFAW:Administration#Bureaucrats"},
			'bot':               {order: 3,  u: "Bot", link: "MSPFAW:Bots"},
			'sysop':             {order: 4,  u: "Administrator", link: "MSPFAW:Administration#Administrators"},
			'moderator':         {order: 5,  u: "Moderator", link: "MSPFAW:Administration#Moderators"},
			'content-moderator': {order: 6,  u: "Content Moderator", link: "MSPFAW:Administration#Content_Moderators"},
			'patroller':         {order: 7,  u: "Patroller", link: "MSPFAW:Administration#Patrollers"},
			'rollback':          {order: 8,  u: "Rollback", link: "MSPFAW:Administration#Rollbacks"},
			'threadmoderator':   {order: 9,  u: "Discussion Moderator", link: "MSPFAW:Administration#Discussion_Moderators"},
			'discordmoderator':  {order: 10, u: "Discord Moderator", link: "MSPFAW:Administration#Discord_Moderators"},
			
			'templateer':        {order: 11, u: "Template Engineer", link: "MSPFAW:Administration#Engineers"},
			'jshelp':            {order: 12, u: "JavaScript Helper", link: "MSPFAW:Administration#Engineers"},
			'csshelp':           {order: 13, u: "CSS Helper", link: "MSPFAW:Administration#Engineers"},
			'luahelp':           {order: 14, u: "Lua Helper", link: "MSPFAW:Administration#Engineers"},
			'wikitexthelp':      {order: 15, u: "Wikitext Helper", link: "MSPFAW:Administration#Engineers"},
			'designer':          {order: 16, u: "Design Help", link: "MSPFAW:Administration#Engineers"},
			'botmanager':        {order: 17, u: "Bot Manager", link: "MSPFAW:Administration#Bot_Managers"},
			
			'editorofthemonth':  {order: 18, u: "Editor of the Month", link: "MSPFAW:Community#Edit_Awards"},
			'verifiedcreator':   {order: 19, u: "Verified Creator", link: "MSPFAW:Community#Verified_Creators"},
		
			'banned':            {u: 'Banned', link: "MSPFAW:Policies and Guidelines#Bans"},
			'discordbanned':     {u: 'Banned from the Discord', link: "MSPFAW:Policies and Guidelines#Bans"},
			'surveillance':      {u: 'Under Surveillance', link: "MSPFAW:Policies and Guidelines#Surveillance"}
			
		},
		
		modules: {
			
			inactive: {
				days: 60,
				zeroIsInactive: false
			},
			
			newuser: {
				
				// Remove new user tag when the user either makes 50 edits or has been a wiki
				// member for two weeks, whichever happens first
				
				computation: function(days, edits) {
					return days < 14 && edits < 50; 	
				}
			},
			
			custom: {
				"Withersoul 235": ["headbureaucrat", "csshelp", "jshelp"]
			},
			
			metafilter: {
				'neweditor': [
					'bureaucrat', 
					'bot', 
					'sysop', 
					'moderator', 
					'content-moderator', 
					'rollback', 
					'contentmoderator',
					'discordmoderator'
				]
			},
			
			implode: {
				'moderator': ['content-moderator', 'threadmoderator'],
				'patroller': ['threadmoderator', 'rollback']
			},
			
			explode: {
				'sysop': ['bureaucrat']
			},
			
			nonuser:       true,
			autoconfirmed: true,
			isblocked:     true,			
			
		}
		
	},
	
	/** Disabling Rollback script from Dev Wiki **/
	
	RollbackWikiDisable: true
	
});

mw.config.set('UMFBypassLicenseCheck', true);

// --------------------------------
// Staff tools
// -------------------------------

var // ResourceLoader has yet to support ES6, so no const or let yet

	groups = mw.config.get('wgUserGroups'),
	roll   = groups.includes('rollback'),
	cmod   = groups.includes('content-moderator'),
	sysop  = groups.includes('sysop'),
	bcrat  = groups.includes('bureaucrat');

if (roll || cmod || sysop) {
	importArticles({
		type: 'script',
		articles: new Array(
			"u:dev:MediaWiki:AddArticleToCategory/code.js",
			"u:dev:MediaWiki:AjaxRedirect/code.js",
			"u:dev:MediaWiki:AjaxRename/code.js",
			"u:dev:MediaWiki:AjaxUndo/code.js",
			"u:dev:MediaWiki:FileUsageAuto-update/code.js",
			"u:dev:MediaWiki:PageRenameAuto-update/code.js",
			"u:dev:MediaWiki:QuickTemplate/code.js",
			"u:dev:MediaWiki:QuickTitle/code.js",
			"u:dev:MediaWiki:MassCategorization/code.js",
			"u:dev:MediaWiki:MassRenameRevert/code.js",
			"u:dev:MediaWiki:MassSetTemplateType.js",
			"u:dev:MediaWiki:TemplateTypeButtons/code.js",
			"u:dev:MediaWiki:UploadMultipleFiles.js"
		)
	});
}

if (roll && !(cmod || sysop)) {
	importArticles({
		type: 'script',
		articles: ["u:dev:MediaWiki:MarkForDeletion/code.js"]
	});
}

if (bcrat) {
	importArticles({
		type: 'script',
		articles: new Array(
			"u:dev:MediaWiki:AjaxUserRights.js",
			"u:dev:MediaWiki:MassUserRights/code.js"	
		)
	});
}

/** Other scripts are Content Mod / Admin only by default and so don't require config
	here; they can go straight to ImportJS **/

// ------------------------------------------
// Adds a button to clear Deletion reasons
// ------------------------------------------

if (mw.config.get('wgAction') === 'delete') {
    $('#wpReason').after(' <span id="wpClearReason" class="button">\u232b</span>');
    
    $('#wpClearReason').click(function () {
        $('#wpReason').val('').focus();
    });
}

// -----------------------------------------------------
// Replace elements with "Clock" class with local time
// -----------------------------------------------------

setInterval(function() {
    $('.Clock').text(new Date().toLocaleTimeString());
}, 1000);

// -------------------------------------
// Adds a "Logs" tab to User Mastheads
// -------------------------------------

$(function() {
    var 
    	olds = $(".user-profile-navigation").html(),
        address = "/wiki/Special:Log/" + wgTitle,
        adds = "<li class='user-profile-navigation__link' id='LogsTab'><a href='" + address + "'>Logs</a></li>",
        news = olds + adds; 
    
    $(".user-profile-navigation").html(news);
});

// ----------------------------------------------
// Make uncreated categories display as redlinks
// ----------------------------------------------

function unCatMark() {
	$('.newcategory').addClass('new');
}

mw.hook('wikipage.content').add(unCatMark);

// -------------------------------------------------------
// Sorts content on Special:WhatLinksHere alphabetically
// ------------------------------------------------------

!function($) {
    if (wgCanonicalSpecialPageName !== 'Whatlinkshere') 
    	return;
    	
    var 
    	sorted_list, $list = $('#mw-whatlinkshere-list');
    	sorted_list        = $list.children('li').sort(function (a, b) {
        	return (
        		$(a).find('a:first').attr('title') > $(b).find('a:first').attr('title')
        	) ? 1: -1;
    	});
    	
    $list.children('li').remove(); 
    $list.append(sorted_list);
}(jQuery);

// -------------------------------------------
// Allows more in-depth resizing of images
// -------------------------------------------

$(".image-resize").each(function() {
    var a   = $(this).children(".image-resize-new").text().split("_"),
        img = $(this).find("img");
        
    if (!isNaN(a[1]) && !isNaN(a[1])) {
        img.attr({
            width:  a[0],
            height: a[1]
        });
    }
});

// --------------------------------
// Bureaucrat certainity messages
// --------------------------------

var buroWarning = "Do you truly want to promote this user to bureaucrat?" + 
                  " This is irreversible through conventional means!";
    
!function () {
	if (wgCanonicalSpecialPageName !== 'Userrights') {return}
	
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    	if (!!$('#wpGroup-bureaucrat').attr('checked') && !confirm(buroWarning)) {
        	$('#wpGroup-bureaucrat').attr('checked', null);
    	}
    });
}();