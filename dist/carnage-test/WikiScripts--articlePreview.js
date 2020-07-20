;(function(mw, $, module){
    var mwVars = mw.config.get([
            'wgServer',
            'wgPageName',
            'wgNamespaceNumber',
            'wgArticlePath'
        ]),
        config = $.extend(module, {
            dbName: mwVars.wgServer.replace(/http:\/\/(.*)\.wikia\.com/g, '$1'),
            exceptions: ['.new', '.free', '.toc a', '.wikia-button', '.button a', '.wikia-menu-button a'],
            links: function(){
                return $('.mw-content-text a').filter(function(){
                    var isNormalLink = !$(this).is(config.exceptions.join(', '));
                    return isNormalLink;
                });
            },
            isCurrentServer: function(link){
                var link_regex = /http:\/\/(.*)\.wikia\.com\/(?:.*)/g,
                    link_dbname = link.replace(link_regex, '$1'),
                    value = null;
                if (link_dbname == config.dbName){
                    value = true;
                } else {
                    value = false;
                }
                return value;
            },
            shorten: function(fullurl){
                var link_regex = /http:\/\/(.*)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(fullurl))
                    return fullurl.replace(wgServer, '');
                else
                    return fullurl;
            },
            lengthen: function(url){
                var link_regex = /http:\/\/(.*)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(url))
                    return url;
                else
                    return wgServer + url;
            }
        });
 
    $(document).ready(function initialize(){
        importArticles({ type: 'script', articles: ['MediaWiki:ArticlePreview.css'] });
        var $links = config.links();
        $links.each(function bind(){
            var link = $(this).attr('href'),
                height = $(this).height(),
                link_l = config.lengthen(link),
                varr = /(?:.*)[?&](?:[a-z0-9])=(.*)/g,
                ns = ['Template', 'MediaWiki', 'Category', 'Forum'],
                nsr = new RegExp('http\:\/\/(?:.*)\.wikia\.com\/wiki\/(' + ns.join('|') + ')\:(?:.*)');
            if (varr.test(link) || !config.isCurrentServer(link_l) || nsr.test(link_l)) return;
            $(this).on('mouseover', function show(event){
                var offset = $(event.target).offset(),
                    $preview_wrapper = $('<section class="article-preview" id="article-preview" />'),
                    $header = $('<h2 class="preview-header" />').text($(event.target).text()),
                    $container = $('<div class="preview-container mw-content-text" />'),
                    $more_button = $('<a href="$link" class="see-more" />').text('See More'),
                    link_s = config.shorten(link_l);
                $more_button.attr('href', $more_button.attr('href').replace('$link', link_l));
                $.ajax({
                    method: 'GET',
                    dataType: 'json',
                    url: mw.util.wikiScript('api'),
                    data: {
                        page: link_s.replace('/wiki/', ''),
                        action: 'parse',
                        format: 'json'
                    }
                }).done(function add_preview(data){
                    var code = data.parse.text['*'];
                    $container.html(code);
                    $preview_wrapper.html([$header, $container, $more_button]).css({
                        'left': offset.left + 'px',
                        'top': (offset.top + height) + 'px'
                    });
                    if (!$('#article-preview').exists())
                        $('.WikiaSiteWrapper').append($preview_wrapper);
                });
            });
 
            $(this).on('mouseout', function hide(event){
                if ($('#article-preview').exists()){
                    $('#article-preview').remove();
                }
            });
        });
    });
})(this.mediaWiki, this.jQuery, (window.preview = window.preview || {}));