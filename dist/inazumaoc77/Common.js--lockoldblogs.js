/**
 * lockoldblogs.js
 *
 * Locks blog posts that haven't been commented on for over 30 days
 * @author slyst
 */

;(function(mw) {
    var lock = {
        status: 'enabled',
        observer: function() {
            var m = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        var target = $(mutation.addedNodes),
                            now = Date.now(),
                            date, then, diff;
                        if (!target.find('.comment').length) {
                            then = $('.page-header__blog-post-details').contents().filter(function() {
                                return this.nodeType === 3;
                            })[1].textContent.replace(/\|/g, '').trim();
                            then = Date.parse(then);
                        } else {
                            target = target.find('.comment .speech-bubble-message').find('.permalink').attr('href');
                            date = new Array(/@comment-\w*-(\w{4})(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})(?=\?)/gi.exec(target)).pop();
                            then = Date.parse(date[1] + '-' + date[2] + '-' + date[3] + 'T' + date[4] + ':' + date[5] + ':' + date[6] + '.000Z');
                        }
                        /* diff is a new date formed by the difference of the two; offset: Jan 01 1970 */
                        diff = new Date(now - then);
                        /* either not january || january but not 1970 → 30 days have passed */
                        if (diff.getMonth() > 0 || (diff.getMonth() == 0 && diff.getFullYear() > 1970)) {
                            lock.status = 'disabled';
                            lock.disable();
                          	m.disconnect();
                        }
                    }
                });
            });
            m.observe(document.getElementById('WikiaArticleComments'), {
                attributes: true,
                childList: true,
                subtree: true
            });
        },
        disable: function() {
            if (this.status == 'disabled') {
                /* comment box */
                $('#article-comm').attr({
                    disabled: 'disabled',
                    placeholder: 'This blog post hasn\'t been commented on for over 30 days. There is no need to comment.'
                });
                /* submit button */
                $('#article-comm-submit').remove();
                /* reply buttons and edit links */
                mw.util.addCSS('.article-comm-reply, .tools .edit-link { display: none; }');
            }
        }
    };
    $(lock.observer);
})(window.mediaWiki);