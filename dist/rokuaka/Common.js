
/*********************************************************************************************************************/
/* All credits to Rokuaka Wiki https://rokuaka.wikia.com. You are not authorized to replicate or copy coding/design without its admin's permission. */

/*********************************************************************************************************************/

(function (window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];

	// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');

	// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';
	scriptList.push('u:dev:ArchiveTool/code.js');

	// User tags
	window.UserTagsJS = {
		tags: {
			bureaucrat: {
				link: 'Project:Bureaucrat',
			    u: 'Mage Minister'
			},
			sysop: {
				link: 'Project:Sysop',
				u: 'Imperial Court Mage'
			},
			rollback: {
				link: 'Project:Bureaucrat',
			},
			'content-moderator': {
			    link: 'Project:Content moderator',
			     u:'Imperial Court Mage', 
			},
			inactive: {
				title: 'The user hasn\'t edited for last 30 days'
			}
		},
		modules: {
			stopblocked: false,
			inactive: 30,
			mwGroups: ['bureaucrat', 'sysop', 'content-moderator', 'rollback', 'autoconfirmed-user', 'user', 'autoconfirmed-user', 'bot', 'bot-global', 'blocked', 'nonuser'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				'content-moderator': ['bureaucrat'],
				rollback: ['bureaucrat', 'content-moderator'],
				threadmoderator: ['content-moderator'],
				user: ['bureaucrat', 'sysop','content-moderator', 'rollback','translator', 'newuser', 'inactive','blocked'],
				bot: ['bot-global'],
				newuser: ['inactive'],
				bureaucrat: ['inactive'],
				sysop: ['bureaucrat', 'inactive'],
				founder: ['inactive'],
				blocked: ['inactive'],
				poweruser: ['newuser']
			},
		},
	};
	scriptList.push('u:dev:UserTags/code.js');

	// Null Edit button
	// Conditionally load purge button if page cannot be edited
	if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
		scriptList.push('u:dev:NullEditButton/code.js');
	} else {
		scriptList.push('u:dev:PurgeButton/code.js');
	}

	// List Files. See [[Narutopedia:ListFiles]]
	scriptList.push('u:dev:ListFiles/code.js');

	// Warnings
	scriptList.push('MediaWiki:Common.js/Warnings.js');

	// Reference Popups, like on Wikipedia
	scriptList.push('u:dev:ReferencePopups/code.js');

					/* Page specific scripts */

	// List Duplicate images
	if (mw.config.get('wgPageName') === 'Narutopedia:Duplicate_Images') {
		pageScriptList.push('u:dev:DupImageList/code.js');
	}

	// Various changes to the new forums
	if (({1201: 1, 2000: 1})[mw.config.get('wgNamespaceNumber')] === 1) {
		pageScriptList.push('MediaWiki:Common.js/ForumChanges.js');
		window.ArchiveBoards= {
            boards : ["Wiki Discussions Archive", "Chapter Archives"],
            groupCustom : ["forumadmin"]
        }
        pageScriptList.push('u:dev:ArchiveBoards/code.js');
	}

	// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
		);
	}

					/* Small scripts which donot need a seperate page (Snippets) */

    // Make icon tooltip info more visible
    $("#icons a").tooltip();

	// Remove red-links (deleted pages) from Recent Changes
	// [They stay red, they just don't link to ?action=edit]
	if (({
		Recentchanges: 1,
		Log: 1
	})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function () {
				$('a.new').each(function () {
					this.href = this.href.replace(/\?[^?]*$/, '');
				});
			};
		$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}

	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {
		// Detach the AJAX feature from Page/Image Creation/Upload
		// because the pop-up form does not obey the preloads and such.
		$('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
	 
		// Add link to ParentPage to Wiki-Nav
		// Idea from avatar wiki
		$("<li><a>").addClass('subnav-2-item')
			.find('a').attr({
					'href': '/wiki/Project:ParentPage',
					'class': 'subnav-2a'
				}).text('Parent Page').end()
		.appendTo($('.WikiHeader nav ul li.marked ul'));
	}

	// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Insert text',
			'mw-editbutton-redirect'
		);

		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
			'Add the ō character',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
		
		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
			'Add the ū character',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);

		mw.toolbar.addButton(
			'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
			'Add a Reference',
			'<ref>',
			'</ref>',
			'\'\'Akashic Records of Bastard Magic Instructor\'\' Vol. 0, Ch. 0, p. 0',
			'mw-editbutton-ref'
		);
	}

	// HOOK: Verbatim imports embedded on particular pages.
	if ($.isArray(window.pageNeededScripts)) {
		pageScriptList.push.apply(pageScriptList, window.pageNeededScripts);
		try {
			delete window.pageNeededScripts;
		} catch (e) {
			window.pageNeededScripts = null;
		} // IE8 sucks.
	}

	// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});
/* Hide the breadcrum on pages using Parent Tab */
if($(".parenttab").length) {
    $("#contentSub, .header-column.header-title > h2").hide();
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js',
    ]
});

/*Custom Collapsive box */
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');
 
/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:Sulina","User:Jerlin4j","User:Kingdevo215"],
    loadOnNamespace:[-1],
};

}(window, jQuery, mediaWiki));