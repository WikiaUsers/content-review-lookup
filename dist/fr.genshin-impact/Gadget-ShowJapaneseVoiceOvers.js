/* Ajoute la classe pour afficher les audios japonais - Add show Japanese class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	body.classList.add('show-ja-vo');
});