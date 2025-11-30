/*
 * Everspace 2 – Equipment Scaling Script v2
 *
 * Derived from:
 *   EquipmentLevelScaling.js (Everspace Wiki)
 *   EnemyInfoboxSlider.js (Warframe Wiki)
 *
 * Includes updates, restructuring, and some retained original logic.
 */
$(function() {

  // For development script override
  if( window.disableEquipmentScaling ) return;

  // Find the equipment infoboxes on the page
  const infoboxes = $("aside.pi-theme-es2-equipment");

  // No equipment infoboxes, stop script
  if( !infoboxes.length )
    return;

  // Infobox themes
  const infoboxThemes = {
    'common' : 'pi-theme-common',
    'uncommon' : 'pi-theme-uncommon',
    'rare' : 'pi-theme-rare',
    'superior' : 'pi-theme-superior',
    'ascendant' : 'pi-theme-ascendant',
  };
  // Just the class values, used to remove classes inside setTheme()
  const themeValues = Object.values(infoboxThemes);

  // Iterate each equipment infobox instance
  $(infoboxes).each(function(i) {

    const infobox = $(this); // Current infobox instance

    // Check scaling section presence (scaling=true/yes has been set in the template call)
    const section = infobox.find('[data-item-name="equipment-scaling"]');
    if( !section.length )
      return true; // moves to the next each() iteration

    const sliderDiv  = section.find('[data-item-name="scaling-slider"] .pi-data-value');
    const rarityDiv  = section.find('[data-item-name="scaling-rarity"] .pi-data-value');
    const gradeDiv   = section.find('[data-item-name="scaling-grade"] .pi-data-value');
    const rankDiv    = section.find('[data-item-name="scaling-rank"] .pi-data-value');

    const scaler = {};

    // Set input names and increment per infobox
    scaler.elements = {
      rarityGroup: 'equipment-rarity-group-' + i,
      gradeGroup: 'equipment-grade-group-' + i,
      levelRange: 'equipment-level-slider-' + i,
      levelNumber: 'equipment-level-number-' + i,
      rankRange: 'equipment-rank-slider-' + i,
      rankNumber: 'equipment-rank-number-' + i
    };

    scaler.init = function () {

      // Element references
      this.level_el  = infobox.find('[data-source="level"] > .pi-data-value'); // Level box element (top-left)
      this.desc_el   = infobox.find('[data-source="desc"] > .pi-data-value');  // Desription text element (for: updatePlatings())
      this.name_el   = infobox.find('[data-source="name"] > .pi-data-value');  // Equipment name element

      // Equipment name
      this.equipname = this.name_el.text();

      // Equipment type (eg. Primary Weapon)
      this.equiptype = infobox.find('[data-source="type"] .equipment-type-icon').data('equipment-type');

      // Specific conditions
      this.isLegendary     = infobox.hasClass("pi-theme-legend");
      this.isPlating       = 'Plating' == this.equipname;
      this.isCruiseBooster = 'Cruise Booster' == this.equipname;

      // -- MAIN STATS --
      this.mainStatNames = infobox.find('[data-item-name="equipment-main-stats"] .pi-data > .pi-data-label')
        .map(function(i, el) {
       return $(el).text().trim();
      }).get();

      this.mainStatVals = infobox.find('[data-item-name="equipment-main-stats"] .pi-data > .pi-data-value');

      this.baseMStats = this.mainStatVals.map(function(i, el) {
        return parseFloat($(el).text().trim());
      }).get();

      // -- DETAILED STATS --
      // Collections of value and label elements
      const valueContainers = infobox.find('[data-item-name="detailed-stats"] .pi-data > .pi-data-value');
      const labelContainers = infobox.find('[data-item-name="detailed-stats"] .pi-data > .pi-data-label');

      // jQuery collection of value elements (for updating DOM)
      this.detailedStatVals = valueContainers;

      // Array of descriptive text strings (labels)
      this.detailedStatTexts = labelContainers.map(function(i, el) {
        return $(el).text().trim();
      }).get();

      // Base numeric values from value elements
      this.baseDStats = valueContainers.map(function(i, el) {
        return parseFloat($(el).text().trim());
      }).get();

      if( this.isCruiseBooster ) {
        // Cruise booster specific (not used anywhere else)
        this.passiveValDiv = infobox.find('[data-source="passivetext1"] > .pi-data-value > .passive-value')
        this.basePassiveVal = parseFloat(this.passiveValDiv.text());
      }

      // Credits value element
      this.sellDiv = infobox.find('[data-source="sellvalue"] > .pi-data-value > .equipment-value');
      if( this.sellDiv.length )
        this.baseSellValue = parseFloat(this.sellDiv.text());

      // Prep legendary trait data attributes
      if( this.isLegendary ) {
          // Set trait passive base values
          this.traits = infobox.find('[data-trait]');
          this.traits.each(function () {
              const el = $(this);
              const baseVal = parseFloat(el.text()) || 0;
              el.data('baseValue', baseVal);           // jQuery internal
              el.attr('data-base-value', baseVal);     // visible in HTML
          });
          // Set grade(trait) passive base values (normal vs radiant)
          this.gradeTraits = infobox.find('[data-grade]');
          this.gradeTraits.each(function () {
              const el = $(this);
              if (!el.data('normal')) {
                  el.data('normal', el.text());       // jQuery internal
                  el.attr('data-normal', el.text());  // visible in HTML
              }
          });
      }
      // Store indexes for referencing in the update function
      this.kDPSIdx = this.mainStatNames.indexOf("Kinetic DPS");
      this.eDPSIdx = this.mainStatNames.indexOf("Energy DPS");
      this.mainKDmgIdx = this.mainStatNames.indexOf("Kinetic Damage");
      this.mainEDmgIdx = this.mainStatNames.indexOf("Energy Damage");
      this.kDmgIdx = this.detailedStatTexts.indexOf("Kinetic Damage");
      this.eDmgIdx = this.detailedStatTexts.indexOf("Energy Damage");
      this.rateIdx = this.detailedStatTexts.indexOf("Fire Rate");
      this.eCapIdx = this.detailedStatTexts.indexOf("Energy Capacity");
      this.eConIdx = this.detailedStatTexts.indexOf("Energy Consumption");
      this.effRanIdx = this.detailedStatTexts.indexOf("Effect Range");
      this.effDurIdx = this.detailedStatTexts.indexOf("Effect Duration");
      this.dmgIncIdx = this.detailedStatTexts.indexOf("Damage Dealt");
      this.chargeDurIdx = this.detailedStatTexts.indexOf("Charge Duration");
      this.chargeDmgIdx = this.detailedStatTexts.indexOf("Charge Damage Increase");
      this.burstCountIdx = this.detailedStatTexts.indexOf("Burst Shots");
      this.burstDurIdx = this.detailedStatTexts.indexOf("Burst Duration");
      this.realLevel = 0;
    };

    // Updates equipment values, on first run and after an input value changes
    scaler.update = function () {

      // Get set values
      this.level  = +infobox.find("input[name='" + scaler.elements.levelRange + "']").val();
      this.rank   = +infobox.find("input[name='" + scaler.elements.rankRange + "']").val(); // + casts to number
      this.rarity = infobox.find("input[name='" + scaler.elements.rarityGroup + "']:checked").val();
      this.grade  = infobox.find("input[name='" + scaler.elements.gradeGroup + "']:checked").val();

      this.level_el.text( this.level ); // Update displayed level
      this.realLevel = this.level + this.getHiddenLevel( this.level, this.rarity );

      // Update dynamic legendary trait/grade values
      if( this.isLegendary ) {
        this.setGradePassives();
        this.setTraitPassives();
      }
      // Update infobox theme
      this.setTheme( this.rarity );

      // Update credit values
      if( this.sellDiv.length )
        this.setCreditValue( this.level, this.rarity );

      // Update equipment values
      switch( this.equiptype ) {
        case "Primary Weapon":
          // Damage modifiers
          let chargeDmgMod =
            this.chargeDmgIdx != -1
              ? this.baseDStats[this.chargeDmgIdx] / 100.0
              : 1.0;
          let burstDmgMod =
            this.burstCountIdx != -1
              ? this.baseDStats[this.burstCountIdx]
              : 1.0;

          // Duration modifiers
          let fireDur   = this.rateIdx != -1 ? 1 / this.baseDStats[this.rateIdx] : 1.0;
          let chargeDur = this.chargeDurIdx != -1 ? this.baseDStats[this.chargeDurIdx] : 0.0;
          let burstDur  = this.burstDurIdx != -1 ? this.baseDStats[this.burstDurIdx] : 0.0;

          if (this.kDPSIdx != -1) {
            let newKDmg = this.calc(this.baseDStats[this.kDmgIdx], 1.13);
            let newKDPS = (newKDmg * chargeDmgMod * burstDmgMod) / (fireDur + chargeDur + burstDur);

            this.mainStatVals.eq(this.kDPSIdx).text(Math.round(newKDPS));     //set kinetic DPS val
            this.detailedStatVals.eq(this.kDmgIdx).text(Math.round(newKDmg)); //set kinetic dmg val
          }
          if (this.eDPSIdx != -1) {
            let newEDmg = this.calc(this.baseDStats[this.eDmgIdx], 1.13);
            let newEDPS = (newEDmg * chargeDmgMod * burstDmgMod) / (fireDur + chargeDur + burstDur);

            this.mainStatVals.eq(this.eDPSIdx).text(Math.round(newEDPS));     //set energy DPS val
            this.detailedStatVals.eq(this.eDmgIdx).text(Math.round(newEDmg)); //set energy dmg val
          }
          this.detailedStatVals
            .eq(this.eCapIdx)
            // Format thousands values to match ingame display, eg. 12345 shown as 12.34k
            .text(this.numberFormat(Math.round(this.calc(this.baseDStats[this.eCapIdx], 1.16)))); //set energy capacity val

          this.detailedStatVals
            .eq(this.eConIdx)
            // Rounded value to match ingame display
            .text(Math.round(this.calc(this.baseDStats[this.eConIdx], 1.14)) + "/s");      //set energy consumption val
        break;

        case "Secondary Weapon":
          if (this.mainKDmgIdx != -1) {
            this.mainStatVals
              .eq(this.mainKDmgIdx)
              .text(Math.round(this.calc(this.baseMStats[this.mainKDmgIdx], 1.13)));
          }
          if (this.mainEDmgIdx != -1) {
            this.mainStatVals
              .eq(this.mainEDmgIdx)
              .text(Math.round(this.calc(this.baseMStats[this.mainEDmgIdx], 1.13)));
          }
          if (this.effRanIdx != -1) {
            this.detailedStatVals
              .eq(this.effRanIdx)
              .text(Math.round(this.calc(this.baseDStats[this.effRanIdx], 1.02)) +"m");
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
              .text(this.calc(this.baseDStats[this.effDurIdx], 1.02) + "s");
          }
          if (this.dmgIncIdx != -1) {
            this.detailedStatVals
              .eq(this.dmgIncIdx)
              .text("+" +Math.round(this.calc(this.baseDStats[this.dmgIncIdx], 1.02)) +"%");
          }
        break;

        case "Energy Core":
          this.mainStatVals
            .eq(0)
            .text(Math.round(this.calc(this.baseMStats[0], 1.18)) + "/s");
          this.mainStatVals
            .eq(1)
            .text(Math.round(this.calc(this.baseMStats[1], 1.18)) + "/s");
          this.mainStatVals
            .eq(2)
            .text(Math.round(this.calc(this.baseMStats[2], 1.18)) + "/s");
        break;

        case "Shield":
          this.mainStatVals
            .eq(0)
            .text(Math.round(this.calc(this.baseMStats[0], 1.16)));
          this.detailedStatVals
            .eq(0)
            .text(this.calc(this.baseDStats[0], 0.99) + "s");
          this.detailedStatVals
            .eq(1)
            .text(this.calc(this.baseDStats[1], 0.99) + "s");
        break;

        case "Plating":
          this.mainStatVals
            .eq(0)
            .text(Math.round(this.calc(this.baseMStats[0], 1.16)));
        break;

        case "Sensor":
          this.mainStatVals
            .eq(0)
            .text(this.calc(this.baseMStats[0], 1.012) + "km");
          this.mainStatVals
            .eq(1)
            .text(this.calc(this.baseMStats[1], 1.012) + "km");
          this.mainStatVals
            .eq(2)
            .text(this.calc(this.baseMStats[2], 1.015) + "km");
        break;

        case "Booster":
          this.mainStatVals
            .eq(0)
            .text(Math.round(this.calc(this.baseMStats[0], 1.01)) + "%");
          this.mainStatVals
            .eq(1)
            .text(Math.round(this.calc(this.baseMStats[1], 1.01)) + "%");
          this.detailedStatVals
            .eq(0)
            .text(Math.round(this.calc(this.baseDStats[0], 1.01)) + "%");
          this.detailedStatVals
            .eq(1)
            .text(Math.round(this.calc(this.baseDStats[1], 1.16)));
          this.detailedStatVals
            .eq(2)
            .text(this.calc(this.baseDStats[2], 1.14) + "/s");

          if( this.isCruiseBooster )
            this.passiveValDiv.text("+" + Math.round(this.calc(this.basePassiveVal, 1.01)) + "%");

        break;

        case "Cargo Unit":
          this.mainStatVals.eq(0).text("+" + Math.round(this.calc(this.baseMStats[0], 1.036)));
        break;

        default: break;
      }

    };

    // Converts larger numbers into shorthand, 20k, 10.5k, and so on.
    scaler.numberFormat = function(value) {
      // Explicit cast to number
      value = Number(value);

      if (Number.isNaN(value)) return '';

      if (value < 1000) {
        // Keep the raw integer for numbers < 1000
        return value.toString();
      }

      return new Intl.NumberFormat('en', {
        notation: 'compact',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(value).toLowerCase();
    }

    scaler.calc = function( baseValue, growthVal ) {
      // Exponential growth formula: newValue = base × (growth ^ (level - 1))
      // Example: level 5 → exponent = 4
      const newVal = baseValue * Math.pow( growthVal, this.realLevel - 1 );
      // Truncate to 2 decimals: multiply, floor, then divide
      return Math.floor( newVal * 100 ) / 100;
    };

    // Updates the infobox theme (if rarity has changed)
    scaler.setTheme = function( rarity ) {
      switch( rarity ) {
        case 'legendary': break; // No change needed on legendary items
        case 'common':
        case 'uncommon':
        case 'rare':
        case 'superior':
        case 'ascendant':
          // Only update if the infobox does not already have appropriate rarity class
          if( !infobox.hasClass( infoboxThemes[rarity] ) ) {
            infobox.removeClass(themeValues.join(' '));
            infobox.addClass(infoboxThemes[rarity]);
          }
        break;
      }
    };

    // Updates legendary trait values
    scaler.setTraitPassives = function() {
        this.traits.each(function () {
            const el = $(this);
            const baseVal = el.data('baseValue');
            el.text(Math.round(scaler.calc(baseVal, 1.13)));
        });
    };

    // Updates legendary grade based trait values (normal/radiant)
    scaler.setGradePassives = function() {
        if (!this._lastGrade) this._lastGrade = null;
        const isRadiant = this.grade === 'radiant';

        if (this._lastGrade !== this.grade) {
            this.gradeTraits.each(function () {
                const el = $(this);
                el.text(isRadiant ? el.data('radiant') : el.data('normal'));
            });
            this._lastGrade = this.grade;
        }
    };

    // Updates credit value based on rarity
    scaler.setCreditValue = function( level, rarity ) {
      let sellval = 0;
      switch( rarity ) {
          case 'common':
            sellval = this.baseSellValue * level;
          break;
          case 'uncommon':
            sellval = this.baseSellValue * level * 1.8;
          break;
          case 'rare':
            sellval = this.baseSellValue * level * 3;
          break;
          case 'superior':
            sellval = this.baseSellValue * level * 6;
          break;
          case 'ascendant':
            sellval = this.baseSellValue * level * 8;
          break;
          default:
            if( this.isLegendary )
              sellval = this.baseSellValue * level * 6
          break;
      }
      this.sellDiv.text(Math.round(sellval));
    };

    // Returns the hidden level value based on selected grade/rarity
    scaler.getHiddenLevel = function( level, rarity ) {

      let hiddenLevel = 0;
      // Special case for standard platings
      if( this.isPlating ) {
        this.updatePlatings(rarity);
        if( rarity == "ascendant" )
          hiddenLevel += (this.rank - 1) * 0.2;
      }
      else {
        switch( rarity ) {
          case "common":
          break;
          case "uncommon":
            hiddenLevel += 1.4;
          break;
          case "rare":
            hiddenLevel += 2.2;
          break;
          case "superior":
            hiddenLevel += 3.8;
          break;
          case "ascendant":
            hiddenLevel += 4.6 + ((this.rank - 1) * 0.2);
          break;
          default:
            if( this.isLegendary )
              hiddenLevel = 6;
          break;
        }
      }
      // Can return slightly early if ascendant
      if( rarity == 'ascendant' )
        return hiddenLevel;

      switch( this.grade ) {
        case "normal":
        break;
        case "prototype":
        case "radiant":
          hiddenLevel += 1;
        break;
        case "starforged":
          hiddenLevel += 2;
        break;
      }
      return hiddenLevel;
    };

    // Updates standard platings (specific case, called inside update())
    // Base main stat 1 (armor), Main stat 2 (repair per kill), name, and description
    scaler.updatePlatings = function( rarity ) {
      switch (rarity) {
        case "common":
          this.baseMStats[0] = 80;
          this.mainStatVals.eq(1).text("5%");
          this.name_el.text("Plating");
          this.desc_el.text("Basic metallic alloy for hardened bulkheads. Protects against energy damage.");
        break;
        case "uncommon":
          this.baseMStats[0] = 98.47;
          this.mainStatVals.eq(1).text("6%");
          this.name_el.text("Phase Plating");
          this.desc_el.text('Carbon "Phase" armor that blends into the hull. Protects against energy damage.');
          break;
        case "rare":
          this.baseMStats[0] = 110.9;
          this.mainStatVals.eq(1).text("7%");
          this.name_el.text("Meson Plating");
          this.desc_el.text('Mesh-on "Meson" tungsten tightly-bound fortication. Protects against energy damage.');
        break;
        case "superior":
          this.baseMStats[0] = 140.606;
          this.mainStatVals.eq(1).text("8%");
          this.name_el.text("Nano Plating");
          this.desc_el.text("Nano-bond technology for incredible structural durability. Protects against energy damage.");
        break;
        case "ascendant":
          this.baseMStats[0] = 158.33;
          this.mainStatVals.eq(1).text("8%");
          this.name_el.text("Nano Plating");
          this.desc_el.text("Nano-bond technology for incredible structural durability. Protects against energy damage.");
        break;
      }
    };

    scaler.addScalingElements = function() {
      sliderDiv.empty().append(
        $('<div>', { class: 'pi-scaling-group' } )
          .append($('<div>').text(1))
          .append(
            $('<input>', { class: 'level-input', type: 'range',min: 1,max: 30,value: 1, name: scaler.elements.levelRange, id: scaler.elements.levelRange })
          )
          .append($('<div>').text(30))
          .append(
            $('<input>', { class: 'level-input', type: 'number', min: 1, max: 30, value: 1, name: scaler.elements.levelNumber, id: scaler.elements.levelNumber })
          )
      );
      // Legendary items check
      if( !scaler.isLegendary ) {
        // Rarity selectors
        rarityDiv.empty().append(
          $('<div>', { class: 'pi-scaling-group' }).append(
            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-common-' + i, value: 'common', checked: true }),
            $('<label>', { for: 'rarity-common-' + i, class: 'color-common' }).text('Common'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-uncommon-' + i, value: 'uncommon' }),
            $('<label>', { for: 'rarity-uncommon-' + i, class: 'color-uncommon', title: '+1.4 item level' }).text('Uncommon'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-rare-' + i, value: 'rare' }),
            $('<label>', { for: 'rarity-rare-' + i, class: 'color-rare', title: '+2.2 item level' }).text('Rare'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-superior-' + i, value: 'superior' }),
            $('<label>', { for: 'rarity-superior-' + i, class: 'color-superior', title: '+3.8 item level' }).text('Superior'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-ascendant-' + i, value: 'ascendant' }),
            $('<label>', { for: 'rarity-ascendant-' + i, class: 'color-ascendant', title: '+4.6 item level\nadded with the Wraith of the Ancients DLC' }).text('Ascendant')
          )
        );

        // Grade
        gradeDiv.empty().append(
          $('<div>', { class: 'pi-scaling-group' }).append(
            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-normal-' + i, value: 'normal', checked: true }),
            $('<label>', { for: 'grade-normal-' + i, class: 'color-common' }).text('Normal'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-prototype-' + i, value: 'prototype' }),
            $('<label>', { for: 'grade-prototype-' + i, class: 'color-rare', title: '+1 item level' }).text('Prototype'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-starforged-' + i, value: 'starforged' }),
            $('<label>', { for: 'grade-starforged-' + i, class: 'color-superior', title: '+2 item level' }).text('Starforged')
          )
        );
        // Rank
        rankDiv.empty().append(
        $('<div>', { class: 'pi-scaling-group' } )
          .append($('<div>').text(1))
          .append(
            $('<input>', { type: 'range', class: 'rank-input', min: 1, max: 8, value: 1, name: scaler.elements.rankRange, id: scaler.elements.rankRange })
          )
          .append($('<div>').text(8))
          .append(
            $('<input>', { type: 'number', class: 'rank-input', min: 1, max: 30, value: 1, name: scaler.elements.rankNumber, id: scaler.elements.rankNumber })
          )
      );

      } else {
        // Legendary grade
        gradeDiv.empty().append(
          $('<div>', { class: 'pi-scaling-group' }).append(
            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-normal-' + i, value: 'normal', checked: true }),
            $('<label>', { for: 'grade-normal-' + i, class: 'color-legendary' }).text('Normal'),

            $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-radiant-' + i, value: 'radiant' }),
            $('<label>', { for: 'grade-radiant-' + i, class: 'color-legendary', title: '+1 item level' }).html('<b>Radiant</b>')
          )
        );
      }
    };

    // Bind range and number inputs together
    scaler.bindLinkedInputs = function( selector, minVal, maxVal ) {
      infobox.find(selector).on("input change", function () {
        const raw = Number($(this).val());
        const val = Math.min(maxVal, Math.max(minVal, raw));
        $(this).val(val);
        infobox.find(selector).not(this).val(val);
        scaler.update();
      });
    };

    scaler.init();               // Initialise and check for presence of template elements
    scaler.addScalingElements(); // Add the scaling elements

    // Add event handlers to inputs
    scaler.bindLinkedInputs(".level-input", 1, 30);
    scaler.bindLinkedInputs(".rank-input", 1, 8);
    infobox.find("input.scaling-radio").on("change", scaler.update.bind(scaler)); // Bind so 'this' correctly refers to the scaler object inside update()

    // First run, calculate and update values
    scaler.update();
  });
});
/*
 * END Equipment Scaling
 */