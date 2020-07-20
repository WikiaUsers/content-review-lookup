;(function(mw, $, search){
    var config = $.extend(search, {
        limit: 10,
        id: 'ChatSearch',
        generateSearchResults: function(results, limit){
            if (typeof limit == 'number'){
                results = results.filter(function(result, index){
                    return index < limit && result !== undefined;
                });
            }
            var $results = results.map(function(result){
                var $list = $('<li class="" />')
            });
        },
        openArticle: function(event){
            event.preventDefault();
            var $link = $(event.target),
                title = $link.text(),
                $modal = $.showCustomModal(title, '<div class="article-container mw-content-text" id="article-container"></div>', {
                    id: 'ArticleModal',
                    width: 650
                });
            $(document).ajaxSend(function(event, xhr, settings){
                var $article_container = $('#article-container'),
                    $loading_text = $('<p class="loading-text" />'),
                    $loading_bar = $('<div class="loading-bar" />');
                $article_container.addClass('loading');
                $loading_text.html('Loading...<span class="counter"></span>');
                if (settings.url.indexOf(title) > -1){
                    $article_container.html([$loading_text, $loading_bar]);
                }
            }).ajaxComplete(function(event, xhr, settings){
                console.log('Article loaded!');
            });
            
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.util.wikiScript('api'),
                data: {
                    page: title,
                    action: 'parse',
                    format: 'json'
                },
                xhr: function(){
                    var xhr = new window.XMLHttpRequest();
                    xhr.addEventListener('progress', function(event){
                        $('.loading-text > .counter', document.body).html((100 * (event.loaded / event.total)) + '%');
                        $('.loading-bar').width((100 * (event.loaded / event.total)) + '%');
                    });
                    return xhr;
                }
            }).done(function(data){
                var code = data.parse.text['*'];
                $('#ArticleModal #article-container').html(code);
            });
        }
    });
})(this.mediaWiki, this.jQuery, this.ChatSearch || {});