//===============//
//=Spoiler Alert=//
//===============//
// This script must always be the very first executed
importScriptPage('MediaWiki:SpoilerAlert.js');

    if ($.inArray("Spoiler", wgCategories) > -1) {
        $('#WikiaPageHeader').append('<a id="reset-spoilers" class="wikia-button secondary" style="margin-right: 10px;">Ausblenden/Spoiler</a>');
        $('#reset-spoilers').click(function() {
            localStorage.removeItem("spoilerCache");
            location.reload();
        });
    }


//=========================//
//==Nav Edit-Diskussionen==//
//=========================//

$(function () {
    $('#WikiHeader .nav .nav-item .firstChild  .subnav-2-item:nth-child(5)').after ('<li class="subnav-2-item"><a class="subnav-2a" href="/d" data-canonical="">Diskussionen</a></li>')
});

//=================//
//==Discord Modul==//
//=================//
if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "244882517134409729"
        }
    };
}


//==============//
//={{USERNAME}}=//
//==============//
if (wgUserName !== null) {
	$('.insertusername').html(wgUserName);
}



//=======================================//
//=Edit nach Namen bei Nachrichtenseiten=//
//=======================================//

var messageWallUserTags = {
    'Sabis6111': 'Gründerin',
    'DH2000': 'Administrator',
    'Nachtschattenreiter': 'Administrator',
    'Astrid_Hofferson0001': 'Administratorin',
    'Golddrache': 'Administratorin',
    'Klauenwetzer': 'Administratorin',
    'TripleStrykeFan': 'Inhalts-Moderator',
    'OhnezahnBot': 'Bot'
};
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:white;background: url(https://vignette.wikia.nocookie.net/drachenzahmen-leicht-gemacht/images/c/c2/Drachenhautoptik.png/revision/latest?cb=20150312204031&path-prefix=de);border-radius:10px;padding:1px 3px;margin-left:1px;font-size:70%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
}(jQuery));



//===============================//
//=Verschiedene Ebenen erstellen=//
//===============================//

$('.show_L2').click(function () {
	for ( var hide_L2 = 0; hide_L2 < 11; hide_L2++ ) {
		$('.div_L2_' + hide_L2 ).hide();
	}
	$('.div_L2_' + ( $(this).attr('id') ) ).show();
});