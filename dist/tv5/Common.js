/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom block message send with dev script MessageBlock */
window.MessageBlock = {
  title : 'Blocked',
  message : 'You have violated the TV5 Wiki policy. As a preventative measure, you have been blocked from editing for $2 due to $1. If you believe this block is unjustified or that there has been a mistake, you may contest this this block on my wall on Community Central.',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlock/code.js'
    ]
});

/* User profile header custom tags */
window.UserTagsJS = {
modules: {},
tags: {
sysop: { link:'Project:Administrators' },
rollback: { link:'Project:Rollback' }
}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];

//Link FA

var FA_enabled  = true;

function addfaicon() {
	// if disabled
	if (!FA_enabled) return;
	var pLang = document.getElementById("p-lang");
	if (!pLang) return;
	var lis = pLang.getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		var li = lis[i];
		// only links with a corresponding Link_FA template are interesting
		if (!document.getElementById(li.className + "-fa"))   continue;
		// additional class so the template can be hidden with CSS
		li.className += " FA";
		// change title (mouse over)
		li.title = "This article is rated as featured article.";
	}
}
$(addfaicon);

// Adds icons to page header bottom border
// Credits to https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIcons() {
    if ( $( '#icons' ).length ) {
    	$( '.page-header__actions' ).first().prepend( $( '#icons' ).show() );
    }
} );
/* Spoiler Alert, credits to Marvel Cinematic Universe Wiki */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/*******************************************************************************
** Re-add proper namespace prefix to titles where it has been removed "by design"
* Credits to Memory Alpha
*******************************************************************************/
$('.ns-5 .page-header__title').prepend('TV5 Wiki ');
$('.ns-6 .page-header__title').prepend('File:');
$('.ns-7 .page-header__title').prepend('File ');
$('.ns-8 .page-header__title').prepend('MediaWiki:');
$('.ns-9 .page-header__title').prepend('MediaWiki ');
$('.ns-10 .page-header__title').prepend('Template:');
$('.ns-11 .page-header__title').prepend('Template ');
$('.ns-13 .page-header__title').prepend('Help ');
$('.ns-14 .page-header__title').prepend('Category:');
$('.ns-15 .page-header__title').prepend('Category ');