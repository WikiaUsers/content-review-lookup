/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Komunikat o niewybraniu licencji do przesłanego pliku */
function emptyLicenseAlert(form) {
        var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
        if(window.emptyLicenseWarningDelivered) return true;
        if($('#wpLicense').val() == '') {
                alert(msg);
                window.emptyLicenseWarningDelivered = true
                return false
        }
        return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});