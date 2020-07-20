/**
 * 18:41, July 24, 2014 (UTC)
 * <source lang = "JavaScript">
 * Source: http://naruto.wikia.com/wiki/MediaWiki:Common.js/FairUseUpload.js
 * Builds a form for easy uploading of images
 * and to ensure proper rationale and licensing
 * @author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
 * @License: CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
*/
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
    jQuery(function ($) {
        'use strict';
        var $desc = $('#wpUploadDescription');
        if ($desc.val()) {
            return; // If not empty then don't do anything (i.e. error message confirm page)
        } 
        $desc.val(
                  '{{File Information\n' 
                + '|Description = \n' 
                + '|Source = \n' 
                + '|Modification = \n'
                + '|Purpose = \n'
                + '|Replaceability = \n' 
                + '|Resolution = \n' 
                + '|Other Information = \n' + '}}'
        );
    });
}

/**
 * Start upload form customisations
 */

if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload')) {
        jQuery(function ($) {
            'use strict';
            var $description = $('#wpUploadDescription'),
                customRows = '',
                $customRows;

            if ($description.val()) {
                return; // error message confirm page
            }

            function fromTemplate(name, id, required, title, elem) {
                elem = elem || '<textarea style="resize:none;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                return '<tr>\n'
                     + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + ':</label></td>\n'
                     + '<td class="mw-input">' + elem + '</td>\n'
                     + '</tr>\n';
            }
            customRows += fromTemplate('Description', 'descriptionBox', true, '[REQUIRED] Describe what is happening and why it\'s important.');
            customRows += fromTemplate('Source', 'sourceBox', true, '[REQUIRED] What game is this from?');
            customRows += fromTemplate('Modification', 'modificationBox', true, '[REQUIRED] Specify the FULL name of the modification depicted.');
            customRows += fromTemplate('Purpose', 'purposeBox', false, '[OPTIONAL] Purpose of this image.');
            customRows += fromTemplate('Replaceable?', 'replaceBox', false, '[OPTIONAL] Is the image replaceable?');
            customRows += fromTemplate('Resolution', 'resolutionBox', false, '[OPTIONAL] Resolution of the image.');
            customRows += fromTemplate('Other Information', 'otherinfoBox', false, '[OPTIONAL] Any other information about the image.');

            // To real DOM
            $customRows = $(customRows);
            $description.closest('tr').hide().after($customRows);
            $("textarea").tooltip({trigger: 'focus'});
            
            function verifySummary() {
                if (!$('#wpLicense').val()) {
                    window.alert('Licensing must be complete.');
                    return false;
                }

                if (!$.trim($customRows.find('#descriptionBox').val()).length) {
                    window.alert('Please enter a proper description for your image.');
                    return false;
                }

                if (!$.trim($customRows.find('#sourceBox').val()).length) {
                    window.alert('Please enter the source of your image (exact game it was taken from).');
                    return false;
                }

                if (!$.trim($customRows.find('#modificationBox').val()).length) {
                    window.alert('Please enter the modification being depicted in this image.');
                    return false;
                }

                var template = '',
                    resolution = $.trim($customRows.find('#resolutionBox').val());
                if (/1080p/i.test(resolution)) {
                    template = '{{1080p upload}}\n';
                } else if (/720p/i.test(resolution)) {
                    template = '{{720p upload}}\n';
                }

                var strBuilder = template;
                strBuilder += '{{File Information\n';
                strBuilder += '|Description = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                strBuilder += '|Source = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                strBuilder += '|Modification = [[' + $.trim($customRows.find('#modificationBox').val()) + ']]\n';
                strBuilder += '|Purpose = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                strBuilder += '|Replaceability = ' + $.trim($customRows.find('#replaceBox').val()) + '\n';
                strBuilder += '|Resolution = ' + resolution + '\n';
                strBuilder += '|Other Information = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
                strBuilder += '}}';
                $description.val(strBuilder);
                return true;
            }

            // Bind submit to verify function
            $description.closest('form').submit(verifySummary);

            // Autocomplete links
            $.getScript(
                '/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Acamtest%3AMediaWiki%3ATextareaHelper.js%7Cu%3Adev%3AColors%2Fcode.js%7Cu%3Adev%3AMiniComplete%2Fcode.js&only=scripts', function () {
                dev.minicomplete.load(
                    $customRows.find('#descriptionBox'), $customRows.find('#sourceBox')
                );
            });
        });
    }
}
// </source>