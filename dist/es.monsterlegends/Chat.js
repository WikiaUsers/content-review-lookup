importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/es/code.js',
        'MediaWiki:Chat.js/!mods.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:ChatBlockButton/code.3.js',
        'u:dev:IsTyping/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js'
    ]
});

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
/*
$(function(){
    window.kockaRules = {
        rules: [
            "No hacer flood (no repetir un carácter más de 10 veces, o hacer más de 10 renglones con mensajes cortos).",
            "Moderar el vocabulario (no insultar o intimidar a otro usuario, a menos que no sea en serio y ámbos lo sepan).",
            "No hacer spam (enviar enlaces sospechosos o acortadores de URL que dan dinero).",
            "No subir contenido pornográfico o gore a la wiki.",
            "No abusar del botón de AFK, puede ser incómodo para los demás usuarios.",
            "No compartir información personal con otros usuarios.",
            "En la presencia del bot, no abusar de los comandos (puedes usar como máximo 3 comandos en menos de 1 minuto).",
            "No envíe links a chats de otras wikis, ya que podríamos molestar a el resto de usuarios que estén en dicho chat, a menos que moderadores en esa wiki lo sepan.",
            "Solo moderadores y administradores pueden dar advertencia. Si no, use !mods o deje un mensaje en un muro de un <a href='http://es.monsterlegends.wikia.com/Especial:ListaUsuarios/sysop'>administrador</a>.",
        ]
    };

//===========================================================================///
//                           FIN DE LA CONFIGURACIÓN                            //
//============================================================================//
/*
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