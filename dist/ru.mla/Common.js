(function () {
	var toc = document.querySelector('.toc');
	if (!toc) return;
	var topList = toc.querySelector('ul');
	if (!topList) return;

	var nestedLists = topList.querySelectorAll('ul');
	if (!nestedLists.length) return; // если нет подпунктов — прятать нечего, всё как обычно

	nestedLists.forEach(function (ul) {
		ul.style.display = 'none';
	});

	var btn = document.createElement('button');
	btn.textContent = 'Показать ещё';
	btn.className = 'toc-more-btn';
	btn.onclick = function () {
		var isHidden = nestedLists[0].style.display === 'none';
		nestedLists.forEach(function (ul) {
			ul.style.display = isHidden ? '' : 'none';
		});
		btn.textContent = isHidden ? 'Скрыть' : 'Показать ещё';
	};
	topList.parentNode.insertBefore(btn, topList.nextSibling);
})();