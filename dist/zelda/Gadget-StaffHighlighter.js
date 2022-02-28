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
	Ceiling_Master	:1,
	Chuck			:1,
	Crocsandsocks	:1,
	Htwretched		:1,
	JumbledLimes	:1,
	Magicmason1000	:1,
	MannedTooth		:1,
	Weirdguy42      :1
};

traineerights = {
	Crocsandsocks	:1,
	JumbledLimes	:1,
	Weirdguy42      :1,
};

execrights = {
	Tony			:1,
	TriforceTony	:1,
};

botrights = {
	"KaeporaGaebora4988@legacy41961238" :1,
	Mollborg							:1,
	"Redirect_fixer@legacy41566905"		:1,
	"The Groosenator@legacy41970431"	:1,
	"Yuga17953@legacy41972810"			:1,
	"Rescue Knight@legacy41973141"		:1,
};

retiredrights = {
	"52katie"								:1,
	"901blazebunny"							:1,
	"Abdullah5599@legacy41961806"			:1,		
	"Adam660@legacy41957735"				:1,
	"@legacy41918756"						:1, //Username is strange, but this is Alexander.
	"Ando1400@legacy41958204"				:1,
	"Aranok@legacy41971657"					:1,
	Astroninja1								:1,
	ATorres16								:1,
	"AtrumLevis@legacy41959620"				:1,
	"Autydi@legacy41960517"					:1,
	"Axiomist1875@legacy41958496"			:1,
	"Axle the Beast@legacy41959667"			:1,
	AzelleAx								:1,
	"Barquero13095@legacy41968829"			:1,
	"Benfitzy@legacy41973488"				:1,
	"Bob23-gpuser"							:1,
	"Bwar1133@legacy41958018"				:1,
	"Captain Cornflake@legacy41957168"		:1,
	"Caralista@legacy41972720"				:1,
	"Chocoroko@legacy41971095"				:1,
	"Chrono@legacy41957515"					:1,
	"Cipriano555@legacy41957663"			:1,
	CodyDaviesTV							:1,
	"Dannyboy601@legacy41964100"			:1,
	Dany36									:1,
	"Davogones@legacy41959079"				:1,
	"Deku Link@legacy41958439"				:1,
	"DIUM@legacy41957195"					:1,
	"Djanonx@legacy41973481"				:1,
	"Dustin@legacy41958201"					:1,
	"EA@legacy41957367"						:1,
	Eientei95								:1,
	Embyr_75								:1,
	"EpicFaceLOL99116262@legacy41971585"	:1,
	Ezlospirit								:1,
	"Fizzle8094@legacy41964097"				:1,
	"Fury_Three@legacy41957177"				:1,
	"Gateway2Drillbit17840@legacy41972702"	:1,
	Greenrupee								:1,
	GoldenChaos								:1,
	"Hammer Bro. Mike@legacy41612541"		:1,
	"Henhouse@legacy41957523"				:1,
	Hylian_pi								:1,
	"Ice Medallion@legacy41965084"			:1,
	"Jin-gpuser"							:1,
	"Jjgodden@legacy41973411"				:1,
	"JohnGames91@legacy41957251"			:1,
	Justin_ZW								:1,
	"K2L3798@legacy41960118"				:1,
	"Kain@legacy41957526"					:1,
	KokoroSenshi							:1,
	Ladylokia81								:1,
	"Lahvu@legacy41972665"					:1,
	"Lars3@legacy41957169"					:1,
	"Legend of Zelda Freak@legacy41973482"	:1,
	"LegendZelda@legacy41960940"			:1,
	"Leminnes@legacy41957181"				:1,
	Lightninghawk1410						:1,
	"Liyuanzao@legacy41957487"				:1,
	"Lord-of-shadow@legacy41554631"			:1,
	"Lord of the Twilight@legacy41958504"	:1,
	"Lozzie@legacy41957173"					:1,
	"Luneyes@legacy41973418"				:1,
	"Mandi2517@legacy41958928"				:1,
	"Mases554@legacy41957662"				:1,
	"Matt1828@legacy41958469"				:1,
	"Melchizedek1866@legacy41958488"		:1,
	Midoro									:1,
	Molldust								:1,
	Mrbarquero								:1,
	"Mr. Wiggles@legacy41957504"			:1,
	"Nathan747@legacy41957787"				:1,
	"Noble Wrot@legacy41959850"				:1,
	"Nox16@legacy41957179"					:1,	
	"Owl13@legacy41957176"					:1,
	Paragonfishhead							:1,
	"Peefy@legacy41957194"					:1,
	"Petenu@legacy41960717"					:1,
	Pixel									:1,
	PhantomCaleb							:1,
	PPLToast								:1,
	Protokhal								:1,
	"Sagasaki@legacy41957658"				:1,
	SageofHyrule							:1,
	"Scott26@legacy41957189"				:1,
	"SearanoX@legacy41957188"				:1,
	"Shetani@legacy41957182"				:1,
	"Shona3212@legacy41959579"				:1,
	Shiningpikablu252						:1,
	Shinytoy87								:1,
	"Sluzorz@legacy41965454"				:1,
	SnorlaxMonster							:1,
	"Steven2113@legacy41958623"				:1,
	"Tappy3063@legacy41959437"				:1,
	Tirlby      							:1,
	"Toby@legacy41957292"					:1,
	"Triforce of the Gods@legacy41959031"	:1,
	Vaati_the_Wind_Demon					:1,
	"Vaati The Wind Demon@legacy41963446"	:1,
	Varsityghouls							:1,
	"Wielder of the Sword@legacy41957248"	:1,
	"WilliamLC15858@legacy41971230"			:1,
	"Xizor1429@legacy41958224"				:1,
	Yami									:1,
	Yumil1988								:1
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
		$("#content a").each(function() {
			var n = $(this)
			  , u = null
			  , linkHref = n.attr('href');
			if (linkHref) {
				if (linkHref.substr(0,11) === "/wiki/User:") {
					u = linkHref.substr(11);
				} else if (linkHref.substr(0,27) === "/wiki/index.php?title=User:") {
					u = linkHref.substr(27);
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