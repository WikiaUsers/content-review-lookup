importScriptPage('User:Joeytje50/ChatLogger.js', 'runescape');

if (wgCanonicalNamespace == 'User' || wgCanonicalNamespace == 'User_talk') {
$('<span class="button" onclick="hideBar()">Hide</span>').insertAfter('.UserProfileActionButton');
$('<span class="button" onclick="showBar()">Show</span>').insertAfter('.UserProfileActionButton');
}
 
function hideBar() {
$('#UserProfileMasthead').hide();
}
 
function showBar() {
$('#UserProfileMasthead').show();
}

/* add a button that increases the content size and hides the rail */
function CreateContentResizeButton() {
	var contentWidth = $('#WikiaMainContent').width();
	var catlinksWidth = $('#catlinks').width();
	var html = '<ul class="wikia-menu-button" id="resizeButton" style="margin-left:10px"><a onclick="ExpandContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a></ul>';
	if(contentWidth < 1000) {
		if($('#WikiHeader .wikia-menu-button').length > 0) {$('#WikiHeader .wikia-menu-button').after(html);}
		if($('#WikiHeader .wikia-button').length > 0) {$('#WikiHeader .wikia-button').after(html);}
		if($('#WikiHeader .view-source').length > 0) {$('#WikiHeader .view-source').after(html);}
		if(wgCanonicalNamespace == 'User_blog') {$('#WikiaUserPagesHeader .wikia-button').after(html);}
	}
}
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(contentWidth, catlinksWidth) {
	document.getElementById('WikiaMainContent').style.width = '1000px';
	document.getElementById('catlinks').style.width = '1000px';
	document.getElementById('WikiaRail').style.display = 'none';
	$('#resizeButton a').replaceWith('<a onclick="CompressContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Compress the content area back to its original width, and restore the side rail."> Compress >--< </a>');
}

function CompressContent(contentWidth, catlinksWidth) {
	document.getElementById('WikiaMainContent').style.width = contentWidth;
	document.getElementById('catlinks').style.width = catlinksWidth;
	document.getElementById('WikiaRail').style.display = 'block';
	$('#resizeButton a').replaceWith('<a onclick="ExpandContent(' + contentWidth + ', ' + catlinksWidth + ');" data-id="resizeButton" style="color:#fff;" title="Expands the content area. Note that this will hide the side rail."> Expand <--> </a>');
}