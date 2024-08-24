importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
    ]
});
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emotes",
        close: "Cerrar"
    },
    help: "Para insertar un emoticón, haz clic en él."
};
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {
 
        var message = this.value;
 
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        if (/[\/[:]Especial:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Debido a las reglas de la comunidad, no puedes enviar enlaces de otros chats de Wikia.');
        }
        if (/60484617|kat\.cr|theworldofstevenuniverse\.blogspot\.com|kisscartoon\.me|watchonlinecartoons\.net|madridista-4-life\.tumblr\.com/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('No puedes enviar este enlace, debido a que violaría la política de derechos de autor.');
        }
    }
});
$(function()
{
    var config = window.ChatRulesConfig || {};
    config.vocab = config.vocab || {};
    $.get(location.origin + "/wiki/" + (config.page || "Project:Reglas/chat") + "?action=render", function(data)
    {
        mw.util.addCSS("#ChatRulesModalContent{height:400px;overflow-y:auto}.ChatRulesButton{float:right}#ChatRulesModalContent ul{list-style-type:square;margin-left:15px}");
        var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>',
        button = document.createElement("button");
        button.innerHTML = config.vocab.rules || "Reglas";
        button.className = "ChatRulesButton";
        button.onclick = function()
        {
            $.showModal(config.vocab.rules || "Reglas", modalContent,
            {
                id: "ChatRulesModal",
                width: config.modalWidth || 500,
                buttons: [{
                    id: "ChatRulesCloseButton",
                    defaultButton: true,
                    message: config.vocab.close || "Cerrar",
                    handler: function(){ $("#ChatRulesModal").closeModal(); }
                }]
            });
        };
        $('.public.wordmark').first().append(button);
    });
});
document.title = "Chat - LyK Wiki";