function PageCounter() {
	if (wgPageName == "Walking_With_Wikis") {
		$('.WikiaPageHeader .tally').css('display', 'block');
	} else if (wgCanonicalNamespace != 'Special') {
		$('.WikiaPageHeader .tally em').attr("id","tally");
 
		var tsource = document.getElementById('tally');
 
		if (tsource!=null) {
			$('.WikiaActivityModule').before('<section class="WikiaPagesOnWikiModule module"><h1>Pages on Walking With Wikis</h1><a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="0" width="0" class="sprite new"> Add a Page</a><div class="tally"><span id="newtally" class="fixedwidth">pages on this wiki</span></div></section>')
			var ttarget = document.getElementById('newtally');
			tsource = tsource.parentNode.removeChild(tsource);
			if (ttarget!=null) {
				ttarget.parentNode.insertBefore(tsource,ttarget);
			}
		}
	}
}
 
addOnloadHook(PageHead);

// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];