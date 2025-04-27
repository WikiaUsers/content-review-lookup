'use strict';
mw.hook('wikiEditor.toolbarReady').add(() => {
	const queryString = {
		modules: 'ext.fandom.wikiEditorFandomDesktop.css',
		only: 'styles',
	};
	const attributes = {
		rel: 'stylesheet',
		href: `/load.php?${new URLSearchParams(queryString).toString()}`,
	};
	$('head').prepend($('<link>').attr(attributes));
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