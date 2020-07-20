if (window.location.pathname == "/wiki/User_blog:Cbkguy/Test" ||window.location.pathname == "/wiki/User_blog:Cbkguy/Calculator") {
userinput.innerHTML = '<tr><td colspan="2" id="output"><p id="equation"></p><p id="calcoutput"></p> </td></tr><tr><td class="input" id="inputname1"></td><td class="forminput" id="inputtd1"><input type="text" id="input1"></td></tr><tr><td class="input" id="inputname2"></td><td class="forminput" id="inputtd2"><input type="text" id="input2"></td></tr><tr><td class="input" id="inputname3"></td><td class="forminput" id="inputtd3"><input type="text" id="input3"></td></tr><td class="input" id="inputname4"></td><td class="forminput" id="inputtd4"><input type="radio" id="input4a" name="gifted" value="isgifted"><label for="isgifted">Yes</label><br><input type="radio" id="input4b" name="gifted" value="notgifted"><label for="notgifted">No</label><br></td></tr><tr><td class="input" id="inputname5"></td><td class="forminput" id="inputtd5"><input type="radio" id="input5a" name="mutated" value="ismutated"><label for="ismutated">Yes</label><br><input type="radio" id="input5b" name="mutated" value="notmutated"><label for="notmutated">No</label><br></td></tr><tr><td class="input" id="inputname6"></td><td class="forminput" id="inputtd6"><input type="radio" id="input6a" name="mutation" value="percentattack"><label for="percentattack">% Attack</label><br><input type="radio" id="input6b" name="mutation" value="attack"><label for="attack">+ Attack</label><br><input type="radio" id="input6c" name="mutation" value="percentconvert"><label for="percentconvert">% Convert</label><br><input type="radio" id="input6d" name="mutation" value="convert"><label for="convert">+ Convert</label><br><input type="radio" id="input6e" name="mutation" value="percentcollect"><label for="percentcollect">% Gather</label><br><input type="radio" id="input6f" name="mutation" value="collect"><label for="collect">+ Gather</label><br><input type="radio" id="input6g" name="mutation" value="energy"><label for="energy">Energy</label><br><input type="radio" id="input6h" name="mutation" value="ability"><label for="ability">Ability Rate</label><br></td></tr><tr><td class="input" id="inputname7"></td><td class="forminput" id="inputtd7"><input type="text" id="input7"></td></tr><tr><td class="input" id="clearhide"><input type="submit" value="Clear" id="clearbutton"></td><td id="submithide" class="input"><input id="submitbutton" value="=" type="submit"></td></tr>';
document.getElementById("submitbutton").addEventListener("click", filter);
function filter() {
   var text1 = input1.value;
   var text1 = text1.replace(/[^0-9a-zA-Z ]/g, "");
   var text2 = input2.value;
   var text2 = text2.replace(/[^0-9a-zA-Z ]/g, "");
   var text3 = input3.value;
   var text3 = text3.replace(/[^0-9a-zA-Z ]/g, "");
   var text4 = input7.value;
   var text4 = text4.replace(/[^0-9a-zA-Z ]/g, "");
   input1.value = text1;
   input2.value = text2;
   input3.value = text3;
   input7.value = text4;
} 
function settable() {
userinput.style.display = "";
inputname1.style.display = "";
inputtd1.style.display = "";
inputname2.style.display = "";
inputtd2.style.display = "";
clearhide.style.display = "";
submithide.style.display = "";
equation.textContent = "";
calcoutput.textContent = "";
input1.value = "";
input2.value = "";
inputname3.style.display = "none";
inputtd3.style.display = "none";
inputname4.style.display = "none";
inputtd4.style.display = "none";
inputname5.style.display = "none";
inputtd5.style.display = "none";
inputname6.style.display = "none";
inputtd6.style.display = "none";
input4a.checked = false;
input4b.checked = false;
input5a.checked = false;
input5b.checked = false;
input6a.checked = false;
input6b.checked = false;
input6c.checked = false;
input6d.checked = false;
input6f.checked = false;
input6g.checked = false;
input6h.checked = false;
input7.value = "";
inputname7.style.display = "none";
inputtd7.style.display = "none";
}
function stattable() {
userinput.style.display = "";
inputname1.style.display = "";
inputtd1.style.display = "";
inputname2.style.display = "";
inputtd2.style.display = "";
clearhide.style.display = "";
submithide.style.display = "";
equation.textContent = "";
calcoutput.textContent = "";
input1.value = "";
input2.value = "";
inputname4.style.display = "";
inputtd4.style.display = "";
inputname5.style.display = "";
inputtd5.style.display = "";
input7.value = "";
}
clearbutton.addEventListener("click", function() {
input1.value = "";
input2.value = "";
input3.value = "";
calcoutput.textContent = "";
equation.textContent = "";
input4a.checked = false;
input4b.checked = false;
input5a.checked = false;
input5b.checked = false;
input6a.checked = false;
input6b.checked = false;
input6c.checked = false;
input6d.checked = false;
input6f.checked = false;
input6g.checked = false;
input6h.checked = false;
input7.value = "";
 
});
goocalc.addEventListener("click", function() {
settable();

inputname1.textContent = "Amount of pollen collected";
inputname2.textContent = "Number of flowers in the puddle";
submitbutton.addEventListener("click", function() {
var goopollen = input1.value;
var goopuddle = input2.value;
var goohoney = goopollen * (Math.sqrt(goopuddle / 200));
document.getElementById("equation").innerHTML = goopollen + "√(" + goopuddle + "/200)";
document.getElementById("calcoutput").textContent = Math.round(goohoney) + " bonus honey";
});
});
 
statcalc.addEventListener("click", function() {
stattable();
inputname3.style.display = "none";
inputtd3.style.display = "none";
inputname6.style.display = "none";
inputname7.style.display = "none";
inputtd7.style.display = "none";    
inputtd6.style.display = "none";
inputname1.textContent = "Name of the bee";
inputname2.textContent = "Level of the bee";
inputname4.textContent = "Gifted?";
inputname5.textContent = "Mutated?";
var basic = {collect:2.5, convert:20, energy:20, speed:14, attack:1};
var brave = {collect:2.5, convert:50, energy:30, speed:16.8, attack:5};
var hasty = {collect:3.33, convert:26.67, energy:20, speed:19.6, attack:1};
var bomber = {collect:2.5, convert:30, energy:20, speed:15.4, attack:2};
var bumble = {collect:4.5, convert:20, energy:40, speed:10.5, attack:1};
var cool = {collect:3.33, convert:30, energy:20, speed:14, attack:2};
var looker = {collect:3.25, convert:40, energy:20, speed:14, attack:1};
var rad = {collect:3.25, convert:26.67, energy:20, speed:14, attack:1};
var rascal = {collect:2.5, convert:20, energy:	20, speed:16.1, attack:3};
var stubborn = {collect:2.5, convert:26.67, energy:20, speed:11.9, attack:2};
var bubble = {collect:2.5, convert:40, energy:20, speed:11.9, attack:3};
var bucko = {collect:3.75, convert:26.67, energy:20, speed:15.4, attack:3};
var commander = {collect:3.75, convert:20, energy:30, speed:14, attack:4};
var demo = {collect:2.5, convert:50, energy:20, speed:16.8, attack:3};
var exhausted = {collect:2.17, convert:20, energy:Infinity, speed:10.5, attack:1};
var fire = {collect:3, convert:20, energy:20, speed:11.9, attack:4};
var frosty = {collect:2.5, convert:20, energy:35, speed:14, attack:2};
var honey = {collect:2.5, convert:180, energy:20, speed:14, attack:1};
var rage = {collect:2.5, convert:20, energy:20, speed:15.4, attack:4};
var riley = {collect:5, convert:30, energy:25, speed:15.4, attack:3};
var shocked = {collect:2.5, convert:40, energy:20, speed:19.6, attack:2};
var baby = {collect:2, convert:16, energy:15, speed:10.5, attack:0};
var carpenter = {collect:3.33, convert:30, energy:25, speed:11.2, attack:4};
var demon = {collect:8.75, convert:20, energy:20, speed:10.5, attack:6};
var diamond = {collect:2.5, convert:250, energy:20, speed:14, attack:1};
var lion = {collect:5, convert:80, energy:60, speed:19.6, attack:8};
var music = {collect:4, convert:60, energy:20, speed:16.1, attack:1};
var ninja = {collect:5, convert:26.67, energy:20, speed:21, attack:3};
var shy = {collect:5, convert:70, energy:40, speed:19.6, attack:1};
var fuzzy = {collect:16.66, convert:6.66, energy:50, speed:11.9, attack:3};
var spicy = {collect:2.5, convert:100, energy:20, speed:14, attack:5};
var tadpole = {collect:1.67, convert:30, energy:10, speed:11.2, attack:0.5};
var vector = {collect:4.5, convert:52.94, energy:35.6, speed:16.24, attack:5};
var bear = {collect:7.5, convert:100, energy:35, speed:14, attack:5};
var cobalt = {collect:2.5, convert:40, energy:35, speed:18.2, attack:6};
var crimson = {collect:2.5, convert:40, energy:35, speed:18.2, attack:6};
var festive = {collect:10, convert:150, energy:20, speed:16.1, attack:1};
var gummy = {collect:2.5, convert:175, energy:50, speed:14, attack:3};
var photon = {collect:10, convert:120, energy:Infinity, speed:21, attack:3};
var tabby = {collect:2.5, convert:53.33, energy:28, speed:17.5, attack:4};
var puppy = {collect:6.25, convert:45, energy:40, speed:16.1, attack:2};
var vicious = {collect:2.5, convert:20, energy:50, speed:17.5, attack:7};
var windy = {collect:3.33, convert:40, energy:20, speed:19.6, attack:3};
var beenameinput = "";
var gifted = "";
var mutated = "";
var beename = "";
var beestats = "";
var isbaby = "";
var istabby = "";
function checkbee() {
    var beename = input1.value.toLowerCase();
    if (beename === "tabby bee"||beename ==="tabby") {
        input3.style.display = "";
        inputtd3.style.display = "";
        inputname3.style.display = "";
        inputname3.textContent = "Tabby Love";
    }
    else {
        input3.style.display = "none";
        inputtd3.style.display = "none";
        inputname3.style.display = "none";
    }
    if (input5a.checked === true) {
        inputname6.style.display = "";
        inputtd6.style.display = "";
        inputname6.textContent = "Mutation Type";
        inputname7.style.display = "";
        inputtd7.style.display = "";
        inputname7.textContent = "Mutation percent/amount"
    }
    else {
        inputname6.style.display = "none";
        inputtd6.style.display = "none";
    }
}
submitbutton.addEventListener("click", function() {
var beenameinput = input1.value.toLowerCase();
switch (beenameinput) {
case "basic bee":
case "basic":
beename = basic;
break;
case "brave bee":
case "brave":
beename = brave;
break;
case "bomber bee":
case "bomber":
beename = bomber;
break;
case "hasty bee":
case "hasty":
beename = hasty;
break;
case "bumble bee":
case "bumble":
beename = bumble;
break;
case "looker bee":
case "looker":
beename = looker;
break;
case "cool bee":
case "cool":
beename = cool;
break;
case "rad bee":
case "rad":
beename = rad;
break;
case "rascal bee":
case "rascal":
beename = rascal;
break;
case "stubborn bee":
case "stubborn":
beename = stubborn;
break;
case "bubble bee":
case "bubble":
beename = bubble;
break;
case "bucko bee":
case "bucko":
beename = bucko;
break;
case "commander bee":
case "commander":
beename = commander;
break;
case "demo bee":
case "demo":
beename = demo;
break;
case "exhausted bee":
case "exhausted":
beename = exhausted;
break;
case "fire bee":
case "fire":
beename = fire;
break;
case "frosty bee":
case "frosty":
beename = frosty;
break;
case "honey bee":
case "honey":
beename = honey;
break;
case "rage bee":
case "rage":
beename = rage;
break;
case "riley bee":
case "riley":
beename = riley;
break;
case "shocked bee":
case "shocked":
beename = shocked;
break;
case "baby bee":
case "baby":
beename = baby;
isbaby = true;
break;
case "carpenter bee":
case "carpenter":
beename = carpenter;
break;
case "demon bee":
case "demon":
beename = demon;
break;
case "diamond bee":
case "diamond":
beename = diamond;
break;
case "lion bee":
case "lion":
beename = lion;
break;
case "music bee":
case "music":
beename = music;
break;
case "ninja bee":
case "ninja":
beename = ninja;
break;
case "shy bee":
case "shy":
beename = shy;
break;
case "fuzzy bee":
case "fuzzy":
beename = fuzzy;
break;
case "spicy bee":
case "spicy":
beename = spicy;
break;
case "tadpole bee":
case "tadpole":
beename = tadpole;
break;
case "vector bee":
case "vector":
beename = vector;
break;
case "bear bee":
case "bear":
beename = bear;
break;
case "cobalt bee":
case "cobalt":
beename = cobalt;
case "crimson bee":
case "crimson":
beename = crimson;
case "festive bee":
case "festive":
beename = festive;
break;
case "gummy bee":
case "gummy":
beename = gummy;
break;
case "photon bee":
case "photon":
beename = photon;
break;
case "puppy bee":
case "puppy":
beename = puppy;
break;
case "tabby bee":
case "tabby":
beename = tabby;
istabby = true;
break;
case "windy bee":
case "windy":
beename = windy;
break;
case "vicious bee":
case "vicious":
beename = vicious;
break;
default:
continueprompt = false;
}
if (continueprompt != false) {
var beelevel = input2.value;
var beecollect = beename.collect;
var beeconvert = beename.convert;
var beeenergy = beename.energy;
var beespeed = beename.speed;
var beeattack = beename.attack;
for (i = 1; i < beelevel; i++) {
var beecollect = beecollect + beename.collect * 0.06;
var beeconvert = beeconvert + beename.convert * 0.1;
var beeenergy = beeenergy + beename.energy * 0.05;
var beespeed = beespeed + beename.speed * 0.03;
var beecollect = Math.round(beecollect * 100) / 100;
var beeconvert = Math.round(beeconvert * 100) / 100;
var beeenergy = Math.round(beeenergy * 100) / 100;
var beespeed = Math.round(beespeed * 100) / 100;
}
var tabbylove = input3.value;
if (tabbylove != null) {
    var beecollect = beecollect + beecollect * (tabbylove/100);
    var beeconvert = beeconvert + beeconvert * (tabbylove/100);
}
if (input4a.checked === true) {
var beecollect = beecollect * 1.5;
var beeconvert = beeconvert * 1.5;
var beeattack = beeattack * 1.5;
}
 
if (input5a.checked === true) {
if (input6a.checked === true){
    var beeattack = beeattack * (1 + (input7.value/100));
}
if (input6b.checked === true){
    var beeattack = beeattack + input7.value;
}
if (input6c.checked === true){
    var beeconvert = beeconvert * (1 + (input7.value/100));
}
if (input6d.checked === true){
    var beeconvert = beeconvert + input7.value;
}
if (input6e.checked === true){
    var beecollect = beecollect * (1 + (input7.value/100));
}
if (input6f.checked === true){
    var beecollect = beecollect + input7.value;
}
if (input6g.checked === true){
    var beenergy = beeenergy * (1 + (input7.value/100));
}
}
var beecollect = Math.round(beecollect * 100) / 100;
var beeconvert = Math.round(beeconvert * 100) / 100;
var beeenergy = Math.round(beeenergy * 100) / 100;
var beeattack = Math.round(beeattack);
if (isbaby === true) {
    beeattack = 0;
}
var beestats = "<table class='calcoutput'><tr><th class='calcoutput'>Collect amount per second</th><th class='calcoutput'>Convert amount per second</th><th class='calcoutput'>Energy</th><th class='calcoutput'>Speed</th><th class='calcoutput'>Attack</th></tr><tr><td class='calcoutput'>" + beecollect + " pollen</td><td class='calcoutput'>" + beeconvert + " honey</td><td class='calcoutput'>" + beeenergy + "</td><td class='calcoutput'>" + beespeed + "</td><td class='calcoutput'>" + beeattack + "</td></tr></table>"
document.getElementById("calcoutput").innerHTML = beestats;
}
});
});
hitcalc.addEventListener("click", function() {
settable();
inputname1.textContent = "Bee level";
inputname2.textContent = "Mob level";
inputname3.style.display = "none";
inputtd3.style.display = "none";
inputname4.style.display = "none";
inputtd4.style.display = "none";
submitbutton.addEventListener("click", function() {
var beelevel = input1.value;
var moblevel = input2.value;
var hitchance = 100 * (1 / (1 + (moblevel - beelevel)));
if (hitchance > 100||hitchance < 0) {
var hitchance = 100;
}
document.getElementById("equation").textContent = "(1 / (1 + (" + moblevel + " - " + beelevel + ")";
document.getElementById("calcoutput").textContent = hitchance + "% chance for attack to hit";
});
});
 
rjcalc.addEventListener("click", function() {
settable();
inputname1.textContent = "Number of royal jellies";
inputname2.textContent = "Current price for 1 royal jelly";
submitbutton.addEventListener("click", function() {
var rjamount = input1.value;
var currentrjcost = input2.value;
var currentrjcost = currentrjcost - 0;
var rjamount = rjamount - 0;
if (currentrjcost >= 1000000) {
var rjcost = 1000000 * rjamount;
}
else {
var rjbought = ((currentrjcost - 250000) / 10000);
var rjcost = rjbought * 10000 + 250000;
if (rjamount + rjbought > 75) {
console.log(rjamount)
var rjamount1 = 75 - rjbought;
var rjamount = rjamount - rjamount1;
var rjcost = rjamount1 / 2 * (2 * rjcost + (rjamount1 - 1) * 10000);
var rjcost = rjcost + (1000000 * rjamount);
}
else {
var rjcost = rjamount / 2 * (2 * rjcost + (rjamount - 1) * 10000);
}
}
document.getElementById("calcoutput").textContent = rjcost + " honey";
 
});
});
starjelly.addEventListener("click", function() {
settable();
equation.textContent = "";
inputname1.style.display = "none";
inputtd1.style.display = "none";
inputname2.style.display = "none";
inputtd2.style.display = "none";
inputname3.style.display = "none";
inputtd3.style.display = "none";
submithide.style.display = "none";
clearhide.style.display = "none";
inputname4.style.display = "none";
inputtd4.style.display = "none";
document.getElementById("starjelly").textContent = "Use another";
var sjnum = Math.floor(Math.random() * 25000) + 1;
if (sjnum == 1) {
    sjbee = "Gifted Vector Bee!!!!";
}
if (sjnum > 1 && 250 > sjnum) {
    sjbee =  "Gifted Baby Bee!!!";
}
if (sjnum > 250 && sjnum < 1000) {
    var epicbees = ["Gifted Honey Bee!!", "Gifted Shocked Bee!!", "Gifted Riley Bee!!", "Gifted Frosty Bee!!", "Gifted Fire Bee!!", "Gifted Bucko Bee!!"];
    var epicbee = epicbees[Math.floor(Math.random() * 6)]
    sjbee = epicbee;
}
if (sjnum > 1000 && sjnum < 15000) {
    var rarebees = ["Gifted Bomber Bee!", "Gifted Brave Bee!", "Gifted Cool Bee!", "Gifted Hasty Bee!", "Gifted Looker Bee!", "Gifted Rad Bee!", "Gifted Stubborn Bee!", "Gifted Rascal Bee!"];
    var rarebee = rarebees[Math.floor(Math.random() * 8)];
    sjbee = rarebee;
}
if (sjnum > 10000) {
    sjbee = "Gifted Bumble Bee!";
}
document.getElementById("calcoutput").textContent = "You got a " + sjbee;
setTimeout(resetcalc, 500)
 
 
 
});
}