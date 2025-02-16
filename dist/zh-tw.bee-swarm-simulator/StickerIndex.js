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
	
	$(".IndexFilter").append('<input class="IndexInput" type="text" id="indexInput" placeholder="搜尋貼紙名稱...">');
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
var eventIds = [['event-Limited','限量'], //event IDs
		        ['event-Beesmas','蜂誕節']];
var typeIds = [['type-Not_Categorized','未分類'], //type ids
			   ['type-Bee','蜜蜂'], 
			   ['type-Bear','熊'],
			   ['type-Mob','生物'],
			   ['type-Animal','非蜂群模擬器生物'],
			   ['type-ROBLOX_Games','ROBLOX 遊戲'],
			   ['type-Puffshroom','泡芙菇'],
			   ['type-Leaf','葉子'],
			   ['type-Tool','工具'],
			   ['type-Sign','星座'],
			   ['type-Stamp','郵票'],
			   ['type-Secret','秘密']];  //stickers hidden until unlocked
var methodIds = [['method-Hidden_Sticker','隱藏貼紙','[Chance]'], //method ids
				 ['method-Sticker_Printer','貼紙打印機','[Egg]'],
				 ['method-Planter','盆栽（除了貼紙盆栽）','[Planter][Field][Chance]'], //may introduce planter type
				 ['method-Sticker_Planter','貼紙盆栽','[Field][Chance]'],
				 ['method-Sprout','嫩芽（除了貼紙嫩芽）','[Field][Chance]'],
				 ['method-Sticker_Sprout','貼紙嫩芽','[Chance]'],
				 ['method-Quest','任務（除了貼紙搜尋者任務）','[Bear][Chance]'], //may introduce quest giver
				 ['method-Sticker_Seeker_Quest','貼紙搜尋者任務','[Chance]'],
				 ['method-Tool','工具（除了貼紙搜尋者）','[Tool][Chance]'], //may introduce tool type, no field?
				 ['method-Sticker_Seeker_Tool','貼紙搜尋者','[Field][Chance]'],
				 ['method-Gather','蜜蜂採集','[Bee][Field][Chance]'], //may introduce field/bee
				 ['method-Feed','餵食','[Treat][Bee][Chance]'], //may introduce treat
				 ['method-Mob','生物','[Mob][Chance]'], //may introduce mob
				 ['method-Machines','機器','[Chance]'],
				 ['method-Shops','商店',''], //no chance
				 ['method-Leaves','葉子','[Field][Chance]'],
				 ['method-Fireflies','螢火蟲','[Chance]'],
				 ['method-Puffshrooms','泡芙菇','[Puff][Chance]'],
				 ['method-Mythic_Meteor','神話隕石','[Chance]'],
				 ['method-Achievement','成就',''], //no chance
				 ['method-Leaderboard','排行榜',''], //no chance
				 ['method-Challenges','挑戰','[Challenge][Chance]'],
				 ['method-Robux','Robux',''], //no chance
				 ['method-Gift_Boxes','禮物盒',''], //no chance
				 ['method-Special','特殊','[Chance]']];

// extra filters
// list: chance, egg, puff, treat, field, bee, tool, planter, bear, mob, challenge
var allSuffixes = new Map([
	["Chance",[['-Chance_Guaranteed','必定取得'],
			   ['-Chance_Specific','特定機率'],
	           ['-Chance_Common','常見'],
               ['-Chance_Uncommon','不常見'],
               ['-Chance_Rare','稀有'],
               ['-Chance_Very_Rare','非常稀有'],
               ['-Chance_Extremely_Rare','極為罕見'],
               ['-Chance_Unbelievably_Rare','難以置信地罕見'],
               ['-Chance_Unfathomably_Rare','深不可測地罕見'],
               ['-Chance_Nearly_Impossible','幾乎不可能']]
    ],
    ["Egg",[['-Egg_Basic','基本蜂卵'],
		    ['-Egg_Silver','白銀蜂卵'],
			['-Egg_Gold','黃金蜂卵'],
	     	['-Egg_Diamond','鑽石蜂卵'],
			['-Egg_Mythic','神話蜂卵'],
			['-Egg_Star','星星蜂卵'],
			['-Egg_Gifted_Silver','優秀白銀蜂卵'],
			['-Egg_Gifted_Gold','優秀黃金蜂卵'],
			['-Egg_Gifted_Diamond','優秀鑽石蜂卵'],
			['-Egg_Gifted_Mythic','優秀神話蜂卵']]
	],
	["Puff",[['-Puff_Common','普通+ 泡芙菇'],
			 ['-Puff_Rare','稀有+ 泡芙菇'],
			 ['-Puff_Epic','史詩+ 泡芙菇'],
			 ['-Puff_Legendary','傳說+ 泡芙菇'],
		     ['-Puff_Mythic','神話+ 泡芙菇']]
	],
	["Treat",[['-Treat_Treat','點心'],
			  ['-Treat_Strawberry','草莓'],
			  ['-Treat_Blueberry','藍莓'],
			  ['-Treat_Sunflower_Seed','向日葵種子'],
			  ['-Treat_Pineapple','鳳梨'],
			  ['-Treat_Moon_Charm','月亮符'],
			  ['-Treat_Bitterberry','苦莓'],
			  ['-Treat_Neonberry','紐恩莓'],
		      ['-Treat_Star_Treat','星星點心']]
	],
	["Field",[['-Field_Happy','非常開心'],
			  ['-Field_Upset','沮喪'],
			  ['-Field_Sunflower','向日葵田地'],
			  ['-Field_Dandelion','蒲公英田地'],
			  ['-Field_Mushroom','蘑菇田地'],
			  ['-Field_Blue_Flower','藍花田地'],
			  ['-Field_Clover','幸運草田地'],
			  ['-Field_Spider','蜘蛛田地'],
			  ['-Field_Bamboo','竹子田地'],
			  ['-Field_Strawberry','草莓田地'],
			  ['-Field_Pineapple','鳳梨田地'],
			  ['-Field_Stump','樹樁田地'],
			  ['-Field_Cactus','仙人掌田地'],
			  ['-Field_Pumpkin','南瓜田地'],
			  ['-Field_Pine_Tree','松樹森林田地'],
			  ['-Field_Rose','玫瑰田地'],
			  ['-Field_Ant','螞蟻田地'],
			  ['-Field_Hub','大廳田地'],
			  ['-Field_Mountain_Top','山頂田地'],
			  ['-Field_Coconut','椰子田地'],
			  ['-Field_Pepper','辣椒田地']]
	],
	["Bee",[['-Bee_Basic','基本蜂'],
			['-Bee_Bomber','炸彈蜂'],
			['-Bee_Brave','勇敢蜂'],
			['-Bee_Bumble','笨拙蜂'],
			['-Bee_Cool','冷酷蜂'],
			['-Bee_Hasty','匆忙蜂'],
			['-Bee_Looker','勘察蜂'],
			['-Bee_Rad','紅炫蜂'],
			['-Bee_Rascal','淘氣蜂'],
			['-Bee_Stubborn','頑固蜂'],
			['-Bee_Bubble','泡泡蜂'],
			['-Bee_Bucko','壞壞蜂'],
			['-Bee_Commander','指揮蜂'],
			['-Bee_Demo','爆破蜂'],
			['-Bee_Exhausted','虛脫蜂'],
			['-Bee_Fire','火焰蜂'],
			['-Bee_Frosty','冰雪蜂'],
			['-Bee_Honey','蜂蜜蜂'],
			['-Bee_Rage','憤怒蜂'],
			['-Bee_Riley','火爆蜂'],
			['-Bee_Shocked','驚嚇蜂'],
			['-Bee_Baby','嬰兒蜂'],
			['-Bee_Carpenter','工匠蜂'],
			['-Bee_Demon','惡魔蜂'],
			['-Bee_Diamond','鑽石蜂'],
			['-Bee_Lion','獅頭蜂'],
			['-Bee_Music','音樂蜂'],
			['-Bee_Ninja','忍者蜂'],
			['-Bee_Shy','害羞蜂'],
			['-Bee_Buoyant','漂浮蜂'],
			['-Bee_Fuzzy','絨毛蜂'],
			['-Bee_Precise','精準蜂'],
			['-Bee_Spicy','火辣蜂'],
			['-Bee_Tadpole','蝌蚪蜂'],
			['-Bee_Vector','向量蜂'],
			['-Bee_Bear','熊蜜蜂'],
			['-Bee_Cobalt','鈷藍蜂'],
			['-Bee_Crimson','鮮紅蜂'],
			['-Bee_Digital','數據蜂'],
			['-Bee_Festive','歡樂蜂'],
			['-Bee_Gummy','軟糖蜂'],
			['-Bee_Photon','光子蜂'],
			['-Bee_Puppy','小狗蜂'],
			['-Bee_Tabby','虎斑貓蜂'],
			['-Bee_Vicious','惡毒蜂'],
			['-Bee_Windy','風蜂']]
	],
	["Tool",[['-Tool_Scooper','鏟子'],
			 ['-Tool_Rake','耙子'],
			 ['-Tool_Clippers','小剪刀'],
		 	 ['-Tool_Magnet','磁鐵'],
			 ['-Tool_Vacuum','吸塵器'],
			 ['-Tool_Super-Scooper','超級鏟子'],
			 ['-Tool_Pulsar','脈衝星'],
			 ['-Tool_Electro-Magnet','電磁鐵'],
			 ['-Tool_Scissors','剪刀'],
			 ['-Tool_Honey_Dipper','蜂蜜斗杓'],
			 ['-Tool_Bubble_Wand','泡泡法杖'],
			 ['-Tool_Scythe','鐮刀'],
			 ['-Tool_Golden_Rake','金耙子'],
			 ['-Tool_Spark_Staff','火花魔杖'],
			 ['-Tool_Porcelain_Dipper','陶瓷斗杓'],
			 ['-Tool_Petal_Wand','花瓣法杖'],
			 ['-Tool_Tide_Popper','浪潮穿刺者'],
			 ['-Tool_Dark_Scythe','闇黑鐮刀'],
			 ['-Tool_Gummyballer','軟糖球法杖']]
	],
	["Planter",[['-Planter_Paper','紙盆栽'],
				['-Planter_Ticket','票券盆栽'],
				['-Planter_Festive','歡樂盆栽'],
				['-Planter_Plastic','塑膠盆栽'],
				['-Planter_Candy','糖果盆栽'],
				['-Planter_Red_Clay','紅色黏土盆栽'],
				['-Planter_Blue_Clay','藍色黏土盆栽'],
				['-Planter_Tacky','民俗盆栽'],
				['-Planter_Pesticide','農藥盆栽'],
				['-Planter_Heat-Treated','熱處理盆栽'],
				['-Planter_Hydroponic','水耕盆栽'],
				['-Planter_Petal','花瓣盆栽'],
				['-Planter_Plenty','大豐收之盆栽']]
	],
	["Bear",[['-Bear_Black','黑熊'],
			 ['-Bear_Brown','棕熊'],
			 ['-Bear_Mother','媽媽熊'],
			 ['-Bear_Panda','貓熊'],
			 ['-Bear_Science','科學熊'],
			 ['-Bear_Dapper','軍官熊'],
			 ['-Bear_Honey','蜂蜜蜂'],
			 ['-Bear_Polar','北極熊'],
			 ['-Bear_Robo','機器熊'],
			 ['-Bear_Gifted_Riley','優秀火爆蜂'],
			 ['-Bear_Gifted_Bucko','優秀壞壞蜂'],
			 ['-Bear_Stick','竹節蟲'],
			 ['-Bear_Onett','Onett'],
			 ['-Bear_Spirit','靈熊'],
			 ['-Bear_Sun','太陽熊'],
			 ['-Bear_Gummy','軟糖熊'],
			 ['-Bear_Bee','蜜蜂熊'],
			 ['-Bear_BBM','泡泡蜂男']]
	],
	["Mob",[['-Mob_Ladybug','瓢蟲'],
			['-Mob_Rhino_Beetle','獨角仙'],
			['-Mob_Spider','蜘蛛'],
			['-Mob_Scorpion','蠍子'],
			['-Mob_Mantis','螳螂'],
			['-Mob_Werewolf','狼人'],
			['-Mob_Wild_Windy','野生風蜂'],
			['-Mob_Rouge_Vicious','流氓惡毒蜂'],
			['-Mob_Snowbear','雪熊'],
			['-Mob_Commando_Chick','手榴彈小雞'],
			['-Mob_King Beetle','甲蟲王'],
			['-Mob_Coconut_Crab','椰子蟹'],
			['-Mob_Tunnel_Bear','隧道熊'],
			['-Mob_Mondo_Chick','卓越小雞'],
			['-Mob_Stick_Bug','竹節蟲'],
			['-Mob_Diamond_Aphid','鑽石蚜蟲'],
			['-Mob_Armored_Aphid','裝甲蚜蟲'],
			['-Mob_Rage_Aphid','憤怒蚜蟲'],
			['-Mob_Aphid','蚜蟲'],
			['-Mob_Cave_Monster','洞穴怪物'],
			['-Mob_Stick_Nymph','竹節蟲若蟲'],
			['-Mob_Ant','螞蟻'],
			['-Mob_Giant_Ant','巨蟻'],
			['-Mob_Fire_Ant','火蟻'],
			['-Mob_Flying_Ant','飛蟻'],
			['-Mob_Army_Ant','軍蟻'],
			['-Mob_Festive_Nymph','歡樂竹節蟲若蟲'],
			['-Mob_Mechsquito','機械蚊'],
			['-Mob_Mega_Mechsquito','非凡機械蚊'],
			['-Mob_Cogmower','齒輪割草機'],
			['-Mob_Cogturret','齒輪砲塔'],
			['-Mob_Golden_Cogmower','黃金割草機'],
			['-Mob_Party_Mechsquito','派對機械蚊'],
			['-Mob_Party_Cogmower','派對齒輪割草機'],
			['-Mob_Party_Cogturret','派對齒輪砲塔'],
			['-Mob_Party_Mega_Mechsquito','派對非凡機械蚊'],
			['-Mob_Zombie','殭屍'],
			['-Mob_Slime','史萊姆']]
	],
	["Challenge",[['-Challenge_Retro_Swarm','復古蜂群挑戰'],
				  ['-Challenge_Ant','螞蟻挑戰'],
				  ['-Challenge_Stick_Bug','竹節蟲挑戰'],
				  ['-Challenge_Robo_Bear','機器熊挑戰']]
	]
	]);