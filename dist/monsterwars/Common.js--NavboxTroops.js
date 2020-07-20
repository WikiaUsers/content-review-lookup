document.getElementById("navboxtroops").innerHTML = "<b>Loading Navbox...</b>";
function getHTML (oXHR, sTargetId) { //gets HTML via AJAX, but is more compatible
var  rOpen = new RegExp("<(?!\!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"\']" + sTargetId + "[\"\'][^>]*>" ,"i"),
sSrc = oXHR.responseText, aExec = rOpen.exec(sSrc);
return aExec ? (new RegExp("(?:(?:.(?!<\\s*" + aExec[1] + "[^>]*[>]))*.?<\\s*" + aExec[1] + "[^>]*[>](?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?<\\s*\/\\s*" + aExec[1] + "\\s*>)*(?:.(?!<\\s*\/\\s*" + aExec[1] + "\\s*>))*.?", "i")).exec(sSrc.slice(sSrc.indexOf(aExec[0]) + aExec[0].length)) || "" : "";
}
function correctString(wrongstr){ //against lzyimg
var partsarray = wrongstr.split("<noscript>");
var midstr = String(partsarray[2]);
var partsarray2 = midstr.split("</noscript>");
var correctstr = String(partsarray2[0]);
return correctstr;
}
var iKnight;
var iSkully;
var iArcher;
var iZombie;
var iVamp;
var iWolf;
var iImp;
var iNecro;
var iGargoyle;
var iSpider;
var iReap;
var iMedusa;
var iTroll;
var iLich;
var iDragon;
var userpageurl = "http://monsterwars.wikia.com/wiki/User:" + wgUserName;
var oReq = new XMLHttpRequest();
oReq.open("GET", userpageurl, true);
oReq.onload = function() {
var osKnight = getHTML(this, "myupgradesKnight");
var osSkully = getHTML(this, "myupgradesSkully");
var osArcher = getHTML(this, "myupgradesArcher");
var osZombie = getHTML(this, "myupgradesZombie");
var osVamp = getHTML(this, "myupgradesVamp");
var osWolf = getHTML(this, "myupgradesWolf");
var osImp = getHTML(this, "myupgradesImp");
var osNecro = getHTML(this, "myupgradesNecro");
var osGargoyle = getHTML(this, "myupgradesGargoyle");
var osSpider = getHTML(this, "myupgradesSpider");
var osReap = getHTML(this, "myupgradesReap");
var osMedusa = getHTML(this, "myupgradesMedusa");
var osTroll = getHTML(this, "myupgradesTroll");
var osLich = getHTML(this, "myupgradesLich");
var osDragon = getHTML(this, "myupgradesDragon");
var csKnight = correctString(String(osKnight));
var csSkully = correctString(String(osSkully));
var csArcher = correctString(String(osArcher));
var csZombie = correctString(String(osZombie));
var csVamp = correctString(String(osVamp));
var csWolf = correctString(String(osWolf));
var csImp = correctString(String(osImp));
var csNecro = correctString(String(osNecro));
var csGargoyle = correctString(String(osGargoyle));
var csSpider = correctString(String(osSpider));
var csReap = correctString(String(osReap));
var csMedusa = correctString(String(osMedusa));
var csTroll = correctString(String(osTroll));
var csLich = correctString(String(osLich));
var csDragon = correctString(String(osDragon));
vardefinitions(csKnight, csSkully, csArcher, csZombie, csVamp, csWolf, csImp, csNecro, csGargoyle, csSpider, csReap, csMedusa, csTroll, csLich, csDragon);
}
oReq.send(null);
function vardefinitions(sKnight, sSkully, sArcher, sZombie, sVamp, sWolf, sImp, sNecro, sGargoyle, sSpider, sReap, sMedusa, sTroll, sLich, sDragon) {
switch (sSkully)
{
case '<a href="/wiki/Skully" title="Skully"><img alt="Bone armor.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/7/7e/Bone_armor.png/50px-Bone_armor.png" width="50" height="60" /></a>':
case '<img alt="Bone armor.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/7/7e/Bone_armor.png/50px-Bone_armor.png" width="50" height="60" />':
iSkully = "https://images.wikia.nocookie.net/monsterwars/images/f/f9/Skully2Icon.png";
break;
case '<a href="/wiki/Skully" title="Skully"><img alt="Dragon Rib.png" src="https://images.wikia.nocookie.net/__cb20120418210035/monsterwars/images/thumb/9/9b/Dragon_Rib.png/50px-Dragon_Rib.png" width="50" height="61" /></a>':
case '<img alt="Dragon Rib.png" src="https://images.wikia.nocookie.net/__cb20120418210035/monsterwars/images/thumb/9/9b/Dragon_Rib.png/50px-Dragon_Rib.png" width="50" height="61" />':
iSkully = "https://images.wikia.nocookie.net/monsterwars/images/f/f0/Skully3Icon.png";
break;
case '<a href="/wiki/Skully" title="Skully"><img alt="Nether Bone.png" src="https://images.wikia.nocookie.net/__cb20120525194512/monsterwars/images/thumb/5/5f/Nether_Bone.png/50px-Nether_Bone.png" width="50" height="57" /></a>':
case '<img alt="Nether Bone.png" src="https://images.wikia.nocookie.net/__cb20120525194512/monsterwars/images/thumb/5/5f/Nether_Bone.png/50px-Nether_Bone.png" width="50" height="57" />':
iSkully = "https://images.wikia.nocookie.net/monsterwars/images/d/d4/Skully4Icon.png";
break;
default:
iSkully = "https://images.wikia.nocookie.net/monsterwars/images/b/b3/Skully1Icon.png";
}
switch (sKnight)
{
case '<a href="/wiki/Dead_Knight" title="Dead Knight"><img alt="Dark Knight.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/6/69/Dark_Knight.png/50px-Dark_Knight.png" width="50" height="72" /></a>':
case '<img alt="Dark Knight.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/6/69/Dark_Knight.png/50px-Dark_Knight.png" width="50" height="72" />':
iKnight = "https://images.wikia.nocookie.net/monsterwars/images/1/15/Dead_Knight2Icon.png";
break;
case '<a href="/wiki/Dead_Knight" title="Dead Knight"><img alt="Demon armor.png" src="https://images.wikia.nocookie.net/__cb20120418210036/monsterwars/images/thumb/6/6b/Demon_armor.png/50px-Demon_armor.png" width="50" height="54" /></a>':
case '<img alt="Demon armor.png" src="https://images.wikia.nocookie.net/__cb20120418210036/monsterwars/images/thumb/6/6b/Demon_armor.png/50px-Demon_armor.png" width="50" height="54" />':
iKnight = "https://images.wikia.nocookie.net/monsterwars/images/6/60/Dead_Knight3Icon.png";
break;
case '<a href="/wiki/Dead_Knight" title="Dead Knight"><img alt="Nether Knight.png" src="https://images.wikia.nocookie.net/__cb20120515164303/monsterwars/images/thumb/e/e3/Nether_Knight.png/50px-Nether_Knight.png" width="50" height="54" /></a>':
case '<img alt="Nether Knight.png" src="https://images.wikia.nocookie.net/__cb20120515164303/monsterwars/images/thumb/e/e3/Nether_Knight.png/50px-Nether_Knight.png" width="50" height="54" />':
iKnight = "https://images.wikia.nocookie.net/monsterwars/images/d/d4/Dead_Knight4Icon.png";
break;
default:
iKnight = "https://images.wikia.nocookie.net/monsterwars/images/3/32/Dead_Knight1Icon.png";
}
switch (sArcher)
{
case '<img alt="Ranger armor.png" src="https://images.wikia.nocookie.net/__cb20120418210115/monsterwars/images/thumb/7/72/Ranger_armor.png/50px-Ranger_armor.png" width="50" height="59" />':
iArcher = "https://images.wikia.nocookie.net/monsterwars/images/e/e1/Skully_Archer2Icon.png";
break;
case '<img alt="Red Wing armor.png" src="https://images.wikia.nocookie.net/__cb20120418205939/monsterwars/images/thumb/6/68/Red_Wing_armor.png/50px-Red_Wing_armor.png" width="50" height="53" />':
iArcher = "https://images.wikia.nocookie.net/monsterwars/images/3/30/Skully_Archer3Icon.png";
break;
case '<img alt="Nether Bow.png" src="https://images.wikia.nocookie.net/__cb20120515164303/monsterwars/images/thumb/2/2c/Nether_Bow.png/50px-Nether_Bow.png" width="50" height="52" />':
iArcher = "https://images.wikia.nocookie.net/monsterwars/images/6/69/Skully_Archer4Icon.png";
break;
default:
iArcher = "https://images.wikia.nocookie.net/monsterwars/images/b/bc/Skully_Archer1Icon.png";
}
switch (sZombie)
{
case '<img alt="Mutation.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/e/e5/Mutation.png/50px-Mutation.png" width="50" height="52" />':
iZombie = "https://images.wikia.nocookie.net/monsterwars/images/b/b7/Zombie2Icon.png";
break;
case '<img alt="Abomination.png" src="https://images.wikia.nocookie.net/__cb20120418205939/monsterwars/images/thumb/7/72/Abomination.png/50px-Abomination.png" width="50" height="67" />':
iZombie = "https://images.wikia.nocookie.net/monsterwars/images/2/22/Zombie3Icon.png";
break;
case '<img alt="Nether Zombie.png" src="https://images.wikia.nocookie.net/__cb20120515164303/monsterwars/images/thumb/4/45/Nether_Zombie.png/50px-Nether_Zombie.png" width="50" height="62" />':
iZombie = "https://images.wikia.nocookie.net/monsterwars/images/1/18/Zombie4Icon.png";
break;
default:
iZombie = "https://images.wikia.nocookie.net/monsterwars/images/3/35/Zombie1Icon.png";
}
switch (sVamp)
{
case '<img alt="Hobo Suit.png" src="https://images.wikia.nocookie.net/__cb20120418210114/monsterwars/images/thumb/5/5c/Hobo_Suit.png/50px-Hobo_Suit.png" width="50" height="45" />':
iVamp = "https://images.wikia.nocookie.net/monsterwars/images/c/c9/Vamp2Icon.png";
break;
case '<img alt="Vamp Suit.png" src="https://images.wikia.nocookie.net/__cb20120418205938/monsterwars/images/thumb/d/d7/Vamp_Suit.png/50px-Vamp_Suit.png" width="50" height="48" />':
iVamp = "https://images.wikia.nocookie.net/monsterwars/images/e/ee/Vamp3Icon.png";
break;
case '<img alt="Nether Vamp.png" src="https://images.wikia.nocookie.net/__cb20120516194112/monsterwars/images/thumb/1/15/Nether_Vamp.png/50px-Nether_Vamp.png" width="50" height="50" />':
iVamp = "https://images.wikia.nocookie.net/monsterwars/images/2/2a/Vamp4Icon.png";
break;
default:
iVamp = "https://images.wikia.nocookie.net/monsterwars/images/8/8a/Vamp1Icon.png";
}
switch (sWolf)
{
case '<img alt="Smokey armor.png" src="https://images.wikia.nocookie.net/__cb20120418210039/monsterwars/images/thumb/0/00/Smokey_armor.png/50px-Smokey_armor.png" width="50" height="42" />':
iWolf = "https://images.wikia.nocookie.net/monsterwars/images/1/12/Wolf2Icon.png"
break;
case '<img alt="Were armor.png" src="https://images.wikia.nocookie.net/__cb20120501134706/monsterwars/images/thumb/d/d9/Were_armor.png/50px-Were_armor.png" width="50" height="47" />':
iWolf = "https://images.wikia.nocookie.net/monsterwars/images/2/2a/Wolf3Icon.png";
break;
case '<img alt="Nether Wolf.png" src="https://images.wikia.nocookie.net/__cb20120619162823/monsterwars/images/thumb/f/ff/Nether_Wolf.png/50px-Nether_Wolf.png" width="50" height="50" />':
iWolf = "https://images.wikia.nocookie.net/monsterwars/images/1/1a/Wolf4Icon.png";
break;
default:
iWolf = "https://images.wikia.nocookie.net/monsterwars/images/6/60/Wolf1Icon.png";
}
switch (sImp)
{
case '<img alt="Bomb armor.png" src="https://images.wikia.nocookie.net/__cb20120418210113/monsterwars/images/thumb/6/62/Bomb_armor.png/50px-Bomb_armor.png" width="50" height="61" />':
iImp = "https://images.wikia.nocookie.net/monsterwars/images/8/8b/Imp2Icon.png";
break;
case '<img alt="Dynamite armor.png" src="https://images.wikia.nocookie.net/__cb20120418205939/monsterwars/images/thumb/2/25/Dynamite_armor.png/50px-Dynamite_armor.png" width="50" height="63" />':
iImp = "https://images.wikia.nocookie.net/monsterwars/images/3/31/Imp3Icon.png";
break;
case '<img alt="Nether Bomb.png" src="https://images.wikia.nocookie.net/__cb20120526093733/monsterwars/images/thumb/f/f8/Nether_Bomb.png/50px-Nether_Bomb.png" width="50" height="66" />':
iImp = "https://images.wikia.nocookie.net/monsterwars/images/7/7e/Imp4Icon.png";
break;
default:
iImp = "https://images.wikia.nocookie.net/monsterwars/images/6/65/Imp1Icon.png";
}
switch (sNecro)
{
case '<img alt="Mummy armor.png" src="https://images.wikia.nocookie.net/__cb20120418210038/monsterwars/images/thumb/4/4e/Mummy_armor.png/50px-Mummy_armor.png" width="50" height="95" />':
iNecro = "https://images.wikia.nocookie.net/monsterwars/images/d/d8/Necromancer2Icon.png"
break;
case '<img alt="Grave armor.png" src="https://images.wikia.nocookie.net/__cb20120418205938/monsterwars/images/thumb/0/0c/Grave_armor.png/50px-Grave_armor.png" width="50" height="87" />':
iNecro = "https://images.wikia.nocookie.net/monsterwars/images/d/d2/Necromancer3Icon.png";
break;
case '<img alt="Nether Necro.png" src="https://images.wikia.nocookie.net/__cb20120619163351/monsterwars/images/thumb/a/ac/Nether_Necro.png/50px-Nether_Necro.png" width="50" height="77" />':
iNecro = "https://images.wikia.nocookie.net/monsterwars/images/8/81/Necromancer4Icon.png";
break;
default:
iNecro = "https://images.wikia.nocookie.net/monsterwars/images/0/07/Necromancer1Icon.png";
}
switch (sGargoyle)
{
case '<img alt="Gladiator armor.png" src="https://images.wikia.nocookie.net/__cb20120418210038/monsterwars/images/thumb/8/8a/Gladiator_armor.png/50px-Gladiator_armor.png" width="50" height="60" />':
iGargoyle = "https://images.wikia.nocookie.net/monsterwars/images/c/c8/Gargoyle2Icon.png";
break;
case '<img alt="Redrock armor.png" src="https://images.wikia.nocookie.net/__cb20120418205938/monsterwars/images/thumb/1/14/Redrock_armor.png/50px-Redrock_armor.png" width="50" height="65" />':
iGargoyle = "https://images.wikia.nocookie.net/monsterwars/images/5/54/Gargoyle3Icon.png";
break;
case '<img alt="Nether Demon.png" src="https://images.wikia.nocookie.net/__cb20120516124202/monsterwars/images/thumb/8/8a/Nether_Demon.png/50px-Nether_Demon.png" width="50" height="62" />':
iGargoyle = "https://images.wikia.nocookie.net/monsterwars/images/2/2f/Gargoyle4Icon.png";
break;
default:
iGargoyle = "https://images.wikia.nocookie.net/monsterwars/images/3/37/Gargoyle1Icon.png";
}
switch (sSpider)
{
case '<img alt="Tarantula.png" src="https://images.wikia.nocookie.net/__cb20120211155623/monsterwars/images/thumb/f/f4/Tarantula.png/50px-Tarantula.png" width="50" height="25" />':
iSpider = "https://images.wikia.nocookie.net/monsterwars/images/5/50/Spidey2Icon.png";
break;
case '<img alt="Spider3Portrait.png" src="https://images.wikia.nocookie.net/__cb20120313172761/monsterwars/images/thumb/a/a2/Spider3Portrait.png/50px-Spider3Portrait.png" width="50" height="30" />':
iSpider = "https://images.wikia.nocookie.net/monsterwars/images/e/e8/Spidey3Icon.png";
break;
case '<img alt="Spidey4Portrait-hd.png" src="https://images.wikia.nocookie.net/__cb20120516203714/monsterwars/images/thumb/e/e6/Spidey4Portrait-hd.png/50px-Spidey4Portrait-hd.png" width="50" height="31" />':
iSpider = "https://images.wikia.nocookie.net/monsterwars/images/3/3c/Spidey4Icon.png";
break;
default:
iSpider = "https://images.wikia.nocookie.net/monsterwars/images/1/17/Spidey1Icon.png";
}
switch (sReap)
{
case '<img alt="Death Reap.png" src="https://images.wikia.nocookie.net/__cb20120418210036/monsterwars/images/thumb/0/0a/Death_Reap.png/50px-Death_Reap.png" width="50" height="59" />':
iReap = "https://images.wikia.nocookie.net/monsterwars/images/9/92/Reap2Icon.png";
break;
case '<img alt="Grimm Reap.png" src="https://images.wikia.nocookie.net/__cb20120418205937/monsterwars/images/thumb/3/37/Grimm_Reap.png/50px-Grimm_Reap.png" width="50" height="62" />':
iReap = "https://images.wikia.nocookie.net/monsterwars/images/b/bf/Reap3Icon.png";
break;
case '<img alt="Nether Reap.png" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/8/8f/Nether_Reap.png/50px-Nether_Reap.png" width="50" height="56" />':
iReap = "https://images.wikia.nocookie.net/monsterwars/images/7/73/Reap4Icon.png";
break;
default:
iReap = "https://images.wikia.nocookie.net/monsterwars/images/3/3d/Reap1Icon.png";
}
switch (sMedusa)
{
case '<img alt="Athena armor.png" src="https://images.wikia.nocookie.net/__cb20120418210038/monsterwars/images/thumb/c/cc/Athena_armor.png/50px-Athena_armor.png" width="50" height="55" />':
iMedusa = "https://images.wikia.nocookie.net/monsterwars/images/3/37/Medusa2Icon.png";
break;
case '<img alt="Snake Queen.png" src="https://images.wikia.nocookie.net/__cb20121013175523/monsterwars/images/thumb/5/5a/Snake_Queen.png/50px-Snake_Queen.png" width="50" height="60" />':
iMedusa = "https://images.wikia.nocookie.net/monsterwars/images/6/69/Medusa3Icon.png";
break;
case '<img alt="Nether Queen.png" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/3/37/Nether_Queen.png/50px-Nether_Queen.png" width="50" height="60" />':
iMedusa = "https://images.wikia.nocookie.net/monsterwars/images/e/e2/Medusa4Icon.png";
break;
default:
iMedusa = "https://images.wikia.nocookie.net/monsterwars/images/6/6f/Medusa1Icon.png";
}
switch (sTroll)
{
case '<img alt="Dead Arm.png" src="https://images.wikia.nocookie.net/__cb20120418210038/monsterwars/images/thumb/c/cb/Dead_Arm.png/50px-Dead_Arm.png" width="50" height="71" />':
iTroll = "https://images.wikia.nocookie.net/monsterwars/images/a/ac/Troll2Icon.png";
break;
case '<img alt="Mace armor.png" src="https://images.wikia.nocookie.net/__cb20120418205938/monsterwars/images/thumb/7/79/Mace_armor.png/50px-Mace_armor.png" width="50" height="61" />':
iTroll = "https://images.wikia.nocookie.net/monsterwars/images/8/89/Troll3Icon.png";
break;
case '<img alt="Nether Troll.png" src="https://images.wikia.nocookie.net/__cb20120516124202/monsterwars/images/thumb/4/47/Nether_Troll.png/50px-Nether_Troll.png" width="50" height="66" />':
iTroll = "https://images.wikia.nocookie.net/monsterwars/images/6/6b/Troll4Icon.png";
break;
default:
iTroll = "https://images.wikia.nocookie.net/monsterwars/images/0/0d/Troll1Icon.png";
}
switch (sLich)
{
case '<img alt="Ghost armor.png" src="https://images.wikia.nocookie.net/__cb20120418210037/monsterwars/images/thumb/d/de/Ghost_armor.png/50px-Ghost_armor.png" width="50" height="71" />':
iLich = "https://images.wikia.nocookie.net/monsterwars/images/4/41/Lich2Icon.png";
break;
case '<img alt="Nether armor.png" src="https://images.wikia.nocookie.net/__cb20120418205937/monsterwars/images/thumb/2/2a/Nether_armor.png/50px-Nether_armor.png" width="50" height="61" />':
iLich = "https://images.wikia.nocookie.net/monsterwars/images/6/61/Lich3Icon.png";
break;
case '<img alt="Nether Ghost.png" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/3/33/Nether_Ghost.png/50px-Nether_Ghost.png" width="50" height="59" />':
iLich = "https://images.wikia.nocookie.net/monsterwars/images/2/25/Lich4Icon.png";
break;
default:
iLich = "https://images.wikia.nocookie.net/monsterwars/images/3/3d/Lich1Icon.png";
}
switch (sDragon)
{
case '<img alt="Horned.png" src="https://images.wikia.nocookie.net/__cb20120418210037/monsterwars/images/thumb/3/3c/Horned.png/50px-Horned.png" width="50" height="42" />':
iDragon = "https://images.wikia.nocookie.net/monsterwars/images/9/99/Dragon2Icon.png";
break;
case '<img alt="Bone.png" src="https://images.wikia.nocookie.net/__cb20120418205937/monsterwars/images/thumb/2/2c/Bone.png/50px-Bone.png" width="50" height="59" />':
iDragon = "https://images.wikia.nocookie.net/monsterwars/images/d/d6/Dragon3Icon.png";
break;
case '<img alt="Crystal.png" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/3/31/Crystal.png/50px-Crystal.png" width="50" height="64" />':
iDragon = "https://images.wikia.nocookie.net/monsterwars/images/8/8b/Dragon4Icon.png";
break;
default:
iDragon = "https://images.wikia.nocookie.net/monsterwars/images/3/37/Dragon1Icon.png";
}
$(document).ready(function(){
document.getElementById("navboxtroops").innerHTML = '<div class="navboxtroops"><span class="button" style="margin:0 auto;position: absolute;top: 20px;left: 246px;"><a href="/wiki/Forum:New_Navbox" style="color:#000; text-decoration:none;">Feedback/Help</a></span><a href="/wiki/Gremlin_miner" style="position:absolute; top: 80px; left: 375px;"><img id="Mini-Gremlin_Miner" src="https://images.wikia.nocookie.net/monsterwars/images/7/72/Gremlin_miner1Icon.png" alt="Gremlin miner" width="50px"></a><a href="/wiki/Catapult" style="position:absolute; top: 80px; left: 170px;"><img id="Mini-Catapult"src="https://images.wikia.nocookie.net/monsterwars/images/e/e5/Catapult1Icon.png" alt="Catapult" width="50px"></a><img src="https://images.wikia.nocookie.net/monsterwars/images/b/b1/Buttom_unreleased_unit.png" id="Unreleased" style="position: absolute; top: 170px; left: 508px;" onclick="changetabnavbox(\'unreleased\')"><div class="navboxtroopstab" id="navboxtroopstabactive">Units</div><div class="navboxtroopstab" onclick="changetabnavbox(\'neutral\')" style="margin-left:23px; margin-right:23px;">Neutral</div><div class="navboxtroopstab" onclick="changetabnavbox(\'heroes\')">Heroes</div><br><div id="popupnecro"><span style="font-weight:bold;">Units summoned by the Necromancer</span><br><a href="/wiki/Little_spidey"><img alt="Little spidey" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/5/56/Little_Spider.png/124px-Little_Spider.png" class="location-none"></a><a href="/wiki/Mummy"><img alt="Mummy" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/5/5f/MummyPortraitHD.png/86px-MummyPortraitHD.png" class="location-none"></a><br><a href="/wiki/Goblin"><img alt="Goblin" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/a/ac/Necrozombie.png/100px-Necrozombie.png" class="location-none"></a><a href="/wiki/Nether_Goblin"><img alt="Nether Goblin" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/d/d2/Goblin.png/100px-Goblin.png" class="location-none"></a><br><input type="button" value="Close" onclick="popupnecroClose()" style="margin:8px;"></div><div id="popuplich"><span style="font-weight:bold;">Units summoned by the Lich</span><br><a href="/wiki/Ghost"><img src="https://images.wikia.nocookie.net/monsterwars/images/a/ab/Ghost.png" class="location-none" alt="Ghost" /></a><br><a href="/wiki/Nether_Ghost"><img src="https://images.wikia.nocookie.net/monsterwars/images/thumb/f/f2/NetherGhost.png/120px-NetherGhost.png" class="location-none" alt="Nether Ghost" /></a><br><input type="button" value="Close" onclick="popuplichClose()" style="margin:8px;"></div><a href="/wiki/Skully"><img id="Skully" src="' + iSkully + '"></a><a href="/wiki/Dead_Knight"><img id="Dead_Knight" src="' + iKnight + '"></a><a href="/wiki/Skully_Archer"><img id="Skully_Archer" src="' + iArcher + '"></a><a href="/wiki/Zombie"><img id="Zombie" src="' + iZombie + '"></a><a href="/wiki/Imp"><img id="Imp" src="' + iImp + '"></a><br><a href="/wiki/Vamp"><img id="Vamp" src="' + iVamp + '"></a><a href="/wiki/Spidey"><img id="Spidey" src="' + iSpider + '"></a><a href="/wiki/Wolf"><img id="Wolf" src="' + iWolf + '"></a><a href="/wiki/Gargoyle"><img id="Gargoyle" src="' + iGargoyle + '"></a><a href="/wiki/Troll"><img id="Troll" src="' + iTroll + '"></a><br><a href="/wiki/Necromancer"><img id="Necromancer" src="' + iNecro + '"></a><div class="summonedbutton" style="bottom:92px; left:125px;" onclick="popupnecroOpen()">S</div><a href="/wiki/Medusa"><img id="Medusa" src="' + iMedusa + '"></a><a href="/wiki/Reap"><img id="Reap" src="' + iReap + '"></a><a href="/wiki/Lich"><img id="Lich" src="' + iLich + '"></a><div class="summonedbutton" style="bottom:92px; left:425px;" onclick="popuplichOpen()">S</div><a href="/wiki/Dragon"><img id="Dragon" src="' + iDragon + '"></a></div>';
});
}
 
function changetabnavbox(tabname){
switch(tabname){
case 'units':
document.getElementById("navboxtroops").innerHTML = '<div class="navboxtroops"><button style="margin:0 auto;position: absolute;top: 20px;left: 246px;"><a href="/wiki/Forum:New_Navbox" style="color:#000; text-decoration:none;">Feedback/Help</a></button><a href="/wiki/Gremlin_miner" style="position:absolute; top: 80px; left: 375px;"><img id="Mini-Gremlin_Miner" src="https://images.wikia.nocookie.net/monsterwars/images/7/72/Gremlin_miner1Icon.png" alt="Gremlin miner" width="50px"></a><a href="/wiki/Catapult" style="position:absolute; top: 80px; left: 170px;"><img id="Mini-Catapult"src="https://images.wikia.nocookie.net/monsterwars/images/e/e5/Catapult1Icon.png" alt="Catapult" width="50px"></a><img src="https://images.wikia.nocookie.net/monsterwars/images/b/b1/Buttom_unreleased_unit.png" id="Unreleased" style="position: absolute; top: 170px; left: 508px;" onclick="changetabnavbox(\'unreleased\')"><div class="navboxtroopstab" id="navboxtroopstabactive">Units</div><div class="navboxtroopstab" onclick="changetabnavbox(\'neutral\')" style="margin-left:23px; margin-right:23px;">Neutral</div><div class="navboxtroopstab" onclick="changetabnavbox(\'heroes\')">Heroes</div><br><div id="popupnecro"><span style="font-weight:bold;">Units summoned by the Necromancer</span><br><a href="/wiki/Little_spidey"><img alt="Little spidey" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/5/56/Little_Spider.png/124px-Little_Spider.png" class="location-none"></a><a href="/wiki/Mummy"><img alt="Mummy" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/5/5f/MummyPortraitHD.png/86px-MummyPortraitHD.png" class="location-none"></a><br><a href="/wiki/Goblin"><img alt="Goblin" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/a/ac/Necrozombie.png/100px-Necrozombie.png" class="location-none"></a><a href="/wiki/Nether_Goblin"><img alt="Nether Goblin" src="https://images.wikia.nocookie.net/monsterwars/images/thumb/d/d2/Goblin.png/100px-Goblin.png" class="location-none"></a><br><input type="button" value="Close" onclick="popupnecroClose()" style="margin:8px;"></div><div id="popuplich"><span style="font-weight:bold;">Units summoned by the Lich</span><br><a href="/wiki/Ghost"><img src="https://images.wikia.nocookie.net/monsterwars/images/a/ab/Ghost.png" class="location-none" alt="Ghost" /></a><br><a href="/wiki/Nether_Ghost"><img src="https://images.wikia.nocookie.net/monsterwars/images/thumb/f/f2/NetherGhost.png/120px-NetherGhost.png" class="location-none" alt="Nether Ghost" /></a><br><input type="button" value="Close" onclick="popuplichClose()" style="margin:8px;"></div><a href="/wiki/Skully"><img id="Skully" src="' + iSkully + '"></a><a href="/wiki/Dead_Knight"><img id="Dead_Knight" src="' + iKnight + '"></a><a href="/wiki/Skully_Archer"><img id="Skully_Archer" src="' + iArcher + '"></a><a href="/wiki/Zombie"><img id="Zombie" src="' + iZombie + '"></a><a href="/wiki/Imp"><img id="Imp" src="' + iImp + '"></a><br><a href="/wiki/Vamp"><img id="Vamp" src="' + iVamp + '"></a><a href="/wiki/Spidey"><img id="Spidey" src="' + iSpider + '"></a><a href="/wiki/Wolf"><img id="Wolf" src="' + iWolf + '"></a><a href="/wiki/Gargoyle"><img id="Gargoyle" src="' + iGargoyle + '"></a><a href="/wiki/Troll"><img id="Troll" src="' + iTroll + '"></a><br><a href="/wiki/Necromancer"><img id="Necromancer" src="' + iNecro + '"></a><div class="summonedbutton" style="bottom:92px; left:125px;" onclick="popupnecroOpen()">S</div><a href="/wiki/Medusa"><img id="Medusa" src="' + iMedusa + '"></a><a href="/wiki/Reap"><img id="Reap" src="' + iReap + '"></a><a href="/wiki/Lich"><img id="Lich" src="' + iLich + '"></a><div class="summonedbutton" style="bottom:92px; left:425px;" onclick="popuplichOpen()">S</div><a href="/wiki/Dragon"><img id="Dragon" src="' + iDragon + '"></a></div>';
break;
case 'neutral':
document.getElementById("navboxtroops").innerHTML = '<div class="navboxtroops"><button style="margin:0 auto;position: absolute;top: 20px;left: 246px;"><a href="/wiki/Forum:New_Navbox" style="color:#000; text-decoration:none;">Feedback/Help</a></button><img src="https://images.wikia.nocookie.net/monsterwars/images/b/b1/Buttom_unreleased_unit.png" id="Unreleased" style="position: absolute; top: 170px; left: 508px;" onclick="changetabnavbox(\'unreleased\')"><div class="navboxtroopstab" onclick="changetabnavbox(\'units\')">Units</div><div class="navboxtroopstab" style="margin-left:23px; margin-right:23px;" id="navboxtroopstabactive">Neutral</div><div class="navboxtroopstab" onclick="changetabnavbox(\'heroes\')">Heroes</div><br><table style="width:496px;height: 330px; color:#fff" cellspacing="0" border="0"><tbody><tr><th> Angry monsters</th><td><br><div class="center"><a href="/wiki/Imp"><img id="Angry_Imp" alt="Angry Imp" src="https://images.wikia.nocookie.net/monsterwars/images/a/a4/Imp3Portrait.png" width="100"></a></div></td><td><div class="center"><a href="/wiki/Medusa"><img id="Angry_Medusa" alt="Angry Medusa" src="https://images.wikia.nocookie.net/monsterwars/images/4/4f/Medusa3Portrait.png" width="80"></a></div></td></tr><tr><th> Catapults</th><td><div class="center"><a href="/wiki/Catapult"><img id="Catapult" alt="Catapult" src="https://images.wikia.nocookie.net/monsterwars/images/4/4e/Catapult1Portrait.png" width="90"></a></div></td><td><div class="center"><a href="/wiki/Hero_Catapult"><img id="Hero_Catapult" alt="Hero Catapult" src="https://images.wikia.nocookie.net/monsterwars/images/5/58/HeroCatapult1Portrait.png" width="90"></a></div></td></tr><tr><th> Neutral monsters</th><td><div class="center"><a href="/wiki/Snowbeast"><img id="Snowbeast" alt="Snowbeast" src="https://images.wikia.nocookie.net/monsterwars/images/6/65/Snowbeast2.png" width="100"></a></div></td><td><div class="center"><a href="/wiki/Tentacle"><img id="Tentacle" alt="Tentacle" src="https://images.wikia.nocookie.net/monsterwars/images/5/54/Tentacle.png" width="50"></a></div></td></tr></tbody></table></div>';
break;
case 'heroes':
document.getElementById("navboxtroops").innerHTML = '<div class="navboxtroops" style="padding-bottom:3px;"><button style="margin:0 auto;position: absolute;top: 20px;left: 246px;"><a href="/wiki/Forum:New_Navbox" style="color:#000; text-decoration:none;">Feedback/Help</a></button><img src="https://images.wikia.nocookie.net/monsterwars/images/b/b1/Buttom_unreleased_unit.png" id="Unreleased" style="position: absolute; top: 170px; left: 508px;" onclick="changetabnavbox(\'unreleased\')"><div class="navboxtroopstab" onclick="changetabnavbox(\'units\')" style="margin-bottom:0px;">Units</div><div class="navboxtroopstab" style="margin-left:23px; margin-right:23px; margin-bottom:0px;" onclick="changetabnavbox(\'neutral\')">Neutral</div><div class="navboxtroopstab" id="navboxtroopstabactive" style="margin-bottom:0px;">Heroes</div><table style="color:#fff; margin-left:60px;"><tr><th colspan="5" style="text-align:center;">Melee</th></tr><tr><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Miner" title="Miner"><img id="Miner" src="https://images.wikia.nocookie.net/monsterwars/images/3/33/MineyPortraitHD.png" alt="Miner" title="Miner" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Knight" title="Knight"><img id="Knight" src="https://images.wikia.nocookie.net/monsterwars/images/0/0a/Knighty1PortraitHD.png" alt="Knight" title="Knight" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Dwarf" title="Dwarf"><img id="Dwarf" src="https://images.wikia.nocookie.net/monsterwars/images/6/62/DwarfyPortraitHD.png" alt="Dwarf" title="Dwarf" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Golem" title="Golem"><img id="Golem" src="https://images.wikia.nocookie.net/monsterwars/images/8/85/GolemPortraitHD.png" alt="Golem" title="Golem" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Phoenix" title="Phoenix"><img id="MeleePhoenix" src="https://images.wikia.nocookie.net/monsterwars/images/8/8a/PhoenixPortraitHD.png" alt="Phoenix" title="Phoenix" class="location-none" width="70"></a></div></div></td></tr><tr><th colspan="5" style="text-align:center;">Mid range</th></tr><tr><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Faun" title="Faun"><img id="Faun" src="https://images.wikia.nocookie.net/monsterwars/images/5/57/FaunPortait-hd.png" alt="Faun" title="Faun" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Fairy" title="Fairy"><img id="Fairy" src="https://images.wikia.nocookie.net/monsterwars/images/0/07/FairyPortrait-hd.png" alt="Fairy" title="Fairy" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Unicorn" title="Unicorn"><img id="Unicorn" src="https://images.wikia.nocookie.net/monsterwars/images/1/16/UnicornPortraitHD.png" alt="Unicorn" title="Unicorn" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Healer" title="Healer"><img id="Healer" src="https://images.wikia.nocookie.net/monsterwars/images/6/65/HealerPortraitHD.png" alt="Healer" title="Healer" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Phoenix" title="Phoenix"><img id="MidRangePhoenix" src="https://images.wikia.nocookie.net/monsterwars/images/8/8a/PhoenixPortraitHD.png" alt="Phoenix" title="Phoenix" class="location-none" width="70"></a></div></div></td></tr><tr><th colspan="5" style="text-align:center;">Long range</th></tr><tr><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Wizard" title="Wizard"><img id="Wizard" src="https://images.wikia.nocookie.net/monsterwars/images/f/fd/WizardPortraitHD.png" alt="Wizard" title="Wizard" class="location-none" width="70"></a></div></div></td><td><div class="center"><div style="width:70px;"><a class="internal" href="/wiki/Elf" title="Elf"><img id="Elf" src="https://images.wikia.nocookie.net/monsterwars/images/e/e4/ElfyPortrait.png" alt="Elf" title="Elf" class="location-none" width="70"></a></div></div></td></tr></table></div></div>';
break;
case 'unreleased':
document.getElementById("navboxtroops").innerHTML = '<div class="navboxtroops"><button style="margin:0 auto;position: absolute;top: 20px;left: 246px;"><a href="/wiki/Forum:New_Navbox" style="color:#000; text-decoration:none;">Feedback/Help</a></button><img src="https://images.wikia.nocookie.net/monsterwars/images/b/b1/Buttom_unreleased_unit.png" id="Unreleased" style="position: absolute; top: 170px; left: 508px;"><div class="navboxtroopstab" onclick="changetabnavbox(\'units\')">Units</div><div class="navboxtroopstab" onclick="changetabnavbox(\'neutral\')" style="margin-left:23px; margin-right:23px;">Neutral</div><div class="navboxtroopstab" onclick="changetabnavbox(\'heroes\')">Heroes</div><br><table style="color:#fff; margin-left:90px; text-align:center"><tr><th colspan="3">Units</th></tr><tr><td colspan="3"><div class="center"><div style="width:100px;"><a class="internal" href="/wiki/Cerberus" title="Cerberus"><img id="Cerberus" src= "https://images.wikia.nocookie.net/monsterwars/images/4/45/Cerberus.png" alt="Cerberus" title="Cerberus" class="location-none" width="100" /></a></div></div></td><tr><th colspan="3">Heroes</th></tr><tr><td><div class="center"><div style="width:100px;"><a class="internal" href="/wiki/Centaur" title="Centaur"><img id="Centaur" src= "https://images.wikia.nocookie.net/monsterwars/images/d/d4/Centaur_tier_1.png" alt="Centaur" title="Centaur" class="location-none" width="100" /></a></div></div></td><td><div class="center"><div style="width:100px;"><a class="internal" href="/wiki/Tree_Sprite" title="Tree Sprite"><img id="TreeSprite" src= "https://images.wikia.nocookie.net/monsterwars/images/9/9f/Tree_Sprite_Tier_1.png" alt="Tree Sprite" title="Tree Sprite" class="location-none" width="100" /></a></div></div></td><td><div class="center"><div style="width:100px;"><a class="internal" href="/wiki/Rogue" title="Rogue"><img id="Rogue" src= "https://images.wikia.nocookie.net/legendarywars/images/e/ef/RogueAssassinPortraitHD.png" alt="Rogue" title="Rogue" class="location-none" width="100" /></a></div></div></td></tr></table></div></div>';
document.getElementById("Unreleased").style.opacity = "1";
break;
}
}
function popupnecroOpen(){
document.getElementById("popupnecro").style.display = "inline-block";
}
function popuplichOpen(){
document.getElementById("popuplich").style.display = "inline-block";
}
function popupnecroClose(){
document.getElementById("popupnecro").style.display = "none";
}
function popuplichClose(){
document.getElementById("popuplich").style.display = "none";
}