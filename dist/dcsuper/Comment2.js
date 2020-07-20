(function($) {
    watch_this = function ($that) {
        $that.bind("DOMSubtreeModified", function() {
            if ($that.find('.loading-indicator').css('display') != 'none') {
                return;
            }
 
            $that.unbind("DOMSubtreeModified");
            var newTimeCheck = setTimeout(function() {
                if ($that.find('.cke_toolbar_formatsourcemini').length) {
                    clearInterval(newTimeCheck);
                    append_buttons($that);
                }
            }, 100);
        });
    };
 
    append_buttons = function ($that, type) {
        $that.find('.cke_toolbar_formatsourcemini').append(
            '<span class="cke_button" style="line-height:21px; text-align:center; font-size:15px;">' +
                '<a onclick="apply_changes($(this), \'highlight\');" style="color:black;">H</a>' +
            '</span>' +
            '<span class="cke_button" style="line-height:21px; text-align:center; font-size:15px;">' +
                '<a onclick="apply_changes($(this), \'spoiler\');" style="color:black;">S</a>' +
            '</span>' +
            '<span class="cke_button" style="line-height:21px; text-align:center; font-size:15px;">' +
                '<a onclick="apply_changes($(this), \'emo\');" style="color:black;">E</a>' +
            '</span>'
        );
    };
 
    apply_changes = function ($that, type) {
        if ($that.parents('.SpeechBubble').find('.replyBody').length) {
            var $textarea = $that.parents('.SpeechBubble').find('.replyBody');
        } else {
            var $textarea = $that.parents('.SpeechBubble').find('[name="wpArticleReply"]');
        }
        var textarea_val = $textarea.val();
 
        switch(type) {
            case 'highlight':
                textarea_val += '{{Fontcolor| | | }}';
                break;
            case 'spoiler':
                textarea_val += '<big>\'\'\'Spoiler\'\'\'</big><div class="mw-collapsible mw-collapsed" style="float:left" data-expandtext="Hiện ra" data-collapsetext="Ẩn đi">Add Your Spoiler here</div>';
                break;
            case 'emo':
                textarea_val += '{{=| }}';
                break;
            default:
                return;
        }
 
        $textarea.val(textarea_val);
    };
 
    start = function (target, type) {
        $(target).click(function() {
            if ($(this).hasClass('alreadyclicked')) return;
 
            $(this).toggleClass('alreadyclicked');
 
            switch(type) {
                case 'thread': 
                    watch_this($(this).parents('.SpeechBubble'), type);
                    break;
                case 'comment':
                    watch_this($(this).parents('.speech-bubble-message'), type);
                    break;
                default:
                    return;
            }
        });
    };
 
    init = function () {
        if($('#WikiaArticleComments').length) {
            if ($('#article-comments').length) {
                start('.article-comm-reply', 'comment');
            } else {
                $("#WikiaArticleComments").bind("DOMSubtreeModified", function() {
                    if (!$('#article-comments').length) {
                        return;
                    }
                    $("#WikiaArticleComments").unbind("DOMSubtreeModified");
                    start('.article-comm-reply', 'comment');
                });
            }
        } else {
            start('.new-reply', 'thread');
        }
    };
 
    $(init);
 
})(this.jQuery);