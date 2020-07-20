// ==========================================================================
// Floating A-Z
// Always on screen, dragabble A-Z nav element, that's constrained to always
// be below the page header.
//
// Author: Aspallar
//
// ** Please dont edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function ($) {
    /* global mw */
    'use strict';

    if (document.getElementById('mdw-az-nav') === null || $('#mdw-disabled-js').attr('data-floatingaz-1-0-0'))
        return;

    var aTozNav;
    var pageHeader;

    function keepBelowPageHeader() {
        var pageHeaderRect = pageHeader.getBoundingClientRect();
        if (aTozNav.offset().top < pageHeaderRect.bottom)
            aTozNav.css('top', pageHeaderRect.bottom + 'px');
    }

    function keepWithinWindow() {
        var r = aTozNav.get(0).getBoundingClientRect();
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        if (r.right > winWidth || r.bottom > winHeight) {
            var top = r.bottom > winHeight ? r.top - (r.bottom - winHeight) : r.top;
            var left = r.right > winWidth ? r.left - (r.right - winWidth) : r.left;
            aTozNav.css('top', top + 'px').css('left', left + 'px');
        }
        keepBelowPageHeader();
    }

    function setInitialPositionToRightOfFirstLink(event) {
        var target = $(event.target);
        var firstAnchorRect = document.getElementById('mdwa').getBoundingClientRect();
        target.css('top', Math.floor(firstAnchorRect.y) - target.outerHeight(true) + 'px')
            .css('left', Math.floor(firstAnchorRect.x) + 320 + 'px')
            .css('position', 'fixed');
    }

    function constrainToInsideWindowBelowPageHeader(event, ui) {
        var headerRect = pageHeader.getBoundingClientRect();
        var height = $(event.target).outerHeight(true);
        var top = Math.max(ui.position.top, headerRect.bottom);
        top = Math.min(top, window.innerHeight - height);
        top = Math.max(top, 0);
        ui.position.top = top;
    }

    function onStartDragRemoveBottom(event, ui) {
        // because of position:fixed if we don't do this the element's bottom 
        // will remain the same and we end up resizing the A-Z
        ui.helper.css('bottom', '');
    }

    function initialize() {

        aTozNav = $('#mdw-az-nav');
        pageHeader = document.getElementById('PageHeader');

        mw.loader.using('jquery.ui.draggable', function () {
            $(window).scroll(keepBelowPageHeader).resize(keepWithinWindow);
            aTozNav.draggable(
            {
                create: setInitialPositionToRightOfFirstLink,
                drag: constrainToInsideWindowBelowPageHeader,
                start: onStartDragRemoveBottom,
                cancel: 'a',
                scroll: false,
                containment: 'document'
            });
        });
    }

    $(document).ready(initialize);

}(jQuery));