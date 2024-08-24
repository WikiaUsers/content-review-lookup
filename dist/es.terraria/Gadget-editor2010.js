// Traído desde [[:es.mcw:MediaWiki:Gadget-editor2010.js]]
// <nowiki>
;(function($, mw) {
	'use strict';

	if (!(
		mw.user.options.get( 'showtoolbar' ) &&
		//!mw.user.options.get( 'usebetatoolbar' ) &&
		['edit', 'submit'].indexOf(mw.config.get('wgAction')) > -1
	)) return;

	const buttons = [
		[
			'strikethrough',
			'Tachar',
			'<s>',
			'</s>',
			'Texto tachado',
			'.section-main > .group-format'
		],
		[
			'underline',
			'Subrayar',
			'<span style="text-decoration: underline">',
			'</span>',
			'Texto subrayado',
			'.section-main > .group-format'
		],
		[
			'code',
			'Código',
			'<code>',
			'</code>',
			'Texto en formato de código',
			'.section-advanced > .group-insert'
		],
		[
			'ongoingConversation',
			'Comentario',
			'<!-- ',
			' -->',
			'Texto de comentario',
			'.section-advanced > .group-insert'
		],
		[
			'ocr',
			'Bloque de cita',
			'<blockquote>\n',
			'\n</blockquote>',
			'Texto de bloque de cita',
			'.section-advanced > .group-insert'
		]
	];

	function init(require) {
		const OO = require('oojs');
		const $toolbar = $( '.section-advanced > .group-insert' );
		const $currentFocused = $('#wpTextbox1');

		buttons.forEach(function(button) {
			const $button = new OO.ui.ButtonWidget({
				framed: false,
				icon: button[0],
				label: '',
				invisibleLabel: true,
				title: button[1]
			});
			const $element = $button.$element;
			$element.addClass('tool');
			// $element.find('.oo-ui-iconElement-icon').append(img);
			$(button[5]).append($element);
			$element.on('click', function() {
				$currentFocused.textSelection(
					'encapsulateSelection', {
						pre: button[2],
						peri: button[4],
						post: button[3]
					}
				);
			});
			$toolbar.append($button);
		});
	}

	mw.loader.using([
		'ext.wikiEditor',
		'oojs-ui',
		'oojs-ui-core',
		'oojs-ui-widgets',
		// Icons
		'oojs-ui.styles.icons-editing-styling', // strikethrough
		'oojs-ui.styles.icons-editing-advanced', // ocr
		'oojs-ui.styles.icons-moderation' // ongoingConversation
	]).then(init);
})(window.jQuery, window.mediaWiki);
// </nowiki>