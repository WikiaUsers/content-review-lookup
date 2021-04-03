/**
 * Name:        Minimalism - Diffs.js
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Removes + and - diff markers from diff pages
 *              Has QuickDiff support
 */
mw.loader.using('mediawiki.util').then(function() {
    function usefulDiff($content) {
        $content.find('.diff-marker').remove();
        $content
            .find('.diff-otitle, .diff-ntitle, .diff-lineno, .diff-empty')
            .attr('colspan', 1);
    }
    if (mw.util.$content) {
        usefulDiff(mw.util.$content);
    }
    setTimeout(function() {
        if (mw.util.$content) {
            usefulDiff(mw.util.$content);
        }
    }, 2000);
    mw.hook('wikipage.content').add(usefulDiff);
    mw.hook('wikipage.diff').add(usefulDiff);
    mw.hook('quickdiff.ready').add(function(modal) {
        usefulDiff(modal.$content);
    });
});