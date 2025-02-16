function runWhenDOMContentLoaded(runnable) {
	if (/comp|inter|loaded/.test(document.readyState)) {
		runnable();
	} else {
		document.addEventListener('DOMContentLoaded', function() {
			runnable();
		});
	}
}
runWhenDOMContentLoaded(function() {
	/* Set Option to Autoplay */
	window.LoopPreviewOpts = window.LoopPreviewOpts || {};
	window.LoopPreviewOpts.mode = 'autoplay';
	
	/* Add autoplay class to body */
	var body = document.querySelector('body');
	body.classList.add('autoplay-looppreview');
});