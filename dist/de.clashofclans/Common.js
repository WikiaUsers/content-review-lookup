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
			verif.setAttribute('style','margin-left: 5px;');
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

// ClashRoyale-Link (from clashofclans.fandom.com)
$(document).ready(function() {
    // Clash Royale topic interwiki links
    $("#ClashRoyaleLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});
});