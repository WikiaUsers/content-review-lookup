/* Any JavaScript here will be loaded for all users on every page load. */

// The code below is needed for dungeon combat simulation.

var food_effects = { Ambrosia: {hp:30}, Onigiri:{hp:10}, Flatbread:{ep:10}, Bun:{hp:15,ep:5}, Muffin:{hp:15,ep:7}, Bento:{hp:5,ep:15}, Pasta:{hp:7,ep:20}, Baklava:{hp:12,ep:12}, Eggs:{hp:17,ep:5}, PoHP1:{hp:20}, PoHP2:{hp:25}, PoEP1:{ep:20} };

var boost_list = {
                    'Level':        { 'repl':26, '*':{'hp':'*','ep':'*'} },
                    'Sword':        { '0':{}, '1': {'dmg':3}, '2': {'dmg':5}, '3': {'dmg':7}, '4': {'dmg':9} },
                    'Armor':        { '0':{}, '1': {'def':2}, '2': {'def':4}, '3': {'def':6}, '4': {'def':8,'dmg':1,'ep':10} },
                    'Shield':       { '0':{}, '1': {'def':1}, '2': {'def':2}, '3': {'def':3}, '4': {'def':4,'c2r':10} },
                    'Ring':         { '0':{}, '1': {'dmg':1}, '2': {'dmg':2}, '3': {'dmg':3}, '4': {'dmg':4}, '4+': {'dmg':4,'ep':5} },
                    'Martial arts': { '0':{}, '1': {'dmg':1}, '2': {'dmg':2}, '3': {'dmg':3} },
                    'Hardening':    { '0':{}, '1': {'def':1}, '2': {'def':2} },
                    'Equipment preparation':{ '0':{}, '1': {'sck':1}, '2': {'sck':2} },
                    'Agility':      { '0':{}, '1': {'ap':1} },
                    'Smashing blow':{ '0':{}, '1': {}, '2': {} },
                    'Helmet':       { '0':{}, '1':{'hp':5} },
                    'Dagger':       { '0':{}, '1':{'c2c':5} }
                };

var presets = {
                     1: {Sword: 0, Armor: 0, Shield: 0, Ring: 0, 'Martial arts': 0, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':0 },
                     3: {Sword: 0, Armor: 0, Shield: 0, Ring: 0, 'Martial arts': 0, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':1 },
                     5: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial arts': 0, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':1 },
                     6: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial arts': 0, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                     9: {Sword: 1, Armor: 1, Shield: 1, Ring: 1, 'Martial arts': 1, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                    10: {Sword: 2, Armor: 2, Shield: 2, Ring: 2, 'Martial arts': 1, 'Equipment preparation': 0, Hardening: 0, Agility: 0, 'Smashing blow':2 },
                    12: {Sword: 2, Armor: 2, Shield: 2, Ring: 2, 'Martial arts': 1, 'Equipment preparation': 1, Hardening: 1, Agility: 0, 'Smashing blow':2 },
                    15: {Sword: 3, Armor: 3, Shield: 3, Ring: 3, 'Martial arts': 2, 'Equipment preparation': 1, Hardening: 1, Agility: 1, 'Smashing blow':2 },
                    18: {Sword: 3, Armor: 3, Shield: 3, Ring: 3, 'Martial arts': 2, 'Equipment preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    20: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial arts': 2, 'Equipment preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    21: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial arts': 3, 'Equipment preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 },
                    26: {Sword: 4, Armor: 4, Shield: 4, Ring: 4, 'Martial arts': 3, 'Equipment preparation': 2, Hardening: 2, Agility: 1, 'Smashing blow':2 }
                };

var enemy_list = [
                    {name: 'Shapeshifter 3A-3C',      hp: 27,  dmg: 8,  def: 5,  ap: 6, skills: '*Shapeshifter*'},
                    {name: 'Orc chieftain (3A boss)', hp: 55,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Orc warlord (3B boss)',   hp: 65,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Bone dragon (3C boss)',   hp: 85,  dmg: 9,  def: 5,  ap: 4},
                    {name: 'Shapeshifter 4A-4C',      hp: 36,  dmg: 12, def: 9,  ap: 6, skills: '*Shapeshifter*'},
                    {name: 'Leviathan (4A boss)',     hp: 84,  dmg: 14, def: 9,  ap: 4},
                    {name: 'Mynd flyer (4B boss)',    hp: 104, dmg: 14, def: 9,  ap: 6},
                    {name: 'Eye tyrant (4C boss)',    hp: 124, dmg: 15, def: 9,  ap: 4},
                    {name: 'Demon kingpin (5A boss)', hp: 130, dmg: 18, def: 12, ap: 4},
                    {name: 'Demon lord (5B boss)',    hp: 170, dmg: 19, def: 13, ap: 4},
                    {name: 'Bone dragon (5C quest)',  hp: 230, dmg: 19, def: 13, ap: 4, image: 'a/a5/Foe-Bone_Dragon.png'},
                    {name: 'The dragon (5C boss)',    hp: 230, dmg: 21, def: 14, ap: 4, image: '9/92/Foe-Evil_dragon%28boss5C%29.png'}
                ];

var icons = {
                'Sword-1':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a4/Sword_for_a_hero_lvl._1.png">',
                'Sword-2':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bc/Sword_for_a_hero_lvl._2.png">',
                'Sword-3':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/36/Sword_for_a_hero_lvl._3.png">',
                'Sword-4':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/0/09/Sword_for_a_hero_lvl._4.png">',
                'Armor-1':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f3/Armor_for_a_hero_lvl._1.png">',
                'Armor-2':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a6/Armor_for_a_hero_lvl._2.png">',
                'Armor-3':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/0/05/Armor_for_a_hero_lvl._3.png">',
                'Armor-4':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/a3/Armor_for_a_hero_lvl._4.png">',
                'Shield-1': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/6/6c/Shield_for_a_hero_lvl._1.png">',
                'Shield-2': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/9/9f/Shield_for_a_hero_lvl._2.png">',
                'Shield-3': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/c/ca/Shield_for_a_hero_lvl._3.png">',
                'Shield-4': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/80/Shield_for_a_hero_lvl._4.png">',
                'Ring-1':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/e/eb/Ring_for_a_hero_lvl._1.png">',
                'Ring-2':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/18/Ring_for_a_hero_lvl._2.png">',
                'Ring-3':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bb/Ring_for_a_hero_lvl._3.png">',
                'Ring-4':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/10/Ring_for_a_hero_lvl._4.png">',
                'Ring-4+':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Ring_for_a_hero_lvl._4%2B.png">',
                'Dagger-1': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/4/45/Dagger.png">',
                'Helmet-1': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/37/Helmet.png">',
                'HP':       '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/31/Dungeon_-_Health.png">',
                'EP':       '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/1e/Dungeon_-_Energy.png">',
                'AP':       '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/84/Dungeon_-_Action_points.png">',
                'DEF':      '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/a/ac/Dungeon_-_Defense.png">',
                'DMG':      '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/5/59/Dungeon_-_Damage.png">',
                'sck':      '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/6/61/Sack.png">',
                'Ambrosia': '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/e/e9/Potion_Ambrosia.png">',
                'Onigiri':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f3/Onigiri.png">',
                'Flatbread':'<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/4/4f/Flatbread.png">',
                'Bun':      '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/9/9a/Cherry_bun.png">',
                'Muffin':   '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/1/1d/Muffin.png">',
                'Bento':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/34/Mushroom_rice_%28Bento%29.png">',
                'Pasta':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/b/bf/Porcini_pasta.png">',
                'Baklava':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/34/Baklava.png">',
                'Eggs':     '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/3f/Marinated_eggs.png">',
                'PoHP1':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/3/35/Potion_of_healing.png">',
                'PoHP2':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/f/f4/Potion_of_healing_lvl._2.png">',
                'PoEP1':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/7/72/Potion_of_energy.png">',
                'fortified':    '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/2/27/Poke.png">',
                'frenzied':     '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/d/d2/Potion_Berserker_rage.png">',
                'demoralized':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/8/8e/Demoralization.png">',
                'Smashing blow-1':  '<img align="top" height="20" src="https://static.wikia.nocookie.net/nonograms-katana/images/d/d4/Smashing_blow.png">',
                'c2c':      '',
                'c2r':      ''
            };

icons['Agility-1'] = icons['AP'];
icons['Hardening-1'] = icons['DEF'];
icons['Hardening-2'] = icons['DEF']+icons['DEF'];
icons['Martial arts-1'] = icons['DMG'];
icons['Martial arts-2'] = icons['DMG']+icons['DMG'];
icons['Martial arts-3'] = icons['DMG']+icons['DMG']+icons['DMG'];
icons['Equipment preparation-1'] = icons['sck'];
icons['Equipment preparation-2'] =icons['sck']+icons['sck'];
icons['Smashing blow-2'] = icons['Smashing blow-1']+icons['Smashing blow-1'];

function fillHeroFromPreset(event) {
    var id = event.srcElement.innerHTML;
    document.getElementById('Level').value = id;
    for (var boost in presets[id]) {
        var boost_level = presets[id][boost];
        document.getElementById(boost).value = boost_level;
    }
    fillHeroStats();
}

function fillHeroStats() {
    var attr = ['hp', 'ep','dmg','def','ap', 'sck', 'c2c', 'c2r'];
    //reset fields to their initial values
    for (var a in attr) {
        document.getElementById('h'+attr[a]).value = document.getElementById('h'+attr[a]).getAttribute('data-init');
    }
    //iterate fields
    var boost_fields = document.getElementById('h_defi').getElementsByTagName('select');
    for (var f=0; f<boost_fields.length; f++) {
        var boost_name = boost_fields[f].id;
        var boost_value = boost_fields[f].value;
        //show boost's icon
        var icon_ph = document.getElementById(boost_name+'-pic');
        var icon_tag = boost_name+'-'+boost_value
        icon_ph.innerHTML = ' '+( icons[icon_tag] ? icons[icon_tag] : '' );
        //add boost's value to the appropriate hero's stats
        var targets = boost_list[boost_name][boost_value];
        for (var t in targets) {
            var field = document.getElementById('h'+t);
            field.value = parseInt(field.value) + targets[t];
        }
    }
    //clear previous results
    document.getElementById('h_calc');
    document.getElementById('e_calc');
}

function filterEnemyList(event) {
    var level = event.srcElement.value;
    var elist = document.getElementById("enemylist").options;
    var lastshown = null;
    var beforelastshown = null;
    for (option in elist) {
        if (elist[option].innerHTML) {
            var show = (level=="" || elist[option].innerHTML.indexOf(" - "+level)>0);
            elist[option].style.display = show ? "" : "none";
            elist[option].selected = "";
            if (show) {
                beforelastshown = lastshown; 
                lastshown = elist[option];
            }
        }
    }
    //adjust selection to include only visible ones
    if (lastshown) {
        if (beforelastshown && (level=='1C' || level=='F2' || level=='F3' || level=='5C' || level=='')) {
            lastshown = beforelastshown;
        }
        lastshown.selected = "selected"
        lastshown.click();
    }
}

function fillEnemyStats(event) {
    var index = event.srcElement.value;
    var attr = ['hp','dmg','def','ap'];
    for (var a in attr) {
        document.getElementById('e'+attr[a]).value = enemy_list[index][attr[a]];
    }
    document.getElementById('hdemo').checked = enemy_list[index].skills && (enemy_list[index].skills.indexOf('*Shapeshifter*')>=0 || enemy_list[index].skills.indexOf('*Demoralization*')>=0);
    document.getElementById('epoke').checked = enemy_list[index].skills && (enemy_list[index].skills.indexOf('*Shielding*')>=0);
    //remove enemy's portrait
    if (document.getElementById('eimage')) {
        document.getElementById('eimage').remove();
    }
    //... and attach it again, if possible
    if (enemy_list[index].image) {
        var eimage = document.createElement('img');
        eimage.src = 'https://static.wikia.nocookie.net/nonograms-katana/images/'+enemy_list[index].image;
        eimage.style = 'width:150px;height:auto';
        eimage.id = 'eimage';
        document.getElementById('e_defi').appendChild(eimage);
    }
}

function calculateCombat() {
    //prepare food selection
    var es = parseInt(document.getElementById('hsck').value);
    var foodlist = { Onigiri:7+es, Flatbread:7+es, Bun:5+es, Muffin:5+es, Bento:5+es, Pasta:5+es, Baklava:7+es, Eggs:5+es, PoHP1:5+es, PoHP2:5+es, PoEP1:5+es, Ambrosia:1+es };
    for (var food in foodlist) {
        document.getElementById(food).setAttribute('data-limit', foodlist[food]);
    }
    var h_out = document.getElementById('h_calc');
    var e_out = document.getElementById('e_calc');
    //get hero stats and apply effects
    var hero = {};
    hero.hpmax = parseInt(document.getElementById('hhp').value);
    hero.epmax = parseInt(document.getElementById('hep').value);
    hero.apmax = parseInt(document.getElementById('hap').value);
    hero.dmg = parseInt(document.getElementById('hdmg').value);
    hero.def = parseInt(document.getElementById('hdef').value);
    if (document.getElementById('hpoke').checked) {
        hero.def+= 4;
    }
    if (document.getElementById('hdemo').checked) {
        hero.def = Math.floor(hero.def * 0.4);
    }
    if (document.getElementById('hberserk').checked) {
        hero.dmg = Math.floor(hero.dmg * 1.4);      //hero's berserk damage rounded down? not confirmed
        hero.apmax+= 2;
    }
    hero.spread = Math.floor(hero.dmg>=15 ? hero.dmg/5 : (hero.dmg>=12 ? 3 : 2));
    hero.critchance = parseInt(document.getElementById('hc2c').value);
    hero.critdmgratio = 2;
    hero.retaliatechance = parseInt(document.getElementById('hc2r').value);
    hero.log = document.getElementById('h_simlog');
    //get enemy stats and apply effects
    var enemy = {};
    enemy.hpmax = parseInt(document.getElementById('ehp').value);
    enemy.apmax = parseInt(document.getElementById('eap').value);
    enemy.dmg = parseInt(document.getElementById('edmg').value);
    enemy.def = parseInt(document.getElementById('edef').value);
    if (document.getElementById('epoke').checked) {
        enemy.def+= 4;
    }
    if (document.getElementById('edemo').checked) {
        enemy.def = Math.floor(enemy.def * 0.4);
    }
    enemy.spread = Math.floor(enemy.dmg>=15 ? enemy.dmg/5 : (enemy.dmg>=12 ? 3 : 2));
    enemy.critchance = parseInt(document.getElementById('hc2c').value);
    enemy.critdmgratio = 1.5;
    enemy.log = document.getElementById('e_simlog');
    //output calculations for the hero
    h_out.innerHTML = '<div><small>Effective AP: ' + hero.apmax + ', DEF: ' + hero.def + ', DMG: ' + hero.dmg + ' &#177;'+hero.spread+'</small></div>';
    var ddmgmin = Math.max( hero.dmg-hero.spread , 1);
    var ddmgmax = hero.dmg+hero.spread;
    var ddmgminc = hero.critdmgratio*ddmgmin;
    var ddmgmaxc = hero.critdmgratio*ddmgmax;
    h_out.innerHTML+= '<div>Damage delivered: ' + ddmgmin + '-' + ddmgmax + ' <small>(when critical: ' + ddmgminc + '-' + ddmgmaxc + ')</small></div>';
    var rdmgmin = Math.max(ddmgmin-enemy.def,1);
    var rdmgmax = Math.max(ddmgmax-enemy.def,1);
    var rdmgminc = Math.max(ddmgminc-enemy.def,2);
    var rdmgmaxc = Math.max(ddmgmaxc-enemy.def,2);
    h_out.innerHTML+= '<div>Damage to enemy: ' + rdmgmin + '-' + rdmgmax + ' <small>(when critical: ' + rdmgminc + '-' + rdmgmaxc + ')</small></div>';
    h_out.innerHTML+= '<div><b>Hits to kill the enemy: ' + Math.ceil(enemy.hpmax/rdmgmax) + '-' + Math.ceil(enemy.hpmax/rdmgmin) + '</b></div>';
    h_out.innerHTML+= '<div>(absolute minimum: ' + Math.ceil(enemy.hpmax/rdmgmaxc) + ')</div>';
    //output calculations for the enemy
    e_out.innerHTML = '<div><small>Effective AP: ' + enemy.apmax + ', DEF: ' + enemy.def + ', DMG: ' + enemy.dmg + ' &#177;'+enemy.spread+'</small></div>';
    ddmgmin = Math.max( enemy.dmg-enemy.spread , 1);
    ddmgmax = enemy.dmg+enemy.spread;
    ddmgminc = Math.floor(enemy.critdmgratio*ddmgmin);
    ddmgmaxc = Math.floor(enemy.critdmgratio*ddmgmax);
    e_out.innerHTML+= '<div>Damage delivered: ' + ddmgmin + '-' + ddmgmax + ' <small>(when critical: ' + ddmgminc + '-' + ddmgmaxc + ')</small></div>';
    rdmgmin = Math.max(ddmgmin-hero.def,1);
    rdmgmax = Math.max(ddmgmax-hero.def,1);
    rdmgminc = Math.max(ddmgminc-hero.def,2);
    rdmgmaxc = Math.max(ddmgmaxc-hero.def,2);
    e_out.innerHTML+= '<div>Damage to hero: ' + rdmgmin + '-' + rdmgmax + ' <small>(when critical: ' + rdmgminc + '-' + rdmgmaxc + ')</small></div>';
    e_out.innerHTML+= '<div><b>Hits to kill the hero: ' + Math.ceil(hero.hpmax/rdmgmax) + '-' + Math.ceil(hero.hpmax/rdmgmin) + '</b></div>';
    e_out.innerHTML+= '<div>(absolute minimum: ' + Math.ceil(hero.hpmax/rdmgmaxc) + ')</div>';
    //SIMULATE
    //assume hero's initiative, setup food reserves
    var attacker = hero;
    attacker.hp = attacker.hpmax;
    attacker.ep = attacker.epmax;
    attacker.ap = attacker.apmax;
    attacker.healing = document.getElementById('heal').checked;
    attacker.smashing = document.getElementById('sbuse').checked ? parseInt(document.getElementById('Smashing blow').value) : 0;
    attacker.food = {};    
    if (attacker.healing) {
        for (var fooditem in food_effects) {
            if (document.getElementById(fooditem).checked) {
                attacker.food[fooditem] = parseInt(document.getElementById(fooditem).getAttribute('data-limit'));
            }
        }
    }
    attacker.counter = 0;
    attacker.log.innerHTML = '';
    //setup enemy
    var defender = enemy;
    defender.hp = defender.hpmax;
    defender.ap = 0;
    defender.counter = 0;
    defender.log.innerHTML = '';
    //healing info
    if (attacker.healing) {
        var out = '<nobr>Food:'
        for (var food in attacker.food) {
            if (attacker.food[food]) {
                out+= ' '+attacker.food[food]+'x'+(icons[food]?icons[food]:food);
            }
        }
        out+= '</nobr><hr>';
        attacker.log.innerHTML+= out;
        defender.log.innerHTML+= 'unlimited '+icons['EP']+' and no food<hr>';
    }        
    //main loop
    var watchdog = 0;
    var roundno = 1;
    while (defender.hp>0 && attacker.hp>0 && watchdog<1000) {
        watchdog+= 1;
        //update stats, show results
        var alog = 'HP:'+attacker.hp+(attacker.epmax?', EP:'+attacker.ep:'')+', AP:'+attacker.ap;
        var dlog = 'HP:'+defender.hp+(defender.epmax?', EP:'+defender.ep:'')+', AP:'+defender.ap;
        //decision is being made
        var action = 'attack'; //default action to be taken
        //replenish health if necessary
        if (attacker.healing && attacker.hpmax-attacker.hp>=10) {
            //find the best food to use
            var bestheal = 0;
            for (var food in food_effects) {
                if (food!='Ambrosia' && food_effects[food].hp && attacker.food[food]>0 && (!food_effects[food].ep || food_effects[food].hp>bestheal) && attacker.hpmax>=attacker.hp+food_effects[food].hp*0.9) {
                    action = food;
                    bestheal = food_effects[food].hp;
                }
            }
        }
        //replenish energy if necessary
        if (attacker.healing && attacker.epmax && (attacker.smashing && attacker.ep<4 || attacker.ep<1)) {
            //find the best food to use
            for (var food in food_effects) {
                if (food_effects[food].ep && (!food_effects[food].hp || food_effects[food].hp<food_effects[food].ep) && attacker.food[food]>0 && attacker.epmax>=attacker.ep+food_effects[food].ep) {
                    action = food;
                }
            }
        }
        //use the food, if so decided
        if (action!="attack") {
            if (food_effects[action].hp) {
                attacker.hp = Math.min(attacker.hp+food_effects[action].hp, attacker.hpmax);
            }
            if (food_effects[action].ep) {
                attacker.ep = Math.min(attacker.ep+food_effects[action].ep, attacker.epmax);
            }
            attacker.ap-= 2;
            attacker.food[action]-= 1;
            alog+= ' => <b style="color:darkred">consumes</b> '+action+' ('+attacker.food[action]+' left)';
            dlog+= ' => (waits)';
        }
        //attack not possible - out of energy and no healing was possible?
        if (action=='attack' && attacker.epmax && (attacker.smashing && attacker.ep<4 || attacker.ep<1) ) {
            attacker.ap-= 3;
            attacker.ep+= 10;
            alog+= ' => <b style="color:goldenrod">Charge of motivation!</b>';
            dlog+= ' => (waits)';
            action = 'CoM';
        }
        //if no other action was taken, fight
        if (action=='attack') {
            //determine damage: base, delivered, received
            var effdmg = attacker.dmg + Math.floor(Math.random()*(attacker.spread+attacker.spread+1))-attacker.spread;
            var smashing = attacker.smashing && attacker.ep>=4 ? attacker.smashing : 0;
            var crit = smashing ? false : Math.random()*100<attacker.critchance; //normal crit is not possible when SB used
            var dmgdelivered = Math.floor(effdmg * (crit ? attacker.critdmgratio : 1) * (smashing ? 1+smashing*0.5 : 1));        //monster's crit damage rounded down? not confirmed
            var dmgreceived = Math.max(dmgdelivered - defender.def, (crit || smashing ? 2 : 1));
            //update stats
            attacker.counter+= 1;
            defender.hp-= dmgreceived;
            attacker.ap-= smashing ? 4 : 3;
            if (attacker.epmax) {
                attacker.ep-= smashing ? 4 : 1;
            }
            alog+= ' => <b>attacks</b> '+(smashing?' <b style="color:limegreen">SB L'+attacker.smashing+'</b>':'')+(crit?' <b style="color:orange">CRIT!</b>':'');
            dlog+= ' => gets hit for: '+dmgreceived;
            //counter-attack?
            if (defender.retaliatechance && Math.random()*100<defender.retaliatechance) {
                dmgreturned = Math.floor(3+3*Math.random());
                dmgreturned = Math.min(dmgreturned, Math.floor(attacker.hpmax*0.25), attacker.hp-1);
                alog+= ', gets counter-hit for: '+dmgreturned;
                attacker.hp-= dmgreturned;
                dlog+= ', <b style="color:blue">counter-attacks</b>';
            }
        }
        //check if still alive (or rescue if possible)
        if (defender.hp<=0) {
            if (defender.healing && defender.food.Ambrosia>0) {
                defender.hp = Math.min(30, defender.hpmax);
                defender.food.Ambrosia-= 1;
                dlog+= ' <b style="color:red">Ambrosia</b> ('+defender.food.Ambrosia+' left)';
            }
            else {
                dlog+= ' <b style="color:magenta">FALLEN</b><br>- defeated in '+attacker.counter+' hit(s), '+roundno+' turn(s)';
            }
        }
        //update logs
        attacker.log.innerHTML+= '<div>'+alog+'</div>';
        defender.log.innerHTML+= '<div>'+dlog+'</div>';
        //when attacker is out of AP, switch sides
        if (attacker.ap<=0) {
            var swap = attacker;
            attacker = defender;
            defender = swap;
            attacker.ap+= attacker.apmax;
            roundno+= 1;
        }
    }
    //end of main loop
    if (hero.healing) {
        var out = '<hr><nobr>Left:';
        var anyleft = 0;
        for (var food in hero.food) {
            if (hero.food[food]) {
                anyleft+= 1;
                out+= ' '+hero.food[food]+'x'+(icons[food]?icons[food]:food);
            }
        }
        if (anyleft==0) {
            out+= ' NOTHING ';
        }
        out+= '</nobr>';
        hero.log.innerHTML+= out;
    }
}

function togglefood() {
    var foodsack = document.getElementById('foodsack');
    if (foodsack.style.display=='none') {
        foodsack.style.display = null;
    }
    else {
        foodsack.style.display = 'none';
    }
}

function setupCombatForm(placeholderId) {
    var target = document.getElementById(placeholderId);
    //general form structure
    var tipstyle = 'color:gray; margin:3px; font-style:italic; font-size: smaller; line-height:1';
    var table = document.createElement('table');
    table.border = 1;
    table.cellSpacing = 0;
    table.cellPadding = 2;
    table.innerHTML = '<tr valign="top"><td id="h_defi">Hero configuration:</td><td id="e_defi">Enemy selection:</td></tr>';
    table.innerHTML+= '<tr valign="top"><td id="h_stat"></td><td id="e_stat"></td></tr>';
    table.innerHTML+= '<tr valign="top"><td id="h_buff"></td><td id="e_buff"></td></tr>';
    var foodsack = '';
    for (var food in food_effects) {
        foodsack+= ' <input type="checkbox" id="'+food+'" data-limit="0" checked="checked">'+(icons[food]?icons[food]:food);
    }
    table.innerHTML+= '<tr><td colspan="2" align="left"><div style="'+tipstyle+'">Special algorithms may be applied to simulate using consumables/skills permitted, e.g. to replenish HP/EP.<br>This is not a part of the game engine, it acts as user would do and may be not optimal.</div><input type="checkbox" id="heal" />Allow using food<span id="foodsack" style="display:none">: '+foodsack+'</span><br><input type="checkbox" id="sbuse" />Use Smashing blow whenever possible</td></tr>';
    table.innerHTML+= '<tr><td colspan="2" align="center"><button id="emu_run">CALCULATE</button></td></tr>';
    table.innerHTML+= '<tr valign="top"><td id="h_calc"></td><td id="e_calc"></td></tr>';
    table.innerHTML+= '<tr valign="top" style="font-size: 66%"><td id="h_simlog"></td><td id="e_simlog"></td></tr>';
	target.appendChild(table);
    document.getElementById('heal').addEventListener('click', togglefood);    
    document.getElementById('emu_run').addEventListener('click', calculateCombat);    
    //stats forms
    document.getElementById('h_stat').innerHTML = '<div style="'+tipstyle+'">Enter/verify attributes of the hero.<br>These values are updated when gear/skils are selected above.</div>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hhp" data-init="19"/> '+icons['HP']+' HP &nbsp; &nbsp; &nbsp; <input size="1" id="hep" data-init="29"/> '+icons['EP']+' EP<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hdmg" data-init="5"/> '+icons['DMG']+' DMG<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hdef" data-init="2"/> '+icons['DEF']+' DEF<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hap" data-init="4"/> '+icons['AP']+' AP<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hc2c" data-init="5"/> '+icons['c2c']+' % chance to crit<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hc2r" data-init="0" /> '+icons['c2r']+' % chance to reflect damage<br>';
    document.getElementById('h_stat').innerHTML+= '<input size="1" id="hsck" data-init="0" /> '+icons['sck']+' extra space';
    document.getElementById('e_stat').innerHTML = '<div style="'+tipstyle+'">Enter/verify attributes of the enemy.<br>These values are updated when enemy is selected above.</div>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="ehp"/> '+icons['HP']+' HP<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="edmg"/> '+icons['DMG']+' DMG<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="edef"/> '+icons['DEF']+' DEF<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="eap"/> '+icons['AP']+' AP<br>';
    document.getElementById('e_stat').innerHTML+= '<input size="1" id="ec2c" value="5"/> '+icons['c2c']+' % chance to crit';
    //buffs forms
    document.getElementById('h_buff').innerHTML = '<div style="'+tipstyle+'">Declare special status of the hero - buffs and debuffs.<br>Some values may change when selecting an enemy.</div>';
    document.getElementById('h_buff').innerHTML+= '<input type="checkbox" id="hpoke"/>'+(icons['fortified']?icons['fortified']+' ':'')+'Hero used "Poke"<br><input type="checkbox" id="hberserk"/>'+(icons['frenzied']?icons['frenzied']+' ':'')+'Hero used "Berserker rage"<br><input type="checkbox" id="hdemo"/>'+(icons['demoralized']?icons['demoralized']+' ':'')+'Has been demoralized by enemy';
    document.getElementById('e_buff').innerHTML = '<div style="'+tipstyle+'">Declare special status of the enemy - buffs and debuffs.<br>Some values may change when selecting an enemy.</div>';
    document.getElementById('e_buff').innerHTML+= '<input type="checkbox" id="edemo"/>'+(icons['demoralized']?icons['demoralized']+' ':'')+'Has been demoralized by hero<br><input type="checkbox" id="epoke"/>'+(icons['DEF']?icons['DEF']+' ':'')+'Used/received defence boost';
    //hero setup form
    var hero_setup = document.getElementById('h_defi');
    //... first preset buttons...
    var preset_bar = document.createElement('div');
    preset_bar.innerHTML = '<div style="'+tipstyle+'">Pick a preset reflecting hero\'s level to quickly fill the form<br>with the best gear and skills available for that level.</div><small>Presets: </small>';
    for (var p in presets) {
        var p_btn = document.createElement('button');
        p_btn.innerHTML = p;
        p_btn.style = 'font-size: 8pt; padding: 0; margin: 1px';
        p_btn.addEventListener('click', fillHeroFromPreset);
        preset_bar.appendChild(p_btn);
    }
    hero_setup.appendChild(preset_bar);
    hero_setup.appendChild(document.createElement('hr'));
    var info2 = document.createElement('div');
    info2.style = tipstyle;
    info2.innerHTML = "Select/verify gear and skills your hero possesses.<br>These values are updated when preset is selected above.";
    hero_setup.appendChild(info2);
    //... then individual gear/skill entries
    for (var boostname in boost_list) {
        //first, unpack a short definition
        if (boost_list[boostname]['repl']) { 
            for (var r=1; r<=boost_list[boostname]['repl']; r++) {
                boost_list[boostname][r] = {};
                for (var attr in boost_list[boostname]['*']) {
                    boost_list[boostname][r][attr] = boost_list[boostname]['*'][attr]=='*' ? r : boost_list[boostname]['*'][attr];
                }
            }
            delete boost_list[boostname]['repl'];
            delete boost_list[boostname]['*'];
        }
        //process the form
        if (boostname=='Helmet' || boostname=='Martial arts') {
            hero_setup.appendChild(document.createElement('hr'));
        }
        var attr_row = document.createElement('div');
        attr_row.innerHTML = (icons[boostname] ? icons[boostname]+' ' : '')+boostname+': ';
        var attr_sel = document.createElement('select');
        attr_sel.id = boostname;
        attr_sel.addEventListener('change', fillHeroStats);
        //introduce list elements
        for (var boost_level in boost_list[boostname]) {
            var option = document.createElement('option');
            option.value = boost_level;
            option.innerHTML = boost_level!=0 ? boost_level : 'no';
            attr_sel.appendChild(option);
        }
        attr_row.appendChild(attr_sel);
        //icon placeholder
        var attr_sel_pic = document.createElement('span');
        attr_sel_pic.id = boostname+'-pic';
        attr_row.appendChild(attr_sel_pic);
        //atribute ready
        hero_setup.appendChild(attr_row);
    }
    //check if extended enemy data is available (replaces hardcoded table)
    var levels = [];
    if (document.getElementById('foestats')) {
        var entries = document.getElementById('foestats').innerHTML.split('~');
        enemy_list = [];
        for (e in entries) {
            if (entries[e]) {
                var fields = entries[e].split("|");
                var ename = fields[0].split(' - ');
                levels[ename[0]] = 1;
                var enemy = {name: ename[1]+' - '+ename[0], hp: fields[1], dmg: fields[2], def: fields[3], ap: fields[4], skills: fields[5], image: fields[6]};
                enemy_list.push(enemy);
            }
        }
    }
    //enemy selection form
    var enemy_selection = document.getElementById('e_defi');
    enemy_selection.innerHTML+= '<div style="'+tipstyle+'">Pick an opponent from the list of known enemies.<br>List may be filtered by selecting dungeon level.</div>';
    //level selection dropdown (optional)
    if (levels) {
        var levelselect = document.createElement('select');
        var opt = document.createElement('option');
        opt.value = "";
        opt.innerHTML = "- any -";
        levelselect.appendChild(opt);
        for (l in levels) {
            var opt = document.createElement('option');
            opt.value = l;
            opt.innerHTML = l;
            levelselect.appendChild(opt);
        }
        levelselect.addEventListener('change', filterEnemyList);
        levelselect.addEventListener('click', filterEnemyList);
        enemy_selection.appendChild(levelselect);
    }
    //enemy selection dropdown
    var enemyselect = document.createElement('select');
    enemyselect.id = "enemylist";
    for (var f in enemy_list) {
        var opt = document.createElement('option');
        opt.value = f;
        opt.innerHTML = enemy_list[f].name;
        enemyselect.appendChild(opt);
    }
    enemyselect.addEventListener('click', fillEnemyStats);
    enemyselect.addEventListener('change', fillEnemyStats);
    enemy_selection.appendChild(enemyselect);
    enemy_selection.appendChild(document.createElement('br'));
    enemy_selection.appendChild(document.createElement('br'));
    //quick fill
    opt.setAttribute("selected","selected");
    levelselect.click();
    if (window.location.search) {
        var autoenemy = decodeURI(window.location.search.split('=')[1]).replaceAll('+',' ');
        var elist = document.getElementById("enemylist").options;
        var lastshown = null;
        for (option in elist) {
            elist[option].selected = '';
            if (elist[option].innerHTML==autoenemy) {
                lastshown = elist[option];
                break;
            }
        }
        if (lastshown) {
            lastshown.selected = "selected"
            lastshown.click();
        }
    }    
    fillHeroStats();
}

/* above combat simulator is now executed on a page that is ready to accept it */

if (document.getElementById("combat_calc_v1")) {
    setupCombatForm("combat_calc_v1");
}