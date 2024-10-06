/* [[Template:Infobox creature]] */
(function(mw) {
	'use strict';
	function updateXPLevel(baseXP, level) {
		return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
	}

	mw.hook('wikipage.content').add(function($content) {
		$content.find('.creatureKillXP:not(.loaded)').each(function(_, ele) {
			ele.classList.add('loaded');

			if (!ele.getAttribute('data-basexp')) return;

			ele.innerHTML = 'Level <input type="number" min="1" max="999999" maxlength="6" value="1" style="width:3.5em">: <span class="creatureKillXPResult"></span> <a href="Experience" title="Experience">XP</a>';
			var input = ele.querySelector('input'),
				result = ele.getElementsByClassName('creatureKillXPResult')[0];
			input.addEventListener('input', function() {
				result.textContent = updateXPLevel(ele.dataset.basexp, input.value);
			});
			result.textContent = updateXPLevel(ele.dataset.basexp, 1);
		});
	});
})(window.mediaWiki);