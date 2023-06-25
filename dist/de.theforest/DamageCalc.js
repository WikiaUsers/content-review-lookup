// Dies ist ein Schadens Rechner, welcher berechnet wie viel % an Bonus Schaden der Spieler erhält, basierend auf seiner Stärke. Es kann auf der „https://theforest.fandom.com/de/Stärke“ Seite gefunden werden.
// Made by https://theforest.fandom.com/User:Daveyg103.

mw.hook('wikipage.content').add(function() {
	'use strict';
	var damageCalc = document.getElementById('damageCalc');
	if (!damageCalc) return;
	damageCalc.innerHTML = '<div id="dmgCalcContainer">' +
		'<p>Gib deine Stärke ein</p>' +
		'<input id="str" type="text" placeholder="Stärke" maxlength="2" autocomplete="off" spellcheck="false">' +
		'<button id="calc">Schaden</button>' +
		'<p>Bonus Schaden</p>' +
		'<span id="output">+0%</span>' +
	'</div>';

	document.getElementById('calc').addEventListener('click', function() {
		var output = document.getElementById('output');
		var str = Number(document.getElementById('str').value);
		if ( isNaN(str) ) {
			output.textContent = "Stärke muss eine Nummer sein.";
		} else if ( str < 10 || str > 99) {
			output.textContent = "Stärke muss zwischen 10 und 99 liegen.";
		} else {
			output.textContent = '+' + (str * 100 / 140).toFixed(2) + '%';
		}
	});
});