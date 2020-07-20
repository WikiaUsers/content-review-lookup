(function () {
    var ns = mw.config.get('wgNamespaceNumber');
    if (window.EnableDisabledCancelButtonLoaded || ns !== 1200 && ns !== 1201) {
        return;
    }
    window.EnableDisabledCancelButtonLoaded = true;
    $('.Wall .message-1 > .speech-bubble-message .msg-toolbar .edit-message').on('click', function () {
        setTimeout(function () {
            var el = $('.Wall .edit-buttons.edit .cancel-edit');
            if (el.prop('disabled')) {
                el.prop('disabled', false);
            }
        }, 100);
    });
})();