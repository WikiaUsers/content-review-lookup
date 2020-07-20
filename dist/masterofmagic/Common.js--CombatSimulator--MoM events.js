//
// Form specific functions and event handlers
//


//var g_MoM = top.g_MoM;

function populate_select_with_units(selected_name)
{
   if (g_MoM == null)
      return;
   
   var option_selected = false;
   var all_options = "";
   for (var i = 1; i < g_MoM.g_units.length; ++i)
   {
      var option = '<option value="' + i + '"';
      if (selected_name == g_MoM.g_units[ i ].name)
      {
         option += ' selected';
         option_selected = true;
      }
      option += '>' + g_MoM.g_units[ i ].name + '</option>\n';
      all_options += option;
   }
   if (option_selected)
   {
      all_options = '<option value="0" selected>\n' + all_options;
   }
   else
   {
      all_options = '<option value="0">\n' + all_options;
   }
   
   return all_options;
}


function find_text_in_select(select, text)
{
   if (select == null)
      return 0;

   for (var i = 0; i < select.length; ++i)
   {
      if (text == select.options[i].text)
         return i;
   }
   return 0;
}

function UpdateAllEffects()
{
   // Reapply effects in case e.g. the spells have changed
   g_MoM.g_attacker.reset();
   g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
   g_MoM.g_defender.reset();
   g_MoM.g_defender.apply_effects(g_MoM.g_attacker);
   // Repeat in case defender unit type has change
   g_MoM.g_attacker.reset();
   g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
}

function UpdateEditFields()
{
/*
   with (document.FormPunch)
   {
      if (document.FormPunch.att_stats)
         att_stats.value = (g_MoM.g_attacker ? g_MoM.g_attacker.stats() : "");
      if (document.FormPunch.def_stats)
         def_stats.value = (g_MoM.g_defender ? g_MoM.g_defender.stats() : "");
      if (document.FormPunch.o)
         o.scrollTop = o.scrollHeight;  // Scroll to bottom

      if (document.FormPunch.TextSuppressAtt && g_MoM.g_attacker) 
         document.FormPunch.TextSuppressAtt.value = g_MoM.g_attacker.get_suppressionCounter();
      if (document.FormPunch.TextSuppressDef && g_MoM.g_defender) 
         document.FormPunch.TextSuppressDef.value = g_MoM.g_defender.get_suppressionCounter();

      var spell, spell_active;
      spell_active = false;
      if (g_MoM.g_attacker)
      {
         for (spell in g_MoM.g_attacker.spells)
         {
            spell_active = true;
            break;
         }
      }
      if (document.FormPunch.ButtonAttackSpells)
         ButtonAttackSpells.value = (spell_active ? "Spells*" : "Spells");
      spell_active = false;
      if (g_MoM.g_defender)
      {
         for (spell in g_MoM.g_defender.spells)
         {
            spell_active = true;
            break;
         }
      }
      if (document.FormPunch.ButtonDefenseSpells)
         ButtonDefenseSpells.value = (spell_active ? "Spells*" : "Spells");

      if (parent.frames.frameUnitDisplay != null)
      {
         if (parent.g_role == "Attacker")
            top.OnDisplayUnit(g_MoM.g_attacker, parent.frames.frameUnitDisplay)
         else if (parent.g_role == "Defender")
            top.OnDisplayUnit(g_MoM.g_defender, parent.frames.frameUnitDisplay)
         else
            alert("Unrecognized role " + parent.g_role);
      }
   }
*/
}


function UpdateLevelChoice(selectBox, unit)
{
   if (selectBox == null || unit == null)
      return;

   var idx = selectBox.selectedIndex;
   var i;
   selectBox.options.length = 0;
   if (unit.is_type("Fantastic"))
   {
      for (i = 0; i < g_MoM.g_level_fantastic.length; ++i)
         selectBox.options.add(new Option(g_MoM.g_level_fantastic[i], i));
   }
   else if (unit.is_type("Hero"))
   {
      for (i = 0; i < g_MoM.g_level_hero.length; ++i)
         selectBox.options.add(new Option(g_MoM.g_level_hero[i], i));
   }
   else // if (unit.is_type("Normal")) or unspecified
   {
      for (i = 0; i < g_MoM.g_level_normal.length; ++i)
         selectBox.options.add(new Option(g_MoM.g_level_normal[i], i));
   }
   if (idx >= selectBox.options.length)
      idx = selectBox.options.length - 1;
   if (idx < 0) idx = 0;
   selectBox.selectedIndex = idx;
}


function OnLoad()
{
   if (top == self)
   {
      location.href = "index.htm";
      return;
   }

//alert("MoM_events#OnLoad parent.g_role=" + parent.g_role);
   if (g_MoM == null)
      return;

   //var objectMusic = document.getElementById('objectMusic');
   //if (g_MoM.g_music && objectMusic != null && objectMusic.Play != null)
   //    objectMusic.Play();

   with (document.FormPunch)
   {
      // Keep track of old choices (if any)
      if (document.FormPunch.TextDistance) 
         document.FormPunch.TextDistance.value = g_MoM.g_shoot_range;
      if (document.FormPunch.TextSuppressAtt && g_MoM.g_attacker) 
         document.FormPunch.TextSuppressAtt.value = g_MoM.g_attacker.get_suppressionCounter();
      if (document.FormPunch.TextSuppressDef && g_MoM.g_defender) 
         document.FormPunch.TextSuppressDef.value = g_MoM.g_defender.get_suppressionCounter();
      if (document.FormPunch.o) document.FormPunch.o.value = g_MoM.g_output;

      // Initialize attacker and defender select boxes
      if (document.FormPunch.attacker && g_MoM.g_attacker)
         attacker.selectedIndex = find_text_in_select(attacker, g_MoM.g_attacker.name);
      if (document.FormPunch.selectAttLevel)
      {
         UpdateLevelChoice(selectAttLevel, g_MoM.g_attacker);
         selectAttLevel.selectedIndex = g_MoM.g_attacker.level;
      }
      if (document.FormPunch.att_weapon)
         att_weapon.selectedIndex = g_MoM.g_attacker.weapon_type;

      if (document.FormPunch.defender && g_MoM.g_defender)
         defender.selectedIndex = find_text_in_select(defender, g_MoM.g_defender.name);
      if (document.FormPunch.selectDefLevel)
      {
         UpdateLevelChoice(selectDefLevel, g_MoM.g_defender);
         selectDefLevel.selectedIndex = g_MoM.g_defender.level;
      }
      if (document.FormPunch.def_weapon)
         def_weapon.selectedIndex = g_MoM.g_defender.weapon_type;

      // Reapply effects in case e.g. the spells have changed
      UpdateAllEffects();
   }
   UpdateEditFields();
}


function OnUnload()
{
   if (g_MoM == null)
      return;
      
   // Keep track of current values
   if (document.FormPunch.o)
      g_MoM.g_output = document.FormPunch.o.value;
}


function OnChangeAttacker(selectUnit, selectLevel, selectWeapon)
{
   console.log("OnChangeAttacker(selectUnit={0}, selectLevel={1}, selectWeapon={2})".format(selectUnit.value, selectLevel.value, selectWeapon.value));
   g_MoM.g_attacker = new top.Unit(g_MoM.find_unit(selectUnit.selectedIndex));
   UpdateLevelChoice(selectLevel, g_MoM.g_attacker);
   if (selectLevel)
      g_MoM.g_attacker.level = selectLevel.selectedIndex;
   if (selectWeapon)
      g_MoM.g_attacker.weapon_type = selectWeapon.selectedIndex;

   g_MoM.g_attacker.reset();
   g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
   g_MoM.g_defender.reset();
   g_MoM.g_defender.apply_effects(g_MoM.g_attacker);
   // Reapply effects of defender on attacker, because the unit type of the defender might have changed
   g_MoM.g_attacker.reset();
   g_MoM.g_attacker.apply_effects(g_MoM.g_defender);

   UpdateEditFields();
}


function OnChangeDefender(selectUnit, selectLevel, selectWeapon)
{
    //alert("OnChangeDefender(selectUnit, selectLevel, selectWeapon)\n");
   g_MoM.g_defender = new top.Unit(g_MoM.find_unit(selectUnit.selectedIndex));
   UpdateLevelChoice(selectLevel, g_MoM.g_defender);
   if (selectLevel)
      g_MoM.g_defender.level = selectLevel.selectedIndex;
   if (selectWeapon)
      g_MoM.g_defender.weapon_type = selectWeapon.selectedIndex;
      
   g_MoM.g_defender.reset();
   g_MoM.g_defender.apply_effects(g_MoM.g_attacker);
   g_MoM.g_attacker.reset();
   g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
   // Reapply effects of attacker  on defender, because the unit type of the attacker might have changed
   g_MoM.g_defender.reset();
   g_MoM.g_defender.apply_effects(g_MoM.g_attacker);

   UpdateEditFields();
}


function OnChangeAttLevel(unit, selectLevel)
{
   if (!g_MoM.g_attacker)
      return;
   unit.reset();
   unit.level = selectLevel.selectedIndex;
   unit.apply_effects(g_MoM.g_defender);
   UpdateEditFields();
}


function OnChangeDefLevel(unit, selectLevel)
{
   if (!g_MoM.g_defender)
      return;
   unit.reset();
   unit.level = selectLevel.selectedIndex;
   unit.apply_effects(g_MoM.g_attacker);
   UpdateEditFields();
}


function OnChangeAttWeapon(unit, selectWeapon)
{
   if (!g_MoM.g_attacker)
      return;
   unit.reset();
   unit.weapon_type = selectWeapon.selectedIndex;
   unit.apply_effects(g_MoM.g_defender);
   UpdateEditFields();
}


function OnChangeDefWeapon(unit, selectWeapon)
{
   if (!g_MoM.g_defender)
      return;
   unit.reset();
   unit.weapon_type = selectWeapon.selectedIndex;
   unit.apply_effects(g_MoM.g_attacker);
   UpdateEditFields();
}

/*
function OnApplyAttackSpells()
{
   var spell, spell_active = false;

   for (spell in g_MoM.g_att_spells)
   {
      spell_active = true;
      break;
   }

   document.FormPunch.ButtonAttackSpells.value = (spell_active ? "Spells*" : "Spells");

   if (g_MoM.g_attacker)
   {
      g_MoM.g_attacker.reset();
      g_MoM.g_attacker.spells = g_MoM.g_att_spells;
      g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
   }
   if (g_MoM.g_defender)
   {
      g_MoM.g_defender.reset();
      g_MoM.g_defender.spells = g_MoM.g_def_spells;
      g_MoM.g_defender.apply_effects(g_MoM.g_attacker);
   }
   UpdateEditFields();
}


function OnApplyDefenseSpells()
{
   var spell, spell_active = false;

   for (spell in g_MoM.g_def_spells)
   {
      spell_active = true;
      break;
   }

   document.FormPunch.ButtonDefenseSpells.value = (spell_active ? "Spells*" : "Spells");

   if (g_MoM.g_attacker)
   {
      g_MoM.g_attacker.reset();
      g_MoM.g_attacker.spells = g_MoM.g_att_spells;
      g_MoM.g_attacker.apply_effects(g_MoM.g_defender);
   }
   if (g_MoM.g_defender)
   {
      g_MoM.g_defender.reset();
      g_MoM.g_defender.spells = g_MoM.g_def_spells;
      g_MoM.g_defender.apply_effects(g_MoM.g_attacker);
   }
   UpdateEditFields();
}
*/

function OnButtonAttackSpells()
{
   top.g_last_page = "unit_spells.htm";
   window.location.href = "unit_frameset.htm?role=Attacker";
}


function OnButtonDefenseSpells()
{
   top.g_last_page = "unit_spells.htm";
   window.location.href = "unit_frameset.htm?role=Defender";
}


function OnButtonCombat()
{
   OnButtonHeal();

   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;

   var o = document.getElementById('combatOutput');
   {
      o.value = "Unit " + g_MoM.g_attacker.string() + "\nattacks unit " + g_MoM.g_defender.string() + "\n\n";

      var round_nr;
      for (round_nr = 1; round_nr <= 50; ++round_nr)
      {
         o.value += g_MoM.combat_round(g_MoM.g_attacker, g_MoM.g_defender);
         if (g_MoM.g_attacker.total_hp() < 0.05 || g_MoM.g_defender.total_hp() < 0.05)
            break;
         o.value += g_MoM.combat_round(g_MoM.g_defender, g_MoM.g_attacker);
         if (g_MoM.g_attacker.total_hp() < 0.05 || g_MoM.g_defender.total_hp() < 0.05)
            break;
      }

//      o.value += g_MoM.full_combat(g_MoM.g_attacker, g_MoM.g_defender);
   }
   UpdateEditFields();
}


function OnButtonClear()
{
   var o = document.getElementById('combatOutput');
   {
      o.value = "";
   }
}


function OnButtonAttack()
{
   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;

   var o = document.getElementById('combatOutput');
   {
      o.value += "Unit " + g_MoM.g_attacker.string() + "\nattacks unit " + g_MoM.g_defender.string() + "\n\n"
         o.value += g_MoM.combat_round(g_MoM.g_attacker, g_MoM.g_defender);
   }
   UpdateEditFields();
}


function OnButtonCounterAttack()
{
   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;

   var o = document.getElementById('combatOutput');
   {
      o.value += "Unit " + g_MoM.g_defender.string() + "\nattacks unit " + g_MoM.g_attacker.string() + "\n\n"
         o.value += g_MoM.combat_round(g_MoM.g_defender, g_MoM.g_attacker);
   }
   UpdateEditFields();
}


function OnButtonShoot()
{
   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;

   var o = document.getElementById('combatOutput');
   {
      o.value += g_MoM.shoot_round(g_MoM.g_attacker, g_MoM.g_defender, $('#TextDistance')[0].value);
   }
   UpdateEditFields();
}


function OnButtonCounterShoot()
{
   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;

   var o = document.getElementById('combatOutput');
   {
      o.value += g_MoM.shoot_round(g_MoM.g_defender, g_MoM.g_attacker, $('#TextDistance')[0].value);
   }
   UpdateEditFields();
}


function OnButtonHeal()
{
   if (!g_MoM.g_attacker || !g_MoM.g_defender)
      return;
      
   g_MoM.g_attacker.damage = 0;
   g_MoM.g_defender.damage = 0;
   UpdateEditFields();
}