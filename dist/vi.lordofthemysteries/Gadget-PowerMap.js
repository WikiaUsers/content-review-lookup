/*
MediaWiki-Gadget-PowerMap.js
Client-side PowerMap renderer (Dorui-enabled archive/export)
- Renders a percent-based power-map in the browser (no Lua Module_PowerMap.lua used)
- Uses data from a JSON page `MediaWiki:PowerMap-data.json` if present, or from
  global variable `window.PowerMapData` (for quick testing).
- Provides an "Export positions" button (Dorui modal if Dorui is available) which
  shows a JSON dump of the current positions object so you can paste it into
  Module:PowerMap/positions (or otherwise archive it).

INSTALL:
1) Create a wiki page `MediaWiki:PowerMap-data.json` containing a JSON object with
   three top-level keys: `pmLevels`, `pathway`, and `positions` (positions optional).
   Example structure:
   {
     "pmLevels": {
       "Original Creator": { "child": ["1st Pillar"] },
       "1st Pillar": { "child": ["Lord of Mysteries"], "sub-name": "Pillar Sub" },
       "Lord of Mysteries": { "group": true, "child": ["Fool","Error","Door"] }
     },
     "pathway": {
       "Fool": { "label": "Fool", "html": "<div>...</div>" },
       "Error": { "label": "Error" }
     },
     "positions": {
       "Lord of Mysteries": { "x": 30, "y": 40, "width": "12%" },
       "Fool": { "x": 30, "y": 60 }
     }
   }

2) Add this script as a gadget or to MediaWiki:Common.js / MediaWiki:Gadget-PowerMap.js.

NOTES:
- This script expects pathway HTML in `pathway[name].html` where possible. If not
  available it will display a simple label (the name) and optionally a small icon
  if `pathway[name].icon` is provided.
- The script will try to load Dorui from the standard dev wiki if it's not present
  and will fall back to a native fallback dialog for exporting.
- The goal is a lightweight client-side renderer and an Export tool to archive positions.
*/

( function () {
    'use strict';

    if ( window.PowerMapGadgetLoaded ) return;
    window.PowerMapGadgetLoaded = true;

    var api = new mw.Api();

    function fetchDataPage( title ) {
        return api.get( {
            action: 'query',
            prop: 'revisions',
            titles: title,
            rvprop: 'content',
            format: 'json'
        } ).then( function ( res ) {
            var pages = res.query && res.query.pages;
            if ( !pages ) return null;
            for ( var k in pages ) {
                if ( pages[k].revisions && pages[k].revisions[0] ) {
                    return pages[k].revisions[0]['*'];
                }
            }
            return null;
        } ).catch( function () { return null; } );
    }

    function parseJSONContent( txt ) {
        try {
            return JSON.parse( txt );
        } catch ( e ) {
            // attempt to extract json from wikitext (strip leading <pre> or similar)
            var m = txt.match(/\{[\s\S]*\}/);
            if ( m ) {
                try { return JSON.parse( m[0] ); } catch ( e2 ) { return null; }
            }
            return null;
        }
    }

    // Attempt to parse simple Lua table literals returned by Module pages like
    // `Module:PowerLevel/data`. This is a best-effort heuristic parser that
    // handles common mw.loadData outputs (nested tables, strings, numbers,
    // booleans). It's not a full Lua parser but works for straightforward data files.
    function parseLuaTable( txt, base ) {
        if ( !txt ) return null;
        try {
            // strip Lua comments -- ... and --[[ ... ]]
            txt = txt.replace(/--\[\[[\s\S]*?\]\]/g, '');
            txt = txt.replace(/--[^\n\r]*/g, '');
            // find first table start after optional 'return'
            var m = txt.match(/return\s*([\s\S]*)$/m);
            var body = m ? m[1] : txt;
            // trim surrounding whitespace
            body = body.trim();
            // sometimes the module returns a function or other code; only proceed if it starts with '{'
            var firstBrace = body.indexOf('{');
            if ( firstBrace === -1 ) return null;
            // extract from first brace to matching brace -- naive bracket matching
            var depth = 0, i, start = -1;
            for ( i = 0; i < body.length; i++ ) {
                if ( body[i] === '{' ) { if ( start === -1 ) start = i; depth++; }
                else if ( body[i] === '}' ) { depth--; if ( depth === 0 ) { body = body.slice(start, i+1); break; } }
            }
            // convert Lua-ish table to JSON-ish text
            var s = body;
            // replace long brackets [[...]] with JSON strings
            s = s.replace(/\[\[[\s\S]*?\]\]/g, function (m) { return JSON.stringify(m.slice(2,-2)); });
            // replace single-quoted strings with double-quoted
            s = s.replace(/'([^']*)'/g, function(_,a){ return '"' + a.replace(/\\"/g,'\\\\"') + '"'; });
            // replace true/false/nil
            s = s.replace(/\bnil\b/g, 'null');
            s = s.replace(/\btrue\b/g, 'true');
            s = s.replace(/\bfalse\b/g, 'false');
            // replace Lua table constructors: ['key'] = or ["key"] = to "key":
            s = s.replace(/\[\s*"([^\"]+)"\s*\]\s*=\s*/g, '"$1": ');
            s = s.replace(/\[\s*'([^']+)'\s*\]\s*=\s*/g, '"$1": ');
            // replace bareword keys: key =  -> "key":
            s = s.replace(/([\,{]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*=\s*/g, function(_,a,b){ return a + '"' + b + '": '; });
            // replace equals to colon for remaining cases (key = value)
            // ensure '=' used inside arrays isn't mangled (we handled keys above)
            // remove trailing commas before }
            s = s.replace(/,\s*}/g, '}');
            s = s.replace(/,\s*\]/g, ']');
            // Now we should have something close to JSON; try to eval
            return JSON.parse( s );
        } catch ( e ) {
            // tolerant fallback: try to extract simple structures (child arrays, group flags, labels)
            try {
                var out = {};
                // find top-level keys: either ['Name'] = { ... } or Name = { ... }
                var entryRe = /(?:\[\s*['"]?([^\]'"\]]+)['"]?\s*\]|([A-Za-z0-9_\- ]+))\s*=\s*\{/g;
                var m;
                while ( (m = entryRe.exec(txt)) ) {
                    var name = m[1] || m[2];
                    name = name && name.trim();
                    if (!name) continue;
                    // try to extract the block starting at current index- find matching brace
                    var start = txt.indexOf('{', m.index + m[0].length - 1);
                    if ( start === -1 ) continue;
                    var depth = 0, i, end = -1;
                    for ( i = start; i < txt.length; i++ ) {
                        if ( txt[i] === '{' ) depth++; else if ( txt[i] === '}' ) { depth--; if ( depth === 0 ) { end = i; break; } }
                    }
                    if ( end === -1 ) continue;
                    var block = txt.slice( start+1, end );
                    // find child = { ... }
                    var childMatch = block.match(/child\s*=\s*\{([\s\S]*?)\}/);
                    var children = [];
                    if ( childMatch ) {
                        var list = childMatch[1];
                        // match quoted strings inside
                        var strRe = /['"]([^'"]+)['"]/g; var sm;
                        while ( (sm = strRe.exec(list)) ) { children.push( sm[1].trim() ); }
                        // also match barewords (rare)
                        if ( children.length === 0 ) {
                            var bareRe = /([A-Za-z0-9_\- ]+)/g; var bm;
                            while ( (bm = bareRe.exec(list)) ) { var v = bm[1].trim(); if (v) children.push(v); }
                        }
                    }
                    // detect group = true
                    var group = /\bgroup\s*=\s*true\b/.test(block);
                    // detect sub-name = "..."
                    var sub = (block.match(/['\"]sub%-name['\"]?\s*[:=]\s*['\"]([^'\"]+)['\"]/i) || block.match(/sub%-name\s*=\s*['\"]([^'\"]+)['\"]/i));
                    var subName = sub ? sub[1] : null;
                    // build a simple entry
                    out[name] = {};
                    if ( children.length ) out[name].child = children;
                    if ( group ) out[name].group = true;
                    if ( subName ) out[name]['sub-name'] = subName;
                }
                if ( Object.keys(out).length > 0 ) return out;
            } catch (e2) {
                return null;
            }
            return null;
        }
    }

    // Given a base like 'Pathways/data', try a few namespace/title variants and
    // return the first parsed Lua table we can find. Logs attempts to console.
    // global fetch log for debugging
    window.PowerMapFetchLog = window.PowerMapFetchLog || [];
    function fetchAndParseModule( base ) {
        var candidates = [
            'Module:' + base,
            'Mô đun:' + base, // localized Vietnamese namespace sometimes used on Fandom
            'Module:' + base.replace('/', '_'),
            base
        ];
        // try candidates sequentially
        var attempt = function ( idx ) {
            if ( idx >= candidates.length ) return Promise.resolve( null );
            var title = candidates[idx];
            return fetchDataPage( title ).then( function ( content ) {
                window.PowerMapFetchLog.push({ title: title, found: !!content });
                console.log('PowerMap: trying', title, '->', content ? 'found' : 'not found');
                if ( !content ) return attempt( idx + 1 );
                var parsed = parseLuaTable( content, base );
                if ( parsed ) return parsed;
                // if parsing failed, try next
                window.PowerMapFetchLog.push({ title: title, parsed: false });
                console.warn('PowerMap: parseLuaTable failed for', title);
                return attempt( idx + 1 );
            } ).catch( function (err) { window.PowerMapFetchLog.push({ title: title, error: String(err) }); return attempt( idx + 1 ); } );
        };
        return attempt(0);
    }

    function ensureDorui() {
        return new mw.Promise( function ( resolve ) {
            if ( window.Dorui && window.Dorui.open ) return resolve( window.Dorui );
            // try to load from dev (common on fandom)
            var src = 'https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:Dorui.js';
            mw.loader.load( src, function () {
                if ( window.Dorui ) return resolve( window.Dorui );
                resolve( null );
            } );
        } );
    }

    function createContainer() {
        var root = document.createElement( 'div' );
        root.className = 'powermap-gadget-wrapper';
        // simple default styles; you can override from wiki CSS
        root.style.position = 'relative';
        root.style.width = '100%';
        root.style.maxWidth = '1000px';
        root.style.margin = '10px auto';
        root.style.paddingTop = '56.25%'; // default 16:9
        root.style.border = '1px solid #ddd';
        root.style.background = 'var(--card-bg,#fff)';
        root.style.boxSizing = 'border-box';
        root.style.overflow = 'hidden';
        return root;
    }

    function createStage( container ) {
        var stage = document.createElement( 'div' );
        stage.className = 'pm-stage';
        stage.style.position = 'absolute';
        stage.style.left = '0';
        stage.style.top = '0';
        stage.style.right = '0';
        stage.style.bottom = '0';
        stage.style.pointerEvents = 'auto';
        container.appendChild( stage );
        return stage;
    }

    function createNodeElement( name, html, width ) {
        var node = document.createElement( 'div' );
        node.className = 'pm-node';
        node.style.position = 'absolute';
        node.style.transform = 'translate(-50%,-50%)';
        node.style.width = width || '12%';
        node.style.boxSizing = 'border-box';
        node.style.padding = '6px';
        node.style.borderRadius = '6px';
        node.style.textAlign = 'center';
        node.style.background = 'var(--card-bg,#fff)';
        node.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
        node.innerHTML = html || ('<div style="font-weight:600;">' + mw.html.escape( name ) + '</div>');
        return node;
    }

    function renderMap( target, data ) {
        // data: { pmLevels, pathway, positions }
        var pmLevels = data.pmLevels || {};
        var pathway = data.pathway || {};
        var positions = data.positions || {};

        var container = createContainer();
        var stage = createStage( container );

        // attach toolbar
        var toolbar = document.createElement('div');
        toolbar.style.position = 'absolute';
        toolbar.style.right = '6px';
        toolbar.style.top = '6px';
        toolbar.style.zIndex = '50';
        container.appendChild(toolbar);

        var exportBtn = document.createElement('button');
        exportBtn.textContent = 'Export positions';
        exportBtn.style.padding = '6px 10px';
        exportBtn.style.fontSize = '13px';
        exportBtn.style.cursor = 'pointer';
        toolbar.appendChild(exportBtn);

    // simple debug panel (hidden by default)
    var debugBtn = document.createElement('button');
    debugBtn.textContent = 'Debug';
    debugBtn.style.marginLeft = '6px';
    toolbar.appendChild(debugBtn);

    var debugPanel = document.createElement('div');
    debugPanel.style.position = 'absolute';
    debugPanel.style.right = '6px';
    debugPanel.style.top = '40px';
    debugPanel.style.maxWidth = '360px';
    debugPanel.style.background = 'rgba(255,255,255,0.95)';
    debugPanel.style.border = '1px solid #ccc';
    debugPanel.style.padding = '8px';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.display = 'none';
    debugPanel.style.zIndex = '60';
    debugPanel.innerHTML = '<strong>PowerMap debug</strong><div class="pm-debug-body" style="max-height:200px;overflow:auto;margin-top:6px;"></div>';
    container.appendChild(debugPanel);
    debugBtn.addEventListener('click', function () { debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none'; });

        // simple helpers
        function nodeHtmlFor(name) {
            var p = pathway[name] || {};
            if ( p.html ) return p.html;
            var lbl = p.label || name;
            var iconHtml = '';
            if ( p.icon ) iconHtml = '<div><img src="' + mw.html.escape( p.icon ) + '" style="width:28px;height:28px;object-fit:contain;display:block;margin:0 auto 4px;"/></div>';
            return iconHtml + '<div style="font-weight:600;">' + mw.html.escape(lbl) + '</div>';
        }

        function placeNode( name, x, y, w ) {
            var html = nodeHtmlFor( name );
            var node = createNodeElement( name, html, w );
            node.style.left = String( x ) + '%';
            node.style.top = String( y ) + '%';
            stage.appendChild( node );
            return node;
        }

        // root
        var rootName = 'Original Creator';
        var rootEntry = pmLevels[rootName] || {};
        placeNode( rootName, 50, 6, (positions[rootName] && positions[rootName].width) || '18%' );

        // pillars
        var pillars = [];
        if ( rootEntry.child && Array.isArray( rootEntry.child ) ) {
            rootEntry.child.forEach( function ( p ) { pillars.push( p ); } );
        }

        var pillarPositions = {};
        pillars.forEach( function ( pname, i ) {
            var ppos = positions[pname];
            var x, y;
            if ( ppos && typeof ppos.x === 'number' && typeof ppos.y === 'number' ) { x = ppos.x; y = ppos.y; }
            else { x = ( ( i + 0.5 ) / pillars.length ) * 100; y = 20; }
            pillarPositions[pname] = { x: x, y: y };
            placeNode( pname, x, y, (ppos && ppos.width) || '14%' );
        } );

        // groups & children
        Object.keys( pmLevels ).forEach( function ( gname ) {
            var gentry = pmLevels[gname];
            if ( typeof gentry === 'object' && gentry.group && gentry.child ) {
                // decide anchor
                var pos = positions[gname];
                var gx, gy;
                if ( pos && typeof pos.x === 'number' && typeof pos.y === 'number' ) { gx = pos.x; gy = pos.y; }
                else {
                    // if group belongs to a pillar, anchor under pillar
                    var parent = null;
                    for ( var pname in pillarPositions ) {
                        var pentry = pmLevels[pname] || {};
                        if ( pentry.child && Array.isArray(pentry.child) && pentry.child.indexOf(gname) !== -1 ) { parent = pname; break; }
                    }
                    if ( parent ) { gx = pillarPositions[parent].x; gy = 40; }
                    else { gx = 50; gy = 40; }
                }

                // render header
                placeNode( gname, gx, gy, (pos && pos.width) || '12%' );

                // split explicit vs implicit children
                var children = Array.isArray(gentry.child) ? gentry.child.slice() : [];
                var explicit = [];
                var implicit = [];
                children.forEach( function ( child ) {
                    var p = positions[child];
                    if ( p && typeof p.x === 'number' && typeof p.y === 'number' ) explicit.push( child ); else implicit.push( child );
                } );

                // render explicit at their positions
                explicit.forEach( function ( child ) {
                    var p = positions[child];
                    placeNode( child, (p && p.x) || gx, (p && p.y) || gy, (p && p.width) || '10%' );
                } );

                // stack implicit children starting at offset under header
                var offset = (pos && pos.offset) || 12;
                var step = (pos && pos.step) || 12;
                var headerH = 8; // percent heuristic
                var y = gy + (headerH / 2) + offset + 4; // first child's half height ~4
                implicit.forEach( function ( child, idx ) {
                    placeNode( child, gx, y, (positions[child] && positions[child].width) || '10%' );
                    y += step; // simple stepping
                } );
            }
        } );

        // export button handler
        exportBtn.addEventListener( 'click', function () {
            var exportObj = JSON.parse( JSON.stringify( positions || {} ) );
            // include automatically detected anchors for implicit nodes (helpful)
            // compute positions of nodes in percent from DOM
            var computed = {};
            Array.prototype.forEach.call( stage.querySelectorAll('.pm-node'), function ( node ) {
                var left = node.style.left.replace('%','') * 1;
                var top = node.style.top.replace('%','') * 1;
                var w = node.style.width || '';
                var txt = node.textContent && node.textContent.trim();
                // use textContent as key if it's a known name; otherwise skip
                // We stored name as inner text first element; try to get it from data- attribute
                // As a robust fallback, attempt to find a matching known name by label
                computed[ txt ] = computed[ txt ] || { x: left, y: top, width: w };
            } );
            // merge computed to exportObj for any keys missing
            Object.keys( computed ).forEach( function ( key ) {
                if ( !exportObj[ key ] ) exportObj[ key ] = computed[ key ];
            } );

            var jsonText = JSON.stringify( exportObj, null, 2 );

            ensureDorui().then( function ( Dorui ) {
                if ( Dorui && Dorui.open ) {
                    Dorui.open( {
                        size: 'large',
                        title: 'Export PowerMap positions (copy & paste)',
                        body: '<pre style="white-space:pre-wrap;word-break:break-word;max-height:400px;overflow:auto;border:1px solid #ddd;padding:8px;background:#fff;">' + mw.html.escape( jsonText ) + '</pre>',
                        buttons: [ { text: 'Close', primary: true } ]
                    } );
                } else {
                    // fallback: try clipboard, otherwise show prompt
                    if ( navigator.clipboard && navigator.clipboard.writeText ) {
                        navigator.clipboard.writeText( jsonText ).then( function () { alert( 'Positions copied to clipboard' ); } ).catch( function () { prompt( 'Export JSON (copy):', jsonText ); } );
                    } else {
                        prompt( 'Export JSON (copy):', jsonText );
                    }
                }
            } ).catch( function () { prompt( 'Export JSON (copy):', jsonText ); } );
        } );

        // insert into target
        target.innerHTML = ''; // clear
        target.appendChild( container );

        // return positions for external access
        return { container: container, stage: stage, debugPanel: debugPanel };
    }

    // Auto-initialize on elements with class 'powermap-container' on the page
    function initAuto() {
        var nodes = document.querySelectorAll( '.powermap-container' );
        // If no explicit container found, try to auto-insert one into common content areas
        if ( !nodes || nodes.length === 0 ) {
            var contentAreas = [ '#mw-content-text', '.mw-parser-output', '.page__main', '.WikiaArticle' ];
            var inserted = false;
            for ( var i = 0; i < contentAreas.length && !inserted; i++ ) {
                var parent = document.querySelector( contentAreas[i] );
                if ( parent ) {
                    var el = document.createElement('div');
                    el.className = 'powermap-container';
                    el.style.margin = '12px 0';
                    parent.insertBefore( el, parent.firstChild );
                    inserted = true;
                }
            }
            nodes = document.querySelectorAll( '.powermap-container' );
            if ( !nodes || nodes.length === 0 ) {
                console.warn('PowerMap: no container found and auto-insert failed');
                return;
            }
        }

        // load data: prefer JSON page, then window.PowerMapData
        fetchDataPage( 'MediaWiki:PowerMap-data.json' ).then( function ( content ) {
            var data = null;
            if ( content ) data = parseJSONContent( content );
            if ( !data && window.PowerMapData ) data = window.PowerMapData;
            if ( data ) { nodes.forEach( function ( node ) { renderMap( node, data ); } ); return; }

            // JSON page absent. Try loading Module pages and parsing their Lua tables.
            Promise.all([
                fetchAndParseModule('Module:PowerLevel/data'),
                fetchAndParseModule('Module:Pathways/data'),
                fetchAndParseModule('Module:PowerMap/positions')
            ]).then(function ( results ) {
                var pmLevels = results[0] || {};
                var pathway = results[1] || {};
                var positions = results[2] || {};
                // If we failed to parse module pages, show a helpful message
                if ( Object.keys(pmLevels).length === 0 && Object.keys(pathway).length === 0 && Object.keys(positions).length === 0 ) {
                    nodes.forEach( function ( node ) { node.innerHTML = '<div style="padding:12px;color:#a00;">PowerMap data not found. Create MediaWiki:PowerMap-data.json or ensure Module:PowerLevel/data, Module:Pathways/data exist.</div>'; } );
                    return;
                }
                var composed = { pmLevels: pmLevels, pathway: pathway, positions: positions };
                nodes.forEach( function ( node ) {
                    var res = renderMap( node, composed );
                    // populate debug panel if present
                    if ( res && res.debugPanel ) {
                        var body = res.debugPanel.querySelector('.pm-debug-body');
                        var lines = [];
                        if ( window.PowerMapFetchLog && window.PowerMapFetchLog.length ) {
                            lines.push('<div><strong>Fetch attempts</strong></div>');
                            window.PowerMapFetchLog.forEach(function (it) { lines.push('<div>' + mw.html.escape(JSON.stringify(it)) + '</div>'); });
                        }
                        lines.push('<div><strong>Loaded summary</strong></div>');
                        lines.push('<div>pmLevels: ' + Object.keys(pmLevels).length + ' entries</div>');
                        lines.push('<div>pathway: ' + Object.keys(pathway).length + ' entries</div>');
                        lines.push('<div>positions: ' + Object.keys(positions).length + ' entries</div>');
                        body.innerHTML = lines.join('');
                    }
                } );
            }).catch(function () {
                nodes.forEach( function ( node ) { node.innerHTML = '<div style="padding:12px;color:#a00;">Unable to load PowerMap data.</div>'; } );
            });
        } ).catch( function () {
            if ( window.PowerMapData ) nodes.forEach( function ( node ) { renderMap( node, window.PowerMapData ); } );
        } );
    }

    // expose a manual initializer for use from console or other scripts
    window.PowerMapGadget = {
        renderInto: function ( domNode, data ) { return renderMap( domNode, data ); },
        loadDataPage: fetchDataPage
    };

    // run when DOM ready
    mw.hook( 'wikipage.content' ).add( initAuto );
    mw.loader.using( [ 'mediawiki.api' ] ).then( initAuto );

} )();