/* License:    CC-BY-SA 3.0 */
 
( function( $ ) {
/* Funktion: Filtern */
    function gridFiltering() {
        var Item = $(ItemContainer); /* Variable wird zugeordnet */
        if(!Item.length) return;
        if(!gridFilteringSwitches()) return;
 
        window.gridElements = [];
        Item.find('.item-icon').each(function() {
            var obj = {};
            var elem = $(this);
            obj['*'] = elem;
            for(var x in itemFilters) {
                obj[x] = elem.data(x).split(',');
                for(var y=0;y<obj[x].length;y++) {
                    obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase();
                }
            }
            window.gridElements.push(obj);
        });
    }
 /* Funktion FilteringSwitches */
    function gridFilteringSwitches() {
        var flag = false;
        for(var x in itemFilters) {
            var container = $('#item-filter-'+x);
            if(!container.length) continue;
            flag = true;
 /* Wenn ein Wert in itemFilters == Search ist, dann... */
            if(itemFilters[x] == 'search') {
                var field = $('<input type="text" />').appendTo(container).attr({
                    id: container.attr('id')+'-field',
                    placeholder: container.data('placeholder')
                }).data('type', 'search');
 
                field.keyup(function() {
                    gridFilteringApply();
                    if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout);
                    window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 10000);
                });
            } else if(itemFilters[x] instanceof Array) {
                var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select');
                $('<option></option>').appendTo(field).attr('value', '').html(itemFilters[x][0]);
                for(var y=1;y<itemFilters[x].length;y++) {
                    $('<option></option>').appendTo(field).attr('value', itemFilters[x][y][0]).html(itemFilters[x][y][1]);
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
/* Funktion: FilteringClear */
    function gridFilteringClear() {
        for(var x in itemFilters) {
            $('#item-filter-'+x+'-field').val('');
        }
        gridFilteringApply();
    }
    function gridFilteringApply() {
        for(var x=0;x<gridElements.length;x++) {
            var elem = $(gridElements[x]['*']);
            var active = true;
            for(var y in itemFilters) {
                var field = $('#item-filter-'+y+'-field');
 
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
/* Elemente verbergen */
    function gridFilteringHide(elem) {
        $(elem).stop(true);
        $(elem).fadeTo(200, 0.1);
    }

/* Elemente zeigen */
    function gridFilteringShow(elem) {
        $(elem).stop(true);
        $(elem).fadeTo(200, 1);
    }
    $( gridFiltering );
} )( jQuery );