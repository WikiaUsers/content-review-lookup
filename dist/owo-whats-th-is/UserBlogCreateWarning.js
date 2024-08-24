/**
 * UserBlogCreateWarning
 * 
 * Muestra el aviso sobre la creaci�n de blogs
 *
 * @version 1.0.1
 * @author HumanoidPikachu <deathsoulasriel@gmail.com>
**/
 
/**Y aqu� comienza todo**/
if (wgCanonicalSpecialPageName == 'CreateBlogPage') {
    var userWelcomeCreateBlogBox = $.showCustomModal("�Advertencia!", '<p>Recuerda que los blogs que se usan aqu� son solo para avisar y solo pueden ser usados por el equipo Hispano de Fandom, continuar haciendo esto se le marcar� este blog para ser borrado y en breve un administrador ver� el blog para ser borrado, te invitamos a <a href="http://www.wikia.com/Special:CreateNewWiki?uselang=es">crear un wiki</a> para mas comodidad.</p>', {
    id: "userWelcomeCreateBlogBox",
    width: 550,
    buttons: [
    {
    id: "submit-not-show",
    defaultButton: false,
    message: "Anular",
    handler: function() {
    $('#userWelcomeCreateBlogBox').closeModal(); 
            window.location='http://comunidad.wikia.com';
        }
    },
    {
        id: "submit",
        defaultButton: true,
        message: "Tengo autorizaci�n y/o soy miembro del equipo",
        handler: function() {
            $('#userWelcomeCreateBlogBox').closeModal();
        }
    }
    ]
});
}