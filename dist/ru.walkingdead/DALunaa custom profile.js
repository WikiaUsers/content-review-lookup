/**
 * Скрипт для профиля Участник:DALunaa
 * Автор: [[Участник:DALunaa]]
 * Применяется только на странице участника DALunaa
 */

// Скрипт DALunaa — применяется только на странице Участник:DALunaa
if (mw.config.get('wgPageName') === 'Участник:DALunaa') {

	// Плеер DALunaa
	mw.loader.using('jquery', function () {
		const lightBox = document.getElementById('music-player-light');
		const darkBox = document.getElementById('music-player-dark');
		const storageKey = 'DALunaa-music-player-collapsed';

		function applyCollapsedState(collapsed) {
			if (lightBox) {
				const hasClass = lightBox.classList.contains('mw-collapsed');
				if (collapsed && !hasClass) lightBox.classList.add('mw-collapsed');
				else if (!collapsed && hasClass) lightBox.classList.remove('mw-collapsed');
			}
			if (darkBox) {
				const hasClass = darkBox.classList.contains('mw-collapsed');
				if (collapsed && !hasClass) darkBox.classList.add('mw-collapsed');
				else if (!collapsed && hasClass) darkBox.classList.remove('mw-collapsed');
			}
		}

		const savedCollapsed = localStorage.getItem(storageKey) === 'true';
		applyCollapsedState(savedCollapsed);

		let ignoreObserver = false;

		function observeBox(box) {
			if (!box) return;
			new MutationObserver(() => {
				if (ignoreObserver) return;

				const nowCollapsed = box.classList.contains('mw-collapsed');

				ignoreObserver = true;
				localStorage.setItem(storageKey, nowCollapsed);
				applyCollapsedState(nowCollapsed);
				ignoreObserver = false;
			}).observe(box, { attributes: true, attributeFilter: ['class'] });
		}

		observeBox(lightBox);
		observeBox(darkBox);
	});

	// Движущий текст
	const spans = document.querySelectorAll('.marquee-inner span');
	const highlightRadius = 3; // сколько букв по бокам выделять

	spans.forEach((el, i) => {
		el.addEventListener('mouseenter', () => {
			for (let offset = -highlightRadius; offset <= highlightRadius; offset++) {
				const target = spans[i + offset];
				if (target) {
					target.style.transition = 'color 0.2s ease, transform 0.2s ease';
					target.style.color = '#ff00ff';
					target.style.transform = 'scale(1.2)';
				}
			}
		});

		el.addEventListener('mouseleave', () => {
			for (let offset = -highlightRadius; offset <= highlightRadius; offset++) {
				const target = spans[i + offset];
				if (target) {
					target.style.color = ''; // вернёт в CSS-стиль
					target.style.transform = 'scale(1)';
				}
			}
		});
	});
}