mw.hook('wikipage.content').add(function ($content) {
    'use strict';

    // Only user pages
    if (mw.config.get('wgNamespaceNumber') !== 2) {
        return;
    }

    // Only run if Calc Group marker exists inside page content
    if (!$content.find('.calc-group-marker').length) {
        return;
    }

    // Avoid duplicate badges (important for VE / AJAX reloads)
    if ($('#firstHeading .calc-group-badge').length) {
        return;
    }

    var $heading = $('#firstHeading');
    if (!$heading.length) {
        return;
    }

    // Create badge
    var $badge = $('<span>', {
        class: 'calc-group-badge',
        text: 'Calc Group',
        title: 'Calculation Group Member'
    });

    $heading.append($badge);
});