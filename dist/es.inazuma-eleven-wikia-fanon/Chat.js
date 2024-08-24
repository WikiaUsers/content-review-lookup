importArticles({
    type: 'script',
    articles: [
        'MediaWiki:ChatOptions.js',
        'MediaWiki:Emoticons/code.js',
        /*'MediaWiki:BotonEnviar.js',*/
        'MediaWiki:Chat.js/WordFilter.js',
 
        'u:dev:!mods/code.js',
        'u:dev:AjaxEmoticons/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatDelay/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:ChatTimestamps/code.js'
    ]
});
 
// Chat Delay - CONFIGURACIÓN
window.dev = window.dev || {};
window.dev.chatdelay = { max: 3 };
 
 // PrivateMessageAlert script //
var blinkInterval = 1000; // Custom blink delay, 1000ms is default
 
/* Add Buttons */
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } /* else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }*/
});
 
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
 
/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Limpiar chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
 
/* Day/Night Switch Feature 
function dayNightButton() {
    var dayText = 'Tema de día';
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
var chatTopic = 'Bienvenido a la Wiki Monster Legends.';
 
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
/********* Reglas del chat, script escrito por Usuario:KockaAdmiralac *********/
/******************************************************************************/
$(function(){
    window.kockaRules = {
        rules: [
            "No hacer flood.",
            
            "Moderar el vocabulario.",
            
            "No discutir sobre temas que puedan llevar a un desacuerdo y un debate que conclulla en peleas, como la política y la religión.",
            

            "No abusar del botón de AFK, puede ser incómodo para los demás usuarios.",
            "
            "En la presencia del bot, no abusar de los comandos (puedes usar como máximo 3 comandos en menos de 5 minutos).",
            
            "Puedes leer todas las reglas <a href='http://bit.ly/1UWPGHf'>aquí</a>."
        ]
    };
 
//===========================================================================///
//                           FIN DE LA CONFIGURACIÓN                            //
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
 
/******************************************************************************/
/********************** Activar / desactivar el Side Bar **********************/
/******************************************************************************
$('.public.wordmark').first().append("<button class='kockaHideRailButton' style='float:right' onclick='$(\"#Rail\").toggle();var toggleWidth = ($(window).width() - ($(\".Chat\").offset().left+$(\".Chat\").outerWidth())) > 150 ? \"0px\" : \"150px\";$(\".Chat\").css({right:toggleWidth});'>Mostrar columna</button>"); */

/*Créditos a Monster Legend Wiki*/