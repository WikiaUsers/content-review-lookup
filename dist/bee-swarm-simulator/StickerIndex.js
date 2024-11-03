function sanitize(string) {
  var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  var reg = /[&<>"'/]/ig;
  return string.replace(reg, function(match){
  	return map[match];
  });
}

function getCheckedCheckboxes(list) {
	var output = [];
	var i = 0;
	for (i=0;i<list.length;i++) {
		input = document.getElementById('indexCheckbox-'+list[i][0]);
		if (input.checked) 
		{
			if (list[i][2]) output.push(list[i][0] + list[i][2]);
			else output.push(list[i][0]);
		}
	}
	return output;
}

function getAllListed(list) {
	var output = [];
	var i = 0;
	for (i=0;i<list.length;i++) {
		if (list[i][2]) output.push(list[i][0] + list[i][2]);
		else output.push(list[i][0]);
	}
	return output;
}

function getIDRegex() {
	var output = [];

	var typeList = getCheckedCheckboxes(typeIds);
	if (typeList.length) output.push(typeList.join("|"));
	var eventList = getCheckedCheckboxes(eventIds);
	if (eventList.length) output.push(eventList.join("|"));
    var methodList = getCheckedCheckboxes(methodIds);
    if (methodList.length) output.push(methodList.join("|"));
    
    var regex = output.join(".*?");
    if (methodList.length) allSuffixes.forEach(function (list, key) {
    	var checkedList = getCheckedCheckboxes(list);
    	if (!checkedList.length) checkedList = getAllListed(list);
    	checkedList.push('-Any');
    	var generatedRegex = "(" + checkedList.join("|") + ")";
    	regex = regex.replaceAll("[" + key + "]", generatedRegex);
    });
    else {
    	var suffixOutput = [];
    	allSuffixes.forEach(function (list, key) {
    		var checkedList = getCheckedCheckboxes(list);
	    	if (checkedList.length) suffixOutput.push(checkedList.join("|"));
    	});
    	if (regex.length)
    		regex = regex + ".*?(" + suffixOutput.join("|") + ")";
    	else regex = "(" + suffixOutput.join("|") + ")";
    }
	
	if (!regex.length) regex = "[\\s\\S]*"; //matches everything if there is nothing ticked
	console.log(regex);
	return new RegExp(regex);
}

function indexSearch() {
	var inputBox = document.getElementById('indexInput');
	var searchName = sanitize(inputBox.value.toUpperCase()); 
	// sanitization is technically not needed cus this isn't inserted into DOM but just in case
	var list = document.getElementsByClassName('IndexButtonCell');
	var idRegex = getIDRegex();

	for (var i=0;i<list.length;i++) {
		var classString = list[i].className;
		var stickerName = list[i].getAttribute('title');
		if (idRegex.test(classString) && stickerName.toUpperCase().indexOf(searchName) > -1) {
			list[i].style.display = '';
		} else {
			list[i].style.display ='none';
		}
	}
}

function addCheckboxes(selector, list) {
	for (var i=0;i<list.length;i++) {
		$(selector).append('<input class="addIndexSearchOnChange" type="checkbox" id="indexCheckbox-' + list[i][0] + '"" onchange=""><label for="indexCheckbox-' + list[i][0] + '">' + list[i][1] + '</label><br>');
	}
}

$(function(){
	$(".IndexLoading").hide();
	$(".IndexBody").show();
    $(".IndexDisplay").hide();
	
	$(".IndexFilter").append('<input class="IndexInput" type="text" id="indexInput" placeholder="Search for stickers...">');
	$(".IndexInput").on("keyup",indexSearch);
	
	//need. a. better. method.
	addCheckboxes('.IndexEventCheckboxes',eventIds);
	addCheckboxes('.IndexTypeCheckboxes',typeIds);
	addCheckboxes('.IndexMethodCheckboxes',methodIds);
	allSuffixes.forEach(function (value, key) {
		addCheckboxes(".Index"+key+"Checkboxes",value);
	});
	$(".addIndexSearchOnChange").on("change",indexSearch);

	$(".IndexFilterPanel").hide();
	
	$(".IndexTable").click(function(e) {
		if ($(e.target).is(":visible") && !($(e.target).parents('.IndexFilterPanel').length)) 
			$(".IndexFilterPanel").hide().addClass('mw-collapsed'); //to deal with mw-collapsible
	});
	
	$("*[class^='toggleall-'],*[class*=' toggleall-']").click(function(e){
		var target = (e.target.id.length) ? $(e.target) : $(e.target).parents("*[class^='toggleall-'],*[class*=' toggleall-']");
		var classList = target.attr("class").split(/\s+/);
		for (var i=0;i<classList.length;i++){
			var className = classList[i];
			if (className.startsWith('toggleall-')) {
				var allId = className.replace('toggleall-','');
				$('.mw-collapsible.collapseall-'+allId).addClass('mw-collapsed'); //to deal with mw-collapsible
				$('.collapseall-'+allId).hide();
				var id = target.attr('id');
				id = id.replace('alltoggle-','allcollapse-');
				$('mw-collapsed #'+id).removeClass('mw-collapsed'); //to deal with mw-collapsible
				$('#'+id).show();
			}
		}
	});
	
	$(".toggleall-IndexFilterTabs").click(function(e){
		var target = (e.target.id.length) ? $(e.target) : $(e.target).parents(".toggleall-IndexFilterTabs");
		console.log("yes i am here");
		if (target.attr("id")=='alltoggle-IndexFilterMethod') $(".IndexFilterSuffixCheckboxes").css("display","flex");
		else $(".IndexFilterSuffixCheckboxes").css("display","none");
	});
});

//item defs go down here cus it's so annoying to scroll all the way down for the code
// pair id - label
var eventIds = [['event-Limited','Limited'], //event IDs
		        ['event-Beesmas','Beesmas']];
var typeIds = [['type-Not_Categorized','Not Categorized'], //type ids
			   ['type-Bee','Bee'], 
			   ['type-Bear','Bear'],
			   ['type-Mob','Mob'],
			   ['type-Animal','Non-BSS Mob Animals'],
			   ['type-ROBLOX_Games','ROBLOX Games'],
			   ['type-Puffshroom','Puffshroom'],
			   ['type-Leaf','Leaf'],
			   ['type-Tool','Tool'],
			   ['type-Sign','Star Sign'],
			   ['type-Stamp','Stamp'],
			   ['type-Secret','Secret']];  //stickers hidden until unlocked
var methodIds = [['method-Hidden_Sticker','Hidden Sticker','[Chance]'], //method ids
				 ['method-Sticker_Printer','Sticker Printer','[Egg]'],
				 ['method-Planter','Planter (not Sticker Planter)','[Planter][Field][Chance]'], //may introduce planter type
				 ['method-Sticker_Planter','Sticker Planter','[Field][Chance]'],
				 ['method-Sprout','Sprout (not Sticker Sprout)','[Field][Chance]'],
				 ['method-Sticker_Sprout','Sticker Sprout','[Chance]'],
				 ['method-Quest','Quest (not Sticker Seeker Quest)','[Bear][Chance]'], //may introduce quest giver
				 ['method-Sticker_Seeker_Quest','Sticker-Seeker Quest','[Chance]'],
				 ['method-Tool','Tool (not Sticker-Seeker)','[Tool][Chance]'], //may introduce tool type, no field?
				 ['method-Sticker_Seeker_Tool','Sticker-Seeker','[Field][Chance]'],
				 ['method-Gather','Bee Gather','[Bee][Field][Chance]'], //may introduce field/bee
				 ['method-Feed','Feed','[Treat][Bee][Chance]'], //may introduce treat
				 ['method-Mob','Mob','[Mob][Chance]'], //may introduce mob
				 ['method-Machines','Machines','[Chance]'],
				 ['method-Shops','Shops',''], //no chance
				 ['method-Leaves','Leaves','[Field][Chance]'],
				 ['method-Fireflies','Fireflies','[Chance]'],
				 ['method-Puffshrooms','Puffshrooms','[Puff][Chance]'],
				 ['method-Mythic_Meteor','Mythic Meteor','[Chance]'],
				 ['method-Achievement','Achievement',''], //no chance
				 ['method-Leaderboard','Leaderboard',''], //no chance
				 ['method-Challenges','Challenges','[Challenge][Chance]'],
				 ['method-Robux','Robux',''], //no chance
				 ['method-Gift_Boxes','Gift Boxes',''], //no chance
				 ['method-Special','Special','[Chance]']];

// extra filters
// list: chance, egg, puff, treat, field, bee, tool, planter, bear, mob, challenge
var allSuffixes = new Map([
	["Chance",[['-Chance_Guaranteed','Guaranteed'],
			   ['-Chance_Specific','Specific'],
	           ['-Chance_Common','Common'],
               ['-Chance_Uncommon','Uncommon'],
               ['-Chance_Rare','Rare'],
               ['-Chance_Very_Rare','Very Rare'],
               ['-Chance_Extremely_Rare','Extremely Rare'],
               ['-Chance_Unbelievably_Rare','Unbelievably Rare'],
               ['-Chance_Unfathomably_Rare','Unfathomably Rare'],
               ['-Chance_Nearly_Impossible','Nearly Impossible']]
    ],
    ["Egg",[['-Egg_Basic','Basic Egg'],
		    ['-Egg_Silver','Silver Egg'],
			['-Egg_Gold','Gold Egg'],
	     	['-Egg_Diamond','Diamond Egg'],
			['-Egg_Mythic','Mythic Egg'],
			['-Egg_Star','Star Egg'],
			['-Egg_Gifted_Silver','Gifted Silver Egg'],
			['-Egg_Gifted_Gold','Gifted Gold Egg'],
			['-Egg_Gifted_Diamond','Gifted Diamond Egg'],
			['-Egg_Gifted_Mythic','Gifted Mythic Egg']]
	],
	["Puff",[['-Puff_Common','Common+ Puffshroom'],
			 ['-Puff_Rare','Rare+ Puffshroom'],
			 ['-Puff_Epic','Epic+ Puffshroom'],
			 ['-Puff_Legendary','Legendary+ Puffshroom'],
		     ['-Puff_Mythic','Mythic+ Puffshroom']]
	],
	["Treat",[['-Treat_Treat','Treats'],
			  ['-Treat_Strawberry','Strawberries'],
			  ['-Treat_Blueberry','Blueberries'],
			  ['-Treat_Sunflower_Seed','Sunflower Seeds'],
			  ['-Treat_Pineapple','Pineapples'],
			  ['-Treat_Moon_Charm','Moon Charms'],
			  ['-Treat_Bitterberry','Bitterberries'],
			  ['-Treat_Neonberry','Neonberries'],
		      ['-Treat_Star_Treat','Star Treats']]
	],
	["Field",[['-Field_Happy','Very happy'],
			  ['-Field_Upset','Upset'],
			  ['-Field_Sunflower','Sunflower Field'],
			  ['-Field_Dandelion','Dandelion Field'],
			  ['-Field_Mushroom','Mushroom Field'],
			  ['-Field_Blue_Flower','Blue Flower Field'],
			  ['-Field_Clover','Clover Field'],
			  ['-Field_Spider','Spider Field'],
			  ['-Field_Bamboo','Bamboo Field'],
			  ['-Field_Strawberry','Strawberry Field'],
			  ['-Field_Pineapple','Pineapple Patch'],
			  ['-Field_Stump','Stump Field']]
	],
	["Bee",[['-Bee_Basic','Basic Bee'],
			['-Bee_Bomber','Bomber Bee'],
			['-Bee_Brave','Brave Bee'],
			['-Bee_Bumble','Bumble Bee'],
			['-Bee_Cool','Cool Bee'],
			['-Bee_Hasty','Hasty Bee'],
			['-Bee_Looker','Looker Bee'],
			['-Bee_Rad','Rad Bee'],
			['-Bee_Rascal','Rascal Bee'],
			['-Bee_Stubborn','Stubborn Bee'],
			['-Bee_Bubble','Bubble Bee'],
			['-Bee_Bucko','Bucko Bee'],
			['-Bee_Commander','Commander Bee'],
			['-Bee_Demo','Demo Bee'],
			['-Bee_Exhausted','Exhausted Bee'],
			['-Bee_Fire','Fire Bee'],
			['-Bee_Frosty','Frosty Bee'],
			['-Bee_Honey','Honey Bee'],
			['-Bee_Rage','Rage Bee'],
			['-Bee_Riley','Riley Bee'],
			['-Bee_Shocked','Shocked Bee'],
			['-Bee_Baby','Baby Bee'],
			['-Bee_Carpenter','Carpenter Bee'],
			['-Bee_Demon','Demon Bee'],
			['-Bee_Diamond','Diamond Bee'],
			['-Bee_Lion','Lion Bee'],
			['-Bee_Music','Music Bee'],
			['-Bee_Ninja','Ninja Bee'],
			['-Bee_Shy','Shy Bee'],
			['-Bee_Buoyant','Buoyant Bee'],
			['-Bee_Fuzzy','Fuzzy Bee'],
			['-Bee_Precise','Precise Bee'],
			['-Bee_Spicy','Spicy Bee'],
			['-Bee_Tadpole','Tadpole Bee'],
			['-Bee_Vector','Vector Bee'],
			['-Bee_Bear','Bear Bee'],
			['-Bee_Cobalt','Cobalt Bee'],
			['-Bee_Crimson','Crimson Bee'],
			['-Bee_Digital','Digital Bee'],
			['-Bee_Festive','Festive Bee'],
			['-Bee_Gummy','Gummy Bee'],
			['-Bee_Photon','Photon Bee'],
			['-Bee_Puppy','Puppy Bee'],
			['-Bee_Tabby','Tabby Bee'],
			['-Bee_Vicious','Vicious Bee'],
			['-Bee_Windy','Windy Bee']]
	],
	["Tool",[['-Tool_Scooper','Scooper'],
			 ['-Tool_Rake','Rake'],
			 ['-Tool_Clippers','Clippers'],
		 	 ['-Tool_Magnet','Magnet'],
			 ['-Tool_Vacuum','Vacuum'],
			 ['-Tool_Super-Scooper','Super-Scooper'],
			 ['-Tool_Pulsar','Pulsar'],
			 ['-Tool_Electro-Magnet','Electro-Magnet'],
			 ['-Tool_Scissors','Scissors'],
			 ['-Tool_Honey_Dipper','Honey Dipper'],
			 ['-Tool_Bubble_Wand','Bubble Wand'],
			 ['-Tool_Scythe','Scythe'],
			 ['-Tool_Golden_Rake','Golden Rake'],
			 ['-Tool_Spark_Staff','Spark Staff'],
			 ['-Tool_Porcelain_Dipper','Porcelain Dipper'],
			 ['-Tool_Petal_Wand','Petal Wand'],
			 ['-Tool_Tide_Popper','Tide Popper'],
			 ['-Tool_Dark_Scythe','Dark Scythe'],
			 ['-Tool_Gummyballer','Gummyballer']]
	],
	["Planter",[['-Planter_Paper','Paper Planter'],
				['-Planter_Ticket','Ticket Planter'],
				['-Planter_Festive','Festive Planter'],
				['-Planter_Plastic','Plastic Planter'],
				['-Planter_Candy','Candy Planter'],
				['-Planter_Red_Clay','Red Clay Planter'],
				['-Planter_Blue_Clay','Blue Clay Planter'],
				['-Planter_Tacky','Tacky Planter'],
				['-Planter_Pesticide','Pesticide Planter'],
				['-Planter_Heat-Treated','Heat-Treated Planter'],
				['-Planter_Hydroponic','Hydroponic Planter'],
				['-Planter_Petal','Petal Planter'],
				['-Planter_Plenty','The Planter of Plenty']]
	],
	["Bear",[['-Bear_Black','Black Bear'],
			 ['-Bear_Brown','Brown Bear'],
			 ['-Bear_Mother','Mother Bear'],
			 ['-Bear_Panda','Panda Bear'],
			 ['-Bear_Science','Science Bear'],
			 ['-Bear_Dapper','Dapper Bear'],
			 ['-Bear_Honey','Honey Bee'],
			 ['-Bear_Polar','Polar Bear'],
			 ['-Bear_Robo','Robo Bear'],
			 ['-Bear_Gifted_Riley','Gifted Riley Bee'],
			 ['-Bear_Gifted_Bucko','Gifted Bucko Bee'],
			 ['-Bear_Stick','Stick Bug'],
			 ['-Bear_Onett','Onett'],
			 ['-Bear_Spirit','Spirit Bear'],
			 ['-Bear_Sun','Sun Bear'],
			 ['-Bear_Gummy','Gummy Bear'],
			 ['-Bear_Bee','Bee Bear'],
			 ['-Bear_BBM','Bubble Bee Man']]
	],
	["Mob",[['-Mob_Ladybug','Ladybug'],
			['-Mob_Rhino_Beetle','Rhino Beetle'],
			['-Mob_Spider','Spider'],
			['-Mob_Scorpion','Scorpion'],
			['-Mob_Mantis','Mantis'],
			['-Mob_Werewolf','Werewolf'],
			['-Mob_Wild_Windy','Wild Windy Bee'],
			['-Mob_Rouge_Vicious','Rouge Vicious Bee'],
			['-Mob_Snowbear','Snowbear'],
			['-Mob_Commando_Chick','Commando Chick'],
			['-Mob_King Beetle','King Beetle'],
			['-Mob_Coconut_Crab','Coconut Crab'],
			['-Mob_Tunnel_Bear','Tunnel Bear'],
			['-Mob_Mondo_Chick','Mondo Chick'],
			['-Mob_Stick_Bug','Stick Bug'],
			['-Mob_Diamond_Aphid','Diamond Aphid'],
			['-Mob_Armored_Aphid','Armored Aphid'],
			['-Mob_Rage_Aphid','Rage Aphid'],
			['-Mob_Aphid','Aphid'],
			['-Mob_Cave_Monster','Cave Monster'],
			['-Mob_Stick_Nymph','Stick Nymph'],
			['-Mob_Ant','Ant'],
			['-Mob_Giant_Ant','Giant Ant'],
			['-Mob_Fire_Ant','Fire Ant'],
			['-Mob_Flying_Ant','Flying Ant'],
			['-Mob_Army_Ant','Army Ant'],
			['-Mob_Festive_Nymph','Festive Nymph'],
			['-Mob_Mechsquito','Mechsquito'],
			['-Mob_Mega_Mechsquito','Mega Mechsquito'],
			['-Mob_Cogmower','Cogmower'],
			['-Mob_Cogturret','Cogturret'],
			['-Mob_Golden_Cogmower','Golden Cogmower'],
			['-Mob_Party_Mechsquito','Party Mechsquito'],
			['-Mob_Party_Cogmower','Party Cogmower'],
			['-Mob_Party_Cogturret','Party Cogturret'],
			['-Mob_Party_Mega_Mechsquito','Party Mega Mechsquito'],
			['-Mob_Zombie','Zombie'],
			['-Mob_Slime','Slime']]
	],
	["Challenge",[['-Challenge_Retro_Swarm','Retro Swarm Challenge'],
				  ['-Challenge_Ant','Ant Challenge'],
				  ['-Challenge_Stick_Bug','Stick Bug Challenge'],
				  ['-Challenge_Robo_Bear','Robo Bear Challenge']]
	]
	]);