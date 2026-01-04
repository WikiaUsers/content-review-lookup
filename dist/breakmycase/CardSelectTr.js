// Used for filtering and sorting the CardSelectTr table. Code sourced from the Azur Lane wiki on 2024.7.31

/*
    // Filter Button Table
    {|
    ! Show All
    | li.cardSelectOption[data-group="0"][data-option="0|0"]{Show All}
    |-
    ! Filter Group 1 (Union)
    | li.cardSelectOption[data-group="1"][data-option="1|Destroyer"]{Destroyer}
      li.cardSelectOption[data-group="1"][data-option="1|Light Cruiser"][data-opt="OR"]{Light Cruiser}
    |-
    ! Filter Group 2 (Intersection)
    | li.cardSelectOption[data-group="2"][data-option="2|Gunfire"][data-opt="AND"]{Gunfire}
      li.cardSelectOption[data-group="2"][data-option="2|Torpedo"][data-opt="AND"]{Torpedo}
    |}
    // Data Table
    table#CardSelectTr
    thead
        tr#CardSelectTabHeader
            td{Name}
            td.headerSort{Type}
            td{Category}
    tbody
        tr[data-param1="Destroyer"][data-param2="Gunfire"]{ td{Javelin}, td{Destroyer}, td{Gunfire} }
        tr[data-param1="Light Cruiser"][data-param2="Gunfire,Torpedo"]{ td{Isuzu}, td{Light Cruiser}, td{Gunfire,Torpedo} }
*/

// Patch: Redraw Header
function fixHeader() {
    if ($('#CardSelectTabHeader').parent().is('tbody')) {
        if ($('#CardSelectTr>thead').length === 0) {
            $('#CardSelectTr').prepend($('<thead/>'));
        }
        $('#CardSelectTr>thead').append($('#CardSelectTabHeader'));
    }
}

function updateFilterData() {}

$(function InitCardSelect() {
    var self = {};
    
    var selectOptions;         // All filter buttons
    var filters = {};          // Current filter criteria
    var filterKeys = [];       // All filter keys
    var showAll = true;        // Flag to show all items, no filtering
    var tableRows;             // All rows to be filtered
    var computedRows;          // Filtered rows
    var $sorter;               // Current sorting header
    var sortDescent = false;   // Sort order flag
    
    function isNil(s) {
        return s === '' || s === undefined || s === null || s === false;
    }
    
    // When clicking filter buttons
    function OnSelectOptionClick(e) {
        var $x = e.data;
        e.preventDefault();
        
        var label = '[' + $.trim($x.text()) + '] Filter';
        console.time(label);
        
        // Show All
        if ($x.FilterKey == 0) {
            for (i in selectOptions) {
                selectOptions[i].Select = false;
                selectOptions[i].removeClass('selected');
            }
            filters = {};
            showAll = true;
            
            // Update table
            self.FilterRows();
            console.timeEnd(label);
            return;
        }
        showAll = false;
        
        var select = !$x.Select;
        $x.Select = select;
        
        // Change filter status
        var key = $x.FilterKey;
        filters[key] = filters[key] || {};
        
        var opt = $x.FilterOpt == "AND" ? "AND" : "OR";
        filters[key][opt] = filters[key][opt] || [];
        if (select) {
            filters[key][opt].push($x.FilterValue);
        } else {
            filters[key][opt] = filters[key][opt].filter(function(x) {
                return x !== $x.FilterValue;
            });
            if (filters[key][opt].length < 1) delete filters[key][opt];
        }
        
        select ? $x.addClass('selected') : $x.removeClass('selected');
        self.FilterRows();
        console.timeEnd(label);
    }
    
    function OnHeaderSortClick(e) {
        var $x = e.data;
        e.preventDefault();
        
        var label = '[' + $.trim($x.text()) + '] Sort';
        console.time(label);
        if ($sorter !== $x) {
            // First time: new sorting
            $sorter = $x;
            sortDescent = false;
        } else if (!sortDescent) {
            // Second time: switch sorting
            sortDescent = true;
        } else {
            // Third time: no sorting
            $sorter = null;
        }
        
        self.SortRows();
        console.timeEnd(label);
    }
    
    // Initialization
    self.Init = function () {
        selectOptions = $('.cardSelectOption').toArray().map(function(x) {
            var $x = $(x);
            
            var dataOption = $.trim($x.data('option'));
            var dataGroup = $.trim($x.data('group'));
            
            if (isNil(dataOption) || isNil(dataGroup)) return $x;
            var splt = dataOption.split('|');
            $x.FilterKey = dataGroup;
            $x.FilterValue = $.trim(splt[1]);
            $x.FilterOpt = $.trim($x.data('opt') || 'OR').toUpperCase();
            
            if (filterKeys.indexOf(dataGroup) < 0)
                filterKeys.push(dataGroup);
            
            return $x;
        });
        updateFilterData = function () {
            var rows = $('#CardSelectTr>tbody>tr').toArray();
            if (rows.length === 0) {
                rows = $('#CardSelectTr .divsort').toArray();
            }
            tableRows = rows.map( function(x) {
                var $x = $(x);
                
                for (i in filterKeys) {
                    var key = filterKeys[i];
                    var val = x.dataset['param' + key];
                    if (val === undefined) continue;
                    
                    if (typeof val === 'number'){
                        val = val.toString(10);
                    }
                    
                    var splt = val.split(',');
                    for (j in splt) {
                        var s = $.trim(splt[j]);
                        if (!isNil(s)) {
                            $x.FilterData = $x.FilterData || {};
                            $x.FilterData[key] = $x.FilterData[key] || [];
                            $x.FilterData[key].push(s);
                        }
                    }
                    if ($x.FilterData[key] === undefined) {
                        $x.FilterData[key] = ['0'];
                    }
                }
                
                return $x;
            });
        }
        updateFilterData();
        
        $('#CardSelectTr>thead>tr>th.dataHeader').each(function(index, x) {
            var $x = $(x);
            $x.off('click').off('mousedown');
            
            if ($x.hasClass('headerSort')) {
                $x.Index = index;
                $x.click($x, OnHeaderSortClick);
            }
        });

        for (i in selectOptions) {
            selectOptions[i].click(selectOptions[i], OnSelectOptionClick);
        }
    }
    
    // Checks if t1 includes all items in t2
    function includeAll(t1, t2) {
        for (i in t2) {
            if (t1.indexOf(t2[i]) < 0) return false;
        }
        return true;
    }

    // Checks if t1 includes any item from t2
    function includeAny(t1, t2) {
        if (t2.length === 0) return true;
        for (i in t2) {
            if (t1.indexOf(t2[i]) > -1) return true;
        }
        return false;
    }
    
    // Show/hide rows in the table
    self.FilterRows = function() {
        if (showAll) {
            filters = {};
        }
        
        $('#CardSelectTr>tbody').hide();
        
        for (var idx in tableRows) {
            var $x = tableRows[idx];
            var data = $x.FilterData;
            var hide = false;
            
            for (key in filters) {
                hide = !data || !data[key];
                
                if (!hide && filters[key]['AND']) {
                    hide = !includeAll(data[key],filters[key]['AND']);
                }
                if (!hide && filters[key]['OR']) {
                    hide = !includeAny(data[key],filters[key]['OR']);
                }
                if (hide) break;
            }
            
            if (!$x.Hide || (!hide != !$x.Hide)) {
                $x.Hide = hide;
                hide ? $x.hide() : $x.show();
            }
        }
        
        $('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
        $('#CardSelectTr>tbody').show();
        fixHeader();
        $sorter = null;
    }
    
    function grabSortData($tr, index) {
        $tr.SortData = $tr.SortData || [];
        if ($tr.SortData[index] !== undefined) return $tr.SortData[index];
        
        var td = $tr.children('td')[index];
        if (!td) {
            $tr.SortData[index] = -1;
            return -1;
        }
        
        var text = $.trim(td.textContent);
        if (text.endsWith("s/轮")) {
            text = text.substring(0, text.length - 3);
        }
        $tr.SortData[index] = text;
        return text;
    }
    
    // Sort rows, hidden ones will be removed
    self.SortRows = function() {
        
        // var residues = [];
        
        if (!$sorter) {
            computedRows = tableRows.filter(function($x) { return !$x.Hide; });
            $('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
        }
        else if (!sortDescent) {
            var index = $sorter.Index;
            computedRows = tableRows.filter(function($x) { return !$x.Hide; });
            computedRows.sort(function compareFunction($x, $y) {
                var x = grabSortData($x, index);
                var y = grabSortData($y, index);
                var nx = +x;
                var ny = +y;
                
                return (isNaN(nx) || isNaN(ny)) 
                        ? isNaN(nx) && isNaN(ny) 
                            ? x < y ? -1 : 1
                            : isNaN(nx) ? 1 : -1 // Strings are sorted later
                        : nx === ny
                            ? 0
                            : nx < ny ? -1 : 1; // Smaller values are sorted first
            });
            $('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
            $sorter.addClass('headerSortDown');
            
        }
        else {
            computedRows.reverse();
            $('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
            $sorter.addClass('headerSortUp');
        }
        
        $('#CardSelectTr>tbody').hide()
            .prepend(computedRows)
            .show();
        
        fixHeader();
    }
    
    $('.cardSelectOption').off('click').off('mousedown');

    if ($('#CardSelectTabHeader').parent().is('tbody')) {
        $('#CardSelectTr').prepend($('<thead/>').append($('#CardSelectTabHeader')));
    }
    if ($('#CardSelectTabHeader1').parent().is('tbody')) {
        $('#CardSelectTr>thead').append($('#CardSelectTabHeader1'));
    }
    
    self.Init();
    
    console.log('CardSelectTr.js Initialized.');
    return self;
});