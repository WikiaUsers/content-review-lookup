
/* !mods ([[w:c:dev:!mods]])
 * 
 * Script forked from dev wiki so it doesn't throw ~10 errors per minute.
 */
 
var modScriptInterval = setInterval(function() {
    if (!mainRoom || !mainRoom.userMain) return;
    if (!mainRoom.userMain.attributes.isModerator) {
        clearInterval(modScriptInterval);
        modScriptInterval = undefined;
        return;
    }
    clearInterval(modScriptInterval);
    modScriptInterval = undefined;
    var modsCheck = function(chat) {
        var text = chat.attributes.text;
        if (text.slice(0, 5) == '!mods') {
            var ping = document.createElement('audio');
            ping.id = 'mod-ping';
            ping.src = 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg';
            ping.autoplay = true;
            document.body.appendChild(ping);
            setTimeout(function() {
                document.body.removeChild(ping);
            }, 1000);
        }
    };
    mainRoom.model.chats.bind('afteradd', modsCheck);
}, 500);