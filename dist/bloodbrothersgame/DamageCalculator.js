function attackerSelected(selectedFam)
{
   // retrieve attacker list of skills 
   var skill = document.getElementById("Skill");

   // remove current set of options
   while (skill.length > 0) {
     skill.remove(skill.length-1);
   } 

   // add new set
   var option = document.createElement("option");
   option.text = "Auto";

   skill.add(option);
}

function fillDefaultEntries()
{
   var attackType = document.getElementById("AttackType");
   var attackTypeSelect = "" + 
"<option value=\"1.5\">AO</option>" + 
"<option value=\"1\">Standard</option>";
   attackType.innerHTML = attackTypeSelect;

   // fill possible titles
   var titleSelect = "" +
"<option value=\"1.0\">1.0</option>" +
"<option value=\"1.01\">1.01</option>" +
"<option value=\"1.02\">1.02</option>" +
"<option value=\"1.03\">1.03</option>" +
"<option value=\"1.04\">1.04</option>" +
"<option value=\"1.05\">1.05</option>" +
"<option value=\"1.06\">1.06</option>" +
"<option value=\"1.1\">1.1</option>" +
"<option value=\"1.12\">1.12</option>" +
"<option value=\"1.14\">1.14</option>" +
"<option value=\"1.16\">1.16</option>" +
"<option value=\"1.18\">1.18</option>" +
"<option value=\"1.2\">1.2</option>" +
"<option value=\"1.25\">1.25</option>" +
"<option value=\"1.3\">1.3</option>" +
"<option value=\"1.4\">1.4</option>";

   var attackerTitle = document.getElementById("AttackerTitle");
   attackerTitle.innerHTML = titleSelect;
   var defenderTitle = document.getElementById("DefenderTitle");
   defenderTitle.innerHTML = titleSelect;

   // fill position 
   var positionSelect = "" +
"<option value=\"0.8\">Rear</option>" + 
"<option value=\"1\">Middle</option>" + 
"<option value=\"1.2\">Front</option>";

   var attackerPosition = document.getElementById("AttackerPosition");
   attackerPosition.innerHTML = positionSelect;
   var defenderPosition = document.getElementById("DefenderPosition");
   defenderPosition.innerHTML = positionSelect;
}

function fillSelect() 
{
  var a = document.getElementById("Attacker");
  a.innerHTML = sessionStorage.famSelect;
 
  var b = document.getElementById("Defender");
  b.innerHTML = sessionStorage.famSelect;
}

document.ready = function()
{
//  sessionStorage.famJSON = ""; // force cache cleanup
  fillDefaultEntries();
  readFamiliarsInfo(fillSelect);
 
  var f = document.getElementById("calculate");
  f.style.visibility = "visible";
  f.style.display = "";
};