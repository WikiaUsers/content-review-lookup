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
			'Strike',
			'<s>',
			'</s>',
			'Strike-through text',
			'.section-main > .group-format'
		],
		[
			'underline',
			'Underline',
			'<span style="text-decoration: underline">',
			'</span>',
			'Underlined text',
			'.section-main > .group-format'
		],
		[
			'code',
			'Insert code',
			'<code>',
			'</code>',
			'Code',
			'.section-advanced > .group-insert'
		],
		[
			'ongoingConversation',
			'Insert hidden Comment',
			'<!-- ',
			' -->',
			'Comment',
			'.section-advanced > .group-insert'
		],
		[
			'ocr',
			'Insert block of quoted text',
			'<blockquote>\n',
			'\n</blockquote>',
			'Block quote',
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