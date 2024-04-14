(function(mw, $, module_config){
    if (mw.config.get('skin') == 'oasis' || mw.config.get('skin') == 'wikia'){
        var chatModule = $('.WikiaRail > .ChatModule');
        if (chatModule.length){
            var chatMenu =
                '<nav class="chat-join-menu" id="chat-join-menu">' +
                    '<ul>' +
                        '<li><a href="javascript:ChatEntryPoint.onClickChatButton(\'/wiki/Special:Chat\');" class="chat-join-link" id="chat-join-link"><i class="fa fa-comment"></i></a></li>' +
                        '<li><a href="#chat-list-modal" class="chat-join-link chat-list-link" id="chat-list-link"><i class="fa fa-list"></i></a></li>' +
                    '</ul>' +
                '</nav>';
            chatModule.find('.chat-join').append(chatMenu);
            $('.chat-list-link#chat-list-link').on('click', function(){
                var chatList =
                    '<div class="chat-list-blackout">' +
                        '<section class="chat-list-modal" id="chat-list-modal">' +
                            '<header class="chat-list-header" data-heading="Chat List">' +
                            '</header>' +
                            '<nav class="chat-list" id="chat-list">' +
                            '</nav>' +
                            '<aside class="chat-list-statistics">' +
                            '</aside>' +
                            '<footer class="chat-list-footer">' +
                            '</footer>' +
                        '</section>' +
                    '</div>';
                $('body.mediawiki').append(chatList);
            });
        }
    }
})(mediawiki, jQuery, moduleDefaults);