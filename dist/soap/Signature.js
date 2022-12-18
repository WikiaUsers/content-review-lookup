// <nowiki>
;(function($, mw) {
	'use strict';

	if (!(
		mw.user.options.get( 'showtoolbar' ) &&
		['edit', 'submit'].indexOf(mw.config.get('wgAction')) > -1
	)) return;

	var OO;

	function init() {
		if ($('a.oo-ui-buttonElement-button > span.oo-ui-icon-signature').length) return;
		const $toolbar = $( '.section-advanced > .group-insert' );
		const $currentFocused = $('#wpTextbox1');

		const $button = new OO.ui.ButtonWidget({
			framed: false,
			icon: 'signature',
			label: '',
			title: mw.msg('wikieditor-toolbar-tool-signature')
		}); // --~~~~
		const $element = $button.$element;
		$element.addClass('tool');
		$('.section-main > .group-insert').prepend($element);
		$element.on('click', function() {
			$currentFocused.textSelection(
				'encapsulateSelection', {
					pre: '--~~~~'
				}
			);
		});
		$toolbar.append($button);
	}

	mw.loader.using([
		'mediawiki.api',
		'ext.wikiEditor',
		'oojs-ui',
		'oojs-ui-core',
		'oojs-ui-widgets',
		// Icons
		'oojs-ui.styles.icons-editing-advanced' // signature
	]).then(function(require) {
		OO = require('oojs');
		return;
	}).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'wikieditor-toolbar-tool-signature'
		]);
	}).then(init);
})(window.jQuery, window.mediaWiki);
// </nowiki>