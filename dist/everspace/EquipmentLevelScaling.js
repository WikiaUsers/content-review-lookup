//Level scaling elements in Template:Equipment infobox2
//Based off of https://warframe.fandom.com/wiki/MediaWiki:EnemyInfoboxSlider.js
// Adjusted to work under ES5 on fandom
$(function(){
  var infobox = $("aside.portable-infobox");
  var slider = $("#equipment-slider");
  var rarityDiv = $("#equipment-rarity");
  var gradeDiv = $("#equipment-grade");
  var gradeLabel = $("[data-item-name='scaling-grade'] h3");

  if (slider.length) {
    //if there is an equipment infobox and it has the level scaling group enabled

    //create object from slider element
    slider.equipmentInfoboxScaler = {};
    var scaler = slider.equipmentInfoboxScaler;

    //find & store all stat elements into the scaler object
    scaler.init = function () {
      this.body = $(document.body); //for determining main type of equipment in update
      this.equipname = $("#equip-name").html();
      this.equiptype = $("#equip-subtype").html();
      //Use pre-set alt text of the equipment type icon in the infobox to get the type. This should be consistent for all infobox instances.
      this.altText = $(
        ".pi-item.pi-data[data-item-name='equiptype'] a img"
      ).attr("alt");

      this.level = $("#level"); //equipment level element, should be on default value (1)

      this.mainStatVals = $(infobox).find("[id^=mainstatval-]"); //array for main stat value elements
      this.mainStatNames = $(infobox).find(".es2-pi-mainstatname");
      //get text for each stat
      for (var i = 0; i < this.mainStatNames.length; i++) {
        this.mainStatNames[i] = this.mainStatNames.eq(i).html();
      }
      this.mainStatNames = Array.from(this.mainStatNames);

      //save base values, number only
      this.baseMStats = [];
      for (i = 0; i < this.mainStatVals.length; i++) {
        this.baseMStats.push(parseFloat(this.mainStatVals.eq(i).html(), 10));
      }

      this.detailedStatVals = $(infobox).find("[id^=statval-]"); //array for detailed stat value elements
      this.detailedStatTexts = $(infobox).find(".es2-pi-stattext");
      //get text for each stat
      for (i = 0; i < this.detailedStatTexts.length; i++) {
        this.detailedStatTexts[i] = this.detailedStatTexts.eq(i).html();
      }
      this.detailedStatTexts = Array.from(this.detailedStatTexts);

      //save base values, number only
      this.baseDStats = [];
      for (i = 0; i < this.detailedStatVals.length; i++) {
        this.baseDStats.push(
          parseFloat(this.detailedStatVals.eq(i).html(), 10)
        );
      }

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
      this.chargeDurIdx = this.detailedStatTexts.indexOf("Charge Duration"); //stats needed for weapons with a charge phase
      this.chargeDmgIdx = this.detailedStatTexts.indexOf("Charge Damage Increase"); //stats needed for weapons with a charge phase
      this.burstCountIdx = this.detailedStatTexts.indexOf("Burst Shots"); //stats needed for weapons with burst fire
      this.burstDurIdx = this.detailedStatTexts.indexOf("Burst Duration"); //stats needed for weapons with burst fire

      this.realLevel = 0;
    };

    //exponential growth calc
    //(base value) * (exponential base ^ change in level) = new value
    scaler.calc = function (baseValue, growthVal) {
      var newVal = baseValue * Math.pow(growthVal, this.realLevel - 1); //1 is the minimum level
      //truncate newVal to 2 decimal places
      return Math.floor(newVal * 100) / 100; //we are not dealing with any negative numbers so this is ok, but it may be slightly off on the second place.
    };

    //When slider is updated, use stat element arrays and base values to change innerHTML of stat elements based on unique scaling info	above
    scaler.update = function () {
      var currLevel = +$("#equip-level-slider").val();
      this.level.html(currLevel); //update displayed level
      this.realLevel = currLevel + this.getHiddenLevel(currLevel);

      switch (this.altText) {
        case "Primary Weapon":
          //damage modifiers
          var chargeDmgMod =
            this.chargeDmgIdx != -1
              ? this.baseDStats[this.chargeDmgIdx] / 100.0
              : 1.0;
          var burstDmgMod =
            this.burstCountIdx != -1
              ? this.baseDStats[this.burstCountIdx]
              : 1.0;

          //duration modifiers
          var fireDur =
            this.rateIdx != -1 ? 1 / this.baseDStats[this.rateIdx] : 1.0;
          var chargeDur =
            this.chargeDurIdx != -1 ? this.baseDStats[this.chargeDurIdx] : 0.0;
          var burstDur =
            this.burstDurIdx != -1 ? this.baseDStats[this.burstDurIdx] : 0.0;

          if (this.kDPSIdx != -1) {
            var newKDmg = this.calc(this.baseDStats[this.kDmgIdx], 1.13);
            var newKDPS =
              (newKDmg * chargeDmgMod * burstDmgMod) /
              (fireDur + chargeDur + burstDur);

            this.mainStatVals.eq(this.kDPSIdx).html(Math.round(newKDPS)); //set kinetic DPS val
            this.detailedStatVals.eq(this.kDmgIdx).html(Math.round(newKDmg)); //set kinetic dmg val
          }
          if (this.eDPSIdx != -1) {
            var newEDmg = this.calc(this.baseDStats[this.eDmgIdx], 1.13);
            var newEDPS =
              (newEDmg * chargeDmgMod * burstDmgMod) /
              (fireDur + chargeDur + burstDur);

            this.mainStatVals.eq(this.eDPSIdx).html(Math.round(newEDPS)); //set energy DPS val
            this.detailedStatVals.eq(this.eDmgIdx).html(Math.round(newEDmg)); //set energy dmg val
          }
          this.detailedStatVals
            .eq(this.eCapIdx)
            .html(Math.round(this.calc(this.baseDStats[this.eCapIdx], 1.16))); //set energy capacity val
          this.detailedStatVals
            .eq(this.eConIdx)
            .html(this.calc(this.baseDStats[this.eConIdx], 1.14) + "/s"); //set energy consumption val
          break;

        case "Secondary Weapon":
          if (this.mainKDmgIdx != -1) {
            this.mainStatVals
              .eq(this.mainKDmgIdx)
              .html(
                Math.round(this.calc(this.baseMStats[this.mainKDmgIdx], 1.13))
              );
          }
          if (this.mainEDmgIdx != -1) {
            this.mainStatVals
              .eq(this.mainEDmgIdx)
              .html(
                Math.round(this.calc(this.baseMStats[this.mainEDmgIdx], 1.13))
              );
          }
          if (this.effRanIdx != -1) {
            this.detailedStatVals
              .eq(this.effRanIdx)
              .html(
                Math.round(this.calc(this.baseDStats[this.effRanIdx], 1.02)) +
                  "m"
              );
          }
          if (
            this.effDurIdx != -1 &&
            this.equipname != "Corrosion Missiles" &&
            this.equipname != "Scorpion Missiles" &&
            this.equipname != "Corrosion Mines" &&
            this.equipname != "Bird's Nest"
          ) {
            this.detailedStatVals
              .eq(this.effDurIdx)
              .html(this.calc(this.baseDStats[this.effDurIdx], 1.02) + "s");
          }
          if (this.dmgIncIdx != -1) {
            this.detailedStatVals
              .eq(this.dmgIncIdx)
              .html(
                "+" +
                  Math.round(this.calc(this.baseDStats[this.dmgIncIdx], 1.02)) +
                  "%"
              );
          }
          break;

        case "Energy Core":
          this.mainStatVals
            .eq(0)
            .html(Math.round(this.calc(this.baseMStats[0], 1.18)) + "/s");
          this.mainStatVals
            .eq(1)
            .html(Math.round(this.calc(this.baseMStats[1], 1.18)) + "/s");
          this.mainStatVals
            .eq(2)
            .html(Math.round(this.calc(this.baseMStats[2], 1.18)) + "/s");
          break;

        case "Shield":
          this.mainStatVals
            .eq(0)
            .html(Math.round(this.calc(this.baseMStats[0], 1.16)));
          this.detailedStatVals
            .eq(0)
            .html(this.calc(this.baseDStats[0], 0.99) + "s");
          this.detailedStatVals
            .eq(1)
            .html(this.calc(this.baseDStats[1], 0.99) + "s");
          break;

        case "Plating":
          this.mainStatVals
            .eq(0)
            .html(Math.round(this.calc(this.baseMStats[0], 1.16)));
          break;

        case "Sensor":
          this.mainStatVals
            .eq(0)
            .html(this.calc(this.baseMStats[0], 1.012) + "km");
          this.mainStatVals
            .eq(1)
            .html(this.calc(this.baseMStats[1], 1.012) + "km");
          this.mainStatVals
            .eq(2)
            .html(this.calc(this.baseMStats[2], 1.015) + "km");
          break;

        case "Booster":
          this.mainStatVals
            .eq(0)
            .html(Math.round(this.calc(this.baseMStats[0], 1.01)) + "%");
          this.mainStatVals
            .eq(1)
            .html(Math.round(this.calc(this.baseMStats[1], 1.01)) + "%");
          this.detailedStatVals
            .eq(0)
            .html(Math.round(this.calc(this.baseDStats[0], 1.01)) + "%");
          this.detailedStatVals
            .eq(1)
            .html(Math.round(this.calc(this.baseDStats[1], 1.16)));
          this.detailedStatVals
            .eq(2)
            .html(this.calc(this.baseDStats[2], 1.14) + "/s");

          if (this.equipname == "Cruise Booster") {
            this.passiveValDiv.html(
              "+" + Math.round(this.calc(this.basePassiveVal, 1.01)) + "%"
            );
          }
          break;

        case "Cargo Unit":
          this.mainStatVals
            .eq(0)
            .html("+" + Math.round(this.calc(this.baseMStats[0], 1.036)));
          break;
      } //end of equipment type switch block

      if ($(infobox).hasClass("pi-theme-legend")) {
        if (this.traitDiv1.length) {
          //if there is a trait value
          this.traitDiv1.html(Math.round(this.calc(this.baseTraitVal_1, 1.13)));
        }
        if (this.traitDiv2.length) {
          //if there is a second trait value
          this.traitDiv2.html(Math.round(this.calc(this.baseTraitVal_2, 1.13)));
        }
      }
    };

    //Update the value of the slider with the entered value of the number input
    //limits the value to max >= value >= min.
    scaler.updateSliderFromInput = function(input, range, min, max) {
      var value = input.value

      //range and validity check
      if (isNaN(value)) {
        value = range.value;
        input.value = value;
      }
      else if (value < min) {
        value = min;
        input.value = value;
      }
      else if (value > max) {
        value = max;
        input.value = value;
      }
      //only allow integers
      if (!Number.isInteger(value)) {
        value = Math.round(value);
        input.value = value;
      }

      range.value = value;
      slider.equipmentInfoboxScaler.update();
      range.updateTrack();
    }

    // Returns hidden level value based on selected grade & rarity.
    // Also updates the color theme of the infobox, the sell value, and calls updatePlatings()
    scaler.getHiddenLevel = function (level) {
      var hiddenLevel = 0;

      if ($(infobox).hasClass("pi-theme-legend")) {
        hiddenLevel = 6; //legendaries have 6 more item levels than common
        this.sellDiv.html(Math.round(this.baseSellValue * level * 6)); //same scaling as superior
      }

      var rarity = $("input[name='rarityGroup']:checked").val();
      var grade = $("input[name='gradeGroup']:checked").val();
      var rank = +$("#equip-rank-slider").val();

      var lastClass = $(infobox).attr("class").split(" ").pop();

      //Update label for the grade/rank
      gradeLabel.html((rarity == "asc")? "<label for='asc'><span class='tooltip' title='+0.2 item level per rank'>Rank</span></label>" : "Grade");

      //remove current theme to reset to default white/gray theme
      if (lastClass != "pi-layout-default") {
        $(infobox).removeClass(lastClass);
      }

      //if this is the 'Platings' page, update plating type based on rarity
      if (this.body.hasClass("page-Platings")) {
        this.updatePlatings(rarity);
      }

      switch (rarity) {
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

        case "asc":
          hiddenLevel += 4.6 + ((rank - 1) * 0.2);
          this.sellDiv.html(Math.round(this.baseSellValue * level * 8));
          $(infobox).addClass("pi-theme-ascendant");
          break;
      }
      //platings page infobox should ignore hidden levels from rarity
      if (this.body.hasClass("page-Platings")) {
        hiddenLevel = 0;
        if (rarity == "asc") {
          hiddenLevel += ((rank - 1) * 0.2);
        }
      }
      
      if (rarity != "asc") {
        switch (grade) {
          case "normal":
            break;
          case "prototype":
            hiddenLevel += 1;
            break;
          case "starforged":
            hiddenLevel += 2;
            break;
          case "radiant":
            hiddenLevel += 1;
            break;
        }
      }
      return hiddenLevel;
    };

    //changing plating rarity changes base main stat 1 (armor), main stat 2 (repair per kill), name, and description
    scaler.updatePlatings = function (rarity) {
      switch (rarity) {
        case "com":
          this.baseMStats[0] = 80;
          this.mainStatVals.eq(1).html("5%");
          $("#equip-name").html("Plating");
          $("#equip-desc").html(
            "Basic metallic alloy for hardened bulkheads. Protects against energy damage."
          );
          break;

        case "unc":
          this.baseMStats[0] = 98.47;
          this.mainStatVals.eq(1).html("6%");
          $("#equip-name").html("Phase Plating");
          $("#equip-desc").html(
            'Carbon "Phase" armor that blends into the hull. Protects against energy damage.'
          );
          break;

        case "rare":
          this.baseMStats[0] = 110.9;
          this.mainStatVals.eq(1).html("7%");
          $("#equip-name").html("Meson Plating");
          $("#equip-desc").html(
            'Mesh-on "Meson" tungsten tightly-bound fortication. Protects against energy damage.'
          );
          break;

        case "sup":
          this.baseMStats[0] = 140.606;
          this.mainStatVals.eq(1).html("8%");
          $("#equip-name").html("Nano Plating");
          $("#equip-desc").html(
            "Nano-bond technology for incredible structural durability. Protects against energy damage."
          );
          break;
        case "asc":
          this.baseMStats[0] = 158.33;
          this.mainStatVals.eq(1).html("8%");
          $("#equip-name").html("Nano Plating");
          $("#equip-desc").html(
            "Nano-bond technology for incredible structural durability. Protects against energy damage."
          );
          break;
      }
    };

    scaler.init();

    //create input range element (slider) with display of min level (1) on the left and max level (30) on the right and
    //a input field showing the selected value.
    slider.html(
      "<div>1</div>" +
      "<div class='pi-slider pi-group pi-equip-slider' data-item-name='levelscaling'>" +
        "<input type='range' min='1' max='30' value='1' name ='equiplevelslider' id='equip-level-slider'/>" +
      "</div>" +
      "<div>30</div>" +
      "<div class='pi-group' data-item-name='levelscaling'>" +
        "<input type='number' min='1' max='30' value='1' id='equip-level-input'/>" +
      "</div>");

    //legendary items shouldn't get standard grade/rarity options
    if (!$(infobox).hasClass("pi-theme-legend")) {
      //rarity selectors
      rarityDiv.html(
        "<div class='pi-group' data-item-name='levelscaling'>" +
          "<input type='radio' name='rarityGroup' id='com' value='com' checked/>" +
          "<label for='com'>" +
            "<span class='text-com'>Common</span>" +
          "</label>" +
          "<input type='radio' class='text-unc' name='rarityGroup' id='unc' value='unc'/>" +
          "<label for='unc'>" +
            "<span class='text-unc tooltip' title='+1.4 item level'>Uncommon</span>" +
          "</label>" +
          "<input type='radio' class='text-rare' name='rarityGroup' id='rare' value='rare'/>" +
          "<label for='rare'>" +
            "<span class='text-rare tooltip' title='+2.2 item level'>Rare</span>" +
          "</label>" +
          "<input type='radio' class='text-sup' name='rarityGroup' id='sup' value='sup'/>" +
          "<label for='sup'>" +
            "<span class='text-sup tooltip' title='+3.8 item level'>Superior</span>" +
          "</label>" +
          "<input type='radio' class='text-asc' name='rarityGroup' id='asc' value='asc'/>" +
          "<label for='asc'>" +
            "<span class='text-asc tooltip' title='+4.6 item level\nadded with the Wraith of the Ancients DLC'>Ascendant</span>" +
          "</label>" +
        "</div>");
      //grade and rank selector
      gradeDiv.html(
        "<div class='pi-group' data-item-name='levelscaling' id='equip-grade-group'>" +
          "<input type='radio' name='gradeGroup' id='normal' value='normal' checked/>" +
          "<label for='normal'>Normal</label>" +
          "<input type='radio' class='text-rare' name='gradeGroup' id='prototype' value='prototype'/>" +
          "<label for='prototype' class='text-rare tooltip' title='+1 item level'>Prototype</label>" +
          "<input type='radio' class='text-sup' name='gradeGroup' id='starforged' value='starforged'/>" +
          "<label for='starforged' class='text-sup tooltip' title='+2 item level'>Starforged</label>" +
        "</div>" +
        "<div id='equipment-rank-group'>" +
          "<div>1</div>" +
          "<div class='pi-slider pi-group pi-equip-slider' data-item-name='levelscaling'>" +
            "<input type='range' min='1' max='8' value='1' name='equiprankslider' id='equip-rank-slider'>" +
          "</div>" +
          "<div>8</div>" +
          "<div class='pi-group' data-item-name='levelscaling'>" +
            "<input type='number' class='pi-range-number-input' min='1' max='30' value='1' id='equip-rank-input'/>" +
          "</div>" +
        "</div>");
    }
    else {
      //radiant grade for legendaries only
      gradeDiv.html(
        "<div class='pi-group' data-item-name='levelscaling'>" +
          "<input type='radio' name='gradeGroup' id='normal' value='normal' checked/>" +
          "<label for='normal'>Normal</label>" +
          "<input type='radio' name='gradeGroup' id='radiant' value='radiant'/>" +
          "<label for='radiant'" +
          "class='tooltip' title='+1 item level'><b>Radiant</b></label>" +
        "</div>");
    }

    $("#equip-level-slider").on("input", function () {
      document.getElementById("equip-level-input").value = document.getElementById("equip-level-slider").value
      slider.equipmentInfoboxScaler.update();
    });

    $("#equip-level-input").on("change", function () {
      var input = document.getElementById("equip-level-input");
      var range = document.getElementById("equip-level-slider");
      slider.equipmentInfoboxScaler.updateSliderFromInput(input, range, 1, 30);
      slider.equipmentInfoboxScaler.update();
    });

    $("input[type='radio']").change(function () {
      slider.equipmentInfoboxScaler.update();
    });

    $("#equip-rank-slider").on("input", function () {
      document.getElementById("equip-rank-input").value = document.getElementById("equip-rank-slider").value
      slider.equipmentInfoboxScaler.update();
    });

    $("#equip-rank-input").on("change", function () {
      var input = document.getElementById("equip-rank-input");
      var range = document.getElementById("equip-rank-slider");
      slider.equipmentInfoboxScaler.updateSliderFromInput(input, range, 1, 8);
      slider.equipmentInfoboxScaler.update();
    });

    document.querySelectorAll(".pi-equip-slider").forEach(function(ctrl) {
      var range = ctrl.querySelector('input');
      var newPoint, newPlace, offset;

      range.updateTrack = function(){
        // colorize track
        var valPercent = (range.valueAsNumber  - parseInt(range.min)) / (parseInt(range.max) - parseInt(range.min));
        var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop('+
          valPercent + ', #FFFA), color-stop(' +
          valPercent + ', #555));';
        range.style = style;
      }

      range.oninput = function(){
        range.updateTrack();
      };
      range.oninput();
    });

    scaler.update();
  }
});