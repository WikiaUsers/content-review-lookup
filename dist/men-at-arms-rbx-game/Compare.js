/*
  Compare panel for item tables.

  - Add the class av-comparable to a wikitable. Arg 1 is the item name,
    the other columns are stats
  - Tick items, then press Compare to see them side by side in a bottom panel.
    The better number in each row is highlighted
  - Optional on a header cell: data-better="low" (lower wins) or
    data-better="none" (no highlight). The default is higher wins

  No network requests. Does not touch location.hash
  Without JS, the tables are unchanged
 */
( function () {
    'use strict';

    // Items that can be compared at once (raise MAX_ITEMS later for multi-item comparison)
    const MAX_ITEMS = 2;
    const MIN_ITEMS = 2;

    let picked     = [];
    let bar        = null;
    let statusEl   = null;
    let compareBtn = null;
    let panel      = null;
    let panelBody  = null;
    let lastFocus  = null;

    function cellText( cell ) {
        return cell.textContent.replace( /\s+/g, ' ' ).trim();
    }

    // First number in a cell: "12 (+3)" gives 12, "1,200" gives 1200, "Fast" gives null
    function getNumber( text ) {
        const match = text.replace( /,/g, '' ).match( /-?\d+(\.\d+)?/ );
        return match ? parseFloat( match[ 0 ] ) : null;
    }

    function getHeaders( table ) {
        const headRow = table.tHead && table.tHead.rows.length ? table.tHead.rows[ 0 ] : table.rows[ 0 ];
        return Array.from( headRow.cells );
    }

    // Read one table row into a name plus a list of stats
    function describe( row ) {
        const table   = row.closest( 'table' );
        const headers = getHeaders( table );
        const cells   = Array.from( row.cells );
        const stats   = [];

        cells.forEach( ( cell, index ) => {
            if ( index === 0 || !headers[ index ] ) {
                return;
            }
            const text = cellText( cell );
            stats.push( {
                label:  cellText( headers[ index ] ),
                text:   text,
                number: getNumber( text ),
                better: headers[ index ].dataset.better || 'high'
            } );
        } );

        return { name: cellText( cells[ 0 ] ), stats: stats };
    }

    // The winning number for one stat row, or null when there is nothing to highlight
    function bestOf( values, rule ) {
        if ( rule === 'none' ) {
            return null;
        }
        const numbers = values
            .filter( value => value && value.number !== null )
            .map( value => value.number );
        if ( numbers.length < 2 ) {
            return null;
        }
        const top = rule === 'low' ? Math.min( ...numbers ) : Math.max( ...numbers );
        return numbers.every( number => number === top ) ? null : top;
    }

    function buildTable( items ) {
        const labels   = [];
        const betterBy = {};

        items.forEach( item => {
            item.stats.forEach( stat => {
                if ( !labels.includes( stat.label ) ) {
                    labels.push( stat.label );
                    betterBy[ stat.label ] = stat.better;
                }
            } );
        } );

        const table   = document.createElement( 'table' );
        const headRow = table.createTHead().insertRow();
        table.className = 'av-compare-table';

        headRow.appendChild( document.createElement( 'th' ) );
        items.forEach( item => {
            const th = document.createElement( 'th' );
            th.textContent = item.name;
            headRow.appendChild( th );
        } );

        const body = table.createTBody();
        labels.forEach( label => {
            const row    = body.insertRow();
            const values = items.map( item => item.stats.find( stat => stat.label === label ) );
            const best   = bestOf( values, betterBy[ label ] );

            row.insertCell().textContent = label;
            values.forEach( value => {
                const cell = row.insertCell();
                cell.textContent = value ? value.text : '—';
                if ( best !== null && value && value.number === best ) {
                    cell.className = 'av-best';
                }
            } );
        } );

        return table;
    }

    function buildBar() {
        bar = document.createElement( 'div' );
        bar.className = 'av-compare-bar';

        statusEl = document.createElement( 'span' );

        compareBtn = document.createElement( 'button' );
        compareBtn.type = 'button';
        compareBtn.textContent = 'Compare';
        compareBtn.addEventListener( 'click', openPanel );

        const clearBtn = document.createElement( 'button' );
        clearBtn.type = 'button';
        clearBtn.textContent = 'Clear';
        clearBtn.addEventListener( 'click', clearAll );

        bar.append( statusEl, compareBtn, clearBtn );
        document.body.appendChild( bar );
    }

    function buildPanel() {
        panel = document.createElement( 'div' );
        panel.className = 'av-compare';
        panel.setAttribute( 'role', 'dialog' );
        panel.setAttribute( 'aria-label', 'Item comparison' );
        panel.tabIndex = -1;

        panelBody = document.createElement( 'div' );

        const closeBtn = document.createElement( 'button' );
        closeBtn.type = 'button';
        closeBtn.textContent = '✕ Close';
        closeBtn.addEventListener( 'click', () => closePanel( true ) );

        panel.append( panelBody, closeBtn );
        document.body.appendChild( panel );
    }

    function updateBar() {
        if ( !bar ) {
            buildBar();
        }
        const names   = picked.map( row => cellText( row.cells[ 0 ] ) ).join( ' vs ' );
        const missing = MIN_ITEMS - picked.length;

        statusEl.textContent = missing > 0 && picked.length > 0
            ? names + ' — pick ' + missing + ' more'
            : names;
        compareBtn.disabled = picked.length < MIN_ITEMS;
        bar.classList.toggle( 'av-open', picked.length > 0 );
    }

        function openPanel() {
        if ( picked.length < MIN_ITEMS ) {
            return;
        }
        if ( !panel ) {
            buildPanel();
        }
        const items = picked.map( describe );

        // Remember where to return focus, then build the table and clear the picks
        lastFocus = picked[ picked.length - 1 ].querySelector( '.av-pick' );
        panelBody.replaceChildren( buildTable( items ) );
        clearAll();

        panel.classList.add( 'av-open' );
        panel.focus( { preventScroll: true } );
    }

    function closePanel( returnFocus ) {
        if ( !panel || !panel.classList.contains( 'av-open' ) ) {
            return;
        }
        panel.classList.remove( 'av-open' );
        if ( returnFocus && lastFocus ) {
            lastFocus.focus( { preventScroll: true } );
        }
    }

    function clearAll() {
        picked.forEach( row => {
            row.classList.remove( 'av-picked' );
            row.querySelector( '.av-pick' ).checked = false;
        } );
        picked = [];
        updateBar();
    }

    // Add a checkbox to each data row, inside its first cell (no extra column)
        // Add a hidden checkbox to each data row; the whole row acts as the click target
    function initTable( table ) {
        if ( table.dataset.avReady ) {
            return;
        }
        table.dataset.avReady = '1';

        Array.from( table.rows ).forEach( row => {
            if ( !row.querySelector( 'td' ) ) {
                return;
            }
            const first = row.cells[ 0 ];
            const box   = document.createElement( 'input' );

            box.type = 'checkbox';
            box.className = 'av-pick';
            box.setAttribute( 'aria-label', 'Compare ' + cellText( first ) );
            first.insertBefore( box, first.firstChild );
            row.classList.add( 'av-pickrow' );
        } );
    }

    // Tick or untick a row (the oldest pick is dropped when the limit is reached)
    document.addEventListener( 'change', event => {
        const box = event.target;
        if ( !box.classList || !box.classList.contains( 'av-pick' ) ) {
            return;
        }
        const row = box.closest( 'tr' );

        if ( box.checked ) {
            picked.push( row );
            row.classList.add( 'av-picked' );
            while ( picked.length > MAX_ITEMS ) {
                const dropped = picked.shift();
                dropped.classList.remove( 'av-picked' );
                dropped.querySelector( '.av-pick' ).checked = false;
            }
        } else {
            picked = picked.filter( item => item !== row );
            row.classList.remove( 'av-picked' );
        }
        updateBar();
    } );
    
        // Clicks: outside the panel closes it, otherwise a row click picks that row
    document.addEventListener( 'click', event => {
        if ( panel && panel.classList.contains( 'av-open' ) ) {
            if ( !event.target.closest( '.av-compare, .av-compare-bar' ) ) {
                closePanel( false );
            }
            return;
        }

        const row = event.target.closest( 'tr.av-pickrow' );
        if ( !row ) {
            return;
        }
        if ( event.target.closest( 'a, button, input, label, select, textarea' ) ) {
            return;
        }
        if ( window.getSelection().toString() ) {
            return;
        }
        row.querySelector( '.av-pick' ).click();
    } );

    document.addEventListener( 'keydown', event => {
        if ( event.key === 'Escape' ) {
            closePanel( true );
        }
    } );

    mw.hook( 'wikipage.content' ).add( $content => {
        $content.find( 'table.av-comparable' ).each( ( index, table ) => initTable( table ) );
    } );
}() );