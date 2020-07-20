console.log("load MoM_combat.js");

//!
//! \mainpage DESCRIPTION
//!
//! This source is roughly divided into 5 sections:\n
//!    1. The html header.\n
//!    2. The global variables (prefixed with "g_").\n
//!    3. The classes with their implementation (BaseUnit and Unit).\n
//!    4. Auxiliary functions.\n
//!    5. Event handlers of the form OnButtonAttack()\n
//!    6. The html form and html trailer.\n
//!
//!
//! The global variable g_units[] contains all units.
//! The global variables g_attacker and g_defender contain the currently selected attacker and defender.
//!
//!
//! The function combat_round(attacker, defender) resolves 1 melee combat round. That is:\n
//!   1. Pre-melee: Attacker executes Breath, Thrown, and Gaze attacks.\n
//!   2. Pre-melee: Defender executes Gaze attacks.\n
//!   3. Pre-melee: Resolve casualties\n
//!   4. Melee: Attacker executes Immolation, Poison, Touch, and Melee attacks\n
//!   5. First Strike: Resolve casualties if attacker has (unnegated) First Strike\n
//!   6. Melee: Defender executes Immolation, Poison, Touch, and Melee attacks\n
//!   7. Melee: Resolve casualties\n
//!
//! The function shoot_round(attacker, defender, distance) resolves 1 ranged attack.
//!
//!
//! The eventhandler OnLoad() initializes the form
//!
//!
//! JAVASCRIPT RELATED ISSUES:
//!
//! How can I create MoM-style look-and-feel:
//!   Backgrounds, Buttons, Borders, Cursors, ...
//!

function MoM()
{
	// Import globals
	var globals = new MoM_global();
	for (var key in globals) {
		this[key] = globals[key];
	}
}

//
// LIBRARY FUNCTIONS (sorted alphabetically)
//


//! Calculates the mean of an array and optionally the standard deviation.
//! \param a      The array with values.
//! \param n      The number of elements in the array.
//! \param stdev  An Object that receives the standard deviation, if it is not null.
//! \return       The mean of the array.
MoM.prototype.calc_mean_stdev = function(a, n, stdev)
{
   var mean = NaN;
   if (n > 0)
   {
      var i, sum;
      for (i = sum = 0; i < n; ++i)
      {
         sum += a[i];
      }
      mean = sum / n;
   }
   if (stdev != null)
   {
      stdev.value = Infinity;
      if (n > 1)
      {
         for (i = sum = 0; i < n; ++i)
         {
            var dif = a[i] - mean;
            sum += dif * dif;
         }
         stdev.value = Math.sqrt(sum / (n - 1));
      }
   }
   return mean;
}


//! Calculates the expectation of an array with probabilities and optionally the standard deviation.
//! \param a      The array with probabilities. The index is the corresponding value.
//! \param n      The number of elements in the array.
//! \param stdev  An Object that receives the standard deviation, if it is not null.
//! \return       The expected value.
MoM.prototype.calc_expected_mean_stdev = function(a, n, stdev)
{
   var mean = NaN;
   if (n > 0)
   {
      var i, sum, tot;
      for (i = sum = tot = 0; i < n; ++i)
      {
         tot += a[i];
         sum += a[i] * i;
      }
      if (tot > 0)
      {
         mean = sum / tot;
      }
   }
   if (stdev != null)
   {
      stdev.value = Infinity;
      if (n > 1 && mean != NaN)
      {
         var i, sum, tot;
         for (i = sum = tot = 0; i < n; ++i)
         {
            var dif = i - mean;
            tot += a[i];
            sum += a[i] * dif * dif;
         }
         if (sum >= 0 && tot > 0)
         {
            stdev.value = Math.sqrt(sum / tot);
         }
      }
   }
   return mean;
}


//! Returns a dice roll between 1 and n.
MoM.prototype.dice = function(n)
{
   return Math.ceil(Math.random() * n);
}


//! Returns a string in which the argument is formatted as a modifier (e.g. +1,-2,+0)
MoM.prototype.format_modifier = function(modifier)
{
   if (modifier >= 0) return ("+" + modifier);
   return ("" + modifier);
}


//! Returns the argument v rounded to within 1 digit after the decimal point.
MoM.prototype.prec1 = function(v)
{
   // Format the number v to have 1 digit max after the decimal point.
   return Math.round(v * 10) / 10;
}

/*
// RANDOM begin
// The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
// See:  http://www.msc.cornell.edu/~houle/javascript/randomizer.html

rnd.today=new Date();
rnd.seed=rnd.today.getTime();

function rnd() {
        rnd.seed = (rnd.seed*9301+49297) % 233280;
        return rnd.seed/(233280.0);
};

function rand(number) {
        return Math.ceil(rnd()*number);
};

// RANDOM end
*/

//! Returns the number val rounded to have a limited number of digits after the decimal point.
//! \param val       The number to be rounded.
//! \param decimals  The number of digits after the decimal point.
//!                  This may also be a negative number, in which case the number is rounded so that is ends in zeroes. 
MoM.prototype.round = function(val, decimals)
{
   // Format the number v to have a maximum of 'decimals' digits max after the decimal point.
   var divider = 1;
   for (; decimals < 0; decimals++, divider /= 10.) {};
   for (; decimals > 0; decimals--, divider *= 10) {};
   return Math.round(val * divider) / divider;
}


//
// PROJECT SPECIFIC FUNCTIONS
//


//! Make a verbose log of a string into a separate window, which is created if it did not exist.
MoM.prototype.verbose_log = function(str)
{
   with (this)
   {
      if (g_window_verbose == null || g_window_verbose.closed)
         g_window_verbose = window.open("", "", "");
      g_window_verbose.document.writeln(str);
   }
}


//! Calculates the expected damage if a unit attacks another unit.
//! \param att_N  number of figures that attack
//! \param A      attack strength (melee or ranged)
//! \param Th     to-hit bonus
//! \param def_max_N maximum number of figures in the defending unit
//! \param Df     defense (shields)
//! \param Hp     hitpoints of 1 defending figure
//! \param Tb     to-block bonus
//! \param old_damage   the amount of damage the unit has already sustained
//! \param ignore_damage   the amount of damage each figure of the unit will ignore (for the spell Invulnerability)
//! \param[out] distr  An Object that receives the probabilities for each damage amount, if it is not null.
//! \return         Expected amount of damage
MoM.prototype.expected_dam = function(att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage, distr)
{ with (this) {
   if (g_verbose) verbose_log("expected_dam: (att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage) = " + att_N + ", " + A + ", " + Th + ", " + def_max_N + ", " + Df + ", " + Hp + ", " + Tb + ", " + round(old_damage, 3) + ", " + ignore_damage + "<br>");
   switch (1 * g_method)
   {
      default:
      case 0:
      case 1:
         if (distr == null)
         {
            return att_N * expected_dam_per_figure(A, Th, Df, Tb, ignore_damage);
         }
         else
         {
            return expected_dam_per_unit(att_N, A, Th, Df, Tb, ignore_damage, distr);
         }

      case 2:
         return simulate_dam(att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage, g_verbose);

      case 3:
         return monte_carlo_dam(g_nr_simulations, 10, att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage);
   }
}}


//! Calculates the expected damage if 1 figure of a unit attacks 1 figure of another unit.
//!
//! \param A        Attack (melee or ranged)
//! \param Th       To-hit bonus
//! \param D        Defense
//! \param Tb       To-block bonus
//! \param ignore_damage The amount of damage each figure of the unit will ignore (for the spell Invulnerability)
//! \param[out] distr Array of possible damages specifying the chance (if param not null)
//! \return         Expected amount of damage
//!
//! To find the expected amount of damage, we need to combine each number of possible hits with each number of possible blocks.
//! In each case the damage is the number of hits minus the number of blocks, but at least zero.
//! We get the expected amount of damage by multiplying the chance on each case by the amount of damage, and summing it all.
//! The following formula sums it up:
//! \image html Expected_damage.jpg
//!
//! The chance on a certain number of hits is given by:
//! \image html P_hits.jpg
//!
//! and the chance on a certain number of blocks is given by:
//! \image html P_blocks.jpg
MoM.prototype.expected_dam_per_figure = function(A, Th, D, Tb, ignore_damage, distr)
{ with (this) {
   //! ph       chance to hit (base 30% plus 10% for each to-hit bonus point)
   //! pb       chance to block (base 30% plus 10% for each to-block bonus point)
   //! ph10     chance to hit times 10
   //! pb10     chance to block times 10
   //! EDD      Expected Damage Done
   //! P_hits   chance to hit 'hits' times = (ph10/10.)^hits
   //! P_blocks change to block 'blocks' times = (pb10/10.)^blocks

   //! \verbatim
   //!         A       D              A      hits           A-hits           D         blocks           D-blocks
   //! EDD =  SUM     SUM      binom(    ) ph     * (1 - ph)       * binom(      ) * pb       * (1 - ph)         * max(hits - blocks, 0)
   //!       hits=0 blocks=0         hits                                  blocks
   //! \endverbatim
   //!

   // Min 0% and max 100%
   Th = Math.max(-3, Math.min(7, Th));
   Tb = Math.max(-3, Math.min(7, Tb));

   if (g_verbose) verbose_log("Figure: (A, Th, D, Tb) = " + A + ", " + Th + ", " + D + ", " + Tb + "<br>");
   var ph10 = 3 + Th, pb10 = 3 + Tb;
   var EDD = 0, hits, P_hits, blocks, P_blocks;

   if (g_verbose) verbose_log("<table border=1 cellspacing=0><tr><th>hits<th>P_hits<th>blocks<th>P_blocks<th>damage");
   for (hits = 0, P_hits = Math.pow((10 - ph10) / 10., A)
      ; hits <= A
      ;)
   {
      var expectation_hits = 0;
      var max_blocks = Math.min(D, hits + ignore_damage - 1);
      for (blocks = 0, P_blocks = Math.pow((10 - pb10) / 10., D)
         ; blocks <= max_blocks
         ;)
      {
         var damage = Math.max(0, hits - blocks - ignore_damage)
         if (damage > 0)
         {
            expectation_hits += P_blocks * damage;
            if (distr != null)
            {
               if (distr[damage] == null)
               {
                  distr[damage] = 0.0;
               }
               distr[damage] += P_hits * P_blocks;
            }
            if (g_verbose) verbose_log("<tr><td>" + hits + "<td>" + round(P_hits,3) + "<td>" + blocks + "<td>" + round(P_blocks,3) + "<td>" + (hits - blocks));
         }

         if (pb10 >= 10)
         {
            ++blocks;
            P_blocks = (blocks < max_blocks ? 0 : 1);
         }
         else
         {
            P_blocks *= (D - blocks) / (blocks + 1) * pb10 / (10 - pb10);
            ++blocks;
         }
      }
      EDD += P_hits * expectation_hits;
      if (g_verbose) verbose_log("<tr><td>" + hits + "<td>" + round(P_hits,3) + "<td><td><td>" + round(expectation_hits, 3));

      if (ph10 >= 10)
      {
         ++hits;
         P_hits = (hits < A ? 0 : 1);
      }
      else
      {
         P_hits *= (A - hits) / (hits + 1) * ph10 / (10 - ph10);
         ++hits;
      }
   }
   
   if (g_verbose) verbose_log("</table>");
   if (g_verbose) verbose_log("Figure: Expected damage = " + round(EDD, 3) + "<br>");

   if (distr != null)
   {
      var damage;
      var pdam0 = 1.0;
      for (damage = 1; damage < distr.length; ++damage)
      {
         pdam0 -= distr[damage];
      }
      distr[0] = pdam0;
      
      if (g_verbose) 
      {
         verbose_log("Figure damage distribution:");
         verbose_log("<table border=1 cellspacing=0><tr><th>dam<th>probability");
         for (damage = 0; damage < distr.length; ++damage)
         {
            verbose_log("<tr><td>" + damage + "<td>" + round(distr[damage], 3));
         }
         verbose_log("</table>");

         var stdev = new Object;
         var mean = calc_expected_mean_stdev(distr, distr.length, stdev);
         verbose_log("Figure: Expected damage = " + round(mean, 3) + " with stdev = " + round(stdev.value, 3) + "<br>");
      }
   }
   
   return EDD;
}}


//! Calculates the expected damage if a unit attacks 1 figure of another unit.
//! \param N        Number of attacking figures
//! \param A        Attack (melee or ranged)
//! \param Th       To-hit bonus
//! \param D        Defense
//! \param Tb       To-block bonus
//! \param ignore_damage The amount of damage each figure of the unit will ignore (for the spell Invulnerability)
//! \param[out] distr Array of possible damages specifying the chance
//! \return         Expected amount of damage
MoM.prototype.expected_dam_per_unit = function(N, A, Th, D, Tb, ignore_damage, distr)
{ with (this) {

   if (distr == null)
      return 0.0;
      
   var cum_distr = new Array();
   cum_distr[0] = 1.0;
   
   //! EDD      Expected Damage Done
   var fig_distr = new Array();
   expected_dam_per_figure(A, Th, D, Tb, ignore_damage, fig_distr);

   var n;
   for (n = 0; n < N; ++n)
   {
      var new_cum_distr = new Array();
      var cum_dam;
      for (cum_dam = 0; cum_dam < cum_distr.length; ++cum_dam)
      {
         var fig_dam;
         for (fig_dam = 0; fig_dam < fig_distr.length; ++fig_dam)
         {
            if (new_cum_distr[cum_dam + fig_dam] == null)
            {
               new_cum_distr[cum_dam + fig_dam] = 0.0;
            }
            new_cum_distr[cum_dam + fig_dam] += cum_distr[cum_dam] * fig_distr[fig_dam];
         }
      }
      cum_distr = new_cum_distr;
   }
   
   for (n = 0; n < cum_distr.length; ++n)
   {
      distr[n] = cum_distr[n];
   }

   var stdev = new Object;
   var EDD = calc_expected_mean_stdev(cum_distr, cum_distr.length, stdev);
   
   if (g_verbose) 
   {
      verbose_log("Unit cumulative damage distribution:");
      verbose_log("<table border=1 cellspacing=0><tr><th>dam<th>probability");
      for (damage = 0; damage < distr.length; ++damage)
      {
         verbose_log("<tr><td>" + damage + "<td>" + round(distr[damage], 3));
      }
      verbose_log("</table>");
      verbose_log("Unit: Expected damage = " + round(EDD, 3) + " with stdev = " + round(stdev.value, 3) + "<br>");
   }

   return EDD;
}}


//! Simulate an attack of one unit against another.
//! Recipe taken from [Strategy Guide].
MoM.prototype.simulate_dam = function(att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage, verbose)
{ with (this) {
   var def_total_Hp = def_max_N * Hp - old_damage;
   var def_N = Math.ceil(def_total_Hp / Hp);
   var Hp1 = def_total_Hp - (def_N - 1) * Hp;

   // Min 0% and max 100%
   Th = Math.max(-3, Math.min(7, Th));
   Tb = Math.max(-3, Math.min(7, Tb));

   if (verbose) verbose_log("Sim: (att_N, A, Th, def_N, Df, Hp1, Hp, Tb) = " + att_N + "," + A + "," + Th + "," + def_N + "," + Df + "," + Hp1 + "," + Hp + "," + Tb + "<br>");

   var damage = 0;
   var fig_attack, roll;

   if (verbose) verbose_log("<table border=1 cellspacing=0><tr><th>fig<th>raw<th>blocks<th>damage<th>Hp1");

   // For each attacking figure
   var fig_attack = 0;
next_attacker:
   while (fig_attack < att_N)
   {
      ++fig_attack;

      // Roll raw hits for the attacking figure
      var raw_hits = 0;
      for (roll = 0; roll < A; ++roll)
         if (dice(10) <= 3 + Th)
            ++raw_hits;
      if (verbose) verbose_log("<tr><td>" + fig_attack + "<td>" + raw_hits);

      // While there are still defenders standing
      while (def_N > 0)
      {
         // Roll blocks for the first defending figure
         var blocks = 0;
         for (roll = 0; roll < Df; ++roll)
            if (dice(10) <= 3 + Tb)
               ++blocks;
         blocks += ignore_damage;
         if (verbose) verbose_log("<td>" + blocks);

         // If all raw hits were blocked
         if (raw_hits <= blocks)
         {
            if (verbose) verbose_log("<td>0" + "<td>" + prec1(Hp1));
            // Continue with the next attacking figure
            continue next_attacker;
         }

         // If the penetrating hits did not kill the defending figure
         var penetrating_hits = raw_hits - blocks;
         if (verbose) verbose_log("<td>" + penetrating_hits + "<td>" + prec1(Hp1));
         if (penetrating_hits < Hp1)
         {
            // Process the damage
            damage += penetrating_hits
            Hp1 -= penetrating_hits;
            // Continue with the next attacking figure
            continue next_attacker;
         }

         // First figure was killed - process the damage
         damage += Hp1;
         --def_N;
         raw_hits -= (blocks + Hp1);

         // Continue the attack on the next defending figure
         Hp1 = Hp;
         if (verbose) verbose_log("<tr><td><td>" + raw_hits);
      }

      // All defending figures are dead
      // Process remaining damage
      damage += raw_hits;
      if (verbose) verbose_log("<td><td><td>");
      // Continue with the next attacking figure
   }
   if (verbose) verbose_log("</table>");
   if (verbose) verbose_log("Sim: Simulated damage = " + damage + "<br>");

   return damage;
}}


//! Monte Carlo simulation of the attack of one unit against another.
MoM.prototype.monte_carlo_dam = function(nr_simulations, nr_sub_simulations, att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage)
{ with (this) {
   if (g_verbose) verbose_log("MonteCarlo: N=" + nr_simulations + " subN=" + nr_sub_simulations + " (att_N x A / Th, def_max_N x Df / Hp / Tb ( old_damage)) = " + att_N + "x" + A + "/" + format_modifier(Th) + "," + def_max_N + "x" + Df + "/" + Hp + "/" + format_modifier(Tb) + "(" + old_damage + ")<br>");

   var simulation_nr;
   var aDamage = new Array(nr_simulations);
   for (simulation_nr = 0; simulation_nr < nr_simulations; ++simulation_nr)
   {
      aDamage[simulation_nr] = simulate_dam(att_N, A, Th, def_max_N, Df, Hp, Tb, old_damage, ignore_damage, false);
   }

   if (g_verbose)
   {
      var sub_N = Math.floor(nr_simulations / nr_sub_simulations);
      var aMean = new Array(sub_N);
      for (sub_nr = 0; sub_nr < nr_sub_simulations; ++sub_nr)
      {
         var aDamageSub = new Array(sub_N);
         for (i = 0; i < sub_N; ++i)
            aDamageSub[i] = aDamage[sub_nr * sub_N + i];
         aMean[sub_nr] = calc_mean_stdev(aDamageSub, sub_N);
      }
      var stdev_mean = new Object;
      var stdev = new Object;
      calc_mean_stdev(aMean, nr_sub_simulations, stdev_mean);
      var mean = calc_mean_stdev(aDamage, nr_sub_simulations * sub_N, stdev);
      if (g_verbose)
      {
         verbose_log("Monte Carlo: Mean damage = " + round(mean, 3)
                   + ", stdev_mean = " + round(stdev_mean.value, 3)
                   + ", stdev = " + round(stdev.value, 3) + "<br>");
      }
      return mean;
   }
   else
   {
      return calc_mean_stdev(aDamage, nr_simulations);
   }
}}


MoM.prototype.expected_resistable_kills = function(NrDef, Re)
{ with (this) {
   if (Re >= 10) return 0;
   if (Re < 0) Re = 0;
   // Each figure must resist separately or be killed
   return NrDef * (10 - Re) / 10.;
}}


MoM.prototype.expected_lifesteal_dam = function(NrAtt, Re)
{ with (this) {
   if (Re >= 10) return 0;
   if (Re < 0) Re = 0;
   // Defending unit loses a heart for each point the die roll is above the resistance
   // Each attacking figures has a life steal attack (TODO: check)
   return NrAtt * (11 - Re) * (10 - Re) / 20.;
}}


MoM.prototype.expected_poison_dam = function(Nr, Poison, Re)
{ with (this) {
   if (Re >= 10) return 0;
   if (Re < 0) Re = 0;
   // Defending unit loses a hitpoint for each Poison attack that is not resisted
   // Each attacking figure has a poison attack (TODO: check)
   return Nr * Poison * (10 - Re) / 10.;
}}


MoM.prototype.expected_hp_from_Life_Steal = function(EDD)
{ with (this) {
   // Life Steal heals for half of the damage rounded down [Manual]
   // Life Steal heals for all damage done [Strategy Guide]
   return EDD;
}}


MoM.prototype.find_unit = function(key)
{ with (this) {
   // Return a copy of a unit identified by key.
   // Or return null if no such unit exists.
   if (1 * key < 0 || 1 * key >= g_units.length)
      return null;
   return g_units[ 1 * key ].copy();
}}


MoM.prototype.life_steal_applicable = function(attacker, defender)
{ with (this) {
   return attacker.has("Life Steal") && !defender.has("Death Imm") && !defender.has("Magic Imm");
}}


MoM.prototype.special_attack = function(attacker, defender, special, o)
{ with (this) {
   // Handled here: Breaths, Gazes, Immolation, Life Steal, Poison, Thrown, Touch, Melee
   // Not handled here: First Strike, Ranged
   var EDD = 0;
   var EDD_tmp;

   var ignore_damage = 0;
   if (defender.spell_active("Invulnerability") && attacker.can_damage(defender, special))
   {
      ignore_damage = 2;
      o.str += "Invulnerability ignores the first " + ignore_damage + " points of damage\n";
   }

   if (special == "Breath")
   {
      if (attacker.has("Fire Breath"))
      {
         EDD_tmp = expected_dam(attacker.cur_Nr(), attacker.get_special("Fire Breath"), attacker.Th_Ra, defender.max_Nr, defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage);
         EDD += EDD_tmp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Fire Breath " + attacker.get_special("Fire Breath") + " for " + prec1(EDD_tmp) + " damage\n";
      }
      if (attacker.has("Lightning"))
      {
         EDD += EDD_tmp = expected_dam(attacker.cur_Nr(), attacker.get_special("Lightning"), attacker.Th_Ra, defender.max_Nr, 
                                       defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage);
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Lightning " + attacker.get_special("Lightning") + " for " + prec1(EDD_tmp) + " damage\n";
      }
   }
   else if (special == "Gaze")
   {
      if (attacker.has("Death Gaze") && !defender.has("Death Imm") && !defender.has("Magic Imm"))
      {
         var nr_kills = expected_resistable_kills(defender.cur_Nr(), defender.Re + attacker.get_special("Death Gaze"));
         EDD += EDD_tmp = nr_kills * defender.Hp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Death Gaze " + attacker.get_special("Death Gaze") + " for " + prec1(nr_kills) + " kills\n";
      }
      if (attacker.has("Doom Gaze"))
      {
         EDD += EDD_tmp = attacker.get_special("Doom Gaze");
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Doom Gaze " + attacker.get_special("Doom Gaze") + " for " + prec1(EDD_tmp) + " damage\n";
      }
      if (attacker.has("Stoning Gaze") && !defender.has("Stoning Imm") && !defender.has("Magic Imm"))
      {
         var nr_kills = expected_resistable_kills(defender.cur_Nr(), defender.Re + attacker.get_special("Stoning Gaze"));
         EDD += EDD_tmp = nr_kills * defender.Hp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Stoning Gaze " + attacker.get_special("Stoning Gaze") + " for " + prec1(nr_kills) + " kills\n";
      }
   }
   else if (special == "Immolation" && attacker.has(special))
   {
      EDD = expected_dam(attacker.cur_Nr(), attacker.get_special("Immolation"), attacker.Th_Ra, defender.max_Nr, defender.Df, defender.Hp, defender.Tb, defender.damage, ignore_damage);
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Immolation " + attacker.get_special("Immolation") + " for " + prec1(EDD) + " damage\n";
   }
   else if (special == "Life Steal" && life_steal_applicable(attacker, defender))
   {
      EDD = expected_lifesteal_dam(attacker.cur_Nr(), defender.Re + attacker.get_special("Life Steal"), ignore_damage);
      var heal_hp = expected_hp_from_Life_Steal(EDD);
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses " + special + " " + attacker.get_special(special) + " for " + prec1(EDD) + " damage and heals " + prec1(heal_hp) + " hitpoints\n";
   }
   else if (special == "Melee")
   {
      EDD = expected_dam(attacker.cur_Nr(), attacker.Me, attacker.Th, defender.max_Nr, defender.Df, defender.Hp, defender.Tb, defender.damage, ignore_damage);
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " attacks for " + prec1(EDD) + " damage\n";
   }
   else if (special == "Poison" && attacker.has(special) && !defender.has("Poison Imm"))
   {
      EDD = expected_poison_dam(attacker.cur_Nr(), attacker.get_special("Poison"), defender.Re, ignore_damage);
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Poison " + attacker.get_special("Poison") + " for " + prec1(EDD) + " damage\n";
   }
   else if (special == "Thrown" && attacker.has(special))
   {
      EDD = expected_dam(attacker.cur_Nr(), attacker.Ra, attacker.Th_Ra, defender.max_Nr, defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage);
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses " + special + " " + attacker.Ra + " for " + prec1(EDD) + " damage\n";
   }
   else if (special == "Touch")
   {
      if (attacker.has("Stoning Touch") && !defender.has("Stoning Imm") && !defender.has("Magic Imm"))
      {
         var nr_kills = expected_resistable_kills(defender.cur_Nr(), defender.Re + attacker.get_special("Stoning Touch"));
         EDD += nr_kills * defender.Hp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Stoning Touch " + attacker.get_special("Stoning Touch") + " for " + prec1(nr_kills) + " kills\n";
      }
   }

   return EDD;
}}


MoM.prototype.resolve_casualties = function(attacker, defender, EDD_att, EDD_def, o, distr_att)
{ with (this) {
   if (EDD_def != 0)
   {
      attacker.damage += EDD_def;
      if (attacker.damage < 0)
         attacker.damage = 0;
      o.str += "Unit of " + attacker.name + " has " + prec1(attacker.cur_Nr()) + " units left with a total of " + prec1(attacker.total_hp()) + " hp\n";
   }
   if (EDD_att != 0)
   {
      var kill_damage = defender.total_hp();
      defender.damage += EDD_att;
      if (defender.damage < 0)
         defender.damage = 0;
      o.str += "Unit of " + defender.name + " has " + prec1(defender.cur_Nr()) + " units left with a total of " + prec1(defender.total_hp()) + " hp\n";
      
      if (distr_att != null)
      {
         var kill_probability = 0;
         var damage;
         for (damage = Math.ceil(kill_damage); damage < distr_att.length; ++damage)
         {
            kill_probability += distr_att[damage];
         }
         if (kill_probability >= 0.0005)
         {
            o.str += "Chance to be killed was " + prec1(100 * kill_probability) + "% (experimental feature)\n";
         }
      }
   }
}}


//! \param attacker The attacker
//! \param defender The defender
MoM.prototype.combat_attack = function(attacker, defender)
{ with (this) {
   if (!attacker || !defender) return "";

   var o = new Logger();   // output string

   //! Check if attacker is alive
   if (attacker.total_hp() <= 0)
   {
      o.str += "Cannot attack since attacker is not alive. Attack aborted.\n";
      o.str += "\n";
      return o.str;
   }

   //! Check if the attacker is sleeping
   if (attacker.spell_active("Black Sleep"))
   {
      o.str += "Unit of " + attacker.name + " can not attack because it is asleep. Attack aborted.\n";
      o.str += "\n";
      return o.str;
   }

   //! Check if the attacker is allowed to attack a flying defender
   if (defender.has("Flying") && !attacker.has("Flying") && !attacker.has("Fire Breath") && !attacker.has("Lightning")
      && !attacker.has("Thrown") && !attacker.has("Death Gaze") && !attacker.has("Doom Gaze")
      && !attacker.has("Stoning Gaze"))
   {
      o.str += "Unit of " + attacker.name + " can not attack a flying unit. Attack aborted.\n";
      o.str += "\n";
      return o.str;
   }
   
   var orig_att_Df = attacker.Df, orig_def_Df = defender.Df;
   var orig_att_Df_Ra = attacker.Df_Ra, orig_def_Df_Ra = defender.Df_Ra;
   var orig_att_Th = attacker.Th, orig_def_Th = defender.Th;
   var orig_att_Th_Ra = attacker.Th_Ra, orig_def_Th_Ra = defender.Th_Ra;
   var orig_att_Tb = attacker.Tb, orig_def_Tb = defender.Tb;

   do // Single-iteration-loop to allow for a break followed by a centralized clean-up
   {
      var EDD, EDD_att, EDD_def;

      if (attacker.get_suppressionCounter() >= 2)
      {
         attacker.Th -= Math.floor(attacker.get_suppressionCounter() / 2);
         attacker.Th_Ra -= Math.floor(attacker.get_suppressionCounter() / 2);
         o.str += "Suppression reduces to hit melee/ranged of " + attacker.name
                  + " to " + format_modifier(attacker.Th) + "/" + format_modifier(attacker.Th_Ra) + "\n";
      }

      //! TODO: City wall

      //! TODO: Haste
      
      //! Pre-melee: attacker's Breaths, First Strike, Gazes, Thrown, defender's Gazes
      EDD_att = EDD_def = 0;

      EDD_att += special_attack(attacker, defender, "Breath", o);
      EDD_att += special_attack(attacker, defender, "Gaze", o);
      EDD_att += special_attack(attacker, defender, "Thrown", o);

      //! TODO: resolve_casualties???
      
      EDD_def += special_attack(defender, attacker, "Gaze", o);

      resolve_casualties(attacker, defender, EDD_att, EDD_def, o);

      //! End combat if anyone defeated
      if (attacker.total_hp() <= 0 || defender.total_hp() <= 0)
         break;
	 
      //! TODO: Wall of fire

      //! Attacker attacks with Immolation, Life Steal, Poison, Touch, and Melee
      EDD_att = EDD_def = 0;

      EDD_att += special_attack(attacker, defender, "Immolation", o);
      EDD_att += EDD = special_attack(attacker, defender, "Life Steal", o);
      EDD_def -= expected_hp_from_Life_Steal(EDD);
      EDD_att += special_attack(attacker, defender, "Poison", o);
      EDD_att += special_attack(attacker, defender, "Touch", o);
      //! TODO: Destruction
      EDD_att += special_attack(attacker, defender, "Melee", o);

      //! First Strike: resolve casualties
      if (attacker.has("First Strike") && !defender.has("Negate First Strike"))
      {
         resolve_casualties(attacker, defender, EDD_att, EDD_def, o);
         EDD_att = EDD_def = 0;

         // End combat if anyone defeated
         if (attacker.total_hp() <= 0 || defender.total_hp() <= 0)
            break;
      }

      //! Defender attacks with Immolation, Life Steal, Poison, Touch, and regular Melee

      EDD_att += special_attack(defender, attacker, "Immolation", o);
      EDD_def += EDD = special_attack(defender, attacker, "Life Steal", o);
      EDD_att -= expected_hp_from_Life_Steal(EDD);
      EDD_def += special_attack(defender, attacker, "Poison", o);
      EDD_def += special_attack(defender, attacker, "Touch", o);
      //! TODO: Destruction
      EDD_def += special_attack(defender, attacker, "Melee", o);

      resolve_casualties(attacker, defender, EDD_att, EDD_def, o);

   } while (0);   // Single-iteration-loop to allow for a break followed by a centralized clean-up

   //! Update suppressionCounter
//   defender.other_effects["suppressionCounter"]++;

   //! Clean up

   attacker.Df = orig_att_Df, defender.Df = orig_def_Df;
   attacker.Df_Ra = orig_att_Df_Ra, defender.Df_Ra = orig_def_Df_Ra;
   attacker.Th = orig_att_Th, defender.Th = orig_def_Th;
   attacker.Th_Ra = orig_att_Th_Ra, defender.Th_Ra = orig_def_Th_Ra;
   attacker.Tb = orig_att_Tb, defender.Tb = orig_def_Tb;

   o.str += "\n";

   return o.str;
}}


MoM.prototype.shoot_attack = function(attacker, defender, distance)
{ with (this) {
   if (!attacker || !defender) return "";

   var o = new Logger();        // output string
   var distr = new Array();     // track damage distribution
   var EDD = 0;
   var life_stolen = 0;
   var has_attacked = false;
   var EDD_tmp;

   //! Check if attacker is alive
   if (attacker.total_hp() <= 0)
   {
      o.str += "Cannot shoot since attacker is not alive. Attack aborted.\n";
      o.str += "\n";
      return o.str;
   }

   //! Check if the attacker is sleeping
   if (attacker.spell_active("Black Sleep"))
   {
      o.str += "Unit of " + attacker.name + " can not shoot because it is asleep. Attack aborted.\n";
      o.str += "\n";
      return o.str;
   }

   var distance_modifier = - Math.floor(distance / 3);
   if (attacker.has("Long Range"))
   {
      distance_modifier = Math.max(-1, distance_modifier);
   }

   // Chance to hit is always at least 10%, which maps to -2
   var Th_physical = Math.max(-2, attacker.Th_Ra + distance_modifier);
   var Th_magical = attacker.Th_Ra;

   var ignore_damage = 0;
   if (defender.spell_active("Invulnerability"))
   {
      ignore_damage = 2;
      o.str += "Invulnerability ignores the first " + ignore_damage + " points of damage\n";
   }

   if (attacker.get_suppressionCounter() >= 2)
   {
      Th_physical = Math.max(-2, Th_physical - Math.floor(attacker.get_suppressionCounter() / 2));
      Th_magical = Math.max(-2, Th_magical - Math.floor(attacker.get_suppressionCounter() / 2));
      o.str += "Suppression reduces to hit ranged physical/magical of " + attacker.name
               + " to " + format_modifier(Th_physical) + "/" + format_modifier(Th_magical) + "\n";
   }

   if (attacker.has("Arrows"))
   {
      if (attacker.get_special("Arrows") <= 0)
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " is out of ammo.\n";
      else if (defender.has("Missile Imm"))
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " can not shoot a unit with Missile Immunity\n";
      else
      {
         EDD = expected_dam(attacker.cur_Nr(), attacker.Ra, Th_physical, defender.max_Nr
                           , defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage, distr);
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " shoots " + defender.name 
               + " at " + distance + " squares with " + format_modifier(Th_physical) + " to hit for " + prec1(EDD) + " damage\n";
         attacker.set_special("Arrows", attacker.get_special("Arrows") - 1);
         has_attacked = true;
      }
   }
   else if (attacker.has("Bullets"))   // Halfling Slingers
   {
      if (attacker.get_special("Bullets") <= 0)
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " is out of ammo.\n";
      else if (defender.has("Missile Imm"))
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " can not shoot a unit with Missile Immunity\n";
      else
      {
         EDD = expected_dam(attacker.cur_Nr(), attacker.Ra, Th_physical, defender.max_Nr
                           , defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage, distr);
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " shoots " + defender.name 
               + " at " + distance + " squares with " + format_modifier(Th_physical) + " to hit for " + prec1(EDD) + " damage\n";
         attacker.set_special("Bullets", attacker.get_special("Bullets") - 1);
         has_attacked = true;
      }
   }
   else if (attacker.has("Rocks"))
   {
      if (attacker.get_special("Rocks") <= 0)
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " is out of ammo.\n";
      else
      {
         EDD = expected_dam(attacker.cur_Nr(), attacker.Ra, Th_physical, defender.max_Nr
                           , defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage, distr);
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " shoots " + defender.name 
               + " at " + distance + " squares with " + format_modifier(Th_physical) + " to hit for " + prec1(EDD) + " damage\n";
         attacker.set_special("Rocks", attacker.get_special("Rocks") - 1);
         has_attacked = true;
      }
   }
   else if (attacker.has("Spell"))
   {
      if (attacker.get_special("Spell") <= 0)
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " is out of ammo.\n";
      else if (defender.has("Magic Imm"))
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " can not magically attack a unit with Magic Immunity\n";
      else 
      {
         if (life_steal_applicable(attacker, defender)) // Demon Lord
         {
            EDD = expected_lifesteal_dam(attacker.cur_Nr(), defender.Re + attacker.get_special("Life Steal"));
            life_stolen = expected_hp_from_Life_Steal(EDD);
            o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Ranged Life Steal for " + prec1(EDD) + " damage and heals " + prec1(life_stolen) + " hitpoints\n";
            attacker.set_special("Spell", attacker.get_special("Spell") - 1);
         }

         EDD_tmp = expected_dam(attacker.cur_Nr(), attacker.Ra, Th_magical, defender.max_Nr
                           , defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage, distr);
         EDD += EDD_tmp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " magically attacks " + defender.name 
               + " with " + format_modifier(Th_magical) + " to hit for " + prec1(EDD_tmp) + " damage\n";
         attacker.set_special("Spell", attacker.get_special("Spell") - 1);
         has_attacked = true;
      }
   }
   else if (attacker.has("Caster") && attacker.Ra > 0)
   {
      if (attacker.get_special("Caster") <= 2)
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " is out of mana.\n";
      else if (defender.has("Magic Imm"))
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " can not magically attack a unit with Magic Immunity\n";
      else
      {
         if (life_steal_applicable(attacker, defender)) // Necromancer
         {
            EDD = expected_lifesteal_dam(attacker.cur_Nr(), defender.Re + attacker.get_special("Life Steal"));
            life_stolen = expected_hp_from_Life_Steal(EDD);
            o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " uses Ranged Life Steal for " + prec1(EDD) + " damage and heals " + prec1(life_stolen) + " hitpoints\n";
            attacker.set_special("Spell", attacker.get_special("Spell") - 1);
         }

         EDD_tmp = expected_dam(attacker.cur_Nr(), attacker.Ra, Th_magical, defender.max_Nr
                           , defender.Df_Ra, defender.Hp, defender.Tb, defender.damage, ignore_damage, distr);
         EDD += EDD_tmp;
         o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " magically attacks " + defender.name 
               + " with " + format_modifier(Th_magical) + " to hit for " + prec1(EDD_tmp) + " damage\n";
         attacker.set_special("Caster", attacker.get_special("Caster") - 3);
         has_attacked = true;
      }
   }
   else
   {
      o.str += "Unit of " + prec1(attacker.cur_Nr()) + " " + attacker.name + " can not shoot.\n";
   }

   if (has_attacked)
   {
//      defender.other_effects["suppressionCounter"]++;
   }

   resolve_casualties(attacker, defender, EDD, -life_stolen, o, distr);

   o.str += "\n";

   return o.str;
}}


//! \param attacker The attacker
//! \param defender The defender
MoM.prototype.combat_round = function(attacker, defender)
{ with (this) {
   if (!attacker || !defender) return "";

   /* 
   if (g_defender == attacker && g_defender.other_effects["suppressionCounter"] > 0)
   {
      g_defender.other_effects["suppressionCounter"] = g_attacker.other_effects["suppressionCounter"] = 0;
   }
   else if (g_defender == attacker && g_defender.other_effects["suppressionCounter"] <= 0 && g_attacker.other_effects["suppressionCounter"] >=2)
   {
      g_defender.other_effects["suppressionCounter"] = g_attacker.other_effects["suppressionCounter"] = 0;
   }
   else if (g_defender == defender && g_defender.other_effects["suppressionCounter"] >= 2)
   {
      g_defender.other_effects["suppressionCounter"] = g_attacker.other_effects["suppressionCounter"] = 0;
   }
   */
   
   var ostr = combat_attack(attacker, defender);
   
   return ostr;
}}


MoM.prototype.shoot_round = function(attacker, defender, distance)
{ with (this) {
   if (!attacker || !defender) return "";

   // g_defender.other_effects["suppressionCounter"] = g_attacker.other_effects["suppressionCounter"] = 0;
   
   var ostr = shoot_attack(attacker, defender, distance);
   
   return ostr;
}}


//! Calculated the result of a full combat between 2 units, exchanging blows starting with the attacker
//!
//! UNDER DEVELOPMENT!!!
//! 
//! \param attacker The attacker
//! \param defender The defender
MoM.prototype.full_combat = function(attacker, defender)
{ with (this) {
   if (!attacker || !defender) return "";

   var o = new Logger();   // output string

   var round_nr;
   for (round_nr = 1; round_nr <= 1; ++round_nr)
   {
//      o.str += combat_round(attacker, defender);
//      o.str += combat_round(defender, attacker);
      var distr = new Array();
      o.str += expected_dam_per_unit(3, 1, +0, 2, +0, 0, distr);
      var i;
      for (i = 0; i < distr.length; ++i)
      {
          o.str += "\n" + i + "\t" + distr[i];
      }

   }
   
   return o.str;
}}