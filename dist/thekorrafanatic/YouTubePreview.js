/* 
 * @name        YouTubePreview
 * @description Previews YT links placed in Special:Chat
 * @author      Dorumin
 */
 importArticle({
    type: 'script',
    article: 'u:dev:Chat-js.js'
});
 
mw.hook('dev.chat.render').add(function(mainRoom) {
    if (window.YouTubePreviewLoaded) return;
    window.YouTubePreviewLoaded = true;
    var regex = /https?:\/\/(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9-_]{11})/g,
        match,
        $container;
 
    function afterChat(model) {
        if (model.attributes.isInlineAlert) return;
        regex.lastIndex = 0;
        if (regex.test(model.attributes.text)) {
            $container = $('<div>', {
                    class: 'youtube-container'
                })
                .css('width', '100%')
                .appendTo('#entry-' + model.cid + ' .message');
        } else {
            return;
        }
 
        regex.lastIndex = 0;
 
        while ((match = regex.exec(model.attributes.text)) !== null) {
            if (match.index === regex.lastIndex) {
                regex.lastIndex++;
            }
 
            $container.append($('<iframe>', {
                src: 'https://youtube.com/embed/' + match[1],
                class: 'youtube-preview-player',
                css: {
                    display: 'none',
                    width: '320px',
                    height: '180px',
                    padding: '5px'
                },
                load: function() {
                    this.style.display = '';
                    mainRoom.viewDiscussion.scrollToBottom();
                }
            }));
        }
    }
 
    mainRoom.model.chats.bind('afteradd', afterChat);
    mainRoom.model.privateUsers.bind('add', function(user) {
        var room = mainRoom.chats.privates[user.attributes.roomId];
        room.model.chats.bind('afteradd', afterChat);
    });
});