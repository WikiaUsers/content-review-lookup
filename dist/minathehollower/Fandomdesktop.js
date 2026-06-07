/*-----------------------------------*\
   #CUSTOM-SCRIPTS
\*-----------------------------------*/

/**
 * [[Template:Shake]] and [[Template:Wave]]
 * Custom text animation support
 * Splits text into individual characters for animation
 * Additional styling and accessibility support in Fandomdesktop.css
 */
 $(function () {
	mw.hook('wikipage.content').add(function ($content) {
		$content.find('.shake-text, .wave-text').each(function () {
			var el = this;

			if (el.dataset.letterProcessed) {
				return;
			}

			el.dataset.letterProcessed = 'true';

			var text = el.textContent;
			el.textContent = '';

			for (var i = 0; i < text.length; i++) {
				var span = document.createElement('span');

				if (text.charAt(i) === ' ') {
					span.innerHTML = '&nbsp;';
				} else {
					span.textContent = text.charAt(i);
				}

				if (el.classList.contains('wave-text')) {
					span.style.animationDelay = (i * 50) + 'ms';
				}

				if (el.classList.contains('shake-text')) {
					span.style.animationDelay = (Math.random() * 500) + 'ms';
				}

				el.appendChild(span);
			}
		});
	});
});