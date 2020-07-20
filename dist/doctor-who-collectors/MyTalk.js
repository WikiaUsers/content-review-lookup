function MyTalk() {

// Sets offset to screen //
	winwidth = $('div.WikiaPage').width();
	offset = (winwidth+28)

// Basic Buttons - MyTalk //
	if(wgCanonicalNamespace == 'Blog') {}
	else {
		$('#WikiHeader').after('<div id="profilebutton" style="position: fixed; top: 140px; right: ' + offset + 'px; width: 130px;"><a href="http://doctor-who-collectors.wikia.com/wiki/' + 'User:' + 'Tardis1963' + '" title="Profile"><img src="https://images.wikia.nocookie.net/__cb20110610085420/doctor-who-collectors/images/4/49/Profile.png" width="158"></a></div><div id="mytalkbutton" style="position: fixed; top: 189px; right: ' + offset + 'px; width: 130px;"><a href="http://doctor-who-collectors.wikia.com/wiki/' + 'User_talk:' + 'Tardis1963' + '" title="My talk page"><img src="https://images.wikia.nocookie.net/doctor-who-collectors/images/a/a4/Mytalk.png" width="158"></a></div><div id="followingbutton" style="position: fixed; top: 238px; right: ' + offset + 'px; width: 130px;"><a href="http://doctor-who-collectors.wikia.com/wiki/' + 'Special:' + 'Following' + '" title="Followed pages"><img src="https://images.wikia.nocookie.net/doctor-who-collectors/images/d/d4/Following.png" width="158"></a></div>');
	}
}

addOnloadHook(MyTalk);