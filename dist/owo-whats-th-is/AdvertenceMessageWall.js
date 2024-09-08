/**
 * WarningOwnMessageWall
 * 
 * Muestra el aviso de para que se usan los muros de mensaje
 * 
 * 
 * @version 1.0.9
 * @author HumanoidPikachu <deathsoulasriel@gmail.com>
**/

/**Fijar bien de quien es este muro...**/
//Variable of the current username.
var unic_username = mw.config.get('wgUserName');

if (wgPageName == 'Muro:' + unic_username) {
    //Variable
    var selector_to_warning = document.getElementById('WallMessageBody');
    is_checked = "0";
    selector_to_warning.onclick=function(){
        if (is_checked !== "1") {
            var userWarningBox = $.showCustomModal("¡Espera!", '<p>Estas a punto de dejarte un mensaje propio en tu propio muro de mensajes, los muros que utilizamos aquí <b>no son como los muros que emplea Facebook</b>; no son para que publiques tus ideas, pensamientos u proyectos escolares, sino para que otros usuarios te dejen mensajes y tú los recibas mediante notificaciones, facilitando así la comunicación y que el tema no se pierda, de manera que no se trata de un medio de divulgación, sino un medio de comunicación. Es mejor que <a href="http://www.wikia.com/Special:CreateNewWiki?uselang=es">crees una comunidad</a> o que <a href="http://comunidad.wikia.com/Lista_de_comunidades">busques una ya creada de tu interés</a>. Por favor, no dejes tus mensajes en tu propio muro.</p>', {
                id: "userWarningBox",
                width: 600,
                buttons: [
                {
                    
                    id: "submit-not-show",
                    defaultButton: false,
                    message: "Anular",
                    handler: function() {
                        $('#userWarningBox').closeModal(); 
                        window.location='http://comunidad.wikia.com';
                    }
                },
            {
                    id: "submit",
                    defaultButton: true,
                    message: "Ok.",
                    handler: function() {
                        is_checked = "1";
                        $('#userWarningBox').closeModal();
                    }
            }
                ]
            });
        }
    };
}