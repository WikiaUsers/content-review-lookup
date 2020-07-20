/* Any JavaScript here will be loaded for all users on every page load. */
/* add a button that increases the content size and hides the rail */
function CreateContentResizeButton() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
	if(contentWidth < 1000) {
		$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
		$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
		$('div#catlinks.catlinks').css({"width": '1000px'});
		$('div#WikiaRail.WikiaRail').css({"display": 'none'});
		$('section article header ul.wikia-menu-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent();" data-id="resizeButton" style="color:#fff;" title="Powraca do normalnych ustawień."> Zmniejsz >--< </a></ul>');
		$('section article header a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent();" data-id="resizeButton" style="color:#fff;" title="Powraca do normalnych ustawień."> Zmniejsz >--< </a></ul>');
		$('section article header a.view-source').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent();" data-id="resizeButton" style="color:#fff;" title="Powraca do normalnych ustawień."> Zmniejsz >--< </a></ul>');
		if(wgCanonicalNamespace == 'User_blog') {
			$('section article div#WikiaUserPagesHeader a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent();" data-id="resizeButton" style="color:#fff;" title="Powraca do normalnych ustawień."> Zmniejsz >--< </a></ul>');
		}
	}
}
 
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
	$('div#catlinks.catlinks').css({"width": '1000px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Powraca do normalnych ustawień."> Zmniejsz >--< </a></ul>');
}

function CompressContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": headerWidth});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": contentWidth});
	$('div#catlinks.catlinks').css({"width": catlinksWidth});
	$('div#WikiaRail.WikiaRail').css({"display": 'block'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Powiększa obszar wikii."> Powiększ <--> </a></ul>');
}