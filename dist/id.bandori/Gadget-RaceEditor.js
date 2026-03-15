/**
 * Gadget-RaceEditor.js
 * Race Record Editor — MediaWiki Gadget
 *
 * Cara pasang:
 *   1. Buat halaman: MediaWiki:Gadget-RaceEditor.js  → paste isi file ini
 *   2. Buat halaman: MediaWiki:Gadget-RaceEditor.css → paste isi file CSS-nya
 *   3. Tambahkan di MediaWiki:Gadgets-definition:
 *        * RaceEditor[ResourceLoader|dependencies=mediawiki.api,mediawiki.util,jquery.ui]|Gadget-RaceEditor.js|Gadget-RaceEditor.css
 *   4. Aktifkan di Preferensi → Gadgets → centang "RaceEditor"
 *
 * Cara pakai:
 *   - Buka halaman artikel yang punya {{RaceResultTable}}
 *   - Klik tombol "✚ Race" yang muncul di pojok kanan atas tabel
 *   - Isi form → Simpan → wikitext diperbarui otomatis via API
 */

/* global mw, $ */
( function () {
    'use strict';

    // ── Hanya jalan di mode baca (bukan di editor) ──────────────────────
    if ( mw.config.get( 'wgAction' ) !== 'view' ) return;

    // ── Deteksi apakah halaman punya RaceResultTable ────────────────────
    var pageText = '';  // akan diisi saat panel dibuka

    // Cari elemen tabel ras di halaman (biasanya section "Race record")
    var $raceSection = $( '.mw-parser-output' ).find(
        'h2, h3, h4'
    ).filter( function () {
        return /race\s*record/i.test( $( this ).text() );
    } );

    if ( !$raceSection.length ) return; // tidak ada section race record

    // ── Inject tombol di sebelah heading ───────────────────────────────
    var $heading = $raceSection.first();
    var $btn = $( '<button>' )
        .addClass( 're-open-btn' )
        .attr( 'title', 'Buka Race Record Editor' )
        .html( '✚ Race' );

    // Cari span .mw-editsection atau langsung append ke heading
    var $editSection = $heading.find( '.mw-editsection' );
    if ( $editSection.length ) {
        $editSection.before( $btn );
    } else {
        $heading.append( $btn );
    }

    // ── State ──────────────────────────────────────────────────────────
    var state = {
        entries: [],
        currentIdx: null,
        finishedVal: '',
        pageName: mw.config.get( 'wgPageName' ),
        sectionIndex: null   // nomor section, dicari lewat API
    };

    var CLASS_OPTIONS = [ '', 'Derby', 'A', 'B', 'C', 'Open', 'Stakes', 'Maiden', 'Claiming', 'Allowance' ];
    var FINISHED_OPTIONS = [ '1st', '2nd', '3rd', '4th', '5th', '6th', 'DNS', 'DNF', 'DQ' ];

    // ── Buka panel ─────────────────────────────────────────────────────
    $btn.on( 'click', function () {
        if ( $( '#re-overlay' ).length ) return;
        loadPageAndOpen();
    } );

    // ── Load wikitext halaman via API ──────────────────────────────────
    function loadPageAndOpen() {
        var api = new mw.Api();
        showLoading();

        api.get( {
            action: 'parse',
            page: state.pageName,
            prop: 'wikitext',
            formatversion: 2
        } ).done( function ( data ) {
            pageText = data.parse.wikitext;
            state.entries = parseWikitext( pageText );
            hideLoading();
            openPanel();
        } ).fail( function () {
            hideLoading();
            mw.notify( 'Gagal memuat wikitext halaman.', { type: 'error' } );
        } );
    }

    // ── Parse wikitext → array entries ────────────────────────────────
    function parseWikitext( wt ) {
        var results = [];
        var re = /\{\{Result\|([^}]+)\}\}/g;
        var match;
        while ( ( match = re.exec( wt ) ) !== null ) {
            var raw = match[ 1 ];
            var entry = {};
            // Split by | tapi hati-hati dengan nested {{ }}
            var parts = splitParams( raw );
            parts.forEach( function ( part ) {
                var eq = part.indexOf( '=' );
                if ( eq === -1 ) return;
                var key = part.slice( 0, eq ).trim();
                var val = part.slice( eq + 1 ).trim();
                entry[ key ] = val;
            } );
            results.push( normalizeEntry( entry ) );
        }
        return results;
    }

    // Split parameter string yang mungkin mengandung nested {{ }}
    function splitParams( str ) {
        var parts = [];
        var depth = 0;
        var cur = '';
        for ( var i = 0; i < str.length; i++ ) {
            var c = str[ i ];
            if ( c === '{' && str[ i + 1 ] === '{' ) { depth++; cur += c; continue; }
            if ( c === '}' && str[ i + 1 ] === '}' ) { depth--; cur += c; continue; }
            if ( c === '|' && depth === 0 ) {
                parts.push( cur );
                cur = '';
            } else {
                cur += c;
            }
        }
        if ( cur ) parts.push( cur );
        return parts;
    }

    function normalizeEntry( e ) {
        return {
            date:       e.date       || '',
            racecourse: e.racecourse || '',
            entry:      e.entry      || '',
            number:     e.number     || '',
            jockey:     e.jockey     || '',
            name:       e.name       || '',
            'class':    e['class']   || '',
            finished:   e.finished   || '',
            distance:   e.distance   || '',
            winner:     e.winner     || '',
            time:       e.time       || '',
            source:     e.source     || ''
        };
    }

    function emptyEntry() {
        return normalizeEntry( {} );
    }

    // ── Generate wikitext dari entries ────────────────────────────────
    function generateResultRows() {
        return state.entries.map( function ( e ) {
            return '{{Result|date= ' + e.date +
                '|racecourse= ' + e.racecourse +
                '|entry= ' + e.entry +
                '|number= ' + e.number +
                '|jockey= ' + e.jockey +
                '|name= ' + e.name +
                '|class= ' + e['class'] +
                '|finished= ' + e.finished +
                '|distance= ' + e.distance +
                '|winner= ' + e.winner +
                '|time= ' + e.time +
                '|source= ' + e.source + '}}';
        } ).join( '\n' );
    }

    // Ganti blok rows= di dalam {{RaceResultTable ... }} di wikitext asli
    function buildNewPageText() {
        var newRows = generateResultRows();
        // Ganti isi rows= sampai sebelum UnrecordedRaces comment atau penutup }}
        var replaced = pageText.replace(
            /({{RaceResultTable[\s\S]*?\|rows=\s*\n?)([\s\S]*?)(\n?<!--[\s\S]*?-->[\s\S]*?}}|(\n?}}(?!\s*{{)))/,
            function ( fullMatch, before, _oldRows, after ) {
                return before + newRows + '\n' + after;
            }
        );
        // Fallback: kalau pola tidak cocok, beri tahu
        if ( replaced === pageText ) {
            // Coba pola sederhana
            replaced = pageText.replace(
                /({{RaceResultTable[\s\S]*?\|rows=\s*\n?)([\s\S]*?)(\n?}})/,
                function ( fullMatch, before, _old, after ) {
                    return before + newRows + '\n' + after;
                }
            );
        }
        return replaced;
    }

    // ── Simpan ke wiki via API ─────────────────────────────────────────
    function saveToWiki( summary ) {
        var api = new mw.Api();
        var newText = buildNewPageText();

        $( '#re-save-btn' ).prop( 'disabled', true ).text( 'Menyimpan…' );

        api.postWithToken( 'csrf', {
            action: 'edit',
            title: state.pageName,
            text: newText,
            summary: summary || 'Perbarui Race Record via gadget',
            minor: true
        } ).done( function () {
            mw.notify( '✅ Race Record berhasil disimpan!', { type: 'success' } );
            pageText = newText;
            closePanel();
            // Reload halaman supaya tabel ter-render ulang
            setTimeout( function () { location.reload(); }, 800 );
        } ).fail( function ( code, data ) {
            mw.notify( 'Gagal menyimpan: ' + ( data && data.error && data.error.info || code ), { type: 'error' } );
            $( '#re-save-btn' ).prop( 'disabled', false ).text( '💾 Simpan ke Wiki' );
        } );
    }

    // ── DOM: Build panel ───────────────────────────────────────────────
    function openPanel() {
        state.currentIdx = state.entries.length ? 0 : null;
        state.finishedVal = state.entries.length ? state.entries[ 0 ].finished : '';

        var html = [
            '<div id="re-overlay">',
            '<div id="re-panel">',

            // Header
            '<div id="re-header">',
            '<span id="re-header-title">🏇 Race Record Editor</span>',
            '<span id="re-header-page">' + mw.html.escape( state.pageName.replace( /_/g, ' ' ) ) + '</span>',
            '<button id="re-close-btn" title="Tutup">✕</button>',
            '</div>',

            // Body
            '<div id="re-body">',

            // Left: list + form
            '<div id="re-left">',
            '<div id="re-list-wrap">',
            '<div id="re-list"></div>',
            '<button id="re-add-btn">＋ Tambah Race</button>',
            '</div>',
            '<div id="re-form-wrap">',
            buildFormHTML(),
            '</div>',
            '</div>',

            // Right: wikitext preview
            '<div id="re-right">',
            '<div id="re-right-header">',
            '<span>Wikitext Preview</span>',
            '<button id="re-copy-btn">📋 Salin</button>',
            '</div>',
            '<pre id="re-wikitext"></pre>',
            '</div>',

            '</div>', // re-body

            // Footer
            '<div id="re-footer">',
            '<input id="re-summary" type="text" placeholder="Ringkasan sunting (opsional)…">',
            '<button id="re-save-btn">💾 Simpan ke Wiki</button>',
            '<button id="re-cancel-btn">Batal</button>',
            '</div>',

            '</div>', // re-panel
            '</div>'  // re-overlay
        ].join( '' );

        $( 'body' ).append( html );
        bindEvents();
        renderList();
        if ( state.currentIdx !== null ) loadEntryToForm( state.currentIdx );
        updateWikitextPreview();

        // Animasi masuk
        requestAnimationFrame( function () {
            $( '#re-overlay' ).addClass( 're-visible' );
        } );
    }

    function buildFormHTML() {
        var classOpts = CLASS_OPTIONS.map( function ( c ) {
            return '<option value="' + c + '">' + ( c || '— pilih —' ) + '</option>';
        } ).join( '' );

        var finishedBtns = FINISHED_OPTIONS.map( function ( f ) {
            return '<button class="re-fin-btn" data-val="' + f + '">' + f + '</button>';
        } ).join( '' );

        return [
            '<div id="re-form">',
            '<div class="re-form-title">Detail Race</div>',
            '<div class="re-grid">',

            field( 'Tanggal', 're-f-date', 'text', 'Jul 28, 1985' ),
            field( 'Racecourse', 're-f-racecourse', 'text', 'Pulomas atau [[Pulomas Racecourse|Pulomas]]' ),
            field( 'Entry (jumlah kuda)', 're-f-entry', 'number', '12' ),
            field( 'HN (Horse Number)', 're-f-number', 'number', '4' ),
            '<div class="re-fg full">',
            '<label>Jockey</label>',
            '<input id="re-f-jockey" type="text" placeholder="W. Mewengkang">',
            '</div>',
            '<div class="re-fg full">',
            '<label>Nama Race</label>',
            '<input id="re-f-name" type="text" placeholder="Indonesia Derby atau [[Indonesia Derby]]">',
            '</div>',

            '<div class="re-fg">',
            '<label>Class</label>',
            '<select id="re-f-class">' + classOpts + '</select>',
            '</div>',
            field( 'Distance', 're-f-distance', 'text', '1400m' ),

            '<div class="re-fg full">',
            '<label>Finished</label>',
            '<div id="re-fin-row">' + finishedBtns + '</div>',
            '</div>',

            '<div class="re-fg full">',
            '<label>Runner-up / Winner (dalam kurung)</label>',
            '<input id="re-f-winner" type="text" placeholder="(Puri Ayu)">',
            '</div>',

            field( 'Time', 're-f-time', 'text', '1,20.0' ),

            '<div class="re-fg full">',
            '<label>Source (wikitext &lt;ref&gt;)</label>',
            '<textarea id="re-f-source" rows="3" placeholder=\'&lt;ref name="ref1"&gt;{{cite book ...}}&lt;/ref&gt;\'></textarea>',
            '</div>',

            '</div>', // re-grid
            '<div id="re-form-actions">',
            '<button id="re-entry-save">✔ Simpan Entry</button>',
            '<button id="re-entry-del" class="re-danger">🗑 Hapus</button>',
            '</div>',
            '</div>'
        ].join( '' );
    }

    function field( label, id, type, placeholder ) {
        return '<div class="re-fg">' +
            '<label>' + label + '</label>' +
            '<input id="' + id + '" type="' + type + '" placeholder="' + mw.html.escape( placeholder ) + '">' +
            '</div>';
    }

    // ── Events ─────────────────────────────────────────────────────────
    function bindEvents() {
        $( '#re-close-btn, #re-cancel-btn' ).on( 'click', closePanel );
        $( '#re-overlay' ).on( 'click', function ( e ) {
            if ( e.target.id === 're-overlay' ) closePanel();
        } );

        $( '#re-add-btn' ).on( 'click', function () {
            state.entries.push( emptyEntry() );
            state.currentIdx = state.entries.length - 1;
            state.finishedVal = '';
            renderList();
            loadEntryToForm( state.currentIdx );
            updateWikitextPreview();
        } );

        $( '#re-entry-save' ).on( 'click', function () {
            if ( state.currentIdx === null ) return;
            state.entries[ state.currentIdx ] = readForm();
            renderList();
            updateWikitextPreview();
            flash( '#re-entry-save', '✔ Tersimpan' );
        } );

        $( '#re-entry-del' ).on( 'click', function () {
            if ( state.currentIdx === null ) return;
            if ( !confirm( 'Hapus entry ini dari daftar?' ) ) return;
            state.entries.splice( state.currentIdx, 1 );
            state.currentIdx = state.entries.length ? Math.min( state.currentIdx, state.entries.length - 1 ) : null;
            if ( state.currentIdx !== null ) loadEntryToForm( state.currentIdx );
            renderList();
            updateWikitextPreview();
        } );

        $( document ).on( 'click', '.re-fin-btn', function () {
            state.finishedVal = $( this ).data( 'val' );
            renderFinishedBtns();
            updateWikitextPreview();
        } );

        $( document ).on( 'input', '#re-form input, #re-form select, #re-form textarea', function () {
            updateWikitextPreview();
        } );

        $( '#re-save-btn' ).on( 'click', function () {
            // Auto-simpan entry yang sedang aktif sebelum kirim ke wiki
            if ( state.currentIdx !== null ) {
                state.entries[ state.currentIdx ] = readForm();
            }
            var summary = $( '#re-summary' ).val().trim() ||
                'Perbarui Race Record via gadget (' + state.entries.length + ' race)';
            saveToWiki( summary );
        } );

        $( '#re-copy-btn' ).on( 'click', function () {
            var text = $( '#re-wikitext' ).text();
            navigator.clipboard.writeText( text ).then( function () {
                flash( '#re-copy-btn', '✅ Tersalin!' );
            } );
        } );
    }

    function flash( selector, label ) {
        var $el = $( selector );
        var orig = $el.text();
        $el.text( label );
        setTimeout( function () { $el.text( orig ); }, 1800 );
    }

    // ── Render list ────────────────────────────────────────────────────
    function renderList() {
        var $list = $( '#re-list' );
        if ( !state.entries.length ) {
            $list.html( '<div class="re-empty">Belum ada race. Klik "+ Tambah Race"</div>' );
            return;
        }
        var html = state.entries.map( function ( e, i ) {
            var active = state.currentIdx === i ? ' re-active' : '';
            var namePlain = stripWikilinks( e.name ) || '(tanpa nama)';
            return '<div class="re-list-item' + active + '" data-idx="' + i + '">' +
                '<span class="re-list-badge">' + mw.html.escape( e.date || '?' ) + '</span>' +
                '<div class="re-list-info">' +
                '<div class="re-list-name">' + mw.html.escape( namePlain ) + '</div>' +
                '<div class="re-list-meta">' + mw.html.escape( stripWikilinks( e.racecourse ) || '?' ) +
                ' · ' + mw.html.escape( e.distance || '?' ) + '</div>' +
                '</div>' +
                '</div>';
        } ).join( '' );
        $list.html( html );

        $( '.re-list-item' ).on( 'click', function () {
            var idx = parseInt( $( this ).data( 'idx' ), 10 );
            // Simpan entry saat ini dulu
            if ( state.currentIdx !== null ) {
                state.entries[ state.currentIdx ] = readForm();
            }
            state.currentIdx = idx;
            loadEntryToForm( idx );
            renderList();
        } );
    }

    // ── Form load / read ───────────────────────────────────────────────
    function loadEntryToForm( i ) {
        var e = state.entries[ i ];
        $( '#re-f-date' ).val( e.date );
        $( '#re-f-racecourse' ).val( e.racecourse );
        $( '#re-f-entry' ).val( e.entry );
        $( '#re-f-number' ).val( e.number );
        $( '#re-f-jockey' ).val( e.jockey );
        $( '#re-f-name' ).val( e.name );
        $( '#re-f-class' ).val( e['class'] );
        $( '#re-f-distance' ).val( e.distance );
        $( '#re-f-winner' ).val( e.winner );
        $( '#re-f-time' ).val( e.time );
        $( '#re-f-source' ).val( e.source );
        state.finishedVal = e.finished;
        renderFinishedBtns();
    }

    function readForm() {
        return {
            date:       $( '#re-f-date' ).val().trim(),
            racecourse: $( '#re-f-racecourse' ).val().trim(),
            entry:      $( '#re-f-entry' ).val().trim(),
            number:     $( '#re-f-number' ).val().trim(),
            jockey:     $( '#re-f-jockey' ).val().trim(),
            name:       $( '#re-f-name' ).val().trim(),
            'class':    $( '#re-f-class' ).val().trim(),
            finished:   state.finishedVal,
            distance:   $( '#re-f-distance' ).val().trim(),
            winner:     $( '#re-f-winner' ).val().trim(),
            time:       $( '#re-f-time' ).val().trim(),
            source:     $( '#re-f-source' ).val().trim()
        };
    }

    function renderFinishedBtns() {
        $( '.re-fin-btn' ).each( function () {
            var $b = $( this );
            $b.removeClass( 're-fin-1st re-fin-2nd re-fin-3rd re-fin-other' );
            if ( $b.data( 'val' ) === state.finishedVal ) {
                var cls = { '1st': 're-fin-1st', '2nd': 're-fin-2nd', '3rd': 're-fin-3rd' }[ state.finishedVal ] || 're-fin-other';
                $b.addClass( cls );
            }
        } );
    }

    // ── Wikitext preview ───────────────────────────────────────────────
    function updateWikitextPreview() {
        // Sertakan perubahan form saat ini (belum disimpan ke state.entries)
        var tempEntries = state.entries.slice();
        if ( state.currentIdx !== null ) {
            tempEntries[ state.currentIdx ] = readForm();
        }
        var rows = tempEntries.map( function ( e ) {
            return '{{Result|date= ' + e.date +
                '|racecourse= ' + e.racecourse +
                '|entry= ' + e.entry +
                '|number= ' + e.number +
                '|jockey= ' + e.jockey +
                '|name= ' + e.name +
                '|class= ' + e['class'] +
                '|finished= ' + e.finished +
                '|distance= ' + e.distance +
                '|winner= ' + e.winner +
                '|time= ' + e.time +
                '|source= ' + e.source + '}}';
        } ).join( '\n' );

        $( '#re-wikitext' ).text( rows );
    }

    // ── Tutup panel ────────────────────────────────────────────────────
    function closePanel() {
        $( '#re-overlay' ).removeClass( 're-visible' );
        setTimeout( function () { $( '#re-overlay' ).remove(); }, 280 );
    }

    // ── Loading indicator ──────────────────────────────────────────────
    function showLoading() {
        $( 'body' ).append( '<div id="re-loading">⏳ Memuat data…</div>' );
    }
    function hideLoading() {
        $( '#re-loading' ).remove();
    }

    // ── Helper ─────────────────────────────────────────────────────────
    function stripWikilinks( s ) {
        return ( s || '' ).replace( /\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1' );
    }

}() );