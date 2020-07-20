//   Tratto da https://onepiece.fandom.com/it
// ===========================
//        Schema Tester
// ===========================
// Schema tester per Project:Schemi colore

$(function () {
    // Aggiunta input boxes
    if ( wgPageName === 'Project:Schemi_colore' ) {
        $('#SchemaTestBackground').replaceWith('<input type="text" name="TestBackground" value="#FFFFFF" default="#FFFFFF" class="TestBackground" size="30"> <button class="reset">Default</button>');
        $('#SchemaTestColor').replaceWith('<input type="text" name="TestColor" value="#333333" default="#333333" class="TestColor" size="30"> <button class="reset">Default</button>');
    }

    // Funzione
    if (wgPageName == 'Project:Schemi_colore') {
        $('.TestBackground').keyup(function () {
            $('.TestSchema').css('background', this.value);
        });
        $('.TestColor').keyup(function () {
            $('.TestSchema').css('color', this.value);
        });
        $('.reset').click(function () {
            var p = $(this).prev();
            p.val(p.attr('default')).keyup();
        });
    }
});