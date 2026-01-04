'use strict';
mw.hook('ve.activationComplete').add(() => {
	const docNode = $('.ve-ce-documentNode');
	const classes = [
		`mw-content-${docNode.attr('dir')}`,
		'mw-parser-output',
		'mw-show-empty-elt',
	];
	docNode.addClass(classes);
});