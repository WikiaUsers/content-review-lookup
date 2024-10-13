// import from en genshin impact wiki

mw.hook('wikipage.content').add(function() {
	/* Set Option to Autoplay */
	window.LoopPreviewOpts = window.LoopPreviewOpts || {};
	window.LoopPreviewOpts.mode = 'autoplay';
	
	/* Add autoplay class to body */
	var body = document.querySelector('body');
	body.classList.add('autoplay-looppreview');
	
	/* Start transition to autoplay */
	mw.hook('LoopPreview.autoplay').fire();
});