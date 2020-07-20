/* Any JavaScript here will be loaded for all users on every page load. */
//<nowiki>

//Ajax refresh
var ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Forum:Yew_Grove", "RuneScape:Active_discussions", "Special:AbuseLog", "Special:NewFiles", "Category:Speedy_deletion_candidates", "Category:Speedy_move_candidates", "Special:Statistics", "Special:NewPages", "Special:ListFiles", "Special:Log/move"];
var AjaxRCRefreshText = 'Auto-refresh';

importScriptPage('MediaWiki:Common.js/ajaxrefresh.js','rs');

var _Hasync= _Hasync|| [];
 _Hasync.push(['Histats.start', '1,2235373,4,603,110,40,"00000010"']);
 _Hasync.push(['Histats.fasi', '1']);
 _Hasync.push(['Histats.track_hits', '']);
 (function() { 
var hs = document.createElement('script'); 
hs.type = 'text/javascript';
 hs.async = true;
 hs.src = ('http://s10.histats.com/js15_as.js');
 (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs); })();

// AWB (In browser)
importScriptPage('User:Joeytje50/AWBload.js','dev');

// Automatic file fixing
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)){
   LIRoptions = {
	bottomMessage: 'This appears below the buttons on Special:MovePage',
	editSummary: 'Updating file link (automatic)',
	singleButtonText: 'Rename and replace',
        queueButtonText: 'Rename and add to queue'
   }
 
   importScriptPage("FileUsageAuto-update/code.js", "dev");
}

// Unchecks redirects when moving files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
    $('input#wpLeaveRedirect').removeAttr('checked'); 
}

if ((wgUserGroups||[]).indexOf('sysop')!=-1) {
	var autoWelcomeText = '{{subst:Welcome|~~~~}}', autoWelcomeSummary = '';
	importScriptPage('User:Quarenon/autowelcome.js','rs');
}

importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MiniComplete/code.js',
	'MediaWiki:Common.js/compare.js',
        'u:dev:DISPLAYTITLE/code.js',
        'MediaWiki:Common.js/youtube.js'
        // ...
    ]
} );
//calc.js import from main RSWiki
if ($('.jcConfig').length) {
    importScriptPage('MediaWiki:Common.js/calc.js', 'rs');
    importStylesheetPage('MediaWiki:Common.css/calc.css', 'rs');
}
/**
* Moves topright icons to be inserted into Wikia pageheader
* Requires additional CSS in [[MediaWiki:Wikia.css]]
*
* @author The 888th Avatar (Avatar Wiki)
* @author Cqm
* @author Joeytje50
*/
$('#firstHeading, #WikiaPageHeader').append('<div id="rs-header-icons"></div>');
$('.topright-icon').each(function() {
    $('#rs-header-icons').append(this.innerHTML);
});