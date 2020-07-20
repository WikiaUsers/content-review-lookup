$(function()
{
        $('div.Chat').jScrollPane();
});

var api = $('div.Chat').jScrollPane({
autoReinitialise: true,
stickToBottom: true,
maintainPosition: true
}).data('jsp');

    $(function() {
       
        var shouldStickToBottom = true,
            api = $('div.Chat').jScrollPane({
                      stickToBottom: true,
                      maintainPosition: true
                    }).data('jsp');
       
        function addDummyContentToChatBox() {
            api.reinitialise();
            if (api.getIsScrollableV() && shouldStickToBottom) {
                api.scrollToBottom();
                api.reinitialise();
                shouldStickToBottom = false;
            }
        }
       
        setInterval(addDummyContentToChatBox, 233);
    });

setTimeout(function(){api.scrollToBottom(true);},1000);