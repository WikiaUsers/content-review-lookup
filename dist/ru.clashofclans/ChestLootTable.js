/* 
	ChestLootTable.js - calculates the loot probabilities of getting items from treasure chests
	Created by: MagmaHound
*/
$(document).ready(function(){
	// Create input and output
	$("span#chestLootTableInput").html(
		'<div id="THSel">Town Hall Level: <select id="THLevel"></select></div>'+
		'<div id="BHSel" style="display:none;">Builder Hall Level: <select id="BHLevel"></select></div>'+
		'<div id="decoHolder"><span id="decoToggle"><u>Show Decoration Checklist</u></span><div id="decoList" style="border: 1px solid; width: 40%; display:none;">'+
		'<button id="decoEnableAll">Select All</button>'+
		'<button id="decoDisableAll">Unselect All</button><br>'+
		'</div></div>'+
		'<div id="houseHolder" style="display:none;"><span id="houseToggle"><u>Show House Part Checklist</u></span><div id="houseList" style="border: 1px solid; width: 40%; display:none;">'+
		'<button id="houseEnableAll">Select All</button>'+
		'<button id="houseDisableAll">Unselect All</button><br>'+
		'</div></div>'+
		'<div id="heroSkinHolder" style="display:none;"><span id="heroSkinToggle"><u>Show Hero Skin Checklist</u></span><div id="heroSkinContainer" style="border: 1px solid; width: 100%; display:none;">'+
		'<button id="heroSkinEnableAll">Select All</button>'+
		'<button id="heroSkinDisableAll">Unselect All</button><br>'+
		'<table>'+
		'<tr style="vertical-align:top;">'+
		'<td><div id="heroSkinListBK" style="border: 1px solid;">'+
		'<b>Barbarian King Skins:</b><br>'+
		'<button id="enableSkinsBK" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsBK" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+
		'<td><div id="heroSkinListAQ" style="border: 1px solid;">'+
		'<b>Archer Queen Skins:</b><br>'+
		'<button id="enableSkinsAQ" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsAQ" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+
        /* Reserved for future appearance of Minion Prince skins
		'<td><div id="heroSkinListMP" style="border: 1px solid;">'+
		'<b>Minion Prince Skins:</b><br>'+
		'<button id="enableSkinsMP" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsMP" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+ */
		'<td><div id="heroSkinListGW" style="border: 1px solid;">'+
		'<b>Grand Warden Skins:</b><br>'+
		'<button id="enableSkinsGW" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsGW" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+
		'<td><div id="heroSkinListRC" style="border: 1px solid;">'+
		'<b>Royal Champion Skins:</b><br>'+
		'<button id="enableSkinsRC" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsRC" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+
		'</tr>'+
		'<tr style="vertical-align:top;">'+
		'<td><div id="heroSkinListBM" style="border: 1px solid;">'+
		'<b>Battle Machine Skins:</b><br>'+
		'<button id="enableSkinsBM" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsBM" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+
        /* Reserved for future appearance of Battle Copter skins
		'<td><div id="heroSkinListBC" style="border: 1px solid;">'+
		'<b>Battle Copter Skins:</b><br>'+
		'<button id="enableSkinsBC" class="enableSkins">Select All</button>'+
		'<button id="disableSkinsBC" class="disableSkins">Unselect All</button><br>'+
		'</div></td>'+ */
		'</tr>'+
		'</table>'+
		'</div></div>'+
		'<div id="equipHolder" style="display:none;"><span id="equipToggle"><u>Show Hero Equipment Checklist</u></span><div id="equipList" style="border: 1px solid; width: 40%; display:none;">'+
		'<button id="equipEnableAll">Select All</button>'+
		'<button id="equipDisableAll">Unselect All</button><br>'+
		'</div></div>'+
		'<button id="makeOutput">Get Tables</button>');
	$("span#chestLootTableOutput").html(
		'<table class="lootTable wikitable" id="lootTableCommon"></table>'+
		'<table class="lootTable wikitable" id="lootTableRare"></table>'+
		'<table class="lootTable wikitable" id="lootTableEpic"></table>'+
		'<table class="lootTable wikitable" id="lootTableLegendary"></table>');
	var maxTHLevel = 17;
    var maxBHLevel = 10;
    // Create a list of available decorations
    var decorationsList = ["Pirate Flag", "Mighty Statue", "Mighty Hero Statue", "Archer Queen Statue", "Ancient Barbarian Statue", "Anniversary Fountain", "\"A Piece of Birthday Cake\"", "Storied Statue", "Logmas Tree", "Flowing Fountain","Fiery Figure","Wizard Statue","Goblin King Tribute","Eternal Flame","Clashmas Sleigh","Decorated Dragon Statue","Books of Clash Statue","Goblin Dragon Statue","Sour Elixir Cauldron","World Finals 23 Statue","Cozy Clam","Hog Pen","Duck Bath","Gingerbread Bakery","Jingle Bell"];
    // Similar for houses
    var housesList = ["Brown Tent Roof", "Red Tent Roof", "Yellow Tent Roof", "Blue Tent Roof", "Blue Cross Roof", "Green Cross Roof", "Red Cross Roof", "Orange Castle Roof", "Blue Castle Roof", "Black Castle Roof", "Red Castle Roof", "Yellow Castle Roof", "Red Pagoda Roof", "Blue Pagoda Roof", "Black Pagoda Roof", "Green Pagoda Roof", "White Pagoda Roof", "Stone Roof", "Grass Roof (Type 1)", "Grass Roof (Type 2)", "White Windmill Roof", "Blue Windmill Roof", "Orange Windmill Roof", "Red Windmill Roof", "Green Windmill Roof", "Winter Roof", "Igloo Roof", "Gingerbread Roof",
    "Dark Stone Walls", "Stilt Walls", "Grass Walls", "Winter Walls", "Igloo Walls", "Gingerbread Walls",
    "Checkered Floor", "Grass Floor", "White Fence Floor", "Gold Floor", "Snow Floor", "Gingerbread Floor",
    "Tree Decoration", "Flamingo Decoration", "Stone Decoration", "Snowman Decoration", "Candy Cane Decoration", "Gingerbread Decoration"];
    // Create a list of available equipment
    // This is split into different pools for each Hero,
    // which is needed to individually show/hide options
    var equipmentList = {
    	"BK": ["Giant Gauntlet", "Spiky Ball"],
        "AQ": ["Frozen Arrow", "Magic Mirror"],
        "GW": ["Fireball", "Lavaloon Puppet"],
        "RC": ["Rocket Spear", "Electro Boots"],
    };
    // Do the same for hero skins
    var heroSkinList = {
    	"BK": ["Gladiator King", "P.E.K.K.A King", "Skeleton King", "Jolly King", "Primal King", "Clockwork King", "Party King", "Pirate King", "Rogue King", "Jungle King", "Golem King", "Shadow King", "Clash Fest King", "Beast King", "Dark Ages King", "Goblin King", "King of the North"],
        "AQ": ["Gladiator Queen", "Valkyrie Queen", "Autumn Queen", "Ice Queen", "Primal Queen", "Clockwork Queen", "Pirate Queen", "Rogue Queen", "Jungle Queen", "Party Queen", "Shadow Queen", "Miner Queen", "Summer Queen", "Spooky Queen", "Jolly Queen", "Goblin Queen", "Chess Queen"],
        "GW": ["Party Warden", "Primal Warden", "Clockwork Warden", "Gladiator Warden", "Pirate Warden", "Warden of the North", "Jungle Warden", "Warden Master", "Jolly Warden", "Warrior Warden", "Summer Warden", "Dark Ages Warden", "Future Warden", "Gingerbread Warden"],
        "RC": ["Winter Champion", "Rogue Champion", "Gladiator Champion", "Shadow Champion", "Party Champion", "Pirate Champion", "Warrior Champion", "Ghost Champion", "Champions' Champion"],
        "BM": ["Armored Machine"]
    };
    // Add booleans for the status of checklist toggles (used for flavor text)
    var decoToggled = false;
    var houseToggled = false;
    var equipToggled = false;
    var heroSkinToggled = false;
    // This boolean tracks whether or not the Hero Skin header was toggled
    var skinsHeaderToggled = false;
    // Create a dictionary of possible weights
    // Each such object is initialized empty, because we will refresh them on input
    var dictWeightsCommon;
    var dictWeightsRare;
    var dictWeightsEpic;
    var dictWeightsLegendary;
    var chestChances = {
    		"Common": 58,
            "Rare": 32,
            "Epic": 8,
            "Legendary": 2,
    	};
    // A dictionary of snacks and their minimum TH (if a further restriction exists)
    var listSnacks = {
    	"Builder Bite": 0,
        "Study Soup": 0,
        "Power Pancakes": 0,
        "Mighty Morsel": 7,
    //    "Training Treat": 0, Will be removed soon
        "Clan Castle Cake": 4,
    };
   	// A dictionary of possible loot ranges. Each is an object containing two arrays
    var lootRanges = {
    	"Gold": {"Common": [0,
        	"2,000-4,000", 			// TH1
        	"3,000-6,000", 			// TH2
        	"7,500-15,000", 		// TH3
        	"20,000-40,000", 		// TH4
            "40,000-80,000", 		// TH5
            "80,000-160,000", 		// TH6
            "150,000-300,000", 		// TH7
            "250,000-500,000", 		// TH8
            "325,000-650,000", 		// TH9
            "400,000-800,000", 		// TH10
            "450,000-900,000", 		// TH11
            "500,000-950,000", 		// TH12
            "550,000-1,000,000", 	// TH13
            "600,000-1,050,000", 	// TH14
            "650,000-1,100,000", 	// TH15
            "700,000-1,150,000",    // TH16
            "750,000-1,200,000"],   // TH17
        		"Rare": [0,
            "4,000-8,000",			// TH1
            "6,000-12,000",			// TH2
            "15,000-30,000",		// TH3
            "40,000-80,000",		// TH4
            "80,000-160,000",		// TH5
            "160,000-320,000",		// TH6
            "300,000-600,000",		// TH7
            "500,000-1,000,000",	// TH8
            "650,000-1,300,000",	// TH9
            "800,000-1,600,000",	// TH10
            "900,000-1,800,000",	// TH11
            "1,000,000-1,900,000",	// TH12
            "1,100,000-2,000,000",	// TH13
            "1,200,000-2,100,000",	// TH14
            "1,300,000-2,200,000",	// TH15
            "1,400,000-2,300,000",  // TH16
            "1,500,000-2,400,000"]},// TH17
    	"Elixir": {"Common": [0,
        	"2,000-4,000", 			// TH1
        	"3,000-6,000", 			// TH2
        	"7,500-15,000", 		// TH3
        	"20,000-40,000", 		// TH4
            "40,000-80,000", 		// TH5
            "80,000-160,000", 		// TH6
            "150,000-300,000", 		// TH7
            "250,000-500,000", 		// TH8
            "325,000-650,000", 		// TH9
            "400,000-800,000", 		// TH10
            "450,000-900,000", 		// TH11
            "500,000-950,000", 		// TH12
            "550,000-1,000,000", 	// TH13
            "600,000-1,050,000", 	// TH14
            "650,000-1,100,000", 	// TH15
            "700,000-1,150,000",    // TH16
            "750,000-1,200,000"],   // TH17
        		"Rare": [0,
            "4,000-8,000",			// TH1
            "6,000-12,000",			// TH2
            "15,000-30,000",		// TH3
            "40,000-80,000",		// TH4
            "80,000-160,000",		// TH5
            "160,000-320,000",		// TH6
            "300,000-600,000",		// TH7
            "500,000-1,000,000",	// TH8
            "650,000-1,300,000",	// TH9
            "800,000-1,600,000",	// TH10
            "900,000-1,800,000",	// TH11
            "1,000,000-1,900,000",	// TH12
            "1,100,000-2,000,000",	// TH13
            "1,200,000-2,100,000",	// TH14
            "1,300,000-2,200,000",	// TH15
            "1,400,000-2,300,000",  // TH16
            "1,500,000-2,400,000"]},// TH17
         "Dark Elixir": {"Common": [0,0,0,0,0,0,0,
         	"1,200-2,000", 		// TH7
            "2,400-4,000",		// TH8
            "4,200-7,000",		// TH9
            "6,000-10,000",		// TH10
            "6,750-11,250",		// TH11
            "7,250-11,875",		// TH12
            "7,750-12,500",		// TH13
            "8,250-13,000",		// TH14
            "8,750-13,500",		// TH15
            "9,000-13,750",		// TH16
            "9,250-14,000"], 	// TH17
            	"Rare": [0,0,0,0,0,0,0,
            "2,400-4,000",		// TH7
            "4,800-8,000",		// TH8
            "8,400-14,000",		// TH9
            "12,000-20,000",	// TH10
            "13,500-22,500",	// TH11
            "14,500-23,750",	// TH12
            "15,500-25,000",	// TH13
            "16,500-26,000",	// TH14
            "17,500-27,000",	// TH15
            "18,000-27,500",	// TH16
            "18,500-28,000"]},	// TH17
       	"Builder Gold": {"Common": [0,
         	"17,500-25,000",		// BH1
            "17,500-25,000",		// BH2
            "100,000-125,000",		// BH3
            "150,000-250,000",		// BH4
            "275,000-375,000",		// BH5
            "325,000-475,000",		// BH6
            "350,000-550,000",		// BH7
            "375,000-625,000",		// BH8
            "375,000-625,000",		// BH9
            "375,000-625,000"],		// BH10
            	"Rare": [0,
           	"35,000-50,000",		// BH1
            "35,000-50,000",		// BH2
            "200,000-250,000",		// BH3
            "300,000-400,000",		// BH4
            "550,000-750,000",		// BH5
            "650,000-950,000",		// BH6
            "700,000-1,100,000",	// BH7
            "750,000-1,250,000",	// BH8
            "750,000-1,250,000",	// BH9
            "750,000-1,250,000"]},	// BH10
       	"Builder Elixir": {"Common": [0,
         	"17,500-25,000",		// BH1
            "17,500-25,000",		// BH2
            "100,000-125,000",		// BH3
            "150,000-250,000",		// BH4
            "275,000-375,000",		// BH5
            "325,000-475,000",		// BH6
            "350,000-550,000",		// BH7
            "375,000-625,000",		// BH8
            "375,000-625,000",		// BH9
            "375,000-625,000"],		// BH10
            	"Rare": [0,
           	"35,000-50,000",		// BH1
            "35,000-50,000",		// BH2
            "200,000-250,000",		// BH3
            "300,000-400,000",		// BH4
            "550,000-750,000",		// BH5
            "650,000-950,000",		// BH6
            "700,000-1,100,000",	// BH7
            "750,000-1,250,000",	// BH8
            "750,000-1,250,000",	// BH9
            "750,000-1,250,000"]},	// BH10
       	"Shiny Ore": {"Rare": [0,0,0,0,0,0,0,0,
        	"300-400", 		// TH8
        	"300-400", 		// TH9
            "350-500",		// TH10
            "350-500",		// TH11
            "400-600",		// TH12
            "400-600",		// TH13
            "450-700",		// TH14
            "450-700",		// TH15
            "500-750",		// TH16
			"500-750"],		// TH17
            	"Epic": [0,0,0,0,0,0,0,0,
            "900-1,300",	// TH8
            "900-1,300",	// TH9
            "1,050-1,600",	// TH10
            "1,050-1,600",	// TH11
            "1,200-1,900",	// TH12
            "1,200-1,900",	// TH13
            "1,350-2,200",	// TH14
            "1,350-2,200",	// TH15
            "1,500-2,500",	// TH16
            "1,500-2,500"]},// TH17
        "Glowy Ore": {"Rare": [0,0,0,0,0,0,0,0,
        	"30-40",		// TH8
        	"30-40",		// TH9
            "35-50",		// TH10
            "35-50",		// TH11
            "40-60",		// TH12
            "40-60",		// TH13
            "45-70",		// TH14
            "45-70",		// TH15
            "50-75",		// TH16
            "50-75"],		// TH17
            	"Epic": [0,0,0,0,0,0,0,0,
            "90-130",		// TH8
            "90-130",		// TH9
            "105-160",		// TH10
            "105-160",		// TH11
            "120-190",		// TH12
            "120-190",		// TH13
            "135-220",		// TH14
            "135-220",		// TH15
            "150-250",		// TH16
            "150-250"]},	// TH17
        "Starry Ore": {"Rare": [0,0,0,0,0,0,0,0,
        	"2-3",			// TH8
        	"2-3",			// TH9
            "3-4",			// TH10
            "3-4",			// TH11
            "4-5",			// TH12
            "4-5",			// TH13
            "5-6",			// TH14
            "5-6",			// TH15
            "6-7",			// TH16
            "6-7"],			// TH17
            	"Epic": [0,0,0,0,0,0,0,0,
            "17-27",		// TH8
            "17-27",		// TH9
            "19-29",		// TH10
            "19-29",		// TH11
            "21-31",		// TH12
            "21-31",		// TH13
            "23-33",		// TH14
            "23-33",		// TH15
            "25-35",		// TH16
            "25-35"]},		// TH17
    };
    function resetDictionary(){
    	// Each dictionary contains sub-dictionaries.
        // The weight component is used for the main calculation,
        // whereas TH and BH are used for filtering
        dictWeightsCommon = {
            "Magic Snacks": {weight: 12, TH: 3, BH: 0, isResource: false},
            "Dark Elixir": {weight: 5, TH: 7, BH: 0, isResource: true},
            "Gold": {weight: 3, TH: 1, BH: 0, isResource: true},
            "Elixir": {weight: 3, TH: 1, BH: 0, isResource: true},
            "Builder Gold": {weight: 1, TH: 0, BH: 1, isResource: true},
            "Builder Elixir": {weight: 1, TH: 0, BH: 1, isResource: true},
            "1,000-1,500 Capital Gold": {weight: 1, TH: 6, BH: 0, isResource: false},
        };
        dictWeightsRare = {
        	"Gold": {weight: 6, TH: 1, BH: 0, isResource: true},
            "Elixir": {weight: 6, TH: 1, BH: 0, isResource: true},
            "Dark Elixir": {weight: 6, TH: 7, BH: 0, isResource: true},
            "Shiny Ore": {weight: 6, TH: 8, BH: 0, isResource: true},
            "Glowy Ore": {weight: 6, TH: 8, BH: 0, isResource: true},
            "Starry Ore": {weight: 6, TH: 8, BH: 0, isResource: true},
        //    "Training Potion": {weight: 6, TH: 1, BH: 0, isResource: false}, Will be removed soon
            "Resource Potion": {weight: 6, TH: 1, BH: 0, isResource: false},
            "Power Potion": {weight: 6, TH: 3, BH: 0, isResource: false},
            "Research Potion": {weight: 6, TH: 3, BH: 0, isResource: false},
            "Hero Potion": {weight: 6, TH: 7, BH: 0, isResource: false},
            "2-3 Wall Rings": {weight: 6, TH: 9, BH: 0, isResource: false},
            "2,000-3,000 Capital Gold": {weight: 4, TH: 6, BH: 0, isResource: false},
            "Builder Potion": {weight: 4, TH: 1, BH: 0, isResource: false},
            "Super Potion": {weight: 4, TH: 11, BH: 0, isResource: false},
            "Pet Potion": {weight: 4, TH: 14, BH: 0, isResource: false},
            "Builder Gold": {weight: 3, TH: 0, BH: 1, isResource: true},
            "Builder Elixir": {weight: 3, TH: 0, BH: 1, isResource: true},
            "Clock Tower Potion": {weight: 3, TH: 4, BH: 0, isResource: false},
            "Builder Star Jar": {weight: 3, TH: 4, BH: 0, isResource: false},
        };
        dictWeightsEpic = {
        	"Clan House Parts": {weight: 15, TH: 6, BH: 0, isResource: false},
        	"Decorations": {weight: 10, TH: 1, BH: 0, isResource: false},
            "Shiny Ore": {weight: 8, TH: 8, BH: 0, isResource: true},
            "Glowy Ore": {weight: 8, TH: 8, BH: 0, isResource: true},
            "Starry Ore": {weight: 8, TH: 8, BH: 0, isResource: true},
            "2 Builder Potions": {weight: 5, TH: 1, BH: 0, isResource: false},
            "Book of Building": {weight: 5, TH: 1, BH: 0, isResource: false},
            "Book of Fighting": {weight: 5, TH: 3, BH: 0, isResource: false},
            "Shovel of Obstacles": {weight: 5, TH: 3, BH: 0, isResource: false},
            "Book of Heroes": {weight: 5, TH: 7, BH: 0, isResource: false},
            "Rune of Builder Gold": {weight: 2, TH: 4, BH: 0, isResource: false},
            "Rune of Builder Elixir": {weight: 2, TH: 4, BH: 0, isResource: false},
            "Book of Spells": {weight: 2, TH: 5, BH: 0, isResource: false},
        };
        dictWeightsLegendary = {
        	"Hero Skins": {weight: 40, TH: 7, BH: 0, isResource: false},
            "Hero Equipment": {weight: 20, TH: 8, BH: 0, isResource: false},
            "Hammer of Building": {weight: 5, TH: 1, BH: 0, isResource: false},
            "Hammer of Fighting": {weight: 5, TH: 3, BH: 0, isResource: false},
            "Hammer of Heroes": {weight: 5, TH: 7, BH: 0, isResource: false},
            "Rune of Gold": {weight: 5, TH: 3, BH: 0, isResource: false},
            "Rune of Elixir": {weight: 5, TH: 3, BH: 0, isResource: false},
            "Rune of Dark Elixir": {weight: 5, TH: 7, BH: 0, isResource: false},
            "Book of Everything": {weight: 3, TH: 1, BH: 0, isResource: false},
            "Hammer of Spells": {weight: 2, TH: 5, BH: 0, isResource: false},
        };
    }
	function initializeOptions(){
    	var equipArr = [];
        var skinArr = [];
    	// Prepares the initial options
        for (i = 1; i <= maxTHLevel; i++) {
        	$("select#THLevel").append($("<option></option>").attr("value",i).text(i));
        }
        for (i = 0; i <= maxBHLevel; i++) {
        	$("select#BHLevel").append($("<option></option>").attr("value",i).text(i));
        }
        decorationsList.forEach(function(value,index){
        	$("div#decoList").append("<input type='checkbox' name='deco" + index +
            "'id='deco"+ index +
            "' class='decoCheckBox'>" + value + "</input><br>");
        });
        housesList.forEach(function(value,index){
        	$("div#houseList").append("<input type='checkbox' name='house" + index +
            "'id='house"+ index +
            "' class='houseCheckBox'>" + value + "</input><br>");
        });
        for (var key in equipmentList) {
        	equipArr = equipmentList[key];
            equipArr.forEach(function(value,index){
            	$("div#equipList").append("<span class='item" + key + "'>" +
                "<input type='checkbox' name='equip" + key + index +
                "'id='equip" + key + index + "' class='equipCheckBox'" + 
                ">" + value + "</input><br></span>");
            });
        }
        for (key in heroSkinList) {
        	heroSkinArr = heroSkinList[key];
            heroSkinArr.forEach(function(value,index){
                $("div#heroSkinList" + key).append("<span class='item" + key + "'>" +
                "<input type='checkbox' name='heroSkin" + key + index +
                "'id='heroSkin" + key + index + "' class='heroSkinCheckBox'" + 
                ">" + value + "</input><br></span>");
            });
        }
    }
    function sumTotalWeight(d){
    	//Sums all weights of items in a dictionary
        var listKeys = Object.keys(d);
        var totalWeight = 0;
        listKeys.forEach(function(value,index){
        	totalWeight += d[listKeys[index]].weight;
        });
        return totalWeight;
    }
    function writeNumber(numValue){
    	// Writes our percentages as strings.
        // 2 decimal places, or 2 significant figures, depending on the value
        if (numValue >= 1) {
        	return numValue.toFixed(2);
        } else {
        	return numValue.toPrecision(2);
        }
    }
    function getResource(table,itemName,isResource){
    	if (!isResource) {
        	return "";
        }
    	var THL = $("select#THLevel").val();
        var BHL = $("select#BHLevel").val();
        // Look up the appropriate object
        var resourceDict = lootRanges[itemName];
        var resourceDictArr;
       	if (resourceDict != undefined) {
        	resourceDictArr = resourceDict[table];
            if (resourceDictArr != undefined) {
            	if (itemName == "Builder Gold" || itemName == "Builder Elixir") {
                	return resourceDictArr[BHL] + " ";
                } else {
                	return resourceDictArr[THL] + " ";
                }
            } else {
            	return "";
            }
        } else {
        	return "";
        }
    }
    function writeNormalRow(table,itemName,weight,ttlWeight,isResource){
    	var condProb = (weight * 10000) / ttlWeight / 100; //Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr>"+
        "<td>" + getResource(table,itemName,isResource) + itemName + "</td>" + 
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function countSnacks(){
    	// Counts the number of snacks available based on TH level
        var THL = $("select#THLevel").val();
        var totalSnacks = 0;
        var snackKeys = Object.keys(listSnacks);
        snackKeys.forEach(function(value){
            if (listSnacks[value] <= THL) {
            	totalSnacks++;
            }
        });
        return totalSnacks;
    }
    function writeSnackRow(table,itemName,weight,ttlWeight){
    	var condProb = (weight * 10000) / ttlWeight / 100; //Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr id=\"snackRow\" class=\"lootExpand\">"+
        "<td><u>" + itemName + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Get the total snack count
        var snackCount = countSnacks();
        var snackKeys = Object.keys(listSnacks);
        // Use this to write down the odds of getting individual snacks
        snackKeys.forEach(function(value,index){
            if (listSnacks[value] <= $("select#THLevel").val()) {
            	writeSnackSubRow(table,value,condProb,snackCount);
            }
        });
    }
    function writeSnackSubRow(table,itemName,oriCondProb,snackCount){
    	var condProb = (oriCondProb * 100) / snackCount / 100;
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr class=\"snackRowChild chestSubRow1\""+
        "style=\"display:none;\">"+
        "<td>" + itemName + "</td>" +
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function countDecos(){
    	// Counts the number of decos available based on inputs in the deco checkboxes
        // Note: Only those not checked are counted
        var totalDecos = 0;
        // Loop over each item with class decoCheckBox
        $("div#decoList > .decoCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	totalDecos++;
            }
        });
        return totalDecos;
    }
    function writeDecoRow(table,itemName,weight,ttlWeight){
    	var condProb = (weight * 10000) / ttlWeight / 100; // Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr id=\"decoRow\" class=\"lootExpand\">"+
        "<td><u>" + itemName + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Get the total deco count
        var decoCount = countDecos();
        var decoIndex;
        // Use this to write a subrow for every non-checked decoration
        $("div#decoList > .decoCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	// Get the index and use it to take the correct decoration
                decoIndex = $(this).attr("id").replace("deco","") * 1;
            	writeDecoSubRow(table,decoIndex,condProb,decoCount);
            }
        });
    }
    function writeDecoSubRow(table,itemIndex,oriCondProb,decoCount){
    	var condProb = (oriCondProb * 100) / decoCount / 100;
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr class=\"decoRowChild chestSubRow1\""+
        "style=\"display:none;\">"+
        "<td>" + decorationsList[itemIndex] + "</td>" +
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function countHouseParts(){
    	// Counts the number of houses available based on inputs in the house checkboxes
        // Note: Only those not checked are counted
        var totalHouseParts = 0;
        // Loop over each item with class houseCheckBox
        $("div#houseList > .houseCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	totalHouseParts++;
            }
        });
        return totalHouseParts;
    }
    function writeHouseRow(table,itemName,weight,ttlWeight){
    	var condProb = (weight * 10000) / ttlWeight / 100; // Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr id=\"houseRow\" class=\"lootExpand\">"+
        "<td><u>" + itemName + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Get the total house part count
        var housePartCount = countHouseParts();
        var housePartIndex;
        // Use this to write a subrow for every non-checked decoration
        $("div#houseList > .houseCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	// Get the index and use it to take the correct decoration
                housePartIndex = $(this).attr("id").replace("house","") * 1;
            	writeHouseSubRow(table,housePartIndex,condProb,housePartCount);
            }
        });
    }
    function writeHouseSubRow(table,itemIndex,oriCondProb,housePartCount){
    	var condProb = (oriCondProb * 100) / housePartCount / 100;
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr class=\"houseRowChild chestSubRow1\""+
        "style=\"display:none;\">"+
        "<td>" + housesList[itemIndex] + "</td>" +
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function countEquips(){
    	// Counts the number of equipment available based on inputs in the equipment checkboxes
        // Note: Only those not checked are counted
        var totalEquips = 0;
        // Loop over each item with class equipCheckBox
        $("div#equipList").find(".equipCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	totalEquips++;
            }
        });
        return totalEquips;
    }
	function writeEquipRow(table,itemName,weight,ttlWeight){
    	var condProb = (weight * 10000) / ttlWeight / 100; // Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr id=\"equipRow\" class=\"lootExpand\">"+
        "<td><u>" + itemName + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Get the total equipment count
        var equipCount = countEquips();
        var equipHero = "";
        var equipIndex = "";
        var equipName;
        // Use this to write a subrow for every non-checked equipment
        $("div#equipList").find(".equipCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	// Get the correct object and index with checkbox id and use it to take the correct equipment
                equipHero = $(this).attr("id").substr(5,2);
                equipIndex = $(this).attr("id").substr(7) * 1;
                equipName = equipmentList[equipHero][equipIndex];
            	writeEquipSubRow(table,equipName,condProb,equipCount);
            }
        });
    }
    function writeEquipSubRow(table,itemName,oriCondProb,equipCount){
    	var condProb = (oriCondProb * 100) / equipCount / 100;
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr class=\"equipRowChild chestSubRow1\""+
        "style=\"display:none;\">"+
        "<td>" + itemName + "</td>" +
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function countHeroSkins(hero){
    	// Counts the number of unchecked boxes within the div
        var totalHeroSkins = 0;
        var sel = $("div#heroSkinList" + hero);
        sel.find(".heroSkinCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	totalHeroSkins++;
            }
        });
        return totalHeroSkins;
    }
    function objHeroSkins(){
    	// Creates an object that counts the number of skins per Hero
        // and the number of Heroes with skins
    	return {
        	"BK": countHeroSkins("BK"),
            "AQ": countHeroSkins("AQ"),
            // "MP": countHeroSkins("MP"), Reserved
            "GW": countHeroSkins("GW"),
            "RC": countHeroSkins("RC"),
            "BM": countHeroSkins("BM"),
           	// "BC": countHeroSkins("BC"), Reserved
            countHeroes: function() {
            	var heroCount = 0;
            	heroCount += (this.BK > 0);
                heroCount += (this.AQ > 0);
                // heroCount += (this.MP > 0); Reserved
                heroCount += (this.GW > 0);
                heroCount += (this.RC > 0);
                heroCount += (this.BM > 0);
                // heroCount += (this.BC > 0); Reserved
                return heroCount;
            }
        };
    }
    function writeHeroSkinFirstRow(table,itemName,weight,ttlWeight){
    	var condProb = (weight * 10000) / ttlWeight / 100; // Avoid potential rounding errors and write as a percentage
        var totalProb = condProb * chestChances[table] / 100;
        var objHeroSkin = objHeroSkins();
        var heroesList = ["BK","AQ","GW","RC","BM"];
        $("table#lootTable" + table).append("<tr id=\"heroSkinParent\">"+
        "<td><u>" + itemName + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Write second-layer rows depending on if the corresponding skin has any skins
        heroesList.forEach(function(value){
        	if (objHeroSkin[value] > 0) {
            	writeHeroSkinSecondRow(table,value,condProb,objHeroSkin.countHeroes(),objHeroSkin[value]);
            }
        });
    }
    function writeHeroSkinSecondRow(table,heroName,oriCondProb,countHeroes,countSkins){
    	var condProb = (oriCondProb * 100) / countHeroes / 100;
        var totalProb = condProb * chestChances[table] / 100;
        var heroFullName;
        // Identify the full name of hero
        switch(heroName){
        	case "BK":
            	heroFullName = "Barbarian King";
                break;
            case "AQ":
            	heroFullName = "Archer Queen";
                break;
            case "MP":	// Should be unused for now, but reserved
            	heroFullName = "Minion Prince";
                break;
            case "GW":
            	heroFullName = "Grand Warden";
                break;
            case "RC":
            	heroFullName = "Royal Champion";
                break;
            case "BM":
            	heroFullName = "Battle Machine";
                break;
            case "BC":	// Should be unused for now, but reserved
            	heroFullName = "Battle Copter";
                break;
            default:
            	heroFullName = "???";
        }
        // Write the second row
        $("table#lootTable" + table).append("<tr id=\"heroSkinRow" + heroName + "\"" +
        "class=\"lootExpand chestSubRow1\" style=\"display:none;\">"+
        "<td><u>" + heroFullName + " Skins" + "</u></td>"+
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
        // Now write a sub-row for every non-checked Hero Skin
        var skinIndex;
        var skinName;
        $("div#heroSkinList" + heroName).find(".heroSkinCheckBox").each(function(){
        	if ($(this).prop("checked") === false) {
            	// Get the correct item index with checkbox id and use it to take the correct hero skin
                skinIndex = $(this).attr("id").substr(10) * 1;
                skinName = heroSkinList[heroName][skinIndex];
            	writeHeroSkinThirdRow(table,heroName,skinName,condProb,countSkins);
            }
        });
    }
    function writeHeroSkinThirdRow(table,heroName,itemName,oriCondProb,countSkins){
    	var condProb = (oriCondProb * 100) / countSkins / 100;
        var totalProb = condProb * chestChances[table] / 100;
        $("table#lootTable" + table).append("<tr class=\"heroSkinRow" + heroName + "Child chestSubRow2\""+
        "style=\"display:none;\">"+
        "<td>" + itemName + "</td>" +
        "<td>" + writeNumber(condProb) + "%</td>" +
        "<td>" + writeNumber(totalProb) + "%</td>" +
        "</tr>");
    }
    function makeTable(table, dict){
  		// Reset this variable since the header is collapsed when table is generated
        skinsHeaderToggled = false;
    	// First make the header rows
    	$("table#lootTable" + table).append("<tr>"+
    	"<th colspan='3'>" + table + "</th>");
        $("table#lootTable" + table).append("<tr>"+
        "<td><b>Item</b></td>"+
        "<td><b>Conditional Chance</b></td>"+
        "<td><b>Overall Chance</b></td>");
    	var totalWeight = sumTotalWeight(dict);
        // Loop over all items in the table
        var listKeys = Object.keys(dict);
        var itemWeight = 0;
        listKeys.forEach(function(value){
        	itemWeight = dict[value].weight;
            isResource = dict[value].isResource;
            if (itemWeight > 0) {
            	if (value == "Magic Snacks") {
                	writeSnackRow(table,value,itemWeight,totalWeight);
                } else if (value == "Decorations") {
                	writeDecoRow(table,value,itemWeight,totalWeight);
                } else if (value == "Clan House Parts") {
                	writeHouseRow(table,value,itemWeight,totalWeight);
                } else if (value == "Hero Equipment") {
                	writeEquipRow(table,value,itemWeight,totalWeight);
                } else if (value == "Hero Skins") {
                	writeHeroSkinFirstRow(table,value,itemWeight,totalWeight);
                } else {
        			writeNormalRow(table,value,itemWeight,totalWeight,isResource);
                }
            }
        });
        $("table#lootTable" + table).addClass("mw-collapsible");
    }
    function disableCheckBox(){
    	// Hide the item and also keep it checked
        // The reason to check the box is so that it doesn't count in the function
        $(this).children("input").prop("checked",true);
        $(this).css("display","none");
    }
   	function enableCheckBox(){
    	// Show the item and uncheck it (the latter only if it was not previously visible)
        if ($(this).css("display") == "none") {
        	$(this).children("input").prop("checked",false);
        }
        $(this).css("display","inline");
    }
  	initializeOptions();
    resetDictionary();
    $("span#chestLootTableInput").on("change","select#THLevel",function(){
    	// Hide the BH toggle if less than 4 (and init its value to 0)
       	var THL = $("select#THLevel").val();
        var BHL = $("select#BHLevel").val();
        var BHSel = $("div#BHSel");
        if (THL < 4) {
            BHSel.hide();
            $("select#BHLevel").prop("selectedIndex",0);
        } else {
        	BHSel.show();
        }
        // Clan House toggle: hidden if TH is less than 6
        if (THL < 6) {
        	$("div#houseHolder").hide();
        } else {
        	$("div#houseHolder").show();
        }
        // Hero Skin toggle: hidden if TH is less than 7 and BH is less than 5
        // Also hide if TH is less than 4, as BB cannot be unlocked at this point
        if ((THL < 7 && BHL < 5) || THL < 4) {
        	$("div#heroSkinHolder").hide();
        } else {
        	$("div#heroSkinHolder").show();
        }
        // Hero Equipment toggle: hidden if TH is less than 8
        if (THL < 8) {
        	$("div#equipHolder").hide();
        } else {
        	$("div#equipHolder").show();
        }
        // Show and hide hero checkboxes as appropriate
        if (THL < 7) {
        	$("span.itemBK").each(disableCheckBox);
            $("div#heroSkinListBK").hide();
        } else {
        	$("span.itemBK").each(enableCheckBox);
            $("div#heroSkinListBK").show();
        }
        if (THL < 8) {
        	$("span.itemAQ").each(disableCheckBox);
            $("div#heroSkinListAQ").hide();
        } else {
        	$("span.itemAQ").each(enableCheckBox);
            $("div#heroSkinListAQ").show();
        }
        /* Reserved for Minion Prince
        if (THL < 9) {
        	$("span.itemMP").each(disableCheckBox);
            $("div#heroSkinListMP").hide();
        } else {
        	$("span.itemMP").each(enableCheckBox);
            $("div#heroSkinListMP").show();
        } */
        if (THL < 11) {
        	$("span.itemGW").each(disableCheckBox);
            $("div#heroSkinListGW").hide();
        } else {
        	$("span.itemGW").each(enableCheckBox);
            $("div#heroSkinListGW").show();
        }
        if (THL < 13) {
        	$("span.itemRC").each(disableCheckBox);
            $("div#heroSkinListRC").hide();
        } else {
        	$("span.itemRC").each(enableCheckBox);
            $("div#heroSkinListRC").show();
        }
        // We need to duplicate these checks to disable Builder Base skins on the first use
        if (BHL < 5) {
        	$("span.itemBM").each(disableCheckBox);
            $("div#heroSkinListBM").hide();
        } else {
        	$("span.itemBM").each(enableCheckBox);
            $("div#heroSkinListBM").show();
        }
        /* Reserved for Battle Copter
        if (BHL < 8) {
        	$("span.itemBC").each(disableCheckBox);
            $("div#heroSkinListBC").hide();
        } else {
        	$("span.itemBC").each(enableCheckBox);
            $("div#heroSkinListBC").show();
        } */
    });
    $("span#chestLootTableInput").on("change","select#BHLevel",function(){
    	// Hide the BH toggle if less than 4 (and init its value to 0)
       	var THL = $("select#THLevel").val();
        var BHL = $("select#BHLevel").val();
        // Hero Skin toggle: hidden if TH is less than 7 and BH is less than 5
        // Also hide if TH is less than 4, as BB cannot be unlocked at this point
        if ((THL < 7 && BHL < 5) || THL < 4) {
        	$("div#heroSkinHolder").hide();
        } else {
        	$("div#heroSkinHolder").show();
        }
        if (BHL < 5) {
        	$("span.itemBM").each(disableCheckBox);
            $("div#heroSkinListBM").hide();
        } else {
        	$("span.itemBM").each(enableCheckBox);
            $("div#heroSkinListBM").show();
        }
        /* Reserved for Battle Copter
        if (BHL < 8) {
        	$("span.itemBC").each(disableCheckBox);
            $("div#heroSkinListBC").hide();
        } else {
        	$("span.itemBC").each(enableCheckBox);
            $("div#heroSkinListBC").show();
        } */
    });
    $("span#chestLootTableInput").on("click","button#makeOutput",function(){
    	// $("span.lootTableHeader").show();				Deprecated
    	$("table.lootTable").empty();
        resetDictionary();
    	var THL = $("select#THLevel").val();
        var BHL = $("select#BHLevel").val();
        var dictKey;
        // Write zeroes on the weights where applicable
        // Loop over the dictionaries to write zero
        Object.keys(dictWeightsCommon).forEach(function(value) {
        	dictKey = dictWeightsCommon[value];
            if (dictKey.TH > THL || dictKey.BH > BHL) {
            	dictKey.weight = 0;
            }
        });
        Object.keys(dictWeightsRare).forEach(function(value) {
        	dictKey = dictWeightsRare[value];
            if (dictKey.TH > THL || dictKey.BH > BHL) {
            	dictKey.weight = 0;
            }
        });
        Object.keys(dictWeightsEpic).forEach(function(value) {
        	dictKey = dictWeightsEpic[value];
            if (dictKey.TH > THL || dictKey.BH > BHL) {
            	dictKey.weight = 0;
            }
        });
        Object.keys(dictWeightsLegendary).forEach(function(value) {
        	dictKey = dictWeightsLegendary[value];
            if (dictKey.TH > THL || dictKey.BH > BHL) {
            	dictKey.weight = 0;
            }
        });
        // Handle the Hero Skins weight specially by checking them against TH and BH level
        if (THL >= 7 || BHL >= 5) {
        	dictWeightsLegendary["Hero Skins"].weight = 40;
        } else {
        	dictWeightsLegendary["Hero Skins"].weight = 0;
        }
        // Set weights to zero if there are no available items
        if (countDecos() == 0) {
        	dictWeightsEpic["Decorations"].weight = 0;
        }
        if (countHouseParts() == 0) {
        	dictWeightsEpic["Clan House Parts"].weight = 0;
        }
        if (countEquips() == 0) {
        	dictWeightsLegendary["Hero Equipment"].weight = 0;
        }
        if (objHeroSkins().countHeroes() == 0) {
        	dictWeightsLegendary["Hero Skins"].weight = 0;
        }
        // Now make tables
        makeTable("Common",dictWeightsCommon);
        makeTable("Rare",dictWeightsRare);
        makeTable("Epic",dictWeightsEpic);
        makeTable("Legendary",dictWeightsLegendary);
    });
    $("table").on("click","tr.lootExpand",function(){
    	// Identify the id of the tr element calling this function
        var trId = $(this).attr("id");
        // Use this id to toggle all of the elements with the corresponding class
        $("tr." + trId + "Child").toggle();
    });
    $("table").on("click","tr#heroSkinParent",function(){
    	// Toggle all elements with id starting with heroRow
        // (The sub-rows have classes instead, so should not be affected)
    	$("tr[id^='heroSkinRow']").toggle();
        // Also hide sub-rows if they are exposed
        // To this end we use a Boolean to check if the main row is expanded
        if (skinsHeaderToggled) {
        	$("tr[class^='heroSkinRow']").hide();
        }
        skinsHeaderToggled = !skinsHeaderToggled;
    });
    $("span#chestLootTableInput").on("click","span#decoToggle",function(){
    	$("div#decoList").slideToggle("fast");
        if (decoToggled === false) {
        	$(this).text("Hide Decoration Checklist");
        } else {
        	$(this).text("Show Decoration Checklist");
       	}
        $(this).css("text-decoration-line","underline");
        decoToggled = !decoToggled; // Toggle this boolean
    });
    $("span#chestLootTableInput").on("click","button#decoEnableAll",function(){
    	$("div#decoList > .decoCheckBox").prop("checked",true);
    });
    $("span#chestLootTableInput").on("click","button#decoDisableAll",function(){
    	$("div#decoList > .decoCheckBox").prop("checked",false);
    });
    $("span#chestLootTableInput").on("click","span#houseToggle",function(){
    	$("div#houseList").slideToggle("fast");
        if (houseToggled === false) {
        	$(this).text("Hide House Part Checklist");
        } else {
        	$(this).text("Show House Part Checklist");
       	}
        $(this).css("text-decoration-line","underline");
        houseToggled = !houseToggled; // Toggle this boolean
    });
    $("span#chestLootTableInput").on("click","button#houseEnableAll",function(){
    	$("div#houseList > .houseCheckBox").prop("checked",true);
    });
    $("span#chestLootTableInput").on("click","button#houseDisableAll",function(){
    	$("div#houseList > .houseCheckBox").prop("checked",false);
    });
    $("span#chestLootTableInput").on("click","span#equipToggle",function(){
    	$("div#equipList").slideToggle("fast");
        if (equipToggled === false) {
        	$(this).text("Hide Hero Equipment Checklist");
        } else {
        	$(this).text("Show Hero Equipment Checklist");
       	}
        $(this).css("text-decoration-line","underline");
        equipToggled = !equipToggled; // Toggle this boolean
    });
    $("span#chestLootTableInput").on("click","button#equipEnableAll",function(){
    	$("div#equipList").find(".equipCheckBox").prop("checked",true);
    });
    $("span#chestLootTableInput").on("click","button#equipDisableAll",function(){
    	// We need to be careful not to uncheck any hidden boxes
        // Check the parent span element for its display
    	$("div#equipList").find(".equipCheckBox").each(function(){
        	if ($(this).parent().css("display") != "none") {
        		$(this).prop("checked",false);
            }
        });
    });
    $("span#chestLootTableInput").on("click","span#heroSkinToggle",function(){
    	$("div#heroSkinContainer").slideToggle("fast");
        if (heroSkinToggled === false) {
        	$(this).text("Hide Hero Skin Checklist");
        } else {
        	$(this).text("Show Hero Skin Checklist");
       	}
        $(this).css("text-decoration-line","underline");
        heroSkinToggled = !heroSkinToggled; // Toggle this boolean
    });
    $("span#chestLootTableInput").on("click","button#heroSkinEnableAll",function(){
    	$("div#heroSkinContainer").find(".heroSkinCheckBox").prop("checked",true);
    });
    $("span#chestLootTableInput").on("click","button#heroSkinDisableAll",function(){
    	// We need to be careful not to uncheck any hidden boxes
        // Check the parent span element for its display
    	$("div#heroSkinContainer").find(".heroSkinCheckBox").each(function(){
        	if ($(this).parent().css("display") != "none") {
            	$(this).prop("checked",false);
            }
        });
    });
    $("span#chestLootTableInput").on("click","button.enableSkins",function(){
    	// Get the corresponding name of hero that called this function
        var hero = $(this).attr("id").slice(-2);
        // Use this to search for the correct span element to work on
        $("div#heroSkinList" + hero).find(".heroSkinCheckBox").prop("checked",true);
    });
    $("span#chestLootTableInput").on("click","button.disableSkins",function(){
    	// Get the corresponding name of hero that called this function
        var hero = $(this).attr("id").slice(-2);
        // Use this to search for the correct span element to work on
        $("div#heroSkinList" + hero).find(".heroSkinCheckBox").prop("checked",false);
    });
    $("table").on("mouseover mouseout","tr.lootExpand, tr#heroSkinParent",function(){
      $(this).toggleClass("chestHover");
    });
});