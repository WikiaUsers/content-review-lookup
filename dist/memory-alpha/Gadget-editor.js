'use strict';
mw.hook('wikiEditor.toolbarReady').add(() => {
	mw.loader.load('ext.fandom.wikiEditorFandomDesktop.css');
});

mw.hook('ve.activationComplete').add(() => {
	const docNode = $('.ve-ce-documentNode');
	const classes = [
		`mw-content-${docNode.attr('dir')}`,
		'mw-parser-output',
		'mw-show-empty-elt',
	];
	docNode.addClass(classes);
});

// {{JavaScript category}}