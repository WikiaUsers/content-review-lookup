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

    // For dev testing and double run prevention
    window.everspacewiki = window.everspacewiki || {};
    if( window.everspacewiki.equipmentScaling && window.everspacewiki.equipmentScaling.hasRun ) return;
    window.everspacewiki.equipmentScaling = { hasRun: true };

    // Find the equipment infoboxes on the page
    const infoboxes = $("aside.pi-theme-es2-equipment");

    // No equipment infoboxes, stop script
    if( !infoboxes.length )
      return;

    // Infobox themes
    const infoboxThemes = {
      'common'   :'pi-theme-common',
      'uncommon' :'pi-theme-uncommon',
      'rare'     :'pi-theme-rare',
      'superior' :'pi-theme-superior',
      'ascendant':'pi-theme-ascendant',
    };
    // Just the class values, used to remove classes inside setTheme()
    const themeValues = Object.values(infoboxThemes);

    const STORAGE_KEY = 'everspacewiki-scalingSettings';

    function loadSettings() {
      const settings = { level: 1, rank: 1, rarity: 'common', gradeStandard: 'normal', gradeLegendary: 'normal' };
      try {
        const raw = mw.storage.get(STORAGE_KEY);
        if( raw ) {
          Object.assign(settings, JSON.parse(raw));
        }
      } catch (e) {
        console.error( 'Failed to Equipment Scaling settings, using defaults:', e );
        return settings; // return early if storage access or parsing fails
      }
      // Validate retrieved values
      settings.level = Math.min(Math.max(1, settings.level), 30);
      settings.rank  = Math.min(Math.max(1, settings.rank), 8);

      if (!['common','uncommon','rare','superior','ascendant'].includes(settings.rarity))
        settings.rarity = 'common';
      if (!['normal','prototype','starforged'].includes(settings.gradeStandard))
        settings.gradeStandard = 'normal';
      if (!['normal','radiant'].includes(settings.gradeLegendary))
        settings.gradeLegendary = 'normal';

      return settings;
    }
    function saveSettings(settings) {
      mw.storage.set(STORAGE_KEY,JSON.stringify(settings));
    }
    function updateSettings(updates) {
      const settings = loadSettings();
      Object.assign(settings, updates);
      saveSettings(settings);
    }
    const scalingSetting = loadSettings();

    // Stat growth factors and formatting settings
    const growthFactors = {
      'Armor': { value: 1.16, format: 'roundCompact', fractions: 2 },
      'Capacity': { value: 1.16, format: 'roundCompact', fractions: 2 },
      'Energy Capacity': { value: 1.16, format: 'roundCompact', fractions: 2 },
      'Energy Consumption': { value: 1.14, format: 'round', suffix: '/s' },
      'Kinetic Damage': { value: 1.13, format: 'round' },
      'Energy Damage': { value: 1.13, format: 'round' },
      'Effect Range': { value: 1.02, format: 'round', suffix: 'm' },
      'Effect Duration': { value: 1.02, format: 'raw',  suffix: 's' },
      'Damage Dealt': { value: 1.02, format: 'round', suffix: '%', prefix: '+' },
      'Kinetic DPS' : { value: 1.13, format: 'raw' },
      'Energy DPS' : { value: 1.13, format: 'raw' },
      'Recharge Delay': { value: 0.99, format: 'raw', suffix: 's' },
      'Shutdown Duration': { value: 0.99, format: 'raw', suffix: 's' },
      'Ships Range': { value: 1.012, format: 'raw', suffix: 'km' },
      'Loot Range': { value: 1.012, format: 'raw', suffix: 'km' },
      'Resources Range': { value: 1.015, format: 'raw', suffix: 'km' },
      'Speed Gain': { value: 1.01, format: 'round', suffix: '%' },
      'Recharge Speed': { value: 1.01, format: 'round', suffix: '%' },
      'Acceleration': { value: 1.01, format: 'round', suffix: '%' },
      'Cruise': { value: 1.01, format: 'round', suffix: '%', prefix: '+' },
      'Cargo Slots': { value: 1.036, format: 'round', prefix: '+' },
      'Output: Weapons': { value: 1.18, format: 'round', suffix: '/s' },
      'Output: Boost': { value: 1.18, format: 'round', suffix: '/s' },
      'Output: Shield': { value: 1.18, format: 'round', suffix: '/s' },
      'default' : { value: 1, format: 'raw', prefix: '', suffix: '', fractions: 2, decimals: 2 }
    };

    // Iterate each equipment infobox instance
    $(infoboxes).each(function(i) {

      const infobox = $(this); // Current infobox instance

      // Check scaling section presence (scaling=true/yes has been set in the template call)
      const section = infobox.find('[data-item-name="equipment-scaling"]');

      if( !section.length )
        return true; // moves to the next each() iteration

      const sliderDiv = section.find('[data-item-name="scaling-slider"] > .pi-data-value');
      const rarityDiv = section.find('[data-item-name="scaling-rarity"] > .pi-data-value');
      const gradeDiv  = section.find('[data-item-name="scaling-grade"] > .pi-data-value');
      const rankDiv   = section.find('[data-item-name="scaling-rank"] > .pi-data-value');
      const headerDiv = section.find('> .pi-header');

      infobox.append( $('<section>', { class: 'pi-item pi-group pi-border-color', "data-item-name": 'equipment-info-message' } ) );
      const saveNotice = infobox.find('section[data-item-name="equipment-info-message"]').hide().text('Settings Updated!');

      const scaler = { levelExponent: 0, indexes: {} };

      // Set input names and increment per infobox
      scaler.elements = {
        rarityGroup: 'equipment-rarity-group-' + i,
        gradeGroup: 'equipment-grade-group-' + i,
        levelRange: 'equipment-level-slider-' + i,
        levelNumber: 'equipment-level-number-' + i,
        rankRange: 'equipment-rank-slider-' + i,
        rankNumber: 'equipment-rank-number-' + i,
        button: 'equipment-save-button-' + i
      };

      scaler.init = function () {

        // Element references
        this.level_el  = infobox.find('[data-source="level"] > .pi-data-value'); // Level box element (top-left)
        this.desc_el   = infobox.find('[data-source="desc"] > .pi-data-value');  // Desription text element (for: updatePlatings())
        this.name_el   = infobox.find('[data-source="name"] > .pi-data-value');  // Equipment name element

        // Equipment name
        this.equipname = this.name_el.text();

        // Equipment type (eg. Primary Weapon)
        this.equiptype = infobox.find('[data-item-name="equipment-types"] > .pi-data-value > .equipment-type-icon').data('equipment-type');

        // Specific conditions
        this.isLegendary     = infobox.hasClass("pi-theme-legend");
        this.isPlating       = 'Plating'        == this.equipname;
        this.isCruiseBooster = 'Cruise Booster' == this.equipname;

        // Conditionals for secondaries that do not scale specific effect stats
        this.skipEffectDuration = ["Corrosion Missiles", "Scorpion Missiles", "Corrosion Mines", "Bird's Nest"].includes(this.equipname);
        this.skipEffectRange    = ['Figure of Eight'].includes(this.equipname);

        // Main stat labels + base values
        this.mainStatLabels = [];
        this.baseMStats     = [];

        infobox.find('[data-item-name="equipment-main-stats"] .pi-data').each(function(i) {
          const labelEl = $(this).find('.pi-data-label');
          const valueEl = $(this).find('.pi-data-value');

          const labelText = labelEl.text().trim();
          let value = parseFloat(valueEl.text().trim());

          if (Number.isNaN(value)) value = 0;

          switch(labelText) {
            case 'Armor': scaler.indexes.armor = i; break;
            case 'Repair per kill': scaler.indexes.repair = i; break;
          }
          scaler.mainStatLabels.push(labelText);
          scaler.baseMStats.push(value);
        });

        // Detailed stat labels + base values
        this.detailedStatLabels = [];
        this.baseDStats         = [];

        infobox.find('[data-item-name="detailed-stats"] .pi-data').each(function (i) {
          const labelEl = $(this).find('.pi-data-label');
          const valueEl = $(this).find('.pi-data-value');

          const labelText = labelEl.text().trim();
          let value = parseFloat(valueEl.text().trim());

          if (Number.isNaN(value)) value = 0;

          switch(labelText) {
            case 'Kinetic Damage': scaler.indexes.kdmg = i; break;
            case 'Energy Damage': scaler.indexes.edmg = i; break;
          }
          scaler.detailedStatLabels.push(labelText);
          scaler.baseDStats.push(value);
        });
        //console.log(this.indexes);
        // Element references
        this.mainStatVals     = infobox.find('[data-item-name="equipment-main-stats"] .pi-data > .pi-data-value');
        this.detailedStatVals = infobox.find('[data-item-name="detailed-stats"] .pi-data > .pi-data-value');

        // Credits value element
        this.sellDiv = infobox.find('[data-source="sellvalue"] > .pi-data-value > .equipment-value');
        if( this.sellDiv.length )
          this.baseSellValue = parseFloat(this.sellDiv.text());

        if( this.isCruiseBooster ) {
          // Cruise booster specific (not used anywhere else)
          this.passiveValDiv  = infobox.find('[data-source="passivetext1"] > .pi-data-value > .passive-value');
          this.basePassiveVal = parseFloat(this.passiveValDiv.text() || 0);
        }

        // Prep legendary trait data attributes
        if( this.isLegendary ) {

          this.traits      = infobox.find('[data-source="trait"] > .pi-data-value [data-trait]');
          this.gradeTraits = infobox.find('[data-source="trait"] > .pi-data-value [data-radiant]');

          this.traits.each( function(i) {
            const el = $(this);
            const baseVal = parseFloat(el.text()) || 0;
            el.attr('data-trait', i);
            el.data('trait-base', baseVal);      // jQuery internal
            el.attr('data-trait-base', baseVal); // visible in HTML
          });
          this.gradeTraits.each( function() {
            const el = $(this);
            if( !el.data('normal') ) {
              el.data('normal', el.text());      // jQuery internal
              el.attr('data-normal', el.text()); // visible in HTML
            }
          });
        }

      };
      let weapon = {
        chargeDamage: 1.0,
        burstShots: 1.0,
        fireDuration: 1.0,
        chargeDuration: 0.0,
        burstDuration: 0.0,
      };
      // Updates equipment values, on first run and after an input value changes
      scaler.update = function () {

        // Get currently set values
        this.level  = this.levelRange ? +this.levelRange.val() : 1;
        this.rank   = this.rankRange ? +this.rankRange.val() : 1;
        this.rarity = this.isLegendary ? 'legendary' : this.rarityInputs.filter(":checked").val();
        this.grade  = this.gradeInputs ? this.gradeInputs.filter(":checked").val() : 'normal';

        this.level_el.text( this.level ); // Update displayed level
        this.levelExponent = ( this.level - 1 ) + this.getHiddenLevel( this.rarity, this.grade );

        // Update dynamic legendary trait/grade values
        if( this.isLegendary ) {
          this.setTraitPassives();
          this.setGradePassives();
        }
        // Update infobox theme
        this.setTheme( this.rarity );

        // Update credit values
        if( this.sellDiv.length )
          this.setCreditValue( this.level, this.rarity );

        // Update equipment values
        switch( this.equiptype ) {
          case "Primary Weapon":
            this.detailedStatVals.each( function(i) {
              const statType  = scaler.detailedStatLabels[i];
              const statValue = scaler.baseDStats[i];
              switch(statType) {
                  case 'Charge Damage Increase':
                    weapon.chargeDamage = statValue / 100;
                  break;
                  case 'Burst Shots':
                    weapon.burstShots = statValue;
                  break;
                  case 'Fire Rate':
                    weapon.fireDuration = 1 / statValue;
                  break;
                  case 'Charge Duration':
                    weapon.chargeDuration = statValue;
                  break;
                  case 'Burst Duration':
                    weapon.burstDuration = statValue;
                  break;
                  case 'Energy Capacity':
                    $(this).text(scaler.scaleValue(statValue, statType));
                  break;
                  case 'Energy Consumption':
                    $(this).text(scaler.scaleValue(statValue, statType));
                  break;
              }
            });
            this.mainStatVals.each( function(i) {
              const statType  = scaler.mainStatLabels[i];
              let statValue;
              let detail = null;
              switch(statType) {
                case 'Kinetic DPS':
                  statValue = scaler.baseDStats[scaler.getIndex('kdmg')] || false;
                  if( !statValue ) break;
                  detail = scaler.detailedStatVals.eq(scaler.getIndex('kdmg'));
                  let kineticDamage = scaler.scaleValue( statValue, statType);
                  let kineticDPS    = scaler.calcDPS( kineticDamage );
                  $(this).text( Math.round( kineticDPS ) );
                  detail.text( Math.round( kineticDamage ) );
                break;
                case 'Energy DPS':
                  statValue = scaler.baseDStats[scaler.getIndex('edmg')] || false;
                  if( !statValue ) break;
                  detail = scaler.detailedStatVals.eq(scaler.getIndex('edmg'));
                  let energyDamage = scaler.scaleValue( statValue, statType);
                  let energyDPS    = scaler.calcDPS( energyDamage );
                  $(this).text( Math.round( energyDPS ) );
                  detail.text( Math.round( energyDamage ) );
                break;
              }

            });

          break;

          case "Secondary Weapon":

            this.mainStatVals.each( function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                case 'Kinetic Damage':
                case 'Energy Damage':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

            this.detailedStatVals.each(function(i) {
              const statType  = scaler.detailedStatLabels[i];
              const statValue = scaler.baseDStats[i];
              switch(statType) {
                case 'Effect Range':
                  if( !scaler.skipEffectRange )
                    $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
                case 'Effect Duration':
                  if( !scaler.skipEffectDuration )
                    $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
                case 'Damage Dealt':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }

            });
          break;

          case "Energy Core":

            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                default:
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

          break;

          case "Shield":

            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                case 'Capacity':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });
            this.detailedStatVals.each(function(i) {
              const statType  = scaler.detailedStatLabels[i];
              const statValue = scaler.baseDStats[i];
              switch(statType) {
                case 'Recharge Delay':
                case 'Shutdown Duration':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

          break;

          case "Plating":
            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                case 'Armor':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

          break;

          case "Sensor":
            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                case 'Ships Range':
                case 'Loot Range':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
                case 'Resources Range':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

          break;

          case "Booster":

            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                default:
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });

            this.detailedStatVals.each(function(i) {
              const statType = scaler.detailedStatLabels[i];
              const statValue = scaler.baseDStats[i];
              switch(statType) {
                case 'Acceleration':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
                case 'Energy Capacity':
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
                case 'Energy Consumption':
                  $(this).text( scaler.scaleValue( statValue, statType, 'raw' ) );
                break;
              }
            });
            if( this.isCruiseBooster ) {
              this.passiveValDiv.text( scaler.scaleValue( this.basePassiveVal, 'Cruise' ) );
            }
          break;

          case "Cargo Unit":
            this.mainStatVals.each(function(i) {
              const statType  = scaler.mainStatLabels[i];
              const statValue = scaler.baseMStats[i];
              switch(statType) {
                default:
                  $(this).text( scaler.scaleValue( statValue, statType ) );
                break;
              }
            });
          break;

          default: break;
        }
      };

      scaler.getIndex = function( key ) { return scaler.indexes[key]; };

      scaler.scaleTrait = function( value, growth ) {
        const newVal = value * Math.pow( growth, scaler.levelExponent );
        return Math.round( Math.floor( newVal * 100 ) / 100 );
      };

      scaler.scaleValue = function( value = 0, type = 'default', format = null ) {
        if( !growthFactors[type] ) console.error( 'Missing growth factor for type, using default');
        const growthFactor = growthFactors[type] || growthFactors['default'];
        const prefix       = growthFactor.prefix || growthFactors['default'].prefix;
        const suffix       = growthFactor.suffix || growthFactors['default'].suffix;
        const typeformat   = format || growthFactor.format;

        let newVal = value * Math.pow( growthFactor.value, scaler.levelExponent );
        newVal = Math.floor( newVal * 100 ) / 100;

        switch( typeformat ) {
          case 'raw':
          break;
          case 'round':
            newVal = Math.round(newVal);
          break;
          case 'roundCompact': {
            if (newVal < 10000) {
              newVal = Math.round(newVal);
            } else {
              const maxFractions =
                typeof growthFactor.fractions === 'number'
                  ? growthFactor.fractions
                  : growthFactors.default.fractions;

              newVal = new Intl.NumberFormat('en', {
                notation: 'compact',
                minimumFractionDigits: 0,
                maximumFractionDigits: maxFractions
              }).format(Math.round(newVal));
            }
          }
          break;
          case 'roundTo': {
            const decimals =
              typeof growthFactor.decimals === 'number'
                ? growthFactor.decimals
                : growthFactors.default.decimals;

            const factor = Math.pow(10, decimals);
            newVal = Math.round(newVal * factor) / factor;
          }
          break;
        }
        return [prefix,newVal,suffix].join('');
      };

      scaler.calcDPS = function(n) {
        return ( n * weapon.chargeDamage * weapon.burstShots ) / ( weapon.fireDuration + weapon.chargeDuration + weapon.burstDuration );
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
            if( infobox.hasClass( infoboxThemes[rarity] ) )
               break;
            // Only update if the infobox does not already have appropriate rarity class
            infobox.removeClass(themeValues.join(' '));
            infobox.addClass(infoboxThemes[rarity]);
          break;
        }
      };

      // Updates legendary trait values
      scaler.setTraitPassives = function() {
        // Switch growth value depending on data-type
        // <span data-trait> vs <span data-trait data-type="type">
        const growthMap = {
            drain: 1.16,  // Drain rate (nexus heart)
            default: 1.13 // Default, the growth value for Energy/Kinetic damage
        };
        const isRadiant = 'radiant' === this.grade;

        this.traits.each(function () {
          const el = $(this);
          const type   = el.data('type') || 'default';
          const growth = growthMap[type];
          const multi  = isRadiant && 'default' == type ? 2 : 1; // We'll just show max, even though values are rolled
          const base   = el.data('trait-base') * multi;
          el.attr( 'title', 'Radiant values are rolled and can vary from +25% to +100% over standard' );
          el.text( scaler.scaleTrait( base, growth ) );
        });
      };

      // Updates legendary grade based trait values (normal/radiant)
      scaler.setGradePassives = function() {

        if( !this._lastGrade )
            this._lastGrade = null;

        if( this._lastGrade === this.grade )
          return;

        const isRadiant = 'radiant' === this.grade;

        this.gradeTraits.each(function() {
          const el = $(this);
          el.text( isRadiant ? el.data('radiant') : el.data('normal'));
        });
        this._lastGrade = this.grade;
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
            case 'legendary':
              sellval = this.baseSellValue * level * 6;
            break;
        }
        // Round down for credit value
        this.sellDiv.text(Math.floor(sellval));
      };

      // Returns the hidden level value based on selected grade/rarity
      scaler.getHiddenLevel = function( rarity, grade ) {

        let hiddenLevel = 0;
        // Special case for standard platings
        if( this.isPlating ) {
          this.updatePlatings( rarity, this.getIndex('armor'), this.getIndex('repair') );
          if( rarity == "ascendant" )
            hiddenLevel += (this.rank - 1) * 0.2;
        }
        else {
          switch( rarity ) {
            case "common":
            break;
            case "uncommon":
              hiddenLevel = 1.4;
            break;
            case "rare":
              hiddenLevel = 2.2;
            break;
            case "superior":
              hiddenLevel = 3.8;
            break;
            case "ascendant":
              hiddenLevel = 4.6 + ((this.rank - 1) * 0.2);
            break;
            case 'legendary':
              hiddenLevel = 6;
            break;
          }
        }
        // Return early if ascendant (no grades)
        if( rarity == 'ascendant' )
          return hiddenLevel;

        switch( grade ) {
          case "normal":
          break;
          case "prototype":
            // Ignore if incorrect rarity
            if( rarity == 'common' || rarity == 'uncommon' )
              break;
            hiddenLevel += 1;
          break;
          case "radiant":
            hiddenLevel += 1;
          break;
          case "starforged":
            // Ignore if incorrect rarity
            if( rarity != 'superior' )
              break;
            hiddenLevel += 2;
          break;
        }
        return hiddenLevel;
      };

      // Updates standard platings (specific case, called inside update())
      scaler.updatePlatings = function( rarity, armorIdx, repairIdx ) {

        switch (rarity) {
          case "common":
            this.baseMStats[armorIdx] = 80;
            this.mainStatVals.eq(repairIdx).text("5%");
            this.name_el.text('Plating');
            this.desc_el.text('Basic metallic alloy for hardened bulkheads. Protects against energy damage.');
          break;
          case "uncommon":
            this.baseMStats[armorIdx] = 98.47;
            this.mainStatVals.eq(repairIdx).text("6%");
            this.name_el.text('Phase Plating');
            this.desc_el.text('Carbon "Phase" armor that blends into the hull. Protects against energy damage.');
          break;
          case "rare":
            this.baseMStats[armorIdx] = 110.9;
            this.mainStatVals.eq(repairIdx).text("7%");
            this.name_el.text('Meson Plating');
            this.desc_el.text('Mesh-on "Meson" tungsten tightly-bound fortication. Protects against energy damage.');
          break;
          case "superior":
            this.baseMStats[armorIdx] = 140.606;
            this.mainStatVals.eq(repairIdx).text("8%");
            this.name_el.text('Nano Plating');
            this.desc_el.text('Nano-bond technology for incredible structural durability. Protects against energy damage.');
          break;
          case "ascendant":
            this.baseMStats[armorIdx] = 158.33;
            this.mainStatVals.eq(repairIdx).text("8%");
            this.name_el.text('Nano Plating');
            this.desc_el.text('Nano-bond technology for incredible structural durability. Protects against energy damage.');
          break;
        }
      };

      scaler.addScalingElements = function() {

        const levelRange = $('<input>', { class: 'level-input',type: 'range',min: 1,max: 30,value: scalingSetting.level,name: scaler.elements.levelRange,id: scaler.elements.levelRange });
        const levelNumber = $('<input>', { class: 'level-input',type: 'number',min: 1,max: 30,value: scalingSetting.level,name: scaler.elements.levelNumber,id: scaler.elements.levelNumber });

        sliderDiv.empty().append(
          $('<div>', { class: 'pi-scaling-group' })
            .append($('<div>').text(1))
            .append(levelRange)
            .append($('<div>').text(30))
            .append(levelNumber)
        );
        // Store reference
        this.levelRange = levelRange;
        this.levelNumber = levelNumber;

        // Legendary items check
        if( !scaler.isLegendary ) {

          const savedRarity = scalingSetting.rarity;
          const savedGrade  = scalingSetting.gradeStandard;

          // Rarity selectors
          rarityDiv.empty().append(
            $('<div>', { class: 'pi-scaling-group' }).append(
              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-common-' + i, value: 'common', checked: savedRarity == 'common' }),
              $('<label>', { for: 'rarity-common-' + i, class: 'color-common' }).text('Common'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-uncommon-' + i, value: 'uncommon', checked: savedRarity == 'uncommon' }),
              $('<label>', { for: 'rarity-uncommon-' + i, class: 'color-uncommon', title: '+1.4 item level' }).text('Uncommon'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-rare-' + i, value: 'rare', checked: savedRarity == 'rare' }),
              $('<label>', { for: 'rarity-rare-' + i, class: 'color-rare', title: '+2.2 item level' }).text('Rare'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-superior-' + i, value: 'superior', checked: savedRarity == 'superior' }),
              $('<label>', { for: 'rarity-superior-' + i, class: 'color-superior', title: '+3.8 item level' }).text('Superior'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.rarityGroup, id: 'rarity-ascendant-' + i, value: 'ascendant', checked: savedRarity == 'ascendant' }),
              $('<label>', { for: 'rarity-ascendant-' + i, class: 'color-ascendant', title: '+4.6 item level\nadded with the Wraith of the Ancients DLC' }).text('Ascendant')
            )
          );

          // Grade
          gradeDiv.empty().append(
            $('<div>', { class: 'pi-scaling-group' }).append(
              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-normal-' + i, value: 'normal', checked: savedGrade == 'normal' }),
              $('<label>', { for: 'grade-normal-' + i, class: 'color-common' }).text('Normal'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-prototype-' + i, value: 'prototype', checked: savedGrade == 'prototype' }),
              $('<label>', { for: 'grade-prototype-' + i, class: 'color-rare', title: '+1 item level' }).text('Prototype'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-starforged-' + i, value: 'starforged', checked: savedGrade == 'starforged' }),
              $('<label>', { for: 'grade-starforged-' + i, class: 'color-superior', title: '+2 item level' }).text('Starforged')
            )
          );
          // Store references
          this.rarityInputs = rarityDiv.find(".scaling-radio");
          this.gradeInputs  = gradeDiv.find(".scaling-radio");

          // Rank
          const rankRange  = $('<input>', { type:'range',class:'rank-input',min: 1,max: 8,value: scalingSetting.rank,name: scaler.elements.rankRange,id: scaler.elements.rankRange });
          const rankNumber = $('<input>', { type:'number',class:'rank-input',min: 1,max: 8,value: scalingSetting.rank,name: scaler.elements.rankNumber,id: scaler.elements.rankNumber});

          rankDiv.empty().append(
            $('<div>', { class: 'pi-scaling-group' })
              .append($('<div>').text(1))
              .append(rankRange)
              .append($('<div>').text(8))
              .append(rankNumber)
          );
          // Store reference
          this.rankRange = rankRange;
          this.rankNumber = rankNumber;

        } else {

          const savedGrade  = scalingSetting.gradeLegendary;
          // Legendary grade
          gradeDiv.empty().append(
            $('<div>', { class: 'pi-scaling-group' }).append(
              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-normal-' + i, value: 'normal', checked: savedGrade == 'normal' }),
              $('<label>', { for: 'grade-normal-' + i, class: 'color-legendary' }).text('Normal'),

              $('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.gradeGroup, id: 'grade-radiant-' + i, value: 'radiant', checked: savedGrade == 'radiant' }),
              $('<label>', { for: 'grade-radiant-' + i, class: 'color-legendary', title: '+1 item level' }).html('<b>Radiant</b>')
            )
          );
          // Store reference
          this.gradeInputs = gradeDiv.find(".scaling-radio");
        }
      };

      scaler.addSaveButton = function() {

        if( !headerDiv.length ) return;
        headerDiv.append( $('<button>', { text: 'Save', class: 'floatright', style: 'margin:0', name: scaler.elements.button, id: scaler.elements.button, click: scaler.updateFromButton } ) );
      };
      scaler.updateFromButton = function() {

        const s = { level: scalingSetting.level, rank: scalingSetting.rank };
        if( scaler.isLegendary ) {
          s.gradeLegendary = scalingSetting.gradeLegendary;
        }
        else {
          s.gradeStandard = scalingSetting.gradeStandard;
          s.rarity = scalingSetting.rarity;
        }
        updateSettings(s);
        saveNotice.stop(true,true).appendTo(infobox).fadeIn(500).delay(100).fadeOut(2000);
      };

      // Bind range and number inputs together
      scaler.bindLinkedInputs = function( $inputs, settingsKey, minVal, maxVal ) {

        if (!$inputs || !$inputs.length) return;

        $inputs.on('input change', function () {
          const raw = Number(this.value);
          const val = Math.min(maxVal, Math.max(minVal, raw));

          if( settingsKey ) scalingSetting[settingsKey] = val;

          $inputs.val(val);
          scaler.update();
        });
      };

      // Bind radio inputs to update settings like bindLinkedInputs
      scaler.bindRadioInputs = function($inputs, settingsKey, defaultVal) {
        if (!$inputs || !$inputs.length) return;

        $inputs.on('change', function() {
          const val = $inputs.filter(':checked').val() || defaultVal;

          if (settingsKey) {
            scalingSetting[settingsKey] = val;
          }

          scaler.update();
        });
      };

      scaler.init();               // Initialise and check for presence of template elements
      scaler.addScalingElements(); // Add the scaling elements
      scaler.addSaveButton();      // Add save button to remember set level

      // Add event handlers to inputs
      scaler.bindLinkedInputs( scaler.levelRange.add( scaler.levelNumber ), 'level', 1, 30 );

      if(!scaler.isLegendary) {
        scaler.bindLinkedInputs( scaler.rankRange.add( scaler.rankNumber ), 'rank', 1, 8 );
        scaler.bindRadioInputs( scaler.gradeInputs, 'gradeStandard', 'normal' );
        scaler.bindRadioInputs( scaler.rarityInputs, 'rarity', 'common' );
      } else {
        scaler.bindRadioInputs(scaler.gradeInputs, 'gradeLegendary', 'normal');
      }

      // First run, calculate and update values
      scaler.update();
    });

});
/*
 * END Equipment Scaling
 */