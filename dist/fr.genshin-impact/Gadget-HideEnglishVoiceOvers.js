/* Ajoute la classe pour cacher les audios anglais - Add hide English class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	var en_vo = document.querySelectorAll('#mw-customcollapsible-en-vo');
	body.classList.add('hide-en-vo');
	en_vo.forEach(function (item, index) {
		item.classList.add('mw-collapsed');
	});
});