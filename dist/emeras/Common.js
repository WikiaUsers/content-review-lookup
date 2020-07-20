/* Any JavaScript here will be loaded for all users on every page load. */

function addTopLink() {
        $("#WikiaArticle").append('<div style="margin:10px 0; text-align:center; font-size:90%; font-weight:bold"><a href="#">BACK TO TOP</a></div>');
}

$(addTopLink);

importScriptPage('AutoEditDropdown/code.js', 'dev');

function SearchGoButton() {
	if ($('#WikiaSearch').length) {
		$('#WikiaSearch button.secondary').before('<button class="secondary" style="right: 43px;" name="go" value="Go"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21" style="background-image:url(https://images.wikia.nocookie.net/emeras/images/4/41/Arrow.png); background-position:0; height:auto;"></button>');
		$('#WikiaSearch input[type="submit"]').attr('value', 'Go').attr('name', 'go');
		$('#WikiaSearch input[type="text"]').css('width', '208px').css('padding-right', '87px');
	} else if ($('#search-v2-form').length) {
		$('#search-v2-form button').before('<input type="submit" value="Go" name="go">').after('<button type="submit" class="wikia-button" id="search-v2-button" value="Go" name="go" style="margin-right:10px;"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21" style="background-image:url(https://images.wikia.nocookie.net/dev/images/6/65/GoArrow2.png); background-position:0; height:auto; width:20px;"></button>');
		$('#search-v2-form input[type="text"]').attr('name', 'search').css('width', '466px').css('margin-right', '10px');
	}
}
addOnloadHook(SearchGoButton);