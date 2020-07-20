// chat rules window
function loadRules(){
    $('#rulesModal .modalContent span.placeholder').html('').load('/index.php?title=Chat_Policies&action=render');
}
$('.ChatHeader .public').append('<span class="loadRulesWindow" style="font-size: 15px; margin: 200px; cursor: pointer; color: #70b8ff;" title="List of rules to follow on the chat">Chat Rules</span>');

$('span.loadRulesWindow').click(function (){
    "use strict";
    setTimeout(loadRules, 1800);
    $.showCustomModal('Chat Policies', '<span class="placeholder"><img src="https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif" /></span>', {
        id: 'rulesModal',
        width: 1000,
        height: 620,
        buttons: [
            {
                id: 'close',
                defaultButton: true,
                message: 'Close',
                handler: function (){
                    $('#rulesModal').closeModal();
                }
            }
        ]
    });
});

setInterval(function (){
    $('.modalWrapper a').each(function (){
        $(this).attr('target', '_blank');
    });
}, 100);



// imports

var chatags = { images: true, videos: true };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',,
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
    ]
});