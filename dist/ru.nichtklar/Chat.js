importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});
var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

/* Chat Rules */
$(document).ready(function() {
    var chat_info_rules = '<div class="chat-info">' + '<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chat-info_chevron" style="display: inline;">' + '<div style="margin-left: 29px; font-size: 14px; padding-bottom: 3px; color: white;">Правила чата</div>' + '<ul id="chat-info_rules" style="padding-left: 5px; visibility: visible:">' + '<li>• Запрещено использовать в общении маты вроде блять, пизда и т.д.' + '<ul style="padding-left:10px;"><li>• Но, разрешено использовать облегчённые версии вроде слова фигня. </li></ul>' + '</li>' + '<li>• Запрещены оскорбления участников.</li>' + '<li>• Запрещён флуд и спам.</li>' + '<li>• Запрещена публикация шок-контента.</li>' + '<li>• Запрещены угрозы, запугивание, травля участников.</li>' + '</ul>' + '</div>';
 
    $('#Rail').append(chat_info_rules);
 
    $('#Rail .chat-info_chevron').click(function(){ 
        if($('#chat-info_rules').is(':visible')) {
            $(this).addClass('closed');
            $('#chat-info_rules').slideUp('fast');
        } else {
            $(this).removeClass('closed');
            $('#chat-info_rules').slideDown('fast');
        }
    });
});