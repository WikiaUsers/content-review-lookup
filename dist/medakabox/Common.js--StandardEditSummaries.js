/* <source lang="javascript"> */

/*jshint eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:4, white:true */
/*global mediaWiki */

/**
 * Standard edit summaries
 * - Idea taken from the version of the script most often attributed to
 * http://runescape.wikia.com/wiki/MediaWiki:Common.js/standardeditsummaries.js
 * - This version is a complete re-write by Mathmagician
 * to make the script more conforming to MediaWiki 1.19+ standards
 * - Template:Stdsummaries is no longer used, instead
 * the dropdown menu options are built into the script itself
 * This was done to eliminate AJAX and make the script more efficient.
 * - To change the standard summaries, please edit the optionsArray
 * variable below, following standard formatting.
 */
if (mediaWiki.config.get('wgAction') === 'edit') {
    (function ($) {
        "use strict";

        // builds dropdown menu when called
        function buildDropdown() {
            var optionsArray,
                htmlString,
                i,
                length,
                opt;

            /**
             * IMPORTANT NOTE:
             * This is the part of the script you edit if
             * you want to change the summaries on your wiki
             * Inactive options (titles) must begin with
             * a number and a period, like "2. Content"
             */
            optionsArray = [
                '1. Refactoring',
                '  Cleanup',
                '  Corrected spelling/grammar',
                '  Formatting',
                '  HTML tidying',
                '2. Content',
                '  Added information to article',
                '  Revised article content',
                '  Added/removed hyperlink(s)',
                '  Modified Update Info',
                '  Updated template(s)',
                '  Added/removed images',
                '  Added/removed video',
                '3. Removal/Reversion',
                '  Reverted vandalism',
                '  Removed outdated/redundant info',
                '4. Categories',
                '  Added categories',
                '  Removed categories',
                '  Modified categories'
            ];

            htmlString = '<select id="stdSummaries" style="width: 283px"><option>(browse standard summaries)</option>';

            for (i = 0, length = optionsArray.length; i < length; i++) {
                opt = optionsArray[i];
                if (opt.match(/\d\./)) {
                    htmlString += '<option disabled="disabled">' + opt + '</option>';
                } else {
                    htmlString += '<option>' + opt + '</option>';
                }
            }

            htmlString += '</select>';
            return htmlString;
        }

        // initialization
        function initStandardSummaries() {
            var $summary = $('#wpSummary'),
                $dropdown = $(buildDropdown());

            // safety check: remove dropdown if it already exists
            $('#stdSummaries, #stdSummariesStyle').remove();

            // insert style tag
            $(document.head).append('<style id="#stdSummariesStyle">.editpage-sourcewidemode-on #stdSummaries{position:relative;top:24px;right:16px}</style>');

            // update summary when new dropdown option is selected
            $dropdown.change(function () {
                $summary.val($(this).val());
            });

            // insert dropdown into the document
            $summary.after($dropdown);
        }

        // add onload handler
        $(initStandardSummaries);
    }(jQuery));
}

/* </source> */