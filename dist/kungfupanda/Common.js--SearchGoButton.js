// ******************************************************
// * SearchGoButton - Version 1.2.5			*
// *							*
// * Script by Eladkse					*
// ******************************************************
//
 
function SearchGoButton() {
	if ($('#WikiaSearch').length) {
		$('#WikiaSearch button.secondary').before('<button class="secondary" style="right: 43px;" name="go" value="Go"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21" style="background-image:url(https://images.wikia.nocookie.net/dev/images/d/d5/GoArrow.png); background-position:0; height:auto;"></button>');
		$('#WikiaSearch input[type="submit"]').attr('value', 'Go').attr('name', 'go');
		$('#WikiaSearch input[type="text"]').css('width', '208px').css('padding-right', '87px');
		if (wgPageName == 'Special:Search') {
			$('#WikiaSearch input[type="text"]').css('width', '568px');
		}
	}
}
addOnloadHook(SearchGoButton);
 
//