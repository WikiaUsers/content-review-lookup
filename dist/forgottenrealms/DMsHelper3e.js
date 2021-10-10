// This is the javascript to support the DM's Helper Tool for 3rd and 3.5 editon.
var el = document.getElementById("ByTypeAndSubtype");
if(el) { el.innerHTML = "" +
"<form action=\"http://forgottenrealms.fandom.com/wiki/Template%3ACategory_intersection\" method=\"get\" target=\"_blank\">"+
"<h4>Type*</h4>"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Aberrations_(3e)\">Aberration</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Animals_(3e)\">Animals</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Constructs_(3e)\">Construct</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Dragons_(3e)\">Dragon</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Elementals_(3e)\">Elemental</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Fey_(3e)\">Fey</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Giants_(3e)\">Giant</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Humanoids_(3e)\">Humanoid</label>"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Magical beasts_(3e)\">Magical beast</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Monstrous_humanoids_(3e)\">Monstrous humanoid</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Oozes_(3e)\">Ooze</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Outsiders_(3e)\">Outsider</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Plant_creatures_(3e)\">Plant</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Undead_(3e)\">Undead</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Vermin_(3e)\">Vermin</label>"+
"<br /><br />"+
"<small>*For \"Beast\", select \"Animal\" or \"Magical beast\". For \"Shapechanger\", see Subtype.</small>"+
"<h4>Subtype</h4>"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_air_subtype\">Air</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Angels\">Angel</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Aquatic_creatures\">Aquatic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Celestial_archons\">Archon</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Baatezu\">Baatezu</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_chaotic_subtype\">Chaotic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_cold_subtype\">Cold</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_dragonblood_subtype\">Dragonblood</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Dwarves\">Dwarf</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_earth_subtype\">Earth</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Noble_eladrin\">Eladrin</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Elves\">Elf</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_evil_subtype\">Evil</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_fire_subtype\">Fire</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Goblinoids\">Goblinoid</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_good_subtype\">Good</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Gnomes\">Gnome</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Gnolls\">Gnoll</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Halflings\">Halfling</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Humans\">Human</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_incorporeal_subtype\">Incorporeal</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_lawful_subtype\">Lawful</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Living constructs\">Living construct</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Native outsiders\">Native</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Orcs\">Orc</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Psionic_creatures\">Psionic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Reptilian_humanoids\">Reptilian</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Shapechangers\">Shapechanger</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Spirit_folk\">Spirit</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Tanar'ri\">Tanar'ri</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_the_water_subtype\">Water</label>"+
"<br /><br />"+
"<input type=\"hidden\" name=\"action\" value=\"purge\">"+
"<input type=\"submit\" size=\"20\" value=\"Find monsters\">"+
"</form>";
}
el = document.getElementById("ByTypeAndCR");
if(el) { el.innerHTML = "" +
"<form action=\"http://forgottenrealms.fandom.com/wiki/Template%3ACategory_intersection\" method=\"get\" target=\"_blank\">"+
"<h4>Type*</h4>"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Aberrations_(3e)\">Aberration</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Animals_(3e)\">Animals</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Constructs_(3e)\">Construct</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Dragons_(3e)\">Dragon</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Elementals_(3e)\">Elemental</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Fey_(3e)\">Fey</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Giants_(3e)\">Giant</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Humanoids_(3e)\">Humanoid</label>"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Magical beasts_(3e)\">Magical beast</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Monstrous_humanoids_(3e)\">Monstrous humanoid</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Oozes_(3e)\">Ooze</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Outsiders_(3e)\">Outsider</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Plant_creatures_(3e)\">Plant</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Undead_(3e)\">Undead</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Vermin_(3e)\">Vermin</label>"+
"<br /><br />"+
"<small>*For \"Beast\", select \"Animal\" or \"Magical beast\". For \"Shapechanger\", see Subtype.</small>"+
"<h4>Challenge Rating**</h4>"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_challenge_rating_less_than_1_(3e)\">Less than 1</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_1_challenge_rating_(3e)\">1</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_2_challenge_rating_(3e)\">2</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_3_challenge_rating_(3e)\">3</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_4_challenge_rating_(3e)\">4</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_5_challenge_rating_(3e)\">5</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_6_challenge_rating_(3e)\">6</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_7_challenge_rating_(3e)\">7</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_8_challenge_rating_(3e)\">8</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_9_challenge_rating_(3e)\">9</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_10_challenge_rating_(3e)\">10</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_11_challenge_rating_(3e)\">11</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_12_challenge_rating_(3e)\">12</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_13_challenge_rating_(3e)\">13</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_14_challenge_rating_(3e)\">14</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_15_challenge_rating_(3e)\">15</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_16_challenge_rating_(3e)\">16</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_17_challenge_rating_(3e)\">17</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_18_challenge_rating_(3e)\">18</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_19_challenge_rating_(3e)\">19</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_20_challenge_rating_(3e)\">20</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_21_challenge_rating_(3e)\">21</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_22_challenge_rating_(3e)\">22</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_23_challenge_rating_(3e)\">23</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_24_challenge_rating_(3e)\">24</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_25_challenge_rating_(3e)\">25</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_26_challenge_rating_(3e)\">26</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_27_challenge_rating_(3e)\">27</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_28_challenge_rating_(3e)\">28</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_29_challenge_rating_(3e)\">29</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_30_challenge_rating_(3e)\">30</label>"+
"<br /><br />"+
"<small>**Note that challenge ratings may not be specific to 3e and may also depend on other factors, such as size or gear. See the individual entries for details.</small>"+
"<br /><br />"+
"<input type=\"hidden\" name=\"action\" value=\"purge\">"+
"<input type=\"submit\" size=\"20\" value=\"Find monsters\">"+
"</form>";
}
el = document.getElementById("BySubtypeAndCR");
if(el) { el.innerHTML = "" +
"<form action=\"http://forgottenrealms.fandom.com/wiki/Template%3ACategory_intersection\" method=\"get\" target=\"_blank\">"+
"<h4>Subtype</h4>"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_air_subtype\">Air</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Angels\">Angel</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Aquatic_creatures\">Aquatic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Celestial_archons\">Archon</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Baatezu\">Baatezu</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_chaotic_subtype\">Chaotic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_cold_subtype\">Cold</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_dragonblood_subtype\">Dragonblood</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Dwarves\">Dwarf</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_earth_subtype\">Earth</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Noble_eladrin\">Eladrin</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Elves\">Elf</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_evil_subtype\">Evil</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_fire_subtype\">Fire</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Goblinoids\">Goblinoid</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_good_subtype\">Good</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Gnomes\">Gnome</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Gnolls\">Gnoll</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Halflings\">Halfling</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Humans\">Human</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_incorporeal_subtype\">Incorporeal</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_lawful_subtype\">Lawful</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Living constructs\">Living construct</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Native outsiders\">Native</label>&nbsp;&nbsp;&bull;"+
"<br />"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Orcs\">Orc</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Psionic_creatures\">Psionic</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Reptilian_humanoids\">Reptilian</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Shapechangers\">Shapechanger</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Spirit_folk\">Spirit</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Tanar'ri\">Tanar'ri</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat1\" type=\"radio\" value=\"Creatures_with_the_water_subtype\">Water</label>"+
"<h4>Challenge Rating*</h4>"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_challenge_rating_less_than_1_(3e)\">Less than 1</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_1_challenge_rating_(3e)\">1</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_2_challenge_rating_(3e)\">2</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_3_challenge_rating_(3e)\">3</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_4_challenge_rating_(3e)\">4</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_5_challenge_rating_(3e)\">5</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_6_challenge_rating_(3e)\">6</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_7_challenge_rating_(3e)\">7</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_8_challenge_rating_(3e)\">8</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_9_challenge_rating_(3e)\">9</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_10_challenge_rating_(3e)\">10</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_11_challenge_rating_(3e)\">11</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_12_challenge_rating_(3e)\">12</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_13_challenge_rating_(3e)\">13</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_14_challenge_rating_(3e)\">14</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_15_challenge_rating_(3e)\">15</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_16_challenge_rating_(3e)\">16</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_17_challenge_rating_(3e)\">17</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_an_18_challenge_rating_(3e)\">18</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_19_challenge_rating_(3e)\">19</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_20_challenge_rating_(3e)\">20</label>"+
"<br />"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_21_challenge_rating_(3e)\">21</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_22_challenge_rating_(3e)\">22</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_23_challenge_rating_(3e)\">23</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_24_challenge_rating_(3e)\">24</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_25_challenge_rating_(3e)\">25</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_26_challenge_rating_(3e)\">26</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_27_challenge_rating_(3e)\">27</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_28_challenge_rating_(3e)\">28</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_29_challenge_rating_(3e)\">29</label>&nbsp;&nbsp;&bull;"+
"<label><input name=\"DPL_cat2\" type=\"radio\" value=\"Creatures_with_a_30_challenge_rating_(3e)\">30</label>"+
"<br /><br />"+
"<small>*Note that challenge ratings may not be specific to 3e and may also depend on other factors, such as size or gear. See the individual entries for details.</small>"+
"<br /><br />"+
"<input type=\"hidden\" name=\"action\" value=\"purge\">"+
"<input type=\"submit\" size=\"20\" value=\"Find monsters\">"+
"</form>";
}