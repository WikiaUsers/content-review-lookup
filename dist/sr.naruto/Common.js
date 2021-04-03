/**
 * 10:55, April 27, 2016 (UTC)
 * http://sr.naruto.wikia.com/wiki/MediaWiki:Common.js
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Monobook).
 */

(function (window, $, mw) {
	"use strict";

	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];

					/* Scripts to be loaded everywhere */

	// Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
	scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');

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
				link: 'Project:Bureaucrat'
			},
			sysop: {
				link: 'Project:Sysop',
				title: 'System-Operator ( Administrator )'
			},
			rollback: {
				link: 'Project:Rollback'
			},
			forumadmin: {
				u: 'Forum Operator',
				title: 'Helps operate the forums'
			},
			inactive: {
				title: 'The user hasn\'t edited for last 30 days'
			}
		},
		modules: {
			inactive: 30,
			mwGroups: [
				'bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global', 'forumadmin'
			],
			autoconfirmed: false,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			userfilter: {
				TranClan: ['bureaucrat'] // Hide bureaucrat from inactive founder
			}
		}
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

    // Temporary BrowseData
    //if (mw.config.get("wgCanonicalSpecialPageName") === "BrowseData") {
    //    pageScriptList.push('Mediawiki:Common.js/BrowseData.js');
	//}

	// List Duplicate images
	if (mw.config.get('wgPageName') === 'Narutopedia:Duplicate_Images') {
		pageScriptList.push('u:dev:DupImageList/code.js');
	}

	// Various changes to the new forums
	if (({1201: 1, 2000: 1})[mw.config.get('wgNamespaceNumber')] === 1 || 
        mw.config.get('wgCanonicalSpecialPageName') === 'Forum'
    ) {
        // Lock forums if not commented for 60 days
        // Place a warning after 30 days
        window.LockForums = {
            expiryDays: 60,
            expiryMessage: "This thread hasn't been commented on for over <actualDays> days. There is no need to reply.",
            warningDays: 30,
            banners: true,
            ignoreDeletes: true,
            warningPopup: true,
        };
        pageScriptList.push('u:dev:LockForums/code.js');

        window.ArchiveBoards= {
            boards : ["Wiki Discussions Archive", "Chapter Archives"],
            groupCustom : ["forumadmin"]
        };
        pageScriptList.push('u:dev:ArchiveBoards/code.js');

        pageScriptList.push('MediaWiki:Common.js/ForumChanges.js');
	}

	// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js',
			'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
		);
	}

					/* Small scripts which donot need a seperate page (Snippets) */

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
		$(window).load(function() {
			$('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
		});

        // Template adder on file pages
        if (mw.config.get('wgCanonicalNamespace') === 'File')
        $(function() {
            if ($.inArray("autoconfirmed", mw.config.get("wgUserGroups")) === -1)
                return;

            var Options = {
                    '{{No license}}': 'Unlicensed image',
                    '{{No rationale}}': 'No Fairuse info',
                    '{{Unused}}': 'Unused image',
                    '{{Poor filename}}': 'Poor name'
                },
                tempOptStr = '';
         
            for (var i in Options) {
                tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
            }
         
            var html = '<select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
            $('.comments').after(html);
            $('#templateSubmit').click(function() {
                $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
                new mw.Api().post({
                        format: 'json',
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        token: mw.user.tokens.get('editToken'),
                        summary: 'Adding template: ' + $('#FileTemplateAdder').val(),
                        minor: true,
                        prependtext: $('#FileTemplateAdder').val() + "\n"
                    })
                    .done(function() {
                        $('#templateSubmit').text('Add this Template too!');
                        new BannerNotification('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully', 'confirm').show();
                    })
                    .fail(function() {
                        new BannerNotification('Template addition failed!', 'error').show();
                    });
            });
        });

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
			'Add a Chapter Reference',
			'<ref>',
			'</ref>',
			'Chapter 0, page 0',
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
}(window, jQuery, mediaWiki));