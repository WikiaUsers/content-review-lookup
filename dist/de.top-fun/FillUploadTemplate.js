// Lädt die [[Vorlage:Dateiinfo]] beim Hochladen direkt im Beschreibungsfeld.
// Dieses Script wird [[MediaWiki:Common.js/filluploadform.js]] eingebunden.

function setSpecialUploadTemplate() {
    $('#UploadPhotosWrapper h1').html("Datei hochladen");
    $('#UploadPhotosWrapper div.advanced').css("display", "none");
    $('label[for="wpDestFile"]').html("Zielname:");
    $('label[for="wpUploadDescription"]').html("Beschreibung/Quelle:");
    $('textarea[name="wpUploadDescription"]').css({'width':'594px','height':'130px'});
    $('textarea[name="wpUploadDescription"]').val("{\{Dateiinfo\n| Beschreibung = \n| Datum = \n| Autor = \n| Quelle = \n| Lizenz = \n}\}");
    $('#UploadPhotosWrapper div.options').css("display", "block");

}

$(document).ready( setSpecialUploadTemplate );