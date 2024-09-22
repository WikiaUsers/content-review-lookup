function loadJsonData(api, pageTitle) {
    return new Promise(function (resolve, reject) {
        api.get({
            action: "query",
            format: "json",
            prop: "revisions",
            titles: pageTitle,
            rvprop: "content",
            rvslots: "main"
        }).done(function (data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];

            if (pageId === "-1") {
                console.info('Page not found');
                return;
            }

            var content = pages[pageId].revisions[0].slots.main['*'];

            try {
                var jsonData = JSON.parse(content);
                resolve(jsonData);
            } catch (e) {
                reject('Error parsing JSON:', e);
            }
        }).fail(function (error) {
            reject('API request failed:', error);
        });
    });
}

function initializeWhenDivIsReady(id, callback) {
    var observer = new MutationObserver(function (mutations, observerInstance) {

        var $element = document.getElementById(id);
        if ($element) {
            observerInstance.disconnect();

            callback($element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function initializeForum(dragons) {
    var $form_container = $('#dragon-form-container');
    if ($form_container === null) return;

    var allFields = new Set();
    dragons.forEach(function (dragon) {
        for (var key in dragon) {
            allFields.add(key);
        }
    });

    var formHtml = '<form id="dragon-form">';

    var fieldTypes = {
        Name: 'text',
        Description: 'textarea',
        Goal: 'textarea',
        BreedingTime: "duration",
        IsLimited: 'checkbox',
        ReleaseDate: 'date',
        BuyPrice: {
            type: "number",
            min: 0
        },
        BuyCurrency: {
            type: 'dropdown',
            options: ['DragonCash', 'Gems'],
            default: "Gems"
        },
        SellPrice: "number",
        SellCurrency: {
            type: 'dropdown',
            options: ['DragonCash', 'Gems']
        },
        PedestalBuyPrice: "number",
        PedestalBuyCurrency: {
            type: 'dropdown',
            options: ['DragonCash', 'Gems']
        },
        HatchExperience: "number",
        LevelRequirement: "number",
        Elder: "checkbox",
        Ghostly: "checkbox",
        Rarity: {
            type: 'dropdown',
            options: ['Primary', 'Hybird', 'Rare', 'Epic', "Gemstone", "Legendary", "Mythic"]
        },
        Elements: {
            type: 'multiselect',
            options: ['Plant', 'Fire', 'Earth', 'Cold']
        },
        Traits: {
            type: 'multiselect',
            options: ['Plant', 'Fire', 'Earth', 'Cold']
        },
        BreedingElements: {
            type: 'multiselect',
            options: ['Plant', 'Fire', 'Earth', 'Cold']
        }
    };

    allFields.forEach(function (key) {
        var field = fieldTypes[key] || {};

        formHtml += '<label for="' + key + '">' + key + ':</label>';

        var fieldType = field.type || 'text';

        var defaultValue = field.default || '';
        var minValue = field.min !== undefined ? ' min="' + field.min + '"' : '';
        var maxValue = field.max !== undefined ? ' max="' + field.max + '"' : '';
         
        if (fieldType === 'text') {
            formHtml += '<input type="text" id="' + key + '" name="' + key + '" value="' + defaultValue + '"><br>';
        } else if (fieldType === 'checkbox') {
            var checked = field.default ? ' checked' : '';
            formHtml += '<input type="checkbox" id="' + key + '" name="' + key + '"' + checked + '><br>';
        } else if (fieldType === 'textarea') {
            formHtml += '<textarea id="' + key + '" name="' + key + '"></textarea><br>';
        } else if (fieldType === 'number') {
            formHtml += '<input type="number" inputmode="numeric" pattern="\\d*" id="' + key + '" name="' + key + '" value="' + defaultValue + '"' + minValue + maxValue + '><br>';
        } else if (fieldType === 'date') {
            formHtml += '<input type="date" id="' + key + '" name="' + key + '" value="' + defaultValue + '"><br>';
        } else if (fieldType === 'time') {
            formHtml += '<input type="time" id="' + key + '" name="' + key + '" value="' + defaultValue + '"><br>';
        } else if (fieldType === 'duration') {
            formHtml += '<div data-type="duration" id="' + key + '">';
            formHtml += '<label for="' + key + '_hours">Hours:</label>' +
                '<input type="number" id="' + key + '_hours" name="' + key + '_hours" min="0" value=""><br>';
            formHtml += '<label for="' + key + '_minutes">Minutes:</label>' +
                '<input type="number" id="' + key + '_minutes" name="' + key + '_minutes" min="0" max="59" value=""><br>';
            formHtml += '</div>';
        } else if (fieldType === 'dropdown') {
            formHtml += '<select id="' + key + '" name="' + key + '">';
            field.options.forEach(function (option) {
                var selected = (option === defaultValue) ? ' selected' : '';
                formHtml += '<option value="' + option + '"' + selected + '>' + option + '</option>';
            });
            formHtml += '</select><br>';
        } else if (fieldType === 'multiselect') {
            formHtml += '<select id="' + key + '" name="' + key + '" multiple>';
            field.options.forEach(function (option) {
                var selected = (defaultValue.includes(option)) ? ' selected' : '';
                formHtml += '<option value="' + option + '"' + selected + '>' + option + '</option>';
            });
            formHtml += '</select><br>';
        }
    });

    formHtml += '<button type="submit">Submit</button>';
    formHtml += '</form>';

    $form_container.append($('<div>').html(formHtml));

    $('#dragon-form').on('submit', function (event) {
        event.preventDefault();

        var newDragon = {};
        $('#dragon-form').find('input, select, textarea, div[data-type]').each(function () {
            var key = $(this).attr('name');

            if ($(this).attr('type') === 'checkbox') {
                newDragon[key] = $(this).is(':checked');
            } else if ($(this).attr('type') === 'number') {
                newDragon[key] = parseFloat($(this).val()) || 0;
            } else if ($(this).attr('type') === 'date') {
                newDragon[key] = $(this).val(); // Date will be in 'YYYY-MM-DD' format
            } else if ($(this).attr('type') === 'time') {
                newDragon[key] = $(this).val();  // Time in 'HH:MM' or 'HH:MM:SS' format
            } else if ($(this).is('div[data-type="duration"]')) {
                var hours = parseInt($(this).find('input[name$="_hours"]').val()) || 0;
                var minutes = parseInt($(this).find('input[name$="_minutes"]').val()) || 0;
                newDragon[key] = (hours * 60) + minutes;
            } else if ($(this).attr('multiple')) {
                newDragon[key] = $(this).val() || [];
            } else {
                newDragon[key] = $(this).val();
            }
        });

        dragons.push(newDragon);

        // Update the JSON file on the wiki
        api.postWithToken('csrf', {
            action: 'edit',
            title: 'Data:Dragons.json',
            text: JSON.stringify({ dragons: dragons }),
            summary: 'Added a new dragon entry',
            format: 'json'
        }).done(function (data) {
                if (data.edit && data.edit.result === 'Success') {
                    alert('Dragon entry added successfully!');
                } else {
                    alert('Error adding dragon entry.');
                }
            })
            .fail(function (error) {
                console.error(error);
                alert('Error connecting to the API.');
            });
    });
}

mw.loader.using('mediawiki.api', function () {
    var api = new mw.Api();

    mw.hook('wikipage.content').add(function () {
        Promise.all([
            loadJsonData(api, 'Data:Dragons.json')
        ])
            .then(function (results) {
                var dragons = results[0].dragons;

                initializeWhenDivIsReady('dragon-form-container', function () {
                    initializeForum(dragons);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    });
});