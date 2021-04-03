var creatureKillXPDiv = null;
var creatureKillXPResultEl = null;

if (creatureKillXPDiv = document.getElementById('creatureKillXP')) {
  if (creatureKillXPDiv.dataset.basexp) {
    creatureKillXPDiv.innerHTML = 'Уровень <input type="number" min="1" max="999999" maxlength="6" value="1" onchange="creatureKillXPResultEl.innerHTML = updateXPLevel(' + creatureKillXPDiv.dataset.basexp + ', this.value)" style="width:3.5em">: <span id="creatureKillXPResult"></span>';
    creatureKillXPResultEl = document.getElementById('creatureKillXPResult');
    creatureKillXPResultEl.innerHTML = updateXPLevel(creatureKillXPDiv.dataset.basexp, 1);
  }
}

function updateXPLevel(baseXP, level) {
  return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
}