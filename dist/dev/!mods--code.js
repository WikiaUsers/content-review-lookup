/**
 * !mods.js
 *
 * Ping all chat moderators present in chat
 * @author: [[w:User:Slyst]]
 */

$(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserGroups'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        !/(sysop|chatmoderator|helper|vstf|staff|threadmoderator|wiki-manager)/.test(config.wgUserGroups.join()) ||
        !window.mainRoom ||
        window['!modsLoaded']
    ) {
        return;
    }
    window['!modsLoaded'] = true;
    var ping = new Audio(window.ModPing || 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg');
    window.mainRoom.model.chats.bind('afteradd', function(data) {
        if (data && data.attributes && data.attributes.text && data.attributes.text.substr(0, 5) == '!mods') {
            ping.play();
        }
    });
});