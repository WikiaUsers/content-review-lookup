/* Importar el ChatToolBox */
 
importScriptPage('ChatToolbox/code.js', 'dev');

function inlineAlert(msg) {
    if (mainRoom.activeRoom === "main") {
        mainRoom.model.chats.add(new models.InlineAlert({
            text: msg
        }));
    } else {
        mainRoom.chats.privates[mainRoom.activeRoom].model.chats.add(new models.InlineAlert({
            text: msg
        }));
    }
    $('[name="message"]').val('').removeAttr('disabled').focus();
}

importArticles( {
    type: 'script',
    articles: [
        "u:dev:ChatOptions/code.js",
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
} );
 
 // PrivateMessageAlert script //
var blinkInterval = 1000; // Custom blink delay, 1000ms is default
 
/* Add Buttons
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }
});
*/
/******************************************************************************/
/******************************** EMOTICONES **********************************/
/******************************************************************************/
// KockaEmoticons help text change
window.kockaEmoticons = {
    help: 'Elige un emoticon haciendo clic en el. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Lista completa</a>.'
};
/******************************************************************************/
/*************************** FIN DE LOS EMOTICONES ****************************/
/******************************************************************************/
 
/* Clear chat
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Limpiar chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}*/
/* Day/Night Switch Feature 
function dayNightButton() {
    var dayText = 'Tema de d�a';
    var nightText = 'Tema de noche';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}
*/
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
/*
var chatTopic = 'Bienvenido a Wiki Bestiak.';
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 */
 
/*Removed hilites for now, needs to be moved to CSS*/
 
document.getElementsByTagName('body')[0].onload = function() {
    old = document.title;
    unread = 0;
 
    mainRoom.model.chats.bind("afteradd", function() {
        if(!document.hasFocus()){
            unread++;
            document.title = "(" + unread + ") " + old;
        }
    });
 
    window.onfocus = function() {
        document.title = old;
        unread = 0;
    };
};
/******************************************************************************/
/********* Reglas del chat, script escrito por Usuario:L Adamante.7 *********/
/******************************************************************************/
$(function(){
    window.kockaRules = {
        rules: [
            "No hacer flood.",
            "   Esto tambi�n se aplica en las siguientes acciones: Repetir un emotic�n cuatro veces o poner emoticones en cadena / mensaje m�s de cinco veces, escribir m�s de cinco mensajes / l�neas seguidos(as), escribir cinco letras / n�meros / car�cretes m�s de cinco vcees seguidas. Tambi�n se incluye el salir y entrar escesivamente al chat.",
            "Moderar el vocabulario.",
            "   Significa que no debes insultar a otro usuario, a menos que �l y t� sepan que no lo quieres ofender y el mensaje est� enviado de broma. Los insultos utilizados en un pa�s o celebridad no est�n prohibidos.",
            "       Puedes censurar tus palabras reemplazando las vocales por aster�scos, lo que no puedes hacer es reemplazar toda la palabra con signos, ya que es considerado como flood.",
            "No discutir sobre temas que puedan llevar a un desacuerdo y un debate que conclulla en peleas, como la pol�tica y la religi�n.",
            "Se proh�be decirle a otros usuarios nuevos palabras como 'noob', presumiendo o hacer cualquier tipo de acci�n que lo haga sentir 'inferior",
            "Evitar poner apodos ofensivos a otros usuarios.",
            "Respetar por sobretodas las cosas a la Administraci�n.",
            "No publicar spam.",
            "   A esto se le aplica poner enlaces a p�ginas que te ayuden a beneficiarte econ�micamente o que no est�n aprovadas con el permiso previo de un administrador (excepci�n: links hacia otras wikis o a Wikipedia o cualquier sitio Wikimedia, adem�s de las redes sociales e imagenes).",
            "Est� prohibido subir cualquier material (ya sea visual (fotos), audiovisual (v�deos) o simplemente audio (reproductores MP3 y alg�n archivo de sonido)) relacionado con el t�pico sexual o con contenidos ilegales.",
            "No compartir informaci�n personal con otros usuarios, en caso de hacerlo, no nos hacemos responsables puesto que se va a tomar como sabido el hecho de no hacer esto.",
            "Se permite hablar en otro idioma, pero no abuse de este (utilizar m�s de tres l�neas / mensajes con ese u cualquier otro idioma), ya que los usuarios podr�an no comprender lo que dice y puede resultar molesto.",
            "No se permite escribir m�s de tres palabras en may�scula por mensaje, si quiere expresar su mensaje como si estuviese gritando, ponga los signos de exclamaci�n (''�'' y ''!'')",
            "No env�e links a chats de otras wikis, ya que podr�amos molestar a el resto de usuarios que est�n en dicho chat.",
            "No de advertencias a los otros usuarios, si ve que un usuario rompe una regla, contactar a la administraci�n. Si el usuario sigue rompiendo las reglas, deja un mensaje en el muro de un moderador o administrador (solo en el caso de que ninguno est� presente en el chat) dejando link a su perfil y, si es posible, una foto que muestre que estaba rompiendo las reglas.",
            "(Para los moderadores del chat y administradores): No abusar de su poder expulsando o baneando a un usuario sin un motivo que sea comprendible y se afirme ser real (con capturas, a pesar de que pueden ser f�cilmente editadas).",
        ]
    };
 
//===========================================================================///
//                           FIN DE LA CONFIGURACI�N                            //
//============================================================================//
mw.util.addCSS("#kockaRulesModalList{list-style-type:square;margin-left:15px}.kockaRulesButton{float:right}#kockaRulesModalMain{height:400px;overflow-y:auto;}");
	var kockaRules = window.kockaRules || {};
	kockaRules.vocab = kockaRules.vocab || {};
	var button = document.createElement("button");
	button.innerHTML = kockaRules.vocab.rules || "Reglas";
	button.className = "kockaRulesButton";
	button.onclick = function()
	{
		$.showModal(kockaRules.vocab.rules || "Reglas", "<div id='kockaRulesModalMain'>",
		{
            id: "kockaRulesModal",
            width: 500,
            buttons: [{
                id: "kockaRulesClose",
                defaultButton: true,
                message: kockaRules.vocab.close || "Cerrar",
                handler: function(){ $("#kockaRulesModal").closeModal(); }
            }]
        });
		$("#kockaRulesModalMain").append("<ul id='kockaRulesModalList'></ul>");
		kockaRules.rules.forEach(function(el){ $("#kockaRulesModalList").append("<li id='kockaRulesModalListItem'>" + el + "</li>"); }, this);
	};
$('.public.wordmark').first().append(button);
});