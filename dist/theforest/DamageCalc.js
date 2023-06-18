;(function(mw) {
	'use strict';
	function init() {
		var damageCalc = document.getElementById('damageCalc');
		if (!damageCalc) return;
		damageCalc.innerHTML = '<div id="dmgCalcContainer">' +
			'<p>Enter your strength</p>' +
			'<input id="str" type="text" placeholder="Between 10 and 99" maxlength="2" autocomplete="off" spellcheck="false">' +
			'<button id="calc">Get Damage</button>' +
			'<p>Bonus Damage</p>' +
			'<span id="output">+0%</span>' +
		'</div>';

		document.getElementById('calc').addEventListener('click', function() {
			var output = document.getElementById('output');
			var str = Number(document.getElementById('str').value);
			if ( isNaN(str) ) {
				output.textContent = "Strength must be a number.";
			} else if ( str < 10 || str > 99) {
				output.textContent = "Strength must be between 10 and 99.";
			} else {
				output.textContent = '+' + (str * 100 / 140).toFixed(2) + '%';
			}
		});
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);