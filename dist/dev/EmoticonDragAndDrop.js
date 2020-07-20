/* EmoticonDragAndDrop
 *
 * Lets you drag and drop emoticons in to the chat textarea
 * 
 * My last two scripts have been super short chat plugins, wonder what's up with that
 * I should probably work on something bigger next so I don't get too complacent
 * 
 * @author Dorumin
 */

mw.hook('dev.chat.socket').add(function(mainRoom) {
    function onMessage(model) {
        var entry = document.getElementById('entry-' + model.cid);
        if (!entry) return;
        entry
            .querySelectorAll('img')
            .forEach(function(el) {
                el.addEventListener('dragstart', function(e) {                    
                    var emote = new DOMParser().parseFromString(el.alt, 'text/html').body.textContent;
                    e.dataTransfer.setData('text/plain', emote);
                });
            });
    }

    mainRoom.model.chats.bind('afteradd', onMessage);
    mainRoom.model.privateUsers.bind('add', function(user) {
        mainRoom.chats.privates[user.attributes.roomId].model.chats.bind('afteradd', onMessage);
    });
    Object.values(mainRoom.chats.privates).forEach(function(room) {
        room.model.chats.bind('afteradd', onMessage);
    });
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Chat-js.js'
});