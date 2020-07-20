// switching to Wikia's new method, no thanks to HostelNet
//importScriptPage('InactiveUsers/code.js', 'dev');
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
//importScriptPage('AjaxRC/code.js', 'dev');
 
//importScriptPage('HideRail/code.js', 'dev');
 
// should speed up my surfing experience on hostelNet
importArticles({
    type: "script",
    articles: [
    /*    "w:c:dev:AjaxRC/code.js",           */
    /*    "w:c:dev:HideRail/code.js",         */
    /*    "w:c:dev:VisualSpellCheck/code.js", */
        "w:c:dev:FloatingToc/code.js",
        "w:c:dev:RelatedDiscussionsModule/code.js",
        'w:dev:WallGreetingButton/code.js',
        'w:dev:PortableCSSPad/code.js',
        'w:dev:OldFilePages/code.js',
        'u:dev:HeaderLinks/code.js',
        "User:Mfaizsyahmi/FcAlert.js",
    /*    "User:Mfaizsyahmi/ytlinkpopup3.js"  */ /* needed personal testing after the edit page freezing incident */
]
});
 
//importScriptPage('User:Mfaizsyahmi/poll.js', 'hitlerparody');
 
//$(function() {
//  if ($('#WikiaRail').length) {
//    $('.WikiaRail').append('<section class="module infowidgetmodule"><h1>My Widgets</h1><div id="siderailwidget"></div></section>');
//    importScriptPage('InfoWidgets/code.js', 'dev');
//    window.widgetsLoaded = function () {
//       myWidget = Widgets.recentChanges();
//       myWidget.selector = '#siderailwidget';
//       Widgets.add(myWidget);
//    }
//  }
//});
 
// BEGIN BotoneraPopups
importScriptURI('http://dev.wikia.com/wiki/BotoneraPopups/Code/en.js?action=raw&ctype=text/javascript&templates=expand');
importStylesheetPage('BotoneraPopups/code.css', 'dev');
// END
 
/* now global */
/* if (window.location.href.indexOf('action=edit') == -1) {
    $('body').append('<div class="ContestWidget">Contests [<a href="/wiki/Project:Unterganging_Contests?action=edit&useeditor=source">edit</a>]<div class="g-contest"></div></div>')
    $('.g-contest').load('/wiki/Project:Unterganging_Contests?action=render', function() {
        deadlineFlags();
    })
    importStylesheetPage('User:Mfaizsyahmi/g-contest.css', 'hitlerparody');
} */
 
 
/**
 * Makes source mode the default editor w/o disabling visual editor
 * - Appends '&useeditor=source' to edit anchor hrefs
 * - Redirects window.location to window.location.href + '&useeditor=source'
 *   if action=edit but useeditor=source is not present in the url
 * 
 * PERSONAL USE ONLY.
 * Do not put this script in MediaWiki:Common.js or MediaWiki:Wikia.js,
 * or otherwise apply it to other users, that would violate Wikia's Terms of Use.
 * 
 * Author:   User:Mathmagician
 * Skin(s):  Oasis only
 * Updated:  2 November 2012
 * License:  CC-BY-SA
 */
if ({ oasis: 1, wikia: 1 }[mw.config.get('skin')] !== 1) {
	// if skin is not Oasis, do nothing
} else if (window.location.href.indexOf('action=edit') !== -1 && window.location.href.indexOf('useeditor=source') === -1) {
	// backup case: if action=edit but useeditor=source is not in the url
	// then reload the page with useeditor=source appended to the url
	window.location.replace(window.location.href + '&useeditor=source');
} else {
	$(function ($) {
		// add &useeditor=source to the href value of common edit anchors
		$('.wikia-menu-button a, .editsection a').each(function () {
			var $this = $(this),
				href = $this.attr('href');
			if (href.indexOf('action=edit') !== -1 && href.indexOf('useeditor=source') === -1) {
				$this.attr('href', (href + '&useeditor=source'));
			}
		});
	});
}
// END
 
 
// Forum Thread adjustments
// - Add post id
$(".Thread ul.comments ul.replies li").each(function(){
    $("div.edited-by",this).append( '<span class="postId">(#' + $(this).attr("id") + ')</span>' );
});
 
// Change Kudos image - so far no suitable replacement found
//$(".Thread a.vote img).attr("src", "xxxx");
//$(".Thread a.vote.voted img).attr("src", "xxxx");
 
 
$('a.external').attr({ target: '_blank' });