/**
 * LeftPaneSwitch
 *
 * Author : Od1n
 */

// <nowiki>

mw.loader.using('mediawiki.cookie', function () {

    jQuery(function ($) {
        'use strict';


        mw.loader.addStyleTag(
            '#left-pane-switch {padding:6px; background:#E4E4E4; position:absolute; left:10em; cursor:pointer; z-index:100}'
            + '@media (min-width:982px) { #left-pane-switch {left:11em} }'
            + '.left-pane-closed #mw-panel {display:none}'
            + '.left-pane-closed #content {margin-left:0}'
            + '.left-pane-closed #p-personal ul {padding-left:0}'
            + '.left-pane-closed #left-navigation {margin-left:0}'
            + '.left-pane-closed #left-pane-switch {left:0}'
            + '.left-pane-closed #footer {margin-left:0}'
        );

        var pane_switch = $('<div id="left-pane-switch">‹‹</div>');
        var pane_closed = false;

        function closePane() {
            $(document.body).addClass('left-pane-closed');
            pane_switch.text('››');
            pane_closed = true;
        }

        function openPane() {
            $(document.body).removeClass('left-pane-closed');
            pane_switch.text('‹‹');
            pane_closed = false;
        }

        pane_switch.click(function () {
            if (!pane_closed) {
                closePane();
                mw.cookie.set('LeftPane', '0', 86400 * 365);
            } else {
                openPane();
                mw.cookie.set('LeftPane', '1', 86400 * 365);
            }
        });

        if (mw.cookie.get('LeftPane') === '0') {
            closePane();
        }

        $('#mw-head').append(pane_switch);
    });
});

// </nowiki>