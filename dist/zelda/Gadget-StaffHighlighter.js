// --------------------------------------------------------
// Staff Highlighting (adapted from http://en.wikipedia.org/wiki/User:Ais523/adminrights.js)
// This script changes the color of links to staffs' userpages in the bodyContent of 
// various pages including Special, History pages, diff pages, and old page revisions.
// ("bodyContent" being the content below the page title).
// Based on [[User:ais523/highlightmyname.js]].
// --------------------------------------------------------

var adminrights		= {},
	traineerights	= {},
	execrights		= {},
	botrights		= {},
	retiredrights	= {};

adminrights = {
	"52katie"		:1,
	Androidos18		:1,
	Astroninja1		:1,
	AzelleAx		:1,
	Chuck			:1,
	Greenrupee      :1,
	Htwretched      :1,
	KokoroSenshi	:1,
	Magicmason1000  :1,
	MannedTooth		:1,
	Molldust		:1,
	Tirlby          :1,
	Weirdguy42      :1
};

traineerights = {
	Greenrupee      :1,
	Htwretched      :1,
	Magicmason1000  :1,
	Tirlby          :1,
	Weirdguy42      :1,
};

execrights = {
	Cody			:1,
	Codydaviestv	:1,
	GoldenChaos		:1,
	Jason			:1,
	Joshua			:1,
	Link_Lab		:1,
	Pixel			:1,
	Shona			:1,
	Shona3212		:1,
	Tony			:1,
	TriforceTony	:1,
	Yumil1988		:1
};

botrights = {
	Ashler89			:1,
	KaeporaGaebora		:1,
	KaeporaGaebora4988	:1,
	Mollborg			:1,
	Redirect_fixer		:1,
	The_Groosenator		:1,
	Yuga				:1,
	Yuga17953			:1,
	Rescue_Knight		:1,
};

retiredrights = {
	"901blazebunny"			:1,
	Abdullah				:1,
	Abdullah5599			:1,
	Adam					:1,
	Adam660					:1,
	Alexander				:1,
	Ando					:1,
	Aranok					:1,
	ATorres16				:1,
	AtrumLevis				:1,
	Autydi					:1,
	Axiomist				:1,
	Axle_the_Beast			:1,
	Barquero13095			:1,
	Benfitzy				:1,
	Bob23					:1,
	Bwar1133				:1,
	Captain_Cornflake		:1,
	Captain_Desdinova		:1,
	Caralista				:1,
	Cartoons				:1,
	Ceiling_Master			:1,
	Chocoroko				:1,
	Chrono					:1,
	Cipriano				:1,
	Dannyboy601				:1,
	Dany36					:1,
	Davogones				:1,
	Deku_Link				:1,
	DIUM					:1,
	Djanonx					:1,
	Dustin					:1,
	EA						:1,
	Einstein95				:1,
	Eientei95				:1,
	Embyr_75				:1,
	EpicFaceLOL991			:1,
	EzloSpirit				:1,
	Fizzle					:1,
	Fizzle8094				:1,
	Fox						:1,
	Fury_Three				:1,
	Ganman3					:1,
	Gateway2Drillbit		:1,
	"Hammer_Bro._Mike"		:1,
	Henhouse				:1,
	Hylian_pi				:1,
	Ice_Medallion			:1,
	Jin						:1,
	Jjgodden				:1,
	JohnGames				:1,
	Justin_ZW				:1,
	K2L						:1,
	Kain					:1,
	Ladylokia81				:1,
	Lahvu					:1,
	Lars					:1,
	Lee						:1,
	Legend_of_Zelda_Freak	:1,
	LegendZelda				:1,
	Leminnes				:1,
	Lightninghawk1410		:1,
	Liyuanzao				:1,
	"Lord-of-shadow"		:1,
	Lord_of_the_Twilight	:1,
	Lozzie					:1,
	Luneyes					:1,
	Mandi					:1,
	Mases					:1,
	Matt					:1,
	Melchizedek				:1,
	Mgarroalpha				:1,
	Midoro					:1,
	Minish_Link				:1,
	"Mr._Wiggles"			:1,
	Nathan					:1,
	Noble_Wrot				:1,
	Nox						:1,
	Owl						:1,
	Paragonfishhead			:1,
	Peefy					:1,
	Petenu					:1,
	PhantomCaleb			:1,
	PPLToast				:1,
	Protokhal				:1,
	Sadida					:1,
	Sagasaki				:1,
	SageofHyrule			:1,
	Scott					:1,
	SearanoX				:1,
	Shetani					:1,
	Shiningpikablu252		:1,
	Shinytoy87				:1,
	Sluzorz					:1,
	SnorlaxMonster			:1,
	Steven					:1,
	Steven2113				:1,
	Tappy					:1,
	The_Forbidden_One		:1,
	TheDarkHunter			:1,
	Thewindmaker			:1,
	Toby					:1,
	Tralinde				:1,
	Trico					:1,
	Triforce_of_the_Gods	:1,
	Vaati_The_Wind_Demon	:1,
	Varsityghouls			:1,
	Wielder_of_the_Sword	:1,
	WilliamLC				:1,
	Xizor					:1,
	Yami					:1
};

var action = mw.config.get("wgAction"),
	canonicalNamespace = mw.config.get("wgCanonicalNamespace");

if (  canonicalNamespace == 'Special'
	  || canonicalNamespace == 'File'
	  || canonicalNamespace == 'Help'
	  || canonicalNamespace.indexOf('alk') > 0 /* Talk, User talk, etc.*/
	  || canonicalNamespace == 'Project' /* Zelda Wiki namespace */
	  || action == 'history'
	  || document.URL.indexOf('&diff=') > 0
	  || document.URL.indexOf('&oldid=') > 0) {
	
	$(document).ready(function() {
		$("#bodyContent a").each(function() {
			var n = $(this)
			  , u = null
			  , linkHref = n.attr('href');
			if (linkHref) {
				if (linkHref.substr(0,6) === "/User:") {
					u = linkHref.substr(6);
				} else if (linkHref.substr(0,22) === "/index.php?title=User:") {
					u = linkHref.substr(22);
				}
				if (u !== null) {
					if      (traineerights[u] === 1) n.addClass("trainee admin").removeClass("gamepedia_pro_user");
					else if (adminrights[u] === 1)   n.addClass("admin");
					else if (execrights[u] === 1)    n.addClass("executive");
					else if (botrights[u] === 1)     n.addClass("bot");
					else if (retiredrights[u] === 1) n.addClass("retired");
				}
			}
		});
	});
	
}