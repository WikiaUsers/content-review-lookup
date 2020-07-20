/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
/*Script issu du wiki Harry Potter */
/* Modifier page Téléversement */
$(function() {
	if (wgPageName != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("==Description==\r\n{{Fichier\r\n|Description=\r\n|Date=\r\n|Auteur=\r\n|Source=\r\n|Licence=\r\n|Et plus=\r\n}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">');
    $('#button-italic').click(function() {
        richEditor("\'\'", "\'\'");
    });
    $('#button-bold').click(function() {
        richEditor("\'\'\'", "\'\'\'");
    });
    $('#button-link').click(function() {
        richEditor("[[", "]]");
    });
 
    function richEditor(primier, segond) {
        var textarea = document.getElementById("wpUploadDescription");
        if ('selectionStart' in textarea) {
            if (textarea.selectionStart != textarea.selectionEnd) {
                var newText = textarea.value.substring (0, textarea.selectionStart) + 
                    primier + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + segond +
                    textarea.value.substring (textarea.selectionEnd);
                textarea.value = newText;
            }
        }
        else {
            var textRange = document.selection.createRange ();
            var rangeParent = textRange.parentElement ();
            if (rangeParent === textarea) {
                textRange.text = primier + textRange.text + segond;
            }
        }
    }
});

/* WAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};