function PopulatePage() {
   var infotablespan = document.getElementById('infotablespan');
   infotablespan.innerHTML = '<table class="gradientable" width=700> \
<tr class="firstrow" > \
  <td colspan=2 align=center style="padding:10px;"> \
    <span style="font-size:140%;">Ariel</span> \
  </td> \
  <td align=center> \
    <input type="button" value="clear" onClick="resetall();"> \
  </td> \
  <td colspan=2 align=center style="padding:10px;"> \
    <span style="font-size:140%;">Rjak</span> \
  </td> \
</tr> \
<tr> \
  <td align=center width=17%> \
    <select id="race1" name="race1" onchange="changerace(1);"> \
      <option value="0" selected="selected">Custom</option> \
      <option value="1">Hero</option> \
      <option value="2">Barbarian</option> \
      <option value="3">Gnoll</option> \
      <option value="4">Halfling</option> \
      <option value="5">High Elf</option> \
      <option value="6">High Men</option> \
      <option value="7">Klackon</option> \
      <option value="8">Lizardmen</option> \
      <option value="9">Nomad</option> \
      <option value="10">Orc</option> \
      <option value="11">Beastmen</option> \
      <option value="12">Dark Elf</option> \
      <option value="13">Draconian</option> \
      <option value="14">Dwarf</option> \
      <option value="15">Troll</option> \
      <option value="16">Life</option> \
      <option value="17">Death</option> \
      <option value="18">Chaos</option> \
      <option value="19">Nature</option> \
      <option value="20">Sorcery</option> \
      <option value="21">Arcane</option> \
    </select> \
  </td> \
  <td width=28%> \
    <select id="unit1" name="unit1" style="display:none;" onchange="changeunit(1);"> \
      <option value="0"></option> \
    </select> \
  </td> \
  <td align=center> \
    <select id="vnum" name="vnum" onchange="calcdamage();"> \
      <option value="0" selected="selected">v1.31</option> \
      <option value="1">v1.40n</option> \
    </select> \
  </td> \
  <td align=center width=17%> \
    <select id="race2" name="race2" onchange="changerace(2);"> \
      <option value="0" selected="selected">Custom</option> \
      <option value="1">Hero</option> \
      <option value="2">Barbarian</option> \
      <option value="3">Gnoll</option> \
      <option value="4">Halfling</option> \
      <option value="5">High Elf</option> \
      <option value="6">High Men</option> \
      <option value="7">Klackon</option> \
      <option value="8">Lizardmen</option> \
      <option value="9">Nomad</option> \
      <option value="10">Orc</option> \
      <option value="11">Beastmen</option> \
      <option value="12">Dark Elf</option> \
      <option value="13">Draconian</option> \
      <option value="14">Dwarf</option> \
      <option value="15">Troll</option> \
      <option value="16">Life</option> \
      <option value="17">Death</option> \
      <option value="18">Chaos</option> \
      <option value="19">Nature</option> \
      <option value="20">Sorcery</option> \
      <option value="21">Arcane</option> \
    </select> \
  </td> \
  <td width=28%> \
    <select id="unit2" name="unit2" style="display:none;" onchange="changeunit(2);"> \
      <option value="0"></option> \
    </select> \
  </td> \
</tr> \
<tr> \
  <td colspan=2 align=center> \
    <span id="unitimg1"></span> \
  </td> \
  <td></td> \
  <td colspan=2 align=center> \
    <span id="unitimg2"></span> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="Figures" style="white-space:nowrap;"><span style="position:relative; top:-3px;"><a href="/wiki/Figures" title="Figures"><img alt="" src="https://images.wikia.nocookie.net/__cb20120206233924/masterofmagic/images/0/0c/Icon_MultiFigureUnit.png" width="16" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Figures: </span></span> \
  </td> \
  <td> \
    <select id="figures1" name="figures1" onchange="change_fig(1);"> \
      <option value="1" selected="selected">1</option> \
      <option value="2">2</option> \
      <option value="4">4</option> \
      <option value="6">6</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
    </select> \
    <span id="fixed_figures1"></span> \
  </td> \
  <td></td> \
  <td> \
    <span title="Figures" style="white-space:nowrap;"><span style="position:relative; top:-3px;"><a href="/wiki/Figures" title="Figures"><img alt="" src="https://images.wikia.nocookie.net/__cb20120206233924/masterofmagic/images/0/0c/Icon_MultiFigureUnit.png" width="16" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Figures: </span></span> \
  </td> \
  <td> \
    <select id="figures2" name="figures2" onchange="change_fig(2);"> \
      <option value="1" selected="selected">1</option> \
      <option value="2">2</option> \
      <option value="4">4</option> \
      <option value="6">6</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
    </select> \
    <span id="fixed_figures2"></span> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span style="white-space:nowrap;"><span style="position:relative; top:-1px;"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/5/5a/Icon_Melee_Normal.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Attack: </span></span> \
  </td> \
  <td> \
    <select id="melee1" name="melee1" onchange="changeattack(1);"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_melee1"></span> \
    <input id="base_melee1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span style="white-space:nowrap;"><span style="position:relative; top:-1px;"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/5/5a/Icon_Melee_Normal.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Attack: </span></span> \
  </td> \
  <td> \
    <select id="melee2" name="melee2" onchange="changeattack(2);"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_melee2"></span> \
    <input id="base_melee2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span id="rangedimg1" name="rangedimg1" style="position:relative; top:-2px;"></span> \
    <select id="rangedtype1" name="rangedtype1" onchange="changerangedtype(1);"> \
      <option value="0" selected="selected">No range</option> \
      <option value="1">Magic (C)</option> \
      <option value="2">Magic (N)</option> \
      <option value="3">Magic (S)</option> \
      <option value="4">Missile</option> \
      <option value="5">Rock</option> \
    </select> \
  </td> \
  <td> \
    <select id="ranged1" name="ranged1" style="display:none;" onchange="changeattack(1);"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_ranged1"></span> \
    <input id="base_ranged1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span id="rangedimg2" name="rangedimg2" style="position:relative; top:-2px;"></span> \
    <select id="rangedtype2" name="rangedtype2" onchange="changerangedtype(2);"> \
      <option value="0" selected="selected">No range</option> \
      <option value="1">Magic (C)</option> \
      <option value="2">Magic (N)</option> \
      <option value="3">Magic (S)</option> \
      <option value="4">Missile</option> \
      <option value="5">Rock</option> \
    </select> \
  </td> \
  <td> \
    <select id="ranged2" name="ranged2" style="display:none;" onchange="changeattack(2);"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_ranged2"></span> \
    <input id="base_ranged2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="Defense" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124036/masterofmagic/images/f/fb/Icon_Defense.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Defense: </span></span> \
  </td> \
  <td> \
    <select id="defense1" name="defense1" onchange="calcdamage();"> \
      <option value="0">none</option> \
      <option value="1">1</option> \
      <option value="2" selected="selected">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_defense1"></span> \
    <input id="base_defense1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span title="Defense" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124036/masterofmagic/images/f/fb/Icon_Defense.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Defense: </span></span> \
  </td> \
  <td> \
    <select id="defense2" name="defense2" onchange="calcdamage();"> \
      <option value="0">none</option> \
      <option value="1">1</option> \
      <option value="2" selected="selected">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_defense2"></span> \
    <input id="base_defense2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Resistance" title="Resistance"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124051/masterofmagic/images/f/f6/Icon_Resist.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Resistance: </span></span> \
  </td> \
  <td> \
    <select id="resist1" name="resist1" onchange="calcdamage();"> \
      <option value="0">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4" selected="selected">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
      <option value="51">51</option> \
      <option value="52">52</option> \
      <option value="53">53</option> \
      <option value="54">54</option> \
      <option value="55">55</option> \
      <option value="56">56</option> \
      <option value="57">57</option> \
      <option value="58">58</option> \
      <option value="59">59</option> \
      <option value="60">60</option> \
      <option value="61">61</option> \
      <option value="62">62</option> \
      <option value="63">63</option> \
    </select> \
    <span id="fixed_resist1"></span> \
    <input id="base_resist1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span title="" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Resistance" title="Resistance"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103124051/masterofmagic/images/f/f6/Icon_Resist.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Resistance: </span></span> \
  </td> \
  <td> \
    <select id="resist2" name="resist2" onchange="calcdamage();"> \
      <option value="0">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4" selected="selected">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
      <option value="51">51</option> \
      <option value="52">52</option> \
      <option value="53">53</option> \
      <option value="54">54</option> \
      <option value="55">55</option> \
      <option value="56">56</option> \
      <option value="57">57</option> \
      <option value="58">58</option> \
      <option value="59">59</option> \
      <option value="60">60</option> \
      <option value="61">61</option> \
      <option value="62">62</option> \
      <option value="63">63</option> \
    </select> \
    <span id="fixed_resist2"></span> \
    <input id="base_resist2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="To Hit" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/To_Hit" title="To Hit"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/b/bd/Icon_ToHit.png" width="16" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Base to-hit: </span></span> \
  </td> \
  <td> \
    30 <select id="tohit1" name="tohit1" onchange="calcdamage();"> \
      <option value="-20">- 20</option> \
      <option value="-10">- 10</option> \
      <option value="0" style="font-weight:bold;" selected="selected">+ 0</option> \
      <option value="10">+ 10</option> \
      <option value="20">+ 20</option> \
      <option value="30">+ 30</option> \
      <option value="40">+ 40</option> \
      <option value="50">+ 50</option> \
      <option value="60">+ 60</option> \
      <option value="70">+ 70</option> \
      <option value="80">+ 80</option> \
      <option value="90">+ 90</option> \
      <option value="100">+ 100</option> \
    </select><span id="fixed_tohit1"></span>% \
    <input id="base_tohit1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span title="To Hit" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/To_Hit" title="To Hit"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/b/bd/Icon_ToHit.png" width="16" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Base to-hit: </span></span> \
  </td> \
  <td> \
    30 <select id="tohit2" name="tohit2" onchange="calcdamage();"> \
      <option value="-20">- 20</option> \
      <option value="-10">- 10</option> \
      <option value="0" style="font-weight:bold;" selected="selected">+ 0</option> \
      <option value="10">+ 10</option> \
      <option value="20">+ 20</option> \
      <option value="30">+ 30</option> \
      <option value="40">+ 40</option> \
      <option value="50">+ 50</option> \
      <option value="60">+ 60</option> \
      <option value="70">+ 70</option> \
      <option value="80">+ 80</option> \
      <option value="90">+ 90</option> \
      <option value="100">+ 100</option> \
    </select><span id="fixed_tohit2"></span>% \
    <input id="base_tohit2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span id="breathimg1" name="breathimg1" style="position:relative; top:-2px;"></span> \
    <select id="breathtype1" name="breathtype1" onchange="changebreathtype(1);"> \
      <option value="0" selected="selected">No th./br.</option> \
      <option value="1">Thrown</option> \
      <option value="2">Fire</option> \
      <option value="3">Lightning</option> \
    </select> \
  </td> \
  <td> \
    <select id="breath1" name="breath1" style="display:none;" onchange="calcdamage();"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_breath1"></span> \
    <input id="base_breath1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span id="breathimg2" name="breathimg2" style="position:relative; top:-2px;"></span> \
    <select id="breathtype2" name="breathtype2" onchange="changebreathtype(2);"> \
      <option value="0" selected="selected">No th./br.</option> \
      <option value="1">Thrown</option> \
      <option value="2">Fire</option> \
      <option value="3">Lightning</option> \
    </select> \
  </td> \
  <td> \
    <select id="breath2" name="breath2" style="display:none;" onchange="calcdamage();"> \
      <option value="0" selected="selected">none</option> \
      <option value="1">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
    </select> \
    <span id="fixed_breath2"></span> \
    <input id="base_breath2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="To Block" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/8/8f/Icon_ToBlock.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">To Block:</span></span> \
  </td> \
  <td> \
    30 <select id="toblock1" name="toblock1" onchange="calcdamage();"> \
      <option value="0" style="font-weight:bold;" SELECTED>+ 0</option> \
      <option value="10">+ 10</option> \
      <option value="20">+ 20</option> \
    </select>% \
  </td> \
  <td></td> \
  <td> \
    <span title="To Block" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Defense" title="Defense"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/8/8f/Icon_ToBlock.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">To Block:</span></span> \
  </td> \
  <td> \
    30 <select id="toblock2" name="toblock2" onchange="calcdamage();"> \
      <option value="0" style="font-weight:bold;" SELECTED>+ 0</option> \
      <option value="10">+ 10</option> \
      <option value="20">+ 20</option> \
    </select>% \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="Hit Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Hit_Points" title="Hit Points"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/6/61/Icon_Hits.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Hit Points: </span></span> \
  </td> \
  <td> \
    <select id="hp1" name="hp1" onchange="change_hp(1);"> \
      <option value="1" selected="selected">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
      <option value="51">51</option> \
      <option value="52">52</option> \
      <option value="53">53</option> \
      <option value="54">54</option> \
      <option value="55">55</option> \
      <option value="56">56</option> \
      <option value="57">57</option> \
      <option value="58">58</option> \
      <option value="59">59</option> \
      <option value="60">60</option> \
    </select> \
    <span id="fixed_hp1"></span> \
    <input id="base_hp1" type="hidden" value="" /> \
  </td> \
  <td></td> \
  <td> \
    <span title="Hit Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Hit_Points" title="Hit Points"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/6/61/Icon_Hits.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Hit Points: </span></span> \
  </td> \
  <td> \
    <select id="hp2" name="hp2" onchange="change_hp(2);"> \
      <option value="1" selected="selected">1</option> \
      <option value="2">2</option> \
      <option value="3">3</option> \
      <option value="4">4</option> \
      <option value="5">5</option> \
      <option value="6">6</option> \
      <option value="7">7</option> \
      <option value="8">8</option> \
      <option value="9">9</option> \
      <option value="10">10</option> \
      <option value="11">11</option> \
      <option value="12">12</option> \
      <option value="13">13</option> \
      <option value="14">14</option> \
      <option value="15">15</option> \
      <option value="16">16</option> \
      <option value="17">17</option> \
      <option value="18">18</option> \
      <option value="19">19</option> \
      <option value="20">20</option> \
      <option value="21">21</option> \
      <option value="22">22</option> \
      <option value="23">23</option> \
      <option value="24">24</option> \
      <option value="25">25</option> \
      <option value="26">26</option> \
      <option value="27">27</option> \
      <option value="28">28</option> \
      <option value="29">29</option> \
      <option value="30">30</option> \
      <option value="31">31</option> \
      <option value="32">32</option> \
      <option value="33">33</option> \
      <option value="34">34</option> \
      <option value="35">35</option> \
      <option value="36">36</option> \
      <option value="37">37</option> \
      <option value="38">38</option> \
      <option value="39">39</option> \
      <option value="40">40</option> \
      <option value="41">41</option> \
      <option value="42">42</option> \
      <option value="43">43</option> \
      <option value="44">44</option> \
      <option value="45">45</option> \
      <option value="46">46</option> \
      <option value="47">47</option> \
      <option value="48">48</option> \
      <option value="49">49</option> \
      <option value="50">50</option> \
      <option value="51">51</option> \
      <option value="52">52</option> \
      <option value="53">53</option> \
      <option value="54">54</option> \
      <option value="55">55</option> \
      <option value="56">56</option> \
      <option value="57">57</option> \
      <option value="58">58</option> \
      <option value="59">59</option> \
      <option value="60">60</option> \
    </select> \
    <span id="fixed_hp2"></span> \
    <input id="base_hp2" type="hidden" value="" /> \
  </td> \
</tr> \
<tr> \
  <td> \
    <b>Damage taken:</b> \
  </td> \
  <td> \
    <select id="dt1" name="dt1" onchange="calcdamage();"> \
      <option value="0" selected="selected">0</option> \
    </select> \
  </td> \
  <td></td> \
  <td> \
    <b>Damage taken:</b> \
  </td> \
  <td> \
    <select id="dt2" name="dt2" onchange="calcdamage();"> \
      <option value="0" selected="selected">0</option> \
    </select> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span id="weaponlabel1"><b>Weapon type:</b></span> \
  </td> \
  <td> \
    <select id="weaponselect1" id="weaponselect1" onchange="calcdamage();"> \
      <option value="0" selected="selected">Normal</option> \
      <option value="1">Magic</option> \
      <option value="2">Mithril</option> \
      <option value="3">Adamantium</option> \
    </select> \
  </td> \
  <td></td> \
  <td> \
    <span id="weaponlabel2"><b>Weapon type:</b></span> \
  </td> \
  <td> \
    <select id="weaponselect2" id="weaponselect2" onchange="calcdamage();"> \
      <option value="0" selected="selected">Normal</option> \
      <option value="1">Magic</option> \
      <option value="2">Mithril</option> \
      <option value="3">Adamantium</option> \
    </select> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span title="Level" style="white-space:nowrap;"><span style="position:relative;"><a href="/wiki/Experience" title="Experience"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/c/c1/Icon_Experience.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Level: </span></span> \
  </td> \
  <td> \
    <select id="level1" name="level1" style="display:none;" onchange="changelevel(1);"> \
      <option value="0"></option> \
    </select> \
  </td> \
  <td></td> \
  <td> \
    <span title="Level" style="white-space:nowrap;"><span style="position:relative;"><a href="/wiki/Experience" title="Experience"><img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/c/c1/Icon_Experience.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">Level: </span></span> \
  </td> \
  <td> \
    <select id="level2" name="level2" style="display:none;" onchange="changelevel(2);"> \
      <option value="0"></option> \
    </select> \
  </td> \
</tr> \
<tr> \
  <td colspan=2 valign="top"> \
    <input id="guaranteed_might1" type="hidden" value="" /> \
    <input id="cur_might1" type="hidden" value="" /> \
    <input id="guaranteed_arcane1" type="hidden" value="" /> \
    <input id="cur_arcane1" type="hidden" value="" /> \
    <input id="guaranteed_blade1" type="hidden" value="" /> \
    <input id="cur_blade1" type="hidden" value="" /> \
    <input id="guaranteed_lead1" type="hidden" value="" /> \
    <input id="cur_lead1" type="hidden" value="" /> \
    <input id="guaranteed_agile1" type="hidden" value="" /> \
    <input id="cur_agile1" type="hidden" value="" /> \
    <input id="guaranteed_const1" type="hidden" value="" /> \
    <input id="cur_const1" type="hidden" value="" /> \
    <input id="guaranteed_prayer1" type="hidden" value="" /> \
    <input id="cur_prayer1" type="hidden" value="" /> \
    <input id="guaranteed_charm1" type="hidden" value="" /> \
    <input id="cur_charm1" type="hidden" value="" /> \
    <input id="guaranteed_caster1" type="hidden" value="" /> \
    <input id="cur_caster1" type="hidden" value="" /> \
    <input id="guaranteed_arms1" type="hidden" value="" /> \
    <input id="guaranteed_legen1" type="hidden" value="" /> \
    <input id="guaranteed_noble1" type="hidden" value="" /> \
    <input id="guaranteed_sage1" type="hidden" value="" /> \
    <input id="flying1" type="hidden" value="0" /> \
    <input id="noncorp1" type="hidden" value="0" /> \
    <input id="lshield1" type="hidden" value="0" /> \
    <input id="lucky1" type="hidden" value="0" /> \
    <input id="lrange1" type="hidden" value="0" /> \
    <input id="ap1" type="hidden" value="0" /> \
    <input id="fs1" type="hidden" value="0" /> \
    <input id="negatefs1" type="hidden" value="0" /> \
    <input id="missimm1" type="hidden" value="0" /> \
    <input id="magimm1" type="hidden" value="0" /> \
    <input id="illimm1" type="hidden" value="0" /> \
    <input id="weapimm1" type="hidden" value="0" /> \
    <input id="deathimm1" type="hidden" value="0" /> \
    <input id="fireimm1" type="hidden" value="0" /> \
    <input id="coldimm1" type="hidden" value="0" /> \
    <input id="stonimm1" type="hidden" value="0" /> \
    <input id="poisimm1" type="hidden" value="0" /> \
    <input id="poison1" type="hidden" value="0" /> \
    <input id="illusion1" type="hidden" value="0" /> \
    <input id="gazeranged1" type="hidden" value="0" /> \
    <input id="dgaze1" type="hidden" value="0" /> \
    <input id="sgaze1" type="hidden" value="0" /> \
    <input id="doomgaze1" type="hidden" value="0" /> \
    <input id="immo1" type="hidden" value="0" /> \
    <input id="dispelevil1" type="hidden" value="0" /> \
    <input id="stouch1" type="hidden" value="0" /> \
    <input id="invis1" type="hidden" value="0" /> \
    <input id="resistall1" type="hidden" value="0" /> \
    <input id="holybonus1" type="hidden" value="0" /> \
    <input id="lifesteal1" type="hidden" value="0" /> \
    <input id="regen1" type="hidden" value="0" /> \
    <input id="fear1" type="hidden" value="0" /> \
    <input id="lifeunit1" type="hidden" value="0" /> \
    <input id="deathunit1" type="hidden" value="0" /> \
    <input id="chaosunit1" type="hidden" value="0" /> \
    <input id="natureunit1" type="hidden" value="0" /> \
    <input id="sorcunit1" type="hidden" value="0" /> \
    <span id="ability1" name="ability1"> \
    </span> \
  </td> \
  <td></td> \
  <td colspan=2 valign="top"> \
    <input id="guaranteed_might2" type="hidden" value="" /> \
    <input id="cur_might2" type="hidden" value="" /> \
    <input id="guaranteed_arcane2" type="hidden" value="" /> \
    <input id="cur_arcane2" type="hidden" value="" /> \
    <input id="guaranteed_blade2" type="hidden" value="" /> \
    <input id="cur_blade2" type="hidden" value="" /> \
    <input id="guaranteed_lead2" type="hidden" value="" /> \
    <input id="cur_lead2" type="hidden" value="" /> \
    <input id="guaranteed_agile2" type="hidden" value="" /> \
    <input id="cur_agile2" type="hidden" value="" /> \
    <input id="guaranteed_const2" type="hidden" value="" /> \
    <input id="cur_const2" type="hidden" value="" /> \
    <input id="guaranteed_prayer2" type="hidden" value="" /> \
    <input id="cur_prayer2" type="hidden" value="" /> \
    <input id="guaranteed_charm2" type="hidden" value="" /> \
    <input id="cur_charm2" type="hidden" value="" /> \
    <input id="guaranteed_caster2" type="hidden" value="" /> \
    <input id="cur_caster2" type="hidden" value="" /> \
    <input id="guaranteed_arms2" type="hidden" value="" /> \
    <input id="guaranteed_legen2" type="hidden" value="" /> \
    <input id="guaranteed_noble2" type="hidden" value="" /> \
    <input id="guaranteed_sage2" type="hidden" value="" /> \
    <input id="flying2" type="hidden" value="0" /> \
    <input id="noncorp2" type="hidden" value="0" /> \
    <input id="lshield2" type="hidden" value="0" /> \
    <input id="lucky2" type="hidden" value="0" /> \
    <input id="lrange2" type="hidden" value="0" /> \
    <input id="ap2" type="hidden" value="0" /> \
    <input id="fs2" type="hidden" value="0" /> \
    <input id="negatefs2" type="hidden" value="0" /> \
    <input id="missimm2" type="hidden" value="0" /> \
    <input id="magimm2" type="hidden" value="0" /> \
    <input id="illimm2" type="hidden" value="0" /> \
    <input id="weapimm2" type="hidden" value="0" /> \
    <input id="deathimm2" type="hidden" value="0" /> \
    <input id="fireimm2" type="hidden" value="0" /> \
    <input id="coldimm2" type="hidden" value="0" /> \
    <input id="stonimm2" type="hidden" value="0" /> \
    <input id="poisimm2" type="hidden" value="0" /> \
    <input id="poison2" type="hidden" value="0" /> \
    <input id="illusion2" type="hidden" value="0" /> \
    <input id="gazeranged2" type="hidden" value="0" /> \
    <input id="dgaze2" type="hidden" value="0" /> \
    <input id="sgaze2" type="hidden" value="0" /> \
    <input id="doomgaze2" type="hidden" value="0" /> \
    <input id="immo2" type="hidden" value="0" /> \
    <input id="dispelevil2" type="hidden" value="0" /> \
    <input id="stouch2" type="hidden" value="0" /> \
    <input id="invis2" type="hidden" value="0" /> \
    <input id="resistall2" type="hidden" value="0" /> \
    <input id="holybonus2" type="hidden" value="0" /> \
    <input id="lifesteal2" type="hidden" value="0" /> \
    <input id="regen2" type="hidden" value="0" /> \
    <input id="fear2" type="hidden" value="0" /> \
    <input id="lifeunit2" type="hidden" value="0" /> \
    <input id="deathunit2" type="hidden" value="0" /> \
    <input id="chaosunit2" type="hidden" value="0" /> \
    <input id="natureunit2" type="hidden" value="0" /> \
    <input id="sorcunit2" type="hidden" value="0" /> \
    <span id="ability2" name="ability2"> \
    </span> \
  </td> \
</tr> \
<tr> \
  <td valign="top"> \
    <input id="pickct1" type="hidden" value="0" /> \
    <input id="picktype1" type="hidden" value="0" /> \
    <span id="heropicklabel1" style="display:none;"><b>Rolls</b> (<span id="picksleft1"></span>/<span id="pickstot1"></span> left):</span> \
  </td> \
  <td valign="top"> \
    <span id="rshow1" style="display:none;"><a href="" onClick="toggle_rview(1, 2); return false;">(show)</a></span> \
    <span id="pickselect1" name="pickselect1" style="display:none;"> \
      <a href="" onClick="toggle_rview(1, 1); return false;">(hide)</a> <input type="button" value="random" onClick="randomize_hero(1);" /><br /> \
      <span id="pickfighter1" name="pickfighter1"> \
        <span id="show_agile1"><input id="pick_agile1" name="pick_agile1" type="checkbox" onchange="change_pickd(1, \'pick_agiled1\');" /><span id="pick_agile_half1" style="display:none;">Super </span>Agility<br /></span> \
        <span id="show_agiled1"><input id="pick_agiled1" name="pick_agiled1" type="checkbox" onchange="change_pickd(1, \'pick_agile1\');" />Super Agility<br /></span> \
        <input id="pick_blade1" name="pick_blade1" type="checkbox" onchange="change_pickd(1, \'pick_bladed1\');" /><span id="pick_blade_half1" style="display:none;">Super </span>Blademaster<br /> \
        <span id="show_bladed1"><input id="pick_bladed1" name="pick_bladed1" type="checkbox" onchange="change_pickd(1, \'pick_blade1\');" />Super Blademaster<br /></span> \
        <input id="pick_const1" name="pick_const1" type="checkbox" onchange="change_pickd(1, \'pick_constd1\');" /><span id="pick_const_half1" style="display:none;">Super </span>Constitution<br /> \
        <span id="show_constd1"><input id="pick_constd1" name="pick_constd1" type="checkbox" onchange="change_pickd(1, \'pick_const1\');" />Super Constitution<br /></span> \
        <span id="show_lead1"><input id="pick_lead1" name="pick_lead1" type="checkbox" onchange="change_pickd(1, \'pick_leadd1\');" /><span id="pick_lead_half1" style="display:none;">Super </span>Leadership<br /></span> \
        <span id="show_leadd1"><input id="pick_leadd1" name="pick_leadd1" type="checkbox" onchange="change_pickd(1, \'pick_lead1\');" />Super Leadership<br /></span> \
        <span id="show_might1"><input id="pick_might1" name="pick_might1" type="checkbox" onchange="change_pickd(1, \'pick_mightd1\');" /><span id="pick_might_half1" style="display:none;">Super </span>Might<br /></span> \
        <span id="show_mightd1"><input id="pick_mightd1" name="pick_mightd1" type="checkbox" onchange="change_pickd(1, \'pick_might1\');" />Super Might<br /></span> \
      </span> \
      <span id="show_charm1"><input id="pick_charm1" name="pick_charm1" type="checkbox" onchange="change_pick(1);" />Charmed<br /></span> \
      <input id="pick_lucky1" name="pick_lucky1" type="checkbox" onchange="change_pick(1);" />Lucky<br /> \
      <span id="pickmage1" name="pickmage1"> \
        <span id="show_caster1"><input id="pick_caster1" name="pick_caster1" type="checkbox" onchange="change_pick(1);" />Caster<br /></span> \
        <span id="show_arcane1"><input id="pick_arcane1" name="pick_arcane1" type="checkbox" onchange="change_pickd(1, \'pick_arcaned1\');" /><span id="pick_arcane_half1" style="display:none;">Super </span>Arcane Power<br /></span> \
        <span id="show_arcaned1"><input id="pick_arcaned1" name="pick_arcaned1" type="checkbox" onchange="change_pickd(1, \'pick_arcane1\');" />Super Arcane Power<br /></span> \
        <span id="show_prayer1"><input id="pick_prayer1" name="pick_prayer1" type="checkbox" onchange="change_pickd(1, \'pick_prayerd1\');" /><span id="pick_prayer_half1" style="display:none;">Super </span>Prayermaster<br /></span> \
        <span id="show_prayerd1"><input id="pick_prayerd1" name="pick_prayerd1" type="checkbox" onchange="change_pickd(1, \'pick_prayer1\');" />Super Prayermaster<br /></span> \
      </span> \
    </span> \
  </td> \
  <td></td> \
  <td valign="top"> \
    <input id="pickct2" type="hidden" value="0" /> \
    <input id="picktype2" type="hidden" value="0" /> \
    <span id="heropicklabel2" style="display:none;"><b>Rolls</b> (<span id="picksleft2"></span>/<span id="pickstot2"></span> left):</span> \
  </td> \
  <td valign="top"> \
    <span id="rshow2" style="display:none;"><a href="" onClick="toggle_rview(2, 2); return false;">(show)</a></span> \
    <span id="pickselect2" name="pickselect2" style="display:none;"> \
      <a href="" onClick="toggle_rview(2, 1); return false;">(hide)</a> <input type="button" value="random" onClick="randomize_hero(2);" /><br /> \
      <span id="pickfighter2" name="pickfighter2"> \
        <span id="show_agile2"><input id="pick_agile2" name="pick_agile2" type="checkbox" onchange="change_pickd(2, \'pick_agiled2\');" /><span id="pick_agile_half2" style="display:none;">Super </span>Agility<br /></span> \
        <span id="show_agiled2"><input id="pick_agiled2" name="pick_agiled2" type="checkbox" onchange="change_pickd(2, \'pick_agile2\');" />Super Agility<br /></span> \
        <input id="pick_blade2" name="pick_blade2" type="checkbox" onchange="change_pickd(2, \'pick_bladed2\');" /><span id="pick_blade_half2" style="display:none;">Super </span>Blademaster<br /> \
        <span id="show_bladed2"><input id="pick_bladed2" name="pick_bladed2" type="checkbox" onchange="change_pickd(2, \'pick_blade2\');" />Super Blademaster<br /></span> \
        <input id="pick_const2" name="pick_const2" type="checkbox" onchange="change_pickd(2, \'pick_constd2\');" /><span id="pick_const_half2" style="display:none;">Super </span>Constitution<br /> \
        <span id="show_constd2"><input id="pick_constd2" name="pick_constd2" type="checkbox" onchange="change_pickd(2, \'pick_const2\');" />Super Constitution<br /></span> \
        <span id="show_lead2"><input id="pick_lead2" name="pick_lead2" type="checkbox" onchange="change_pickd(2, \'pick_leadd2\');" /><span id="pick_lead_half2" style="display:none;">Super </span>Leadership<br /></span> \
        <span id="show_leadd2"><input id="pick_leadd2" name="pick_leadd2" type="checkbox" onchange="change_pickd(2, \'pick_lead2\');" />Super Leadership<br /></span> \
        <span id="show_might2"><input id="pick_might2" name="pick_might2" type="checkbox" onchange="change_pickd(2, \'pick_mightd2\');" /><span id="pick_might_half2" style="display:none;">Super </span>Might<br /></span> \
        <span id="show_mightd2"><input id="pick_mightd2" name="pick_mightd2" type="checkbox" onchange="change_pickd(2, \'pick_might2\');" />Super Might<br /></span> \
      </span> \
      <span id="show_charm2"><input id="pick_charm2" name="pick_charm2" type="checkbox" onchange="change_pick(2);" />Charmed<br /></span> \
      <input id="pick_lucky2" name="pick_lucky2" type="checkbox" onchange="change_pick(2);" />Lucky<br /> \
      <span id="pickmage2" name="pickmage2"> \
        <span id="show_caster2"><input id="pick_caster2" name="pick_caster2" type="checkbox" onchange="change_pick(2);" />Caster<br /></span> \
        <span id="show_arcane2"><input id="pick_arcane2" name="pick_arcane2" type="checkbox" onchange="change_pickd(2, \'pick_arcaned2\');" /><span id="pick_arcane_half2" style="display:none;">Super </span>Arcane Power<br /></span> \
        <span id="show_arcaned2"><input id="pick_arcaned2" name="pick_arcaned2" type="checkbox" onchange="change_pickd(2, \'pick_arcane2\');" />Super Arcane Power<br /></span> \
        <span id="show_prayer2"><input id="pick_prayer2" name="pick_prayer2" type="checkbox" onchange="change_pickd(2, \'pick_prayerd2\');" /><span id="pick_prayer_half2" style="display:none;">Super </span>Prayermaster<br /></span> \
        <span id="show_prayerd2"><input id="pick_prayerd2" name="pick_prayerd2" type="checkbox" onchange="change_pickd(2, \'pick_prayer2\');" />Super Prayermaster<br /></span> \
      </span> \
    </span> \
  </td> \
</tr> \
<tr> \
  <td align=center> \
    <input id="hequipprof1" type="hidden" value="0" /> \
    <span id="artifact_attimg1"></span> \
  <td> \
    <select id="artifact_attselect1" name="artifact_attselect1" style="display:none;" onchange="update_artigroup(1, \'att\');"> \
      <option value="0"></option> \
    </select> \
    <span id="artifact_attcraft1" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_attcraft_1ability1" onchange="craftchange(1, \'att\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_1val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_2ability1" onchange="craftchange(1, \'att\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_2val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_3ability1" onchange="craftchange(1, \'att\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_3val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_4ability1" onchange="craftchange(1, \'att\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_4val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_attfixed1" style="margin-top: 7px;"></span> \
  </td> \
  <td></td> \
  <td align=center> \
    <input id="hequipprof2" type="hidden" value="0" /> \
    <span id="artifact_attimg2"></span> \
  </td> \
  <td> \
    <select id="artifact_attselect2" name="artifact_attselect2" style="display:none;" onchange="update_artigroup(2, \'att\');"> \
      <option value="0"></option> \
    </select> \
    <span id="artifact_attcraft2" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_attcraft_1ability2" onchange="craftchange(2, \'att\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_1val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_2ability2" onchange="craftchange(2, \'att\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_2val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_3ability2" onchange="craftchange(2, \'att\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_3val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_attcraft_4ability2" onchange="craftchange(2, \'att\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_attcraft_4val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_attfixed2" style="margin-top: 7px;"></span> \
  <td> \
</tr> \
<tr> \
  <td align=center> \
    <span id="artifact_defimg1"></span> \
  <td> \
    <select id="artifact_defselect1" name="artifact_defselect1" style="display:none;" onchange="update_artigroup(1, \'def\');"> \
      <option value="0"></option> \
    </select> \
    <span id="artifact_defcraft1" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_defcraft_1ability1" onchange="craftchange(1, \'def\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_1val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_2ability1" onchange="craftchange(1, \'def\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_2val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_3ability1" onchange="craftchange(1, \'def\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_3val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_4ability1" onchange="craftchange(1, \'def\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_4val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_deffixed1" style="margin-top: 7px;"></span> \
  </td> \
  <td></td> \
  <td align=center> \
    <span id="artifact_defimg2"></span> \
  </td> \
  <td> \
    <select id="artifact_defselect2" name="artifact_defselect2" style="display:none;" onchange="update_artigroup(2, \'def\');"> \
      <option value="0"></option> \
    </select> \
    <span id="artifact_defcraft2" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_defcraft_1ability2" onchange="craftchange(2, \'def\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_1val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_2ability2" onchange="craftchange(2, \'def\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_2val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_3ability2" onchange="craftchange(2, \'def\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_3val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_defcraft_4ability2" onchange="craftchange(2, \'def\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_defcraft_4val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_deffixed2" style="margin-top: 7px;"></span> \
  <td> \
</tr> \
<tr> \
  <td align=center> \
    <span id="artifact_miscimg1" style="display:none;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120702054434/masterofmagic/images/d/d8/ItemSlot_Misc.png" width="32" height="32" /></span> \
  <td> \
    <select id="artifact_miscselect1" name="artifact_miscselect1" style="display:none;" onchange="update_artigroup(1, \'misc\');"> \
      <option value="0" selected="selected"></option> \
      <option value="7">Crafted Amulet</option> \
      <option value="700">Amulet of Battle</option> \
      <option value="701">Amulet of Lesser Shielding</option> \
      <option value="702">Amulet of Resistance</option> \
      <option value="703">Band of Chivalry</option> \
      <option value="704">Bird of Paradise</option> \
      <option value="705">Bracer of Invulnerability</option> \
      <option value="706">Bracer of Mrad</option> \
      <option value="707">Cloak of Armor</option> \
      <option value="708">Cross of Blessed Death</option> \
      <option value="709">Devil\'s Eye of Fear</option> \
      <option value="710">Ehr Rhee</option> \
      <option value="711">Elven Ring of Health</option> \
      <option value="712">Gauntlet of Eastwood</option> \
      <option value="713">Gem of the Aerie</option> \
      <option value="714">Helm of Everlasting</option> \
      <option value="715">Helm of the Tides</option> \
      <option value="716">Helm of Trollish Might</option> \
      <option value="717">Jafar\'s Orb of Sight</option> \
      <option value="718">Magical Crystal of Power</option> \
      <option value="719">Orb of Fear</option> \
      <option value="720">Orb of Righteous Sight</option> \
      <option value="721">Orion\'s Belt</option> \
      <option value="722">Pin of Health</option> \
      <option value="723">Ring of Dasmiff</option> \
      <option value="724">Ring of Power</option> \
      <option value="725">Ring of the Mad Mage</option> \
      <option value="726">Trinket of Strength</option> \
    </select> \
    <span id="artifact_misccraft1" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_misccraft_1ability1" onchange="craftchange(1, \'misc\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_1val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_2ability1" onchange="craftchange(1, \'misc\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_2val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_3ability1" onchange="craftchange(1, \'misc\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_3val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_4ability1" onchange="craftchange(1, \'misc\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_4val1" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_miscfixed1" style="margin-top: 7px;"></span> \
  </td> \
  <td></td> \
  <td align=center> \
    <span id="artifact_miscimg2" style="display:none;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120702054434/masterofmagic/images/d/d8/ItemSlot_Misc.png" width="32" height="32" /></span> \
  </td> \
  <td> \
    <select id="artifact_miscselect2" name="artifact_miscselect2" style="display:none;" onchange="update_artigroup(2, \'misc\');"> \
      <option value="0" selected="selected"></option> \
      <option value="7">Crafted Amulet</option> \
    </select> \
    <span id="artifact_misccraft2" style="display:none; margin-top: 4px; margin-left: 16px; line-height: 24px;"> \
      <select id="artifact_misccraft_1ability2" onchange="craftchange(2, \'misc\', 1);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_1val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_2ability2" onchange="craftchange(2, \'misc\', 2);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_2val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_3ability2" onchange="craftchange(2, \'misc\', 3);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_3val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select><br /> \
      <select id="artifact_misccraft_4ability2" onchange="craftchange(2, \'misc\', 4);"> \
        <option value="0"></option> \
      </select> \
      <select id="artifact_misccraft_4val2" style="display:none;" onchange="calcdamage();"> \
        <option value="0"></option> \
      </select> \
    </span> \
    <span id="artifact_miscfixed2" style="margin-top: 7px;"></span> \
  <td> \
</tr> \
<tr> \
  <td valign="top"><b>Enchantments:</b></td> \
  <td valign="top"> \
    <span id="eshow1"><a href="" onClick="toggle_eview(1, 2); return false;">(show)</a></span> \
    <span id="eselect1" name="eselect1" style="display:none;"> \
      <a href="" onClick="toggle_eview(1, 1); return false;">(hide)</a><br /> \
      <input id="ench_bless1" name="ench_bless1" type="checkbox" onchange="calcdamage();" />Bless<br /> \
      <span id="show_enchnormala1"><input id="ench_holyweap1" name="ench_holyweap1" type="checkbox" onchange="calcdamage();" />Holy Weapon/Holy Arms<br /> \
      <input id="ench_holyarmor1" name="ench_holyarmor1" type="checkbox" onchange="calcdamage();" />Holy Armor<br /></span> \
      <input id="ench_truesight1" name="ench_truesight1" type="checkbox" onchange="calcdamage();" />True Sight<br /> \
      <input id="ench_heavlight1" name="ench_heavlight1" type="checkbox" onchange="calcdamage();" />Heavenly Light<br /> \
      <input id="ench_invuln1" name="ench_invuln1" type="checkbox" onchange="calcdamage();" />Invulnerability<br /> \
      <input id="ench_righteous1" name="ench_righteous1" type="checkbox" onchange="calcdamage();" />Righteousness<br /> \
      <input id="ench_charmlife1" name="ench_charmlife1" type="checkbox" onchange="calcdamage();" />Charm of Life<br /> \
      <input id="ench_wraithform1" name="ench_wraithform1" type="checkbox" onchange="calcdamage();" />Wraith Form<br /> \
      <input id="ench_cloudshadow1" name="ench_cloudshadow1" type="checkbox" onchange="calcdamage();" />Cloud of Shadow/E. Night<br /> \
      <span id="show_enchnormalb1"><input id="ench_eldritch1" name="ench_eldritch1" type="checkbox" onchange="calcdamage();" />Eldritch Weapon<br /></span> \
    </span> \
  </td> \
  <td></td> \
  <td valign="top"><b>Enchantments:</b></td> \
  <td valign="top"> \
    <span id="eshow2"><a href="" onClick="toggle_eview(2, 2); return false;">(show)</a></span> \
    <span id="eselect2" name="eselect2" style="display:none;"> \
      <a href="" onClick="toggle_eview(2, 1); return false;">(hide)</a><br /> \
      <input id="ench_bless2" name="ench_bless2" type="checkbox" onchange="calcdamage();" />Bless<br /> \
      <span id="show_enchnormala2"><input id="ench_holyweap2" name="ench_holyweap2" type="checkbox" onchange="calcdamage();" />Holy Weapon/Holy Arms<br /> \
      <input id="ench_holyarmor2" name="ench_holyarmor2" type="checkbox" onchange="calcdamage();" />Holy Armor<br /></span> \
      <input id="ench_truesight2" name="ench_truesight2" type="checkbox" onchange="calcdamage();" />True Sight<br /> \
      <input id="ench_heavlight2" name="ench_heavlight2" type="checkbox" onchange="calcdamage();" />Heavenly Light<br /> \
      <input id="ench_invuln2" name="ench_invuln2" type="checkbox" onchange="calcdamage();" />Invulnerability<br /> \
      <input id="ench_righteous2" name="ench_righteous2" type="checkbox" onchange="calcdamage();" />Righteousness<br /> \
      <input id="ench_charmlife2" name="ench_charmlife2" type="checkbox" onchange="calcdamage();" />Charm of Life<br /> \
      <input id="ench_wraithform2" name="ench_wraithform2" type="checkbox" onchange="calcdamage();" />Wraith Form<br /> \
      <input id="ench_cloudshadow2" name="ench_cloudshadow2" type="checkbox" onchange="calcdamage();" />Cloud of Shadow/E. Night<br /> \
      <span id="show_enchnormalb2"><input id="ench_eldritch2" name="ench_eldritch2" type="checkbox" onchange="calcdamage();" />Eldritch Weapon<br /></span> \
    </span> \
  </td> \
</tr> \
<tr> \
  <td> \
    <span id="attslabel1" style="display: none;"><b>Select attack:</b></span> \
  </td> \
  <td> \
    <select id="attselect1" name="attselect1" style="display: none;" onchange="calcdamage();"> \
      <option value="0">Melee</option> \
      <option value="1">Ranged</option> \
    </select> \
  </td> \
  <td></td> \
  <td> \
    <span id="attslabel2" style="display: none;"><b>Select attack:</b></span> \
  </td> \
  <td> \
    <select id="attselect2" name="attselect2" style="display: none;"> \
      <option value="0">Melee</option> \
      <option value="1">Ranged</option> \
    </select> \
  </td> \
</tr> \
<tr> \
  <td align=center colspan=5> \
    <b>Ranged attack distance:</b> \
    <select id="rangedist" name="rangedist" onchange="calcdamage();"> \
      <option value="0">1-2</option> \
      <option value="1">3-5</option> \
      <option value="2" selected="selected">6-8</option> \
      <option value="3">9-11</option> \
      <option value="4">12-14</option> \
      <option value="5">15-17</option> \
      <option value="6">18-20</option> \
    </select> \
    &nbsp; <b>Node aura:</b> \
    <select id="aura" name="aura" onchange="calcdamage();"> \
      <option value="0" selected="selected">None</option> \
      <option value="1">Chaos</option> \
      <option value="2">Nature</option> \
      <option value="3">Sorcery</option> \
    </select> \
  </td> \
</tr> \
</table>';
  var resultsspan = document.getElementById('resultsspan');
  resultsspan.innerHTML = '<table width=700> \
<tr><td colspan=3><span id="resultserror"></span></td></tr> \
<tr> \
  <td valign="top" width=49%> \
    <span id="results1"></span> \
  </td> \
  <td></td> \
  <td valign="top" width=49%> \
    <span id="results2"></span> \
  </td> \
</tr> \
</table>';
}

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

function binom_arr(to_fail, num_rolls) {
  var new_arr = new Array(1 + num_rolls);
  var idx;
  if (to_fail <= 0) {
    for (idx = 0; idx < num_rolls; idx += 1) {
      new_arr[idx] = 0;
    }
    new_arr[num_rolls] = 1;
    return new_arr;
  }
  var ntmp = Math.pow(to_fail, num_rolls);
  new_arr[0] = ntmp;
  for (idx = 1; idx <= num_rolls; idx += 1) {
    ntmp *= (num_rolls + 1 - idx) * (1 - to_fail) / (to_fail * idx);
    new_arr[idx] = ntmp;
  }
  return new_arr;
}

function binom_arr_stride(to_fail, num_rolls, stride) {
  var new_arr = new Array(1 + num_rolls * stride);
  var idx;
  var idx2;
  if (to_fail <= 0) {
    for (idx = 0; idx < num_rolls * stride; idx += 1) {
      new_arr[idx] = 0;
    }
    new_arr[num_rolls * stride] = 1;
    return new_arr;
  }
  var ntmp = Math.pow(to_fail, num_rolls);
  new_arr[0] = ntmp;
  for (idx = 1; idx <= num_rolls; idx += 1) {
    for (idx2 = (idx - 1) * stride + 1; idx2 < idx * stride; idx2 += 1) {
      new_arr[idx2] = 0;
    }
    ntmp *= (num_rolls + 1 - idx) * (1 - to_fail) / (to_fail * idx);
    new_arr[idx * stride] = ntmp;
  }
  return new_arr;
}

function get_block_arr(to_fail, num_rolls, invuln) {
  if (!invuln) {
    return binom_arr(to_fail, num_rolls);
  }
  var new_arr = new Array(3 + num_rolls);
  var idx;
  if (to_fail <= 0) {
    for (idx = 0; idx < num_rolls + 2; idx += 1) {
      new_arr[idx] = 0;
    }
    new_arr[num_rolls + 2] = 1;
    return new_arr;
  }
  var ntmp = Math.pow(to_fail, num_rolls);
  new_arr[0] = 0;
  new_arr[1] = 0;
  new_arr[2] = ntmp;
  for (idx = 1; idx <= num_rolls; idx += 1) {
    ntmp *= (num_rolls + 1 - idx) * (1 - to_fail) / (to_fail * idx);
    new_arr[idx + 2] = ntmp;
  }
  return new_arr;
}

function calc_transition_table(swords, att_to_hit, block_arr, def_fig_max_hp, def_max_hp, transition_table, kill_entire_figs) {
  var att_arr;
  var idx;
  var idx2;
  var idx3;
  var figs_left;
  var idx4;
  var row_offset;
  var partial_sum;
  transition_table[0] = 1;
  for (idx = 1; idx <= def_max_hp; idx += 1) {
    row_offset = idx * (1 + def_max_hp);
    att_arr = binom_arr(1.0 - att_to_hit, swords);
    for (idx2 = 0; idx2 <= idx; idx2 += 1) {
      transition_table[row_offset + idx2] = 0;
    }
    figs_left = Math.ceil((idx - 0.5) / def_fig_max_hp);
    att_arr = apply_block(att_arr, block_arr);
    if (kill_entire_figs == 0) {
      idx4 = 0;
      partial_sum = 0;
      // idx2 = # of extra blocks due to fully-killed figures
      for (idx2 = 0; idx2 < figs_left; idx2 += 1) {
        for (idx3 = 0; idx3 < Math.min(att_arr.length, def_fig_max_hp); idx3 += 1) {
          if (idx4 >= idx) {
            break;
          }
          partial_sum += att_arr[idx3];
          transition_table[row_offset + idx - idx4] = att_arr[idx3];
          idx4 += 1;
        }
        if (idx4 >= idx) {
          break;
        }
        att_arr = apply_block(att_arr, block_arr, def_fig_max_hp);
        if (att_arr.length == 0) {
          break;
        }
      }
      if (idx4 >= idx) {
        transition_table[row_offset] += 1.0 - partial_sum;
      }
    } else {
      transition_table[row_offset] = 1;
      for (idx2 = 0; idx2 < Math.min(att_arr.length, figs_left); idx2 += 1) {
        transition_table[row_offset + idx - idx2 * def_fig_max_hp] = att_arr[idx2];
        transition_table[row_offset] -= att_arr[idx2];
      }
    }
  }
}

function apply_grand_transition_table_to_side(att_side, att_max_fig_ct, att_fig_hp, def_max_hp, grand_transition_table, def_tmp_prob_array, joint_hparr) {
  // For an attack that occurs once regardless of the number of attacking
  // figures (e.g. gaze), set att_fig_hp to att_fig_hp * att_max_fig_ct, and
  // att_max_fig_ct to 1.
  // Otherwise, grand_transition_table is assumed to be a sequence of regular
  // transition tables, one for each possible (positive) attacking figure
  // count.  (This used to just apply a single transition table multiple times,
  // but then Immolation invalidated that design.)
  var att_max_hp_p1 = att_max_fig_ct * att_fig_hp + 1;
  var def_max_hp_p1 = def_max_hp + 1;
  var att_fig_ct;
  var grand_offset;
  var jidx;
  var jrow_offset;
  var jconst;
  var idx;
  var idx2;
  var trow_offset;
  for (att_fig_ct = 1; att_fig_ct <= att_max_fig_ct; att_fig_ct += 1) {
    grand_offset = (att_fig_ct - 1) * def_max_hp_p1 * def_max_hp_p1;
    if (att_side == 0) {
      for (jidx = 1 + (att_fig_ct - 1) * att_fig_hp; jidx <= att_fig_ct * att_fig_hp; jidx += 1) {
        jrow_offset = jidx * def_max_hp_p1;
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          def_tmp_prob_array[idx] = 0;
        }
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          trow_offset = idx * def_max_hp_p1 + grand_offset;
          jconst = joint_hparr[jrow_offset + idx];
          for (idx2 = 0; idx2 <= idx; idx2 += 1) {
            def_tmp_prob_array[idx2] += jconst * grand_transition_table[trow_offset + idx2];
          }
        }
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          joint_hparr[jrow_offset + idx] = def_tmp_prob_array[idx];
        }
      }
    } else {
      for (jidx = 1 + (att_fig_ct - 1) * att_fig_hp; jidx <= att_fig_ct * att_fig_hp; jidx += 1) {
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          def_tmp_prob_array[idx] = 0;
        }
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          trow_offset = idx * def_max_hp_p1 + grand_offset;
          jconst = joint_hparr[idx * att_max_hp_p1 + jidx];
          for (idx2 = 0; idx2 <= idx; idx2 += 1) {
            def_tmp_prob_array[idx2] += jconst * grand_transition_table[trow_offset + idx2];
          }
        }
        for (idx = 0; idx <= def_max_hp; idx += 1) {
          joint_hparr[idx * att_max_hp_p1 + jidx] = def_tmp_prob_array[idx];
        }
      }
    }
  }
}

function simultaneous_resolve(max_fig0, max_fighp0, max_fig1, max_fighp1, grand_transition_table0, grand_transition_table1, tmp_hparr, joint_hparr) {
  var maxhp0_p1 = 1 + max_fig0 * max_fighp0;
  var maxhp1_p1 = 1 + max_fig1 * max_fighp1;
  var hparr_size = maxhp0_p1 * maxhp1_p1;
  var idx0a;
  var idx1a;
  var idx0b;
  var idx1b;
  var idx;
  var row_offset;
  var row_offset2;
  var row_offset2x;
  var row_offset3;
  var row_offset4;
  var figs0_m1;
  var figs1_m1;
  var pconst;
  var pconst2;
  for (idx = 0; idx < hparr_size; idx += 1) {
    tmp_hparr[idx] = 0;
  }
  for (idx0a = 0; idx0a < maxhp0_p1; idx0a += 1) {
    row_offset = idx0a * maxhp1_p1;
    row_offset2 = idx0a * maxhp0_p1;
    figs0_m1 = 0;
    if (idx0a > 0) {
      figs0_m1 = Math.ceil((idx0a - 0.5) / max_fighp0) - 1;
    }
    for (idx1a = 0; idx1a < maxhp1_p1; idx1a += 1) {
      pconst = joint_hparr[row_offset + idx1a];
      if (pconst == 0) {
        continue;
      }
      if ((idx0a == 0) || (idx1a == 0)) {
        // the grand transition tables do not have a "zero figure" component,
        // so this is a special case.  todo: figure out how lifesteal works
        // here.
        tmp_hparr[row_offset + idx1a] += pconst;
      } else {
	figs1_m1 = 0;
	if (idx1a > max_fighp1) {
	  figs1_m1 = Math.ceil((idx1a - 0.5) / max_fighp1) - 1;
	}
	row_offset2x = row_offset2 + maxhp0_p1 * maxhp0_p1 * figs1_m1;
	row_offset3 = idx1a * maxhp1_p1 + maxhp1_p1 * maxhp1_p1 * figs0_m1;
	for (idx0b = 0; idx0b <= idx0a; idx0b += 1) {
	  row_offset4 = idx0b * maxhp1_p1;
	  pconst2 = pconst * grand_transition_table0[row_offset2x + idx0b];
	  for (idx1b = 0; idx1b <= idx1a; idx1b += 1) {
	    tmp_hparr[row_offset4 + idx1b] += pconst2 * grand_transition_table1[row_offset3 + idx1b];
	  }
	}
      }
    }
  }
  for (idx = 0; idx < hparr_size; idx += 1) {
    joint_hparr[idx] = tmp_hparr[idx];
  }
}

/*
function simultaneous_resolve_lsteal(max_fig0, max_fighp0, lsteal0, resist0, max_fig1, max_fighp1, lsteal1, resist1, grand_transition_table0, grand_transition_table1, tmp_hparr, joint_hparr) {
  var maxhp0_p1 = 1 + max_fig0 * max_fighp0;
  var maxhp1_p1 = 1 + max_fig1 * max_fighp1;
  var hparr_size = maxhp0_p1 * maxhp1_p1;
  var idx0a;
  var idx1a;
  var idx0b;
  var idx1b;
  var idx;
  var row_offset;
  var row_offset2;
  var row_offset2x;
  var row_offset3;
  var row_offset4;
  var figs0_m1;
  var figs1_m1;
  var pconst;
  var pconst2;
  for (idx = 0; idx < hparr_size; idx += 1) {
    tmp_hparr[idx] = 0;
  }
  tmp_hparr[0] = joint_hparr[0];
  for (figs0_m1 = 0; figs0_m1 < ; figs0_m1 += 1) {
    for (figs1_m1 = 0; figs1_m1 < ; figs1_m1 += 1) {
      // create lifesteal table before proceeding.
      for (idx0a = ) {
      }
    }
  }
  for (idx0a = 0; idx0a < maxhp0_p1; idx0a += 1) {
    row_offset = idx0a * maxhp1_p1;
    row_offset2 = idx0a * maxhp0_p1;
    figs0_m1 = 0;
    if (idx0a > max_fighp0) {
      figs0_m1 = Math.ceil((idx0a - 0.5) / max_fighp0) - 1;
    }
    for (idx1a = 0; idx1a < maxhp1_p1; idx1a += 1) {
      pconst = joint_hparr[row_offset + idx1a];
      if (pconst == 0) {
        continue;
      }
      figs1_m1 = 0;
      if (idx1a > max_fighp1) {
        figs1_m1 = Math.ceil((idx1a - 0.5) / max_fighp1) - 1;
      }
      row_offset2x = row_offset2 + maxhp0_p1 * maxhp0_p1 * figs1_m1;
      row_offset3 = idx1a * maxhp1_p1 + maxhp1_p1 * maxhp1_p1 * figs0_m1;
      for (idx0b = 0; idx0b <= idx0a; idx0b += 1) {
        row_offset4 = idx0b * maxhp1_p1;
        pconst2 = pconst * grand_transition_table0[row_offset2x + idx0b];
        for (idx1b = 0; idx1b <= idx1a; idx1b += 1) {
          tmp_hparr[row_offset4 + idx1b] += pconst2 * grand_transition_table1[row_offset3 + idx1b];
        }
      }
    }
  }
  for (idx = 0; idx < hparr_size; idx += 1) {
    joint_hparr[idx] = tmp_hparr[idx];
  }
}
*/

function repeat_melee_attack(def_max_hp_p1, tmp_transition_table, transition_table) {
  // M^2 = M * M.
  var def_max_hp_p1_sq = def_max_hp_p1 * def_max_hp_p1;
  var write_offset;
  var read_offset_nm1;
  var idx;
  var idx2;
  var idx3;
  var cur_prob;
  // idx = starting HPs
  for (idx = 0; idx < def_max_hp_p1; idx += 1) {
    // idx2 = HPs remaining after both attacks
    write_offset = idx * def_max_hp_p1;
    read_offset_nm1 = idx * def_max_hp_p1;
    for (idx2 = 0; idx2 <= idx; idx2 += 1) {
      cur_prob = 0.0;
      // idx3 = HPs remaining after 1 attack
      for (idx3 = idx2; idx3 <= idx; idx3 += 1) {
	cur_prob += transition_table[read_offset_nm1 + idx3] * transition_table[idx3 * def_max_hp_p1 + idx2];
      }
      tmp_transition_table[write_offset + idx2] = cur_prob;
    }
    for (idx2 = idx + 1; idx2 < def_max_hp_p1; idx2 += 1) {
      tmp_transition_table[write_offset + idx2] = 0.0;
    }
  }
  for (idx = 0; idx < def_max_hp_p1_sq; idx += 1) {
    transition_table[idx] = tmp_transition_table[idx];
  }
}

function make_grand_transition_table(att_max_fig_ct, def_max_hp_p1, grand_transition_table) {
  // Converts a plain 2-dimensional transition table into a sequence of them,
  // one for each possible number of attacking figures.
  var def_max_hp_p1_sq = def_max_hp_p1 * def_max_hp_p1;
  var att_fig_ct;
  var base_write_offset;
  var write_offset;
  var read_offset_nm1;
  var idx;
  var idx2;
  var idx3;
  var cur_prob;
  for (att_fig_ct = 2; att_fig_ct <= att_max_fig_ct; att_fig_ct += 1) {
    // Apply the first transition table to the previous transition table.
    // M^n = M^{n-1} * M^1.
    // (er, I should just use a standard matrix multiply...)
    base_write_offset = (att_fig_ct - 1) * def_max_hp_p1_sq;
    // idx = starting HPs
    for (idx = 0; idx < def_max_hp_p1; idx += 1) {
      // idx2 = HPs remaining after n attacks
      write_offset = base_write_offset + idx * def_max_hp_p1;
      read_offset_nm1 = (att_fig_ct - 2) * def_max_hp_p1_sq + idx * def_max_hp_p1;
      for (idx2 = 0; idx2 <= idx; idx2 += 1) {
        cur_prob = 0.0;
        // idx3 = HPs remaining after (n-1) attacks
        for (idx3 = idx2; idx3 <= idx; idx3 += 1) {
          cur_prob += grand_transition_table[read_offset_nm1 + idx3] * grand_transition_table[idx3 * def_max_hp_p1 + idx2];
        }
        grand_transition_table[write_offset + idx2] = cur_prob;
      }
      for (idx2 = idx + 1; idx2 < def_max_hp_p1; idx2 += 1) {
        grand_transition_table[write_offset + idx2] = 0.0;
      }
    }
  }
}

function calc_one_attack(att_side, att_max_fig_ct, att_val, att_to_hit, att_fig_hp, def_max_fig_ct, shields, def_toblock, def_fig_hp, def_invuln, transition_table, def_tmp_prob_array, joint_hparr, kill_entire_figs) {
  var def_max_hp = def_max_fig_ct * def_fig_hp;
  var block_arr = get_block_arr(1.0 - def_toblock, shields, def_invuln);
  if (arguments.length < 14) {
    kill_entire_figs = 0;
  }
  calc_transition_table(att_val, att_to_hit, block_arr, def_fig_hp, def_max_hp, transition_table, kill_entire_figs);
  make_grand_transition_table(att_max_fig_ct, def_max_hp + 1, transition_table);
  apply_grand_transition_table_to_side(att_side, att_max_fig_ct, att_fig_hp, def_max_hp, transition_table, def_tmp_prob_array, joint_hparr);
}

function construct_gaze_transition_table(maxfig, resist, bless, chaosnature_def, max_fighp, dgaze, sgaze, doomgaze, transition_table) {
  var maxhp = maxfig * max_fighp;
  var maxhp_p1 = maxhp + 1;
  var dgaze_resist = resist + 3 * bless;
  var sgaze_resist = resist + chaosnature_def;
  var row_offset;
  var idx;
  var idx2;
  var idx3;
  var binom_buf;
  var binom_buf2;
  var survival_prob1;
  var survival_prob2;
  var delta;
  var ntmp;
  for (idx = 0; idx <= maxhp; idx += 1) {
    row_offset = idx * maxhp_p1;
    for (idx2 = 0; idx2 < idx; idx2 += 1) {
      transition_table[row_offset + idx2] = 0;
    }
    transition_table[row_offset + idx] = 1;
  }
  if ((dgaze > dgaze_resist) || (sgaze > sgaze_resist)) {
    survival_prob1 = 1.0;
    survival_prob2 = 1.0;
    if (dgaze - dgaze_resist < 10) {
      if (dgaze > dgaze_resist) {
        survival_prob1 = 0.1 * (10 + dgaze_resist - dgaze);
      }
    } else {
      survival_prob1 = 0;
    }
    if (sgaze - sgaze_resist < 10) {
      if (sgaze > sgaze_resist) {
        if (survival_prob1 == 1.0) {
          survival_prob1 = 0.1 * (10 + sgaze_resist - sgaze);
        } else if (survival_prob1 != 0.0) {
          survival_prob2 = 0.1 * (10 + sgaze_resist - sgaze);
        }
      }
    } else {
      survival_prob1 = 0;
    }
    for (idx = 1; idx <= maxfig; idx += 1) {
      if (survival_prob2 != 1.0) {
        binom_buf2 = binom_arr(1.0 - survival_prob1, idx);
        binom_buf = new Array(1 + idx);
        for (idx2 = 1; idx2 <= idx; idx2 += 1) {
          binom_buf[idx2] = 0.0;
        }
        ntmp = Math.pow(1.0 - survival_prob2, idx);
        binom_buf[0] = ntmp;
        for (idx2 = idx - 1; idx2 >= 0; idx2 -= 1) {
          ntmp *= (1 + idx2) * survival_prob2 / ((1.0 - survival_prob2) * (idx - idx2));
          for (idx3 = 0; idx3 <= idx; idx3 += 1) {
            if (idx3 <= idx2) {
              binom_buf[0] += ntmp * binom_buf2[idx3];
            } else {
              binom_buf[idx3 - idx2] += ntmp * binom_buf2[idx3];
            }
          }
        }
      } else {
        binom_buf = binom_arr(1.0 - survival_prob1, idx);
      }
      for (idx2 = (idx - 1) * max_fighp + 1; idx2 <= idx * max_fighp; idx2 += 1) {
        row_offset = idx2 * maxhp_p1;
        delta = idx * max_fighp - idx2;
        transition_table[row_offset] = binom_buf[0];
        for (idx3 = 1; idx3 <= idx; idx3 += 1) {
          transition_table[row_offset + idx3 * max_fighp - delta] = binom_buf[idx3];
        }
      }
    }
  }
  if (doomgaze > 0) {
    for (idx = 1; idx <= maxhp; idx += 1) {
      row_offset = idx * maxhp_p1;
      for (idx2 = 1; idx2 <= doomgaze; idx2 += 1) {
        transition_table[row_offset] += transition_table[row_offset + idx2];
        if (idx2 == idx) {
          break;
        }
      }
      for (idx2 = 1; idx2 <= idx - doomgaze; idx2 += 1) {
        transition_table[row_offset + idx2] = transition_table[row_offset + idx2 + doomgaze];
      }
      if (idx > doomgaze) {
        idx2 = idx - doomgaze + 1;
      } else {
        idx2 = 1;
      }
      for (; idx2 <= idx; idx2 += 1) {
        transition_table[row_offset + idx2] = 0;
      }
    }
  }
}

function apply_touch_to_grand_transition_table(poison_strength, att_max_fig_ct, att_to_hit, def_max_fig_ct, def_fig_hp, tmp_transition_table, grand_transition_table) {
  // if poison_str == 0, then we're dealing with stoning touch/dispel evil
  // which kills entire defending figures at a time
  var def_max_hp_p1 = def_max_fig_ct * def_fig_hp + 1;
  var stride = 1;
  var att_arr_tmp;
  var att_arr;
  var transition_table_idx;
  var grand_offset;
  var def_start_hp;
  var def_mid_hp;
  var max_damage;
  var cur_prob;
  var cur_damage;
  var write_row_offset;
  var row_offset;
  var idx;
  if (poison_strength == 0) {
    stride = def_fig_hp;
  }
  for (transition_table_idx = 0; transition_table_idx < att_max_fig_ct; transition_table_idx += 1) {
    grand_offset = def_max_hp_p1 * def_max_hp_p1 * transition_table_idx;
    for (idx = 0; idx < def_max_hp_p1 * def_max_hp_p1; idx += 1) {
      tmp_transition_table[idx] = 0.0;
    }
    if (poison_strength > 0) {
      max_damage = poison_strength * (transition_table_idx + 1);
      att_arr = binom_arr(1.0 - att_to_hit, max_damage);
    } else {
      att_arr = binom_arr_stride(1.0 - att_to_hit, transition_table_idx + 1, def_fig_hp);
      max_damage = def_fig_hp * (transition_table_idx + 1);
    }
    for (def_start_hp = 0; def_start_hp < def_max_hp_p1; def_start_hp += 1) {
      write_row_offset = def_start_hp * def_max_hp_p1;
      row_offset = grand_offset + write_row_offset;
      for (def_mid_hp = 0; def_mid_hp <= def_start_hp; def_mid_hp += 1) {
	for (cur_damage = 0; cur_damage <= max_damage; cur_damage += stride) {
	  cur_prob = grand_transition_table[row_offset + def_mid_hp] * att_arr[cur_damage];
	  if (cur_damage < def_mid_hp) {
	    tmp_transition_table[write_row_offset + def_mid_hp - cur_damage] += cur_prob;
	  } else {
	    tmp_transition_table[write_row_offset] += cur_prob;
	  }
	}
      }
    }
    for (idx = 0; idx < def_max_hp_p1 * def_max_hp_p1; idx += 1) {
      grand_transition_table[grand_offset + idx] = tmp_transition_table[idx];
    }
  }
}

function apply_immolation_to_grand_transition_table(att_immo, att_max_fig_ct, shields_vsimmo, def_toblock, def_max_fig_ct, def_fig_hp, def_invuln, tmp_transition_table, immo_damage_array, grand_transition_table) {
  // Immolation must be applied to a (grand) transition table describing the
  // effect of simultaneous attacks, since its power depends on the number of
  // defending, not attacking, figures.

  // Todo:
  // 1. Verify that the top figure cannot take more damage than its current
  //    health.  This is true for the Fireball spell, so it's my working
  //    assumption.
  // 2. Verify the attack is always 30% to-hit.  (Even vs. 1.31 Lucky?)

  var def_max_hp = def_max_fig_ct * def_fig_hp;
  var def_max_hp_p1 = def_max_hp + 1;
  var att_arr = binom_arr(0.7, att_immo);
  var block_arr = get_block_arr(1.0 - def_toblock, shields_vsimmo, def_invuln);
  var immo_single_fig_max = att_immo;
  var transition_table_idx;
  var def_fig_ct;
  var top_def_fig_hp;
  var cur_def_total_hp;
  var max_immo_dmg;
  var max_top_fig_immo_dmg;
  var idx;
  var idx2;
  var idx3;
  var cur_prob;
  var write_row_offset;
  var row_offset;
  att_arr = apply_block(att_arr, block_arr);
  if (att_immo > def_fig_hp) {
    immo_single_fig_max = def_fig_hp;
    for (idx = def_fig_hp + 1; idx <= att_immo; idx += 1) {
      att_arr[def_fig_hp] += att_arr[idx];
    }
  }
  // immo_damage_array[x] = damage distribution for n-1 full figures
  // immo_damage_array[k * def_max_hp_p1 + x] = truncated damage distribution
  //   for single figure with k HP
  immo_damage_array[0] = 1.0;
  for (idx = 1; idx < def_max_hp_p1; idx += 1) {
    immo_damage_array[idx] = 0.0;
  }
  for (idx = 1; idx <= def_fig_hp; idx += 1) {
    for (idx2 = 0; idx2 <= idx; idx2 += 1) {
      if (idx2 <= att_immo) {
        immo_damage_array[idx * def_max_hp_p1 + idx2] = att_arr[idx2];
      } else {
        immo_damage_array[idx * def_max_hp_p1 + idx2] = 0.0;
      }
    }
    if (idx < att_immo) {
      for (idx2 = idx + 1; idx2 <= immo_single_fig_max; idx2 += 1) {
	immo_damage_array[idx * def_max_hp_p1 + idx] += att_arr[idx2];
      }
    }
  }
  for (transition_table_idx = 0; transition_table_idx < att_max_fig_ct; transition_table_idx += 1) {
    grand_offset = def_max_hp_p1 * def_max_hp_p1 * transition_table_idx;
    for (idx = 0; idx < def_max_hp_p1 * def_max_hp_p1; idx += 1) {
      tmp_transition_table[idx] = 0.0;
    }
    for (def_fig_ct = 1; def_fig_ct <= def_max_fig_ct; def_fig_ct += 1) {
      if (def_fig_ct > 1) {
        // backwards so we can do this update in-place
        // idx = total damage after this hit
        idx = immo_single_fig_max * (def_fig_ct - 1);
        if (idx > def_max_hp) {
          idx = def_max_hp;
        }
        for (; idx >= 0; idx -= 1) {
          cur_prob = 0.0;
          // idx2 = strength of latest hit
          for (idx2 = 0; idx2 <= immo_single_fig_max; idx2 += 1) {
            cur_prob += immo_damage_array[idx - idx2] * att_arr[idx2];
            if (idx2 == idx) {
              break;
            }
          }
          immo_damage_array[idx] = cur_prob;
        }
      }
      for (top_def_fig_hp = 1; top_def_fig_hp <= def_fig_hp; top_def_fig_hp += 1) {
        cur_def_total_hp = (def_fig_ct - 1) * def_fig_hp + top_def_fig_hp;
        write_row_offset = cur_def_total_hp * def_max_hp_p1;
        row_offset = grand_offset + write_row_offset;
        if (top_def_fig_hp < immo_single_fig_max) {
          max_immo_dmg = top_def_fig_hp;
        } else {
          max_immo_dmg = immo_single_fig_max;
        }
        max_immo_dmg += immo_single_fig_max * (def_fig_ct - 1);
        // idx = total immolation damage
        for (idx = 0; idx <= max_immo_dmg; idx += 1) {
          cur_prob = 0.0; // multiplier
          max_top_fig_immo_dmg = top_def_fig_hp;
          if (max_top_fig_immo_dmg > idx) {
            max_top_fig_immo_dmg = idx;
          }
          // idx2 = immolation damage done to last figure
          for (idx2 = 0; idx2 <= max_top_fig_immo_dmg; idx2 += 1) {
            cur_prob += immo_damage_array[idx - idx2] * immo_damage_array[top_def_fig_hp * def_max_hp_p1 + idx2];
          }
	  // idx2 = HP left after other attacks here
	  for (idx2 = 0; idx2 <= cur_def_total_hp; idx2 += 1) {
            // idx3 = HP left after immolation attack as well
	    if (idx2 <= idx) {
	      idx3 = 0;
	    } else {
	      idx3 = idx2 - idx;
	    }
	    tmp_transition_table[write_row_offset + idx3] += cur_prob * grand_transition_table[row_offset + idx2];
	  }
        }
      }
    }
    for (idx = 0; idx < def_max_hp_p1 * def_max_hp_p1; idx += 1) {
      grand_transition_table[grand_offset + idx] = tmp_transition_table[idx];
    }
  }
}

function apply_gazes(att_side, att_dgaze, att_sgaze, att_doomgaze, att_immo, att_max_hp, def_max_fig_ct, def_resist, def_bless, def_chaosnature, shields_vsimmo, def_toblock, def_fig_hp, def_invuln, transition_table, def_tmp_prob_array, workspace3, workspace4, joint_hparr) {
  var def_max_hp = def_max_fig_ct * def_fig_hp;
  construct_gaze_transition_table(def_max_fig_ct, def_resist, def_bless, def_chaosnature, def_fig_hp, att_dgaze, att_sgaze, att_doomgaze, transition_table);
  if (att_immo > 0) {
    // bless/resist elements/elemental armor already applied to shields_vsimmo
    apply_immolation_to_grand_transition_table(att_immo, 1, shields_vsimmo, def_toblock, def_max_fig_ct, def_fig_hp, def_invuln, workspace3, workspace4, transition_table);
  }
  apply_grand_transition_table_to_side(att_side, 1, att_max_hp, def_max_hp, transition_table, def_tmp_prob_array, joint_hparr);
}

function calc_melee_grand_transition_table(att_side, maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch, bless, blacktouch, dispelevil, immo, color, undead, invuln, invuln_melee, iter_ct, grand_transition_table, workspace3, workspace4) {
  // Fills grand_transition_table with results from att_side melee-attacking
  // (1 - att_side).  The following components are currently implemented:
  // * Basic swords.  If swords == 0, the grand transition table is initialized
  //   to zero damage even if other melee-phase effects, e.g. poison touch,
  //   are present.
  // * Poison touch, stoning touch, destruction, death touch, dispel evil.
  // * Immolation.
  // * Haste.
  var def_side = 1 - att_side;
  var def_max_hp = maxfig[def_side] * max_fighp[def_side];
  var block_arr = get_block_arr(1.0 - (toblock_melee[def_side] * 0.01), shields[def_side], invuln_melee[def_side]);
  var iter;
  var tmp;
  calc_transition_table(attack[att_side], tohit[att_side] * 0.01, block_arr, max_fighp[def_side], def_max_hp, grand_transition_table, 0);
  if (iter_ct == 2) {
    repeat_melee_attack(def_max_hp + 1, workspace3, grand_transition_table);
  }
  make_grand_transition_table(maxfig[att_side], def_max_hp + 1, grand_transition_table);
  if (attack[att_side] < 1) {
    return;
  }
  for (iter = 0; iter < iter_ct; iter += 1) {
    if ((poison[att_side] > 0) && (resist[def_side] - pois_resist_penalty[def_side] < 10)) {
      apply_touch_to_grand_transition_table(poison[att_side], maxfig[att_side], 1.0 - ((resist[def_side] - pois_resist_penalty[def_side]) * 0.1), maxfig[def_side], max_fighp[def_side], workspace3, grand_transition_table);
    }
    if ((stouch[att_side] > 0) && (resist[def_side] + chaosnature_def[def_side] < stouch[att_side])) {
      apply_touch_to_grand_transition_table(0, maxfig[att_side], (stouch[att_side] - resist[def_side] - chaosnature_def[def_side]) * 0.1, maxfig[def_side], max_fighp[def_side], workspace3, grand_transition_table);
    }
    if ((redtouch[att_side] > 0) && (resist[def_side] + chaosnature_def[def_side] + 3 * bless[def_side] < redtouch[att_side])) {
      apply_touch_to_grand_transition_table(0, maxfig[att_side], (redtouch[att_side] - resist[def_side] - chaosnature_def[def_side] - 3 * bless[def_side]) * 0.1, maxfig[def_side], max_fighp[def_side], workspace3, grand_transition_table);
    }
    if ((blacktouch[att_side] > 0) && (resist[def_side] + 3 * bless[def_side] < blacktouch[att_side])) {
      apply_touch_to_grand_transition_table(0, maxfig[att_side], (blacktouch[att_side] - resist[def_side] - 3 * bless[def_side]) * 0.1, maxfig[def_side], max_fighp[def_side], workspace3, grand_transition_table);
    }
    if (dispelevil[att_side] && ((color[def_side] == 2) || (color[def_side] == 3))) {
      if (undead[def_side]) {
	tmp = 19;
      } else {
	tmp = 14;
      }
      if (tmp > resist[def_side]) {
	apply_touch_to_grand_transition_table(0, maxfig[att_side], (tmp - resist[def_side]) * 0.1, maxfig[def_side], max_fighp[def_side], workspace3, grand_transition_table);
      }
    }
    if (immo[att_side] > 0) {
      apply_immolation_to_grand_transition_table(immo[att_side], maxfig[att_side], shields_vsimmo[def_side], toblock[def_side] * 0.01, maxfig[def_side], max_fighp[def_side], invuln[def_side], workspace3, workspace4, grand_transition_table);
    }
  }
}

function calc_melee_one_side(att_side, maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil, immo, color, undead, invuln, invuln_melee, grand_transition_table, tmp_hparr, workspace3, workspace4, joint_hparr) {
  var def_side = 1 - att_side;
  calc_melee_grand_transition_table(att_side, maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil, immo, color, undead, invuln, invuln_melee, 1, grand_transition_table, workspace3, workspace4);
  apply_grand_transition_table_to_side(att_side, maxfig[att_side], max_fighp[att_side], maxfig[def_side] * max_fighp[def_side], grand_transition_table, tmp_hparr, joint_hparr);
}

function calc_melee_main(maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil, immo, color, undead, invuln, invuln_melee, melee_iter_cts, grand_transition_table0, grand_transition_table1, tmp_hparr, workspace3, workspace4, joint_hparr) {
  calc_melee_grand_transition_table(0, maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil, immo, color, undead, invuln, invuln_melee, melee_iter_cts[0], grand_transition_table1, workspace3, workspace4);
  calc_melee_grand_transition_table(1, maxfig, attack, shields, shields_vsimmo, resist, tohit, toblock, toblock_melee, max_fighp, poison, pois_resist_penalty, stouch, chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil, immo, color, undead, invuln, invuln_melee, melee_iter_cts[1], grand_transition_table0, workspace3, workspace4);
  simultaneous_resolve(maxfig[0], max_fighp[0], maxfig[1], max_fighp[1], grand_transition_table0, grand_transition_table1, tmp_hparr, joint_hparr);
}

function calcround(att_side, ranged_dist, counterattack_penalty, joint_hparr, workspace, workspace2, workspace2b, workspace3, workspace4, mo) {
  // ranged_dist = 0 for melee attack, 1 + Math.floor(distance / 3) for ranged attack
  var def_side = 1 - att_side;
  var attack = [mo.melee[0], mo.melee[1]];
  var ranged_attack = [mo.ranged[0], mo.ranged[1]];
  var tohit_melee = [30 + mo.tohit_melee[0] + 10 * mo.lucky[0], 30 + mo.tohit_melee[1] + 10 * mo.lucky[1]];
  var tohit_ranged = [30 + mo.tohit_ranged[0] + 10 * mo.lucky[0], 30 + mo.tohit_ranged[1] + 10 * mo.lucky[1]];
  var tohit_breath = [30 + mo.tohit_breath[0] + 10 * mo.lucky[0], 30 + mo.tohit_breath[1] + 10 * mo.lucky[1]];
  var resist = [mo.resist[0] + mo.lucky[0] + mo.holybonus[0] + mo.resistall[0], mo.resist[1] + mo.lucky[1] + mo.holybonus[1] + mo.resistall[1]];
  var breath = [mo.breath[0], mo.breath[1]];
  var gazeranged = [mo.gazeranged[0], mo.gazeranged[1]];
  var dgaze = [mo.dgaze[0], mo.dgaze[1]];
  var sgaze = [mo.sgaze[0], mo.sgaze[1]];
  var dispelevil_melee = [mo.dispelevil_melee[0], mo.dispelevil_melee[1]];
  var dispelevil_breath = [mo.dispelevil_breath[0], mo.dispelevil_breath[1]];
  var stouch_melee = [mo.stouch_melee[0], mo.stouch_melee[1]];
  var stouch_ranged = [mo.stouch_ranged[0], mo.stouch_ranged[1]];
  var stouch_breath = [mo.stouch_breath[0], mo.stouch_breath[1]];
  var redtouch_melee = [mo.redtouch_melee[0], mo.redtouch_melee[1]];
  var redtouch_ranged = [mo.redtouch_ranged[0], mo.redtouch_ranged[1]];
  var redtouch_breath = [mo.redtouch_breath[0], mo.redtouch_breath[1]];
  var blacktouch_melee = [mo.blacktouch_melee[0], mo.blacktouch_melee[1]];
  var blacktouch_ranged = [mo.blacktouch_ranged[0], mo.blacktouch_ranged[1]];
  var blacktouch_breath = [mo.blacktouch_breath[0], mo.blacktouch_breath[1]];
  var invuln_melee = [mo.invuln[0], mo.invuln[1]];
  var invuln_ranged = [0, 0];
  var invuln_breath = [0, 0];
  var righteous_base = [mo.righteous_base[0], mo.righteous_base[1]];
  var lsteal_melee = [mo.lifesteal_melee[0], mo.lifesteal_melee[1]];
  var lsteal_ranged = [mo.lifesteal_ranged[0], mo.lifesteal_ranged[1]];
  var lsteal_breath = [mo.lifesteal_breath[0], mo.lifesteal_breath[1]];
  var weapimm = [mo.weapimm[0], mo.weapimm[1]];
  var bless = [mo.bless[0], mo.bless[1]];
  if (mo.vnum == 0) {
    tohit_melee[0] -= 10 * mo.lucky[1];
    tohit_ranged[0] -= 10 * mo.lucky[1];
    tohit_breath[0] -= 10 * mo.lucky[1];
    tohit_melee[1] -= 10 * mo.lucky[0];
    tohit_ranged[1] -= 10 * mo.lucky[0];
    tohit_breath[1] -= 10 * mo.lucky[0];
  }
  var shields = [mo.defense[0] + mo.holybonus[0], mo.defense[1] + mo.holybonus[1]];
  var shields_vsmelee = [0, 0];
  var shields_vsranged = [0, 0];
  var shields_vsimmo = [0, 0];
  var shields_vsbreath = [0, 0];
  var toblock = [30 + mo.toblock[0] + 10 * mo.lucky[0], 30 + mo.toblock[1] + 10 * mo.lucky[1]];
  var toblock_melee = [toblock[0], toblock[1]];
  var toblock_ranged = [toblock[0], toblock[1]];
  var toblock_breath = [toblock[0], toblock[1]];
  var melee_iter_cts = [1, 1];
  var light_modifier = mo.e_truelight[0] + mo.e_truelight[1] - mo.e_darkness[0] - mo.e_darkness[1];
  var side;
  var iter;
  var iter_ct;
  var tmp;
  for (side = 0; side < 2; side += 1) {
    if (mo.e_bless[side]) {
      bless[side] = 1;
    }
    if (mo.e_holyarmor[side]) {
      shields[side] += 2;
    }
    if (mo.e_invuln[side]) {
      invuln_melee[side] = 1;
    }
    invuln_ranged[side] = invuln_melee[side];
    invuln_breath[side] = invuln_melee[side];
    if (mo.e_righteous[side]) {
      righteous_base[side] = 1;
    }
    if (mo.e_wraithform[side]) {
      weapimm[side] = 1;
    }
  }
  for (side = 0; side < 2; side += 1) {
    if (attack[side] > 0) {
      attack[side] += mo.holybonus[side];
    }
    if (mo.magimm[side] || righteous_base[side]) {
      // todo: check if there are any multi-trigger attacks, e.g. immolation,
      // that this causes our code to miss
      dgaze[1 - side] = 0;
      redtouch_melee[1 - side] = 0;
      redtouch_ranged[1 - side] = 0;
      redtouch_breath[1 - side] = 0;
      blacktouch_melee[1 - side] = 0;
      blacktouch_ranged[1 - side] = 0;
      blacktouch_breath[1 - side] = 0;
      lsteal_melee[1 - side] = 0;
      lsteal_ranged[1 - side] = 0;
      lsteal_breath[1 - side] = 0;
      if (mo.magimm[side]) {
	sgaze[1 - side] = 0;
	dispelevil_melee[1 - side] = 0;
	dispelevil_breath[1 - side] = 0;
	stouch_melee[1 - side] = 0;
	stouch_ranged[1 - side] = 0;
	stouch_breath[1 - side] = 0;
      }
    }
    if (mo.wtype[side] > 1) {
      shields[side] += mo.wtype[side] - 1;
    }
    if (mo.wtype[side] > 0) {
      tohit_melee[side] += 10;
      if (mo.rangedtype[side] > 3) {
	tohit_ranged[side] += 10;
      }
      if (ranged_dist == 0) {
	if (attack[side] > 0) {
	  attack[side] += mo.wtype[side] - 1;
	}
	if ((breath[side] > 0) && (mo.breathtype[side] == 1)) {
	  // Mithril/Adamantium benefits thrown, but not fire/lightning breath
	  breath[side] += mo.wtype[side] - 1;
	}
      } else if ((ranged_attack[side] > 0) && (mo.rangedtype[side] > 3)) {
	ranged_attack[side] += mo.wtype[side] - 1;
      }
    }
    if (mo.e_holyweap[side]) {
      tohit_melee[side] += 10;
      if (mo.rangedtype[side] > 3) {
        tohit_ranged[side] += 10;
      }
    }
    if ((light_modifier != 0) && ((mo.color[side] == 1) || (mo.color[side] == 2))) {
      var delta = light_modifier;
      if (mo.color[side] == 2) {
        delta = -delta;
      }
      attack[side] += delta;
      if (attack[side] < 0) {
        attack[side] = 0;
      }
      if (ranged_attack[side] > 0) {
	ranged_attack[side] += delta;
        if (ranged_attack[side] < 0) {
          ranged_attack[side] = 0;
        }
      }
      if (gazeranged[side] > 0) {
        gazeranged[side] += delta;
        if (gazeranged[side] < 0) {
          gazeranged[side] = 0;
        }
      }
      if (breath[side] > 0) {
        breath[side] += delta;
        if (breath[side] < 0) {
          breath[side] = 0;
        }
      }
      shields[side] += delta;
      if (shields[side] < 0) {
        shields[side] = 0;
      }
      resist[side] += delta;
      if (resist[side] < 0) {
        resist[side] = 0;
      }
    }
    shields_vsmelee[side] = shields[side];
    shields_vsranged[side] = shields[side];
    shields_vsimmo[side] = shields[side];
    shields_vsbreath[side] = shields[side];
    if (mo.lshield[side]) {
      shields_vsranged[side] += 2;
      shields_vsimmo[side] += 2;
      shields_vsbreath[side] += 2;
    }
    if (mo.e_eldritch[side]) {
      toblock_melee[1 - side] -= 10;
      if (mo.rangedtype[side] == 4) {
        toblock_ranged[1 - side] -= 10;
      }
      if (mo.breathtype[side] == 1) {
        toblock_breath[1 - side] -= 10;
      }
    }
  }

  // replicate 1.31 bug
  var weap_imm_applied;
  for (side = 0; side < 2; side += 1) {
    weap_imm_applied = 0;
    if (bless[side]) {
      if ((mo.color[1 - side] == 2) || (mo.color[1 - side] == 3)) {
        shields_vsmelee[side] += 3;
      }
      if (mo.rangedtype[1 - side] == 1) {
        shields_vsranged[side] += 3;
      }
      if ((mo.breathtype[1 - side] > 1) || ((gazeranged[1 - side] > 0) && ((mo.color[1 - side] == 2) || (mo.color[1 - side] == 3)))) {
        shields_vsbreath[side] += 3;
      }
      shields_vsimmo[side] += 3;
    }
    if (mo.chaosnature_def[side]) {
      if ((mo.rangedtype[1 - side] == 1) || (mo.rangedtype[1 - side] == 2)) {
        shields_vsranged[side] += mo.chaosnature_def[side];
      }
      if ((mo.breathtype[1 - side] > 1) || ((gazeranged[1 - side] > 0) && ((mo.color[1 - side] == 3) || (mo.color[1 - side] == 4)))) {
        shields_vsbreath[side] += mo.chaosnature_def[side];
      }
      shields_vsimmo[side] += mo.chaosnature_def[side];
    }
    if (mo.ap_ranged[1 - side]) {
      // this must resolve before weapon immunity, assuming that works the same
      // way as missile/magic immunity
      shields_vsranged[side] = Math.floor(shields_vsranged[side] / 2);
    }
    if (mo.ap_breath[1 - side]) {
      shields_vsbreath[side] = Math.floor(shields_vsbreath[side] / 2);
    }
    if (mo.ap_melee[1 - side]) {
      shields_vsmelee[side] = Math.floor(shields_vsmelee[side] / 2);
    }
    if (weapimm[side] && (!mo.wmagic[1 - side]) && (!mo.e_holyweap[1 - side]) && (!mo.e_eldritch[1 - side]) && (ranged_dist == 0) && (shields_vsmelee[side] < 10)) {
      if (mo.vnum == 0) {
        weap_imm_applied = 1;
      }
      shields_vsmelee[side] = 10;
    }
    if (mo.fireimm[side] || mo.magimm[side] || righteous_base[side]) {
      shields_vsimmo[side] = 50;
    }
    if (side == def_side) {
      if (ranged_dist > 0) {
        if (mo.rangedtype[att_side] < 4) {
          if (mo.magimm[def_side] || (mo.e_righteous[def_side] && (mo.rangedtype[att_side] == 1))) {
            shields_vsranged[def_side] = 50;
          }
        } else {
          if (ranged_dist > 1) {
            if (mo.lrange[att_side]) {
              tohit_ranged[att_side] -= 10;
            } else {
              tohit_ranged[att_side] -= 10 * (ranged_dist - 1);
            }
          }
          if (mo.rangedtype[att_side] == 4) {
            if (weapimm[def_side] && (!mo.wmagic[att_side]) && (!mo.e_holyweap[1 - side]) && (shields[def_side] < 10)) {
              if (mo.vnum == 0) {
                weap_imm_applied = 1;
              }
              shields_vsranged[def_side] = 10;
            }
            if (mo.missimm[def_side] && (!weap_imm_applied)) {
              shields_vsranged[def_side] = 50;
            }
          }
        }
      }
    }
    if (mo.breathtype[1 - side] > 1) {
      if (mo.magimm[side] || mo.e_righteous[side]) {
        shields_vsbreath[side] = 50;
      } else if ((mo.breathtype[1 - side] == 2) && mo.fireimm[side]) {
        shields_vsbreath[side] = 50;
      }
    }
    if (gazeranged[1 - side] > 0) {
      if (mo.magimm[side] || (mo.e_righteous[side] && ((mo.color[1 - side] == 2) || (mo.color[1 - side] == 3)))) {
        shields_vsbreath[side] = 50;
      }
    }
    if ((!mo.illimm[side]) && (!mo.e_truesight[side])) {
      if (mo.illusion_melee[1 - side]) {
        shields_vsmelee[side] = 0;
      }
      if (mo.illusion_ranged[1 - side]) {
        shields_vsranged[side] = 0;
      }
      if (mo.illusion_breath[1 - side]) {
        shields_vsbreath[side] = 0;
      }
      if (mo.invis[1 - side]) {
        tohit_melee[side] -= 10;
        // ranged is impossible
        tohit_breath[side] -= 10;
      }
    }
  }
  tohit_melee[def_side] -= counterattack_penalty;
  for (side = 0; side < 2; side += 1) {
    if (tohit_melee[side] > 100) {
      tohit_melee[side] = 100;
    } else if (tohit_melee[side] < 10) {
      tohit_melee[side] = 10;
    }
    if (tohit_ranged[side] > 100) {
      tohit_ranged[side] = 100;
    } else if (tohit_ranged[side] < 10) {
      tohit_ranged[side] = 10;
    }
    if (tohit_breath[side] > 100) {
      tohit_breath[side] = 100;
    } else if (tohit_breath[side] < 10) {
      tohit_breath[side] = 10;
    }
    if (mo.chaos_melee[side]) {
      attack[side] = Math.floor(attack[side] / 2);
      tohit_melee[side] = 100;
      shields_vsmelee[1 - side] = 0;
      invuln_melee[1 - side] = 0;
    }
    if (mo.chaos_ranged[side]) {
      ranged_attack[side] = Math.floor(ranged_attack[side] / 2);
      tohit_ranged[side] = 100;
      shields_vsranged[1 - side] = 0;
      invuln_ranged[1 - side] = 0;
    }
    if (mo.chaos_breath[side]) {
      breath[side] = Math.floor(breath[side] / 2);
      tohit_breath[side] = 100;
      shields_vsbreath[1 - side] = 0;
      invuln_breath[1 - side] = 0;
    }
  }

  if (ranged_dist > 0) {
    iter_ct = 1;
    if (mo.haste[att_side] && (mo.rangedtype[att_side] > 3)) {
      iter_ct = 2;
    }
    // todo: apply immolation, lifesteal
    for (iter = 0; iter < iter_ct; iter += 1) {
      calc_one_attack(att_side, mo.figures[att_side], ranged_attack[att_side], tohit_ranged[att_side] * 0.01, mo.hp[att_side], mo.figures[def_side], shields_vsranged[def_side], toblock_ranged[def_side] * 0.01, mo.hp[def_side], invuln_ranged[def_side], workspace2, workspace, joint_hparr);
      if (stouch_ranged[att_side] > resist[def_side] + mo.chaosnature_def[def_side]) {
        calc_one_attack(att_side, mo.figures[att_side], 1, (stouch_ranged[att_side] - resist[def_side] - mo.chaosnature_def[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
      }
      if (redtouch_ranged[att_side] > resist[def_side] + mo.chaosnature_def[def_side]) {
        calc_one_attack(att_side, mo.figures[att_side], 1, (redtouch_ranged[att_side] - resist[def_side] - mo.chaosnature_def[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
      }
      if (blacktouch_ranged[att_side] > resist[def_side] + 3 * bless[def_side]) {
        calc_one_attack(att_side, mo.figures[att_side], 1, (blacktouch_ranged[att_side] - resist[def_side] - 3 * bless[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
      }
    }
  } else {
    if (breath[att_side] > 0) {
      iter_ct = 1 + mo.haste[att_side];
      // todo: apply immolation
      for (iter = 0; iter < iter_ct; iter += 1) {
	calc_one_attack(att_side, mo.figures[att_side], breath[att_side], tohit_breath[att_side] * 0.01, mo.hp[att_side], mo.figures[def_side], shields_vsbreath[def_side], toblock_breath[def_side] * 0.01, mo.hp[def_side], invuln_breath[def_side], workspace2, workspace, joint_hparr);
	if (stouch_breath[att_side] > resist[def_side] + mo.chaosnature_def[def_side]) {
	  calc_one_attack(att_side, mo.figures[att_side], 1, (stouch_breath[att_side] - resist[def_side] - mo.chaosnature_def[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
	}
	if (redtouch_breath[att_side] > resist[def_side] + mo.chaosnature_def[def_side]) {
	  calc_one_attack(att_side, mo.figures[att_side], 1, (redtouch_breath[att_side] - resist[def_side] - mo.chaosnature_def[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
	}
	if (blacktouch_breath[att_side] > resist[def_side] + 3 * bless[def_side]) {
	  calc_one_attack(att_side, mo.figures[att_side], 1, (blacktouch_breath[att_side] - resist[def_side] - 3 * bless[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
	}
	if (dispelevil_breath[att_side] && ((mo.color[def_side] == 2) || (mo.color[def_side] == 3))) {
	  if (mo.undead[def_side]) {
	    tmp = 19;
	  } else {
	    tmp = 14;
	  }
	  if (tmp > resist[def_side]) {
	    calc_one_attack(att_side, mo.figures[att_side], 1, (tmp - resist[def_side]) * 0.1, mo.hp[att_side], mo.figures[def_side], 0, 0, mo.hp[def_side], 0, workspace2, workspace, joint_hparr, 1);
	  }
	}
      }
      // todo: apply lifesteal_breath
    }
    if ((gazeranged[att_side] > 0) && ((dgaze[att_side] > resist[def_side] + 3 * bless[def_side]) || (sgaze[att_side] > resist[def_side] + mo.chaosnature_def[def_side]) || (mo.doomgaze[att_side] > 0))) {
      apply_gazes(att_side, dgaze[att_side], sgaze[att_side], mo.doomgaze[att_side], mo.immo[att_side], mo.figures[att_side] * mo.hp[att_side], mo.figures[def_side], resist[def_side], bless[def_side], mo.chaosnature_def[def_side], shields_vsimmo[def_side], toblock[def_side] * 0.01, mo.hp[def_side], mo.invuln[def_side], workspace2, workspace, workspace3, workspace4, joint_hparr);
      // don't include Chaos Spawn
      if (!mo.doomgaze[att_side]) {
	calc_one_attack(att_side, mo.figures[att_side], gazeranged[att_side], tohit_breath[att_side] * 0.01, mo.hp[att_side], mo.figures[def_side], shields_vsbreath[def_side], toblock[def_side] * 0.01, mo.hp[def_side], invuln_breath[def_side], workspace2, workspace, joint_hparr);
      }
    }
    if ((gazeranged[def_side] > 0) && ((dgaze[def_side] > resist[att_side] + 3 * bless[att_side]) || (sgaze[def_side] > resist[att_side] + mo.chaosnature_def[att_side]) || (mo.doomgaze[def_side] > 0))) {
      apply_gazes(def_side, dgaze[def_side], sgaze[def_side], mo.doomgaze[def_side], mo.immo[def_side], mo.figures[def_side] * mo.hp[def_side], mo.figures[att_side], resist[att_side], bless[att_side], mo.chaosnature_def[att_side], shields_vsimmo[att_side], toblock[att_side] * 0.01, mo.hp[att_side], mo.invuln[def_side], workspace2, workspace, workspace3, workspace4, joint_hparr);
      if (!mo.doomgaze[def_side]) {
	calc_one_attack(def_side, mo.figures[def_side], gazeranged[def_side], tohit_breath[def_side] * 0.01, mo.hp[def_side], mo.figures[att_side], shields_vsbreath[att_side], toblock[att_side] * 0.01, mo.hp[att_side], invuln_breath[att_side], workspace2, workspace, joint_hparr);
      }
    }
    if (mo.fs[att_side]) {
      if ((lsteal_melee[0] <= resist[1]) && (lsteal_melee[1] <= resist[0])) {
        calc_melee_one_side(att_side, mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, workspace2, workspace, workspace3, workspace4, joint_hparr);
        if (!(mo.haste[att_side])) {
          iter_ct = 1 + mo.haste[def_side];
          for (iter = 0; iter < iter_ct; iter += 1) {
	    calc_melee_one_side(def_side, mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, workspace2, workspace, workspace3, workspace4, joint_hparr);
          }
        }
      } else {
        calc_melee_one_side(att_side, mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, workspace2, workspace, workspace3, workspace4, joint_hparr);
        if (!(mo.haste[att_side])) {
          iter_ct = 1 + mo.haste[def_side];
          for (iter = 0; iter < iter_ct; iter += 1) {
            calc_melee_one_side(def_side, mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, workspace2, workspace, workspace3, workspace4, joint_hparr);
          }
        }
        // todo: lifesteal FS
      }
    }
    if ((!mo.fs[att_side]) || mo.haste[att_side]) {
      if (mo.haste[att_side] && (!mo.fs[att_side])) {
        melee_iter_cts[att_side] = 2;
      }
      if (mo.haste[def_side]) {
        melee_iter_cts[def_side] = 2;
      }
      if ((lsteal_melee[0] <= resist[1]) && (lsteal_melee[1] <= resist[0])) {
	calc_melee_main(mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, melee_iter_cts, workspace2, workspace2b, workspace, workspace3, workspace4, joint_hparr);
      } else {
	calc_melee_main(mo.figures, attack, shields_vsmelee, shields_vsimmo, resist, tohit_melee, toblock, toblock_melee, mo.hp, mo.poison, mo.pois_resist_penalty, stouch_melee, mo.chaosnature_def, redtouch_melee, bless, blacktouch_melee, dispelevil_melee, mo.immo, mo.color, mo.undead, mo.invuln, invuln_melee, melee_iter_cts, workspace2, workspace2b, workspace, workspace3, workspace4, joint_hparr);
	// todo: lifesteal
      }
    }
  }
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

function process_artifact(mo, side, artitype, prefix) {
  var sidep1 = side + 1;
  var craftidx;
  var craft_ability;
  var craft_val;
  if (artitype >= 100) {
    // this is an awful hack
    if ((artitype == 110) || (artitype == 122)) {
      mo.illimm[side] = 1;
    } else if ((artitype == 1003) || (artitype == 1008) || (artitype == 1011)) {
      mo.defense[side] -= 1;
    } else if (artitype == 1022) {
      mo.defense[side] -= 2;
    }
    artitype = Math.floor((artitype + 0.5) / 100);
  }
  if (artitype == 8) {
    mo.lshield[side] = 1;
  } else if (artitype == 9) {
    mo.defense[side] += 1;
  } else if (artitype == 10) {
    mo.defense[side] += 2;
  }
  for (craftidx = 1; craftidx <= 4; craftidx += 1) {
    craft_ability = parseInt(document.getElementById(prefix + craftidx + 'ability' + sidep1).value);
    if (craft_ability > 0) {
      if (craft_ability < 100) {
        craft_val = parseInt(document.getElementById(prefix + craftidx + 'val' + sidep1).value);
        if (craft_val > 0) {
          craft_val -= craft_ability;
          if (craft_ability == 10) {
            switch (artitype) {
            case 3:
              if (mo.breathtype[side] == 1) {
                mo.breath[side] += craft_val;
              }
            case 1:
            case 2:
              mo.melee[side] += craft_val;
              break;
            case 4:
            case 5:
            case 6:
              mo.ranged[side] += craft_val;
              break;
            case 7:
              mo.melee[side] += craft_val;
              if (mo.ranged[side] > 0) {
                mo.ranged[side] += craft_val;
              }
              if (mo.breath[side] > 0) {
                mo.breath[side] += craft_val;
              }
              break;
            }
          } else if (craft_ability == 20) {
            mo.defense[side] += craft_val;
          } else if (craft_ability == 40) {
            mo.resist[side] += craft_val;
          } else if (craft_ability == 70) {
            switch (artitype) {
            case 1:
            case 2:
            case 3:
              mo.tohit_melee[side] += craft_val * 10;
              break;
            case 4:
            case 5:
            case 6:
              mo.tohit_ranged[side] += craft_val * 10;
              break;
            case 7:
              mo.tohit_melee[side] += craft_val * 10;
              if (mo.ranged[side] > 0) {
                mo.tohit_ranged[side] += craft_val * 10;
              }
            }
          }
        }
      } else {
        switch (craft_ability) {
        case 102:
          if ((mo.breathtype[side] == 1) && (artitype == 3)) {
            mo.dispelevil_breath[side] = 1;
          }
          mo.dispelevil_melee[side] = 1;
        case 100:
          mo.bless[side] = 1;
          break;
        case 103:
          mo.righteous_base[side] = 1;
          break;
        case 104:
          mo.weapimm[side] = 1;
          mo.invuln[side] = 1;
          break;
        case 106:
          mo.illimm[side] = 1;
          break;
        case 107:
          mo.lheart[side] = 1;
          break;
        case 110:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.stouch_breath[side] = 11;
            }
          case 1:
          case 2:
            mo.stouch_melee[side] = 11;
            break;
          case 4:
          case 5:
          case 6:
            mo.stouch_ranged[side] = 11;
            break;
          }
          break;
        case 111:
          if (mo.chaosnature_def[side] < 3) {
            mo.chaosnature_def[side] = 3;
          }
          break;
        case 113:
          mo.melee[side] += 1;
          if ((mo.breathtype[side] == 1) && (artitype == 3)) {
            mo.breath[side] += 1;
          }
          break;
        case 115:
          mo.chaosnature_def[side] = 10;
          break;
        case 116:
          mo.regen[side] = 1;
          break;
        case 120:
          mo.resist[side] += 5;
          mo.pois_resist_penalty[side] = 5;
          break;
        case 121:
          mo.flying[side] = 1;
          break;
        case 122:
          mo.missimm[side] = 1;
          break;
        case 123:
          mo.invis[side] = 1;
          break;
        case 124:
          mo.magimm[side] = 1;
          break;
        case 125:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.illusion_breath[side] = 1;
            }
          case 1:
          case 2:
            mo.illusion_melee[side] = 1;
            break;
          case 4:
          case 5:
          case 6:
            mo.illusion_ranged[side] = 1;
            break;
          }
          break;
        case 126:
          mo.haste[side] = 1;
          break;
        case 130:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.breath[side] += 3;
            }
          case 1:
          case 2:
            mo.melee[side] += 3;
            break;
          case 4:
          case 5:
          case 6:
            mo.ranged[side] += 3;
            break;
          }
          break;
        case 131:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.redtouch_breath[side] = 10;
            }
          case 1:
          case 2:
            mo.redtouch_melee[side] = 10;
            break;
          case 4:
          case 5:
          case 6:
            mo.redtouch_ranged[side] = 10;
            break;
          }
          break;
        case 132:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.ap_breath[side] = 1;
            }
          case 1:
          case 2:
            mo.ap_melee[side] = 1;
            break;
          case 4:
          case 5:
          case 6:
            mo.ap_ranged[side] = 1;
            break;
          }
          break;
        case 133:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.chaos_breath[side] = 1;
            }
          case 1:
          case 2:
            mo.chaos_melee[side] = 1;
            break;
          case 4:
          case 6:
            mo.chaos_ranged[side] = 1;
            break;
          }
          break;
        case 140:
          // todo
          break;
        case 141:
          switch (artitype) {
          case 3:
            if (mo.breathtype[side] == 1) {
              mo.blacktouch_breath[side] = 13;
            }
          case 1:
          case 2:
            mo.blacktouch_melee[side] = 13;
            break;
          case 4:
          case 5:
          case 6:
            mo.blacktouch_ranged[side] = 13;
            break;
          }
          break;
        case 143:
          mo.weapimm[side] = 1;
          mo.noncorp[side] = 1;
          break;
        case 144:
          if (artitype == 3) {
            mo.lifesteal_breath[side] = 1;
          }
          mo.lifesteal_melee[side] = 1;
          break;
        }
      }
    }
  }
}

function process_enchants(mo, side) {
  var sidep1 = side + 1;
  if (document.getElementById('ench_bless' + sidep1).checked) {
    mo.e_bless[side] = 1;
  }
  if (document.getElementById('ench_holyweap' + sidep1).checked) {
    mo.e_holyweap[side] = 1;
  }
  if (document.getElementById('ench_holyarmor' + sidep1).checked) {
    mo.e_holyarmor[side] = 1;
  }
  if (document.getElementById('ench_truesight' + sidep1).checked) {
    mo.e_truesight[side] = 1;
  }
  if (document.getElementById('ench_heavlight' + sidep1).checked) {
    mo.e_heavlight[side] = 1;
    mo.e_truelight[side] = 1;
  }
  if (document.getElementById('ench_invuln' + sidep1).checked) {
    mo.e_invuln[side] = 1;
  }
  if (document.getElementById('ench_righteous' + sidep1).checked) {
    mo.e_righteous[side] = 1;
  }
  if (document.getElementById('ench_charmlife' + sidep1).checked) {
    mo.e_charmlife[side] = 1;
  }
  if (document.getElementById('ench_wraithform' + sidep1).checked) {
    mo.e_wraithform[side] = 1;
  }
  if (document.getElementById('ench_cloudshadow' + sidep1).checked) {
    mo.e_cloudshadow[side] = 1;
    mo.e_darkness[side] = 1;
  }
  if (document.getElementById('ench_eldritch' + sidep1).checked) {
    mo.e_eldritch[side] = 1;
  }
}

function calcdamage() {
  var attselect1 = parseInt(document.getElementById('attselect1').value);
  var rangedist = parseInt(document.getElementById('rangedist').value);
  var mo = {
    figures: [parseInt(document.getElementById('figures1').value), parseInt(document.getElementById('figures2').value)],
    melee: [parseInt(document.getElementById('melee1').value), parseInt(document.getElementById('melee2').value)],
    wmagic: [0, 0],
    rangedtype: [parseInt(document.getElementById('rangedtype1').value), parseInt(document.getElementById('rangedtype2').value)],
    ranged: [parseInt(document.getElementById('ranged1').value), parseInt(document.getElementById('ranged2').value)],
    defense: [parseInt(document.getElementById('defense1').value), parseInt(document.getElementById('defense2').value)],
    resist: [parseInt(document.getElementById('resist1').value), parseInt(document.getElementById('resist2').value)],
    tohit_melee: [parseInt(document.getElementById('tohit1').value), parseInt(document.getElementById('tohit2').value)],
    tohit_ranged: [0, 0],
    tohit_breath: [0, 0],
    toblock: [parseInt(document.getElementById('toblock1').value), parseInt(document.getElementById('toblock2').value)],
    breathtype: [parseInt(document.getElementById('breathtype1').value), parseInt(document.getElementById('breathtype2').value)],
    breath: [parseInt(document.getElementById('breath1').value), parseInt(document.getElementById('breath2').value)],
    hp: [parseInt(document.getElementById('hp1').value), parseInt(document.getElementById('hp2').value)],
    dt: [parseInt(document.getElementById('dt1').value), parseInt(document.getElementById('dt2').value)],
    wtype: [parseInt(document.getElementById('weaponselect1').value), parseInt(document.getElementById('weaponselect2').value)],
    lshield: [parseInt(document.getElementById('lshield1').value), parseInt(document.getElementById('lshield2').value)],
    lucky: [parseInt(document.getElementById('lucky1').value), parseInt(document.getElementById('lucky2').value)],
    lrange: [parseInt(document.getElementById('lrange1').value), parseInt(document.getElementById('lrange2').value)],
    ap_melee: [parseInt(document.getElementById('ap1').value), parseInt(document.getElementById('ap2').value)],
    ap_breath: [0, 0],
    ap_ranged: [0, 0],
    fs: [parseInt(document.getElementById('fs1').value), parseInt(document.getElementById('fs2').value)],
    negatefs: [parseInt(document.getElementById('negatefs1').value), parseInt(document.getElementById('negatefs2').value)],
    missimm: [parseInt(document.getElementById('missimm1').value), parseInt(document.getElementById('missimm2').value)],
    magimm: [parseInt(document.getElementById('magimm1').value), parseInt(document.getElementById('magimm2').value)],
    illimm: [parseInt(document.getElementById('illimm1').value), parseInt(document.getElementById('illimm2').value)],
    weapimm: [parseInt(document.getElementById('weapimm1').value), parseInt(document.getElementById('weapimm2').value)],
    deathimm: [parseInt(document.getElementById('deathimm1').value), parseInt(document.getElementById('deathimm2').value)],
    fireimm: [parseInt(document.getElementById('fireimm1').value), parseInt(document.getElementById('fireimm2').value)],
    coldimm: [parseInt(document.getElementById('coldimm1').value), parseInt(document.getElementById('coldimm2').value)],
    poisimm: [parseInt(document.getElementById('poisimm1').value), parseInt(document.getElementById('poisimm2').value)],
    stonimm: [parseInt(document.getElementById('stonimm1').value), parseInt(document.getElementById('stonimm2').value)],
    poison: [parseInt(document.getElementById('poison1').value), parseInt(document.getElementById('poison2').value)],
    illusion_melee: [parseInt(document.getElementById('illusion1').value), parseInt(document.getElementById('illusion2').value)],
    illusion_ranged: [0, 0],
    illusion_breath: [0, 0],
    gazeranged: [parseInt(document.getElementById('gazeranged1').value), parseInt(document.getElementById('gazeranged2').value)],
    dgaze: [parseInt(document.getElementById('dgaze1').value), parseInt(document.getElementById('dgaze2').value)],
    sgaze: [parseInt(document.getElementById('sgaze1').value), parseInt(document.getElementById('sgaze2').value)],
    doomgaze: [parseInt(document.getElementById('doomgaze1').value), parseInt(document.getElementById('doomgaze2').value)],
    immo: [parseInt(document.getElementById('immo1').value), parseInt(document.getElementById('immo2').value)],
    dispelevil_melee: [parseInt(document.getElementById('dispelevil1').value), parseInt(document.getElementById('dispelevil2').value)],
    dispelevil_breath: [0, 0],
    stouch_melee: [parseInt(document.getElementById('stouch1').value), parseInt(document.getElementById('stouch2').value)],
    stouch_ranged: [0, 0],
    stouch_breath: [0, 0],
    invis: [parseInt(document.getElementById('invis1').value), parseInt(document.getElementById('invis2').value)],
    resistall: [parseInt(document.getElementById('resistall1').value), parseInt(document.getElementById('resistall2').value)],
    holybonus: [parseInt(document.getElementById('holybonus1').value), parseInt(document.getElementById('holybonus2').value)],
    lifesteal_melee: [parseInt(document.getElementById('lifesteal1').value), parseInt(document.getElementById('lifesteal2').value)],
    lifesteal_ranged: [0, 0],
    lifesteal_breath: [0, 0],
    regen: [parseInt(document.getElementById('regen1').value), parseInt(document.getElementById('regen2').value)],
    flying: [parseInt(document.getElementById('flying1').value), parseInt(document.getElementById('flying2').value)],
    noncorp: [parseInt(document.getElementById('noncorp1').value), parseInt(document.getElementById('noncorp2').value)],
    level: [parseInt(document.getElementById('level1').value), parseInt(document.getElementById('level2').value)],
    undead: [0, 0],
    color: [0, 0],
    bless: [0, 0],
    righteous_base: [0, 0],
    invuln: [0, 0],
    lheart: [0, 0],
    chaosnature_def: [0, 0],
    pois_resist_penalty: [0, 0],
    haste: [0, 0],
    redtouch_melee: [0, 0],
    redtouch_ranged: [0, 0],
    redtouch_breath: [0, 0],
    chaos_melee: [0, 0],
    chaos_ranged: [0, 0],
    chaos_breath: [0, 0],
    blacktouch_melee: [0, 0],
    blacktouch_ranged: [0, 0],
    blacktouch_breath: [0, 0],
    vnum: parseInt(document.getElementById('vnum').value),
    aura: parseInt(document.getElementById('aura').value),
    e_bless: [0, 0],
    e_holyweap: [0, 0],
    e_holyarmor: [0, 0],
    e_truelight: [0, 0],
    e_truesight: [0, 0],
    e_heavlight: [0, 0],
    e_invuln: [0, 0],
    e_righteous: [0, 0],
    e_charmlife: [0, 0],
    e_darkness: [0, 0],
    e_wraithform: [0, 0],
    e_cloudshadow: [0, 0],
    e_eldritch: [0, 0],
    };
  var resultserror = document.getElementById('resultserror');
  var results1 = document.getElementById('results1');
  var results2 = document.getElementById('results2');
  var side;
  var idx;
  for (side = 0; side < 2; side += 1) {
    mo.tohit_ranged[side] = mo.tohit_melee[side];
    mo.tohit_breath[side] = mo.tohit_melee[side];
    mo.ap_ranged[side] = mo.ap_melee[side];
    mo.illusion_ranged[side] = mo.illusion_melee[side];
    mo.lifesteal_ranged[side] = mo.lifesteal_melee[side];
    idx = parseInt(document.getElementById('unit' + (side + 1)).value);
    if ((idx == 0) && (parseInt(document.getElementById('race' + (side + 1)).value) > 0)) {
      // no unit selected on one side
      resultserror.innerHTML = '';
      results1.innerHTML = '';
      results2.innerHTML = '';
      return;
    }
    // hero artifacts.  Process these before negating anything.
    if ((idx > 0) && (idx < 36)) {
      var artitype = parseInt(document.getElementById('artifact_attselect' + (side + 1)).value);
      if (artitype > 0) {
        process_artifact(mo, side, artitype, 'artifact_attcraft_');
      }
      artitype = parseInt(document.getElementById('artifact_defselect' + (side + 1)).value);
      if (artitype > 0) {
        process_artifact(mo, side, artitype, 'artifact_defcraft_');
      }
      artitype = parseInt(document.getElementById('artifact_miscselect' + (side + 1)).value);
      if (artitype > 0) {
        process_artifact(mo, side, artitype, 'artifact_misccraft_');
      }
    }
  }
  for (side = 0; side < 2; side += 1) {
    process_enchants(mo, side);
  }
  for (side = 0; side < 2; side += 1) {
    if (mo.breathtype[side] == 3) {
      mo.ap_breath[side] = 1;
    }
    if (mo.lheart[side]) {
      mo.melee[side] += 3;
      if (mo.rangedtype[side] == 4) {
	mo.ranged[side] += 3;
      }
      mo.resist[side] += 3;
      mo.hp[side] += 3;
      if (mo.breathtype[side] == 1) {
	mo.breath[side] += 3;
      }
    }
    if (mo.e_charmlife[side]) {
      if (mo.hp[side] < 8) {
        mo.hp[side] += 1;
      } else {
        mo.hp[side] += Math.floor((mo.hp[side] + 0.5) / 4);
      }
    }
  }
  var max_hp = [mo.figures[0] * mo.hp[0], mo.figures[1] * mo.hp[1]];
  if (mo.invis[1] && (mo.illimm[0] == 0) && (attselect1 == 1)) {
    resultserror.innerHTML = '<span style="color: #ee1111;"><b>Only units with <a href="/wiki/Illusions_Immunity">Illusions Immunity</a> can make ranged attacks against invisible enemies.</b></span>';
    results1.innerHTML = '';
    results2.innerHTML = '';
    return;
  }
  for (side = 0; side < 2; side += 1) {
    idx = parseInt(document.getElementById('unit' + (side + 1)).value);
    if ((idx > 1000) || ((idx > 0) && (idx < 36)) || (mo.wtype[side] > 0)) {
      mo.wmagic[side] = 1;
    }
    if (mo.negatefs[side]) {
      mo.fs[1 - side] = 0;
    }
    if (mo.poisimm[side]) {
      mo.poison[1 - side] = 0;
    }
    if (mo.deathimm[side]) {
      mo.dgaze[1 - side] = 0;
      mo.blacktouch_melee[1 - side] = 0;
      mo.blacktouch_ranged[1 - side] = 0;
      mo.blacktouch_breath[1 - side] = 0;
      mo.lifesteal_melee[1 - side] = 0;
      mo.lifesteal_ranged[1 - side] = 0;
      mo.lifesteal_breath[1 - side] = 0;
    }
    if (mo.stonimm[side]) {
      mo.sgaze[1 - side] = 0;
      mo.stouch_melee[1 - side] = 0;
      mo.stouch_ranged[1 - side] = 0;
      mo.stouch_breath[1 - side] = 0;
    }
    if (parseInt(document.getElementById('lifeunit' + (side + 1)).value) == 1) {
      mo.color[side] = 1;
    } else if (parseInt(document.getElementById('deathunit' + (side + 1)).value) == 1) {
      mo.color[side] = 2;
    } else if (parseInt(document.getElementById('chaosunit' + (side + 1)).value) == 1) {
      mo.color[side] = 3;
    } else if (parseInt(document.getElementById('natureunit' + (side + 1)).value) == 1) {
      mo.color[side] = 4;
    } else if (parseInt(document.getElementById('sorcunit' + (side + 1)).value) == 1) {
      mo.color[side] = 5;
    }
    if (mo.undead[side]) {
      mo.color[side] = 2;
    }
    if ((mo.aura > 0) && (mo.color[side] == mo.aura + 2)) {
      if (mo.melee[side] > 0) {
        mo.melee[side] += 2;
      }
      if (mo.ranged[side] > 0) {
        mo.ranged[side] += 2;
      }
      mo.defense[side] += 2;
      mo.resist[side] += 2;
      if (mo.breath[side] > 0) {
        mo.breath[side] += 2;
      }
      if (mo.gazeranged[side] > 0) {
        mo.gazeranged[side] += 2;
      }
      if (mo.doomgaze[side] > 0) {
        mo.doomgaze[side] += 2;
      }
    }
  }

  // Ariel-major array
  var hparr_size = (1 + max_hp[0]) * (1 + max_hp[1]);
  var joint_hparr = new Array(hparr_size);
  var workspace = new Array(hparr_size);
  var workspace2;
  var workspace2b;
  var workspace3;
  var workspace4;
  if ((1 + max_hp[0]) * (1 + max_hp[0]) * mo.figures[1] < (1 + max_hp[1]) * (1 + max_hp[1]) * mo.figures[0]) {
    workspace2 = new Array((1 + max_hp[1]) * (1 + max_hp[1]) * mo.figures[0]);
    workspace2b = new Array((1 + max_hp[1]) * (1 + max_hp[1]) * mo.figures[0]);
  } else {
    workspace2 = new Array((1 + max_hp[0]) * (1 + max_hp[0]) * mo.figures[1]);
    workspace2b = new Array((1 + max_hp[0]) * (1 + max_hp[0]) * mo.figures[1]);
  }
  if (max_hp[0] < max_hp[1]) {
    workspace3 = new Array((1 + max_hp[1]) * (1 + max_hp[1]));
  } else {
    workspace3 = new Array((1 + max_hp[0]) * (1 + max_hp[0]));
  }
  if ((1 + max_hp[0]) * (1 + mo.hp[0]) < (1 + max_hp[1]) * (1 + mo.hp[1])) {
    workspace4 = new Array((1 + max_hp[1]) * (1 + mo.hp[1]));
  } else {
    workspace4 = new Array((1 + max_hp[0]) * (1 + mo.hp[0]));
  }
  var idx2;
  for (idx = 0; idx < hparr_size; idx += 1) {
    joint_hparr[idx] = 0;
  }
  joint_hparr[(max_hp[0] - mo.dt[0]) * (1 + max_hp[1]) + max_hp[1] - mo.dt[1]] = 1.0;
  if (attselect1 == 1) {
    attselect1 += rangedist;
  }
  calcround(0, attselect1, 0, joint_hparr, workspace, workspace2, workspace2b, workspace3, workspace4, mo);

  var marginals = [new Array(1 + max_hp[0]), new Array(1 + max_hp[1])];
  for (side = 0; side < 2; side += 1) {
    for (idx = 0; idx <= max_hp[side]; idx += 1) {
      marginals[side][idx] = 0;
    }
  }
  var idx3 = 0;
  for (idx = 0; idx <= max_hp[0]; idx += 1) {
    for (idx2 = 0; idx2 <= max_hp[1]; idx2 += 1) {
      cur_val = joint_hparr[idx3];
      marginals[0][idx] += cur_val;
      marginals[1][idx2] += cur_val;
      idx3 += 1;
    }
  }

  var HTML;
  var nz_damage;
  var negative_damage;
  for (side = 0; side < 2; side += 1) {
    negative_damage = false;
    nz_damage = false;
    for (idx = max_hp[side] + 1 - mo.dt[side]; idx <= max_hp[side]; idx += 1) {
      if (marginals[side][idx] > 0) {
	negative_damage = true;
	break;
      }
    }
    if (!negative_damage) {
      for (idx = 0; idx < max_hp[side] - mo.dt[side]; idx += 1) {
	if (marginals[side][idx] > 0) {
	  nz_damage = true;
	  break;
	}
      }
    } else {
      nz_damage = true;
    }
    if (nz_damage) {
      var avg_damage = max_hp[side] - mo.dt[side];
      var maxfreq = marginals[side][0];
      var mindamage = mo.dt[side];
      var maxdamage = 0;
      if (negative_damage) {
        mindamage = 0;
      }
      if (maxfreq > 0) {
	maxdamage = max_hp[side];
      }

      for (idx = 1; idx <= max_hp[side]; idx += 1) {
	avg_damage -= marginals[side][idx] * idx;
	if (marginals[side][idx] > maxfreq) {
	  maxfreq = marginals[side][idx];
	  if (maxdamage == 0) {
	    maxdamage = max_hp[side] - idx;
	  }
	}
      }
      HTML = '<p style="margin-top: 4px; margin-bottom: 4px;"><font size=5><b>Avg. damage taken: ' + round_str(avg_damage, 3) + '</b></font></p>';
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
      var submin = 1;
      for (idx = mindamage; idx <= maxdamage; idx++) {
	if (submin == 1) {
	  if (marginals[side][max_hp[side] - idx] == 0) {
	    continue;
	  }
	  submin = 0;
	}
	var chance = marginals[side][max_hp[side] - idx] * 100;
	var colorpercentage = Math.floor(chance * 1.15 / maxfreq);
	var color1 = 140 - Math.floor(colorpercentage/2);                
	var color2 = 140 + colorpercentage;
	var color3 = 140 - Math.floor(colorpercentage/2);

	var extrapadding = Math.floor(chance * 1.85) + 5;

	var weight = 'normal';
	if (chance == maxfreq * 100) {
	  weight = 'bold';
	}
	HTML = HTML + ' \
  <tr> \
    <td> \
      <span title="Damage Points" style="white-space:nowrap;"><span style="position:relative; top:-1px;"><a href="/wiki/Damage_Points" title="Damage Points"><img alt="" src="https://images.wikia.nocookie.net/__cb20120120150625/masterofmagic/images/6/6b/Icon_Damage.png" width="18" height="16" /></a></span> <span style="color:#ffffff; font-weight:bold">' + (idx - mo.dt[side]) + '</span></span> \
    </td> \
    <td style="width: '+(195-extrapadding)+'px; border-left: 2px solid RGB('+color1+','+color2+','+color3+'); border-right: 2px solid RGB('+color1+','+color2+','+color3+'); padding-left: ' + extrapadding + 'px;"> \
      <span style="color: RGB('+color1+','+color2+','+color3+'); font-weight:'+weight+';">' + round_str(chance, 3, 3) +'%</span></span> \
    </td> \
  </tr>';
      }
      HTML = HTML + '</table>';
    } else {
      HTML = '';
    }
    if (side == 0) {
      results1.innerHTML = HTML;
    } else {
      results2.innerHTML = HTML;
    }
  }
  resultserror.innerHTML = '';
}

function cleardamage() {
  var resultserror = document.getElementById('resultserror');
  var results1 = document.getElementById('results1');
  var results2 = document.getElementById('results2');
  resultserror.innerHTML = '';
  results1.innerHTML = '';
  results2.innerHTML = '';
}

function change_hp_nc(side) {
  var fig_val = parseInt(document.getElementById('figures' + side).value);
  var hp_val = parseInt(document.getElementById('hp' + side).value);
  var dtx = document.getElementById('dt' + side);
  var dt_val = parseInt(dtx.value);
  var newHTML = '';
  var max_dt = fig_val * hp_val - 1;
  var idx;
  for (idx = 0; idx <= max_dt; idx += 1) {
    if (idx == dt_val) {
      newHTML += '<option value="' + idx + '" selected="selected">' + idx + '</option>';
    } else {
      newHTML += '<option value="' + idx + '">' + idx + '</option>';
    }
  }
  dtx.innerHTML = newHTML;
}

function change_hp(side) {
  change_hp_nc(side);
  calcdamage();
}

function change_fig_nc(side, hp_val) {
  // enforce HP limit to keep size of calculation under control
  var fig_val = parseInt(document.getElementById('figures' + side).value);
  var hpx = document.getElementById('hp' + side);
  if (arguments.length < 2) {
    hp_val = parseInt(hpx.value);
  }
  var newHTML = '';
  var max_hp;
  var idx;
  if (fig_val == 1) {
    // Great Wyrm/Behemoth + Charm of Life + Lionheart + Black Channels?
    max_hp = 61;
  } else if (fig_val == 2) {
    // Champion Minotaurs
    max_hp = 22;
  } else if (fig_val == 4) {
    // Gorgons
    max_hp = 16;
  } else if (fig_val == 6) {
    // Champion Hammerhands
    max_hp = 12;
  } else if (fig_val == 8) {
    // Champion Lizardmen/Beastmen Spearmen
    max_hp = 10;
  } else if (fig_val == 9) {
    max_hp = 17;
  }
  if (hp_val > max_hp) {
    hp_val = max_hp;
  }
  for (idx = 1; idx <= max_hp; idx += 1) {
    if (idx == hp_val) {
      newHTML += '<option value="' + idx + '" selected="selected">' + idx + '</option>';
    } else {
      newHTML += '<option value="' + idx + '">' + idx + '</option>';
    }
  }
  hpx.innerHTML = newHTML;
  change_hp_nc(side);
}

function change_fig(side) {
  change_fig_nc(side);
  calcdamage();
}

function changeattack(side) {
  var melee_val = parseInt(document.getElementById('melee' + side).value);
  var ranged_val = parseInt(document.getElementById('ranged' + side).value);
  var attslabelx = document.getElementById('attslabel' + side);
  var attselectx = document.getElementById('attselect' + side);
  if ((melee_val > 0) && (ranged_val > 0)) {
    attslabelx.style.display = 'inline';
    attselectx.style.display = 'inline';
  } else {
    attslabelx.style.display = 'none';
    attselectx.style.display = 'none';
    if (melee_val > 0) {
      attselectx.selectedIndex = 0;
    } else if (ranged_val > 0) {
      attselectx.selectedIndex = 1;
    }
  }
  calcdamage();
}

function changerangedimg(side) {
  var rangedidx = parseInt(document.getElementById('rangedtype' + side).value);
  var rangedimg = document.getElementById('rangedimg' + side);
  var rangedx = document.getElementById('ranged' + side);
  if (rangedidx == 0) {
    rangedx.style.display = 'none';
    rangedimg.innerHTML = '';
    rangedx.selectedIndex = 0;
  } else {
    var raceidx = parseInt(document.getElementById('race' + side).value);
    if (raceidx == 0) {
      rangedx.style.display = 'inline';
    }
    if (rangedidx < 4) {
      rangedimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/1/11/Icon_Ranged_Magic.png" width="18" height="16" />';
    } else if (rangedidx == 4) {
      rangedimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/6/6c/Icon_Ranged_Bow.png" width="18" height="16" />';
    } else if (rangedidx == 5) {
      rangedimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/c/c8/Icon_Ranged_Boulder.png" width="18" height="16" />';
    }
  }
}

function changerangedtype(side) {
  changerangedimg(side);
  calcdamage();
}

function changebreathimg(side) {
  var breathidx = parseInt(document.getElementById('breathtype' + side).value);
  var breathimg = document.getElementById('breathimg' + side);
  var breathx = document.getElementById('breath' + side);
  if (breathidx == 0) {
    breathx.style.display = 'none';
    breathimg.innerHTML = '';
    breathx.selectedIndex = 0;
  } else {
    var raceidx = parseInt(document.getElementById('race' + side).value);
    if (raceidx == 0) {
      breathx.style.display = 'inline';
    }
    if (breathidx == 1) {
      breathimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/6/68/Icon_Thrown.png" width="18" height="16" />';
    } else if (breathidx == 2) {
      breathimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/7/7a/Icon_Breath.png" width="18" height="16" />';
    } else if (breathidx == 3) {
      breathimg.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/masterofmagic/images/b/bd/Icon_Breath_Lightning.png" width="18" height="16" />';
    }
  }
}

function changebreathtype(side) {
  changebreathimg(side);
  calcdamage();
}

function write_tohit(true_tohit, side) {
  var tohitx = document.getElementById('tohit' + side);
  var fixed_tohitx = document.getElementById('fixed_tohit' + side);
  if (true_tohit > 100) {
    true_tohit = 100;
  }
  tohitx.selectedIndex = (true_tohit + 20) / 10;
  if (true_tohit >= 0) {
    fixed_tohitx.innerHTML = '+ ' + true_tohit;
  } else {
    true_tohit = -true_tohit;
    fixed_tohitx.innerHTML = '- ' + true_tohit;
  }
}

function changelevel(side) {
  var raceidx = parseInt(document.getElementById('race' + side).value);
  var base_melee = parseInt(document.getElementById('base_melee' + side).value);
  var meleex = document.getElementById('melee' + side);
  var fixed_meleex = document.getElementById('fixed_melee' + side);
  var base_ranged = parseInt(document.getElementById('base_ranged' + side).value);
  var rangedtypex_val = parseInt(document.getElementById('rangedtype' + side).value);
  var rangedx = document.getElementById('ranged' + side);
  var fixed_rangedx = document.getElementById('fixed_ranged' + side);
  var base_defense = parseInt(document.getElementById('base_defense' + side).value);
  var defensex = document.getElementById('defense' + side);
  var fixed_defensex = document.getElementById('fixed_defense' + side);
  var base_resist = parseInt(document.getElementById('base_resist' + side).value);
  var resistx = document.getElementById('resist' + side);
  var fixed_resistx = document.getElementById('fixed_resist' + side);
  var base_tohit = parseInt(document.getElementById('base_tohit' + side).value);
  var base_breath = parseInt(document.getElementById('base_breath' + side).value);
  var breathx = document.getElementById('breath' + side);
  var fixed_breathx = document.getElementById('fixed_breath' + side);
  var base_hp = parseInt(document.getElementById('base_hp' + side).value);
  var hpx = document.getElementById('hp' + side);
  var fixed_hpx = document.getElementById('fixed_hp' + side);
  var levelidx = parseInt(document.getElementById('level' + side).value);
  var true_melee;
  var true_ranged;
  var true_defense;
  var true_resist;
  var true_tohit;
  var true_breath;
  var true_hp;
  if (raceidx == 1) {
    var cur_might_val = parseInt(document.getElementById('cur_might' + side).value);
    var rangedtype_val = parseInt(document.getElementById('rangedtype' + side).value);
    var cur_arcane_val = parseInt(document.getElementById('cur_arcane' + side).value);
    var cur_blade_val = parseInt(document.getElementById('cur_blade' + side).value);
    var cur_lead_val = parseInt(document.getElementById('cur_lead' + side).value);
    var cur_agile_val = parseInt(document.getElementById('cur_agile' + side).value);
    var cur_const_val = parseInt(document.getElementById('cur_const' + side).value);
    var cur_prayer_val = parseInt(document.getElementById('cur_prayer' + side).value);
    var cur_charm_val = parseInt(document.getElementById('cur_charm' + side).value);
    true_melee = base_melee + levelidx;
    if (cur_might_val == 1) {
      true_melee += levelidx;
    } else if (cur_might_val == 2) {
      true_melee += Math.floor((levelidx * 3) / 2);
    }
    if (cur_lead_val == 1) {
      true_melee += Math.floor(levelidx / 3);
    } else if (cur_lead_val == 2) {
      true_melee += Math.floor(levelidx / 2);
    }
    if (base_ranged > 0) {
      true_ranged = base_ranged + levelidx;
      if (rangedtype_val < 4) {
        if (cur_arcane_val == 1) {
          true_ranged += levelidx;
        } else if (cur_arcane_val == 2) {
          true_ranged += Math.floor((levelidx * 3) / 2); 
        }
      }
      if (rangedtypex_val == 1) {
        if (cur_lead_val == 1) {
          true_ranged += Math.floor(levelidx / 6);
        } else if (cur_lead_val == 2) {
          true_ranged += Math.floor(levelidx / 4);
        }
      }
      fixed_rangedx.innerHTML = '' + true_ranged;
    } else {
      true_ranged = 0;
      fixed_rangedx.innerHTML = '';
    }
    true_defense = base_defense + Math.floor(levelidx / 2);
    if (cur_agile_val == 1) {
      true_defense += levelidx;
    } else if (cur_agile_val == 2) {
      true_defense += Math.floor((levelidx * 3) / 2);
    }
    true_resist = base_resist + levelidx;
    if (cur_prayer_val == 1) {
      true_resist += levelidx;
    } else if (cur_prayer_val == 2) {
      true_resist += Math.floor((levelidx * 3) / 2);
    }
    if (cur_charm_val == 1) {
      true_resist += 30;
    }
    true_tohit = base_tohit + 10 * Math.floor(levelidx / 3);
    if (cur_blade_val == 1) {
      true_tohit += 10 * Math.floor(levelidx / 2);
    } else if (cur_blade_val == 2) {
      true_tohit += 10 * Math.floor((levelidx * 3) / 4);
    }
    true_hp = base_hp + levelidx;
    if (cur_const_val == 1) {
      true_hp += levelidx;
    } else if (cur_const_val == 2) {
      true_hp += Math.floor((levelidx * 3) / 2);
    }
    meleex.selectedIndex = true_melee;
    fixed_meleex.innerHTML = '' + true_melee;
    rangedx.selectedIndex = true_ranged;
    defensex.selectedIndex = true_defense;
    fixed_defensex.innerHTML = '' + true_defense;
    resistx.selectedIndex = true_resist;
    fixed_resistx.innerHTML = '' + true_resist;
    hpx.selectedIndex = true_hp - 1;
    fixed_hpx.innerHTML = '' + true_hp;
    write_tohit(true_tohit, side);
    if (base_breath) {
      true_breath = base_breath + levelidx;
      if (cur_lead_val == 1) {
        true_breath += Math.floor(levelidx / 6);
      } else if (cur_lead_val == 2) {
        true_breath += Math.floor(levelidx / 4);
      }
      fixed_breathx.innerHTML = '' + true_breath;
    } else {
      true_breath = 0;
      fixed_breathx.innerHTML = '';
    }
    breathx.selectedIndex = true_breath;
  } else {
    true_defense = base_defense;
    true_resist = base_resist + levelidx - 1;
    true_tohit = base_tohit;
    true_hp = base_hp;
    switch (levelidx) {
    case 1:
      true_melee = base_melee;
      true_ranged = base_ranged;
      true_breath = base_breath;
      break;
    case 3:
      true_defense += 1;
    case 2:
      true_melee = base_melee + 1;
      true_ranged = base_ranged + 1;
      true_breath = base_breath + 1;
      break;
    case 4:
      true_melee = base_melee + 2;
      true_ranged = base_ranged + 2;
      true_defense += 1;
      true_breath = base_breath + 2;
      true_tohit += 10;
      true_hp += 1;
      break;
    case 5:
      true_melee = base_melee + 2;
      true_ranged = base_ranged + 2;
      true_defense += 2;
      true_breath = base_breath + 2;
      true_tohit += 20;
      true_hp += 1;
      break;
    case 6:
      true_melee = base_melee + 3;
      true_ranged = base_ranged + 3;
      true_defense += 2;
      true_breath = base_breath + 3;
      true_tohit += 30;
      true_hp += 2;
      break;
    }
    if (base_melee) {
      meleex.selectedIndex = true_melee;
      fixed_meleex.innerHTML = '' + true_melee;
    } else {
      meleex.selectedIndex = 0;
      fixed_meleex.innerHTML = '';
    }
    if (base_ranged) {
      rangedx.selectedIndex = true_ranged;
      fixed_rangedx.innerHTML = '' + true_ranged;
    } else {
      rangedx.selectedIndex = 0;
      fixed_rangedx.innerHTML = '';
    }
    defensex.selectedIndex = true_defense;
    fixed_defensex.innerHTML = '' + true_defense;
    resistx.selectedIndex = true_resist;
    fixed_resistx.innerHTML = '' + true_resist;
    if (base_breath) {
      breathx.selectedIndex = true_breath;
      fixed_breathx.innerHTML = '' + true_breath;
    } else {
      breathx.selectedIndex = 0;
      fixed_breathx.innerHTML = '';
    }
    hpx.selectedIndex = true_hp - 1;
    fixed_hpx.innerHTML = '' + true_hp;
    write_tohit(true_tohit, side);
  }
  change_hp(side);
}

function enable_pick(side) {
  var pickct = parseInt(document.getElementById('pickct' + side).value);
  var picktype = parseInt(document.getElementById('picktype' + side).value);
  if (picktype != 2) {
    document.getElementById('pick_agile' + side).disabled = false;
    document.getElementById('pick_blade' + side).disabled = false;
    document.getElementById('pick_const' + side).disabled = false;
    document.getElementById('pick_lead' + side).disabled = false;
    document.getElementById('pick_might' + side).disabled = false;
    if (pickct > 1) {
      document.getElementById('pick_agiled' + side).disabled = false;
      document.getElementById('pick_bladed' + side).disabled = false;
      document.getElementById('pick_constd' + side).disabled = false;
      document.getElementById('pick_leadd' + side).disabled = false;
      document.getElementById('pick_mightd' + side).disabled = false;
    }
  }
  document.getElementById('pick_charm' + side).disabled = false;
  document.getElementById('pick_lucky' + side).disabled = false;
  if (picktype != 1) {
    document.getElementById('pick_caster' + side).disabled = false;
    document.getElementById('pick_arcane' + side).disabled = false;
    document.getElementById('pick_prayer' + side).disabled = false;
    if (pickct > 1) {
      document.getElementById('pick_arcaned' + side).disabled = false;
      document.getElementById('pick_prayerd' + side).disabled = false;
    }
  }
}

function change_pick(side) {
  var picksleftx = document.getElementById('picksleft' + side);
  var picks_left = parseInt(document.getElementById('pickct' + side).value);
  var picktype = parseInt(document.getElementById('picktype' + side).value);
  var pick_agilex = document.getElementById('pick_agile' + side);
  var pick_agiledx = document.getElementById('pick_agiled' + side);
  var pick_bladex = document.getElementById('pick_blade' + side);
  var pick_bladedx = document.getElementById('pick_bladed' + side);
  var pick_constx = document.getElementById('pick_const' + side);
  var pick_constdx = document.getElementById('pick_constd' + side);
  var pick_leadx = document.getElementById('pick_lead' + side);
  var pick_leaddx = document.getElementById('pick_leadd' + side);
  var pick_mightx = document.getElementById('pick_might' + side);
  var pick_mightdx = document.getElementById('pick_mightd' + side);
  var pick_charmx = document.getElementById('pick_charm' + side);
  var pick_luckyx = document.getElementById('pick_lucky' + side);
  var pick_casterx = document.getElementById('pick_caster' + side);
  var pick_arcanex = document.getElementById('pick_arcane' + side);
  var pick_arcanedx = document.getElementById('pick_arcaned' + side);
  var pick_prayerx = document.getElementById('pick_prayer' + side);
  var pick_prayerdx = document.getElementById('pick_prayerd' + side);
  var pagile = 0;
  var pblade = 0;
  var pconst = 0;
  var plead = 0;
  var pmight = 0;
  var pcharm = 0;
  var plucky = 0;
  var pcaster = 0;
  var parcane = 0;
  var pprayer = 0;
  if (picktype != 2) {
    if (pick_agilex.checked) {
      pagile = 1;
    } else if ((picks_left > 1) && (pick_agiledx.checked)) {
      pagile = 2;
    }
    if (pick_bladex.checked) {
      pblade = 1;
    } else if ((picks_left > 1) && (pick_bladedx.checked)) {
      pblade = 2;
    }
    if (pick_constx.checked) {
      pconst = 1;
    } else if ((picks_left > 1) && (pick_constdx.checked)) {
      pconst = 2;
    }
    if (pick_leadx.checked) {
      plead = 1;
    } else if ((picks_left > 1) && (pick_leaddx.checked)) {
      plead = 2;
    }
    if (pick_mightx.checked) {
      pmight = 1;
    } else if ((picks_left > 1) && (pick_mightdx.checked)) {
      pmight = 2;
    }
    picks_left -= pagile + pblade + pconst + plead + pmight;
  }
  if (pick_charmx.checked) {
    pcharm = 1;
  }
  if (pick_luckyx.checked) {
    plucky = 1;
  }
  picks_left -= pcharm + plucky;
  if (picktype != 1) {
    if (pick_casterx.checked) {
      pcaster = 1;
    }
    if (pick_arcanex.checked) {
      parcane = 1;
    } else if ((picks_left > 1) && (pick_arcanedx.checked)) {
      parcane = 2;
    }
    if (pick_prayerx.checked) {
      pprayer = 1;
    } else if ((picks_left > 1) && (pick_prayerdx.checked)) {
      pprayer = 2;
    }
    picks_left -= pcaster + parcane + pprayer;
  }
  if (picks_left != 0) {
    enable_pick(side);
  } else {
    if (pcharm == 0) {
      pick_charmx.disabled = true;
    }
    if (plucky == 0) {
      pick_luckyx.disabled = true;
    }
  }
  if (picktype != 2) {
    var guaranteed_agile_val = parseInt(document.getElementById('guaranteed_agile' + side).value);
    var guaranteed_blade_val = parseInt(document.getElementById('guaranteed_blade' + side).value);
    var guaranteed_const_val = parseInt(document.getElementById('guaranteed_const' + side).value);
    var guaranteed_lead_val = parseInt(document.getElementById('guaranteed_lead' + side).value);
    var guaranteed_might_val = parseInt(document.getElementById('guaranteed_might' + side).value);
    var cur_agilex = document.getElementById('cur_agile' + side);
    var cur_bladex = document.getElementById('cur_blade' + side);
    var cur_constx = document.getElementById('cur_const' + side);
    var cur_leadx = document.getElementById('cur_lead' + side);
    var cur_mightx = document.getElementById('cur_might' + side);
    cur_agilex.value = (guaranteed_agile_val + pagile);
    cur_bladex.value = (guaranteed_blade_val + pblade);
    cur_constx.value = (guaranteed_const_val + pconst);
    cur_leadx.value = (guaranteed_lead_val + plead);
    cur_mightx.value = (guaranteed_might_val + pmight);
    if (picks_left < 2) {
      if (picks_left + pagile < 2) {
        pick_agiledx.disabled = true;
        if (picks_left + pagile == 0) {
          pick_agilex.disabled = true;
        }
      }
      if (picks_left + pblade < 2) {
        pick_bladedx.disabled = true;
        if (picks_left + pblade == 0) {
          pick_bladex.disabled = true;
        }
      }
      if (picks_left + pconst < 2) {
        pick_constdx.disabled = true;
        if (picks_left + pconst == 0) {
          pick_constx.disabled = true;
        }
      }
      if (picks_left + plead < 2) {
        pick_leaddx.disabled = true;
        if (picks_left + plead == 0) {
          pick_leadx.disabled = true;
        }
      }
      if (picks_left + pmight < 2) {
        pick_mightdx.disabled = true;
        if (picks_left + pmight == 0) {
          pick_mightx.disabled = true;
        }
      }
    }
  }
  var guaranteed_charm_val = parseInt(document.getElementById('guaranteed_charm' + side).value);
  var cur_charmx = document.getElementById('cur_charm' + side);
  var luckyx = document.getElementById('lucky' + side);
  cur_charmx.value = (guaranteed_charm_val + pcharm);
  luckyx.value = plucky;
  if (picktype != 1) {
    var guaranteed_caster_val = parseInt(document.getElementById('guaranteed_caster' + side).value);
    var guaranteed_arcane_val = parseInt(document.getElementById('guaranteed_arcane' + side).value);
    var guaranteed_prayer_val = parseInt(document.getElementById('guaranteed_prayer' + side).value);
    var cur_casterx = document.getElementById('cur_caster' + side);
    var cur_arcanex = document.getElementById('cur_arcane' + side);
    var cur_prayerx = document.getElementById('cur_prayer' + side);
    cur_casterx.value = (guaranteed_caster_val + pcaster);
    cur_arcanex.value = (guaranteed_arcane_val + parcane);
    cur_prayerx.value = (guaranteed_prayer_val + pprayer);
    if (picks_left < 2) {
      if (picks_left + pcaster == 0) {
        pick_casterx.disabled = true;
      }
      if (picks_left + parcane < 2) {
        pick_arcanedx.disabled = true;
        if (picks_left + parcane == 0) {
          pick_arcanex.disabled = true;
        }
      }
      if (picks_left + pprayer < 2) {
        pick_prayerdx.disabled = true;
        if (picks_left + pprayer == 0) {
          pick_prayerx.disabled = true;
        }
      }
    }
  }
  picksleftx.innerHTML = '' + picks_left;
  changelevel(side);
}

function change_pickd(side, clear_id) {
  document.getElementById(clear_id).checked = false;
  change_pick(side);
}

var arti_innerhtml = [
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="20">+ Defense</option> \
 <option value="70">+ To Hit</option> \
 <option value="102">Holy Avenger</option> \
 <option value="110">Stoning</option> \
 <option value="111">Resist Elements</option> \
 <option value="113">Giant Strength</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="122">Guardian Wind</option> \
 <option value="124">Magic Immunity</option> \
 <option value="125">Phantasmal</option> \
 <option value="126">Haste</option> \
 <option value="130">Flaming</option> \
 <option value="131">Destruction</option> \
 <option value="132">Lightning</option> \
 <option value="133">Chaos</option> \
 <option value="141">Death</option> \
 <option value="144">Vampiric</option>',
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="70">+ To Hit</option> \
 <option value="102">Holy Avenger</option> \
 <option value="110">Stoning</option> \
 <option value="111">Resist Elements</option> \
 <option value="113">Giant Strength</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="122">Guardian Wind</option> \
 <option value="124">Magic Immunity</option> \
 <option value="125">Phantasmal</option> \
 <option value="126">Haste</option> \
 <option value="130">Flaming</option> \
 <option value="131">Destruction</option> \
 <option value="132">Lightning</option> \
 <option value="133">Chaos</option> \
 <option value="141">Death</option> \
 <option value="144">Vampiric</option>',
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="20">+ Defense</option> \
 <option value="70">+ To Hit</option> \
 <option value="110">Stoning</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="124">Magic Immunity</option> \
 <option value="125">Phantasmal</option> \
 <option value="126">Haste</option> \
 <option value="130">Flaming</option> \
 <option value="131">Destruction</option> \
 <option value="132">Lightning</option> \
 <option value="133">Chaos</option> \
 <option value="141">Death</option>',
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="20">+ Defense</option> \
 <option value="40">+ Resistance</option> \
 <option value="60">- Spell Save</option> \
 <option value="70">+ To Hit</option> \
 <option value="110">Stoning</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="124">Magic Immunity</option> \
 <option value="125">Phantasmal</option> \
 <option value="130">Flaming</option> \
 <option value="131">Destruction</option> \
 <option value="132">Lightning</option> \
 <option value="141">Death</option>',
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="20">+ Defense</option> \
 <option value="40">+ Resistance</option> \
 <option value="60">- Spell Save</option> \
 <option value="70">+ To Hit</option> \
 <option value="110">Stoning</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="122">Guardian Wind</option> \
 <option value="124">Magic Immunity</option> \
 <option value="125">Phantasmal</option> \
 <option value="130">Flaming</option> \
 <option value="131">Destruction</option> \
 <option value="132">Lightning</option> \
 <option value="133">Chaos</option> \
 <option value="141">Death</option>',
'<option value="0"></option> \
 <option value="10">+ Attack</option> \
 <option value="20">+ Defense</option> \
 <option value="40">+ Resistance</option> \
 <option value="60">- Spell Save</option> \
 <option value="70">+ To Hit</option> \
 <option value="100">Bless</option> \
 <option value="103">Righteousness</option> \
 <option value="104">Invulnerability</option> \
 <option value="106">True Sight</option> \
 <option value="107">Lion Heart</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="116">Regeneration</option> \
 <option value="120">Resist Magic</option> \
 <option value="121">Flight</option> \
 <option value="122">Guardian Wind</option> \
 <option value="123">Invisibility</option> \
 <option value="124">Magic Immunity</option> \
 <option value="140">Cloak of Fear</option> \
 <option value="143">Wraithform</option>',
'<option value="0"></option> \
 <option value="20">+ Defense</option> \
 <option value="40">+ Resistance</option> \
 <option value="100">Bless</option> \
 <option value="103">Righteousness</option> \
 <option value="104">Invulnerability</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="122">Guardian Wind</option> \
 <option value="124">Magic Immunity</option> \
 <option value="140">Cloak of Fear</option> \
 <option value="143">Wraithform</option>',
'<option value="0"></option> \
 <option value="20">Extra + Defense</option> \
 <option value="40">+ Resistance</option> \
 <option value="100">Bless</option> \
 <option value="103">Righteousness</option> \
 <option value="104">Invulnerability</option> \
 <option value="111">Resist Elements</option> \
 <option value="115">Elemental Armor</option> \
 <option value="120">Resist Magic</option> \
 <option value="122">Guardian Wind</option> \
 <option value="124">Magic Immunity</option> \
 <option value="140">Cloak of Fear</option> \
 <option value="143">Wraithform</option>'
];

var arti_attack_iter_limits = [0, 3, 4, 6, 6, 2, 6, 4];
var arti_defense_iter_limits = [0, 3, 1, 0, 3, 0, 3, 4, 6, 6, 6];
var arti_tohit_iter_limits = [0, 3, 3, 2, 3, 1, 3, 2];

function get_artiselect_innerhtml(select_val, val_type) {
  if (val_type == 0) {
    if (select_val < 3) {
      return arti_innerhtml[0];
    } else if (select_val < 9) {
      return arti_innerhtml[select_val - 2];
    } else {
      return arti_innerhtml[7];
    }
  } else {
    var newHTML = '<option value="0" selected="selected"></option>';
    var iter_limit;
    if (val_type == 10) {
      iter_limit = arti_attack_iter_limits[select_val];
    } else if (val_type == 20) {
      iter_limit = arti_defense_iter_limits[select_val];
    } else if (val_type == 40) { // resistance
      iter_limit = 6;
    } else if (val_type == 60) { // spell save
      iter_limit = 4;
    } else {
      iter_limit = arti_tohit_iter_limits[select_val];
    }
    var idx;
    for (idx = 1; idx <= iter_limit; idx += 1) {
      newHTML += '<option value="' + (idx + val_type) + '">' + idx + '</option>';
    }
    return newHTML;
  }
}

var artifact_selecthtml = [' \
 <option value="100">Bane Blade</option> \
 <option value="101">Black Asp</option> \
 <option value="102">Blade of Blood</option> \
 <option value="103">Dragon Slayer</option> \
 <option value="104">Flaming Sword of Death</option> \
 <option value="105">Great Sword of Arkanna</option> \
 <option value="106">Joshua\'s Sword</option> \
 <option value="107">Laik Kenegul</option> \
 <option value="108">Living Sword</option> \
 <option value="109">Mae Govannon</option> \
 <option value="110">Monster Masher</option> \
 <option value="111">Raindancer</option> \
 <option value="112">Right Hand of Justice</option> \
 <option value="113">Sting</option> \
 <option value="114">Stoning Sword</option> \
 <option value="115">Sword of Cannae</option> \
 <option value="116">Sword of Immunity</option> \
 <option value="117">Sword of Mallana</option> \
 <option value="118">Sword of Medusa</option> \
 <option value="119">Sword of Mephisto</option> \
 <option value="120">Sword of Pendulum</option> \
 <option value="121">Sword of Renfield</option> \
 <option value="122">Sword of Stealth</option> \
 <option value="123">The Defender</option> \
 <option value="124">The Revenge of Orculs</option> \
 <option value="125">Ultimate Defense</option> \
 <option value="126">Vlad\'s Impaler</option> \
 <option value="127">White Lightning</option> \
 <option value="200">Cannes Mace</option> \
 <option value="201">Club of Chaos</option> \
 <option value="202">Deathbringer</option> \
 <option value="203">Dracken Mace</option> \
 <option value="204">Fang\'s Avenger</option> \
 <option value="205">Fist of Destruction</option> \
 <option value="206">Freya\'s Friend</option> \
 <option value="207">Hand of God</option> \
 <option value="208">Idspispopd</option> \
 <option value="209">Intimidator</option> \
 <option value="210">Iron\'s Mace</option> \
 <option value="211">Jan\'s Hammer</option> \
 <option value="212">Mace of Disintegration</option> \
 <option value="213">Maul of Bathory</option> \
 <option value="214">Mauler</option> \
 <option value="215">Merlin\'s Nails</option> \
 <option value="216">Morphain\'s Friend</option> \
 <option value="217">Orc Smasher</option> \
 <option value="218">Peppermace of Gates</option> \
 <option value="219">Pummel Mace</option> \
 <option value="220">Skull Smasher</option> \
 <option value="221">Storm Mace</option> \
 <option value="222">The Inquisition</option> \
 <option value="223">Thor\'s Hammer</option> \
 <option value="224">Whirlwind</option> \
 <option value="225">World Ender</option> \
 <option value="300">Axe of Chaotic Death</option> \
 <option value="301">Axe of Haste</option> \
 <option value="302">Axe of Light</option> \
 <option value="303">Axe of Severe Pain</option> \
 <option value="304">Axe of Stone</option> \
 <option value="305">Axe of the Apostles</option> \
 <option value="307">Axe of Vivisection</option> \
 <option value="308">Double Axe of Pain</option> \
 <option value="309">Edge of the Elements</option> \
 <option value="310">Executioner\'s Friend</option> \
 <option value="311">Flaming Axe</option> \
 <option value="312">Gabriel\'s Axe</option> \
 <option value="313">Golden Axe of Rath</option> \
 <option value="314">Hacker</option> \
 <option value="315">Inquisitor</option> \
 <option value="316">Knight Chopper</option> \
 <option value="317">Phantastic Axe</option> \
 <option value="318">Power Axe</option> \
 <option value="319">The Axe of Uncaring</option> \
 <option value="320">The Beheader</option> \
 <option value="321">The Kick Axe</option> \
 <option value="322">The Peacemaker</option> \
 <option value="323">The Resistor</option> \
 <option value="324">Tree Tamer</option> \
 <option value="325">Vampiric Vanquisher</option>',
'<option value="400">Bow of Hazard</option> \
 <option value="401">Bow of Magic Immunity</option> \
 <option value="402">Bow of the Dervish</option> \
 <option value="403">Bow of the Golden Horde</option> \
 <option value="404">Crossbow of Power</option> \
 <option value="405">Elvish Longbow</option> \
 <option value="406">Gideon\'s Harp</option> \
 <option value="407">Hell\'s Bolt</option> \
 <option value="408">Life Bow</option> \
 <option value="409">Little Flicker</option> \
 <option value="410">Living Bow</option> \
 <option value="411">Mithril Longbow</option> \
 <option value="412">Ray of Light</option> \
 <option value="413">Silver Shortbow</option> \
 <option value="414">The Archer</option> \
 <option value="415">The Deathstorm</option> \
 <option value="416">The Devil\'s Instrument</option> \
 <option value="417">The Hartshone</option> \
 <option value="418">The Master Crossbow</option> \
 <option value="419">The Regulator</option> \
 <option value="420">The Scarlet Bow</option> \
 <option value="421">The Telecaster</option> \
 <option value="422">The Undertaker</option> \
 <option value="423">Uhl Dover</option> \
 <option value="424">White Flicker</option>',
'<option value="500">Kraken Wand</option> \
 <option value="501">Staff of the Constellation</option> \
 <option value="502">The Branch of Magic</option> \
 <option value="503">The Conjurer\'s Friend</option> \
 <option value="505">The Mighty Wand of Zod</option> \
 <option value="506">The Wand of Glenda</option> \
 <option value="507">Wand of Arcanus</option> \
 <option value="508">Wand of Balmoth</option> \
 <option value="509">Wand of Doom</option> \
 <option value="510">Wand of Elros</option> \
 <option value="511">Wand of Enhancement</option> \
 <option value="512">Wand of Fiery Death</option> \
 <option value="513">Wand of Immunity</option> \
 <option value="514">Wand of Infinite Magic</option> \
 <option value="515">Wand of Lesser Might</option> \
 <option value="516">Wand of the Beast</option> \
 <option value="517">Wand of the Grey Wizard</option> \
 <option value="518">Wand of the Guardian</option> \
 <option value="519">Wand of the Mage</option> \
 <option value="520">Wand of the Mind</option> \
 <option value="521">Wand of Ultimate Might</option> \
 <option value="522">White Lightning</option> \
 <option value="600">Chaotic Staff of Fire</option> \
 <option value="601">Elemental Staff of Nature</option> \
 <option value="602">Flaming Staff</option> \
 <option value="603">Golden Staff of Sharee</option> \
 <option value="604">Guardian Staff</option> \
 <option value="605">Planar Staff</option> \
 <option value="606">Purple Rain of Death</option> \
 <option value="607">Staff of Confusion</option> \
 <option value="608">Staff of Horus</option> \
 <option value="609">Staff of Magic Mastery</option> \
 <option value="610">Staff of Odin</option> \
 <option value="611">Staff of Pain</option> \
 <option value="612">Staff of Superiority</option> \
 <option value="613">Stick of the Mage</option> \
 <option value="615">The Destructor</option> \
 <option value="616">The Enlightener</option> \
 <option value="617">The Mangler</option> \
 <option value="618">The Ossifier</option> \
 <option value="619">The Protector</option> \
 <option value="620">The Pummeler</option> \
 <option value="621">The Traveler</option> \
 <option value="622">Theodore\'s Liberator</option> \
 <option value="623">Uhl Khakhaas</option> \
 <option value="624">Word of God</option> \
 <option value="625">Zlotakian Staff of Magic</option>',
'<option value="700">Amulet of Battle</option> \
 <option value="701">Amulet of Lesser Shielding</option> \
 <option value="702">Amulet of Resistance</option> \
 <option value="703">Band of Chivalry</option> \
 <option value="704">Bird of Paradise</option> \
 <option value="705">Bracer of Invulnerability</option> \
 <option value="706">Bracer of Mrad</option> \
 <option value="707">Cloak of Armor</option> \
 <option value="708">Cross of Blessed Death</option> \
 <option value="709">Devil\'s Eye of Fear</option> \
 <option value="710">Ehr Rhee</option> \
 <option value="711">Elven Ring of Health</option> \
 <option value="712">Gauntlet of Eastwood</option> \
 <option value="713">Gem of the Aerie</option> \
 <option value="714">Helm of Everlasting</option> \
 <option value="715">Helm of the Tides</option> \
 <option value="716">Helm of Trollish Might</option> \
 <option value="717">Jafar\'s Orb of Sight</option> \
 <option value="718">Magical Crystal of Power</option> \
 <option value="719">Orb of Fear</option> \
 <option value="720">Orb of Righteous Sight</option> \
 <option value="721">Orion\'s Belt</option> \
 <option value="722">Pin of Health</option> \
 <option value="723">Ring of Dasmiff</option> \
 <option value="724">Ring of Power</option> \
 <option value="725">Ring of the Mad Mage</option> \
 <option value="726">Trinket of Strength</option>',
'<option value="800">Blessed Shield of Defense</option> \
 <option value="801">Disc of Advancement</option> \
 <option value="802">Protection of Ramses</option> \
 <option value="803">Shield of Brooke</option> \
 <option value="804">Shield of Demos</option> \
 <option value="805">Shield of Elements</option> \
 <option value="806">Shield of Enduring Fear</option> \
 <option value="807">Shield of Eros</option> \
 <option value="808">Shield of Evasion</option> \
 <option value="809">Shield of Guardian Defense</option> \
 <option value="810">Shield of Quatis</option> \
 <option value="811">Shield of Speed</option> \
 <option value="812">Shield of the Fool</option> \
 <option value="813">Shield of the Gods</option> \
 <option value="814">Shield of the Undead</option> \
 <option value="815">Shield of the Wraith</option> \
 <option value="816">Shield of Thiron</option> \
 <option value="817">Shield of Transformation</option> \
 <option value="818">Shield of Ultimate Defense</option> \
 <option value="819">Supreme Shield of Death</option> \
 <option value="820">The Holy Shield</option> \
 <option value="821">The Resistor</option> \
 <option value="822">The Wind Shield</option> \
 <option value="823">Van\'s Shield</option> \
 <option value="824">Zir Daun</option> \
 <option value="900">Blessed Mail of Resistance</option> \
 <option value="901">Chain Mail of Absorption</option> \
 <option value="902">Chain Mail of Balance</option> \
 <option value="903">Chain Mail of Defense</option> \
 <option value="904">Chain Mail of Endurance</option> \
 <option value="905">Chain Mail of Immunity</option> \
 <option value="906">Chain Mail of Movement</option> \
 <option value="907">Chain Mail of Resistance</option> \
 <option value="908">Chain Mail of Talos</option> \
 <option value="909">Chain of Magical Health</option> \
 <option value="910">Chain of Super Resistance</option> \
 <option value="911">Chain of Tyrolia</option> \
 <option value="912">Chainmail of Speed</option> \
 <option value="913">Chainmail of the Elements</option> \
 <option value="914">Elvish Scalemail</option> \
 <option value="915">Light Mail Shirt</option> \
 <option value="916">Mail of Arcanus</option> \
 <option value="917">Mail of Pobox</option> \
 <option value="918">Mithril Chainmail</option> \
 <option value="919">Morthog\'s Chainmail</option> \
 <option value="920">Wraithe Shirt</option> \
 <option value="1000">Armor of the Warrior</option> \
 <option value="1001">Blood Plate of Lucifer</option> \
 <option value="1002">Bloodmail</option> \
 <option value="1003">Champion\'s Platemail</option> \
 <option value="1004">Elemental Transformation</option> \
 <option value="1005">Giddeon\'s Plate</option> \
 <option value="1006">Lor Goth</option> \
 <option value="1007">Plate Mail of Blessed Fear</option> \
 <option value="1008">Plate Mail of Defense</option> \
 <option value="1009">Plate Mail of Diversity</option> \
 <option value="1010">Plate Mail of Movement</option> \
 <option value="1011">Plate Mail of Resistance</option> \
 <option value="1012">Plate of Divine Protection</option> \
 <option value="1013">Plate of Eandor</option> \
 <option value="1014">Plate of Enduring Immunity</option> \
 <option value="1015">Plate of Immunity</option> \
 <option value="1016">Plate of Omnipotence</option> \
 <option value="1017">Plate of the Elements</option> \
 <option value="1018">Plate of Ultimax</option> \
 <option value="1019">Righteous Plate of Evasion</option> \
 <option value="1020">Silvermail</option> \
 <option value="1021">Suit of Power</option> \
 <option value="1022">Ziggmund\'s Armor</option>'
];

var artifact_properties = {
'100' : [11, 21, 71],
'101' : [111, 11],
'102' : [132, 144, 125, 126],
'103' : [130, 12],
'104' : [130, 11, 22],
'105' : [115, 120, 23],
'106' : [12, 22, 71],
'107' : [113, 120, 13, 21],
'108' : [115, 113, 12, 22],
'109' : [132, 11, 21],
'110' : [144, 120, 72],
'111' : [111, 13, 22, 72],
'112' : [102, 12, 21, 71],
'113' : [132, 13, 21, 73],
'114' : [110, 12, 73],
'115' : [11, 21],
'116' : [124, 11, 72],
'117' : [11, 21],
'118' : [130, 110, 12, 22],
'119' : [133, 102, 13, 22],
'120' : [132, 144, 125],
'121' : [144, 113, 12, 22],
'122' : [13, 23],
'123' : [131, 13, 23, 73],
'124' : [13, 23, 73],
'125' : [102, 115, 124, 23],
'126' : [144, 11, 73],
'127' : [132, 22, 73],
'200' : [11, 21],
'201' : [133, 12, 21, 71],
'202' : [141],
'203' : [124, 13, 72],
'204' : [144, 14, 21, 72],
'205' : [131, 141, 11],
'206' : [102, 13, 21],
'207' : [102, 126, 22],
'208' : [11, 21, 71],
'209' : [11, 21, 73],
'210' : [11, 21, 72],
'211' : [14, 21, 73],
'212' : [131],
'213' : [144, 115, 126, 14],
'214' : [14, 71],
'215' : [13, 21],
'216' : [115, 110, 124, 14],
'217' : [133, 131, 125, 14],
'218' : [13, 21, 71],
'219' : [11, 71],
'220' : [13, 72],
'221' : [130, 132, 13],
'222' : [14, 21, 73],
'223' : [132, 102, 14, 73],
'224' : [113, 12, 21, 73],
'225' : [133, 131, 125, 14],
'300' : [133, 141, 15],
'301' : [126, 124, 11],
'302' : [102, 115, 124],
'303' : [11],
'304' : [110, 14],
'305' : [102, 16, 72],
'307' : [14, 71],
'308' : [130, 14, 72],
'309' : [111, 13, 72],
'310' : [16, 72],
'311' : [130, 14],
'312' : [102, 125, 16, 72],
'313' : [113, 16, 72],
'314' : [16],
'315' : [102, 12, 72],
'316' : [144, 11],
'317' : [133, 131, 125, 16],
'318' : [113, 16],
'319' : [13],
'320' : [13, 71],
'321' : [113, 126, 16, 72],
'322' : [124, 11, 72],
'323' : [111, 120, 12],
'324' : [141, 113, 13],
'325' : [144, 14, 72],
'400' : [130, 131, 14, 23],
'401' : [115, 124],
'402' : [16, 21, 73],
'403' : [110, 15, 71],
'404' : [16],
'405' : [130, 120, 14, 21],
'406' : [124, 21, 71],
'407' : [130, 12, 22, 72],
'408' : [115, 110, 16, 23],
'409' : [130, 131, 12],
'410' : [115, 11],
'411' : [120, 21],
'412' : [126, 120, 11, 21],
'413' : [132, 15, 21, 73],
'414' : [12, 21, 72],
'415' : [11, 21, 72],
'416' : [132, 124, 22],
'417' : [115, 110, 13, 22],
'418' : [133, 131, 125],
'419' : [14, 21, 71],
'420' : [13, 23],
'421' : [14, 22, 72],
'422' : [141, 72],
'423' : [11, 22, 71],
'424' : [133, 16, 23, 73],
'500' : [141, 12],
'501' : [131, 62],
'502' : [11],
'503' : [11],
'505' : [11, 71, 62],
'506' : [122, 11, 71],
'507' : [11, 71],
'508' : [124, 11, 71],
'509' : [131, 141, 125, 124],
'510' : [12, 62],
'511' : [11, 71, 61],
'512' : [130, 11, 71],
'513' : [61],
'514' : [12, 62],
'515' : [11, 72],
'516' : [11],
'517' : [124],
'518' : [131, 110, 122, 11],
'519' : [12, 71, 61],
'520' : [11],
'521' : [12],
'522' : [132, 11, 62],
'600' : [130, 133, 14, 22],
'601' : [115, 11, 21],
'602' : [130, 15, 61],
'603' : [15, 22, 72],
'604' : [122, 22],
'605' : [12, 21],
'606' : [141, 15, 22, 72],
'607' : [131, 115],
'608' : [12, 71, 64],
'609' : [13, 61],
'610' : [124, 23, 73],
'611' : [132, 16, 73],
'612' : [133, 125],
'613' : [110, 11, 23],
'615' : [124, 64],
'616' : [11, 21, 62],
'617' : [12],
'618' : [110, 12, 63],
'619' : [115, 122, 14],
'620' : [131, 15, 72, 61],
'621' : [11, 21],
'622' : [16, 64],
'623' : [11, 21, 71, 61],
'624' : [12, 21, 71],
'625' : [133, 111, 120],
'700' : [12, 22],
'701' : [21, 42, 61],
'702' : [111, 13, 21, 45],
'703' : [124, 24, 43, 61],
'704' : [113, 124, 103, 104],
'705' : [104, 12, 22],
'706' : [14, 24, 46],
'707' : [22, 43, 63],
'708' : [100, 104, 14, 72],
'709' : [140, 11, 21, 72],
'710' : [21, 71, 42],
'711' : [11, 21],
'712' : [12, 21, 71],
'713' : [122, 140, 14],
'714' : [116, 12, 22],
'715' : [14, 72],
'716' : [116, 13, 72],
'717' : [106, 11, 21],
'718' : [104, 106, 124, 143],
'719' : [140, 22, 63],
'720' : [103, 106, 12, 72],
'721' : [12, 22, 42],
'722' : [11, 21, 71, 41],
'723' : [121, 13, 72],
'724' : [22, 42],
'725' : [124, 104, 14],
'726' : [113, 14, 24, 45],
'800' : [100, 23, 44],
'801' : [26, 46],
'802' : [140, 26],
'803' : [25, 46],
'804' : [21, 41],
'805' : [115, 22],
'806' : [140, 26, 44],
'807' : [23, 43],
'808' : [21, 41],
'809' : [122, 26, 41],
'810' : [24, 43],
'811' : [22],
'812' : [21, 41],
'813' : [104, 23, 43],
'814' : [143, 46],
'815' : [143, 22],
'816' : [115, 22],
'817' : [124, 143, 21],
'818' : [111, 120, 26, 46],
'819' : [143, 104, 26],
'820' : [103, 26, 46],
'821' : [23, 46],
'822' : [122, 26, 46],
'823' : [23, 44],
'824' : [21],
'900' : [100, 120, 23],
'901' : [104, 24, 42],
'902' : [23, 42],
'903' : [],
'904' : [22],
'905' : [124, 24, 43],
'906' : [21],
'907' : [21, 43],
'908' : [100, 104, 25, 46],
'909' : [41],
'910' : [111, 120, 25, 46],
'911' : [23, 42],
'912' : [22, 43],
'913' : [111, 24, 46],
'914' : [41],
'915' : [22, 43],
'916' : [41],
'917' : [115, 22, 43],
'918' : [22, 43],
'919' : [21, 42],
'920' : [120, 143, 23],
'1000' : [103, 42],
'1001' : [100, 23, 42],
'1002' : [115, 21, 42],
'1003' : [41],
'1004' : [115, 143, 41],
'1005' : [21, 42],
'1006' : [111, 43],
'1007' : [140, 100, 22, 43],
'1008' : [41],
'1009' : [22, 44],
'1010' : [21, 41],
'1011' : [44],
'1012' : [122, 104, 23],
'1013' : [21, 42],
'1014' : [124, 22],
'1015' : [124, 23, 46],
'1016' : [124, 143, 104, 24],
'1017' : [111, 22, 44],
'1018' : [104, 21, 42],
'1019' : [103, 21, 42],
'1020' : [122, 21, 42],
'1021' : [24, 46],
'1022' : [100, 103, 46]
};

var artifact_property_names = {
'11'  : '+1 Attack',
'12'  : '+2 Attack',
'13'  : '+3 Attack',
'14'  : '+4 Attack',
'15'  : '+5 Attack',
'16'  : '+6 Attack',
'21'  : '+1 Defense',
'22'  : '+2 Defense',
'23'  : '+3 Defense',
'24'  : '+4 Defense',
'25'  : '+5 Defense',
'26'  : '+6 Defense',
'41'  : '+1 Resistance',
'42'  : '+2 Resistance',
'43'  : '+3 Resistance',
'44'  : '+4 Resistance',
'45'  : '+5 Resistance',
'46'  : '+6 Resistance',
'61'  : '-1 Spell Save',
'62'  : '-2 Spell Save',
'63'  : '-3 Spell Save',
'64'  : '-4 Spell Save',
'71'  : '+1 To Hit',
'72'  : '+2 To Hit',
'73'  : '+3 To Hit',
'100' : 'Bless',
'102' : 'Holy Avenger',
'103' : 'Righteousness',
'104' : 'Invulnerability',
'106' : 'True Sight',
'107' : 'Lion Heart',
'110' : 'Stoning',
'111' : 'Resist Elements',
'113' : 'Giant Strength',
'115' : 'Elemental Armor',
'116' : 'Regeneration',
'120' : 'Resist Magic',
'121' : 'Flight',
'122' : 'Guardian Wind',
'123' : 'Invisibility',
'124' : 'Magic Immunity',
'125' : 'Phantasmal',
'126' : 'Haste',
'130' : 'Flaming',
'131' : 'Destruction',
'132' : 'Lightning',
'133' : 'Chaos',
'140' : 'Cloak of Fear',
'141' : 'Death',
'143' : 'Wraithform',
'144' : 'Vampiric'
};

function update_artigroup(side, craft_type) {
  var select_val = parseInt(document.getElementById('artifact_' + craft_type + 'select' + side).value);
  var craftx = document.getElementById('artifact_' + craft_type + 'craft' + side);
  var fixedx = document.getElementById('artifact_' + craft_type + 'fixed' + side);
  var craft_abilityx;
  var craft_valx;
  var craftidx;
  var abil_choice;
  var val_choice;
  if ((select_val > 0) && (select_val < 11)) {
    for (craftidx = 1; craftidx <= 4; craftidx += 1) {
      craft_abilityx = document.getElementById('artifact_' + craft_type + 'craft_' + craftidx + 'ability' + side);
      craft_valx = document.getElementById('artifact_' + craft_type + 'craft_' + craftidx + 'val' + side);
      abil_choice = parseInt(craft_abilityx.value);
      craft_abilityx.innerHTML = get_artiselect_innerhtml(select_val, 0);
      craft_abilityx.value = abil_choice;
      if (craft_abilityx.value == '') {
        abil_choice = 0;
        craft_abilityx.value = 0;
      }
      if ((abil_choice > 0) && (abil_choice < 100)) {
        val_choice = parseInt(craft_valx.value);
        craft_valx.innerHTML = get_artiselect_innerhtml(select_val, abil_choice);
        craft_valx.value = val_choice;
        if (craft_valx.value == '') {
          craft_valx.value = 0;
        }
        craft_valx.style.display = 'inline';
      } else {
        craft_valx.style.display = 'none';
        craft_valx.innerHTML = '<option value="0" selected="selected"></option>';
      }
    }
    craftx.style.display = 'block';
    fixedx.innerHTML = '';
  } else {
    craftx.style.display = 'none';
    if (select_val == 0) {
      for (craftidx = 1; craftidx <= 4; craftidx += 1) {
	document.getElementById('artifact_' + craft_type + 'craft_' + craftidx + 'ability' + side).innerHTML = '<option value="0" selected="selected"></option>';
      }
      fixedx.innerHTML = '';
    } else {
      var item_class = Math.floor((select_val + 0.5) / 100);
      var cur_properties = artifact_properties['' + select_val];
      var newHTML = '';
      var cur_val;
      for (craftaidx = 0; craftaidx < 4; craftaidx += 1) {
        craft_abilityx = document.getElementById('artifact_' + craft_type + 'craft_' + (craftaidx + 1) + 'ability' + side);
        craft_valx = document.getElementById('artifact_' + craft_type + 'craft_' + (craftaidx + 1) + 'val' + side);
        craft_abilityx.innerHTML = get_artiselect_innerhtml(item_class, 0);
        if (craftaidx < cur_properties.length) {
          cur_val = cur_properties[craftaidx];
          if (craftaidx > 0) {
            newHTML += '<br />';
          }
          if ((item_class > 8) && (cur_val >= 20) && (cur_val < 30)) {
            newHTML += artifact_property_names['' + (cur_val + item_class - 8)];
          } else {
            newHTML += artifact_property_names['' + cur_val];
          }
          if (cur_val < 100) {
            abil_choice = 10 * Math.floor((cur_val + 0.5) / 10);
            craft_valx.innerHTML = get_artiselect_innerhtml(item_class, abil_choice);
            craft_valx.value = cur_val;
          } else {
            abil_choice = cur_val;
	    craft_valx.style.display = 'none';
	    craft_valx.innerHTML = '<option value="0" selected="selected"></option>';
          }
	  craft_abilityx.value = abil_choice;
        } else {
          craft_abilityx.value = 0;
          craft_valx.style.display = 'none';
          craft_valx.innerHTML = '<option value="0" selected="selected"></option>';
        }
      }
      // awful hack
      if ((select_val == 110) || (select_val == 122)) {
        newHTML += '<br />True Sight';
      } else if (select_val == 903) {
        newHTML += '+1 Defense';
      } else if ((select_val == 909) || (select_val == 914) || (select_val == 916) || (select_val == 1003) || (select_val == 1008) || (select_val == 1011)) {
        newHTML += '<br />+1 Defense';
      } else if ((select_val == 1000) || (select_val == 1004) || (select_val == 1006)) {
        newHTML += '<br />+2 Defense';
      }
      fixedx.innerHTML = newHTML;
    }
  }
  calcdamage();
}

function craftchange(side, craft_type, changed_craftidx) {
  var craft_abilityx = document.getElementById('artifact_' + craft_type + 'craft_' + changed_craftidx + 'ability' + side);
  var craft_valx = document.getElementById('artifact_' + craft_type + 'craft_' + changed_craftidx + 'val' + side);
  var abil_choice = parseInt(craft_abilityx.value);
  var abil_conflict = 99;
  var craftidx;
  var tmp_craft_abilityx;
  var tmp_craft_valx;
  var tmp_abil_choice;
  var val_choice;
  if (abil_choice == 111) { // resist elements/elemental armor
    abil_conflict = 115;
  } else if (abil_choice == 115) {
    abil_conflict = 111;
  } else if (abil_choice == 120) { // resist magic/magic immunity
    abil_conflict = 124;
  } else if (abil_choice == 124) {
    abil_conflict = 120;
  }
  if (abil_choice > 0) {
    for (craftidx = 1; craftidx <= 4; craftidx += 1) {
      if (craftidx != changed_craftidx) {
	tmp_craft_abilityx = document.getElementById('artifact_' + craft_type + 'craft_' + craftidx + 'ability' + side);
	tmp_abil_choice = parseInt(tmp_craft_abilityx.value);
        if ((tmp_abil_choice == abil_choice) || (tmp_abil_choice == abil_conflict)) {
          tmp_craft_abilityx.value = 0;
          tmp_craft_valx = document.getElementById('artifact_' + craft_type + 'craft_' + craftidx + 'val' + side);
          tmp_craft_valx.style.display = 'none';
          tmp_craft_valx.innerHTML = '<option value="0" selected="selected"></option>';
        }
      }
    }
  }
  if ((abil_choice > 0) && (abil_choice < 100)) {
    var select_val = parseInt(document.getElementById('artifact_' + craft_type + 'select' + side).value);
    val_choice = parseInt(craft_valx.value);
    craft_valx.innerHTML = get_artiselect_innerhtml(select_val, abil_choice);
    craft_valx.value = val_choice;
    if (craft_valx.value == '') {
      craft_valx.value = 0;
    }
    craft_valx.style.display = 'inline';
  } else {
    craft_valx.style.display = 'none';
    craft_valx.innerHTML = '<option value="0" selected="selected"></option>';
  }
  calcdamage();
}

function refresh_abilities(side) {
  var unitidx = parseInt(document.getElementById('unit' + side).value);
  var abilityx = document.getElementById('ability' + side);
  var newHTML = '';
  var flying_val = parseInt(document.getElementById('flying' + side).value);
  var noncorp_val = parseInt(document.getElementById('noncorp' + side).value);
  var lshield_val = parseInt(document.getElementById('lshield' + side).value);
  var lucky_val = parseInt(document.getElementById('lucky' + side).value);
  var lrange_val = parseInt(document.getElementById('lrange' + side).value);
  var ap_val = parseInt(document.getElementById('ap' + side).value);
  var fs_val = parseInt(document.getElementById('fs' + side).value);
  var negatefs_val = parseInt(document.getElementById('negatefs' + side).value);
  var missimm_val = parseInt(document.getElementById('missimm' + side).value);
  var magimm_val = parseInt(document.getElementById('magimm' + side).value);
  var illimm_val = parseInt(document.getElementById('illimm' + side).value);
  var weapimm_val = parseInt(document.getElementById('weapimm' + side).value);
  var deathimm_val = parseInt(document.getElementById('deathimm' + side).value);
  var fireimm_val = parseInt(document.getElementById('fireimm' + side).value);
  var coldimm_val = parseInt(document.getElementById('coldimm' + side).value);
  var stonimm_val = parseInt(document.getElementById('stonimm' + side).value);
  var poisimm_val = parseInt(document.getElementById('poisimm' + side).value);
  var poison_val = parseInt(document.getElementById('poison' + side).value);
  var illusion_val = parseInt(document.getElementById('illusion' + side).value);
  var dgaze_val = parseInt(document.getElementById('dgaze' + side).value);
  var sgaze_val = parseInt(document.getElementById('sgaze' + side).value);
  var doomgaze_val = parseInt(document.getElementById('doomgaze' + side).value);
  var immo_val = parseInt(document.getElementById('immo' + side).value);
  var dispelevil_val = parseInt(document.getElementById('dispelevil' + side).value);
  var stouch_val = parseInt(document.getElementById('stouch' + side).value);
  var invis_val = parseInt(document.getElementById('invis' + side).value);
  var resistall_val = parseInt(document.getElementById('resistall' + side).value);
  var holybonus_val = parseInt(document.getElementById('holybonus' + side).value);
  var lifesteal_val = parseInt(document.getElementById('lifesteal' + side).value);
  var regen_val = parseInt(document.getElementById('regen' + side).value);
  var fear_val = parseInt(document.getElementById('fear' + side).value);
  if (flying_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103051540/masterofmagic/images/1/18/Icon_Movement_Air.png" width="18" height="14" /> Flying</span>';
  }
  if (noncorp_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120114063017/masterofmagic/images/d/df/Ability_NonCorporeal.png" width="32" height="32" /> <a href="/wiki/Non-Corporeal">Non-Corporeal</a></span>';
  }
  if (lshield_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120319223032/masterofmagic/images/3/32/Ability_LargeShield.png" width="32" height="32" /> <a href="/wiki/Large_Shield">Large Shield</a></span>';
  }
  if (lucky_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120327094349/masterofmagic/images/6/61/Ability_Lucky.png" width="32" height="32" /> <a href="/wiki/Lucky">Lucky</a></span>';
  }
  if (lrange_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120324231431/masterofmagic/images/b/bf/Ability_LongRange.png" width="32" height="32" /> <a href="/wiki/Long_Range">Long Range</a></span>';
  }
  if (ap_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120121160654/masterofmagic/images/2/2c/Ability_ArmorPiercing.png" width="32" height="32" /> <a href="/wiki/Armor_Piercing">Armor Piercing</a></span>';
  }
  if (fs_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120105004110/masterofmagic/images/d/dd/Ability_FirstStrike.png" width="32" height="32" /> <a href="/wiki/First_Strike">First Strike</a></span>';
  }
  if (negatefs_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120326124520/masterofmagic/images/0/09/Ability_NegateFirstStrike.png" width="32" height="32" /> <a href="/wiki/Negate_First_Strike">Negate First Strike</a></span>';
  }
  if (missimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120301063619/masterofmagic/images/6/6e/Ability_MissileImmunity.png" width="32" height="32" /> <a href="/wiki/Missile_Immunity">Missile Immunity</a></span>';
  }
  if (magimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120125011451/masterofmagic/images/c/c7/Ability_MagicImmunity.png" width="32" height="32" /> <a href="/wiki/Magic_Immunity">Magic Immunity</a></span>';
  }
  if (illimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120125011446/masterofmagic/images/8/8e/Ability_IllusionsImmunity.png" width="32" height="32" /> <a href="/wiki/Illusions_Immunity">Illusions Immunity</a></span>';
  }
  if (weapimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120121180204/masterofmagic/images/5/5a/Ability_WeaponImmunity.png" width="32" height="32" /> <a href="/wiki/Weapon_Immunity">Weapon Immunity</a></span>';
  }
  if (deathimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120114044849/masterofmagic/images/9/9d/Ability_DeathImmunity.png" width="32" height="32" /> <a href="/wiki/Death_Immunity">Death Immunity</a></span>';
  }
  if (fireimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120131212733/masterofmagic/images/c/c3/Ability_FireImmunity.png" width="32" height="32" /> <a href="/wiki/Fire_Immunity">Fire Immunity</a></span>';
  }
  if (coldimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120301063611/masterofmagic/images/3/32/Ability_ColdImmunity.png" width="32" height="32" /> <a href="/wiki/Cold_Immunity">Cold Immunity</a></span>';
  }
  if (stonimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120104205837/masterofmagic/images/6/61/Ability_StoningImmunity.png" width="32" height="32" /> <a href="/wiki/Stoning_Immunity">Stoning Immunity</a></span>';
  }
  if (poisimm_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120104205749/masterofmagic/images/e/e6/Ability_PoisonImmunity.png" width="32" height="32" /> <a href="/wiki/Poison_Immunity">Poison Immunity</a></span>';
  }
  if (poison_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120104022019/masterofmagic/images/4/4a/Ability_PoisonTouch.png" width="32" height="32" /> <a href="/wiki/Poison_Touch">Poison</a> ' + poison_val + '</span>';
  }
  if (illusion_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120114063022/masterofmagic/images/b/bc/Ability_Illusion.png" width="32" height="32" /> <a href="/wiki/Illusion">Illusion</a></span>';
  }
  if (dgaze_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120205050637/masterofmagic/images/6/6e/Ability_DeathGaze.png" width="32" height="32" /> <a href="/wiki/Death_Gaze">Death Gaze</a> ' + (10 - dgaze_val) + '</span>';
  }
  if (sgaze_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120103220003/masterofmagic/images/c/c9/Ability_StoningGaze.png" width="32" height="32" /> <a href="/wiki/Stoning_Gaze">Stoning Gaze</a> ' + (10 - sgaze_val) + '</span>';
  }
  if (doomgaze_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120205050631/masterofmagic/images/c/c2/Ability_DoomGaze.png" width="32" height="32" /> <a href="/wiki/Doom_Gaze">Doom Gaze</a> ' + doomgaze_val + '</span>';
  }
  if (immo_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120203184750/masterofmagic/images/d/d3/Ability_Immolation.png" width="32" height="32" /> <a href="/wiki/Immolation">Immolation</a> ' + immo_val + '</span>';
  }
  if (dispelevil_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120225195526/masterofmagic/images/3/37/Ability_DispelEvil.png" width="32" height="32" /> <a href="/wiki/Dispel_Evil">Dispel Evil</a></span>';
  }
  if (stouch_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120104145317/masterofmagic/images/3/32/Ability_StoningTouch.png" width="32" height="32" /> <a href="/wiki/Stoning_Touch">Stoning Touch</a> ' + (10 - stouch_val) + '</span>';
  }
  if (invis_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120121180157/masterofmagic/images/2/23/Ability_Invisibility.png" width="32" height="32" /> <a href="/wiki/Invisibility">Invisibility</a></span>';
  }
  if (resistall_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120213191134/masterofmagic/images/b/ba/Ability_ResistanceToAll.png" width="32" height="32" /> <a href="/wiki/Resistance_to_All">Resistance to All</a> ' + resistall_val + '</span>';
  }
  if (holybonus_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120225195519/masterofmagic/images/c/c3/Ability_HolyBonus.png" width="32" height="32" /> <a href="/wiki/Holy_Bonus">Holy Bonus</a> ' + holybonus_val + '</span>';
  }
  if (lifesteal_val > 0) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120315214508/masterofmagic/images/8/80/Ability_LifeSteal.png" width="32" height="32" /> <a href="/wiki/Life_Steal">Life Steal</a> ' + (10 - lifesteal_val) + ' <span style="color: #ee1111;">(unimplemented)</span></span>';
  }
  if (regen_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120206205433/masterofmagic/images/c/c8/Ability_Regeneration.png" width="32" height="32" /> <a href="/wiki/Regeneration">Regeneration</a> <span style="color: #ee1111;">(no extra per-figure HP)</span></span>';
  }
  if (fear_val) {
    newHTML = newHTML + '<span style="display:block; padding:2px;"><img alt="" src="https://images.wikia.nocookie.net/__cb20120205050642/masterofmagic/images/1/13/Ability_CauseFear.png" width="32" height="32" /> <a href="/wiki/Cause_Fear">Cause Fear</a> <span style="color: #ee1111;">(unimplemented)</span></span>';
  }
  abilityx.innerHTML = newHTML;
}

function toggle_eview(side, status) {
  var eshowx = document.getElementById('eshow' + side);
  var eselectx = document.getElementById('eselect' + side);
  if (status == 2) {
    eselectx.style.display = 'inline';
  } else {
    eselectx.style.display = 'none';
  }
  if (status == 1) {
    eshowx.style.display = 'inline';
  } else {
    eshowx.style.display = 'none';
  }
}

function toggle_rview(side, status) {
  var rshowx = document.getElementById('rshow' + side);
  var pickselectx = document.getElementById('pickselect' + side);
  if (status == 2) {
    pickselectx.style.display = 'inline';
  } else {
    pickselectx.style.display = 'none';
  }
  if (status == 1) {
    rshowx.style.display = 'inline';
  } else {
    rshowx.style.display = 'none';
  }
  if (status == 0) {
    document.getElementById('heropicklabel' + side).style.display = 'none';
  }
}

function randomize_hero(side) {
  var vnum = parseInt(document.getElementById('vnum').value);
  var pickct = parseInt(document.getElementById('pickct' + side).value);
  var picktype = parseInt(document.getElementById('picktype' + side).value);
  var agilex = document.getElementById('pick_agile' + side);
  var agiledx = document.getElementById('pick_agiled' + side);
  var bladex = document.getElementById('pick_blade' + side);
  var bladedx = document.getElementById('pick_bladed' + side);
  var constx = document.getElementById('pick_const' + side);
  var constdx = document.getElementById('pick_constd' + side);
  var leadx = document.getElementById('pick_lead' + side);
  var leaddx = document.getElementById('pick_leadd' + side);
  var mightx = document.getElementById('pick_might' + side);
  var mightdx = document.getElementById('pick_mightd' + side);
  var charmx = document.getElementById('pick_charm' + side);
  var luckyx = document.getElementById('pick_lucky' + side);
  var casterx = document.getElementById('pick_caster' + side);
  var arcanex = document.getElementById('pick_arcane' + side);
  var arcanedx = document.getElementById('pick_arcaned' + side);
  var prayerx = document.getElementById('pick_prayer' + side);
  var prayerdx = document.getElementById('pick_prayerd' + side);
  var offset = 0;
  var catmax = 10;
  var arcane_wasted = 0;
  if (picktype != 1) {
    catmax = 14;
    if (picktype == 2) {
      offset = 7;
    }
  }
  var picks_max = new Array(catmax);
  var picks_actual = new Array(catmax);
  if (picktype != 2) {
    picks_max[0] = 2 - parseInt(document.getElementById('guaranteed_agile' + side).value);
    picks_max[1] = 2 - parseInt(document.getElementById('guaranteed_blade' + side).value);
    picks_max[2] = 2 - parseInt(document.getElementById('guaranteed_const' + side).value);
    picks_max[3] = 2 - parseInt(document.getElementById('guaranteed_lead' + side).value);
    picks_max[4] = 2 - parseInt(document.getElementById('guaranteed_might' + side).value);
    picks_max[5] = 2 - parseInt(document.getElementById('guaranteed_arms' + side).value);
    picks_max[6] = 2 - parseInt(document.getElementById('guaranteed_legen' + side).value);
    agilex.checked = false;
    agiledx.checked = false;
    bladex.checked = false;
    bladedx.checked = false;
    constx.checked = false;
    constdx.checked = false;
    leadx.checked = false;
    leaddx.checked = false;
    mightx.checked = false;
    mightdx.checked = false;
  }
  picks_max[7] = 1 - parseInt(document.getElementById('guaranteed_charm' + side).value);
  picks_max[8] = 1;
  picks_max[9] = 1 - parseInt(document.getElementById('guaranteed_noble' + side).value);
  charmx.checked = false;
  luckyx.checked = false;
  if (picktype != 1) {
    picks_max[10] = 6 - parseInt(document.getElementById('guaranteed_caster' + side).value);
    picks_max[11] = 2 - parseInt(document.getElementById('guaranteed_arcane' + side).value);
    picks_max[12] = 2 - parseInt(document.getElementById('guaranteed_prayer' + side).value);
    picks_max[13] = 2 - parseInt(document.getElementById('guaranteed_sage' + side).value);
    // for v1.31, allow Arcane Power to be rolled for Torin/Alorra
    if ((vnum == 0) && (picks_max[11] == 0)) {
      arcane_wasted = 1;
      picks_max[11] = 2;
    }
    casterx.checked = false;
    arcanex.checked = false;
    arcanedx.checked = false;
    prayerx.checked = false;
    prayerdx.checked = false;
  }
  var idx;
  var newpick;
  for (idx = offset; idx < catmax; idx += 1) {
    picks_actual[idx] = 0;
  }
  for (idx = 0; idx < pickct; idx += 1) {
    do {
      newpick = offset + Math.floor(Math.random() * (catmax - offset));
    } while (picks_actual[newpick] == picks_max[newpick]);
    picks_actual[newpick] += 1;
  }
  if (picktype != 2) {
    if (picks_actual[0] == 1) {
      agilex.checked = true;
    } else if (picks_actual[0] == 2) {
      agiledx.checked = true;
    }
    if (picks_actual[1] == 1) {
      bladex.checked = true;
    } else if (picks_actual[1] == 2) {
      bladedx.checked = true;
    }
    if (picks_actual[2] == 1) {
      constx.checked = true;
    } else if (picks_actual[2] == 2) {
      constdx.checked = true;
    }
    if (picks_actual[3] == 1) {
      leadx.checked = true;
    } else if (picks_actual[3] == 2) {
      leaddx.checked = true;
    }
    if (picks_actual[4] == 1) {
      mightx.checked = true;
    } else if (picks_actual[4] == 2) {
      mightdx.checked = true;
    }
  }
  if (picks_actual[7] == 1) {
    charmx.checked = true;
  }
  if (picks_actual[8] == 1) {
    luckyx.checked = true;
  }
  if (picktype != 1) {
    if ((picks_max[10] == 6) && (picks_actual[10] > 0)) {
      casterx.checked = true;
    }
    if (arcane_wasted == 0) {
      if (picks_actual[11] == 1) {
        arcanex.checked = true;
      } else if (picks_actual[11] == 2) {
        arcanedx.checked = true;
      }
    }
    if (picks_actual[12] == 1) {
      prayerx.checked = true;
    } else if (picks_actual[12] == 2) {
      prayerdx.checked = true;
    }
  }
  enable_pick(side);
  change_pick(side);
}

function pick_and_artifact_init(side) {
  var pickct = parseInt(document.getElementById('pickct' + side).value);
  var heropicklabelx = document.getElementById('heropicklabel' + side);
  if (pickct == 0) {
    heropicklabelx.style.display = 'none';
    toggle_rview(side, 0);
  } else {
    var picksleftx = document.getElementById('picksleft' + side);
    var pickstotx = document.getElementById('pickstot' + side);
    var picktype = parseInt(document.getElementById('picktype' + side).value);
    var pickfighterx = document.getElementById('pickfighter' + side);
    var pickmagex = document.getElementById('pickmage' + side);
    var agilex = document.getElementById('pick_agile' + side);
    var agiledx = document.getElementById('pick_agiled' + side);
    var bladex = document.getElementById('pick_blade' + side);
    var bladedx = document.getElementById('pick_bladed' + side);
    var constx = document.getElementById('pick_const' + side);
    var constdx = document.getElementById('pick_constd' + side);
    var leadx = document.getElementById('pick_lead' + side);
    var leaddx = document.getElementById('pick_leadd' + side);
    var mightx = document.getElementById('pick_might' + side);
    var mightdx = document.getElementById('pick_mightd' + side);
    var charmx = document.getElementById('pick_charm' + side);
    var luckyx = document.getElementById('pick_lucky' + side);
    var casterx = document.getElementById('pick_caster' + side);
    var arcanex = document.getElementById('pick_arcane' + side);
    var arcanedx = document.getElementById('pick_arcaned' + side);
    var prayerx = document.getElementById('pick_prayer' + side);
    var prayerdx = document.getElementById('pick_prayerd' + side);
    var show_charmx = document.getElementById('show_charm' + side);
    var charm_val = parseInt(document.getElementById('guaranteed_charm' + side).value);
    agilex.checked = false;
    agiledx.checked = false;
    bladex.checked = false;
    bladedx.checked = false;
    constx.checked = false;
    constdx.checked = false;
    leadx.checked = false;
    leaddx.checked = false;
    mightx.checked = false;
    mightdx.checked = false;
    charmx.checked = false;
    luckyx.checked = false;
    casterx.checked = false;
    arcanex.checked = false;
    arcanedx.checked = false;
    prayerx.checked = false;
    prayerdx.checked = false;
    if (charm_val == 0) {
      show_charmx.style.display = 'inline';
    } else {
      show_charmx.style.display = 'none';
    }
    if (picktype == 2) {
      pickfighterx.style.display = 'none';
    } else {
      pickfighterx.style.display = 'inline';
      var agile_halfx = document.getElementById('pick_agile_half' + side);
      var blade_halfx = document.getElementById('pick_blade_half' + side);
      var const_halfx = document.getElementById('pick_const_half' + side);
      var lead_halfx = document.getElementById('pick_lead_half' + side);
      var might_halfx = document.getElementById('pick_might_half' + side);
      var show_agilex = document.getElementById('show_agile' + side);
      var show_agiledx = document.getElementById('show_agiled' + side);
      var show_bladedx = document.getElementById('show_bladed' + side);
      var show_constdx = document.getElementById('show_constd' + side);
      var show_leadx = document.getElementById('show_lead' + side);
      var show_leaddx = document.getElementById('show_leadd' + side);
      var show_mightx = document.getElementById('show_might' + side);
      var show_mightdx = document.getElementById('show_mightd' + side);
      var agile_val = parseInt(document.getElementById('guaranteed_agile' + side).value);
      var blade_val = parseInt(document.getElementById('guaranteed_blade' + side).value);
      var const_val = parseInt(document.getElementById('guaranteed_const' + side).value);
      var lead_val = parseInt(document.getElementById('guaranteed_lead' + side).value);
      var might_val = parseInt(document.getElementById('guaranteed_might' + side).value);
      if (pickct == 1) {
        show_agiledx.style.display = 'none';
        show_bladedx.style.display = 'none';
        show_constdx.style.display = 'none';
        show_leaddx.style.display = 'none';
        show_mightdx.style.display = 'none';
      } else {
        show_agiledx.style.display = 'inline';
        show_bladedx.style.display = 'inline';
        show_constdx.style.display = 'inline';
        show_leaddx.style.display = 'inline';
        show_mightdx.style.display = 'inline';
      }
      show_agilex.style.display = 'inline';
      show_leadx.style.display = 'inline';
      show_mightx.style.display = 'inline';
      if (agile_val == 0) {
        agile_halfx.style.display = 'none';
      } else {
        agile_halfx.style.display = 'inline';
        show_agiledx.style.display = 'none';
        if (agile_val == 2) {
          show_agilex.style.display = 'none';
        }
      }
      if (blade_val == 0) {
        blade_halfx.style.display = 'none';
      } else {
        blade_halfx.style.display = 'inline';
        show_bladedx.style.display = 'none';
      }
      if (const_val == 0) {
        const_halfx.style.display = 'none';
      } else {
        const_halfx.style.display = 'inline';
        show_constdx.style.display = 'none';
      }
      if (lead_val == 0) {
        lead_halfx.style.display = 'none';
      } else {
        lead_halfx.style.display = 'inline';
        show_leaddx.style.display = 'none';
        if (lead_val == 2) {
          show_leadx.style.display = 'none';
        }
      }
      if (might_val == 0) {
        might_halfx.style.display = 'none';
      } else {
        might_halfx.style.display = 'inline';
        show_mightdx.style.display = 'none';
        if (might_val == 2) {
          show_mightx.style.display = 'none';
        }
      }
    }
    if (picktype == 1) {
      pickmagex.style.display = 'none';
    } else {
      pickmagex.style.display = 'inline';
      var arcane_halfx = document.getElementById('pick_arcane_half' + side);
      var prayer_halfx = document.getElementById('pick_prayer_half' + side);
      var show_casterx = document.getElementById('show_caster' + side);
      var show_arcanex = document.getElementById('show_arcane' + side);
      var show_arcanedx = document.getElementById('show_arcaned' + side);
      var show_prayerx = document.getElementById('show_prayer' + side);
      var show_prayerdx = document.getElementById('show_prayerd' + side);
      var caster_val = parseInt(document.getElementById('guaranteed_caster' + side).value);
      var arcane_val = parseInt(document.getElementById('guaranteed_arcane' + side).value);
      var prayer_val = parseInt(document.getElementById('guaranteed_prayer' + side).value);
      if (pickct == 1) {
        show_arcanedx.style.display = 'none';
        show_prayerdx.style.display = 'none';
      } else {
        show_arcanedx.style.display = 'inline';
        show_prayerdx.style.display = 'inline';
      }
      show_arcanex.style.display = 'inline';
      show_prayerx.style.display = 'inline';
      if (caster_val == 1) {
        show_casterx.style.display = 'none';
      } else {
        show_casterx.style.display = 'inline';
      }
      if (arcane_val == 0) {
        arcane_halfx.style.display = 'none';
      } else {
        arcane_halfx.style.display = 'inline';
        show_arcanedx.style.display = 'none';
        if (arcane_val == 2) {
          show_arcanex.style.display = 'none';
        }
      }
      if (prayer_val == 0) {
        prayer_halfx.style.display = 'none';
      } else {
        prayer_halfx.style.display = 'inline';
        show_prayerdx.style.display = 'none';
        if (prayer_val == 2) {
          show_prayerx.style.display = 'none';
        }
      }
    }
    picksleftx.innerHTML = '' + pickct;
    pickstotx.innerHTML = '' + pickct;
    heropicklabelx.style.display = 'inline';
    toggle_rview(side, 1);
    enable_pick(side);
  }
  var hequipprof_val = parseInt(document.getElementById('hequipprof' + side).value);
  var artifact_attimgx = document.getElementById('artifact_attimg' + side);
  var artifact_attselectx = document.getElementById('artifact_attselect' + side);
  var artifact_attcraftx = document.getElementById('artifact_attcraft' + side);
  var artifact_defimgx = document.getElementById('artifact_defimg' + side);
  var artifact_defselectx = document.getElementById('artifact_defselect' + side);
  var artifact_defcraftx = document.getElementById('artifact_defcraft' + side);
  var artifact_miscimgx = document.getElementById('artifact_miscimg' + side);
  var artifact_miscselectx = document.getElementById('artifact_miscselect' + side);
  var artifact_misccraftx = document.getElementById('artifact_misccraft' + side);
  var attHTML = '<option value="0" selected="selected"></option>';
  var defHTML = '<option value="0" selected="selected"></option>';
  if (hequipprof_val == 0) {
    artifact_attimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120702054420/masterofmagic/images/8/8f/ItemSlot_Sword.png" width="32" height="32" />';
  } else if (hequipprof_val == 1) {
    artifact_attimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120705152103/masterofmagic/images/9/97/ItemSlot_Bow.png" width="32" height="32" />';
  } else if (hequipprof_val == 2) {
    artifact_attimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120711222929/masterofmagic/images/b/b5/ItemSlot_SwordStaff.png" width="32" height="32" />';
  } else {
    artifact_attimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120709143760/masterofmagic/images/9/94/ItemSlot_Staff.png" width="32" height="32" />';
  }
  if (hequipprof_val < 3) {
    attHTML += '<option value="1">Crafted Sword</option><option value="2">Crafted Mace</option><option value="3">Crafted Axe</option>';
  }
  if (hequipprof_val == 1) {
    attHTML += '<option value="4">Crafted Bow</option>';
  } else if (hequipprof_val > 1) {
    attHTML += '<option value="5">Crafted Wand</option><option value="6">Crafted Staff</option>';
  }
  if (hequipprof_val < 3) {
    attHTML += artifact_selecthtml[0];
  }
  if (hequipprof_val == 1) {
    attHTML += artifact_selecthtml[1];
  } else if (hequipprof_val > 1) {
    attHTML += artifact_selecthtml[2];
  }
  if (hequipprof_val < 3) {
    artifact_defimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120702054430/masterofmagic/images/f/fb/ItemSlot_Shield.png" width="32" height="32" />';
    defHTML += '<option value="8">Crafted Shield</option><option value="9">Crafted Chain</option><option value="10">Crafted Plate</option>';
  } else {
    artifact_defimgx.innerHTML = '<img alt="" src="https://images.wikia.nocookie.net/__cb20120702054434/masterofmagic/images/d/d8/ItemSlot_Misc.png" width="32" height="32" />';
    defHTML += '<option value="7">Crafted Amulet</option>';
  }
  if (hequipprof_val < 3) {
    defHTML += artifact_selecthtml[4];
  } else {
    defHTML += artifact_selecthtml[3];
  }
  var select_val = parseInt(artifact_attselectx.value);
  artifact_attselectx.innerHTML = attHTML;
  artifact_attselectx.value = select_val;
  var craftidx;
  if (artifact_attselectx.value == '') {
    select_val = 0;
    artifact_attselectx.value = 0;
    for (craftidx = 1; craftidx <= 4; craftidx += 1) {
      document.getElementById('artifact_attcraft_' + craftidx + 'ability' + side).value = 0;
    }
  }
  if (select_val < 100) {
    document.getElementById('artifact_attfixed' + side).innerHTML = '';
  }
  if ((select_val > 0) && (select_val < 11)) {
    artifact_attcraftx.style.display = 'block';
  } else {
    artifact_attcraftx.style.display = 'none';
  }

  select_val = parseInt(artifact_defselectx.value);
  artifact_defselectx.innerHTML = defHTML;
  artifact_defselectx.value = select_val;
  if (artifact_defselectx.value == '') {
    select_val = 0;
    artifact_defselectx.value = 0;
    for (craftidx = 1; craftidx <= 4; craftidx += 1) {
      document.getElementById('artifact_defcraft_' + craftidx + 'ability' + side).value = 0;
    }
  }
  if (select_val < 100) {
    document.getElementById('artifact_deffixed' + side).innerHTML = '';
  }
  if ((select_val > 0) && (select_val < 11)) {
    artifact_defcraftx.style.display = 'block';
  } else {
    artifact_defcraftx.style.display = 'none';
  }
  artifact_attselectx.style.display = 'block';
  artifact_defselectx.style.display = 'block';
  artifact_miscimgx.style.display = 'inline';
  artifact_miscselectx.style.display = 'block';
  select_val = parseInt(artifact_miscselectx.value);
  if (select_val < 100) {
    document.getElementById('artifact_miscfixed' + side).innerHTML = '';
  }
  if (select_val == 7) {
    artifact_misccraftx.style.display = 'block';
  } else {
    artifact_misccraftx.style.display = 'none';
  }
}

function picks_and_artifacts_clear(side) {
  toggle_rview(side, 0);
  document.getElementById('artifact_attimg' + side).innerHTML = '';
  var artifact_selectx = document.getElementById('artifact_attselect' + side);
  artifact_selectx.innerHTML = '<option value="0" selected="selected"></option>';
  artifact_selectx.style.display = 'none';
  artifact_selectx = document.getElementById('artifact_defselect' + side);
  artifact_selectx.innerHTML = '<option value="0" selected="selected"></option>';
  artifact_selectx.style.display = 'none';
  document.getElementById('artifact_attcraft' + side).style.display = 'none';
  document.getElementById('artifact_defimg' + side).innerHTML = '';
  document.getElementById('artifact_defcraft' + side).style.display = 'none';
  document.getElementById('artifact_miscimg' + side).style.display = 'none';
  document.getElementById('artifact_miscselect' + side).style.display = 'none';
  document.getElementById('artifact_misccraft' + side).style.display = 'none';
  var craftidx;
  for (craftidx = 1; craftidx <= 4; craftidx += 1) {
    document.getElementById('artifact_attcraft_' + craftidx + 'ability' + side).value = 0;
    document.getElementById('artifact_attcraft_' + craftidx + 'val' + side).value = 0;
    document.getElementById('artifact_defcraft_' + craftidx + 'ability' + side).value = 0;
    document.getElementById('artifact_defcraft_' + craftidx + 'val' + side).value = 0;
    document.getElementById('artifact_misccraft_' + craftidx + 'ability' + side).value = 0;
    document.getElementById('artifact_misccraft_' + craftidx + 'val' + side).value = 0;
  }
  document.getElementById('artifact_miscselect' + side).selectedIndex = 0;
  document.getElementById('artifact_attfixed' + side).innerHTML = '';
  document.getElementById('artifact_deffixed' + side).innerHTML = '';
  document.getElementById('artifact_miscfixed' + side).innerHTML = '';
}

function clear_ench(side) {
  document.getElementById('ench_bless' + side).checked = false;
  document.getElementById('ench_holyweap' + side).checked = false;
  document.getElementById('ench_holyarmor' + side).checked = false;
  document.getElementById('ench_truesight' + side).checked = false;
  document.getElementById('ench_heavlight' + side).checked = false;
  document.getElementById('ench_invuln' + side).checked = false;
  document.getElementById('ench_righteous' + side).checked = false;
  document.getElementById('ench_wraithform' + side).checked = false;
  document.getElementById('ench_cloudshadow' + side).checked = false;
  document.getElementById('ench_eldritch' + side).checked = false;
}

function show_normalench(side) {
  document.getElementById('show_enchnormala' + side).style.display = 'inline';
  document.getElementById('show_enchnormalb' + side).style.display = 'inline';
}

function hide_normalench(side) {
  document.getElementById('show_enchnormala' + side).style.display = 'none';
  document.getElementById('show_enchnormalb' + side).style.display = 'none';
  document.getElementById('ench_holyweap' + side).checked = false;
  document.getElementById('ench_holyarmor' + side).checked = false;
  document.getElementById('ench_eldritch' + side).checked = false;
}

function changeunit(side) {
  var raceidx = parseInt(document.getElementById('race' + side).value);
  var unitidx = parseInt(document.getElementById('unit' + side).value);
  var unitimgx = document.getElementById('unitimg' + side);
  var figuresx = document.getElementById('figures' + side);
  var fixed_figuresx = document.getElementById('fixed_figures' + side);
  var levelx = document.getElementById('level' + side);
  var base_meleex = document.getElementById('base_melee' + side);
  var rangedx = document.getElementById('ranged' + side);
  var rangedtypex = document.getElementById('rangedtype' + side);
  var base_rangedx = document.getElementById('base_ranged' + side);
  var base_defensex = document.getElementById('base_defense' + side);
  var base_resistx = document.getElementById('base_resist' + side);
  var base_tohitx = document.getElementById('base_tohit' + side);
  var breathtypex = document.getElementById('breathtype' + side);
  var base_breathx = document.getElementById('base_breath' + side);
  var base_hpx = document.getElementById('base_hp' + side);
  var dtx = document.getElementById('dt' + side);
  var attslabelx = document.getElementById('attslabel' + side);
  var attselectx = document.getElementById('attselect' + side);
  var flyingx = document.getElementById('flying' + side);
  var noncorpx = document.getElementById('noncorp' + side);
  var lshieldx = document.getElementById('lshield' + side);
  var luckyx = document.getElementById('lucky' + side);
  var lrangex = document.getElementById('lrange' + side);
  var apx = document.getElementById('ap' + side);
  var fsx = document.getElementById('fs' + side);
  var negatefsx = document.getElementById('negatefs' + side);
  var missimmx = document.getElementById('missimm' + side);
  var magimmx = document.getElementById('magimm' + side);
  var illimmx = document.getElementById('illimm' + side);
  var weapimmx = document.getElementById('weapimm' + side);
  var deathimmx = document.getElementById('deathimm' + side);
  var fireimmx = document.getElementById('fireimm' + side);
  var coldimmx = document.getElementById('coldimm' + side);
  var stonimmx = document.getElementById('stonimm' + side);
  var poisimmx = document.getElementById('poisimm' + side);
  var poisonx = document.getElementById('poison' + side);
  var illusionx = document.getElementById('illusion' + side);
  var gazerangedx = document.getElementById('gazeranged' + side);
  var dgazex = document.getElementById('dgaze' + side);
  var sgazex = document.getElementById('sgaze' + side);
  var doomgazex = document.getElementById('doomgaze' + side);
  var immox = document.getElementById('immo' + side);
  var dispelevilx = document.getElementById('dispelevil' + side);
  var stouchx = document.getElementById('stouch' + side);
  var invisx = document.getElementById('invis' + side);
  var resistallx = document.getElementById('resistall' + side);
  var holybonusx = document.getElementById('holybonus' + side);
  var lifestealx = document.getElementById('lifesteal' + side);
  var regenx = document.getElementById('regen' + side);
  var fearx = document.getElementById('fear' + side);
  var lifeunitx = document.getElementById('lifeunit' + side);
  var deathunitx = document.getElementById('deathunit' + side);
  var chaosunitx = document.getElementById('chaosunit' + side);
  var natureunitx = document.getElementById('natureunit' + side);
  var sorcunitx = document.getElementById('sorcunit' + side);
  var imgxstr = '';
  base_rangedx.value = '0';
  rangedtypex.value = '0';
  base_tohitx.value = '0';
  base_breathx.value = '0';
  breathtypex.value = '0';
  base_hpx.value = '1';
  flyingx.value = '0';
  noncorpx.value = '0';
  lshieldx.value = '0';
  luckyx.value = '0';
  lrangex.value = '0';
  apx.value = '0';
  fsx.value = '0';
  negatefsx.value = '0';
  missimmx.value = '0';
  magimmx.value = '0';
  illimmx.value = '0';
  weapimmx.value = '0';
  deathimmx.value = '0';
  fireimmx.value = '0';
  coldimmx.value = '0';
  stonimmx.value = '0';
  poisimmx.value = '0';
  poisonx.value = '0';
  illusionx.value = '0';
  gazerangedx.value = '0';
  dgazex.value = '0';
  sgazex.value = '0';
  doomgazex.value = '0';
  immox.value = '0';
  dispelevilx.value = '0';
  stouchx.value = '0';
  invisx.value = '0';
  resistallx.value = '0';
  holybonusx.value = '0';
  lifestealx.value = '0';
  regenx.value = '0';
  fearx.value = '0';
  lifeunitx.value = '0';
  deathunitx.value = '0';
  chaosunitx.value = '0';
  natureunitx.value = '0';
  sorcunitx.value = '0';
  if (unitidx == 0) {
    unitimgx.innerHTML = '';
    dtx.style.display = 'none';
    levelx.style.display = 'none';
    if (raceidx == 1) {
      picks_and_artifacts_clear(side);
    }
    hide_normalench(side);
    cleardamage();
  } else {
    if (unitidx < 36) {
      levelx.style.display = 'inline';
      var guaranteed_mightx = document.getElementById('guaranteed_might' + side);
      var cur_mightx = document.getElementById('cur_might' + side);
      var guaranteed_arcanex = document.getElementById('guaranteed_arcane' + side);
      var cur_arcanex = document.getElementById('cur_arcane' + side);
      var guaranteed_bladex = document.getElementById('guaranteed_blade' + side);
      var cur_bladex = document.getElementById('cur_blade' + side);
      var guaranteed_leadx = document.getElementById('guaranteed_lead' + side);
      var cur_leadx = document.getElementById('cur_lead' + side);
      var guaranteed_agilex = document.getElementById('guaranteed_agile' + side);
      var cur_agilex = document.getElementById('cur_agile' + side);
      var guaranteed_constx = document.getElementById('guaranteed_const' + side);
      var cur_constx = document.getElementById('cur_const' + side);
      var guaranteed_prayerx = document.getElementById('guaranteed_prayer' + side);
      var cur_prayerx = document.getElementById('cur_prayer' + side);
      var guaranteed_charmx = document.getElementById('guaranteed_charm' + side);
      var cur_charmx = document.getElementById('cur_charm' + side);
      var guaranteed_casterx = document.getElementById('guaranteed_caster' + side);
      var cur_casterx = document.getElementById('cur_caster' + side);
      var guaranteed_armsx = document.getElementById('guaranteed_arms' + side);
      var guaranteed_legenx = document.getElementById('guaranteed_legen' + side);
      var guaranteed_noblex = document.getElementById('guaranteed_noble' + side);
      var guaranteed_sagex = document.getElementById('guaranteed_sage' + side);
      var pickctx = document.getElementById('pickct' + side);
      var picktypex = document.getElementById('picktype' + side);
      var hequipprofx = document.getElementById('hequipprof' + side);
      guaranteed_mightx.value = '0';
      guaranteed_arcanex.value = '0';
      guaranteed_bladex.value = '0';
      guaranteed_leadx.value = '0';
      guaranteed_agilex.value = '0';
      guaranteed_constx.value = '0';
      guaranteed_prayerx.value = '0';
      guaranteed_charmx.value = '0';
      guaranteed_casterx.value = '0';
      guaranteed_armsx.value = '0';
      guaranteed_legenx.value = '0';
      guaranteed_noblex.value = '0';
      guaranteed_sagex.value = '0';
      base_defensex.value = '5';
      base_resistx.value = '5';
      pickctx.value = '0';
      picktypex.value = '1';
      hequipprofx.value = '0';
      switch (unitidx) {
      case 1:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210304/masterofmagic/images/4/4c/Hero_Aureus.png';
        base_meleex.value = '5';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '6';
        base_hpx.value = '5';
        guaranteed_casterx.value = '1';
        pickctx.value = '2';
        picktypex.value = '0';
        break;
      case 2:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210309/masterofmagic/images/thumb/9/9f/Hero_Bahgtru.png/60px-Hero_Bahgtru.png';
        base_meleex.value = '5';
        base_defensex.value = '4';
        base_breathx.value = '2';
        breathtypex.value = '1';
        base_hpx.value = '7';
        pickctx.value = '1';
        break;
      case 3:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210319/masterofmagic/images/thumb/4/48/Hero_Brax.png/60px-Hero_Brax.png';
        base_meleex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '9';
        base_hpx.value = '9';
        guaranteed_constx.value = '1';
        break;
      case 4:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210322/masterofmagic/images/thumb/9/92/Hero_BShan.png/60px-Hero_BShan.png';
        base_meleex.value = '3';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_defensex.value = '4';
        base_hpx.value = '5';
        hequipprofx.value = '1';
        break;
      case 5:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210328/masterofmagic/images/thumb/6/62/Hero_Fang.png/60px-Hero_Fang.png';
        base_meleex.value = '6';
        base_breathx.value = '4';
        breathtypex.value = '2';
        base_hpx.value = '7';
        flyingx.value = '1';
        guaranteed_mightx.value = '1';
        pickctx.value = '2';
        break;
      case 6:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210335/masterofmagic/images/thumb/a/a6/Hero_Greyfairer.png/60px-Hero_Greyfairer.png';
        base_meleex.value = '0';
        base_rangedx.value = '7';
        rangedtypex.value = '2';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        hequipprofx.value = '3';
        break;
      case 7:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210338/masterofmagic/images/thumb/d/d7/Hero_Gunthar.png/60px-Hero_Gunthar.png';
        base_meleex.value = '4';
        base_breathx.value = '2';
        breathtypex.value = '1';
        base_defensex.value = '3';
        base_hpx.value = '8';
        guaranteed_mightx.value = '1';
        break;
      case 8:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210343/masterofmagic/images/thumb/a/a0/Hero_Jaer.png/60px-Hero_Jaer.png';
        base_meleex.value = '0';
        base_rangedx.value = '5';
        rangedtypex.value = '2';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        pickctx.value = '1';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 9:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210349/masterofmagic/images/thumb/a/ad/Hero_Malleus.png/60px-Hero_Malleus.png';
        base_meleex.value = '0';
        base_rangedx.value = '7';
        rangedtypex.value = '1';
        base_resistx.value = '9';
        base_hpx.value = '4';
        guaranteed_arcanex.value = '1';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        pickctx.value = '1';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 10:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210355/masterofmagic/images/thumb/e/e9/Hero_Marcus.png/60px-Hero_Marcus.png';
        base_meleex.value = '5';
        base_rangedx.value = '4';
        rangedtypex.value = '4';
        base_hpx.value = '7';
        guaranteed_mightx.value = '1';
        guaranteed_casterx.value = '1';
        hequipprofx.value = '1';
        break;
      case 11:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210537/masterofmagic/images/thumb/1/1a/Hero_Morgana.png/60px-Hero_Morgana.png';
        base_meleex.value = '0';
        base_rangedx.value = '7';
        rangedtypex.value = '1';
        base_resistx.value = '5';
        base_hpx.value = '4';
        guaranteed_charmx.value = '1';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        pickctx.value = '2';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 12:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210542/masterofmagic/images/thumb/7/73/Hero_Rakir.png/60px-Hero_Rakir.png';
        base_meleex.value = '4';
        base_defensex.value = '4';
        base_hpx.value = '6';
        guaranteed_casterx.value = '1';
        break;
      case 13:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210548/masterofmagic/images/thumb/8/87/Hero_Reywind.png/60px-Hero_Reywind.png';
        base_meleex.value = '3';
        base_rangedx.value = '3';
        rangedtypex.value = '1';
        base_defensex.value = '4';
        base_hpx.value = '6';
        guaranteed_casterx.value = '1';
        pickctx.value = '1';
        picktypex.value = '0';
        hequipprofx.value = '2';
        break;
      case 14:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210555/masterofmagic/images/thumb/7/77/Hero_Serena.png/60px-Hero_Serena.png';
        base_meleex.value = '2';
        base_rangedx.value = '5';
        rangedtypex.value = '2';
        base_resistx.value = '6';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        pickctx.value = '1';
        picktypex.value = '2';
        break;
      case 15:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210559/masterofmagic/images/thumb/6/6a/Hero_Shalla.png/60px-Hero_Shalla.png';
        base_meleex.value = '6';
        base_breathx.value = '3';
        breathtypex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '5';
        base_hpx.value = '7';
        guaranteed_mightx.value = '1';
        guaranteed_bladex.value = '1';
        guaranteed_charmx.value = '1';
        pickctx.value = '1';
        break;
      case 16:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210604/masterofmagic/images/thumb/8/87/Hero_ShinBo.png/60px-Hero_ShinBo.png';
        base_meleex.value = '5';
        base_hpx.value = '6';
        guaranteed_bladex.value = '1';
        invisx.value = '1';
        pickctx.value = '2';
        break;
      case 17:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210610/masterofmagic/images/thumb/e/ee/Hero_Shuri.png/60px-Hero_Shuri.png';
        base_meleex.value = '4';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_defensex.value = '3';
        base_hpx.value = '6';
        guaranteed_bladex.value = '1';
        pickctx.value = '1';
        hequipprofx.value = '1';
        break;
      case 18:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210618/masterofmagic/images/thumb/e/ef/Hero_Spyder.png/60px-Hero_Spyder.png';
        base_meleex.value = '6';
        base_hpx.value = '7';
        guaranteed_leadx.value = '1';
        guaranteed_legenx.value = '2';
        pickctx.value = '1';
        break;
      case 19:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210643/masterofmagic/images/thumb/c/c3/Hero_Taki.png/60px-Hero_Taki.png';
        base_meleex.value = '5';
        base_hpx.value = '5';
        guaranteed_agilex.value = '2';
        pickctx = '1';
        break;
      case 20:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210649/masterofmagic/images/thumb/e/ec/Hero_Theria.png/60px-Hero_Theria.png';
        base_meleex.value = '4';
        base_resistx.value = '5';
        base_hpx.value = '6';
        guaranteed_agilex.value = '1';
        guaranteed_charmx.value = '1';
        break;
      case 21:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210654/masterofmagic/images/thumb/a/a8/Hero_Tumu.png/60px-Hero_Tumu.png';
        base_meleex.value = '2';
        base_hpx.value = '5';
        guaranteed_bladex.value = '1';
        poisonx.value = '5';
        pickctx.value = '1';
        break;
      case 22:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210661/masterofmagic/images/thumb/e/eb/Hero_Valana.png/60px-Hero_Valana.png';
        base_meleex.value = '3';
        base_hpx.value = '5';
        guaranteed_leadx.value = '1';
        guaranteed_casterx.value = '1';
        break;
      case 23:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210707/masterofmagic/images/thumb/4/43/Hero_Yramrag.png/60px-Hero_Yramrag.png';
        base_meleex.value = '0';
        base_rangedx.value = '7';
        rangedtypex.value = '1';
        base_resistx.value = '9';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        pickctx.value = '1';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 24:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120210713/masterofmagic/images/thumb/5/5f/Hero_Zaldron.png/60px-Hero_Zaldron.png';
        base_meleex.value = '0';
        base_rangedx.value = '5';
        rangedtypex.value = '3';
        base_defensex.value = '4';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        hequipprofx.value = '3';
        break;
      case 25:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211129/masterofmagic/images/thumb/1/14/Hero_Aerie.png/60px-Hero_Aerie.png';
        base_meleex.value = '0';
        base_rangedx.value = '4';
        rangedtypex.value = '3';
        base_defensex.value = '4';
        base_hpx.value = '4';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        illusionx.value = '1';
        pickctx.value = '2';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 26:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211134/masterofmagic/images/thumb/8/85/Hero_Alorra.png/60px-Hero_Alorra.png';
        base_meleex.value = '4';
        base_rangedx.value = '7';
        rangedtypex.value = '4';
        base_defensex.value = '6';
        base_hpx.value = '5';
        guaranteed_bladex.value = '1';
        guaranteed_casterx.value = '1';
        guaranteed_arcanex.value = '2';
        pickctx.value = '3';
        picktypex.value = '0';
        hequipprofx.value = '1';
        break;
      case 27:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211142/masterofmagic/images/thumb/a/a2/Hero_DethStryke.png/60px-Hero_DethStryke.png';
        base_meleex.value = '5';
        base_hpx.value = '9';
        guaranteed_mightx.value = '1';
        guaranteed_leadx.value = '1';
        guaranteed_constx.value = '1';
        guaranteed_armsx.value = '1';
        guaranteed_legenx.value = '1';
        pickctx.value = '1';
        break;
      case 28:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211147/masterofmagic/images/thumb/d/df/Hero_Elana.png/60px-Hero_Elana.png';
        base_meleex.value = '1';
        base_rangedx.value = '7';
        rangedtypex.value = '2';
        base_resistx.value = '5';
        base_hpx.value = '4';
        guaranteed_arcanex.value = '1';
        guaranteed_prayerx.value = '2';
        guaranteed_charmx.value = '1';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        hequipprofx.value = '3';
        break;
      case 29:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211153/masterofmagic/images/thumb/6/6e/Hero_Mortu.png/60px-Hero_Mortu.png';
        base_meleex.value = '8';
        base_hpx.value = '9';
        guaranteed_mightx.value = '1';
        guaranteed_bladex.value = '1';
        guaranteed_constx.value = '1';
        guaranteed_legenx.value = '1';
        apx.value = '1';
        fsx.value = '1';
        magimmx.value = '1';
        pickctx.value = '1';
        break;
      case 30:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211159/masterofmagic/images/thumb/c/c9/Hero_MysticX.png/60px-Hero_MysticX.png';
        base_meleex.value = '4';
        base_rangedx.value = '4';
        rangedtypex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '9';
        base_hpx.value = '7';
        guaranteed_casterx.value = '1';
        pickctx.value = '5';
        picktypex.value = '0';
        hequipprofx.value = '2';
        break;
      case 31:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211206/masterofmagic/images/thumb/6/6a/Hero_Ravashack.png/60px-Hero_Ravashack.png';
        base_meleex.value = '0';
        base_rangedx.value = '6';
        rangedtypex.value = '1';
        base_hpx.value = '4';
        guaranteed_arcanex.value = '1';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        lifestealx.value = '10';
        pickctx.value = '2';
        picktypex.value = '2';
        hequipprofx.value = '3';
        break;
      case 32:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211221/masterofmagic/images/thumb/7/7f/Hero_Roland.png/60px-Hero_Roland.png';
        base_meleex.value = '8';
        base_hpx.value = '7';
        guaranteed_mightx.value = '2';
        guaranteed_prayerx.value = '1';
        guaranteed_legenx.value = '1';
        apx.value = '1';
        fsx.value = '1';
        magimmx.value = '1';
        pickctx.value = '1';
        break;
      case 33:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211227/masterofmagic/images/thumb/d/db/Hero_SirHarold.png/60px-Hero_SirHarold.png';
        base_meleex.value = '7';
        base_hpx.value = '8';
        guaranteed_leadx.value = '2';
        guaranteed_constx.value = '1';
        guaranteed_legenx.value = '2';
        guaranteed_noblex.value = '1';
        pickctx.value = '1';
        break;
      case 34:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211233/masterofmagic/images/thumb/7/74/Hero_Torin.png/60px-Hero_Torin.png';
        base_meleex.value = '11';
        base_defensex.value = '8';
        base_resistx.value = '11';
        base_hpx.value = '11';
        guaranteed_mightx.value = '2';
        guaranteed_constx.value = '1';
        guaranteed_arcanex.value = '2';
        guaranteed_prayerx.value = '1';
        guaranteed_casterx.value = '1';
        missimmx.value = '1';
        magimmx.value = '1';
        lifeunitx.value = '1';
        pickctx.value = '2';
        picktypex.value = '0';
        break;
      case 35:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120120211241/masterofmagic/images/thumb/9/99/Hero_Warrax.png/60px-Hero_Warrax.png';
        base_meleex.value = '7';
        base_rangedx.value = '7';
        rangedtypex.value = '1';
        base_resistx.value = '8';
        base_hpx.value = '7';
        guaranteed_arcanex.value = '1';
        guaranteed_constx.value = '1';
        guaranteed_casterx.value = '1';
        apx.value = '1';
        pickctx.value = '3';
        picktypex.value = '0';
        hequipprofx.value = '2';
        break;
      }
      cur_mightx.value = guaranteed_mightx.value;
      cur_arcanex.value = guaranteed_arcanex.value;
      cur_bladex.value = guaranteed_bladex.value;
      cur_leadx.value = guaranteed_leadx.value;
      cur_agilex.value = guaranteed_agilex.value;
      cur_constx.value = guaranteed_constx.value;
      cur_prayerx.value = guaranteed_prayerx.value;
      cur_charmx.value = guaranteed_charmx.value;
      cur_casterx.value = guaranteed_casterx.value;
      pick_and_artifact_init(side);
    } else if (unitidx > 1000) {
      var fixed_meleex = document.getElementById('fixed_melee' + side);
      var fixed_defensex = document.getElementById('fixed_defense' + side);
      var fixed_resistx = document.getElementById('fixed_resist' + side);
      var breathx = document.getElementById('breath' + side);
      var fixed_breathx = document.getElementById('fixed_breath' + side);
      var fixed_hpx = document.getElementById('fixed_hp' + side);
      var true_ranged = 0;
      var true_breath = 0;
      var true_tohit = 0;
      var true_melee;
      var true_defense;
      var true_resist;
      var true_hp;
      switch (unitidx) {
      case 1001:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120213191056/masterofmagic/images/f/f2/Tactical_GuardianSpirit.png';
        figuresx.value = '1';
        true_melee = 10;
        true_defense = 4;
        true_resist = 10;
        true_hp = 10;
        noncorpx.value = '1';
        resistallx.value = '1';
        lifeunitx.value = '1';
        break;
      case 1002:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120216232029/masterofmagic/images/0/06/Tactical_Unicorns.png';
        figuresx.value = '4';
        true_melee = 5;
        true_defense = 3;
        true_resist = 7;
        true_tohit = 20;
        true_hp = 6;
        poisimmx.value = '1';
        resistallx.value = '2';
        lifeunitx.value = '1';
        break;
      case 1003:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120225195352/masterofmagic/images/b/b6/Tactical_Angel.png';
        figuresx.value = '1';
        true_melee = 13;
        true_defense = 7;
        true_resist = 8;
        true_tohit = 20;
        true_hp = 15;
        flyingx.value = '1';
        illimmx.value = '1';
        holybonusx.value = '1';
        dispelevilx.value = '1';
        lifeunitx.value = '1';
        break;
      case 1004:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120229230555/masterofmagic/images/5/5e/Tactical_ArchAngel.png';
        figuresx.value = '1';
        true_melee = 15;
        true_defense = 10;
        true_resist = 12;
        true_tohit = 30;
        true_hp = 18;
        flyingx.value = '1';
        illimmx.value = '1';
        holybonusx.value = '2';
        lifeunitx.value = '1';
        break;
      case 1005:
      case 1044:
      case 1045:
      case 1046:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120314173903/masterofmagic/images/9/94/Tactical_Zombies.png';
        figuresx.value = '6';
        if (unitidx == 1005) {
          true_melee = 4;
          true_defense = 3;
          true_tohit = 10;
        } else {
          true_melee = unitidx - 1040;
          true_defense = unitidx - 1041;
          true_tohit = 20;
        }
        true_resist = 3;
        true_hp = 3;
        illimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        deathunitx.value = '1';
        break;
      case 1006:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120301063325/masterofmagic/images/a/ac/Tactical_Skeletons.png';
        figuresx.value = '6';
        true_melee = 3;
        true_defense = 4;
        true_resist = 4;
        true_tohit = 10;
        true_hp = 1;
        missimmx.value = '1';
        illimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        deathunitx.value = '1';
        break;
      case 1007:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120302190924/masterofmagic/images/f/f0/Tactical_Ghouls.png';
        figuresx.value = '4';
        true_melee = 4;
        true_defense = 3;
        true_resist = 6;
        true_tohit = 10;
        true_hp = 3;
        illimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        poisonx.value = '1';
        deathunitx.value = '1';
        break;
      case 1008:
      case 1047:
      case 1048:
      case 1049:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120307185046/masterofmagic/images/f/fa/Tactical_Werewolves.png';
        figuresx.value = '6';
        if (unitidx == 1008) {
          true_melee = 5;
          true_defense = 1;
          true_tohit = 10;
        } else {
          true_melee = unitidx - 1042;
          true_defense = unitidx - 1046;
          true_tohit = 20;
        }
        true_resist = 6;
        true_hp = 5;
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        regenx.value = '1';
        deathunitx.value = '1';
        break;
      case 1009:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120310031541/masterofmagic/images/4/42/Tactical_NightStalker.png';
        figuresx.value = '1';
        true_melee = 7;
        true_defense = 3;
        true_resist = 8;
        true_tohit = 10;
        true_hp = 10;
        illimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        gazerangedx.value = '1';
        dgazex.value = '12';
        invisx.value = '1';
        deathunitx.value = '1';
        break;
      case 1010:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120312073544/masterofmagic/images/f/f0/Tactical_ShadowDemons.png';
        figuresx.value = '4';
        true_melee = 5;
        true_ranged = 4;
        rangedtypex.value = '1';
        true_defense = 4;
        true_resist = 8;
        true_tohit = 20;
        true_hp = 5;
        flyingx.value = '1';
        noncorpx.value = '1';
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        regenx.value = '1';
        deathunitx.value = '1';
        break;
      case 1011:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120314102347/masterofmagic/images/4/45/Tactical_Wraiths.png';
        figuresx.value = '4';
        true_melee = 7;
        true_defense = 6;
        true_resist = 8;
        true_tohit = 20;
        true_hp = 8;
        flyingx.value = '1';
        noncorpx.value = '1';
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        lifestealx.value = '13';
        deathunitx.value = '1';
        break;
      case 1012:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120315214551/masterofmagic/images/e/ed/Tactical_DeathKnights.png';
        figuresx.value = '4';
        true_melee = 9;
        true_defense = 8;
        true_resist = 10;
        true_tohit = 30;
        true_hp = 8;
        flyingx.value = '1';
        apx.value = '1';
        fsx.value = '1';
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        lifestealx.value = '14';
        deathunitx.value = '1';
        break;
      case 1013:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120317153953/masterofmagic/images/2/2c/Tactical_Demon.png';
        figuresx.value = '1';
        true_melee = 14;
        true_defense = 5;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 12;
        flyingx.value = '1';
        missimmx.value = '1';
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        deathunitx.value = '1';
        break;
      case 1014:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120317135704/masterofmagic/images/4/48/Tactical_DemonLord.png';
        figuresx.value = '1';
        true_melee = 20;
        true_ranged = 10;
        rangedtypex.value = '1';
        true_defense = 10;
        true_resist = 12;
        true_tohit = 30;
        true_hp = 20;
        flyingx.value = '1';
        illimmx.value = '1';
        weapimmx.value = '1';
        deathimmx.value = '1';
        coldimmx.value = '1';
        poisimmx.value = '1';
        fearx.value = '1';
        lifestealx.value = '15';
        deathunitx.value = '1';
        break;
      case 1015:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120128201652/masterofmagic/images/5/55/Tactical_HellHounds.png';
        figuresx.value = '4';
        true_melee = 3;
        true_defense = 2;
        true_resist = 6;
        true_tohit = 10;
        true_breath = 3;
        breathtypex.value = '2';
        true_hp = 4;
        chaosunitx.value = '1';
        break;
      case 1016:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120131212726/masterofmagic/images/c/cd/Tactical_FireElemental.png';
        figuresx.value = '1';
        true_melee = 12;
        true_defense = 4;
        true_resist = 6;
        true_hp = 10;
        fireimmx.value = '1';
        stonimmx.value = '1';
        poisimmx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1017:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120201000542/masterofmagic/images/2/20/Tactical_FireGiant.png';
        figuresx.value = '1';
        true_melee = 10;
        true_ranged = 10;
        rangedtypex.value = '5';
        true_defense = 5;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 15;
        fireimmx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1018:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120203045954/masterofmagic/images/d/d0/Tactical_Gargoyles.png';
        figuresx.value = '4';
        true_melee = 4;
        true_defense = 8;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 4;
        flyingx.value = '1';
        stonimmx.value = '1';
        poisimmx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1019:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120203181748/masterofmagic/images/a/aa/Tactical_DoomBat.png';
        figuresx.value = '1';
        true_melee = 10;
        true_defense = 5;
        true_resist = 9;
        true_tohit = 10;
        true_hp = 20;
        flyingx.value = '1';
        immox.value = '4';
        chaosunitx.value = '1';
        break;
      case 1020:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120204204743/masterofmagic/images/d/d0/Tactical_Chimeras.png';
        figuresx.value = '4';
        true_melee = 7;
        true_defense = 5;
        true_resist = 8;
        true_tohit = 10;
        true_breath = 4;
        breathtypex.value = '2';
        true_hp = 8;
        flyingx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1021:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120205050546/masterofmagic/images/9/94/Tactical_ChaosSpawn.png';
        figuresx.value = '1';
        true_melee = 1;
        true_defense = 6;
        true_resist = 10;
        true_hp = 15;
        flyingx.value = '1';
        poisonx.value = '4';
        gazerangedx.value = '4';
        dgazex.value = '14';
        sgazex.value = '14';
        doomgazex.value = '4';
        fearx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1022:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120205150948/masterofmagic/images/8/8f/Tactical_Efreet.png';
        figuresx.value = '1';
        true_melee = 9;
        true_ranged = 9;
        rangedtypex.value = '1';
        true_defense = 7;
        true_resist = 10;
        true_tohit = 20;
        true_hp = 12;
        flyingx.value = '1';
        fireimmx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1023:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120206204708/masterofmagic/images/6/67/Tactical_Hydra.png';
        figuresx.value = '9';
        true_melee = 6; 
        true_defense = 4;
        true_resist = 11;
        true_tohit = 10;
        true_breath = 5;
        breathtypex.value = '2';
        true_hp = 10;
        regenx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1024:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120209042057/masterofmagic/images/9/92/Tactical_GreatDrake.png';
        figuresx.value = '1';
        true_melee = 30;
        true_defense = 10;
        true_resist = 12;
        true_tohit = 30;
        true_breath = 30;
        breathtypex.value = '2';
        true_hp = 30;
        flyingx.value = '1';
        chaosunitx.value = '1';
        break;
      case 1025:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120103044527/masterofmagic/images/4/46/Tactical_WarBears.png';
        figuresx.value = '2';
        true_melee = 7;
        true_defense = 3;
        true_resist = 6;
        true_hp = 8;
        natureunitx.value = '1';
        break;
      case 1026:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120103210915/masterofmagic/images/2/20/Tactical_Sprites.png';
        figuresx.value = '4';
        true_melee = 2;
        true_ranged = 3;
        rangedtypex.value = '2';
        true_defense = 2;
        true_resist = 8;
        true_tohit = 10;
        true_hp = 1;
        flyingx.value = '1';
        natureunitx.value = '1';
        break;
      case 1027:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120104022007/masterofmagic/images/c/ca/Tactical_GiantSpiders.png';
        figuresx.value = '2';
        true_melee = 4;
        true_defense = 3;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 10;
        poisonx.value = '4';
        natureunitx.value = '1';
        break;
      case 1028:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120104145348/masterofmagic/images/4/4e/Tactical_Cockatrices.png';
        figuresx.value = '4';
        true_melee = 4;
        true_defense = 3;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 3;
        flyingx.value = '1';
        stouchx.value = '13';
        natureunitx.value = '1';
        break;
      case 1029:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120103221425/masterofmagic/images/7/76/Tactical_Basilisk.png';
        figuresx.value = '1';
        true_melee = 15;
        true_defense = 4;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 30;
        gazerangedx.value = '1';
        sgazex.value = '11';
        natureunitx.value = '1';
        break;
      case 1030:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120104210409/masterofmagic/images/1/18/Tactical_StoneGiant.png';
        figuresx.value = '1';
        true_melee = 15;
        true_ranged = 15;
        rangedtypex.value = '5';
        true_defense = 8;
        true_resist = 9;
        true_tohit = 20;
        true_hp = 20;
        poisimmx.value = '1';
        stonimmx.value = '1';
        natureunitx.value = '1';
        break;
      case 1031:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120104231642/masterofmagic/images/a/ac/Tactical_Gorgons.png';
        figuresx.value = '4';
        true_melee = 8;
        true_defense = 7;
        true_resist = 9;
        true_tohit = 20;
        true_hp = 9;
        flyingx.value = '1';
        gazerangedx.value = '1';
        sgazex.value = '12';
        natureunitx.value = '1';
        break;
      case 1032:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120105140107/masterofmagic/images/e/ee/Tactical_EarthElemental.png';
        figuresx.value = '1';
        true_melee = 25;
        true_defense = 4;
        true_resist = 8;
        true_tohit = 10;
        true_hp = 30;
        poisimmx.value = '1';
        stonimmx.value = '1';
        natureunitx.value = '1';
        break;
      case 1033:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120104002332/masterofmagic/images/1/1a/Tactical_Behemoth.png';
        figuresx.value = '1';
        true_melee = 25;
        true_defense = 9;
        true_resist = 10;
        true_tohit = 20;
        true_hp = 45;
        natureunitx.value = '1';
        break;
      case 1034:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120105004051/masterofmagic/images/4/4e/Tactical_Colossus.png';
        figuresx.value = '1';
        true_melee = 20;
        true_ranged = 20;
        rangedtypex.value = '5';
        true_defense = 10;
        true_resist = 15;
        true_tohit = 30;
        true_hp = 30;
        fsx.value = '1';
        poisimmx.value = '1';
        stonimmx.value = '1';
        natureunitx.value = '1';
        break;
      case 1035:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120105010254/masterofmagic/images/a/a7/Tactical_GreatWyrm.png';
        figuresx.value = '1';
        true_melee = 25;
        true_defense = 12;
        true_resist = 12;
        true_tohit = 30;
        true_hp = 45;
        poisonx.value = '15';
        natureunitx.value = '1';
        break;
      case 1036:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120114063009/masterofmagic/images/3/39/Tactical_PhantomWarriors.png';
        figuresx.value = '6';
        true_melee = 3;
        true_defense = 0;
        true_resist = 6;
        true_hp = 1;
        noncorpx.value = '1';
        poisimmx.value = '1';
        stonimmx.value = '1';
        deathimmx.value = '1';
        illusionx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1037:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120114213316/masterofmagic/images/d/d5/Tactical_Nagas.png';
        figuresx.value = '2';
        true_melee = 4;
        true_defense = 3;
        true_resist = 7;
        true_tohit = 10;
        true_hp = 6;
        fsx.value = '1';
        poisonx.value = '4';
        sorcunitx.value = '1';
        break;
      case 1038:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120116104905/masterofmagic/images/2/23/Tactical_PhantomBeast.png';
        figuresx.value = '1';
        true_melee = 18;
        true_defense = 0;
        true_resist = 8;
        true_tohit = 10;
        true_hp = 20;
        noncorpx.value = '1';
        poisimmx.value = '1';
        stonimmx.value = '1';
        deathimmx.value = '1';
        illusionx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1039:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120121160349/masterofmagic/images/d/de/Tactical_StormGiant.png';
        figuresx.value = '1';
        true_melee = 12;
        true_ranged = 10;
        rangedtypex.value = '1';
        true_defense = 7;
        true_resist = 9;
        true_tohit = 20;
        true_hp = 20;
        apx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1040:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120121180136/masterofmagic/images/a/af/Tactical_AirElemental.png';
        figuresx.value = '1';
        true_melee = 15;
        true_defense = 8;
        true_resist = 9;
        true_tohit = 10;
        true_hp = 10;
        flyingx.value = '1';
        weapimmx.value = '1';
        poisimmx.value = '1';
        stonimmx.value = '1';
        invisx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1041:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120123155013/masterofmagic/images/d/da/Tactical_Djinn.png';
        figuresx.value = '1';
        true_melee = 15;
        true_ranged = 8;
        rangedtypex.value = '2';
        true_defense = 8;
        true_resist = 10;
        true_tohit = 30;
        true_hp = 20;
        flyingx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1042:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120125011513/masterofmagic/images/a/a6/Tactical_SkyDrake.png';
        figuresx.value = '1';
        true_melee = 20;
        true_defense = 10;
        true_resist = 14;
        true_tohit = 30;
        true_breath = 20;
        breathtypex.value = '3';
        true_hp = 25;
        flyingx.value = '1';
        magimmx.value = '1';
        illimmx.value = '1';
        sorcunitx.value = '1';
        break;
      case 1043:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120317161125/masterofmagic/images/4/46/Tactical_MagicSpirit.png';
        figuresx.value = '1';
        true_melee = 5;
        true_defense = 4;
        true_resist = 8;
        true_hp = 10;
        noncorpx.value = '1';
        break;
      }
      fixed_meleex.innerHTML = '' + true_melee;
      document.getElementById('melee' + side).selectedIndex = true_melee;
      if (true_ranged > 0) {
        document.getElementById('fixed_ranged' + side).innerHTML = '' + true_ranged;
      } else {
        document.getElementById('fixed_ranged' + side).innerHTML = '';
      }
      if (true_breath > 0) {
        document.getElementById('fixed_breath' + side).innerHTML = '' + true_breath;
      } else {
        document.getElementById('fixed_breath' + side).innerHTML = '';
      }
      rangedx.selectedIndex = true_ranged;
      breathx.selectedIndex = true_breath;
      fixed_defensex.innerHTML = '' + true_defense;
      document.getElementById('defense' + side).selectedIndex = true_defense;
      fixed_resistx.innerHTML = '' + true_resist;
      document.getElementById('resist' + side).selectedIndex = true_resist;
      fixed_hpx.innerHTML = '' + true_hp;
      fixed_figuresx.innerHTML = '' + figuresx.value;
      change_fig_nc(side, true_hp);
      write_tohit(true_tohit, side);
    } else {
      levelx.style.display = 'inline';
      base_defensex.value = '2';
      base_resistx.value = '4';
      switch (unitidx) {
      case 37:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120319194020/masterofmagic/images/f/f4/Tactical_BarbarianSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_resistx.value = '5';
        base_breathx.value = '1';
        breathtypex.value = '1';
        break;
      case 38:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120319223015/masterofmagic/images/5/5a/Tactical_BarbarianSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_resistx.value = '5';
        base_breathx.value = '1';
        breathtypex.value = '1';
        lshieldx.value = '1';
        break;
      case 39:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120320005347/masterofmagic/images/f/f8/Tactical_BarbarianBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        base_defensex.value = '1';
        base_resistx.value = '5';
        break;
      case 40:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120323223106/masterofmagic/images/9/97/Tactical_BarbarianShamans.png';
        figuresx.value = '4';
        base_meleex.value = '2';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '3';
        base_resistx.value = '7';
        break;
      case 41:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120320114907/masterofmagic/images/d/d3/Tactical_BarbarianCavalry.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_resistx.value = '5';
        base_breathx.value = '1';
        breathtypex.value = '1';
        base_hpx.value = '3';
        fsx.value = '1';
        break;
      case 42:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120326094248/masterofmagic/images/4/4e/Tactical_Berserkers.png';
        figuresx.value = '6';
        base_meleex.value = '7';
        base_breathx.value = '3';
        base_defensex.value = '3';
        base_resistx.value = '7';
        breathtypex.value = '1';
        base_hpx.value = '3';
        break;
      case 43:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120319161629/masterofmagic/images/5/50/Tactical_Settlers.png';
        figuresx.value = '1';
        base_meleex.value = '2';
        base_defensex.value = '1';
        base_hpx.value = '10';
        break;
      case 44:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120326113252/masterofmagic/images/8/89/Tactical_GnollSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '3';
        break;
      case 45:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120326115020/masterofmagic/images/7/7a/Tactical_GnollSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '5';
        lshieldx.value = '1';
        break;
      case 46:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120326124512/masterofmagic/images/f/ff/Tactical_GnollHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '6';
        base_defensex.value = '3';
        negatefsx.value = '1';
        break;
      case 47:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120326131059/masterofmagic/images/7/70/Tactical_GnollBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        break;
      case 48:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327092232/masterofmagic/images/1/1e/Tactical_WolfRiders.png';
        figuresx.value = '4';
        base_meleex.value = '7';
        base_defensex.value = '3';
        base_hpx.value = '5';
        break;
      case 50:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327102835/masterofmagic/images/a/a5/Tactical_HalflingSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_resistx.value = '6';
        luckyx.value = '1';
        break;
      case 51:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327152904/masterofmagic/images/0/0f/Tactical_HalflingSwordsmen.png';
        figuresx.value = '8';
        base_meleex.value = '2';
        base_resistx.value = '6';
        lshieldx.value = '1';
        luckyx.value = '1';
        break;
      case 52:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327154531/masterofmagic/images/5/59/Tactical_HalflingBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        base_defensex.value = '1';
        base_resistx.value = '6';
        luckyx.value = '1';
        break;
      case 53:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327172530/masterofmagic/images/a/a7/Tactical_HalflingShamans.png';
        figuresx.value = '4';
        base_meleex.value = '1';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '3';
        base_resistx.value = '8';
        luckyx.value = '1';
        break;
      case 54:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120327210252/masterofmagic/images/1/10/Tactical_Slingers.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_rangedx.value = '2';
        rangedtypex.value = '4';
        base_resistx.value = '6';
        luckyx.value = '1';
        break;
      case 56:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120328190357/masterofmagic/images/b/b2/Tactical_HighElfSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_resistx.value = '6';
        base_tohitx.value = '10';
        break;
      case 57:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120328193004/masterofmagic/images/8/8d/Tactical_HighElfSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_resistx.value = '6';
        base_tohitx.value = '10';
        lshieldx.value = '1';
        break;
      case 58:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120328195853/masterofmagic/images/0/04/Tactical_HighElfHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '3';
        base_resistx.value = '6';
        base_tohitx.value = '10';
        break;
      case 59:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20130816235121/masterofmagic/images/c/cc/Tactical_HighElfCavalry.gif';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_resistx.value = '6';
        base_tohitx.value = '10';
        base_hpx.value = '3';
        fsx.value = '1';
        break;
      case 60:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120331115635/masterofmagic/images/8/89/Tactical_HighElfMagicians.png';
        figuresx.value = '4';
        base_meleex.value = '1';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '10';
        base_tohitx.value = '10';
        break;
      case 61:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120329111642/masterofmagic/images/8/81/Tactical_Longbowmen.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_resistx.value = '6';
        base_tohitx.value = '10';
        break;
      case 62:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120330103960/masterofmagic/images/2/27/Tactical_ElvenLords.png';
        figuresx.value = '4';
        base_meleex.value = '5';
        base_defensex.value = '4';
        base_resistx.value = '9';
        base_tohitx.value = '20';
        base_hpx.value = '3';
        apx.value = '1';
        fsx.value = '1';
        break;
      case 63:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120330130248/masterofmagic/images/4/40/Tactical_Pegasai.png';
        figuresx.value = '2';
        base_meleex.value = '5';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '8';
        base_tohitx.value = '10';
        base_hpx.value = '5';
        flyingx.value = '1';
        break;
      case 64:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402121053/masterofmagic/images/a/a3/Tactical_HighMenCavalry.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_hpx.value = '3';
        fsx.value = '1';
        break;
      case 65:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402154541/masterofmagic/images/5/53/Tactical_HighMenMagicians.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '8';
        missimmx.value = '1';
        break;
      case 66:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402163503/masterofmagic/images/c/c4/Tactical_Paladins.png';
        figuresx.value = '4';
        base_meleex.value = '6';
        base_defensex.value = '5';
        base_resistx.value = '8';
        base_hpx.value = '4';
        apx.value = '1';
        fsx.value = '1';
        magimmx.value = '1';
        holybonusx.value = '1';
        break;
      case 68:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402193914/masterofmagic/images/1/1b/Tactical_KlackonEngineers.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_defensex.value = '1';
        base_resistx.value = '5';
        break;
      case 69:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402192811/masterofmagic/images/7/72/Tactical_KlackonSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '5';
        break;
      case 70:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402200210/masterofmagic/images/8/84/Tactical_KlackonSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_defensex.value = '4';
        base_resistx.value = '5';
        lshieldx.value = '1';
        break;
      case 71:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120403092718/masterofmagic/images/2/24/Tactical_KlackonHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '5';
        base_resistx.value = '5';
        break;
      case 72:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120403112552/masterofmagic/images/c/cd/Tactical_StagBeetle.png';
        figuresx.value = '1';
        base_meleex.value = '15';
        base_defensex.value = '7';
        base_resistx.value = '6';
        base_breathx.value = '5';
        breathtypex.value = '2';
        base_hpx.value = '20';
        break;
      case 74:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404102127/masterofmagic/images/b/bd/Tactical_LizardmenSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_defensex.value = '3';
        base_hpx.value = '2';
        break;
      case 75:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404103941/masterofmagic/images/2/2d/Tactical_LizardmenSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_defensex.value = '3';
        base_hpx.value = '2';
        lshieldx.value = '1';
        break;
      case 76:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404110512/masterofmagic/images/f/ff/Tactical_LizardmenHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '4';
        base_hpx.value = '2';
        negatefsx.value = '1';
        break;
      case 77:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404190422/masterofmagic/images/d/dc/Tactical_LizardmenShamans.png';
        figuresx.value = '4';
        base_meleex.value = '2';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '3';
        base_resistx.value = '6';
        base_hpx.value = '2';
        break;
      case 78:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404180109/masterofmagic/images/2/2f/Tactical_Javelineers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '5';
        base_hpx.value = '2';
        break;
      case 79:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120404195458/masterofmagic/images/a/a7/Tactical_DragonTurtle.png';
        figuresx.value = '1';
        base_meleex.value = '10';
        base_defensex.value ='8';
        base_resistx.value = '8';
        base_breathx.value = '5';
        breathtypex.value = '2';
        base_hpx.value = '15';
        break;
      case 80:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120406121723/masterofmagic/images/7/7c/Tactical_Rangers.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_rangedx.value = '3';
        rangedtypex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '6';
        base_hpx.value = '2';
        break;
      case 81:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120405102151/masterofmagic/images/4/4b/Tactical_Horsebowmen.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_rangedx.value = '2';
        rangedtypex.value = '4';
        base_resistx.value = '4';
        base_hpx.value = '3';
        break;
      case 82:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120406124812/masterofmagic/images/6/6d/Tactical_Griffins.png';
        figuresx.value = '2';
        base_meleex.value = '9';
        base_defensex.value = '5';
        base_resistx.value = '7';
        base_hpx.value = '10';
        flyingx.value = '1';
        apx.value = '1';
        fsx.value = '1';
        break;
      case 83:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407111742/masterofmagic/images/4/41/Tactical_OrcHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '3';
        break;
      case 84:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407113448/masterofmagic/images/5/56/Tactical_OrcCavalry.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_hpx.value = '3';
        break;
      case 85:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407114925/masterofmagic/images/b/b8/Tactical_OrcShamans.png';
        figuresx.value = '4';
        base_meleex.value = '2';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '3';
        base_resistx.value = '6';
        break;
      case 86:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407115846/masterofmagic/images/0/03/Tactical_OrcMagicians.png';
        figuresx.value = '4';
        base_meleex.value = '1';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '8';
        break;
      case 87:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407134109/masterofmagic/images/4/48/Tactical_WyvernRiders.png';
        figuresx.value = '2';
        base_meleex.value = '5';
        base_defensex.value = '5';
        base_resistx.value = '7';
        base_hpx.value = '10';
        flyingx.value = '1';
        poisonx.value = '6';
        break;
      case 88:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120319161629/masterofmagic/images/5/50/Tactical_Settlers.png';
        figuresx.value = '1';
        base_meleex.value = '1';
        base_defensex.value = '1';
        base_resistx.value = '5';
        base_hpx.value = '20';
        break;
      case 89:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407205352/masterofmagic/images/d/db/Tactical_BeastmenEngineers.png';
        figuresx.value = '6';
        base_meleex.value = '2';
        base_defensex.value = '1';
        base_resistx.value = '5';
        base_hpx.value = '2';
        break;
      case 90:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407204161/masterofmagic/images/0/09/Tactical_BeastmenSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '2';
        base_resistx.value = '5';
        base_hpx.value = '2';
        break;
      case 91:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408104937/masterofmagic/images/b/bb/Tactical_BeastmenSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_resistx.value = '5';
        base_hpx.value = '2';
        lshieldx.value = '1';
        break;
      case 92:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408110837/masterofmagic/images/a/a9/Tactical_BeastmenHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '5';
        base_defensex.value = '3';
        base_resistx.value = '5';
        base_hpx.value = '2';
        break;
      case 93:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408112222/masterofmagic/images/a/a9/Tactical_BeastmenBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '2';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        base_defensex.value = '1';
        base_resistx.value = '5';
        base_hpx.value = '2';
        break;
      case 94:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408114233/masterofmagic/images/d/d8/Tactical_BeastmenPriests.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_rangedx.value = '4';
        rangedtypex.value = '2';
        base_defensex.value = '4';
        base_resistx.value = '8';
        base_hpx.value = '2';
        break;
      case 95:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408120036/masterofmagic/images/f/f1/Tactical_BeastmenMagicians.png';
        figuresx.value = '4';
        base_meleex.value = '2';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '9';
        base_hpx.value = '2';
        missimmx.value = '1';
        break;
      case 96:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408150841/masterofmagic/images/6/61/Tactical_Centaurs.png';
        figuresx.value = '4';
        base_meleex.value = '3';
        base_rangedx.value = '2';
        rangedtypex.value = '4';
        base_defensex.value = '3';
        base_resistx.value = '5';
        base_hpx.value = '3';
        break;
      case 97:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408162826/masterofmagic/images/b/b1/Tactical_Manticores.png';
        figuresx.value = '2';
        base_meleex.value = '5';
        base_defensex.value = '3';
        base_resistx.value = '6';
        base_hpx.value = '7';
        flyingx.value = '1';
        poisonx.value = '6';
        break;
      case 98:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408155828/masterofmagic/images/f/f8/Tactical_Minotaurs.png';
        figuresx.value = '2';
        base_meleex.value = '12';
        base_defensex.value = '4';
        base_resistx.value = '7';
        base_tohitx.value = '20';
        base_hpx.value = '12';
        lshieldx.value = '1';
        break;
      case 100:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120408235616/masterofmagic/images/b/bb/Tactical_DarkElfSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_rangedx.value = '1';
        rangedtypex.value = '1';
        base_resistx.value = '7';
        break;
      case 101:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409001353/masterofmagic/images/8/80/Tactical_DarkElfSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_rangedx.value = '1';
        rangedtypex.value = '1';
        base_resistx.value = '7';
        lshieldx.value = '1';
        break;
      case 102:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409110545/masterofmagic/images/1/17/Tactical_DarkElfHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_rangedx.value = '1';
        rangedtypex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '7';
        break;
      case 103:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409112848/masterofmagic/images/1/14/Tactical_DarkElfCavalry.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_rangedx.value = '1';
        rangedtypex.value = '1';
        base_resistx.value = '7';
        base_hpx.value = '3';
        fsx.value = '1';
        break;
      case 104:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409115630/masterofmagic/images/3/36/Tactical_DarkElfPriests.png';
        figuresx.value = '4';
        base_meleex.value = '3';
        base_rangedx.value = '6';
        rangedtypex.value = '2';
        base_defensex.value = '4';
        base_resistx.value = '10';
        break;
      case 105:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409145540/masterofmagic/images/3/36/Tactical_Nightblades.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '3';
        base_resistx.value = '7';
        poisonx.value = '1';
        invisx.value = '1';
        break;
      case 106:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409142453/masterofmagic/images/1/11/Tactical_Warlocks.png';
        figuresx.value = '4';
        base_meleex.value = '1';
        base_rangedx.value = '7';
        rangedtypex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '9';
        missimmx.value = '1';
        break;
      case 107:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120409195511/masterofmagic/images/3/30/Tactical_Nightmares.png';
        figuresx.value = '2';
        base_meleex.value = '8';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '8';
        base_hpx.value = '10';
        flyingx.value = '1';
        break;
      case 109:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120410221117/masterofmagic/images/a/a7/Tactical_DraconianSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        base_defensex.value = '3';
        base_resistx.value = '6';
        base_breathx.value = '1';
        breathtypex.value = '2';
        flyingx.value = '1';
        break;
      case 110:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411113260/masterofmagic/images/f/ff/Tactical_DraconianSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_defensex.value = '3';
        base_resistx.value = '6';
        base_breathx.value = '1';
        breathtypex.value = '2';
        flyingx.value = '1';
        lshieldx.value = '1';
        break;
      case 111:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411115155/masterofmagic/images/d/dc/Tactical_DraconianHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '6';
        base_breathx.value = '1';
        breathtypex.value = '2';
        flyingx.value = '1';
        break;
      case 112:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411121122/masterofmagic/images/0/0a/Tactical_DraconianBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        base_resistx.value = '6';
        flyingx.value = '1';
        break;
      case 113:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411130909/masterofmagic/images/2/29/Tactical_DraconianShamans.png';
        figuresx.value = '4';
        base_meleex.value = '2';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '4';
        base_resistx.value = '8';
        flyingx.value = '1';
        break;
      case 114:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411132253/masterofmagic/images/3/35/Tactical_DraconianMagicians.png';
        figuresx.value = '4';
        base_meleex.value = '1';
        base_rangedx.value = '5';
        rangedtypex.value = '1';
        base_defensex.value = '4';
        base_resistx.value = '10';
        flyingx.value = '1';
        break;
      case 115:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411181646/masterofmagic/images/f/fe/Tactical_AirShip.png';
        figuresx.value = '1';
        base_meleex.value = '5';
        base_rangedx.value = '10';
        rangedtypex.value = '5';
        base_defensex.value = '5';
        base_resistx.value = '8';
        base_hpx.value = '20';
        flyingx.value = '1';
        break;
      case 116:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411143428/masterofmagic/images/9/9d/Tactical_DoomDrakes.png';
        figuresx.value = '2';
        base_meleex.value = '8';
        base_defensex.value = '3';
        base_resistx.value = '9';
        base_breathx.value = '6';
        breathtypex.value = '2';
        base_hpx.value = '10';
        flyingx.value = '1';
        break;
      case 118:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411231641/masterofmagic/images/e/e2/Tactical_DwarfEngineers.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_defensex.value = '1';
        base_resistx.value = '8';
        base_hpx.value = '3';
        break;
      case 119:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120411203816/masterofmagic/images/6/66/Tactical_DwarfSwordsmen.png';
        figuresx.value = '6';
        base_meleex.value = '3';
        base_resistx.value = '8';
        base_hpx.value = '3';
        lshieldx.value = '1';
        break;
      case 120:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412000744/masterofmagic/images/b/b6/Tactical_DwarfHalberdiers.png';
        figuresx.value = '6';
        base_meleex.value = '4';
        base_defensex.value = '3';
        base_resistx.value = '8';
        base_hpx.value = '3';
        break;
      case 121:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412120748/masterofmagic/images/a/af/Tactical_Hammerhands.png';
        figuresx.value = '6';
        base_meleex.value = '8';
        base_defensex.value = '4';
        base_resistx.value = '9';
        base_hpx.value = '4';
        break;
      case 122:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412124735/masterofmagic/images/f/f4/Tactical_Golem.png';
        figuresx.value = '1';
        base_meleex.value = '12';
        base_defensex.value = '8';
        base_resistx.value = '15';
        base_hpx.value = '20';
        poisimmx.value = '1';
        deathimmx.value = '1';
        break;
      case 123:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412135509/masterofmagic/images/c/c2/Tactical_SteamCannon.png';
        figuresx.value = '1';
        base_meleex.value = '0';
        base_rangedx.value = '12';
        rangedtypex.value = '5';
        base_resistx.value = '9';
        base_hpx.value = '12';
        break;
      case 125:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412160656/masterofmagic/images/b/bb/Tactical_TrollSpearmen.png';
        figuresx.value = '4';
        base_meleex.value = '3';
        base_resistx.value = '7';
        base_hpx.value = '4';
        regenx.value = '1';
        break;
      case 126:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412172803/masterofmagic/images/2/2d/Tactical_TrollSwordsmen.png';
        figuresx.value = '4';
        base_meleex.value = '5';
        base_resistx.value = '7';
        base_hpx.value = '4';
        lshieldx.value = '1';
        regenx.value = '1';
        break;
      case 127:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412202022/masterofmagic/images/1/18/Tactical_TrollHalberdiers.png';
        figuresx.value = '4';
        base_meleex.value = '6';
        base_defensex.value = '3';
        base_resistx.value = '7';
        base_hpx.value = '4';
        negatefsx.value = '1';
        regenx.value = '1';
        break;
      case 128:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120412223544/masterofmagic/images/c/ca/Tactical_TrollShamans.png';
        figuresx.value = '4';
        base_meleex.value = '4';
        base_rangedx.value = '2';
        rangedtypex.value = '2';
        base_defensex.value = '3';
        base_resistx.value = '8';
        base_hpx.value = '4';
        regenx.value = '1';
        break;
      case 129:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120415171540/masterofmagic/images/9/9b/Tactical_WarTrolls.png';
        figuresx.value = '4';
        base_meleex.value = '8';
        base_defensex.value = '4';
        base_resistx.value = '8';
        base_hpx.value = '5';
        regenx.value = '1';
        break;
      case 130:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120416155959/masterofmagic/images/c/c3/Tactical_WarMammoths.png';
        figuresx.value = '2';
        base_meleex.value = '10';
        base_defensex.value = '6';
        base_resistx.value = '9';
        base_hpx.value = '12';
        fsx.value = '1';
        break;
      case 800:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120401203148/masterofmagic/images/0/0a/Tactical_HighMenEngineers.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_defensex.value = '1';
        break;
      case 801:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120407135513/masterofmagic/images/4/42/Tactical_HighMenSpearmen.png';
        figuresx.value = '8';
        base_meleex.value = '1';
        break;
      case 802:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20130816230335/masterofmagic/images/4/49/Tactical_HighMenSwordsmen.gif';
        figuresx.value = '6';
        base_meleex.value = '3';
        lshieldx.value = '1';
        break;
      case 804:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402113761/masterofmagic/images/6/6c/Tactical_HighMenPikemen.png';
        figuresx.value = '8';
        base_meleex.value = '5';
        base_defensex.value = '3';
        base_resistx.value = '5';
        apx.value = '1';
        negatefsx.value = '1';
        break;
      case 805:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402122035/masterofmagic/images/7/7a/Tactical_HighMenBowmen.png';
        figuresx.value = '6';
        base_meleex.value = '1';
        base_rangedx.value = '1';
        rangedtypex.value = '4';
        base_defensex.value = '1';
        break;
      case 806:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120402132155/masterofmagic/images/e/ef/Tactical_HighMenPriests.png';
        figuresx.value = '4';
        base_meleex.value = '3';
        base_rangedx.value = '4';
        rangedtypex.value = '2';
        base_defensex.value = '4';
        base_resistx.value = '7';
        break;
      case 899:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120331140919/masterofmagic/images/d/db/Tactical_Catapult.png';
        figuresx.value = '1';
        base_meleex.value = '0';
        base_rangedx.value = '10';
        rangedtypex.value = '5';
        base_hpx.value = '10';
        lrangex.value = '1';
        break;
      case 900:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120324110861/masterofmagic/images/3/32/Tactical_Trireme.png';
        figuresx.value = '1';
        base_meleex.value = '6';
        base_defensex.value = '4';
        base_hpx.value = '10';
        break;
      case 901:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120324201343/masterofmagic/images/7/72/Tactical_Galley.png';
        figuresx.value = '1';
        base_meleex.value = '8';
        base_rangedx.value = '2';
        rangedtypex.value = '4';
        base_defensex.value = '4';
        base_resistx.value = '6';
        base_hpx.value = '20';
        break;
      case 902:
        imgxstr = 'https://images.wikia.nocookie.net/__cb20120324231424/masterofmagic/images/e/e1/Tactical_Warship.png';
        figuresx.value = '1';
        base_meleex.value = '10';
        base_rangedx.value = '10';
        rangedtypex.value = '5';
        base_defensex.value = '5';
        base_resistx.value = '7';
        base_hpx.value = '30';
        lrangex.value = '1';
        break;
      }
      fixed_figuresx.innerHTML = '' + figuresx.value;
    }
    changerangedimg(side);
    changebreathimg(side);
    if (((unitidx < 1000) && (parseInt(base_rangedx.value) == 0)) || ((unitidx > 1000) && (parseInt(rangedx.value) == 0))) {
      attslabelx.style.display = 'none';
      attselectx.selectedIndex = 0;
      attselectx.style.display = 'none';
    } else if ((unitidx > 35) && (unitidx < 1000) && (parseInt(base_meleex.value) == 0)) {
      attslabelx.style.display = 'none';
      attselectx.selectedIndex = 1;
      attselectx.style.display = 'none';
    } else {
      attslabelx.style.display = 'inline';
      attselectx.selectedIndex = 1;
      attselectx.style.display = 'inline';
    }
    if (unitidx < 1000) {
      if (unitidx > 35) {
        change_fig_nc(side);
      }
      show_normalench(side);
      changelevel(side);
    } else {
      hide_normalench(side);
      calcdamage();
    }
    dtx.style.display = 'inline';
    unitimgx.innerHTML = '<img alt="" src="' + imgxstr + '" />';
  }
  refresh_abilities(side);
}

function changerace(side) {
  var raceidx = parseInt(document.getElementById('race' + side).value);
  var fixed_figuresx = document.getElementById('fixed_figures' + side);
  var rangedtypex = document.getElementById('rangedtype' + side);
  var rangedx = document.getElementById('ranged' + side);
  var breathtypex = document.getElementById('breathtype' + side);
  var breathx = document.getElementById('breath' + side);
  var unitx = document.getElementById('unit' + side);
  var levelx = document.getElementById('level' + side);
  var weaponlabelx = document.getElementById('weaponlabel' + side);
  var weaponselectx = document.getElementById('weaponselect' + side);
  levelx.style.display = 'none';
  fixed_figuresx.innerHTML = '';
  document.getElementById('unitimg' + side).innerHTML = '';
  document.getElementById('fixed_melee' + side).innerHTML = '';
  document.getElementById('fixed_ranged' + side).innerHTML = '';
  document.getElementById('fixed_defense' + side).innerHTML = '';
  document.getElementById('fixed_resist' + side).innerHTML = '';
  document.getElementById('fixed_tohit' + side).innerHTML = '';
  document.getElementById('fixed_breath' + side).innerHTML = '';
  document.getElementById('fixed_hp' + side).innerHTML = '';
  document.getElementById('flying' + side).value = '0';
  document.getElementById('noncorp' + side).value = '0';
  document.getElementById('lshield' + side).value = '0';
  document.getElementById('lucky' + side).value = '0';
  document.getElementById('lrange' + side).value = '0';
  document.getElementById('ap' + side).value = '0';
  document.getElementById('fs' + side).value = '0';
  document.getElementById('negatefs' + side).value = '0';
  document.getElementById('missimm' + side).value = '0';
  document.getElementById('magimm' + side).value = '0';
  document.getElementById('illimm' + side).value = '0';
  document.getElementById('weapimm' + side).value = '0';
  document.getElementById('deathimm' + side).value = '0';
  document.getElementById('fireimm' + side).value = '0';
  document.getElementById('coldimm' + side).value = '0';
  document.getElementById('stonimm' + side).value = '0';
  document.getElementById('poisimm' + side).value = '0';
  document.getElementById('poison' + side).value = '0';
  document.getElementById('illusion' + side).value = '0';
  document.getElementById('dgaze' + side).value = '0';
  document.getElementById('sgaze' + side).value = '0';
  document.getElementById('doomgaze' + side).value = '0';
  document.getElementById('immo' + side).value = '0';
  document.getElementById('dispelevil' + side).value = '0';
  document.getElementById('stouch' + side).value = '0';
  document.getElementById('invis' + side).value = '0';
  document.getElementById('resistall' + side).value = '0';
  document.getElementById('holybonus' + side).value = '0';
  document.getElementById('lifesteal' + side).value = '0';
  document.getElementById('regen' + side).value = '0';
  document.getElementById('fear' + side).value = '0';
  document.getElementById('lifeunit' + side).value = '0';
  document.getElementById('deathunit' + side).value = '0';
  document.getElementById('chaosunit' + side).value = '0';
  document.getElementById('natureunit' + side).value = '0';
  document.getElementById('sorcunit' + side).value = '0';
  picks_and_artifacts_clear(side);
  if (raceidx == 0) {
    unitx.innerHTML = '<option value="0"></option>';
    unitx.style.display = 'none';
    levelx.innerHTML = '<option value="0"></option>';
    weaponlabelx.style.display = 'inline';
    var weaponval = parseInt(weaponselectx.value);
    weaponselectx.innerHTML =
    '<option value="0">Normal</option> \
     <option value="1">Magic</option> \
     <option value="2">Mithril</option> \
     <option value="3">Adamantium</option>';
    weaponselectx.selectedIndex = weaponval;
    weaponselectx.style.display = 'inline';
    document.getElementById('figures' + side).style.display = 'inline';
    document.getElementById('melee' + side).style.display = 'inline';
    rangedtypex.style.display = 'inline';
    if (parseInt(rangedtypex.value) == 0) {
      rangedx.style.display = 'none';
    } else {
      rangedx.style.display = 'inline';
    }
    document.getElementById('defense' + side).style.display = 'inline';
    document.getElementById('resist' + side).style.display = 'inline';
    document.getElementById('tohit' + side).style.display = 'inline';
    breathtypex.style.display = 'inline';
    if (parseInt(breathx.value) == 0) {
      breathx.style.display = 'none';
    } else {
      breathx.style.display = 'inline';
    }
    document.getElementById('hp' + side).style.display = 'inline';
    document.getElementById('dt' + side).style.display = 'inline';
    show_normalench(side);
    calcdamage();
  } else {
    var attslabelx = document.getElementById('attslabel' + side);
    var attselectx = document.getElementById('attselect' + side);
    attslabelx.style.display = 'none';
    attselectx.style.display = 'none';
    document.getElementById('figures' + side).style.display = 'none';
    document.getElementById('melee' + side).style.display = 'none';
    rangedtypex.style.display = 'none';
    rangedx.style.display = 'none';
    document.getElementById('defense' + side).style.display = 'none';
    document.getElementById('resist' + side).style.display = 'none';
    document.getElementById('tohit' + side).style.display = 'none';
    breathtypex.style.display = 'none';
    breathx.style.display = 'none';
    document.getElementById('hp' + side).style.display = 'none';
    document.getElementById('dt' + side).style.display = 'none';
    if (raceidx == 1) {
      weaponlabelx.style.display = 'none';
      weaponselectx.style.display = 'none';
      weaponselectx.selectedIndex = 0;
      unitx.innerHTML =
      '<option value="0"></option> \
       <option value="1">Golden One (Aureus)</option> \
       <option value="2">Orc Warrior (Bahgtru)</option> \
       <option value="3">Dwarf (Brax)</option> \
       <option value="4">Dervish (B&rsquo;Shan)</option> \
       <option value="5">Draconian (Fang)</option> \
       <option value="6">Druid (Greyfairer)</option> \
       <option value="7">Barbarian (Gunther)</option> \
       <option value="8">Wind Mage (Jaer)</option> \
       <option value="9">Magician (Malleus)</option> \
       <option value="10">Ranger (Marcus)</option> \
       <option value="11">Witch (Morgana)</option> \
       <option value="12">Beastmaster (Rakir)</option> \
       <option value="13">Warrior Mage (Reywind)</option> \
       <option value="14">Healer (Serena)</option> \
       <option value="15">Amazon (Shalla)</option> \
       <option value="16">Ninja (Shin Bo)</option> \
       <option value="17">Huntress (Shuri)</option> \
       <option value="18">Rogue (Spyder)</option> \
       <option value="19">War Monk (Taki)</option> \
       <option value="20">Thief (Theria)</option> \
       <option value="21">Assassin (Tumu)</option> \
       <option value="22">Bard (Valana)</option> \
       <option value="23">Warlock (Yramrag)</option> \
       <option value="24">Sage (Zaldron)</option> \
       <option value="25">Illusionist (Aerie)</option> \
       <option value="26">Elven Archer (Alorra)</option> \
       <option value="27">Swordsman (Deth Stryke)</option> \
       <option value="28">Priestess (Elana)</option> \
       <option value="29">Black Knight (Mortu)</option> \
       <option value="30">Unknown (Mystic X)</option> \
       <option value="31">Necromancer (Ravashack)</option> \
       <option value="32">Paladin (Roland)</option> \
       <option value="33">Knight (Sir Harold)</option> \
       <option value="34">Chosen (Torin)</option> \
       <option value="35">Chaos Warrior (Warrax)</option>';
      levelx.innerHTML =
      '<option value="1">Hero</option> \
       <option value="2">Myrmidon</option> \
       <option value="3">Captain</option> \
       <option value="4">Commander</option> \
       <option value="5">Champion</option> \
       <option value="6">Lord</option> \
       <option value="7">Grand Lord</option> \
       <option value="8">Super Hero</option> \
       <option value="9">Demi-God</option>';
      fixed_figuresx.innerHTML = '1';
      document.getElementById('figures' + side).selectedIndex = 0;
      change_fig_nc(side);
    } else if (raceidx > 15) {
      weaponlabelx.style.display = 'none';
      weaponselectx.style.display = 'none';
      weaponselectx.selectedIndex = 0;
      levelx.innerHTML = '<option value="0"></option>';
      switch (raceidx) {
      case 16:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1001">Guardian Spirit</option> \
         <option value="1002">Unicorns</option> \
         <option value="1003">Angel</option> \
         <option value="1004">Archangel</option>';
        break;
      case 17:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1005">Zombies</option> \
         <option value="1044">Mag. weap. Zombies</option> \
         <option value="1045">Mithril Zombies</option> \
         <option value="1046">Adamant. Zombies</option> \
         <option value="1006">Skeletons</option> \
         <option value="1007">Ghouls</option> \
         <option value="1008">Werewolves</option> \
         <option value="1047">Mag. Werewolves</option> \
         <option value="1048">Mith. Werewolves</option> \
         <option value="1049">Admt. Werewolves</option> \
         <option value="1009">Night Stalker</option> \
         <option value="1010">Shadow Demons</option> \
         <option value="1011">Wraiths</option> \
         <option value="1012">Death Knights</option> \
         <option value="1013">Demon</option> \
         <option value="1014">Demon Lord</option>';
        break;
      case 18:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1015">Hell Hounds</option> \
         <option value="1016">Fire Elemental</option> \
         <option value="1017">Fire Giant</option> \
         <option value="1018">Gargoyles</option> \
         <option value="1019">Doom Bat</option> \
         <option value="1020">Chimeras</option> \
         <option value="1021">Chaos Spawn</option> \
         <option value="1022">Efreet</option> \
         <option value="1023">Hydra</option> \
         <option value="1024">Great Drake</option>';
        break;
      case 19:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1025">War Bears</option> \
         <option value="1026">Sprites</option> \
         <option value="1027">Giant Spiders</option> \
         <option value="1028">Cockatrices</option> \
         <option value="1029">Basilisk</option> \
         <option value="1030">Stone Giant</option> \
         <option value="1031">Gorgons</option> \
         <option value="1032">Earth Elemental</option> \
         <option value="1033">Behemoth</option> \
         <option value="1034">Colossus</option> \
         <option value="1035">Great Wyrm</option>';
        break;
      case 20:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1036">Phantom Warriors</option> \
         <option value="1037">Nagas</option> \
         <option value="1038">Phantom Beast</option> \
         <option value="1039">Storm Giant</option> \
         <option value="1040">Air Elemental</option> \
         <option value="1041">Djinn</option> \
         <option value="1042">Sky Drake</option>';
        break;
      case 21:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="1043">Magic Spirit</option>';
        break;
      }
    } else {
      weaponlabelx.style.display = 'inline';
      if ((raceidx == 3) || (raceidx == 7) || (raceidx == 8) || (raceidx == 15)) {
        weaponselectx.innerHTML =
        '<option value="0" selected="selected">Normal</option> \
         <option value="1">Magic</option>';
      } else {
        weaponselectx.innerHTML =
        '<option value="0" selected="selected">Normal</option> \
         <option value="1">Magic</option> \
         <option value="2">Mithril</option> \
         <option value="3">Adamantium</option>';
      }
      weaponselectx.style.display = 'inline';
      switch (raceidx) {
      case 2:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="37">Spearmen</option> \
         <option value="38">Swordsmen</option> \
         <option value="39">Bowmen</option> \
         <option value="40">Shamans</option> \
         <option value="41">Cavalry</option> \
         <option value="42">Berserkers</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option> \
         <option value="902">Warship</option>';
        break;
      case 3:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="43">Settlers</option> \
         <option value="44">Spearmen</option> \
         <option value="45">Swordsmen</option> \
         <option value="46">Halberdiers</option> \
         <option value="47">Bowmen</option> \
         <option value="48">Wolf Riders</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option>';
        break;
      case 4:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="50">Spearmen</option> \
         <option value="51">Swordsmen</option> \
         <option value="52">Bowmen</option> \
         <option value="53">Shamans</option> \
         <option value="54">Slingers</option> \
         <option value="900">Trireme</option>';
        break;
      case 5:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="56">Spearmen</option> \
         <option value="57">Swordsmen</option> \
         <option value="58">Halberdiers</option> \
         <option value="59">Cavalry</option> \
         <option value="60">Magicians</option> \
         <option value="61">Longbowmen</option> \
         <option value="62">Elven Lords</option> \
         <option value="63">Pegasai</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option>';
        break;
      case 6:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="800">Engineers</option> \
         <option value="801">Spearmen</option> \
         <option value="802">Swordsmen</option> \
         <option value="804">Pikemen</option> \
         <option value="64">Cavalry</option> \
         <option value="805">Bowmen</option> \
         <option value="806">Priests</option> \
         <option value="65">Magicians</option> \
         <option value="66">Paladins</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option> \
         <option value="902">Warship</option>';
        break;
      case 7:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="68">Engineers</option> \
         <option value="69">Spearmen</option> \
         <option value="70">Swordsmen</option> \
         <option value="71">Halberdiers</option> \
         <option value="72">Stag Beetle</option> \
         <option value="900">Trireme</option>';
        break;
      case 8:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="74">Spearmen</option> \
         <option value="75">Swordsmen</option> \
         <option value="76">Halberdiers</option> \
         <option value="77">Shamans</option> \
         <option value="78">Javelineers</option> \
         <option value="79">Dragon Turtle</option>';
        break;
      case 9:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="801">Spearmen</option> \
         <option value="802">Swordsmen</option> \
         <option value="804">Pikemen</option> \
         <option value="805">Bowmen</option> \
         <option value="806">Priests</option> \
         <option value="80">Rangers</option> \
         <option value="81">Horsebowmen</option> \
         <option value="82">Griffins</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option>';
        break;
      case 10:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="800">Engineers</option> \
         <option value="801">Spearmen</option> \
         <option value="802">Swordsmen</option> \
         <option value="83">Halberdiers</option> \
         <option value="84">Cavalry</option> \
         <option value="805">Bowmen</option> \
         <option value="85">Shamans</option> \
         <option value="86">Magicians</option> \
         <option value="87">Wyvern Riders</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option> \
         <option value="902">Warship</option>';
        break;
      case 11:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="88">Settlers</option> \
         <option value="89">Engineers</option> \
         <option value="90">Spearmen</option> \
         <option value="91">Swordsmen</option> \
         <option value="92">Halberdiers</option> \
         <option value="93">Bowmen</option> \
         <option value="94">Priests</option> \
         <option value="95">Magicians</option> \
         <option value="96">Centaurs</option> \
         <option value="97">Manticores</option> \
         <option value="98">Minotaurs</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option>';
        break;
      case 12:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="100">Spearmen</option> \
         <option value="101">Swordsmen</option> \
         <option value="102">Halberdiers</option> \
         <option value="103">Cavalry</option> \
         <option value="104">Priests</option> \
         <option value="105">Nightblades</option> \
         <option value="106">Warlocks</option> \
         <option value="107">Nightmares</option> \
         <option value="899">Catapult</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option>';
        break;
      case 13:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="109">Spearmen</option> \
         <option value="110">Swordsmen</option> \
         <option value="111">Halberdiers</option> \
         <option value="112">Bowmen</option> \
         <option value="113">Shamans</option> \
         <option value="114">Magicians</option> \
         <option value="115">Air Ship</option> \
         <option value="116">Doom Drakes</option> \
         <option value="900">Trireme</option> \
         <option value="901">Galley</option>';
        break;
      case 14:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="118">Engineers</option> \
         <option value="119">Swordsmen</option> \
         <option value="120">Halberdiers</option> \
         <option value="121">Hammerhands</option> \
         <option value="122">Golem</option> \
         <option value="123">Steam Cannon</option> \
         <option value="900">Trireme</option>';
        break;
      case 15:
        unitx.innerHTML =
        '<option value="0"></option> \
         <option value="125">Spearmen</option> \
         <option value="126">Swordsmen</option> \
         <option value="127">Halberdiers</option> \
         <option value="128">Shamans</option> \
         <option value="129">War Trolls</option> \
         <option value="130">War Mammoths</option> \
         <option value="900">Trireme</option>';
      }
      levelx.innerHTML =
      '<option value="1">Recruit</option> \
       <option value="2">Regular</option> \
       <option value="3">Veteran</option> \
       <option value="4">Elite</option> \
       <option value="5">Ultra-Elite</option> \
       <option value="6">Champion</option>';
    }
    unitx.style.display = 'inline';
    unitx.selectedIndex = 0;
    hide_normalench(side);
    cleardamage();
  }
  refresh_abilities(side);
}

function resetall() {
  var side;
  document.getElementById('aura').selectedIndex = 0;
  for (side = 1; side <= 2; side += 1) {
    document.getElementById('race' + side).selectedIndex = 0;
    document.getElementById('figures' + side).selectedIndex = 0;
    document.getElementById('melee' + side).selectedIndex = 0;
    document.getElementById('rangedtype' + side).selectedIndex = 0;
    document.getElementById('ranged' + side).selectedIndex = 0;
    document.getElementById('defense' + side).selectedIndex = 2;
    document.getElementById('resist' + side).selectedIndex = 4;
    document.getElementById('tohit' + side).selectedIndex = 2;
    document.getElementById('toblock' + side).selectedIndex = 1;
    document.getElementById('breathtype' + side).selectedIndex = 0;
    document.getElementById('breath' + side).selectedIndex = 0;
    document.getElementById('hp' + side).selectedIndex = 0;
    clear_ench(side);
    changerace(side);
    changerangedimg(side);
    changebreathimg(side);
  }
  cleardamage();
}

PopulatePage();
cleardamage();