(function (window, $, mw) {
    'use strict';

    if (window.DiscussionsReplyLoaded) return;
    window.DiscussionsReplyLoaded = true;

    function truncate(text, max) {
        text = text.trim();
        return text.length > max ? text.substring(0, max) + '…' : text;
    }

    function addReplyOption(list) {
        if (list.querySelector('.DiscussionsReply-action')) return;

        var isReply = !!list.closest('[class*="Reply_reply__"]') || !!list.closest('.Reply');
        var contentWrapper = list.closest('[class*="Reply_reply__"]') ||
                             list.closest('.Reply') ||
                             list.closest('[class*="Comment_wrapper__"]') ||
                             list.closest('[class*="Message__wrapper"]');
        if (!contentWrapper) return;

        var username = contentWrapper.querySelector('.EntityHeader_name__PAxYW');
        var content = contentWrapper.querySelector('.entity-content');
        if (!username || !content) return;

        var name = username.textContent.trim();
        var message = truncate(content.textContent, 50);

        var li = document.createElement('li');
        li.className = 'ActionItem_action-item__dll5i DiscussionsReply-action';
        li.setAttribute('tabindex', '0');
        li.innerHTML = '<span style="font-size:16px;margin-right:8px;vertical-align:middle;">↩</span>Reply';

        li.addEventListener('click', function () {
            var formWrapper = isReply
                ? contentWrapper.closest('[class*="Comment_wrapper__"]') ||
                  contentWrapper.closest('[class*="Message__wrapper"]') ||
                  contentWrapper
                : contentWrapper;

            var replyContainer = formWrapper.querySelector('.ReplyList_container__bj-35') ||
                                 formWrapper.querySelector('[class*="ReplyCreate"]') ||
                                 formWrapper.querySelector('[class*="InlineEntityFormWrapper"]');
            if (!replyContainer) return;

            var entryPoint = replyContainer.querySelector('.FormEntryPoint_form-entry-point-content-wrapper__sZG3S');
            if (!entryPoint) return;

            entryPoint.click();

            var attempts = 0;
            var interval = setInterval(function () {
                var editor = replyContainer.querySelector('.ProseMirror');
                if (editor) {
                    clearInterval(interval);
                    setTimeout(function () {
                        editor.innerHTML =
                            '<p>Replying to <a>@' + name + '</a> </p>' +
                            '<p><br></p>' +
                            '<pre><code>' + message + '</code></pre>' +
                            '<p><br></p>';
                    }, 100);
                } else if (++attempts > 20) {
                    clearInterval(interval);
                }
            }, 100);
        });

        list.appendChild(li);
    }

    var observer = new MutationObserver(function () {
        document.querySelectorAll('.ActionDropdown_list__NLhpP').forEach(function (list) {
            addReplyOption(list);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

}(this, jQuery, mediaWiki));