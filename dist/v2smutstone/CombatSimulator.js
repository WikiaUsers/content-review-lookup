$(document).ready(function(){
	console.log('Check if page is the CombatSimulator');
	if(mw.config.values.wgPageName!='Combat_Simulator'){return 0;}
	console.log('Page is CombatSimulator');
	
	'use strict';
	
	// CONFIGURATION

	/**
	 * URL location of the game webpack content, which is used if the executeSmutstoneConfJs(webpackJsonp) 
	 * function in Smutstone.conf.js is not available.
	 */
	// const confJsUrl = 'https://cdn.smutstone.com/s2/f1b9b009.conf.js';
	const confJsUrl = $('#smutstoneConfJs a').prop('href');

    // GLOBALS
    
    /** The webpack content of the game. */
    var webpack;

    // HTML
    
    document.getElementById('combatSimulator').innerHTML =
        '<label for="userData">userData from the game:</label><br/>\n' +
        '<textarea id="userData" rows="5" cols="80">Copy userData from the game here (Ctrl+U, select all, copy, paste).\n' +
        '\n' +
        'For instance:\n' +
        'var userData = JSON.parse(\'{"hero":{"exp":1222890,"cardGame":{"decks":[{},{"cardIds":[209744677,209672394,209842509,209695022,212557683,210765560,210847135]}],"cards":[{"_name":"Amazon","id":209842509,"cardId":52,"level":15,"dupes":82,"stones":[24,24],"sbl":0,"evolution":{"currentStage":6},"aid":29,"initialHp":2570},{"_name":"Bone Walker","id":210847135,"cardId":143,"level":17,"dupes":0,"stones":[33,33],"sbl":0,"evolution":{"currentStage":6},"initialHp":2339},{"_name":"Dark Twins","id":210765560,"cardId":151,"level":18,"dupes":65,"stones":[43,43],"sbl":1,"evolution":{"currentStage":4},"aid":34,"initialHp":1521},{"_name":"Fairy","id":209744677,"cardId":42,"level":13,"dupes":0,"stones":[24,24],"sbl":3,"evolution":{"currentStage":6},"aid":32,"initialHp":2231},{"_name":"Geomancer","id":209695022,"cardId":147,"level":14,"dupes":339,"stones":[24],"sbl":1,"evolution":{"currentStage":9},"aid":30,"initialHp":1685},{"_name":"Oglodi","id":212557683,"cardId":152,"level":15,"dupes":58,"stones":[24,24],"sbl":1,"evolution":{"currentStage":5},"initialHp":1683},{"_name":"Snow Queen","id":209672394,"cardId":26,"level":10,"dupes":52,"stones":[24],"sbl":3,"evolution":{"currentStage":9},"aid":31,"initialHp":2086}]},"artifacts":{"items":[{"id":28,"stages":{"currentStage":0},"dupes":2,"cardId":447},{"id":29,"stages":{"currentStage":0},"dupes":1,"cardId":52},{"id":30,"stages":{"currentStage":0},"dupes":2,"cardId":147},{"id":31,"stages":{"currentStage":1},"dupes":0,"cardId":26},{"id":32,"stages":{"currentStage":1},"dupes":0,"cardId":42},{"id":34,"stages":{"currentStage":2},"dupes":1,"cardId":151},{"id":36,"stages":{"currentStage":0},"dupes":3,"cardId":0}]}}}\');\n' +
        '</textarea><br/>\n' +
        '\n' +
        '<select id="selectDeck">\n' +
        '  <option selected="true" disabled>Choose deck</option>\n' +
        '</select>\n' +
        '<select id="selectLocation">\n' +
        '  <option selected="true" disabled>Choose location</option>\n' +
        '</select>\n' +
        '<select id="selectMission">\n' +
        '  <option selected="true" disabled>Choose mission</option>\n' +
        '</select>\n' +
        '<button id="combat">Combat</button>\n' +
        '<br/>\n' +
        '<div id="hero"><label for="deckHero">Hero:</label><div id="deckHero"></div></div>\n' +
        '<div id="enemy"><label for="deckHero">Enemy:</label><div id="deckEnemy"></div><div class="desc">Description</div></div>\n' +
        '<div id="bestArtifactPanel">\n' +
        '<button id="bestArtifactDistribution">Optimize artifacts</button>\n' +
        '<div id="progress">0%</div>\n' +
        '<button id="cancel">Cancel</button>\n' +
        '</div>\n' +
        '<label for="output">Output:</label><br/>\n' +
        '<textarea readonly id="output" rows="26" cols="80">\n' +
        '</textarea><br/>\n' +
        '<label for="supportedEffects">List of artifacts and effects:</label>\n' +
        '<select id="supportedEffects">\n' +
        '  <option selected="true">Supported </option>\n' +
        '</select>\n' +
        '<select id="unsupportedEffects">\n' +
        '  <option selected="true">Unsupported</option>\n' +
        '</select>\n' +
        '<input id="test" type="checkbox">Debug</input>\n' +
        '<input id="darkTheme" type="checkbox">Dark</input>\n';

	function enableDarkTheme(enabled) {
		if (enabled) {
			$('.combatSimulator').addClass('darkTheme');
		} else {
			$('.combatSimulator').removeClass('darkTheme');
		}
	}

	function parseUserData(text) {
	    console.log('CombatSimulator: parseUserData', text);
		const line = text.split('\n').find(function(s) { return s.includes('var userData ='); });
	    var userData;
	    eval(line);
	    console.log('CombatSimulator: userData', userData);
		return userData;
	}

	function populateDecks(user, options) {
		const dropdown = $('#selectDeck');
		dropdown.empty();
		dropdown.append('<option selected="true" disabled>Choose deck</option>');
		dropdown.prop('selectedIndex', 0);
		const battleCards = user.hero.cardGame.cards.map(function(cardInstance) {
			const noCsetCounts = {};
			console.log('cardInstance ' + JSON.stringify(cardInstance));
			return new BattleCard(cardInstance, noCsetCounts, options);
		});
		// Deck #1 to #3
	    user.hero.cardGame.decks.forEach(function(deckWrapper, deckIndex) {
	    	if (deckWrapper.cardIds) {
		    	const deck = battleCards
		    		.filter(function(c) { return deckWrapper.cardIds.includes(c.id) })
		    		.sort(function(a, b) { return b.attack * b.hp - a.attack * a.hp })
		    		.map(function(c) { return c.id });
		    	const name = 'Deck #' + (deckIndex + 1);
			    dropdown.append($('<option></option>').attr('value', JSON.stringify(deck)).text(name));
	    	}
	    });
	    // PNF decks
	    [1, 2, 3].forEach(function(cset) {
	    	const deck = battleCards
	    		.filter(function(c) { return c.cset == cset })
	    		.sort(function(a, b) { return b.attack * b.hp - a.attack * a.hp })
	    		.map(function(c) { return c.id });
	    	if (deck.length > 0) {
		    	const name = webpack.cardSets.find(function(cardSet){ return cardSet.id == cset }).name;
		    	console.log('deck ' + name, deck);
			    dropdown.append($('<option></option>').attr('value', JSON.stringify(deck)).text(name));
	    	}
	    });
	    // Strongest single color decks
	    [1, 2, 3, 4, 5].forEach(function(color) {
	    	const deck = battleCards
	    		.filter(function(c) { return c.color == color })
	    		.sort(function(a, b) { return b.attack * b.hp - a.attack * a.hp })
	    		.slice(0, 7)
	    		.map(function(c) { return c.id });
	    	if (deck.length > 0) {
		    	const name = 'Strongest ' + Webpack.elementText[color];
		    	console.log('deck ' + name, deck);
			    dropdown.append($('<option></option>').attr('value', JSON.stringify(deck)).text(name));
	    	}
	    });
	}

    function populateLocations() {
		const dropdown = $('#selectLocation');
	    webpack.allLocations.forEach(function(location, locationIndex) {
		    dropdown.append($('<option></option>').attr('value', locationIndex).text(location.name));
	    });
    }

    function populateMissions(locationIndex) {
		const dropdown = $('#selectMission');
		dropdown.empty();
		dropdown.append('<option selected="true" disabled>Choose mission</option>');
		dropdown.prop('selectedIndex', 0);
		const location = webpack.allLocations[locationIndex];
	    console.log('CombatSimulator: location', location);
	    console.log('CombatSimulator: missions', location.missions);
	    for (var missionIndex in location.missions) {
	    	const mission = location.missions[missionIndex];
	    	const value = JSON.stringify({ locationIndex: locationIndex, missionIndex: missionIndex });
		    dropdown.append($('<option></option>').attr('value', value).text(mission.displayName));
	    }
    }

    function populateSupportedEffects() {
    	const appendDivider = function(dropdown) {
	    	dropdown.append($('<option disabled="disabled"></option>').text('---------------'));
    	};
    	const appendTitle = function(dropdown, title) {
    		appendDivider(dropdown);
	    	dropdown.append($('<option disabled="disabled"></option>').text(title));
    		appendDivider(dropdown);
    	};
    	appendTitle($('#supportedEffects'), 'Artifacts');
    	Object.values(webpack.artifacts)
    		.filter(function(a) { return a.effect.id in cardEffects })
    		.map(function(a) { return a.name })
    		.sort()
    		.forEach(function(name) { $('#supportedEffects').append($('<option></option>').text(name)) });
    	appendTitle($('#supportedEffects'), 'Effects');
    	Object.values(webpack.cardEffects)
    		.filter(function(e) { return e.id in cardEffects })
    		.map(function(e) { return e.name })
    		.sort()
    		.forEach(function(name) { $('#supportedEffects').append($('<option></option>').text(name)) });

    	appendTitle($('#unsupportedEffects'), 'Artifacts');
    	Object.values(webpack.artifacts)
    		.filter(function(a) { return !(a.effect.id in cardEffects) })
    		.map(function(a) { return a.name })
    		.sort()
    		.forEach(function(name) { $('#unsupportedEffects').append($('<option></option>').text(name)) });
    	appendTitle($('#unsupportedEffects'), 'Effects');
    	Object.values(webpack.cardEffects)
    		.filter(function(e) { return !(e.id in cardEffects) })
    		.map(function(e) { return e.name })
    		.sort()
    		.forEach(function(name) { $('#unsupportedEffects').append($('<option></option>').text(name)) });
    }
    
     function showPlayerShort(player, id) {
     	$(id).empty();
		if (!player) return;

    	function addGirl(parent, c) {
    		const items = [c.name, Webpack.rarityText[c.rarity], Webpack.colorText[c.color]];
			parent.append($('<div/>').addClass('card').addClass(['', 'fire', 'earth', 'ice', 'light', 'dark'][c.color])
				.append($('<img/>', { src: 'https://cdn.smutstone.com/s2/' + c.icons._1x, title: items.join('\n') }))
			);
			return parent;
    	}
    	function addEffect(parent, c) {
    		if (!c.effect) return parent;
    		const items = [];
    		var type = 'effect';
    		var color = 0;
    		var costToRemove = undefined;
    		if (c.artifact) {
    			items.push(c.artifact.name + ' ' + c.artifact.level);
    			type = 'artifact'
    			color = (c.artifact.color || 0);
    			costToRemove = c.artifact.removeCost[c.artifact.stages.currentStage].gold
    		}
    		items.push(c.effect.name + ' (' + c.effect.id + ')')
    		var info = c.effect.info
	        for (const key in c.effect) {
    		    if (info.includes(key + 'PC')) {
                	info = info.replace(new RegExp('\{'  + key + 'PC\}', 'g'), Math.floor(c.effect[key] * 100))
            	}
			}
			items.push(info)
			if (c.effect.events) {
				items.push('Events: ' + JSON.stringify(c.effect.events))
			}
			if (costToRemove) {
				items.push('Cost to remove: ' + costToRemove + ' gold')
			}
			parent.append($('<div/>').addClass(type).addClass(['', 'fire', 'earth', 'ice', 'light', 'dark'][color])
				.append($('<img/>', { src: 'https://cdn.smutstone.com/s2/' + c.effect.icons._1x, title: items.join('\n') })));
    		return parent;
    	}
    	
    	const ul = $('<ul/>')
    	$(id).append(ul);
		player.library.forEach(function(c) {
			const li = $('<li/>');
			addGirl(li, c);
			addEffect(li, c);
			ul.append(li);
		});
    }
   
	function showMissionDescription(mission) {
		$('#enemy .desc').empty();
		if (!mission) return;
		
		const items = [];
		items.push(mission.displayName);
		items.push('Cost: ' + Object.keys(mission.cost || {}).map(function(k) {
			return mission.cost[k] + ' ' + k;
		}).join(', '))
		items.push('Awarded resources: ' + Object.keys(mission.rewards_data.win[0].r || {}).map(function(k) {
			return mission.rewards_data.win[0].r[k] + ' ' + k;
		}).join(', '))
		const fullWin = Object.assign({}, mission.rewards_data.win[0].r || {});
		mission.rewards_data.stars.forEach(function(star) {
			Object.keys(star.r || {}).map(function(k) {
				fullWin[k] = (fullWin[k] || 0) + star.r[k]
			});
		});
		items.push('Awarded resources for first 3 star win: ' + Object.keys(fullWin).map(function(k) {
			return fullWin[k] + ' ' + k;
		}).join(', '))
		
		$('#enemy .desc').html(items.join('<br/>\n'));
	}
   
    function update() {
    	// Get selections
    	const user = parseUserData($('#userData').val());
    	const deckName = $('#selectDeck option:selected').text();
    	const selectDeckVal = $('#selectDeck').val();
    	console.log('selectDeckVal', selectDeckVal);
    	const cardInstanceIds = JSON.parse($('#selectDeck').val());
    	const missionId = JSON.parse($('#selectMission').val());
    	const options = {};
     	options.test = $("#test").is(":checked");
    	options.verbose = options.test;
   	
    	console.log('user', user);
    	console.log('cardInstanceIds', cardInstanceIds);
    	console.log('missionId', missionId);

		var outputItems = []
		if (webpack.eventTag) {
	    	console.log('CombatSimulator: eventTag=' + webpack.eventTag, webpack.currentEvent);
			outputItems.push("Event '" + webpack.currentEvent.name + "'")
		}
		var hero
		if (cardInstanceIds) {
	    	hero = BattlePlayer.createHero(user, deckName, cardInstanceIds, options);
	    	console.log('CombatSimulator: hero', hero);
			outputItems.push('Hero ' + hero.toString());
		}
		showPlayerShort(hero, '#deckHero');
		var mission
		if (missionId) {
			mission = webpack.allLocations[missionId.locationIndex].missions[missionId.missionIndex];
			console.log('mission', mission);
	    	const enemy = BattlePlayer.createMissionEnemy(mission, options);
    		console.log('CombatSimulator: enemy', enemy);
    		outputItems.push('Enemy ' + enemy.toString())
			showPlayerShort(enemy, '#deckEnemy');
		}
		showMissionDescription(mission);
       	$('#output').text(outputItems.join('\n\n'));
    }

    // GAME RESOURCES

    function Webpack() {
    	this.index = {
		    artifacts: undefined,
		    battleEffects: undefined,
		    cardEffects: undefined,
		    cardSets: undefined,
		    cards: undefined,
		    dungeon: undefined,
            journey: undefined,
		    specialEvent: undefined,
		    story: undefined,
		};
    }

	Webpack.colorText = ['Colorless', 'Red', 'Green', 'Blue', 'White', 'Black' ];
	Webpack.elementText = ['Colorless', 'Fire', 'Earth', 'Water', 'Light', 'Dark' ];
	Webpack.rarityText = ['No rarity', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic' ];
 
    Webpack.prototype.load = function(resolve) {
        const url = confJsUrl;
        console.log('CombatSimulator: load webpackJsonp from ' + url);
        var resourceContent;
        window.webpackJsonp = function (r, resource, a) {
        	console.log('CombatSimulator: webpackJsonp', resource);
            resourceContent = resource;
        };
        const script = document.createElement('script');
        document.body.appendChild(script);
        const thisWebpack = this;
        script.onload = function() {
        	console.log('CombatSimulator: loaded ' + url);
        	thisWebpack.unpack(resourceContent);
        	resolve();
        };
        script.onerror = function() {
        	console.error('CombatSimulator: failed to load ' + url);
        	$('#output').text('CombatSimulator: failed to load ' + url);
        };
        script.async = true;
        script.src = url;
    };
    
    Webpack.prototype.init = function(resolve, executeConfJs) {
        console.log('CombatSimulator: load webpackJsonp from local copy');
        var resourceContent;
        executeConfJs(function (r, resource, a) {
        	console.log('CombatSimulator: webpackJsonp', resource);
            resourceContent = resource;
        });
		console.log('CombatSimulator: loaded local copy of webpackJsonp');
		this.unpack(resourceContent);
        resolve();
    };
    
    Webpack.prototype.unpack = function(resourceContent) {
	    const unpackExport = function(packFunction) {
	        var e = {};
	        packFunction(e, {}, function(i) {
		        if (i == 2) {
		            return { _tr: function(s) { return s } };
		        }
		        return unpackExport(resourceContent[i]);
	        });
	        return e.exports;
	    };
		const webpackIndex = unpackExport(resourceContent[14]);
		for (const key in this.index) {
		    const value = webpackIndex.get(key);
		    this[key] = value;
		}
		console.log('this webpack', this);
		this.allLocations = this.getAllLocations();
		this.currentEvent = this.findEvent();
		this.eventTag = this.currentEvent ? Object.keys(this.currentEvent.buffCards)[0] : undefined
    }

	Webpack.prototype.getAllLocations = function() {   
		function decorateMission(location, mission) {
    		mission.displayName = location.name.toString().trim() + ' ' + mission.name.toString().trim();
		    if (location.name === 'Journey') {
		        mission.displayName = mission.name.toString().trim()
		    }
    		if (!mission.enemy) {
    			// The 'enemy' was renamed to 'enemy_data'.
    			// However, this was not done everywhere, so map it back to 'enemy' for the time being.
    			mission.enemy = mission.enemy_data
    			mission.enemy.cardGame = {
	                cards: mission.enemy_data.cardGame.cards.map(function(val) {
	                    return { id: val[0], cardId: val[1], level: val[2], evolution: { currentStage: val[3] }, stones: val[4] }
	                })
	            }
    		}
    		if (mission.enemy._hp) {
    			mission.displayName += ' boss'
    		}
		}
		
	    console.log('CombatSimulator: locations', this.story.locations);
	    console.log('CombatSimulator: dungeons', this.dungeon);
	    const allLocations = this.story.locations.map(function(location) {
	    	location.missions.forEach(function(mission) {
	    		decorateMission(location, mission);
	    	});
	    	return location;
	    });
	    this.dungeon.forEach(function(dungeon) {
	    	allLocations.push(Webpack.convertDungeon(dungeon));
	    });
	    Object.values(this.journey).forEach(function(location, locationIndex) {
	    	location.missions.forEach(function(mission) {
	    		decorateMission(location, mission);
	    	});
	    	location.name += ' ' + String.fromCharCode(65 + locationIndex);
	    	allLocations.push(location);
	    });
	    console.log('CombatSimulator: allLocations', allLocations);
	    return allLocations;
	}
	
    Webpack.convertDungeon = function(dungeon) {
    	const location = Object.assign({}, dungeon)
    	location.missions = dungeon.missions.map(function(dungeonMission, missionNr) {
    	    const name = dungeon.name + ' ' + (missionNr + 1)
		    const exp = dungeonMission[0]
		    return {
		        displayName: name,
		        name: name,
		        enemy: {
		        	exp: exp,
		            cardGame: {
		                cards: dungeonMission[2].map(function(val) {
		                    return { id: val[0], cardId: val[1], level: val[2], evolution: { currentStage: val[3] }, stones: val[4] }
		                })
		            }
		        },
		        enemy_cards: dungeonMission[2].map(function(val) { return val[1] }),
		        rewards_data: dungeonMission[1]
		    }
    	})
    	return location
    }
    
    Webpack.prototype.findEvent = function() {
    	const locations = this.story.locations
    	return this.specialEvent.find(function (event) {
	    	return locations.find(function(location) { return location.id == event.locationId })
    	})
    }

    // COMBAT SIMULATOR
    
    function BattleCard(cardInstance, csetCounts, options) {
        Object.assign(this, webpack.cards.find(function(stats) { return stats.cardId === cardInstance.cardId; }), cardInstance);
        this.stars = (this.evolution && this.evolution.currentStage) ? this.evolution.currentStage + 1 : 1;
        this.level = this.level || 1;
        const stoneBonuses = (this.stones || []).map(function(stoneId) {
        	return [10, 25, 40, 70, 100, 130, 180, 220, 270, 350][(stoneId - 1) % 10];
        });
        this.stoneBonus = stoneBonuses.reduce(function(acc, cur) { return acc + cur; }, 0);
        this.soulBindBonus = [0, 25, 50, 75, 105, 135, 165, 200, 235, 270, 310, 355, 405][this.sbl || 0];
        this.eventMultiplier = (webpack.eventTag && this.tag == webpack.eventTag) ? 3 : 1
        const bareAttack = Math.ceil(this.baseAttack * (this.stars + 0.15 * this.level)) * this.eventMultiplier;
        const bareHp = 3 * Math.ceil(this.baseHp * (this.stars + 0.15 * this.level)) * this.eventMultiplier;
        const attack = bareAttack + this.stoneBonus + this.soulBindBonus;
        const hp = bareHp + this.stoneBonus + this.soulBindBonus;
        const power = Math.floor((bareAttack + bareHp / 3) / 2) + this.stoneBonus + this.soulBindBonus;
       	this.csetBonus = [0, 0, 0, 0, 0.05, 0.10, 0.25, 0.75][csetCounts[this.cset] || 0];
       	this.attack = attack + Math.floor(attack * this.csetBonus);
       	this.hp = hp + Math.floor(hp * this.csetBonus);
       	this.power = power + Math.floor(power * this.csetBonus);
       	this.initialHp = this.hp
       	
		if (this.effect) {
			const be = webpack.battleEffects[this.effect]
			const ce = webpack.cardEffects[this.effect]
			this.effect = Object.assign({}, be, ce);
			if (be && be.events && ce && ce.events) {
				this.effect.events = Object.assign({}, ce.events, be.events)
			}
	    	if (options.verbose) console.log('this battlecard', this)
		}
		this.equipArtifact(this.aid, options)
    }

	BattleCard.prototype.clone = function() {
        const newBattleCard = Object.assign({}, this)
        Object.setPrototypeOf(newBattleCard, BattleCard.prototype)
        return newBattleCard
	}

	BattleCard.prototype.canEquipArtifact = function(aid) {
		return !this.effect || this.artifact
	}
	
	BattleCard.prototype.equipArtifact = function(aid, options) {
		if (this.artifact) {
			this.aid = undefined
			this.artifact = undefined
			this.effect = undefined
		}
		if (!aid) {
			return
		}
		this.aid = aid
        const bareArtifact = webpack.artifacts[this.aid]
        const artifactStatus = options.user.hero.artifacts.items.find(function(a) { return a.id == aid; })
        var artifactEffect = bareArtifact.effect.effects[0]
        if (artifactStatus.stages.currentStage > 0) {
            artifactEffect = bareArtifact.stages.stages[artifactStatus.stages.currentStage - 1].changes.effects[0]
        }
        this.artifact = Object.assign({}, bareArtifact, artifactStatus);
        this.artifact.level = artifactStatus.stages.currentStage + 1;
        this.artifact.effect = undefined;
        this.effect = Object.assign({}, artifactEffect, bareArtifact.effect);
		if (bareArtifact.effect.events && artifactEffect.events) {
			this.effect.events = Object.assign({}, bareArtifact.effect.events, artifactEffect.events)
		}
    	if (options.verbose) console.log('this battlecard', this)
	}

    function formatWidth(value, width) {
    	return ('                ' + value).slice(-Math.max(value.toString().length, width))
    }

    BattleCard.prototype.toString = function() {
    	const name = (this.name + '               ').slice(0, Math.max(this.name.length, 15))
    	var bonus = formatWidth(this.stars, 2) + '* lv' + formatWidth(this.level, 2)
    	if (this.eventMultiplier > 1) {
    		bonus += ' x' + this.eventMultiplier
    	} else {
    		bonus += '   '
    	}
    	bonus += ' ◊' + formatWidth(this.stoneBonus,3) + ' ⛓' + formatWidth(this.soulBindBonus, 2)
    	if (this.csetBonus) {
    		bonus += ' ' + formatAsPercentage(this.csetBonus) 
    	}
    	bonus = (bonus + '               ').slice(0, Math.max(bonus.length, 25))
        var str = name + ' ' +  bonus + ' ' + this.attack + '/' + this.hp;
        if (this.artifact) {
        	str += ' ' + this.artifact.name + ' ' + this.artifact.level
        } else  if (this.effect) {
        	str += ' ' + this.effect.name;
        }
        return str;
    };

    function BattlePlayer(name, hp, deck, options) {
        this.name = name;
        this.hp = hp;
        this.deck = deck;
        this.options = options;
        this.librarySize = options.librarySize || 7;
        this.unlimitedLibrary = options.unlimitedLibrary;
        const csetCounts = {}
        for (const cardIndex in deck) {
        	const cardInstance = deck[cardIndex];
        	if (options.verbose) console.log('cardInstance', cardInstance)
        	const cardStats = webpack.cards.find(function(c) { return c.cardId == cardInstance.cardId; })
        	if (cardStats.cset) {
        		csetCounts[cardStats.cset] = (csetCounts[cardStats.cset] || 0) + 1;
        	}
        }
        this.csetCounts = csetCounts;
		// Status
        this.table = [null, null, null];
        this.library = deck.slice(0, this.librarySize).map(function(card) { 
        	return new BattleCard(card, csetCounts, options); 
        });
        if (this.verbose) console.log('library', this.library);
        this.damageDealt = 0;
    }
    
    BattlePlayer.getLevelFromExp = function(exp) {
        return -1 * Math.floor(Math.log(300 / (360 + exp)) / Math.log(1.2)) - 1;
    };
    BattlePlayer.getHpFromLevel = function(level) {
        return Math.floor(level * level / 2 + 5 * level + 200);
    };
    BattlePlayer.getHpFromExp = function(exp) {
        return BattlePlayer.getHpFromLevel(BattlePlayer.getLevelFromExp(exp));
    };

    BattlePlayer.createMissionEnemy = function(mission, options) {
	    mission.hp = BattlePlayer.getHpFromExp(mission.enemy.exp)
	    if (mission.enemy._hp) {
		    // Boss event
		    console.log('mission ' + mission.displayName + ' is boss event')
	        mission.hp = mission.enemy._hp
	        mission.unlimitedLibrary = true
	    }
	    const extendedOptions = Object.assign({}, options)
        extendedOptions.librarySize = mission.enemy_cards ? mission.enemy_cards.length : 7;
	    extendedOptions.unlimitedLibrary = mission.unlimitedLibrary
		return new BattlePlayer(mission.displayName, mission.hp, mission.enemy.cardGame.cards, extendedOptions);
    }

    BattlePlayer.createHero = function(user, deckName, cardInstanceIds, options) {
        const deck = cardInstanceIds.map(function(instanceId) {
            return user.hero.cardGame.cards.find(function(cardInstance) { return cardInstance.id === instanceId; });
        })
	    const extendedOptions = Object.assign({}, options)
	    extendedOptions.user = user
        return new BattlePlayer(deckName, BattlePlayer.getHpFromExp(user.hero.exp), deck, extendedOptions)
    }

    BattlePlayer.prototype.clone = function() {
        const newBattlePlayer = Object.assign({}, this)
        newBattlePlayer.table = this.table.map(function(c) { return c ? c.clone() : null; })
        newBattlePlayer.library = this.library.map(function(c) { return c.clone(); })
        Object.setPrototypeOf(newBattlePlayer, BattlePlayer.prototype)
        return newBattlePlayer
    }

    BattlePlayer.prototype.liveCards = function() {
        return this.table.filter(function(card) { return card && card.hp > 0 }).length
        	 + this.library.length
    }

    BattlePlayer.prototype.fillTable = function(emitter) {
        for (var i = 0; i < this.table.length; ++i) {
            if ((!this.table[i] || (this.table[i].hp <= 0)) && (this.library.length > 0)) {
                const card = this.library.shift()
                if (this.unlimitedLibrary) {
                    this.library.push(card.clone())
                }
                if (card.effect) {
	                card.seqNr = emitter.sequenceGenerator.getSeqNr()
	                if (!(card.effect.id in cardEffects)) {
						if (this.options.warnedUnsupportedEffects && !(card.effect.id in this.options.warnedUnsupportedEffects)) {
							console.warn('CombatSimulator: ' + card.effect.id + ' not supported')
							this.options.warnedUnsupportedEffects[card.effect.id] = true
						}
	                } else {
	                    for (const event in cardEffects[card.effect.id]) {
	                    	const cardEvent = Battle.getCardEvent(event, card)
	                    	if (event === 'afterCardsAppeared') {
		                        emitter.once(cardEvent, cardEffects[card.effect.id][event])
	                    	} else {
		                        emitter.on(cardEvent, cardEffects[card.effect.id][event])
	                    	}
	                    }
	                }
                }
                this.table[i] = card
            }
        }
    }

	BattlePlayer.prototype.toString = function() {
		var tableStr
		if (this.table[0] !== null) {
			tableStr = this.table.map(function(c) { return c.toString(); }).join('\n');
		}
		const libraryStr = this.library.map(function(c) { return c.toString(); }).join('\n');
        var str = "'" + this.name + "'" + ' hp=' + this.hp + '\n';
        if (tableStr) {
        	str += 'Table:\n' + tableStr + '\nLibrary:\n'
        }
        str += libraryStr;
        return str;
    }

    function SequenceGenerator() {
    	this.seqNr = 0
    }
    
    SequenceGenerator.prototype.getSeqNr = function() {
    	return ++this.seqNr
    }
    
	function Emitter(options) {
		this.options = options
		// Status
		this.sequenceGenerator = new SequenceGenerator()
		this.handlers = {}
		this.onceEvents = {}
		this.unsupported = {}
	}
	
	Emitter.prototype.on = function(event, callback) {
		if (this.options.verbose) console.log('on event=' + event, callback)
		this.handlers[event] = callback
	}

	Emitter.prototype.once = function(event, callback) {
		if (this.options.verbose) console.log('once event=' + event, callback)
		this.handlers[event] = callback
		this.onceEvents[event] = true
	}

	Emitter.prototype.emit = function(event, obj) {
		if (event in this.handlers) {
			if (this.options.verbose) console.log('emit event=' + event, obj)
			this.handlers[event](obj)
			if (event in this.onceEvents) {
				delete this.handlers[event]
				delete this.onceEvents[event]
			}
		}
	}
	
	function BattleEvent(attackingPlayer, defendingPlayer, tableIndex, battle) {
        this.attackingPlayer = attackingPlayer
        this.defendingPlayer = defendingPlayer
        this.tableIndex = tableIndex
        this.battle = battle
        this.attacker = attackingPlayer.table[tableIndex]
        this.defender = defendingPlayer.table[tableIndex]
        this.effect = attackingPlayer.table[tableIndex].effect
		this.attackingTable = attackingPlayer.table
		this.defendingTable = defendingPlayer.table
		this.verbose = this.battle.verbose
	}
    
    function Battle(hero, enemy, options) {
        this.hero = hero
        this.enemy = enemy
        this.verbose = options.verbose
        this.emitter = new Emitter(options)
        this.cardSequenceGenerator = new SequenceGenerator()
        
        this.fillTable()
        while ((hero.hp > 0) && (enemy.hp > 0) && (hero.liveCards() > 0) && (enemy.liveCards() > 0)) {
            this.exchangeRound()
            this.fillTable()
        }
        if (this.verbose) console.log('Battle result hero.hp=' + hero.hp + ' live=' + hero.liveCards() + ' dmgDealt=' + hero.damageDealt)
        this.result = {
            win: (hero.hp > 0) && (hero.liveCards() > 0) ? 1 : 0,
            stars: Math.min(3, (hero.hp > 0) ? hero.liveCards() : 0),
            damage: hero.damageDealt
        }
    }
    
    Battle.prototype.getCardSeqNr = function() {
    	this.cardSeqNr = (this.cardSeqNr || 0) + 1
    	return this.cardSeqNr
    }

    Battle.prototype.fillTable = function() {
        if (this.verbose) console.log('fillTable hero=' + this.hero.toString() + '\n' + 'enemy=' + this.enemy.toString())
        this.hero.fillTable(this.emitter)
        this.enemy.fillTable(this.emitter)
        for (var tableIndex = 0; tableIndex < this.hero.table.length; ++tableIndex) {
            this.applySlotEffect('afterCardsAppeared', tableIndex)
        }
    }

    Battle.prototype.exchangeRound = function() {
        if (this.verbose) console.log('exchangeRound')
        this.applyAfterRoundStart();
        for (var tableIndex = 0; tableIndex < this.hero.table.length; ++tableIndex) {
            if (this.hero.hp > 0 && this.enemy.hp > 0) {
                this.applySlotEffect('beforeHit', tableIndex)
                this.exchangeSlotHit(tableIndex)
                this.applySlotEffect('afterHit', tableIndex)
            }
        }
        this.applyRoundEnd();
    }
    
    Battle.prototype.applyAfterRoundStart = function() {
        for (var tableIndex = 0; tableIndex < this.hero.table.length; ++tableIndex) {
            this.applySlotEffect('afterRoundStart', tableIndex)
        }
    }

    Battle.prototype.applySlotEffect = function(event, tableIndex) {
    	this.applyCardEffect(event, this.hero, this.enemy, tableIndex)
    	this.applyCardEffect(event, this.enemy, this.hero, tableIndex)
    }

    Battle.prototype.applyRoundEnd = function() {
        for (var tableIndex = 0; tableIndex < this.hero.table.length; ++tableIndex) {
        	delete this.hero.table[tableIndex].frozenChance;
        	delete this.enemy.table[tableIndex].frozenChance;
        }
    }

	Battle.getCardEvent = function(event, card) {
		return event + '-' + card.name + '-' + card.seqNr
	}

    Battle.prototype.applyCardEffect = function(event, attackingPlayer, defendingPlayer, tableIndex) {
    	const attackingCard = attackingPlayer.table[tableIndex]
        if (attackingCard.hp > 0) {
        	const cardEvent = Battle.getCardEvent(event, attackingCard)
            this.emitter.emit(cardEvent, new BattleEvent(attackingPlayer, defendingPlayer, tableIndex, this))
        }
    }

	Battle.prototype.exchangeSlotHit = function(tableIndex) {
        const heroCard = this.hero.table[tableIndex]
        const enemyCard = this.enemy.table[tableIndex]
        if (heroCard.hp > 0 && enemyCard.hp > 0) {
            this.doCardToCardHit(this.hero, heroCard, this.enemy, enemyCard)
            this.doCardToCardHit(this.enemy, enemyCard, this.hero, heroCard)
        } else if (heroCard.hp > 0) {
            this.doCardToPlayerHit(this.hero, heroCard, this.enemy)
        } else if (enemyCard.hp > 0) {
            this.doCardToPlayerHit(this.enemy, enemyCard, this.hero)
        }
	}

    Battle.prototype.doCardToCardHit = function(attackingPlayer, attacker, defendingPlayer, defender) {
        var damage = Math.floor(attacker.attack * Battle.getColorAttackMultiplier(attacker, defender))
        if (this.verbose) console.log(attacker.name + ' attacks ' + defender.name + ' for ' + damage + ' damage')
        if (attacker.frozenChance) {
			damage -= Math.floor(damage * attacker.frozenChance)        	
            if (this.verbose) console.log('Frozen ' + attacker.name + ' with chance ' + attacker.frozenChance + ' reduces damage to ' + damage)
        }
        if (attacker.missChance) {
			damage -= Math.floor(damage * attacker.missChance)        	
            if (this.verbose) console.log('Miss chance for ' + attacker.name + ' with chance ' + attacker.missChance + ' reduces damage to ' + damage)
        }
        if (defender.dodge) {
        	damage -= Math.floor(damage * defender.dodge)
        	if (this.verbose) console.log('dodge ' + defender.dodge + ' reduces damage to ' + defender.name + ' to ' + damage + ' damage')
        }
        if (defender.damageReduction) {
            damage -= Math.floor(damage * defender.damageReduction)
            if (this.verbose) console.log('damage reduction ' + defender.damageReduction + ' reduces damage to ' + defender.name + ' to ' + damage + ' damage')
        }
        defender.hp -= damage
        attackingPlayer.damageDealt += damage
        if (defendingPlayer.unlimitedLibrary) {
            if (this.verbose) console.log('unlimitedLibrary: card to card damage ' + damage + ' to defendingPlayer.hp=' + defendingPlayer.hp)
            defendingPlayer.hp -= damage
        }
    }

    Battle.prototype.doCardToPlayerHit = function(attackingPlayer, attacker, defendingPlayer) {
        const damage = attacker.attack
        if (this.verbose) console.log(attacker.name + ' attacks opponent for ' + damage + ' damage')
        if (attacker.frozenChance) {
			damage -= Math.floor(damage * attacker.frozenChance)        	
            if (this.verbose) console.log('Frozen ' + attacker.name + ' with chance ' + attacker.frozenChance + ' reduces damage to ' + damage)
        }
        defendingPlayer.hp -= damage
        attackingPlayer.damageDealt += damage
    }

    Battle.getColorAttackMultiplier = function(attacker, defender) {
        if ((attacker.color == 1 && defender.color == 2)
            || (attacker.color == 2 && defender.color == 3)
            || (attacker.color == 3 && defender.color == 1)
            || (attacker.color == 4 && defender.color == 5)
            || (attacker.color == 5 && defender.color == 4)) {
            return 1.5
        }
        return 1
    }
    
    const cardEffects = {
	    "AlliedStrike": { // Verified
            // "Once, hit the opposite card with the combined attack power of all the friendly cards on the field."
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
	            if (!attacker.effectStruck && (defender.hp > 0)) {
                    const damage = battleEvent.attackingTable.reduce(function(acc, cur) { return acc + (cur.hp > 0 ? cur.attack : 0) }, 0)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
	                defender.hp -= damage
                    attacker.effectStruck = true
	            }
	        }
	    },
	    "Backstab": { // Verified
        	// "Before each hit does additional damage to all opposite cards: {powerPC}% HP"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(card) {
	                const damage = Math.floor(card.hp * effect.power)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + card.name)
	                card.hp -= damage
	            })
	        }
	    },
	    "BladeDance": { 
            // "Each turn the card does additional damage of {powerPC}% from it's attack to 
            // each opposite card with {chancePC}% chance."
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(defender) {
                    const damage = Math.floor(attacker.attack * effect.power * effect.chance)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
                    defender.hp -= damage
	            })
	        }
	    },
	    "ChainLight": { // Verified
            // "A bolt deals {powerPC}% AT dmg at the first strike, then jumps to a neighbor. Each jump deals twice less dmg."
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
	            if (defender.hp <= 0) {
	            	return;
	            }
                var damage = Math.floor(attacker.attack * effect.power)
                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
                defender.hp -= damage
                switch (battleEvent.tableIndex) {
                	case 0:
                	case 2:
                		const neighbor = battleEvent.defendingTable[1]; 
                		if (neighbor.hp > 0) {
                			const chainedDamage = Math.floor(damage / 2)
			                if (battleEvent.verbose) console.log(effect.id + ' jumps from the side and inflicts ' + chainedDamage + ' to ' + neighbor.name)
			                neighbor.hp -= chainedDamage
	                		const nextNeighbor = battleEvent.defendingTable[2 - battleEvent.tableIndex]; 
	                		if (nextNeighbor.hp > 0) {
                				const nextChainedDamage = Math.floor(damage / 3)
				                if (battleEvent.verbose) console.log(effect.id + ' jumps again and inflicts ' + nextChainedDamage + ' to ' + nextNeighbor.name)
				                nextNeighbor.hp -= nextChainedDamage
	                		}
                		}
                		break;
                	case 1:
                		const neighbors = [ battleEvent.defendingTable[0], battleEvent.defendingTable[2]]
                		damage /= 4;
                		neighbors.forEach(function(neighbor) {
                			if (neighbor.hp > 0) {
				                if (battleEvent.verbose) console.log(effect.id + ' jumps from the middle and inflicts ' + damage + ' to ' + neighbor.name)
				                neighbor.hp -= damage
                			}
                		})
                		break;
                }
	        }
	    },
	    "Chilling": { // Verified
            // "Decrease the attack of all rival cards by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(defender) {
                    defender.attack -= Math.floor(defender.attack * effect.power)
                    if (battleEvent.verbose) console.log(effect.id + ' reduces attack of ' + defender.name + ' to ' +  defender.attack)
	            })
	        }
	    },
	    "Curse": { // Verified
            // "Decrease the attack of the rival card by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const defender = battleEvent.defender
	            if (defender.hp > 0) {
                    defender.attack -= Math.floor(defender.attack * effect.power)
                    if (battleEvent.verbose) console.log(effect.id + ' reduces attack of ' + defender.name + ' to ' +  defender.attack)
	            }
	        }
	    },
	    "DiscovererStrike": {
	        // "As soon as the card appears on a battlefield, it strikes the opposite one with {powerPC}% of attack."
	        'afterCardsAppeared': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
	            if (defender.hp > 0) {
	                const damage = Math.floor(attacker.attack * effect.power)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
	                defender.hp -= damage
	            }
	        }
	    },
	    "Fearblow": { // Verified
            // "Before each blow does additional damage: {powerPC}% of opponent card's HP"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const defender = battleEvent.defender
	            if (defender.hp > 0) {
	                const damage = Math.floor(defender.hp * effect.power)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
	                defender.hp -= damage
	            }
	        }
	    },
	    "Fireball": { // Verified
            // "Throws a fireball that hits all the enemy cards by {powerPC}% of the card's attack"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(defender) {
                    const damage = Math.floor(attacker.attack * effect.power)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + defender.name)
                    defender.hp -= damage
	            })
	        }
	    },
	    "Freeze": {
	        // "Prevent the attack of the rival card for one turn"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
                if (!attacker.effectStruck &&  defender.hp > 0) {
	                if (battleEvent.verbose) console.log(effect.id + ' freezes ' + defender.name)
	                defender.frozenChance = 1.0
	                attacker.effectStruck = true
	            }
	        }
	    },
	    "Frozen": {
	        // "Freezes for a round."
	        // Nothing to do. Handled with 'Freeze', 'MassFreeze', and hard coded handling of 'frozenChance'
	    },
	    "Heal": { // Verified
            // "Heal all own cards by {powerPC}% of their total HP (no more then maximal)"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
                if (!attacker.effectStruck) {
		            battleEvent.attackingTable
		            .filter(function(card) { return card.hp > 0 })
		            .forEach(function(card) {
                        const healHp = Math.min(card.initialHp - card.hp, Math.floor(card.initialHp * effect.power))
                        if (healHp > 0) {
                            if (battleEvent) console.log('Heal ' + card.name + ' by ' + healHp)
                            card.hp += healHp
                            attacker.effectStruck = true
                        }
		            })
                }
	        }
	    },
	    "LuckyDodge": { // Verified
            // "Avoid damage from the strike with {chancePC}% chance."
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            attacker.dodge = effect.chance
	            if (battleEvent.verbose) console.log(effect.id + ' gives dodge ' + attacker.dodge)
	        }
	    },
	    "LuckyStrike": { // Verified
            // "After the main strike, attempts another strike with {chancePC}% chance."
	        'afterHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
	            if (defender.hp > 0) {
	                const damage = Math.floor(attacker.attack * effect.chance)
	                if (battleEvent.verbose) console.log(effect.id + ' strikes again for ' + damage + ' damage to ' + defender.name)
	                defender.hp -= damage
	            }
	        }
	    },
        "MassFreeze": { // Verified
            // "Prevents the attack of all the enemy's cards for one turn with {chancePC}% chance"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(defender) {
	                if (battleEvent.verbose) console.log(effect.id + ' freezes ' + defender.name + ' with chance ' + effect.chance)
	                defender.frozenChance = effect.chance
	                attacker.effectStruck = true
                })
            }
        },
	    "MassRage": { // Verified
            // "Increase the attack of all own cards by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            battleEvent.attackingTable
	            .filter(function(card) { return card.hp > 0; })
	            .forEach(function(attacker) {
                    attacker.attack += Math.floor(attacker.attack * effect.power)
		            if (battleEvent.verbose) console.log(effect.id + ' increases attack of ' + attacker.name + ' to ' + attacker.attack)
	            })
	        }
	    },
	    "MassShield": { // Verified
            // "Decrease any damage to own cards by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            battleEvent.attackingTable
	            .filter(function(card) { return card.hp > 0; })
	            .forEach(function(attacker) {
                    attacker.damageReduction = Math.max(effect.power, attacker.damageReduction || 0)
                    if (battleEvent.verbose) console.log(effect.id + ' gives ' + attacker.name + ' total damage reduction ' +  attacker.damageReduction)
	            })
	        }
	    },
	    "OlympicShield": { // Verified
	    	// "Makes the opposite card to miss its hits with {chancePC}% chance."
	    	'afterRoundStart': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            const defender = battleEvent.defender
	            if (defender.hp > 0) {
	                if (battleEvent.verbose) console.log(effect.id + ' makes ' + defender.name + ' miss with ' + effect.chance + ' chance')
	                defender.missChance = effect.chance
	            }
	    	}
	    },
	    "Rage": { // Verified
            // "Increase the card's attack by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
	            attacker.attack += Math.floor(attacker.attack * effect.power)
	            if (battleEvent.verbose) console.log(effect.id + ' increases attack of ' + attacker.name + ' to ' + attacker.attack)
	        }
	    },
   	    "Retribution": { // Verified
            // "When hit, return {powerPC}% of the opposite card's attack to all the enemy cards."
	        'afterHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const defender = battleEvent.defender // Defender is the one who dealt the damage to us
	            battleEvent.defendingTable
	            .filter(function(card) { return card.hp > 0 })
	            .forEach(function(card) {
                    const damage = Math.floor(defender.attack * effect.power)
	                if (battleEvent.verbose) console.log(effect.id + ' inflicts ' + damage + ' to ' + card.name)
                    card.hp -= damage
	            })
	        }
	    },
	    "Shield": { // Verified
            // "Decrease any damage to self by {powerPC}%"
	        'beforeHit': function(battleEvent) {
	            const effect = battleEvent.effect
	            const attacker = battleEvent.attacker
                attacker.damageReduction = Math.max(effect.power, attacker.damageReduction || 0)
                if (battleEvent.verbose) console.log(effect.id + ' gives ' + attacker.name + ' total damage reduction ' +  attacker.damageReduction)
	        }
	    },
    }

    // SIMULATION STATISTICS

    function recurseCombinationFromDeck(available, selected, hero, enemy, results, options) {
        if (available.length === 0 || selected.length === (options.librarySize || 7)) {
            const heroClone = hero.clone()
            heroClone.library = selected.map(function(c) { return c.clone(); })
            heroClone.options = Object.assign({}, heroClone.options, options)
            const enemyClone = enemy.clone()
            enemyClone.options = Object.assign({}, enemyClone.options, options)
            if (options.verbose) console.log('recurseCombinationFromDeck: Battle')
            const battle = new Battle(heroClone, enemyClone, options)
            results.push(battle.result)
            return
        }
        for (var i = available.length; i-- > 0;) {
            const card = available.shift()
            selected.push(card)
            recurseCombinationFromDeck(available, selected, hero, enemy, results, options)
            selected.pop()
            available.push(card)
        }
    }

    function measureStatistics(hero, enemy, options) {
        if (options.verbose) console.log('measureStatistics')
        options.warnedUnsupportedEffects = {}
        var results = []
    	// TEST
    	if (options.test) {
        	const battle = new Battle(hero.clone(), enemy.clone(), options)
        	results.push(battle.result)
    	} else {
	        recurseCombinationFromDeck(hero.library, [], hero, enemy, results, options)
    	}
        const averageWin = results.reduce(function(acc, cur) { return acc + cur.win; }, 0) / results.length
        const averageDamage = results.reduce(function(acc, cur) { return acc + cur.damage; }, 0) / results.length
        return {
            count: results.length,
            win: averageWin,
            numBossFights: enemy.hp / averageDamage,
            stars: [0, 1, 2, 3].map(function(s){ return results.reduce(function(acc, cur) { return acc + (cur.stars === s); }, 0) / results.length; }),
            damage: averageDamage,
            damageStdev: Math.sqrt(results.reduce(function(acc, cur) { return acc + (cur.damage - averageDamage) * (cur.damage - averageDamage); }, 0) / results.length),
            damageMin: Math.min.apply(null, results.map(function(cur) { return cur.damage })),
            damageMax: Math.max.apply(null, results.map(function(cur) { return cur.damage })),
        }
    }

	function recurseArtifactDistribution(availableArtifacts, availableCards, hero, enemy, heroes, options) {
	    if ((availableArtifacts.length === 0) || (availableCards.length === 0)) {
	    	// console.log('recurseArtifactDistribution measureStatistics hero ' + hero.toString())
	        heroes.push(hero.clone())
	        return
	    }
	    var bestResult
	    const card = availableCards.shift()
	    var possibleArtifacts = availableArtifacts.filter(function(artifact) {
	    	return !artifact.color || (artifact.color == card.color) 
	    })
	    possibleArtifacts.unshift({ id: 0 }) // Include the option to not use any artifact
	    possibleArtifacts.forEach(function(artifact) {
	        card.equipArtifact(artifact.id, options)
	        recurseArtifactDistribution(availableArtifacts.filter(function(a) { return a !== artifact }), 
							            availableCards, hero, enemy, heroes, options)
	    })
	    availableCards.unshift(card)
	}
	
	function enableDialog(enabled) {
		$('.combatSimulator button, .combatSimulator select, .combatSimulator input, .combatSimulator textarea')
			.not('#output').prop('disabled', !enabled).css('opacity', enabled ? 1 : 0.1)
		$('.combatSimulator #progress, .combatSimulator #cancel')
			.prop('disabled', enabled).css('opacity', enabled ? 0.1 : 1)
	}
	
	function findBestArtifactDistribution(hero, enemy, options) {
		const availableArtifacts = options.user.hero.artifacts.items.map(function(artifactInstance) {
			return Object.assign({}, artifactInstance, webpack.artifacts[artifactInstance.id])
		})
		console.log('findBestArtifactDistribution availableArtifacts', availableArtifacts)
		console.log('findBestArtifactDistribution availableCards', hero.library.filter(function(c){ return c.canEquipArtifact() }))
		const heroClone = hero.clone()
		const heroes = []
		var bestBattleResult
		recurseArtifactDistribution(availableArtifacts, 
			hero.library.filter(function(c){ return c.canEquipArtifact() }), 
			hero, enemy, heroes, options)
			
		const findCostToRemoveArtifact = function(c) {
			return c.artifact ? c.artifact.removeCost[c.artifact.stages.currentStage].gold : 0
		}
		const calcCostToRemoveArtifacts = function(newHero) {
			var cost = 0
			heroClone.library.forEach(function(c, cardIndex) {
				if (c.aid && newHero.library[cardIndex].aid != c.aid) {
					cost += findCostToRemoveArtifact(c)
				}
			})
			return cost
		}
		heroes.forEach(function(h) {
			h.costToRemoveArtifacts = calcCostToRemoveArtifacts(h)
		})
		heroes.sort(function(a, b) {
			return a.costToRemoveArtifacts - b.costToRemoveArtifacts
		})
		var indexInHeroes = 0
		console.log('findBestArtifactDistribution sortedHeroes', heroes)
		enableDialog(false)
		var intervalTimer = setInterval(function() {
			if (indexInHeroes === heroes.length) {
				clearInterval(intervalTimer)
				console.log('findBestArtifactDistribution finished')
				$('#output').append('\n\nDone')
				$("#cancel").off('click')
				var textarea = document.getElementById('output');
				textarea.scrollTop = textarea.scrollHeight;
				enableDialog(true)
				return
			}
			const hero = heroes[indexInHeroes]
			++indexInHeroes
			console.log('findBestArtifactDistribution ' + indexInHeroes + '/' + heroes.length)
			$('#progress').text(indexInHeroes + '/' + heroes.length)
			const result = measureStatistics(hero, enemy, options)
			const isBetterResult = function() {
				if (enemy.unlimitedLibrary) {
					return result.numBossFights < bestBattleResult.numBossFights
				} else {
					return result.win > bestBattleResult.win
				}
			}
			if (!bestBattleResult || isBetterResult()) {
				bestBattleResult = result
				bestBattleResult.mission = options.mission
				const outputItems = []
				outputItems.push('Redistribution cost=' + hero.costToRemoveArtifacts)
				outputItems.push('Hero ' + hero.toString())
				outputItems.push(formatBattleResult(bestBattleResult))
				console.log('Better artifact distribution:\n' + outputItems.join('\n'))
				$('#output').append('\n\n' + outputItems.join('\n\n'))
				var textarea = document.getElementById('output');
				textarea.scrollTop = textarea.scrollHeight;
			}
		}, 1)
		$('#cancel').click(function() {
			clearInterval(intervalTimer)
			console.log('findBestArtifactDistribution canceled')
			$('#output').append('\n\nCanceled')
			$("#cancel").off('click')
			var textarea = document.getElementById('output');
			textarea.scrollTop = textarea.scrollHeight;
			enableDialog(true)
		})
	}

	function normalcdf(mean, sigma, to) {
	    var z = (to - mean) / Math.sqrt(2 * sigma * sigma);
	    var t = 1 / (1 + 0.3275911 * Math.abs(z));
	    var a1 = 0.254829592;
	    var a2 = -0.284496736;
	    var a3 = 1.421413741;
	    var a4 = -1.453152027;
	    var a5 = 1.061405429;
	    var erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
	    var sign = 1;
	    if (z < 0) {
	        sign = -1;
	    }
	    return (1 / 2) * (1 + sign * erf);
	}

    function formatAsPercentage(value) {
    	if (value >= .99) {
    		// Show extra decimal to 'explain' a loss when otherwise 100% would be reported.
	    	return (100 * value).toFixed(1) + '%'
    	}
    	return (100 * value).toFixed(0) + '%'
    }

    function calcNumFights(enemyHp, meanDamage, stdevDamage, minDamage) {
        const numExpectedBattles = Math.ceil(enemyHp / meanDamage)
        const maxBattles = Math.ceil(enemyHp / minDamage)
        var probabilityLessNum = 0
        if (numExpectedBattles > 1) {
            probabilityLessNum = 1 - normalcdf((numExpectedBattles - 1) * meanDamage, 
            								  stdevDamage * Math.sqrt(numExpectedBattles - 1),
            								  enemyHp)
        }
        var probabilityGreaterNum = normalcdf(numExpectedBattles * meanDamage, 
        										stdevDamage * Math.sqrt(numExpectedBattles), 
        										enemyHp)
        if (maxBattles <= numExpectedBattles) {
        	probabilityGreaterNum = 0
        }
        var probabilityGreaterNumPlusOne = normalcdf((numExpectedBattles + 1) * meanDamage, 
        												stdevDamage * Math.sqrt(numExpectedBattles + 1), 
        												enemyHp)
        if (maxBattles <= numExpectedBattles + 1) {
        	probabilityGreaterNumPlusOne = 0
        }
		console.log('numExpected=' + numExpectedBattles + ' maxBattles=' + maxBattles)        
        const probabilityEqualNum = 1 - probabilityLessNum - probabilityGreaterNum
        const probabilityEqualNumPlusOne = probabilityGreaterNum - probabilityGreaterNumPlusOne
        return 'P(N < ' + numExpectedBattles + ') = ' + formatAsPercentage(probabilityLessNum)
        	+ ' P(N = ' + numExpectedBattles + ') = ' + formatAsPercentage(probabilityEqualNum)
        	+ ' P(N = ' + (numExpectedBattles + 1) + ') = ' + formatAsPercentage(probabilityEqualNumPlusOne)
        	+ ' P(N > ' + (numExpectedBattles + 1) + ') = ' + formatAsPercentage(probabilityGreaterNumPlusOne)
    }

    function formatBattleResult(averageResult) {
        const mission = averageResult.mission
        if (mission.unlimitedLibrary) {
            return 'damage=' + averageResult.damage.toFixed(0) + '±' + averageResult.damageStdev.toFixed(0)
            	+ ' min=' + averageResult.damageMin.toFixed(0) + ' max=' + averageResult.damageMax.toFixed(0)
            	+ ' count=' + averageResult.count + '\n' 
            	+ calcNumFights(mission.hp, averageResult.damage, averageResult.damageStdev, averageResult.damageMin)
        } else {
			const starsText = averageResult.stars.slice(1, 4).map(function(s, i) { return 'stars' + (i + 1) + '=' + formatAsPercentage(s) }).join(' ')
		    return 'win=' + formatAsPercentage(averageResult.win) + ' ' + starsText
		            + ' count=' + averageResult.count
        }
    }

    function simulateCombat(user, mission, options) {
    	console.log('CombatSimulator: simulateCombat user', user);
    	console.log('CombatSimulator: mission', mission);
    	const enemy = BattlePlayer.createMissionEnemy(mission, options);
    	console.log('CombatSimulator: enemy', enemy);
    	const hero = BattlePlayer.createHero(user, options.deckName, options.cardInstanceIds, options);
    	console.log('CombatSimulator: hero', hero);
    	options.librarySize = enemy.librarySize;
    	options.warnedUnsupportedEffects = {};
    	options.user = user;
    	options.mission = mission;

    	options.test = $("#test").is(":checked");
    	options.verbose = options.test;
   
 		var resultText
 		try {
	        var averageResult
	        if (options.recurseArtifacts) {
	        	findBestArtifactDistribution(hero, enemy, options)
	        	return
	        } else {
	        	averageResult = measureStatistics(hero, enemy, options)
	        }
	        console.log('averageResult', averageResult)
	        averageResult.mission = mission
	        resultText = formatBattleResult(averageResult)
 		} catch (e) {
 			resultText = 'Failed to run simulation: ' + e
 		}
        console.log('resultText', resultText)
 		
 		const unsupportedEffects = Object.keys(options.warnedUnsupportedEffects).length ? Object.keys(options.warnedUnsupportedEffects).join(',') : 'all effects are supported'
		resultText = '\n' +
    		'\n' + 
    		'Unsupported effects: ' + unsupportedEffects + '\n' +
    		'\n' + 
    		resultText
       	$('#output').text($('#output').val() + resultText)
    }
    
    // MAIN
    
    function initialize() {
    	$('#darkTheme').checked = localStorage.getItem('v2smutstone_darkTheme')
		enableDarkTheme($('#darkTheme').checked)
    	enableDialog(true);
	    const user = parseUserData($('#userData').val());
	    populateDecks(user, { user: user });
	    populateLocations();
  	    populateSupportedEffects();
  	    update();
  	    
	    $('#userData').on('change keyup paste', function() {
	    	console.log('CombatSimulator: change keyup paste');
	    	const user = parseUserData(this.value);
		    populateDecks(user, { user: user });
		    update();
	    });
	    $('#selectDeck').change(function(){
		    update();
		});
   	    $('#selectLocation').change(function(){
	   		populateMissions($(this).val());
		});
	    $('#selectMission').change(function(){
		    update();
		});
	    $('#combat').click(function(){ 
	    	const user = parseUserData($('#userData').val());
	    	const deckName = $('#selectDeck option:selected').text();
	    	const cardInstanceIds = JSON.parse($('#selectDeck').val());
	    	const mission = JSON.parse($('#selectMission').val());
	    	simulateCombat(user, webpack.allLocations[mission.locationIndex].missions[mission.missionIndex]
	    					   , {deckName: deckName, cardInstanceIds: cardInstanceIds});
		});
	    $('#bestArtifactDistribution').click(function(){ 
	    	const user = parseUserData($('#userData').val());
	    	const deckName = $('#selectDeck option:selected').text();
	    	const cardInstanceIds = JSON.parse($('#selectDeck').val());
	    	const mission = JSON.parse($('#selectMission').val());
	    	simulateCombat(user, webpack.allLocations[mission.locationIndex].missions[mission.missionIndex]
	    					   , {deckName: deckName, cardInstanceIds: cardInstanceIds, recurseArtifacts: true });
		});
		$('#darkTheme').change(function() {
			localStorage.setItem('v2smutstone_darkTheme', this.checked)
			enableDarkTheme(this.checked)
		});
    }
    
    webpack = new Webpack();
    if (typeof executeSmutstoneConfJs !== 'undefined') {
    	webpack.init(initialize, executeSmutstoneConfJs);
    } else {
    	webpack.load(initialize);
    	console.log('CombatSimulator: Webpack load called');
    }
});