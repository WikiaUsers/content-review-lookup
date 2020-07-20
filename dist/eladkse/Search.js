function SearchGoButton() {
	if ($('#WikiaSearch').length) {
		$('#WikiaSearch button').replaceWith('<button class="wikia-button" name="go" value="Go" style="margin-right:5px;"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21" style="background-image:url(https://images.wikia.nocookie.net/eladkse/images/6/65/GoArrow2.png); background-position:0; height:15px; width:21px;"></button><button class="wikia-button"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21"></button>');
		$('#WikiaSearch input[type="submit"]').attr('value', 'Go').attr('name', 'go');
		$('#WikiaSearch input[type="text"]').css('width', '181px');
		$('#WikiaSearch div.autocomplete').css('width', '197px');
	}
}
addOnloadHook(SearchGoButton);

/* Ping */