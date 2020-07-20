/* By LUModder - used with permission */

 /* add a button that increases the content size and hides the rail - 2/1/11 */
function CreateContentResizeButton() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
	if(contentWidth < 1000) {
		$('section article header ul.wikia-menu-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		$('section article header a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		$('section article header a.view-source').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		if(wgCanonicalNamespace == 'User_blog') {
			$('section article div#WikiaUserPagesHeader a.wikia-button').after('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
		}
	}
}
 
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
	$('div#catlinks.catlinks').css({"width": '1000px'});
	$('div#WikiaRail.WikiaRail').css({"display": 'none'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="CompressContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Compress the content area back to its original width, and restore the side rail."> Compress </a></ul>');
}
 
function CompressContent(headerWidth, contentWidth, catlinksWidth) {
	$('header#WikiaPageHeader.WikiaPageHeader details').css({"width": headerWidth});
	$('article#WikiaMainContent.WikiaMainContent').css({"width": contentWidth});
	$('div#catlinks.catlinks').css({"width": catlinksWidth});
	$('div#WikiaRail.WikiaRail').css({"display": 'block'});
	$('ul#resizeButton').replaceWith('<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:black;" title="Expands the content area. Note that this will hide the side rail."> Expand </a></ul>');
}

/* Switchtabs (ask [[User:UltrasonicNXT]] for help) */
$(function() {
    if (!document.getElementById("switchtabs")) {
        return;
    }
    var page = wgTitle;
    var ina = "<a id='ina' href='http://yoshi.wikia.com/wiki/Nutshell:" + page + "'>Nutshell</a>"; //this line
    var com = "<a id='com' href='http://yoshi.wikia.com/wiki/Comments:" + page + "'>Comments</a>"; //and this
    var wiki = "<a id='wiki' href='http://yoshi.wikia.com/wiki/" + page + "'>Encyclopedia</a>"; //and this
    var string = wiki + ina + com;
    document.getElementById("switchtabs").innerHTML = string;
 
    var ns = wgNamespaceNumber;
    switch (ns) {
    case 0:
        document.getElementById("wiki").className = "selected";
        break;
    case 114:
        document.getElementById("ina").className = "selected";
        break;
    case 118:
        document.getElementById("com").className = "selected";
        break;
    }
});