/**
 * 09:05, August 27, 2014 (UTC)
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
                  '{{File Information\n' 
                + '|Origin = \n' 
                + '|Characters in image = \n'  
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
                elem = elem || '<textarea style="resize:none; overflow:auto;" rows="2" cols="80" id="' + id + (required ? '" required="required' : '') + (title ? '" title="' + title : '') + '"></textarea>';
                return '<tr>\n'
                     + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + ':</label></td>\n'
                     + '<td class="mw-input">' + elem + '</td>\n'
                     + '</tr>\n';
            }
            customRows += fromTemplate('Origin', 'sourceImage', true, '[REQUIRED] Please add the source of the image here. Add here: Cast Images, Season the image is from, out of universe? etc.');
            customRows += fromTemplate('Characters in image', 'characterBox', false, '[IF ANY] List of Characters separated by comma.');
            customRows += fromTemplate('Other Information', 'otherinfoBox', false, '[OPTIONAL] Any other information about the image.');

            // To real DOM
            $customRows = $(customRows);
            $description.closest('tr').hide().after($customRows);
            $customRows.find("textarea").tooltip({trigger: 'focus'});
            
            function verifySummary() {
                if (!$('#wpLicense').val()) {
                    window.alert('Licensing must be complete.');
                    return false;
                }

                if (!$.trim($customRows.find('#sourceImage').val()).length) {
                    window.alert('Please enter a proper source for your image.');
                    return false;
                }

                var strBuilder = template;
                strBuilder += '{{File Information\n';
                strBuilder += '|Origin = ' + $.trim($customRows.find('#sourceImage').val()) + '\n';
                strBuilder += '|Characters in image = ' + $.trim($customRows.find('#characterBox').val()).replace(/(\[\[)|(\]\])/g, '').replace(/\sand\s/g, ', ') + '\n';
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
                    $customRows.find('#sourceImage'), $customRows.find('#sourceBox')
                );
            });
        });
    }
}
// </source>