/* WinCalc UI (site install) */
(function () {
var page = mw.config.get("wgPageName");
var allowedPages = {
"Tools:S4ProbCalc": true,
"User:Jericho792/sandbox": true // keep this if you want to keep testing
};
if (!allowedPages[page]) return;

mw.loader.using("mediawiki.api", function () {
function init() {
var mount = document.getElementById("wincalc-ui");
if (!mount) return;

var api = new mw.Api();

var HEROES = [
"Archer","Archon","Armadillo","Arrowheart","Assassin","Avenger","Banshee","Barbarian",
"Berserker","Blacksmith","Blaze","Bloodbite","Bomber","Catomancer","Champion","Cultist",
"Dancing Dragon","Dionel","Drakeling","Druid","Enchantress","Farmer","Frog Mystic","Frost Fox",
"Gargoyle","Genie","Giant","Glacyo","Goblin","Golem","Griffin","Huntress","Ice Queen","Jaguar",
"Jawsome","Klausy","Knight","Kong","Mice Bandits","Monkey King","Mummy","Naga","Orc","Paladin",
"Phoenix","Pirate","Priest","Puppet Master","Ragnar","Robot","Rocketeer","Satyr","Scarecrow",
"Sentinel","Shadow Cleric","Shaman","Skeleton","Slime","Sorceress","Spellwing","Striker",
"Thunder Idol","Thunderpaws","Treant","Vampire","Warlord","Warrior","Werewolf","Wizard",
"Wraith","Yeti","Zombie"
];

function el(tag, attrs, children) {
var node = document.createElement(tag);
attrs = attrs || {};
children = children || [];

Object.keys(attrs).forEach(function (k) {
var v = attrs[k];
if (k === "class") node.className = v;
else if (k === "html") node.innerHTML = v;
else node.setAttribute(k, v);
});

children.forEach(function (c) {
node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
});

return node;
}

function heroSelect(id) {
var s = el("select", { id: id, class: "wincalc-select" });
s.appendChild(new Option("— Select —", ""));
HEROES.forEach(function (h) { s.appendChild(new Option(h, h)); });
return s;
}

function levelSelect(id) {
var s = el("select", { id: id, class: "wincalc-level" });
for (var lv = 1; lv <= 25; lv++) s.appendChild(new Option(String(lv), String(lv)));
s.value = "10";
return s;
}

function buildTemplateCall(state) {
var lines = [
"WinCalc",
"|a1=" + state.a1 + "|al1=" + state.al1,
"|a2=" + state.a2 + "|al2=" + state.al2,
"|a3=" + state.a3 + "|al3=" + state.al3,
"|a4=" + state.a4 + "|al4=" + state.al4,
"|b1=" + state.b1 + "|bl1=" + state.bl1,
"|b2=" + state.b2 + "|bl2=" + state.bl2,
"|b3=" + state.b3 + "|bl3=" + state.bl3,
"|b4=" + state.b4 + "|bl4=" + state.bl4,
"|dmgW=" + state.dmgW,
"|scale=" + state.scale,
"|model=ability",
"|debug=0", // <-- production default
""
];
return lines.join("\n");
}

var state = {
a1:"",al1:"10",a2:"",al2:"10",a3:"",al3:"10",a4:"",al4:"10",
b1:"",bl1:"10",b2:"",bl2:"10",b3:"",bl3:"10",b4:"",bl4:"10",
dmgW:"4", scale:"1800"
};

var ui = el("div", {
class: "wincalc-ui",
style: "border:1px solid #ddd; padding:12px; border-radius:10px; max-width:760px;"
});

var title = el("div", { style: "font-weight:700; margin-bottom:8px;" },
["Smashing Four Win Probability Calculator"]);

var hint = el("div", { style: "color:#666; font-size:12px; margin-bottom:10px;" },
["Select heroes & levels. When all 8 heroes are selected, results render below."]);

var preview = el("div",{style:"margin-top:12px;"});
var status = el("div",{style:"color:#666;font-size:12px;margin-top:6px;"});

function enforceUniqueOnTeam(teamLabel, changedId) {
var ids = [teamLabel + "1", teamLabel + "2", teamLabel + "3", teamLabel + "4"];
var seen = Object.create(null);

for (var i = 0; i < ids.length; i++) {
var id = ids[i];
var val = state[id];
if (!val) continue;

if (seen[val]) {
state[changedId] = "";
var sel = document.getElementById(changedId);
if (sel) sel.value = "";
status.textContent = "Duplicate hero on the same team is not allowed.";
return false;
}
seen[val] = true;
}
return true;
}

function row(teamLabel, idx) {
var hId = teamLabel + idx;
var lId = teamLabel + "l" + idx;

var h = heroSelect(hId);
var l = levelSelect(lId);

h.addEventListener("change", function () {
state[hId] = h.value;
if (!enforceUniqueOnTeam(teamLabel, hId)) return;
refresh();
});

l.addEventListener("change", function () { state[lId] = l.value; refresh(); });

var ord = ["1st","2nd","3rd","4th"];
var label = el("div", { style: "width:90px; font-weight:600;" }, [ord[idx-1]]);

return el("div", { style: "display:flex; gap:10px; align-items:center; margin:6px 0;" }, [
label,
el("div", { style: "flex:1;" }, [h]),
el("div", { style: "width:120px; display:flex; gap:8px; align-items:center;" }, [
el("span", { style: "color:#666; font-size:12px;" }, ["Lv"]),
l
])
]);
}

var controls = el("div", { style: "display:flex; gap:24px; flex-wrap:wrap;" }, [
el("div", { style: "min-width:320px; flex:1;" }, [
el("div", { style: "font-weight:700; margin:6px 0;" }, ["Your Team"]),
row("a",1),row("a",2),row("a",3),row("a",4)
]),
el("div", { style: "min-width:320px; flex:1;" }, [
el("div", { style: "font-weight:700; margin:6px 0;" }, ["Enemy Team"]),
row("b",1),row("b",2),row("b",3),row("b",4)
])
]);

var dmgW = el("input", { type:"number", value:state.dmgW, min:"0", step:"0.5", style:"width:90px;" });
var scale = el("input", { type:"number", value:state.scale, min:"100", step:"50", style:"width:110px;" });

dmgW.addEventListener("input",function(){ state.dmgW=dmgW.value; refresh(); });
scale.addEventListener("input",function(){ state.scale=scale.value; refresh(); });

var settings = el("div", { style:"margin-top:10px; display:flex; gap:16px; align-items:center; flex-wrap:wrap;" }, [
el("div", { style:"display:flex; gap:8px; align-items:center;" }, [
el("span", { style:"color:#666; font-size:12px;" }, ["dmgW"]),
dmgW
]),
el("div", { style:"display:flex; gap:8px; align-items:center;" }, [
el("span", { style:"color:#666; font-size:12px;" }, ["scale"]),
scale
])
]);

ui.appendChild(title);
ui.appendChild(hint);
ui.appendChild(controls);
ui.appendChild(settings);
ui.appendChild(preview);
ui.appendChild(status);
mount.appendChild(ui);

var lastReq = 0;

function refresh() {
var wt = buildTemplateCall(state);

var required = ["a1","a2","a3","a4","b1","b2","b3","b4"];
for (var i=0;i<required.length;i++) {
if(!state[required[i]]) {
preview.innerHTML="";
status.textContent="Select all 8 heroes to render the result.";
return;
}
}

status.textContent="Rendering…";
var myReq=++lastReq;

api.post({
action:"parse",
format:"json",
contentmodel:"wikitext",
text:wt,
disablelimitreport:1
}).done(function(data){
if(myReq!==lastReq) return;
var html="";
if(data && data.parse && data.parse.text && data.parse.text["*"]) {
html=data.parse.text["*"];
}
preview.innerHTML=html;
status.textContent="";
}).fail(function(){
if(myReq!==lastReq) return;
status.textContent="Render failed.";
});
}

status.textContent = "Select all 8 heroes to render the result.";

// Optional: pull hero list from Lua (your original behavior)
api.post({
action: "parse",
format: "json",
contentmodel: "wikitext",
text: "#invoke:HeroData|heroList",
disablelimitreport: 1
}).done(function (data) {
try {
var html = data.parse.text["*"];
var list = html.replace(/<[^>]+>/g, "").trim();
var dyn = list.split("|");
if (dyn && dyn.length > 0) HEROES = dyn;
} catch (e) {}
// repopulate
var selects = ui.querySelectorAll("select.wincalc-select");
selects.forEach(function (s) {
var current = s.value;
while (s.options.length) s.remove(0);
s.appendChild(new Option("— Select —", ""));
HEROES.forEach(function (h) { s.appendChild(new Option(h, h)); });
if (current && HEROES.indexOf(current) !== -1) s.value = current;
});
});
}

// ensure DOM is ready (Common.js can run early)
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
});
})();