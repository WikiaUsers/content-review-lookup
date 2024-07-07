/* Add show Chinese class to body */
mw.hook('wikipage.content').add(function() {
	var body = document.querySelector('body');
	body.classList.add('show-zh-vo');
});