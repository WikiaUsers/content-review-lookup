/* [[Template:Hero infobox/layout]] [[Template:Hero ability table/row/layout]] */
(function(mw) {
	'use strict';

	var hero, ele, $content;

	function parseConstants( constantsList ) {
		var constants = {},
			constantsLines = constantsList.split( '\n' );

		for ( var i = 0; i < constantsLines.length; ++i ) {
			var constantParts = constantsLines[i].split( ',' );
			if ( constantParts.length > 2 ) {
				constants[constantParts[0].split( ';' )[0]] = constantParts[1];
			}
		}
		return constants;
	}

	function addAbility( id, requiredLevelList, manaCostList, rangeList, constantsList ) {
		if ( !( 'abilities' in hero ) ) hero.abilities = {};

		var ability = {},
			requiredLevels = requiredLevelList.split( ',' ),
			manaCosts = manaCostList.split( ',' ),
			ranges = rangeList.split( ',' ),
			constants = constantsList.split( '\n\n' );

		for ( var i = 0; i < requiredLevels.length; ++i ) {
			ability[requiredLevels[i]] = {
				manaCost : ( i < manaCosts.length ? manaCosts[i] : 'missing' ),
				range : ( i < ranges.length ? ranges[i] : 'missing' ),
				constants : ( i < constants.length ? parseConstants( constants[i] ) : {} )
			};
		}
		hero.abilities[id] = ability;
	}

	function updateAbilities( level ) {
		if ( !('abilities' in hero) ) return;

		var ability, descSpan, shortDescSpan, achievedAbility, achievedLevel;

		for ( var id in hero.abilities ) {
			if (!hero.abilities.hasOwnProperty(id)) continue;
			ability = hero.abilities[id];
			achievedLevel = 0;
			for (var requiredLevel in ability ) {
				if (ability.hasOwnProperty(requiredLevel) && requiredLevel <= level) {
					achievedLevel = Math.max( achievedLevel, requiredLevel );
				}
			}
			shortDescSpan = $content.find('#' + id + '-short')[0];
			descSpan = $content.find('#' + id)[0];
			if ( achievedLevel > 0 ) {
				achievedAbility = ability[achievedLevel];
				$content.find('#' + id + '-manacost')[0].textContent = achievedAbility.manaCost ;
				$content.find('#' + id + '-range')[0].textContent = achievedAbility.range ;
				for ( var constant in achievedAbility.constants ) {
					if (!achievedAbility.constants.hasOwnProperty(constant)) continue;
					console.log(achievedAbility.constants[constant]);
					shortDescSpan.find( '.strife-formatted-' + constant ).html( achievedAbility.constants[constant] );
					descSpan.find( '.strife-formatted-' + constant ).html( achievedAbility.constants[constant] );
				}
			}
		}
	}

	function updateStats(e) {
		var level = e.target.value,
			data = hero.level[level];
		ele.level.textContent = 'Level ' + level;
		if ( data.attackdamagemin && data.attackdamagemax ) {
			if ( data.attackdamagemin !== data.attackdamagemax ) {
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
			if ( parseInt( ele.textContent, 10 ) === level ) {
				ele.classList.add( 'current' );
			} else {
				ele.classList.remove( 'current' );
			}
		});

		updateAbilities( level );
	}

	mw.hook('wikipage.content').add(function(content) {
		$content = content;
		var main = $content.find('#hero_infobox_slider:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		var minLevel = 0,
			maxLevel = 0;
		ele = {
			armor: $content.find('#heroslider-armor')[0] || {},
			attackdamage: $content.find('#heroslider-attackdamage')[0] || {},
			healthregen: $content.find('#heroslider-healthregen')[0] || {},
			level: $content.find('#heroslider-level')[0] || {},
			magicarmor: $content.find('#heroslider-magicarmor')[0] || {},
			maxhealth: $content.find('#heroslider-maxhealth')[0] || {},
			
			herostatstable: $content.find('#herostatstable')[0]
		};

		hero = JSON.parse( '{"level":{' + main.textContent.replaceAll(':,', ':\"\",') + '}}' );
		var levels = Object.keys( hero.level );
		if ( levels.length > 0 ) {
			minLevel = parseInt( levels[0], 10 );
			maxLevel = parseInt( levels[levels.length - 1], 10 );
			$content.find('#heroslider-level')[0].textContent = 'Level ' + maxLevel;
			var sliderOuter = $content.find('#heroslider-outer')[0];
			var slider = document.createElement('input');
			slider.id = 'heroslider';
			slider.type = 'range';
			sliderOuter.appendChild(slider);
			slider.min = minLevel;
			slider.max = maxLevel;
			slider.value = maxLevel;
			slider.addEventListener('input', updateStats);
		}

		var stats = $content.find('#hero_infobox_slider_stats')[0];
		if (stats) {
			var statsData = stats.dataset;
    		addAbility( statsData.id, statsData.requiredlevels, statsData.manacost, statsData.range, statsData.constants );
		}
	});
})(window.mediaWiki);