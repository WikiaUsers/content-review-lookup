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
		'ascendant':'pi-theme-ascendant'
    };
    const rarityClasses = Object.values(infoboxThemes);

	const scalingConfig = {
		key: 'everspacewiki-scalingSettings',
		defaults: { level: 1, rank: 1, rarity: 'common', gradeStandard: 'normal', gradeLegendary: 'normal' },
		rarities: [ 'common', 'uncommon', 'rare', 'superior', 'ascendant' ],
		grades: {
			standard: ['normal','prototype','starforged'],
			legendary: ['normal','radiant']
		}
	};

	scalingConfig.save = function(settings) {
		mw.storage.set( scalingConfig.key ,JSON.stringify( settings ) );
	};
	scalingConfig.update = function(updates) {
		const settings = scalingConfig.load();
		Object.assign(settings, updates);
		scalingConfig.save(settings);
    };
	scalingConfig.load = function() {
		const settings = Object.assign( {}, scalingConfig.defaults );
		try {
			const raw = mw.storage.get( scalingConfig.key );
			if( raw )
				Object.assign( settings, JSON.parse( raw ) );
		} catch (e) {
			console.error( 'Failed to get Equipment Scaling settings, using defaults:', e );
			return settings; // return early if storage access or parsing fails
		}
		// Validate retrieved values
		settings.level = scalingConfig.clamp( 1, 30, settings.level );
		settings.rank  = scalingConfig.clamp( 1, 8,  settings.rank );

		if( !scalingConfig.rarity( settings.rarity ) )
			settings.rarity = scalingConfig.defaults.rarity;

		if( !scalingConfig.grade( settings.gradeStandard ) )
			settings.gradeStandard = scalingConfig.defaults.gradeStandard;

		if( !scalingConfig.grade( settings.gradeLegendary, true ) )
			settings.gradeLegendary = scalingConfig.defaults.gradeLegendary;

		return settings;
	};
	scalingConfig.rarity = function( rarity ) { return scalingConfig.rarities.includes( rarity ); };
	scalingConfig.grade = function( grade, legendary = false ) {
		return !legendary
			? scalingConfig.grades.standard.includes( grade )
			: scalingConfig.grades.legendary.includes( grade );
	};
	scalingConfig.clamp = function( min, max, value ) { return Math.min( Math.max( min, value ), max ) };

	const wikiUserScalingConfig = scalingConfig.load();

	const statConfig = {
		// Stat growth factors and formatting settings
		stats: {
			'Armor': { value: 1.16, format: 'compact', minfractions: 1, maxfractions: 2 }, // Change to maxfractions: 1 later
			'Capacity': { value: 1.16, format: 'compact', maxfractions: 2 },
			'Energy Capacity': { value: 1.16, format: 'compact', maxfractions: 2 },
			'Energy Consumption': { value: 1.14, format: 'roundto', decimals: 1, suffix: '/s' },
			'Kinetic Damage': { value: 1.13, format: 'round' }, // Switch to compact later
			'Energy Damage': { value: 1.13, format: 'round' }, 	// Switch to compact later
			'Effect Range': { value: 1.02, format: 'round', suffix: 'm' },
			'Effect Duration': { value: 1.02, format: 'raw',  suffix: 's' },
			'Damage Dealt': { value: 1.02, format: 'round', suffix: '%', prefix: '+' },
			'Kinetic DPS' : { value: 1.13, format: 'raw' },
			'Energy DPS' : { value: 1.13, format: 'raw' },
			'Recharge Delay': { value: 0.99, format: 'raw', suffix: 's' },
			'Shutdown Duration': { value: 0.99, format: 'raw', suffix: 's' },
			'Ships Range': { value: 1.012, format: 'compact', suffix: 'km', round: false, override: true, minfractions: 1, maxfractions: 2 }, // Adjust fraction settings later
			'Loot Range': { value: 1.012, format: 'compact', suffix: 'km', round: false, override: true, minfractions: 1, maxfractions: 2 },  // Adjust fraction settings later
			'Resources Range': { value: 1.015, format: 'compact', suffix: 'km', round: false, override: true, minfractions: 2, maxfractions: 2 },
			'Speed Gain': { value: 1.01, format: 'round', suffix: '%' },
			'Recharge Speed': { value: 1.01, format: 'round', suffix: '%' },
			'Acceleration': { value: 1.01, format: 'round', suffix: '%' },
			'Cruise': { value: 1.01, format: 'round', suffix: '%', prefix: '+' },
			'Cargo Slots': { value: 1.036, format: 'round', prefix: '+' },
			'Output: Weapons': { value: 1.18, format: 'round', suffix: '/s' },
			'Output: Boost': { value: 1.18, format: 'round', suffix: '/s' },
			'Output: Shield': { value: 1.18, format: 'round', suffix: '/s' },
			// See formatValue()
			'default' : {
				value: 1,        // Growth factor
				format: 'raw',   // Raw returns the value without any rounding/formatting (except prefix/suffix if set)
				prefix: '',      // Text to place before the value
				suffix: '',      // Text to place after the value
				minfractions: 0, // Minimum number of fractions/decimals to show (compact)
				maxfractions: 2, // Maximum number of fractions/decimals to show (compact)
				round: false,    // Whether to round the value (compact)
				decimals: 2,     // Number of decimals to show (roundto)
				override: false  // Overrides compact 10000 minimum
			}
		},
		// Trait growth factors
		traits: { drain: 1.16, default: 1.13 },
		// Hidden level modifiers
		levelmodifiers: {
			common:  { base: 0 },
			uncommon:{ base: 1.4 },
			rare:    { base: 2.2, grades: { prototype: 1 } },
			superior:{ base: 3.8, grades: { prototype: 1, starforged: 2 } },
			ascendant:{ base: 4.6 },
			legendary:{ base: 6, grades: { radiant: 1 } }
		}
	};
	statConfig.default = function( type ) { return statConfig[type].default; };
	statConfig.isType  = function( prop ) { return statConfig.stats.hasOwnProperty(prop); };
	statConfig.trait   = function( type ) { return statConfig.traits[type] ||statConfig.traits.default; };

	// Number formatting utilities
	const numberformat = {};

	// Cache for compact formatters
	numberformat._compactCache = new Map();
	numberformat._groupedFormatter = null;

	// Round to nearest integer
	numberformat.round = function(value) { return Math.round(value); };

	// Format integer with thousands separators, no decimals
	numberformat.thousands = function(value) {
		if( !numberformat._groupedFormatter )
			numberformat._groupedFormatter = new Intl.NumberFormat('en-GB', { useGrouping: true, maximumFractionDigits: 0 });
		return numberformat._groupedFormatter.format(value);
	};

	// Return (or create) a compact formatter for given min/max fractions
	numberformat.getCompactFormatter = function(min, max) {
		const key = min + ':' + max;
		if( !numberformat._compactCache.has( key ) )
			numberformat._compactCache.set( key, new Intl.NumberFormat('en-GB', { notation: 'compact', minimumFractionDigits: min, maximumFractionDigits: max }) );
		return numberformat._compactCache.get(key);
	};

	// Compact number formatting
	numberformat.compact = function(value, cfg) {
		// cfg: { minfractions, maxfractions, round, override }
		if (value < 10000 && !cfg.override)
			return numberformat.round(value);

		const v = cfg.round ? numberformat.round(value) : value;
		return numberformat.getCompactFormatter(cfg.minfractions, cfg.maxfractions).format(v).toLowerCase();
	};
	numberformat.roundto = function( value, decimals = 2 ) {
		const f = Math.pow( 10, decimals );
		return numberformat.round( value * f ) / f;
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

		// Add hidden section with save message, visibility is toggled to indicate saving
		const saveNotice = infobox.find('section[data-item-name="equipment-info-message"]').hide().text('Settings Updated!');

		const scaler = { levelExponent: 0, indexes: {}, growthDefault: true, baseSellValue: 0 };
		const creditMultipliers = { common: 1, uncommon: 1.8, rare: 3, superior: 6, ascendant: 8, legendary: 6 };

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

			// Element references
			this.mainStatVals     = infobox.find('[data-item-name="equipment-main-stats"] .pi-data > .pi-data-value');
			this.detailedStatVals = infobox.find('[data-item-name="detailed-stats"] .pi-data > .pi-data-value');

			// Credits value element
			this.sellDiv = infobox.find('[data-source="sellvalue"] > .pi-data-value > .equipment-value');
			if( this.sellDiv.length )
				this.baseSellValue = parseFloat(this.sellDiv.text() || 0);

			if( this.isCruiseBooster ) {
				// Cruise booster specific (not used anywhere else)
				this.passiveValDiv  = infobox.find('[data-source="passivetext1"] > .pi-data-value > .passive-value');
				this.basePassiveVal = parseFloat(this.passiveValDiv.text() || 0);
			}

			// Prep legendary trait data attributes
			if( this.isLegendary ) {
				this.traits = infobox.find('[data-source="trait"] > .pi-data-value [data-trait]');
				this.traits.each( function(i) {
					const el = $(this);
					const baseVal = parseFloat(el.text()) || 0;
					el.attr('data-trait', i);
					el.data('trait-base', baseVal);      // jQuery internal
					el.attr('data-trait-base', baseVal); // visible in HTML
				});

				this.gradeTraits = infobox.find('[data-source="trait"] > .pi-data-value [data-radiant]');
				this.gradeTraits.each( function() {
					const el = $(this);
					if( !el.data('normal') ) {
						el.data('normal', el.text());      // jQuery internal
						el.attr('data-normal', el.text()); // visible in HTML
					}
				});
			}
		}; // end init

		// Updates equipment values, on first run and after an input value changes
		scaler.update = function () {

			const damageModifiers = {
				chargeDamage: 1.0,
				burstShots: 1.0,
				fireDuration: 1.0,
				chargeDuration: 0.0,
				burstDuration: 0.0,
			};

			// Get currently set values
			this.level  = this.levelRange  ? +this.levelRange.val() : 1;
			this.rank   = this.rankRange   ? +this.rankRange.val() : 1;
			this.rarity = this.isLegendary ? 'legendary' : this.rarityInputs.filter(":checked").val();
			this.grade  = this.gradeInputs ? this.gradeInputs.filter(":checked").val() : 'normal';
			this.isAscendant = 'ascendant' == this.rarity;
			this.rankBonus = this.isAscendant ? ( this.rank - 1 ) * 0.2 : 0;
			this.level_el.text( this.level ); // Update displayed level
			this.levelExponent = ( this.level - 1 ) + this.getHiddenLevel( this.rarity, this.grade, this.rankBonus, this.isAscendant )

			// Update dynamic legendary trait/grade values
			if( this.isLegendary ) {
				const isRadiant = 'radiant' === this.grade;
				this.setTraitPassives( isRadiant );
				this.setGradePassives( isRadiant );
			}
			// Update infobox theme
			this.setTheme( this.rarity );

			// Update credit values
			if( this.sellDiv.length )
				this.sellDiv.text( scaler.getCreditValue( this.level, this.rarity ) );

			// Update equipment values
			switch( this.equiptype ) {
				case "Primary Weapon":
					this.detailedStatVals.each( function(i) {
						const statType  = scaler.detailedStatLabels[i];
						const statValue = scaler.baseDStats[i];
						switch(statType) {
							case 'Charge Damage Increase':
								damageModifiers.chargeDamage = statValue / 100;
							break;
							case 'Burst Shots':
								damageModifiers.burstShots = statValue;
							break;
							case 'Fire Rate':
								damageModifiers.fireDuration = 1 / statValue;
							break;
							case 'Charge Duration':
								damageModifiers.chargeDuration = statValue;
							break;
							case 'Burst Duration':
								damageModifiers.burstDuration = statValue;
							break;
							case 'Energy Capacity':
								$(this).text(scaler.formatValue(statValue, statType));
							break;
							case 'Energy Consumption':
								$(this).text(scaler.formatValue(statValue, statType));
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
								const kineticDamage = scaler.formatValue( statValue, statType);
								const kineticDPS    = scaler.calcDPS( kineticDamage, damageModifiers );
								$(this).text( numberformat.round( kineticDPS ) );
								detail.text( numberformat.round( kineticDamage ) );
							break;
							case 'Energy DPS':
								statValue = scaler.baseDStats[scaler.getIndex('edmg')] || false;
								if( !statValue ) break;
								detail = scaler.detailedStatVals.eq(scaler.getIndex('edmg'));
								const energyDamage = scaler.formatValue( statValue, statType);
								const energyDPS    = scaler.calcDPS( energyDamage, damageModifiers );
								$(this).text( numberformat.round( energyDPS ) );
								detail.text( numberformat.round( energyDamage ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
						}
					});
					this.detailedStatVals.each(function(i) {
						const statType  = scaler.detailedStatLabels[i];
						const statValue = scaler.baseDStats[i];
						switch(statType) {
							case 'Effect Range':
								if( !scaler.skipEffectRange ) {
									$(this).text( scaler.formatValue( statValue, statType ) );
								}
							break;
							case 'Effect Duration':
								if( !scaler.skipEffectDuration ) {
									$(this).text( scaler.formatValue( statValue, statType ) );
								}
							break;
							case 'Damage Dealt':
								$(this).text( scaler.formatValue( statValue, statType ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
						}
					});
					this.detailedStatVals.each(function(i) {
						const statType  = scaler.detailedStatLabels[i];
						const statValue = scaler.baseDStats[i];
						switch(statType) {
							case 'Recharge Delay':
							case 'Shutdown Duration':
								$(this).text( scaler.formatValue( statValue, statType ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
							case 'Resources Range':
								$(this).text( scaler.formatValue( statValue, statType ) );
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
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
						}
					});

					this.detailedStatVals.each(function(i) {
						const statType = scaler.detailedStatLabels[i];
						const statValue = scaler.baseDStats[i];
						switch(statType) {
							case 'Acceleration':
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
							case 'Energy Capacity':
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
							case 'Energy Consumption':
								$(this).text( scaler.formatValue(statValue, statType, { format: 'raw' }) );
							break;
						}
					});

					if( this.isCruiseBooster ) {
						this.passiveValDiv.text( scaler.formatValue( this.basePassiveVal, 'Cruise' ) );
					}

				break;

				case "Cargo Unit":

					this.mainStatVals.each(function(i) {
						const statType  = scaler.mainStatLabels[i];
						const statValue = scaler.baseMStats[i];
						switch(statType) {
							default:
								$(this).text( scaler.formatValue( statValue, statType ) );
							break;
						}
					});
				break;

				default: console.log('Unknown equipment type'); break;
			}
		};

		// Refactored formatValue
		scaler.formatValue = function( baseValue = 0, type = 'default', options = {} ) {

			const defaults = statConfig.default('stats');
			const isType   = statConfig.isType(type);
			const stat     = statConfig.stats[type] || defaults;

			if( !isType && !('value' in options) ) return 0;

			// Map shorthand min/max to minfractions/maxfractions
			if( 'min' in options ) options.minfractions = options.min;
			if( 'max' in options ) options.maxfractions = options.max;

			// Resolve config using defaults as schema
			const cfg = {};
			for( const key in defaults ) {
				if( Object.prototype.hasOwnProperty.call( options, key ) )
					cfg[key] = options[key];
				else if( Object.prototype.hasOwnProperty.call( stat, key ) )
					cfg[key] = stat[key];
				else
					cfg[key] = defaults[key];
			}
			// Raw calculation
			let scaledValue = scaler.calc( baseValue, cfg.value );

			switch( cfg.format ) {
				case 'raw': break;
				case 'round':
					scaledValue = numberformat.round( scaledValue );
				break;
				case 'roundto':
					scaledValue = numberformat.roundto( scaledValue, cfg.decimals );
				break;
				case 'compact':
					scaledValue = numberformat.compact( scaledValue, cfg );
				break;
			}
			return [ cfg.prefix, scaledValue, cfg.suffix ].join(''); // Result will always be a string
		};

		// Returns the credits rarity multiplier
		scaler.getCreditMulti = function( rarity ) { return creditMultipliers[rarity] || 1; };

		// Returns the index of a stat: used with platings and main weapon damage calculations
		scaler.getIndex = function( key ) { return scaler.indexes[key]; };

		scaler.calc = function( value, growth ) {
			const n = value * Math.pow( growth, scaler.levelExponent );
			const s = Math.floor( n * 100 ) / 100;
			return s;
		};

		scaler.calcDPS = function( damage, modifiers ) {
			return ( damage * modifiers.chargeDamage * modifiers.burstShots ) / ( modifiers.fireDuration + modifiers.chargeDuration + modifiers.burstDuration );
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
					infobox.removeClass(rarityClasses.join(' '));
					infobox.addClass(infoboxThemes[rarity]);
				break;
			}
		};

		// Updates legendary trait values
		scaler.setTraitPassives = function( isRadiant ) {
			// Switch growth value depending on data-type
			// <span data-trait> vs <span data-trait data-type="type">
			this.traits.each(function () {
				const el = $(this);
				const growthFactor = statConfig.trait( el.data('type') );
				const multiplier   = isRadiant && !el.data('type') ? 2 : 1;
				const baseValue    = el.data('trait-base') * multiplier;
				el.attr( 'title', 'Radiant values are rolled and can vary from +25% to +100% over standard' );
				el.text( scaler.formatValue( baseValue, null, { format:'round', value: growthFactor } ) );
			});
		};

		// Updates legendary grade based trait values (normal/radiant)
		scaler.setGradePassives = function( isRadiant ) {
			if( !this._lastGrade )
				this._lastGrade = null;
			if( this._lastGrade === this.grade )
				return;
			this.gradeTraits.each(function() {
				const el = $(this);
				el.text( isRadiant ? el.data('radiant') : el.data('normal'));
			});
			this._lastGrade = this.grade;
		};

		scaler.getCreditValue = function( level, rarity ) {
			const value = this.baseSellValue * level * scaler.getCreditMulti(rarity);
			return numberformat.thousands( value ); // Formats with thousands separator
		};

		scaler.getHiddenLevel = function( rarity, grade, rankBonus, isAscendant ) {
			let hiddenLevel = 0;
			hiddenLevel += rankBonus; // 0 when not ascendant
			if( this.isPlating ) {
				this.updatePlatings( rarity, this.getIndex('armor'), this.getIndex('repair') );
			} else {
				const data = statConfig.levelmodifiers[rarity] || { base: 0 };
				hiddenLevel += data.base;
			}
			// No grade for ascendant, return early
			if( isAscendant )
				return hiddenLevel;

			const gradeAdd = (statConfig.levelmodifiers[rarity] && statConfig.levelmodifiers[rarity].grades) || {};
			if( gradeAdd[grade] )
				hiddenLevel += gradeAdd[grade];

			return hiddenLevel;
		};

		scaler.updatePlatings = function( rarity, armorIdx, repairIdx ) {

			switch (rarity) {
				case "common":
					this.baseMStats[armorIdx] = 80;
					this.baseSellValue = 15.4;
					this.mainStatVals.eq(repairIdx).text("5%");
					this.name_el.text('Plating');
					this.desc_el.text('Basic metallic alloy for hardened bulkheads. Protects against energy damage.');
				break;
				case "uncommon":
					this.baseMStats[armorIdx] = 98.47;
					this.baseSellValue = 16.5;
					this.mainStatVals.eq(repairIdx).text("6%");
					this.name_el.text('Phase Plating');
					this.desc_el.text('Carbon "Phase" armor that blends into the hull. Protects against energy damage.');
				break;
				case "rare":
					this.baseMStats[armorIdx] = 110.89;
					this.baseSellValue = 18.03;
					this.mainStatVals.eq(repairIdx).text("7%");
					this.name_el.text('Meson Plating');
					this.desc_el.text('Mesh-on "Meson" tungsten tightly-bound fortication. Protects against energy damage.');
				break;
				case "superior":
					this.baseMStats[armorIdx] = 140.61;
					this.baseSellValue = 19.8;
					this.mainStatVals.eq(repairIdx).text("8%");
					this.name_el.text('Nano Plating');
					this.desc_el.text('Nano-bond technology for incredible structural durability. Protects against energy damage.');
				break;
				case "ascendant":
					this.baseMStats[armorIdx] = 158.3;
					this.baseSellValue = 26.40;      // 33% increased base value over superior
					creditMultipliers.ascendant = 6; // Does however use the superior multiplier
					this.mainStatVals.eq(repairIdx).text("8%");
					this.name_el.text('Nano Plating');
					this.desc_el.text('Nano-bond technology for incredible structural durability. Protects against energy damage.');
				break;
			}
		};

		scaler.addScalingElements = function() {

			const levelRange = $('<input>', { class: 'level-input',type: 'range',min: 1,max: 30,value: wikiUserScalingConfig.level,name: scaler.elements.levelRange,id: scaler.elements.levelRange });
			const levelNumber = $('<input>', { class: 'level-input',type: 'number',min: 1,max: 30,value: wikiUserScalingConfig.level,name: scaler.elements.levelNumber,id: scaler.elements.levelNumber });

			sliderDiv.empty().append(
				$('<div>', { class: 'pi-scaling-group' })
				.append($('<div>').text(1))
				.append(levelRange)
				.append($('<div>').text(30))
				.append(levelNumber)
			);

			// Store reference
			this.levelRange  = levelRange;
			this.levelNumber = levelNumber;

			// Legendary items check
			if( !scaler.isLegendary ) {

				const savedRarity = wikiUserScalingConfig.rarity;
				const savedGrade  = wikiUserScalingConfig.gradeStandard;

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
				const rankRange  = $('<input>', { type:'range',class:'rank-input',min: 1,max: 8,value: wikiUserScalingConfig.rank,name: scaler.elements.rankRange,id: scaler.elements.rankRange });
				const rankNumber = $('<input>', { type:'number',class:'rank-input',min: 1,max: 8,value: wikiUserScalingConfig.rank,name: scaler.elements.rankNumber,id: scaler.elements.rankNumber});

				rankDiv.empty().append(
					$('<div>', { class: 'pi-scaling-group' })
					.append($('<div>').text(1))
					.append(rankRange)
					.append($('<div>').text(8))
					.append(rankNumber)
				);
				// Store reference
				this.rankRange  = rankRange;
				this.rankNumber = rankNumber;

			} else {

				const savedGrade  = wikiUserScalingConfig.gradeLegendary;
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
			if( !headerDiv.length )
				return;
			headerDiv.append(
				$('<button>', { text: 'Save', class: 'floatright', style: 'margin:0', name: scaler.elements.button, id: scaler.elements.button, click: scaler.updateFromButton } )
			);
		};

		scaler.updateFromButton = function() {

			const settings = { level: wikiUserScalingConfig.level, rank: wikiUserScalingConfig.rank };
			if( scaler.isLegendary ) {
				settings.gradeLegendary = wikiUserScalingConfig.gradeLegendary;
			}
			else {
				settings.gradeStandard = wikiUserScalingConfig.gradeStandard;
				settings.rarity = wikiUserScalingConfig.rarity;
			}
			scalingConfig.update(settings);
			saveNotice.stop( true, true ).fadeIn(500).delay(100).fadeOut(2000);
		};

		// Bind range and number inputs together
		scaler.bindLinkedInputs = function( $inputs, settingsKey, minVal, maxVal ) {

			if (!$inputs || !$inputs.length)
				return;

			$inputs.on('input change', function () {
				const raw = Number( this.value );
				const val = Math.min( maxVal, Math.max( minVal, raw ) );

				if( settingsKey )
					wikiUserScalingConfig[settingsKey] = val;

				$inputs.val(val);
				scaler.update();
			});
		};

		// Bind radio inputs to update settings like bindLinkedInputs
		scaler.bindRadioInputs = function( $inputs, settingsKey, defaultVal ) {

			if (!$inputs || !$inputs.length) return;

			$inputs.on('change', function() {
				const val = $inputs.filter(':checked').val() || defaultVal;

				if( settingsKey )
					wikiUserScalingConfig[settingsKey] = val;

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