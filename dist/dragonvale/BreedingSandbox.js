;
$(document).ready(function () {
    function addDropdown(id, placeholder, $parent) {
        var $container = $('<div class="dropdown-container field"></div>');
        var $label = $('<label for="' + id + '">' + placeholder + '</label>');
        var $select = $('<select id="' + id + '"></select>');
        $container.append($label).append($select);
        $parent.append($container);

        return $container;
    }

    function initializeDropdown($select, data, config, callback) {
        var placeholder = config.placeholder || 'Select an option';
        var width = config.width || '50%';
        var allowClear = config.allowClear || false;

        var minimumResultsForSearch = (config.minimumResultsForSearch !== undefined)
            ? config.minimumResultsForSearch
            : Infinity;

        $select.select2({
            data: data,
            placeholder: placeholder,
            allowClear: allowClear,
            width: width,
            minimumResultsForSearch: minimumResultsForSearch,
            //multiple:true,
            //maximumSelectionLength: 2
             // selectionCssClass: "custom-select2",
            // theme: "wiki"
        });
        
        $select.on('change', callback);
        
        $select.on('select2:open', function (e) {
            const selectId = e.target.id
            $('#sandboxConfig').css('filter', 'blur(2px)');

            $(".select2-search__field[aria-controls='select2-" + selectId + "-results']")
            .each(function (key, value) {
                value.focus();
            }).attr('placeholder', 'Search...');
        });

        $select .on('select2:close', function () {
            $('#sandboxConfig').css('filter', 'none');
        }); 

        if (config.startBlank === true) {
            $select.val("");
            $select.trigger("change");
        }
    }

    function addCheckbox(id, label, $parent) {
        var $checkboxContainer = $('<div class="checkbox-container field"></div>');
        var $checkboxLabel = $('<label for="' + id + '">' + label + '</label>');
        var $checkboxInput = $('<input type="checkbox" id="' + id + '">');
        $checkboxLabel.append($checkboxInput);
        $checkboxContainer.append($checkboxLabel);
        $parent.append($checkboxContainer);

        return $checkboxInput;
    }

    function initializeCheckbox($checkbox, config, callback) {
        $checkbox.on('change', callback);
    }

    function initializeSandbox(config) {
        var $sandbox = $('#dragonSandbox');

        if ($sandbox === null) return;

        var parentsData = parseInt($sandbox.data('parents'));
        var pageName = mw.config.get('wgPageName').replaceAll('_', ' ');

        var $sandboxConfig = $('<div id="sandboxConfig"></div>');
        $sandbox.append($sandboxConfig);

        var $configMap = {};

        function createDropdown(dropdown) {
            var $container = addDropdown(dropdown.id, dropdown.label, $sandboxConfig)
            var $select = $container.find('select');
            $configMap[dropdown.id] = { el: $select, config: dropdown };

            var data = dropdown.data;
            if (typeof data === 'string') {
                var api = new mw.Api();
                ModuleInject.loadJsonData(api, data).then(function (result) {
                    var sortedData = dropdown.dataKey ? result[dropdown.dataKey] : result;
                    if (dropdown.config.sortKey) {
                        sortedData = sortedData.sort(function (a, b) {
                            return a[dropdown.config.sortKey].localeCompare(b[dropdown.config.sortKey]);
                        });
                    }

                    var formattedData = sortedData.map(function (item) {
                        return { id: item[dropdown.config.idKey], text: item[dropdown.config.textKey] };
                    });

                    initializeDropdown($select,   formattedData, dropdown.config, handleChange);

                    if (dropdown.id === 'dragonDropdown' && parentsData == 2) {
                        var cloneConfig = $.extend(true, {}, dropdown);
                        cloneConfig.id = cloneConfig.id + '_clone';
                        cloneConfig.data = formattedData;
                        $clonedContainer = createDropdown(cloneConfig);
                        $clonedContainer.insertAfter($container);

                        $container.addClass('dragon-dropdown-container')
                        $clonedContainer.addClass('dragon-dropdown-container')
                    }
                }, function (error) {
                    console.error(error);
                });
            } else {
                initializeDropdown($select,  data, dropdown.config, handleChange);

                if (dropdown.id === 'dragonDropdown' && parentsData == 2) {
                    var cloneConfig = $.extend(true, {}, dropdown);
                    cloneConfig.id = cloneConfig.id + '_clone';
                    $clonedContainer = createDropdown(cloneConfig);
                    $clonedContainer.insertAfter($container);

                    $container.addClass('dragon-dropdown-container')
                    $clonedContainer.addClass('dragon-dropdown-container')
                }
            }

            return $container
        }

        config.dropdowns.forEach(function (dropdown) {
            createDropdown(dropdown);
        });

        config.checkboxes.forEach(function (checkbox) {
            var $checkboxInput = addCheckbox(checkbox.id, checkbox.label, $sandboxConfig);
            $configMap[checkbox.id] = { el: $checkboxInput, config: checkbox };

            initializeCheckbox($checkboxInput, checkbox, handleChange);
        });

        $sandbox.append($('<br/>'));

        var $results = $('<div id="sandboxResults"></div>');
        $sandbox.append($results);

        function handleChange() {
            var unnamedArgs = [];
            var namedArgs = {};

            if (parentsData != 2) {
                unnamedArgs.push(pageName);
            }

            Object.values($configMap).forEach(function (item) {
                var $element = item.el;
                var config = item.config;
                var key = config.key;

                if ($element.is('select')) {
                    var value = $element.val();
                    if (key) {
                        namedArgs[key] = value;
                    } else {
                        unnamedArgs.push(value);
                    }
                } else if ($element.is('input[type="checkbox"]')) {
                    var value = $element.is(':checked') ? 'yes' : 'no';
                    if (key) {
                        namedArgs[key] = value;
                    } else {
                        unnamedArgs.push(value);
                    }
                }
            });

            ModuleInject.invokeModule(
                `BreedingSandbox`,
                'breed',
                unnamedArgs,
                namedArgs
            ).then(html => {
                $results.html(html);
            });
        }
    }

    function initializeHintSearch(config) {
        var $hintSearchDiv = $('#hintSearch');
        if ($hintSearchDiv.length === 0) return;

        var $configContainer = $('<div id="hintSearchConfig"></div>');
        $hintSearchDiv.append($configContainer);

        var $dragonSelect;

        // --- Configuration for the single dropdown ---
        // define it here, it's simple enough
        var dropdownConfig = {
            id: 'hintDragonDropdown',
            label: 'Select Dragon for Hint:',
            data: 'Data:Dragons.json',
            dataKey: 'dragons',
            config: {
                idKey: 'Name',
                textKey: 'Name',
                sortKey: 'Name',
                placeholder: 'Select a Dragon',
                allowClear: true,
                width: '300px',
                minimumResultsForSearch: 10,
                startBlank: true
            }
        };

        var $container = addDropdown(dropdownConfig.id, dropdownConfig.label, $configContainer);
        $dragonSelect = $container.find('select');

        var data = dropdownConfig.data;
        if (typeof data === 'string') {
            var api = new mw.Api();
            ModuleInject.loadJsonData(api, data).then(function (result) {
                var sortedData = dropdownConfig.dataKey ? result[dropdownConfig.dataKey] : result;
                if (dropdownConfig.config.sortKey) {
                    sortedData = sortedData.sort(function (a, b) {
                        var textA = a[dropdownConfig.config.sortKey] || '';
                        var textB = b[dropdownConfig.config.sortKey] || '';
                        return textA.localeCompare(textB);
                    });
                }

                var formattedData = sortedData.map(function (item) {
                    var id = item[dropdownConfig.config.idKey] || '';
                    var text = item[dropdownConfig.config.textKey] || id;
                    return { id: id, text: text };
                });

                formattedData = formattedData.filter(function (item) { return item.id; });

                initializeDropdown($dragonSelect, formattedData, dropdownConfig.config, handleHintChange);

            }, function (error) {
                console.error("HintSearch Error loading dropdown data:", error);
                $container.append('<p style="color: red;">Error loading dragon list.</p>');
            });
        } else {
            initializeDropdown($dragonSelect, data, dropdownConfig.config, handleHintChange);
        }

        // --- Results Area ---
        var $resultsContainer = $('<div id="hintSearchResults"></div>');
        $hintSearchDiv.append($resultsContainer);
        $resultsContainer.html('<p><i>Select a dragon to view its breeding hint.</i></p>');

        // --- Change Handler ---
        function handleHintChange() {
            var selectedDragon = $dragonSelect.val();

            if (!selectedDragon) {
                $resultsContainer.html('<p><i>Select a dragon to view its breeding hint.</i></p>');
                return;
            }

            var unnamedArgs = [selectedDragon];
            var namedArgs = {};

            $resultsContainer.html('<p><i>Loading hint...</i></p>');

            ModuleInject.invokeModule(
                `BreedingSandbox`,
                'VisualHint',
                unnamedArgs,
                namedArgs
            ).then(html => {
                $resultsContainer.html(html);
            });
        }
    }
 
    mw.loader.using('mediawiki.api', function () {
        var api = new mw.Api();

        mw.hook('wikipage.content').add(function () {
            Promise.all([
                ModuleInject.loadJsonData(api, 'Data:SandboxConfig.json')
            ])
                .then(function (results) {
                    var sandboxConfig = results[0];

                    ModuleInject.waitForElement('#dragonSandbox').then(el=>{
                        initializeSandbox(sandboxConfig);
                    });

                    ModuleInject.waitForElement('#hintSearch').then(el => {
                        initializeHintSearch(); 
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    });
});