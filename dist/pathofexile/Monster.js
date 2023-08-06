/* [[Template:Monster infobox]] */
(function($, mw) {
	'use strict';

	var i18n, dataset;
	var init_level = 0;
	const init_max = 3;
	const difficulties = {
		part1: 45,
		part2: 67,
		endgame: 100,
	};

	const difficulty_order = ['part1', 'part2', 'endgame'];

	const rarities = {
		Normal: 0,
		Magic: 1,
		Rare: 2,
		Unique: 3,
	};

	const html_infobox = '<tr class="monster"><td>' +
		'<table class="monster_info_container">' +
		'<tr class="monster_name"><th><em class="monster_name tc">?</em></th></tr>' +
		'<tr class="controls"><td><table class="wikitable controls">' +
			'<thead>' +
				'<tr>' +
					'<th colspan="2">Controls</th>' +
				'</tr>' +
			'</thead>' +
			'<tbody>' +
				'<tr>' +
					'<th>Level</th>' +
					'<td><input type="number" name="level" min="1" max="100" value="1"/></td>' +
				'</tr>' +
				'<tr>' +
					'<th>Rarity</th>' +
					'<td><select name="rarity">' +
						'<option value="Normal" selected>Normal</option>' +
						'<option value="Magic">Magic</option>' +
						'<option value="Rare">Rare</option>' +
						'<option value="Unique">Unique</option>' +
					'</select></td>' +
				'</tr>' +
				'<tr>' +
					'<th>Is map monster?</th>' +
					'<td><input type="checkbox" name="is_map_monster" value="1" /></td>' +
				'</tr>' +
				'<tr>' +
					'<th>Is map boss?</th>' +
					'<td><input type="checkbox" name="is_map_boss" value="1" /></td>' +
				'</tr>' +
				'<tr>' +
					'<th>Is minion</th>' +
					'<td><input type="checkbox" name="is_minion" value="1" /></td>' +
				'</tr>' +
				'<tr>' +
					'<th>Difficuty</th>' +
					'<td><select name="difficulty">' +
						'<option value="part1" selected>Part 1</option>' +
						'<option value="part2">Part 2</option>' +
						'<option value="endgame">Endgame</option>' +
					'</select></td>' +
				'</tr>' +
			'</tbody>' +
		'</table></td></tr>' +

		'<tr class="monster_table"><td><table class="wikitable monster_table">' +
			'<!-- static attributes -->' +
			'<tr>' +
				'<th colspan="2"><em class="monster_name tc">?</em></th>' +
			'</tr>' +
			'<tr>' +
				'<th>Tags</th>' +
				'<td class="monster_tags">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Metadata ID</th>' +
				'<td class="monster_metadata_id">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Skills</th>' +
				'<td class="monster_skill_ids">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Size</th>' +
				'<td class="monster_size">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Minimum attack distance</th>' +
				'<td class="monster_minimum_attack_distance">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Maximum attack distance</th>' +
				'<td class="monster_maximum_attack_distance">?</td>' +
			'</tr>' +
		
			'<!-- Variable attributes -->' +
			'<tr>' +
				'<th>Experience</th>' +
				'<td class="monster_experience">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Life</th>' +
				'<td class="monster_life">?</td>' +
			'</tr>' +
			'<!-- Wiki colours every other line differently, prevent that from happening -->' +
			'<tr style="display:none"></tr>' +
			'<tr>' +
				'<th>Life</th>' +
				'<td class="monster_summon_life">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Accuracy</th>' +
				'<td class="monster_accuracy">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Armour</th>' +
				'<td class="monster_armour">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Evasion</th>' +
				'<td class="monster_evasion">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Base Physical Damage</th>' +
				'<td class="monster_damage">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Base Attack Speed</th>' +
				'<td class="monster_attack_speed">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Critical Strike Chance</th>' +
				'<td class="monster_critical_strike_chance">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Critical Strike Multiplier</th>' +
				'<td class="monster_critical_strike_multiplier">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Increased Rarity</th>' +
				'<td class="monster_rarity">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Increased Quantity</th>' +
				'<td class="monster_quantity">?</td>' +
			'</tr>' +
			'<tr>' +
				'<th>Resistances</th>' +
				'<td><table class="monster_resistance"><tr>' +
					'<td class="tc -fire">?</td>' +
					'<td class="tc -cold">?</td>' +
					'<td class="tc -lightning">?</td>' +
					'<td class="tc -chaos">?</td>' +
				'</tr></table></td>' +
			'</tr>' +
			'<tr>' +
				'<th>Stats</th>' +
				'<td class="monster_stat_text">?</td>' +
			'</tr>' +
		'</table></td></tr>' +

		'<tr class="monster_stats"><td><table class="wikitable monster_stats">' +
		'<thead>' +
			'<tr>' +
				'<th colspan="3">Stats</th>' +
			'</tr>' +
			'<tr>' +
				'<th>Stat</td>' +
				'<th>Min</td>' +
				'<th>Max</td>' +
			'</tr>' +
		'</thead>' +
		'<tbody>' +
		'</tbody>' +
		'</table></td></tr>' +
	'</table></td></tr>';

	const Cargo = {
		_fail: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus);
		},
	
		_wrap_success: function(func) {
			return function(data) {
				data = data.cargoquery;
				func(data);
			};
		},
	
		query: function(query, success, fail) {
			if (typeof fail === 'undefined') {
				fail = Cargo._fail;
			}
			
			query.action = 'cargoquery';
			
			// Query size for normal users is limited to 500
			if (typeof query.limit === 'undefined' || (typeof query.limit === 'number' && query.limit > 500)) {
				query.limit = 500;
			}
			
			if (Array.isArray(query.tables)) {
				query.tables = query.tables.join(', ');
			}
			
			if (Array.isArray(query.fields)) {
				query.fields.forEach(function (value, index) {
					if (!value.includes('=')) {
						query.fields[index] = value + '=' + value;
					}
				});
				
				query.fields = query.fields.join(', ');
			}
			const mwa = new mw.Api();
			
			console.log(query.where);
			
			mwa.get(query).done(Cargo._wrap_success(success)).fail(fail);
		}
	};

	const Util = {
		bool: function(value) {
			switch(value) {
				case false:
				case 0:
				case 'disabled':
				case 'off':
				case 'no':
				case '':
				case 'deactivated':
					return false;
				default:
				return true;
			}
		}
	};

	const StatCalculation = {
		added: function(values, value) {
			values.forEach(function (other) {
				value.add(other);
			});
		},
		increased: function(values, value) {
			var multi = new Stat('', 0);
			values.forEach(function (inc) {
				multi.add(inc);
			});
			multi.div(100);
			multi.add(1);
			value.mult(multi);
		},
		more: function(values, value) {
			values.forEach(function (multi) {
				var temp = multi.copy();
				temp.div(100);
				temp.add(1);
				value.mult(temp);
			});
		},
		less: function(values, value) {
			values.forEach(function (multi) {
				var temp = multi.copy();
				temp.div(100);
				// since it's less it's negative and subtracted from 1
				temp.mult(-1);
				temp.add(1);
				value.mult(temp);
			});
		}
	};

	function Stat(id, min, max) {
		this.id = id;
		this.min = min;
		if (typeof max === 'undefined') {
			max = min;
		}
		this.max = max;
	}

	Stat.prototype.copy = function() {
		return new Stat(this.id, this.min, this.max);
	};
	Stat.prototype.str = function(func) {
		if (this.min == this.max) {
			if (typeof func === 'undefined') {
				return this.min;
			} else {
				return func(this.min);
			}
		} else {
			var min;
			var max;
			if (typeof func === 'undefined') {
				min = this.min;
				max = this.max;
			} else {
				min = func(this.min);
				max = func(this.max);
			}
			return '(' + min + ' ' + i18n.range + ' ' + max + ')';
		}
	};
	Stat.prototype.is_zero = function() {
		return (this.min == 0 && this.max == 0);
	};
	Stat.prototype._type_check = function(other, func_number, func_stat) {
		var t = typeof other;
		if (t === 'number') {
			func_number(this);
		} else if (t === 'object' && other.constructor.name == 'Stat') {
			func_stat(this);
		} else {
			throw 'Stat arithmetric requires a stat object or number, got type "' + t + '"';
		}
	};
	Stat.prototype.add = function(other) {
		this._type_check(other, 
			function(stat) {
				stat.min += other;
				stat.max += other;
			},
			function(stat) {
				stat.min += other.min;
				stat.max += other.max;
			}
		);
	};
	Stat.prototype.sub = function(other) {
		this._type_check(other, 
			function(stat) {
				stat.min -= other;
				stat.max -= other;
			},
			function(stat) {
				stat.min -= other.min;
				stat.max -= other.max;
			}
		);
	};
	Stat.prototype.mult = function(other) {
		this._type_check(other, 
			function(stat) {
				stat.min *= other;
				stat.max *= other;
			},
			function(stat) {
				stat.min *= other.min;
				stat.max *= other.max;
			}
		);
	};
	Stat.prototype.div = function(other) {
		this._type_check(other, 
			function(stat) {
				stat.min /= other;
				stat.max /= other;
			},
			function(stat) {
				stat.min /= other.min;
				stat.max /= other.max;
			}
		);
	};

	function Monster(metadata_id) {
		var controls = {
			level: {
				'var': dataset.level,
				'default': 1,
				'type': 'input',
				'check': 'number',
				'func_update': this.update_level.bind(this),
				'func_validate': function (value) {
					var level = Number(value);
					if (level < 1 || level > 100) {
						alert(i18n.invalid_level);
						return -1;
					}
					return level;
				},
			},
			rarity: {
				'var': dataset.rarity,
				'default': 'Normal',
				'type': 'select',
				'check': 'value',
				'func_update': this.update_rarity.bind(this),
				'func_validate': function (value) {
					if (typeof rarities[value] === 'undefined') {
						alert(i18n.invalid_rarity);
						return -1;
					}
					return value;
				},
			},
			is_map_monster: {
				'var': dataset.is_map_monster,
				'default': false,
				'type': 'input',
				'check': 'checked',
				'func_update': this.update_is_map_monster.bind(this),
				'func_validate': function (value) {
					return Util.bool(value);
				},
			},
			is_map_boss: {
				'var': dataset.is_map_boss,
				'default': false,
				'type': 'input',
				'check': 'checked',
				'func_update': this.update_is_map_boss.bind(this),
				'func_validate': function (value) {
					return Util.bool(value);
				},
			},
			is_minion: {
				'var': dataset.is_minion,
				'default': false,
				'type': 'input',
				'check': 'checked',
				'func_update': this.update_is_minion.bind(this),
				'func_validate': function (value) {
					return Util.bool(value);
				},
			},
			difficulty: {
				'var': dataset.difficulty,
				'default': 'part1',
				'type': 'select',
				'check': 'value',
				'func_update': this.update_difficulty.bind(this),
				'func_validate': function (value) {
					if (typeof difficulties[value] === 'undefined') {
						alert(i18n.invalid_difficulty);
						return -1;
					}
					return value;
				},
			},
		};
		this.metadata_id = metadata_id;
		this.data = Monster.base_data_by_id[this.metadata_id];
		this.stats = {};
		this.stat_text = '';
		// TODO: Maybe set a parameter on the widget to determine default here?
		this.show = true;

		const obj = Object.entries(this.data['monsters.mod_ids']);
		for (var i=0; i<obj.length; i++) {
			const mod = Monster.mods[obj[i][1]];
			this._update_stat_text(mod.stat_text);
			const entryStats = Object.entries(mod.stats);
			for (var j=0; j<entryStats.length; j++) {
				const stat = entryStats[j][1];
				this.update_stat(stat.id, stat.copy());
			}
		}

		var html = $(html_infobox);
		html.attr('id', this.metadata_id);

		$('.monster_container > tbody').append(html);
		this.html = $('tr[id="' + this.metadata_id + '"');

		this.tbl = this.html.find('table.monster_table');
		this.stat_tbl = this.html.find('table.monster_stats');
		this.stat_bdy = this.stat_tbl.find('tbody');

		this.html.find('tr.monster_name th').click(this.toggle_show.bind(this));

		this.ctl = this.html.find('table.controls');

		//
		// Set and init defaults 
		//
		const obj3 = Object.entries(controls);
		for (var k=0; k<obj3.length; k++) {
			this[obj3[k][0]] = obj3[k][1].default;
		}

		this.update_rarity(this.rarity);
		// Also updates map boss and map monster
		this.update_level(this.level);

		// Will also set current difficulty
		this.update_difficulty(this.difficulty);
		this.update_is_minion(this.is_minion);

		// Widget parameters or set defaults
		const entryControls = Object.entries(controls);
		for (var l=0; l<entryControls.length; l++) {
			const name = entryControls[l][0];
			const cdata = entryControls[l][1];
			const ele = this.ctl.find(cdata.type + '[name="' + name + '"]');

			// Still not entirely sure how the widget works
			if (cdata.var == dataset[name] || cdata.var === '') {
				cdata.var = cdata.default;
			} else {
				const rtr = cdata.func_validate(cdata.var);
				if (rtr == -1) {
					cdata.var = cdata.default;
				} else {
					cdata.var = rtr;
					this[name] = cdata.default;
					cdata.func_update(rtr);
				}
			}

			 // Update the UI element accordingly regardless of the original HTML value
			if (cdata.type == 'input') {
				switch (cdata.check) {
					case 'checked':
						ele.prop('checked', cdata.var);
						break;
					case 'number':
						ele.prop('value', cdata.var);
						break;
				}
			} else if (cdata.type == 'select') {
				if (name == 'rarity') {
					ele.prop('selectedIndex', rarities[cdata.var]);
				} else if (name == 'difficulty') {
					const entryDiffOrder = Object.entries(difficulty_order);
					for (var n=0; n<entryDiffOrder.length; n++) {
						if (entryDiffOrder[n][1] == cdata.var) {
							ele.prop('selectedIndex', entryDiffOrder[n][0]);
							break;
						}
					}
				}
			}

			// Add listener function
			var m = this;
			ele.change(function () {
				var value;
				// In this context, "this" is the element that called this function
				switch (cdata.check) {
					case 'checked':
						value = this.checked;
						break;
					case 'number':
						value = Number(this.value);
						break;
					case 'value':
					default:
						value = this.value;
				}
				cdata.func_update(value);
				m.update_infobox();
			});
		}

		// Static infobox properties
		this.html.find('em.monster_name').html(this.data['monsters.name']);

		// Can be directly inserted into the releveant fields
		const obj0 = Object.entries([
			'size',
			'minimum_attack_distance',
			'maximum_attack_distance',
		]);
		for (var z=0; z<obj0.length; z++) {
			const key = obj0[z][1];
			this.tbl.find('.monster_' + key).html(this.data['monsters.' + key]);
		}

		this.tbl.find('.monster_skill_ids').html(this.data['monsters.skill_ids'].join(', '));

		var tags = this.data['monsters.tags'].concat(this.data['monster_types.tags']);
		this.tbl.find('.monster_tags').html(tags.join(', '));

		this.tbl.find('.monster_metadata_id').html('<a href="/' + this.data['monsters._pageName'] + '">' + this.data['monsters.metadata_id']);

		// Update for the defaults
		this.update_infobox();
	}

	Monster.prototype.toggle_show = function() {
		if (this.show) {
			this.ctl.css('display', 'none');
			this.tbl.css('display', 'none');
			this.stat_tbl.css('display', 'none');
			this.show = false;
		} else {
			this.ctl.css('display', 'table');
			this.tbl.css('display', 'table');
			this.stat_tbl.css('display', 'table');
			this.show = true;
		}
	};
	
	Monster.prototype._update_stat_text = function(stat_text) {
		if (stat_text == '') return;

		stat_text = new DOMParser().parseFromString(stat_text, "text/html").documentElement.textContent;
		// [[a|b]] style wiki links
		stat_text = stat_text.replace(/\[\[([^\|]+)\|([^\]]+)\]\]/g, '<a href="/$1">$2</a>');
		// [[a]] style wiki links
		stat_text = stat_text.replace(/\[\[([^\]]+)\]\]/g, '<a href="/$1">$1</a>');

		if (this.stat_text == '') {
			this.stat_text = stat_text;
		} else {
			this.stat_text += '<br>' + stat_text;
		}
	};

	Monster.prototype.update_level = function(level) {
		// Deletes old and adds new in one go
		this.update_is_map_boss(this.is_map_boss, this.level, level);
		this.update_is_map_monster(this.is_map_monster, this.level, level);

		// Only deletes the old level
		this._update_rarity(this.rarity, true, this.level);
		this.level = level;

		// Rarity data for new level
		this._update_rarity(this.rarity, false, this.level);
	};
	
	Monster.prototype._update_difficulty_mods = function(difficulty, del) {
		del = del || false;
		const entryId = Object.entries(this.data['monsters.' + difficulty + '_mod_ids']);
		for (var i=0; i<entryId.length; i++) {
			const mod_id = entryId[i][1];
			var mod = Monster.mods[mod_id];
			//TODO
			//this.stat_text += '<br>' + mod.stat_text;
			const entryStats = Object.entries(mod.stats);
			for (var j=0; j<entryStats.length; j++) {
				const stat = entryStats[j][1];
				this.update_stat(stat.id, stat.copy(), del);
			}
		}
	};

	Monster.prototype.update_difficulty = function(difficulty) {
		var old = this.difficulty;
		if (old == difficulty) return;

		if (typeof difficulty !== 'undefined') {
			if (typeof difficulties[difficulty] === 'undefined') {
				alert('Undefined difficulty. You probably messed with JS.');
			} else {
				this.difficulty = difficulty;
			}
		} else {
			const entryDiff = Object.entries(difficulty_order);
			for (var i=0; i<entryDiff.length; i++) {
				const diff = entryDiff[i][1];
				if (this.level <= difficulties[diff]) {
					this.difficulty = diff;
					break;
				}
			}
		}

		this._update_difficulty_mods(old, true);
		this._update_difficulty_mods(difficulty, false);
	};

	Monster.prototype._update_map_monster_stats = function(stats, del, level) {
		del = del || false;
		for (var i=0;i<stats.length;i++) {
			var variable = stats[i];
			var v = Monster.level_data[level][variable];
			if (typeof v === 'undefined') {
				if (this.level < 66) { 
					console.log('Map monster is set but undefined damage/hp multiplier value at level ' + this.level);
					return;
				} else {
					console.log('Map monster is set but undefined damage/hp multiplier value at level ' + this.level + '. The highest available value will be used');
					for (var l=Monster.level_data.length-1; l>=0; l--) {
						v = Monster.level_data[l][variable];
						if (typeof v !== 'undefined') {
							break;
						}
					}
				}
			} else {
				this.update_stat(Monster.stat_map[variable], Monster.level_data[level][variable], del);
			}
		}
	};

	Monster.prototype.update_is_map_monster = function(is_map_monster, level, new_level) {
		if (typeof level === 'undefined') {
			level = this.level;
		}

		if (typeof new_level === 'undefined') {
			new_level = level;
		}

		// Must be toggled off before changing the value to make sure the stats are removed correclty
		if (is_map_monster) {
			this.ctl.find('input[name="is_map_boss"]').prop('disabled', false);
		} else {
			this.ctl.find('input[name="is_map_boss"]').prop('disabled', true);
			// Can no longer be a map boss if it's not a map monster
			if (this.is_map_boss) {
				this.update_is_map_boss(false);
				 this.ctl.find('input[name="is_map_boss"]').prop('checked', false);
			}
		}

		if (this.is_map_monster) {
			this._update_map_monster_stats(['map_life_multiplier', 'map_damage_multiplier'], true, level);
		}
		this.is_map_monster = is_map_monster;
		if (is_map_monster) {
			this._update_map_monster_stats(['map_life_multiplier', 'map_damage_multiplier'], false, new_level);
		}
	};
	
	Monster.prototype.update_is_map_boss = function(is_map_boss, level, new_level) {
		if (typeof level === 'undefined') {
			level = this.level;
		}
		
		if (typeof new_level === 'undefined') {
			new_level = level;
		}

		// Only delete if it has been a map boss and map monster before to avoid putting stats into the negative
		if (this.is_map_boss && this.is_map_monster) {
			this._update_map_monster_stats(['boss_life', 'boss_damage', 'boss_item_quantity', 'boss_item_rarity'], true, level);
		}
		this.is_map_boss = is_map_boss;
		// Only update if it is a map boss and map monster to avoid stacking stats incorrectly
		if (is_map_boss && this.is_map_monster) {
			this._update_map_monster_stats(['boss_life', 'boss_damage', 'boss_item_quantity', 'boss_item_rarity'], false, new_level);
		}
	};
	
	Monster.prototype.update_is_minion = function(is_minion) {
		this.is_minion = is_minion;
		// Either show regular life value or minion life value
		if (is_minion) {
			this.tbl.find('.monster_life').parent('tr').css('display', 'none');
			this.tbl.find('.monster_summon_life').parent('tr').css('display', 'table-row');
			this.ctl.find('select[name="rarity"]').prop('disabled', true);
			this.ctl.find('input[name="is_map_monster"]').prop('disabled', true);
			this.ctl.find('input[name="is_map_boss"]').prop('disabled', true);

			if (this.rarity != 'Normal') {
				this.ctl.find('select[name="rarity"]').prop('selectedIndex', 0);
				this.update_rarity('Normal');
			}

			if (this.is_map_boss) {
				this.ctl.find('input[name="is_map_boss"]').prop('checked', 0);
				this.update_is_map_boss(false);
			}

			if (this.is_map_monster) {
				this.ctl.find('input[name="is_map_monster"]').prop('checked', 0);
				this.update_is_map_monster(false);
			}
		} else {
			this.tbl.find('.monster_life').parent('tr').css('display', 'table-row');
			this.tbl.find('.monster_summon_life').parent('tr').css('display', 'none');
			this.ctl.find('select[name="rarity"]').prop('disabled', false);
			this.ctl.find('input[name="is_map_monster"]').prop('disabled', false);
			this.ctl.find('input[name="is_map_boss"]').prop('disabled', false);
		}
	};
	
	// this can also be called via level change since monster rarity hp multiplier depend on the level
	Monster.prototype._update_rarity = function(rarity, del, level) {
		del = del || false;

		const entryRarity = Object.entries(Monster.rarity_data[rarity]);
		for (var i=0; i<entryRarity.length; i++) {
			this.update_stat(entryRarity[i][0], entryRarity[i][1], del);
		}

		if (rarity == 'Magic' || rarity == 'Rare') {
			if (typeof level === 'undefined') {
				level = this.level;
			}
			var v = Monster.level_data[level][rarity + '_life_multiplier'];
			// In this case (i.e. level > 84) the highest available will be used
			// Since this might change in the future a loop is used to determine the max level
			if (typeof v === 'undefined') {
				for (var j=Monster.level_data.length; j>=0; j--) {
					v = Monster.level_data[j][variable];
					if (typeof v !== 'undefined') {
						break;
					}
				}
			}
			this.update_stat(Monster.stat_map[rarity + '_life_multiplier'], v, del);
		}
	};

	Monster.prototype.update_rarity = function(rarity, level) {
		// Delete stats from previous rarity level
		this._update_rarity(this.rarity, true, level);

		this.rarity = rarity;
		this._update_rarity(this.rarity, false, level);
	};

	Monster.prototype.update_stat = function(stat_id, value, del) {
		del = del || false;
		var v = this.stats[stat_id];
		if (typeof v === 'undefined') {
			if (!del) {
				if (typeof value === 'number') {
					value = new Stat(stat_id, value);
				} else {
					value = value.copy();
				}
				this.stats[stat_id] = value;
			}
			// If the stat doesn't exist, we don't need to delete it
		} else {
			if (del) {
				v.sub(value);
				if (v.is_zero()) {
					delete this.stats[stat_id];
				}
			} else {
				v.add(value);
			}
		}
	};

	Monster.prototype.calculate_property = function(type) {
		var calc = Monster.calculation_params[type];
		var value;
		switch (calc.type) {
			case 'level':
				value = new Stat(type, Monster.level_data[this.level][type]);
				if (typeof calc.base !== 'undefined') {
					value.mult(this.data[calc.base]);
				}
				break;
			case 'base':
				value = new Stat(type, this.data[calc.base]);
				break;
			case 'resist':
				var diff = this.difficulty;
				var t = type.match(/(cold|chaos|fire|lightning)/)[1];
				value = new Stat(type, this.data['monster_resistances.' + diff + '_' + t]);
				break;
			case 'none':
			default:
				var v;
				if (typeof calc.value === 'undefined') {
					v = 0;
				} else {
					v = calc.value;
				}
				value = new Stat(type, v);
		}

		// Overriding is a special case that ingores all further calcuations
		var stats = this.stats;
		if (typeof calc.override !== 'undefined') {
			const entryOverride = Object.entries(calc.override);
			for (var k=0; k<entryOverride.length; k++) {
				const b = stats[entryOverride[k][0]];
				if (typeof b !== 'undefined') {
					// TODO: Support for overriding to specific values if needed
					if (b != 0) {
						return entryOverride[k][1];
					}
				}
			}
		}

		const entryStat = Object.entries(['added', 'increased', 'more', 'less']);
		for (var i=0; i<entryStat.length; i++) {
			const stat_calc_type = entryStat[i][1];
			const stat_ids = calc[stat_calc_type];
			if (typeof stat_ids !== 'undefined') {
				var values = [];
				stat_ids.forEach(function (stat_id) {
					const v = stats[stat_id];
					if (typeof v !== 'undefined') {
						values.push(v);
					}
				});
				StatCalculation[stat_calc_type](values, value);
			}
		}

		return value;
	};

	Monster.prototype.infobox_level_changed = function() {
		this.update_level(Number(this.ctl.find('input[name="level"]')[0].value));
		this.update_infobox();
	};

	Monster.prototype.infobox_rarity_changed = function() {
		this.update_rarity(this.ctl.find('select[name="rarity"]')[0].value);
		this.update_infobox();
	};

	Monster.prototype.infobox_is_map_monster_changed = function() {
		this.update_is_map_monster(this.ctl.find('input[name="is_map_monster"]')[0].checked);
		this.update_infobox();
	};

	Monster.prototype.infobox_is_map_boss_changed = function() {
		this.update_is_map_boss(this.ctl.find('input[name="is_map_boss"]')[0].checked);
		this.update_infobox();
	};

	Monster.prototype.infobox_diffculty_changed = function() {
		this.update_difficulty(this.ctl.find('select[name="difficulty"]')[0].value);
		this.update_infobox();
	};

	Monster.prototype.update_infobox = function() {
		$('.monster_container').find('.info_header').css('display', 'table-cell').html(i18n.calculating);
	
		// Correct rarity of the header
		this.html.find('em.monster_name').removeClass('-normal -magic -rare -unique').addClass('-' + this.rarity.toLowerCase());
	
		const entryParams = Object.entries(Monster.calculation_params);
		for (var i=0; i<entryParams.length; i++) {
			const key = entryParams[i][0];
			const data = entryParams[i][1];
			if (key.endsWith('resistance')) {
				continue;
			}

			this.tbl.find('.monster_' + key).html(this.calculate_property(key).str(data.fmt));
		}

		const obj2 = Object.entries(['lightning', 'cold', 'fire', 'chaos']);
		for (var j=0; j<obj2.length; j++) {
			const resist_type = obj2[j][1];
			const key2 = resist_type + '_resistance';
			this.tbl.find('.monster_resistance').find('.-' + resist_type).html(this.calculate_property(key2).str(Monster.calculation_params[key2].fmt));
		}

		this.tbl.find('.monster_stat_text').html(this.stat_text);

		this.stat_bdy.find('tr').remove();
		const entryStats = Object.entries(this.stats);
		for (var k=0; k<entryStats.length; k++) {
			const stat = entryStats[k][1];
			this.stat_bdy.append('<tr><td>' + stat.id + '</td><td>' + stat.min + '</td><td>' + stat.max + '</td></tr>');
		}

		// Done, remove the calculating notice
		$('.monster_container').find('.info_header').css('display', 'none');
	};

	function fmt_number(digits, format) {
		if (typeof digits === 'undefined') {
			digits = 0;
		}

		if (typeof format === 'undefined') {
			format = '{1}';
		}

		return function(value) {
			value = value.toFixed(digits);
			return format.replace(/\{1\}/, value);
		};
	}

	Monster.level_data = [];
	Monster.rarity_data = {
		// Normal shouldn't have any stats associated with it.
		Normal: {},
		Magic: {},
		Rare: {},
		Unique: {},
	};
	Monster.mods = {};
	Monster.base_data = {};
	Monster.base_data_by_id = {};

	// Map these stats back for calcuation purposes
	Monster.stat_map = {
		'map_life_multiplier': 'map_hidden_monster_life_+%_final',
		'map_damage_multiplier': 'map_hidden_monster_damage_+%_final',
		'boss_life': 'map_hidden_monster_life_+%_final',
		'boss_damage': 'map_hidden_monster_damage_+%_final',
		'boss_item_quantity': 'monster_dropped_item_quantity_+%',
		'boss_item_rarity': 'monster_dropped_item_rarity_+%',
		// I believe these are the ones used though not at the same time
		'Magic_life_multiplier': 'monster_life_+%_final_from_rarity_table',
		'Rare_life_multiplier': 'monster_life_+%_final_from_rarity_table',
	};

	// List of things affected by each stat to calculate a final value
	Monster.calculation_params = {
		damage: {
			type: 'level',
			base: 'monsters.damage_multiplier',
			increased: [
				'damage_+%',
				'map_monsters_damage_+%',
				'map_boss_damage_+%',
			],
			more: [
				'damage_+%_final',
				'monster_rarity_damage_+%_final',
				'map_hidden_monster_damage_+%_final',
				//'map_hidden_monster_damage_+%_squared_final',
				'monster_damage_+%_final_from_watchstone',
			],
			less: [
				'monster_rarity_attack_cast_speed_+%_and_damage_-%_final',
				'monster_base_type_attack_cast_speed_+%_and_damage_-%_final',
			],
			fmt: fmt_number(0),
		},
		// map_boss_life_+permyriad_final_from_awakening_level
		life: {
			type: 'level',
			base: 'monsters.health_multiplier',
			added: [
				'base_maximum_life',
			],
			increased: [
				'maximum_life_+%',
				'map_monsters_life_+%',
				'map_boss_maximum_life_+%',
			],
			more: [
				'maximum_life_+%_final',
				'map_hidden_monster_life_+%_final',
				//'map_hidden_monster_life_+%_times_6_final',
				'monster_life_+%_final_from_map',
				'monster_life_+%_final_from_rarity',
				'monster_life_+%_final_from_rarity_table',
				'monster_life_+%_final_from_watchstone',
			],
			fmt: fmt_number(0),
		},
		summon_life: {
			type: 'level',
			base: 'monsters.health_multiplier',
			added: [
				'base_maximum_life',
			],
			increased: [
				'maximum_life_+%',
			],
			more: [
				'maximum_life_+%_final',
			],
			fmt: fmt_number(0),
		},
		evasion: {
			type: 'level',
			fmt: fmt_number(0),
		},
		accuracy: {
			type: 'level',
			increased: [
				'map_monsters_accuracy_rating_+%',
			],
			fmt: fmt_number(0),
		},
		armour: {
			type: 'level',
			fmt: fmt_number(0),
		},
		experience: {
			type: 'level',
			base: 'monsters.experience_multiplier',
			increased: [
				'map_hidden_experience_gain_+%',
			],
			override: {
				'map_monsters_no_drops_or_experience': 0,
			},
			fmt: fmt_number(0),
		},
		attack_speed: {
			type: 'base',
			base: 'monsters.attack_speed',
			increased: [
				'map_monsters_attack_speed_+%',
				'map_boss_attack_and_cast_speed_+%',
			],
			more: [
				'monster_rarity_attack_cast_speed_+%_and_damage_-%_final',
				'monster_base_type_attack_cast_speed_+%_and_damage_-%_final',
			],
			fmt: fmt_number(2),
		},
		rarity: {
			type: 'none',
			added : [
				'monster_dropped_item_rarity_+%',
			],
			//monster_dropped_item_quantity_+%_from_player_support
			more: [
				// These two should be multiplicative at least with each other as per GGG
				'map_item_drop_rarity_+%',
			],
			fmt: fmt_number(0, '{1} %'),
		},
		quantity: {
			type: 'none',
			added: [
				'monster_dropped_item_quantity_+%',
			],
			// monster_dropped_item_quantity_+%_from_player_support
			more: [
				// These two should be multiplicative at least with each other as per GGG
				'map_item_drop_quantity_+%',
				'monster_dropped_item_quantity_from_numplayers_+%',
			],
			override: {
				'map_monsters_no_drops_or_experience': 0,
			},
			fmt: fmt_number(0, '{1} %'),
		},
		lightning_resistance: {
			type: 'resist',
			added: [
				'map_monsters_additional_lightning_resistance',
			],
			fmt: fmt_number(0, '{1} %'),
		},
		cold_resistance: {
			type: 'resist',
			added: [
				'map_monsters_additional_cold_resistance',
			],
			fmt: fmt_number(0, '{1} %'),
		},
		fire_resistance: {
			type: 'resist',
			added: [
				'map_monsters_additional_fire_resistance',
			],
			fmt: fmt_number(0, '{1} %'),
		},
		chaos_resistance: {
			type: 'resist',
			added: [
				'map_monsters_additional_chaos_resistance',
			],
			fmt: fmt_number(0, '{1} %'),
		},
		critical_strike_chance: {
			type: 'base',
			base: 'monsters.critical_strike_chance',
			increased: [
				'map_monsters_critical_strike_chance_+%',
			],
			fmt: fmt_number(2, '{1} %'),
		},
		critical_strike_multiplier: {
			type: 'none',
			value: 130,
			base: 'monsters.critical_strike_multiplier',
			added: [
				'map_monsters_critical_strike_multiplier_+',
			],
			fmt: fmt_number(2, '{1} %'),
		}
	};

	function _run_final_init() {
		init_level++;
		// Prevents from being run until all the cargo data is asyncronously loaded
		if (init_level >= init_max) {
			monster_finalize_init();
		}
	}

	function init($content) {
		var main = $content.find('#monster_main:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		dataset = main.dataset;
		main.innerHTML = '<table class="monster_container">' +
			'<thead>' +
				'<tr><th class="info_header">Fetching data...</th></tr>' +
			'</thead>' +
			'<tbody></tbody>' +
		'</table>';
		i18n = {
			missing_monster: 'No monster found with ' + dataset.metadata_id,
			calculating: 'Calculating properties',
			query_error: 'A database query error has occured.',
			invalid_rarity: 'Rarity given is invalid. Only Normal, Magic, Rare and Unique are acceptable values.',
			invalid_difficulty: 'Difficulty given is invalid. Only part1, part2 and endgame are acceptable values.',
			invalid_level: 'Level given is not a number or outside of the valid range (1-100)',
			// (x to y)
			range: 'to',
		};

		Cargo.query({
			tables: ['monster_base_stats', 'monster_life_scaling', 'monster_map_multipliers'],
			fields: [
				'accuracy', 
				'armour', 
				'monster_base_stats.damage=damage', 
				'evasion', 
				'experience', 
				'monster_base_stats.level=level', 
				'monster_base_stats.life=life', 
				'summon_life', 
				'magic=Magic_life_multiplier', 
				'rare=Rare_life_multiplier', 
				'monster_map_multipliers.life=map_life_multiplier',
				'monster_map_multipliers.damage=map_damage_multiplier',
				'boss_damage',
				'boss_item_quantity',
				'boss_item_rarity',
				'boss_life',
			],
			join_on: 'monster_base_stats.level = monster_life_scaling.level, monster_base_stats.level=monster_map_multipliers.level',
		}, function (data) {
			data.forEach(function (value) {
				var v = {};
				const entryTitle = Object.entries(value.title);
				for (var i=0; i<entryTitle.length; i++) {
					v[entryTitle[i][0]] = Number(entryTitle[i][1]);
				}
				Monster.level_data[v.level] = v;
			});
			_run_final_init();
		});

		Cargo.query({
			tables: ['monsters', 'monster_types', 'monster_resistances'],
			fields: [
				//
				// Monster data
				//
				'monsters._pageName',

				'monsters.attack_speed',
				'monsters.critical_strike_chance',
				'monsters.damage_multiplier',
				'monsters.experience_multiplier',
				'monsters.health_multiplier',

				//'monsters.minimum_attack_distance',
				//'monsters.maximum_attack_distance',
				//'monsters.skill_ids',
				//'monsters.size',

				'monsters.part1_mod_ids',
				'monsters.part2_mod_ids',
				'monsters.mod_ids',
				'monsters.endgame_mod_ids',

				'monsters.metadata_id',
				'monsters.name',
				// Apprently strips the table if I don't do this
				'monsters.tags__full=monsters.tags',
				'monsters.skill_ids',
				'monsters.minimum_attack_distance',
				'monsters.maximum_attack_distance',
				'monsters.size',

				//
				// Monster type data
				//

				// Apprently strips the table if I don't do this
				'monster_types.tags__full=monster_types.tags',
				// This is kinda unconfirmed, want to leave it out for the moment
				// 'monster_types.armour_multiplier',
				// 'monster_types.damage_spread', 
				// 'monster_types.energy_shield_multiplier',
				// 'monster_types.evasion_multiplier',

				//
				// Monster resistance data
				//
				'monster_resistances.part1_fire',
				'monster_resistances.part1_cold',
				'monster_resistances.part1_lightning',
				'monster_resistances.part1_chaos',
				'monster_resistances.part2_fire',
				'monster_resistances.part2_cold',
				'monster_resistances.part2_lightning',
				'monster_resistances.part2_chaos',
				// Should rename these fields for consistency -.-
				'monster_resistances.maps_fire=monster_resistances.endgame_fire',
				'monster_resistances.maps_cold=monster_resistances.endgame_cold',
				'monster_resistances.maps_lightning=monster_resistances.endgame_lightning',
				'monster_resistances.maps_chaos=monster_resistances.endgame_chaos',
			],
			join_on: 'monsters.monster_type_id=monster_types.id, monster_types.monster_resistance_id=monster_resistances.id',
			//where: 'monsters.name LIKE "%Izaro%"',
			//limit: 2,
			//where: 'monsters.metadata_id="Metadata/Monsters/Atziri/Atziri"',
			where: dataset.where,
		}, function (data) {
			if (data.length == 0) {
				$('.monster_container').find('.info_header').text(i18n.missing_monster);

				return;
			}
			var query_mods = {};

			const entryData = Object.entries(data);
			for (var e=0; e<entryData.length; e++) {
				const index = entryData[e][0];
				const entry = entryData[e][1];
				const curdata = entry.title;

				// Need these as numbers to calcuate values later on
				[
					'monsters.attack_speed',
					'monsters.critical_strike_chance',
					'monsters.damage_multiplier',
					'monsters.experience_multiplier',
					'monsters.health_multiplier',
					'monster_resistances.part1_fire',
					'monster_resistances.part1_cold',
					'monster_resistances.part1_lightning',
					'monster_resistances.part1_chaos',
					'monster_resistances.part2_fire',
					'monster_resistances.part2_cold',
					'monster_resistances.part2_lightning',
					'monster_resistances.part2_chaos',
					// Should rename these fields for consistency -.-
					'monster_resistances.endgame_fire',
					'monster_resistances.endgame_cold',
					'monster_resistances.endgame_lightning',
					'monster_resistances.endgame_chaos',
				].forEach(function (value) {
					curdata[value] = Number(curdata[value]); 
				});
				// Needed as lists
				[
					'monsters.part1_mod_ids',
					'monsters.part2_mod_ids',
					'monsters.mod_ids',
					'monsters.endgame_mod_ids',
					'monsters.tags',
					'monsters.skill_ids',
					'monster_types.tags',
				].forEach(function (key) {
					var value = curdata[key] || [];
					if (value == "") {
						value = [];
					} else {
						value = value.split(',');
					}

					curdata[key] = value;
				});

				Monster.base_data[index] = entry.title;
				Monster.base_data_by_id[entry.title['monsters.metadata_id']] = entry.title;

				//
				// Schedule mods for querying
				//
				[
					'monsters.part1_mod_ids',
					'monsters.part2_mod_ids',
					'monsters.mod_ids',
					'monsters.endgame_mod_ids',
				].forEach(function (field) {
					curdata[field].forEach(function (mod_id) {
						query_mods[mod_id] = true;
					});
				});
			}

			var query_mods_array = [];
			const entryMods = Object.entries(query_mods);
			for (var i=0; i<entryMods.length; i++) {
				query_mods_array.push(entryMods[i][0]);
			}
			// avoids query errors due to empty IN clause
			if (query_mods_array.length > 500) {
				//TODO
				alert('FIXME: Over 500 mods');
			} else if (query_mods_array.length > 0) {
				query_mods = query_mods_array.join('", "');

				Cargo.query({
					tables: ['mods', 'mod_stats'],
					fields: [
						'mods.id=mod_id',
						'mods.stat_text=mods.stat_text',
						'mod_stats.id=stat_id',
						'mod_stats.min',
						'mod_stats.max',
					],
					join_on: 'mods._pageID=mod_stats._pageID',
					where: 
						'mods.id IN ("' + query_mods + '") OR (' +
							'mods.generation_type = 3 ' +
							'AND mods.domain = 3 ' +
							'AND mods.id REGEXP "Monster(Magic|Rare|Unique)[0-9]*$"' +
						')'
				}, function (data) {
					data.forEach(function (value) {
						var v = value.title;
						const stat = new Stat(v.stat_id, Number(v['mod_stats.min']), Number(v['mod_stats.max']));
						const rarity = v.mod_id.match(/Monster(Magic|Rare|Unique)[0-9]*$/);
						if (rarity == null) {
							if (typeof Monster.mods[v.mod_id] === 'undefined') {
								Monster.mods[v.mod_id] = {
									'stat_text': v['mods.stat_text'],
									'stats': [],
								};
							}
							Monster.mods[v.mod_id].stats.push(stat);
						} else {
							Monster.rarity_data[rarity[1]][v.stat_id] = stat;
						}
					});

					_run_final_init();
				});
			} else {
				// need to increment in any case
				_run_final_init();
			}

			_run_final_init();
		}, function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus);
			// since JS doesn't actually show the DB error the query is duplicated in the template. The error will be shown there.
			$('#monster_query_error').css('display', 'initial');
			$('.monster_container').find('.info_header').html(i18n.query_error);
		});
	}

	var m = {};

	function monster_finalize_init() {
		const obj = Object.entries(Monster.base_data_by_id);
		for (var i=0; i<obj.length; i++) {
			m[obj[i][0]] = new Monster(obj[i][0]);
		}

		$('.monster_container').find('.info_header').css('display', 'none');
	}

	//
	// Test functions
	// 
	function test_stat() {
		var a = new Stat('id', 1, 1);
		var b = new Stat('id', 5, 5);
		a.add(b);
		console.log('+ 6?', a.min, a.max);
		a.sub(b);
		console.log('- 1?', a.min, a.max);
		a.mult(b);
		console.log('* 5?', a.min, a.max);
		a.div(b);
		console.log('/ 1?', a.min, a.max);
		a.add(10);
		console.log('+ 11?', a.min, a.max);
		a.sub(10);
		console.log('- 1?', a.min, a.max);
		a.mult(10);
		console.log('* 10?', a.min, a.max);
		a.div(10);
		console.log('/ 1?', a.min, a.max);
	}
	//test_stat();

	mw.hook('wikipage.content').add(init);
})(window.jQuery, window.mediaWiki);