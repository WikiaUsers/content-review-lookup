mw.hook('wikipage.content').add(() => {
	// add class to body as hook for any further styling or detection
	document.body.classList.add('gadget-toggle-tooltip');
});