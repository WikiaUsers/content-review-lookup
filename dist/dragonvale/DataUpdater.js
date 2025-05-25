;
mw.loader.load('oojs-ui');

$(document).ready(function () {
    const durationConfig = {
        "units": {
            "day": {
                "label": "Days",
                "short": "D",
                "min": 0,
                "max": null,
                "maxlength": 3,
                "matcher": /(\d+)\s*(?:D(?:AY)?S?)\b/i
            },
            "hour": {
                "label": "Hours",
                "short": "H",
                "min": 0,
                "max": 23,
                "maxlength": 2,
                "matcher": /(\d+)\s*(?:H(?:OUR)?S?)\b/i
            },
            "minute": {
                "label": "Minutes",
                "short": "M",
                "min": 0,
                "max": 59,
                "maxlength": 2,
                "matcher": /(\d+)\s*(?:M(?:IN(?:UTE)?S?)?)\b/i
            },
            "second": {
                "label": "Seconds",
                "short": "S",
                "min": 0,
                "max": 59,
                "maxlength": 2,
                "matcher": /(\d+)\s*(?:S(?:EC(?:OND)?S?)?)\b/i
            },
            "millisecond": {
                "label": "Milliseconds",
                "short": "MS",
                "min": 0,
                "max": 999,
                "maxlength": 3,
                "matcher": /(\d+)\s*(?:MS|MILLISECONDS?)\b/i
            }
        }
    };

    function handleDurationOverflow($input) {
        const $durationDiv = $input.closest('div[data-type="duration"]');
        const $inputs = $durationDiv.find('input[type="number"]');
        const currentIndex = $inputs.index($input);

        let value = parseInt($input.val()) || 0;
        let maxValue = $input.attr('max') !== undefined ? parseFloat($input.attr('max')) : null;

        if (maxValue !== null && value > maxValue) {
            const overflow = Math.floor(value / (maxValue + 1));
            const remainder = value % (maxValue + 1);

            if (remainder > 0) {
                $input.val(remainder);
                $input.attr('value', remainder);
            } else {
                $input.val(null);
                $input.attr('value', null);
            }

            if (currentIndex > 0) {
                const $nextInput = $inputs.eq(currentIndex - 1);
                const nextValue = parseInt($nextInput.val()) || 0;
                $nextInput.val(nextValue + overflow);

                handleDurationOverflow($nextInput);
            }
        }
    }

    function makeTip(text, tip) {
        var $span = $('<span>', {
            title: tip || text,
            css: {
                cursor: 'help',
                'border-bottom': '1px dotted gray'
            }
        }).html(text);

        return $span;
    }

    function makeText(text) {
        var $span = $('<span>', {}).html(text);

        return $span;
    }

    function create_subform(allData, fieldTypes, subform_key, game, existingKey) {
        var $subForm = $('<div>', { class: 'sub-form', 'data-formid': subform_key });
        var $formFields = $('<div>', { class: 'form-fields', 'data-formid': subform_key });
        var $formFieldsAdv = $('<div>', { class: 'form-fields-adv', 'data-formid': subform_key });

        var collection = allData[subform_key];

        var existingObject = null;
        var allFields = new Set();
        (function () {
            if (Array.isArray(collection)) {
                collection.forEach(function (col) {
                    for (var key in col) {
                        if (col.hasOwnProperty(key)) {
                            if (!existingObject && existingKey && key === "Name" && col[key] == existingKey) {
                                existingObject = col;
                            }
                            allFields.add(key);
                        }
                    }
                });
            } else if (typeof collection === 'object' && collection !== null) {
                if (collection[existingKey]) {
                    existingObject = collection[existingKey];
                }
                for (var outerKey in collection) {
                    if (collection.hasOwnProperty(outerKey)) {
                        var nestedObject = collection[outerKey];

                        if (typeof nestedObject === 'object' && nestedObject !== null) {
                            for (var nestedKey in nestedObject) {
                                if (nestedObject.hasOwnProperty(nestedKey)) {
                                    allFields.add(nestedKey);
                                }
                            }
                        }
                    }
                }
            }
        })();

        var allFieldsArray = [];
        allFields.forEach(function (item) {
            allFieldsArray.push(item);
        });

        var fieldTypeKeys = Object.keys(fieldTypes);
        allFieldsArray.sort(function (a, b) {
            return fieldTypeKeys.indexOf(a) - fieldTypeKeys.indexOf(b);
        });


        allFieldsArray.forEach(function (key) {
            var $fieldBlock = $('<div>', {
                class: 'field'
            });

            var field = fieldTypes[key] || {};
            var elementId = key + '-' + subform_key;

            var fieldType;
            if (typeof field === 'string') {
                fieldType = field;
                field = {
                    type: fieldType,
                    options: []
                };
            } else if (typeof field === 'object' && field !== null) {
                fieldType = field.type || 'text';
            } else {
                fieldType = 'text';
            }

            if (field.hide === true) return;

            var fieldName = field.name || key;

            var isRequired = field.required === true;
            if (isRequired) {
                fieldName += $('<span>', {
                    html: '<sup>*</sup>',
                    css: { color: 'red' }
                }).prop('outerHTML');
            }

            var defaultValue = field.default || null;
            if (existingObject && existingObject[key] !== undefined && existingObject[key] !== null) {
                defaultValue = existingObject[key];

                if (typeof defaultValue === 'object' && field.objectIndexKeys) {
                    if (Array.isArray(field.objectIndexKeys) && field.objectIndexKeys.length > 0) {
                        for (var i = 0; i < field.objectIndexKeys.length; i++) {
                            var indexKey = field.objectIndexKeys[i];
                            if (defaultValue.hasOwnProperty(indexKey)) {
                                defaultValue = defaultValue[indexKey];
                                break;
                            }
                        }
                    }
                }

                if (fieldType === 'date') {
                    var strippedValue = defaultValue.replace(/ #.*$/, '');
                    var parsedDate = new Date(strippedValue);

                    if (!isNaN(parsedDate)) {
                        // Convert to YY-MM-DD format
                        defaultValue = parsedDate.toISOString().split('T')[0];
                    } else {
                        defaultValue = '';
                    }
                }
            }

            if (!field.options || !Array.isArray(field.options)) {
                field.options = [];
            }


            var $labelText = field.tip ? makeTip(fieldName, field.tip) : makeText(fieldName);

            if (fieldType !== "checkbox" && fieldType !== "toggle") {
                $labelText.append(':');
            }

            var $label = $('<label>').attr('for', elementId).append($('<b>').append($labelText));

            if (field.note) {
                var $note = $('<span>').addClass('note').text(field.note);
                $label.append($('<br>') ,$note);
            }

            var $input;

            if (fieldType === 'text') {
                $input = $('<input>', {
                    type: 'text',
                    id: elementId,
                    name: fieldName,
                    value: defaultValue || '',
                    required: isRequired
                });
            } else if (fieldType === 'checkbox') {
                $fieldBlock.addClass("wds-checkbox");
                $input = $('<input>', {
                    type: 'checkbox',
                    id: elementId,
                    name: fieldName,
                    class: 'wds-toggle__input',
                    checked: defaultValue || false,
                    required: isRequired
                });
            } else if (fieldType === 'toggle') {
                $label.addClass('wds-toggle__label');
                $input = $('<input>', {
                    type: 'checkbox',
                    id: elementId,
                    name: fieldName,
                    class: 'wds-toggle__input',
                    checked: defaultValue || false,
                    required: isRequired
                });
            }else if (fieldType === 'textarea') {
                $input = $('<textarea>', {
                    id: elementId,
                    name: fieldName,
                    required: isRequired
                }).text(defaultValue || '');
            } else if (fieldType === 'number' || fieldType === 'park-level') {
                var minValue = null;
                var maxValue = null;

                if (fieldType === 'park-level') {
                    minValue = 1;
                    maxValue = game.park.maxLevel;
                } else {
                    if (field.min !== undefined) {
                        minValue = field.min;
                    }
                    if (field.max !== undefined) {
                        maxValue = field.max;
                    }
                }

                $input = $('<input>', {
                    type: 'number',
                    id: elementId,
                    name: fieldName,
                    value: defaultValue || '',
                    min: minValue,
                    max: maxValue,
                   // inputmode: 'numeric',
                   // pattern: '\\d*',
                    required: isRequired,
                    onkeydown:"return event.key >= '0' && event.key <= '9' || event.key === 'Backspace' || event.key === 'Tab'"
                });
            } else if (fieldType === 'date') {
                $input = $('<input>', {
                    type: 'date',
                    id: elementId,
                    name: fieldName,
                    value: defaultValue || '',
                    required: isRequired
                }).val(defaultValue || '');

                console.log('setting date to ', defaultValue || '');
            } else if (fieldType === 'time') {
                $input = $('<input>', {
                    type: 'time',
                    id: elementId,
                    name: fieldName,
                    value: defaultValue || '',
                    required: isRequired
                });
            } else if (fieldType === 'duration') {
                var $durationDiv = $('<div>', { 'data-type': 'duration', id: elementId, class: 'duration-container' });

                var clearButton = new OO.ui.ButtonInputWidget({
                    label: 'Clear',
                    name: 'durationClear',
                    id: 'durationClear',
                    type: 'submit',
                    classes: ['clear-duration'],
                    flags: ['destructive']
                });

                // field.format must be sorted largest to smallest
                var formatOrder = field.format || ["hour", "minute"];
                var largestUnitKey = formatOrder[0];

                formatOrder.forEach(function (unitKey) {
                    var unit = durationConfig.units[unitKey];
                    if (unit) {
                        const unitMax = unitKey === largestUnitKey ? null : (unit.max || null);

                        var $unitLabel = $('<label>', {
                            class: 'duration-label',
                            for: elementId + '_' + unitKey
                        }).text(unit.label + ':');

                        var $unitInput = $('<input>', {
                            type: 'number',
                            name: key + '_' + unitKey,
                            id: elementId + '_' + unitKey,
                            min: unit.min,
                            max: unitMax,
                            placeholder: '',
                            'data-maxlength': unit.maxlength
                        });

                        if (defaultValue && typeof defaultValue === 'string' && defaultValue.trim() !== '') {
                            var match = defaultValue.trim().match(unit.matcher);
                            if (match && match[1]) {
                                var parsedValue = parseInt(match[1], 10);
                                if (!isNaN(parsedValue) && parsedValue > 0) {
                                    $unitInput.val(parsedValue);
                                    $unitInput.attr('value', parsedValue);
                                } else {
                                    $unitInput.val(null);
                                    $unitInput.attr('value', null);
                                }
                            }
                        }

                        var $wrapper = $('<span>', { class: 'duration-field' }).append($unitLabel, $unitInput);
                        $durationDiv.append($wrapper);
                    }
                });

                for (var i = formatOrder.length - 1; i >= 0; i--) {
                    var currentUnitKey = formatOrder[i];
                    var currentUnit = durationConfig.units[currentUnitKey];
                    var $currentInput = $durationDiv.find(`input[name$="_${currentUnitKey}"]`);
                    var currentValue = parseInt($currentInput.val()) || 0;
                    const unitMax = currentUnitKey === largestUnitKey ? null : (currentUnit.max || null);

                    // handleDurationOverflow
                    if (unitMax !== null && currentValue > unitMax) {
                        var overflow = Math.floor(currentValue / (unitMax + 1));
                        var remainder = currentValue % (unitMax + 1);

                        if (remainder > 0){
                        $currentInput.val(remainder);
                        $currentInput.attr('value', remainder);
                        } else {
                            $currentInput.val(null);
                            $currentInput.attr('value', null);
                        }

                        if (i > 0) {
                            var nextUnitKey = formatOrder[i - 1];
                            var $nextInput = $durationDiv.find(`input[name$="_${nextUnitKey}"]`);
                            var nextValue = parseInt($nextInput.val()) || 0;

                            $nextInput.val(nextValue + overflow);
                            $nextInput.attr('value', nextValue + overflow);
                        }
                    }
                }

                $durationDiv.append($('<span>', { class: 'duration-field' }).append(clearButton.$element));
                $label = $('<div>').append($label).append($durationDiv);
                $input = $durationDiv;
            } else if (fieldType === 'dropdown' || fieldType === 'rarity' || fieldType === 'currency' || fieldType === 'weather') {
                if (fieldType === 'rarity') {
                    var any = !field.options || field.options.length < 1 || field.options.includes("all");
                    if (any) {
                        field.options = game.rarities;
                    }

                    // todo add auto determine box
                }

                if (fieldType === 'weather') {
                    var any = !field.options || field.options.length < 1 || field.options.includes("all");
                    if (any) {
                        field.options = game.weather;
                    }
                }

                if (fieldType === 'currency') {
                    var empty = !field.options || field.options.length < 1;

                    if (!empty) {
                        var additionalOptions = [];

                        field.options.forEach(function (option) {
                            if (game.currencies.hasOwnProperty(option)) {
                                var currencyOptions = game.currencies[option];

                                for (var j = 0; j < currencyOptions.length; j++) {
                                    additionalOptions.push(currencyOptions[j]);
                                }
                            }
                        });

                        field.options = field.options.concat(additionalOptions);

                        // remove duplicates
                        field.options = field.options.filter(function (item, pos, self) {
                            return self.indexOf(item) == pos;
                        });
                    }
                    else {
                        field.options = game.currencies.treasure;
                    }
                }

                $input = $('<select>', { id: elementId, name: fieldName });

                if (field.selected !== undefined) {
                    var index = parseInt(field.selected, 10);
                    if (index === -1) {
                        $input.append($('<option>', {
                            value: 'default',
                            text: 'Select a value',
                            style: "display:none;",
                            selected: !defaultValue
                        }));
                    } else {
                        //$input.prop("selectedIndex", index); // todo not yet supported
                    }
                }

                var defaultSelected = false;
                field.options.forEach(function (option) {
                    var isSelected = option === defaultValue;
                    if (isSelected) defaultSelected = true;

                    var $option = $('<option>', {
                        value: option,
                        text: option,
                        selected: option === defaultValue
                    });
                    $input.append($option);
                });

                if (field.selected === -1 && !defaultSelected) {
                    $input.find('option[value="default"]').prop('selected', true);
                } else if (field.selected === -1 && defaultSelected) {
                    $input.find('option[value="default"]').prop('selected', false);
                }

            } else if (fieldType === 'multiselect') {
                var $multiSelectDiv = $('<div>').attr({
                    'data-type': 'multi-select',
                    class: 'multi-select',
                    id: elementId
                });

                if (field.preserveOrder === true) {
                    $multiSelectDiv.addClass('preserve-order');
                }

                field.options.forEach(function (option) {
                    var isChecked = false;

                    if (defaultValue) {
                        if (Array.isArray(defaultValue)) {
                            isChecked = defaultValue.includes(option);
                        } else {
                            isChecked = defaultValue === option;
                        }
                    }
                    var order;
                    if (field.preserveOrder && isChecked) {
                        if (Array.isArray(defaultValue)) {
                            order = defaultValue.indexOf(option) + 1;
                        } else {
                            order = 1;
                        }
                    }

                    var $checkbox = $('<input>', {
                        type: field.radio === true ? 'radio' : 'checkbox',
                        name: field.radio === true ? elementId : undefined,
                        value: option,
                        checked: isChecked,
                        'data-order': order !== undefined ? order : undefined
                    });


                    var $checkboxLabel = $('<label>', { class: 'checkbox-container' });
                    var $checkmarkTextSpan = $('<span>', { class: 'checkmark-text' }).text(option);
                    var $checkmarkIcon = $('<span>', { class: (field.radio === true ? 'radio-' : '') + 'checkmark' });
                    
                    $checkboxLabel.append($checkbox, $checkmarkIcon, $checkmarkTextSpan);
                    $multiSelectDiv.append($checkboxLabel).append('<br>');
                });

                $input = $multiSelectDiv;
            } else if (fieldType === 'elements') {
                var $multiSelectDiv = $('<div>', {
                    'data-type': 'multi-select',
                    class: 'multi-select elements',
                    style: 'user-select:none;',
                    'data-imagetype': field.imageType || 'icon',
                    id: elementId,
                    name: fieldName
                });

                if (field.preserveOrder === true) {
                    $multiSelectDiv.addClass('preserve-order');
                }

                var any = !field.options || field.options.length < 1 || field.options.includes("all");
                var elementOptions = {};

                if (any) {
                    field.options = ["primary", "epic", "gem"];
                }

                if (field.includeAll === true) {
                    var $toggleAllLabel = $('<label>', { class: 'checkbox-container' });
                    var $toggleAllCheckbox = $('<input>', {
                        type: 'checkbox',
                        class: 'toggle-all',
                        id: elementId + '-all',
                        value: 'All'
                    });
                    var $checkmarkTextSpanAll = $('<span>', { class: 'checkmark-text' }).text('All');
                    var $checkmarkIconAll = $('<span>', { class: 'checkmark' });

                    $toggleAllLabel.append($toggleAllCheckbox, $checkmarkIconAll, $checkmarkTextSpanAll);
                    $multiSelectDiv.append($toggleAllLabel).append('<br>');
                }

                field.options.forEach(function (elementType) {
                    if (game.elements[elementType]) {
                        elementOptions[elementType] = [];
                        game.elements[elementType].forEach(function (option) {
                            elementOptions[elementType].push(option);
                        });
                    }
                });

                for (var elementOption in elementOptions) {
                    var elements = elementOptions[elementOption];
                    elements.forEach(function (option) {
                        var $label = $('<label>', { class: 'checkbox-container' });

                        var isChecked = false;

                        if(defaultValue) {
                            if (Array.isArray(defaultValue)) {
                                isChecked = defaultValue.includes(option);
                            } else {
                                isChecked = defaultValue === option;
                            }
                        }
                        var order;
                        if (field.preserveOrder && isChecked) {
                            if (Array.isArray(defaultValue)) {
                                order = defaultValue.indexOf(option) + 1;
                            } else {
                                order = 1;
                            }
                        }

                        var $checkbox = $('<input>', {
                            type: field.radio === true ? 'radio' : 'checkbox',
                            name: field.radio === true ? elementId : undefined,
                            value: option,
                            checked: isChecked,
                            'data-order': order !== undefined ? order : undefined
                        });
                        
                        var $checkmarkTextSpan = $('<span>', { class: 'checkmark-text' }).text(option);
                        var $checkmarkIcon = $('<span>', { class: (field.radio === true ? 'radio-' : '') + 'checkmark' });

                        $label.append($checkbox, $checkmarkIcon, $checkmarkTextSpan);
                        $multiSelectDiv.append($label);
                    });

                    //todo only add if not last, then add under the X btn
                    $multiSelectDiv.append('<br>')
                }
                
                // if (field.radio === true) {
                //     var $clearButton = $('<button>', {
                //         id: elementId + '-clear',
                //         type: 'button'
                //     }).text('X');

                //     $multiSelectDiv.append($clearButton);

                //     $(document).on('click', '#' + elementId + '-clear', function (event) {
                //         console.log('clear click');
                //         event.preventDefault();
                //         $multiSelectDiv.find('input[type="radio"]').each(function () {
                //             setTimeout(function () {
                //             $(this).prop('checked', false);
                //             $(this).trigger('change');
                            
                //             }, 5); 
                //         });
                //     });
                // }
                
                $multiSelectDiv.append('<div class="feedback" id="' + elementId + '-feedback" name="' + key + '-feedback"></div>');

                $(document).on('change', '#' + elementId + '-all', function () {
                    var isChecked = $(this).is(':checked');
                    $(this).closest('div[data-type="multi-select"]').find('input[type="checkbox"]').not(this).prop('checked', isChecked);
                });

                $input = $multiSelectDiv;
            } else if(fieldType == "dragon-select") {
                var $multiSelectDiv = $('<select>', {
                    'data-type': 'dragon-select',
                    class: 'dragon-select',
                    style: 'user-select:none;',
                    id: elementId,
                    name: fieldName
                });

                if (allData.hasOwnProperty("Dragons")) {
                    var dragonData = allData["Dragons"];
                    var sortedData = dragonData.sort(function (a, b) {
                        return a.Name.localeCompare(b.Name);
                    });

                    var formattedData = sortedData.map(function (item) {
                        return { id: item.Name, text: item.Name };
                    });

                    function initSelect($elm) {
                        var isMultiSelect = true;
                        console.log('initing select2', elementId);
                        $elm.select2({
                            data: formattedData,
                            placeholder: field.placeholder || 'Select option(s)',
                            allowClear: true,
                            //width: width,
                            // minimumResultsForSearch: minimumResultsForSearch,
                            multiple: true,
                            maximumSelectionLength: field.maxSelect || undefined
                        });

                        if (defaultValue !== null && defaultValue !== undefined) {
                            var valToSet;
                            if (isMultiSelect) {
                                valToSet = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
                                valToSet = valToSet.filter(function (v) { return v !== null && v !== undefined && v !== ""; });
                            } else {
                                valToSet = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
                            }

                            if (valToSet !== undefined && (!Array.isArray(valToSet) || valToSet.length > 0)) {
                                $elm.val(valToSet).trigger('change.select2');
                            } else if (isMultiSelect && Array.isArray(valToSet) && valToSet.length === 0) {
                                $elm.val([]).trigger('change.select2'); 
                            } else if (!isMultiSelect && valToSet === undefined) {
                                $elm.val(null).trigger('change.select2');
                            }
                        } else {
                            $elm.val(isMultiSelect ? [] : null).trigger('change.select2');
                        }
                    }


                    // must be init after added to dom
                    var observer = new MutationObserver(function (mutations, observerInstance) {
                        mutations.forEach(function (mutation) {
                            //console.log('obsv mutation', mutation);
                            if (mutation && mutation.addedNodes) {
                                mutation.addedNodes.forEach(function (node) {

                                    if (node.nodeType === 1) {
                                        // Search the subtree of the added node for the select2 element
                                        var selectNode = $(node).find('#'+elementId);
                                        if (selectNode.length) {
                                            console.log('Select2 element found, initializing', selectNode[0]);
                                            initSelect(selectNode);
                                            observerInstance.disconnect();
                                        }
                                    }
                                });
                            }
                        });
                    });

                    observer.observe($('#dragon-form-container')[0], {
                        childList: true,
                        subtree: true
                    });
                    
                    $input = $multiSelectDiv;
                } else {
                    console.log("Must load dragons");
                }
            }
            else if (fieldType === 'rates') {
                var $ratesDiv = $('<div>', { 'data-type': 'rates', id: elementId });
                var $ratesRow = $('<div>', { class: 'rates-row' });

                var has_default = defaultValue && Array.isArray(defaultValue);

                var maxLevel = parseInt(game.maxDragonLevel, 10)
                for (var i = 0; i < maxLevel; ++i) {
                    var $rateInput = $('<input>', {
                        type: 'text',

                        value: has_default ? defaultValue[i] : '',
                        min: minValue,
                        max: maxValue,

                        required: isRequired,
                        onkeydown: "return event.key >= '0' && event.key <= '9' || event.key === 'Backspace' || event.key === 'Tab'",

                        maxlength: 4,
                        name: key + '_rate_' + (i + 1),
                        class: 'rate-input',
                        'data-index': i,
                        autocomplete: 'off'
                    });

                    $ratesRow.append($rateInput, $('<div>', { class: 'rate-label' }).text(i + 1));
                }

                $ratesDiv.append($ratesRow);
                $label = $('<div>').append($label).append($ratesDiv);
                $input = $ratesDiv;

                $(document).on('focus', 'input.rate-input', function () {
                    $(this).select();
                });

                $(document).on('input', 'input.rate-input', function () {
                    var $this = $(this);

                    clearTimeout($this.data('typingTimeout'));

                    $this.data('typingTimeout', setTimeout(function () {
                        var nextIndex = $this.data('index') + 1;
                        var $nextInput = $this.closest('.rates-row').find('input[data-index="' + nextIndex + '"]');

                        if ($nextInput.length) {
                            $nextInput.focus();
                        }
                    }, 400));
                });
            } else {
                $fieldBlock.append(makeText("Unable to find field type."));
                $formFields.append($fieldBlock);
            }

            if ($input) {
                if (fieldType === "toggle" || fieldType === "checkbox") {
                    $fieldBlock.append($input);
                    $fieldBlock.append($label);
                } else {
                    $fieldBlock.append($label);
                    $fieldBlock.append($input);
                }
                
                if (field.advanced === true) {
                    $formFieldsAdv.append($fieldBlock);
                } else {
                    $formFields.append($fieldBlock);
                }

            }
        });

        $subForm.append($formFields);

        if ($formFieldsAdv.children().length > 0) {
            var $toggleAdv = $('<div>', { 
                class: 'mw-collapsible mw-collapsed',
                // id: "mw-customcollapsible-advanced", 
                'data-collapsetext': "Hide Advanced", 
                'data-expandtext': "Show Advanced" 
            }).text("{adv_placeholder}");

            var collapsibleWikitext = $toggleAdv.prop('outerHTML');

            var $advPlaceholder = $('<div>').attr('id', 'adv-temp-' + subform_key).hide().append($formFieldsAdv);
            $subForm.append($advPlaceholder);

            ModuleInject.renderWikitext(collapsibleWikitext).then(function (renderedHtml) {
                renderedHtml = renderedHtml.replace("{adv_placeholder}", '<div class="advanced-content-wrapper"></div>');
                var $renderedCollapsible = $(renderedHtml);
                $renderedCollapsible.find('.advanced-content-wrapper').append($formFieldsAdv);
                $advPlaceholder.remove();
                $subForm.append($renderedCollapsible);
            }).catch(function (err) {
                console.error("Error rendering wikitext for advanced section:", err);
                $advPlaceholder.remove();
                $subForm.append($formFieldsAdv);
            });
        }


      //     ModuleInject.renderWikitext($toggleAdv.prop('outerHTML')).then(function(text) {
      //         text = text.replace("{adv}", $formFieldsAdv.prop('outerHTML'));

      //         var $result = $('<div>');
      //         $result.html(text);

      //         $subForm.append($result);
      //     });

      //     // $subForm.append($('<span>', { class: 'mw-customtoggle-advanced' }).text("Advanced"));
      // }


        return $subForm;
    }

    function initializeForm(formConfig, game) {
        var $form_container = $('#dragon-form-container');
        if ($form_container === null) return;

        var dragonEdit = null;
        if ($form_container.is('[data-page]')) {
            dragonEdit = $form_container.data('page');

            var index = dragonEdit.indexOf(" Dragon");
            dragonEdit = index !== -1 ? dragonEdit.substring(0, index) : dragonEdit;
        }

        var $form = $('<form>', { id: 'dragon-form', class:'data-form' });
        var promises = [];

        var api = new mw.Api();
        var subforms = {}
        var tabberParts = {};
        var tabberHtml = "<tabber>"

        var allData = {}
        $.each(formConfig, function (key, config) {
            var promise = ModuleInject.loadJsonData(api, 'Data:' + key + '.json').then(function (results) {
                var data = null;
                var jsonKey = key.charAt(0).toLowerCase() + key.slice(1);
                if (results.hasOwnProperty(jsonKey)) {
                    data = results[jsonKey];
                } else {
                    data = results;
                }

                allData[key] = data
            })
            .catch(function (error) {
                console.error(error);
            });

            promises.push(promise);
        });

        Promise.all(promises).then(function () {
            $.each(formConfig, function (key, config) {
                var metaConfig = null;
                if (config.hasOwnProperty('*')) {
                    metaConfig = config['*']
                    delete config['*'];
                }

                var $subform = create_subform(allData, config, key, game, dragonEdit);

                var tabName = (metaConfig && metaConfig.hasOwnProperty('Title')) ? metaConfig.Title : key;
                subforms[key] = $subform
                tabberParts[key] = "|-| " + tabName + "=" + "**" + key + "**";
            });

            $.each(formConfig, function (key) {
                if (tabberParts.hasOwnProperty(key)) {
                    tabberHtml += tabberParts[key];
                }
            });
            tabberHtml += "</tabber>";

            ModuleInject.renderWikitext(tabberHtml).then(function(text) {
                $.each(subforms, function (key, $sb) {
                    var placeholder = new RegExp("\\*\\*" + key + "\\*\\*", "g");
                    text = text.replace(placeholder, $sb.prop('outerHTML'));
                });

                var $result = $('<div>');
                $result.html(text);

                $form.append($result);

                var $submitContainer = $('<div>', { class: 'form-submit-container' });
                
                var previewButton = new OO.ui.ButtonInputWidget({
                    label: 'Preview',
                    name: 'dragonPreview',
                    id: 'dragonPreview',
                    type: 'submit',
                    flags: []
                });

                var saveButton = new OO.ui.ButtonInputWidget({
                    label: 'Save',
                    name: 'dragonSave',
                    id: 'dragonSave',
                    type: 'submit',
                    flags: ['primary', 'progressive']
                });

                $submitContainer.append(previewButton.$element, saveButton.$element);
                $form.append($submitContainer);




                // var $container = $('<span>', {
                //     id: 'ooui-widget-examples',
                //     css: {
                //         display: 'block',
                //         padding: '20px',
                //         border: '1px solid #ccc',
                //         backgroundColor: '#f9f9f9'
                //     }
                // });

                // $container.append($('<h3>').text('OOUI Widget Examples'));

                // // 1. ButtonWidget
                // var button = new OO.ui.ButtonWidget({
                //     label: 'Click Me',
                //     flags: ['primary', 'progressive']
                // });
                // $container.append($('<div>').text('ButtonWidget:').css('margin-top', '10px'));
                // $container.append(button.$element);

                // // 2. ButtonInputWidget
                // var buttonInput = new OO.ui.ButtonInputWidget({
                //     label: 'Submit',
                //     type: 'submit',
                //     flags: ['destructive']
                // });
                // $container.append($('<div>').text('ButtonInputWidget:').css('margin-top', '10px'));
                // $container.append(buttonInput.$element);

                // // 3. TextInputWidget
                // var textInput = new OO.ui.TextInputWidget({
                //     placeholder: 'Enter your name',
                //     value: 'John Doe'
                // });
                // $container.append($('<div>').text('TextInputWidget:').css('margin-top', '10px'));
                // $container.append(textInput.$element);

                // // 4. CheckboxInputWidget
                // var checkbox = new OO.ui.CheckboxInputWidget({
                //     value: 'yes',
                //     selected: true
                // });
                // $container.append($('<div>').text('CheckboxInputWidget:').css('margin-top', '10px'));
                // $container.append(checkbox.$element);

                // // 5. RadioButtonWidget
                // var radioButton = new OO.ui.RadioSelectWidget({
                //     items: [
                //         new OO.ui.RadioOptionWidget({
                //             data: 'option1',
                //             label: 'Option 1'
                //         }),
                //         new OO.ui.RadioOptionWidget({
                //             data: 'option2',
                //             label: 'Option 2'
                //         })
                //     ]
                // });
                // $container.append($('<div>').text('RadioSelectWidget:').css('margin-top', '10px'));
                // $container.append(radioButton.$element);

                // // 6. DropdownWidget
                // var dropdown = new OO.ui.DropdownWidget({
                //     label: 'Select an option',
                //     menu: {
                //         items: [
                //             new OO.ui.MenuOptionWidget({
                //                 data: 'option1',
                //                 label: 'Option 1'
                //             }),
                //             new OO.ui.MenuOptionWidget({
                //                 data: 'option2',
                //                 label: 'Option 2'
                //             })
                //         ]
                //     }
                // });
                // $container.append($('<div>').text('DropdownWidget:').css('margin-top', '10px'));
                // $container.append(dropdown.$element);

                // // 7. FieldsetLayout
                // var fieldset = new OO.ui.FieldsetLayout({
                //     label: 'User Information'
                // });
                // fieldset.addItems([
                //     new OO.ui.FieldLayout(new OO.ui.TextInputWidget({
                //         placeholder: 'Username'
                //     }), { label: 'Username' }),
                //     new OO.ui.FieldLayout(new OO.ui.TextInputWidget({
                //         placeholder: 'Password',
                //         type: 'password'
                //     }), { label: 'Password' })
                // ]);
                // $container.append($('<div>').text('FieldsetLayout:').css('margin-top', '10px'));
                // $container.append(fieldset.$element);

                // // 8. IconWidget
                // var icon = new OO.ui.IconWidget({
                //     icon: 'bell',
                //     title: 'Notifications'
                // });
                // $container.append($('<div>').text('IconWidget:').css('margin-top', '10px'));
                // $container.append(icon.$element);

                // // 9. LabelWidget
                // var label = new OO.ui.LabelWidget({
                //     label: 'This is a LabelWidget'
                // });
                // $container.append($('<div>').text('LabelWidget:').css('margin-top', '10px'));
                // $container.append(label.$element);

                // // 10. ProgressBarWidget
                // var progressBar = new OO.ui.ProgressBarWidget({
                //     progress: 50 // 50% progress
                // });
                // $container.append($('<div>').text('ProgressBarWidget:').css('margin-top', '10px'));
                // $container.append(progressBar.$element);

                // // 11. ToggleSwitchWidget
                // var toggleSwitch = new OO.ui.ToggleSwitchWidget({
                //     value: true
                // });
                // toggleSwitch.on('change', function (value) {
                //     console.log('ToggleSwitchWidget value:', value);
                // });
                // $container.append($('<div>').text('ToggleSwitchWidget:').css('margin-top', '10px'));
                // $container.append(toggleSwitch.$element);

                // // 12. PopupButtonWidget
                // var popupButton = new OO.ui.PopupButtonWidget({
                //     label: 'Open Popup',
                //     popup: {
                //         $content: $('<p>').text('This is the content of the popup.'),
                //         padded: true,
                //         align: 'center'
                //     }
                // });
                // $container.append($('<div>').text('PopupButtonWidget:').css('margin-top', '10px'));
                // $container.append(popupButton.$element);


                // $form.append($container);










                $form_container.append($('<div>').attr('id', 'box-result'));

                $form_container.append($form);

                if (dragonEdit !== null) {
                    var nameInput = $form.find('input#Name-Dragons');
                    if (nameInput.length) {
                        nameInput.val(dragonEdit).prop('disabled', true);
                    }
                } else {
                    var pageName = mw.config.get('wgPageName').replaceAll('_', ' ');
                    if (pageName.includes(" Dragon")) {
                        var nameInput = $form.find('input#Name-Dragons');
                        if (nameInput.length) {
                            nameInput.val(pageName.replace(' Dragon', '')).prop('disabled', true);
                        }
                    }
                }

                var releaseDateInput = $form.find('input#ReleaseDate-Dragons[type="date"]');
                console.log('existing val:', releaseDateInput.val())
                if (releaseDateInput.length && !(releaseDateInput.val().trim())) {
                    var today = new Date();
                    var formattedDate = today.toISOString().split('T')[0];

                    releaseDateInput.val(formattedDate);
                }

                function updateFeedbackImages($multiSelectDiv, selectedParams, imageType) {
                    var feedbackContainerId = $multiSelectDiv.attr('id') + '-feedback';
                    ModuleInject.invokeModule(
                        `DvWiki`,
                        'Show',
                        [],
                        {
                            type: imageType,
                            elements: selectedParams,
                            size: "40px"
                        }
                    ).then(html => {
                        $('#' + feedbackContainerId).html(html);
                    });
                }

                $('.sub-form').each(function (index, element) {
                    var $sb = $(element);
                    var subformId = $sb.attr('data-formid')

                    var selectedOptions = {};
                    selectedOptions[subformId] = {};

                    $sb.find('div[data-type="multi-select"]').each(function () {
                        var $multiSelectDiv = $(this);


                        var key = $multiSelectDiv.attr('id');

                        if (!selectedOptions[subformId][key]) {
                            selectedOptions[subformId][key] = [];
                        }
                        var checkedChildren = [];
                        var children = $multiSelectDiv.find('input[type="checkbox"]:not([id$="-all"]), input[type="radio"]');

                        children.each(function () {
                            var optionValue = $(this).val();
                            if ($(this).is(':checked')) {
                                checkedChildren.push(this);
                            } else {
                                selectedOptions[subformId][key] = selectedOptions[subformId][key].filter(function (item) {
                                    return item !== optionValue;
                                });
                            }
                        });

                        checkedChildren.sort(function (a, b) {
                            return (parseInt($(a).attr('data-order'), 10) || 0) - (parseInt($(b).attr('data-order'), 10) || 0);
                        });

                        for (var i = 0; i < checkedChildren.length; i++) {
                            var optionValue = $(checkedChildren[i]).val();
                            selectedOptions[subformId][key].push(optionValue);
                        }

                        var allCheckbox = $multiSelectDiv.find('input[type="checkbox"][value="All"]');
                        if (allCheckbox && children.length === selectedOptions[subformId][key].length) {
                            allCheckbox.prop('checked', true);
                        } else if (allCheckbox) {
                            allCheckbox.prop('checked', false);
                        }

                        if ($multiSelectDiv.hasClass('elements')) {
                            updateFeedbackImages($multiSelectDiv, selectedOptions[subformId][key], $multiSelectDiv.data('imagetype'));
                        }
                    });

                    $sb.on('click', '.clear-duration', function (event) {
                        event.preventDefault();

                        var $durationDiv = $(this).closest('div[data-type="duration"]');

                        $durationDiv.find('input[type="number"]').each(function () {
                            $(this).val(null);
                            $(this).attr('value', null);
                        });
                    });

                    // allow deselection of radio
                    // $sb.on('click', 'div[data-type="multi-select"] input[type="radio"]', function (event) {
                    //     event.preventDefault();

                    //     var key = $(this).closest('div[data-type="multi-select"]').attr('id');
                    //     var subformId = $(this).closest('.sub-form').attr('data-formid');

                    //     if ($(this).is(':checked')) {
                    //         event.preventDefault();

                            
                    //             $(this).prop('checked', false);
                    //             selectedOptions[subformId][key] = [];
                    //        // $(this).trigger('change');
                    //     }
                    // });

                    $sb.on('input keydown paste', 'input[type="number"]:not(div[data-type="duration"] input)', function (event) {
                        const $input = $(this);

                        if (event.type === 'input') {
                            let value = $input.val().replace(/[^0-9]/g, '');

                            const maxLength = $input.attr('data-maxlength');
                            if (maxLength && value.length > maxLength) {
                                value = value.slice(0, maxLength);
                            }

                            let minValue = $input.attr('min') !== undefined ? parseFloat($input.attr('min')) : undefined;
                            let maxValue = $input.attr('max') !== undefined ? parseFloat($input.attr('max')) : undefined;

                            $input.val(value);
                            
                            if (minValue !== undefined && value < minValue) {
                                $input.val(minValue);
                            }

                            if (maxValue !== undefined && value > maxValue) {
                                $input.val(maxValue);
                            }
                        }

                        if (event.type === 'keydown') {
                            if (event.ctrlKey || event.metaKey) {
                                return;
                            }
                            if (
                                !/[0-9]/.test(event.key) &&
                                event.key !== 'Backspace' &&
                                event.key !== 'Delete' &&
                                event.key !== 'ArrowLeft' &&
                                event.key !== 'ArrowRight' &&
                                event.key !== 'Tab'
                            ) {
                                event.preventDefault();
                            }
                        }

                        if (event.type === 'paste') {
                            event.preventDefault();
                            const pastedText = (event.originalEvent.clipboardData || window.clipboardData).getData('text');
                            if (/^[0-9]+$/.test(pastedText)) {
                                $input.val($input.val() + pastedText);
                            }
                        }
                    });

                    $sb.on('input keydown paste', 'div[data-type="duration"] input[type="number"]', function (event) {
                        const $input = $(this);

                        if (event.type === 'input') {
                            let value = $input.val().replace(/[^0-9]/g, '');

                            const maxLength = $input.attr('data-maxlength');
                            if (maxLength && value.length > maxLength) {
                                value = value.slice(0, maxLength);
                            }

                            let minValue = $input.attr('min') !== undefined ? parseFloat($input.attr('min')) : undefined;

                            if (minValue !== undefined && value < minValue) {
                                $input.val(minValue);
                            }

                            $input.val(value);

                            handleDurationOverflow($input);
                        }

                        if (event.type === 'keydown') {
                            if (event.ctrlKey || event.metaKey) {
                                return;
                            }

                            if (
                                !/[0-9]/.test(event.key) &&
                                event.key !== 'Backspace' &&
                                event.key !== 'Delete' &&
                                event.key !== 'ArrowLeft' &&
                                event.key !== 'ArrowRight' &&
                                event.key !== 'Tab'
                            ) {
                                event.preventDefault();
                            }
                        }

                        if (event.type === 'paste') {
                            event.preventDefault();
                            const pastedText = (event.originalEvent.clipboardData || window.clipboardData).getData('text');
                            if (/^[0-9]+$/.test(pastedText)) {
                                $input.val($input.val() + pastedText);
                                handleDurationOverflow($input);
                            }
                        }
                    });

                    $sb.on('change', 'div[data-type="multi-select"] input[type="checkbox"], div[data-type="multi-select"] input[type="radio"]', function () {
                        var $multiSelectDiv = $(this).closest('div[data-type="multi-select"]');

                        var key = $multiSelectDiv.attr('id');

                        var allCheckbox = $multiSelectDiv.find('input[type="checkbox"][value="All"]');
                        var children = $multiSelectDiv.find('input[type="checkbox"]:not([id$="-all"]), input[type="radio"]');

                        if (allCheckbox.length && $(this).is(allCheckbox)) {
                            selectedOptions[subformId][key] = [];

                            if (allCheckbox.is(':checked')) {
                                children.each(function () {
                                    if ($(this).is(allCheckbox)) {
                                        return;
                                    }
                                    var optionValue = $(this).val();
                                    selectedOptions[subformId][key].push(optionValue);
                                    $(this).prop('checked', true);
                                });
                            }
                        } else {
                            var optionValue = $(this).val();

                            if (!selectedOptions[subformId][key]) {
                                selectedOptions[subformId][key] = [];
                            }

                            if ($(this).is(':radio')) {
                                selectedOptions[subformId][key] = [];
                            }

                            if ($(this).is(':checked')) {
                                selectedOptions[subformId][key].push(optionValue);

                                var selectedCount = children.filter(':checked').length;
                                var order = selectedCount + 1;
                                $(this).attr('data-order', order);

                                if (allCheckbox && children.length === selectedCount) {
                                    allCheckbox.prop('checked', true);
                                }
                            } else {
                                selectedOptions[subformId][key] = selectedOptions[subformId][key].filter(function (item) {
                                    return item !== optionValue;
                                });

                                $(this).removeAttr('data-order');


                                var checkedChildren = [];
                                children.each(function () {
                                    if ($(this).is(':checked')) {
                                        checkedChildren.push($(this));
                                    }
                                });

                                checkedChildren.sort(function (a, b) {
                                    return (parseInt($(a).attr('data-order'), 10) || 0) - (parseInt($(b).attr('data-order'), 10) || 0);
                                });

                                // Reassign data-order
                                for (var i = 0; i < checkedChildren.length; i++) {
                                    $(checkedChildren[i]).attr('data-order', i + 1);
                                }

                                if (allCheckbox) {
                                    allCheckbox.prop('checked', false);
                                }
                            }
                        }

                       // console.log('detected change on', key, selectedOptions[subformId][key]);
                        if ($multiSelectDiv.hasClass('elements')) {
                            updateFeedbackImages($multiSelectDiv, selectedOptions[subformId][key], $multiSelectDiv.data('imagetype'));
                        }
                    });
                });

                function getFormResults() {
                    var formResults = {}
                    $('.sub-form').each(function () {
                        var $subForm = $(this);
                        var subformId = $subForm.attr('data-formid')
                        console.log('processing subform ', subformId);

                        {
                            var subformData = {};
                            $subForm.find('input:not([id$="-all"]), select, textarea, div[data-type]')
                            .not('div[data-type="duration"] input')
                            .each(function () {
                                var key = $(this).attr('id');

                                if (!key) {
                                    return;
                                }
                                key = key.split('-')[0];

                                if ($(this).attr('type') === 'checkbox' || $(this).attr('type') === 'radio') {
                                    subformData[key] = $(this).is(':checked');
                                } else if ($(this).attr('type') === 'number') {
                                    subformData[key] = parseFloat($(this).val()) || 0;
                                } else if ($(this).attr('type') === 'date') {
                                    var date = new Date($(this).val()); // Date will be in 'YYYY-MM-DD' format

                                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    subformData[key] = date.toLocaleDateString('en-US', options);
                                } else if ($(this).attr('type') === 'time') {
                                    subformData[key] = $(this).val();
                                } else if ($(this).is('div[data-type="duration"]')) {
                                    var durationString = '';

                                    Object.keys(durationConfig.units)
                                        .filter(unitKey => unitKey !== "day")
                                        .forEach(function (unitKey)
                                    {
                                        var unit = durationConfig.units[unitKey];
                                        var value = parseInt($(this).find(`input[name$="_${unitKey}"]`).val()) || 0;

                                        if (unitKey === 'hour') {
                                            // Check for "day" and convert it to hours
                                            var dayKey = 'day';
                                            var dayValue = parseInt($(this).find(`input[name$="_${dayKey}"]`).val()) || 0;
                                            if (dayValue > 0) {
                                                value += dayValue * 24;
                                            }
                                        }

                                        if (value > 0) {
                                            durationString += value + ' ' + unit.short + ' ';
                                        }
                                    }.bind(this));

                                    subformData[key] = durationString.trim();
                                }
                                else if ($(this).is('div[data-type="multi-select"].preserve-order')) {
                                    var checkedChildren = $(this).find('input[type="checkbox"]:checked:not([id$="-all"])');
                                    checkedChildren.sort(function (a, b) {
                                        return (parseInt($(a).attr('data-order'), 10) || 0) - (parseInt($(b).attr('data-order'), 10) || 0);
                                    });

                                    subformData[key] = checkedChildren.map(function () {
                                        return $(this).val();
                                    }).get() || [];
                                }
                                else if ($(this).is('div[data-type="multi-select"]')) {
                                    subformData[key] = $(this).find('input[type="checkbox"]:checked:not([id$="-all"])').map(function () {
                                        return $(this).val();
                                    }).get() || [];
                                }
                                else if ($(this).is('div[data-type="rates"]')) {
                                    var ratesArray = [];

                                    $(this).find('input.rate-input').each(function () {
                                        var rateValue = $(this).val().trim();

                                        if (rateValue !== '' && !isNaN(rateValue)) {
                                            ratesArray.push(parseInt(rateValue, 10));
                                        }
                                    });

                                    subformData[key] = ratesArray;
                                }
                                else {
                                    subformData[key] = $(this).val();
                                }

                                console.log('submitting key:', key, 'value:', JSON.stringify(subformData[key]), "on subform", subformId);
                            });

                            formResults[subformId] = subformData;
                        }
                    });

                    if (dragonEdit === null) {
                        formResults.Dragons.ReleaseDate = formResults.Dragons.ReleaseDate + " #" + (allData.Dragons.length + 1)
                    }
                    else {
                        //todo order field
                    }

                    if (formResults.Dragons.Traits && formResults.Dragons.Traits.length > 0) {
                        var traitsObject = {};

                        if (formResults.Dragons.Traits.length === 1) {
                            traitsObject.Default = formResults.Dragons.Traits[0];
                        } else {
                            traitsObject.Available = formResults.Dragons.Traits;
                        }

                        formResults.Dragons.Traits = JSON.stringify(traitsObject);//todo fix issue when no traits chosen
                    }

                    console.log(formResults);

                    // todo remove optional fields like false bools or maybe expose optional in form config

                    return formResults;
                }

                $form.on('click', '#dragonPreview', function (event) {
                    event.preventDefault();
                    console.log('submitting all form');

                    var formResults = getFormResults();

                    ModuleInject.invokeModule(
                        `Dragonbox`,
                        'preview',
                        [],
                        formResults.Dragons
                    ).then(html => {
                        $('div#box-result').html(html + "<hr/>");
                    });

                    $('html, body').animate({ scrollTop: 0 }, 'fast');
                });

                $form.on('click', '#dragonSave', function (event) {
                    event.preventDefault();
                    console.log('saving all form');

                    var formResults = getFormResults();

                    $.each(allData, function (dataKey, dataValue) {
                        dataValue.push(formResults[dataKey]);

                        var jsonKey = dataKey.charAt(0).toLowerCase() + dataKey.slice(1)
                        var jsonData = {};
                        jsonData[jsonKey] = dataValue

                        // Update the JSON files on the wiki
                        api.postWithToken('csrf', {
                            action: 'edit',
                            title: 'Data:' + dataKey + '.json',
                            text: JSON.stringify(jsonData),
                            summary: 'Updating ' + dataKey + '.',
                            format: 'json',
                            bot: true
                        }).done(function (data) {
                            if (data.edit && data.edit.result === 'Success') {
                                alert('Updated successfully!');
                            } else {
                                alert('Error updating entry.');
                            }
                        })
                        .fail(function (error) {
                            console.error(error);
                            alert('Error connecting to the API.');
                        });
                    });
                });
            });
        }).catch(function (error) {
            console.error("One or more promises failed: ", error);
        });
    }

    mw.loader.using('mediawiki.api', function () {
        var api = new mw.Api();

        mw.hook('wikipage.content').add(function () {
            Promise.all([
                ModuleInject.loadJsonData(api, 'Data:NewDragonConfig.json'),
                ModuleInject.loadJsonData(api, 'Data:Game.json')
            ])
            .then(function (results) {
                ModuleInject.waitForElement('#dragon-form-container').then(el => {
                    var config = results[0];
                    var game = results[1];

                    initializeForm(config, game);

                });
            })
            .catch(function (error) {
                console.error(error);
            });
        });
    });
});