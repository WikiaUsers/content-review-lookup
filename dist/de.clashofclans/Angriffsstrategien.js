/* Rewritten by [[User:DarkBarbarian]]. Message him if you encounter errors.
 * Last change: Added troops from December Update 2020
 * v1.2 */
const   maxTroph = 100000,
        minTroph = 0;
var     army, rows;

//reset view by applying filter to default values
window.attackStrategyReset = function() {
    attackStrategySelectAll();
    document.getElementById('town-hall').value = "any";
    document.getElementById('trophies').value = "";
    attackStrategyFilter();
};

window.attackStrategyFilter = function() {
    //for every checkbox, if it's unchecked replace its corresponding CSS class in every strategy with an unused class. If a strategy only contains unused classes, it will vanish because of its default display:none value.
    for (i = 0; i < army.length; i++) {
    	var unit;
        if (!army[i].checked) {
            unit = Array.from(document.getElementsByClassName(army[i].id));
            for (j = 0; j < unit.length; j++) {
                unit[j].classList.replace(army[i].id,army[i].id + "-not");
            }
        } else {
            unit = Array.from(document.getElementsByClassName(army[i].id + "-not"));
            for (j = 0; j < unit.length; j++) {
                unit[j].classList.replace(army[i].id + "-not",army[i].id);
            }
        }
    }
    //strategies that don't match the town hall or trophy conditions will get an '!important' to their display:none default rule which makes them vanish no matter what.
    //If they match the conditions, they don't get the '!important'/get it removed so that it can be overwritten by the CSS classes from the checkboxes.
    var townHall, trophies;
    townHall = document.getElementById('town-hall').value;
    townHall = townHall === "any" ? townHall : parseInt(townHall);
    trophies = document.getElementById('trophies').value;
    trophies = trophies === "" ? trophies : parseInt(trophies);
    
    for(i = 0; i < rows.length; i++) {
        var strategyMinTH = parseValue("TH", rows[i].classList, "min"),
            strategyMaxTH = parseValue("TH", rows[i].classList, "max"),
            strategyMinTroph = parseValue("Troph", rows[i].classList, "min"),
            strategyMaxTroph = parseValue("Troph", rows[i].classList, "max");
        if ((townHall === "any" || (strategyMinTH <= townHall && strategyMaxTH >= townHall)) &&
            (trophies === "" || (strategyMinTroph <= trophies && strategyMaxTroph >= trophies))) {
            rows[i].style.setProperty('display','none');
        } else {
            rows[i].style.setProperty('display','none','important');
        }
    }
};

//get the town hall/trophy level from a CSS class structured 'attack-strategies-<min/max><TH/Troph><number>'
function parseValue(what, classes, direction) {
    for (j = 0; j < classes.length; j++) {
        var level = classes[j].split('-')[2];
        if (new RegExp(direction + what + /\d+/.source).test(level)) {
            switch(what) {
                case "TH":
                    return parseInt(level.slice(5));
                case "Troph":
                    return parseInt(level.slice(8));
                default:
                    return 0;
            }
        }
    }
    return 0;
}

window.attackStrategyRemoveSelection = function() {
    for (i = 0; i < army.length; i++) {
        army[i].checked = false;
    }
};

window.attackStrategySelectAll = function() {
    for (i = 0; i < army.length; i++) {
        army[i].checked = true;
    }
};

window.attackStrategyInvertSelection = function() {
    for (i = 0; i < army.length; i++) {
        army[i].checked = !army[i].checked;
    }
};

//set up UI
mediaWiki.loader.using('mediawiki.util', function () {
    if (mw.config.get('wgPageName') !== 'Angriffsstrategien') return;
    $("#filter").after('<label for="town-hall">Rathauslevel:</label> <select id="town-hall"><option value="any" selected>Alle</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option></select><br />Trophäenanzahl: <input id="trophies" type="number" placeholder="Alle" min="' + minTroph + '" max="' + maxTroph + '"/><br /><br /><span style="font-weight:bold;">Welche Truppen soll die Angriffsstrategie beinhalten?<br /><span class="wds-button" id="removeSelection" onclick="attackStrategyRemoveSelection()">Auswahl aufheben</span>&nbsp;<span class="wds-button" id="selectAll" onclick="attackStrategySelectAll()">Alles auswählen</span>&nbsp;<span class="wds-button" id="invertSelection" onclick="attackStrategyInvertSelection()">Auswahl umkehren</span><br />Truppen für Elixier:</span><br /><input type="checkbox" id="attack-strategies-barbarians" name="army" value="barbarians" checked><label for="attack-strategies-barbarians">Barbaren</label><input type="checkbox" id="attack-strategies-archers" name="army" value="archers" checked><label for="attack-strategies-archers">Bogenschützen</label><input type="checkbox" id="attack-strategies-giants" name="army" value="giants" checked><label for="attack-strategies-giants">Riesen</label><input type="checkbox" id="attack-strategies-goblins" name="army" value="goblins" checked><label for="attack-strategies-goblins">Kobolde</label><input type="checkbox" id="attack-strategies-wallbreakers" name="army" value="wallbreakers" checked><label for="attack-strategies-wallbreakers">Mauerbrecher</label><input type="checkbox" id="attack-strategies-balloons" name="army" value="balloons" checked><label for="attack-strategies-balloons">Ballons</label><input type="checkbox" id="attack-strategies-wizards" name="army" value="wizards" checked><label for="attack-strategies-wizards">Magier</label><input type="checkbox" id="attack-strategies-healers" name="army" value="healers" checked><label for="attack-strategies-healers">Heiler</label><input type="checkbox" id="attack-strategies-dragons" name="army" value="dragons" checked><label for="attack-strategies-dragons">Drachen</label><input type="checkbox" id="attack-strategies-pekkas" name="army" value="pekkas" checked><label for="attack-strategies-pekkas">P.E.K.K.A.s</label><input type="checkbox" id="attack-strategies-babydragons" name="army" value="babydragons" checked><label for="attack-strategies-babydragons">Drachenbabys</label><input type="checkbox" id="attack-strategies-miners" name="army" value="miners" checked><label for="attack-strategies-miners">Tunnelgräber</label><input type="checkbox" id="attack-strategies-edragons" name="army" value="edragons" checked><label for="attack-strategies-edragons">Elektrodrachen</label><input type="checkbox" id="attack-strategies-yetis" name="army" value="yetis" checked><label for="attack-strategies-yetis">Yetis</label><br /><span style="font-weight:bold;">Truppen für Dunkles Elixier:</span><br /><input type="checkbox" id="attack-strategies-minions" name="army" value="minions" checked><label for="attack-strategies-minions">Lakaien</label><input type="checkbox" id="attack-strategies-hogriders" name="army" value="hogriders" checked><label for="attack-strategies-hogriders">Schweinereiter</label><input type="checkbox" id="attack-strategies-valkyries" name="army" value="valkyries" checked><label for="attack-strategies-valkyries">Walküren</label><input type="checkbox" id="attack-strategies-golems" name="army" value="golems" checked><label for="attack-strategies-golems">Golems</label><input type="checkbox" id="attack-strategies-witches" name="army" value="witches" checked><label for="attack-strategies-witches">Hexen</label><input type="checkbox" id="attack-strategies-lavahounds" name="army" value="lavahounds" checked><label for="attack-strategies-lavahounds">Lavahunde</label><input type="checkbox" id="attack-strategies-bowlers" name="army" value="bowlers" checked><label for="attack-strategies-bowlers">Bowler</label><input type="checkbox" id="attack-strategies-icegolems" name="army" value="icegolems" checked><label for="attack-strategies-icegolems">Eisgolems</label><input type="checkbox" id="attack-strategies-headhunters" name="army" value="headhunters" checked><label for="attack-strategies-headhunters">Kopfjägerinnen</label><br /><span style="font-weight:bold;">Supertruppen:</span><br /><input type="checkbox" id="attack-strategies-superbarbarians" name="army" value="superbarbarians" checked><label for="attack-strategies-superbarbarians">Superbarbaren</label><input type="checkbox" id="attack-strategies-superarchers" name="army" value="superarchers" checked><label for="attack-strategies-superarchers">Super-Bogenschützen</label><input type="checkbox" id="attack-strategies-supergiants" name="army" value="supergiants" checked><label for="attack-strategies-supergiants">Superriesen</label><input type="checkbox" id="attack-strategies-sneakygoblins" name="army" value="sneakygoblins" checked><label for="attack-strategies-sneakygoblins">Schleichkobolde</label><input type="checkbox" id="attack-strategies-superwallbreakers" name="army" value="superwallbreakers" checked><label for="attack-strategies-superwallbreakers">Supermauerbrecher</label><input type="checkbox" id="attack-strategies-superwizards" name="army" value="superwizards" checked><label for="attack-strategies-superwizards">Supermagier</label><input type="checkbox" id="attack-strategies-infernodragons" name="army" value="infernodragons" checked><label for="attack-strategies-infernodragons">Infernodrachen</label><input type="checkbox" id="attack-strategies-superminions" name="army" value="superminions" checked><label for="attack-strategies-superminions">Superlakaien</label><input type="checkbox" id="attack-strategies-supervalkyries" name="army" value="supervalkyries" checked><label for="attack-strategies-supervalkyries">Superwalküren</label><input type="checkbox" id="attack-strategies-superwitches" name="army" value="superwitches" checked><label for="attack-strategies-superwitches">Superhexen</label><input type="checkbox" id="attack-strategies-icehounds" name="army" value="icehounds" checked><label for="attack-strategies-icehounds">Eishunde</label><br /><span style="font-weight:bold;">Zauber für Elixier:</span><br /><input type="checkbox" id="attack-strategies-lightningspells" name="army" value="lightningspells" checked><label for="attack-strategies-lightningspells">Blitzzauber</label><input type="checkbox" id="attack-strategies-healingspells" name="army" value="healingspells" checked><label for="attack-strategies-healingspells">Heilzauber</label><input type="checkbox" id="attack-strategies-ragespells" name="army" value="ragespells" checked><label for="attack-strategies-ragespells">Wutzauber</label><input type="checkbox" id="attack-strategies-jumpspells" name="army" value="jumpspells" checked><label for="attack-strategies-jumpspells">Sprungzauber</label><input type="checkbox" id="attack-strategies-freezespells" name="army" value="freezespells" checked><label for="attack-strategies-freezespells">Frostzauber</label><input type="checkbox" id="attack-strategies-clonespells" name="army" value="clonespells" checked><label for="attack-strategies-clonespells">Klonzauber</label><input type="checkbox" id="attack-strategies-invisibilityspells" name="army" value="invisibilityspells" checked><label for="attack-strategies-invisibilityspells">Unsichtbarkeitszauber</label><br /><span style="font-weight:bold;">Zauber für Dunkles Elixier:</span><br /><input type="checkbox" id="attack-strategies-poisonspells" name="army" value="poisonspells" checked><label for="attack-strategies-poisonspells">Giftzauber</label><input type="checkbox" id="attack-strategies-earthquakespells" name="army" value="earthquakespells" checked><label for="attack-strategies-earthquakespells">Erdbebenzauber</label><input type="checkbox" id="attack-strategies-hastespells" name="army" value="hastespells" checked><label for="attack-strategies-hastespells">Eilzauber</label><input type="checkbox" id="attack-strategies-skeletonspells" name="army" value="skeletonspells" checked><label for="attack-strategies-skeletonspells">Skelettzauber</label><input type="checkbox" id="attack-strategies-batspells" name="army" value="batspells" checked><label for="attack-strategies-batspells">Fledermaus-Zauber</label><br /><span class="wds-button" id="applyFilter" onclick="attackStrategyFilter()">Filter anwenden</span>&nbsp;<span class="wds-button" id="resetFilter" onclick="attackStrategyReset()">Filter zurücksetzen</span><br />');
    army = document.getElementsByName('army');
    rows = Array.from($('#attack-strategies-results > tbody > tr').has('td'));
});