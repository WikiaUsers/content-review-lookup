(function() {
    var ui;
    var container = $('#overview-selector');

    function init(lib) {
		var type = (container.attr('data-type').toUpperCase() == 'SUMMON' ? 'Summon' : 'Hero');
		var hero = container.attr('data-hero');
		var api = new mw.Api();
		api.get( {
			action: 'expandtemplates',
			text: '{{#invoke:' + type + '|dump|' + hero + '}}'	
		}).done ( function ( jsondata ) {
			var herodata = JSON.parse(jsondata.expandtemplates['*']);
		
	        ui = lib;
	        container.append([
	            ui.div({
	            	id: 'overview-select',
	        	})
	        ]);
	        document.getElementById('overview-select').appendChild(
						ui.label({
							text: 'Level: ',
							for: 'level-select',
						}));
	        document.getElementById('overview-select').appendChild(
	            		ui.select({
	            			id: 'level-select',
						    events: {
						    	change: showstats
						    },
						}));
	
			for (var i = 1; i <= herodata.level.length; i++) {
	        	document.getElementById('level-select').appendChild(ui.option({ text: i }));					
			}
			if (type == 'Hero') {
		        document.getElementById('overview-select').appendChild(
							ui.label({
								text: '\xa0\xa0\xa0\xa0Reborn: ',
							}));
		        document.getElementById('overview-select').appendChild(
		            		ui.select({
		            			id: 'reborn-select',
							    events: {
							    	change: showstats
							    },
							}));
				for (i = 0; i <= (herodata.rarity == 'common' || herodata.rarity == 'rare' ? 4 : (herodata.rarity == 'epic' ? 5 : 6)); i++) {
					var r;
					switch (i) {
						case 1: r = 'I'; break;
						case 2: r = 'II'; break;
						case 3: r = 'III'; break;
						case 4: r = 'IV'; break;
						case 5: r = 'V'; break;
						case 6: r = 'VI'; break;
						default: r = '0'; break;
					}
		        	document.getElementById('reborn-select').appendChild(ui.option({ text: r }));					
				}
				
		        document.getElementById('overview-select').appendChild(
							ui.label({
								text: '\xa0\xa0\xa0\xa0Soulbinds: ',
							}));
		        document.getElementById('overview-select').appendChild(
		        			ui.label({
								text: '\xa0\xa0I',
							}));
		        document.getElementById('overview-select').appendChild(
							ui.input({
							    type: 'checkbox',
							    id: 's1-select',
							    events: {
							    	change: showstats
							    },
							}));
		        document.getElementById('overview-select').appendChild(
							ui.label({
								text: '\xa0\xa0II',
							}));
		        document.getElementById('overview-select').appendChild(
							ui.input({
							    type: 'checkbox',
							    id: 's2-select',
							    events: {
							    	change: showstats
							    },
							}));
		        document.getElementById('overview-select').appendChild(
							ui.label({
								text: '\xa0\xa0III',
							}));
		        document.getElementById('overview-select').appendChild(
							ui.input({
							    type: 'checkbox',
							    id: 's3-select',
							    events: {
							    	change: showstats
							    },
							}));
		        document.getElementById('overview-select').appendChild(
							ui.label({
								text: '\xa0\xa0IV',
							}));
		        document.getElementById('overview-select').appendChild(
							ui.input({
							    type: 'checkbox',
							    id: 's4-select',
							    events: {
							    	change: showstats
							    },
							}));
			}
	        
	        function applyreborn(reborn, skill, s) {
	        	if (type != 'Hero') return;
		    	var rSkill;
				if (reborn >= 6 && herodata.reborn6_skill) {
					rSkill = herodata.reborn6_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
				if (reborn >= 5 && herodata.reborn5_skill) {
					rSkill = herodata.reborn5_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
				if (reborn >= 4 && herodata.reborn4_skill) {
					rSkill = herodata.reborn4_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
				if (reborn >= 3 && herodata.reborn3_skill) {
					rSkill = herodata.reborn3_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
				if (reborn >= 2 && herodata.reborn2_skill) {
					rSkill = herodata.reborn2_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
				if (reborn >= 1 && herodata.reborn1_skill) {
					rSkill = herodata.reborn1_skill;
					if (rSkill[0] == skill) {
						if (!isNaN(s.value) && (rSkill[1].substring(0,1) == '+') && !isNaN(rSkill[1].substring(1)) ) {
							s.value = Number(s.value) + Number(rSkill[1].substring(1));
						}
						else {
							if (isNaN(rSkill[1].substring(1))) {
								s.improvements += 1;
								s.isStringImprovement = true;
							}
							else {
								s.improvements = Number(s.improvements) + Number(rSkill[1].substring(1));
							}
						}
					}
				}
		    	if (s.improvements > 0) {
		    		if (s.isStringImprovement)
			    		s.value = s.value + " (+"+s.improvements+" improvements from reborn)";
			    	else
			    		s.value = s.value + " (+"+s.improvements+" from reborn)";
		    	}
	        }
	        
			function showstats() {
				var level = document.getElementById('level-select').options[document.getElementById('level-select').selectedIndex].value;
				var reborn = 0;
				if (type == 'Hero') reborn = document.getElementById('reborn-select').selectedIndex;
				
				var api = new mw.Api();
					var atk = parseInt(herodata.level[level-1].atk);
				    var hp = parseInt(herodata.level[level-1].hp);
				    if (type == 'Hero') {
						if (document.getElementById('s1-select').checked) {
							if (herodata.soulbind1_atk)	atk += parseInt(herodata.soulbind1_atk);
							if (herodata.soulbind1_hp)	hp += parseInt(herodata.soulbind1_hp);
						}
						if (document.getElementById('s2-select').checked) {
							if (herodata.soulbind2_atk)	atk += parseInt(herodata.soulbind2_atk);
							if (herodata.soulbind2_hp)	hp += parseInt(herodata.soulbind2_hp);
						}
						if (document.getElementById('s3-select').checked) {
							if (herodata.soulbind3_atk)	atk += parseInt(herodata.soulbind3_atk);
							if (herodata.soulbind3_hp)	hp += parseInt(herodata.soulbind3_hp);
						}
						if (document.getElementById('s4-select').checked) {
							if (herodata.soulbind4_atk)	atk += parseInt(herodata.soulbind4_atk);
							if (herodata.soulbind4_hp)	hp += parseInt(herodata.soulbind4_hp);
						}
						if (reborn >= 6) {
							if (herodata.reborn6_atk)	atk += parseInt(herodata.reborn6_atk);
							if (herodata.reborn6_hp)	hp += parseInt(herodata.reborn6_hp);
						}
						if (reborn >= 5) {
							if (herodata.reborn5_atk)	atk += parseInt(herodata.reborn5_atk);
							if (herodata.reborn5_hp)	hp += parseInt(herodata.reborn5_hp);
						}
						if (reborn >= 4) {
							if (herodata.reborn4_atk)	atk += parseInt(herodata.reborn4_atk);
							if (herodata.reborn4_hp)	hp += parseInt(herodata.reborn4_hp);
						}
						if (reborn >= 3) {
							if (herodata.reborn3_atk)	atk += parseInt(herodata.reborn3_atk);
							if (herodata.reborn3_hp)	hp += parseInt(herodata.reborn3_hp);
						}
						if (reborn >= 2) {
							if (herodata.reborn2_atk)	atk += parseInt(herodata.reborn2_atk);
							if (herodata.reborn2_hp)	hp += parseInt(herodata.reborn2_hp);
						}
						if (reborn >= 1) {
							if (herodata.reborn1_atk)	atk += parseInt(herodata.reborn1_atk);
							if (herodata.reborn1_hp)	hp += parseInt(herodata.reborn1_hp);
						}
				    }
				    document.getElementById('hero_atk').innerHTML = atk;
				    document.getElementById('hero_hp').innerHTML = hp;
				    
			    	var skill = {
					    value: "0",
					    improvements: 0,
					    isStringImprovement: false,
					};
				    if (herodata.skill1) {
				    	skill.value = herodata.level[level-1].skill1;
				    	skill.improvements = 0;
				    	skill.isStringImprovement = false;
				    	skill.unlock = "";
				    	if (herodata.skill1_unlock && level < herodata.skill1_unlock) {
				    		skill.value = herodata.level[herodata.skill1_unlock-1].skill1;
				    	}
				    	applyreborn(reborn, 1, skill);
						api.get( {
							action: 'parse',
							text: herodata.skill1_desc.replace('%s',skill.value).replace('%%','%'),
							contentmodel: 'wikitext',
							disablelimitreport: 1,
							format: 'json',
						}).done ( function (data) {
							document.getElementById('hero_skill1').innerHTML = $(data.parse.text['*']).find('p').html() + (level < herodata.skill1_unlock ? " (Unlocks on Level " + herodata.skill1_unlock + ")" : "");
						});
				    }
				    if (herodata.skill2) {
				    	skill.value = herodata.level[level-1].skill2;
				    	skill.improvements = 0;
				    	skill.isStringImprovement = false;
				    	skill.unlock = "";
				    	if (herodata.skill2_unlock && level < herodata.skill2_unlock) {
				    		skill.value = herodata.level[herodata.skill2_unlock-1].skill2;
				    	}
				    	applyreborn(reborn, 2, skill);
						api.get( {
							action: 'parse',
							text: herodata.skill2_desc.replace('%s',skill.value).replace('%%','%'),
							contentmodel: 'wikitext',
							disablelimitreport: 1,
							format: 'json',
						}).done ( function (data) {
							document.getElementById('hero_skill2').innerHTML = $(data.parse.text['*']).find('p').html() + (level < herodata.skill2_unlock ? " (Unlocks on Level " + herodata.skill2_unlock + ")" : "");
						});
				    }
				    if (herodata.skill3) {
				    	skill.value = herodata.level[level-1].skill3;
				    	skill.improvements = 0;
				    	skill.isStringImprovement = false;
				    	skill.unlock = "";
				    	if (herodata.skill3_unlock && level < herodata.skill3_unlock) {
				    		skill.value = herodata.level[herodata.skill3_unlock-1].skill3;
				    	}
				    	applyreborn(reborn, 3, skill);
						api.get( {
							action: 'parse',
							text: herodata.skill3_desc.replace('%s',skill.value).replace('%%','%'),
							contentmodel: 'wikitext',
							disablelimitreport: 1,
							format: 'json',
						}).done ( function (data) {
							document.getElementById('hero_skill3').innerHTML = $(data.parse.text['*']).find('p').html() + (level < herodata.skill3_unlock ? " (Unlocks on Level " + herodata.skill3_unlock + ")" : "");
						});
				    }
				    if (herodata.skill4) {
				    	skill.value = herodata.level[level-1].skill4;
				    	skill.improvements = 0;
				    	skill.isStringImprovement = false;
				    	skill.unlock = "";
				    	if (herodata.skill4_unlock && level < herodata.skill4_unlock) {
				    		skill.value = herodata.level[herodata.skill4_unlock-1].skill4;
				    	}
				    	applyreborn(reborn, 4, skill);
						api.get( {
							action: 'parse',
							text: herodata.skill4_desc.replace('%s',skill.value).replace('%%','%'),
							contentmodel: 'wikitext',
							disablelimitreport: 1,
							format: 'json',
						}).done ( function (data) {
							document.getElementById('hero_skill4').innerHTML = $(data.parse.text['*']).find('p').html() + (level < herodata.skill4_unlock ? " (Unlocks on Level " + herodata.skill4_unlock + ")" : "");
						});
				    }
	        }        
	       	showstats();
		});
    }

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Dorui.js'
    });

    mw.hook('doru.ui').add(init);
})();