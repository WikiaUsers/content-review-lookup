;(function(mw, $, module, preview_css, preview_colors){
    importArticles({
        type: 'script',
        articles: [
            'u:dev:Colors/code.js'
        ]
    }, {
        type: 'style',
        articles: [
            'u:dev:ArticlePreview/code.2.css'
        ]
    });
    
    mw.hook('dev.colors').add(function(colors){
        var css_ = {
                '#ArticlePreview .preview-chevron .chevron': {
                    'border-left': '7px solid transparent',
                    'border-right': '7px solid transparent',
                    'border-bottom': '7px solid $menu'
                },
                '#ArticlePreview .preview-wrapper': {
                    'background-color': '$menu'
                },
                '#ArticlePreview .preview-header': {
                    'border-bottom': '2px solid $header',
                    'color': '$header'
                },
                '#ArticlePreview .preview-buttons .preview-button': {
                    'color': '$link'
                },
                '#ArticlePreview .preview-buttons .preview-button:hover': {
                    'color': '$hoverlink',
                    'background-color': '$hoverbg'
                }
            },
            _colors = {
                hoverlink: (function(colors){
                    var link = colors.wikia.link,
                        parsed = colors.parse(link),
                        res = parsed.lighten(5),
                        hex = res.hex();
                    return hex;
                })(colors),
                hoverbg: (function(colors){
                    var menu = colors.wikia.menu,
                        parsed = colors.parse(menu),
                        res = parsed.lighten(-6),
                        hex = res.hex();
                    return hex;
                })(colors)
            };
        
        css_ = $.extend(preview_css, css_);
        _colors = $.extend(preview_colors, _colors);
        
        function createCSS(obj){
            var css = '',
                css_arr = Object.keys(obj).map(function(selector){
                    var css_res = selector + ' {\n';
                    var properties = obj[selector];
                    Object.keys(properties).forEach(function(property){
                        var value = properties[property];
                        if (typeof value == 'function'){
                            value = Function.prototype.apply.call(value, window, [properties]);
                        }
                        css_res += '\t' + property + ': ' + value + ';\n';
                    });
                    css_res += '}';
                    return css_res;
                });
            css = css_arr.join('\n\n');
            return css;
        }
        
        var final_css = createCSS(css_);
        colors.css(final_css, {
            'hoverlink': _colors.hoverlink,
            'hoverbg': _colors.hoverbg
        });
    });
    
    var mwConfig = mw.config.get([
            'wgArticlePath',
            'wgPageName',
            'wgUserGroups',
            'wgServer',
            'skin'
        ]),
        config = $.extend(module, {
            version: '2.0.0',
            site_name: mwConfig.wgServer.replace(/https?:\/\/(.+)\.(?:wikia|fandom)\.(?:com|org)/g, '$1'),
            get_links: function(exceptions){
                var all_links = $('#WikiaRail .module a, #WikiaRail .rail-module a, .mw-content-text a');
                if (typeof exceptions !== 'undefined' && exceptions instanceof Array){
                    return all_links.filter(function(index){
                        return !$(this).is(exceptions.join(', '));
                    });
                } else {
                    return all_links;
                }
            },
            is_current_site: function(url){
                var url_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g,
                    site_name = url.replace(url_regex, '$1'),
                    value = null;
                if (site_name == config.site_name){
                    value = true;
                } else {
                    value = false;
                }
                return value;
            },
            shorten: function(fullurl){
                var link_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(fullurl))
                    return fullurl.replace(mwConfig.wgServer, '');
                else
                    return fullurl;
            },
            lengthen: function(url){
                var link_regex = /^https?:\/\/(.+)\.wikia\.com\/(?:.*)/g;
                if (link_regex.test(url))
                    return url;
                else
                    return mwConfig.wgServer + url;
            },
            buttons: {
                'Edit': {
                    icon: 'ion-edit',
                    id: 'preview-edit',
                    action: '$link?action=edit'
                },
                'History': {
                    icon: 'ion-clock',
                    id: 'preview-history',
                    action: '$link?action=history'
                },
                'Delete': {
                    icon: 'ion-trash-b',
                    id: 'preview-delete',
                    action: '$link?action=delete',
                    condition: Array.prototype.some.call(mwConfig.wgUserGroups, function(group){
                        return ['sysop', 'bureaucrat', 'soap', 'helper', 'staff', 'wiki-representative', 'wiki-specialist', 'content-volunteer'].indexOf(group) > -1;
                    })
                }
            }
        });
    
    function show_preview(long_link, height, $elem){
        return function bind(event){
            var offset = $(event.target).offset(),
                _isnew = $(event.target).hasClass('new'),
                $wrapper = $('<section class="article-preview wrapper v2" id="article-preview2" />'),
                $body = $('<div class="article-preview-body" id="article-preview-body" />'),
                $header = $('<header class="article-preview-header header" id="article-preview-header" />'),
                $content = $('<article class="article-preview-content content" id="article-preview-content" />'),
                $tools = $('<nav class="article-preview-toolbar article-preview-footer toolbar" id="preview-toolbar" />'),
                short_link = config.shorten(long_link);
                
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.util.wikiScript('api'),
                data: {
                    page:
                        decodeURIComponent(short_link
                            .replace('/wiki/', '')
                            .replace('_', ' ')
                            .replace(/[?&](?:[a-z0-9])=(.*)/g, '')),
                    action: 'parse',
                    format: 'json'
                }
            }).done(function(data){
                var code = data.parse.text['*'],
                    $code = $(code),
                    $img = $code.find('img'),
                    data_image = /data:image\/(?:.*)/g.test($img.attr('src')),
                    image = $img.not(function(){
                        return (/data:image\/(?:.*)/g).test($(this).attr('src'));
                    }).eq(0).attr('src') || 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png',
                    $image = $('<img class="article-preview-thumb article-preview-image image" id="article-preview-image" />').attr('src', image),
                    paragraph = $code.find('p').not(function(){
                        return $(this).attr('class') !== '';
                    }).eq(0).html(),
                    $description = $('<figcaption class="article-preview-description description" id="article-preview-description" />').html(paragraph);
                if (data_image){
                    image = 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png';
                }
                
                if (_isnew){
                    image = 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png';
                    $description.html('This page does not exist yet. Do you want to create the page?');
                }
                
                var $thumb = $('<figure class="article-preview-thumb-wrapper figure" />').html([$image, $description]);
                
                $header.html(
                    '<h2 class="article-preview-heading heading">' +
                    decodeURIComponent(short_link
                            .replace('/wiki/', '')
                            .replace('_', ' ')
                            .replace(/[?&](?:[a-z0-9])=(.*)/g, ''))
                    + '</h2>'
                );
                
                $content.html($thumb);
                
                $tools.html(function(){
                    var buttons = config.buttons;
                    return Object.keys(buttons).map(function(name, index){
                        var button_config = buttons[name],
                            $button = $('<a class="article-preview-button preview-button" />');
                        $button.attr('id', button_config.id);
                        $button.attr('data-name', name);
                        if (typeof button_config.action == 'function'){
                            $button.href('#article-preview2');
                            $button.on('click', function(event){
                                event.preventDefault();
                                Function.prototype.apply.call(button_config.action, window, [event]);
                            });
                        } else if (typeof button_config.action == 'string'){
                            var _link_ = decodeURIComponent(short_link
                            .replace(/[?&](?:[a-z0-9])=(.*)/g, ''));
                            $button.href(button_config.action.replace('$link', _link_));
                        }
                        $button.html(
                            '<span class="button-name">' + name + '</span>' + 
                            '<i class="icon ' + button_config.icon + '"></i>'
                        );
                        return $button;
                    });
                });
                
                $body.html([$header, $content, $tools]);
                
                $wrapper.html($body).css({
                    'left': offset.left + 'px',
                    'top': (offset.top + height) + 'px'
                });
                
                if (!$('#article-preview').exists())
                    $('.WikiaSiteWrapper').append($wrapper);
            });
        };
    }
    
    function initialize(){
        var $links = config.get_links();
        if ($links.length){
            $links.each(function(){
                var _link = $(this).attr('href'),
                    height = $(this).height(),
                    long = config.lengthen(_link);
                _link = decodeURIComponent(_link);
                if (config.is_current_site(long)) return;
                $(this).on('mouseover', show_preview(long, height, $(this)));
                $(window).on('click', function(event){
                    var $target = $(event.target),
                        within_preview = $target.is('#article-preview, #article-preview *');
                    if (within_preview) return;
                    
                    if ($('#article-preview').length)
                        $('#article-preview').remove();
                });
            });
        }
    }
    
    $(document).ready(initialize);
})(
    this.mediaWiki,
    this.jQuery,
    this.ArticlePreview = this.ArticlePreview || {},
    this.PreviewCSS = this.PreviewCSS || {},
    this.PreviewColors = this.PreviewColors || {}
);