/**
 * !mods.js
 *
 * Ping all chat moderators present in chat
 * @author: [[w:User:Slyst]]
 */
 
$(function() {
    var ping = new Audio(window.ModPing || 'https://mcf-static-s1.socialpointgames.com/static/monstercity/assets/sounds/107_mc_readytocollect_v1.mp3');
    if(
        mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
        /(sysop|chatmoderator|helper|vstf|staff|threadmoderator)/.test(mw.config.get('wgUserGroups').join(' ')) &&
        window.mainRoom
    ) window.mainRoom.model.chats.bind('afteradd', function(data) {
        if(data && data.attributes && data.attributes.text && data.attributes.text.substr(0, 5) == '!mods')
            ping.play();
    });
});