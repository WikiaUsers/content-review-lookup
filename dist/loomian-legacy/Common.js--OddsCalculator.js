/* Any JavaScript here will be loaded for all users on every page load. */

var calc;
var fieldsets;
var baseOdds;

var _currentModifiers = {};
var $selectedBaseOption = null;
var currentDenominator = 1;

function buildInput() {
	var input = new OO.ui.TextInputWidget({
		placeholder: "e.g. 1/500",
		type: "text"
	});
	input.$element.removeClass('oo-ui-textInputWidget-type-text');
	input.$element.addClass('oo-ui-textInputWidget-type-number');
	input.on('change', function (value) {
		if ((new RegExp('^\\d+/\\d+$')).test(value.toString())) {
			var numerator = Number(value.split('/')[0]);
			var denominator = Number(value.split('/')[1]);
			currentDenominator = denominator / numerator;
			setResults(calculateOdds());
			// Apply default fieldsets; will be cleared if a preset is chosen or kept if it was a manual input
			clearFieldsets();
			clearModifiers();
			baseOdds['wild'].fieldsets.forEach(function (fieldsetName) {
				appendFieldset(buildFieldset(fieldsetName));
			});
			if ($selectedBaseOption) {
				$selectedBaseOption.css("background-color", "");
			}
			$selectedBaseOption = null;
		}
	});
	return input;
}

function buildBaseOption(inputElement, name) {
	var $option = $('<div></div>').text(baseOdds[name].displayTitle).on('click', function() {
		if (!baseOdds[name].fieldsets.length) {
			var $message = $('<div class="odds-calc-no-fieldsets-message" style="display: flex; height:100%; justify-content: center; align-items: center;">Your selection has no available modifiers</div>');
			$(calc).find('.odds-calc-body-right-content').append($message);
		}
		prepareNewBase(inputElement, "1/" + baseOdds[name].baseChance.toString());
		
		if ($selectedBaseOption) {
			$selectedBaseOption.css("background-color", "");
		}
		$selectedBaseOption = $option;
		$selectedBaseOption.css("background-color", "rgba(255,255,255,0.1)");
		
		clearModifiers();
		clearFieldsets(); // Clear default fieldsets
		setResults(calculateOdds());
		baseOdds[name].fieldsets.forEach(function (fieldsetName) {
			appendFieldset(buildFieldset(fieldsetName));
		});
		if (baseOdds[name].labels) {
			baseOdds[name].labels.forEach(function (label) {
				addModifier({
					name: label,
					numerator: 1,
					denominator: 1
				});
			});
		}
	});
	$option.addClass("baseOption");
	return $option;
}

function buildFieldset(name) {
	var $fieldset = $('<fieldset></fieldset>').css({
        margin: 0,
        height: 'fit-content'
    });
	var $legend = $('<legend></legend>').text(fieldsets[name].displayTitle);
    $fieldset.append($legend);
	
	var items = [];
	var checkbox = fieldsets[name].type === 'checkbox';
	Object.entries(fieldsets[name].modifiers).forEach(function (keyval) {
		var key = keyval[0];
		var modifier = keyval[1];
		
		var option = new OO.ui[checkbox ? 'CheckboxMultioptionWidget' : 'RadioOptionWidget']({
			data: key,
			label: modifier.displayTitle,
			selected: key === 'none' // Options named none (normal) are selected by default
		});
		items.push(option);
	});
	
    var selectGroup = new OO.ui[checkbox ? 'CheckboxMultiselectWidget' : 'RadioSelectWidget']({
		items: items
	});
	
	selectGroup.on(checkbox ? 'change' : 'choose', function() {
		items.forEach(function (item) {
			if (item.isSelected()) {
				addModifier({
					name: item.getData(),
					numerator: fieldsets[name].modifiers[item.getData()].numerator || 1,
					denominator: fieldsets[name].modifiers[item.getData()].denominator || 1,
					special: fieldsets[name].modifiers[item.getData()].special ? fieldsets[name].modifiers[item.getData()].special : null
				});
			} else {
				removeModifier(item.getData());
			}
		});
		setResults(calculateOdds());
	});
	
	$fieldset.append(selectGroup.$element);
    return $fieldset;
}

function appendFieldset(fieldset) {
	$(calc).find('.odds-calc-body-right-content').append(fieldset);
}

function clearFieldsets() {
	$(calc).find('.odds-calc-body-right-content').empty();
}

function clearModifiers() {
	_currentModifiers = {};
}

function addModifier(modifier) {
	_currentModifiers[modifier.name] = modifier;
}

function removeModifier(modifierName) {
	if (modifierName in _currentModifiers) {
		delete _currentModifiers[modifierName];
	}
}

function prepareNewBase(inputElement, baseOddsStr) {
	inputElement.setValue(baseOddsStr);
}

function applySpecials(key, special, numden) {
	if (key === 'special' || key in _currentModifiers) {
		if (Object.keys(special).some(function (n) { return n !== "numerator" && n !== "denominator"; })) {
			var change = false;
			Object.entries(special).forEach(function (keyval) {
				var key = keyval[0];
				var val = keyval[1];
				if (change) { return; }
				change = applySpecials(key, val, numden) ? true : change;
			});
			if (!change) {
				if (special.numerator && special.denominator) {
					numden.numerator *= special.numerator;
					numden.denominator *= special.denominator;
					change = true;
				}
			}
			return change;
		} else {
			numden.numerator *= special.numerator || 1;
			numden.denominator *= special.denominator || 1;
			return true;
		}
	}
	return false;
}

function calculateOdds() {
	var numerator = 1;
	var denominator = currentDenominator;
	Object.values(_currentModifiers).forEach(function (modifier) {
		if (!modifier.special) {
			numerator *= modifier.numerator;
			denominator *= modifier.denominator;
		} else {
			var numden = {
				numerator: 1,
				denominator: 1
			};
			applySpecials('special', modifier.special, numden);
			numerator *= numden.numerator;
			denominator *= numden.denominator;
		}
	});
	return {
		numerator: numerator,
		denominator: denominator
	};
}

function setResults(finalOdds) {
	var fraction = "1/" + (finalOdds.denominator / finalOdds.numerator).toLocaleString();
	var percent = (finalOdds.numerator * 100 / finalOdds.denominator).toString();
	var message;
	var color;
	if (percent >= 1) {
		color = "#64ed64";
		message = "Common";
	} else if (percent >= 0.1) {
		color = "#4ee2ef";
		message = "Uncommon";
	} else if (percent >= 0.01) {
		color = "#67b3ff";
		message = "Rare";
	} else if (percent >= 0.001) {
		color = "#f17b4d";
		message = "Very Rare";
	} else if (percent >= 0.00005) {
		color = "#e04c4c";
		message = "Extremely Rare";
	} else {
		color = "#ad57f8";
		message = "Touch Grass";
	}
	$(calc).find('.odds-calc-results .result').text(fraction + " (" + percent + "%)");
	$(calc).find('.odds-calc-results .message').html('<span style="color: ' + color + ';">' + message + "</span>");
	$(calc).find('.odds-calc-results').css('background-color', color + '30');
}

function search(value) {
	value = value.toLowerCase();
	$(calc).find('.odds-calc-preset-container .baseOption').each(function () {
		if (
			!value || this.dataset.name === value || baseOdds[this.dataset.name].displayTitle.toLowerCase().includes(value) || (baseOdds[this.dataset.name].searchTerms || []).some(function (term) { return term.toLowerCase().includes(value); })) {
			this.style.display = "block";
		} else {
			this.style.display = "none";
		}
	});
}

$(document).ready(function() {
	calc = $('.odds-calc');
	if (calc) {
		mw.loader.using(['oojs-ui', 'oojs-ui-core', 'oojs-ui-widgets'], function() {
			clearFieldsets();
			fieldsets = JSON.parse($(calc).find('.odds-calc-data-fieldsets pre').html());
			baseOdds = JSON.parse($(calc).find('.odds-calc-data-baseOdds pre').html());
			if ($(calc).find('.odds-calc-test-mode-message')) {
				$(calc).find('.odds-calc-test-mode-message').remove();
			}
			
			var input = buildInput();
			$(calc).find('.odds-calc-base-input').append(input.$element);
			
			var searchBox = new OO.ui.TextInputWidget({
				placeholder: "Search...",
				type: "text"
			});
			searchBox.$element.removeClass('oo-ui-textInputWidget-type-text');
			searchBox.$element.addClass('oo-ui-textInputWidget-type-number');
			searchBox.$element.css("padding", 0);
			searchBox.on('change', search);
			
			$(calc).find('.odds-calc-preset-container').append(searchBox.$element);
			Object.keys(baseOdds).forEach(function (name){
				var $baseOption = buildBaseOption(input, name);
				$(calc).find('.odds-calc-preset-container').append($baseOption);
				$baseOption[0].dataset.name = name;
			});
		});
	}
});