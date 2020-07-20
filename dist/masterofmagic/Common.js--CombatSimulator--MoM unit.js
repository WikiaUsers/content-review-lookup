console.log("load MoM_unit.js");

//!
//! Each unit has base attributes of class BaseAttributes, which contains:
//!
//!   copy()               Returns a copy of these attributes.
//!   add_bonus(up)        Add the bonuses in up to the attributes.
//!   sub_penalty(dn)      Subtracts the values in dn from the attributes.
//!
//!   Me, Ra, Df, Re, Hp   Melee, Ranged attack, Defense, Resistance, and Hitpoints of each figure
//!   Th                   To hit bonus, each point represents a 10% chance
//!   Tb                   To block bonus, each point represents a 10% chance
//!
//!
//! Each unit is of class BaseUnit.
//! Class BaseUnit extends BaseAttributes.
//! It contains:
//!
//!   copy()               Returns a copy of the current unit.
//!   string()             Returns the unit formatted as a string.
//!   stats()              Returns the stats of a unit formatted as a string.
//!
//!   name                 Name of the unit
//!   max_Nr               Maximum number of figures in the unit
//!   Me, Ra, Df, Re, Hp   Melee, Ranged attack, Defense, Resistance, and Hitpoints of each figure
//!   Th                   To hit bonus, each point represents a 10% chance
//!   Tb                   To block bonus, each point represents a 10% chance
//!   specials             String containing the original specials of the unit.
//!                        It is parsed to generate the special[] array (see below).
//!
//!
//! The class Unit extends the class BaseUnit.
//! Class Unit contains the following extensions:
//!
//!   has(special)         Returns whether the unit has a special, specified as a string.
//!   get_special(special) Retrieves the associated value of a special.
//!   set_special(special, value)   Sets the associated value of a special.
//!   add_special(special, value)   Adds a special with an optional value.
//!   delete_special(special) Removes a special.
//!   get_suppressionCounter() Retrieves the current suppressionCounter.
//!   set_suppressionCounter(value)   Sets the current suppressionCounter.
//!   is_type(type)        Returns whether the unit is of 'type' (Normal, Hero, Fantastic, Arcane, Chaos, Death, Life,
//!                        Nature, Sorcery).
//!   total_hp()           Returns the total hitpoints of all remaining figures in the unit.
//!   cur_Nr()             Current number of figures in the unit
//!   spell_active()       Returns whether a specified spell is active on the unit (either your own or your enemy's).
//!   reset()              Reset the basic attributes of the unit (name,max_Nr,Me,Ra,Df,Re,Hp,Th,Tb,specials,special[]).
//!                        NOT reset are: level, damage, weapon_type, range_type, range_color, and spells[].
//!   can_damage(attack_type, defender) Returns whether the unit can damage the defender with a given attack_type.
//!   apply_effects()      (Re)applies effects of level, weapon, and active spells
//!   apply_level()        (Re)applies effects of level
//!   apply_weapon_type()  (Re)applies effects of weapon_type
//!   apply_spell_effects() (Re)applies effects of spells
//!   apply_other_effects() (Re)applies effects of other effects
//!
//!   special[]            Variable size array containing the specials of the unit.
//!                        It is indexed by the name of the special.
//!                        Each value is either the amount of the special,
//!                        or 0 indicating it is present, but has no value,
//!                        or null indicating it is not present after all.
//!
//!   spells[]             Variable size array containing the spells that have an effect on the unit.
//!                        It is indexed by the name of the spell.
//!                        Each value is either the amount related to the spell,
//!                        or 0 indicating it is present, but has no value,
//!                        or null indicating it is not present after all.
//!   items[]              Array containing the other items that have an effect on the unit.
//!                        It is indexed by the name of the effect.
//!   other_effects[]      Array containing the other effects that have an effect on the unit.
//!                        It is indexed by the name of the effect.
//!   level                The level of the unit ranging from 1 (Green) to 6 (Champion), or 7 (Node), or 0 for unknown/unspecified,
//!   damage               The total amount of damage the unit has taken.
//!   unit_type            The type of the unit, which is one of (Normal, Hero, Arcane, Chaos, Death, Life, Nature, Sorcery).
//!   weapon_type          The unit's weapon, which is one of (0=Unknown, 1=Normal, 2=Magic, 3=Mithril, 4=Adamantium).
//!   range_type           The type of the unit's ranged attack, which is one of (None, Physical, Magical).
//!   range_color          The color of the unit's ranged attack, which is one of (None, Chaos, Death, Life, Nature, Sorcery).
//!   baseunit             The BaseUnit on which the unit is based.
//!   fixedunit            The BaseUnit with only the modifications of level and fixed abilities.
//!   bonuses              The set of bonuses of abilities and spells on top of fixedunit.
//!   penalties            The set of penalties of abilities and spells on top of fixedunit (note: they must be subtracted).
//!

//!
//! \class BaseAttributes
//! \brief Keeps track of the basic attributes of all units. It is also used for keeping track of bonuses and penalties.
//!
function BaseAttributes(__Me, __Ra, __Df, __Df_Ra, __Re, __Hp, __Th, __Th_Ra, __Tb)
{
   this.Me = __Me || 0;
   this.Ra = __Ra || 0;
   this.Df = __Df || 0;
   this.Df_Ra = __Df_Ra || 0;
   this.Re = __Re || 0;
   this.Hp = __Hp || 0;
   this.Th = __Th || 0;
   this.Th_Ra = __Th_Ra || 0;
   this.Tb = __Tb || 0;
}


BaseAttributes.prototype.copy = function()
{
   return new BaseAttributes(Me, Ra, Df, Df_Ra, Re, Hp, Th, Th_Ra, Tb);
}


BaseAttributes.prototype.add_bonus = function(up)
{
   this.Me += up.Me;
   this.Ra += up.Ra;
   this.Df += up.Df;
   this.Df_Ra += up.Df_Ra;
   this.Re += up.Re;
   this.Hp += up.Hp;
   this.Th += up.Th;
   this.Th_Ra += up.Th_Ra;
   this.Tb += up.Tb;
}

BaseAttributes.prototype.sub_penalty = function(dn)
{
   this.Me -= dn.Me; if (this.Me < 0) this.Me = 0;
   this.Ra -= dn.Ra; if (this.Ra < 0) this.Ra = 0;
   this.Df -= dn.Df; if (this.Df < 0) this.Df = 0;
   this.Df_Ra -= dn.Df_Ra; if (this.Df_Ra < 0) this.Df_Ra = 0;
   this.Re -= dn.Re; if (this.Re < 0) this.Re = 0;
   this.Hp -= dn.Hp; if (this.Hp < 0) this.Hp = 0;
   this.Th -= dn.Th;
   this.Th_Ra -= dn.Th_Ra;
   this.Tb -= dn.Tb;
}



//!
//! \class BaseUnit
//! \brief Keeps track of the basic attributes of all units.
//!
function BaseUnit(__name, __Nr, __Me, __Ra, __Df, __Re, __Hp, __Th, __specials)
{
   // Copy parameters to data members
   this.name = __name || "";
   this.max_Nr = __Nr || 0;
   this.Me = __Me || 0;
   this.Ra = __Ra || 0;
   this.Df = __Df || 0;
   this.Df_Ra = __Df || 0;
   this.Re = __Re || 0;
   this.Hp = __Hp || 0;
   this.Th = __Th || 0;
   this.Th_Ra = __Th || 0;
   this.Tb = 0;
   this.specials = new String(__specials || "");
}


BaseUnit.prototype = new BaseAttributes;      // Specify that class BaseUnit extends BaseAttributes


BaseUnit.prototype.copy = function()
{
   with (this)
   {
      var u = new BaseUnit(name, max_Nr, Me, Ra, Df, Re, Hp, Th, specials);
      u.Df_Ra = Df_Ra;
      u.Th_Ra = Th_Ra;
      u.Tb = Tb;
      return u;
   }
}


BaseUnit.prototype.string = function()
{
   with (this)
      return name + " " + stats();
}


BaseUnit.prototype.stats = function()
{
   with (this)
   {
      var str = max_Nr + "x " + Me + "-" + Ra + "-" + Df + "-" + Re + "-" + Hp
         + " (" + g_MoM.prec1(max_Nr * Hp) + ") " + format_modifier(Th) + "/" + format_modifier(Tb);
      return str + specials;
   }
}


//!
//! class Unit extends BaseUnit.
//!
function Unit(__baseunit)
{
   // Keep track of the copied base unit
   this.baseunit = __baseunit.copy();
   this.fixedunit = __baseunit.copy();
   this.bonuses = new BaseAttributes();
   this.penalties = new BaseAttributes();

   // Copy-construct the parent class BaseUnit
   this.reset();

   // Calculate dependent data members

   with (this)
   {
      this.level = 0;
      this.damage = 0;
      this.spells = new Object();
      this.items = new Object();
      this.other_effects = new Object();
      this.other_effects["extraMelee"] = 0;
      this.other_effects["extraRanged"] = 0;
      this.other_effects["extraDefense"] = 0;
      this.other_effects["extraResistance"] = 0;
      this.other_effects["extraHitpoints"] = 0;
      this.other_effects["extraToHitMelee"] = 0;
      this.other_effects["extraToHitRanged"] = 0;
      this.other_effects["extraToDefend"] = 0;
      this.other_effects["suppressionCounter"] = 0;

      var color = name.substr(0, name.indexOf(" "));
      if (color == "Hero" || name.indexOf("Incarnation") != -1) this.unit_type = "Hero";
      else if (color == "Arcane") this.unit_type = "Arcane";
      else if (color == "Black") this.unit_type = "Death";
      else if (color == "Blue") this.unit_type = "Sorcery";
      else if (color == "Green") this.unit_type = "Nature";
      else if (color == "Red") this.unit_type = "Chaos";
      else if (color == "White") this.unit_type = "Life";
      else this.unit_type = "Normal";

      this.weapon_type = 0;   // Unspecified weapon

      if (has("Arrows") || has("Bullets") || has("Rocks") || has("Thrown"))
         this.range_type = "Physical";
      else if (baseunit.Ra > 0)
         this.range_type = "Magical";
      else
         this.range_type = "None";

      if (has("Arrows") || has("Bullets") || has("Rocks") || has("Thrown"))
         this.range_color = "None";
      else if (has("Fire Breath") || has("Lightning") || has("Chaos Firebolt") || has("Chaos Lightning") || has("Chaos Drow") || has("Chaos Deathbolt"))
         this.range_color = "Chaos";
      else if (has("Nature Shimmer") || has("Nature Priest") || has("Nature Icebolt") || has("Nature Green"))
         this.range_color = "Nature";
      else if (has("Sorcery Illusion"))
         this.range_color = "Sorcery";
      else
         this.range_color = "None";
   }
}

Unit.prototype = new BaseUnit;      // Specify that class Unit extends BaseUnit

Unit.prototype.copy = function()
{
   with (this)
   {
      var u = new Unit(baseunit.copy());

      u.fixedunit = fixedunit.copy();
      u.bonuses = bonuses.copy();
      u.penalties = penalties.copy();

      u.special = new Object();
      for (var ability in special)
      {
         u.special[ability] = special[ability];
      }
      u.spells = new Object();
      for (var spell in spells)
      {
         u.spells[spell] = spells[spell];
      }
      u.items = new Object();
      for (var item in items)
      {
         u.items[item] = items[item];
      }
      u.other_effects = new Object();
      for (var other_effect in other_effects)
      {
         u.other_effects[other_effect] = other_effects[other_effect];
      }

      u.level = level;
      u.damage = damage;
      u.unit_type = unit_type;
      u.weapon_type = weapon_type;
      u.range_type = range_type;
      u.range_color = range_color;

      return u;
   }
}


Unit.prototype.total_hp = function()
{
   with (this)
      return (max_Nr * Hp - damage);
}


Unit.prototype.cur_Nr = function()
{
   // Basically the nr of figures is the total_hp divided by the figure_hp rounded upward
   // However, if a figures has between 0 and 1 hitpoints left, the chance that he is still
   // standing equals the fraction of a hitpoint he has left.

   with (this)
   {
      if (Hp <= 0)
         return 0;

      var nr_full_figures = Math.floor(total_hp() / Hp);
      var hp_last_figure = total_hp() - nr_full_figures * Hp;

      if (hp_last_figure >= 1) return nr_full_figures + 1;
      else return nr_full_figures + hp_last_figure;
   }
}


Unit.prototype.has = function(ability)
{
   if (g_MoM.g_debug && !g_MoM.ability_exists(ability)) alert("Ability " + ability + " is not valid");

   if (this.special[ ability ] != null)   return true;
   if (this.items[ ability ] != null && ability != "Lightning")     return true;
   
   // Items that behave the same as an ability
   if (ability == "Dispel Evil"     && this.item_power("Holy Avenger"))  return true;
   if (ability == "Illusion"        && this.item_power("Phantasmal"))    return true;
   if (ability == "Life Steal"      && this.item_power("Vampiric"))      return true;
   if (ability == "Stoning Touch"   && this.item_power("Stoning"))       return true;
   
   return false;
}


Unit.prototype.get_special = function(ability)
{
   if (g_MoM.g_debug && !g_MoM.ability_exists(ability)) alert("Ability " + ability + " is not valid");
   if (g_MoM.g_debug && !this.has(ability)) alert("Get '" + ability + "' failed");
  
   if (this.special[ ability ] != null)   return this.special[ ability ];
   if (this.items[ ability ] != null && ability != "Lightning")     return this.items[ ability ];
   
   // Items that behave the same as an ability
   if (ability == "Dispel Evil"     && this.items["Holy Avenger"])  return 0;
   if (ability == "Illusion"        && this.items["Phantasmal"])    return 0;
   if (ability == "Life Steal"      && this.items["Vampiric"])      return "-0";
   if (ability == "Stoning Touch"   && this.item_power("Stoning"))  return this.item_power("Stoning");
  
   return null;
}


Unit.prototype.set_special = function(ability, value)
{
   if (g_MoM.g_debug && !g_MoM.ability_exists(ability)) alert("Ability " + ability + " is not valid");
   if (g_MoM.g_debug && !this.has(ability)) alert("Set '" + ability + "' when not present yet");
   this.special[ ability ] = value || 0;
}


Unit.prototype.add_special = function(ability, value)
{
   if (g_MoM.g_debug && !g_MoM.ability_exists(ability)) alert("Ability " + ability + " is not valid");
   if (g_MoM.g_debug && this.has(ability) && this.get_special(ability)) alert("Add failed, '" + ability + "' with value already present");
   this.special[ ability ] = value || 0;
}


Unit.prototype.delete_special = function(ability, value)
{
   if (g_MoM.g_debug && !g_MoM.ability_exists(ability)) alert("Ability " + ability + " is not valid");
   delete this.special[ ability ];
}


Unit.prototype.get_suppressionCounter = function()
{
   return this.other_effects["suppressionCounter"];
}


Unit.prototype.set_suppressionCounter = function(value)
{
   this.other_effects["suppressionCounter"] = value || 0;
}


Unit.prototype.is_type = function(type)
{
   with (this)
   {
      if (type == "Normal") return (unit_type == "Normal" || unit_type == "Hero");
      if (type == "Hero") return (unit_type == "Hero");
      if (type == "Fantastic") return (unit_type == "Arcane" || unit_type == "Chaos" || unit_type == "Death"
                                    || unit_type == "Life" || unit_type == "Nature" || unit_type == "Sorcery");
      if (type == "Chaos") return (unit_type == "Chaos" || spell_active("Chaos Channel"));
      if (type == "Death") return (unit_type == "Death" || spell_active("Black Channels") || has("Undead"));
      return (unit_type == type);
   }
}


Unit.prototype.spell_active = function(spell)
{
   if (this.spells[ spell ] != null) return true;
   
   // Items that behave the same as a spell
   if (spell == "Bless" && this.item_power("Holy Avenger")) return true;

   return false;   
}


Unit.prototype.item_power = function(item)
{
   return this.items[ item ] != null;
}


Unit.prototype.item_attack = function(item)
{
   return this.items[ item ].attack;
}


Unit.prototype.item_tohit = function(item)
{
   return this.items[ item ].tohit;
}


Unit.prototype.stats = function()
{
   with (this)
   {
      var str = g_MoM.prec1(cur_Nr()) + "x " + Me + "-" + Ra + "-" + Df + "-" + Re + "-" + Hp
         + " (" + g_MoM.prec1(total_hp()) + ") " + g_MoM.format_modifier(Th) + "/" + g_MoM.format_modifier(Tb);
      var specials_str = "";
      for (var ability in special)
      {
         if (specials_str.length == 0)
         {
            specials_str += " ";
         }
         else
         {
            specials_str += ",";
         }
         specials_str += ability;
         if (get_special(ability) != 0)
         {
            specials_str += "/" + get_special(ability);
         }
      }
      return str + specials_str;
   }
}


Unit.prototype.reset = function()
{
   with (this)
   {
      name = baseunit.name;
      max_Nr = baseunit.max_Nr;
      Me = baseunit.Me;
      Ra = baseunit.Ra;
      Df = baseunit.Df;
      Df_Ra = baseunit.Df_Ra;
      Re = baseunit.Re;
      Hp = baseunit.Hp;
      Th = baseunit.Th;
      Th_Ra = baseunit.Th_Ra;
      Tb = baseunit.Tb;
      specials = baseunit.specials;

      fixedunit = baseunit.copy();
      bonuses = new BaseAttributes();
      penalties = new BaseAttributes();

      this.special = new Object();
      var ss = this.specials.split(", ");
      for (var i in ss)
      {
         var ability = ss[ i ];

         if (ability.length <= 0)
            continue;

         // Duplicate for occurrance of '/' in Immunity
         if (ability.substr(ability.length - 4) == " Imm")
         {
            var immunities = ability.substr(0, ability.length - 4).split("/");
            for (var j in immunities)
            {
               this.add_special(immunities[ j ] + " Imm");
            }
            continue;
         }

         // Extract 'x' super ability
         var super_ability;
         if (ability.length >= 2 && ability.substr(ability.length - 2) == " x")
         {
            super_ability = true;
            ability = ability.substr(0, ability.length - 2);
         }
         else
            super_ability = false;

         // Split leading number from ability
         var j, value = 0;
         for (j = 0; j < ability.length; ++j)
         {
            var chr = ability.substr(j, 1);
            if (!(chr >= "0" && chr <= "9"))
            {
               break;
            }
         }
         if (j > 0)
         {
            value = 1 * ability.substr(0, j);
            if (j < ability.length && ability.substr(j, 1) == " ")
            {
               ++j;
            }
            ability = ability.substr(j);
         }

         // Split trailing number from ability
         for (j = ability.length; j-- > 0;)
         {
            var chr = ability.substr(j, 1);
            if (!(chr >= "0" && chr <= "9") && chr != "+" && chr != "-")
            {
               break;
            }
         }
         if (j < ability.length - 1 && j > 1)
         {
            value = 1 * ability.substr(j + 1);
            if (ability.substr(j, 1) != "x" && ability.substr(j, 1) != " ")
            {
               ++j;
            }
            ability = ability.substr(0, j);
         }

         // Expand abbreviations
         if (g_MoM.g_abbrev[ability] != null)
         {
            ability = g_MoM.g_abbrev[ability];
         }

         if (super_ability)
         {
            this.add_special(ability + " x", value);
         }
         else
         {
            this.add_special(ability, value);
         }
      }

      // Check for unknown abilities
      if (g_MoM.g_debug)
      {
         var errors = "";
         for (var ability in this.special)
         {
            if (!g_MoM.ability_exists(ability))
               errors += "'" + ability + "' is not a known ability\n";
        }

         if (errors.length > 0)
            alert(errors);
      }
   }
}

Unit.prototype.can_damage = function(defender, attack_type)
{ 
   var attacker = this;
   var special = attack_type;
   
   if ((special == "Breath" || special == "Fire Breath") && attacker.has("Fire Breath") && !defender.has("Fire Imm"))
      return true;
   else if ((special == "Breath" || special == "Lightning") && attacker.has("Lightning") && !defender.has("Lightning Imm")) // Note: Lightning Imm does not exist
      return true;
   else if (special == "Breath")
      return false;
      
   else if ((special == "Gaze" || special == "Death Gaze") && attacker.has("Death Gaze") && !defender.has("Death Imm") && !defender.has("Magic Imm"))
      return true;
   else if ((special == "Gaze" || special == "Doom Gaze") && attacker.has("Doom Gaze"))
      return true;
   else if ((special == "Gaze" || special == "Stoning Gaze") && attacker.has("Stoning Gaze") && !defender.has("Stoning Imm") && !defender.has("Magic Imm"))
      return true;
   else if (special == "Gaze")
      return false;

   else if (special == "Immolation" && attacker.has(special) && !defender.has("Fire Imm") && !defender.has("Magic Imm"))
      return true;
      
   else if (special == "Life Steal" && attacker.has("Life Steal") && !defender.has("Death Imm") && !defender.has("Magic Imm"))
      return true;

   else if (special == "Melee")
      return true;

   else if (special == "Poison" && attacker.has(special) && !defender.has("Poison Imm"))
      return true;

   else if (special == "Thrown" && attacker.has(special))
      return true;

   else if ((special == "Touch" || special == "Stoning Touch") && attacker.has("Stoning Touch") && !defender.has("Stoning Imm") && !defender.has("Magic Imm"))
      return true;
      
   else
      return false;
}

Unit.prototype.apply_effects = function(enemy)
{
   this.apply_level(this.level);
   this.apply_abilities();
   this.apply_weapon_type(this.weapon_type);
   this.apply_other_effects();
   this.apply_item_effects(enemy);
   this.apply_spell_effects(enemy);
   this.apply_final_effects(enemy);
}


Unit.prototype.apply_level = function(__level)
{
   this.level = 1 * __level;

   var up = new BaseAttributes();

   if (this.is_type("Hero"))
   {
      switch (this.level)
      {
         default:
         case 0:
         case 1: break;
         case 2: if (this.baseunit.Me) up.Me = +1; if (this.baseunit.Ra) up.Ra = +1; up.Df = +1; up.Re = +1; up.Hp = +1; break;
         case 3: if (this.baseunit.Me) up.Me = +2; if (this.baseunit.Ra) up.Ra = +2; up.Df = +1; up.Re = +2; up.Hp = +2; up.Th = +1; break;
         case 4: if (this.baseunit.Me) up.Me = +3; if (this.baseunit.Ra) up.Ra = +3; up.Df = +2; up.Re = +3; up.Hp = +3; up.Th = +1; break;
         case 5: if (this.baseunit.Me) up.Me = +4; if (this.baseunit.Ra) up.Ra = +4; up.Df = +2; up.Re = +4; up.Hp = +4; up.Th = +1; break;
         case 6: if (this.baseunit.Me) up.Me = +5; if (this.baseunit.Ra) up.Ra = +5; up.Df = +3; up.Re = +5; up.Hp = +5; up.Th = +2; break;
         case 7: if (this.baseunit.Me) up.Me = +6; if (this.baseunit.Ra) up.Ra = +6; up.Df = +3; up.Re = +6; up.Hp = +6; up.Th = +2; break;
         case 8: if (this.baseunit.Me) up.Me = +7; if (this.baseunit.Ra) up.Ra = +7; up.Df = +4; up.Re = +7; up.Hp = +7; up.Th = +2; break;
         case 9: if (this.baseunit.Me) up.Me = +8; if (this.baseunit.Ra) up.Ra = +8; up.Df = +4; up.Re = +8; up.Hp = +8; up.Th = +3; break;
      }
      up.Df_Ra = up.Df;
      up.Th_Ra = up.Th;
      
      // Add level bonus where appropriate
      this.add_bonus(up);
      this.fixedunit.add_bonus(up);
   }
   else if (this.is_type("Normal"))
   {
      switch (this.level)
      {
         default:
         case 0:
         case 1: break;
         case 2: if (this.baseunit.Me) up.Me = +1; if (this.baseunit.Ra) up.Ra = +1; up.Re = +1; break;
         case 3: if (this.baseunit.Me) up.Me = +1; if (this.baseunit.Ra) up.Ra = +1; up.Df = +1; up.Re = +2; break;
         case 4: if (this.baseunit.Me) up.Me = +2; if (this.baseunit.Ra) up.Ra = +2; up.Df = +1; up.Re = +3; up.Hp = +1; up.Th = +1; break;
         case 5: if (this.baseunit.Me) up.Me = +2; if (this.baseunit.Ra) up.Ra = +2; up.Df = +2; up.Re = +4; up.Hp = +1; up.Th = +2; break;
         case 6: if (this.baseunit.Me) up.Me = +3; if (this.baseunit.Ra) up.Ra = +3; up.Df = +2; up.Re = +5; up.Hp = +2; up.Th = +3; break;
      }
      up.Df_Ra = up.Df;
      up.Th_Ra = up.Th;
      
      // Add level bonus where appropriate
      this.add_bonus(up);
      this.fixedunit.add_bonus(up);
   }
   else // Fantastic
   {
      switch (this.level)
      {
         default:
         case 0:
         case 1: break; // Normal
         case 2: if (this.baseunit.Me) up.Me = +2; if (this.baseunit.Ra) up.Ra = +2; up.Df = +2; up.Re = +2; break;   // Node
      }
      up.Df_Ra = up.Df;
      up.Th_Ra = up.Th;
      
      // Add level bonus where appropriate
      this.add_bonus(up);
      this.bonuses.add_bonus(up);
   }
}


//!
//! Applies hero abilities.
//! Note: most regular abilities of units are implicit, so they are not applied here.
//!
Unit.prototype.apply_abilities = function()
{
   with (this)
   {
      var up = new BaseAttributes();
      var up_gold = new BaseAttributes();
      var bonus;
      var holy_bonus = 0;
      var prayer_bonus = 0;

      // Hero specific
      if (has("Agility"))        { up.Df += bonus = level; up.Df_Ra += bonus; set_special("Agility", bonus); }
      if (has("Agility x"))      { up.Df += bonus = Math.floor(level * 3 / 2); up.Df_Ra += bonus; set_special("Agility x", bonus); }
      if (has("Arcane Power"))   { if (Ra) up.Ra += bonus = level; set_special("Arcane Power", bonus); }
      if (has("Arcane Power x")) { if (Ra) up.Ra += bonus = Math.floor(level * 3 / 2); set_special("Arcane Power x", bonus); }
      if (has("Armsmaster"))     { bonus = 2 * level; set_special("Armsmaster", bonus); }
      if (has("Armsmaster x"))   { bonus = Math.floor(2 * level * 3 / 2); set_special("Armsmaster x", bonus); }
      if (has("Blademaster"))    { up.Th += bonus = Math.floor(level / 2); up.Th_Ra += bonus; set_special("Blademaster", bonus); }
      if (has("Blademaster x"))  { up.Th += bonus = Math.floor(level * 3 / 4); up.Th_Ra += bonus; set_special("Blademaster x", bonus); }
      if (has("Caster") && is_type("Hero")) { bonus = Math.floor(Math.ceil(get_special("Caster") / 2.5 + 0.1) * 2.5 * level + 0.1); set_special("Caster", bonus); }
      if (has("Charmed"))        { up_gold.Re += 30; }
      if (has("Constitution"))   { up.Hp += bonus = level; set_special("Constitution", bonus); }
      if (has("Constitution x")) { up.Hp += bonus = Math.floor(level * 3 / 2); set_special("Constitution", bonus); }
      if (has("Leadership"))     { if (Me) up.Me += bonus = Math.floor(level / 3); if (Ra && !has("Spell") && !has("Caster")) up.Ra += Math.Floor(bonus / 2); set_special("Leadership", bonus); }
      if (has("Leadership x"))   { if (Me) up.Me += bonus = Math.floor(level / 2); if (Ra && !has("Spell") && !has("Caster")) up.Ra += Math.Floor(bonus / 2); set_special("Leadership x", bonus); }

      if (has("Legendary"))      { bonus = 3 * level; set_special("Legendary", bonus); }
      if (has("Legendary x"))    { bonus = Math.floor(3 * level * 3 / 2); set_special("Legendary x", bonus); }
      if (has("Lucky"))          { up.Th += +1; up.Th_Ra += +1; up.Tb += +1; up.Re += +1; }
      if (has("Might"))          { if (Me) up.Me += bonus = level; set_special("Might", bonus); }
      if (has("Might x"))        { if (Me) up.Me += bonus = Math.floor(level * 3 / 2); set_special("Might x", bonus); }
      if (has("Noble"))          ;
      if (has("Prayermaster"))   { bonus = level; set_special("Prayermaster", bonus); prayer_bonus = Math.max(prayer_bonus, bonus); }
      if (has("Prayermaster x")) { bonus = Math.floor(level * 3 / 2); set_special("Prayermaster x", bonus); prayer_bonus = Math.max(prayer_bonus, bonus); }
      if (has("Sage"))           { bonus = 3 * level; set_special("Sage", bonus); }
      if (has("Sage x"))         { bonus = Math.floor(3 * level * 3 / 2); set_special("Sage x", bonus); }

      // Unit specific
      if (has("Holy Bonus"))     { bonus = get_special("Holy Bonus"); if (Me) up_gold.Me += bonus; 
                                   up_gold.Df += bonus; up.Df_Ra += bonus; up_gold.Re += bonus; }
      if (has("Immolation"))     { set_special("Immolation", 4); }
      if (has("Resistance to All")) { bonus = get_special("Resistance to All"); prayer_bonus = Math.max(prayer_bonus, bonus); }
      if (has("Large Shield"))   { up.Df_Ra += 2; }
      
      // Process prayer_bonus (highest applies)
      up_gold.Re += prayer_bonus;

      // Add hero ability bonus where appropriate
      this.add_bonus(up);
      this.add_bonus(up_gold);
      this.fixedunit.add_bonus(up);
      this.bonuses.add_bonus(up_gold);
   }
}


Unit.prototype.apply_weapon_type = function(__weapon_type)
{
   with (this)
   {
      weapon_type = 1 * __weapon_type;

      var up = new BaseAttributes();

      switch (weapon_type)
      {
         default:
         case 0:  // Unknown
         case 1:  // Normal
            break;
         case 2:  // Magic
            if (Me) this.add_special("Magic Weapon");
            up.Th = +1;
            if (Ra && range_type == "Physical") up.Th_Ra = +1;
            break;
         case 3:  // Mithril
            if (Me) this.add_special("Magic Weapon");
            if (Me) up.Me = +1;
            up.Df = +1
            up.Th = +1;
            if (Ra && range_type == "Physical") up.Th_Ra = +1;
            if (Ra && range_type == "Physical") up.Ra = +1;
            break;
         case 4:  // Adamantium
            if (Me) this.add_special("Magic Weapon");
            if (Me) up.Me = +2;
            up.Df = +2; 
            up.Th = +1;
            if (Ra && range_type == "Physical") up.Th_Ra = +1;
            if (Ra && range_type == "Physical") up.Ra = +2;
            break;
      }
      
      up.Df_Ra = up.Df;

      // Add weapon bonus where appropriate
      this.add_bonus(up);
      this.bonuses.add_bonus(up);
   }
}


Unit.prototype.apply_other_effects = function()
{
   with (this)
   {
      var up = new BaseAttributes();
      var dn = new BaseAttributes();
      
      if (other_effects["extraMelee"] >= 0)
      {
         up.Me += other_effects["extraMelee"];
      }   	
      else
      {
         dn.Me += - other_effects["extraMelee"];
      }
      
      if (other_effects["extraRanged"] >= 0)
      {
         up.Ra += other_effects["extraRanged"];
      }   	
      else
      {
         dn.Ra += - other_effects["extraRanged"];
      }
      
      if (other_effects["extraDefense"] >= 0)
      {
         up.Df += other_effects["extraDefense"];
         up.Df_Ra += other_effects["extraDefense"];
      }   	
      else
      {
         dn.Df += - other_effects["extraDefense"];
         dn.Df_Ra += - other_effects["extraDefense"];
      }
      
      if (other_effects["extraResistance"] >= 0)
      {
         up.Re += other_effects["extraResistance"];
      }   	
      else
      {
         dn.Re += - other_effects["extraResistance"];
      }
      
      if (other_effects["extraHitpoints"] >= 0)
      {
         up.Hp += other_effects["extraHitpoints"];
      }   	
      else
      {
         dn.Hp += - other_effects["extraHitpoints"];
      }
      
      if (other_effects["extraToHitMelee"] >= 0)
      {
         up.Th += other_effects["extraToHitMelee"];
      }   	
      else
      {
         dn.Th += - other_effects["extraToHitMelee"];
      }
      
      if (other_effects["extraToHitRanged"] >= 0)
      {
         up.Th_Ra += other_effects["extraToHitRanged"];
      }   	
      else
      {
         dn.Th_Ra += - other_effects["extraToHitRanged"];
      }
      
      if (other_effects["extraToDefend"] >= 0)
      {
         up.Tb += other_effects["extraToDefend"];
      }   	
      else
      {
         dn.Tb += - other_effects["extraToDefend"];
      }
      
      // Apply modifiers where appropriate
      this.add_bonus(up);
      this.sub_penalty(dn);
      this.bonuses.add_bonus(up);
      this.penalties.add_bonus(dn);
   }
}


Unit.prototype.apply_item_effects = function(enemy)
{
   with (this)
   {
      var up_gold = new BaseAttributes();
      var dn_gold = new BaseAttributes();
      
      var melee_weapons = {"Sword": 0, "Mace": 0, "Axe": 0};
      for (var weapon in melee_weapons)
      {
         if (item_power(weapon))
         {
            up_gold.Me += item_attack(weapon);
            up_gold.Th += item_tohit(weapon);
            if (item_power("Flaming"))
            {
               up_gold.Me += 3;
            }
         }
      }
      
      var ranged_weapons = {"Axe": 0, "Bow": 0, "Wand": 0, "Staff": 0};
      for (var weapon in ranged_weapons)
      {
         if (weapon == "Axe" && item_power(weapon) && has("Thrown"))
         {
            up_gold.Ra += item_attack(weapon);
            up_gold.Th_Ra += item_tohit(weapon);
            if (item_power("Flaming"))
            {
               up_gold.Ra += 3;
            }
            if (item_power("Giant Strength"))
            {
               // TODO: Giant Strength is not in the list yet and clashes with the unit enchantment
               up_gold.Ra += 1;
            }
         }
         if (weapon == "Bow" && item_power(weapon) && (has("Arrows") || has("Bullets"))
            || (weapon == "Wand" || weapon == "Staff") && item_power(weapon) && range_type == "Magical")
         {
            up_gold.Ra += item_attack(weapon);
            up_gold.Th_Ra += item_tohit(weapon);
            if (item_power("Flaming"))
            {
               up_gold.Ra += 3;
            }
         }
      }

      // Shield
      if (item_power("Shield"))
      {
         up_gold.Df_Ra += 2;
      }
      // Chain Mail
      if (item_power("Chain Mail"))
      {
         up_gold.Df += 1;
         up_gold.Df_Ra += 1;
      }
      // Plate Mail
      if (item_power("Plate Mail"))
      {
         up_gold.Df += 2;
         up_gold.Df_Ra += 2;
      }
      // Jewelry: regular bonuses
      if (item_power("Jewelry"))
      {
         up_gold.Me += item_attack("Jewelry");
         up_gold.Th += item_tohit("Jewelry");
      }
      if (item_power("Jewelry") && baseunit.Ra > 0)
      {
         up_gold.Ra += item_attack("Jewelry");
         up_gold.Th_Ra += item_tohit("Jewelry");
      }

      // g_items["Power Drain"]     = 0;     // No effect
      // g_items["Chaos"]           = 0.5;   // Half damage
      // TODO: Chaos
      // TODO: Lightning is NOT Lightning Breath (and it is duplicated)
      // TODO: Maintain choices
      
      this.add_bonus(up_gold);
      this.sub_penalty(dn_gold);
      this.bonuses.add_bonus(up_gold);
      this.penalties.add_bonus(dn_gold);
  }
}


Unit.prototype.apply_spell_effects = function(enemy)
{
   // Effects taken from [Manual]
   with (this)
   {
      var up = new BaseAttributes();
      var dn = new BaseAttributes();

      //
      // First process spells on which other spells may depend (such as unit_type)
      //

      if (spell_active("Black Channels"))
      {
         if (baseunit.Me) up.Me += +3; if (baseunit.Ra) up.Ra += +1; up.Hp += +1; up.Re += +1; up.Df += +1; up.Df_Ra += +1;
         add_special("Undead");
      }
      
      if (spell_active("Chaos Channel"))
      {
         switch (1 * spells[ "Chaos Channel" ])
         {
            case 1:  up.Df += +2; up.Df_Ra += +2; break;
            case 2:  if (!has("Flying"))
                        add_special("Flying", 2);
                     else if (get_special("Flying") < 2)
                        set_special("Flying", 2);
                     break;
            case 3:  if (!has("Fire Breath"))
                        add_special("Fire Breath", 2);
                     else if (get_special("Fire Breath") < 2)
                        set_special("Fire Breath", 2);
                     break;
         }
      }

      //
      // Process the regular spells
      //

      // "Berserk" is processed last (after other effects on Me and Df)
      
      // "Black Channels" is processed earlier (before other effects depending on unit_type)
      
      if (spell_active("Black Prayer"))
      {
         if (baseunit.Me) dn.Me += +1; dn.Df += +1; dn.Df_Ra += +1; dn.Re += +2;
      }
      
      // "Black Sleep" is processed last (after other effects on Me/Ra/Df/Re)
      
      if (spell_active("Bless") || item_power("Holy Avenger"))
      {
         // [Manual] says Df/Re+2, but [Game] and [Strategy Guide] say Df/Re+3.
         // Df/Re only against R&G Melee, All Breath, R&G Magic Ranged, R&G Spells
         if (enemy && (enemy.is_type("Death") || enemy.is_type("Chaos")))
         {
           up.Df += +3;
         }
         if (enemy && (enemy.range_color == "Death" || enemy.range_color == "Chaos"))
         {
            up.Df_Ra += +3;
         }
         if (enemy && (enemy.has("Life Steal") || enemy.has("Death Touch") || enemy.has("Death Gaze")))
         {
            if (enemy.has("Stoning Gaze") || enemy.has("Poison"))
            {
               // Exclude Chaos Spawn with its Stoning Gaze and Poison, since this bonus does not apply then
            }
            else
            {
               up.Re += +3;
            }
         }
      }
      
      // "Blur" is processed last (after possible True Sight)
      
      // "Chaos Channel" is processed earlier (before other effects depending on unit_type)
      
      if ((spell_active("Chaos Surge") || enemy && enemy.spell_active("Chaos Surge")) && is_type("Chaos"))
      {
         if (baseunit.Me) up.Me += +2; if (baseunit.Ra) up.Ra += +2; 
         // [Strategy Guide]
         up.Df += +2; up.Df_Ra += +2;
      }
      
      if (spell_active("Charm of Life"))
      {
         up.Hp += +Math.max(1, Math.floor(Hp / 4));
      }
      
      if (spell_active("Cloak of Fear"))
      {
         // Each turn each opposing unit must resist (Re +1) or cower in fear (cannot attack, but can still counter)
      }
      
      if (spell_active("Darkness") || enemy && enemy.spell_active("Darkness"))
      {
         if (is_type("Death"))
         {
            if (baseunit.Me) up.Me += +1; up.Df += +1; up.Df_Ra += +1; up.Re += +1;
         }
         else if (is_type("Life"))
         {
            if (baseunit.Me) dn.Me += +1; dn.Df += +1; dn.Df_Ra += +1; dn.Re += +1;
         }
      }
      
      if (spell_active("Eldritch Weapon"))
      {
         if (Me) add_special("Magic Weapon");      // Can hit creatures with Weapon Immunity
      }
      if (enemy && enemy.spell_active("Eldritch Weapon"))
      {
         dn.Tb += +1;                              // The To-Block (Tb) of the enemy is reduced by 1   
      }

      if (spell_active("Elemental Armor"))
      {
         // Df/Re only against All Breath, R&G Magic Ranged, R&G Spells
         if (enemy && (enemy.is_type("Chaos") || enemy.is_type("Nature")))
         {
           up.Df += +10;
         }
         if (enemy && (enemy.range_color == "Chaos" || enemy.range_color == "Nature"))
         {
            up.Df_Ra += +10;
         }
         if (enemy && (enemy.has("Stoning Touch") || enemy.has("Stoning Gaze")))
         {
            if (enemy.has("Death Gaze") || enemy.has("Poison"))
            {
               // Exclude Chaos Spawn with its Death Gaze and Poison, since this bonus does not apply then
            }
            else
            {
               up.Re += +10;
            }
         }
      }
      
      if (spell_active("Flame Blade"))
      {
         if (baseunit.Me) up.Me += +2; if (baseunit.Ra && range_type == "Physical" && !has("Rocks")) up.Ra += +2;
         if (Me) add_special("Magic Weapon");      // Can hit creatures with Weapon Immunity
      }
      
      if (spell_active("Flight") && !has("Flying"))
      {
         add_special("Flying", 0);                 // ??? amount = landbased move + 1
      }
      
      if (spell_active("Giant Strength"))
      {
         if (baseunit.Me) up.Me += +1; if (has("Thrown")) up.Ra += +1;
      }
      
      if (spell_active("Guardian Wind"))
      {
         add_special("Missile Imm");
      }
      
      // "Haste" is processed last (after other effects on Me and Ra)
      
      if (spell_active("High Prayer"))
      {
         if (baseunit.Me) up.Me += +2; up.Df += +2; up.Df_Ra += +2; up.Re += +3; up.Th += +1; up.Th_Ra += +1; up.Tb += +1;
      }
      
      if (spell_active("Holy Armor"))
      {
         up.Df += +2; up.Df_Ra += +2;
      }
      
      if (spell_active("Holy Weapon"))
      {
         if (Me) add_special("Magic Weapon");      // Can hit creatures with Weapon Immunity
         up.Th += +1;
         if (Ra && range_type == "Physical") up.Th_Ra += +1;
      }
      
      if (spell_active("Immolation"))
      {
         if (has("Immolation"))
            set_special("Immolation", Math.max(get_special("Immolation"), 4));
         else
            add_special("Immolation", 4);
      }
      
      if (spell_active("Invisibility"))
      {
         add_special("Invisibility");
      }
      
      // Actual effect of "Invisibility" is processed last (after possible True Sight)
      
      if (spell_active("Invulnerability"))
      {
         add_special("Weapon Imm");
      }
      
      if (spell_active("Iron Skin"))
      {
         up.Df += +5; up.Df_Ra += +5;
      }
      
      if (spell_active("Lion Heart"))
      {
         // [Manual] says Me/Ra/Hp/Re +2, but [Game] shows Me/Ra/Hp/Re +3.
         if (baseunit.Me) up.Me += +3; if (baseunit.Ra && range_type == "Physical") up.Ra += +3; up.Hp += +3; up.Re += +3;
      }
      
      if (spell_active("Magic Immunity"))
      {
         add_special("Magic Imm");
      }
      
      if (spell_active("Metal Fires"))
      {
         if (this.is_type("Normal") && !spell_active("Flame Blade"))
         {
            if (baseunit.Me) up.Me += +1; if (baseunit.Ra && range_type == "Physical" && !has("Rocks")) up.Ra += +1;
            if (Me) add_special("Magic Weapon");      // Can hit creatures with Weapon Immunity
         }
      }
      
      if (spell_active("Prayer"))
      {
         // Verified 2010-11-13 with [Tweaker] that Prayer and High Prayer do not stack
         if (!spell_active("High Prayer"))
         {
            up.Th += +1; up.Th_Ra += +1; up.Tb += +1; up.Re += +1;
         }
      }
      
      if (spell_active("Regeneration"))
      {
         add_special("Regeneration");
      }
      
      if (spell_active("Resist Elements"))
      {
         if (!spell_active("Elemental Armor"))
         {
            // Df/Re only against All Breath, R&G Magic Ranged, R&G Spells
            if (enemy && (enemy.is_type("Chaos") || enemy.is_type("Nature")))
            {
              up.Df += +3;
            }
            if (enemy && (enemy.range_color == "Chaos" || enemy.range_color == "Nature"))
            {
               up.Df_Ra += +3;
            }
            if (enemy && (enemy.has("Stoning Touch") || enemy.has("Stoning Gaze")))
            {
               if (enemy.has("Death Gaze") || enemy.has("Poison"))
               {
                  // Exclude Chaos Spawn with its Death Gaze and Poison, since this bonus does not apply then
               }
               else
               {
                  up.Re += +3;
               }
            }
         }
      }
      
      if (spell_active("Resist Magic"))
      {
         up.Re += +5;
      }
      
      if (spell_active("Righteousness"))
      {
         // Df/Re only against All Breath, B&R Magic Ranged, B&R Spells
         // Df = (50), Re += 30
         
         // Handled during actual attack
         //if (enemy && (enemy.is_type("Death") || enemy.is_type("Chaos")))
         //{
         //  up.Df += +3;
         //}
         //if (enemy && (enemy.range_color == "Death" || enemy.range_color == "Chaos"))
         //{
         //   up.Df_Ra += +3;
         //}
         if (enemy && (enemy.has("Life Steal") || enemy.has("Death Touch") || enemy.has("Death Gaze")))
         {
            if (enemy.has("Stoning Gaze") || enemy.has("Poison"))
            {
               // Exclude Chaos Spawn with its Stoning Gaze and Poison, since this bonus does not apply then
            }
            else
            {
               up.Re += +30;
            }
         }
      }
      
      // "Shatter" is processed last (after other effects on Me/Ra/Df/Re)
      
      if (spell_active("Stone Skin"))
      {
         up.Df += +1; up.Df_Ra += +1;
      }
      
      if (spell_active("Terror"))
      {
         // Each turn the unit must resist (Re +1) or cower in fear (cannot attack, but can still counter)
      }
      
      if (spell_active("True Light") || enemy && enemy.spell_active("True Light"))
      {
         if (is_type("Life"))
         {
            if (baseunit.Me) up.Me += +1; up.Df += +1; up.Df_Ra += +1; up.Re += +1;
         }
         else if (is_type("Death"))
         {
            if (baseunit.Me) dn.Me += +1; dn.Df += +1; dn.Df_Ra += +1; dn.Re += +1;
         }
      }
      
      if (spell_active("True Sight"))
      {
         add_special("Illusion Imm");
      }
      
      if (spell_active("Vertigo"))
      {
         dn.Th += +2;
         dn.Th_Ra += +2;
         dn.Df += +1;
      }
      
      // "Warp Creature" is processed last (after other effects on Me/Ra/Df/Re)
      
      if (spell_active("Warp Reality") || enemy && enemy.spell_active("Warp Reality"))
      {
         if (!is_type("Chaos")) { dn.Th += +2; dn.Th_Ra += +2; }
      }
      
      if (spell_active("Warp Wood"))
      {
         if (has("Arrows")) set_special("Arrows", 0);
         if (has("Bullets")) set_special("Bullets", 0);
      }
      
      if (spell_active("Weakness"))
      {
         if (baseunit.Me) dn.Me += +2; if (baseunit.Ra && range_type == "Physical" && !has("Rocks")) dn.Ra += +2;
      }
      
      // "Web" is processed last (after Flight and Wraith Form)
      
      if (spell_active("Wrack"))
      {
         // each enemy figure resists or loses 1 hp per turn
      }
      
      if (spell_active("Wraith Form"))
      {
         add_special("Weapon Imm");
         add_special("Non Corporeal");
      }


      //
      // Process the spells last that must be processed after other spells
      //

      if (spell_active("Berserk"))
      {
         up.Me += Me; dn.Df += Df; dn.Df_Ra += Df;
      }
      
      if (spell_active("Black Sleep"))
      {
         // Chance to resist initially.
         // Me, Ra, Df are effective reduced to zero.
         dn.Me = Me + up.Me;
         dn.Ra = Ra + up.Ra;
         dn.Df = Df + up.Df;
         dn.Df_Ra = Df_Ra + up.Df_Ra;
      }
      
      if (enemy && enemy.spell_active("Blur") && !has("Illusion Imm"))
      {
         // TODO: Proper processing: ignore 10% of hits or something like that
         dn.Th += +1;
         dn.Th_Ra += +1;
      }
      
      // Not a spell, but treat it as such anyway
      if (enemy && enemy.has("Dispel Evil"))
      {
         if (has("Undead"))                              dn.Re += 9;
         else if (is_type("Chaos") || is_type("Death"))  dn.Re += 4;
      }

      if (spell_active("Haste"))
      {
         if (baseunit.Me) up.Me += Me; if (baseunit.Ra) up.Ra += Ra; 
      }
      
      if (enemy && enemy.has("Invisibility") && !has("Illusion Imm"))
      {
         dn.Th += +1;
         dn.Th_Ra += +1;
      }
      
      if (spell_active("Shatter"))
      {
         // Resist or Me=Ra=1
         dn.Me = Math.max(0, Me + up.Me - 1);
         dn.Ra = Math.max(0, Ra + up.Ra - 1);
      }
      
      if (spell_active("Warp Creature"))
      {
         // Resist at -1 or (Me/2 or Df/2 or Re=0)
         switch (1 * spells[ "Warp Creature" ])
         {
            case 1: dn.Me += Math.ceil(Me / 2); break;
            case 2: dn.Df += Math.ceil(Df / 2); dn.Df_Ra += Math.ceil(Df_Ra / 2); break;
            case 3: dn.Re += Re; break;
         }
      }
      
      if (spell_active("Web"))
      {
         // Web does not work on Non Corporeal creatures, and can not Web a unit while a previous Web still present
         if (!has("Non Corporeal") && !has("Web"))
         {
            // The web (Df 0) must be destroyed by full combined melee and magic ranged attacks,
            // before the unit can move again.
            // The unit can no longer fly for the remainder of the combat
            add_special("Web", 12);
            delete_special("Flying");
         }
      }

      // Apply spell modifiers where appropriate
      this.add_bonus(up);
      this.sub_penalty(dn);
      this.bonuses.add_bonus(up);
      this.penalties.add_bonus(dn);
   }
}


Unit.prototype.apply_final_effects = function(enemy)
{
   with (this)
   {
      //! Abilities that raise or lower to a specific value
      
      var new_Me = Me;
      var new_Ra = Ra;
      var new_Df = Df;
      var new_Df_Ra = Df_Ra;
      var new_Th = Th;
      var new_Th_Ra = Th_Ra;
      
      //! Armor piercing
      if (enemy && (enemy.has("Armor Piercing")
                 || enemy.item_power("Lightning") && (enemy.item_power("Sword") || enemy.item_power("Mace") || enemy.item_power("Axe"))
                   ))
      {
         new_Df = Math.floor(Df / 2);
      }
      if (enemy && (enemy.has("Armor Piercing") 
                 || enemy.has("Lightning")            // Sky drake
                 || enemy.has("Chaos Lightning")      // Storm Giant, Chaos Warrior
                 || enemy.item_power("Lightning") && (enemy.item_power("Bow") || enemy.item_power("Staff") || enemy.item_power("Wand") || enemy.item_power("Axe"))
                   ))
      {
         new_Df_Ra = Math.floor(Df_Ra / 2);
      }
      
      //! Immunities
      
      var raise_shields_melee = 0;
      var raise_shields_ranged = 0;

      if (enemy && enemy.range_type == "Magical")
      {
         if (has("Magic Imm"))                                       raise_shields_ranged = 50;
         if (has("Fire Imm") && (enemy.range_color == "Chaos"))      raise_shields_ranged = 50;
         if (has("Death Imm") && (enemy.range_color == "Death"))     raise_shields_ranged = 50;
         if (has("Nature Imm") && (enemy.range_color == "Nature"))   raise_shields_ranged = 50;
         if (has("Cold Imm") && enemy.has("Nature Icebolt"))         raise_shields_ranged = 50;
         if (has("Righteousness") && (enemy.range_color == "Chaos" || enemy.range_color == "Death")) raise_shields_ranged = 50;
      }
      
      if (enemy && (enemy.has("Arrows") || enemy.has("Bullets")))
      {
         if (has("Missile Imm"))                                     raise_shields_ranged = 50;
      }
      
      // Note: Weapon Imm overrules Missile Imm, which is consistent with the game
      if (enemy && (enemy.range_type == "Physical") && (enemy.is_type("Normal")) && !enemy.has("Magic Weapon"))
      {
         if (has("Weapon Imm"))                                      raise_shields_ranged = 10;
      }
     
      if (enemy && (enemy.is_type("Normal")) && !enemy.has("Magic Weapon"))
      {
         if (has("Weapon Imm"))                                      raise_shields_melee = 10;
      }
     
      if (new_Df < raise_shields_melee)
      {
         new_Df = raise_shields_melee;
      }
      if (new_Df_Ra < raise_shields_ranged)
      {
         new_Df_Ra = raise_shields_ranged;
      }
      
      //! Reduce Df to 0 for an opponent of an Illusion (apply last)
      if (enemy && enemy.has("Illusion") && !has("Illusion Imm"))
      {
         new_Df = 0;
         new_Df_Ra = 0;
      }
      if (enemy && enemy.item_power("Chaos") && (enemy.item_power("Sword") || enemy.item_power("Mace") || enemy.item_power("Axe")))
      {
         new_Df = 0;
      }
      if (enemy && enemy.item_power("Chaos") && (enemy.item_power("Bow") || enemy.item_power("Staff") || enemy.item_power("Wand") || enemy.item_power("Axe")))
      {
         new_Df_Ra = 0;
      }

      if (item_power("Chaos") && (item_power("Sword") || item_power("Mace") || item_power("Axe")))
      {
         new_Me = Math.floor(Me / 2);
         new_Th = +7;
      }
      if (item_power("Chaos") && (item_power("Bow") || item_power("Staff") || item_power("Wand") || item_power("Axe")))
      {
         new_Ra = Math.floor(Ra / 2);
         new_Th_Ra = +7;
      }
   
      // Apply modifiers where appropriate
      var up_gold = new BaseAttributes();
      var dn_gold = new BaseAttributes();
      
      if (new_Me > Me) 
         up_gold.Me = new_Me - Me;
      else
         dn_gold.Me = Me - new_Me;
         
      if (new_Ra > Ra) 
         up_gold.Ra = new_Ra - Ra;
      else
         dn_gold.Ra = Ra - new_Ra;
         
      if (new_Df > Df) 
         up_gold.Df = new_Df - Df;
      else
         dn_gold.Df = Df - new_Df;
         
      if (new_Df_Ra > Df_Ra) 
         up_gold.Df_Ra = new_Df_Ra - Df_Ra;
      else
         dn_gold.Df_Ra = Df_Ra - new_Df_Ra;
         
      if (new_Th > Th) 
         up_gold.Th = new_Th - Th;
      else
         dn_gold.Th = Th - new_Th;
         
      if (new_Th_Ra > Th_Ra) 
         up_gold.Th_Ra = new_Th_Ra - Th_Ra;
      else
         dn_gold.Th_Ra = Th_Ra - new_Th_Ra;
         
      this.add_bonus(up_gold);
      this.sub_penalty(dn_gold);
      this.bonuses.add_bonus(up_gold);
      this.penalties.add_bonus(dn_gold);

      // Register ranged attribute for the abilities depending on it
      if (this.has("Thrown")) this.set_special("Thrown", this.Ra);
      if (!this.spell_active("Chaos Channel") || 1 * this.spells[ "Chaos Channel" ] != 3)
      {
         if (this.has("Fire Breath")) this.set_special("Fire Breath", this.Ra);
      }
      if (this.has("Lightning")) this.set_special("Lightning", this.Ra);
      if (this.has("Doom Gaze")) this.set_special("Doom Gaze", this.Ra);
   }
}

//
// Class Logger
//
// PURPOSE: Keep track of a log-string in a way it can be passed to functions.
//       Note that if a String is passed to a function and is appended to,
//       the changes are not returned.
//
function Logger()
{
   this.str = "";
}

console.log("load MoM_unit.js complete");