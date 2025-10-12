/* Ajoute la classe pour afficher les audios japonais - Add show Japanese class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	var ja_vo = document.querySelectorAll('#mw-customcollapsible-ja-vo');
	body.classList.add('show-ja-vo');
	ja_vo.forEach(function (item, index) {
		item.classList.remove('mw-collapsed');
	});
});