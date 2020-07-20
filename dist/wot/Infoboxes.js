/**
 * @name            Infoboxes
 * @version         v1.2
 * @author          TheGoldenPatrik1
 * @description     Fixes page-specific styling for Portable Infoboxes.
 * @questions       <https://wot.fandom.com/wiki/User:TheGoldenPatrik1>
 */
require([
    'wikia.window',
    'jquery',
    'mw'
], function (window, $, mw) {
    var $infobox,
        $elements;
    function get (type, rule) {
        var info = document.getElementById('infobox-coder-' + type).style[rule];
        if (info) {
            $elements[type].css(rule, info);
        }
    }
    function init () {
        get('border', 'borderColor');
        get('header', 'backgroundColor');
        get('header', 'color');
        get('title', 'backgroundColor');
        get('title', 'color');
    }
    function preload () {
        $infobox = $('.portable-infobox');
        $elements = {
            border: $('.portable-infobox, .portable-infobox .pi-border-color'),
            header: $infobox.find('.pi-header, .pi-navigation'),
            title: $infobox.find('.pi-image, .pi-title'),
        };
        if (
            window.WOTInfoboxesLoaded ||
            $infobox.length === 0 ||
            $('#infobox-coder-title').length === 0
        ) {
            return;
        }
        window.WOTInfoboxesLoaded = true;
        init();
    }
    mw.hook('wikipage.content').add(preload);
});