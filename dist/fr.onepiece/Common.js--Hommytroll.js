
/******************************************************************************
 * Auteur : Think D. Solucer                                                 **
 * Idée : Hommy <3<3                                                         **                                                           **               **
 * Licence : CopyWrong @CopyWisely                                           **
 *******************************************************************************/
console.log('mon_troll <3');
;(function($, mw) {
    function afficher_popup()
    {
        $.showCustomModal('Bon anniversaire', contenuHTML, {
            id: 'popup_msg_intro',
            width: 600,
            buttons: [{
                message: 'Fermer',
                handler: function() {
                    $('#popup_msg_intro').closeModal();
                }
            }]
        });
    }

    /*jshint multistr:true */
    contenuHTML    ='<div><p>"Un joyeux anniversaire de la part de tout le wiki <3"</p><p>Signé Croco</p></div>';

    // Début code
    if( wgUserName == "Méli-sama" && !$.cookie('Méli-sama02') )
    {
        afficher_popup();
        var date = new Date();
        var m = 500;
        date.setTime(date.getTime() + (m * 60 * 1000));
        $.cookie('Méli-sama02', "value", { expires: date });
    }
    // Fin code
}) (this.jQuery);