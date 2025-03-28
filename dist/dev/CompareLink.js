/**
 * Convert the "Compare selected versions" button to a link
 * (Based on [[wikipedia:User:Mattflaschen/Compare_link.js]])
 * @source: https://www.mediawiki.org/wiki/Snippets/Compare_link
 * @rev: 2-wikia5
 * @see: [[mw:bugzilla:16165]]
 *
 * Copyright 2006-2013 Matthew Flaschen ([[mw:User:Mattflaschen]]), [[mw:User:He7d3r]]
 *
 * In addition to the GFDL and CC-BY-SA:
 *
 * This function (compare link) is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This function is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * A copy of the GPL is available at https://www.gnu.org/licenses/gpl-2.0.txt .
 *
 * By modifying [[MediaWiki:CompareLink.js]]:
 * You agree to dual-license your contributions under both the
 * GFDL (https://en.wikipedia.org/wiki/WP:GFDL) and version 2 of the GPL
 * (https://www.gnu.org/licenses/gpl-2.0.txt) or any later version
 * of the GPL published by the FSF.
 *
 */

(function ($, mw) {
    'use strict';

    function fixCompare() {
        var $histForm = $('#mw-history-compare');
        var $buttons = $histForm.find('input.historysubmit');

        if (!$buttons.length) {
            // Buttons don't exist, so do nothing
            return;
        }

        var $compareLink = $('<a></a>', {
            'accesskey': $buttons.attr('accesskey'),
            'class': 'compare-link cdx-button cdx-button--fake-button cdx-button--fake-button--enabled',
            'role': 'button',
            'text': $buttons.val(),
            'title': $buttons.attr('title')
        });

        // button styles for MW earlier than v1.41-ish
        if ($buttons.hasClass('mw-ui-button')) {
            $compareLink.attr('class', 'compare-link mw-ui-button');
        }

        // hack/fix: fandom is setting its theme colours on the wrong class
        // upstream MW set these on :enabled, …fake-enabled, but fandom set these on the base class
        // this causes disabled+hover quirks, and is inconsistent with upstream who require enabled/disabled class
        if (mw.config.get('wgWikiaEnvironment') !== null) {
            $compareLink.removeClass('cdx-button--fake-button--enabled');
        }

        $buttons
            .after($compareLink)
            .remove();

        var updateCompare = function () {
            var $radio = $histForm.find('input[type=radio]:checked');
            var genLink = '?' + $.param({
                diff: $radio.eq(0).val(),
                oldid: $radio.eq(1).val()
            });
            $('.compare-link').attr('href', genLink);
        };
        updateCompare();
        $histForm.change(updateCompare);
    }

    if (mw.config.get('wgAction') === 'history') {
        $(fixCompare);
    }
}(jQuery, mediaWiki));