/* Umieszczony tutaj kod JavaScript zostanie załadowany u wszystkich użytkowników korzystających z wersji mobilnej */

/* Infoboksy administracji */
(function () {
	if (!document.body.classList.contains('skin-fandommobile')) return;

	var pi = document.querySelector('.pi-theme-administracja');
	var box = pi && pi.closest('.portable-infobox-wrapper');
	var container = document.querySelector('.administracja-kontener');

	if (container && box && !container.contains(box)) {
		container.prepend(box);
	}

	if (pi && !pi.querySelector('.pi-title')) {
		var link = pi.querySelector('a[href*="Specjalna:Wk"], a[title*="Specjalna:Wk"]');
		var text = '';

		if (link) {
			text = decodeURIComponent(link.getAttribute('href') || link.getAttribute('title') || '')
				.split('/')
				.pop()
				.replace(/_/g, ' ');
		}

		if (text) {
			var title = document.createElement('h2');
			title.className = 'pi-item pi-item-spacing pi-title';
			title.setAttribute('data-source', 'Nick');
			title.textContent = text;
			pi.prepend(title);
		}
	}
})();