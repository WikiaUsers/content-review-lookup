/* KillChatEmoticons ([[w:c:dev:KillChatEmoticons]])
 * 
 * Forces emoticons to display their alt attribute instead of the actual image.
 * Personal use only
 *
 * Clear Arrow created first selective emote removal implementation
 * @author Dorumin
 */

(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
 
    if (Array.isArray(window.emotesKilled)) {
        var emoticons = mw.config.get('wgChatEmoticons')
            .replace(/^\*([^*]*)(?:\*{2}.*\n?)*/gm, function(full, url) {
                if (emotesKilled.indexOf(url.trim()) !== -1) return '';
                return full;
            });
            
        mw.config.set('wgChatEmoticons', emoticons);
    } else {
        mw.config.set('wgChatEmoticons', '');
    }
})();