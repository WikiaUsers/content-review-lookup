var g_spells = null;
var g_unit = null;

function InitializeSpells(__spells, __unit, title)
{
   g_spells = __spells;
   g_unit = __unit;

   if (g_spells == null || g_unit == null)
      return;

   $('[name=title]').html(title);
   for (var spell in g_unit.spells)
   {
      document.FormActiveSpells[ spell ].checked = true;
   }
   if (g_unit.spells["Chaos Channel"] != null)
      document.FormActiveSpells.SelectChaosChannels.selectedIndex = g_unit.spells["Chaos Channel"];
   if (g_unit.spells["Warp Creature"] != null)
      document.FormActiveSpells.SelectWarpCreature.selectedIndex = g_unit.spells["Warp Creature"];
}

function OnUnload()
{
   OnButtonApply();
}

function OnButtonApply()
{
   if (g_spells == null || g_unit == null)
      return;

   var i, spell;
   for (i = 0; i < g_spells.length; ++i)
   {
      spell = g_spells[ i ];
      //top.g_MoM.verbose_log("spell " + spell + "<br />\n");
      if (document.FormActiveSpells[ spell ].checked)
         g_unit.spells[ spell ] = 0;
      else
         delete g_unit.spells[ spell ];
   }
   if (g_unit.spells["Chaos Channel"] != null)
      g_unit.spells["Chaos Channel"] = document.FormActiveSpells.SelectChaosChannels.selectedIndex;
   if (g_unit.spells["Warp Creature"] != null)
      g_unit.spells["Warp Creature"] = document.FormActiveSpells.SelectWarpCreature.selectedIndex;
   
   // Update the unit to indicate the effect of the spells
   // Note that this will not be definitive, since effects may depend on the enemy
   // However, the effects will be reapplied before actual combat takes place
//   g_unit.reset();
//   g_unit.apply_effects(null);

   // Reapply effects in case e.g. the spells have changed
   UpdateAllEffects();

   combatSimulatorDialog.update();

}

function OnButtonClose() {
   $('#spellDialog').hide();
}

function hereDoc(f) {
	return f.toString().
	replace(/^[^\/]+\/\*!\r?\n?/, '').
	replace(/\r?\n?\*\/[^\/]+$/, '');
}

var spellDialogHtml = hereDoc(function() {/*!
<form name="FormActiveSpells" action="">
<p name="title">Title</p>
<table border=1 cellPadding=0 cellSpacing=1>
  <colgroup>
    <col>
    <col class=MoM_life>
    <col class=MoM_death>
    <col class=MoM_chaos>
    <col class=MoM_nature>
    <col class=MoM_sorcery>
  </colgroup>
  <tr>
    <th>Rarity</th>
    <th class=MoM_life>Life</th>
    <th class=MoM_death>Death</th>
    <th class=MoM_chaos>Chaos</th>
    <th class=MoM_nature>Nature</th>
    <th class=MoM_sorcery>Sorcery</th>
  </tr>
  <tr>
    <th>Common</th>
    <td valign="top" class=MoM_life>
      <input type="checkbox" name="Bless" value="ON">Bless<br>
      <input type="checkbox" name="Holy Armor" value="ON">Holy Armor<br>
      <input type="checkbox" name="Holy Weapon" value="ON">Holy Weapon<br>
      <input type="checkbox" name="True Light" value="ON">True Light
    </td>
    <td valign="top" class=MoM_death>
      <input type="checkbox" name="Black Sleep" value="ON">Black Sleep<br>
      <input type="checkbox" name="Cloak of Fear" value="ON">Cloak of Fear<br>
      <input type="checkbox" name="Darkness" value="ON">Darkness<br>
      <input type="checkbox" name="Terror" value="ON">Terror<br>
      <input type="checkbox" name="Weakness" value="ON">Weakness
    </td>
    <td valign="top" class=MoM_chaos>
      <input type="checkbox" name="Eldritch Weapon" value="ON">Eldritch Weapon<br>
      <input type="checkbox" name="Shatter" value="ON">Shatter<br>
      <input type="checkbox" name="Warp Wood" value="ON">Warp Wood
    </td>
    <td valign="top" class=MoM_nature>
      <input type="checkbox" name="Giant Strength" value="ON">Giant Strength<br>
      <input type="checkbox" name="Resist Elements" value="ON">Resist Elements<br>
      <input type="checkbox" name="Stone Skin" value="ON">Stone Skin<br>
      <input type="checkbox" name="Web" value="ON">Web
    </td>
    <td valign="top" class=MoM_sorcery>
      <input type="checkbox" name="Resist Magic" value="ON">Resist Magic<br>
      <input type="checkbox" name="Guardian Wind" value="ON">Guardian Wind
    </td>
  </tr>
  <tr>
    <th>Uncommon</th>
    <td valign="top" class=MoM_life>
      <input type="checkbox" name="Prayer" value="ON">Prayer<br>
      <input type="checkbox" name="True Sight" value="ON">True Sight
    </td>
    <td valign="top" class=MoM_death>
      <input type="checkbox" name="Berserk" value="ON">Berserk<br>
      <input type="checkbox" name="Black Channels" value="ON">Black Channels<br>
      <input type="checkbox" name="Black Prayer" value="ON">Black Prayer
    </td>
    <td valign="top" class=MoM_chaos>
      <input type="checkbox" name="Chaos Channel" value="ON">Chaos Channel<br>
      &nbsp;&nbsp;&nbsp;<select size="1" name="SelectChaosChannels">
         <option value="0" selected>
         <option value="1">Demon Skin
         <option value="2">Demon Wings
         <option value="3">Fire Breath
      </select><br>
      <input type="checkbox" name="Flame Blade" value="ON">Flame Blade<br>
      <input type="checkbox" name="Immolation" value="ON">Immolation<br>
      <input type="checkbox" name="Warp Creature" value="ON">Warp Creature<br>
      &nbsp;&nbsp;&nbsp;<select size="1" name="SelectWarpCreature">
         <option value="0" selected>
         <option value="1">Melee
         <option value="2">Defense
         <option value="3">Resistance
      </select>
    </td>
    <td valign="top" class=MoM_nature>
      &nbsp;
    </td>
    <td valign="top" class=MoM_sorcery>
      <input type="checkbox" name="Blur" value="ON">Blur<br>
      <input type="checkbox" name="Flight" value="ON">Flight<br>
      <input type="checkbox" name="Vertigo" value="ON">Vertigo
    </td>
  </tr>
  <tr>
    <th>Rare</th>
    <td valign="top" class=MoM_life>
      <input type="checkbox" name="Invulnerability" value="ON">Invulnerability<br>
      <input type="checkbox" name="Lion Heart" value="ON">Lion Heart<br>
      <input type="checkbox" name="Righteousness" value="ON">Righteousness</td>
    <td valign="top" class=MoM_death>
      <input type="checkbox" name="Wrack" value="ON">Wrack<BR>
      <input type="checkbox" name="Wraith Form" value="ON">Wraith Form</td>
    <td valign="top" class=MoM_chaos>
      <input type="checkbox" name="Metal Fires" value="ON">Metal Fires<br>
      <input type="checkbox" name="Warp Reality" value="ON">Warp Reality</td>
    <td valign="top" class=MoM_nature>
      <input type="checkbox" name="Elemental Armor" value="ON">Elemental Armor<br>
      <input type="checkbox" name="Iron Skin" value="ON">Iron Skin</td>
    <td valign="top" class=MoM_sorcery>
      <input type="checkbox" name="Haste" value="ON">Haste<br>
      <input type="checkbox" name="Invisibility" value="ON">Invisibility<br>
      <input type="checkbox" name="Magic Immunity" value="ON">Magic Immunity
    </td>
  </tr>
  <tr>
    <th>Very rare</th>
    <td valign="top" class=MoM_life>
      <input type="checkbox" name="Charm of Life" value="ON">Charm of Life<br>
      <input type="checkbox" name="High Prayer" value="ON">High Prayer
    </td>
    <td valign="top" class=MoM_death>
      &nbsp;
    </td>
    <td valign="top" class=MoM_chaos>
      <input type="checkbox" name="Chaos Surge" value="ON">Chaos Surge
    </td>
    <td valign="top" class=MoM_nature>
      <input type="checkbox" name="Regeneration" value="ON">Regeneration
    </td>
    <td valign="top" class=MoM_sorcery>
      &nbsp;
    </td>
  </tr>
</table>
<p>
<input type=button value="Apply" onclick="OnButtonApply()">
<input type=button value="Close" onclick="OnButtonClose()">
</p>
</form>
*/});