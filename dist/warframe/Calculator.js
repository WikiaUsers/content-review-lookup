$(function () {
// what io_armor does here
function io_armor() {
	return $('<table>', {
		append: [
			mainInput('Base Armor', 'MAIN'),
			titleCell(''),
			outputCell('Total Armor', 'OUT_ARMOR'),
			outputCell('Damage Reduction', 'OUT_REDUCTION'),
			outputCell('Effective Health multiplier', 'OUT_HEALTH'),
			titleCell('Mods'),
			ioRow('Armored Agility', [[ 0, 5 ]]),
			ioRow('Carnis Carapace', [[ 0, 5 ]]),
			ioRow('Coaction Drift', [[ 0, 1, 'self', 'If equipped on self, supposes max rank' ], [ 0, 3, 'ally', 'Number of allies that have it equipped, supposes max rank', 1]], false, true),
			ioRow('Gladiator Aegis', [[ 0, 5 ]]),
			ioRow('Health Conversion', [[ 0, 5 ], [0, 3, 'stack', 'Active stacks']]),
			ioRow('Jugulus Carapace', [[ 0, 5 ]]),
			ioRow('Mecha Pulse', [[ 0, 3 ], [1, 99, 'num', 'Number of enemies in range', 1]]),
			ioRow('Saxum Carapace', [[ 0, 5 ]]),
			ioRow('Stand United', [[ 0, 5 ], [ 1, 4, 'num', 'Number of SUs', 1]]),
			ioRow('Steel Fiber', [[ 0, 10 ]]),
			ioRow('Umbral Fiber', [[ 5, 10 ],[ 1, 3, 'num', 'Set bonus', 1]]),
 
			titleCell('Abilities'),
			ioRow('Bastille', [[0, 1000, 'val', 'Bonus obtained from Bastille']]),
			ioRow('Defy', [[ 0, 3, 'rank', 'Ability rank'], [0, 9999, 'damage', 'Damage Absorbed', 500]]),
			ioRow('Elemental Ward', [[ 0, 3, 'rank', 'Ability rank']]),
			ioRow('Hallowed Reckoning', [[ 0, 3 ]]),
			ioRow('Ironclad Charge', [[ 0, 3 ], [ 0, 9999, 'stack', 'Enemies hit', 1 ]]),
			ioRow('Metronome', [[ 0, 3, 'rank', 'Ability rank']]),
			ioRow('Renewal', [[ 0, 3, 'rank', 'Ability rank']]),
			ioRow('Scarab Swarm', [[ 0, 3, 'rank', 'Ability rank']]),
			ioRow('Vex Armor', [[ 0, 3, 'rank', 'Ability rank']]),
			ioRow('Warcry', [[ 0, 3, 'rank', 'Ability rank']]),
 
			titleCell('Bonus Ability Strength'),
			ioRow('Defy Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Elemental Ward Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Hallowed Reckoning Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Ironclad Charge Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Metronome Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Renewal Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Vex Armor Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
			ioRow('Warcry Strength', [[ -9999, 9999, 'val', 'Bonus Ability Strength', 0, true ]]),
 
			titleCell('Other'),
			ioRow('Arcane Guardian', [[ 0, 5, 'rank', 'Arcane rank' ]]),
			ioRow('Arcane Tanker', [[ 0, 5, 'rank', 'Arcane rank' ]]),
			ioRow('Arcane Ultimatum', [[ 0, 5, 'rank', 'Arcane rank' ]]),
			ioRow('Atlas Passive', [[0, 1500, 'val', 'Bonus obtained from Rubble']]),
			ioRow('Grendel Passive', [[0, 9999, 'val', 'Enemies consumed via Feast', 1]]),
			ioRow('Justice (Syndicate Effect)', []),
			ioRow('Nidus Passive', [[0, 30, 'rank', 'Nidus rank']]),
			ioRow('Stone Skin (Focus)', [[ 1, 4, 'rank', 'Focus school rank' ]]),
		]
	});
}
 
// creates a row
function ioRow(name, input_array, nolink, noOutput) {
	var idname = name.replace(/\(| |\)/g, "").toLowerCase();
	var outColumn = '';
	if (!noOutput) {
  		outColumn = $('<td>', {
			class: 'calcresultingStatArmor',
			width: '8.3em',
			append: [
				$('<span>', {
					id: 'out_' + idname,
					value: 'NaN'
				})
			]
		});
	}
	return $('<tr>', {
  		append: [
			$('<td>', {
				append: [
					$('<input>', {
		  				type: 'checkbox',
						id: 'check_' + idname,
						on: {
							input: update_table
						}
					}),
					rowName (name, nolink)
				]
			}),
			$('<td>', {
				width: '8.3em',
				align: 'left',
	  			append: [
					input_cell_generator(idname, input_array),
				]
			}),
			outColumn,
		]
	});
}
 
// adds name plus a link to the proper page if remover is empty
function rowName (cont, remover) {
	var link = cont.replace(/ \(Syndicate Effect| \(Focus|\)| Strength/g, "");
	link = link.replace(/ Passive/g, "/Abilities");
	var spanclass = '';
	if (remover) {
  		return $('<span>', {
			text: cont
		});
	} else {
		switch (cont) {
			case 'Arcane Guardian':
			case 'Arcane Tanker':
			case 'Arcane Ultimatum':
				spanclass = 'arcane-tooltip'
				break;
 
			case 'Bastille':
			case 'Defy':
			case 'Elemental Ward':
			case 'Metronome':
			case 'Renewal':
			case 'Scarab Swarm':
			case 'Vex Armor':
			case 'Warcry':
			case 'Defy Strength':
			case 'Elemental Ward Strength':
			case 'Metronome Strength':
			case 'Renewal Strength':
			case 'Vex Armor Strength':
			case 'Warcry Strength':
				spanclass = 'ability-tooltip'
				break;
 
			case 'Justice (Syndicate Effect)':
			case 'Stone Skin (Focus)':
			case 'Atlas Passive':
			case 'Grendel Passive':
			case 'Nidus Passive':
				spanclass = 'none'
				break;
 
			default:
				spanclass = 'mod-tooltip';
		}
		return '<span class="' + spanclass + '" data-param="' + link + '" style="white-space:pre"><a href="/wiki/' + link + '">' + cont + '</a></span>';
	}
}
 
// input cells cluster generator, 
function input_cell_generator(name, meta_array) {
	var size = meta_array.length;
	var cell = [];
	for (var j = 0; j < size; j++) {
		cell[j] = input_cell(name, meta_array[j][0], meta_array[j][1], meta_array[j][2], meta_array[j][3], meta_array[j][4], meta_array[j][5], size);	
	}
	return $('<div>').append(cell);
}
 
// Generates a single input cell 
function input_cell(name, minVal, maxVal, stat, tooltip, baseVal, override, size) {
	var classtype = '';
	if (size > 1) {
		classtype = 'calcinputField2';
	} else {
		classtype = 'calcinputField1';
	}
  return $('<input>', {
		type: 'number',
		class: classtype,
		id: "in_" + name + stat_check(stat),
		min: minVal,
		max: maxVal,
		value: valInitializer(baseVal, maxVal, override),
		title: tooltip_check(tooltip, stat),
		on: {
			input: update_table,
		}
	});
}
 
// Gives a starting value if base is given, otherwise it just return max
function valInitializer(base, max, override) {
	if (override) {
		return base;
	} else if (base) {
		return base;
	} else {
		return max;
	}
}
 
//gives "_rank" to a string if no value is given
function stat_check(val) {
	if (val) {
		return '_' + val;
	} else {
		return '_rank';
	}
}
 
//gives a sentence for tooltip accoding to id
function tooltip_check(phrase, id) {
	if (phrase) {
		return phrase;
	} else {
		return 'Mod rank';
	}
}
 
// puts a title
function titleCell(title) {
	return $('<tr>', {
  		append: [
			$('<td>', {
				class: 'calcresultTitle',
   			text: title,
			}),
		]
	});
}
 
// Generates the main input cell, Used only for Base Armor
function mainInput(label, id) {
	return $('<tr>', {
		append: [
			$('<td>', {
				text: label + ':',
			}),
			$('<td>', {
				append: $('<input>', {
					width: '8.3em',
					min: 0,
					max: 9999,
					id: 'in_' + id,
					type: 'number',
					value: 100,
					on: {
						input: update_table
					}
				})
			})
		]
	});
}
 
// generate output rows
function outputCell(name, nameID) {
	return $('<tr>', {
		append: [
			$('<td>', {
				class: 'calctextWidth',
				text: name,
			}),
			$('<td>', {
				append: [
					$('<div>', {
						id: nameID,
						class: 'calcresultingStatArmor',
						value: 'NaN'
					})
				]
			})
		]
	});
}
 
// with every updade, gives a value to every stat
function update_table() {
	var Armor = reasonableInput('#in_MAIN');
 
	var modMap = {
		armoredagility: [7.5 * ( 1 + reasonableInput('#in_armoredagility_rank', 5) ), 'rank'],
		carniscarapace: [10 * ( 1 + reasonableInput('#in_carniscarapace_rank', 5) ), 'rank'],
		coactiondrift: [0, 'self', 'ally'],
		healthconversion: [75 * ( 1 + reasonableInput('#in_healthconversion_rank', 5)) * reasonableInput('#in_healthconversion_stack', 3), 'rank', 'stack'],
		juguluscarapace: [10 * ( 1 + reasonableInput('#in_juguluscarapace_rank', 5) ), 'rank'],
		mechapulse: [15 * ( 1 + reasonableInput('#in_mechapulse_rank', 3) ) * ( 0 + reasonableInput('#in_mechapulse_num', 99) ), 'rank', 'num'],
		saxumcarapace: [10 * ( 1 + reasonableInput('#in_saxumcarapace_rank', 5) ), 'rank'],
		standunited: [ (4.25 * (reasonableInput('#in_standunited_rank', 5) + 1) * (reasonableInput('#in_standunited_num', 4) + (0.15 * (verifyCoactionDrift('self') + verifyCoactionDrift('ally')))) ) * (1 + (0.15 * verifyCoactionDrift('self'))), 'rank', 'num' ],
		steelfiber: [10 * (1 + parseInt($('#in_steelfiber_rank').val())), 'rank' ],
		gladiatoraegis: [7.5 * (1 + parseInt($('#in_gladiatoraegis_rank').val())), 'rank' ],
		umbralfiber: [10 * (reasonableInput('#in_umbralfiber_rank', 10) + 1) * (1 + 0.25 * setMultiplier(reasonableInput('#in_umbralfiber_num', 3, 1))), 'rank', 'num'],
	};
 
	var abilityMap = {
		bastille: [reasonableInput('#in_bastille_val', 1000), 'val'],
		defy: [(abilityBonus("defy", reasonableInput('#in_defy_rank', 3)) * reasonableInput('#in_defy_damage', 9999)), 'rank', 'damage'],
		elementalward: [abilityBonus("elementalward", reasonableInput('#in_elementalward_rank', 3)), 'rank'],
		hallowedreckoning: [abilityBonus("hallowedreckoning", reasonableInput('#in_hallowedreckoning_rank', 3)), 'rank'],
		ironcladcharge: [(abilityBonus("ironcladcharge", reasonableInput('#in_ironcladcharge_rank', 3))) * reasonableInput('#in_ironcladcharge_stack', 9999), 'rank', 'stack'],
		metronome: [abilityBonus("metronome", reasonableInput('#in_metronome_rank', 3)), 'rank'],
		renewal: [abilityBonus("renewal", reasonableInput('#in_renewal_rank', 3)), 'rank'],
		scarabswarm: [abilityBonus("scarabswarm", reasonableInput('#in_scarabswarm_rank', 3)), 'rank'],
		vexarmor: [abilityBonus("vexarmor", reasonableInput('#in_vexarmor_rank', 3)), 'rank'],
		warcry: [abilityBonus("warcry", reasonableInput('#in_warcry_rank', 3)), 'rank'],
	};
 
	var strengthMap = {
		defystrength: [reasonableInput('#in_defystrength_val', 9999, -9999), 'val'],
		elementalwardstrength: [reasonableInput('#in_elementalwardstrength_val', 9999, -9999), 'val'],
		hallowedreckoningstrength: [reasonableInput('#in_hallowedreckoningstrength_val', 9999, -9999), 'val'],
		ironcladchargestrength: [reasonableInput('#in_ironcladchargestrength_val', 9999, -9999), 'val'],
		metronomestrength: [reasonableInput('#in_metronomestrength_val', 9999, -9999), 'val'],
		renewalstrength: [reasonableInput('#in_renewalstrength_val', 9999, -9999), 'val'],
		vexarmorstrength: [reasonableInput('#in_vexarmorstrength_val', 9999, -9999), 'val'],
		warcrystrength: [reasonableInput('#in_warcrystrength_val', 9999, -9999), 'val'],
	};
 
	var nidusrank = reasonableInput('#in_niduspassive_rank', 30);
	if (nidusrank >= 26) {
		nidusrank = 5;
	} else if (nidusrank >= 20) {
		nidusrank = 4;
	} else if (nidusrank >= 14) {
		nidusrank = 3;
	} else if (nidusrank >= 8) {
		nidusrank = 2;
	} else if (nidusrank >= 2) {
		nidusrank = 1;
	} else {
		nidusrank = 0;
	}
 
	var otherMap = {
		arcaneguardian: [150 * (1 + reasonableInput('#in_arcaneguardian_rank', 5)), 'rank'],
		arcanetanker: [200 * (1 + reasonableInput('#in_arcanetanker_rank', 5)), 'rank'],
		arcaneultimatum: [200 * (1 + reasonableInput('#in_arcaneultimatum_rank', 5)), 'rank'],
		justicesyndicateeffect: [15],
		stoneskinfocus: [irregularFormula('#in_stoneskinfocus_rank', [20, 30, 40, 60]) , 'rank'],
		atlaspassive:[reasonableInput('#in_atlaspassive_val', 1500), 'val'],
		grendelpassive:[50 * reasonableInput('#in_grendelpassive_val', 9999), 'val'],
		niduspassive: [10 * nidusrank, 'rank'],
	};
 
	function abilityBonus(ability, rank) {
		switch (ability) {
		case "defy":
			if (rank == 3) {
				return 1.5;
			} else if (rank == 2) {
				return 1.2;
			} else if (rank == 1) {
				return 1.0;
			} else {
				return 0.8;
			}
			break;
 
  		case "elementalward":
			if (rank == 3) {
				return 150;
			} else if (rank == 2) {
				return 100;
			} else if (rank == 1) {
				return 75;
			} else {
				return 25;
			}
			break;
 
		case "hallowedreckoning":
			if (rank == 3) {
		  		return 250;
			} else {
		  		return 150 + 30 * rank;
			}
			break;
 
		case "ironcladcharge":
			return Math.floor(12.5 * (1 + rank));
			break;
 
		case "metronome":
			if (rank == 3) {
		  		return 35;
			} else {
		  		return 10 + 5 * rank;
			}
			break;
 
		case "renewal":
			return 125 + 25 * rank;
			break;
 
		case "scarabswarm":
			return 25 * (1 + rank);
			break;
 
		case "vexarmor":
			return (200 + 50 * rank);
			break;
 
		case "warcry":
			if (rank == 3) {
				return 50;
			} else {
				return 25 + 10 * rank;
			}
			break;
		}
	}
 
	// for formulas that require a definition for cases
	function irregularFormula(string, array) {
		var value = parseInt($(string).val());
		return array[value-1];
	}
 
 
	// limits the input to a [min, max] range
	function reasonableInput(num, max, min) {
		var value = parseInt($(num).val());
		if (min && value < min) {
			return min;
		} else if (!min && value < 0) {
			return 0;
		} else if (value > max) {
			return max;
		} else {
			return value;
		}
	}
 
	// because Umbral Fiber's set bonus is wacky
	function setMultiplier(num) {
		if (num == 1) {
			return 0;
		} else if (num == 2) {
			return 1;
		} else {
			return 3;
		}
	}
 
	// check Coaction Drift's type and decides its reasonableInput
	function verifyCoactionDrift(type) {
		if ($('#check_coactiondrift').prop('checked')){
			var name = '#in_coactiondrift_' + type;
			if (type == 'self') {
				return reasonableInput(name, 1);
			} else if (type == 'ally') {
				return reasonableInput(name, 3);
			}
		} else {
			return 0;
		}
	}
 
	// checkboxes interaction
	checker(modMap);
	checker(strengthMap);
	checker(abilityMap);
	checker(otherMap);
 
 
	// See the input (maps), uses the key as part of the IDs and updates the state of those according to their checkbox, assigning to the corresponding key the value of 0 or itself
	function checker(varmap) {
		for (key in varmap) {
  			var formula = varmap[key][0];
			if ($('#check_' + key).prop('checked')) {
				for (j = 1; j < varmap[key].length; j++) {
					$('#in_' + key + '_' + varmap[key][j]).prop('disabled', false); //here the single cell changes according to input
				}
				$('#out_' + key).css('color', 'black');
				varmap[key][0] = formula;
			} else {
				for (j = 1; j < varmap[key].length; j++) {
					$('#in_' + key + '_' + varmap[key][j]).prop('disabled', true);
				}
				$('#out_' + key).css('color', '#dadada');
				varmap[key][0] = 0;
			}
		}
	}
 
 
	// loaders, 1st part
	if ($('#calculator_armor').length) {
 
		var defy_add = (1 + strengthMap.defystrength[0]/100)*abilityMap.defy[0];
		if (defy_add > 1500) defy_add = 1500;
		var beforeAdditions = otherMap.stoneskinfocus[0]
		var multipliers = 1 + (modMap.armoredagility[0] + modMap.carniscarapace[0] + modMap.juguluscarapace[0] + modMap.saxumcarapace[0] + modMap.mechapulse[0] + modMap.standunited[0] + modMap.steelfiber[0] + modMap.gladiatoraegis[0] + modMap.umbralfiber[0] + abilityMap.scarabswarm[0] + (1 + strengthMap.elementalwardstrength[0]/100)*abilityMap.elementalward[0] + (1 + strengthMap.metronomestrength[0]/100)*abilityMap.metronome[0] + (1 + strengthMap.vexarmorstrength[0]/100)*abilityMap.vexarmor[0] + (1 + strengthMap.warcrystrength[0]/100)*abilityMap.warcry[0] + otherMap.niduspassive[0])/100;
		var afterAdditions = modMap.healthconversion[0] + abilityMap.bastille[0] + defy_add + (1 + strengthMap.hallowedreckoningstrength[0]/100)*abilityMap.hallowedreckoning[0] + (1 + strengthMap.renewalstrength[0]/100)*abilityMap.renewal[0] + otherMap.arcaneguardian[0] + otherMap.arcanetanker[0] + otherMap.arcaneultimatum[0] + otherMap.justicesyndicateeffect[0] + otherMap.atlaspassive[0] + otherMap.grendelpassive[0];
		var metamultipliers = 1 + ((1 + strengthMap.ironcladchargestrength[0]/100)*abilityMap.ironcladcharge[0])/100;
		var total_armor = ((Armor + beforeAdditions) * multipliers + afterAdditions) * metamultipliers;
 
		formula_loader([
			['#out_armoredagility', (modMap.armoredagility[0]).toFixed(2) + "%"],
			['#out_carniscarapace', (modMap.carniscarapace[0]).toFixed(2) + "%"],
			['#out_gladiatoraegis', (modMap.gladiatoraegis[0]).toFixed(2) + "%"],
			['#out_healthconversion', "+" + (modMap.healthconversion[0]).toFixed(2)],
			['#out_juguluscarapace', (modMap.juguluscarapace[0]).toFixed(2) + "%"],
			['#out_mechapulse', (modMap.mechapulse[0]).toFixed(2) + "%"],
			['#out_saxumcarapace', (modMap.saxumcarapace[0]).toFixed(2) + "%"],
			['#out_standunited', (modMap.standunited[0]).toFixed(2) + "%"],
			['#out_steelfiber', (modMap.steelfiber[0]).toFixed(2) + "%"],
			['#out_umbralfiber', (modMap.umbralfiber[0]).toFixed(2) + "%"],
 
			['#out_bastille', "+" + (abilityMap.bastille[0]).toFixed(2)],
			['#out_defy', "+" + (defy_add).toFixed(2)],
			['#out_elementalward', (abilityMap.elementalward[0]).toFixed(2) + "%"],
			['#out_hallowedreckoning', "+" + (abilityMap.hallowedreckoning[0]).toFixed(2)],
			['#out_ironcladcharge', (abilityMap.ironcladcharge[0]).toFixed(2) + "%"],
			['#out_metronome', (abilityMap.metronome[0]).toFixed(2) + "%"],
			['#out_renewal', "+" + (abilityMap.renewal[0]).toFixed(2)],
			['#out_scarabswarm', "+" + (abilityMap.scarabswarm[0]).toFixed(2) + "%"],
			['#out_vexarmor', (abilityMap.vexarmor[0]).toFixed(2) + "%"],
			['#out_warcry', (abilityMap.warcry[0]).toFixed(2) + "%"],
 
			['#out_defystrength', (strengthMap.defystrength[0]).toFixed(2) + "%"],
			['#out_elementalwardstrength', (strengthMap.elementalwardstrength[0]).toFixed(2) + "%"],
			['#out_hallowedreckoningstrength', (strengthMap.hallowedreckoningstrength[0]).toFixed(2) + '%'],
			['#out_ironcladchargestrength', (strengthMap.ironcladchargestrength[0]).toFixed(2) + "%"],
			['#out_metronomestrength', (strengthMap.metronomestrength[0]).toFixed(2) + "%"],
			['#out_renewalstrength', (strengthMap.renewalstrength[0]).toFixed(2) + '%'],
			['#out_vexarmorstrength', (strengthMap.vexarmorstrength[0]).toFixed(2) + "%"],
			['#out_warcrystrength', (strengthMap.warcrystrength[0]).toFixed(2) + "%"],
 
			['#out_arcaneguardian', "+" + (otherMap.arcaneguardian[0]).toFixed(2)],
			['#out_arcanetanker', "+" + (otherMap.arcanetanker[0]).toFixed(2)],
			['#out_arcaneultimatum', "+" + (otherMap.arcaneultimatum[0]).toFixed(2)],
			['#out_justicesyndicateeffect', (otherMap.justicesyndicateeffect[0]).toFixed(2) + "%"],
			['#out_stoneskinfocus', '+' + (otherMap.stoneskinfocus[0]).toFixed(2)],
			['#out_atlaspassive', "+" + (otherMap.atlaspassive[0]).toFixed(2)],
			['#out_grendelpassive', "+" + (otherMap.grendelpassive[0]).toFixed(2)],
			['#out_niduspassive', (otherMap.niduspassive[0]).toFixed(2) + "%"],
 
			['#OUT_ARMOR', ( total_armor ).toFixed(0)],
			['#OUT_REDUCTION',   (100 * total_armor/(300 + total_armor)).toFixed(2) + "%" ],
			['#OUT_HEALTH',  ((300 + total_armor)/300).toFixed(2) + 'x' ]
		]);
	}
}
 
// prepares formulas
function formula_loader(meta_array) {
	var j;
	for (j = 0; j < meta_array.length; j++) {
		$(meta_array[j][0]).text(meta_array[j][1]);
	}
}
 
//  loaders, 2nd part
table_loader("#calculator_armor", io_armor);
 
// if the proper ID is called, it uses a function
function table_loader(idCall, func) {
	if ($(idCall).length) {
		$(idCall).html(func);
	}
	update_table();
}
 
});