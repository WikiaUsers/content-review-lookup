/* Ajoute la classe pour afficher les audios chinois - Add show Chinese class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	var zh_vo = document.querySelectorAll('#mw-customcollapsible-zh-vo');
	body.classList.add('show-zh-vo');
	zh_vo.forEach(function (item, index) {
		item.classList.remove('mw-collapsed');
	});
});