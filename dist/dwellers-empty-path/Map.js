/**
 * Name:        Dweller's Empty Path map
 * Description: Loads a map of Dweller's Empty Path areas with a definition on
 *              a specified JSON page.
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 */
(function() {
    'use strict';
    var $map = $('#dep-map');
    if ($map.length === 0) {
        return;
    }
    function dataLoaded(data) {
        var json = JSON.parse(data.query.allmessages[0]['*']);
        var map = window.L.map('dep-map', {
            crs: window.L.CRS.Simple,
            minZoom: -5,
            maxZoom: 3
        });
        for (var number in json.maps) {
            window.L.imageOverlay(
                mw.util.getUrl('Special:Redirect/file/Map' + number.padStart(3, 0) + '.png'),
                json.maps[number]
            ).addTo(map);
        }
        map.fitBounds(json.bounds);
        json.lines.forEach(function(line) {
            window.L.polyline([json.points[line[0]], json.points[line[1]]])
                .addTo(map);
        });
        var events = window.L.layerGroup(json.popups.map(function(popup) {
            return window.L.marker([popup[0], popup[1]]).bindPopup(popup[2]);
        }));
        window.L.control.layers(null, {
            Events: events
        }).addTo(map);
    }
    function init() {
        new mw.Api().get({
            action: 'query',
            meta: 'allmessages',
            ammessages: 'custom-' + $map.attr('data-page') + '.json',
            uselang: 'content',
            maxage: 300,
            smaxage: 300
        }).then(dataLoaded);
    }
    mw.loader.load('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css', 'text/css');
    $.when(
        mw.loader.getScript('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'),
        mw.loader.using([
            'mediawiki.api',
            'mediawiki.util'
        ])
    ).then(init);
})();