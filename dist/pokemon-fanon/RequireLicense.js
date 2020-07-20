(function() {
    if (mw.config.get('wgPageName') !== 'Special:Upload') {
        return;
    }

    var licenseSelect = document.getElementById('wpLicense');
    var uploadButton = document.querySelector('.mw-htmlform-submit');
    var uploadText = uploadButton.value;

    function onLicenseChange() {
        if (licenseSelect.value) {
            uploadButton.value = uploadText;
            uploadButton.disabled = undefined;
        } else {
            uploadButton.value = 'Please choose a license!';
            uploadButton.disabled = true;
        }
    }

    licenseSelect.addEventListener('change', onLicenseChange);

    onLicenseChange();
})();