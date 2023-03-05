mw.loader.using( ['jquery.ui.slider'], function() {

/*!
 * Dead Frontier stat calculator script
 * Original script on http://www.yarrsoftware.com/df-tools/
 */

var str_min = 25;
var end_min = 25;
var agi_min = 25;
var acc_min = 25;
var crit_min = 25;
var rel_min = 25;
var mel_min = 5;
var pis_min = 5;
var rif_min = 0;
var sg_min = 0;
var mg_min = 0;
var expl_min = 0;
var maximums = 100;
var wpn_mc_min = 0;
var wpn_mc_max = 8;
var arm_mc_min = 0;
var arm_mc_max = 24;

function minusBtn(field, slider) {
var new_value = parseInt(jQuery('#' + field).val(),10) - 1;
var field_min = 0;
switch(field) {
	case 'strength':
		field_min = str_min;
		break;
	case 'endurance':
		field_min = end_min;
		break;
	case 'agility':
		field_min = agi_min;
		break;
	case 'accuracy':
		field_min = acc_min;
		break;
	case 'critical_hit':
		field_min = crit_min;
		break;
	case 'reloading':
		field_min = rel_min;
		break;
	case 'melee':
		field_min = mel_min;
		break;
	case 'pistols':
		field_min = pis_min;
		break;
	default:
		field_min = 0;
		break;
}
if(new_value >= field_min) {
	jQuery('#' + field).val(new_value);
	jQuery('#' + slider).slider('value', new_value);
	value_changed(field);
}
}

function plusBtn(field, slider) {
var new_value = parseInt(jQuery('#' + field).val(),10) + 1;
var field_max = 100;
switch(field) {
	case 'wpn1Acc':
		field_max = wpn_mc_max;
		break;
	case 'wpn1Rel':
		field_max = wpn_mc_max;
		break;
	case 'wpn1Crit':
		field_max = wpn_mc_max;
		break;
	case 'wpn2Acc':
		field_max = wpn_mc_max;
		break;
	case 'wpn2Rel':
		field_max = wpn_mc_max;
		break;
	case 'wpn2Crit':
		field_max = wpn_mc_max;
		break;
	case 'wpn3Acc':
		field_max = wpn_mc_max;
		break;
	case 'wpn3Rel':
		field_max = wpn_mc_max;
		break;
	case 'wpn3Crit':
		field_max = wpn_mc_max;
		break;
	case 'armAgi':
		field_max = arm_mc_max;
		break;
	case 'armEnd':
		field_max = arm_mc_max;
		break;
	default:
		field_max = 100;
		break;
}
if(new_value <= field_max) {
	jQuery('#' + field).val(new_value);
	jQuery('#' + slider).slider('value', new_value);
	value_changed(field);
}
}

function value_changed(field) {
	field = '#' + field;
	var field_value = parseInt(jQuery(field).val(),10);
	var stat_level = get_stat_level();
	var weapon_level = get_weapon_level();
	if (field_value > 0 && (get_field_category(field) == 'stats' || get_field_category(field) == 'weapons')) {
		if (get_field_category(field) == 'stats') {
			if (field_value == 5 && stat_level <= 215) {
				jQuery(field).val(field_value);
			} else if (field_value == 1 && stat_level <= 219) {
				jQuery(field).val(field_value);
			}
		} else if (get_field_category(field) == 'weapons') {
			if (field_value == 5 && weapon_level <= 217) {
				jQuery(field).val(field_value);
			} else if (field_value == 1 && weapon_level <= 219) {
				jQuery(field).val(field_value);
			}
		}
	} else {
		jQuery(field).val(field_value);
	}
	current_level(field);
	if (jQuery('#target_level').val().length != 0 && jQuery('#target_level').val() != null) {
		stat_avail();
		weapon_avail();
	}
	update_totals();
}

function update_totals() {
	var str = parseInt(jQuery('#strength').val(),10);
	var end = parseInt(jQuery('#endurance').val(),10);
	var agi = parseInt(jQuery('#agility').val(),10);
	var acc = parseInt(jQuery('#accuracy').val(),10);
	var crit = parseInt(jQuery('#critical_hit').val(),10);
	var rel = parseInt(jQuery('#reloading').val(),10);
	var mc_acc = parseInt(jQuery('#wpn1Acc').val(),10) + parseInt(jQuery('#wpn2Acc').val(),10) + parseInt(jQuery('#wpn3Acc').val(),10);
	var mc_rel = parseInt(jQuery('#wpn1Rel').val(),10) + parseInt(jQuery('#wpn2Rel').val(),10) + parseInt(jQuery('#wpn3Rel').val(),10);
	var mc_crit = parseInt(jQuery('#wpn1Crit').val(),10) + parseInt(jQuery('#wpn2Crit').val(),10) + parseInt(jQuery('#wpn3Crit').val(),10);
	var mc_agi = parseInt(jQuery('#armAgi').val(),10);
	var mc_end = parseInt(jQuery('#armEnd').val(),10);
	jQuery('#total_str').val(str);
	jQuery('#total_end').val(end + mc_end);
	jQuery('#total_agi').val(agi + mc_agi);
	jQuery('#total_acc').val(acc + mc_acc);
	jQuery('#total_crit').val(crit + mc_crit);
	jQuery('#total_rel').val(rel + mc_rel);
}

function get_stats_used() {
	return (parseInt(jQuery('#strength').val(),10) + parseInt(jQuery('#endurance').val(),10) + parseInt(jQuery('#accuracy').val(),10) + parseInt(jQuery('#agility').val(),10) + parseInt(jQuery('#critical_hit').val(),10) + parseInt(jQuery('#reloading').val(),10)) - (str_min + end_min + acc_min + agi_min + crit_min + rel_min);
}

function get_weapons_used() {
	return (parseInt(jQuery('#melee').val(),10) + parseInt(jQuery('#pistols').val(),10) + parseInt(jQuery('#rifles').val(),10) + parseInt(jQuery('#shotguns').val(),10) + parseInt(jQuery('#machine_guns').val(),10) + parseInt(jQuery('#explosives').val(),10)) - (mel_min + pis_min + rif_min + sg_min + mg_min + expl_min);
}

function get_stat_level() {
	var stat_level;
	if (get_stats_used() > 245) {
		stat_level = 50 + (get_stats_used() - 245);
	} else {
		stat_level = (get_stats_used()/5) + 1;
	}
	return stat_level;
}

function get_weapon_level() {
	var weapon_level;
	if (get_weapons_used() > 245) {
		weapon_level = 50 + parseInt(((get_weapons_used() - 245)/2),10);
	} else {
		weapon_level = (get_weapons_used()/5) + 1;
	}
	return weapon_level;
}

function current_level(field) {
	var stats_used = get_stats_used();
	var weapons_used = get_weapons_used();
	var level;
	var stat_level = get_stat_level();
	var weapon_level = get_weapon_level();
	if (stats_used <= 415 && weapons_used <= 585) {
		if (stat_level >= weapon_level) {
			if (stats_used <= 245) {
				level = (parseInt((stats_used/5),10) + 1);
			} else {
				level = (stats_used - 245) + 50;
			}
		} else {
			if (weapons_used <= 245) {
				level = (parseInt(weapons_used/5)) + 1;
			} else {
				level = parseInt(((weapons_used - 245)/2)) + 50;
			}
		}
		jQuery('#current_level').val(level);
	}
}

function get_stats_spent() {
	var points_spent = parseInt(jQuery('#strength').val()) + parseInt(jQuery('#endurance').val()) + parseInt(jQuery('#accuracy').val()) + parseInt(jQuery('#agility').val()) + parseInt(jQuery('#critical_hit').val()) + parseInt(jQuery('#reloading').val());
	return points_spent;
}

function stat_avail() {
	var target = parseInt(get_target_level());
	var spent = parseInt(get_stats_spent());
	if (target <= 0) {
		jQuery('#target_level').val('0');
		jQuery('#stats_avail').val('0');
	} else if (target > 220) {
		jQuery('#target_level').val('220');
		jQuery('#stats_avail').val('415');		
	} else {
		if (target <= 50) {
			jQuery('#stats_avail').val(((5*(target-1)) + (str_min + end_min + acc_min + agi_min + crit_min + rel_min)) - spent);
		} else {
			jQuery('#stats_avail').val(((target-50) + 245 + (str_min + end_min + acc_min + agi_min + crit_min + rel_min)) - spent);
		}
	}
}

function get_weapons_spent() {
	var points_spent = parseInt(jQuery('#melee').val()) + parseInt(jQuery('#pistols').val()) + parseInt(jQuery('#rifles').val()) + parseInt(jQuery('#shotguns').val()) + parseInt(jQuery('#machine_guns').val()) + parseInt(jQuery('#explosives').val());
	return points_spent;
}

function get_target_level() {
	var target_level = parseInt(jQuery('#target_level').val());
	return target_level;
}

function weapon_avail() {
	var target = parseInt(get_target_level());
	var spent = parseInt(get_weapons_spent());
	if (target <= 0) {
		jQuery('#target_level').val('0');
		jQuery('#weapons_avail').val('0');
	} else if (target > 220) {
		jQuery('#target_level').val('220');
		jQuery('#weapons_avail').val('585');
	} else {
		if (target <= 50) {
			jQuery('#weapons_avail').val(((5*(target-1)) + (mel_min + pis_min + rif_min + sg_min + mg_min + expl_min)) - spent);
		} else {
			jQuery('#weapons_avail').val((((target-50)*2) + 245 + (mel_min + pis_min + rif_min + sg_min + mg_min + expl_min)) - spent);
		}
	}
}

function change_prof() {
	reset_mins();
	reset_level();
	change_mins();
}

$('#prof_select').change(function() {
	str_min = 25;
	end_min = 25;
	agi_min = 25;
	acc_min = 25;
	crit_min = 25;
	rel_min = 25;
	mel_min = 5;
	pis_min = 5;
	rif_min = 0;
	sg_min = 0;
	mg_min = 0;
	expl_min = 0;
	jQuery('#strength').val(str_min);
	jQuery('#endurance').val(end_min);
	jQuery('#accuracy').val(acc_min);
	jQuery('#agility').val(agi_min);
	jQuery('#critical_hit').val(crit_min);
	jQuery('#reloading').val(rel_min);
	jQuery('#melee').val(mel_min);
	jQuery('#pistols').val(pis_min);
	jQuery('#rifles').val(rif_min);
	jQuery('#shotguns').val(sg_min);
	jQuery('#machine_guns').val(mg_min);
	jQuery('#explosives').val(expl_min);
	jQuery('#target_level').val('0');
	jQuery('#current_level').val('1');
	jQuery('#stats_avail').val('0');
	jQuery('#weapons_avail').val('0');
	var prof = jQuery('#prof_select').val();
	if (prof == 'Boxer' || prof == 'Soldier' || prof == 'Police' || prof == 'Fireman' || prof == 'Athlete' || prof == 'Student') {
		switch(prof) {
			case 'Boxer':
				str_min += 20;
				jQuery('#strMin').html(str_min);
				jQuery('#strSlider').slider( "option", "min", str_min );
				jQuery('#strength').val(str_min);
				mel_min += 10;
				jQuery('#melMin').html(mel_min);
				jQuery('#melSlider').slider( "option", "min", mel_min );
				jQuery('#melee').val(mel_min);
				break;
			case 'Soldier':
				str_min += 5;
				jQuery('#strMin').html(str_min);
				jQuery('#strSlider').slider( "option", "min", str_min );
				jQuery('#strength').val(str_min);
				acc_min += 10;
				jQuery('#accMin').html(acc_min);
				jQuery('#accSlider').slider( "option", "min", acc_min );
				jQuery('#accuracy').val(acc_min);
				end_min += 10;
				jQuery('#endMin').html(end_min);
				jQuery('#endSlider').slider( "option", "min", end_min );
				jQuery('#endurance').val(end_min);
				rel_min += 10;
				jQuery('#relMin').html(rel_min);
				jQuery('#relSlider').slider( "option", "min", rel_min );
				jQuery('#reloading').val(rel_min);
				mg_min += 10;
				jQuery('#mgMin').html(mg_min);
				jQuery('#mgSlider').slider( "option", "min", mg_min );
				jQuery('#machine_guns').val(mg_min);
				break;
			case 'Police':
				acc_min += 10;
				jQuery('#accMin').html(acc_min);
				jQuery('#accSlider').slider( "option", "min", acc_min );
				jQuery('#accuracy').val(acc_min);
				rel_min += 5;
				jQuery('#relMin').html(rel_min);
				jQuery('#relSlider').slider( "option", "min", rel_min );
				jQuery('#reloading').val(rel_min);
				pis_min += 10;
				jQuery('#pisMin').html(pis_min);
				jQuery('#pisSlider').slider( "option", "min", pis_min );
				jQuery('#pistols').val(pis_min);
				sg_min += 10;
				jQuery('#sgMin').html(sg_min);
				jQuery('#sgSlider').slider( "option", "min", sg_min );
				jQuery('#shotguns').val(sg_min);
				break;
			case 'Fireman':
				end_min += 20;
				jQuery('#endMin').html(end_min);
				jQuery('#endSlider').slider( "option", "min", end_min );
				jQuery('#endurance').val(end_min);
				mel_min += 10;
				jQuery('#melMin').html(mel_min);
				jQuery('#melSlider').slider( "option", "min", mel_min );
				jQuery('#melee').val(mel_min);
				break;
			case 'Athlete':
				agi_min += 25;
				jQuery('#agiMin').html(agi_min);
				jQuery('#agiSlider').slider( "option", "min", agi_min );
				jQuery('#agility').val(agi_min);
				break;
			case 'Student':
				str_min += 1;
				jQuery('#strMin').html(str_min);
				jQuery('#strSlider').slider( "option", "min", str_min );
				jQuery('#strength').val(str_min);
				agi_min += 2;
				jQuery('#agiMin').html(agi_min);
				jQuery('#agiSlider').slider( "option", "min", agi_min );
				jQuery('#agility').val(agi_min);
				end_min += 2;
				jQuery('#endMin').html(end_min);
				jQuery('#endSlider').slider( "option", "min", end_min );
				jQuery('#endurance').val(end_min);
				break;
			default:
				break;
		}
	}
});

function get_field_category(field) {
	var category;
	switch(field) {
		case '#strength':
			category = 'stats';
			break;
		case '#endurance':
			category = 'stats';
			break;
		case '#agility':
			category = 'stats';
			break;
		case '#accuracy':
			category = 'stats';
			break;
		case '#critical_hit':
			category = 'stats';
			break;
		case '#reloading':
			category = 'stats';
			break;
		case '#melee':
			category = 'weapons';
			break;
		case '#pistols':
			category = 'weapons';
			break;
		case '#rifles':
			category = 'weapons';
			break;
		case '#shotguns':
			category = 'weapons';
			break;
		case '#machine_guns':
			category = 'weapons';
			break;
		case '#explosives':
			category = 'weapons';
			break;
	}
	return category;
}

jQuery(document).ready(function(jQuery) {
	/* attribute sliders */
	jQuery("#strSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#strength").val(ui.value);value_changed('strength'); } });
	jQuery("#endSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#endurance").val(ui.value);value_changed('endurance'); } });
	jQuery("#agiSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#agility").val(ui.value);value_changed('agility'); } });
	jQuery("#accSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#accuracy").val(ui.value);value_changed('accuracy'); } });
	jQuery("#critSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#critical_hit").val(ui.value);value_changed('critical_hit'); } });
	jQuery("#relSlider").slider({ min: 25, max: 100, slide: function(event, ui) { jQuery("#reloading").val(ui.value);value_changed('reloading'); } });
	/* proficiency sliders */
	jQuery("#melSlider").slider({ min: 5, max: 120, slide: function(event, ui) { jQuery("#melee").val(ui.value);value_changed('melee'); } });
	jQuery("#pisSlider").slider({ min: 5, max: 120, slide: function(event, ui) { jQuery("#pistols").val(ui.value);value_changed('pistols'); } });
	jQuery("#rifSlider").slider({ min: 0, max: 120, slide: function(event, ui) { jQuery("#rifles").val(ui.value);value_changed('rifles'); } });
	jQuery("#sgSlider").slider({ min: 0, max: 120, slide: function(event, ui) { jQuery("#shotguns").val(ui.value);value_changed('shotguns'); } });
	jQuery("#mgSlider").slider({ min: 0, max: 120, slide: function(event, ui) { jQuery("#machine_guns").val(ui.value);value_changed('machine_guns'); } });
	jQuery("#explSlider").slider({ min: 0, max: 120, slide: function(event, ui) { jQuery("#explosives").val(ui.value);value_changed('explosives'); } });
	/* weapon1 sliders */
	jQuery("#wpn1AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn1Acc").val(ui.value);update_totals(); } });
	jQuery("#wpn1RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn1Rel").val(ui.value);update_totals(); } });
	jQuery("#wpn1CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn1Crit").val(ui.value);update_totals(); } });
	/* weapon2 sliders */
	jQuery("#wpn2AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn2Acc").val(ui.value);update_totals(); } });
	jQuery("#wpn2RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn2Rel").val(ui.value);update_totals(); } });
	jQuery("#wpn2CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn2Crit").val(ui.value);update_totals(); } });
	/* weapon3 sliders */
	jQuery("#wpn3AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn3Acc").val(ui.value);update_totals(); } });
	jQuery("#wpn3RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn3Rel").val(ui.value);update_totals(); } });
	jQuery("#wpn3CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { jQuery("#wpn3Crit").val(ui.value);update_totals(); } });
	/* armour sliders */
	jQuery("#armAgiSlider").slider({ min: 0, max: 24, step: 1, slide: function(event, ui) { jQuery("#armAgi").val(ui.value);update_totals(); } });
	jQuery("#armEndSlider").slider({ min: 0, max: 24, step: 1, slide: function(event, ui) { jQuery("#armEnd").val(ui.value);update_totals(); } });
});

} );