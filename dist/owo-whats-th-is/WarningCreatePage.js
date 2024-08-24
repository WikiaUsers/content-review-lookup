/**
 * WarningCreatePage
 * 
 * @version 1.0.0
 * @author HumanoidPikachu <deathsoulasriel@gmail.com>
**/

if (wgNamespaceNumber == '0')
    if (wgAction == 'edit') 
        if (wgArticleId == '0') {
            var userCreatePageWarningBox = $.showCustomModal("¡Advertencia!", '<p>Recuerda que las páginas de aquí no son para que expreses tus ideas, proyectos escolares, pensamientos, etc. Ten en cuenta que Comunidad Central es un punto de coordinación entre wikis hispanas. Si procede a hacer esto la página que usted cree será marcada para ser borrada. Si quieres hablar de un tema de tu interes te invitamos a <a href="http://www.wikia.com/Special:CreateNewWiki?uselang=es">crear un wiki</a> para mas comodidad.</p>', {
    id: "userCreatePageWarningBox",
    width: 600,
    buttons: [
    {
    id: "submit-not-show",
    defaultButton: false,
    message: "Anular",
    handler: function() {
    $('#userCreatePageWarningBox').closeModal(); 
            window.location='http://comunidad.wikia.com';
        }
    },
    {
        id: "submit",
        defaultButton: true,
        message: "Es una descripción de un wiki",
        handler: function() {
            $('#userCreatePageWarningBox').closeModal();
        }
    }
    ]
});
}