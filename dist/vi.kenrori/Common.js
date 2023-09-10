/* Bất kỳ mã JavaScript ở đây sẽ được tải cho tất cả các thành viên khi tải một trang nào đó lên. */

/* Mọi công trạng thuộc You-Zitsu Wiki https://you-zitsu.wikia.com. Bạn không được phép sao chép thiết kế và coding mà không có sự cho phép của quản lý (admin) trang wiki đó.  */

(function (window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [],
		pageScriptList = [];
		
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
			'\'\'Kenrori\'\' Kenrori ',
			'mw-editbutton-ref'
		);
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/c/c2/Category_Button.png',
			'Add category',
			'[[Category:',
			']]',
			'Insert category',
			'mw-editbutton-category'
		);
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/e/e4/Hidden_Comment_Button.png',
			'Add hidden text',
			'<!-- ',
			' -->',
			'Insert text',
			'mw-editbutton-hidden-text'
		);
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/1/1a/Spoiler_Icon.png',
			'Add spoiler',
			'{{SpoilerSection|id=Insert id|\n',
			'\n}}',
			'Insert spoiler text',
			'mw-editbutton-spoiler'
		);
		mw.toolbar.addButton(
			'https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/6/67/Wikipedia_Button.png',
			'Add a link to Wikipedia',
			'{{w|',
			'}}',
			'Insert text',
			'mw-editbutton-wikipedia-link'
		);
		
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
    autoLogForUsers:["User:Kenrori"],
    loadOnNamespace:[-1],
    lang: 'vi',
};

/* On Interlanguage Hover Icon */
$(function(){
 // Setup language selector
 $('#langdiv img').each(function(){
  $(this).css({'height':'auto','width':'150px'});
 });
 $('#langdiv img').hover(function(){
  $(this).animate({width:'180px'},'fast');
  $('#langdiv span').text($(this).attr('alt'));
 },function(){
  $('#langdiv span').text('You-Zitsu Wiki Liên Ngôn Ngữ');
  $(this).animate({width:'150px'},'fast');
 });
});

/* Replaces {{USERNAME}} with the name of the user browsing the page. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

}(window, jQuery, mediaWiki));