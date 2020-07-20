//<pre>
/* 
	Revolution calculator; see [[Calculator:Revolution]]
	css at [[MediaWiki:Common.css/revocalc.css]]
*/
/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
		 eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
		 latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
		 onevar:true, plusplus:false, quotmark:single, undef:true, unused:true,
		 strict:true, trailing:true
*/
(function ($, mw) {
	'use strict';

	var abilities = {}, abilitygroup = {}, abilityhover = {}, defaultsettings = {}, settings = {}, actionbar, preloadbars, preloadbarsorder, classes, ids, data, stunbuff = 'abcdefgh', revobar;

	//all classes in use for global change
	classes = {
		hide: 'revocalc-hover-hide', //hiding the hover
		title: 'revocalc-titlehover', //title formatting
		table: 'revocalc-table', //hover tables
		unusable: 'revocalc-unusable-ability', //unusable ability
		selectedtable: 'revocalc-table-selected' //selected table
	};
	//all ids in use for global change
	ids = {
		calc: 'revocalc-main', //main calculator encapsulation
		hover: 'revocalc-hover', //hover encapsulation
		clearslot: 'revocalc-clearslot', //hover clear slot
		shifts: 'revocalc-shift', //hover shift encapsulation
		shiftleft: 'revocalc-shift-left', //hover shift left
		shiftright: 'revocalc-shift-right', //hover shift right
		hovertabs: 'revocalc-tabs', //prefix for hover's multiple class tables
		classtable: 'revocalc-table', //prefix for hover's multiple class tables
		classsettings: 'revocalc-setting-class', //setting for class
		handsettings: 'revocalc-setting-hand', //setting for hand
		stunsettings: 'revocalc-setting-stun', //setting for stuns
		icesettings: 'revocalc-setting-ice', //setting for ice
		slayersettings: 'revocalc-setting-slayer', //setting for slayer
		barsettings: 'revocalc-setting-selectbar', //setting for preloaded bars
		ticksettings: 'revocalc-setting-ticks', //setting for ticks
		cyclesettings: 'revocalc-setting-cycle', //setting for cycle calculation enable
		cticksettings: 'revocalc-setting-cycleticks', //setting for cycle ticks
		anythingsettings: 'revocalc-setting-anythinggoes', //setting for anything goes
		settings: 'revocalc-settings', //settings encapsulation
		advanced: 'revocalc-settings-advanced', //advanced settings encapsulation
		bar: 'revocalc-actionbar', //actionbar encapsulation
		output: 'revocalc-output', //output encapsulation
		permalink: 'revocalc-permalink' //permalink encapsulation
	};
	//all data attributes in use for global change
	data = {
		barpos: 'data-actionbar-pos', //position of each li in the actionbar, int [0,13]
		hoverselect: 'data-hover-ability', //name of abilities in the hover, string [all ability names]
		combattab: 'data-revo-tab', //name of class each tab is associated with, string [melee,ranged,magic,defence]
		settingclass: 'data-setting-class', //setting for class
		abilityclass: 'data-ability-class', //ability's class
		settinghand: 'data-setting-hand', //setting for hand
		abilityhand: 'data-ability-hand', //ability's hand
		hovertab: 'data-hover-tab' //ability's hand
	};

	defaultsettings = {
		hand: 1,
		cbclass: 'melee',
		ice: false,
		stuns: false,
		slayer: false,
		ticks: 3000,
		cycle: false,
		cycleticks: 1000,
		anythinggoes: false,
		bar: []
	};

	//helper functions
	//calculates the DPT for bar simulated for ticks
	//bar		array of Ability objects, in order to be used
	//ticks		number of ticks to simulate
	function calcrevo(bar, ticks) {
		mw.log('calculating revolution...');
		var result, i, incr = 0, next, stunned = 0, nextmult = 1;
		result = {
			err: 0, //0: no error
			time: 0,
			damage: 0,
			numabils: 0,
			abilities: []
		};
		result.dpt = function () {
			if (result.time === 0) {
				return 0;
			}
			return result.damage / result.time;
		};

		if (bar.length < 1) { //if the bar is 0 length
			result.err = -1;  //-1: 'bar has no abilities'
			return result; 
		}

		//testing, print the bar
		//mw.log('bar: ' + bar.toString());

		//reset all abilities
		for (i in abilities) {
			if (abilities.hasOwnProperty(i)) {
				abilities[i].reset(); //use reset() method to make sure everything is reset correctly
			}
		}

		//main loop
		while (result.time < ticks) {
			next = 'auto'; //placeholder (autoattack support in future?)
			//reduce the current cooldown of all abilities by the duration of the previous
			for (i in abilities) {
				if (abilities.hasOwnProperty(i)) {
					abilities[i].reducecooldown(incr);
				}
			}

			//reduce stun duration
			stunned = Math.max(0, stunned - incr);

			//check each ability in the bar to find the first one off cooldown
			for (i = 0; i < bar.length; i++) {
				if (bar[i].cd === 0) {
					next = bar[i]; //set it as the next ability
					if (result.abilities.lastIndexOf(next.name) === -1) {
						result.abilities.push(next.name);
					}
					break; //finished with this loop
				}
			}

			if (next === 'auto') { //if we didn't find an ability off cooldown
				//mw.log('autoattack here');
				//mw.log('this isn\'t a working revo bar');
				//mw.log('simulated for ' + result.time + ' ticks, (' + result.numabils + ' abilities) giving DPT: ' + result.dpt() * 100 + '%');
				result.err = -2;
				return result; //return -2 'this isn't a working bar
			}

			// bleeds can't have a multiplier
			if (next.isbleed) {
				nextmult = 1;
			}

			next.putoncooldown(); //use putoncooldown() method to make sure linked abilities are also done
			incr = next.duration; //set the increment to mover forward by to the duration of the ability
			result.time += incr; //move forward by incr
			result.damage += (stunned > 0 && next.stunbuffed ? next.stundmg : next.damage) * nextmult; //increment damage, using stunbuffed damage if stunned
			if (settings.stuns && next.stundur > 0) {
				stunned = next.stundur; //if the ability stuns, set stun duration
			}
			result.numabils++;
			nextmult = next.nextmult;
			//(cooldowns reduced at start of loop)
		}

		mw.log('working! simulated for ' + result.time + ' ticks, giving DPT: ' + result.dpt() * 100 + '%');
		return result;
	}

	//turns a bar from array of ability names (strings) to array of ability objects, then calcrevos
	//primarily for testing purposes
	//abils		array of strings (ability names)
	//ticks		number of ticks to simulate revolution for
	revobar = function (abils, ticksin) {
		var bar = [], i, ticks = 3000;
		if (ticksin !== undefined && ticksin !== null && ticksin > 0) {
			ticks = ticksin;
		}
		//mw.log('reading abilities...');
		for (i = 0; i < abils.length; i++) {
			bar[i] = abilities[abils[i]];
			//mw.log('set abils ' + abils[i] + ' to ' + bar[i].tostring());
		}

		return calcrevo(bar, ticks);
	};

	//cuts out abilities that can't be used, due to setup or length of bar
	//bar		array of Ability objects
	//RETURNS	DPT of bar, or -3 if fails
	function revolution(bar) {
		var tbar = [], i, a;
		for (i = 0; i < bar.length && i < 9; i++) {
			a = bar[i];

			if (a === ' ' || a.name === undefined || a.name === null) { //make sure the ability isn't empty
				continue;
			}

			if (!a.usable()) { //check usability via method
				continue;
			}

			tbar.push(bar[i]); //add ability to trimmed bar
		}
		mw.log('Bar: ' + tbar.toString());
		if (tbar.length > 0) {
			return calcrevo(tbar, settings.ticks);
		}
		return {err:-3}; //-3: 'this ability bar has no usable abilities'
	}

	//converts internal cycle representation (0-based index) to the representation to be displayed (1-based)
	//changes each character in the string to the next one, except
	function todisplay(s) {
		var s1 = '', i, c;
		for (i = 0; i < s.length; i++) {
			c = s.charAt(i);
			if (stunbuff.indexOf(c) > -1) { //if stunbuffed, don't change the character
				s1 += c;
			} else if (c === 9) {
				s1 += '0';
			} else {
				s1 += (parseInt(c, 10) + 1);
			}
		}
		return s1;
	}


	/*  OBJECTS  */
	//Ability definition
	// Name, cooldown in ticks, duration in ticks, maximum damage, optional: minimum damage
	function Ability(obj) {
		var mindamage, i, ab, adddesc;
		this.name = obj.name; //ability name
		this.cbclass = obj.cbclass; //ability combat class
		this.hand = obj.hand; //ability handedness
		this.cooldown = obj.cooldown; //ability cooldown in ticks
		this.duration = obj.duration !== undefined ? obj.duration : 3; //ability duration in ticks
		mindamage = obj.mindamage !== undefined ? obj.mindamage : obj.maxdamage * 0.2; //if specified, use mindamage, otherwise 20% of max
		this.damage = (obj.maxdamage + mindamage) / 2; //ability average damage
		this.isbleed = obj.isbleed === true;
		this.nextmult = isNaN(parseFloat(obj.nextmult, 10)) ? 1 : parseFloat(obj.nextmult, 10);
		this.img = obj.img; //ability icon
		this.stundmg = this.damage;
		this.stunbuffed = false;
		if (obj.stunmaxdmg !== undefined) {
			mindamage = obj.stunmindmg !== undefined ? obj.stunmindmg : obj.stunmaxdmg * 0.2;
			this.stundmg = (obj.stunmaxdmg + mindamage) / 2; //ability damage if target is stunned
			this.stunbuffed = true;
		}
		this.stundur = obj.stundur !== undefined ? obj.stundur : 0; //ability duration of stun
		adddesc = obj.adddesc !== undefined ? obj.adddesc : '';

		this.desc = function () {
			var d = '';
			d += ab.name;
			switch (ab.hand) {
				case 1:
					d += '\nAny hand';
					break;
				case 2:
					d += '\nTwo-handed';
					break;
				case 3:
					d += '\nDual-wield';
					break;
				case 4:
					d += '\nShield';
					break;
			}
			if (ab.cbclass === '*') {
				d += ', any class';
			} else {
				d += ', ' + ab.cbclass;
			}

			d += '\n\nAverage damage: ' + (ab.damage * 100).toFixed(2) + '%';
			d += '\nDuration: ' + ab.duration + ' tick' + (ab.duration > 1 ? 's' : '');
			d += '\nCooldown: ' + ab.cooldown + ' tick' + (ab.cooldown > 1 ? 's' : '');
			if (ab.stundur > 0) {
				d += '\nStuns for ' + ab.stundur + ' tick' + (ab.stundur > 1 ? 's' : '');
			}
			if (ab.stunbuffed) {
				d += '\nIs buffed by stuns to average damage of ' + (ab.stundmg * 100).toFixed(2) + '%';
			}
			if (adddesc !== '') {
				d += '\n\n' + adddesc;
			}
			return d;
		};

		this.cd = 0; //ability cooldown timer
		this.usedcount = 0; //ability used counter
		this.usedbuffed = 0; //number of times this has been used when buffed by a stun

		ab = this;

		//check usability of the ability based on settings
		this.usable = function () {
			if (settings.anythinggoes) {
				return true;
			}
			if (settings.cbclass === 'ranged' && settings.hand === 2 && ab.hand === 4) {
				return true;
			}
			if (ab.cbclass !== '*' && ab.cbclass !== settings.cbclass) { //check class, has to be * or the same as settings
				return false;
			}
			if (ab.hand !== 1 && ab.hand !== settings.hand) { //check hand, has to the be 1 or same as settings
				return false;
			}
			return true;
		};

		this.cooldowngroup = [this]; //default cooldown group is just itself

		//reset various counters
		this.reset = function () {
			this.cd = 0;
			this.usedcount = 0;
			this.usedbuffed = 0;
		};

		//put this on cooldown; also put linked abilities on cooldown
		this.putoncooldown = function () {
			for (i = 0; i < this.cooldowngroup.length; i++) {
				this.cooldowngroup[i].cd = this.cooldown;
			}
		};

		//reduce cooldown by r ticks; won't go below 0
		this.reducecooldown = function (r) {
			if (this.cd === 0) {//skip the math if already 0
				return;
			}
			this.cd = Math.max(this.cd - r, 0);
		};

		//expanded tostring
		this.tostring = function () {
			var s = String(this.name + ' ' + this.cooldown + ' ' + this.duration + ' ' + this.damage);
			return s;
		};

		//default toString
		//@Override
		this.toString = function () {
			return this.name;
		};
		mw.log('created ability: ' + this.tostring());
	}

	//settings
	function Settings(insets) {
		this.cbclass = insets.cbclass;
		this.ticks = insets.ticks;
		this.cycleticks = insets.cycleticks;
		this.hand = insets.hand;
		this.stuns = insets.stuns;
		this.ice = insets.ice;
		this.anythinggoes = insets.anythinggoes;
		settings = this;

		//create the settings elements and place them
		function createsettings() {
			var s = $('#' + ids.settings), selstr, pres, selectbar, selectbarbutton, advbutton, adv, advshown, clearbutton, i;
			s.append('<div style="font-weight:bold; font-size:120%;">Settings</div>');

			//combat class
			s.append('<strong>Combat class:</strong> <select id="' + ids.classsettings + '" name="' + ids.classsettings + '"><option value="melee">Melee</option><option value="magic">Magic</option><option value="ranged">Ranged</option></select>');
			$('#' + ids.classsettings).val(settings.cbclass);

			//hand
			s.append('&nbsp;&nbsp;&nbsp;&nbsp;');
			s.append('<strong>Handedness:</strong> <select id="' + ids.handsettings + '" name="' + ids.handsettings + '"><option value="1">One-handed</option><option value="2">Two-handed</option><option value="3">Dual-wielding</option><option value="4">One-hand and shield</option></select>');
			$('#' + ids.handsettings).val(settings.hand);

			//stuns
			s.append('<br />');
			s.append('<label class="' + classes.title + '" title="Check this to allow stuns and stun-buffed abilities like Punish to be accounted for in the DPT. This is only reflective of damage to monsters that are not stun-immune." for="' + ids.stunsettings + '">Account for stuns?</label>&nbsp;' +
					 '<input name="' + ids.stunsettings + '" id="' + ids.stunsettings + '" type="checkbox" />');
			if (settings.stuns) {
				$('#' + ids.stunsettings).attr('checked', 'checked');
			}

			//ice spells
			s.append('&nbsp;&nbsp;&nbsp;&nbsp;');
			s.append('<label class="' + classes.title + '" title="If using ice spells, Wrack always does higher damage; check this to account for this. Doesn\'t apply to stun immune monsters or in PvP." for="' + ids.icesettings + '">Ice spells?</label>&nbsp;' +
					 '<input name="' + ids.icesettings + '" id="' + ids.icesettings + '" type="checkbox" />');
			if (settings.ice) {
				$('#' + ids.icesettings).attr('checked', 'checked');
			}

			//slayer
			s.append('&nbsp;&nbsp;&nbsp;&nbsp;');
			s.append('<label class="' + classes.title + '" title="If on a Slayer task, Tuska\'s Wrath does high, fixed damage with a long cooldown. Off-task, it does ability damage on a short cooldown. Check this to be on-task. (Some monsters are immune to the higher damage.)" for="' + ids.slayersettings + '">Slayer?</label>&nbsp;' +
					 '<input name="' + ids.slayersettings + '" id="' + ids.slayersettings + '" type="checkbox" />');
			if (settings.slayer) {
				$('#' + ids.slayersettings).attr('checked', 'checked');
			}




			selstr = '<select name="' + ids.barsettings + '" id="' + ids.barsettings + '"><option value="def">Select a bar</option>';
			for (i = 0; i < preloadbarsorder.length; i++) {
				pres = preloadbarsorder[i];
				if (pres === 'sep') {
					selstr += '<option value="sep" disabled="disabled">----</option>';
				} else {
					selstr += '<option value="' + pres + '">' + preloadbars[pres].name + '</option>';
				}
			}
			selectbar = $(selstr + '</select>');
			selectbarbutton = $('<input type="button" value="Load bar" />');

			//loading bars
			s.append('<br />');
			s.append('<label class="' + classes.title + '" title="Load a pre-existing bar from optimal and default bars, defined on the revolution article. This will replace your existing bar and cannot be undone!" for="' + ids.barsettings + '">Load a bar:</label>&nbsp;');
			s.append(selectbar);
			s.append('&nbsp;');
			s.append(selectbarbutton);

			//show/hide button for advanced settings
			advshown = false;
			advbutton = $('<input type="button" name="advanced-toggle" value="' + (advshown ? 'Hide' : 'Show') + ' advanced settings' + '" />');
			s.append('<br />');
			s.append(advbutton);

			clearbutton = $('<input type="button" name="clear-bar" value="Clear bar (cannot be undone!)" />');
			s.append(clearbutton);

			//permalink
			s.append('&nbsp;&nbsp;&nbsp;&nbsp;');
			s.append('<span id="' + ids.permalink + '"><a target="_blank" href="">[Permalink]</a></span>');


			s.append('<br />');

			adv = $('<div id="' + ids.advanced + '" class="' + classes.hide + '"></div>'); //advanced menu

			//revolution simulation ticks
			adv.append('<label class="' + classes.title + '" title="Number of ticks to simulate revolution for. More ticks may make the calculated DPT more accurate, at the cost of more processing required. There are 100 ticks per minute." for="' + ids.ticksettings + '">Ticks</label>&nbsp;' +
					   '<input name="' + ids.ticksettings + '" id="' + ids.ticksettings + '" type="number" min="1" value="' + settings.ticks + '"/>');

			//cycle calculation toggle
			adv.append('<br />');
			adv.append('<label class="' + classes.title + '" title="Attempts to find the stable cycle for the bar. Increases computation time to find an idealised AADPT for the bar. See full details below." for="' + ids.cyclesettings + '">Calculate cycle?</label>&nbsp;' +
					   '<input name="' + ids.cyclesettings + '" id="' + ids.cyclesettings + '" type="checkbox" "' + (settings.cycle ? 'checked' : '') + ' "/>');

			//cycle simulation ticks
			adv.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
			adv.append('<label class="' + classes.title + '" title="Number of ticks to simulate revolution for when calculating the cycle. Too few ticks and the cycle may not be found. Increasing this has no effect if the cycle is found. There are 100 ticks per minute, and generally no more than 10 minutes are needed to find any cycle." for="' + ids.cticksettings + '">Cycle Ticks</label>&nbsp;' +
					   '<input name="' + ids.cticksettings + '" id="' + ids.cticksettings + '" type="number" min="1" value="' + settings.cycleticks + '"/>');

			//anything goes toggle
			adv.append('<br />');
			adv.append('<label class="' + classes.title + '" title="Check this to remove the class/hand restrictions!" for="' + ids.anythingsettings + '">Anything goes!</label>&nbsp;' +
					   '<input name="' + ids.anythingsettings + '" id="' + ids.anythingsettings + '" type="checkbox" "' + (settings.anythinggoes ? 'checked' : '') + ' "/>');

			s.append(adv);

			//click event for advanced settings button
			$(advbutton).click(function (event) {
				advshown = !advshown;
				$(adv).toggleClass(classes.hide);
				$(event.currentTarget).val((advshown ? 'Hide' : 'Show') + ' advanced settings');
				actionbar.repositionhover();
			});
			//click event for clear bar
			$(clearbutton).click(function () {
				actionbar.setbar([]);
			});

			//click event for load
			$(selectbarbutton).click(function () {
				var bar;
				if (selectbar.val() !== 'def') {
					bar = preloadbars[selectbar.val()];
					mw.log('setting bar to ' + selectbar.val());
					actionbar.setbar(bar.bar);
					settings.cbclass = bar.cbclass;
					settings.hand = bar.hand;
					$('#' + ids.classsettings).val(bar.cbclass);
					$('#' + ids.handsettings).val(bar.hand);
				}
				settings.checkabilities();
				actionbar.redraw();
				actionbar.recalc();
			});

			//onChange event for the checkbox, radio and text fields
			$('#' + ids.settings + ' input, #' + ids.settings + ' select').change(function (event) {
				var target = $(event.currentTarget), v, redraw = false;
				mw.log('something changed!  ' + target.attr('name') + ' = ' + target.val());

				if (target.attr('name') === ids.classsettings) {
					settings.cbclass = target.val();
					redraw = true;
				} else if (target.attr('name') === ids.handsettings) {
					settings.hand = parseInt(target.val(), 10);
					redraw = true;
				} else if (target.attr('name') === ids.ticksettings || target.attr('name') === ids.cticksettings) {
					v = parseInt(target.val(), 10);
					if (v > 0 && Math.floor(v) === v) {
						if (target.attr('name') === ids.ticksettings) {
							settings.ticks = target.val();
						} else {
							settings.cycleticks = target.val();
						}
						target.removeAttr('title');
						target.removeAttr('style');
					} else {
						target.css('background', 'red');
						target.attr('title', 'Please enter a positive integer');
					}
					redraw = true;
				} else if (target.attr('name') === ids.stunsettings) { //stuns
					settings.stuns = target.attr('checked') === 'checked';
					redraw = true;
				} else if (target.attr('name') === ids.icesettings) { //ice
					settings.ice = target.attr('checked') === 'checked';
					redraw = true;
				} else if (target.attr('name') === ids.slayersettings) { //slayer
					settings.slayer = target.attr('checked') === 'checked';
					redraw = true;
				} else if (target.attr('name') === ids.cyclesettings) { //cycle
					settings.cycle = target.attr('checked') === 'checked';
					redraw = true;
				} else if (target.attr('name') === ids.anythingsettings) { //anything goes
					settings.anythinggoes = target.attr('checked') === 'checked';
					redraw = true;
				}

				//redraw
				if (redraw) {
					settings.checkabilities();
					actionbar.redraw();
					actionbar.recalc();
				}
			});

			settings.checkabilities();
		}

		//centralised point for checking ability status, if needed
		this.checkabilities = function () {
			var tw;
			mw.log('checking abilities');
			abilities.Wrack.damage = settings.ice ? 1.25 * 0.6 : 0.94 * 0.6; //hardcoded, probably a better way of doing this
			tw = abilities["Tuska's Wrath"];
			if (settings.slayer) {
				tw.damage = 100*99/1666; //t90 ability damage, lv 99 stats
				tw.cooldown = 200;
			} else {
				tw.damage = 1.1 * 0.6;
				tw.cooldown = 25;
			}
			$('td[' + data.hoverselect + '="Tuska\'s Wrath"]').attr('title', tw.desc());
		};

		createsettings();
	}

	//Cycle
	//ability bar
	function Cycle(ab) {
		this.hascycle = false;
		this.cycleints = '';
		this.cycle = '';
		this.haspreamble = false;
		this.preambleints = '';
		this.preamble = '';
		this.time = 0;
		this.damage = 0;
		this.preambletime = 0;
		this.preambledamage = 0;
		this.used = '';
		this.usedbuffed = [];
		var cy = this;

		this.bar = ab.slice(0,9);

		//calculate the DPT, string and time of the cycle [and preamble]
		function calccycle() {
			var dam = 0, t = 0, s = '', i, j;

			//DPT loop
			for (i = 0; i < cy.cycleints.length; i++) { //for every int in the cycle
				j = cy.cycleints.charAt(i);
				if (stunbuff.indexOf(j) > -1) {
					j = stunbuff.indexOf(j);
					s += cy.bar[j].name + '*, '; //add its name to the string
					dam += cy.bar[j].stundmg; //add its damage
					t += cy.bar[j].duration; //add its time
				} else {
					s += cy.bar[j].name + ', '; //add its name to the string
					dam += cy.bar[j].damage; //add its damage
					t += cy.bar[j].duration; //add its time
				}
			}
			//set vars
			cy.cycle = s + '<em>repeat</em>';
			cy.time = t;
			cy.damage = dam / t;

			//if there's a preamble, do the same for the preamble
			if (cy.haspreamble) {
				dam = 0;
				t = 0;
				s = '';
				for (i = 0; i < cy.preambleints.length; i++) {
					j = cy.preambleints.charAt(i);
					if (stunbuff.indexOf(j) > -1) {
						j = stunbuff.indexOf(j);
						s += cy.bar[j].name + '*, '; //add its name to the string
						dam += cy.bar[j].stundmg; //add its damage
						t += cy.bar[j].duration; //add its time
					} else {
						s += cy.bar[j].name + ', '; //add its name to the string
						dam += cy.bar[j].damage; //add its damage
						t += cy.bar[j].duration; //add its time
					}
				}
				cy.preambledamage = dam / t;
				cy.preamble = s + '<em>enter cycle</em>';
				cy.preambletime = t;
			}
		}

		//take the last character of a string and place it at the front
		function cyclefore(s) {
			var s1 = s.slice(-1);
			s1 += s.slice(0, -1);
			return s1;
		}

		//check if all of the used abilities are in a string
		function usedAll(c) {
			var u = true, i;
			for (i = 0; i < cy.used.length; i++) {
				if (c.indexOf(cy.used.charAt(i)) === -1) {
					u = false;
					break;
				}
			}
			for (i = 0; i < cy.usedbuffed.length; i++) {
				if (c.indexOf(cy.usedbuffed[i]) === -1) {
					u = false;
					break;
				}
			}
			return u;
		}

		//attempt to find a cycle from a string of integers
		function findcycle(v) {
			var c = '', l = v.length, i = 0, ms = 0, c2, jind, cycl, jind2, j;
			cy.hascycle = false;

			//main loop
			//work until a cycle is found or the entire string is exhausted
			while (!cy.hascycle && l >= 2 * i) {
				i++;
				c = v.slice(-i); //take the last i integers of the string, name c
				if (usedAll(c) && v.slice(-2 * i).indexOf(c + c) > -1) { //if all the abilities are present in the string AND c repeated twice is the last 2i of the string...
					cy.hascycle = true; //we have a cycle
				}
			}

			//quit if cycle was not found - not enough ints
			if (!cy.hascycle) {
				mw.log('No cycle');
				return;
			}
			cy.cycleints = c;
			mw.log('c ' + cy.cycleints);

			//check for preamble

			//if the first <cycle length> integers of the string v are present in the cycle (check against the cycle repeated), there is no preamble
			c2 = cy.cycleints + cy.cycleints;
			if (c2.indexOf(v.slice(0, cy.cycleints.length)) > -1) {
				cy.haspreamble = false;
				cy.cycleints = v.slice(0, cy.cycleints.length); //reorder
			} else { //else we have a preamble, attempt to find it
				cy.haspreamble = true;
				jind = v.indexOf(cy.cycleints); //find where the cycle starts
				cycl = cy.cycleints.toString(); //make a copy of the cycle
				for (j = 0; j < cycl.length; j++) { //loop for the length of the cycle
					cycl = cyclefore(cycl); //move the cycle startpoint by 1
					jind2 = v.indexOf(cycl); //find where this version of the cycle starts
					if (jind2 === -1) {
						return; //if we can't find it, there's something wrong, back out
					}
					if (jind2 < jind) { //if the new version of the cycle starts earlier than the old version
						ms += jind2 - jind; //find how much it differs by and add it to ms
						jind = jind2; //and set the old cycle to be the new one
					}
				}
				cy.preambleints = v.slice(0, jind); //set the preamble
				mw.log('p: ' + cy.preambleints);
			}

			if (ms > 0) { //reorder the cycle based on the startpoint following the preamble
				c = cy.cycleints;
				cy.cycleints = c.slice(c.indexOf(ms));
				cy.cycleints += c.slice(0, c.indexOf(ms));
				mw.log('reordered c: ' + cy.preambleints);
			}

			calccycle();
		}

		//simulate revolution for a number of ticks; same as calcrevo() above, but captures the bar position instead of damage or time
		function simrevo() {
			mw.log('starting simrevo');
			var s = '', time = 0, incr = 0, broke = false, stunned = 0, next, i, j, usedtemp = [];

			for (i in abilities) {
				if (abilities.hasOwnProperty(i)) {
					abilities[i].reset();
				}
			}

			while (time < settings.cycleticks) {
				next = -1;

				for (i in abilities) {
					if (abilities.hasOwnProperty(i)) {
						abilities[i].reducecooldown(incr);
					}
				}

				stunned = Math.max(0, stunned - incr);

				for (i = 0; i < cy.bar.length; i++) {
					if (cy.bar[i] !== ' ' && cy.bar[i].usable !== null && cy.bar[i].usable() && cy.bar[i].cd === 0) {
						next = cy.bar[i];
						break;
					}
				}

				if (next === -1) {
					broke = true;
					break;
				}

				next.putoncooldown();
				next.usedcount++;
				incr = next.duration;
				time += incr;
				j = i;
				if (stunned > 0 && next.stunbuffed) {
					j = stunbuff.charAt(i);
					next.usedbuffed++;
				}
				if (settings.stuns && next.stundur > 0) {
					stunned = next.stundur; //if the ability stuns, set stun duration
				}

				s += j; //grab the bar position
			}

			if (broke) {
				mw.log('not a working revobar');
				return;
			}

			//find out which abilities are used
			for (i = 0; i < cy.bar.length; i++) {
				if (cy.bar[i].usedcount > 2 && usedtemp.indexOf(cy.bar[i]) === -1) { //if it is only used once, its in the preamble
					cy.used += i;
					usedtemp.push(cy.bar[i]);
				}
				if (cy.bar[i].usedbuffed > 2) {
					cy.usedbuffed.push(stunbuff[i]);
				}
			}

			mw.log('Simulated revo for ' + time + ' ticks, giving ' + s + '  using ' + cy.used + ' and usedbuffed ' + cy.usedbuffed.toString());
			findcycle(s);

		}

		simrevo();
	}

	//Actionbar
	function Actionbar(insets) {
		var ab = this, i, hover, selected, prevselectedclass = '';
		actionbar = this;
		//setup the basic divs
		$('#' + ids.calc).html('<div id="' + ids.settings + '"></div><ul class="actionbar-revolution" id="' + ids.bar + '"></ul><div id="' + ids.output + '"></div>');
		settings = new Settings(insets);
		//setup bar array with 14 blanks
		this.bar = insets.bar;

		//sets position i to Ability a
		this.setability = function (i, a) {
			mw.log('set ' + i + ' to ' + a.name);
			var li = $('li[' + data.barpos + '=' + i + ']');

			//if the ability is clear, reset the slot to empty
			if (a.name === 'clear') {
				this.bar[i] = ' ';
				li.html('<img src="" />');
				li.attr(data.abilityclass, '*');
				li.attr(data.abilityhand, '0');
			} else { //otherwise set the image and bar
				this.bar[i] = a;
				li.html('<img title="' + a.name + '" src="' + a.img + '" />');
				li.attr(data.abilityclass, a.cbclass);
				li.attr(data.abilityhand, a.hand);
			}
		};

		this.setbar = function (inbar, obj) {
			for (i = inbar.length; i < 14; i++) {
				inbar[i] = abilities.clear;
			}
			if (obj) {
				for (i = 0; i < inbar.length; i++) {
					if (inbar[i] === ' ') {
						ab.setability(i, abilities.clear);
					} else {
						ab.setability(i, inbar[i]);
					}
				}
			} else {
				for (i = 0; i < inbar.length; i++) {
					ab.setability(i, abilities[inbar[i]]);
				}
			}
			actionbar.recalc();
		};

		this.shift = function (locin, dir) {
			var newbar = [],
			loc = parseInt(locin, 10);
			if (dir === 'r') { 
				newbar = newbar.concat(ab.bar.slice(0, loc), abilities.clear, ab.bar.slice(loc, 13));
				if (loc < 13) {
					selected = '' + (loc + 1);
				}
			} else if (dir === 'l') {
				if (loc === 0) {
					newbar = ab.bar;
					newbar.shift();
				} else {
					newbar = newbar.concat(ab.bar.slice(0, loc - 1), ab.bar.slice(loc, 13));
					selected = '' + (loc - 1);
				}
			} else {
				return;
			}
			ab.setbar(newbar, true);
			ab.repositionhover();
		};

		//redraw the entire bar; called when settings change so usable items change
		this.redraw = function () {
			if (settings.anythinggoes) { //if anything goes, the attrs are *
				$('[' + data.settingclass + ']').attr(data.settingclass, '*');
				$('[' + data.settinghand + ']').attr(data.settinghand, '*');
			} else {
				$('[' + data.settingclass + ']').attr(data.settingclass, settings.cbclass);
				$('[' + data.settinghand + ']').attr(data.settinghand, settings.hand);
			}
		};

		//make the hover thingy
		this.createhover = function () {
			var imgs, j, abils, o = ['melee', 'magic', 'ranged', 'defence'], curab;
			mw.log('creating hover');
			$('#' + ids.hover).remove();
			hover = $('<div id="' + ids.hover + '" class="' + classes.hide + '" ' + data.settingclass + '="' + settings.cbclass + '" ' + data.settinghand + '="' + settings.hand + '" ' + data.hovertab + '="melee"></div>'); //hover wrapper
			//make the top table, selecting combat style tab
			hover.append('<table id="' + ids.hovertabs + '"><tr>' +
						 '<td><img ' + data.combattab + '="melee" src="' + abilitygroup.melee + '" /></td>' +
						 '<td><img ' + data.combattab + '="ranged" src="' + abilitygroup.ranged + '" /></td>' +
						 '<td><img ' + data.combattab + '="magic" src="' + abilitygroup.magic + '" /></td>' +
						 '<td><img ' + data.combattab + '="defence" src="' + abilitygroup.defence + '" /></td>' +
						 '<td><img ' + data.combattab + '="close" src="' + abilitygroup.close + '" /></td>' +
						 '</tr></table>');

			//fill in each table
			for (i = 0; i < o.length; i++) {
				imgs = '<table class="' + classes.table + '" id="' + ids.classtable + '-' + o[i] + '"><tr>'; //beginning
				abils = abilityhover[o[i]]; //grab the order of the abilities for this cbclass
				for (j = 0; j < abils.length; j++) { //for each listed ability
					curab = abilities[abils[j]];
					mw.log(curab);
					if (j > 0 && j % 4 === 0) { //every fifth ability, add a new row
						imgs += '</tr><tr>';
					}
					imgs += '<td ' + data.hoverselect + '="' + curab.name + '" title="' + curab.desc() + '" ' + data.abilityclass + '="' + curab.cbclass + '" ' + data.abilityhand + '="' + curab.hand + '"><img src="' + curab.img + '" /></td>'; //add a td for the ability
				}
				imgs += '</tr></table>';//close the table for the cbclass
				hover.append(imgs); //append it and move to next class
			}
			hover.append('<div id="' + ids.shifts + '"><span id="' + ids.shiftleft + '">Shift left</span><span id="' + ids.shiftright + '">Shift right</span></div>');
			hover.append('<div id="' + ids.clearslot + '" ' + data.hoverselect + '="clear" title="' + abilities.clear.desc() + '" ' + data.abilityclass + '="' + abilities.clear.cbclass + '" ' + data.abilityhand + '="' + abilities.clear.hand + '">Clear ability</div>');

			mw.log('hover created, appending');
			$('body').append(hover);//put hover in body so it can be positioned correctly

			//click events
			//when clicking the tab, switch to that tab
			$('#' + ids.hover + ' td>img[' + data.combattab + ']').click(function (event) {
				var target = $(event.currentTarget);
				mw.log('click event at ' + target.attr(data.combattab).toString() + ' tab');
				if (target.attr(data.combattab) === 'close') {
					ab.hidehover();
				} else {
					ab.changevisibletab(target.attr(data.combattab));
				}
			});

			//when clicking an ability, put that ability into the bar and hide hover
			$('#' + ids.hover + ' [' + data.hoverselect + ']').click(function (event) {
				mw.log('click event at ' + $(event.currentTarget).attr(data.hoverselect).toString());
				ab.setability(selected, abilities[$(event.currentTarget).attr(data.hoverselect)]);
				ab.hidehover();
				ab.recalc();
			});

			//when clicking shifts, perform the shift
			$('#' + ids.shiftleft).click(function () {
				mw.log('shifting left at ' + selected);
				ab.shift(selected, 'l');
			});
			$('#' + ids.shiftright).click(function () {
				mw.log('shifting right at ' + selected);
				ab.shift(selected, 'r');
			});

			ab.changevisibletab('melee');
		};

		//change the visible tab
		this.changevisibletab = function (newclass) {
			mw.log('changing displayed tab from ' + prevselectedclass + ' to ' + newclass);
			$('#' + ids.hover).attr(data.hovertab, newclass);
		};

		//make the hover visible
		this.showhover = function (event) {
			var offset = $(event.currentTarget).offset();
			mw.log('click event at ' + offset.top + ',' + offset.left);
			hover.css({'top': (offset.top + 39) + 'px', 'left': offset.left + 'px'}); //position it underneath the actionbar at the point clicked
			hover.removeClass(classes.hide);
			selected = $(event.currentTarget).attr(data.barpos);
			if (selected === null || selected === undefined) {
				selected = $(event.currentTarget).parent().attr(data.barpos);
			}
		};

		//move the hover when the settings open
		this.repositionhover = function () {
			mw.log(selected);
			if (selected === null || selected === undefined) { //if nothing is selected, ignore
				return;
			}
			var offset = $('#' + ids.bar + ' li[' + data.barpos + '="' + selected + '"]').offset();
			hover.css({'top': (offset.top + 39) + 'px', 'left': offset.left + 'px'}); //position it underneath the actionbar at the point clicked
		};

		//hide the hover
		this.hidehover = function () {
			hover.addClass(classes.hide);
			selected = null;
		};

		//recalculate the value of the bar
		//called whenever changes happen
		this.recalc = function () {
			mw.log('recalculating bar');
			var barval = revolution(this.bar), cycle, inside = '';
			if (barval.err === -1) {
				inside += 'No abilities in bar. Click a slot to add some!';
			} else if (barval.err === -2) {
				inside += 'Not enough abilities to use revolution continuously. Click a slot to add some more!<br /><br />';
				//														Math.ceil because of rounding inconsistencies - we don't want 1.7999999999999999 seconds, 1.8 is fine
				inside += 'This bar will use revolution for ' + barval.time + ' ticks (' + Math.ceil(barval.time * 6) / 10 + ' seconds; ' + barval.numabils + (barval.numabils === 1 ? ' ability' : ' abilities') + ') before hitching, with an ADPT of ' + (barval.dpt() * 100) + '% for that duration';
			} else if (barval.err === -3) {
				inside += 'No usable abilities in bar. Click a slot to add some!';
			} else {
				inside += 'This revolution bar has an average ADPT of ' + (barval.dpt() * 100) + '%';
				inside += '<br />Abilities used: ' + barval.abilities.join(', ');
				if (settings.cycle) {
					cycle = new Cycle(this.bar);
					inside += '<br />Cycle is ' + todisplay(cycle.cycleints) + ' (' + cycle.cycle + '), taking ' + cycle.time + ' ticks per cycle, giving ' + (cycle.damage * 100) + '% ADPT';
					inside += '<br />Cycle ' + (cycle.haspreamble ? 'has preamble ' + todisplay(cycle.preambleints) + ' (' + cycle.preamble + '), taking ' + cycle.preambletime + ' ticks, giving ' + (cycle.preambledamage * 100) + '% ADPT' : 'has no preamble');
				}
			}
			$('#' + ids.output).html(inside);
			regenPermalink(settings, ab.bar);
		};

		//draw the initial bar
		function draw() {
			var inside = '', j, gab;
			for (j = 0; j < 14; j++) {
				inside += '<li ' + data.barpos + '="' + j + '" ' + data.abilityclass + '="*" ' + data.abilityhand + '="0"> </li>';
			}

			gab = $('#' + ids.bar);
			gab.html(inside);
			gab.attr(data.settingclass, settings.cbclass);
			gab.attr(data.settinghand, settings.hand);
		}

		this.createhover();
		draw();
		this.setbar(this.bar);
		this.recalc();
		//setup the hover click event
		$('#' + ids.bar + '>li').click(function (event) {
			ab.showhover(event);
		});
	}

	//ability factory
	function makeAbility(obj) {
		abilities[obj.name] = new Ability(obj);
	}

	//set the cooldown group of all abilities
	function setcooldowngroup(ab) {
		var abil = [], i;
		for (i = 0; i < ab.length; i++) {//turn string array into Ability array
			abil[i] = abilities[ab[i]];
		}
		for (i = 0; i < abil.length; i++) {
			abil[i].cooldowngroup = abil;
		}
	}

	function setupAbilities() {
		mw.log('setting up abilities...');
		//makeAbility(name,class,hand,img,cooldown,duration,maxdamage,o: mindamage)

		/* src imgs for data uris
		generated with <http://dopiaza.org/tools/datauri/index.php>

		<https://images.wikia.nocookie.net/__cb20120626183224/runescape/images/a/ad/Slice.png>
		<https://images.wikia.nocookie.net/__cb20120626183251/runescape/images/5/5b/Havoc.png>
		<https://images.wikia.nocookie.net/__cb20120626183257/runescape/images/8/82/Backhand.png>
		<https://images.wikia.nocookie.net/__cb20120626184615/runescape/images/2/29/Smash.png>
		<https://images.wikia.nocookie.net/__cb20120626184623/runescape/images/5/5b/Barge.png>
		<https://images.wikia.nocookie.net/__cb20120626184641/runescape/images/f/fa/Sever.png>

		<https://images.wikia.nocookie.net/__cb20120626192336/runescape/images/e/e5/Kick.png>
		<https://images.wikia.nocookie.net/__cb20120626192343/runescape/images/7/7b/Punish.png>
		<https://images.wikia.nocookie.net/__cb20120626192352/runescape/images/8/80/Dismember.png>
		<https://images.wikia.nocookie.net/__cb20120626192401/runescape/images/4/46/Fury.png>
		<https://images.wikia.nocookie.net/__cb20120626193538/runescape/images/c/c8/Cleave.png>
		<https://images.wikia.nocookie.net/__cb20120626193556/runescape/images/0/04/Decimate.png>

		<https://images.wikia.nocookie.net/__cb20120626205327/runescape/images/1/1f/Wrack.png>
		<https://images.wikia.nocookie.net/__cb20120626205326/runescape/images/3/32/Dragon_Breath.png>
		<https://images.wikia.nocookie.net/__cb20130508084743/runescape/images/7/74/Sonic_Wave.png>
		<https://images.wikia.nocookie.net/__cb20120626205326/runescape/images/e/ef/Impact.png>
		<https://images.wikia.nocookie.net/__cb20130508084406/runescape/images/5/5b/Concentrated_Blast.png>
		<https://images.wikia.nocookie.net/__cb20120626205325/runescape/images/e/e7/Combust.png>
		<https://images.wikia.nocookie.net/__cb20120626205324/runescape/images/a/ae/Chain.png>
		<https://images.wikia.nocookie.net/__cb20150727155343/runescape/images/1/1f/Corruption_Blast.png>

		<https://images.wikia.nocookie.net/__cb20120626203805/runescape/images/4/48/Piercing_Shot.png>
		<https://images.wikia.nocookie.net/__cb20120626204032/runescape/images/4/40/Snipe.png>
		<https://images.wikia.nocookie.net/__cb20130508085345/runescape/images/3/3c/Dazing_Shot.png>
		<https://images.wikia.nocookie.net/__cb20120626203804/runescape/images/0/05/Binding_Shot.png>
		<https://images.wikia.nocookie.net/__cb20130508085321/runescape/images/2/2d/Needle_Strike.png>
		<https://images.wikia.nocookie.net/__cb20120626203804/runescape/images/f/f2/Fragmentation_Shot.png>
		<https://images.wikia.nocookie.net/__cb20120626203806/runescape/images/8/87/Ricochet.png>
		<https://images.wikia.nocookie.net/__cb20150812120625/runescape/images/c/c6/Corruption_Shot.png>

		<https://images.wikia.nocookie.net/__cb20120626200415/runescape/images/e/ef/Anticipation.png>
		<https://images.wikia.nocookie.net/__cb20120626200835/runescape/images/9/90/Freedom.png>
		<https://images.wikia.nocookie.net/__cb20120626200422/runescape/images/d/d8/Bash.png>
		<https://images.wikia.nocookie.net/__cb20120626200835/runescape/images/6/6b/Provoke.png>

		<https://images.wikia.nocookie.net/__cb20131212101809/runescape/images/1/18/Sacrifice.png>
		<https://images.wikia.nocookie.net/__cb20150603004115/runescape/images/7/77/Tuska%27s_Wrath.png>
		*/

		//attack
		makeAbility({name: 'Slice', cbclass: 'melee', hand: 1, cooldown: 5, maxdamage: 1.20, mindamage: 0.3, stunmindmg: 0.8, stunmaxdmg: 1.46, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIbCziKUaMAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAMxQTFRFBgIBCwoGEw4FGhIEIhsHJg4CKyAHMyYGOyoGPBYAPygaQDs2QjMIRSgERzcXSU9WSzcHVjkFWSQDWUQHXDMbXFVRXmFnYkwZZUMFZjgCZ00GaT4uamxsb11WcnqCc1Y0dIKadTsFeFAGfFccflwFhXVphoeNinFCjl4Ej28FkpadmYaCnZWEnnMEn6asoGACrYZmrnkEr7C0tZuQuKegu5YDu7u7vX4CxMbHzNHY0JMD16oD29/k3sME5qkD7PH38cQD8+Pb+aoB/f36Cyt4cAAAAp5JREFUKM81k2FT4yoUhk+AHjCSLJjaIqs1QZKlsWlvqrHbtLe6t///P13izM7w7eE58wIvkFKe53nKpUxzxVnKUoQEkoQQxigApzxLqNKSIVeCcsYYoYRQFjklgFwgIUIqVUgUViIyLpEyJACMAY2CkAViIQ1SW8i4JDIWt5EkgQwICqUU59IUnHsvrbNKcuSUJQBLBMZp4QqujDG8WFvbhc4iYjLZuU5AKBeCldZ6K/red4dDr2JqAAJLbjKitOu6yDtfuPE0DKFaPte3QAjMdbCaC+H7tfXduu+Gwbl6fz6eayAUcqu9U7YQw9BbfTiNbvn253o9tk2KEcfYzquwNnr8Cnbcmc3nN9ze30jOwVLUxrp+7MLXaWeeztfred82+2ZmnEjBOyFdYUy4fJ3Cyz7C47Zp3rd5pp1EyDufuODC4etfW39eP4/7toz0540rlEKYy57r3h/G7vkjqh9t07y+bW9vuHRCSPDCj2E87arXv+rmvY2TrZAWUwjeXS6Df/4d835sm4mu0odDb3kiM4RDN46931y/1Wb1utk+3lW27zWlScJgHA7Vr/MEm6jWm/bHXT846wxDQRhcdu5tOk1bRvjPtnyuVHfpkRaCx1eF8Os4qWXZTnQhHsalHDuGWiktEN6/LyLSehocOuI76oJSmSx0TB7Vj2ZS67a8fQhDAGGEz6iSmaAM/qp1u5pXAfx/CBqlYd9tE/C7jepj3bQ/HnYhZDPrkhkkRsSeUswhDl491WX5865aH5ylEDQImFGgs1mM1paL+8dylVadNJ0TjNqQaaRIs2kHlIunVbm4c74PsRlCy8w7jK2OEABhcb8qb7MqmMLRTDGa6axQHOMn4RwlLMrV3IW5LTKTL18EXS7ncymYECx/0fn/05NarRumX2gAAAAASUVORK5CYII='});  //averages 0.7
		makeAbility({name: 'Havoc', cbclass: 'melee', hand: 3, cooldown: 17, maxdamage: 1.57, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIdLbzdc9gAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAATVQTFRFBgIBCwoGEw4FGhIEIhsHJg4CJygmKyAHMyYGOyoGPBYAPRkPPygaQDs2QjMIRSgERzcXSU9WSzcHVjkFWSQDWUQHXDMbXFVRXk84XmFnYkwZZUMFZjgCZ00GaT4uamxsb11WcnqCc1Y0eD4geFAGfFccflwFhXVphoeNiUQwinFCjHEdjl4Ej28Fkpadk1s0l0FEmV9JmYaCnnMEn3kZn6aso3M8p3NNq3VlrYZmrnkEr7C0tZuQtl5at3c8uKeguXlQupUcu4t9u5YDu7u7vX4CvZpNvnxnwFw1wZJlxMbHzNHYzoZpz5QY0JMD05pt06mc1JBV1akg1qSD16oD2sCx29/k3sME4cEk566b6Max7PH3762C8O3o8cQD8+Pb9aFs+aoB+cqY+cuy+vUC/eit/f36Ea2JuwAAAtxJREFUKM9Fkmt7mzYAhWWwwCAR4uAIswQlXJZA51jRPEedyUWrvbKSdDRdytZ66bqG8v9/wkT37Nn5Jr065+gGdE0fmqM900pTb/rmw4c3Uyu0rDDcMU1zOACmro8g3DuxwkX89OXz5y9P36be2TrcsUxdM4GWHevQctNFOnv19KfS06vD9cczL4TAz4YABI/z3Ul6sPh19fJ9j9+LdftwMnPx/DEAQAdR08TpavX37xd3sq7L3y7a9uHh0G+aCADgQiermmezj+1P/Hoi+ERevW3bxWlTZQ6AQHf1seKbdfv2/E6WQpTnf7TrYltlY902gWlaRjTfbC/X7XVZ13f11XW73mw382j3wBuBnf1Z6ETzavtj215JxiVv28ueOunBUAfmjjfzxtFS8ddcluUVf73pqmU09jxTg2Do7oWrw3F002zPEyoFTc63zU00dn8+9DwLWJaXLk7iILrp3k1IkhDyriuigP+wSMN9F6j7Pvimliw4KroXkzyfvOiKo4Bdl9+tUneksGuLT4IlflR0zyeT510VTRMm6pfr9dlJj3drKTlXvOoo3d5mfqIOIEvi7YdgaOq0lvwX5T+eN01RzX3CxAUXdexaEGgIxjVnXAhGplmzzRxFBee8nuqqe2RBJlmPOYHZ8rHSCRdqOZNx/14qu8wZpZzH9ve382V3aedcjVkuCdAAMsV9HhNEuX3aFY5fbE9tRhCheflM0wE0VSulGMHj7ta30fGm4xARhYUw1YNiqbIwhH5T+Woa+UUTQBurOmHqQKOSUQSN7K+NbxNKCfSLx8wwEWESq81hQTE2gqI4QqjHCAXLTWAQEjP1EzVAqZDOOAschAklKt4JsrFzr1zqM2lAKz/RgeMYDsakl8oyHC2+F71XB/ie0cHAwEoE9xQhYwDo1+o+XNC8J0iF43+VqJr4K1ZullCijobwf9JwntCcGco7HA4GGENNw/8LaQBSPBho2j/0/oJXmXHpaAAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Backhand', cbclass: 'melee', hand: 1, cooldown: 25, maxdamage: 1, stundur: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIeLZfwIBsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAP9QTFRFBgIBCwoGEw4FGhIEIhsHJg4CJygmKyAHMyYGOyoGPBYAPygaQjMIRSgERzcXSU9WSzcHVjkFWUQHXDMbXFVRXk84YkwZZUMFZjgCZ00GaT4uamxsb11WcnqCc1Y0dIKadTsFeFAGflwFhXVphoeNiUQwinFCjl4Ej28FkpadmV9JmYaCnEMdnnMEn3kZn6aso3M8p3NNq3VlrYZmrnkEr7C0tZQ4tZuQt3c8uXlQu5YDu7u7vZpNvnxnwFw1wZJlzoZpzo+C0JMD05pt06mc1JBV1qSD16oD2nJF566b6Max762C8O3o8+Pb9aFs+b+F+cqY+cuy/eit/f36/vfHVLt7VgAAAm5JREFUGBkFwUuPG0UUBtDvPqqryj3OOChhGGekCCJ2AWUTCTaR4P9v2IZdEIJMxMR2u92urrp1OYfEiQAAAMQAVzNyAoHEupATOkjcAe6uzR3c3QlwJ2EwnMDC4twDuTs63myP1LuoAiARmMIFBJCuPr67u3yCoHcZOpRBXZyICESr/P42fB34P+IOpgAjoyQMArObv07XU4g/jt2I2Sk4BQlDJIEIIf7sHysfhl/gDg6eco+WkCNoMPcbrN9/N+U17eGdNWMbGgoKQoYQH31cy32T8J5B2ralfPuYPaEgLqpLq8NYMX48RQcploxliACwWwBiP70AfzpMu79cwIFLRkTOiMjEEPrDrvbNdQcTKNe4W3IBkG+HkLBTbvMoNeNfg0K1IC8vK8KAWnO6kN0nXEt8LCqN9JzikuuAAGDEjGnzFoAcThGmzD+0rwUIAYgBwEU+4Ho6YWVwQpXfHjZPh+2AbZRIdlg+cGuGpy+BvLLIXm4f5oNuJamezvOv2szP9LkIwLXLa+10H/4ZcpbLE37SlZphemSQwlWbQWyf/wxYp+1DnHm1WaaWtELcdRYB8PxuwvziFVaz9Fj6WUMkdwPDzKzZm+vf+1dlvlqaoSd7FtNtYm+Ky40BiHf95cRmmOfS62ZzPfYGVyWcN2wo+zixWTgX9FN9DvQGENiBS3druLJZOisKavSQclCCM9yB7igH43TUuajxhio6WiPSbT9jxmgrLBwxH6lPeVxXwJs5+PzsxoF5BeyIAhrnOFQQlRLcRT5f7wMa1YHRC07j03oziPXFHKlD/Phl3KyOWqsdJ+dLVql1KS69C/4HHBNlI4iovmYAAAAASUVORK5CYII='});
		makeAbility({name: 'Smash', cbclass: 'melee', hand: 2, cooldown: 17, maxdamage: 1.57, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAMAAADHso01AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIoArU9jDcAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAARpQTFRFBgIBCwoGDQsKEQ0LEw4FFBAOGhIEIhsHJg4CJygmKyAHMyYGOyoGPBYAPygaQDs2QjMIRSgERzcXSzcHVjkFWSQDWUQHXDMbXFVRXk84XmFnYkwZZUMFZ00GaT4uamxsb11Wc1Y0dTsFeFAGfFccflwFhXVphoeNinFCjHEdjl4Ej28Fk1s0lWEZmV9JmYaCnZWEnnMEn3kZo3M8p3NNq3VlrYZmr7C0sn0atZQ4tZuQt3c8uKegupUcu4t9u5YDu7u7vZpNwZJlzNHYz5QY05pt06mc1JBV1KE/1akg1qSD2sCx3sME4cEk6Max6tBD660a681i8O3o8+Pb9d4k+b+F+cuy+uiL+vUC+8Ic++tI+/Bl/f36/vfHYoVKZgAAAtBJREFUGBlVwVtvG0UYBuB3vm9mz2s7jh0nTnpQBSK9aAW94ijxQ/i/3CGBBBdIQEucNk7srNf27Ozu7MxAb5B4HkEABP6H8B8GQnj94MJHCzLjF/Rm+c55H1yIEkOAQK6EeLYcY/Q83eGby6fXkN8nAk8XYElEtxajb6OD3m7Z9Z9uf7vrzz5rm7CvwcRExDxQvQvzN+d1O1nZZe0u77QAAlP5+aWxX5musfg6utFh890prG03noicxGzRjvrR6G9APER7CPthVy4fbpGgg+Mwmj3ums0rG1/qDcJAnEVNUnn1qvbBs7CpqQd/cpEu33tzfmbl62idT2o6dAwnEd5Cxdcphj8WG/vi3r6M/fFYusQyLFhyKQUt/f5gtM/7ncxy45o2ZzlNREvkoigqjwpAB6ptGN/YHHBJgeERJBlEuQbQi0wpIpyuUSCafdG3HpKupoOBga+reQjpvPzrZVcN6cn0IFvvORotez1q7jZPZjLOJ+e/psPykBfzqJrqPfEoYr1Ns+ZsmI07Vbo/+bx+YtlPc99tibrdozEVLUJkMSsISB3yBQoOD/cz8JfR+0Uin/UCuSqZTDWW0pdy/FN+mFdO/IBqW3RT6C5erNXEAB3ikFdr3NeQfM1pMpCNZMiHECs1QErkB38VVrLwfJp2GXmPSR4rS4MaAGSapHM6mTLTqfd2ZfMYB1v2GQYgFWooDTQrsJqLgMktxcqJvtDqXxSQhlspTrzgmLNBhNGHNkuVCrFWggIGrrbFbC97xmFqO0ZUbS8A6ALoCca9K+38sfdM/tT0GJBWbgJYhcBo9L7WY7fqc864zU3jFWizuYCNtALq+KYv2l+KIadEHs1+v95ooP0RGT7Sq3179XZhAWaPmI6D7orgsHoirEL1uE4+uReMWHBsfU+Nc92h0BKrqWKs1s15+7sdqQQSQIABYHRu0uTnBGg1zI2Jnuvj8R9954Gx4XmsEQAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Barge', cbclass: 'melee', hand: 1, cooldown: 34, maxdamage: 1.25, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIoNpSJeIIAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAPxQTFRFBgIBCwoGEw4FGhIEIhsHJg4CJygmKyAHMyYGOyoGPBYAPRkPPygaQDs2QjMIRSgERzcXSzcHVjkFWSQDWUQHXDMbXk84YkwZZUMFZjgCZ00GaT4uc1Y0dTsFeD4geFAGfFccflwFhXVpiUQwinFCjl4Ej28Fk1s0lWEZl0FEmV9JmYaCnZWEnnMEo3M8p3NNq3VlrYZmr7C0tZuQtl5at3c8uKeguXlQu4t9u5YDu7u7vX4CvnxnwFw1wZJlxMbHzoZp0JMD05pt1JBV1qSD2nJF2sCx566b6Max681i762C8O3o8+Pb9YVR9aFs+b+F+cqY+cuy/eit/f36utxODAAAApZJREFUGBkdwYt6IkUQBtDqqh+rOstO021mMwRMQyY4iiYjrslEBVYBI6Kyubz/u8jnOSTMODGDFqqFV/VB+AtiwJRJBCrw8TyGKqc8Gw7zLD388wscDEKAKnq+iJfZh/Blroaz4fXb9u0TC8GIGTDz5s+r8ceP37cXk9lk13a/PaqcEByLmvc+nj38fXh52T897LvmcBg7M2FSYSh8PNkf6nl3PBxevj3bvH7QHgCCiliRYiyK/WFSlaN2++fuejBW6/VYCKIQi5d5drFfzm5LGh+Xh7cfe9YT7YFUC+/NUp41+29+njWj8Wa5fH7z4+/GvZ6SeisKH2NVLZ7z75Of5qO2O+weHxdvO2aQqHpvMcbe4jXnu2XTdtt1f/7Svr4nU2JinPhCB/NhtW5/WHZtOpsv6kkoTEmh5k9ivkzDdnPXzrsyD99dlVpVKRIAUVPz59PbyW63a5sy5Jn6qAI1UqCnZj5OZ2G07da73eImnn0Fn0wYBIGaakhB+k3ddev10+en6xCA4BUEqGpIqTBt7surZt5tN5vnh1FggipBAA1m6gfLuq7LFK7K+v55QV6IhABV770xL7qmqeOvl77fbI4DgqljUlOzYHaz2DarUbz9+ra823yekzIMQgpVs/7m2DWr0s/ydHqxPq6dKKAKAps3ujmu6npwnm+nOZWb4ztngEJAEIDeH1ejgRZVnlY5jP+6IGGcOCaD8IfjfZ99VaVcVdlv70jA/xMCc7td9TmEdJ5OQnOsyUGImBkEcPNHjRhjqnKuUmi6fy/IMTlmYQKY7xsH9T6mFGMKZbNtxLE4ckyAuvEKFmKKKaWqypUv7/rOkSNiAhTalAxAVIVx4sixI2YWUlUDq/AJ4BwgYGEWFgX+A8vZTNG9pjh3AAAAAElFTkSuQmCC'});
		makeAbility({name: 'Sever', cbclass: 'melee', hand: 1, cooldown: 25, maxdamage: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAMAAADHso01AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhIqM9bV7o8AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAPxQTFRFBgIBCwoGDQsKEQ0LEw4FFBAOGhIEJg4CJygmKyAHOyoGPBYAPRkPPygaQDs2RSgESU9WSzcHVjkFWSQDWUQHXDMbXFVRXk84XmFnYkwZZUMFZjgCZ00GaT4uamxsb11WcnqCc1Y0dTsFeD4geFAGfFccflwFhXVphoeNiUQwinFCjl4Ekpadk1s0lWEZmV9JmYaCnEMdnnMEn6asoGACo3M8p3NNrYZmrnkEr7C0tZuQt3c8uKeguXlQu4t9u7u7vX4CvZpNwZJlxMbHzNHY0JMD05pt1JBV1qSD2sCx29/k7PH3762C8O3o8+Pb9aFs+b+F+cqY/f36/vfHAq4vIwAAApJJREFUKM9Vkg1Tm0AURdc2zaZdKC3bjRrURD4sLfvUhBCDuM0HCClIo+n//y99m3Tq9MzAMJx3d+ECeYO8/Z93r5CVSbuaztFRp9PRF5oupRdS5pJst+qcUnq4Td4LvJqZ3S41ZSgLrbcqufw7YFYZoE4oNSTq+phUZblKAGA/0AXU9DITNJRylLZU67VKwAsMqtFzkBmhjMOwXlCiqr0OApUBTgjU6kbKOA3TZkhJptZKzQDW67JS3zBKjTCO41TKuqYWyTK0Sm02ZamyzKDBRaqJ5aIZCiCJZrZBjVswQpk86LQujAoIPvT1GNS6VDAWlLGPCwR90R7/zDzCvXHgemOYwdjljLM0z/NFmhetvL8RlHBLeK7juHhw1Md1XedxUbc5NYUwyMC2mIuGc4czZqAt8Jnb+rzMErgmvu/YFhfcsoRg3YemaeMaTz9esF/UURT5A5tbjGHRt7tdI+vdbnf/MhPYoUcmk0nk+wNcgpnDpjnYIT3QJXNED+DO0OxaWeAC+gtTA1v2yHI+X2rvWEa7a0PM/jKZxQwhsH/UGq3NuslHRV0/UINzb4Yd08Ajj4+Py/nU55d1I0dFkQ8N1B6o8ulZGZieLOeRiza/CPP84aNpGViUbvn5yRDEd6Zov+ayLxfpCbMs3Bc7VjoOlDALqw7lSV/Gt6Zl2zZ6MYYEf5NtQgm12Xl48qkfhufcGSA2Z14AkCQgAkz7Qa/X64+G3HF9fP8zzAsA4Ynv8DwjNguug15fOP50igVe+fobBeDdwebu9x2xA9Qmd6L5UtdzhfHPH5gQa1glmA5OB77P3Gi63BcQ+WdfME55BllSZeSUMTaw/en8nx7ouLWCKqsqwlyX2ZY93Zf7qmkFFfIHulOLUE2YITQAAAAASUVORK5CYII='});

		//strength
		makeAbility({name: 'Kick', cbclass: 'melee', hand: 1, cooldown: 25, maxdamage: 1, stundur: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMSFouM7AQAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAMNQTFRFAQAACwUBEwkBHAsAIBYLIhIAKhQALBkDMxsCNRAAOSYXOh0BOiIEPDg3QTEmQyIDRy0XSSsESiICUioEWTQCW0g4XDULXD0mXTgWXikDYzcCa1RHbkEobz4CcEEQcTEDdU8we0QCe0cQe2ROfG5gh0sEh04WilItilpFjXFckGZBkHxvl1EEnGcfnmxGoXhbp1cDr3ZSsGkes4Npt5Zzt6mdwX1UyYhozJdvzKGA35554cWl4reY59nP6LSE+unH+82jWtLfPAAAAhhJREFUGBkFwd1uHEUQgNGv/npmdr0WG4MJEMQN7/9GCCGEkoskoI1l70x3dXGOKIqRGAE94NR7YDTMR7oCh63cIQD2PhcADDBTgEq02VADZnnT1JY7TUUVLMGiS53oBD2MjLkBoqAYCRYQlgC2vQEb6ToFiOgBBNqONBpbWuIIgLQAAAjCj7SNN9qC2+/v3m3chyi9tHedyCXfKmIfaPkvQP75cc8lIKQzGNf12BivHA/2a1XVNW5jMC1OazMOfzzPpV9+G9984kw+XF/+eZmj1E4+IBfZH666HJ5MhXk+P/3798tbPuLncDrLxcWafYBCZqZcfnq6vb2mNcnKOLvw327PxygrZs2py8/f92/HBD0vJhyfmtXnfVjZmFKZc3t+b/N0PhlZ+vL1SRa7EA9tTTDSTR1gKHr/q11Nsvd8uR+luCg1c2ZmTa3Pt/eIIyhMbJFlW5uFAJjf/3i4uLilSc0E0Sy3Zd0eN0H5cvtx4CviANEZaMRS46s/u++3BrtpBoRZMHU7EculjuM261N9p3MXn0GiIhVBj1iPHQ4p+eHMjjhYR20uHSLglTWD19PjXO/YaVAia8dtRvQ5Z7iZ+hZzgDhgIJUro4IdhQspi2BuCmhWs+GjmCNjVpPqZJlOcUtLABNn1NQ1iQ5rOxrmQGIk4h1YUAViO44GKAg2Mat7EnMHIDgaZoZ7lSUkQAQ9LMHY3PDB/7zRFJ6ioicgAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Punish', cbclass: 'melee', hand: 1, cooldown: 5, maxdamage: 0.94, stunmaxdmg: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMTK8r/kVQAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAORQTFRFAQAACwUBEwkBHAsAIhIAKhQALBkDMxsCNRAAOh0BOiIEQTEmQyIDRQ8ASSsESiICUioEWBgBWTQCXD0mXTgWXikDYzcCaFtXbkEobz4CcTEDch0AdU8we0QCe0cQe2ROfG5ghzIEh0sEh04WilItilpFkGZBl1EEmC4EnGcfnmxGoXhbp1cDrDkGr3ZSsGkesp6Is4Npt5ZzuFgFwX1Ux2gHyHEkyYhoylQFzJdvzJpKzKGA04An1mwE35554cWl4reY59nP6LSE624D7FQH8oMF84Un+q0r+unH+82j/P37/sdOvDJBXgAAAmVJREFUGBkFwWtvG0UUgOH3nJnZ9e7alk1aKE0aKvEBVXxE/P8fgoQgoJZeEieOs7eZOYfnEQURcddQAuZiwapYQAS1EkRUqm5UYpW9ltacILqlkaqOAlBq8NiD9NFcQtjWELMtRHV3aZSgiKbenl+92xTtiUsIoWYNgmmXaT21ZL35zed4zN1i6ioeg5nmMNSOVDimW3uy17uHLFrckVg3C4khs12v2n3Hny/f7Z5zYsJdRKJvqR0J6fbtYfn3ZRfzKdSxZFc3SaTUJNql+75rz3/7r+JnXu5GFzcnhraysm0YtH38uH0nT7k//bUeOBeEUCUNjTfTYdfW/4Yfg608f07XZRFLSowF6YflVWzbO38bi+2Yb68+jV5xRGO/7cPj4frQPj69IRfR5rByX1b6vXgsXleNb2iXb7vBTRx6p71uuM/dJfSKzu+PY/r85XgI7kGy9na1v7s/jy5x0TT+9HYMRHaFVOK6QAYmpRCEPHyIRry0r6sxXlIdT/OX5RddtS0xsPvQLrB8nW/lYqGcWbaX8umy9ZA9/k7LGeum03p3lL7n7ofjudmu55OE7LFlMWD65+c5RXQ6teFjlsdFwdXiBAAv+wM581iG4+mBjVdQIM7NRMPaNCOMZ603fCOPfXouiBPrVABWKOvXYXj+Yxn77A++oWDE2dRKhOwnhTXnqSZfvb4IjsgNsGEuXOhWSXnBPS0xmyuIREcVElPXTZG5qtXWi5sgYtEFMwSLrDnUitZQgiNaTT2ooEGUKmGuBo5WN8VN3FUiqKPm4NKsFtRMcMwDiIIYmLs7OE5FzA0RVOx/jJNxe6QKgc4AAAAASUVORK5CYII='});
		makeAbility({name: 'Dismember', cbclass: 'melee', hand: 1, cooldown: 25, maxdamage: 1.205957, mindamage: 1.205957, isbleed: true, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMVLuzPwl0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAF1QTFRFAQAACwUBEwkBHAsAIhIAKhQALBkDMxsCNRAAOh0BOiIEQyIDSSsESiICUioEWTQCXikDYzcCbz4CcTEDe0QCh0sEl1EEp1cDtWUFuFgFx2gHylQF1mwE624D8oMFH6zNVgAAAetJREFUGBkFwVF25DYMBMBuNDiS1t7nzf3vmHwk9kgkgU4VwyRoECAadLgAgqBqixF0p2DgeK1smBGIAAAGAPvyjvj4dfsLgjEIhmsxBYAcX37OeX5yHK3RDSAQdEl2/PkeX32H81KO6XQLrQ5baRi/3/nRO3/6IE/uCJvdAEQ1tv5aurqydrojN8SyDUgWsHU9OlaNt8/oQy42ELDIQeLnOleml57OhBIVDRvS2Arn0jH1mp3VGaVXlBug+k8INTwzl+LNcKWKqaoRUPg6xs1ADBWvH2ZVZFe+CEE5P4/Yu9QMhcYu9wxp6+VNKfSK2IicUm9qoepWqjlqKnS/UnEH8GSSSs/h6VBbjwjGAWNNdx2xnaKidkdWS+SYYzBWd0QNgKkdIf8XZ70lO5Ae7Ix4+ALAqKiNh9ctkoAG2A23lWxIzwZisSQa4WHlv94WlHQrbhpxb4UBUqM0vnkuWOhAqB2AxQ4V1siVmXVgRspN9iYKEok2+qxn3MCj6aQbk9WGhAY5pq5v5LOQNTFicrxtUgQQgO5x/WRtLkStI/4+vEAqQNKt+P6l9zlt2lgf+kcGW0HSYHXcqhlFmTn3J98sWCRMAgRulwWEKyZ+1yQoAQRA2EC0gwYRt68JUgETABoAaQfMtvXMq4H/AUn6SIvUj6HsAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Fury', cbclass: 'melee', hand: 1, cooldown: 9, duration: 6, maxdamage: 0.75 + 0.82 + 0.89, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMWE5+K3Y8AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAP9QTFRFAQAACwUBEwkBHAsAIBYLIhIAIyMkKhQALBkDMxsCNRAAOSYXOh0BOiIEPDg3QTEmQyIDRQ8ARUZHRy0XSSsESiICUioEVkxHV1ZZWBgBWTQCW0g4XD0mXikDYzcCZWVhaFtXa1RHbz4CcTEDch0AcnBxdU8wdX5/e0QCe2ROfG5ghzIEh0sEiIKAjXFckHxvkIyElpaZl1EEmC4En5GEoXhbplkgp1cDqKCarDkGrLa6rq2rr3ZSsMbGsp6ItWUFt6mduFgFu20fwLezwX1Ux2gHyHEkyYhoylQFysXA1snB2NXN2eXi35554cWl4reY59nP6LSE7Off8e/u/P37hzyzJAAAArRJREFUKM9Fk+FymzgUhRXwxgYbS0kxro1DChsnMTGGEu1aCa2jVo1bSdldKu77P0tFJp09Gv3RN+fqaHQvGnkBcVFj9G8ZTg9lmedpbIVGZDJCFSgLVNvjVpeM5T2eT2MUkNAdmN/mVmmjON3RPN+8ugNC3LTT/6vVtCyKzVvxycRDBei2VW+4OxwMmCru3SkiSYhuQCnrapW93cgD9HqlMSLLxMdGcPGWS3P4/AGXIFfxqsdB4JwDGC6MtbfmYMzizEXSpNYcoyi7eAfdC5iD6uMLCX/fP/zpco1zvcI2+XAnHV+A2THTcg7m+OPhzpVizLvNChEyPL30rx7+Bc2kVgD/ffvnyxXuyliaaozCJPGnu4fjUQIcmI38/ee3e7/RuNCKYou39cXq7vjzk2Z017z8df/1/qwAGgspBLbRtvXWw3fHr2Rg2DhfLM6uqZZ5Ljnn1ygMgzDzbx7JwtXAxmme0+pRVpuN4Fyt0Si83ddRyWlcsWmx8eL5phK0pGnZaIZRUj893foNxQG/ROtuY49FRTnLY9G4Q5RkSZQtdtAwej44qUAqyYw6pWVMC+Tbd4f758wtQKVrPGVKUGnEdNCyFStPJihY1k9Zkg1XuOyoUExwCTlaqyoVpUssTkiyr/f+uJVK2Lgd7gAxUxYWvxYPt/Xzl0WpGdcM7LrspqKRVJ77F8jSJKmf91H68YV2tDMMBoNUCybeO8OLvhXDrK7rkEzbx+6GtSfTD6dKNHyOfGKLh2SZLbdJEg3jGJ/g+XhkoINDjPwZIX2nhuFyuQyTW991HfRHjj9CJSrHJ7MZQR6xnETLyPp9DO8rBlQLOkc9nSDPm5AwiqJ+T5AGkEaXtDp1rZt4yM5YEIQ9nc0Cx5FttxYsf61N7AgMR57nEfurMxIQ33EGjKW5jT0hlo5+AYkVmzP/ubpqAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Cleave', cbclass: 'melee', hand: 2, cooldown: 12, maxdamage: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAMAAADHso01AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMhBxVXqcYAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAARpQTFRFAQAACwUBDQsKEQ0LEwkBFBAOHAsAIBYLIhIAIyMkKDhFKhQALBkDMxsCNRAAOSYXOh0BOiIEPDg3QTEmQyIDRQ8ARUZHRy0XR1FZSSsEUioEVkxHV1ZZWBgBWTQCW0g4XDULXD0mXTgWXWlzXikDYzcCZWVhaFtXa1RHbkEobz4CcEEQcTEDcY2dcnBxdU8wdX5/e0QCe0cQe2ROh0sEh04Wh5OZiIKAilItilpFjXFckHxvkKatkLXLlpaZl1EEmC4EnGcfnmxGn5GEoXhbo8/mplkgp1cDrLa6r3ZSsMbGs4NptWUFt5ZzwLezwX1Uwu75yYhozJdvzKGA1snB2NXN2eXi35554reY59nP6KdV6LSE8e/u+82jPRlzYAAAAqpJREFUKM9Vk117mkAQhYeWrphlEZSA+IEYtRqoEVJitTGxNbGEaEvARmxN/v/f6Cy96NOzcPXOmTPLLvAG9fZ/vfsnIChJ4q/EmEQ0RpnoOBoux6EmiJJMBZFRrKCqJkkWoxrzHMuxPFLbg8iNAqESZTJjCB1mNSzPsR2lu38CQSQiVWUiUUmjVLM0nTvtS5tU908+EEEUCY+lRGUFtGwHOyvV/do3gIjoFyRNYzJllqNbyHTHI8OXda/lQ4UAoJvqlsqY5njcazeU4ctDrzU2oGsSAoQyqloaU4jn6Q56W3tOq22oTExKRUGiCibXavqVh7lDpPVx89QF2ewSwj8Iww3f3pLBV8wtqNEPXSiVzE0NVA2pSvwF1a/6o7+07bouiKX49VADouu6RsrrzilpPj/2jHG9HwwQw+SY5seOgAUNXejdkuZ4eoG07QaXiIUkS9P8sBtVSpJzZi78xRRb13UXYRCAHCdpmmX5Md/cx3nSvfGnzycnfbQGHLeu51iQ4cpz7DPr3CyeDSVchmGAHM5b8/vVCgt22W6HMbPReqG03dAtKiDtlKujEe+Q7nChf/j4yTptB8ESBYfXuzKAzMw43SDOVvG36s3jxfXHMAwRp+nx110HjxPmyDdx2jUVpffwNO1zDqskxqGwdbc0ipPNvFLRw6Bx9n4ShAHiWZxwYUVb7ZyfyRYfeOl+CMLCPfyMnD/zzZefTREH5hPzsYvssjG8XsWzyvcMU36oAd/Qkj+FQAAoN8+hliarNNnUGvgpCxxtlxFivP5Q/WSISbZLDnrhjcJoGXEtI7xnpOzXx63feTwyVX4MPLRg2yjCv0QwfKO3mHQlURm4Ax7OhQXbLXeLJX88rQJt4PEHxVHwAszmo1G8pEq9QnXdsge2bQ+K0YpwzPgDIyCQWWARtRkAAAAASUVORK5CYII='});
		makeAbility({name: 'Decimate', cbclass: 'melee', hand: 3, cooldown: 12, maxdamage: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAfCAMAAADHso01AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhMiIex3f/gAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAPZQTFRFAQAAAxAhCAYFCggGCwUBERUZEwkBHAsAIBYLIhIAIyMkKDhFKhQALBkDMxsCNRAAOSYXOh0BOiIEPDg3QTEmQyIDRUZHRy0XSSsESiICUioEVkxHV1ZZWBgBWTQCW0g4XDULXD0mXTgWXWlzXikDYzcCZWVha1RHbkEobz4CcEEQcTEDcnBxdU8wdX5/e0QCe0cQe2ROh0sEh5OZiIKAilItilpFjXFckGZBkHxvkIyElpaZl1EEnmxGn5GEoXhbqKCarLa6rq2rr3ZSsp6Is4Npt5Zzt6mdzJdvzKGA1snB4cWl4reY59nP6LSE8e/u+unH/P37NF0y0AAAArxJREFUGBllwVtv40QYBuB35vvG41OSOknTdqsWIW2LAFVFIPH/LxD8BW7Q7hYEPSSqnXhsj+fEFVc8j9CSBXvoAAKsVskicSAfOE1uw5IA0gYZAOmp6jPhGRQ0bKh/pFIIhEylvERiEqUVniQJubSm+ZkkNJh9Bl+i0qORFVAzY9Efm0cZSOVSZlHouBRhuLx6n1Ypl2ERX84eVQwSKJBUxCrg9ebq6rvcVRmq7GnxoKIH5fastqJmeezv2n2p8/1KcvZp96BjEIkab2tO09yapW8blOKF/Nkhv1chJAHG9d6X7WKnn9svZxV87NTyj/x7zAlIM8l0mYL4ps6a6/pzk5HvttvtkM2EmeZIG+dF/600guXS7i8H7vJy1R1WIUQvZmp2U/fI77NzCFd/H2/KZ8oDn4S2hBn0waaH4uj2hW99fv77Jv+CwnoDGkSKg3js7qmfTu/RYgv8xedva0Cf1grIp55JWhtO7wZfcyZx7N4wUlaRVQBxzQEvynXth49MSQn8poqizLf41NcwAA+D2fj4w7nd53BQeUHl9jjpoUSvAcbFn3Rd0ultwp6aVA/FIWv/2QC9gAUzna3LsDftmL7aKT79iuIV44GHKlloNog2HqYxv5uEal/0ahgLYAoYhNSDuK3M8QaFWPv2cBo3d/IXp4DFmJRP8AxUs7kXeG+PR/5pMT85oORmc3DCOMt+f95M6NvwEu7W1L199sWuAA6F74WCWPLtc7qdQlRX6dlkT/O2KbCvutj4NkAsrzvG28cdSfdqjMnyVTaUc1e1ocYp0MV4LPR80vLUueOwvhAyjEmOo0pWAGI9FnWfc1uAXKAtugoGlR1B1gsQoGbPF5MRUirtst5p5xx5G0WKiUglnzI2y4WGTSl4l9inRC4mpEBZjElm0ch5Dm7m4EJECgFIMSEJif8I/N+/WIKMKoTQUiUAAAAASUVORK5CYII='});

		//magic
		makeAbility({name: 'Wrack', cbclass: 'magic', hand: 1, cooldown: 5, maxdamage: 0.94, stunmaxdmg: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADVUExURQMLFwMXMAMlRwRGhgUpWAU+awY4XwZEdgZhqgcTIAc2TQdZlwwjOA0ZLw1Wgg2AzQ3W8w4oRhGi4xUQGhY5TRc9YRd/hiBNeCIhSSU5RiVfjiVgfSl5rio+Wy9PZjTq+jpcejxBQj2rhUF+rUV6kkydsVpiYFpneGKUtWOImWp4e3Sz0ndPO3hgWH6Um4GfsYR4aZFgR5NoWZVUMZyal6OFcaZ4W6eXe6pnUK6xn7qBWb3LyciRc9OIVeHk5eeceO3JtO6PWPK+nPLLV/ezgvfnw/z79Xf60l8AAAIlSURBVCjPNZNtY9MgFIXDDYRAYClxOt/WWufUza5m0zRzUiOa+f9/kufS7jb9wnPP4ZIcimfG+FwuhOBcwM9giReDLwpjhDOCAjlHFfHjcpFw5ERhhBDGuEDSkqWqssAVOYJJIUSBP/qIpSzmIngFCdX6pvCQUy6bWWXZAfDlTZxi4YThnSrLVKncIYnWd9MU467whNmA1OHRGvC0j/McuQoPa0HQaQVY6VLKm3mGEtZxKLyDL2YC1lorKc9jhqhx7AsfMC5PDAjxcneEIyreFYZPYxU7N5o2aT4qhxj7teO97VGr5S7d7560/SscFntDbjM/2+2/3cfpgAdeDjgYOQtrtXzY72/jn7gbeOix19pKYOH42HKJkaY53m6O7n2ps1o4idHPpyml/Wa9gZLtx+uyVFXIexP1c4rbyxcfxgltDxk35VEdxOk8bVddd8Vw2L4fpvjwsVTWeaiDCL/nrz+6dkwpDZeLxeIqxb5uVEXAwYnlv5/NRRtTioCr1aKL6V3d6IyRBvGmLushpS1DxmO6rnVW5yCRKi/m9PlAs/pTxvxSHadL/3rctt2RXqbpOY5NIpujQVXfv9R1h1osuvbt38fXyCU5Noc9WSu1bru2RUPb1lePZzLHOQcZVSnSNVfbtieNVsR5P0z+1KBPygY9jS75MpAwwuSc58IGNn/2ktMcGBr/ZM7F14OzYRFkzjeWcA0OV5BHxKXzuIfhsOCd9/8BgmlKZdoQdLUAAAAASUVORK5CYII='});
		makeAbility({name: 'Dragon Breath', cbclass: 'magic', hand: 1, cooldown: 17, maxdamage: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEIUExURQIDBQMLFwMXMAMlRwRGhgUpWAU+awY4XwZEdgZhqgcTIAc2TQdZlwwjOA1Wgg2AzQ4oRhF4sBUQGhVTZRY5TRc9YRoIBRsdICBNeCEmMiJjoSU5RiVfjiVgfSl5rio+Wy9PZjEIAzQgGDpcejszLTxBQkF+rUKQykV6kkig40sNA0wlFEydsVJNUlhEO1piYFs3JGKUtWOImXSz0nZAIXdPO3hgWH6Um5FgR5NoWZVUMZdFDZyal6OFcaZ4W6pnUK6xn7hHCbqBWbxiLMiRc8qgicsfBNOIVdZMCtjMmNqxl+eceOyLHu3JtO6PWPK+nPLLV/ezgvfPHvfnw/fzXPlUCfrllPz79S22nkkAAAJWSURBVBgZBcFPj9w0GMDhn/+8TjyZzHanbRZULgWJC2ol+P7XHipx4QOUA0gspN2Zncl6ktiOzfOoN7cbAAxvZy/Xl72XdN09xiJ6mzG3BACE/hAaOazFNWY6hhJTY8QAwNAFzq93SbudJbft5LPJMiczBBgenLu/P6veqNyo4mnUt21zyiQNALxUfiSB3kzBtK0XCOxM1wXCWfYK39Eas4qA1GuKxi6NHgEYwQNAs6FEUgC9HDb9/TgMwAszIitgNoY0llmKvy72ERgAD5QGgI6n51qo0OrfHkbIjLOQGsAo3+X1LmpwB2ydGN8rIMHaYFTet6TJxaK4FvNvgnvFXc4iDnSepzndpui2HKuyAGHPDALYqvr8J/3WTQo8egAA8Ajg+vH3D+9tTq2t3YJlGAHwUsAI+sjrWF3EEFo0DFDx0ICirq9+nQ/6FWQFaLqRLoAARmrT31ndvsFh6ZZZExgCFQBFowz/ZHMoBaB6yzgAQWEAEOLhr6ktkGvYv1gGAF4OYKhIWerXC8LG8efj2QKM7757SgJSXTxvf9uPx47T8g68GmD8yRWdO7Hi3OkHQy0s4Ke1wYQQhu6/x1bmnTamvUWfTIpelohdNw0Dj7M8K5MqUD9909m6be5hJWoAwRGay0Z/+tJ8tqVEHP0KaAY6isTzVW7q9hyFSV+yYb7EKJ2h69ST5CInry9fl7St84MtsVLFuWoGGk5N1cmEaK9xW9z5y4dmSrpv19qbbg9nY5Qq5JD1quLOxrfbzDYV3VoFAUJrXMlQc+vCxz/qLys0PZf/AWYHLWb23bY9AAAAAElFTkSuQmCC'});
		makeAbility({name: 'Sonic Wave', cbclass: 'magic', hand: 2, cooldown: 9, maxdamage: 1.57, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTJFNEMwMDFCN0JCMTFFMkE4QzFFNzNFNzM2RkIwREEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTJFNEMwMDJCN0JCMTFFMkE4QzFFNzNFNzM2RkIwREEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMkU0QkZGRkI3QkIxMUUyQThDMUU3M0U3MzZGQjBEQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMkU0QzAwMEI3QkIxMUUyQThDMUU3M0U3MzZGQjBEQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkABPKgAAABgUExURQACBwt26gAbZAILFySN8AaP5gAqgi6k7gMSJgFGkgJcsQEdSE6s+AEONgM1bgExtgFG6gWq7gdFfgU1XwV2xQhvtQRanQcfNnnK7RBXhQmKzgkuTy5zswXb+HKz3i+PyBH1fZMAAAHhSURBVHjabFPp0tsgDASCkMVp8JHkO9r3f8uucNJpp9UPZ8KuVgeLMb/jprHMKCk5jaKHE3rjylC01lirMymV298KS3F1q6P+HFXM4kJIF2EqaGodu4h4rhH/XVibW97iZUPm2DkK5d2bZXGurUq4GivpQGr02bPPbFJBhwqnpZRyT9s2iGmnzNlyNkEHCOuqvxLrNpAKjDlztGxCUKDZFSQhoj0iIG29X1szoTVNtza6MCL1zEQWmLV2/WqmxkuXSKrITsQ5ZwYBlB+oHW0EXm23MuSAPLFXMOdHzgaC1GqtZ+8fIudHp969Z/aM+tZAr9vgNsGxpgJBNpL1a804cB5rSoO+P57PA9IanNGgwhDve8Cij+9+jvPoXWvraNaStkZ29t77MeSkTlMWA77g2XrQ1uXUyXQsTKfqCs/BUUN0nx1TZ1XGlXjAbb3WRjEAZX5NbrN/PLIu9bV0oGgDG9+trhXS/ut1JXplITZsUCtETO8nwbzRBl4Q2RCyA4UZ/OqNU8vO+kUjOSzI73JOBptS4MXpljIdDjfFz1RPfwpTNLCtXnlZ1GnqxfsnWPdjbBUi5pYQ08KvZ1D0kzaY7pAN4n8+g0kx86Xc03NLMPJi/onrJQ2XzH/jgnHLvwQYAEKyG18zNNb5AAAAAElFTkSuQmCC'});
		makeAbility({name: 'Impact', cbclass: 'magic', hand: 1, cooldown: 25, maxdamage: 1, stundur: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEIUExURQIDBQMLFwMXMAMlRwRGhgUpWAY4XwZEdgcTIAdZlwwjOA0ZLw1Wgg4oRhUQGhVTZRY5TRc9YRoIBSBNeCEmMiIhSSJjoSMMMiVfjiVgfSl5rio+Wy9PZjEIAzQgGDTq+jlnlzpcejxBQkF+rUKQykV6kkig40sNA0wlFEydsVJNUlhEO1piYFpneFs3JGKUtWOImWSbzmp4e3AeBXC27XSz0nZAIXdPO3hgWH3K5X6Um37a+oGfsYKHhIR4aZFgR5NoWZVUMZdFDZuvvJyal5zV66OFcaZ4W6pnUK6xn6/3/ba1s7qBWbxiLL3Lyb3a5siRc8qgidOIVdjMmNqxl+3JtO6PWPezglgqK00AAAKtSURBVBgZBcHZciNFEAXQm1nVe6tb0mgzg832QAThF/hzPoBf4IWAmCE8XgaBJyRZe2/VXZmcQ/OWvIsjEADUAADjgYQAgA1qywoS9epboyzCAoBEem2dGSjqGSb3CSWeLXmCCYzJJIaagkZdoJGq/fqb5rGroABAmU8nAYZtb63XSNUGYZLgyRsATYhgfuckCewXE6jpy2AUtnGcji6mE5nNin4SR5UqKc17F02nN02NMbu4vg5hWuIUvOkEL2Nv4ZKAFhqVrrkGu+K9q6MWWU+nE5DtLBLQMvy8Sd+nRdNsXrMCPbA9Y6nh+WwKSZI0+y+XT50d8XTkLCsJbRZlvd2IKQcORtH67qum3ms5dL7vyCJhsus3b00YZcPtlovT7fmY8sWjrTe7IU0eo/wSwo4XecKn4vpJfqS4IT1vMui6o6xe5g1sUe4/bxfjR7OdrGrSB9yUDPJmc5jnDSzOQ9YHx1qXA01e19ltVn+ZKI37bZU2sYmbIsx4P3wfn/PD78l9/uDecf9vtfDtrOttfzpzbC5FOmQvH6Y/t39O3okkP0DwYZrXtg3QkS9nVL3+c39zWCOON2v8Uv+GOz5XtOAqDJB9e3wa3w9/V0qr5ORRIVhlu2drtXNhD0K1Xw0fjwj1HE81OVro805hh8tIIgGXuB58aJrkiAKv4EvDCrWc1CW4rkco2TngSvvjwICSOjFsXOr7XrbZ1IgCDkPnGV3nnYNhLjyuEvD8bZ8CIiDAdx3IA20j/DLqJwF/N/sLF3Y6wFUQIcNt3YjCThAIlrM/9j+tnoUgTdwibsJOgRjG4iL5JP4V93cPJ3ZgajUSaYko7CJP88OUeUlx9nTtr2mFqKIADlBAUZg82ceCVD7WIgHQkYf3QGgHIuppAcBDGIgd0AoYAgAAWNL/AQw6gHq5VBpzAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Concentrated Blast', cbclass: 'magic', hand: 3, cooldown: 9, duration: 6, maxdamage: 0.75 + 0.82 + 0.89, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA4Q0U3QkNCN0JCMTFFMjkwRDhENkVDMEFCQkMyRjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA4Q0U3QkRCN0JCMTFFMjkwRDhENkVDMEFCQkMyRjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDhDRTdCQUI3QkIxMUUyOTBEOEQ2RUMwQUJCQzJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDhDRTdCQkI3QkIxMUUyOTBEOEQ2RUMwQUJCQzJGOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps3uZg0AAABmUExURQFGkgJcsQV2xQmKzghvtQRanQAbZAXb+AM1bgAqggaP5gEdSAdFfgWq7i6k7lTa9C3I7QEONi+PyPb7+3rp+QMSJr70+06s+FCh2wU1XwILFy/4/QExtpvb6531/At26iSN8HKz3s45wrYAAAHXSURBVHjaPJPZduQgDERBAszupd1Lksky//+TUwXO6KFP25eSSkI2IURjvPWmGmutQcRS9n0vJYTybiKo4Xvi8SeGGK4oJlQqvBUVYmdNTSaFGMv9HoKJVHmr/alqjXd4MCbFmGJAEeSkRPLzb29ivRPyyAPIfTf+wv3Zm0I7MPUQQ22QWZzk1lpW5+TCMAj7O02JOKcZFH/g0LHLWRrJnSpVSiqkwL5W4P2dGCTrtq6vQ3n0tzjwfZ94O8+V0ZUFPHqPaLxgLBzIeq7bgthefVTCbOJbwWgCupK+rsuMdhws7tFujW/EMN23bTkfXx/AeozsCLSGwQAffVvW2+32AJbRx+y8Tgz6H0NL80JeU2LtjbaAaSCL5DzmY2uatV/D9flBa1l/slrYhXl0Xqju7dd4zr2L/ZOwN6w/nR+4kAG/RTtHy63CbMyoLQf8NN4YyIEJ90XdXLBgvKecc6cjq9q2z3NRWz2rIwmGrvA7bgO/bX0QQ87auD0OrvdDrNOmlKNBm9KojeyeSzLmMS6dZ8RE7GuKA7NRLgqDnoTbDjHV1wE7UwjX3qYQuOy47zo5TjiccBQiaYlzV00aX8l1ws5xVb6LUAfg8XBlYeX5IfJDCeWfAAMAZq4WOUMGGWQAAAAASUVORK5CYII='});
		makeAbility({name: 'Combust', cbclass: 'magic', hand: 1, cooldown: 25, maxdamage: 1.205957, mindamage: 1.205957, isbleed: true, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEmUExURQIDBQMLFwMXMAMlRwRGhgUpWAY4XwZEdgcTIAc2TQwjOA0ZLw2AzQ4oRhF4sBUQGhY5TRc9YRoIBRsdICBNeCEmMiIhSSMMMiU5RiVfjiVgfSl5rio+Wy9PZjEIAzQgGDlnlzpcejszLTxBQkF+rUV6kkig40sNA0wlFFJNUlVnmVhEO1piYFpneFs3JGKUtWSbzmp4e3AeBXC27XZAIXdPO3hgWIGfsYKHhIR4aZFgR5NoWZVUMZdFDZuvvJyal5zV66OFcaZ4W6eXe6pnUK2EJK6xn7a1s7hHCbjMVbqBWbxiLL3Lyb3a5siRc8qgidOIVdZMCtjMmNjQz9qxl+Hk5eL4++yLHu3JtO6PWPK+nPLLV/ezgvfPHvfnw/fzXPrllPz79SegRXgAAAKoSURBVBgZBcHZbiNFGIDRr/6q7mp3t5fYSZxECQnDgBiuEC8Ar8w7cMENEgKhASRglMkk8ZLV7r0WzlHLFgfGAeQ1UBxtmpDXABhdd8TGaaiHaRXapCln9biQRvkoHj3tTAdacIfjV2y0eTjRRvoYut4iAFlG7RkriG13ePjS78yiFpV5o03vMegkaqZu7xaHfipsyypNMx+NTl1UhqgkupE7frP/wlfxplSfvm+TuLOCVXSSKNFUZO/G+++K5/M36y8p/9vidNrmYqJWPvUuvxzxoLDDcjI31Z01qWCjSFLpdOe6iwX1+LGh7i9Aqa51Bo1Mbbgdv+vuzuMzRUM/Gw35/o5Y5NqJ+KK47PPLtyHs0lCPXPPZswv32zZXg57WIsGuY3Z3vQmndluffjAnD6FJsgdDaZxFuUaZzehUT45XXKxi0YTQnX3+IYKA9v7FLxP79jLlvkj3zGdVmMT0mxaEzndKr9RFG1+yBl7y5cUIrubhmBANlpH00c2QZfWPZC1nQCAZep0oMWgVtI6UqG61P85o8UdhD0nwURwQ2+UkmST+ifX6DAsnxR/XCectAkCYWYqwz64fNQsHfbXJbtMLMGhQcUSE3cnXD94xeJlzxepgRC14j1emV8n+4cPVD2Z98gTDeNKcg0LoNELLE1CV5RHQgxvmcBtzwUKIrd6FvJAcfXy/e1IYJOU9SEGNpH8RfjfZwa+vpO3mxmsQINZSddYrzXu74Xx8s4L9o127JImAQqcCEpPHuJmNR4vnYTKeLNiaTNxvmzLqVCISon6V6/lUtjJPD8vyp49f+V/+tKrQ+YD2WpQxg09/TL+N95sDVf97Xf2dxRattHjtRTXJyNyVyZH9+PP8dsdjEZyI6PmAIJAUUknxcjPs6tsQ2nLaJcPY/g9BFFpMwOehdwAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Chain', cbclass: 'magic', hand: 1, cooldown: 17, maxdamage: 1, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACuUExURQIDBQMLFwMXMAMlRwRGhgUpWAU+awY4XwZEdgZhqgcTIAc2TQdZlwwjOA0ZLw1Wgg4oRhUQGhVTZRY5TRc9YRsdICBNeCEmMiIhSSJjoSU5RiVfjiVgfSo+Wy9PZjlnlzpcejszLTxBQkV6klJNUlhEO1piYFpneGOImWp4e3hgWH6Um4KHhIR4aZuvvJyal6OFcaeXe66xn7a1s73LydjQz+Hk5e3JtPfnw/z79XUiIREAAAKBSURBVBgZHcGBYqI4FAXQ+wJUiMTaEmFrV6dk8bnR6JuSSJv//7Ht7DkA6A9Q8CIXBrQGkBa/g6QAkCaAEKK7ZwaBCODsNThdJ4A0frh4DeExQBMBg4TgXkQ8ANIgQK47F2eQ1huM4ermzOxfACIFwnQfMCwM0gousDBn7wYAWmkAj+SQZtBGQ0fvhDn7FxAAowHJPPplhNooksRwTh4Of+iiwJSZfQogQ2DhAfBL0CAC9KrAItOyBK2MgU4pANMiIwg/VI2QBzBr9WSAlJfodo/oiPCHqobscZYdPVmFR+YdsySG0iDSqFTIbohhV622JJl9cJcUNGnSG6VR/RVFAo/0XCvOYUg5RhmU2Wy0VkB/SeLTTtVNsc/RkQkSBjLb9XZDuEDYS5jVqq3VsrAmPrEhY7Zmq+G+IXt1+OKqbWnOk6YgJ1NY2xmjNhwCfFXc523d1j5xOB7ibSps3VurSHxgJP74cnVbhi8ZY574Ujy99/a1GO4yBg83ym3Vlv98SnScL2NXv/d9v6KJHb0EzOH3oS1/Rfbz5JdT1773tl+TRK/hEuTmyraNn7w6jzLvy/7Y92q/LEHMtARcxrIp/c29loU8uH62/d/FISfmnV/E4PexKT8e8VxX/vt2eOrf34pDTjrkmMKGwG35seQUj8dvcau2eStcTntyImyUQV0+5cVp5+I81c3b83p4RE1nOY1KdRZltWQXZAqR6+atXh1vIZxdFKfWne1Q3TO7xxLjzbZvbXnmwD7LyRnb/cC/+dNVB39j2zZNef/cBX/NPBTd/5Cjq8rraVw1TVOfP9l0/BCztraz1nZIp3UVI9umaeprkq6ycd6vXl+ttb3t/gOGS1tVSbHrewAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Corruption Blast', cbclass: 'magic', hand: 1, cooldown: 25, maxdamage: 3, mindamage: 1, isbleed: true, img: 'data:image/png;base64,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'});

		//ranged
		makeAbility({name: 'Piercing Shot', cbclass: 'ranged', hand: 1, cooldown: 5, maxdamage: 0.94, stunmaxdmg: 1.88, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhQaEdh+5SoAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAJBQTFRFBA8FChsHCiILDisRETYWGCAUHEcfHjAUHzsWIFQmIzApLzYVMDUoMkkeMxsTNz9EN0gwOWAjRiccSEgqTUxCTl1JUFplWCwkWUgqYGhnYmmEcmVSc0Yxc2M7dnp2d36OhpGZiE03in5Ui2Y7nZqSn3tPn6WrpGVLr3pTr5xns8XVtru5xH1TyINryc/R0JZrSKr2bAAAAZ1JREFUGBkFwcFqI0cUAMB63T2SJcvR+rCwkFv+/6sCucRegsGWpZnp91IVv96NRJ/J2ItSFNCuo2Xv/VlqLUWICCJA8wOe7rO1DkIJBLT9ynSfAEoA0MQZE33SgIJASy9MdEhCiYiICNpWz0gdmcgSoaoKAy9fu85MKHE8n9sB97+NfT2ePzQzweF8flpqYH79wyh1fZMz0a6ng7bAffVvRvWLQ7lHpHG6tj7n3KKvt1lv30S/dH38ly3Hvn3d8nxsc64z6u0REcZGG30aO5fXgzUF6+9dUWNfNi4fO6+vcs1tCW7vCGXYxHL66H8et9xqux0P6v0eiIqKP4xlOdZxz3vO9fPw0/fvIlAqlpPT6/GWD9/zvvvpY4WiqOH8Y7ltj/1zh8v3JxAK4q/D9rCPt9iBBshSaqzrXttiPNDQJ0hBGTc7i5fHSP0Jd8ykYHw5GoyRujswtQTRIsBxYQKmTBAawIEOTAC0zDkwzgA6ENCYFjynCegaQCN3gYsOAEDr3QRP5gRzSoCGfStrPdNBB8CAHU1CR58tFaX+B6bV3y4FoNx7AAAAAElFTkSuQmCC'});
		makeAbility({name: 'Snipe', cbclass: 'ranged', hand: 1, cooldown: 17, duration: 6, maxdamage: 2.19, mindamage: 1.25, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhQcAgqaA3IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAANVQTFRFAQIBBA8FChsHCiILCwwHDBQIEhwKEjUFFBIWFCMJFysIGCAUHjcIIUULIlkKLUgNLmQLLzYVMVMMMkkeMxsTOWAjP2MNRiccSEgqTUxCTkcWTl1JTm0RVWQsWCwkWUgqYGhDckMacmVSc0Yxc2M7dXpTdnp2f18ef34diE03in5Ui2Y7jWJTkptenZqSn3tPn6WrpEZLpGVLp4Btr3pTr5xntru5wcaXxH1TyINr0JOJ0JZr2Kmc2cJk3ah03uDd5e3w5qiF57qs7tDA8LmQ9d3X+fb2zEWLPgAAAmFJREFUGBkFwelS5DYUgNFPu9zduDcGhgyp8AB5/1dJVf4xSRUEAvRqWbakO+coFCpMIeiydI7LSbKRgi2Wurn5aVT81jar5UYb2mx3a2OTMVqZZuT7fLFWuT9OgYI77ZcUFn34L0glQDxg4XN2hAvX3QNjyVgTwIBa6iu2Om3sPI9T/4PjzQY1PGsqwCbPxnRxcatF92qpjl2vUK68OxQqP4xHrcMuHXKIl5PTHQjCU4dGETiB6dx9nU9DvunXdLqpeurspxLYdO9KbD7crdNUrIccmn4ee/vtb60bYcwGq5c/Vyu/5vje1ppqbpOcAd0WX4Cu+jZev2rloRga2///6pb9AIEUFMabMAx37fzxmfe6Kbd6tHY357kPH6qJCS0uFu6tPfZveYdgnGr+rl629UJDt6Vj/Mqrpdv+VgGyMHykGlMFrL6OMZn7e3gyVQDPGP9923N1DTTEyRy3KsWpAsAUzd5TRrSpxuu6ixzPZjQWplorZhjPq7EotBhlb+7lcWdjqbrOIiLS4udhX3WdWrU/bteVrvkxjikQlTA2VfI4qcXv/mhXq8qqMiHIuG8YupSfUpu/9yDWjRrwAFIVGvQS/uQ4yzgnsw+iaK1JZtuLak1ERETc2buqLaIaNBEfbBUm8Amy9yYBlslDBvaqTOBhQsVOoYFmkYyo0FkpeAA8TLjT3CPY5FSMRkmZPAAwxfpyXDMAH7bbGiVNwAPAREtp6Ic79VJq07bWkgQAAO1EXl/8+fpPKCPFDosKE54J4vVgSAPqE7l+PT7PxZYMQAJyOh6s6cw0GEG/uv5VfgF8Q1fEb75pHQAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Dazing Shot', cbclass: 'ranged', hand: 2, cooldown: 9, maxdamage: 1.57, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODZBNUYwQzVCN0JDMTFFMjhGMzhEOTk4QzNGRUVFNTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODZBNUYwQzZCN0JDMTFFMjhGMzhEOTk4QzNGRUVFNTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NkE1RjBDM0I3QkMxMUUyOEYzOEQ5OThDM0ZFRUU1OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NkE1RjBDNEI3QkMxMUUyOEYzOEQ5OThDM0ZFRUU1OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsRa4xMAAABsUExURXmGB/3nAkdUBPvHATJHA01nCiQ4B/35YH+hDfryHvr3QF+DDRQjCK2dBxgrCBIZDNDZNK3NFfH58s3YF/vmpPKhDwobBzheC6mQIvjaRU1+DSkpFDFTDBw1CK7LLvfBIYS9EfLZyXxbHyJDCq3LlpsAAAHgSURBVHjaNJOJuqsgDIQDyBalytFau5/l/d/xzkAv9autfyaZQJR9nufpGf6G4TIMlmvACiFM0zTPQjoFwIu3VsT6T0gIp46n0z1AdxtHL0XEewQhoHEBDaDejyJSHL7kQIjvXJrWCySSpLqS5FhewgTgk3QtcEqpqstliTHqKp78Lp1iLepwmZw1alb5bVzurCullBhzNg4LN40LPBKH0MRvPjXu7c7OGBOJx4bRkySN2Tlor0iAT9Y1yQi5IPcotAN4Nu0GvaulHqNvWAReIbuqiRsQcI7XlCCXBysvUc9nlNx+vuCAAVlrw9iSAre4NMYvrC32Bhx7Bx6l0LTTuIH+tN/wVpPcrNCZoCorGvCobB1We21aSyv7wbVttEZnwDJ+kqfWDJ5Ho+8zf2PbujoweylVgemepoxq/e5qnibOsmEyRFD8gviGbQkDdheDgIKtYZhW1H7JcXRsuW/sKzch+8/6jdT+Etp5W1/WVJa8VujWulyXysqYR0wL5pcjKAmH7vRaMDYJBZE6EOPE23giICGLNAh6GcKpjaJ9tEnlc4wiIXrCWwHcB5n1/cEWGuMcgz4n4M5bwGdZ+3ig5hNzvnfeA+z/lywg8Wmadtl3vkYMYERf/AM47/s/AQYAApMaXjjmitgAAAAASUVORK5CYII='});
		makeAbility({name: 'Binding Shot', cbclass: 'ranged', hand: 1, cooldown: 25, maxdamage: 1, stundur: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhQcHYeSDocAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAMNQTFRFAQIBBA8FChsHCiILCwwHDBQIDisREhwKEjUFFBIWFCMJFysIGCAUHjAUHjcIHzsWIUULIlkKLUgNLmQLLzYVMDUoMVMMMkkeMxsTN0gwOWAjP2MNSEgqTUxCTkcWTm0RVWQsV4MPWCwkWUgqYGhDcmVSc0Yxc2M7dXpTdaESdnp2f18eiE03in5Ui2Y7jWJTkpten3tPpGVLp4Btr3pTr5xnxH1TyINr0JOJ0JZr3ah05qiF57qs7tDA8LmQ9fWs9tKh/LB/HgAAAnhJREFUKM8lU9t2mzAQlLApVEILURQ1rVITxy3uxZeCsVWBrfL/X9XB0TniZXZnZmcFy7JMCN7E0HbHY9v3m1xlUmspSTunmRBKpik/xdB1x67vd4k0dIdKrR1LxQcBOP0bPfC2755TYa3WuMZaxhlPhFTsKY4ntJ/6VaW10tZZi8vi/onxhRTsaxz77njyjQTzY1k68Bt2nqbhW8GSBWuvoT92vpM5emunUQZy0wzTtH+CSLhC3vtVriv9OBcYywTn3LTTdP7MlhH2wJ7PvmGurgHLUnKWHeJ0Lp6vY9+HTiRwNRdgsELJkgRny22ML9spdH63/UOVQ4E1iIWEUoIoYen2cvB+1zQxmvvcbl2DnEqViVLTgn9sB9+e4hBiQm4WALlQpEmmQmnNXwYcf45DC/q6BqyUXAq4MDnnjA1DOOPGgZCdW69BLoUqCrn48mO/358DwDANb+YB3q0DXKjSJPzXFHFCAB7bXdet7uyAYZybOB3SZUar46XtD00fx8sdZ1IqKTcxPnMiwXjvu8tl52Mcm3x2jubFax8MaIxNmikOY/Aj4v0N9ZopXRqz2eLtiCwR8QYYYPA7gnHMLZWmT6W0j8bw4y2OYYyj7zYVYsFgcyCGqrIkV32aZu55byLRazQjFlIqSxGZzpPx9o42ORKv0FyzUkl0YzibH2/XWde/JHIWttg4IyKpSqsl+/7vOsYpepNjGYb0nbwQePSk8moP4TiNneDkakDvmVMlC6nzzfUKy7F74w8OTw3Iur7/BoRmkbz6PvhDgwWRhax5L3BMUyLhc8EzQwmXGg9U25nbuPXPNSu1VQVpCway+CIMZ+eCes7lPzZ1Zbs8tuLwAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Needle Strike', cbclass: 'ranged', hand: 3, cooldown: 9, maxdamage: 1.57, nextmult: 1.05, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTdGMTEyRDhCN0JDMTFFMkE2Mzg4NzA3RTE5RDNGMDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTdGMTEyRDlCN0JDMTFFMkE2Mzg4NzA3RTE5RDNGMDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5N0YxMTJENkI3QkMxMUUyQTYzODg3MDdFMTlEM0YwMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5N0YxMTJEN0I3QkMxMUUyQTYzODg3MDdFMTlEM0YwMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PokoTwcAAAB+UExURRA3BRw1CPH58hgrCAomChQjCCQ4B6vsniVeCS+3BhFGB1PQGC6NBwobByFOCs3zyS9wCSJDCi1HDnzeXQkTBxIZDCteJVKpDI3hg1h+LnmMW4nAMzNJIDFTDLm7cUtgLgYLBsvPzczaoKqdjFNgWPLZyWpsVRs8HIKKjM/d5VGZaxwAAAIDSURBVHjaPNIHbuMwEAXQYRE7KRYVlyRO2Xr/C+4fOlgaEAQ/TrUpb3kerbe43jTlNOyIPnkfY7SUt21/37TW76f9kXV2w0qZqme2krZtm7G5xhc8idUeFdHeyjuiNZ/sEt/RcWpgtj9j5OTbvueXQ2vSUy8UXK1+fCI9LUi+b9+KfHLoQCH5OJDe07LDfzsiUpn1zKRZI9InZnzK1GrleiCJ464TH/CyqKb1ovZgpS0YPHxrdTWBReE7Ow35xg2cIz61OJdoV6SQYNF37Ayx/mLXt9MnF8gFjp4HI125foJKGVMIhPk8hyI2p1hIKF4pdB0E1sfFTl6WepYgxBKeag+Chssqn4weSAhFcerlwGZID7zPvkpFWfVfAxV0wWr5a0yGh8JKv+uWEHRkrYgWAYmNoqfeNOYtNLdPGXHoSRhBaWa7UgGHNH8bzR2xGlHvrKXV6orA9mUEglFWmBa41qWI4qoTYUjpNQ/HtRE79faMNXSXayLVgh6IBmu/yr9X0RzrEqV1SBn0aSdTWuVHaZ21q+t6D2SUIHcuzMp9yq9mWFsX9e0kTKKouEVx5/gf3ERrpbreTY+JjDFKOceLhI6PB5mGcXtv/UzBNHCpvG4SdP3T0V1zrw16rQ1oTK9qMj1+GdaC4r0fqN6ZX7knJH958FagHPta+A6HC55IiH8CDAAq5yGliUdvnwAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Fragmentation Shot', cbclass: 'ranged', hand: 1, cooldown: 25, maxdamage: 1.205957, mindamage: 1.205957, isbleed: true, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhQdFOdVh2IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAANJQTFRFChsHCiILEhwKEjUFFCMJFysIGCAUHEcfHjAUHjcIHzsWIUULIzApLUgNLzYVMDUoMkkeNz9EN0gwQEdlRiccSEgqTUxCTkcWTl1JUFplVWQsWCwkWUgqYGhDYGhnckMacmVScnw+c0Yxc2M7dXpTf18ef34diE03in5Ui0YWi2Y7n3tPolUWpGVLp4Btrn0or3pTr5xnsXcTs54fuVwWxH1Tx34azKI8z98Z0N480pog2oIW7K4r76QR9OZe9d3X9fWs+dE4+fb2+vIS+8wU++5AeXdeTQAAAhxJREFUGBkFwcmO20gQQMGXS1WRWuwR0A3Mcpij//+XfPDFBsYttiiKrKycCJmGNiAMDgagAwBAhyvqRJkMKCIoAwBVgO4OTO3LGgtkGgBGItAdm1Wvb7fLJK/AMv3b+/4SQETI9LDr9Vb1tCUg8c+F9wUkU1LHcIvN0MNoB4l3QJKSsg9QhYPnsCUgJLf7+PxuXtqU6oBjxAMePwI7pE1jYQam8QKqA8tyQSo8GXvdfs4T/Quc/qvg2b3rJ/xxXfcesGztxHketszPHRMQj8x8k/01C69pKreLlb4upJhLiolmn2/XNYtRLtfzgTzFJdJOw738vaVub6Wv7U9Vbw2V0yAlNNVgTK0ev7iVMyXOZTdh3db1GVaGqy3VnG1u+2S/9Rw9H/oRR2yYa6lZzE7ndXyNYZHz+hHHqo+NSHerI4yg/rWMrx9xqqyMbYMnYE3j/d/2qm40KU3O7bFXz23r9Cg+jLc29zE15ACUqS5Fdo4QwSat7fL8VSfFVMQEo2qvUomR1rR83qMyg8IUkmIWjHoZe4gSUWLlApalRHFKoVFOOLg1xKap9GpNiMwUJbMe6+aneygc8QQADwCgKGgeH+AdOFdrRjgojDDG44B4dXPgMFzBQBMBT2tIHf0RVsBeUxuKaIgI2XoOr/L8fe9IcejzbJdrG7O/aH3bc+HO/RBSCg508EOm3gFSOhhCIjMAdEgkxxAMABDv9j8Gex+J4Ti8xwAAAABJRU5ErkJggg=='});
		makeAbility({name: 'Ricochet', cbclass: 'ranged', hand: 1, cooldown: 17, maxdamage: 1, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhQeNhkYlUUAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAALdQTFRFAQIBBA8FChsHCiILDBQIEhwKEjUFFCMJFysIGCAUHjAUHjcIHzsWIUULIlkKIzApLUgNLmQLLzYVMDUoMVMMMkkeNz9EN0gwN4MJOWAjP2MNQEdlSEgqTUxCTl1JTm0RUFplVWQsV4MPWCwkYGhDYGhnYmmEcnw+c0YxdXpTdaESdnp2d36OeZ4uhpGZkptenZqSn6Wrrrdws8XVtru5wcaXyINryc/RzuDq3uDd5e3w7tDA9tKhOwndNAAAAi9JREFUGBkFwVtrZFUQgNGvLvt0p08iSVRmDCIiDPjgs///dzj4IASVGWKune6z964q15KVAKCw9TEW0ggVA6AdbKGsSkjpN9+9b+lEmpRGliK2oJSACsfrOz+GmJdHIaZga0JhZaXycH13OHZziuGomNueQn1SprU872++XR7CajRBZzXbV0EVpuUlXS4XfyIaOKVil6RKqQteRcu4utBnTChVXey6pmteeNgQ72/fjFh2b7GoKrpb7CqEaJWLtnEWeV2PufqjapR6ll31w7hsVcopWoocdye5yVf3gx7m3m6V1tJqG2EkLUd7yg/jxVNKzc3CzvTNkhhZG7Lt/tnuxlmZjsO2BUWGHXS3W/r5/bG+vH74OlK9+8ra6Zzn2nYXrSlEHy9vf68zmCK/A7yjGGBQLgpxej/OwcEfgHZMaDQAYDBo7zXC3n3CeJ4+54WGtR29j7H1yyfUdiy+cjZihpw5LgJzJNtHwvDp+BnOvUg0R9eBj6X/bP8SbMniwYBAM2nA7K6/rJ9DjGyODziRAGhim3285T7LFRO6d6LQJEyT6HxauD9ZQpoxdW7GMMJmD8hfV+6nTCU1Ng5KbjAgyJrbj7fznnEWiMzcuhmVTNUSpeun+Mv7EaoklRIPMJhOMeq39sc8nSyjwYI55lZZQlkxf/r+z5c6GSKRKpXpalFZUGH9cPv5C90MACBsMSsEGCHxw9NXCc2s1MKyDJF9QSpJ7C/+EwwgsCWwpfgfpcNlUbAN2iYAAAAASUVORK5CYII='});
		makeAbility({name: 'Corruption Shot', cbclass: 'ranged', hand: 1, cooldown: 25, maxdamage: 3, mindamage: 1, isbleed: true, img: 'data:image/png;base64,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'});

		//defence
		makeAbility({name: 'Anticipation', cbclass: '*', hand: 1, cooldown: 40, maxdamage: 0, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhM1LeBCt0UAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAASlQTFRFAgICAwoNChIVDAwMExMTFBIKFBYZGBsSGhsbHQMBICorIQoGIyMkJjAzKTc6KywqMzk9NDQxN0NFPDw8PRoOPSweQ0NCSDguSEtMSVdgU1RSVTMgVktCWFtdXmNiY0gvaGttbDseblU6bmZccnR0d3t8eHNceYaOf4ODgmpWg0sohWA7h3xziIuMjaC2j4V7kJOTkZidlHNJlX1ZlbDKlmE7nZuYoKKkopZ5p6qrqIpyqXlIqYNZqa+0r6GWs7S1uLu+ua+oucfQvZdkv4Zbv553wK2Tw8PFxr63xtTfyr2ky8vLz6Rw0al+1Ztc2dTR2dvc2rKO2sm329TC365237yI4cah7ujk8Mma8fLy8tm79L9v9smG+Nee+ObK/eeo/fnq/f39/vbIxFVI8wAAArpJREFUGBkFwWtvG0UUBuD3zDmzN8d3p0mUNjFNVVAQEiogFf6/UoSQgC8UpZZ7SUhKktqOvd7Z8Z6d4XlIIgjcAsh6AXZ01InXi7IKAPe/s8TBkBKbAOkMs/1Tioh+8d81MPx29J4NUTRkySSpHH0zgYsxmt5hpWbo9B2blkBkJC2K76eCIAAQI5XU4sYZAiBQDTg7oLDTCNCqBswUX3beCLdQiBhzevuGEw4gt8ow8A7qPUsMkSwMRTu4uH5pAPd20INu3hE2YMBQCxPILE9+vJjxE/++eSa6doe6qVsDZCRQaJC/zS/lm+i3wyyu6dOM8k5uYDSDZKoedr0HfOzS8vNu89uXqictMyGkUXOD3DYP+6tqc14tkFx+fvr6+fi+4VTBtkmz1KvY8Up1Yj5ObuevXuf13lefWFLrMsvJKoxY+stoTx5iOv/p68XucT0wDM2tDhrBcBD3Ow+Ixd308uy8Xjeo8yCIbhSqNC9kPO5WwAvs/bN3XlUAAAhIt/uKLvWnob3ZpUd32/7P6yUAj+KDANimU2qP+7ruITnP7PmwbAH4ePrHLQ1DKhgf93L4FjW6YCwdAB/PZhdPpREpxuPxzTo9SdRKHdU5ADWdXv56QMIcEAf8JH27/AEbZA4e8CiGv1928g1TE3EwVOrZ2cTuHOCib9Pe8s97OzIbUQVrbCgM0vkrggN8atzsTgerdKucIOnwMNHKdubFpIQXWV3N42T6mGWPniWk4hZd0TC++qvdg2z/vWvGh6P7RUZly8jMNnJNpFte3VDxsNh2jvLN45Uk7JULrWMCJbtbZc+Pu8uSDzplZM9NwnUrdbTaerNtB2oAl2WIta0hCEp1lMgKZVOPNq4TayCW1rVAtUq4iRDbwCL4Z9lV4brRl8ASiECf2RMEJJCY9uc+2GWpOwAA8DhK1y3wPzBYc6GwMQvpAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Freedom', cbclass: '*', hand: 1, cooldown: 50, maxdamage: 0, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhM6AswLltMAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAJNQTFRFAgICAwoNCgoDDAwMExMTFBIKGBsSGhsbGyEkICorIyMkJCAZJjAzKywqMzk9NDQxN0NFPDw8Q0NCSEtMU1RSWFtdWGhxXmNiYHJ3aGttbmZccnR0d3t8eYaOf4ODiIuMkJOTkZidlbDKnZuYoKKkp6qrqa+0s7S1uLu+ucfQxtTfyur9y8vL2dvc4OTl5vn9/f39Ysn3cAAAAhpJREFUGBkFwdlu3EYQQNFby5AcSaM1cJyHIECQ//8rP9iyLWk2kd1dVTlH/KusfcsRuAUAxRwBDNx8jK81qLVfzxsOZhEBWDgVYvHlLwCkX1/PzBZYhAVgA5viMunrz98fV7l/3p/6wjCFwjIR8Qrwg5NN71/y24eJBkAMcJlCBv/dAbTj9sf89m0iCGNAmImYR19O78fP+X456WG+ttJdhRCYKaV+/VX7ufo63UXeeq+ROwotFUOMEf88ZS9yYTidzx8bkglmqYqyjZ+4TWsLkmk/LvOmj4eDo2Asebx/HrqmS+Vm0v7194NF2q7INPPpoZoN13Jb2o/zi+yna18dEIMQcUHGtLHrp7TT48X2tpkUoqPnsw81qeY+zqW13lgnNgVhMOY9UqNsnuuSqlNcfT90NkUQ1HthVaXaWh+jyhapFFOkhDr86ZKUSF6CyHapQ6y7oSYIzA9v37vLKFJ6SeItWbSZJWKLv/JFV1WQ3lbnrHZjTUszZLL2Mf29vhlIpinHvBnbjq1hKl692924vIx1ghHjyd4fn25uRvlVZxkD99/fX9pxET7PV18KPezXtsjsW4EQZu16q61ytz2s7+TY0kdtpoAU8zhNS0tbZNbXjXmqyTNFQaSQRq3sJvpu9+vsdsx9pHQzRUqEEgmb8u2z3j9MJNxXXa3ECwCkYFcb4AVh8nR70ZNbAGAhRhcvMQJ2OQb5Jv8DCaBXsuuGK7QAAAAASUVORK5CYII='});
		makeAbility({name: 'Bash', cbclass: '*', hand: 4, cooldown: 25, maxdamage: (1+(491+99)/1111), img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhM2GerbEDMAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAATJQTFRFAgICCgoDChIVDAwMEh8lExMTFBIKFBobGBsSGhsbGyEkICorISsgIyMkJCAZJjAzKywqMzk9NDQxN0NFPDw8PRoOPSweQ0NCSDguSEtMSVdgU1RSVTMgVktCWFtdWGhxXmNiYBcNYHJ3Y0gvZltUaGttbDseblU6bmZccnR0d3t8eHNceYaOf4ODgmpWg0sohWA7h3xziIuMjaC2j4V7kJOTkZidlHNJlX1ZlbDKlmE7nZuYoKKkopZ5pb/Vp6qrqGU5qXlIqYNZqa+0r6GWs7S1uLu+ucfQvZdkv4Zbv553wK2Txr63xtTfyur9y8vLz6Rw0al+1Ztc2dvc2rKO2sm329TC365237yI4OTl4cah5vn97ujk8Mma8fLy9smG+Nee+ObK/eeo/fnq/f39/vbIQ3wu/QAAAnhJREFUGBkFwU1vW0UUBuD3nDMz98txfB3aRo0IgiDaRStWrNjyf/kHLFkhgWABrRSSBtqU2nVr9/p+zcw5PI8QSAy0NF8XxGeFebKlBV9TApEARAUrFYJSs2M0ZM6x8OyzkRAAV9BU0SSS6qCqgYglu6iABAVZXvihqNRbJckpkzlgmAEIeyPPUhsX5KQIBh9i0cR+AiBUaonoyC2jQ4jeI7o+nGw/jjAkuFQ4VNn7um3rm9HPNaold2+DgyaO7vkUUZbkVw9JLt8IrcavDQ0Nez0aavcMm7n3J+XSbamd5yac57svyov/TkcUTSVXuRafj60/tvf94iQHfv3QDX7XyWljkzzV3dhUZ/tfzxr/LtXt/KI6j7f/XFbltC+Nsf8XQHqA+VDLix433fkG/ToEs931yO9uI06Hjp//PuFqfIOX3zSrn/Xy057K4XAvY9N8sM+K9+3LblHzhuZvDx9+exryQv/OtnXBtcPr3XDhvv/xS8GjosnNT59fHW5oLxebIL7b5rbP3cl68Yt1T9p0fTP+EG/f6rp+9b4XEI15/Ti8WsTdgyeHwT3+q3503X9Fm61moSUzvPNX/Of0XbtNTGfyx/3F+q4fIgG0ysJceL/C0qUDheLQIsv2TgE3RgnZw8H06DKlVE7Y99OnrdXHxKoilRAyIzWk3RA6sr7nfBzmGinFzAwFRa1g2GNM0aL1vWAamAmQAgzAVzFoAUuULVsUII4CFgYU8HyokBwLTJEzRx9VFBylBAjeLGqpxgAksYvqlGLM4AzAT1ogIiGTEApEVraJoF5qMEBsFoBQJCKmRJIjqzgBM4NEHEPhAEEAPHJS8QjA/9tfTFuv0FeYAAAAAElFTkSuQmCC'});
		makeAbility({name: 'Provoke', cbclass: '*', hand: 1, cooldown: 17, maxdamage: 0, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGGhM4BvlQMEgAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAKhQTFRFAgICAwUJAwoNCgoDChIVDAwMEh8lExMTFBIKFBYZFBobGhsbGyEkICorIyMkJjAzKTc6KywqKz1EMzk9NDQxN0NFOkpMQlJSQ0NCSEtMSVdgVktCWFtdWGhxXmNiZltUaGttd3t8f4ODiIuMj4V7kJOTkZidnZuYoKKkp6qrqa+0s7S1uLu+ua+ow8PFxr63y8vL2dTR2dvc4OTl7ujk8fLy/fnq/f39b+bPbgAAAb1JREFUGBkFwVFulEcUhNGv6nbPjE1EEHnggbCB7H9bKIqEPfjv7ls5R3PNyA1kNh/KyxIA4O4ipWUH1PX70z/vb3UMwNaKa8IEx56bH/cfrLKxGWveq1ZhVRgZv//+S7N/TQzIWrYBHPvUr89fN+ePl1Vd4APLNYFWua77tw7pL0U23qBpBlCmzL0akA3Mhh0MdzcI+XkZyFm+0ZgxcaQ56Yj72QbYhlsADj478jaxaQAOcFVhyi6wbiWax7MBrVsxOsEDu2irPcy+jtDponykmm2rANKRXp8tyOVzuNWkkZFClWXTF2jTIAMYKwYAGo5hg0SHMhgYQuKAV3PeXLMSFIQpAIPwp/fmfLzOZow6zbbdhMmNOavO5mqDnbZRuy2hioHqi0Uxq7FQYRMcMXUQm2OB0iDsAYAQKqjm41UhGEPHHLkD1PCovZ+zYUkgglU0C4HCjTeEmERKN/UQTkkFxkkLoGga4SQ9TTPGYKyfFAF1x0A9EJIGMX7W5yvCWZgG6iGKKGTk6u9/vvy8O6lqJWDCwcS1CYMxAYvExvUiysgxnu/H/+5b0Vm0QvSFMqouBtF/uT/QR9In0PwPlALyLLPQPewAAAAASUVORK5CYII='});
		//	bash damage based on t90 shield (491) over t90 weapon at level 99 (864+247 = 1111)
		//constitution
		makeAbility({name: 'Sacrifice', cbclass: '*', hand: 1, cooldown: 50, maxdamage: 1, img: 'data:image/png;base64,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'});
		makeAbility({name: "Tuska's Wrath", cbclass: '*', hand: 1, cooldown: 25, maxdamage: 1.1, mindamage: 0.3, adddesc: "Tuska's Wrath has high, fixed damage (100 × Slayer level) with a  2 minute cooldown when on a compatible Slayer task, and normal ability damage when not on-task. Use the 'Slayer' checkbox to toggle this.", img: 'data:image/png;base64,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'});


		setcooldowngroup(['Kick', 'Backhand', 'Impact', 'Binding Shot']);
		setcooldowngroup(['Combust', 'Fragmentation Shot']);

		//placeholder
		makeAbility({name: 'clear', cbclass: '*', hand: 1, cooldown: 0, duration: 0, maxdamage: 0, img: ''});
		abilities.clear.desc = function () { return 'Clear this slot'; };

		abilityhover = {
			melee: ['Slice', 'Havoc', 'Backhand', 'Smash', 'Barge', 'Sever', 'Kick', 'Punish', 'Dismember', 'Fury', 'Cleave', 'Decimate'],
			ranged: ['Piercing Shot', 'Snipe', 'Dazing Shot', 'Binding Shot', 'Needle Strike', 'Fragmentation Shot', 'Ricochet', 'Corruption Shot'],
			magic: ['Wrack', 'Dragon Breath', 'Sonic Wave', 'Impact', 'Concentrated Blast', 'Combust', 'Chain', 'Corruption Blast'],
			defence: ['Anticipation', 'Bash', 'Provoke', 'Freedom', 'Sacrifice', "Tuska's Wrath"]
		};

		/*
		src images
		<https://images.wikia.nocookie.net/__cb20140531140233/runescape/images/5/5a/Attack_abilities_tab.png>
		<https://images.wikia.nocookie.net/__cb20140531141048/runescape/images/7/7b/Ranged_abilities_tab.png>
		<https://images.wikia.nocookie.net/__cb20140531140905/runescape/images/a/ac/Magic_abilities_tab.png>
		<https://images.wikia.nocookie.net/__cb20140531140728/runescape/images/6/6d/Defence_abilities_tab.png>
		<https://dl.dropboxusercontent.com/u/45182859/New%20folder/close%20icon2.png>
		*/
		abilitygroup = {
			melee: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACVVBMVEUECREkJTIsLDoqKDQzNEMhIysxND0cHCY6O0RLTFo6O0tDRFNKS1NCRExSVFxTVGJFSlIyKjtMUloyOULy9/lAPkpkanMzNEIYGSImJC88QkomKTooKDUrKzhGQUUrKzktMUMuNj4wMzxUWmNaXGVbXWpcYmphY2w4NkJqbHSLkpq4iy4ICAv962MvKDgvMD0hISsvMD6Lhn6aoqsYGiUiIi0zPkUUFRxzeoJ5foM0OUs2QEglIy0hIi4jIy5TQ1wnJTAoJjJbXlkpKTZjZXJkaW0pKTcWFh5rcnuBi5iGjJQeICeLkZWen53ds1Lp2boJCQz2qxf489VFSE4iIzAvMjsjJDCEYUBsUj4sLzc3OEFLOigNCxANDRJPOiNPOwwPDxQZGiQmJisHBgkxKTpbRzkKCg0bGiIUFR4yM0IyNUoKCg4cISYdHRELDA8uMTkXFh0XFwV8XD8ZGgoaHhY4Iw6HgnsgICouLzoJCAyQeQgsLTohISw8KkPY3ebbqzXb0s8uLz0MDBEMGggiIy1EQEUuDQkUEBBHNiZJORVJPDEaGiMtLjsaHSMQDAkiJCIRDApPUlRQPAwbGyRTPQgkJTEbICUcGR5ZUi4lJCQlJCwVFRwREhYxMkFcaXQmKDAyIxUmKTkSDQtmPg1oUC8eGiRrbHsnJTEnJzNybl5yd31zeH4nKjEeHycoKDR+Xit/Xis1NEE2OEMSExopIzEpKDM4Jh8YGCE4OUY6OCMgICuwjwa0rJw6O0opMDcgIikqKjcqLT4rERATDg0TFxkrLDkUCxlJbq33AAAC7klEQVR4XmWQY7MuSRCEu9AcvT62fa5t23dt27Zt27Zt/K6tno3YL5sxk5U9T3Z9GLVl0e6dpSZ3/l+7F21Rk811PvU+zSc2j40M58PDeZ6nRb6uSFNJblKtwJGiGB7Ki/80kudFXnhfFJvfhhVqOfjCV4T7WpHXvC+h1Hye1nwKy9V2m1SSJPE+SaOPxJAlqQ9pmvictqsJnYhCUrog532W/XtyzQQmVIuCiFneOicuoKv8dPy3177y2OfNsJKhpVrIzFjn6P3IK5Hbfrvm3LtubnzGNzGalhoDDONS6kI0yIjYtmDJie83GlfPSzY4pkaRg5Mc5HosnDe3+OwdjYMLL1pyPjLDqBo1AbsExCcg9nXP79/RuHXh19t+JkamUTVEiIAiAEYY7F48vUf4d6eufckgoh2Sgihmkl7fcReesaex74Pe20+bFa4hFiyyIBD6Ws+DT78u/L3ee+5cjyJAGlK5RaMFn7m1+wb74qPCX146/cuCNgIpgM1VjaCKQLjh9GMfuvjhkv9xznpggqxIwNZiwSBU4df7Zz79u9x/x1u3DQIAQoqoYwHlQLjm+VOmfmzs29h7xbKPB8v1wA6pplJNAAbwgfYL7p6Z2bj0zxdWfyV9JiIMaVU2aBPXUce26bNu+eEYddKNPdW4sUqAyDpVlRi66JIPv/hk75OXXf/GM389BURAxpARr6iK1UTh8Or2k6cen77uqgNvdvSBBQJkFKBjAQFx7ptnp35f9kT7pfc9txUdWtNJQAjaHlKZllh99/K9r37/ZceaXZtme1CYRgbUVa0z1WkBQO+694S1Hx1FwME+KP+c1hq0jM5Y0GCOvLNpA1kgJOFEhIIhRiloGhg3TGxMiaMTGFHVoNGxYIxjQ8YZHmeOwxkkdo4RWTbUtRtwiRPgZLBpOknjLoSQOefKDXXnMicgZFHBpeIuuESqma2rVdZqe6UV19o+Ii6JnNGarJXvq5QeiKqLGTPQ3x8ny1myiUD/A6IwfdCnS2oXAAAAAElFTkSuQmCC',
			ranged: 'data:image/png;base64,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',
			magic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACH1BMVEUDCRAjJDEgIiobGyUpJzMrKzkwMzwyM0I5OkNKS1kfc8ERQKA5OkpBQ0tCQ1JJSlIOOndRU1tSU2ExKToMMlgqQ3g/PUkSaukrQ3hESVFIe8ctNT0MGihLUVkoJjIxOEFTWWJUc5ZjaXIqKjgxMkEKKEElKDk3NUErLDksMEIKKUFVQGpZW2RaXGlbYWlgYmsiIzBpa3OKkZm3ii4mJDCFi5NFQERSQlsxNEkMM1g1P0c7QUkjIy8kJDAQGylRFQ8REhkHDBQrQ3csLTpiZHFjaGwXYpkvMD5qEAxqcXpyd31yeYF4fYKDYD+KkJSNPzSZoaqhcVMaEyEMKUIYER8tLjYNGigIDRU4OUIPEx0NMlcmJjMQHSshISwoKDY7KUKEXhQZHRUKKEAZHioSDg0cHCYTChghIiwTExoNM1cTFBwZEiAZFRgREx0RHCoRHSsaGiQaGyAxPEMaGyUyO0MyPUQzOEobGyQ2N0c3JR4RNCMNM1geHCUeICcfISkPFB0gHiRARU0gICpBXXIgICtEP0RER00gIS0SDxAPOnQOCQUhIi4hIi8hIyEiIi1SOyEiIy8OCQZTQGgRERcUFBsjJzYUHStaRjglIy4UHyxbaHMVDBoVFRwnIC4nJTFoPgonJzQnKjFqa3oVFyBxbV0VGRwWDx0pKTaACwwpKTcWFh0qKzgWFh4WFh8XFR0rLjafCAkXGB4XGh7ZgYLaqjQAuqguAAAC+UlEQVR4XmWSY9N2ORCEM3GOcZsPbby27bVt27Zt2/6B27m3amurtuucySR9pWs+hO07eXzdQCvr/q/jJ/exldoGlzqX5st7F+fn8rm5PM/TIt9QpCk6u8KOqvmimBvKi381n+dFXjhXFHu/oKPsCLnCNeG7bpF3nRuYwFyedl1KR9ghkTSTJHEuSX2d902cpC5K08Tl8hBb5gkUoaDCss7F8T87W0tomY3ICDIGf98k9r6tZz8eWbhRUovuMTTCRpQxRvWNr9PqwJXPP/jo26MbcaFmLjVKj7BFUtEkoAmltBq798lWPbjo4/MGvD9ZZAvKRBZ9NK2MOvBHK8vqwY2feX8jsmmBLehITYD2X3TxBcH+ThbsvnpUq7Y0ysgFNiSVIgURmdGdWVhtbApbj40B1zgUQwAg30tF357VCLM9mxq7rx2jEj4nDwikkyKkTGw7E4ZhNvP6R5cY5PpkOcRyoTSHXSL0hmqQhWHjnIe0MZIAkMhZV1KpSCpcee3r/WGGhMqXPQIQFwmJrge0opJUVD51fT3MshnWOfdzQialmMIDSML9pR9/2dVoAcg6D9y964etS0TGKtllKZdEemnbc3cMD6/+daxTaax/94NqY89N70kVpSUSuEbCnXe1WsHw6qerB0+c+u3gVDY7O3s7YWyesqZEM/FOq47pjp26bMeJP7/b0RmvZLNvSE1SN1lTcCmj7ZiuMjP+1asv3L/+Gu9XDz+tYHAPKERcN579R2F1+PDUTkzPxTMsxpCyvPDND6+oVLIwqNeDIKxWp6564iXFS85jtkUQEee9X1/5/eefzj/9/q3bb/nm5rdue/gRThwRWzzASWuppBTU+37t2bUXP+n1FGwiZAPgsj2pjTQDiOQAJQ2VWmnuAa2t0VJbbSaN8YvVShpr/RNCQp/btk0sDIvF6JpFN2nx0mNr7SChb21sYUSxV2RTVIunDzQWfbZZCC4uF6ici5dR0UmrOZdC4Hwz422vPorW7elpvxrs0Wtv8L8BPhZz/rwceQsAAAAASUVORK5CYII=',
			defence: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB71BMVEULCw8jJDErKzkbGyUpJzMgIiowMzwyM0I5OkNKS1k5OkpJSlJCQ1JRU1tSU2GKhX1BQ0tyd31FQEQtNT0qKjhLUVlRFQ8xKTo/PUlaXVhqEAxxbV0xOEGACwyAipdESVGNPzSdnpyfCAmrs7uzq5vYt5bZgYLaxLTa0c7iNzvx9vhTWWJZW2SKkZlaXGkyPURbYWlbaHNgYmvICQfNflpjaXJpa3M3NUExMkEsMELvDRMoJjI5NyNyeYF4fYJ/NRlSQluFi5OJhH0lKDmKkJQ7QUmLemCNPzMmJzKZoaqaPRYaFxsxNEmkkIFDP0QaGSFEWFtiZHHX3OVjaGwbGSIVEhM1P0dqcXoXGh4jJC8VExUZHRVqa3pER00kIyokJSMlIy5FQEUlJTEVFRwmIiRPFRAmJS1ROyEWFh1SOyEmKzInJTAnJzNYW1cnJzRZXFdZXFgXFBYoKDUoKDYQGyhdVi4pKTcXGiAZExYrLDlpEA0rLDosJTUsLToZGCBrZ1pualwtDQotDw0REhkuDw0uEQ8uFxcwMT8wMUCJPjMaFhqKPzMSEhkxMkAaGBsTERMxNkgTExkxOkIUFBscHCUzMymhcVMzOEodHCU2NCW3v9g3JR8fISkgIS0NDhQhISw7KUIhIi48PUshIyEiIzBVPVA5AAADA0lEQVR4XmWPU9M1SRCEu6rd42Pbr63Ptr22bdu2vT90a85G7M3mRVb15NMZPezi8UP7p5rb/38dOn6RzZX2Wc9aL1g/vzw/G8zOBkHghcG+0PNoM3NsD86H4exMEP6n+SAIg9DaMDx/M+xhu8GGtkm5zYdB3tppSJgNvLz1YDe7yv2m7/vW+l7q8+kS+551nufbQFxl69InOTJyioy1cfzvyZR8WGdrwpG0du79B+/90zg0TWcodX7Jfadhja2h1hprm5+8cv/rB64d+zyn9Raeogsl/btGtcaWAd0GPnzbr3cf6XVP/8S+uPWlzaLRJERUuMwWUTuDryVHesN2t9GLouib93DaeoocFtmicnhQH9iVdNtJlHS73d6ZR3V6Nys0arHIZgQi4GO7ylEjSaKo8WP72pMi7dcKEfkMASR1JpOJ2lGvF7VHjbvonRqKlEtIAY4a4cvMC90LvcmFxtK5ha8Qn7r+6p25tFnMsICjkvBceSFpR6N2ptJpvX320jut1osfEwA8YHkBRYSz5cy5qJosFVYGw36h0B8Nxm/EoQ88nwIK4eUfynck1SRTGQ9Gk+FwMhocrYCHKFMAAXDn62fK5WpjodBaHQwnk1F/9UQBtEGRZ54UAAqe/awcVdtLhXrr29P9/mDQqhQEOq9IDVIBIIiHblSr5aVCpVJpjVfHJyr1ewBRS481BS0Hd5T65dNHHn/6zXql09neXunU6+8KBUI1WZNLIdzfAuCP376//dID9ZWpOvcdQwpkCmDaBcAlIOyc3LuyvU155UMQCJLfwmIpQBQRUWJRgMw9v3dMqj+xCSiLUsbsMAcAKYXCtAFV7vJR+ofLP0sJkioOp4AEpQQKwYEcdt766IOTOYoBqJsAKbIbSgs9hUBMUVCkokIlU0Apo5VQRukNrdNhFAptjEbU1FCTJmt8Q4GhoVXJ0LZhnHOxMWbaUDMmNhS4OJUzHrlxxic05jV2hXPJb+LkUvK/yGkTRkkpOKfvV5jMpqqRKZXd2kqnpjPtKg3kPwe/cndN8dh3AAAAAElFTkSuQmCC',
			close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAACHklEQVQYGSXAy05TQRwG8G/mTK/YUinFoAQ1klpCoix0oRuXLNR3cO9G38rEBzBxwYK40OgChJBI0KBy6+kFejudnpn5f1b9qacvXjrvg00oQWULKjj6VLwDRUUZupSgzhUngf1uy5hcUX37mGke5ylKR6BEQiUCEEo7BgBWm0FlnjfrBpRiNy7FJ2UFrTCloRTxl0LAFPsEo0yYmTUMLkcpgdeuFm/cnR/Ew0E88tabvCktzJQWrsSHHXSSAdjTWkMpAAQWVuY2Xj1af1avLZUKBVNbKq0/r2+8frxwp4opCkNqZDJ2IQSif94/2Dq4t9EwRrd/Xc4vVxpPbu1t/ug3ByAgwjQ1pjynMlkCvVay8/4oMtHiSnl5bcmO/P7mwe67o4vmKBCkSPAaUCSEsOPQOR7E389zxlZrzBkbH563f/cmYxdIUZHOFgwkCOkJZFSlZqpVSdrd2A7tMJ2rSrkWpechWIrSOps3Ol8IKpoQ+Uq0+rDQuG/2v7RbZ662mFl7MOOS4qctCWepiNBZ43td41MAsxWsNsL2Vnvns+u0pFrTaZI01szXbdoTOO/DeGRUJhcQeeDnqX/zNhl22b+gS2mbHH6QvV13fBK8IEArkzF0qSWFkEs5u2QEgNAKsGyeAaeBxFBhDAUJxtnElmbT+espBST+0VpNCfGfhbLl2SidGEfidt0t3/EKFAEJUOlIRRFJEFOkaO9COvkDLBddsaE1E0MAAAAASUVORK5CYII='
		};

		preloadbars = {
			optmeleedw:  { name: 'Optimal dual-wield melee',  hand: 3, cbclass: 'melee',  bar: ['Decimate', 'Dismember', 'Sever', 'Havoc', 'Slice', 'Fury'] },
			optmelee2h:  { name: 'Optimal two-handed melee',  hand: 2, cbclass: 'melee',  bar: ['Cleave', 'Dismember', 'Sever', 'Smash', 'Slice', 'Fury'] },
			optmelee1h:  { name: 'Optimal one-handed melee',  hand: 1, cbclass: 'melee',  bar: ['Dismember', 'Fury', 'Sever', 'Slice'] },
			optmelee1hs: { name: 'Optimal one-handed melee with shield',  hand: 4, cbclass: 'melee',  bar: ['Dismember', 'Slice', 'Sever', 'Bash', 'Fury'] },
			optmagicdw:  { name: 'Optimal dual-wield magic',  hand: 3, cbclass: 'magic',  bar: ['Dragon Breath', 'Combust', 'Concentrated Blast', 'Chain'] },
			optmagic2h:  { name: 'Optimal two-handed magic',  hand: 2, cbclass: 'magic',  bar: ['Combust', 'Sonic Wave', 'Dragon Breath', 'Chain', 'Impact', 'Wrack'] },
			optmagic1h:  { name: 'Optimal one-handed magic',  hand: 1, cbclass: 'magic',  bar: ['Wrack', 'Combust', 'Dragon Breath', 'Impact', 'Chain'] },
			optmagic1hs: { name: 'Optimal one-handed magic with shield',  hand: 4, cbclass: 'magic',  bar: ['Combust', 'Dragon Breath', 'Impact', 'Chain', 'Wrack', 'Bash'] },
			optrangeddw: { name: 'Optimal dual-wield ranged', hand: 3, cbclass: 'ranged', bar: ['Fragmentation Shot', 'Needle Strike', 'Snipe', 'Ricochet', 'Binding Shot', 'Piercing Shot'] },
			optranged2h: { name: 'Optimal two-handed ranged', hand: 2, cbclass: 'ranged', bar: ['Dazing Shot', 'Fragmentation Shot', 'Snipe', 'Ricochet', 'Binding Shot', 'Piercing Shot'] },
			optranged1h: { name: 'Optimal one-handed ranged', hand: 1, cbclass: 'ranged', bar: ['Snipe', 'Piercing Shot', 'Fragmentation Shot', 'Ricochet', 'Binding Shot'] },
			optranged1hs:{ name: 'Optimal one-handed ranged with shield', hand: 4, cbclass: 'ranged', bar: ['Fragmentation Shot', 'Snipe', 'Bash', 'Ricochet', 'Binding Shot', 'Piercing Shot'] },
			optrangedsb: { name: 'Optimal shieldbow', hand: 2, cbclass: 'ranged', bar: ['Dazing Shot', 'Fragmentation Shot', 'Snipe', 'Bash', 'Ricochet', 'Binding Shot', 'Piercing Shot'] },
			defmeleedw:  { name: 'Default dual-wield melee',  hand: 3, cbclass: 'melee',  bar: ['Decimate', 'Sever', 'Dismember', 'Havoc', 'Fury', 'Slice'] },
			defmelee2h:  { name: 'Default two-handed melee',  hand: 2, cbclass: 'melee',  bar: ['Sever', 'Cleave', 'Dismember', 'Smash', 'Fury', 'Slice'] },
			defmelee1h:  { name: 'Default one-handed melee',  hand: 1, cbclass: 'melee',  bar: ['Sever', 'Dismember', 'Fury', 'Backhand', 'Slice', 'Punish'] },
			defmagicdw:  { name: 'Default dual-wield magic',  hand: 3, cbclass: 'magic',  bar: ['Dragon Breath', 'Combust', 'Concentrated Blast', 'Impact', 'Wrack'] },
			defmagic2h:  { name: 'Default two-handed magic',  hand: 2, cbclass: 'magic',  bar: ['Dragon Breath', 'Combust', 'Sonic Wave', 'Impact', 'Wrack'] },
			defmagic1h:  { name: 'Default one-handed magic',  hand: 1, cbclass: 'magic',  bar: ['Dragon Breath', 'Combust', 'Impact', 'Wrack'] },
			defrangeddw: { name: 'Default dual-wield ranged', hand: 3, cbclass: 'ranged', bar: ['Snipe', 'Fragmentation Shot', 'Needle Strike', 'Binding Shot', 'Piercing Shot'] },
			defranged2h: { name: 'Default two-handed ranged', hand: 2, cbclass: 'ranged', bar: ['Snipe', 'Fragmentation Shot', 'Dazing Shot', 'Binding Shot', 'Piercing Shot'] },
			defranged1h: { name: 'Default one-handed ranged', hand: 1, cbclass: 'ranged', bar: ['Snipe', 'Fragmentation Shot', 'Binding Shot', 'Piercing Shot'] }
		};

		preloadbarsorder = ['sep', 'optmeleedw', 'optmelee2h', 'optmelee1h', 'optmelee1hs', 'sep', 'optmagicdw', 'optmagic2h', 'optmagic1h', 'optmagic1hs', 'sep', 'optrangeddw', 'optranged2h', 'optranged1h', 'optranged1hs', 'optrangedsb', 'sep', 'defmeleedw', 'defmelee2h', 'defmelee1h', 'sep', 'defmagicdw', 'defmagic2h', 'defmagic1h', 'sep', 'defrangeddw', 'defranged2h', 'defranged1h' ];

		//autoattack placeholder
		//makeAbility('auto','',3,3,1,0);
	}

	function parseURI() {
		var uri = new mw.Uri(window.location.href),
			settings = JSON.parse(JSON.stringify(defaultsettings)), //cheap clone
			h, t, c, cb, bar, b, i;
		/*  URL params
		ice = 0-1
		stuns = 0-1
		cbclass = melee,magic,ranged
		hand = 1,2,3
		ticks = int
		cycle = 0-1
		slayer = 0-1
		cycleticks = int
		anythinggoes = 0-1
		bar = comma-separated list
		*/

		//booleans
		//ice
		if ( !isNaN(parseInt(uri.query.ice, 10)) ) { //parseInt returns NaN if passed null or undefined, too
			settings.ice = parseInt(uri.query.ice, 10) > 0;
			mw.log('Recieved ice val from URI: ' + settings.ice);
		}

		//stuns
		if ( !isNaN(parseInt(uri.query.stuns, 10)) ) { //parseInt returns NaN if passed null or undefined, too
			settings.stuns = parseInt(uri.query.stuns, 10) > 0;
			mw.log('Recieved stuns val from URI: ' + settings.stuns);
		}

		//cycle
		if ( !isNaN(parseInt(uri.query.cycle, 10)) ) { //parseInt returns NaN if passed null or undefined, too
			settings.cycle = parseInt(uri.query.cycle, 10) > 0;
			mw.log('Recieved cycle val from URI: ' + settings.cycle);
		}

		//anythinggoes
		if ( !isNaN(parseInt(uri.query.anythinggoes, 10)) ) { //parseInt returns NaN if passed null or undefined, too
			settings.anythinggoes = parseInt(uri.query.anythinggoes, 10) > 0;
			mw.log('Recieved anythinggoes val from URI: ' + settings.anythinggoes);
		}

		//slayer
		if ( !isNaN(parseInt(uri.query.slayer, 10)) ) { //parseInt returns NaN if passed null or undefined, too
			settings.slayer = parseInt(uri.query.slayer, 10) > 0;
			mw.log('Recieved slayer val from URI: ' + settings.slayer);
		}


		//ints
		//hand
		h = parseInt(uri.query.hand, 10);
		if ( !isNaN(h) && h <= 4 && h > 0) { //parseInt returns NaN if passed null or undefined, too
			settings.hand = h;
			mw.log('Recieved hand val from URI: ' + settings.hand);
		}

		//ticks
		t = parseInt(uri.query.ticks, 10);
		if ( !isNaN(t) && t > 0) { //parseInt returns NaN if passed null or undefined, too
			settings.ticks = t;
			mw.log('Recieved ticks val from URI: ' + settings.ticks);
		}

		//cycleticks
		c = parseInt(uri.query.cycleticks, 10);
		if ( !isNaN(c) && c > 0) { //parseInt returns NaN if passed null or undefined, too
			settings.cycleticks = c;
			mw.log('Recieved cycleticks val from URI: ' + settings.cycleticks);
		}


		//strings
		//cbclass
		cb = uri.query.cbclass;
		if ( typeof cb === 'string' && (cb === 'melee' || cb === 'magic' || cb === 'ranged') ) {
			settings.cbclass = cb;
			mw.log('Recieved cbclass val from URI: ' + settings.cbclass);
		}

		//bar
		if ( typeof uri.query.bar === 'string' ) {
			bar = [];
			b = uri.query.bar.split(',');
			for (i = 0; i < b.length && i < 14; i++) {
				if ( abilities.hasOwnProperty(b[i]) ) {
					bar.push(b[i]);
				}
			}

			settings.bar = bar;
			mw.log('Recieved bar from URI: ' + settings.bar.toString());
		}

		return settings;
	}


	function regenPermalink(settings, bar) {
		var uri = 'http://runescape.wikia.com/wiki/' + window.wgPageName,
			modbar = [],
			i;
		uri += '?cbclass=' + settings.cbclass;
		uri += '&hand=' + settings.hand;
		uri += '&ice=' + (settings.ice ? 1 : 0);
		uri += '&stuns=' + (settings.stuns ? 1 : 0);
		uri += '&slayer=' + (settings.slayer ? 1 : 0);
		uri += '&ticks=' + settings.ticks;
		uri += '&cycle=' + (settings.cycle ? 1 : 0);
		uri += '&cycleticks=' + settings.cycleticks;
		uri += '&anythinggoes=' + (settings.anythinggoes ? 1 : 0);

		for (i = 0; i < bar.length; i++) {
			if (bar[i] !== ' ') {
				modbar.push(bar[i]);
			}
		}

		uri += '&bar=' + encodeURIComponent(modbar.toString());
		$('#' + ids.permalink + ' a').attr('href', uri);
		return uri;
	}

	//'main' function, sets up abilities and makes bar appear
	function displaybar() {
		setupAbilities();
		actionbar = new Actionbar(parseURI());
	}
	mw.log('ready, displaying bar');
	//when testing via userscript
	//importArticles({type:'style','articles':'MediaWiki:Common.css/revocalc.css'});
	displaybar();

	/* exposes the revobar function for testing (via console or other) */
	var addProperties = function(dst, src) {
		Object.keys(src).forEach(function(p) {
			Object.defineProperty(dst, p, {
				value: src[p]
			});
		});
	};

	window.Revolution = Object.create(null);
	window.testvar = 'test';
	addProperties(window.Revolution, {
		testvar: 'test',
		revobar: revobar
	});
	
})(this.$, this.mw);
//</pre>