/* Any JavaScript here will be loaded for all users on every page load. */

   var infotablespan = document.getElementById('infotablespan');
   infotablespan.innerHTML = '<table class="gradientable" width=600> \
 <tr class="firstrow" > \
  <td width=300 align=center style="padding:10px;"> \
   <span style="font-size:140%;">Attacker</span> \
  </td> \
  <td width=300 align=center style="padding:10px;"> \
   <span style="font-size:140%;">Defender</span> \
  </td> \
 </tr> \
 <tr> \
  <td colspan=2> \
   <table class="gradientable" style="border-collapse:collapse;" cellpadding=5 width=100% > \
    <tr> \
     <td width=25% > \
      <span title="Figure" style="white-space:nowrap;"><span style="position:relative; top:-3px;"><a href="/wiki/Figures" title="Figures"><img alt="" src="https://images.wikia.nocookie.net/__cb20120207040817/masterofmagic/images/c/cb/Icon_Figure.png" width="8" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Figures: </span></span> \
     </td> \
     <td width=25% > \
      <SELECT id="figures1" name="figures1" onchange="calcdamage();"> \
       <OPTION value="1" SELECTED>1 \
       <OPTION value="2">2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
      </SELECT> \
     </td> \
     <td width=25% style="border-left: 2px solid #404040;" > \
      <span title="Figure" style="white-space:nowrap;"><span style="position:relative; top:-3px;"><a href="/wiki/Figures" title="Figures"><img alt="" src="https://images.wikia.nocookie.net/__cb20120207040817/masterofmagic/images/c/cb/Icon_Figure.png" width="8" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Figures: </span></span> \
     </td> \
     <td width=25% > \
      <SELECT id="figures2" name="figures2" onchange="calcdamage();"> \
       <OPTION value="1" SELECTED>1 \
       <OPTION value="2">2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
      </SELECT> \
     </td> \
    </tr> \
    <tr> \
     <td> \
      <span style="white-space:nowrap;"><span style="position:relative; top:-1px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103052414/masterofmagic/images/5/5a/Icon_Melee_Normal.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Attack: </span></span> \
     </td> \
     <td> \
      <SELECT id="attack" name="attack" onchange="calcdamage();"> \
       <OPTION value="0" SELECTED>none \
       <OPTION value="1">1 \
       <OPTION value="2">2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
       <OPTION value="10">10 \
       <OPTION value="11">11 \
       <OPTION value="12">12 \
       <OPTION value="13">13 \
       <OPTION value="14">14 \
       <OPTION value="15">15 \
       <OPTION value="16">16 \
       <OPTION value="17">17 \
       <OPTION value="18">18 \
       <OPTION value="19">19 \
       <OPTION value="20">20 \
       <OPTION value="21">21 \
       <OPTION value="22">22 \
       <OPTION value="23">23 \
       <OPTION value="24">24 \
       <OPTION value="25">25 \
       <OPTION value="26">26 \
       <OPTION value="27">27 \
       <OPTION value="28">28 \
       <OPTION value="29">29 \
       <OPTION value="30">30 \
       <OPTION value="31">31 \
       <OPTION value="32">32 \
       <OPTION value="33">33 \
       <OPTION value="34">34 \
       <OPTION value="35">35 \
       <OPTION value="36">36 \
       <OPTION value="37">37 \
       <OPTION value="38">38 \
       <OPTION value="39">39 \
       <OPTION value="40">40 \
       <OPTION value="41">41 \
       <OPTION value="42">42 \
       <OPTION value="43">43 \
       <OPTION value="44">44 \
       <OPTION value="45">45 \
       <OPTION value="46">46 \
       <OPTION value="47">47 \
       <OPTION value="48">48 \
       <OPTION value="49">49 \
       <OPTION value="50">50 \
      </SELECT> \
     </td> \
     <td style="border-left: 2px solid #404040;"> \
      <span title="Defense" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124036/masterofmagic/images/f/fb/Icon_Defense.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Defense: </span></span> \
     </td> \
     <td> \
      <SELECT id="defense" name="defense" onchange="calcdamage();"> \
       <OPTION value="0">0 \
       <OPTION value="1">1 \
       <OPTION value="2" SELECTED>2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
       <OPTION value="10">10 \
       <OPTION value="11">11 \
       <OPTION value="12">12 \
       <OPTION value="13">13 \
       <OPTION value="14">14 \
       <OPTION value="15">15 \
       <OPTION value="16">16 \
       <OPTION value="17">17 \
       <OPTION value="18">18 \
       <OPTION value="19">19 \
       <OPTION value="20">20 \
       <OPTION value="21">21 \
       <OPTION value="22">22 \
       <OPTION value="23">23 \
       <OPTION value="24">24 \
       <OPTION value="25">25 \
       <OPTION value="26">26 \
       <OPTION value="27">27 \
       <OPTION value="28">28 \
       <OPTION value="29">29 \
       <OPTION value="30">30 \
       <OPTION value="31">31 \
       <OPTION value="32">32 \
       <OPTION value="33">33 \
       <OPTION value="34">34 \
       <OPTION value="35">35 \
       <OPTION value="36">36 \
       <OPTION value="37">37 \
       <OPTION value="38">38 \
       <OPTION value="39">39 \
       <OPTION value="40">40 \
       <OPTION value="41">41 \
       <OPTION value="42">42 \
       <OPTION value="43">43 \
       <OPTION value="44">44 \
       <OPTION value="45">45 \
       <OPTION value="46">46 \
       <OPTION value="47">47 \
       <OPTION value="48">48 \
       <OPTION value="49">49 \
       <OPTION value="50">50 \
      </SELECT> \
     </td> \
    </tr> \
    <tr> \
     <td> \
      <span title="To Hit" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/To_Hit" title="To Hit"><img alt="" src="https://images.wikia.nocookie.net/__cb20120125160924/masterofmagic/images/b/bd/Icon_ToHit.png" width="16" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">To Hit: </span></span> \
     </td> \
     <td> \
      30 <SELECT id="tohit" name="tohit" onchange="calcdamage();"> \
       <OPTION value="70">+70 \
       <OPTION value="60">+60 \
       <OPTION value="50">+50 \
       <OPTION value="40">+40 \
       <OPTION value="30">+30 \
       <OPTION value="20">+20 \
       <OPTION value="10">+10 \
       <OPTION value="0" style="font-weight:bold;" SELECTED>+0 \
       <OPTION value="-10">-10 \
       <OPTION value="-20">-20 \
      </SELECT>% \
     </td> \
     <td style="border-left: 2px solid #404040;"> \
      <span title="To Block" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/8/8f/Icon_ToBlock.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">To Block:</span></span> \
     </td> \
     <td> \
      30 <SELECT id="toblock" name="toblock" onchange="calcdamage();"> \
       <OPTION value="30">+30 \
       <OPTION value="20">+20 \
       <OPTION value="10">+10 \
       <OPTION value="0" style="font-weight:bold;" SELECTED>+0 \
       <OPTION value="-10">-10 \
      </SELECT>% \
     </td> \
    </tr> \
    <tr> \
     <td> \
      <span style="color:#ffffff; font-weight:bold">Breath/thrown: </span> \
     </td> \
     <td> \
      <SELECT id="breath" name="breath" onchange="calcdamage();"> \
       <OPTION value="0" SELECTED>none \
       <OPTION value="1">1 \
       <OPTION value="2">2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
       <OPTION value="10">10 \
       <OPTION value="11">11 \
       <OPTION value="12">12 \
       <OPTION value="13">13 \
       <OPTION value="14">14 \
       <OPTION value="15">15 \
       <OPTION value="16">16 \
       <OPTION value="17">17 \
       <OPTION value="18">18 \
       <OPTION value="19">19 \
       <OPTION value="20">20 \
       <OPTION value="21">21 \
       <OPTION value="22">22 \
       <OPTION value="23">23 \
       <OPTION value="24">24 \
       <OPTION value="25">25 \
       <OPTION value="26">26 \
       <OPTION value="27">27 \
       <OPTION value="28">28 \
       <OPTION value="29">29 \
       <OPTION value="30">30 \
       <OPTION value="31">31 \
       <OPTION value="32">32 \
       <OPTION value="33">33 \
       <OPTION value="34">34 \
       <OPTION value="35">35 \
       <OPTION value="36">36 \
       <OPTION value="37">37 \
       <OPTION value="38">38 \
       <OPTION value="39">39 \
       <OPTION value="40">40 \
       <OPTION value="41">41 \
       <OPTION value="42">42 \
       <OPTION value="43">43 \
       <OPTION value="44">44 \
       <OPTION value="45">45 \
       <OPTION value="46">46 \
       <OPTION value="47">47 \
       <OPTION value="48">48 \
       <OPTION value="49">49 \
       <OPTION value="50">50 \
      </SELECT> \
     </td> \
     <td style="border-left: 2px solid #404040;"> \
      <span title="Hit Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Hit_Points" title="Hit Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124225/masterofmagic/images/6/61/Icon_Hits.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Hit Points/figure: </span></span> \
     </td> \
     <td> \
      <SELECT id="hitpoints" name="hitpoints" onchange="calcdamage();"> \
       <OPTION value="1" SELECTED>1 \
       <OPTION value="2">2 \
       <OPTION value="3">3 \
       <OPTION value="4">4 \
       <OPTION value="5">5 \
       <OPTION value="6">6 \
       <OPTION value="7">7 \
       <OPTION value="8">8 \
       <OPTION value="9">9 \
       <OPTION value="10">10 \
       <OPTION value="11">11 \
       <OPTION value="12">12 \
       <OPTION value="13">13 \
       <OPTION value="14">14 \
       <OPTION value="15">15 \
       <OPTION value="16">16 \
       <OPTION value="17">17 \
       <OPTION value="18">18 \
       <OPTION value="19">19 \
       <OPTION value="20">20 \
       <OPTION value="21">21 \
       <OPTION value="22">22 \
       <OPTION value="23">23 \
       <OPTION value="24">24 \
       <OPTION value="25">25 \
       <OPTION value="26">26 \
       <OPTION value="27">27 \
       <OPTION value="28">28 \
       <OPTION value="29">29 \
       <OPTION value="30">30 \
       <OPTION value="31">31 \
       <OPTION value="32">32 \
       <OPTION value="33">33 \
       <OPTION value="34">34 \
       <OPTION value="35">35 \
       <OPTION value="36">36 \
       <OPTION value="37">37 \
       <OPTION value="38">38 \
       <OPTION value="39">39 \
       <OPTION value="40">40 \
       <OPTION value="41">41 \
       <OPTION value="42">42 \
       <OPTION value="43">43 \
       <OPTION value="44">44 \
       <OPTION value="45">45 \
       <OPTION value="46">46 \
       <OPTION value="47">47 \
       <OPTION value="48">48 \
       <OPTION value="49">49 \
       <OPTION value="50">50 \
      </SELECT> \
     </td> \
    </tr> \
   </table> \
  </td> \
 </tr> \
</table>';

function apply_block(att_arr, block_arr, offset) {
  if (arguments.length < 3) {
    offset = 0;
  } else if (offset >= att_arr.length) {
    return [];
  }
  var new_att_arr = new Array(att_arr.length - offset);
  var idx;
  var idx2;
  for (idx = 0; idx < att_arr.length - offset; idx += 1) {
    new_att_arr[idx] = 0;
  }
  for (idx = 0; idx < att_arr.length - offset; idx += 1) {
    for (idx2 = 0; idx2 < block_arr.length; idx2 += 1) {
      if (idx2 > idx) {
        new_att_arr[0] += att_arr[idx + offset] * block_arr[idx2];
      } else {
        new_att_arr[idx - idx2] += att_arr[idx + offset] * block_arr[idx2];
      }
    }
  }
  return new_att_arr;
}

function binom_arr(to_hit, num_rolls) {
  var new_arr = new Array(1 + num_rolls);
  var idx;
  if (to_hit == 0) {
    for (idx = 0; idx < num_rolls; idx += 1) {
      new_arr[idx] = 0;
    }
    new_arr[num_rolls] = 1;
    return new_arr;
  }
  var ntmp = Math.pow(to_hit, num_rolls);
  new_arr[0] = ntmp;
  for (idx = 1; idx <= num_rolls; idx += 1) {
    ntmp *= (num_rolls + 1 - idx) * (1 - to_hit) / (to_hit * idx);
    new_arr[idx] = ntmp;
  }
  return new_arr;
}

function calc_transition_table(swords, att_to_hit, block_arr, def_fig_max_hp, start_hp) {
  var transition_table = new Array(1 + start_hp);
  var att_arr;
  var idx;
  var idx2;
  var idx3;
  var top_fig_hp;
  var figs_left;
  var idx4;
  transition_table[0] = [1];
  for (idx = 1; idx <= start_hp; idx += 1) {
    att_arr = binom_arr(1.0 - att_to_hit, swords);
    transition_table[idx] = new Array(1 + idx);
    for (idx2 = 0; idx2 <= idx; idx2 += 1) {
      transition_table[idx][idx2] = 0;
    }
    top_fig_hp = ((idx - 1) % def_fig_max_hp) + 1;
    figs_left = 1 + ((idx - top_fig_hp) / def_fig_max_hp);
    att_arr = apply_block(att_arr, block_arr);
    idx4 = 0;
    for (idx2 = 0; idx2 < figs_left; idx2 += 1) {
      for (idx3 = 0; idx3 < Math.min(att_arr.length, top_fig_hp); idx3 += 1) {
        transition_table[idx][idx - idx4] = att_arr[idx3];
        idx4 += 1;
      }
      att_arr = apply_block(att_arr, block_arr, top_fig_hp);
      if (att_arr.length == 0) {
        break;
      }
      top_fig_hp = def_fig_max_hp;
    }
    if (att_arr.length > 0) {
      for (idx2 = 0; idx2 < att_arr.length; idx2 += 1) {
        transition_table[idx][0] += att_arr[idx2];
      }
    }
  }
  return transition_table;
}

function calc_damage_probs(att_fig_ct, swords, att_to_hit, att_secondary, att_secondary_to_hit, def_fig_ct, shields, def_to_block, def_fig_max_hp, def_top_fig_hp) {
  var start_hp = (def_fig_ct - 1) * def_fig_max_hp + def_top_fig_hp;
  var def_hp_prob_array = new Array(1 + start_hp);
  var idx;
  for (idx = 0; idx < start_hp; idx += 1) {
    def_hp_prob_array[idx] = 0;
  }
  def_hp_prob_array[start_hp] = 1;
  var block_arr = binom_arr(1.0 - def_to_block, shields);
  var transition_table;
  var idx2;
  var idx3;
  var def_tmp_prob_array = new Array(1 + start_hp);
  var array_swapper;
  if (att_secondary > 0) {
    transition_table = calc_transition_table(att_secondary, att_secondary_to_hit, block_arr, def_fig_max_hp, start_hp);
    for (idx = 0; idx < att_fig_ct; idx += 1) {
      for (idx2 = 0; idx2 <= start_hp; idx2 += 1) {
        def_tmp_prob_array[idx2] = 0;
      }
      for (idx2 = 0; idx2 <= start_hp; idx2 += 1) {
        for (idx3 = 0; idx3 <= idx2; idx3 += 1) {
          def_tmp_prob_array[idx3] += def_hp_prob_array[idx2] * transition_table[idx2][idx3];
        }
      }
      array_swapper = def_tmp_prob_array;
      def_tmp_prob_array = def_hp_prob_array;
      def_hp_prob_array = array_swapper;
    }
  }
  transition_table = calc_transition_table(swords, att_to_hit, block_arr, def_fig_max_hp, start_hp);
  for (idx = 0; idx < att_fig_ct; idx += 1) {
    for (idx2 = 0; idx2 <= start_hp; idx2 += 1) {
      def_tmp_prob_array[idx2] = 0;
    }
    for (idx2 = 0; idx2 <= start_hp; idx2 += 1) {
      for (idx3 = 0; idx3 <= idx2; idx3 += 1) {
        def_tmp_prob_array[idx3] += def_hp_prob_array[idx2] * transition_table[idx2][idx3];
      }
    }
    array_swapper = def_tmp_prob_array;
    def_tmp_prob_array = def_hp_prob_array;
    def_hp_prob_array = array_swapper;
  }
  return def_hp_prob_array;
}

function round_str(num, places, lspaces) {
  if (arguments.length < 3) {
    lspaces = 1;
  }
  var multiplier = Math.pow(10, places);
  var ntmp = Math.round(num * multiplier);
  var ntmp2 = Math.floor(ntmp / multiplier);
  var itmp;
  var idx2;
  var ss = '' + ntmp2;
  if (ss.length < lspaces) {
    itmp = lspaces - ss.length;
    for (idx = 0; idx < itmp; idx += 1) {
      ss = '&nbsp;' + ss;
    }
  }
  ntmp2 = ntmp % multiplier;
  var stmp = '' + ntmp2;
  while (stmp.length < places) {
    stmp = '0' + stmp;
  }
  return ss + '.' + stmp;
}

function calcdamage() {
  var figures1 = parseInt(document.getElementById('figures1').value);
  var attack = parseInt(document.getElementById('attack').value);
  var tohit = (30 + parseInt(document.getElementById('tohit').value)) * 0.01;
  var figures2 = parseInt(document.getElementById('figures2').value);
  var defense = parseInt(document.getElementById('defense').value);
  var toblock = (30 + parseInt(document.getElementById('toblock').value)) * 0.01;
  var attack2 = parseInt(document.getElementById('breath').value);
  var tohit2 = tohit;
  var hitpoints = parseInt(document.getElementById('hitpoints').value);
  var resultsspan = document.getElementById('resultsspan');
  var init_hp = hitpoints * figures2;

  var highestresults = 0;
  var HTML = '';

  var maxdamage = Math.min((attack + attack2) * figures1, init_hp);
  var def_hp_prob_array = calc_damage_probs(figures1, attack, tohit, attack2, tohit2, figures2, defense, toblock, hitpoints, hitpoints);
	
  var avg_damage = init_hp;
  var maxfreq = def_hp_prob_array[0];
  var idx;
  for (idx = 1; idx <= init_hp; idx += 1) {
    avg_damage -= def_hp_prob_array[idx] * idx;
    if (def_hp_prob_array[idx] > maxfreq) {
      maxfreq = def_hp_prob_array[idx];
    }
  }
	
  HTML = '<font size=5><b>Average Damage: ' + round_str(avg_damage, 3) + '</b></font><br><br>';
  HTML = HTML + ' \
<table class="gradientable" > \
 <tr class="firstrow" > \
  <td> \
   <b>Damage</b> \
  </td> \
  <td> \
   <b>Chance</b> \
  </td> \
 </tr>';
  for (idx = 0; idx <= maxdamage; idx++) {
    var chance = def_hp_prob_array[init_hp - idx] * 100;

    var colorpercentage = Math.floor(chance * 1.15 / maxfreq);
    var color1 = 140 - Math.floor(colorpercentage/2);                
    var color2 = 140 + colorpercentage;
    var color3 = 140 - Math.floor(colorpercentage/2);

    var extrapadding = Math.floor(chance * 2) + 5;

    var weight = 'normal';
    if (chance == maxfreq * 100) {
      weight = 'bold';
    }
    HTML = HTML + ' \
 <tr> \
  <td> \
   <span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + idx + '</span></span> \
  </td> \
  <td style="width: '+(210-extrapadding)+'px; border-left: 2px solid RGB('+color1+','+color2+','+color3+'); border-right: 2px solid RGB('+color1+','+color2+','+color3+'); padding-left: ' + extrapadding + 'px;"> \
   <span style="color: RGB('+color1+','+color2+','+color3+'); font-weight:'+weight+';">' + round_str(chance, 3, 3) +'%</span></span> \
  </td> \
 </tr>';
  }
  HTML = HTML +'</table>'
	
  resultsspan.innerHTML = HTML;						
}