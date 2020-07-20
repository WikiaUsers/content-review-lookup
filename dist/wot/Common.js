//<nowiki><pre>


//Remove chapter summaries from Special:Shortpages
function remove_chapter_links() {
	if (document.title.indexOf('Short pages') != -1) {
		for (i=0;i<document.getElementsByTagName("li").length; i++) {
			var item = document.getElementsByTagName("li").item(i);
			if (item.innerHTML.match('Chapter|Prologue|Epilogue')) {
				item.style.display = "none";
			}
		}
	}
}
if (window.addEventListener) window.addEventListener("load", remove_chapter_links, false);
else if (window.attachEvent) window.attachEvent("onload", remove_chapter_links);


//Display username
function substUsername()
{
    var spans = getElementsByClass('insertusername', null, 'span');

    for(var i = 0; i < spans.length; i++)
    {
        spans[i].innerHTML = wgUserName;
    }
}


//Show and Hide stuff
var ShowHideConfig = { autoCollapse: Infinity, userLang: true };
importScriptPage('ShowHide/code.js', 'dev');


//Ajax Auto Refresh tick box
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

// Refresh button //
importScriptPage( 'PurgeButton/code.js', 'dev' );
var PurgeButtonText = 'Refresh';

// Clock above Wiki Activity //
importScriptPage('DisplayClock/code.js', 'dev');

// Rewrites the page's title, used by Template:Title

$('.WikiaPageHeader h1').html($('.changePageTitle').html());

// Option to remove Redirect pages from Specail:AllPages //

importScriptPage('AllPagesHideRedirect/code.js', 'dev');

//Edit summary dropdown, using Template:Stdsummaries

importScriptPage('Standard_Edit_Summary/code.js', 'dev');

// Category sorting options, created by User:Pecoes

if (!window.dev) window.dev = {};
if (!window.dev.catSort) window.dev.catSort = {};
window.dev.catSort.cat = 'Sort option categories';
importArticles({
    type: 'script',
    article: 'u:dev:Category_Sorter/code.js'
});

//</nowiki></pre>