/* Ajoute la classe pour cacher les audios anglais - Add hide English class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	body.classList.add('hide-en-vo');
});