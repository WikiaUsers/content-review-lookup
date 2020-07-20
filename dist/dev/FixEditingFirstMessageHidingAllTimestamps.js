(function () {
    var ns = mw.config.get('wgNamespaceNumber');
    if (window.FixEditingFirstMessageHidingAllTimestampsLoaded || ns !== 1200 && ns !== 1201) {
        return;
    }
    window.FixEditingFirstMessageHidingAllTimestampsLoaded = true;
    $('.Wall .message-1 > .speech-bubble-message .msg-toolbar .edit-message').click(function () {
        setTimeout(function () {
            $('.Wall .replies .timestamp').css('display', 'block');
        }, 100);
    });
})();