/* Any JavaScript here will be loaded for all users on every page load. */

/*********************************************************************************************************************/
/* All credits to Release the Spyce Wiki https://release-the-spyce.wikia.com. You are not authorized to replicate or copy coding/design without its admin's permission. */

/*********************************************************************************************************************/

(function (window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];
// User tags
	window.UserTagsJS = {
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
				sysop: ['inactive'],
				founder: ['inactive'],
				blocked: ['inactive'],
				poweruser: ['newuser']
			},
		},
	};
    importScriptPage('MediaWiki:UserTags/code.js', 'dev');

// Configure AjaxRC
importScriptPage('AjaxRC/code.js', 'dev');
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity",
		"Special:Images"
	);
	window.AjaxRCRefreshText = 'Auto-Refresh';
	window.AjaxRCRefreshHoverText = 'Automatically refresh every 60 secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('u:dev:AjaxRC/code.js');

// ArchiveTool
	window.archiveListTemplate = 'ArchiveList';
	window.archivePageTemplate = 'ArchivePage';
	scriptList.push('u:dev:ArchiveTool/code.js');


// Custom edit buttons
	if (mw.toolbar) {
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/c/c8/Button_redirect.png',
			'Redirect',
			'#REDIRECT [[',
			']]',
			'Insert text',
			'mw-editbutton-redirect'
		);
 
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/e/e1/O_Accent_Button.png',
			'Add the ō character',
			'ō',
			'',
			'',
			'mw-editbutton-macron-o'
		);
 
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/d/db/U_Accent_Button.png',
			'Add the ū character',
			'ū',
			'',
			'',
			'mw-editbutton-macron-u'
		);
 
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/7/79/Button_reflink.png',
			'Add a Reference',
			'<ref>',
			'</ref>',
			'\'\'Release the Spyce\'\' — Episode ',
			'mw-editbutton-ref'
		);
	}

// Custom Special:[Multiple]Upload UI
	if (({Upload: 1, MultipleUpload: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		pageScriptList.push(
			'MediaWiki:Common.js/FairUseUpload.js'
		);
	}
 
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
 
	// Add custom class for styling long list of refs
	if ($('.references li').length > 9)
        $('.references').addClass('compactreferences');
 
    // SMW default popup is broken in wikia
    // Use custom modal
    $('.ultisup-image-popup a').click(function(ev) {
        ev.preventDefault();
        $.showCustomModal(this.title, '<img id="ultisup-load" src="https://images.wikia.nocookie.net/__cb1498150157/common/skins/common/images/ajax.gif"/>', {
            width: 1000
        });
        $("#ultisup-load").parent().load(this.href + " #gallery-0");
});
 
	// Oasis-only scripts
	if (mw.config.get('skin') === 'oasis') {
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
	}

// Import all scripts in bulk (and minified)
	window.importArticles({
		type: 'script',
		articles: scriptList
	}, {
		type: 'script',
		articles: pageScriptList
	});
/* Adds icons to page header bottom border */
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Hide the breadcrum on pages using Parent Tab */
if($(".parenttab").length) {
    $("#contentSub, .header-column.header-title > h2").hide();
}
/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    loadOnNamespace:[-1],
};

/* Replaces {{USERNAME}} with the name of the user browsing the page. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

}(window, jQuery, mediaWiki));