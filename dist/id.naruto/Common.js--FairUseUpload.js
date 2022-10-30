/**
 * @author: UltimateSupreme (https://naruto.fandom.com/wiki/User:UltimateSupreme)
 * @author: Celdrøn (https://naruto.fandom.com/fr/wiki/User:Celdrøn)
 * @Translate to Bahasa Indonesia: Fate Kage (https://naruto.fandom.com/id/wiki/User:Fate Kage)
 * @License: CC-BY-SA - https://creativecommons.org/licenses/by-sa/3.0/
 */

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
window.setCookie = function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
window.getCookie = function(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};

if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	jQuery(function ($) {
		'use strict';
		var $desc = $('#wpUploadDescription');
		if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
		$desc.val('{\{Alasan Penggunaan Adil\n' 
                + '|Deskripsi				= \n' 
                + '|Sumber					= \n' 
                + '|Tujuan					= \n' 
                + '|Karakter dalam gambar	= \n'
                + '|Jutsu dalam gambar      = \n'
                + '|Bagian					= \n' 
                + '|Pengganti				= \n' 
                + '|Resolusi				= \n' 
                + '|Informasi lain			= \n' 
                + '}}'
        );
    });
}

/**
 * Start upload form customisations
 */

if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
        // Check if cookie has been set for form style. Overrides URL parameter if set.
    var formstyle = getCookie("uploadform");
    $("#uploadBasicLinkJS").show();
    $("#uploadTemplateNoJS").hide();

    mw.loader.using('mediawiki.util').then(function() {

        if (!mw.util.getParamValue('wpForReUpload')) {


            if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)) { // Add link to basic form
                $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://naruto.fandom.com/id/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Switch to basic form</a></div>'); // Stretch table to full width            
	            
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
                            + '<td class="mw-label"><label style= "cursor: help;" for="' + id + (title ? '" title="' + title : '') + '">' + name + '&nbsp;:</label></td>\n'
                            + '<td class="mw-input">' + elem + '</td>\n'
                            + '</tr>\n';
                    }
            customRows += fromTemplate('Deskripsi', 'descriptionBox', true, '[DIBUTUHKAN] Deskripsikan apa yang terjadi dan mengapa hal itu/ini penting.');
            customRows += fromTemplate('Sumber', 'sourceBox', true, '[DIBUTUHKAN] Darimana ini berasal, cantumkan dengan nomor episode/bab gambar bersangkutan.');
            customRows += fromTemplate('Karakter dalam gambar', 'characterBox', false, '[JIKA ADA] Daftar Karakter dipisahkan dengan koma.');
            customRows += fromTemplate('Jutsu dalam gambar', 'jutsuBox', false, '[JIKA ADA] Daftar Jutsu dipisahkan dengan koma.');
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
                            $.showModal('Lisensi Tidak Lengkap', 'Pilih lisensi yang tepat dari menu tarik-turun.');
                            return false;
                        }

                        if (!$.trim($customRows.find('#descriptionBox').val())) {
                            $.showModal('Deskripsi Tidak Lengkap', 'Harap masukkan deskripsi yang tepat untuk gambar Anda. Jelaskan apa yang terjadi dan mengapa hal itu penting.');
                            return false;
                        }

                        if (!$.trim($customRows.find('#sourceBox').val())) {
                            $.showModal('Sumber Tidak Lengkap', 'Silakan masukkan sumber gambar Anda (nomor bab atau episode yang tepat).');
                            return false;
                        } else if (/google/i.test($customRows.find('#sourceBox').val())) {
                            $.showModal('Sumber Tidak Benar', 'Google bukan sumber yang valid untuk gambar. Silakan masukkan nomor bab atau episode yang tepat dari mana gambar itu diambil.');
                            $customRows.find('#sourceBox').val('');
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
                strBuilder += '|Deskripsi               = ' + $.trim($customRows.find('#descriptionBox').val()) + '\n';
                strBuilder += '|Sumber                  = ' + $.trim($customRows.find('#sourceBox').val()) + '\n';
                strBuilder += '|Tujuan                  = ' + $.trim($customRows.find('#purposeBox').val()) + '\n';
                strBuilder += '|Karakter dalam gambar   = ' + $.trim($customRows.find('#characterBox').val()).replace(/\set\s/g, ', ') + '\n';
                strBuilder += '|Jutsu dalam gambar      = ' + $.trim($customRows.find('#jutsuBox').val()).replace(/\set\s/g, ', ') + '\n';
                strBuilder += '|Bagian                  = ' + $.trim($customRows.find('#portionBox').val()) + '\n';
                strBuilder += '|Pengganti               = ' + $.trim($customRows.find('#replaceBox').val()) + '\n';
                strBuilder += '|Resolusi                = ' + resolution + '\n';
                strBuilder += '|Informasi lain          = ' + $.trim($customRows.find('#otherinfoBox').val()) + '\n';
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
                    $customRows.find('#descriptionBox'), $customRows.find('#sourceBox'),$customRows.find('#characterBox'), $customRows.find('#jutsuBox')
                );
            });
        });
            } else { // Old style form just needs Information template in the summary box
                $('#wpUploadDescription').val('{\{Alasan Penggunaan Adil\n'
                                            + '|Deskripsi               = \n'
                                            + '|Sumber                  = \n'
                                            + '|Tujuan                  = \n'
                                            + '|Karakter dalam gambar   = \n'
                                            + '|Jutsu dalam gambar      = \n'
                                            + '|Bagian                  = \n'
                                            + '|Pengganti               = \n'
                                            + '|Resolusi                = \n'
                                            + '|Informasi lain          = \n'
                                            + '}}'
                ); // Add link to guided form
                $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="https://naruto.fandom.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Switch to the advanced form</a></div>');
            }
        }
    })
}
// </source>