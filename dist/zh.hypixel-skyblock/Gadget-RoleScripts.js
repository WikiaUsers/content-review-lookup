//##############################################################
/* ==importArticle pre-script actions== */

// AjaxCommentDelete
window.AjaxCommentDeleteConfig = {
	fastDelete: "Comment Was [[#|Off Topic]]/[[w:c:community:Help:Spam|Spam]]/[[w:c:community:Help:Vandalism|Vandalism]]"
};

//AjaxBlock
window.AjaxBlock = {
	blockReasons: {
		'General': {
			'[[w:c:community:Help:Vandalism|Vandalism]]': 'Vandalism',
			'[[WP:WP:CRV|Removing Content From Pages]]': 'Removing Content form Pages',
			'[[WP:WP:DISRUPT|Disruptive Editing]]': 'Disruptive Editing',
			'[[WP:Disinformation|Inserting False Information]]': 'Inserting False Information',
			'Creating Nonsense/[[w:c:community:Help:Vandalism|Vandalism]] Articles': 'Creating Spam Articles',
			'Inserting nonsense/gibberish into pages': 'Inserting nonsense/gibberish into pages',
		},
		
		'Accounts': {
			'[[wP:Wp:PROXY|Open Proxy/VPN]]': "Open Proxy/VPN",
			'[[WP:WP:VOA|Vandalism-Only Account]]': 'VoA Account',
			'[[WP:WP:IU|Unacceptable Username]]': 'Unacceptable Username',
			'[[WP:WP:NOTHERE|Clearly not here to build an Encyclopedia]]': 'Clearly not here to build an Encyclopedia',
			'Abusing Multiple Accounts ([[WP:WP:SOCK|Sockpuppetry]])': "Sockpuppety",
			'Long-Term Abuse': 'Long-Term Abuse',
		},
		
		'Spam': {
			'[[w:Help:Spam|Spam/Advertising Only account]]': 'Spam/Advertising Only account',
			'[[w:Help:Spam|Spam/Advertising]]': 'Spam/Advertising',
			'[[WP:WP:LINKSPAM|Spamming Links to External Sites]]': 'External Link Spam',
			'[[WP:WP:SPAM|Posting Spam on Userpage]]': 'Posting Spam on Userpage',
		},
		
		'Comments/Posts': {
			'[[Project:Article Comment Guidelines|Spamming Nonsense Comments/Posts]]': 'Spamming Nonsense Comments/Posts',
			'[[WP:WP:UNCIVIL|Intimidating/Harrasing Comments/Posts]]': 'Intimidating/Harrasing Comments/Posts',
			'[[WP:WP:SWEARING|Swearing In Comments/Discussions]]': 'Swearing In Comments/Discussions',
			'[[WP:WP:CONTROVERSY|Discussing Controversial Topics]]': 'Discussing Controversial Topics',
			'[[WP:WP:RUDE|Innapropriate Behavior/Comments]]': 'Innapropriate Behavior/Comments',
			'[[WP:WP:PROMOTION|Advertising]]': 'Advertising',
		},
		
		'Other': {
			'[[WP:WP:WAR|Edit Warring]]': 'Edit Warring',
			'[[WP:WP:NPA|Personal Attacks]]': 'Personal Attacks',
			'[[WP:WP:UNCIVIL|Intimidating Behavior/Harassment]]': 'Intimidating Behavior/Harassment',
			'[[WP:WP:UNCIVIL|Derogatory language]]': 'Derogatory language',
			'[[WP:Disinformation|Spreading False Rumors/Information]]': 'Spreading False Rumors/Information',
			'[[WP:WP:SHOUT|Shouting]]': 'Shouting',
			'Immature/Innapropriate Behavior/Conduct': 'Immature/Innapropriate Behavior/Conduct',
			 'Violation of FANDOM Terms of Use (https://www.fandom.com/terms-of-use)': 'Violation of FANDOM Terms of Use',
		},
	},
	
	expiryTimes: {
		'24 hours': '1 day',
		'3 days': '3 days',
		'1 week': '1 week',
		'2 weeks': '2 weeks',
		'3 weeks': '3 weeks',
		'1 month': '1 month',
		'6 weeks': '6 weeks',
		'2 months': '2 months',
		'3 months': '3 months',
		'4 months': '4 months',
		'6 months': '6 months',
		'9 months': '9 months',
		'1 year': '1 year',
		'18 months': '18 months',
		'3 years': '3 years',
		'infinite': 'infinite',
	},
 
	check: {
		talk: true,
		autoBlock: true,
		noCreate: true,
		override: true
	},
	
	extras: {
		refAbuseLog: true,
	}
};

//AjaxDelete
window.AjaxDelete = {
	deleteReasons: {
		'General': {
			'Advertising': 'Advertising',
			'[[w:Help:Spam|Spam]]/[[w:Help:Vandalism|Vandalism]]': 'Spam/Vandalism',
			'Marked for Deletion': 'Marked for deletion',
			'Empty Article': 'Empty Article',
			'Author request': 'Author request',
			'Irrelevant to The Wiki': 'Irrelevant to the wiki',
			'Housekeeping': 'Housekeeping',
			'Deprecated/Unused': 'Deprecated/Unused',
		},
		
		'Malicious Intent': {
			'[[WP:WP:NPA|Personal Attack article]]': 'Personal attack article',
			'[[WP:Disinformation|Disinformation]]/[[WP:Hoax|Hoax]]': 'Disinformation/Hoax',
		},
		
		'Redirects': {
			'Broken [[Help:Redirects|Redirect]]': 'Broken Redirect',
			'Unused [[Help:Redirects|Redirect]]': 'Unused redirect',
			'[[Help:Redirects|Redirect]] left from [[Help:Help:Rename|pagemove]]': 'Page Move redirect',
		},
	},

	imageDeleteReasons: {
		'Offensive Image': 'Offensive',
		'Inappropriate Image': 'Inappropriate Image',
		'Harassment-Only image': 'Harassment-Only image',
		'Housekeeping': 'Housekeeping',
		'Copyright infringement': 'Copyright infringement',
		'Author request': 'Author request',
		'Duplicate/Superceded File': 'Duplicate/Superceded File',
		'Improper Image format': 'Improper Image Format',
		'Generic Image Name': 'Generic Image Name',
		'[[w:Help:Spam|Spam]]/[[w:Help:Vandalism|Vandalism]]': 'Spam/Vandalism',
	},
 
	autoCheckWatch: true,
	noUndelete: false,
	reload: false,
};

// WHAM
window.WHAMBlockReason = "[[w:c:community:Help:Vandalism|vandalism]]";
window.WHAMDelay = 5;
window.WHAMBlockDuration = '3 months';
window.WHAMDeleteReason = "deleting [[w:c:community:Help:Spam|spam]]/[[w:c:community:Help:Vandalism|vandalism]]";

 //MassBlock
window.massBlockDelay = 5;

// Mass Rename
window.massRenameDelay = 5;

// AjaxBatchDelete/Undelete
window.batchDeleteDelay = 5;
window.batchUnDeleteDelay = 5;

//MassEdit
window.MassEditConfig = {
  interval: 10,
  placement: {
	element: "toolbar",
	type: "append"
  }
};

// FileLinksAutoUpdate
window.LIRoptions = {
	bottomMessage: '',
	editSummary: 'Updating file links (automatic)',
	singleButtonText: 'Rename and update',
	queueButtonText: 'Add to queue',
	delay: 10
};

//Nuke
window.nukeDelay = 5;
window.nukeTitle = "Mass delete all pages created by this user";

// MassUserRights
window.massUserRightsCustom = [
	"hypixel-skyblock|codeeditor|Code Editor|bureaucrat, util, staff, wiki-manager",
];

//##############################################################
/* ==importArticles== */
// Imports scripts from other pages/wikis.
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.Uri', 'ext.fandom.ContentReview.legacyLoaders.js']).then(function() {
	if (window.dontWantRoleSpecificJS) {
		return;
	}
	
	// This function checks if the user belongs to any of the groups passed in
	function userBelongsToGroup() {
		var groups = Array.from(arguments);
		return mw.config.get("wgUserGroups").some(function(g){ return groups.includes(g) });
	}
	
	// autoconfirmed or above
	if(userBelongsToGroup('autoconfirmed', 'rollback', 'content-moderator', 'threadmoderator', 'sysop')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:AjaxUndo/code.js',
				'u:dev:MediaWiki:AjaxRedirect/code.js',
				'MediaWiki:ANIReport.js',
			]
		});
	}
	
	// rollback or above
	if(userBelongsToGroup('rollback', 'content-moderator', 'sysop')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:MassRollback.js',
				'u:dev:MediaWiki:MassRedirect/code.1.js',
				'u:dev:MediaWiki:MassNullEdit/code.js',
				'u:dev:MediaWiki:MassEdit/code.js',
				'u:dev:MediaWiki:MassRename/code.js',
				'u:dev:MediaWiki:MassCategorization/code.js',
				'u:dev:MediaWiki:AnchoredRollback/code.js',
				'u:dev:MediaWiki:UserAndIPTools.js',
			]
		});
	}
	
	// Content mod or above
	if (userBelongsToGroup('content-moderator', 'sysop')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:MassProtect/code.js',
				'u:dev:MediaWiki:ViewDeleted/code.js',
				'u:dev:MediaWiki:AjaxBatchUndelete.js',
				'u:dev:MediaWiki:FastOldImageDelete/code.js',
				'u:dev:MediaWiki:PowerDelete.js',
				'u:dev:MediaWiki:MultipleFileDelete/code.js',
				'u:dev:MediaWiki:AjaxDelete/code.js',
				'u:dev:MediaWiki:Nuke/code.js',
				'u:dev:MediaWiki:AjaxBatchDelete.js',
			]
		});
	}
	
	// Admin or above
	if (userBelongsToGroup('sysop', 'bureaucrat')) {
		importArticles({
			type: 'script',
			articles: [
				'u:dev:MediaWiki:MassBlock/code.js',
				'MediaWiki:Common.js/AjaxBlock.js',
				'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
				'u:dev:MediaWiki:AdminDashboard block/code.js',
				'u:dev:MediaWiki:AjaxAbuseLog.js',
			]
		});
	}
});