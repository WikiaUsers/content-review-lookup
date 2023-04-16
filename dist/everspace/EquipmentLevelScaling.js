//Level scaling elements in Template:Equipment infobox2
//Based off of https://warframe.fandom.com/wiki/MediaWiki:EnemyInfoboxSlider.js
$(function(){
	var infobox = $("aside.portable-infobox");
	var slider = $("#equipment-slider");
	var rarityDiv = $("#equipment-rarity");
	var gradeDiv = $("#equipment-grade");

	if (slider !== null){ //if there is an equipment infobox and it has the level scaling group enabled

		//create object from slider element
		slider.equipmentInfoboxScaler = {};
		var scaler = slider.equipmentInfoboxScaler;

		//find & store all stat elements into the scaler object
		scaler.init = function() {
			this.body = $(document.body); //for determining main type of equipment in update
			this.equipname = $("#equip-name").html();
			this.equiptype = $("#equip-subtype").html();
			
			this.level = $("#level"); //equipment level element, should be on default value (1)
		  
			this.mainStatVals = $(infobox).find("[id^=mainstatval-]"); //array for main stat value elements
			this.mainStatNames = $(infobox).find(".es2-pi-mainstatname");
			//get text for each stat
			for (var i = 0; i < this.mainStatNames.length; i++) { this.mainStatNames[i] = this.mainStatNames.eq(i).html(); }  
			this.mainStatNames = Array.from(this.mainStatNames);
			
			//save base values, number only
			this.baseMStats = [];
			for (i = 0; i < this.mainStatVals.length; i++) { this.baseMStats.push(parseFloat(this.mainStatVals.eq(i).html(), 10)); }

			this.detailedStatVals = $(infobox).find("[id^=statval-]");  //array for detailed stat value elements
			this.detailedStatTexts = $(infobox).find(".es2-pi-stattext"); 
			//get text for each stat
			for (i = 0; i < this.detailedStatTexts.length; i++) { this.detailedStatTexts[i] = this.detailedStatTexts.eq(i).html(); }
			this.detailedStatTexts = Array.from(this.detailedStatTexts);

			//save base values, number only
			this.baseDStats = []; 
			for (i = 0; i < this.detailedStatVals.length; i++) { this.baseDStats.push(parseFloat(this.detailedStatVals.eq(i).html(), 10)); }
			
			this.passiveValDiv = $("#passive-val"); //currently only used for cruise boosters
			this.basePassiveVal = parseFloat(this.passiveValDiv.html(), 10);
		  
			this.sellDiv = $("#equip-sellvalue"); //credit sell value element
			this.baseSellValue = parseFloat(this.sellDiv.html(), 10);
			
			//legendaries
			this.traitDiv1 = $("#trait-val-1");
			this.baseTraitVal_1 = parseFloat(this.traitDiv1.html(), 10);
			
			this.traitDiv2 = $("#trait-val-2");
			this.baseTraitVal_2 = parseFloat(this.traitDiv2.html(), 10);
			
			//primary and secondary weapons are more complicated so need specific stat indexes
			//The infobox uses generic parameters to avoid being huge and remaking it & its css for this purpose didn't seem worth it
			this.kDPSIdx = this.mainStatNames.indexOf("Kinetic DPS");
			this.eDPSIdx = this.mainStatNames.indexOf("Energy DPS");
			this.mainKDmgIdx = this.mainStatNames.indexOf("Kinetic Damage"); //for secondary weapons
			this.mainEDmgIdx = this.mainStatNames.indexOf("Energy Damage"); //for secondary weapons
			this.kDmgIdx = this.detailedStatTexts.indexOf("Kinetic Damage");
			this.eDmgIdx = this.detailedStatTexts.indexOf("Energy Damage");
			this.rateIdx = this.detailedStatTexts.indexOf("Fire Rate"); //doesn't scale but needed to re-calc DPS
			this.eCapIdx = this.detailedStatTexts.indexOf("Energy Capacity");
			this.eConIdx = this.detailedStatTexts.indexOf("Energy Consumption");
			this.effRanIdx = this.detailedStatTexts.indexOf("Effect Range");
			this.effDurIdx = this.detailedStatTexts.indexOf("Effect Duration"); 
			this.dmgIncIdx = this.detailedStatTexts.indexOf("Damage Dealt");
			
			this.realLevel = 0;
		};

		//exponential growth calc
		//(base value) * (exponential base ^ change in level) = new value
		scaler.calc = function(baseValue, growthVal) {
			var newVal = baseValue * Math.pow(growthVal, this.realLevel - 1); //1 is the minimum level
			//truncate newVal to 2 decimal places
			return Math.floor(newVal * 100) / 100; //we are not dealing with any negative numbers so this is ok, but it may be slightly off on the second place.
		};
					
		//When slider is updated, use stat element arrays and base values to change innerHTML of stat elements based on unique scaling info	above
		scaler.update = function() {
			var currLevel = +$("#equip-level-slider").val();
			this.level.html(currLevel); //update displayed level

			this.realLevel = currLevel + this.getHiddenLevel(currLevel);
			
			//TODO when all equipment type icons are uploaded, change all .hasClass in this function to instead use equiptype
			//var altText = $(".pi-item.pi-data[data-item-name='equiptype'] a img").attr('alt');
			//the alt text is set in the template so it will be consistent as long as the icon is there & correct (equip type set correctly)
			//mainly, this will fix legendary items having their base values displayed instead of their level 1 values initially.
			if (this.body.hasClass("category-Primary_weapons_ES2")){
				if (this.kDPSIdx != -1){
					var newKDmg = this.calc(this.baseDStats[this.kDmgIdx], 1.13); 
					this.detailedStatVals.eq(this.kDmgIdx).html(Math.round(newKDmg)); //set kinetic dmg val
					
					var newKDPS;
					if (this.rateIdx != -1){
						newKDPS = newKDmg * this.baseDStats[this.rateIdx];
					} 
					else {
						//Exception for Beam Lasers which have no displayed fire rate stat.
						newKDPS = newKDmg; 
					}
					if (this.equiptype == "Scatter Gun" && this.equipname != "Repeater") {
						//9 = charge damage increase, 0.5 = charge time, (1 / fire rate) = refire time
						newKDPS = (newKDmg * 9) / (0.5 + 1 / this.baseDStats[this.rateIdx]);
					}
					if (this.equiptype == "Rail Gun") {
						//7.5 = charge damage increase, 1.8 = charge time, (1 / fire rate) = refire time
						newKDPS = (newKDmg * 7.5) / (1.8 + 1 / this.baseDStats[this.rateIdx]);
					}
					this.mainStatVals.eq(this.kDPSIdx).html(Math.round(newKDPS)); //set kinetic DPS val
				}
				if (this.eDPSIdx != -1){
					var newEDmg = this.calc(this.baseDStats[this.eDmgIdx],1.13); 
					this.detailedStatVals.eq(this.eDmgIdx).html( Math.round(newEDmg)); //set energy dmg val
					
					var newEDPS;
					if (this.rateIdx != -1){
						newEDPS = newEDmg * this.baseDStats[this.rateIdx];
					} 
					else {
						//Exception for Beam Lasers which have no displayed fire rate stat.
						newEDPS = newEDmg; 
					}
					if (this.equiptype == "Scatter Gun" && this.equipname != "Repeater") {
						//9 = charge damage increase, 0.5 = charge time, (1 / fire rate) = refire time
						newEDPS = (newEDmg * 9) / (0.5 + 1 / this.baseDStats[this.rateIdx]);
					}
					if (this.equiptype == "Rail Gun") {
						//7.5 = charge damage increase, 1.8 = charge time, (1 / fire rate) = refire time
						newEDPS = (newEDmg * 7.5) / (1.8 + 1 / this.baseDStats[this.rateIdx]);
					}
					this.mainStatVals.eq(this.eDPSIdx).html(Math.round(newEDPS)); //set energy DPS val					
				}	
				this.detailedStatVals.eq(this.eCapIdx).html(Math.round(this.calc(this.baseDStats[this.eCapIdx], 1.16))); //set energy capacity val
				this.detailedStatVals.eq(this.eConIdx).html(this.calc(this.baseDStats[this.eConIdx], 1.14) + "/s"); //set energy consumption val
			}
			
			else if (this.body.hasClass("category-Secondary_weapons_ES2")){
				if (this.mainKDmgIdx != -1){
					this.mainStatVals.eq(this.mainKDmgIdx).html(Math.round(this.calc(this.baseMStats[this.mainKDmgIdx], 1.13)));					
				}
				if (this.mainEDmgIdx != -1){
					this.mainStatVals.eq(this.mainEDmgIdx).html(Math.round(this.calc(this.baseMStats[this.mainEDmgIdx], 1.13)));					
				}
				if (this.effRanIdx != -1){
					this.detailedStatVals.eq(this.effRanIdx).html(Math.round(this.calc(this.baseDStats[this.effRanIdx], 1.02)) + "m");
				}
				if (this.effDurIdx != -1 && this.equipname != "Corrosion Missiles"  && this.equipname != "Scorpion Missiles" && this.equipname != "Corrosion Mines" && this.equipname != "Bird's Nest"){
					this.detailedStatVals.eq(this.effDurIdx).html(this.calc(this.baseDStats[this.effDurIdx], 1.02) + "s");
				}
				if (this.dmgIncIdx != -1){
					this.detailedStatVals.eq(this.dmgIncIdx).html("+" + Math.round(this.calc(this.baseDStats[this.dmgIncIdx], 1.02)) + "%");
				}
			}
			
			else if (this.body.hasClass("category-Energy_Cores_ES2")){
				this.mainStatVals.eq(0).html(Math.round(this.calc(this.baseMStats[0], 1.18)) + "/s");
				this.mainStatVals.eq(1).html(Math.round(this.calc(this.baseMStats[1], 1.18)) + "/s");
				this.mainStatVals.eq(2).html(Math.round(this.calc(this.baseMStats[2], 1.18)) + "/s");
			}
			
			else if (this.body.hasClass("category-Shields_ES2")){
				this.mainStatVals.eq(0).html(Math.round(this.calc(this.baseMStats[0], 1.16)));
				
				this.detailedStatVals.eq(0).html(this.calc(this.baseDStats[0], 0.99) + "s");
				this.detailedStatVals.eq(1).html(this.calc(this.baseDStats[1], 0.99) + "s");
			}
			
			else if (this.body.hasClass("category-Platings_ES2")){
				this.mainStatVals.eq(0).html(Math.round(this.calc(this.baseMStats[0], 1.16)));
			}
			
			else if (this.body.hasClass("category-Sensors_ES2")){
				this.mainStatVals.eq(0).html(this.calc(this.baseMStats[0], 1.012) + "km");
				this.mainStatVals.eq(1).html(this.calc(this.baseMStats[1], 1.012) + "km");
				this.mainStatVals.eq(2).html(this.calc(this.baseMStats[2], 1.015) + "km");
			}
			
			else if (this.body.hasClass("category-Boosters_ES2")){
				this.mainStatVals.eq(0).html(Math.round(this.calc(this.baseMStats[0], 1.01)) + "%");
				this.mainStatVals.eq(1).html(Math.round(this.calc(this.baseMStats[1], 1.01)) + "%");
				
				this.detailedStatVals.eq(0).html(Math.round(this.calc(this.baseDStats[0], 1.01)) + "%");
				this.detailedStatVals.eq(1).html(Math.round(this.calc(this.baseDStats[1], 1.16)));
				this.detailedStatVals.eq(2).html(this.calc(this.baseDStats[2], 1.14) + "/s");
				
				if (this.equipname == "Cruise Booster"){
					this.passiveValDiv.html("+" + Math.round(this.calc(this.basePassiveVal, 1.01)) + "%");
				}
			}
			
			else if (this.body.hasClass("category-Cargo_Units_ES2")){
				this.mainStatVals.eq(0).html("+" + Math.round(this.calc(this.baseMStats[0], 1.036)));
				
				this.detailedStatVals.eq(0).html("+" + this.calc(this.baseDStats[0], 1.05) + "%");
			}
			
			if ($(infobox).hasClass("pi-theme-legend")) {
				if(this.traitDiv1.length){ //if there is a trait value
					this.traitDiv1.html(this.calc(this.baseTraitVal_1, 1.16));
				}
				if(this.traitDiv1.length){ //if there is a second trait value
					this.traitDiv2.html(this.calc(this.baseTraitVal_2, 1.16));
				}
			}
		};
		
		// Returns hidden level value based on selected grade & rarity.
		// Also updates the color theme of the infobox, the sell value, and calls updatePlatings()
		scaler.getHiddenLevel = function(level){		
			if ($(infobox).hasClass("pi-theme-legend")) {
				return 7; //legendaries have 7 more item levels than common & cannot have grades
			}
			
			var hiddenLevel = 0;
			var rarity = $("input[name='rarityGroup']:checked").val();
			var grade = $("input[name='gradeGroup']:checked").val();
			
			var lastClass = $(infobox).attr('class').split(' ').pop();
			
			//remove current theme to reset to default white/gray theme
			if (lastClass != "pi-layout-default") { $(infobox).removeClass(lastClass); }
			
			//if this is the 'Platings' page, update plating type based on rarity
			if (this.body.hasClass("page-Platings")) { this.updatePlatings(rarity); }
			
			switch (rarity){				
				case "com":
					this.sellDiv.html(Math.round(this.baseSellValue * level));
					break;
				
				case "unc":
					hiddenLevel += 1.4;
					this.sellDiv.html(Math.round(this.baseSellValue * level * 1.8));
					$(infobox).addClass("pi-theme-uncommon");
					break;
					
				case "rare":
					hiddenLevel += 2.2;
					this.sellDiv.html(Math.round(this.baseSellValue * level * 3));
					$(infobox).addClass("pi-theme-rare");
					break;
					
				case "sup":
					hiddenLevel += 3.8;
					this.sellDiv.html(Math.round(this.baseSellValue * level * 6));
					$(infobox).addClass("pi-theme-superior");
					break;
			}
			//platings page infobox should ignore hidden levels from rarity
			if (this.body.hasClass("page-Platings")) { hiddenLevel = 0; }
			switch (grade){
				
				case "normal":
					break;
					
				case "prototype":
					hiddenLevel += 1;
					break;
					
				case "starforged":
					hiddenLevel += 2;
					break;
			}
			return hiddenLevel;
		};
		
		//changing plating rarity changes base main stat 1 (armor), main stat 2 (repair per kill), name, and description
		scaler.updatePlatings = function(rarity){
			
			switch (rarity){				
				case "com":
					this.baseMStats[0] = 80;
					this.mainStatVals.eq(1).html("5%");
					$("#equip-name").html("Plating");
					$("#equip-desc").html("Basic metallic alloy for hardened bulkheads. Protects against energy damage.");	
					break;
				
				case "unc":
					this.baseMStats[0] = 98;
					this.mainStatVals.eq(1).html("6%");
					$("#equip-name").html("Phase Plating");
					$("#equip-desc").html('Carbon "Phase" armor that blends into the hull. Protects against energy damage.');	
					break;
					
				case "rare":
					this.baseMStats[0] = 111;
					this.mainStatVals.eq(1).html("7%");
					$("#equip-name").html("Meson Plating");
					$("#equip-desc").html('Mesh-on "Meson" tungsten tightly-bound fortication. Protects against energy damage.');	
					break;
					
				case "sup":
					this.baseMStats[0] = 141;
					this.mainStatVals.eq(1).html("8%");
					$("#equip-name").html("Nano Plating");
					$("#equip-desc").html("Nano-bond technology for incredible structural durability. Protects against energy damage.");	
					break;
			}
		};
		
		scaler.init();

		//create input range element (slider) with display of min level (1) on the left and max level (30) on the right
		slider.html("<div>1</div><div><input type='range' min='1' max='30' value='1' name ='equiplevelslider' id='equip-level-slider' /></div><div>30</div>");
		
		if (!$(infobox).hasClass("pi-theme-legend")){ //legendary items shouldn't get grade/rarity options
			rarityDiv.html("<div><input type='radio' name='rarityGroup' id='com' value='com' checked/><label for='com'><span class='text-com'>Common</span></label><input type='radio' name='rarityGroup' id='unc' value='unc'/><label for='unc'><span class='text-unc tooltip' title='+1.4 item level'>Uncommon</span></label><input type='radio' name='rarityGroup' id='rare' value='rare'/><label for='rare'><span class='text-rare tooltip' title='+2.2 item level'>Rare</span></label><input type='radio' name='rarityGroup' id='sup' value='sup'/><label for='sup'><span class='text-sup tooltip' title='+3.8 item level'>Superior</span></label></div>");
			
			gradeDiv.html("<div><input type='radio' name='gradeGroup' id='normal' value='normal' checked/><label for='normal'>Normal</label><input type='radio' name='gradeGroup' id='prototype' value='prototype'/><label for='prototype' class='text-rare tooltip' title='+1 item level'>Prototype</label><input type='radio' name='gradeGroup' id='starforged' value='starforged'/><label for='starforged' class='text-sup tooltip' title='+2 item level'>Starforged</label></div>");	
		}
		
		$("#equip-level-slider").on('input', function (){
			//TODO update text input box also if it's added
			slider.equipmentInfoboxScaler.update();
		});
		
		$("input[type='radio']").change( function (){
			slider.equipmentInfoboxScaler.update();
		});
	
		scaler.update();
	}
});