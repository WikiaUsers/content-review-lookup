if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    var setupCustomUploadForm = function () {
        /* Hide existing Summary box */
        $('tr.mw-htmlform-field-HTMLTextAreaField').hide();

        /* Bind submit button to checkUpload function */
        $('#mw-upload-form').submit(checkUpload);

        /* Disable submit button until a license is selected */
        checkLicense();

        /* Remove license preview */
        $('#mw-license-preview').remove();

        /* Minor licensing label tweak (+semicolon for label consistency) */
        $('.mw-htmlform-field-Licenses label').text('Licensing:');

        /* Declare custom table row entries */
        var trFileOwner = '<tr><td class="mw-label"><label for="cufFileOwner">Creator/Owner:</label></td><td class="mw-input"><form id="cufFileOwner"><input type="radio" name="cufFileOwner" id="cufFileOwnerRadioKjpsie" value="KJPSIE">&nbsp;<span class="explain" title="Kojima Productions and/or Sony Interactive Entertainment">KJPSIE</span>&nbsp;<input type="radio" class="cuf-radio-input-field" name="cufFileOwner">&nbsp;<input id="cufFileOwnerInputField" size="30" disabled></form></td></tr>';
        var trFileSrc = '<tr><td class="mw-label"><label for="cufFileSrc">Source:</label></td><td class="mw-input"><form id="cufFileSrc"><input type="radio" name="cufFileSrc" id="cufFileSrcDs" value="DS">&nbsp;<i>Death Stranding</i>&nbsp;<input type="radio" class="cuf-radio-input-field" name="cufFileSrc">&nbsp;<input id="cufFileSrcInputField" size="30" disabled></form></td></tr>';
        var trFileTypes = '<tr><td class="mw-label"><label for="cufFileTypes">File type(s):</label></td><td class="mw-input"><form id="cufFileTypes"><input type="radio" name="cufFileTypes" value="artwork">&nbsp;Artwork&nbsp;<input type="radio" name="cufFileTypes" value="logo">&nbsp;Logo&nbsp;<input type="radio" name="cufFileTypes" value="merchandise">&nbsp;Merchandise&nbsp;<input type="radio" name="cufFileTypes" value="photo">&nbsp;Photo&nbsp;<input type="radio" name="cufFileTypes" value="true">&nbsp;Render&nbsp;<br><input type="radio" name="cufFileTypes" value="screenshot">&nbsp;Screenshot&nbsp;<input type="radio" name="cufFileTypes" value="symbol">&nbsp;Symbol&nbsp;<input type="radio" name="cufFileTypes" value="wiki">&nbsp;<span class="explain" title="For images used primarily outside of the mainspace">Wiki</span>&nbsp;</form></td></tr>';
        var trFileSubjs = '<tr><td class="mw-label"><label for="cufFileSubjs">Subjects featured:</label></td><td class="mw-input"><input id="cufFileSubjs" size="60" placeholder="Characters, places, concepts, objects, etc., featured in file"></td></tr>';

        /* Add new required table rows */
        var cufNewTrs =
            trFileOwner +
            trFileSrc +
            trFileTypes +
            trFileSubjs;

        if (window.location.search.indexOf('wpForReUpload=1') === -1) {
            //$($.parseHTML(cufNewTrs)).insertAfter('.mw-htmlform-field-Licenses');
        } else {
            var trFileLicense = '';
        }

        var $tbody = $('#mw-htmlform-description').children('tbody').eq(0);
        $tbody.append(trFileOwner);
        $tbody.append(trFileSrc);
        $tbody.append(trFileTypes);
        $tbody.append(trFileSubjs);

        $('.mw-label').css({
            'width': '150px'
        });
        $('#wpLicense').css({
            'width': '394px'
        });
        $('input[name="cufFileOwner"], input[name="cufFileSrc"]').click(function () {
            var $this = $(this);
            var $radioInputField = $this.closest('form').children('.cuf-radio-input-field');

            if ($radioInputField.is(':checked')) {
                $radioInputField.next().prop('disabled', false);
            } else {
                $radioInputField.next().prop('disabled', true);
            }
        });
    };

    var checkUpload = function () {
        // If filename is found to be funky, prevent upload
        if (!checkFilename()) return false;

        var $wpLicense = $('#wpLicense');

        var fileLicense = $('#wpLicense').val();
        var fileOwner = $('#cufFileOwnerInputField').is(':checked') ? $('#cufFileOwnerInputField').val() : $('#cufFileOwnerRadioKjpsie').val();
        var fileSrc = $('#cufFileSrcInputField').is(':checked') ? $('#cufFileSrcInputField').val() : $('#cufFileSrcDs').val();

        var $fileTypesInput = $('input[name=cufFileTypes]:checked');
        var fileTypes = $fileTypesInput.length === 0 ? '' : $fileTypesInput
            .map(function () {
                return $(this).val();
            })
            .get()
            .join(', ');

        var fileSubjs = $('#cufFileSubjs').val();
        var fileDetails = getFileDetails();

        var tmplFileInfo =
            '{{Fileinfo\n' +
            '| license    = ' + fileLicense + '\n' +
            '| owner      = ' + fileOwner + '\n' +
            '| source     = ' + fileSrc + '\n' +
            '| file_types = ' + fileTypes + '\n' +
            '| resolution = ' + fileDetails.resWidth + '×' + fileDetails.resHeight + '\n' +
            '| is big     = ' + fileDetails.isBig + '\n' +
            '| subjects   = ' + fileSubjs + '\n' +
            '}}';

        $('#wpUploadDescription').val(tmplFileInfo);

        $wpLicense.prop('selectedIndex', 0);

        return true;
    };

    var checkReupload = function () {
        // If filename is found to be funky, prevent upload
        if (!checkFilename()) return false;

        var $wpLicense = $('#wpLicense');

        /* Check if license has been changed */
        if ($wpLicense.val() !== '') {
            $('#wpUploadDescription').val(
                $('#wpUploadDescription').val().replace('| license    = ', '| license    = ' + $wpLicense.val())
            );

            $wpLicense.prop('selectedIndex', 0);
        }
        return true;
    };

    var checkFilename = function () {
        var filename = $('#wpDestFile').val();

        /* Check for duplicated or capitalized file extensions */
        if (filename.match(/(JPG|JPEG|PNG|GIF|SVG|jpg.jpg|jpeg.jpeg|png.png|gif.gif|svg.svg)$/)) {
            alert('Please do not use capitalized or duplicated file extensions in the filename.');
            return false;
        }

        /* Check for annoying characters */
        if (filename.match(/(\(|\)|!|\?|,|\+|\*)/)) {
            alert('Please do not use parentheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
            return false;
        }

        return true;
    };

    var checkLicense = function () {
        var $license = $('#wpLicense');
        var $btnSubmit = $('input.mw-htmlform-submit');

        $license.change(function () {
            if ($(this).val()) {
                $btnSubmit.prop('disabled', false);
            } else {
                $btnSubmit.prop('disabled', true);
            }
        });

        if (!$license.val()) {
            $btnSubmit.prop('disabled', true);
        }

        return true;
    };

    var getFileDetails = function () {
        var fileThumbInfo = $('#mw-upload-thumbnail .fileinfo').text().split(/\s×\s|\s|,\s/);
        var fileIsBig = fileThumbInfo[3] === 'MB' ? 'yes' : 'no';

        var fileDetails = {
            resWidth: fileThumbInfo[0],
            resHeight: fileThumbInfo[1],
            isBig: fileIsBig
        };

        return fileDetails;
    };

    setupCustomUploadForm();
}