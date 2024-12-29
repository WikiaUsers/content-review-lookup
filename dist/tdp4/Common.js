(function() {
	const gunInfobox = document.querySelector('.portable-infobox.pi-theme-gun');

	function addInfoboxPriceCalculator() {
		const infoboxSections = document.querySelectorAll('.portable-infobox .pi-group');
		const elements = {
			purchaseCoins: document.getElementById('purchase-coins'),
			purchaseCash: document.getElementById('purchase-cash'),
			sellCoins: document.getElementById('sell-coins'),
			sellCash: document.getElementById('sell-cash'),
		 };
		const originalValues = {
			purchaseCoins: elements.purchaseCoins.innerText,
			purchaseCash: elements.purchaseCash.innerText,
			sellCoins: elements.sellCoins.innerText,
			sellCash: elements.sellCash.innerText,
		};
		const classNames = {
			row: 'pi-item pi-data pi-item-spacing pi-border-color',
			rowLabel: 'pi-data-label pi-secondary-font',
			rowValue: 'pi-data-value pi-font',
		};
		const ids = {
			form: 'price-calculator',
			formContainer: 'price-form',
			actionsContainer: 'price-actions',
			input: 'price-input',
			submit: 'price-submit',
			reset: 'price-reset',
		};
		const strings = {
			rowLabel: 'Simulate offer',
			inputLabel: '%',
			resetButton: 'Reset',
		};

		function updatePrices(percentage) {
			if (isNaN(percentage)) return;

			const priceElements = Object.values(elements);
			const originalPrices = Object.values(originalValues);

			for (var i = 0; i < priceElements.length; i++) {
				if (originalPrices[i] === '0' || originalPrices[i] === '1') continue;

				const isCash = i % 2 === 1;
				const originalPrice = Number(originalPrices[i].replace(/\,/g, ''));
				const discountedPrice = originalPrice * (1 - Math.min(percentage, 100) / 100);
				const newPrice = percentage <= 0 ? originalPrice : Math.max(0, isCash ? Math.ceil(discountedPrice) : Math.floor(discountedPrice));

				priceElements[i].innerText = newPrice.toLocaleString();
			}
		}

		function setAttributes(el, attrs) {
			for (var key in attrs) {
				el.setAttribute(key, attrs[key]);
			}
		}

		infoboxSections.forEach(function(section) {
			const headerText = section.querySelector('.pi-header').innerText;

			if (headerText !== 'Price') return;

			const row = document.createElement('div'),
				rowLabel = document.createElement('h3'),
				rowValue = document.createElement('div'),
				formContainer = document.createElement('div'),
				actionsContainer = document.createElement('div'),
				form = document.createElement('form'),
				input = document.createElement('input'),
				inputLabel = document.createElement('label'),
				submit = document.createElement('input'),
				reset = document.createElement('input');

			row.className = classNames.row;
			rowLabel.className = classNames.rowLabel;
			rowValue.className = classNames.rowValue;

			rowLabel.innerText = strings.rowLabel;
			inputLabel.innerText = strings.inputLabel;
			reset.setAttribute('value', strings.resetButton);

			form.setAttribute('id', ids.form);
			formContainer.setAttribute('id', ids.formContainer);
			actionsContainer.setAttribute('id', ids.actionsContainer);
			setAttributes(input, {'type': 'number', 'id': ids.input, 'name': ids.input, 'min': '0', 'max': '100', 'maxlength': '3'});
			inputLabel.setAttribute('for', ids.input);
			setAttributes(submit, {'id': ids.submit, 'type': 'submit'});
			setAttributes(reset, {'id': ids.reset, 'type': 'button'});

			formContainer.append(input, inputLabel);
			actionsContainer.append(submit, reset);
			form.append(formContainer, actionsContainer);
			rowValue.append(form);
			row.append(rowLabel, rowValue);
			section.append(row);
		});

		const form = document.getElementById(ids.form),
			input = document.getElementById(ids.input),
			reset = document.getElementById(ids.reset);

		form.addEventListener('submit', function(e) {
			e.preventDefault();

			const percentage = Number(input.value);

			updatePrices(percentage);
		});

		reset.addEventListener('click', function() {
			updatePrices(0);
		});
	}

	if (gunInfobox) addInfoboxPriceCalculator();
}());