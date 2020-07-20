console.log("load MoM_display.js");

function write_strength(unit, strength, image)
{
   var html = '';
   if (image != null)
   {
      // calculate number of normal, lost_normal, gold, and lost_gold icons
      var normal, lost_normal, gold, lost_gold;
      if (unit.bonuses[strength] >= unit.penalties[strength])
      {
         // Bonus at least as large as the penalty - only lost gold
         normal = unit.fixedunit[strength];
         lost_normal = 0;
         gold = unit.bonuses[strength] - unit.penalties[strength];
         lost_gold = unit.penalties[strength];
      }
      else if (unit.fixedunit[strength] + unit.bonuses[strength] >= unit.penalties[strength])
      {
         // More penalty than bonus, but the total is not negative - lost gold and lost normal
         normal = unit[strength];
         lost_normal = unit.penalties[strength] - unit.bonuses[strength];
         gold = 0;
         lost_gold = unit.bonuses[strength];
      }
      else 
      {
         // More penalty than strength - truncate to zero with lost normal and lost gold
         normal = 0;
         lost_normal = unit.fixedunit[strength];
         gold = 0;
         lost_gold = unit.bonuses[strength];
      }

      var i, col = 0;
      var style_spacer = "class=spacer_left ";
      for (i = 0; i < normal; ++i, ++col)
      {
         if (col > 0 && col % 15 == 0) html += "<br />\n";
         html += "<img ";
         if (col > 0 && col % 5 == 0) html += style_spacer;
         html += "src=\"" + ImageManager.getImage("images/" + image + "_normal.gif") + "\" alt=\"N\">\n";
      }
      for (i = 0; i < lost_normal; ++i, ++col)
      {
         if (col > 0 && col % 15 == 0) html += "<br />\n";
         html += "<img ";
         if (col > 0 && col % 5 == 0) html += style_spacer;
         html += "src=\"" + ImageManager.getImage("images/" + image + "_normal_lost.gif") + "\" alt=\"n\">\n";
      }
      for (i = 0; i < gold; ++i, ++col)
      {
         if (col > 0 && col % 15 == 0) html += "<br />\n";
         html += "<img ";
         if (col > 0 && col % 5 == 0) html += style_spacer;
         html += "src=\"" + ImageManager.getImage("images/" + image + "_gold.gif") + "\" alt=\"G\">\n";
      }
      for (i = 0; i < lost_gold; ++i, ++col)
      {
         if (col > 0 && col % 15 == 0) html += "<br />\n";
         html += "<img ";
         if (col > 0 && col % 5 == 0) html += style_spacer;
         html += "src=\"" + ImageManager.getImage("images/" + image + "_gold_lost.gif") + "\" alt=\"g\">\n";
      }
   }
   html += "\n";
   
   return html;
}



function createUnitHtml(u) {
      var html = '';

      html += '<table class="Unit" border="5">\n';
      html += "\n";
      html += "  <tr>\n";
      html += "    <td>\n";
      html += "      <table><tr><td>" + g_MoM.prec1(u.cur_Nr()) + "</td></tr></table>\n";
      html += "    </td>\n";
      html += "    <td>\n";
      html += "      <table><tr><td>" + u.name.bold() + "</td></tr></table>\n";
      html += "    </td>\n";
      html += "  </tr>\n";
      html += "\n";
      html += "  <tr>\n";
      html += "    <td colspan=2>\n";
      html += "      <table>\n";

      var image = null;

      if (u.weapon_type == 4) image = "sword_adamantium";
      else if (u.weapon_type == 3) image = "sword_mithril";
      else if (u.weapon_type == 2 || u.has("Magic Weapon")) image = "sword_magic";
      else image = "sword";
      html += "<tr><td valign=top>Melee</td><td>\n"; html += write_strength(u, "Me", image); html += "</td></tr>\n";

      if (u.has("Arrows")) image = "bow";
      else if (u.has("Bullets")) image = "rock";
      else if (u.has("Rocks")) image = "rock";
      else if (u.has("Spell") || u.has("Caster")) image = "fireball";
      else image = null;
      html += "<tr><td valign=top>Ranged</td><td>\n"; html += write_strength(u, "Ra", image); html += "</td></tr>\n";

      if ((u.fixedunit.Df == u.fixedunit.Df_Ra) && (u.bonuses.Df == u.bonuses.Df_Ra) && (u.penalties.Df == u.penalties.Df_Ra))
      {
         html += "<tr><td valign=top>Armor</td><td>\n"; html += write_strength(u, "Df", "shield"); html += "</td></tr>\n";
      }
      else
      {
         html += "<tr><td valign=top>Armor Me</td><td>\n"; html += write_strength(u, "Df", "shield"); html += "</td></tr>\n";
         html += "<tr><td valign=top>Armor Ra</td><td>\n"; html += write_strength(u, "Df_Ra", "shield"); html += "</td></tr>\n";
      }
      html += "<tr><td valign=top>Resist</td><td>\n"; html += write_strength(u, "Re", "resistance"); html += "</td></tr>\n";
      html += "<tr><td valign=top>Hits</td><td>\n"; html += write_strength(u, "Hp", "heart"); html += "</td></tr>\n";
      
      if (u.other_effects["suppressionCounter"] > 0)
      {
         html += "<tr><td valign=top>Suppress</td><td>" + u.other_effects["suppressionCounter"] + "</td></tr>\n";
      }
      
      if (u.Me)
      {
         if (u.Th >= 0)
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Th) + " To Hit Melee</td></tr>\n";
         }
         else
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit_lost.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Th) + " To Hit Melee</td></tr>\n";
         }
      }
      if (u.Ra)
      {
         if (u.Th_Ra >= 0)
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Th_Ra) + " To Hit Ranged</td></tr>\n";
         }
         else
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit_lost.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Th_Ra) + " To Hit Ranged</td></tr>\n";
         }
      }
      if (u.Df)
      {
         if (u.Tb >= 0)
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Tb) + " To Defend</td></tr>\n";
         }
         else
         {
             html += "<tr><td valign=top><img src=\"" + ImageManager.getImage("images/tohit_lost.gif") + "\" alt=\"\"></td><td>"
                              + g_MoM.format_modifier(u.Tb) + " To Defend</td></tr>\n";
         }
      }
      
      html += "      </table>\n";
      html += "    </td>\n";
      html += "  </tr>\n";
      html += "\n";
      html += "  <tr>\n";
      html += "    <td colspan=2>\n";
      html += "      <table>\n";
      html += "        <colgroup><col width=0*><col width=*><col width=0*><col width=*></colgroup>\n";

      var col = 0, ncols = 2;
      for (var item in u.items)
      {
         if (col == 0) html += "<tr>\n";
         html += '<td><img style="max-width: 48px" src="' + ImageManager.getImage("items/" + item + ".gif") + "\" alt=\"\"></td><td>" + item;
         if (u.get_special(item) != 0)
            html += " " + u.get_special(item);
         html += "</td>\n";
         if (col >= ncols - 1) html += "</tr>\n";
         col = (col + 1) % ncols;
      }
      for (var special in u.special)
      {
         // Super ability'x'
         var special_html = special;
         if (special.length >= 2 && special.substr(special.length - 2) == " x")
         {
            special_html = special.substr(0, special.length - 2) + "<sup>X</sup>";
         }

         if (col == 0) html += "<tr>\n";
         html += '<td><img style="max-width: 48px" src="' + ImageManager.getImage("abilities/" + special + ".gif") + "\" alt=\"\"></td><td>" + special_html;
         if (u.get_special(special) != 0)
            html += " " + u.get_special(special);
         html += "</td>\n";
         if (col >= ncols - 1) html += "</tr>\n";
         col = (col + 1) % ncols;
      }
      for (var spell in u.spells)
      {
         if (col == 0) html += "<tr>\n";
         html += '<td><img style="max-width: 48px" src="' + ImageManager.getImage("spells/" + spell + ".gif") + "\" alt=\"\"></td><td>" + spell;
         if (u.spells[spell] != 0)
            html += " " + u.spells[spell];
         html += "</td>\n";
         if (col >= ncols - 1) html += "</tr>\n";
         col = (col + 1) % ncols;
      }
      html += "      </table>\n";
      html += "    </td>\n";
      html += "  </tr>\n";
      html += "\n";
      html += "</table>\n";
	  
	  return html;
}