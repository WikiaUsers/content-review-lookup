function ContentCheck() {
	var autoconfirmed = false;
	var admin = false;
	var bureaucrat = false;
	var staff = false;
	var helper = false;
	var vstf = false;
	var voter = false;
	var annon = false;
	var user = false;			


	for(i in wgUserGroups) {
		if(wgUserGroups[i] == 'autoconfirmed') {autoconfirmed = true;}
		if(wgUserGroups[i] == 'sysop') {admin = true;}
		if(wgUserGroups[i] == 'bureaucrat') {bureaucrat = true;}
		if(wgUserGroups[i] == 'staff') {staff = true;}
		if(wgUserGroups[i] == 'helper') {helper = true;}
		if(wgUserGroups[i] == 'vstf') {vstf = true;}
		if(wgUserGroups[i] == 'voter') {voter = true;}
		if(wgUserGroups[i] == 'null') {annon = true;}
		if(wgUserGroups[i] == 'user') {user = true;}				}

	if(bureaucrat == false && staff == false && voter == false && admin == false) {
		$('.conditionalcontent').css({'display': 'none'})
	}

	if(voter == true) {
		$('.conditionalcontent2').css({'display': 'none'})
	}

	if(bureaucrat == false && admin == false) {
		$('.conditionalcontent3').css({'display': 'none'})
	}

	if(user == true) {
		$('.conditionalcontent4').css({'display': 'none'})
	}
}

addOnloadHook(ContentCheck);

function AnonMessage() {
	if(wgUserGroups == null) {
		$('.anonmessage').css('display', 'inline');
	}
}

addOnloadHook(AnonMessage)
importScript('MediaWiki:Wikia.js/spellcheck.js');
addOnloadHook(addspCheck);