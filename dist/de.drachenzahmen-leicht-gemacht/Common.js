//===================//
//== Discord-Modul ==//
//===================//
if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "244882517134409729"
        }
    };
}



//==============//
//== USERNAME ==//
//==============//
if (wgUserName !== null) {
	$('.insertusername').html(wgUserName);
}