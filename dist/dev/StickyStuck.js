// the script name may sound a bit... y'know what...
// but i swear it DESCRIBES EXACTLY what this does!
// it checks whether position sticky is stuck or not!
// believe me JSRT!
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