/* MonsterVerze Upload Credit Helper - Dropdown Version */

(function () {
	'use strict';

	var creditOptions = [
		{ label: 'Unknown', value: 'Unknown' },

		{ label: '3rdy', value: '[[MonsterVerze Wiki:Developer/3rdy|3rdy]]' },
		{ label: 'Ayzellz', value: '[[MonsterVerze Wiki:Developer/Ayzellz|Ayzellz]]' },
		{ label: 'Bee', value: '[[MonsterVerze Wiki:Developer/ iiOmq Vandushieii|Bee]]' },
		{ label: 'Blizzy', value: '[[MonsterVerze Wiki:Developer/Blizzy|Blizzy]]' },
		{ label: 'Boots', value: '[[MonsterVerze Wiki:Developer/Boots|Boots]]' },
		{ label: 'Edd', value: '[[MonsterVerze Wiki:Developer/Edd|Edd]]' },
		{ label: 'Emmie', value: '[[MonsterVerze Wiki:Developer/Emmie|Emmie]]' },
		{ label: 'Ian', value: '[[MonsterVerze Wiki:Developer/Ian|Ian]]' },
		{ label: 'IImKatt', value: '[[MonsterVerze Wiki:Developer/IImKatt|IImKatt]]' },
		{ label: 'Ike', value: '[[MonsterVerze Wiki:Developer/Ike|Ike]]' },
		{ label: 'ImNotJustBryan', value: '[[MonsterVerze Wiki:Developer/ImNotJustBryan|ImNotJustBryan]]' },
		{ label: 'INotTiagoXD', value: '[[MonsterVerze Wiki:Developer/INotTiagoXD|INotTiagoXD]]' },
		{ label: 'Joohyun', value: '[[MonsterVerze Wiki:Developer/Joohyun|Joohyun]]' },
		{ label: 'K0ifishu', value: '[[MonsterVerze Wiki:Developer/K0ifishu|K0ifishu]]' },
		{ label: 'Kiel', value: '[[MonsterVerze Wiki:Developer/Kiel|Kiel]]' },
		{ label: 'Komi', value: '[[MonsterVerze Wiki:Developer/Komi|Komi]]' },
		{ label: 'Kurishiu', value: '[[MonsterVerze Wiki:Developer/Kurishiu|Kurishiu]]' },
		{ label: 'Manoz', value: '[[MonsterVerze Wiki:Developer/Manoz|Manoz]]' },
		{ label: 'Matt', value: '[[MonsterVerze Wiki:Developer/Matt|Matt]]' },
		{ label: 'MattCrystal', value: '[[MonsterVerze Wiki:Developer/MattCrystal|MattCrystal]]' },
		{ label: 'Melody', value: '[[MonsterVerze Wiki:Developer/Melody|Melody]]' },
		{ label: 'Mikko', value: '[[MonsterVerze Wiki:Developer/Mikko|Mikko]]' },
		{ label: 'Mistipix', value: '[[MonsterVerze Wiki:Developer/Mistipix|Mistipix]]' },
		{ label: 'Myko', value: '[[MonsterVerze Wiki:Developer/Myko|Myko]]' },
		{ label: 'Mysthelin', value: '[[MonsterVerze Wiki:Developer/Mysthelin|Mysthelin]]' },
		{ label: 'Nana', value: '[[MonsterVerze Wiki:Developer/Nana|Nana]]' },
		{ label: 'Nene', value: '[[MonsterVerze Wiki:Developer/Nene|Nene]]' },
		{ label: 'Optical', value: '[[MonsterVerze Wiki:Developer/Optical|Optical]]' },
		{ label: 'Panchachi', value: '[[MonsterVerze Wiki:Developer/Panchachi|Panchachi]]' },
		{ label: 'PeacherinoDoll', value: '[[MonsterVerze Wiki:Developer/PeacherinoDoll|PeacherinoDoll]]' },
		{ label: 'Plentune', value: '[[MonsterVerze Wiki:Developer/Plentune|Plentune]]' },
		{ label: 'Ricardo', value: '[[MonsterVerze Wiki:Developer/Ricardo|Ricardo]]' },
		{ label: 'Scarlyx', value: '[[MonsterVerze Wiki:Developer/Scarlyx|Scarlyx]]' },
		{ label: 'StarzXavier', value: '[[MonsterVerze Wiki:Developer/StarzXavier|StarzXavier]]' },
		{ label: 'Theo', value: '[[MonsterVerze Wiki:Developer/Theo|Theo]]' },
		{ label: 'Vex', value: '[[MonsterVerze Wiki:Developer/Vex|Vex]]' },
		{ label: 'Vivi', value: '[[MonsterVerze Wiki:Developer/Vivi|Vivi]]' },
		{ label: 'WendyWinter', value: '[[MonsterVerze Wiki:Developer/WendyWinters|WendyWinter]]' },
		{ label: 'Xavier', value: '[[MonsterVerze Wiki:Developer/Xavier|Xavier]]' }
	];

	function isUploadPage() {
		var path = window.location.pathname || '';
		var search = window.location.search || '';

		if (window.mw && mw.config) {
			if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
				return true;
			}
		}

		return path.indexOf('/wiki/Special:Upload') !== -1 ||
			search.indexOf('wpDestFile=') !== -1 ||
			document.body.classList.contains('mw-special-Upload');
	}

	function findDescriptionBox() {
		return document.querySelector('#wpUploadDescription') ||
			document.querySelector('textarea[name="wpUploadDescription"]') ||
			document.querySelector('textarea[name="wpUploadFileDescription"]') ||
			document.querySelector('textarea[name="wpDesc"]') ||
			document.querySelector('textarea');
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
			return;
		}

		if (current.indexOf(value) !== -1) {
			return;
		}

		input.value = current + ' & ' + value;
	}

	function createCreditBox(descriptionBox) {
		if (document.getElementById('mv-upload-credit-box')) {
			return;
		}

		if (!descriptionBox || !descriptionBox.parentNode) {
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
			'<div class="mv-upload-credit-help">This will be added to the file page as <code>|Credits=</code>.</div>';

		descriptionBox.parentNode.insertBefore(wrapper, descriptionBox);

		var select = document.getElementById('mv-upload-credit-select');
		var addButton = document.getElementById('mv-upload-credit-add');

		createCreditOptions(select);

		addButton.addEventListener('click', function () {
			addCreditToInput(select.value);
			select.value = '';
		});

		select.addEventListener('change', function () {
			addCreditToInput(select.value);
			select.value = '';
		});
	}

	function addCreditsToDescription() {
		var creditInput = document.getElementById('mv-upload-credit-input');
		var descriptionBox = findDescriptionBox();

		if (!creditInput || !descriptionBox) {
			return;
		}

		var credits = creditInput.value.trim();

		if (!credits) {
			return;
		}

		var current = descriptionBox.value || '';

		if (current.indexOf('|Credits=') !== -1 || current.indexOf('|credits=') !== -1) {
			return;
		}

		if (current.indexOf('{{FileInfo') !== -1) {
			descriptionBox.value = current.replace('{{FileInfo', '{{FileInfo\n|Credits=' + credits);
			return;
		}

		descriptionBox.value =
			'{{FileInfo\n' +
			'|Credits=' + credits + '\n' +
			'}}\n\n' +
			current;
	}

	function attachSubmitHandler() {
		var forms = document.querySelectorAll('form');

		forms.forEach(function (form) {
			if (form.getAttribute('data-mv-upload-credit-ready') === 'true') {
				return;
			}

			form.setAttribute('data-mv-upload-credit-ready', 'true');

			form.addEventListener('submit', function () {
				addCreditsToDescription();
			});
		});
	}

	function init() {
		if (!isUploadPage()) {
			return;
		}

		var descriptionBox = findDescriptionBox();

		if (!descriptionBox) {
			return;
		}

		createCreditBox(descriptionBox);
		attachSubmitHandler();
	}

	function watchForUploadForm() {
		if (!isUploadPage()) {
			return;
		}

		var observer = new MutationObserver(function () {
			init();
		});

		observer.observe(document.documentElement, {
			childList: true,
			subtree: true
		});

		window.setTimeout(function () {
			observer.disconnect();
		}, 10000);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			init();
			watchForUploadForm();
		});
	} else {
		init();
		watchForUploadForm();
	}

	window.setTimeout(init, 500);
	window.setTimeout(init, 1500);
	window.setTimeout(init, 3000);
	window.setTimeout(init, 6000);
}());