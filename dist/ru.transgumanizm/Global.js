/* Цитирование для чата */
function ChatQuote() {
    $('.Chat li .message').each(function () {
        if ($(this).find('.chat-quote').length === 0) {
            $(this).append('<span class="chat-quote" style="color:red; float:right">[quote]</span>').find(".chat-quote").click(function () {
                $('.message > textarea').val($('.message > textarea').val() + ' ' + $(this).parent().prevAll('.username:first').text() + ': "' + $(this).parent().text().toString().replace('[quote]', '') + '"');
            });
        }
    });
}
setInterval(ChatQuote, 1000);