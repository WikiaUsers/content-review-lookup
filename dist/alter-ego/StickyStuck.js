// script moved to [[w:c:dev:StickyStuck]]
(() => {
	const observer = new IntersectionObserver(([entry]) => {
		entry.target.nextElementSibling.classList.toggle('is-stuck', !entry.isIntersecting);
	});

	document.querySelectorAll('.sticky-stuck').forEach(el => {
		const sentinel = document.createElement('div');
		el.parentNode.insertBefore(sentinel, el);
		observer.observe(sentinel);
	});
})();