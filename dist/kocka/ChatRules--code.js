$(function()
{
    var config = window.ChatRulesConfig || {};
    config.vocab = config.vocab || {};
    $.get(location.origin + "/wiki/" + (config.page || "Project:Chat/Rules/short") + "?action=render", function(data)
    {
        mw.util.addCSS("#ChatRulesModalContent{height:400px;overflow-y:auto}.ChatRulesButton{float:right}#ChatRulesModalContent ul{list-style-type:square;margin-left:15px}");
        var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>',
        button = document.createElement("button");
        button.innerHTML = config.vocab.rules || "Rules";
        button.className = "ChatRulesButton";
        button.onclick = function()
        {
            $.showModal(config.vocab.rules || "Rules", modalContent,
            {
                id: "ChatRulesModal",
                width: config.modalWidth || 500,
                buttons: [{
                    id: "ChatRulesCloseButton",
                    defaultButton: true,
                    message: config.vocab.close || "Close",
                    handler: function(){ $("#ChatRulesModal").closeModal(); }
                }]
            });
        };
        $('.public.wordmark').first().append(button);
    });
});