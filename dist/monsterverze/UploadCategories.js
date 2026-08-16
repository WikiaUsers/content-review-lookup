/* MonsterVerze Upload Category Dropdown
 * Adds a category dropdown to Special:Upload and inserts [[Category:...]]
 * into the upload description/file page text.
 */

(function () {
	'use strict';

	var CATEGORY_OPTIONS = [
		{ value: '', label: 'Select Category' },

		/* Cosmetic files */
		{ value: 'Cosmetic Images', label: 'Cosmetic Images' },
		{ value: 'Hair Images', label: 'Hair Images' },
		{ value: 'Face Images', label: 'Face Images' },
		{ value: 'Accessory Images', label: 'Accessory Images' },
		{ value: 'Top Images', label: 'Top Images' },
		{ value: 'Full Outfit Images', label: 'Full Outfit Images' },
		{ value: 'Arm Images', label: 'Arm Images' },
		{ value: 'Bottom Images', label: 'Bottom Images' },
		{ value: 'Footwear Images', label: 'Footwear Images' },
		{ value: 'Wing Images', label: 'Wing Images' },

		/* Other item files */
		{ value: 'Weapon Images', label: 'Weapon Images' },
		{ value: 'Mount Images', label: 'Mount Images' },

		/* Character / people files */
		{ value: 'NPC Images', label: 'NPC Images' },
		{ value: 'Developer Images', label: 'Developer Images' },
		{ value: 'Developer Avatar Images', label: 'Developer Avatar Images' },
		{ value: 'Eekfluencer Images', label: 'Eekfluencer Images' },
		{ value: 'Eekfluencer Avatar Images', label: 'Eekfluencer Avatar Images' },
		{ value: 'Roblox Avatar Images', label: 'Roblox Avatar Images' },

		/* Game / guide files */
		{ value: 'Game Icons', label: 'Game Icons' },
		{ value: 'Game Thumbnails', label: 'Game Thumbnails' },
		{ value: 'Quest Images', label: 'Quest Images' },
		{ value: 'Guide Images', label: 'Guide Images' },
		{ value: 'Location Images', label: 'Location Images' },
		{ value: 'Update Images', label: 'Update Images' },
		{ value: 'Sneak Peek', label: 'Sneak Peek' },
		{ value: 'Concept Art', label: 'Concept Art' },
		{ value: 'Easter Eggs', label: 'Easter Eggs' },
		{ value: 'Loading Screens', label: 'Loading Screens' },
		{ value: 'Icons', label: 'Icons' },
		{ value: 'Thumbnails', label: 'Thumbnails' },

		/* Wiki design files */
		{ value: 'Template Images', label: 'Template Images' },
		{ value: 'UI Images', label: 'UI Images' },
		{ value: 'Logo Images', label: 'Logo Images' },
		{ value: 'Wiki Design Assets', label: 'Wiki Design Assets' }
	];

	function isUploadPage() {
		var special = mw.config.get('wgCanonicalSpecialPageName');
		var title = mw.config.get('wgPageName') || '';
		return special === 'Upload' || /Special:Upload/i.test(title) || /Special:Upload/i.test(location.href);
	}

	function makeOption(value, label) {
		var option = document.createElement('option');
		option.value = value;
		option.textContent = label;
		return option;
	}

	function findDescriptionField() {
		return document.querySelector('#wpUploadDescription') ||
			document.querySelector('[name="wpUploadDescription"]') ||
			document.querySelector('textarea[name*="Description"]') ||
			document.querySelector('textarea');
	}

	function findSummaryField() {
		return document.querySelector('#wpUploadSummary') ||
			document.querySelector('[name="wpUploadSummary"]') ||
			document.querySelector('input[name*="Summary"]') ||
			document.querySelector('textarea[name*="Summary"]');
	}

	function removeExistingCategory(text) {
		return String(text || '').replace(/\n?\[\[Category:[^\]]+\]\]/gi, '').trim();
	}

	function addCategoryToDescription(categoryName) {
		var description = findDescriptionField();
		if (!description) return;

		var text = removeExistingCategory(description.value || '');

		if (categoryName) {
			text = text ? text + '\n\n[[Category:' + categoryName + ']]' : '[[Category:' + categoryName + ']]';
		}

		description.value = text;
		description.dispatchEvent(new Event('input', { bubbles: true }));
		description.dispatchEvent(new Event('change', { bubbles: true }));
	}

	function addCategoryToSummary(categoryName) {
		var summary = findSummaryField();
		if (!summary) return;

		var value = String(summary.value || '');
		value = value.replace(/\s*\|\s*Category:[^|]+/gi, '').trim();

		if (categoryName) {
			value = value ? value + ' | Category: ' + categoryName : 'Category: ' + categoryName;
		}

		summary.value = value;
		summary.dispatchEvent(new Event('input', { bubbles: true }));
		summary.dispatchEvent(new Event('change', { bubbles: true }));
	}

	function createCategoryBox() {
		if (document.getElementById('mv-upload-category-box')) return;

		var description = findDescriptionField();
		var form = document.querySelector('form');
		if (!description && !form) return;

		var box = document.createElement('div');
		box.id = 'mv-upload-category-box';
		box.className = 'mv-upload-helper-box';

		var label = document.createElement('label');
		label.htmlFor = 'mv-upload-category-select';
		label.textContent = 'MonsterVerze Category';

		var select = document.createElement('select');
		select.id = 'mv-upload-category-select';
		select.className = 'mv-upload-helper-select';

		CATEGORY_OPTIONS.forEach(function (item) {
			select.appendChild(makeOption(item.value, item.label));
		});

		var note = document.createElement('div');
		note.className = 'mv-upload-helper-note';
		note.textContent = 'This adds the selected [[Category:...]] to the uploaded file page.';

		box.appendChild(label);
		box.appendChild(select);
		box.appendChild(note);

		select.addEventListener('change', function () {
			addCategoryToDescription(select.value);
			addCategoryToSummary(select.value);
		});

		if (description && description.parentNode) {
			description.parentNode.insertBefore(box, description);
		} else if (form) {
			form.insertBefore(box, form.firstChild);
		}
	}

	function addStyles() {
		if (document.getElementById('mv-upload-category-css')) return;

		var style = document.createElement('style');
		style.id = 'mv-upload-category-css';
		style.textContent =
			'#mv-upload-category-box{' +
				'margin:12px 0!important;' +
				'padding:12px!important;' +
				'border:2px solid #b600ff!important;' +
				'border-radius:10px!important;' +
				'background:rgba(30,0,45,.92)!important;' +
				'box-shadow:0 0 12px rgba(204,0,255,.35)!important;' +
				'color:#fff!important;' +
				'font-family:Arial,sans-serif!important;' +
			'}' +
			'#mv-upload-category-box label{' +
				'display:block!important;' +
				'margin-bottom:6px!important;' +
				'font-weight:900!important;' +
				'color:#fff!important;' +
			'}' +
			'.mv-upload-helper-select{' +
				'width:100%!important;' +
				'max-width:420px!important;' +
				'padding:8px 10px!important;' +
				'border-radius:8px!important;' +
				'border:1px solid #ff4dff!important;' +
				'background:#23002f!important;' +
				'color:#fff!important;' +
				'font-weight:700!important;' +
			'}' +
			'.mv-upload-helper-note{' +
				'margin-top:6px!important;' +
				'font-size:12px!important;' +
				'opacity:.85!important;' +
			'}';

		document.head.appendChild(style);
	}

	function start() {
		if (!isUploadPage()) return;
		addStyles();
		createCategoryBox();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}

	setTimeout(start, 800);
	setTimeout(start, 2000);
}());