/* ReplyList
 *
 * Adds a horizontal list of the replies to each forum post, which when hovered they display a tooltip with the message.
 * Also adds tooltip for hovering over the "Reply to #n"
 *
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgNamespaceNumber') !== 1201 ||
        window.ReplyListInit
    )  {
        return;
    }
    window.ReplyListInit = true;
    $.fn.isInScreen = function() { // Boo-hoo, modifying prototypes! You should be ashamed of yourself!
        var el = this.get(0);
        if (!el) return false;
        var rects = el.getBoundingClientRect(),
        top = rects.top - ($('#globalNavigation').hasClass('headroom--pinned') ? 55 : 0),
        bottom = rects.bottom,
        height = rects.height;
        return (top + height >= 0) && (bottom - height <= window.innerHeight);
    };
    function displayTooltip($elem, $link) { // function to display the tooltip
        $link = $($link);
        var top = $link.offset().top + $link.height() - $('.message-1').offset().top;
        $('.thread-tooltip').remove();
        $elem.find('.replies').remove();
        $elem
            .removeAttr('id')
            .addClass('thread-tooltip')
            .css({
                position: 'absolute',
                right: 0,
                top: top,
                width: '70%',
                margin: '5px',
                paddingLeft: '5px',
                border: $('.Wall ul.comments > li.message ul.replies > li').css('border-top') || '1px solid #ccc',
                backgroundColor: $('#WikiaPageBackground').css('background-color'),
                zIndex: 9999999999999999999999999999999999
            })
            .mouseleave(function() {
                $(this).remove();
            })
            .appendTo('#Wall .comments > .message > .replies');
        var rects = $elem.get(0).getBoundingClientRect();
        if (rects.bottom > window.innerHeight) {
            $elem.css('top', top - rects.height - $link.height() - 10);
        }
        rects = $elem.get(0).getBoundingClientRect();
        if (rects.top < 55) {
            $elem.css('top', top);
        }
    }
    var removeTooltip = $.debounce(300, function(id) {
        if ($('.reply-posts a[data-postfix="' + id + '"]:hover').length) return;
        $('.message-' + id + '.thread-tooltip:not(:hover)').remove();
    });
    function init() {
        $('.message[data-is-reply="1"]').has('.quote-of').each(function() {
            var $elem = $(this),
            id = $elem.find('.quote-of').children().attr('data-postfix'),
            reply_id = $elem.attr('id'),
            canon_id = $elem.attr('data-id'),
            $quote_of = $('.message[id="' + id + '"]');
            if (!$quote_of.find('.reply-posts').length) {
                $('.edited-by').after($('<div>', {
                    class: 'reply-posts'
                }));
            }
            $quote_of.find('.reply-posts').first().append($('<a>', {
                href: '#' + reply_id,
                'data-postfix': reply_id,
                text: '>>' + canon_id,
                mouseenter: function() {
                    if ($elem.isInScreen()) {
                        $('.thread-tooltip').remove();
                        $elem.addClass('mouse-highlight');
                    } else {
                        displayTooltip($elem.clone(), this);
                    }
                },
                mouseleave: function() {
                    $elem.removeClass('mouse-highlight');
                    removeTooltip(reply_id);
                }
            }));
        });
        // Bind showTooltip to the "Reply to" links
        $('.quote-of').mouseenter(function() {
            var $this = $(this),
            $link = $this.children(),
            id = $link.attr('data-postfix'),
            $elem = $('.message-' + id);
            if (id == 1 && $link.attr('href').slice(-2) != '#1') {
                $link.attr('href', $link.attr('href') + '#1');
            }
            if ($elem.children('.speech-bubble-message').isInScreen()) {
                $('.thread-tooltip').remove();
                $elem.addClass('mouse-highlight');
            } else {
                displayTooltip($elem.clone(), this);
            }
        }).mouseleave(function() {
            var id = $(this).children().attr('data-postfix'),
            $elem = $('.message-' + id);
            $elem.removeClass('mouse-highlight');
            removeTooltip(id);
        });
    }
    if (window.ReplyList && ReplyList.noStyle) return init();
    // Add CSS to make it extra sexy
    var style = importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ReplyList.css'
    })[0];
    if (!style) return init();
    style.onload = init;
})();