/*
 * Everspace 2 – NPC Scaling Script by [[User:FaultyCucumber]]
 * Original script by [[User:Slin277]]
 */
;(function(window, $, mw){

	$(function() {
	
		window.everspacewiki = window.everspacewiki || {};
		if( window.everspacewiki.npcScaling && window.everspacewiki.npcScaling.hasRun ) return;
		window.everspacewiki.npcScaling = { hasRun: true };
	
		const npcs = $('aside.pi-theme-es2-npc');
	
		if( !npcs.length ) return;
	
		const scalingConfig = {
			key: 'everspacewiki-npcScaling-settings',
			defaults: { level: 1, tier: 'normal', difficulty: 'normal' },
			tiers: [ 'normal', 'elite' ],
			difficulties: [ 'veryeasy', 'easy', 'normal', 'hard', 'veryhard', 'nightmare' ],
			diffMap: {
				veryeasy: 0.3,
				easy: 0.7,
				normal: 1.0,
				hard: 1.5,
				veryhard: 2.0,
				nightmare: 3.45
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
				console.error( 'Failed to get NPC Scaling settings, using defaults:', e );
				return settings; // return early if storage access or parsing fails
			}
			// Validate retrieved values
			settings.level = scalingConfig.clamp( 1, 30, settings.level );
	
			if( !scalingConfig.isWhitelisted( 'tiers', settings.tier ) )
				settings.tier = scalingConfig.defaults.tier;
	
			if( !scalingConfig.isWhitelisted( 'diff', settings.difficulty ) )
				settings.difficulty = scalingConfig.defaults.difficulty;
	
			return settings;
		};
		scalingConfig.isWhitelisted = function( type, value ) {
			switch( type ) {
				case 'tiers':
					return scalingConfig.tiers.includes( value );
				case 'diff':
					return scalingConfig.difficulties.includes( value );
			}
		};
		scalingConfig.clamp = function( min, max, value ) { return Math.min( Math.max( min, value ), max ) };
	
		const wikiUserScalingConfig = scalingConfig.load();
	
		$(npcs).each(function(i) {
	
			const npc = $(this);
	
			const section = npc.find('[data-item-name="npc-scaling"]');
	
			if( !section.length )
				return true;
	
			const $headerDiv   = section.find('> .pi-header');
			const $npcLevelDiv = section.find('[data-item-name="npc-level"] > .pi-data-value');
			const $npcTierDiv  = section.find('[data-item-name="npc-tier"] > .pi-data-value');
			const $npcDiffDiv  = section.find('[data-item-name="npc-difficulty"] > .pi-data-value');
			
			// Add hidden section with save message, visibility toggled to indicate saving
			const saveNotice = $('<section>', {
				class: 'pi-item pi-group pi-border-color',
				'data-item-name': 'npc-info-message'
			}).append(
				$('<section>').text('Settings Updated!')
			).hide();
			
			npc.append(saveNotice);
	
			const scaler = {};
	
			scaler.elements = {
				levelRange: 'npc-level-slider-' + i,
				levelNumber: 'npc-level-number-' + i,
				tierGroup: 'npc-tier-group' + i,
				diffGroup: 'npc-difficulty-group' + i
			};
	
			scaler.init = function() {
	
				this.level       = npc.find(".header-level");
				this.npcStatVals = npc.find('.npc-stat-value');
	
				this.baseStats = [];
	
				this.npcStatVals.each(function(i) {
					let value = parseFloat($(this).text().trim());
					if (Number.isNaN(value)) value = 0;
					scaler.baseStats.push(value);
				});
	
				this.canBeElite = npc.find('[data-source="elite"]').length > 0;
				if( !this.canBeElite )
					npc.find('[data-item-name="npc-tier"]').remove();
	
	
				// Faction dependant elite scaling
				const factionEl = npc.find('[data-source="factionname"] > .pi-data-value');
				const factionName = factionEl.length ? factionEl.text().trim() : "default";
	
				const factionFactors = {
					"Okkar": 1.6,
					"Okkar Prime": 1.6,
					"Redeemer": 1.6,
					"default": 1.8
				};
	
				this.factionFactor = factionFactors[factionName] !== undefined ? factionFactors[factionName] : factionFactors["default"];
	
				npc.find(".header-level-container").removeClass("stats-hidden");
				//console.log(this.baseStats);
	
			};
	
			scaler.calc = function (baseValue, level, difficultyFactor, eliteFactor) {
				return Math.floor((baseValue + (Math.pow(level-1, 3) * baseValue * 0.004)) * difficultyFactor * eliteFactor);
			};
	
			scaler.update = function() {
	
				this.selectedLevel = this.levelRange ? +this.levelRange.val() : 1;
	
				const diffKey = this.diffInputs.filter(':checked').val();
				this.difficultyFactor = scalingConfig.diffMap[diffKey] || 1.0;
	
				const isElite = 'elite' == this.tierInputs.filter(":checked").val();
	
				// Show or hide the elite badge
				const eliteFactor = isElite ? this.factionFactor : 1.0;
	
				if (this.canBeElite && isElite) {
					npc.find(".header-elite-container").removeClass("stats-hidden");
				}
				else {
					npc.find(".header-elite-container").addClass("stats-hidden");
				}
	
				// Calculate and set the scaled values
				for (let i = 0; i < this.npcStatVals.length; i++) {
					var value = this.calc(this.baseStats[i], this.selectedLevel, this.difficultyFactor, eliteFactor);
					if (value > 10000) value = (value / 1000).toFixed(1) + 'k';
					this.npcStatVals.eq(i).text(value);
				}
	
				this.level.text(this.selectedLevel);
			};
	
			scaler.addScalingElements = function() {
	
				const levelRange = $('<input>', { class: 'level-input',type: 'range',min: 1,max: 30,value: wikiUserScalingConfig.level,name: scaler.elements.levelRange,id: scaler.elements.levelRange });
				const levelNumber = $('<input>', { class: 'level-input',type: 'number',min: 1,max: 30,value: wikiUserScalingConfig.level,name: scaler.elements.levelNumber,id: scaler.elements.levelNumber });
	
				$npcLevelDiv.empty().append(
					$('<div>', { class: 'pi-scaling-group' })
					.append($('<div>').text(1))
					.append(levelRange)
					.append($('<div>').text(30))
					.append(levelNumber)
				);
	
				if (this.canBeElite) {
	
					const savedTier = wikiUserScalingConfig.tier;
	
					// Tiers selectors
					$npcTierDiv.empty().append(
						$('<div>', { class: 'pi-scaling-group' }).append(
							$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.tierGroup, id: 'tier-normal-' + i, value: 'normal', checked: savedTier == 'normal' }),
							$('<label>', { for: 'tier-normal-' + i }).text('Normal'),
							$('<img>', {
								src: 'https://static.wikia.nocookie.net/everspace_gamepedia/images/4/4a/ES2-Icon-EliteSkull.png',
								width: 16,
								height: 16,
								alt: 'Elite'
							}),
							$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.tierGroup, id: 'tier-elite-' + i, value: 'elite', checked: savedTier == 'elite' }),
							$('<label>', { for: 'tier-elite-' + i, title: 'Hitpoints are increased by 60% - 80%' }).text('Elite')
						)
					);
				}
	
				const savedDiff = wikiUserScalingConfig.difficulty;
	
				// Difficulty selectors
				$npcDiffDiv.empty().append(
					$('<div>', { class: 'pi-scaling-group' }).append(
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-veryeasy-' + i, value: 'veryeasy', checked: savedDiff == 'veryeasy' }),
						$('<label>', { for: 'difficulty-veryeasy-' + i, title: 'Hitpoints are at 30%' }).text('Very Easy'),
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-easy-' + i, value: 'easy', checked: savedDiff == 'easy' }),
						$('<label>', { for: 'difficulty-easy-' + i, title: 'Hitpoints are at 70%' }).text('Easy'),
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-normal-' + i, value: 'normal', checked: savedDiff == 'normal' }),
						$('<label>', { for: 'difficulty-normal-' + i, title: 'Hitpoints are at 100%' }).text('Normal'),
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-hard-' + i, value: 'hard', checked: savedDiff == 'hard' }),
						$('<label>', { for: 'difficulty-hard-' + i, title: 'Hitpoints are at 150%' }).text('Hard'),
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-veryhard-' + i, value: 'veryhard', checked: savedDiff == 'veryhard' }),
						$('<label>', { for: 'difficulty-veryhard-' + i, title: 'Hitpoints are at 200%' }).text('Very Hard'),
						$('<input>', { class: 'scaling-radio', type: 'radio', name: scaler.elements.diffGroup, id: 'difficulty-nightmare-' + i, value: 'nightmare', checked: savedDiff == 'nightmare' }),
						$('<label>', { for: 'difficulty-nightmare-' + i, title: 'Hitpoints are at 345%' }).text('Nightmare')
					)
				);
	
				// Store references
				this.levelRange  = levelRange;
				this.levelNumber = levelNumber;
				this.tierInputs  = $npcTierDiv.find(".scaling-radio");
				this.diffInputs = $npcDiffDiv.find(".scaling-radio");
	
			};
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
	
			scaler.bindRadioInputs = function($inputs, settingsKey, defaultVal) {
				if (!$inputs || !$inputs.length) return;
	
				$inputs.on('change', function(e) {
					e.stopImmediatePropagation(); // prevent the original script from hijacking
					const val = $inputs.filter(':checked').val() || defaultVal;
	
					if( settingsKey )
						wikiUserScalingConfig[settingsKey] = val;
	
					scaler.update();
				});
			};
	
			scaler.addSaveButton = function() {
				if( !$headerDiv.length )
					return;
				$headerDiv.append(
					$('<button>', { text: 'Save', class: 'floatright', style: 'margin:0', name: scaler.elements.button, id: scaler.elements.button, click: scaler.updateFromButton } )
				);
			};
	
			scaler.updateFromButton = function() {
	
				const settings = {
					level: wikiUserScalingConfig.level,
					tier: wikiUserScalingConfig.tier,
					difficulty: wikiUserScalingConfig.difficulty
				};
	
				scalingConfig.update(settings);
				saveNotice.stop( true, true )
					.fadeIn(500)
					.delay(100)
					.fadeOut(2000);
			};
	
	
			scaler.init();
			scaler.addScalingElements(); // Add the scaling elements
			scaler.addSaveButton();
	
			scaler.bindLinkedInputs( scaler.levelRange.add( scaler.levelNumber ), 'level', 1, 30 );
			scaler.bindRadioInputs( scaler.tierInputs, 'tier', 'normal' );
			scaler.bindRadioInputs( scaler.diffInputs, 'difficulty', 'normal');
			
			scaler.update();
		});
	});
})(this, jQuery, mediaWiki);