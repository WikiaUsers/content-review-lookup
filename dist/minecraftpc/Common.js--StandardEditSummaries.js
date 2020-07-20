/* Any JavaScript here will be loaded for all users on every page load. */
 
/* <source lang="javascript"> */
 
/*jshint eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true, indent:4, white:true */
/*global mediaWiki */
 
/**
 * Standard Edit Summaries, Mathmagician version
 * 
 * - Idea taken from the version of the script most often attributed to
 * http://runescape.wikia.com/wiki/MediaWiki:Common.js/standardeditsummaries.js
 * Rewritten to make the script more conforming to MediaWiki 1.19+ standards
 * 
 * - Another version of standard edit summaries has recently become available at
 * http://dev.wikia.com/wiki/Standard_Edit_Summary
 *
 * - Key difference between my version and others: most other versions of
 * the script use an external page called 'Template:Stdsummaries'
 * My script does not use any such external page, instead, all of the options are
 * built directly into the script itself, in the optionsArray in the code below.
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
             * Inactive options (section titles) must begin with
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
 
            htmlString = '<select id="stdSummaries" tabindex="2"><option style="display:none;" selected>(Choose default summary)</option>';
 
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
            $(document.head).append('<style id="#stdSummariesStyle">#stdSummaries{width:282px}.editpage-sourcewidemode-on.mode-source #stdSummaries {position:relative;top:24px;right:16px;width:278px}</style>');
 
            // update summary when new dropdown option is selected
            $dropdown.change(function () {
                $summary.val($(this).val());
            });
 
            // insert dropdown into the document
            $summary.after($dropdown);
 
			// fix tab indexes
			$summary.attr('tabindex', '3');
			$('#wpMinoredit').attr('tabindex', '4');
			$('#wpSave').attr('tabindex', '5');
        }
 
        // add onload handler
        $(initStandardSummaries);
    }(jQuery));
}
 
/* </source> */