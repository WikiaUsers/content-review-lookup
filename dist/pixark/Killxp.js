;(function(mw) {
	'use strict';
	function init() {
		var creatureKillXPDiv = document.getElementById('creatureKillXP');

		function updateXPLevel(baseXP, level) {
			return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
		}

		if (creatureKillXPDiv && creatureKillXPDiv.dataset.basexp) {
			creatureKillXPDiv.innerHTML = 'Level <input type="number" min="1" max="999999" maxlength="6" value="1" style="width:3.5em">: <span id="creatureKillXPResult"></span> <a href="Experience" title="Experience">XP</a>';
			 var input = creatureKillXPDiv.querySelector('input');
			input.addEventListener('change', function() {
				creatureKillXPResultEl.textContent = updateXPLevel(creatureKillXPDiv.dataset.basexp, input.value);
			});
			var creatureKillXPResultEl = document.getElementById('creatureKillXPResult');
			creatureKillXPResultEl.textContent = updateXPLevel(creatureKillXPDiv.dataset.basexp, 1);
		}
	}

	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);