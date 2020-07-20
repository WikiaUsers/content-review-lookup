/* ChatErrorExplanation
 *
 * Adds your banlog, block, or phalanx log excerpts into Special:Chat permissions error page
 * Doesn't work on silly wikis like VS Battles that have custom requirements for joining chat
 * 
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        !mw.config.get('wgWikiaChatWindowFeatures') ||
        mw.config.get('wgChatRoomId') ||
        window.ChatErrorExplanationLoaded
    ) {
        return;
    }
    
    window.ChatErrorExplanationLoaded = true;

    $.get(mw.util.getUrl('Special:MyContributions'))
        .then(function(page) {
            $(page)
                .find('.mw-warning-with-logexcerpt')
                .insertBefore('#mw-returnto');
        });
})();