( 'PurgeButton/code.js', 'dev' );

/* add a button that increases the content size and hides the rail */
function CreateContentResizeButton() {
	if(wgTitle != wgMainPageTitle) {
		$('ul.wikia-menu-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent();" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a></ul>');
	}
}
 
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent() {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
	$('div#catlinks.catlinks').css({"width": '1000px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent();" data-id="resizeButton" style="color:#fff;" title="Compress the content area back to its original width, and restore the side rail."> Compress >--< </a></ul>');
}
 
function CompressContent() {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '670px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '680px'});
	$('div#catlinks.catlinks').css({"width": '638px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'block'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent();" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a></ul>');
}