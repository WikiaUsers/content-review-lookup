(function () {
	function init() {
		var tip = document.getElementById('sword-global-tooltip');
		if (!tip) {
			tip = document.createElement('div');
			tip.id = 'sword-global-tooltip';
			document.body.appendChild(tip);
		}

		document.addEventListener('mouseover', function (e) {
			var card = e.target.closest('.sword-card');
			if (!card) return;
			var source = card.querySelector('.sword-tooltip');
			if (!source) return;

			tip.innerHTML = source.innerHTML;
			var cs = getComputedStyle(card);
			tip.style.setProperty('--tip-bd', cs.getPropertyValue('--tip-bd'));
			tip.style.setProperty('--tip-bg', cs.getPropertyValue('--tip-bg'));
			tip.style.display = 'block';
			position(card, tip);
		});

		document.addEventListener('mouseout', function (e) {
			var card = e.target.closest('.sword-card');
			if (!card) return;
			if (e.relatedTarget && card.contains(e.relatedTarget)) return;
			tip.style.display = 'none';
		});

		function position(card, tip) {
			var r = card.getBoundingClientRect();
			var margin = 8;
			var top = r.bottom + 6;
			var left = r.left + r.width / 2 - tip.offsetWidth / 2;

			if (left < margin) left = margin;
			if (left + tip.offsetWidth > window.innerWidth - margin) {
				left = window.innerWidth - tip.offsetWidth - margin;
			}
			if (top + tip.offsetHeight > window.innerHeight) {
				top = r.top - 6 - tip.offsetHeight;
			}
			tip.style.top = top + 'px';
			tip.style.left = left + 'px';
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();