// Quote Button and some functions for comment section
if (mw.config.get('wgNamespaceNumber') === 0 || mw.config.get('wgNamespaceNumber') === 500) {
    (function() {
        var o = jQuery.fn.removeClass;

        jQuery.fn.removeClass = function() {
            var result = o.apply(this, arguments);
            jQuery(this).trigger('commentsLoaded');
            return result;
        };
    })();
    $(function() {
        $('#WikiaArticleComments').one('commentsLoaded', function(event) {
            var timer = window.setInterval(function() {
                if ($('.article-comments-pagination').length > 1) {
                    window.clearInterval(timer);
                    CommentStuff();
                }
            }, 100);
        });

        function CommentStuff() {
            (function($) {
                $.fn.focusToEnd = function() {
                    return this.each(function() {
                        var v = $(this).val();
                        $(this).focus().val("").val(v);
                    });
                };
            })(jQuery);
            $('#article-comments-counter-header a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
            $('#article-comments-ul .edited-by').each(function() {
                $('.article-comm-text a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
                var link = $(this).children('a:first').attr('href');
                link = link.substring(0, link.indexOf('?'));
                $(this).find('.edit-link').append(
                    '(<a class="article-comm-edit-full" href="' + link +
                    '?redirect=no&action=edit&useeditor=source" target="_blank" style="margin-right:-0.05em;">full</a>)'
                );
            });

            // New Buttons for Source Editor only.
            // Article/Blog
            (function($) {
                watch_this = function($that) {
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

                append_buttons = function($that) {
                    $that.find('.cke_toolbar_formatsourcemini').append(
                        '<span class="cke_button" title="Chèn spoiler" style="line-height:21px; text-align:center; font-size:15px;">' +
                        '<a onclick="apply_changes($(this), \'spoiler\');" class="we_spoiler"></a>' +
                        '</span>' +
                        '<span class="cke_button" title="Chèn emo" style="line-height:21px; text-align:center; font-size:15px;">' +
                        '<a onclick="apply_changes($(this), \'emo\');" class="we_emo"></a>' +
                        '</span>' +
                        '<span class="cke_button" title="Chèn ảnh ngoài" style="line-height:21px; text-align:center; font-size:15px;">' +
                        '<a onclick="apply_changes($(this), \'img\');" class="we_img"></a>' +
                        '</span>' +
                        '<span class="cke_button" title="Bôi màu chữ" style="line-height:21px; text-align:center; font-size:15px;">' +
                        '<a onclick="apply_changes($(this), \'color\');" class="we_fontcolor"></a>' +
                        '</span>'
                    );
                };

                apply_changes = function($that, type) {
                    if ($that.parents('.SpeechBubble').find('.replyBody').length) {
                        var $textarea = $that.parents('.SpeechBubble').find('.replyBody');
                    } else {
                        var $textarea = $that.parents('.SpeechBubble').find('[name="wpArticleReply"]');
                    }
                    var textarea_val = $textarea.val();

                    switch (type) {
                        case 'spoiler':
                            textarea_val += '{{sp}}</div>';
                            break;
                        case 'emo':
                            textarea_val += '{{=|}}';
                            break;
                        case 'img':
                            textarea_val += '{{Img|url=|width=400}}';
                            break;
                        case 'color':
                            textarea_val += '{{Fontcolor|màu chữ|màu nền|chữ cần bôi}}';
                            break;
                        default:
                            return;
                    }

                    $textarea.val(textarea_val);
                };

                start = function(target, type) {
                    $(target).click(function() {
                        if ($(this).hasClass('alreadyclicked')) return;

                        $(this).toggleClass('alreadyclicked');

                        switch (type) {
                            case 'comment':
                                watch_this($(this).parents('.speech-bubble-message'), type);
                                break;
                            default:
                                return;
                        }
                    });
                };

                init = function() {
                    if ($('#WikiaArticleComments').length) {
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
                    }
                };

                $(init);

            })(this.jQuery);

            $('.buttons .tools').before('<button type="button" class="article-comm-quote wikia-button secondary actionButton">Quote</button>');
            $('.article-comm-quote').click(function() {
                var text = '',
                    nick = $(this).parents('.SpeechBubble').attr('data-user'),
                    $comment = $(this).parents('.speech-bubble-message');
                $(this).parents('.speech-bubble-message').find('.article-comm-text p').each(function() {
                    text += $(this).text().replace(/(\r\n|\n|\r)/gm, '');
                });
                if ($(this).parents('.sub-comments').length) {
                    $(this).parents('.sub-comments').prev().find('.article-comm-reply').click();
                } else {
                    $(this).parents('.SpeechBubble').find('.article-comm-reply').click();
                }
                $comment.bind("DOMSubtreeModified", function() {
                    if ($('.loading-indicator').css('display') !== 'none') {
                        return;
                    }
                    $comment.unbind("DOMSubtreeModified");
                    $('[name="wpArticleReply"]').val('{{quote|text=' + nick + ' đã viết: ' + text + '|author=' + nick + '}}').focusToEnd();
                });
            });


            $('.article-comments-pagination a').click(function() {
                var page = $(this).attr('page');
                var timer2 = window.setInterval(function() {
                    if (
                        $(
                            '.article-comments-pagination ' +
                            'a[id=article-comments-pagination-link-' +
                            page + ']'
                        ).hasClass('article-comments-pagination-link-active')
                    ) {
                        window.clearInterval(timer2);
                        CommentStuff();
                    }
                }, 500);
            });
        }
    });
}

// New Buttons for Source Editor only.
// Forum and Message Wall
WikiaEditorButtons = {
    'Spoiler': [
        "{{sp}}",
        "Văn bản cần ẩn đi",
        "</div>"
    ],
    'Emo': [
        "{{=|",
        "emo",
        "}}"
    ],
    'Img': [
        "{{Img|url=",
        "link ảnh",
        "|width=400}}"
    ],
    'Fontcolor': [
        "{{Fontcolor|",
        "màu chữ",
        "|màu nền|chữ cần bôi}}"
    ]
};

(function(mw, $) {
    var WE = window.WikiaEditor;
    if (typeof(WE) === 'undefined' || typeof(WikiaEditorButtons) === 'undefined') return;

    var default_config = {
            modes: {
                source: true
            },
            headerClass: 'formatsourcemini',
            items: [
                'SourceBold',
                'SourceItalic',
                'SourceLink'
            ]
        },
        new_items = [];

    $.each(WikiaEditorButtons, function(k, v) {
        wgEditorExtraButtons[k] = {
            type: 'button',
            labelId: 'Chèn ' + k.toLowerCase(),
            className: 'we_' + k.toLowerCase(),
            clicksource: function() {
                insertTags(v[0], v[2], v[1], WE.getInstance().getEditbox()[0]);
            }
        };

        default_config.items.push(k);
    });

    WE.modules.FormatMiniEditorSource = $.createClass(WE.modules.ButtonsList, default_config);
})(this.mediaWiki, this.jQuery);

// Messages of comment header
$(function() {
    var commentheader = "#WikiaArticleComments > h1#article-comments-counter-header";
    $("body").on("DOMNodeInserted", commentheader, function() {
        importArticles({
            type: 'script',
            articles: [
                'u:sonako:MediaWiki:Sharethis.js',
                'u:sonako:MediaWiki:Ebook.js'
            ]
        });
    });
}());

// Auto-close threads
$(function() {
    var autoCloseThreads = {
        replies: 160, //maximum number of replies
        message: 'Thớt đã quá tải. Tự động đóng.',
        style: 'border: 1px solid #ccc; padding: 5px; text-align: center;' //styling of the div
    };
    if (mw.config.get('wgNamespaceNumber') == 1201 &&
        mw.config.get('wgUserGroups').indexOf('sysop') == -1 &&
        mw.config.get('wgUserGroups').indexOf('bureaucrat') == -1
    ) {
        if ($('.SpeechBubble .replies').length) {
            if ($('.SpeechBubble [data-is-reply="1"]').length > autoCloseThreads.replies - 1) {
                $('.SpeechBubble .new-reply').replaceWith('<div style="' + autoCloseThreads.style + '">' + autoCloseThreads.message + '</div>');
                $('.SpeechBubble .quote-button').remove();
            }
        }
    }
});

// Danh sách tham gia Thread
// Vẫn còn lỗi khi Thread quá dài không thể hiện hết tên, tạm thời cho ngưng chạy
/* isHistory = mw.Uri().query.hasOwnProperty('action') ? (mw.Uri().query.action == 'history' ? true : false) : false;
if (wgNamespaceNumber == 1201 && !isHistory) {
    $.get('/wiki/' + wgPageName + '?action=history', function(data) {
        $('.WikiaRail.loaded#WikiaRail').prepend(
            $($.parseHTML(data)).find('.module.WallHistoryRail')
        );
        $('.WikiaRail.loaded .module.WallHistoryRail > a').each(function() {
            $('a').attr('target', '_blank');
        });
        $('.WikiaRail.loaded .module.WallHistoryRail > ul').after(
            $('<a />').attr({
                'href': '/wiki/' + wgPageName + '?action=history',
                'target': '_blank',
                'title': 'Lịch sử Thread'
            }).css({
                'margin-top': '10px',
                'display': 'inline-block',
                'margin-left': '15px'
            }).text('Xem lịch sử Thread')
        );
    });
}
*/