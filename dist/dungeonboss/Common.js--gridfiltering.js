// filter grid vB666.2019.7
//   based on a script by Karol "[[User:Nanaki]]" Dylewski 
// License:    CC-BY-SA 3.0 

(function($) {

    function main() {
        $(".searchgrid").each(function(i, grid) {
            initGrid($(grid));
        });
    }

    function createFilterFields(grid) {
        var initOk = false;
        var gridId = grid.attr('id');
        var filters = [];
        grid.data('filters', filters);

        grid.find('.grid-filter').each(function(i, obj) {
            initOk = true;
            var container = $(obj);
            var filter = $(obj).data('filter');

            if (filter == 'searchbox') {
                var fid = gridId + '-' + filter + '-field';

                var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', fid).data('type', 'search').data('filter', filter);
                filters.push(field);

                field.keyup(function() {
                    var debounce = grid.data('debounce')
                    if (debounce) clearTimeout(debounce);
                    debounce = setTimeout(function(){
                        applyFilters(grid);
                        grid.data('debounce', null)}, 100);
                    grid.data('debounce', debounce)
                });
            } else {
                var fid = gridId + '-' + filter + '-field';
                var field = $('<select></select>').appendTo(container).attr('id', fid).data('type', 'select').data('filter', filter);
                filters.push(field);
                var placeholder = container.data('placeholder');
                if (!placeholder) placeholder = "SELECT";
                placeholder = "- " + placeholder.match(/\w+/g) + " -";
                var values = container.data('values')
                if  (!values) { 
                    console.log('ERROR: attribute data-values is missing!');
                }
                values = values.match(/[\w\s]+/g);
                var labels = container.data('labels');
                if  (!labels) { 
                    console.log('ERROR: attribute data-labels is missing!');
                }
                labels = labels.match(/[\w\s]+/g);
                $('<option></option>').appendTo(field).attr('value', '').text(placeholder);
                for (var ii = 0; ii < values.length && ii < labels.length && ii < 50; ii++) {
                    $('<option></option>').appendTo(field).attr('value', values[ii]).text(labels[ii]);
                }
                field.val('');

                field.change(function() {
                    applyFilters(grid);
                });
            }
        });
        return initOk;
    }
    
    function createResetButton(grid) {
        var container = grid.find(".grid-resetbutton");
        if (!container) return;
        var label = container.data('label');
        if (!label) placeholder = "ALL";
        var resetBtn = $('<input type="button" class="grid-reset-button" />').val(label).appendTo(container).attr('id', grid.attr('Id') + '-reset-button').click(function() {
            clearFilters(grid);
        });
    }

    function initGrid(grid) {

        if (grid.data('filters')) return;

        if (!createFilterFields(grid)) return;        
        createResetButton(grid);

        var gridFilters = grid.data('filters');
        var gridItems = [];
        grid.find('.grid-item').each(function(idx, htmlElem) {
            var obj = {};
            var item = $(this);
            obj['*'] = item;
            for (var ii = 0; ii < gridFilters.length; ii++) {

                var filter = gridFilters[ii].data('filter');

                if (!item.data(filter) || item.data(filter) === '') {
                    console.log('WARNING: data-' + filter + ' missing or empty; item: ' + htmlElem.outerHTML);
                    continue;
                }
                obj[filter] = item.data(filter).split(',');
                for (var y = 0; y < obj[filter].length; y++) {
                    obj[filter][y] = obj[filter][y].replace(/^\s+|\s+$/g, '').toLowerCase();
                }
            }
            gridItems.push(obj);
        });
        grid.data('gridItems', gridItems);
        console.log('initGrid done');
    }

    function clearFilters(grid) {
        var gridFilters = grid.data('filters');
        for (var ii = 0; ii < gridFilters.length; ii++) {
            var field = gridFilters[ii];
            field.val('');
        }
        applyFilters(grid);
    }

    function applyFilters(grid) {
        var gridItems = grid.data('gridItems');
        var gridFilters = grid.data('filters');

        var matches = 0;
        for (var x = 0; x < gridItems.length; x++) {
            var item = $(gridItems[x]['*']);
            var active = true;
            for (var ii = 0; ii < gridFilters.length; ii++) {
                var field = gridFilters[ii];

                var value = field.val().toLowerCase();
                if (value === '') continue;

                var type = field.data('type');
                var fattr = field.data('filter');
                if (type == 'search') {
                    var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$', 'i');
                    var match = rx.test(gridItems[x][fattr].join(', '));
                    active = match
                } else if (type == 'select') {
                    if (gridItems[x][fattr]) { // can be null when no item with that attribute exists
                        if (gridItems[x][fattr].indexOf(value) == -1) active = false;
                    } 
                }
            }
            var hideMode = grid.data('mode') == 'hide'
            if (active) {
                matches++
                showItem(item, hideMode);
            } else {
                hideItem(item, hideMode);
            }
        }
        var container = grid.find(".grid-matches");
        if (container) { container.text(matches)}

    }

    function hideItem(item, hideMode) {
        if (hideMode) {
            $(item).hide();
        } else {
            $(item).stop(true);
            $(item).fadeTo(200, 0.1);
        }
    }

    function showItem(item, hideMode) {
        if (hideMode) {
            $(item).show();
        } else {
            $(item).stop(true);
            $(item).fadeTo(200, 1);
        }        
    }

    $(main);
})(jQuery);