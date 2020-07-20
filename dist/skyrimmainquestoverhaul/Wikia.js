importScript("MediaWiki:Common.js");

/***********************************/
/*  Relocate Pages on this Wiki    */
/* Added by JibstaMan (23-07-2012) */
/* Original found at Casualty Wiki */
/***********************************/
/* Displays the "Pages on this Wiki" above Recent Wiki Activity, with an "Add a Page" button */
function PageCounter() {
	if (wgPageName == "Skyrim_Main_Quest_Overhaul_Wiki") {
		$('.WikiaPageHeader .tally').css('display', 'block');
	} else if (wgCanonicalNamespace != 'Special') {
		$('.WikiaPageHeader .tally').attr("id","tally");
 
		var tsource = document.getElementById('tally');
 
		if (tsource!=null) {
			$('.WikiaActivityModule').before('<section class="WikiaPagesOnWikiModule module"><h1>Pages on Skyrim Main Quest Overhaul Wiki</h1><a href="/wiki/Special:CreatePage" title="Create a new page on this wiki" class="wikia-button createpage"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="0" width="0" class="sprite new"> Add a Page</a><div class="tally"><span id="newtally"></span></div></section>')
			var ttarget = document.getElementById('newtally');
			tsource = tsource.parentNode.removeChild(tsource);
			if (ttarget!=null) {
				ttarget.parentNode.insertBefore(tsource,ttarget);
			}
		}
	}
}
 
addOnloadHook(PageCounter);

/***********************************/
/*   Editor Cancel Dropdown Item   */
/* Added by JibstaMan (23-07-2012) */
/* Original found at Casualty Wiki */
/***********************************/
/* Adds a Cancel button to the Preview dropdown during editing */
function EditorDropdown() {
	$('section#EditPage nav.wikia-menu-button ul').append('<li><a id="wpCancel" href="/wiki/'+ wgPageName +'"> Cancel </a></li>');
}
addOnloadHook(EditorDropdown);

/*******************************************/
/*              Image upload               */
/*     Added by JibstaMan (05-08-2012)     */
/* Original found at Assassin's Creed Wiki */
/*******************************************/
/* Add a Photo button at the right side of the screen will go to the Special:Upload page, instead of opening a popup menu. */
$(document).ready(function()
{
   $('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});