function emptyLicenseAlert(form) {
    var msg = 'Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane, a edytorzy którzy wkleili owy plik - blokowani.';
    if (window.emptyLicenseWarningDelivered) return true;
    if ($('#wpLicense').val() === '') {
        alert(msg);
        window.emptyLicenseWarningDelivered = true;
        return false;
    }
    return true;
}
$('#mw-upload-form').submit(function(e) {
    return emptyLicenseAlert(this);
});

// INACTIVE USER
InactiveUsers = {
    text: 'nieaktywny'
};

$(function () {
    $('#WikiaRail .loading').after('<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDiablowiki&tabs&width=295&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId" width="295" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>');
});