var CustomAlerts = {};
 
// command list
CustomAlerts.cmd = {
	honey: "(honey) Sticky Honey Slimes (honey)",
	phosphor: "(phospher) Flight in the Night (phospher)",
	pink: ":D You Like Deh Pink Slimes! Meh Too! :D",
	tarr: "(tarr) Forced Fusion gone wrong (tarr)",
	tabby: "(tabby) Cat + Liquification Potion (tabby)",
	rock: "(rock) Bored... or Plotting Something (rock)",
	gold: "(gold) Too Rare to be at all Useful (gold)",
	puddle: "(puddle) Feeding Slimes? Whats that? (puddle)",
	orb: "DELETED COMMAND was here",
	boom: "(boom) KAWBEWM (boom)",
	achoo: "baAACCHHOOOOOOOooooooo!!",
	groomble: "Groomble Groomble (tabby)",
	grumpled: "I AM GRUMPLED!!",
	sneeze: "baAACCHHOOOOOOOooooooo!!",
	slobby: "A message to you, slobby",
	rad: "(rad) radiated radiators (rad)",
	jake: "I know your name... Jake...",
	lucky: "(lucky) Would you like a... Fortune Cookie? (lucky)",
	slimerancher1: "You woke up tired and with a book on your bed, something about a Rancher who was stuck in purgatory doing the same exact things with slight differences, it was a good book but it did break the fourth wall quite obviously once. You got out and saw your slimes were fine and happy, since you had a slime key on you, do you go to the Moss Blanket (!mossblanket) with its unique slimes, go to the Indigo Quarry (!IndigoQuarry) and collect the Rad Slimes who live there, stay in the Dry Reef (!DryReef) since those slimes are still good to Corral and Collect and you only have one key, or stay at your ranch (!Ranch) to make sure nothing happens.",
	mossblanket: "You use a precious key to open the moss blanket, immediately you see a lot of Tabby Slimes roaming free, one grabs onto you with its slimy body and others hold you down, unlike normal tabby slimes. You can punch the Tabby Slimes off your fragile body (!punchtabby) since they won't budge, or (!exit) to try and find a weak point.",
	//Nice Path
	exit: "like being pinned down and tickled, you need to find a weak spot, you find a weak spot and run away from the Tabby slimes, who go with no further action seeing you are of peace. Going into the proceeding area you notice a tarr invasion happening, and a slime is about to be killed, but you can save one. A Honey slime and a Tabby slime, (!savehoney), (!savetabby) or (!saviour) to allow the tarr to eat you, saving both slimes",
	savehoney: "you save the honey slime, but it's now stuck to you... forever, you need to figure out a way to get it off you, you can (!keep) keep it there, or use a boom slime to blow it off (!blast)",
	keep:"You keep the tabby slime there, then you realise it's actually causing a bit of damage, you start screaming butthat only attracts another Tarr. GAME OVER. To retry type (!slimerancher1)",
	blast: "A boom slime blasts off the honey slime, dealing a bit of damage but your mostly fine, however it did disorientate you and land in a pile of honey slimes, and now their all over your body. You can either get supplies in your house to get them away (suppliedhoney), or, (blastalloveragain) to get the boom slime to blow them off.",
	suppliedhoney: "you rush to your house to get the supplies, and make it. The Honey slimes fall off and you survive YOU WIN, you live long wiht some new honey slimes on your ranch. To retry type (!slimerancher1)"
	blastalloveragain"",
	savetabby: "you save the tabby slime, but it got a bit of tarr goop on it... And it seems to be spreading. You can either run to water and dip it in (waterrace) or abandon it (abandon)",
	savour: "You decide to sacrafice yourself... Turns out none of the slimes have any instincts and stay there to be gobbled up... This has to be one of the worst GAME OVERs. To retry type (!slimerancher1)",
	//Dangerous Path
	punchtabby: "A Monster like you decides the only action is to punch the felines into the sky, doing so you accidentally punched one into the slime sea.. Just before one fell it made a special purr only tabby cats can hear, well... Tabby Cats and Boom Slimes, the noise irritating them beyond reason, and since it sounded like it came from you, your now stuck between a wall and 6 boom slimes, you can remove your 3 gold plorts and suck them up (!suck) or (!jet) to use your jetpack to escape.",
	suck: "You throw away those gold plorts to get yourself out of a rought situation and get some new, likely hating you to death now, to ranch. You escacpe quickly until you reach a mushroom garden. A hunter slime sitting atop a shroom and heard the tabby cry, being half tabby, it knows the cause is you and immediately attacks, do you try to figure out where the invisible menace is and punch the hunter away(!punch2electricboogaloo) being just like a tabby cat, or (!run) to get away.",
	jet: "You use your Jetpack to escape the boom slimes, that is until you hear some sort of alarm, and more than 200 pink slimes in formation walking towards you, your energy has ran out and theres almost nothing you can do... Or is there? You can try and climb out the blanket (!climb) or accept defeat (!acceptdefeat)",
	punch2electricboogaloo: "The Hunter goes flying into The Great Abyss, as you make your way out of the hellish landscape, but one thing happens to go wrong. Your blocked by a Gordo tabby cat, moving slowly towards you. And turning back would cause you to meet fate with other tabby slimes. You can (!throwout) to throw away the boom slimes and vac the tabbies, or try and feed the gordo to bursting in time (!burst)",
	run: "You run away from the beast but end up on a boardwalk without any energy. You can either recharge your energy (!recharge), or run to tackle down the hunter (!tackle)",
	throwout: "You throw away the boom slimes, but just as your throwing them away, your hit with an explosion, knocking you back into the tabby slimes, who with the help of one suriving boom slime, knock you out. GAME OVER. To retry type (!slimerancher1)",
	climb: "You try to climb away from the horror but you slide down and end up being a replacement to a cuberry to the pink slimes. GAME OVER. To retry type (!slimerancher1)",
    acceptdefeat: "You accept your defeat... Ye... You just accept it. GAME OVER. To retry type (!slimerancher1)",
	burst: "You feed the gordo, and just as the tabbies start pawwing on you, it pops, stunning the tabby slimes just long enough to run. You get to the portal and escape. Even though you did absolutely nothing, YOU WIN. To retry type (!slimerancher1)",
	recharge: "You recharge your batteries just in time to get away, but as your looking back with a smug look, you hit a wall, and slowly slide into the drink in a cartoonish fashion. GAME OVER. To retry type (!slimerancher1)",
	tackle: "You run at the hunter and try to tackle the beast. but it turns invisible and you trip over it, on the moon shining grass. The hunter looks at you oddly when you kick it in the drink. You now need to find an exit. You can either face a dark figure up ahead (!darkfigure) near the exit pad or look for another escape (!escapist)",
	darkfigure: "You go up to see the dark figure, turning out to be a tabby slime gordo. Looking in front of you with a menacing stare, it knows what you did to the poor tabby and hunter slimes, and starts to try and push you into the water, while a few surviving tabby cats watching from afar seeing what you did to the poor hunter, (!brag) to brag about you killing a large group of the ecosystem to try and get the gordo scared and leave you alone, or show him your not playing by tacking the tabby slimes into the water (!tabbymakesasplash) with the puddle slimes.  ",
	escapist: "you look far and wide for an escape, and you end up somehow trying to eat a honey slime while falling down into a hole... The moss blanket doesn't even have holes... GAME OVER. To retry type (!slimerancher1).",
	brag: "You brag about your genocide... Causing the gordo to get angry and trample you... Good Try. GAME OVER. To retry type (!slimerancher1).",
	tabbymakesasplash: "You run to to try show your dominance by pushing tabby slimes into the blue sand, but you trip over another hunter slime, invisible. You fall into the drink and get up to realise all the slimes are having a chuckle and some sort of robotic camera caught it and uploaded it to RancherNet, Making use of their distraction you run for the portal and make it out, with rewards in hand. yOU WIN! To retry type (!Slimerancher1)",
};
CustomAlerts.modOnlyCmds = [
	"orb",
	"nuke"
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