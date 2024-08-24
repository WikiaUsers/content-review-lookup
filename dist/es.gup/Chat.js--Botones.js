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
 
/******************************************************************************/
/********* Reglas del chat, script escrito por Usuario:KockaAdmiralac *********/
/******************************************************************************/
$(function(){
    window.kockaRules = {
        rules: [
           
            "No esta permitido hacer flood (repetir alguna letra, emoji o cualquier otra cosa mas de              8 veces). De ser así, el usuario sera primeramente advertido, luego expulsado y por                  ultimo bloqueado con un plazo de dos horas (si fue leve) o un plazo de 1 día (si es    grave).",
            "No esta permitido hacer spam (repetir un mensaje mas de tres veces o promocionar alguna             página sin permiso de un moderador de chat). Se aplica la misma sentencia cometida con el flood.",
            "No esta permitido mandar links que contenga contenido inapropiado y screamers. De ser               así, el usuario primeramente sera expulsado y si lo vuelve a repetir, baneado por una semana.",
            "No hablar de temas racistas, políticos,religiosos extremistas ni hacer comentarios de               tipo sexual. Se aplica la misma setencia que el flood y el spam.",
            "Respetar la privacidad de terceras personas. Si no se hace, el usuario deberá ser     bloqueado un día.",
            "Iniciar peleas o discusiones equivale a un bloqueo de 3 meses como mínimo.",
            "No hablar sobre sexo o páginas de Internet derivadas del sexo, las drogas, la violencia, etc.",
            "No se puede revelar ni la edad ni los datos personales, la wiki  ni los administradores no se hará cargo de las consecuencias.",
            "No acosar a otros usuarios (acoso cuenta como:enviarles mensajes en exceso, forzar a tener un relación de cualquier tipo, etc.)",
            "Están permitidas palabras como tonto, idiota, mierda, caca, o estúpido siempre y cuando no ofendan a alguien.",
            "No esta permitido decir ningún tipo de grosería.",
            "No están permitidos los screamers, el usuario que mande uno será bloqueado por un día.",
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