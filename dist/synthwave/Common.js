/**
 * SynthwaveArtistMap for synthwave.fandom.com 
 * Renders an auto-populated world map of all artists in Category:Artists
 * based on the Place of Origin field in their Artist Infobox.
 *
 * First load geocodes unique locations via Nominatim (~90 sec at 1 req/sec).
 * Results cached in localStorage for 30 days; subsequent loads are instant.
 * Clear cache: localStorage.removeItem('sw_artist_coords_v1');
 */

/* global mw */
( function () {
    'use strict';

    var PAGE_NAME       = 'Artist_Locations';
    var CATEGORY        = 'Artists';
    var CACHE_KEY       = 'sw_artist_coords_v1';
    var CACHE_TTL       = 30 * 24 * 60 * 60 * 1000; // 30 days
    var MAP_HEIGHT      = '580px';
    var NOMINATIM_EMAIL = 'admin@synthwave.fandom.com';

    if ( mw.config.get( 'wgPageName' ) !== PAGE_NAME ) { return; }

    // ── Leaflet loader ─────────────────────────────────────────────────────
    function loadLeaflet( cb ) {
        if ( window.L ) { cb(); return; }

        var css  = document.createElement( 'link' );
        css.rel  = 'stylesheet';
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild( css );

        var js     = document.createElement( 'script' );
        js.src     = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        js.onload  = cb;
        js.onerror = function () {};
        document.head.appendChild( js );
    }

    // ── MediaWiki API helpers ──────────────────────────────────────────────
    function getCategoryMembers( cb ) {
        var api    = new mw.Api();
        var titles = [];

        function fetchPage( cont ) {
            var params = {
                action  : 'query',
                list    : 'categorymembers',
                cmtitle : 'Category:' + CATEGORY,
                cmlimit : 500
            };
            if ( cont ) { params.cmcontinue = cont; }

            api.get( params )
                .done( function ( data ) {
                    data.query.categorymembers.forEach( function ( m ) {
                        titles.push( m.title );
                    } );
                    if ( data.continue && data.continue.cmcontinue ) {
                        fetchPage( data.continue.cmcontinue );
                    } else {
                        cb( titles );
                    }
                } )
                .fail( function () {
                    cb( titles );
                } );
        }

        fetchPage( null );
    }

    function getInboxLocations( titles, cb ) {
        if ( !titles.length ) { cb( {} ); return; }

        var api     = new mw.Api();
        var results = {};
        var batches = [];

        for ( var i = 0; i < titles.length; i += 50 ) {
            batches.push( titles.slice( i, i + 50 ) );
        }

        var remaining = batches.length;

        function onBatchDone() {
            if ( --remaining === 0 ) { cb( results ); }
        }

        batches.forEach( function ( batch ) {
            api.get( {
                action : 'query',
                prop   : 'pageprops',
                titles : batch.join( '|' )
            } )
                .done( function ( data ) {
                    Object.keys( data.query.pages ).forEach( function ( pid ) {
                        var page = data.query.pages[ pid ];
                        var raw  = ( page.pageprops || {} ).infoboxes;
                        if ( !raw ) { return; }

                        try {
                            var boxes = JSON.parse( raw );
                            boxes.forEach( function ( ib ) {
                                ( ib.data || [] ).forEach( function ( item ) {
                                    if (
                                        item.type === 'data' &&
                                        item.data.source === 'Place of Origin'
                                    ) {
                                        var loc = item.data.value
                                            .replace( /<[^>]+>/g, '' )
                                            .trim();
                                        if ( loc ) { results[ page.title ] = loc; }
                                    }
                                } );
                            } );
                        } catch ( e ) { /* malformed infobox JSON — skip */ }
                    } );
                    onBatchDone();
                } )
                .fail( function () {
                    onBatchDone();
                } );
        } );
    }

    // ── Geocoding via Nominatim ────────────────────────────────────────────
    function geocodeOne( location, cb ) {
        window.jQuery.ajax( {
            url     : 'https://nominatim.openstreetmap.org/search',
            data    : {
                q      : location,
                format : 'json',
                limit  : 1,
                email  : NOMINATIM_EMAIL
            },
            headers : { 'Accept-Language': 'en' },
            success : function ( data ) {
                if ( data && data.length ) {
                    cb( {
                        lat : parseFloat( data[ 0 ].lat ),
                        lon : parseFloat( data[ 0 ].lon )
                    } );
                } else {
                    cb( null );
                }
            },
            error   : function () { cb( null ); }
        } );
    }

    function geocodeAll( artistLocations, progressCb, doneCb ) {
        try {
            var raw = localStorage.getItem( CACHE_KEY );
            if ( raw ) {
                var cache = JSON.parse( raw );
                if ( Date.now() - cache.ts < CACHE_TTL ) {
                    doneCb( cache.coords );
                    return;
                }
            }
        } catch ( e ) { /* ignore */ }

        var seen   = {};
        var unique = [];
        Object.keys( artistLocations ).forEach( function ( artist ) {
            var loc = artistLocations[ artist ];
            if ( !seen[ loc ] ) { seen[ loc ] = true; unique.push( loc ); }
        } );

        var coords  = {};
        var total   = unique.length;
        var current = 0;

        function next() {
            if ( current >= total ) {
                try {
                    localStorage.setItem( CACHE_KEY,
                        JSON.stringify( { ts: Date.now(), coords: coords } ) );
                } catch ( e ) { /* storage full */ }
                doneCb( coords );
                return;
            }

            var loc = unique[ current++ ];
            progressCb( current, total );

            geocodeOne( loc, function ( result ) {
                if ( result ) { coords[ loc ] = result; }
                setTimeout( next, 1100 );
            } );
        }

        next();
    }

    // ── Map rendering ──────────────────────────────────────────────────────
    function renderMap( container, artistLocations, coords ) {
        container.innerHTML     = '';
        container.style.cssText = 'width:100%;height:' + MAP_HEIGHT;

        var map = L.map( container ).setView( [ 25, 10 ], 2 );

        L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution : '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom     : 18
        } ).addTo( map );

        var byCoord = {};
        Object.keys( artistLocations ).forEach( function ( artist ) {
            var loc   = artistLocations[ artist ];
            var coord = coords[ loc ];
            if ( !coord ) { return; }

            var key = coord.lat.toFixed( 4 ) + ',' + coord.lon.toFixed( 4 );
            if ( !byCoord[ key ] ) {
                byCoord[ key ] = { lat: coord.lat, lon: coord.lon, artists: [] };
            }
            byCoord[ key ].artists.push( { title: artist, loc: loc } );
        } );

        Object.keys( byCoord ).forEach( function ( key ) {
            var entry = byCoord[ key ];
            var lines = entry.artists.map( function ( a ) {
                var href = mw.util.getUrl( a.title );
                return '<a href="' + href + '">' + mw.html.escape(a.title) + '</a>';
            } );
            var label = entry.artists.length === 1
                ? entry.artists[ 0 ].loc
                : entry.artists.length + ' artists';

            L.marker( [ entry.lat, entry.lon ] )
                .addTo( map )
                .bindPopup(
                    '<b>' + lines.join( '<br>' ) + '</b>' +
                    '<br><small style="color:#888">' + mw.html.escape(label) + '</small>'
                );
        } );

        var placed  = Object.keys( byCoord ).length;
        var total   = Object.keys( artistLocations ).length;
        var missing = Object.keys( artistLocations ).filter( function ( a ) {
            return !coords[ artistLocations[ a ] ];
        } );

        var note = document.createElement( 'p' );
        note.style.cssText = 'font-size:0.85em;color:#888;margin-top:4px';
        note.textContent   = placed + ' locations plotted from ' + total
            + ' artists with Place of Origin data.';
        if ( missing.length ) {
            note.textContent += ' ' + missing.length + ' could not be geocoded: '
                + missing.join( ', ' ) + '.';
        }
        container.parentNode.insertBefore( note, container.nextSibling );
    }

    // ── Entry point ────────────────────────────────────────────────────────
    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ], function () {
        window.jQuery( function () {
            var container = document.getElementById( 'artist-map' );
            if ( !container ) {
                container    = document.createElement( 'div' );
                container.id = 'artist-map';
                var content  = document.querySelector( '.mw-parser-output' )
                            || document.getElementById( 'mw-content-text' );
                if ( !content ) { return; }
                content.insertBefore( container, content.firstChild );
            }

            container.style.cssText = 'width:100%;height:' + MAP_HEIGHT
                + ';background:#1a1a1a;display:flex;align-items:center;'
                + 'justify-content:center;color:#888;font-size:0.9em;';
            container.textContent = 'Loading artist roster…';

            loadLeaflet( function () {
                getCategoryMembers( function ( titles ) {
                    container.textContent = 'Fetching infobox data for '
                        + titles.length + ' artists…';

                    getInboxLocations( titles, function ( artistLocations ) {
                        var locCount = Object.keys( artistLocations ).length;
                        container.textContent = 'Geocoding ' + locCount
                            + ' locations — first load only, cached 30 days…';

                        geocodeAll(
                            artistLocations,
                            function ( current, total ) {
                                container.textContent = 'Geocoding '
                                    + current + ' / ' + total + '…';
                            },
                            function ( coords ) {
                                renderMap( container, artistLocations, coords );
                            }
                        );
                    } );
                } );
            } );
        } );
    } );

}() );