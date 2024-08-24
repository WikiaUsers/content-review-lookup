/* Widget: Filter table JS */
console.log('[[Widget:Filter table]]: Script initiated.');

// DEFER LOADING SCRIPT UNTIL JQUERY IS READY. WAIT 40MS BETWEEN ATTEMPTS.
function defer(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 40);
    }
}

// DEFER LOADING SCRIPT UNTIL MW IS READY. WAIT 40MS BETWEEN ATTEMPTS.
function deferMW(method) {
    if (mw && mw.loader && mw.loader.using) {
        console.log('[[Widget:Filter table]]: deferMWfunction - mw object now exists.');
        method();
    } else {
        console.log('[[Widget:Filter table]]: deferMWfunction - mw object does not exist, waiting again.');
        setTimeout(function() { deferMW(method) }, 40);
    }
}

// INITIALISATION
defer(function () {
    console.log('[[Widget:Filter table]]: Deferred function loading.');

    // Collect widget inputs
    var content = '<!--{$content|default:'Table'|escape:javascript}-->';
    var element_id = '<!--{$id|default:'table1'|escape:javascript}-->';
    var filter_classes = '<!--{$filters|default:'pve,wvw,pvp'|escape:javascript}-->';
    filter_classes = filter_classes.split(',');
    var mode = '<!--{$mode|default:'and'|escape:javascript}-->';
    mode = mode.toLowerCase();
    var position = '<!--{$position|default:'below'|escape:javascript}-->';
    position = position.toLowerCase();
    
    // Defining this every time we need it is annoying.
    var element_selector = '[data-filter-id="' + element_id + '"]';

    // Add table specific stylesheet, with unique id so it can be overwritten
    var style = document.createElement('style');
    style.id = element_id + '-css';
    $('head').append(style);

    // Initialise filters by adding new rules (setting the "display: none" rule here too in case JS is disabled, which would obstruct tables with noscript extensions)
    $('#' + element_id + '-css').text(element_selector + ' .filter-row { display: none; }' + '\n'
                                    + element_selector + ' .filter-row { display: table-row; }' + '\n'
                                    + element_selector + ' .filter-list { display: none; }' + '\n'
                                    + element_selector + ' .filter-list { display: list-item; }' + '\n'
                                    + element_selector + ' .filter-plain { display: none; }' + '\n'
                                    + element_selector + ' .filter-plain { display: block; }'
                                   );

    // Sanitise inputs
    filter_classes = $.map(filter_classes, function(v) {
        var o = {};
        var a = v.split('¦');
        if (a.length == 1) {
            if (a[0].trim() === '<br>') {
                o.type = 'br';
            } else {
                o.type = 'button';
                o.css_class = a[0].trim();
                o.text = a[0].trim();
            }
        } else if (a.length == 2) {
            if (a[0].trim() === 'label') {
                o.type = 'label';
                o.text = a[1].trim();
            } else {
                o.type = 'button';
                o.css_class = a[0].trim();
                o.text = a[1].trim();
            }
        }
        return o;
    });
    if (mode != 'or' && mode != 'and' && mode != 'only') {
        console.log('Invalid mode operator, setting to AND.');
        mode = 'and';
    }

    // Specify text label
    var filter_text = 'The ' + content.toLowerCase() + ' ' + position + ' can be filtered using the following buttons.'
    if (mode != 'only') {
        filter_text += ' Multiple ' + mode.toUpperCase() + ' filters can be applied at once by clicking on multiple buttons.';
    }

    // Build filter controls
    var control_wrapper_div = document.createElement('div');
    control_wrapper_div.className = 'filter-controls-wrapper';

    var fieldset = document.createElement('fieldset');
    fieldset.id = element_id + '-controls';
    fieldset.className = 'widget';

    var legend = document.createElement('legend');
    legend.innerText = 'Optional: Filter options';

    fieldset.appendChild(legend);

    var p = document.createElement('p');
    p.style['margin-bottom'] = '0.5em';
    p.innerText = filter_text;

    fieldset.appendChild(p);

    var ul = document.createElement('ul');
    ul.className = 'filter-table-controls';

    var button = document.createElement('button');
    button.classList.add('filter-table-clear');
    button.innerText = 'Show all';

    ul.appendChild(button);

    var text_id = 0;
    $.each(filter_classes, function(i, v) {
        if (v.type === 'br') {
            var br = document.createElement('br');
            ul.appendChild(br);
        } else if (v.type === 'button') {
            var button = document.createElement('button');
            button.classList.add('filter-table-button');
            button.setAttribute('data-value', v.css_class.replace(/ /g,'-'));
            button.setAttribute('data-textargettid', text_id);
            text_id++;
            button.innerText = v.text;
            ul.appendChild(button);
        } else if (v.type === 'label') {
            var div = document.createElement('div');
            div.className = 'filter-table-label';
            div.setAttribute('data-textargettid', text_id);
            text_id++;
            div.innerText = v.text;
            ul.appendChild(div);
        }
    });

    fieldset.appendChild(ul);

    control_wrapper_div.appendChild(fieldset);


    // Add the control (using the HTML element added by this widget above this script).
    $('[data-filter-control-id="' + element_id + '"').before(control_wrapper_div);


    // Bind events on each button
    $('#' + element_id + '-controls' + ' ' + 'button.filter-table-button').click(function(e){
        // Remove any rowspans on all matching tables/lists/whatever.
        $.map( $(element_selector), function(v) {
            explodeRowspans( $(v) );
        });

        // Get properties of clicked element
        var t = e.delegateTarget;

        // Check if button has previously been pushed - adjust state as required
        $(t).toggleClass('filter-active');

        // Collect list of active buttons
        var active_t = $('#' + element_id + '-controls' + ' ' + '.filter-active');


        // For 'only' mode, remove other active filters before proceeding
        if (mode == 'only') {
            $.map(active_t, function(k){
                if (k.attributes['data-value'].value != t.attributes['data-value'].value) {
                    $(k).removeClass('filter-active');
                }
            });
            active_t = $('#' + element_id + '-controls' + ' ' + '.filter-active');
        }
        
        // Write new CSS rule to replace old one
        switch (mode) {
            case 'or':
                $('#' + element_id + '-css')
                .text(element_selector + ' .filter-row { display: none; }' + '\n' + ( active_t.length > 0 ?
                    $.map(active_t, function(k){
                        return element_selector + ' .filter-row.' + k.attributes['data-value'].value;
                    }).join(', ') : element_selector + ' .filter-row' )
                    + ' { display: table-row; }' + '\n'
                  + element_selector + ' .filter-list { display: none; }' + '\n' + ( active_t.length > 0 ?
                    $.map(active_t, function(k){
                        return element_selector + ' .filter-list.' + k.attributes['data-value'].value;
                    }).join(', ') : element_selector + ' .filter-list' )
                    + ' { display: list-item; }'+ '\n'
                  + element_selector + ' .filter-plain { display: none; }' + '\n' + ( active_t.length > 0 ?
                    $.map(active_t, function(k){
                        return element_selector + ' .filter-plain.' + k.attributes['data-value'].value;
                    }).join(', ') : element_selector + ' .filter-plain' )
                    + ' { display: block; }'
                );
                break;
            case 'and':
            default:
                $('#' + element_id + '-css')
                .text(element_selector + ' .filter-row { display: none; }' + '\n' + element_selector + ' .filter-row' + 
                    $.map(active_t, function(k){
                        return '.' + k.attributes['data-value'].value;
                    }).join('') + ' { display: table-row; }' + '\n'
                  + element_selector + ' .filter-list { display: none; }' + '\n' + element_selector + ' .filter-list' + 
                    $.map(active_t, function(k){
                        return '.' + k.attributes['data-value'].value;
                    }).join('') + ' { display: list-item; }' + '\n'
                  + element_selector + ' .filter-plain { display: none; }' + '\n' + element_selector + ' .filter-plain' + 
                    $.map(active_t, function(k){
                        return '.' + k.attributes['data-value'].value;
                    }).join('') + ' { display: block; }'
                );
                break;
        }
    });

    // Bind event on clear
    $('#' + element_id + '-controls' + ' ' + 'button.filter-table-clear').click(function(e){
        // Remove associated classes to show all
        $('#' + element_id + '-css').text(element_selector + ' .filter-row { display: table-row }' + '\n'
                                      + element_selector + ' .filter-list { display: list-item }' + '\n'
                                      + element_selector + ' .filter-plain { display: block }');

        // Remove button classes from all
        $('#' + element_id + '-controls' + ' ' + '.filter-table-button').removeClass('filter-active');
    });

    deferMW(function () {
        convertWikiMarkupOnButtons(element_id);
    });

    function convertWikiMarkupOnButtons(element_id) {
        // Run each filter button and label text through the API to see if there were icons or wikilinks etc
        var parse_payload = 'WIDGETSEPARATOR' + $.map(filter_classes, function(v){
            return v.text;
        }).join('WIDGETSEPARATOR') + 'WIDGETSEPARATOR';
        mw.loader.using('mediawiki.api', function () {
            console.log('[[Widget:Filter table]]: Mediawiki API ready for parsing.');
            var api = new mw.Api();
            api.parse(parse_payload)
            .done(function (result) {
                console.log('[[Widget:Filter table]]: Mediawiki API successfully parsed text.');
                var parsed_payload = result.split('WIDGETSEPARATOR');

                // Remove first two elements where the header and footer of the parsed data will be (div open, div closed+pp limit report)
                parsed_payload.pop();
                parsed_payload.shift();

                // Distribute headers back to source
                $.map( $('#' + element_id + '-controls' + ' ' + '.filter-table-button'), function(v){
                    var num = v.attributes['data-textargettid'].value;
                    $(v).html(parsed_payload[num]);
                });
                $.map( $('#' + element_id + '-controls' + ' ' + '.filter-table-label'), function(v){
                    var num = v.attributes['data-textargettid'].value;
                    $(v).html(parsed_payload[num]);
                });
            })
            .fail(function(d, textStatus, error) {
                console.log('[[Widget:Filter table]]: Mediawiki API failed to parse text.');
                console.error('[[Widget:Filter table]]: GW2W API Parse operation failed, status: ' + textStatus + ', error: '+error);
            });
        });
    }

    // Reused core MW code: https://wiki.guildwars2.com/resources/src/jquery/jquery.tablesorter.js
    // Replace all rowspanned cells in the table body with clones in each row
    function explodeRowspans( $table ) {
        var spanningRealCellIndex, rowSpan, colSpan,
            cell, cellData, i, $tds, $clone, $nextRows,
            rowspanCells = $table.find( '> tbody > tr > [rowspan]' ).get();

        // Short circuit
        if ( !rowspanCells.length ) {
            return;
        }

        // First, we need to make a property like cellIndex but taking into
        // account colspans. We also cache the rowIndex to avoid having to take
        // cell.parentNode.rowIndex in the sorting function below.
        $table.find( '> tbody > tr' ).each( function () {
            var i,
                col = 0,
                len = this.cells.length;
            for ( i = 0; i < len; i++ ) {
                $( this.cells[ i ] ).data( 'tablesorter', {
                    realCellIndex: col,
                    realRowIndex: this.rowIndex
                });
                col += this.cells[ i ].colSpan;
            }
        });

        // Split multi row cells into multiple cells with the same content.
        // Sort by column then row index to avoid problems with odd table structures.
        // Re-sort whenever a rowspanned cell's realCellIndex is changed, because it
        // might change the sort order.
        function resortCells() {
            var cellAData,
                cellBData,
                ret;
            rowspanCells = rowspanCells.sort( function ( a, b ) {
                cellAData = $.data( a, 'tablesorter' );
                cellBData = $.data( b, 'tablesorter' );
                ret = cellAData.realCellIndex - cellBData.realCellIndex;
                if ( !ret ) {
                    ret = cellAData.realRowIndex - cellBData.realRowIndex;
                }
                return ret;
            });
            rowspanCells.forEach( function ( cell ) {
                $.data( cell, 'tablesorter' ).needResort = false;
            });
        }
        resortCells();

        function filterfunc() {
            return $.data( this, 'tablesorter' ).realCellIndex >= spanningRealCellIndex;
        }

        function fixTdCellIndex() {
            $.data( this, 'tablesorter' ).realCellIndex += colSpan;
            if ( this.rowSpan > 1 ) {
                $.data( this, 'tablesorter' ).needResort = true;
            }
        }

        while ( rowspanCells.length ) {
            if ( $.data( rowspanCells[ 0 ], 'tablesorter' ).needResort ) {
                resortCells();
            }

            cell = rowspanCells.shift();
            cellData = $.data( cell, 'tablesorter' );
            rowSpan = cell.rowSpan;
            colSpan = cell.colSpan;
            spanningRealCellIndex = cellData.realCellIndex;
            cell.rowSpan = 1;
            $nextRows = $( cell ).parent().nextAll();
            for ( i = 0; i < rowSpan - 1; i++ ) {
                $tds = $( $nextRows[ i ].cells ).filter( filterfunc );
                $clone = $( cell ).clone();
                $clone.data( 'tablesorter', {
                    realCellIndex: spanningRealCellIndex,
                    realRowIndex: cellData.realRowIndex + i,
                    needResort: true
                });
                if ( $tds.length ) {
                    $tds.each( fixTdCellIndex );
                    $tds.first().before( $clone );
                } else {
                    $nextRows.eq( i ).append( $clone );
                }
            }
        }
    }
});