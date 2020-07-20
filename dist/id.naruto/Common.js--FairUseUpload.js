if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
    jQuery(function ($) {
        'use strict';
        var $desc = $('#wpUploadDescription');
        if ($desc.val()) {
            return; // If not empty then don't do anything (i.e. error message confirm page)
        } 
        $desc.val(
                  '{{Alasan Penggunaan Adil\n' 
                + '|Deskripsi = \n' 
                + '|Sumber = \n' 
                + '|Tujuan = \n' 
                + '|Bagian = \n' 
                + '|Pengganti = \n' 
                + '|Resolusi = \n' 
                + '|Informasi lain = \n' + '}}'
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
            customRows += fromTemplate('Deskripsi', 'descriptionBox', true, '[DIBUTUHKAN] Deskripsikan apa yang terjadi dan mengapa hal itu/ini penting.');
            customRows += fromTemplate('Sumber', 'sourceBox', true, '[DIBUTUHKAN] Darimana ini berasal, cantumkan dengan nomor episode/bab gambar bersangkutan.');
            customRows += fromTemplate('Tujuan', 'purposeBox', false, '[DIANJURKAN] Tujuan dari gambar ini.');
            customRows += fromTemplate('Bagian', 'portionBox', false, '[DIANJURKAN] Bagian hak cipta yang digunakan.');
            customRows += fromTemplate('Pengganti', 'replaceBox', false, '[DIANJURKAN] Apakah gambar bisa diganti?');
            customRows += fromTemplate('Resolusi', 'resolutionBox', false, '[DIANJURKAN] Resolusi gambar.');
            customRows += fromTemplate('Informasi lain', 'otherinfoBox', false, '[DIANJURKAN] Informasi lain tentang gambar ini.');

            // To real DOM
            $customRows = $(customRows);
            $description.closest('tr').hide().after($customRows);
            $customRows.find("textarea").tooltip({trigger: 'focus'});
            
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
                    window.alert('Please enter the source of your image (exact chapter or episode number).');
                    return false;
                }

                var template = '',
                    resolution = $.trim($customRows.find('#resolutionBox').val());
                if (/1080/i.test(resolution)) {
                    template = '{{1080p upload}}\n';
                } else if (/720/i.test(resolution)) {
                    template = '{{720p upload}}\n';
                } else if (/2k/i.test(resolution)) {
                    template = '{{UHD upload}}\n';
                }

                var strBuilder = template;
                strBuilder += '{{Alasan Penggunaan Adil\n';
                strBuilder += '|Deskripsi = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                strBuilder += '|Sumber = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                strBuilder += '|Tujuan = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                strBuilder += '|Bagian = ' + $.trim($customRows.find('#portionBox').val()) + '\n';
                strBuilder += '|Pengganti = ' + $.trim($customRows.find('#replaceBox').val()) + '\n';
                strBuilder += '|Resolusi = ' + resolution + '\n';
                strBuilder += '|Informasi lain = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
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