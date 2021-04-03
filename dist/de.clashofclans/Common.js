//Nachrichten
var messageWallUserTags = {
    'IchMachMucke': 'Administrator',
    'DarkBarbarian': 'Administrator',
    'AmonFatalis': 'Technischer Administrator',
    'Clash_of_Clans_Wikia': 'Administrator',
    'MrKnow': 'Beutekönig',
    'Reazor': 'Wiki-Youtuber',
    'Kr%C3%BCmelmonsta97': 'Rh9-Turnier-Sieger',
    'HockeTW': 'Rh10-Turnier-Sieger',
    'MrMobilefanboyFred': 'Wiki-Youtuber',
    'Tobi_bs': 'Rh11-Turnier-Sieger',
    'SwissDaggy': 'Rh10-Turnier-Sieger',
    'SkelA.de': 'Rh9-Turnier-Sieger',
    'AUT-Aventador': 'Rh11-Turnier-Sieger',
    'Stefan_-_Clash_of_Clans_CM': 'Supercell Community-Manager',
    'NicoHohadler':'Rh9-Turnier-Sieger',
    'Braindeadwulf':'Rh10-Turnier-Sieger',
    'Body95':'Rh11-Turnier-Sieger',
    'R3stl3SSWarr1or':'Moderator'
};
 
$(function($) {
	setTimeout(function() {
		for (var name in messageWallUserTags) {
			$('a[href$="Benutzer:' + name + '"].EntityHeader_name__2oRXg').after('<span style="color:#FFFFFF;background:#ff8450;border-radius:1em;padding:1px 5px;margin-left:5px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
		}
	}, 3000);
});

//Verified-Badge (modified from https://clashofclans.fandom.com/wiki/MediaWiki:Common.js/Lugia.js/Verify.js)
function checkVerif(){
	var users=[
	    	'Stefan - Clash of Clans CM'
	    ];
	
	for(var i = 0; i < users.length; i++) {
		if (new RegExp(/^(.*?\/)?/.source + users[i] + /$/.source).test(mw.config.get('wgTitle'))) {
			var verif=document.createElement('img');
			verif.setAttribute('src','https://images.wikia.nocookie.net/clashofclans/de/images/0/07/Verified-Twitter.png');
			verif.setAttribute('class','verify');
			verif.setAttribute('width','25');
			verif.setAttribute('height','25');
			var __init = function() {
				if ($('.user-identity-box').length) {
					document.querySelector('h1[itemprop="name"]').appendChild(verif);
				} else {
					setTimeout(__init, 500);
				}
			};
			__init();
		}
	}
}
$(checkVerif);

/*AbuseLogRC*/
abuseLogRC_showTo = [ 'content-moderator' ];

/* BackToTopButton */
//window.BackToTopModern = true;