//Creates a sidebar message in monobook and oasis. Script written by Adam "Dser" on 29 September 2012

function() {
	var message = 'For the wiki to run efficiently and for everyone to get on well, please refer to the <a href="/wiki/Image_Guidelines">Image Guidelines</a> and <a href="/wiki/Wiki_Rules">Wiki Rules</a>.';
	if(skin == "monobook") {
		$('#p-wikicities-nav').after('<div class="pBody" id="sideMessage">'+ message +'</div>');
	}

	if(skin == "oasis") {
		$('.WikiaActivityModule').before('<div class="module" id="sideMessage">'+ message +'</div>');
	}
}