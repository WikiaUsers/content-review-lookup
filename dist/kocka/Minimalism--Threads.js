/**
 * Name:        Minimalism - Threads.js
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Version:     v1.1
 * Description: Makes forum post backgrounds differ
 *              moves tool buttons next to the timestamp
 *              and out of the "More" dropdown
 */
(function() {
    if (['Thread', 'Message_Wall'].indexOf(mw.config.get('wgCanonicalNamespace')) === -1) {
        return;
    }
    // Remove "More" text
    var wrapper = '.speech-bubble-message .MiniEditorWrapper .buttons ';
    $(wrapper + '.wikia-menu-button').each(function() {
        this.firstChild.remove();
    });
    var css = wrapper + '.WikiaMenuElement li a {';
    // Apply CSS from quote button to other buttons
    ['background', 'border'].forEach(function(prop) {
        css += prop + ':' + $(wrapper + '.quote-button').css(prop) + ';';
    });
    css += '}';
    // $color-wall-bubble: mix($color-buttons, $color-page, 15%);
    mw.util.addCSS(
        css +
        '.replies > li:nth-child(even):not(.new-reply) {' +
            'background-color: ' +
                $('.speech-bubble-message:first')
                    .css('background-color') +
                ';' +
        '}'
    );
    $('.MiniEditorWrapper').each(function() {
        var $this = $(this),
            $target = $this.find('> .edited-by');
        $this.find('> .msg-toolbar > .timestamp').appendTo($target);
        $this.find('> .msg-toolbar > .buttonswrapper').appendTo($target);
    });
    $('<li>').append(
        $('.speech-bubble-message .follow')
            .removeClass('wikia-button')
    ).appendTo('.message-main > .speech-bubble-message .MiniEditorWrapper .buttons .WikiaMenuElement');
})();