/* [[Strength]] */
(function(mw) {
	'use strict';
	function init($content) {
		var damageCalc = $content.find('#damageCalc:not(.loaded)')[0];
		if (!damageCalc) return;
		damageCalc.classList.add('loaded');
		damageCalc.innerHTML = '<div id="dmgCalcContainer">' +
			'<p>Enter your strength</p>' +
			'<input id="str" type="text" placeholder="Between 10 and 99" maxlength="2" autocomplete="off" spellcheck="false">' +
			'<button id="calc">Get Damage</button>' +
			'<p>Bonus Damage</p>' +
			'<span id="output">+0%</span>' +
		'</div>';

		$content.find('#calc')[0].addEventListener('click', function() {
			var output = $content.find('#output')[0];
			var str = Number($content.find('#str')[0].value);
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