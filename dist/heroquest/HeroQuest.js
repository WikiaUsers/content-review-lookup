// **************************************************
function rand ( n )
{
  return ( Math.floor ( Math.random ( ) * n ) );
}
// **************************************************

// **************************************************
// JavaScript dice roller (A_morris)
// Version 0.3 FINAL
// **************************************************
// Uses rand()
//
// dicetype: 'combat', 'disarm', 'resist', 'reduce', 'summon' or 'move'
// diceroll: # of sides of a die
// rolltype: 'attack' and 'hdef' or 'mdef'<-- only used with combat dice. Must have the same number as diceroll. Must have attack and only one defend type -->
// rolltype (cont'd): 'toolkit' or 'dwarf' for disarming, 'orcs' or 'undead' for summoning
//
// Usage example:
//  <span class="diceroller" style="display:none;">
//  <span class="dicetype" style="display:none;">combat</span>
//
// <!-- For more dice duplicate the next two lines -->
//  <span class="rolltype" style="display:none;">attack</span> 
//  <span class="diceroll">6</span>
//
//  <span class="dicerollmsg">message</span></span>
//  <span class="nodiceroller">Please wait for the script to load. If it does not load, make sure your browser has JavaScript enabled.</span>

function calculateroll(){
  for(var i in diceroll) {
      diceroll[i].firstChild.nodeValue = rand ( diceroll[i].firstChild.nodeValue ) + 1;
  }
}

function convert2Images(){
  for(var i in diceroll) {
    if ( dicetype[0].firstChild.nodeValue == 'combat' || dicetype[0].firstChild.nodeValue == 'disarm'){
      diceroll[i].style.backgroundImage = combatdice_images[diceroll[i].firstChild.nodeValue];
      diceroll[i].title = dice_values[diceroll[i].firstChild.nodeValue]; //add number to title attribute (see on hover) 
    }else {
      diceroll[i].style.backgroundImage = dice_images[diceroll[i].firstChild.nodeValue];
      diceroll[i].title = diceroll[i].firstChild.nodeValue; //add number to title attribute (see on hover) 
    }
    diceroll[i].firstChild.nodeValue = ''; //remove text on top of image
  }
}

function dicerollmessage(){
  dicerollmsg[0].firstChild.nodeValue = 0;

  if ( dicetype[0].firstChild.nodeValue == 'disarm'){
    if (diceroll.length != rolltype.length) return;
    disarmmsg();
    return;
  }

  if ( dicetype[0].firstChild.nodeValue == 'summon'){
    if (diceroll.length != rolltype.length) return;
    summonmsg();
    return;
  }

  if ( dicetype[0].firstChild.nodeValue == 'resist'){
    for(var i in diceroll) {
      if (diceroll[i].firstChild.nodeValue == 6){
        dicerollmsg[0].firstChild.nodeValue = "You break the spell.";
        return;
      } else dicerollmsg[0].firstChild.nodeValue = "You suffer the effects of the spell for another turn."; 
    }
    return;
  }

  if ( dicetype[0].firstChild.nodeValue == 'reduce'){
    var reduced=0;
    for(var i in diceroll) {
      if (diceroll[i].firstChild.nodeValue == 5 || diceroll[i].firstChild.nodeValue == 6){
        reduced++;
      }  
    }
    if ( reduced > 0 ){
      dicerollmsg[0].firstChild.nodeValue = "The damage caused by the spell is reduced by " + reduced + ".";
    }else dicerollmsg[0].firstChild.nodeValue = "The full effects of the spell are suffered.";
    return;
  }

  if ( dicetype[0].firstChild.nodeValue == 'combat'){
    if (diceroll.length != rolltype.length) return;
    combatmsg();
    return;
  }

  if ( dicetype[0].firstChild.nodeValue == 'move'){
    for(var i in diceroll) {
      dicerollmsg[0].firstChild.nodeValue = parseInt(dicerollmsg[0].firstChild.nodeValue) + parseInt(diceroll[i].firstChild.nodeValue);
    }
    dicerollmsg[0].firstChild.nodeValue = 'Move a maximum of ' + dicerollmsg[0].firstChild.nodeValue + ' squares.';
  }
}

function disarmmsg() {
  var sprung = 0;
  if (diceroll[0].firstChild.nodeValue <= 3 && rolltype[0].firstChild.nodeValue == 'toolkit') {
    sprung++;
  }
  if (diceroll[0].firstChild.nodeValue == 6 && rolltype[0].firstChild.nodeValue == 'dwarf') {
    sprung++;
  }
  if (sprung > 0){
    dicerollmsg[0].firstChild.nodeValue = "You have sprung the trap and suffer body damage!";
  }else {
    dicerollmsg[0].firstChild.nodeValue = "You disarmed the trap. It is now harmless.";
  }
}

function summonmsg() {
  dicerollmsg[0].firstChild.nodeValue = "You summon ";
  if ( rolltype[0].firstChild.nodeValue == 'orcs' ){
    if (diceroll[0].firstChild.nodeValue <= 3 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "4 Orcs.";
      return;
    }
    if (diceroll[0].firstChild.nodeValue <= 5 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "5 Orcs.";
    }
    if (diceroll[0].firstChild.nodeValue == 6 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "6 Orcs.";
    }
  }
  if ( rolltype[0].firstChild.nodeValue == 'undead' ){
    if (diceroll[0].firstChild.nodeValue <= 2 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "4 Skeletons.";
      return;
    }
    if (diceroll[0].firstChild.nodeValue <= 4 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "3 Skeletons and 2 Zombies.";
      return;
    }
    if (diceroll[0].firstChild.nodeValue <= 6 ) {
      dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + "2 Zombies and 2 Mummies.";
    }
  }
}

function combatmsg() {
  var number_of_skulls = 0;
  var number_of_blocks = 0;

  for(var i in diceroll) {
    if (rolltype[i].firstChild.nodeValue == 'hdef'){
      dicerollmsg[0].firstChild.nodeValue = 'The monster gets ';
    }else {
      dicerollmsg[0].firstChild.nodeValue = 'You get ';
    }
    if (diceroll[i].firstChild.nodeValue <= 3 && rolltype[i].firstChild.nodeValue == 'attack') {
      number_of_skulls++;
    }
    if ((diceroll[i].firstChild.nodeValue == 4 || diceroll[i].firstChild.nodeValue == 5) && rolltype[i].firstChild.nodeValue == 'hdef') {
      number_of_blocks++;
    }
    if (diceroll[i].firstChild.nodeValue == 6 && rolltype[i].firstChild.nodeValue == 'mdef') {
      number_of_blocks++;
    }
  }

  dicerollmsg[0].firstChild.nodeValue = dicerollmsg[0].firstChild.nodeValue + number_of_skulls + ' hits and ' + number_of_blocks + ' are blocked for a total of ' + Math.max(number_of_skulls-number_of_blocks, 0) + ' damage.';
}

function checkdiceroller() {
  //hide 'nodiceroller' and show 'diceroller'
  var nodiceroller = getElementsByClassName(document, 'span', 'nodiceroller');
  for(var i in nodiceroller) nodiceroller[i].style.display = 'none'
  var diceroller = getElementsByClassName(document, 'span', 'diceroller');
  for(var i in diceroller) diceroller[i].style.display = 'inline'

  //set up global objects diceroll.
  diceroll = getElementsByClassName(document, 'span', 'diceroll');  //global
  for(var i in diceroll){
    diceroll[i].style.display = 'block';
    diceroll[i].style.height = '33px';
    diceroll[i].style.width = '33px';
  }
  dicetype = getElementsByClassName(document, 'span', 'dicetype');  //global
  rolltype = getElementsByClassName(document, 'span', 'rolltype');  //global
  dicerollmsg = getElementsByClassName(document, 'span', 'dicerollmsg');  //global
  if(diceroll.length == 0 || dicetype.length == 0) return;
  calculateroll();
  if(dicerollmsg.length == 0) return;
  dicerollmessage(); //Must be before convert2Images
  convert2Images();  //convert2Images removes value from diceroll
}

addOnloadHook(checkdiceroller);

var dice_values = new Array ( );
dice_values[1] = "skull";
dice_values[2] = "skull";
dice_values[3] = "skull";
dice_values[4] = "white shield";
dice_values[5] = "white shield";
dice_values[6] = "black shield";

//Combat dice images
var combatdice_images = new Array ( );
combatdice_images[1] = "url('https://images.wikia.nocookie.net/heroquest/images/9/93/Dice_skull.gif')";
combatdice_images[2] = "url('https://images.wikia.nocookie.net/heroquest/images/9/93/Dice_skull.gif')";
combatdice_images[3] = "url('https://images.wikia.nocookie.net/heroquest/images/9/93/Dice_skull.gif')";
combatdice_images[4] = "url('https://images.wikia.nocookie.net/heroquest/images/2/2f/Dice_white_shield.gif')";
combatdice_images[5] = "url('https://images.wikia.nocookie.net/heroquest/images/2/2f/Dice_white_shield.gif')";
combatdice_images[6] = "url('https://images.wikia.nocookie.net/heroquest/images/d/dd/Dice_black_shield.gif')";

//Dice images
var dice_images = new Array ( );
dice_images[1] = "url('https://images.wikia.nocookie.net/heroquest/images/e/e9/Dice1.gif')";
dice_images[2] = "url('https://images.wikia.nocookie.net/heroquest/images/1/1a/Dice2.gif')";
dice_images[3] = "url('https://images.wikia.nocookie.net/heroquest/images/f/fb/Dice3.gif')";
dice_images[4] = "url('https://images.wikia.nocookie.net/heroquest/images/f/f5/Dice4.gif')";
dice_images[5] = "url('https://images.wikia.nocookie.net/heroquest/images/6/6e/Dice5.gif')";
dice_images[6] = "url('https://images.wikia.nocookie.net/heroquest/images/2/24/Dice6.gif')";

// **************************************************
// -end- JavaScript dice roller (A_morris)
// **************************************************

// **************************************************
// Treasure Card Generator (A_morris)
// Version 0.1
// **************************************************
// Uses rand ()

function checktreasurecard () {
  //hide 'notreasurecard' and show 'treasurecardgenerator'
  var notreasurecard= getElementsByClassName(document, 'span', 'notreasurecard');
  for(var i in notreasurecard) notreasurecard[i].style.display = 'none'
  var treasurecardgenerator= getElementsByClassName(document, 'span', 'treasurecardgenerator');
  for(var i in treasurecardgenerator) treasurecardgenerator[i].style.display = 'inline'

  //set up global objects
  treasurecard= getElementsByClassName(document, 'span', 'treasurecard');  //global
  treasureimg= getElementsByClassName(document, 'span', 'treasureimg');  //global
  treasurecaption= getElementsByClassName(document, 'span', 'treasurecaption');  //global
  for(var i in treasureimg){
    treasureimg[i].style.display = 'block';
    treasureimg[i].style.width = '254px';
    treasureimg[i].style.height = '195px';
    treasureimg[i].style.backgroundRepeat="no-repeat";
  }
  for(var i in treasurecaption){
    treasurecaption[i].style.display = 'block';
    treasurecaption[i].style.width = '254px';
  }

  if(treasurecard.length == 0 || treasureimg.length == 0 || treasurecaption == 0) return;
  getCard( );
}

function getCard(){
  for(var i in treasurecard) {
    var index = rand ( treasure_cards.length );
    treasurecard[i].firstChild.nodeValue = treasure_cards[index][0];
    treasureimg[i].style.backgroundImage = treasure_cards[index][1];
    treasureimg[i].title = treasurecard[i].firstChild.nodeValue;
    treasureimg[i].firstChild.nodeValue = ''; //remove text on top of image
    treasurecaption[i].firstChild.nodeValue = treasure_cards[index][2];
  }
}

addOnloadHook(checktreasurecard);

//Treasure Card array
var treasure_cards = new Array ( );
treasure_cards[0]=new Array ('Potion of Healing', "url('https://images.wikia.nocookie.net/heroquest/images/c/c4/Potion_healing.jpg')", "In a bundle of rags, you find a small bottle of bluish liquid. You can drink this healing potion at any time, restoring the number of Body Points equal to a roll of one die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Add \"Potion of Healing\" to your inventory.");
treasure_cards[1]= new Array ('Potion of Healing', "url('https://images.wikia.nocookie.net/heroquest/images/c/c4/Potion_healing.jpg')", "In a bundle of rags, you find a small bottle of bluish liquid. You can drink this healing potion at any time, restoring the number of Body Points equal to a roll of one die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Add \"Potion of Healing\" to your inventory.");
treasure_cards[2]= new Array ('Potion of Healing', "url('https://images.wikia.nocookie.net/heroquest/images/c/c4/Potion_healing.jpg')", "In a bundle of rags, you find a small bottle of bluish liquid. You can drink this healing potion at any time, restoring the number of Body Points equal to a roll of one die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Add \"Potion of Healing\" to your inventory.");
treasure_cards[3]= new Array ('Heroic Brew', "url('https://images.wikia.nocookie.net/heroquest/images/9/92/Potion_heroic.jpg')", "You are surprised to find a leather bag hanging on the wall. If you drink its contents before you attack, you can make two attacks instead of one. This may only be used once. Add \"Heroic Brew\" to your inventory.");
treasure_cards[4]= new Array ('Potion of Strength', "url('https://images.wikia.nocookie.net/heroquest/images/a/a8/Potion_strength.jpg')", "You find a small purple flask. You can drink this strange smelling liquid at any time, enabling you to roll two extra combat dice the next time you attack. This may only be used once. Add \"Potion of Strength\" to your inventory.");
treasure_cards[5]= new Array ('Potion of Defense', "url('https://images.wikia.nocookie.net/heroquest/images/a/ae/Potion_defense.jpg')", "Amidst a collection of old bottles, you find a small vial containing clear liquid. You can drink this potion at any time, giving you two extra combat dice next time you defend. This may only be used once. Add \"Potion of Defense\" to your inventory.");
treasure_cards[6]= new Array ('Gem!', "url('https://images.wikia.nocookie.net/heroquest/images/8/81/Treasure_gem.jpg')", "Tucked into the toe of a old boot you find a small gem worth 35 gold coins. Record the money on your sheet.");
treasure_cards[7]= new Array ('Gem!', "url('https://images.wikia.nocookie.net/heroquest/images/8/81/Treasure_gem.jpg')", "Tucked into the toe of a old boot you find a small gem worth 35 gold coins. Record the money on your sheet.");
treasure_cards[8]= new Array ('Gold!', "url('https://images.wikia.nocookie.net/heroquest/images/3/30/Treasure_gold.jpg')", "Amidst old rags, tattered fur robes and soiled blankets, you find a collection of 15 gold coins. Record the money on your sheet.");
treasure_cards[9]= new Array ('Gold!', "url('https://images.wikia.nocookie.net/heroquest/images/3/30/Treasure_gold.jpg')", "Amidst old rags, tattered fur robes and soiled blankets, you find a collection of 15 gold coins. Record the money on your sheet.");
treasure_cards[10]= new Array ('Gold!', "url('https://images.wikia.nocookie.net/heroquest/images/3/30/Treasure_gold.jpg')", "You find a loose stone and tear it from the wall. Behind it you discover a small leather pouch wrapped in an old rag. Peering inside, you find 25 gold coins. Record the money on your sheet.");
treasure_cards[11]= new Array ('Gold!', "url('https://images.wikia.nocookie.net/heroquest/images/3/30/Treasure_gold.jpg')", "You find a loose stone and tear it from the wall. Behind it you discover a small leather pouch wrapped in an old rag. Peering inside, you find 25 gold coins. Record the money on your sheet.");
treasure_cards[12]= new Array ('Jewels!', "url('https://images.wikia.nocookie.net/heroquest/images/1/1d/Treasure_jewel.jpg')", "You find a small wooden box. It is simple-looking and very old. Within you discover that it is lined with velvet and contains very small jewels worth 50 gold coins. Record the money on your sheet.");
treasure_cards[13]= new Array ('Jewels!', "url('https://images.wikia.nocookie.net/heroquest/images/1/1d/Treasure_jewel.jpg')", "You find a small wooden box. It is simple-looking and very old. Within you discover that it is lined with velvet and contains very small jewels worth 50 gold coins. Record the money on your sheet.");
treasure_cards[14]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[15]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[16]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[17]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[18]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[19]= new Array ('Wandering Monster', "url('https://images.wikia.nocookie.net/heroquest/images/e/ec/Wandering_monster.jpg')", "As you are searching, a monster stalks you and attacks! Place the wandering monster (listed on the Quest introduction page) on any square next to you. The monster attacks immediately!");
treasure_cards[20]= new Array ('Hazard!', "url('https://images.wikia.nocookie.net/heroquest/images/9/91/Hazard_spear.jpg')", "While you are searching, a hidden arrow shoots from the wall striking you. You lose 1 Body Point and your turn is over.");
treasure_cards[21]= new Array ('Hazard!', "url('https://images.wikia.nocookie.net/heroquest/images/9/91/Hazard_spear.jpg')", "While you are searching, a hidden arrow shoots from the wall striking you. You lose 1 Body Point and your turn is over.");
treasure_cards[22]= new Array ('Hazard!', "url('https://images.wikia.nocookie.net/heroquest/images/c/c5/Hazard_pit.jpg')", "Suddenly, the stone beneath your feet gives way. You fall into a shallow hole, losing 1 Body Point and ending your turn. You may climb out and move normally on your next turn.");
treasure_cards[23]= new Array ('Hazard!', "url('https://images.wikia.nocookie.net/heroquest/images/c/c5/Hazard_pit.jpg')", "Suddenly, the stone beneath your feet gives way. You fall into a shallow hole, losing 1 Body Point and ending your turn. You may climb out and move normally on your next turn.");

// **************************************************
// -end- Treasure Card Generator (A_morris)
// **************************************************