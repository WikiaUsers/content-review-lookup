/* Scripts which are imported via [[MediaWiki:ImportJS]] */

/* Author:     Karol "[[User:Nanaki]]" Dylewski */
/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
    function gridFiltering() {
        var grid = $(gridContainer);
        if(!grid.length) return;
        if(!gridFilteringSwitches()) return;
 
        window.gridElements = [];
        grid.find('.character-icon').each(function() {
            var obj = {};
            var elem = $(this);
            obj['*'] = elem;
 
            for(var x in gridFilters) {
                obj[x] = elem.data(x).split('|');
                for(var y=0;y<obj[x].length;y++) {
                    obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase();
                }
            }
            window.gridElements.push(obj);
        });
    }
 
    function gridFilteringSwitches() {
        var flag = false;
 
        for(var x in gridFilters) {
            var container = $('#grid-filter-'+x);
            if(!container.length) continue;
            flag = true;
 
            if(gridFilters[x] == 'search') {
                var field = $('<input type="text" placeholder="Поиск..." />').appendTo(container).attr({
                    id: container.attr('id')+'-field',
                    placeholder: container.data('placeholder')
                }).data('type', 'search');
 
                field.keyup(function() {
                    gridFilteringApply();
                    if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout);
                    window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 10000);
                });
            } else if(gridFilters[x] instanceof Array) {
                var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select');
                $('<option></option>').appendTo(field).attr('value', '').html(gridFilters[x][0]);
                for(var y=1;y<gridFilters[x].length;y++) {
                    var opt = $('<option></option>').appendTo(field).html(gridFilters[x][y][1]);
                    if(gridFilters[x][y][0] === null) {
                        opt.prop('disabled', true);
                    } else {
                        opt.attr('value', gridFilters[x][y][0]);
                    }
                }
                field.val('');
 
                field.change(function() {
                    gridFilteringApply();
                    if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout);
                    window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 10000);
                });
            }
        }
        return flag;
    }
    function gridFilteringClear() {
        for(var x in gridFilters) {
            $('#grid-filter-'+x+'-field').val('');
        }
        gridFilteringApply();
    }
    function gridFilteringApply() {
        for(var x=0;x<gridElements.length;x++) {
            var elem = $(gridElements[x]['*']);
            var active = true;
            for(var y in gridFilters) {
                var field = $('#grid-filter-'+y+'-field');
 
                var value = field.val().toLowerCase();
                if(value === '') continue;
 
                var type = field.data('type');
                if(type == 'search') {
                    var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
                    var flag = rx.test(gridElements[x][y].join(', '));
                    if(!flag) active = false;
                } else if(type == 'select') {
                    if(gridElements[x][y].indexOf(value) == -1) active = false;
                }
            }
            if(active) gridFilteringShow(elem);
            else gridFilteringHide(elem);
        }
    }
    function gridFilteringHide(elem) {
        $(elem).stop(true);
        $(elem).fadeTo(200, 0.1);
        $(elem).css(
         '-webkit-filter', 'grayscale(100%)', 
         '-moz-filter', 'grayscale(100%)',
         'filter', 'grayscale(100%)'
        );
    }
    function gridFilteringShow(elem) {
        $(elem).stop(true);
        $(elem).fadeTo(200, 1);
        $(elem).css(
         '-webkit-filter', 'grayscale(0)',
         '-moz-filter', 'grayscale(0)',
         'filter', 'grayscale(0)'
        );
   }
    $( gridFiltering );
} )( jQuery );