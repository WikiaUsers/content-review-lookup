// Изменение блока с родительскими страницами (под заголовком статьи) при помощи [[Шаблон:SubtitleController]]
// Changing the block with parent pages (under the title) using [[Template:SubtitleController]]
function pageSubtitle() {
	var subtitle = document.querySelector('.page-header__page-subtitle');
	if (!subtitle) return;

	var subtitleController = document.getElementById('subtitle-controller');
	if (!subtitleController) return;

	if (subtitleController.dataset.delete) {
		subtitle.style.display = 'none';
		return;
	}

	var elements = [];
	subtitleController.dataset.links.split('+').forEach(function(link) {
		link = link.slice(2, -2).split('|'); // '[[link|title]]' => [link, title]
		elements.push(`<a href="/ru/wiki/${link[0]}" title="${link[0]}">${link[link.length == 1 ? 0 : 1]}</a>`);
	});

	subtitle.innerHTML = '< ' + elements.join('‎ | ');
}

pageSubtitle();