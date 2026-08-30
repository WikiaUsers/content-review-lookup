/* MonsterVerze Upload Credit Helper - Dropdown + Live Summary + Popup Support */

(function () {
	'use strict';

	var creditOptions = [
		{ label: 'Unknown', value: 'Unknown' },

var creditOptions = [
	{ label: 'Rey', value: '[[Eekfluencer/ReysArcade|Rey]]' },

	{ label: '0ptical', value: '[[Developer/0ptical|Optical]]' },
	{ label: '3rdy', value: '[[Developer/3rdy|3rdy]]' },
	{ label: 'Ayzellz', value: '[[Developer/Ayzellz|Ayzellz]]' },
	{ label: 'Bee', value: '[[Developer/ iiOmq Vandushieii|Bee]]' },
	{ label: 'Blizzy', value: '[[Developer/Blizzy|Blizzy]]' },
	{ label: 'Chaos', value: '[[Developer/28kChaos|Chaos]]' },
	{ label: 'Darkmor', value: '[[Developer/Darkmor|Darkmor]]' },
	{ label: 'Elli', value: '[[Developer/Elli|Elli]]' },
	{ label: 'Emmie', value: '[[Developer/EmmieDearest|Emmie]]' },
	{ label: 'Gvistic', value: '[[Developer/Gvistic|Gvistic]]' },
	{ label: 'Huan', value: '[[Developer/Huan|Huan]]' },
	{ label: 'Ike', value: '[[Developer/Ike|Ike]]' },
	{ label: 'INotTiagoXD', value: '[[Developer/INotTiagoXD|Tiago]]' },
	{ label: 'Joshua', value: '[[Developer/Joshualags27|Joshua]]' },
	{ label: 'K0ifishu', value: '[[Developer/K0ifishu|K0ifishu]]' },
	{ label: 'Kandi', value: '[[Developer/Kandi|Kandi]]' },
	{ label: 'Kiel', value: '[[Developer/Kiel|Kiel]]' },
	{ label: 'Komi', value: '[[Developer/Komi|Komi]]' },
	{ label: 'Mikko', value: '[[Developer/Mikko|Mikko]]' },
	{ label: 'Mistipix', value: '[[Developer/Mistipix|Mistipix]]' },
	{ label: 'MrGee', value: '[[Developer/MrGee|MrGee]]' },
	{ label: 'Myko', value: '[[Developer/Myko|Myko]]' },
	{ label: 'Mysthelin', value: '[[Developer/Mysthelin|Mysthelin]]' },
	{ label: 'Nana', value: '[[Developer/Cloudylooove|Nana]]' },
	{ label: 'Nene', value: '[[Developer/Capri_isawkward|Nene]]' },
	{ label: 'Panchachi', value: '[[Developer/Panchachi|Panchachi]]' },
	{ label: 'Peach', value: '[[Developer/PeacherinoDoll|Peach]]' },
	{ label: 'Plentune', value: '[[Developer/Plentune|Plentune]]' },
	{ label: 'Scarlyx', value: '[[Developer/Scarlyx|Scarlyx]]' },
	{ label: 'Xavier', value: '[[Developer/StarzXavier|Xavier]]' },
	{ label: 'Theo', value: '[[Developer/TheonyBunny|Theo]]' },
	{ label: 'Vex', value: '[[Developer/Vex|Vex]]' },
	{ label: 'Vivi', value: '[[Developer/Vivisaintclair|Vivi]]' },
	{ label: 'WendyWinters', value: '[[Developer/WendyWinters|WendyWinters]]' },
	{ label: 'Wil', value: '[[Developer/Wil|Wil]]' },
	{ label: 'Ying', value: '[[Developer/Yingmato|Ying]]' },
	{ label: 'Serveer', value: '[[Developer/TheRealServeer|Serveer]]' }
];

	var creditStart = '<!-- MV_UPLOAD_CREDITS_START -->';
	var creditEnd = '<!-- MV_UPLOAD_CREDITS_END -->';

	function isUploadAreaPresent() {
		var path = window.location.pathname || '';
		var search = window.location.search || '';
		var bodyText = document.body ? document.body.innerText || '' : '';

		if (window.mw && mw.config) {
			if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
				return true;
			}
		}

		if (path.indexOf('/wiki/Special:Upload') !== -1) {
			return true;
		}

		if (path.indexOf('/wiki/Special:NewFiles') !== -1) {
			return true;
		}

		if (search.indexOf('wpDestFile=') !== -1) {
			return true;
		}

		if (document.body && document.body.classList.contains('mw-special-Upload')) {
			return true;
		}

		if (document.querySelector('#wpUploadDescription')) {
			return true;
		}

		if (document.querySelector('textarea[name="wpUploadDescription"]')) {
			return true;
		}

		if (document.querySelector('textarea[name="wpUploadFileDescription"]')) {
			return true;
		}

		if (document.querySelector('textarea[name="wpDesc"]')) {
			return true;
		}

		if (document.querySelector('input[type="file"]') && (
			bodyText.indexOf('Destination filename') !== -1 ||
			bodyText.indexOf('Summary:') !== -1 ||
			bodyText.indexOf('Licensing:') !== -1 ||
			bodyText.indexOf('Upload file') !== -1 ||
			bodyText.indexOf('Add new image') !== -1 ||
			bodyText.indexOf('ADD NEW IMAGE') !== -1
		)) {
			return true;
		}

		return false;
	}

	function findSummaryBox() {
		var named =
			document.querySelector('#wpUploadDescription') ||
			document.querySelector('textarea[name="wpUploadDescription"]') ||
			document.querySelector('textarea[name="wpUploadFileDescription"]') ||
			document.querySelector('textarea[name="wpDesc"]');

		if (named) {
			return named;
		}

		var textareas = Array.prototype.slice.call(document.querySelectorAll('textarea'));

		if (!textareas.length) {
			return null;
		}

		textareas.sort(function (a, b) {
			var ar = a.getBoundingClientRect();
			var br = b.getBoundingClientRect();

			return (br.width * br.height) - (ar.width * ar.height);
		});

		return textareas[0];
	}

	function setSummaryValue(summaryBox, value) {
		if (!summaryBox) {
			return;
		}

		summaryBox.value = value;

		summaryBox.dispatchEvent(new Event('input', { bubbles: true }));
		summaryBox.dispatchEvent(new Event('change', { bubbles: true }));
		summaryBox.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
	}

	function removeOldCreditBlock(text) {
		var escapedStart = creditStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		var escapedEnd = creditEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		var blockRegex = new RegExp(escapedStart + '[\\s\\S]*?' + escapedEnd + '\\s*', 'g');

		return String(text || '').replace(blockRegex, '').trim();
	}

	function buildCreditBlock(credits) {
		return creditStart + '\n' +
			'==Credit(s)==\n' +
			credits + '\n' +
			creditEnd;
	}

	function syncCreditsToSummary() {
		var creditInput = document.getElementById('mv-upload-credit-input');
		var summaryBox = findSummaryBox();

		if (!creditInput || !summaryBox) {
			return;
		}

		var credits = creditInput.value.trim();
		var current = summaryBox.value || '';
		var cleaned = removeOldCreditBlock(current);
		var newText = '';

		if (credits) {
			newText = buildCreditBlock(credits);

			if (cleaned) {
				newText += '\n\n' + cleaned;
			}
		} else {
			newText = cleaned;
		}

		setSummaryValue(summaryBox, newText);
	}

	function createCreditOptions(select) {
		var placeholder = document.createElement('option');
		placeholder.value = '';
		placeholder.textContent = 'Select a credit...';
		select.appendChild(placeholder);

		creditOptions.forEach(function (item) {
			var option = document.createElement('option');
			option.value = item.value;
			option.textContent = item.label;
			select.appendChild(option);
		});
	}

	function addCreditToInput(value) {
		var input = document.getElementById('mv-upload-credit-input');

		if (!input || !value) {
			return;
		}

		var current = input.value.trim();

		if (!current) {
			input.value = value;
		} else if (current.indexOf(value) === -1) {
			input.value = current + ' & ' + value;
		}

		input.dispatchEvent(new Event('input', { bubbles: true }));
		input.dispatchEvent(new Event('change', { bubbles: true }));

		syncCreditsToSummary();
	}

	function findInsertLocation(summaryBox) {
		if (summaryBox && summaryBox.parentNode) {
			return {
				parent: summaryBox.parentNode,
				before: summaryBox
			};
		}

		var fileInput = document.querySelector('input[type="file"]');

		if (fileInput && fileInput.parentNode) {
			return {
				parent: fileInput.parentNode,
				before: fileInput.nextSibling
			};
		}

		var form = document.querySelector('form');

		if (form) {
			return {
				parent: form,
				before: null
			};
		}

		return null;
	}

	function hideSummaryHeading(summaryBox) {
		if (!summaryBox) {
			return;
		}

		if (summaryBox.id) {
			var directLabel = document.querySelector(
				'label[for="' + summaryBox.id + '"]'
			);

			if (directLabel) {
				directLabel.style.display = 'none';

				if (
					directLabel.parentElement &&
					directLabel.parentElement.classList &&
					directLabel.parentElement.classList.contains('mw-label')
				) {
					directLabel.parentElement.style.display = 'none';
				}
			}
		}

		var parent = summaryBox.parentElement;
		var searchArea = parent;

		if (parent && parent.parentElement) {
			searchArea = parent.parentElement;
		}

		if (searchArea) {
			var possibleLabels = Array.prototype.slice.call(
				searchArea.querySelectorAll('label, .mw-label, th, dt, legend')
			);

			possibleLabels.forEach(function (element) {
				var text = (element.textContent || '')
					.replace(/\s+/g, ' ')
					.trim()
					.replace(/:$/, '')
					.trim();

				if (text === 'Summary') {
					element.style.display = 'none';
				}
			});
		}
	}

	function createCreditBox() {
		var summaryBox = findSummaryBox();

		hideSummaryHeading(summaryBox);

		if (document.getElementById('mv-upload-credit-box')) {
			return;
		}

		var location = findInsertLocation(summaryBox);

		if (!location) {
			return;
		}

		var wrapper = document.createElement('div');
		wrapper.id = 'mv-upload-credit-box';
		wrapper.className = 'mv-upload-credit-box';

		wrapper.innerHTML =
			'<label class="mv-upload-credit-label">Credit(s)</label>' +
			'<div class="mv-upload-credit-row">' +
				'<select id="mv-upload-credit-select" class="mv-upload-credit-select"></select>' +
				'<button id="mv-upload-credit-add" class="mv-upload-credit-add" type="button">Add</button>' +
			'</div>' +
			'<input id="mv-upload-credit-input" class="mv-upload-credit-input" type="text" placeholder="Selected credits will appear here. You can also type custom credits.">' +
			'<div class="mv-upload-credit-help">The selected credit(s) will be added automatically to the file description.</div>';

		location.parent.insertBefore(wrapper, location.before);

		var select = document.getElementById('mv-upload-credit-select');
		var addButton = document.getElementById('mv-upload-credit-add');
		var input = document.getElementById('mv-upload-credit-input');

		createCreditOptions(select);

		addButton.addEventListener('click', function () {
			addCreditToInput(select.value);
			select.value = '';
		});

		select.addEventListener('change', function () {
			addCreditToInput(select.value);
			select.value = '';
		});

		input.addEventListener('input', syncCreditsToSummary);
		input.addEventListener('change', syncCreditsToSummary);
	}

	function attachFormHandlers() {
		var forms = Array.prototype.slice.call(document.querySelectorAll('form'));

		forms.forEach(function (form) {
			if (form.getAttribute('data-mv-upload-credit-ready') === 'true') {
				return;
			}

			form.setAttribute('data-mv-upload-credit-ready', 'true');

			form.addEventListener('submit', function () {
				syncCreditsToSummary();
			}, true);
		});

		if (document.body && document.body.getAttribute('data-mv-upload-credit-click-ready') !== 'true') {
			document.body.setAttribute('data-mv-upload-credit-click-ready', 'true');

			document.body.addEventListener('click', function () {
				syncCreditsToSummary();
			}, true);
		}
	}

	function init() {
		if (!isUploadAreaPresent()) {
			return;
		}

		createCreditBox();
		attachFormHandlers();
		syncCreditsToSummary();
	}

	function startObserver() {
		var observer = new MutationObserver(function () {
			init();
		});

		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});

		window.setTimeout(function () {
			observer.disconnect();
		}, 60000);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			init();
			startObserver();
		});
	} else {
		init();
		startObserver();
	}

	window.setTimeout(init, 500);
	window.setTimeout(init, 1500);
	window.setTimeout(init, 3000);
	window.setTimeout(init, 6000);
	window.setTimeout(init, 10000);
	window.setTimeout(init, 15000);
}());