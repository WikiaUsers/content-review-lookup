/**
 * 17:15, July 2, 2017 (UTC)
 * <source lang = "JavaScript">
 * http://naruto.wikia.com/wiki/MediaWiki:Common.js/FairUseUpload.js
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
                  '{{Fair use rationale\n'
                + '|Description       = \n'
                + '|Source            = \n'
                + '|Purpose           = \n'
                + '|Resolution        = \n'
                + '|Other Information = \n' + '}}'
        );
    });
}

/**
 * Start upload form customization
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
                elem = elem || '<textarea style="resize:none; overflow:auto;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                return '<tr>\n'
                     + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + ':</label></td>\n'
                     + '<td class="mw-input">' + elem + '</td>\n'
                     + '</tr>\n';
            }
            customRows += fromTemplate('Description', 'descriptionBox', false, '[OPTIONAL] Description of the image.');
            customRows += fromTemplate('Source', 'sourceBox', false, '[OPTIONAL] Source of the image (preferably the corresponding episode, chapter, or book)');
            customRows += fromTemplate('Purpose', 'purposeBox', false, '[OPTIONAL] Purpose of the image.');
            customRows += fromTemplate('Resolution', 'resolutionBox', false, '[OPTIONAL] Resolution of the image.');
            customRows += fromTemplate('Other Information', 'otherinfoBox', false, '[OPTIONAL] Any other information about the image.');

            // To real DOM
            $customRows = $(customRows);
            $description.closest('tr').hide().after($customRows);
            $customRows.find("textarea").tooltip({trigger: 'focus'});
            
            function verifySummary() {
                if (!$('#wpLicense').val()) {
                    $.showModal('Licensing Incomplete', 'Choose a proper license from the dropdown.');
                    return false;
                }

                /*if (!$.trim($customRows.find('#descriptionBox').val())) {
                    $.showModal('Description Incomplete', 'Please enter a proper description for your image. Describe what is happening and why is it important');
                    return false;
                }

                if (!$.trim($customRows.find('#sourceBox').val())) {
                    $.showModal('Source Incomplete', 'Please enter the source of your image (exact chapter or episode number).');
                    return false;
                } else if (/google/i.test($customRows.find('#sourceBox').val())) {
                    $.showModal('Improper Source', 'Google is not a valid source for images. Please enter the exact chapter or episode number from which the image was taken.');
                    $customRows.find('#sourceBox').val('');
                    return false;
                }
                
                var otherInfo = '';
                if (!$.trim($customRows.find('#otherinfoBox').val())) {
                    otherInfo = 'Copyrighted by Rumiko Takahashi and Shogakukan';
                }*/

                var strBuilder = '{{Fair use rationale\n';
                strBuilder += '|Description = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                strBuilder += '|Source = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                strBuilder += '|Purpose = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                strBuilder += '|Resolution = ' + $.trim($customRows.find('#resolutionBox').val()) + '\n';
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