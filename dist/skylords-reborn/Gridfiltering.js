gridFilters = {
    search: 'search',

    affinities: ['- Affinity -', ['Fire', 'Fire'], ['Frost', 'Frost'], ['Nature', 'Nature'], ['Shadow', 'Shadow'], ['All', 'All'], ['None', 'None']],
    counter: ['- Counter -', ['S', 'S'], ['M', 'M'], ['L', 'L'], ['XL', 'XL']],
    edition: [
        '- Edition -',
        ['Amii', 'Amii'],
        ['Lost Souls', 'Lost Souls'],
        ['Renegade', 'Renegade'],
        ['Twilight', 'Twilight'],
    ],
    faction: ['- Faction -', ['Fire', 'Fire'], ['Frost', 'Frost'], ['Nature', 'Nature'], ['Shadow', 'Shadow'], ['Twilight', 'Twilight'], ['Stonekin', 'Stonekin'], ['Lost Souls', 'Lost Souls'], ['Bandit', 'Bandit'], ['Amii', 'Amii'], ['Legendary', 'Legendary']],
    size: ['- Size -', ['S', 'S'], ['M', 'M'], ['L', 'L'], ['XL', 'XL']],
    special: ['- Special -', ['Non-Legendary', 'Non-Legendary'], ['Promo', 'Promo'], ['Starter', 'Starter (PvE)']],
    weapontype: ['- Range -', ['Melee', 'Melee'], ['Ranged', 'Ranged'], ['Special', 'Special']],

    orbs: ['Fire', 'Frost', 'Nature', 'Shadow', 'Neutral'],
    orbsamount: ['1', '2', '3', '4'],
    rarity: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'],
    type: ['Unit', 'Building', 'Spell'],
};

(function () {
    function gridFiltering() {
        var grid = $('#card-grid');
        if (!grid.length) return;
        if (!gridFilteringSwitches()) return;

        window.gridElements = [];
        grid.children(grid.hasClass('list-of-cards') ? 'div' : '.grid-icon').each(function () {
            var obj = {};
            var elem = $(this);
            obj['*'] = elem;
            for (var x in gridFilters) {
                obj[x] = String(elem.data(x)).split(',');
                for (var y = 0; y < obj[x].length; y++) {
                    obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase();
                }
            }
            window.gridElements.push(obj);
        });
    }

    function gridFilteringSwitches() {
        var flag = false;
        for (var x in gridFilters) {
            var container = $('#grid-filter-' + x);
            if (!container.length) continue;
            flag = true;

            if (gridFilters[x] === 'search') {
                $('<input type="text" />')
                    .appendTo(container)
                    .attr({
                        id: container.attr('id') + '-field',
                        placeholder: container.data('placeholder'),
                    })
                    .css({ width: '72px', height: '26px', padding: '0 5px' })
                    .data('type', 'search')
                    .keyup(gridFilteringApply);
            } else if (['orbs', 'orbsamount', 'rarity', 'type'].indexOf(x) >= 0) {
                for (var i = 1; i <= gridFilters[x].length; i++) {
                    $('<input />', {
                        type: 'checkbox',
                        id: container.attr('id') + '-field-' + i,
                        value: gridFilters[x][i - 1],
                        checked: true,
                    })
                        .appendTo(container)
                        .change(gridFilteringApply);
                    $('<label />', {
                        for: container.attr('id') + '-field-' + i,
                        title: gridFilters[x][i - 1],
                    }).appendTo(container);
                }
            } else if (gridFilters[x] instanceof Array) {
                var field = $('<select></select>')
                    .appendTo(container)
                    .attr('id', container.attr('id') + '-field')
                    .data('type', 'select');
                $('<option></option>').appendTo(field).attr('value', '').html(gridFilters[x][0]);
                for (var y = 1; y < gridFilters[x].length; y++) {
                    var opt = $('<option></option>').appendTo(field).html(gridFilters[x][y][1]);
                    if (gridFilters[x][y][0] === null) {
                        opt.prop('disabled', true);
                    } else {
                        opt.attr('value', gridFilters[x][y][0]);
                    }
                }
                field.val('');

                field.change(gridFilteringApply);
            }
        }

        $('<select><option value="nameasc">- Sort by -</option><option value="nameasc">Name ▲</option><option value="namedesc">Name ▼</option><option value="orbsasc">#Orbs ▲</option><option value="orbsdesc">#Orbs ▼</option><option value="costasc">Cost ▲</option><option value="costdesc">Cost ▼</option></select>')
            .change(gridFilteringSort)
            .appendTo($('#grid-filter-sort'));

        $('<a id="grid-filter-reset-btn" title="Reset sorting and filters"></a>')
            .click(function () {
                gridFilteringClear();
            })
            .appendTo($('#grid-filter-reset'));

        $('<button type="button">Show more</button>')
            .click(function () {
                if ($(this).text() === 'Show more') {
                    $(this).text('Show less');
                    $('#card-grid').css('max-height', $('#card-grid').hasClass('list-of-cards') ? '' : '1600px');
                    $('#card-grid').removeClass('collapsed').addClass('expanded');
                } else {
                    $(this).text('Show more');
                    if ($('.grid-filter-container')[0].getBoundingClientRect().top <= 0) {
                        window.scrollBy({
                            top: $('.grid-filter-container')[0].getBoundingClientRect().top - 100,
                            behavior: 'smooth',
                        });
                    }
                    $('#card-grid').css('max-height', $('body').hasClass('mainpage') ? '380px' : $('#card-grid') ? '500px' : '210px');
                    $('#card-grid').removeClass('expanded').addClass('collapsed');
                }
        	if ((document.querySelector('#card-grid:not(.list-of-cards)') && $('#card-grid:not(.list-of-cards) > span:visible').length <= ($('body').hasClass('mainpage') ? 84 : 42))
        		|| (document.querySelector('#card-grid.list-of-cards') && $('#card-grid.list-of-cards > div:visible').length <= 4)) {
                    $('#grid-collapse').hide();
                } else {
                    $('#grid-collapse').show();
                }
            })
            .on(
                'mousedown',
                // prevent focus
                function (event) {
                    event.preventDefault();
                }
            )
            .appendTo($('#grid-collapse'));

        return flag;
    }
    function gridFilteringClear() {
        for (var x in gridFilters) {
            var el = $('#grid-filter-' + x + '-field, #grid-filter-' + x + ' > input');
            if (el.attr('type') === 'checkbox') el.prop('checked', true);
            else el.val('');
        }
        $('#grid-filter-sort > select').prop('selectedIndex', 0);
        gridFilteringApply();
        gridFilteringSort();
    }
    function gridFilteringSort() {
        var $container = $('#card-grid');
        var comp, asc;
        var val = $('#grid-filter-sort > select').val();

        function sort(comp, asc) {
            $('#card-grid > .grid-icon, #card-grid.list-of-cards > div')
                .sort(function (a, b) {
                    var $a = $(a).data(comp);
                    var $b = $(b).data(comp);
                    $a = typeof $a === 'string' ? $a.toLowerCase() : $a;
                    $b = typeof $b === 'string' ? $b.toLowerCase() : $b;
                    if ($a < $b) return asc ? -1 : 1;
                    if ($a > $b) return asc ? 1 : -1;
                    return 0;
                })
                .appendTo($container);
        }

        switch (val) {
            case 'nameasc':
                comp = '1';
                asc = true;
                break;
            case 'namedesc':
                comp = '1';
                asc = false;
                break;
            case 'orbsasc':
                comp = 'orbsamount';
                asc = true;
                break;
            case 'orbsdesc':
                comp = 'orbsamount';
                asc = false;
                break;
            case 'costasc':
                comp = 'cost';
                asc = true;
                break;
            case 'costdesc':
                comp = 'cost';
                asc = false;
                break;
        }

        if (val !== 'nameasc' && val !== 'namedesc') sort('1', true);

        sort(comp, asc);
		
		$('#card-grid').append($('#grid-matches'));
        $(window).scroll();
    }
    function gridFilteringApply() {
        for (var x = 0; x < gridElements.length; x++) {
            var elem = $(gridElements[x]['*']);
            var active = true;
            for (var y in gridFilters) {
                if (['orbs', 'orbsamount', 'rarity', 'type'].indexOf(y) >= 0) {
                    for (var j = 1; j <= gridFilters[y].length; j++) {
                        var field = $('#grid-filter-' + y + '-field-' + j);

                        var value = field.val().toLowerCase();
                        if (value === '') continue;

                        if (!field.prop('checked') && gridElements[x][y].indexOf(value) >= 0) active = false;
                    }
                } else {
                    var field = $('#grid-filter-' + y + '-field');

                    var value = field.val().toLowerCase();
                    if (value === '') continue;

                    var type = field.data('type');
                    if (type === 'search') {
                        var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ').*?$', 'i');
                        var flag = rx.test(gridElements[x][y].join(', '));
                        if (!flag) active = false;
                    } else if (type === 'select') {
                        if (gridElements[x][y].indexOf(value) === -1) active = false;
                    }
                }
            }
            if (active) gridFilteringShow(elem);
            else gridFilteringHide(elem);
        }
        
        if (($('#grid-filter-affinities-field')[0].selectedIndex > 0 && $('#grid-filter-affinities-field')[0].selectedIndex < 5) || $('#grid-filter-special-field')[0].selectedIndex > 1) {
        	var len = $('#card-grid > span:visible').length;
        	if (len === 1) {
        		$('#grid-matches').text('1 matching card');
        	} else {
        		$('#grid-matches').text(len + ' matching cards');
        	}
        } else {
        	var i = 0;
        	$('#card-grid > span:visible').each(function() {
        		if ($(this).data('affinities') !== 'None') i+=2;
        		if ($(this).data('special').includes('Promo')) i++;
        		//if ($(this).data('special').includes('Starter')) i++;
        		if ($(this).data('special').includes('Normal')) i++;
        	});
        	if (i === 1) {
        		$('#grid-matches').text('1 matching card');
        	} else {
        		$('#grid-matches').text(i + ' matching cards');
        	}
        }
        $('#card-grid').append($('#grid-matches'));

		if ((document.querySelector('#card-grid:not(.list-of-cards)') && $('#card-grid:not(.list-of-cards) > span:visible').length <= ($('body').hasClass('mainpage') ? 84 : 42))
        		|| (document.querySelector('#card-grid.list-of-cards') && $('#card-grid.list-of-cards > div:visible').length <= 4)) {
            $('#grid-collapse').hide();
            //$('#grid-matches').hide();
        } else {
            $('#grid-collapse').show();
            //$('#grid-matches').show();
        }
        $(window).scroll();
    }
    function gridFilteringHide(elem) {
        $(elem).stop(true);
        $(elem).hide();
    }
    function gridFilteringShow(elem) {
        $(elem).stop(true);
        $(elem).show();
    }
    $(gridFiltering);
})();