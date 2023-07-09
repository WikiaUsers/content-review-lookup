mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('hero_infobox_slider');
	if (!main) return;
	var hero, slider;
	var minLevel = 0;
	var maxLevel = 0;
	var ele = {
		armor: document.getElementById('heroslider-armor') || {},
		attackdamage: document.getElementById('heroslider-attackdamage') || {},
		healthregen: document.getElementById('heroslider-healthregen') || {},
		level: document.getElementById('heroslider-level') || {},
		magicarmor: document.getElementById('heroslider-magicarmor') || {},
		maxhealth: document.getElementById('heroslider-maxhealth') || {},
		
		herostatstable: document.getElementById('herostatstable')
	};

	function initialize() {
		hero = JSON.parse( '{"level":{' + main.textContent.replaceAll(':,', ':\"\",') + '}}' );
		var levels = Object.keys( hero.level );
		if ( levels.length > 0 ) {
			minLevel = parseInt( levels[0], 10 );
			maxLevel = parseInt( levels[levels.length - 1], 10 );
				document.getElementById('heroslider-level').textContent = 'Level ' + maxLevel;
				var sliderOuter = document.getElementById('heroslider-outer');
				slider = document.createElement('input');
				slider.id = 'heroslider';
				slider.type = 'range';
				sliderOuter.appendChild(slider);
				slider.min = minLevel;
				slider.max = maxLevel;
				slider.value = maxLevel;
			slider.addEventListener('change', updateStats);
		}
	}

	function addAbility( id, requiredLevelList, manaCostList, rangeList, constantsList ) {
		if ( !( 'abilities' in hero ) ) hero.abilities = {};

		var ability = {};
		var requiredLevels = requiredLevelList.split( ',' );
		var manaCosts = manaCostList.split( ',' );
		var ranges = rangeList.split( ',' );
		var constants = constantsList.split( '\n\n' );

		for ( var i = 0; i < requiredLevels.length; ++i ) {
			ability[requiredLevels[i]] = {
				manaCost : ( i < manaCosts.length ? manaCosts[i] : 'missing' ),
				range : ( i < ranges.length ? ranges[i] : 'missing' ),
				constants : ( i < constants.length ? parseConstants( constants[i] ) : {} )
			};
		}
		hero.abilities[id] = ability;
	}

	function parseConstants( constantsList ) {
		var constants = {};
		var constantsLines = constantsList.split( '\n' );

		for ( var i = 0; i < constantsLines.length; ++i ) {
			var constantParts = constantsLines[i].split( ',' );
			if ( constantParts.length > 2 ) {
				constants[constantParts[0].split( ';' )[0]] = constantParts[1];
			}
		}
		return constants;
	}

	function updateStats() {
		var level = slider.value;
		var data = hero.level[level];
		ele.level.textContent = 'Level ' + level;
		if ( data.attackdamagemin && data.attackdamagemax ) {
			if ( data.attackdamagemin != data.attackdamagemax ) {
				ele.attackdamage.textContent = data.attackdamagemin + '-' + data.attackdamagemax;
			} else {
				ele.attackdamage.textContent = data.attackdamagemax;
			}
		} else {
			ele.attackdamage.textContent = ( data.attackdamagemin ? data.attackdamagemin : '_' ) + '-' +
				( data.attackdamagemax ? data.attackdamagemax : '_' );
		}
		ele.maxhealth.textContent = data.maxhealth ? data.maxhealth : '_';
		ele.healthregen.textContent = data.healthregen ? data.healthregen : '_';
		ele.armor.textContent = data.armor ? data.armor : '_';
		ele.magicarmor.textContent = data.magicarmor ? data.magicarmor : '_';

		
		ele.herostatstable.querySelectorAll('td:first-of-type').forEach(function(ele) {
			if ( parseInt( ele.textContent, 10 ) == level ) {
				ele.classList.add( 'current' );
			} else {
				ele.classList.remove( 'current' );
			}
		});

		updateAbilities( level );
	}

	function updateAbilities( level ) {
		if ( 'abilities' in hero ) {
			var ability, descSpan, shortDescSpan, achievedAbility, achievedLevel;
			for ( var id in hero.abilities ) {
				ability = hero.abilities[id];
				achievedLevel = 0;
				for ( var requiredLevel in ability ) {
					if ( requiredLevel <= level ) {
						achievedLevel = Math.max( achievedLevel, requiredLevel );
					}
				}
				shortDescSpan = document.getElementById(id + '-short');
				descSpan = document.getElementById(id);
				if ( achievedLevel > 0 ) {
					achievedAbility = ability[achievedLevel];
					document.getElementById(id + '-manacost').textContent = achievedAbility.manaCost ;
					document.getElementById(id + '-range').textContent = achievedAbility.range ;
					for ( var constant in achievedAbility.constants ) {
						console.log(achievedAbility.constants[constant]);
						shortDescSpan.find( '.strife-formatted-' + constant ).html( achievedAbility.constants[constant] );
						descSpan.find( '.strife-formatted-' + constant ).html( achievedAbility.constants[constant] );
					}
				}
			}
		}
	}
	initialize();
});