/* Ajoute la classe pour afficher les audios coréens - Add show Korean class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	var ko_vo = document.querySelectorAll('#mw-customcollapsible-ko-vo');
	body.classList.add('show-ko-vo');
	ko_vo.forEach(function (item, index) {
		item.classList.remove('mw-collapsed');
	});
});