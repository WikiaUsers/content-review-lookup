/* [[Template:Infobox creature]] */
(function(mw) {
	'use strict';
	function updateXPLevel(baseXP, level) {
		return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
	}

	function init($content) {
		var creatureKillXPDiv = $content.find('#creatureKillXP:not(.loaded)')[0];

		if (creatureKillXPDiv && creatureKillXPDiv.dataset.basexp) {
			creatureKillXPDiv.classList.add('loaded');
			creatureKillXPDiv.innerHTML = 'Level <input type="number" min="1" max="999999" maxlength="6" value="1" style="width:3.5em">: <span id="creatureKillXPResult"></span> <a href="Experience" title="Experience">XP</a>';
			var input = creatureKillXPDiv.querySelector('input');
			var creatureKillXPResultEl = $content.find('#creatureKillXPResult')[0];
			input.addEventListener('input', function() {
				creatureKillXPResultEl.textContent = updateXPLevel(creatureKillXPDiv.dataset.basexp, input.value);
			});
			creatureKillXPResultEl.textContent = updateXPLevel(creatureKillXPDiv.dataset.basexp, 1);
		}
	}

	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);