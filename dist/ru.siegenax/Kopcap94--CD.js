// Быстрое удаление комментариев V1.3b @author:Kopcap94
// Добавляет к каждому комментарию в статьях кнопку быстрого удаления: QD
// Окрас кнопки после нажатия покажет - успешно ли было удаление или нет

$(function() {
    if(!$('#WikiaArticleComments').length) {
        return;
    }
    
    console.log('V1.3b');
    
    var deltoken = mw.user.tokens.values.editToken;
    
    window.CommentDelete = function() {
        $('.article-comm-delete').each(function() {
            if ($(this).parents('div.buttons').find('.article-comm-quickdelete').length) {
                return;
            }
            
            $(this).after('<a class="article-comm-quickdelete" style="color:red; fond-weight:bold; cursor:pointer">(QDelete)</a>');
            
            $(this).parents('div.buttons').find('.article-comm-quickdelete').click(function() {
                var $that = $(this).parents('li.SpeechBubble');
                var title = $that.find('.article-comm-delete').attr('href').replace(/\/wiki\/(.+)\?redirect.*/g, '$1');
                $.post("/api.php", {
                    action:'delete',
                    title:decodeURIComponent(title),
                    reason:'быстрое удаление',
                    token:deltoken,
                    format:'json'
                }).done(function(data){
                    if (data['delete']) {
                        var cd_color = 'lightgreen';
                    } else {
                        var cd_color = 'firebrick';
                    }
                    $that.find('.article-comm-quickdelete').css({
                        'background-color':cd_color,
                    });
                });
            });
        });
    };
    
    if (!$('#article-comments').length) {
        $("#WikiaArticleComments").bind("DOMSubtreeModified", function(){
            if (!$('#article-comments').length){
                return;
            }
            
            $("#WikiaArticleComments").unbind("DOMSubtreeModified");
            
            // Первичный запуск
            CommentDelete();
            
            // Повторные запуски при переключении страниц с комментариями
            $('#article-comments-ul').bind("DOMSubtreeModified", function(){
                CommentDelete();
            });
        });
    } else {
        CommentDelete();
    }
});