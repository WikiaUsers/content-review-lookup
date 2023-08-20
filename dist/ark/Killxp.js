/* [[Template:Infobox creature]] */
(function($, mw) {
	'use strict';
	window.killXpI18n = window.killXpI18n || {
		level: 'Level'
	};
	var i18n = window.killXpI18n;

	function calculateXPForLevel(baseXP, level) {
		return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
	}

	function addEvent(index, ele) {
		var $this = $(ele),
			baseXP = ele.dataset.basexp,
			$result = null;
		ele.classList.add('loaded');
		if (baseXP) {
			$result = $('<span>').text(calculateXPForLevel(baseXP, 1));
			$this.text(i18n.level + ' ')
				.append($('<input type="number" min="1" max="999999" maxlength="6" value="1" style="width:3.5em">')
					.on('input', function() {
						$result.text(calculateXPForLevel(baseXP, parseInt(this.value)));
					}))
				.append(': ')
				.append($result);
		}
	}

	mw.hook('wikipage.content').add(function($content) {
		$content.find('.killxpcalc:not(.loaded)').each(addEvent);
	});
})(window.jQuery, window.mediaWiki);