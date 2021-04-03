/*
 * @title       VisualEditorTitleLink.js
 * @version     1.1.0
 * @description Convert the VE's page title into a link pointing to the original page
 * @author      Himmalerin
 * @license     CC-BY-SA-3.0
 */

(function () {
	'use strict';
	if (window.veTitleLink) return;
	window.veTitleLink = true;

	// '1' === visual editor - source mode,
	// '2' === visual editor,
	// '4' === source editor
	const editor = mw.user.options.get('editortype');
	const action = mw.config.get('wgAction');

	/**
	 * Create and insert a link into the page title
	 * @param title - HTML node to insert the link into
	 */
	const link = function link(title) {
		const pagename = mw.config.get('wgPageName').replace(/_/g, ' ');

		// Create a link to the current page
		const link = document.createElement('a');
		// Set the href to be the current page's path
		link.href = window.location.pathname;
		// Set the title for mouseover
		link.title = pagename;
		// Set the text to be the page name
		link.textContent = pagename;

		// If vtlOpensNewTab is set open the link in a new tab
		if (window.vtlOpensNewTab === true) {
			link.target = '_blank';
			link.rel = 'noreferrer noopener';
		}

		title.textContent = '';
		title.appendChild(link);
	};

	if (editor === '4' && (action === 'edit' || action === 'submit')) {
		const title = document.querySelector('.ve-oasis-header__label');

		link(title);
	} else if (editor === '1' || editor === '2') {
		// Wait for the visual editor to load
		mw.hook('ve.activationComplete').add(function () {
			const title = document.querySelector(
				'.ve-init-mw-desktopArticleTarget-title'
			);

			link(title);
		});
	}
})();