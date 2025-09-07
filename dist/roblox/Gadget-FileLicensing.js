/*
* FileLicensing
* Joritochip
*/
mw.loader.using('mediawiki.api', function (require) {
    if (!$('body').hasClass('page-Roblox_Wiki_Files_with_missing_license_information')) return;

    if (window.RWFileLicenseLoaded) return;
    window.RWFileLicenseLoaded = true;

    var defaultSelectText = '-- Select a license --';

    var api = new mw.Api();
    api.get({
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:Licensing templates',
        cmlimit: 'max'
    }).done(function (data) {
        var templates = data.query.categorymembers.map(function (x) { return x.title.substr(9); });
        var nondescriptiveFilenameBox = $('<input type="checkbox" class="nondescriptiveFilename"/><label for="nondescriptiveFilename"><small>Non-descriptive name</small></label>');
        var licenseSelect = $('<select class="licenseSelect" style="max-width: 160px;"><option disabled selected value>' + defaultSelectText + '</option></select>').append(templates.map(function (x) {
            return $('<option>').attr('value', x).text(x);
        }));
        var saveButton = $('<button type="button" disabled>✓</button>');
        var control = $('<div class="file-control" style="display: grid; grid-template-columns: 1fr min-content; align-items: center; border: 1px solid transparent; border-radius: 4px; padding: 2px;"></div>').append(
            $('<div>').append(nondescriptiveFilenameBox, licenseSelect),
            saveButton
        );
        nondescriptiveFilenameBox.change(function () {
            $(this).parents('.file-control').find('button').prop('disabled', false);
        });
        licenseSelect.change(function () {
            $(this).parents('.file-control').find('button').prop('disabled', false);
        });
        saveButton.click(function () {
            var elem = $(this);
            var control = elem.parent('.file-control');

            var nondescriptiveFilename = control.find('.nondescriptiveFilename').is(':checked');
            var license = control.find('.licenseSelect :selected').text();
            if (license == defaultSelectText) {
                license = undefined;
            }

            var file = elem.parents('.wikia-gallery-item').find('.thumbimage').attr('data-image-name') || elem.parents('.wikia-gallery-item').find('.thumbimage').attr('data-video-name');
            api.edit('File:' + file, function () {
                return {
                    text: (nondescriptiveFilename ? '{{Non-descriptive filename}}\n' : '') + (license ? '== Licensing ==\n{{' + license + '}}' : ''),
                    summary: 'Add file categorization templates'
                };
            }).then(function () {
                control.css('border', '1px solid var(--theme-success-color)');
                elem.prop('disabled', true);
            }).catch(function (err) {
                alert(err);
                control.css('border', '1px solid var(--theme-alert-color)');
            });
        });
        $('.wikia-gallery-item').append(control);
    });
});