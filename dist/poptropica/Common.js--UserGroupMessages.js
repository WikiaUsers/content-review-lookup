// <source lang="JavaScript">
// from Monchoman45

function UserGroupMessages() {
	//if the whole thing is null, it's an anon
	if(wgUserGroups == null) {$('.anonmessage').css('display', 'inline'); return;}
	//otherwise it's an array
	for(var i in wgUserGroups) {
		switch(wgUserGroups[i]) {
			case 'staff':
			case 'helper':
			case 'vstf':
			case 'bureaucrat':
				$('.cratmessage').css('display', 'inline');
			case 'sysop':
				$('.adminmessage').css('display', 'inline');
				break;
			case 'autoconfirmed':
				$('.autoconfmessage').css('display', 'inline');
				break;
		}
	}
}
addOnloadHook(UserGroupMessages);

// </source>