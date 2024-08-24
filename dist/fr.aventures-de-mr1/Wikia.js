/* console.log('mini-aventure');
;(function($, mw) {
    function afficher_popup()
    {
        $.showCustomModal(titreHTML, contenuHTML, {
            id: 'popup_msg_intro',
            width: 600,
            buttons: [{
                message: 'Lire le chapitre',
                handler: function() {
                    $('#popup_msg_intro').closeModal();
                }
            }]
        });
    } */
 
    /*jshint multistr:true 
    titreHTML      = 'La vie aux Clans #1 : Un nouvel avenir pour Brew';
    contenuHTML    = '<div style="width:100%; background-color:black; height:400px; color:lime; font-size:200%; font-weight:bold;"><span style="font-size:110px;"><i>Dans l\'appartement de Sirigu...</i><br />Sirigu : C\'est bon, ils ont validé ta demande. Tu dois te présenter demain à six heures pétantes devant la bijouterie, près de la Tour Côtière Nationale à Kuchira. <br /> Brew : Je te rappelle que je connais pas le pays, il faudra que tu m\'accompagnes. <br /> Sirigu : Tu rêves !<br /><i>Le lendemain, Brew se rend en retard à son nouveau travail...</i><br />Byaka : C\' est le premier jour donc ton retard n\a pas d\'importance. Néanmoins, c\'est plus mon problème si tu ne sait pas faire ce travail, je te lègue mon ancienne bijouterie. Enfile ça.<br /><i>Elle lui jeta un uniforme et une clé, puis partit. L\'ancien pirate proche de Marco trouve la repentance dans une bijouterie, tandis que l\'ancienne rebelle ne fait patienter son avenir aux portes de l\'Assemblée de Gorh...</i></span></div>';
 
    // Début code
    $("#C44").click(function()
    {
        afficher_popup();
        var msg = $('#champsigfr').val();
        $('#buttonsigfr').click(function () {
jQuery('body .page-User:Franky003').append(msg);
    }); 
    });
    // Fin code
}) (this.jQuery); */


$('#C44').click(
    alert("ok");
);