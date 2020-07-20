/* if (mw.config.get("wgPageName") == "JukeBox") {



JukeBox = {};
JukeBox.functions = {};
JukeBox.functions.search = function() {
	$("nav#jukebox #jukebox-list li").removeClass("odd").hide();
	$("nav#jukebox #jukebox-list li").each(function(i) {
		if ($(this).text().toLowerCase().indexOf($("nav#jukebox input#jukebox-search-val").val().toLowerCase()) === 0) {
			$(this).show();
			if ($('nav#jukebox #jukebox-list li[style="display: list-item;"]').length % 2 == 1) {
				$(this).addClass("odd");
			}
		}
	});
	var a = /(\u0077\u0068\u0061\u0074\u0020\u0069\u0073\u0020){0,1}\u0074\u0068\u0065\u0020\u0061\u006e\u0073\u0077\u0065\u0072\u0020\u0074\u006f\u0020\u006c\u0069\u0066\u0065\u0020\u0074\u0068\u0065\u0020\u0075\u006e\u0069\u0076\u0065\u0072\u0073\u0065\u0020\u0061\u006e\u0064\u0020\u0065\u0076\u0065\u0072\u0079\u0074\u0068\u0069\u006e\u0067\u003f{0,1}/,
		b = $("nav#jukebox input#jukebox-search-val").val();
	if (a.exec(b) !== null) {
		if (b.replace(a.exec(b)[0],"").length == 0) {
			$('nav#jukebox [data-id="42"]')[0].click();
			$("input#jukebox-controls-play")[0].click();
			$("nav#jukebox #jukebox-info-current").html('<span id="jukebox-info-current"><span>Current song:</span> \u0034\u0032\u0021\u0021\u0021\u0020\u0034\u0032\u0021\u0021\u0021\u0020\u003a\u0044</span>');
		}
	}
}
$(document).ready(function() {
	jukebox = {};
	jukebox.json = {"1":"Coffee Shop","2":"Dance Mix 1","5":"Dance Mix 2","6":"Dance Lounge Music","7":"Stealth","10":"Winter Luau 1","11":"Winter Luau 2","20":"Charlie's Here","21":"Dojo and Ninja Hideout Music","22":"Fire Dojo (Volcano)","23":"EPF Command Room","24":"The Way Of Sensei","27":"Water Dojo","30":"SAPX","31":"The Twelfth Fish Theme","32":"Squidzoid Vs. Shadow Guy And Gamma Gal","33":"TB1","34":"Quest For The Golden Puffle","35":"Penguins That Time Forgot","36":"Team Blue Rally Play","37":"Ruby And The Ruby","38":"Space Adventure Planet Y","39":"Fairy Fables","40":"Penguin Play Awards","41":"HVO","42":"Norman Swarm Has Been Transformed","43":"Secrets of the Bamboo Forest","100":"Hydro Hopper","101":"Bean Counters","102":"Puffle Roundup","103":"Ice Fishing","104":"Cave Runner","105":"Cart Surfing","106":"Pizzatron 3000","110":"Jetpack Adventure","111":"Thin Ice","113":"Catchin' Waves","114":"Aqua Grabber: Clam Waters","115":"Aqua Grabber: Soda Seas","116":"Card-Jitsu","117":"Sled Racing","118":"Card-Jitsu Fire","119":"Puffle Rescue: The Icelands","120":"Puffle Rescue: In The Caves","121":"Puffle Rescue: The Sea","122":"Scorn Victory","123":"Crab Boss","124":"Puffle Launch","125":"Battle Of Doom","200":"Jingle Bells Instrumental","201":"April Fools' Day Music","202":"Submarine Party 1","203":"Submarine Party 2","204":"Summer Party","205":"Seek and Hide","206":"Winter Fiesta 1","207":"Festival of Snow","208":"St. Patrick's Day","209":"Folk Guitar","210":"Driving Guitar","211":"Jazz Piano","212":"Ocean Voyage","213":"Sports Day","214":"Cool Surf","215":"Coconut","216":"Unknown","217":"Water Party","218":"Water Party 2","219":"Camp Party 1","220":"Camp Party Music 2","221":"Fall Fair 1","222":"Fun Fair (Game)","223":"Halloween","224":"Halloween Dance Mix","226":"Christmas 1","227":"Snowy Holidays","228":"Holiday Party","229":"Fiesta Party","230":"Underwater Adventure","231":"April Fools' Day Video Game","232":"April Fools' Music","233":"Medieval Party","234":"Quiet Medieval Party","235":"In The Tower","236":"In The Dungeons","237":"Desserted Place","239":"Reggae Stage","240":"Rock N Roll","241":"Sparkling Stage","242":"DJ3K","243":"Bubble Pop","244":"Flipper Stomper","245":"Orca Straw","246":"Best of the West","247":"Musical Icicles","248":"Unknown","249":"Penguin Games 2","250":"Anniversary Party","251":"Halloween Party 1","252":"Halloween Party 2","253":"Halloween party music 3","254":"Santa's Mix","255":"Deck the Halls (Piano)","256":"Christmas 2","257":"Penguin Games","258":"Waddle On Dance-A-Thon","259":"Puffle Party","260":"Puffle Party 2","261":"Puffle Ragtime","262":"Patrick's Jig","263":"Louder Patrick's Jig","264":"Box Dimension","265":"Gentle Victory Theme/Walk Among the Roses","266":"Knight's Challenge","267":"Jungle Jangles","268":"Adventure Party","269":"Dinosaur Island","270":"Extra Anchovies","271":"Rocking Pizza","272":"VIP Pass","275":"Bonus Level","276":"Easy Island Music","277":"Festival of Flight","278":"Tallest Mountain","279":"Festival of Flight 2","280":"Sled Racing Extended","281":"Santa's Sled","282":"Puffle Party Remix","283":"Bamboo Forest","284":"Recycling Center","285":"Recycling Center","286":"Beware the Dragon","287":"Ye Knights Quest Music 2","288":"Ye Knights Quest Music 3","289":"Pirate Ships","290":"Island Adventure Party 1","291":"Island Adventure Party 2","292":"Casa Fiesta","293":"Quieter You Rock!","294":"Ice Cavern","295":"Toughest Mountain","296":"You Rock!","297":"The Fair Music","298":"Monster Masquerade","299":"Spookiest Swamp","300":"Unknown","301":"Celebration of Water","302":"The Glade","303":"The Wilderness","304":"The Cliff","305":"Brown Puffle Cave","306":"The Shore","307":"Stair Dimension","308":"Ye Knights Quest 3 Music 1","309":"Ye Knights Quest 3 Music 2","310":"Ye Knights Quest 3 Music 3","311":"The Fair Music","312":"Haunted House","313":"Card Jitsu Party 1","314":"Card Jitsu Party 2","315":"The Bakery","316":"Atlantis","317":"Underwater Expedition 2","318":"Rockhopper's Quest","319":"Shipwreck Island","320":"Hall of the Viking Lords","321":"Fashion Show","322":"Bridge to Battle","323":"Scorn Battle","325":"Marvel Super Hero Takeover","326":"City of Heroes","327":"Club Penguin Times Office","328":"City Sounds","329":"Villain Sounds 1","330":"Villain Sounds 2","332":"Dubstep Puffle","333":"Street Rock","334":"Quieter Fashion Show","335":"Epic Show!","336":"Ultimate Jam","337":"The Party Starts Now","338":"Ghostamatron 3000","339":"Haunted Mansion 1","340":"Haunted Mansion 2","341":"Ghosts Just Wanna Dance","342":"EPF Resistance","343":"Herbert's Fortress","344":"Pizza Parlor","345":"Gift Shop","346":"Cool in the Cold","347":"Ice Palace","348":"Pre-Historic","349":"YUM YUM","350":"Savanna","351":"Herbert Style","352":"Hollywood Theme","353":"Quieter Hollywood","354":"Background Awards Ceremony","355":"Penguin High 3","356":"Dubstep Puffle","357":"Quieter Penguin High 3","358":"Return of the Space Squid","359":"High Speed Getaway","360":"Puffle Dance","361":"Puffle Dance 2","362":"Puffle Hotel 1","363":"Unknown","364":"Unknown","365":"Unknown","366":"Rank It Up!","367":"Adventure Party Remix","368":"Summer Party Remix","369":"Puffle Party Remix 1","370":"Puffle Party Remix 2","371":"Puffle Party Remix 3","372":"Box Dimension Remix","373":"Puffle Dance","374":"Puffle Dance Remix","375":"Puffle Dance 2","376":"Puffle Ragtime","378":"EPF Command Room","379":"Forest...","380":"Beach, Dock and Iceberg BG noises","381":"Ski Village and Ski Hill BG noises","384":"Herbert's Lair","385":"Pizza Parlor Crime Scene","386":"Cove Aftermath","387":"Gotta Have a Wingman (instrumental)","389":"Unknown","390":"Villain HQ","391":"Pizza Parlor and Stage","392":"Collide and Conquer","393":"Unknown","394":"Unknown","395":"Unknown","396":"Unknown, no music in igloo on Club Penguin (app)","397":"Spy Drills","398":"Dojo Courtyard","399":"Ninja Hideout","400":"Pre-Celebration of Snow Dojo","401":"Pre-Celebration of Snow Dojo Courtyard","402":"Pre-Celebration of Snow Ninja Hideout","403":"Dojo","404":"Dojo Courtyard","405":"Fire Dojo (w/ volcano noises)","406":"Water Dojo (w/ waterfall noises)","407":"Snow Dojo","408":"Beach/Dock (Celebration of Snow)","409":"Coffee Shop (Celebration of Snow)","410":"Cove/Forest (Celebration of Snow)","411":"Plaza/Snow Forts/Town (Celebration of Snow)","412":"Ski Lodge (Celebration of Snow)","413":"Ninja Headquarters (Celebration of Snow)","414":"Pizza Parlor (Celebration of Snow)","415":"Stadium (Celebration of Snow)","416":"Ski Village (Celebration of Snow)","417":"Collide and Conquer","418":"Through Mountain Passes","419":"Monsters University Takeover Main Theme","420":"Monsters University Takeover Main theme (w/ cheers)","421":"Pizza Parlor (Monsters University Takeover)","422":"Scare Hall (Monsters University Takeover)","423":"Fraternity Row (Monsters University Takeover)","424":"PNK House (Monsters University Takeover)","425":"OK House (Monsters University Takeover)","426":"ROR House (Monsters University Takeover)","427":"JOX House (Monsters University Takeover)","428":"The Party Starts Now (Monster Version)","429":"Coffee Shop (Monsters University Takeover)","430":"University Rally","431":"Pump Up the Rock!","432":"We're All Okay!","433":"Get Pink","434":"Steer the Funk","435":"I've Been Delayed","436":"School","437":"Mine Shack","438":"Cantina (Star Wars Takeover)","439":"Bridge/Elevators (Star Wars Takeover)","440":"Meeting Room (Star Wars Takeover)","441":"Throne Room (Star Wars Takeover)","442":"Tractor Beam (Star Wars Takeover)","443":"Tatooine (Star Wars Takeover)","444":"Lars Homestead\t(Star Wars Takeover)","445":"Mos Eisley (Star Wars Takeover)","446":"Desert (Star Wars Takeover)","447":"Sand Crawler (Star Wars Takeover)","448":"Yavin 4 (Star Wars Takeover)","449":"Rebel Base (Star Wars Takeover)","450":"Detention Block (Star Wars Takeover)","451":"Docking Bay (Star Wars Takeover)","452":"Trash Compactor (Star Wars Takeover)","453":"Millennium Falcon (Star Wars Takeover)","454":"Cantina Band","455":"Star Wars Theme","456":"The Imperial March","457":"The Throne Room","458":"Death Star Ambience","459":"Tatooine Ambience","460":"Star Wars Remix","461":"Surf's Up","462":"Cruisin' for a Bruisin'","463":"Forever Summer","464":"Ride the Wave","465":"Rockin' the Beach","466":"Star Wars Takeover Dance Club","467":"Beach (Teen Beach Movie Summer Jam)","468":"Dock (Teen Beach Movie Summer Jam)","469":"Snow Forts (Teen Beach Movie Summer Jam)","470":"Plaza (Teen Beach Movie Summer Jam)","471":"Stadium (Teen Beach Movie Summer Jam)","472":"Town (Teen Beach Movie Summer Jam)","473":"Big Momma's Backstage (Teen Beach Movie Summer Jam)","474":"Big Momma's (Teen Beach Movie Summer Jam)","475":"Epic Wave (Teen Beach Movie Summer Jam)","476":"Highway (Teen Beach Movie Summer Jam)","477":"Forest (Teen Beach Movie Summer Jam)","478":"Hollywood Theme","479":"Medieval Theme","480":"Coffee Shop (Medieval Party 2013)","481":"Dock (Medieval Party 2013)","482":"Forest (Medieval Party 2013)","483":"Snow Forts (Medieval Party 2013)","484":"Dining Room (Medieval Party 2013)","485":"Pizza Parlor (Medieval Party 2013)","486":"Plaza (Medieval Party 2013)","487":"Stadium (Medieval Party 2013)","488":"School (Medieval Party 2013)","489":"Mine Shack (Medieval Party 2013)","490":"Town (Medieval Party 2013)","491":"Migrator Interior","492":"Migrator Exterior","493":"Dance Club Remix","494":"Wizard Library","495":"Beach (Halloween Party 2013)","496":"Cove (Halloween Party 2013)","497":"Dance Club (Halloween Party 2013)","498":"Dock (Halloween Party 2013)","499":"Forest (Halloween Party 2013)","500":"Snow Forts (Halloween Party 2013)","501":"Unknown","502":"School (Halloween Party 2013)","503":"Mine Shack (Halloween Party 2013)","504":"Mine Shack, Beacon (Halloween Party 2013)","505":"Ski Hill, Ski Village (Halloween Party 2013)","506":"Party In My Iggy","507":"Dare to Enter the Mansion?","508":"Monster Masquerade","509":"Seek and Hide","510":"Ghosts Just Wanna Dance (instrumental)","511":"Ocean Voyage","512":"Plaza, Town (Halloween Party 2013)","513":"Night of the Living Sled: Live (Stage)","514":"What Lurks In The Night","515":"Scary Ambience","516":"We Are The Elite","517":"Stand and Defend","518":"Operation Blackout","519":"Gear Up!","520":"The Command Room","533":"It's Your Birthday, Birthday!","534":"Holiday Lights","536":"Cool In The Cold","559":"Journey to the Prehistoric","560":"Stone-Age Party","561":"Pre-Historic","562":"Ooga Booga","563":"Jungle Ambience","581":"Town","582":"The Beach","583":"Beacon","584":"Iceberg","585":"The Dock","586":"Forest","587":"Snow Forts","588":"Lighthouse","589":"Ski Lodge","590":"Ski Hill","591":"Ski Village","592":"Stadium","601":"Park Entrance","602":"Galaxy Park","603":"Tumbleweed Town","604":"Pirate Park","605":"The Space Squid","606":"8-bit","607":"Bullseye","608":"Wagon Wheel","609":"Marooned Lagoon","610":"Buccaneer Boats","611":"Dock","612":"Puffle Shuffle","613":"Balloon Pop","614":"Lunar Launch","615":"Puffle Soaker","616":"Feed-a-Puffle","617":"Puffle Paddle","618":"Memory Card Game","619":"The Daily Spin","../../../games/smoothie/splashBGM":"Smoothie Smash","../../../games/smoothie/mainBGM":"Smoothie Smash Gameplay"};
	var a = Object.keys(jukebox.json),
		b = [];
	for (var i = 0; i < a.length; i++) {
		b.push('<li data-id="' + a[i] + '"' + (i == 0 ? ' class="selected"' : '') + '>' + jukebox.json[a[i]] + '</li>');
		if (i + 1 == a.length) {
			jukebox.list = b.join("\n");
			$("nav#jukebox #jukebox-list > ul").html("\n" + jukebox.list + "\n");
			$('nav#jukebox #jukebox-list li:even').addClass("odd");
			$("nav#jukebox #jukebox-list ul li").click(function() {
				$("nav#jukebox #jukebox-list ul li.selected").removeClass("selected");
				$(this).addClass("selected");
				$("nav#jukebox #jukebox-controls embed").replaceWith(
					'<embed src="' +
					($("nav#jukebox #jukebox-controls embed").attr("src").length > 0 ? "http://media1.clubpenguin.com/play/v2/content/global/music/" + $(this).attr("data-id") + ".swf" : "") +
					'" data-src="' +
					"http://media1.clubpenguin.com/play/v2/content/global/music/" + $(this).attr("data-id") + ".swf" +
					'" type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
				);
				$("#jukebox-info #jukebox-info-current").html('<span>Current song:</span> ' + $(this).text());
				$("#jukebox-info #jukebox-info-id").html('<span>Song ID:</span> <a href="http://media1.clubpenguin.com/play/v2/content/global/music/' + $(this).attr("data-id") + '.swf" target="_blank">' + (String(Number($(this).attr("data-id"))) == "NaN" ? "NaN" : $(this).attr("data-id")) + '</a>');
			});
			$("input#jukebox-controls-play").click(function() {
				if ($("nav#jukebox #jukebox-controls embed").attr("src").length == 0) {
					$("nav#jukebox #jukebox-controls embed").replaceWith(
						'<embed src="' +
						$("nav#jukebox #jukebox-controls embed").attr("data-src") +
						'" data-src="' +
						$("nav#jukebox #jukebox-controls embed").attr("data-src") +
						'type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
					);
				}
			});
			$("input#jukebox-controls-stop").click(function() {
				if ($("nav#jukebox #jukebox-controls embed").attr("src").length > 0) {
					$("nav#jukebox #jukebox-controls embed").replaceWith(
						'<embed src="" ' +
						'" data-src="' +
						$("nav#jukebox #jukebox-controls embed").attr("src") +
						'" type="application/x-shockwave-flash" oncontextmenu="return false;" \/\>'
					);
				}
			});
			$("nav#jukebox input#jukebox-search-val").on("keyup", function() {
				JukeBox.functions.search();
			});
			$("nav#jukebox #jukebox-search-clr").click(function() {
				$("nav#jukebox #jukebox-list li").each(function(i) {
					$(this).show();
					if (i % 2 === 0) {
						$(this).addClass("odd");
					} else {
						$(this).removeClass("odd");
					}
				});
			});
			$("nav#jukebox #jukebox-search-go").click(function() {
				JukeBox.functions.search();
			});
		}
	}
}());

/*
// get json from [[List of Music]]
var a = {};
$(".wikitable td:nth-child(1)").each(function(i) {
	var b = $(".wikitable td:nth-child(2)")[i].innerText.replace(/\n/g, "");
	a[
		$(".wikitable td:nth-child(1)")[i].innerText.replace(/\n/g, "").replace(/ /g, "")
	] = b.indexOf(" ") == 0 ? b.substr(1) : b;
});
*/