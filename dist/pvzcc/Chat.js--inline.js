var CustomAlerts = {};
var ownusername = wgUserName;
var perf = $("#pseudo-inline-alert").attr("data-user");
 
// command list
CustomAlerts.cmd = {
	waffles: "\\ OpieOP / Waffle party! \\ OpieOP /",
	gaben: "ALL HAIL LORD GABEN (gaben) ",
	username: wgUserName + " got eaten ",
	id: wgChatRoomId,
	shoot: perf + " shot obama",
	dbz: "Always bet on dbz Keepo ",
	dbz2: "Never bet on dbz Kappa ",
	dbz3: "Always sometimes never bet on DBZ...maybe OpieOP ",
	potato: "Potato ate my toilet D: ",
	orbsome: ("Orb is 2orbsome").sup(),
	quiz1: "QUIZ TIME! Who is the main hero in Feshe Adventures? a) Feshe; b) Hesum; c) Orbagel; d) Obama ",
	quiz2: "QUIZ TIME! Who said this?  a) Mister Stay Puft; b) HKH; c) Orbacca; d) Ninja Penguins ",
	emotes: ("-> List of all chat emotes <-").link("http://pvzcc.wikia.com/wiki/MediaWiki:Emoticons").fontsize(3),
	rules: ("-> Chat rules <-").link("http://pvzcc.wikia.com/wiki/Plants_vs._Zombies_Character_Creator_Wiki:Rules#Chat").fontsize(3),
	walruses: "Walrus party! OpieOP ",
	goldaccount: ("Sorry! You need a PvZCC Gold Account to access that feature.").fontcolor("goldenrod"),
	premium: ("Sorry! You need a PvZCC Premium Account to access that feature.").fontcolor("purple"),
	core: ("Sorry! You need a PvZCC Core™ Membership to access that feature.").fontcolor("darkgreen"),
	potato2: ("Sorry! You need to go eat a potato to access that feature.").fontcolor("chocolate"),
	shipping: ("I ship Reapeageddon and Princess Kitty.").strike(),
	languagejoke: "I do not speak English!",
	titledefense: "ZEM TITLE'S MINE, YOU AIN'T NEVER GONNA GET IT!",
	jooaoaoo : "Jooaoaoo is the king of pvzcc!",
	notfounderror : "404 not found!",
	c5 : "5",
	c4 : "4",
	c3 : "3",
	c2 : "2",
	c1 : "1",
	bday : ("Happy birthday!").fontcolor("firebrick"),
	ghost : " (ghost) ",
	boom : "boom",
	perfect : "is perfect",
	away_ : "You are now away.",
	away_k : "You are now away Keepo ",
	outta : "Get outta here, it's gonna blow! SwiftRage ",
	nu : ("NOOOOOOOOO SwiftRage ").fontsize(3),
	wat : "wat WutFace ",
	another : "Another one (anotherone) ",
	andanother : "And another one. (anotherone) ",
	khaled : "In (anotherone) we trust",
	sandstorm : " dududu dududu dududu dududu dududu SANDSTORM dududu dududu dududu dududu dududu ",
	GameMaker : "I make games using GameMaker! (gaben) ",
	matt : ("MattBurgers™ - open every day 42/7 ").fontcolor("darkslateblue"),
	hismo : ("The Menefreghismo™ Bar - NO OUTSIDERS ").fontcolor("darkblue"),
	mlg : "(party) (party) (party) SAMPLE MLG TEXT (gorf) (gorf) (gorf)",
	seizure : ("SEIZURE WARNING!").fontsize(4).fontcolor("red"),
	blargh : ("VOMIT ALERT").fontsize(4).fontcolor("firebrick"),
	trap : ("IT'S A TRAP!").fontsize(2).fontcolor("red"),
	nuke : ("TACTICAL NUKE INCOMING!").fontcolor("red").fontsize(5),
	zombies : ("-> The Zombies are coming... <-").link("https://youtu.be/v1a-9fC5kLk?t=24s").fontcolor("red").fontsize(3),
	admapp : ("-> Applications for admin <-").link("https://youtu.be/V-_O7nl0Ii0?t=16s").fontsize(3),
	custom : ("-> Customize your messages! <-").link("https://www.youtube.com/watch?v=yPYZpwSpKmA").fontsize(3),
	orbinc : ("The Orb Inc.™, providing the best morale boosters since 2012"),
	drama : ("ZOMG TEH DRAMA!!").fontsize(4),
	hype : (" PogChamp THE HYPE! PogChamp ").fontcolor("blue"),
	hypetrain : (" PogChamp GET ON THE HYPE TRAIN! PogChamp ").fontcolor("blue"),
	csgo : "Sponsored by CSGO: Lotto",
	illu_ : (" (illu) ").fontcolor("darkgreen"),
	illu : (" (illu) Join us. (illu)").fontcolor("darkgreen"),
	ayaya : (" ayaya ").fontcolor("deeppink"),
	plot : (" (dale_) PLOT TWIST (dale) ").fontcolor("blue"),
	plot2 : (" (dale5) PLOT TWIST (dale6) ").fontcolor("indigo"),
	salt: (" (illu) In Salt we Trust (illu) ").fontcolor("darkgreen"),
	revolution: (" (illu) THE REVOLUTION IS COMING! (illu) ").fontcolor("darkgreen"),
	grandma: (" (illu) squirm crawl slither writhe today we rise (illu) ").fontcolor("darkgreen"),
	zj : "(cele) Epic " + ("Zomplant Jelo").link("http://pvzcc.wikia.com/wiki/User:Zomplant_Jelo") + " has been planted on the epic lawn (durian)",
	gup : "(cele) Epic " + ("Guppie the Third").link("http://pvzcc.wikia.com/wiki/User:Guppie_the_Third") + " has been planted on the epic lawn (durian)",
	hkh : "(cele) Epic " + ("HyperKing Hesham").link("http://pvzcc.wikia.com/wiki/User:HyperKing_Hesham") + " has been planted on the epic lawn (durian)",
	puft : "(cele) Epic " + ("Doctor Stay Puft").link("http://pvzcc.wikia.com/wiki/User:Mister_Stay_Puft") + " has been planted on the epic lawn (durian)",
	aj : "(cele) Epic " + ("AjCatlove").link("http://pvzcc.wikia.com/wiki/User:AjCatlove") + " has been planted on the epic lawn (durian)",
	joo : "(cele) Epic " + ("Jooaoaoo").link("http://pvzcc.wikia.com/wiki/User:Jooaoaoo") + " has been planted on the epic lawn (durian)",
	orb : "(cele) Epic " + ("Orbacal").link("http://pvzcc.wikia.com/wiki/User:Orbacal") + " has been planted on the epic lawn (durian)",
	hd : "(cele) Epic " + ("HDMaster").link("http://pvzcc.wikia.com/wiki/User:HDMaster") + " has been planted on the epic lawn (durian)",
	garg : "(cele) Epic " + ("Gargantaur Blitzer").link("http://pvzcc.wikia.com/wiki/User:Gargantaur Blitzer") + " has been planted on the epic lawn (durian)",
	loli : "(cele) Epic " + ("Loli").link("http://pvzcc.wikia.com/wiki/User:HDMaster") + " has been planted on the epic lawn (durian)",
	orbeat : ("Orbacal").link("http://pvzcc.wikia.com/wiki/User:Orbacal") + " has been eaten by the walruses D: ",
	ajeat : ("Toilet").link("http://pvzcc.wikia.com/wiki/User:AjCatlove") + " has been eaten by the potatoes D: ",
	beginchoices : "Welcome to Choices! Which version do you want to play?? Type !fchoices for feshe adventures version.",
	fchoices : "You wake up as Feshe. You read a chapter from a book about bad things happening when a " + ("f").fontcolor("red") + "ish found a secret code. Freaky. Anyways, what do you do? - Type !fchoices1a to do a feshe dance, or type !fchoices1b to make weird noises.",
	fchoices1a : "You did a weird dance. Hesum walked into your room and saw you doing the weird dance. How do you " + ("r").fontcolor("orange") + "eact? Type !fchoices2a to go and cry in a corner, or type !fchoices2b to say hai to Hesum.",
	fchoices1b : "You made weird noises. You then realised these weird noises were the chant used to turn int" + ("o").fontcolor("yellow") + " a chicken. You then turned into a chicken. Type !fchoices2c to go and scream at Orbagel, or type !fchoices2d to go to the nearest hospital.",
	fchoices2a : "You went to cry in a corner because Hesum invaded your privacy. Hesum decided to end her friendship with you cuz you aint fab no more. GAME OVER. Type !fchoices to try again...",
	fchoices2b : "You greet Hesum. She says 'hai, just wondering if you can come to my fab concert tonite' Type !fchoices3a to say yes, or type !fchoices3b to say no.",
	fchoices2c : "You decide to run up to Orbagel and scream at him. He tells you to calm your little toes and tell him whats wrong. Type !fchoices3c to rage at orbagel for being stupid enough not to notice that you are a chicken, or type !fchoices3d to explain what happened to you.",
	fchoices2d : "You decide to go to the hospital. You are greeted by a nurse. Type !fchoices3e to ask for medicine, or type !fchoices3f to ask for surgery.",
	fchoices3a : "You said you'll show up. Hesum says thanks in a fabulous way, then goes to prepare for the concert. What will you wear to the concert? Type !fchoices4a to wear a doge cosplay, or type !fchoices4b to wear a miriampoid cosplay.",
	fchoices3b : "You said you can't come. Hesum says that's okay in a fabulous way. Later that day, Orbagel asks why you didn't turn up. Type !fchoices4c to say because hesum makes terrible music, or type !fchoices4d to say because you had a bad back.",
	fchoices3c : "You rage because of Orbagel's stupidity. Orbagel flies away crying while chewing on his toes and farting on a mimic octopus. GAME OVER. Type !fchoices to try again...",
	fchoices3d : "You explain what's going on to Orbagel. Orbagel says that you should try eating some cheese. Type !fchoices4e to eat a little cheese, or type !fchoices4f to eat a lot of cheese.",
	fchoices3e : "You ask the nurse to prescribe some medicine. The nurse brings you a blue pill and a red pill - " + ("w").fontcolor("green") + "hich one do you take? Type !fchoices4i to take the blue one, or type !fchoices4j to take the red one.",
	fchoices3f : "The nurse walks you to a dimly-lit surgery room and leaves you with this really weird looking guy. Type !fchoices4g to run away, or type !fchoices4h to stay put.",
	fchoices4a : "You put on the doge cosplay and go to the concert. Hesum compliments you on what you're wearing, and the concert begins. Type !fchoices5a to start cheering for Hesum, or type !fchoices5b to throw a water bottle at her.",
	fchoices4b : "You put on the miriampoid cosplay and go to the concert. Hesum hisses at you for stealing miriampoid's style, and her bodyguards kick you out of the concert. GAME OVER. Type !fchoices to try again, of course...",
	fchoices4c : "You tell Orbagel you didn't show up because Hesum's music is terrible. Orbagel is horrified at your statement, and knocks you out with a bagel. GAME OVER. Lewl, type !fchoices to try again! (>^^)>",
	fchoices4d : "You tell Orbagel you had a bad back. Orbagel tries to help you by throwing a block of cheese at your back, but then you die somehow. GAME OVER LOL TRY AGAIN BY TYPING !fchoices",
	fchoices4e : "You eat a small amount of cheese. Bad amount of cheese! Your head turns into a block of cheese. You are " + ("n").fontcolor("blue") + "ow a cheesehead. Type !fchoices5c to run around in circles in terror, or !fchoices5d to give up on life and die.",
	fchoices4f : "You eat a giant amount of cheese. Great! You turn back to normal. How do you celebrate? Type !fchoices5e to throw a tea party, or type !fchoices5f to high-five Orbagel.",
	fchoices4g : "You make a run for it, but the weirdo catches you and throws a pokeball at you. You are feshechu. GAME OVER. Type !fchoices to try again...",
	fchoices4h : "You decide to stay put. The weirdo surgeon performs a successful operation, and you turn back to normal! How do you celebrate? Type !fchoices5g to high-five the weirdo, or type !fchoices5h to throw a darude party.",
	fchoices5a : "You cheer enthusiastically for hesum. Hesum performs excellently because of your support. " + ("GAME WON!!! ").fontcolor("green") + ("Achievement unlocked: Hesum's fab helper - unlock good ending f1.").fontcolor("yellow") + "Type !fchoices to play again...",
	fchoices5b : "You throw a water bottle at hesum. This angers hesum, and she activates her final form. She turns into Justin Bieber, and kicks your donkey. GAME OVER. Type !fchoices to try again, baby.",
	fchoices5c : "You run around in circles in terror, eventually tripping and " + ("s").fontcolor("purple") + "omehow dying cuz you're one fragile chicken. GAME OVER. !fchoices to try again...",
	fchoices5d : "You give up and die. A few minutes later, Miley Cyrus walks upon you, and heals you with her magical twerking skills. You are back to normal!" + (" GAME WON!!!").fontcolor("green") + ("Achievement unlocked: Blessed by a Butt - unlock good ending f2.").fontcolor("yellow") + "Type !fchoices to play again!",
	fchoices5e : "You throw a tea party. Everything is fine until the teacups mutate and eat all your guests. GAME OVER. !fchoices to try again, d00d.",
	fchoices5f : "You high-five Orbagel. Yassss." + ("GAME WON!!!").fontcolor("green") + ("Achievement unlocked: Epic High-Five - Unlock good ending f3.").fontcolor("yellow") + "!fchoices to play again! YAS",
	fchoices5g : "You high-five the weirdo surgeon. He retaliates by karate chopping you. You die cuz you're a skrub. GAME OVER. !fchoices to try again, of course.",
	fchoices5h : "You throw a darude party. What a wubtastic night!" + (" GAME WON!!!").fontcolor("green") + ("Achievement unlocked: Wub wub wub - Unlock good ending f4.").fontcolor("yellow") + "!fchoices to play again, honey.",
	fchoices4i : "You take the blue pill, and you feel a sharp pain inside of you - your internal organs are being crushed! You died. Type !fchoices to try again...",
	fchoices4j : "You take the red pill, and suddenly everything around you turns into waffles. The pill transported you to waffleland! Where do you go? Type !fchoices5i to go to the waffle library, or !fchoices5j to go to the waffle soda stand.",
	fchoices5i : "You go to the waffle library. A pink Orbagel is inside. Type !fchoices6a to murder him, or type !fchoices6b to ask for a book.",
	fchoices5j : "You go to the waffle soda stand. A pink Sudapup is running the stand. Type !fchoices6c to ask for some grapes, or type !fchoices6d to ask for some soda.",
	fchoices6a : "You murder the Pink Orbagel. His corpse poofs into a magical pink ring. You put it on, and you wake up. IT WAS A DREAM. But now you have this neat ring." + (" GAME WON!!").fontcolor("green") + (" Achievement unlocked: Waffleland murders - unlock good ending f5.").fontcolor("yellow") + "Type !fchoices to play again...",
	fchoices6b : "You ask for a book, but then the Pink Orbagel pulls off his mask and is a horrifying demon with three mouths. You fell for it's trick! It eats you alive. GAME OVER. Type !fchoices to try again, n00b.",
	fchoices6c : "You ask for some grapes. The Pink Sudapup gets super ticked, yells 'NO I DONT HAVE ANY GRAPES GET REKT' and throws a bomb at you. You died. GAME OVER. Type !fchoices to try again. opieOP ",
	fchoices6d : "You ask for some soda. The Pink Sudapup smiles and gives you a can of soda. Suddenly the Pink Sudapup kisses you and you have tons of babies and get married and stuff." + (" GAME WON!!").fontcolor("green") + (" Achievement unlocked: I kissed a Sudapup and I liked it - unlock good ending f6.").fontcolor("yellow") + "Type !fchoices to play again. (kappa) ",
	frowns : ("hhhhhh - !frowns1a: 'what?' !frowns1b: 'lolfunny' !yhsif: 'yhsif sehsinab ruoy tirips ot lleh ot nrub ni eht niap fo tnemegduj'").fontcolor("#8b1a1a"),
	yhsif : "You wake up as Feshe. You read a chapter from a book about bad things happening when a " + ("f").fontcolor("red") + "ish found a secret code. Freaky. Anyways, what do you do? - Type !fchoices1a to do a feshe dance, or type !fchoices1b to make weird noises.",
	frowns1a : "You throw a tea party. A few " + ("mi").fontcolor("#8b1a1a") + "nutes later, Miley Cyrus walks upon you, and heals you with her magical twerking skills. Bad amount of cheese! Hesum performs excellently because of your support.",
	frowns1b : "what?? leave me alone bad !frowns2a !frowns2b !frowns2c",
	frownsmi : ("no").fontcolor("#8b1a1a") + "You high-five the weirdo Orbagel. He Yasss chop" + ("Am I DOIng Iti. Rirght?!").fontcolor("#8b1a1a") + "A pi" + ("nk").fontcolor("green") + "Sudapup is " + ("help").fontcolor("#8b1a1a") + "Type !frowns2d to Suddenly kisses" + ("niap niap niap STOP").fontcolor("#8b1a1a"),
	frowns2a : ("you are an idiot").fontcolor("8b1a1a") + "we",
	frowns2b : ("!fchoices").fontcolor("#8b1a1a"),
	frowns2c : "hate" + ("rhbugwi").fontcolor("#8b1a1a") + ("og").fontcolor("blue") + ("igjojrg").fontcolor("#8b1a1a"),
	frownsmiweog : "AAAAAAAAAAAAaaAAaAAAaAAAaAaa YOU DID IT. YOU FOUND ME OUT. help THANK YOU SO MUCH no IIIIIII hhHHh now i CAN KILL YOUR LITTLE FRIENDS. I WILL CRACK OPEN THEIR HEADS LIKE THEY'RE EGGS. THE BLOOD AND FLESH WILL RUN DOWN THEIR FACE AS THEY CRY FOR HELP. THE CRIES WILL DO pleasedont NOTHING. ibegyou I WILL SLIT OPEN THEIR WRISTS AND TUG ON THEIR BLEEDING ARTERIES AND VEINS. THIS IS IT, MY FRIEND sorry THIS IS THE END OF FESHE ADVENTURES. HAHAHAHHAHHA !fchoices do it HAHAHHAHAHHA plESE",
	stop: "Stop what you're doing or be punished by a chat moderator.",
	mahogany: "The Mahogany Party has started.",
	frogz: "(frog) vs (grof)",
	kawaii_: ("✿(◕‿◕)✿").fontcolor("FF69B4"),
	kawaii: ("In ✿(◕‿◕)✿ we trust desu").fontcolor("FF69B4"),
	maths: "Whats 9+10?",
	l2: "Lacabro 2 will be released when HkH comes back Kappa ",
	ooochoices : "wow you found this, Anyway: You are Orbacal, and are in your house, wut to do? Type !ooochoices1 to go outside and, or type !ooochoices1a to call a friend. (NOTE: right before typing the choice, type an ! before it (for example: !ooochoices9001)",
    ooochoices1 : "You are outside, but quickly are squished by AJCatlove. Dun dun duuuun. Game Over. Ending: SQUISHED BY A CAT. Try again!",
    ooochoices1a : "You pull out your phone, Who do you want to call? !ooochoices2 to call Lilgrei, !ooochoices2a to call HkH, !ooochoices2b to call Feshe.",
    ooochoices2 : "You call Lilgrei, He asks yo wazzup, can't talk cuz trying to blow away Balloon Zombies, pl0x call later. Achievment gained: BLOWING! !ooochoices2a to call HkH, !ooochoices2b to call Fishy, ooochoices2c to call Miles.",
    ooochoices2a : "You call HkH, and he asks: Hi! Why did you call? !ooochoices3 to ask him if you could do something, !ooochoices3a to call him to your place.",
    ooochoices2b : "You call Fishy, and he says: I has no time, so imma do zis: *ASMGF* You are in some kind of island. You don't know anything to do. GAME OVER. Ending: Locked in an island!",
    ooochoices3 : "You ask him if you could do something and he says: Yes, we could watch livestreamers play GTA. ooochoices4 to agree, ooochoices4a to disagree and go do something else.",
    ooochoices3a : "You ask him if he could come to your place, but he gets mad and says: Pls, i'm not leaving my house. Good day. ._. Game Over: Lost a friend D: Try Again!",
    ooochoices4 : "You agree and you go to Twitch Teathre. You meet Carp. ooochoices5 to engage in battle, ooochoices5a to avoid him. ",
    ooochoices4a : "You disagree, but HkH rages and rekts you. Game Over! Ending: Git rekt. Try again!",
    ooochoices5 : "You engage in battle, but he squishes you. Game Over! Ending: nowords. Try Again!",
    ooochoices5a : "You avoid Carp, and enter Twitch Theatre. You get asked if you have a card to enter. ooochoices6 to give it to him, ooochoices6a to tell Hesham you can't come.",
    ooochoices6 : "You don't have one! ooochoices7 to just run in, ooochoices7a to ask him if you could enter this one time.",
    ooochoices6a : "You call Hesham but he rekts you. Game Over: Git Rekt (Again!)",
    ooochoices7 : "You just run in, but quickly get rekt and go to jail. Game Over: GUILTY! Try Again!",
    ooochoices7a : "He lets you in. You meet Hesham and he's fab-ly dressed. You are just in your usual clothes. QUICK! Change clothing to: ooochoices8 to wear a fairy dress, ooochoices8a to wear a fab shirt.",
    ooochoices8 : "You wear a fairy dress, Hesum finds it disguisting and calls his fairy friends and they beat you. Game Over: Fairy!!!!!!!!, Try Again!",
    ooochoices8a : "You wear a fab shirt, but you start glowing.You get teleported to fab island. ooochoices9 to swim along the river, ooochoices9a to explore this single island.",
    ooochoices9 : "You swim along the river, then see Lilgrei blowing some Balloon Zombies. He notices you and asks: Yo, can you help me? ooochoices10 to avoid Lilgrei, ooochoices10a to help him. ",
    ooochoices9a : "You explore the island and see Throwkirby flying on a Warp Star. ooochoices10b to shout at him ,ooochoices10c to rekt him when he comes against you, ooochoices10d to go explore the island further.",
    ooochoices10 : "You go away. Lilgrei gets mad and says: Fine. then not. ._. ACHIEVMENT: Friend got angry! ooochoices10d to explore the island more, ooochoices11a to do a dance. ",
    ooochoices10a : "You help Grei and blast a Zombieber. ZOMBIEBERS KILLED: +1. Try to find he says: quietly says: Thank you... whilst fading. You do a victory dance and are in Twitch Theatre again. +1 Watcher! W00t! Good Ending 1: Grei watchin GTA... wooWOOOOOWOOOOT! Game complete! If it is out, type !ooogame2grei to continue!",
    ooochoices10b : "You shout at him, and he lands, saying: I found you....... Thank you.. whilst fading. +1 WATCHER! W00t! Good Ending: I'm gonna GTA dat dere Kirbehs! Once it is out, type: !ooogame2kirby to continue! If you got both Grei and Kirby, type !ooogame2both to continue!",
    ooochoices10c : "You rekt him while he's flying. You destroy the Warp Star, which causes the universe to collapse in an eclipse. GAME OVER. Ending: Rekt the 42 Also, Zombieber Killed! +1! Try to find all 10!",
    ooochoices10d : "You try to explore the island more, but TK mistakes you as an enemy, and mlg 360 noskop rekts you. GAME OVER: Git rekt (once more)",
};    
 
CustomAlerts.modOnlyCmds = [
	"waffles",
	"quiz1",
	"goldaccount",
	"fhai",
	"nuke",
	"beginchoices",
	"admapp",
	"zombies",
	"aj",
	"zj",
	"hkh",
	"gup",
	"puft",
	"stop"
];
 
// observer
CustomAlerts.obs = new MutationObserver(function(a) {
	for (var i in a) {
		for (var j in a[i].addedNodes) {
			var node = a[i].addedNodes[j],
				isMsg = false;
			try {
				if (
					node.nodeType == 1 &&
					typeof $(node).attr("data-user") === "string" &&
					!$(node).hasClass("inline-alert") && // make sure that 'CustomAlerts.implement' doesnt attempt to replace custom alerts when inserted
					$(node).parents().eq(1).hasClass("Chat")
				) {
					// this is a chat message by some user
					isMsg = true;
				}
			} catch(err) {}
			if (isMsg) {
				var message = $(node).find(".message").html(),
					cmd = message.match(/^\!(.+)/),
					user = $(node).attr("data-user");
				if (cmd) {
					// command pattern found
					CustomAlerts.implement(node, cmd[1], user);
				}
			}
		}
	}
});
 
// function for replacing a node
CustomAlerts.implement = function(node, cmd, user) {
	if (CustomAlerts.cmd.hasOwnProperty(cmd)) {
		// command exists - replace message with inline alert
		if (!(CustomAlerts.modOnlyCmds.indexOf(cmd) > -1 && !mainRoom.viewUsers.model.users.findByName(user).attributes.isModerator)) {
			// make sure that a non-mod did not attempt to use a mod-only command
			var li = $('<li />');
			$(li).attr({
				"data-user": $(node).attr("data-user"),
				"class": "inline-alert pseudo-inline-alert"
			}).html(WikiaEmoticons.doReplacements(
				CustomAlerts.cmd[cmd],
				ChatView.prototype.emoticonMapping
			));
			$(node).replaceWith(li);
		}
	}
}
 
// add css to treat continue-messages after an alert as new messages
mw.util.addCSS(
	'.pseudo-inline-alert + .continued {\n' +
		'\tmin-height: 32px;\n' +
		'\tmargin-bottom: 0;\n' +
		'\tpadding-top: 18px;\n' +
		'\ttop: 0;\n' +
	'}\n' +
	'.Chat .pseudo-inline-alert + .continued img, .pseudo-inline-alert + .continued .time {\n' +
		'\tdisplay: inline;\n' +
	'}\n' +
	'.pseudo-inline-alert + .continued .username {\n' +
		'\tdisplay: block;\n' +
	'}'
);
 
// start observing chat
CustomAlerts.obs.observe(document.querySelector("#WikiaPage"), {
	childList: true,
	subtree: true
});