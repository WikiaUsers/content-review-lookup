/*
 * Master of Magic - Combat Simulator
 *
 * Author: I like Serena
 */

"use strict";

console.log("load CombatSimulator.js");

//Utility functions

function hereDoc(f) {
	return f.toString().
	replace(/^[^\/]+\/\*!\r?\n?/, '').
	replace(/\r?\n?\*\/[^\/]+$/, '');
}

String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
		if (m == "{{") { return "{"; }
		if (m == "}}") { return "}"; }
		return args[n];
	});
};
	
// Html fragments
	
// Class CombatSimulatorDialog

function CombatSimulatorDialog() {
}

CombatSimulatorDialog.selectUnitHtml = hereDoc(function() {/*!
<table><tr>
	<td colspan="2">
	   <select size="1" name="selectUnit">
	   </select>
	</td>
	<td>
	   <button name="spells">Spells</button>
	   <!-- button name="items">Items</button -->
	</td>
</tr>
<tr>
	<td>
	   <select size="1" name="selectLevel">
	      <option value="0" selected>
	      <option value="1">1 Green
	      <option value="2">2 Regular
	      <option value="3">3 Veteran
	      <option value="4">4 Elite
	      <option value="5">5 Ultra-Elite
	      <option value="6">6 Champion
	   </select>
	</td>
	<td>
	   <select size="1" name="selectWeapon">
	      <option value="0" selected>
	      <option value="1">Normal
	      <option value="2">Magic
	      <option value="3">Mithril
	      <option value="4">Adamantium
	   </select>
	</td>
	<td>
	   <!-- button name="custom">Custom</button -->
	</td>
</tr></table>
*/});

CombatSimulatorDialog.implementedHtml = hereDoc(function() {/*!
<p><small>*Currently the specials implemented are Magic/Mithril/Adamantium, Armor Piercing, Fire Breath, First Strike,
Flying, Gazes, Hero abilities, Holy Bonus, Illusion, Immolation, Invisibility, Life Steal, Lightning, Lucky,
Ill/Magic/Missiles/Poison/Stoning/Weapon Immunity, Negate First Strike, Poison, Ranged attacks, Resistance to All, 
Stoning Touch, Suppression, Thrown, All spells relevant to unit-vs-unit combat.</small></p>

<p><small>**TODO: Resistance against Chaos Spawn, Hero items, Regeneration, Blur, Cloak of Fear, Terror, Web, Wrack.</small></p>
*/});


CombatSimulatorDialog.combatHtml = hereDoc(function() {/*!
<input type="button" value="Combat" onclick="OnButtonCombat()">
&nbsp;&nbsp;&nbsp;
<input type="button" value="Heal all" onclick="OnButtonHeal()">
<input type="button" value="Clear" onclick="OnButtonClear()">
<input type="button" value="Attack" onclick="OnButtonAttack()">
<input type="button" value="Counter Attack" onclick="OnButtonCounterAttack()">
<input type="button" value="Shoot" onclick="OnButtonShoot()">
distance:
<input type="text" value="6" id="TextDistance" size="2" onchange="g_MoM.g_shoot_range = this.value">
<input type="button" value="Counter Shoot" onclick="OnButtonCounterShoot()">
suppress:
<input type="text" value="0" id="TextSuppressAtt" size="2" onchange="g_MoM.g_attacker.set_suppressionCounter(this.value)">
<input type="text" value="0" id="TextSuppressDef" size="2" onchange="g_MoM.g_defender.set_suppressionCounter(this.value)">
*/});


CombatSimulatorDialog.prototype.initalize = function() {
	var html = 
	    '<style>\n' +
	    '  table.Unit { background-image: url("' + ImageManager.getImage('images/Background_unit.gif') + '"); min-width: 300px; }\n' +
	    '  .Unit td   { font: 12pt bold; color: white; font-family: \'Monotype Corsiva\', sans-serif; }\n' +
	    '  .Unit img  { float: left; }\n' +
	    '  img.spacer_left { margin-left: 8px; }\n' +
	    '  .Spells, .ui-dialog {\n' +
	    '    background-image: url("' + ImageManager.getImage('images/background_screen.gif') + '");\n' +
	    '    background-color: #463C2C;\n' +
	    '    border: 5px outset gray;\n' +
	    '    color: white;\n' +
	    '    font-family: "Monotype Corsiva", sans-serif;\n' +
	    '    font-size: 14pt;\n' +
	    '  }\n' +
	    '  .MoM_life               { color: white; }\n' +
	    '  .MoM_death              { color: gray; }\n' +
	    '  .MoM_chaos              { color: #FF6060; }\n' +
	    '  .MoM_nature             { color: #60FF60; }\n' +
	    '  .MoM_sorcery            { color: #8080FF; }\n' +
	    '</style>\n' +
	    '\n' +
		'<table width="800px">\n' +
		'	<tr style="vertical-align: top;">\n' +
		'    	<td id="attacker" style="width: 400px;">' + CombatSimulatorDialog.selectUnitHtml + '<div id="attackerView" /></td>\n' +
		'    	<td id="defender" style="width: 400px;">' + CombatSimulatorDialog.selectUnitHtml + '<div id="defenderView" /></td>\n' +
		'	</tr>\n' +
		'</table>\n' +
		'<table width="800px">\n' +
		'	<tr>\n' +
		'		<td>' + CombatSimulatorDialog.combatHtml + '</td>\n' +
		'	</tr>\n' +
		'	<tr>\n' +
		'		<td><textarea id="combatOutput" rows="30" cols="115" style="background-color: transparent; color: #d5d4d4"></textarea></td>\n' +
		'	</tr>\n' +
		'</table>\n' +
		'<div id="spellDialog" class="Spells" title="Spell dialog"></div\n' +
	    '</div>\n';
	
	$('#combatSimulatorDialog').html(html);

	// Populate
	$('[name=selectUnit]').html(populate_select_with_units(null));
	
	// $("#spellDialog").dialog({ autoOpen: false, modal: true });
	$('#spellDialog').css({ display: "none" });
	$('#spellDialog').drags();

	// Hook up event handlers
	$('#attacker [name=selectUnit]').change(function() {
		OnChangeAttacker($(this)[0], $('#attacker [name=selectLevel]')[0], $('#attacker [name=selectWeapon]')[0]);
		combatSimulatorDialog.update();
	});
	$('#attacker [name=selectLevel]').change(function() {
		OnChangeAttLevel(g_MoM.g_attacker, $(this)[0]);
		combatSimulatorDialog.update();
	});
	$('#attacker [name=selectWeapon]').change(function() {
		OnChangeAttWeapon(g_MoM.g_attacker, $(this)[0]);
		combatSimulatorDialog.update();
	});
	$('#attacker [name=spells]').click(function() {
		console.log("onclickSpells");
		$('#spellDialog').html(spellDialogHtml);
		InitializeSpells(g_MoM.g_spells, g_MoM.g_attacker, "Applicable Spells Targeting Attacker");
		$('#spellDialog').css({
			display:  'block',
	        position: 'absolute',
	        zIndex:   5000,
	        top:      150, 
	        left:     150
	      });
	});

	$('#defender [name=selectUnit]').change(function() {
		OnChangeDefender($(this)[0], $('#defender [name=selectLevel]')[0], $('#defender [name=selectWeapon]')[0]);
		combatSimulatorDialog.update();
	});
	$('#defender [name=selectLevel]').change(function() {
		OnChangeDefLevel(g_MoM.g_defender, $(this)[0]);
		combatSimulatorDialog.update();
	});
	$('#defender [name=selectWeapon]').change(function() {
		OnChangeDefWeapon(g_MoM.g_defender, $(this)[0]);
		combatSimulatorDialog.update();
	});
	$('#defender [name=spells]').click(function() {
		console.log("onclickSpells");
		$('#spellDialog').html(spellDialogHtml);
		InitializeSpells(g_MoM.g_spells, g_MoM.g_defender, "Applicable Spells Targeting Defender");
		$('#spellDialog').css({
			display:  'block',
	        position: 'absolute',
	        zIndex:   5000,
	        top:      150, 
	        left:     250
	      });
	});
}

CombatSimulatorDialog.prototype.update = function() {
	var html = createUnitHtml(g_MoM.g_attacker);
	$('#attackerView').html(html);
	$('#defenderView').html(createUnitHtml(g_MoM.g_defender));
}

// Draggable

function makeJqueryDraggable() {
	(function($) {
	    $.fn.drags = function(opt) {
	
	        opt = $.extend({handle:"",cursor:"move"}, opt);
	
	        if(opt.handle === "") {
	            var $el = this;
	        } else {
	            var $el = this.find(opt.handle);
	        }
	
	        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
	            if(opt.handle === "") {
	                var $drag = $(this).addClass('draggable');
	            } else {
	                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
	            }
	            var z_idx = $drag.css('z-index'),
	                drg_h = $drag.outerHeight(),
	                drg_w = $drag.outerWidth(),
	                pos_y = $drag.offset().top + drg_h - e.pageY,
	                pos_x = $drag.offset().left + drg_w - e.pageX;
	            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
	                $('.draggable').offset({
	                    top:e.pageY + pos_y - drg_h,
	                    left:e.pageX + pos_x - drg_w
	                }).on("mouseup", function() {
	                    $(this).removeClass('draggable').css('z-index', z_idx);
	                });
	            });
	            e.preventDefault(); // disable selection
	        }).on("mouseup", function() {
	            if(opt.handle === "") {
	                $(this).removeClass('draggable');
	            } else {
	                $(this).removeClass('active-handle').parent().removeClass('draggable');
	            }
	        });
	
	    }
	})(jQuery);
}

// Main

var g_MoM;
var combatSimulatorDialog;

$(document).ready(function () {
	console.log("baseURI=" + document.baseURI);
	console.log("domain='" + document.domain + "'");
	console.log("jQuery version=" + (window.jQuery ? $.fn.jquery : 'not included'));
	console.log("jQuery ui version=" + (window.jQuery && $.ui ? $.ui.version : 'not included'));

	makeJqueryDraggable();
	
	g_MoM = new MoM;

	g_MoM.g_attacker = new Unit(g_MoM.g_units[0]); // The currently selected attacker
	g_MoM.g_defender = new Unit(g_MoM.g_units[0]); // The currently selected defender

	combatSimulatorDialog = new CombatSimulatorDialog();
	combatSimulatorDialog.initalize();
	combatSimulatorDialog.update();
});