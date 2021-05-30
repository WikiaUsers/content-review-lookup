/* temp until MediaWiki:Wikia.js loads in the new skin
addOnloadHook( function () {
	if(skin == "oasis" ) {
		importScriptURI('http://fairlyoddparents.wikia.com/index.php?title=MediaWiki:Wikia.js&action=raw&ctype=text/javascript');
	}
} ); */

importScript('MediaWiki:Functions.js');

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun )
		firstRun = false;
	else
		return;

	initFunctionsJS();

	showEras('title-eraicons');
	rewriteTitle();

	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;

	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}

	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

addOnloadHook( loadFunc );

// ============================================================
// BEGIN JavaScript title rewrite

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE )
		return;
	var titleDiv = document.getElementById('title-meta');

	if( titleDiv == null )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	var node = firstHeading.childNodes[0];

	// new, then old!
	firstHeading.replaceChild(cloneNode, node);
	cloneNode.style.display = "inline";

	var titleAlign = document.getElementById('title-align');
	firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}
// END JavaScript title rewrite
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');
 
/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');
 
/*-- Collapsible Tables --*/
importScript('MediaWiki:Common.js/collapsibletables.js');

/* Collapsible sidebar portlets */
importScript('MediaWiki:Common.js/collapsiblesidebarportlets.js');

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');
 
/* Ajax Auto-Refresh (courtesy pcj) */
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:FOP-related_Discussion", "Forum:Site News and Announcements", "Fairly Odd Parents Wiki:Page_maintenance"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

 
// ==================================================================
// Insert username 
// ==================================================================
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bot': {link: 'Special:ListUsers/bot'},
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'
    }
    },
};

/* UserTags custom settings are here */
importScript('MediaWiki:Common.js/usertags.js');