/* MonsterVerze Developer Page Auto-Preload + Missing Navigation Helper */

(function () {
	'use strict';

	function getPageName() {
		if (window.mw && mw.config) {
			return mw.config.get('wgPageName') || '';
		}

		return decodeURIComponent((window.location.pathname || '').replace(/^\/wiki\//, ''));
	}

	function isEditPage() {
		var action = '';

		if (window.mw && mw.config) {
			action = mw.config.get('wgAction') || '';
		}

		return action === 'edit' ||
			action === 'submit' ||
			window.location.search.indexOf('action=edit') !== -1 ||
			window.location.search.indexOf('veaction=editsource') !== -1;
	}

	function isDeveloperPage(pageName) {
		pageName = String(pageName || '').replace(/_/g, ' ');

		return pageName.indexOf('Developer/') !== -1;
	}

	function getDeveloperName(pageName) {
		pageName = String(pageName || '').replace(/_/g, ' ');
		var parts = pageName.split('/');
		return parts[parts.length - 1] || '';
	}

	function findTextbox() {
		return document.querySelector('#wpTextbox1') ||
			document.querySelector('textarea[name="wpTextbox1"]') ||
			document.querySelector('textarea');
	}

	function hasNavigationTemplate(text) {
		return /\{\{\s*Navigation\s*(\|[^}]*)?\}\}/i.test(text || '');
	}

	function hasDeveloperCategory(text) {
		return /\[\[\s*Category\s*:\s*Developer\s*(\|[^\]]*)?\]\]/i.test(text || '');
	}

	function addNavigationIfMissing(text) {
		text = String(text || '');

		if (hasNavigationTemplate(text)) {
			return text;
		}

		var nav = '{{Navigation|Footer}}';

		/* Put Navigation above categories if categories already exist */
		var categoryMatch = text.match(/\[\[\s*Category\s*:[\s\S]*$/i);

		if (categoryMatch && categoryMatch.index !== undefined) {
			var beforeCategories = text.slice(0, categoryMatch.index).trimEnd();
			var categories = text.slice(categoryMatch.index).trimStart();

			return beforeCategories + '\n\n' + nav + '\n' + categories;
		}

		return text.trimEnd() + '\n\n' + nav + '\n';
	}

	function addDeveloperCategoryIfMissing(text) {
		text = String(text || '');

		if (hasDeveloperCategory(text)) {
			return text;
		}

		return text.trimEnd() + '\n[[Category:Developer]]\n';
	}

	function buildDeveloperPageText(devName) {
		return '{{Infobox Developer\n' +
			'|name = ' + devName + '\n' +
			'|image = \n' +
			'|roblox_id = \n' +
			'|role = Developer\n' +
			'|tiktok = \n' +
			'|X (Twitter) = \n' +
			'|Instagram = \n' +
			'|youtube = \n' +
			'}}\n\n' +
			'== Contributions Found On ==\n' +
			'{{#invoke:DeveloperContribs|list\n' +
			' | name = Nene, Capri, {{SUBPAGENAME}}\n' +
			' | sort = type\n' +
			' | limit = 500\n' +
			' | showcount = no\n' +
			' | empty = No matches found\n' +
			'}}\n\n' +
			'{{Navigation|Footer}}\n' +
			'[[Category:Developer]]\n';
	}

	function updateTextboxValue(textbox, newValue) {
		if (!textbox || textbox.value === newValue) {
			return;
		}

		textbox.value = newValue;
		textbox.dispatchEvent(new Event('input', { bubbles: true }));
		textbox.dispatchEvent(new Event('change', { bubbles: true }));
	}

	function insertOrFixDeveloperPage() {
		if (!isEditPage()) {
			return;
		}

		var pageName = getPageName();

		if (!isDeveloperPage(pageName)) {
			return;
		}

		var textbox = findTextbox();

		if (!textbox) {
			return;
		}

		var currentText = textbox.value || '';
		var devName = getDeveloperName(pageName);

		/* New blank developer page */
		if (currentText.trim() === '') {
			updateTextboxValue(textbox, buildDeveloperPageText(devName));
			return;
		}

		/* Existing developer page: add missing Navigation and Developer category only */
		var fixedText = currentText;

		fixedText = addNavigationIfMissing(fixedText);
		fixedText = addDeveloperCategoryIfMissing(fixedText);

		updateTextboxValue(textbox, fixedText);
	}

	function init() {
		insertOrFixDeveloperPage();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	window.setTimeout(init, 500);
	window.setTimeout(init, 1500);
	window.setTimeout(init, 3000);
}());