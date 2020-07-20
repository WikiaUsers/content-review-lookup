/* Any JavaScript here will be loaded for all users on every page load. */
 
//Makes tables collapsible
importScriptPage( 'ShowHide/code.js', 'dev' );
 
//Enable auto-refreshing
importScript("MediaWiki:Common.js/AutoRefresh.js");
 
//Enables countdowns
importScriptPage('Countdown/code.js', 'dev');
 
//Archive tool
var archiveListTemplate = 'Archives'; 
var archivePageTemplate = 'Archivepage'; 
importScriptPage('ArchiveTool/code.js', 'dev');
 
//Grayed-out edit button for archived talk pages
importScript("MediaWiki:Common.js/GrayEditButtonArchive.js");
 
//Extra user mastheads
importScript("MediaWiki:Common.js/UserMastheads.js");
 
/* Adds icons to page header bottom border */
 
$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/* Chat module */

if ( $( '.ChatModule' ).length ) {
    $.get( '/wiki/MediaWiki:Chat-headline?action=raw', function ( data ) {
        if ( $( '.chat-name' ).length ) {
            $( '.chat-name' ).html( data );
        } else {
            var int = setInterval( function() {
                if ($( '.chat-name' ).length ){
                   $( '.chat-name' ).html( data );
                   clearInterval( int );
                }
            }, 50 );
        }
    } );
}

/* Any JavaScript here will be loaded for all users on every page load. */
 
window.AjaxRCRefreshText = 'Reload the Data';
window.AjaxRCRefreshHoverText = 'Click to reload';
importScriptPage('AjaxRC/code.js', 'dev');
ajaxPages = ["Special:WikiActivity"];
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});
 
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
 
// UserTags
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {
            u: 'President',
            link: 'Project:Staff#Bureaucrat'
        },
        mod: {
            u: 'Staff Moderator',
            link: 'Project:Staff#Staff Moderator'
        },
        dapc: {
            u: 'Disciplinary Admin and Plagiarism Checker',
            link: 'Project:Staff#Disciplinary Admin/Plagiarism Checker'
        },
        chatmod: {
            u: 'Chat Moderator/Media Supervisor',
            link: 'Project:Staff#Chat Moderator/Media Supervisor'
        }
    }
};
UserTagsJS.modules.custom = {
    'Bighead910': [ 'bureaucrat' ], 
    'SonicSpeedster912': [ 'mod' ],
    'Tobalth': [ 'dapc' ],
    'TheDarkKnightHasRisen': [ 'chatmod' ]
};

/* Inactive Users */
InactiveUsers = { 
	months: 1
};

 // *****************************
 // Beginning of Script importing
 // *****************************
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/histats.js",
        "MediaWiki:Common.js/InactiveUsers.js",
        "MediaWiki:Common.js/SigCheck.js",
        "MediaWiki:Common.js/FileUpdater.js",
        "MediaWiki:Common.js/icons.js",
        "MediaWiki:Common.js/countdownclock.js",
        "w:c:dev:ShowHide/code.js",
        "w:c:dev:LockOldBlogs/code.js",
        "w:c:dev:DisplayClock/code.js",
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:AllPagesHideRedirect/code.js',
        "w:c:dev:PurgeButton/code.js",
        'w:c:dev:DisableArchiveEdit/code.js',
        "w:c:runescape:MediaWiki:Common.js/WLH_edit.js",
        "w:c:onceuponatime:MediaWiki:CollapsibleTables.js",
        "w:c:onceuponatime:MediaWiki:Common.js/DuplicateImages.js",
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:UserTags/code.js",
        "w:c:dev:InactiveUsers/code.js"
    ]
});