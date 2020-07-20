;(function(mw, $, module){
    importArticles({
        type: 'style',
        articles: [
            'u:dev:ArticlePreview/code2.css'
        ]
    }, {
        type: 'script',
        articles: [
            'u:dev:Colors/code.js'
        ]
    });
    
    mw.hook('dev.colors').add(function(colors){
        // To be announced
    });
    
    var mwVars = mw.config.get([
            'wgServer',
            'wgPageName',
            'wgArticlePath',
            'wgUserGroups'
        ]),
        config = $.extend(module, {
            version: '2.0.0',
            subdomain: mwVars.wgServer.replace(/http(?:s|):\/\/(.*)\.wikia\.com/g, '$1'),
            exceptions: ['.free', '.toc a', '.wikia-button', '.wikia-menu-button a'],
            collapsed: true,
            getLinks: function(){
                return $('.mw-content-text a, #WikiaRail .module a, #WikiaRail .rail-module a').filter(function(index){
                    var isException = $(this).is(config.exceptions.join(', '));
                    return !isException;
                });
            },
            isCurrentServer: function(link){
                var link_regex = /http(?:s|):\/\/(.*)\.wikia\.com\/(?:.*)/g,
                    link_subdomain = link.replace(link_regex, '$1'),
                    value = null;
                if (link_subdomain == config.subdomain){
                    value = false;
                } else {
                    value = true;
                }
                return value;
            },
            shorten: function(url){
                var link_regex = /http(?:s|):\/\/(.*)\.wikia\.com\/(?:.*)/g;
                url = decodeURIComponent(url);
                if (link_regex.test(url))
                    return url.replace(mwVars.wgServer, '');
                else
                    return url;
            },
            lengthen: function(url){
                var link_regex = /http(?:s|):\/\/(.*)\.wikia\.com\/(?:.*)/g;
                url = decodeURIComponent(url);
                if (link_regex.test(url))
                    return url;
                else
                    return wgServer + url;
            }
        });
    
    $(document).ready(function(){
        var $links = config.getLinks();
        $links.each(function bind(){
            var _link = $(this).attr('href'),
                link = _link.replace(/[?&](?:[a-z0-9])=(.*)/g, ''),
                height = $(this).height(),
                fullurl = config.lengthen(link),
                _domain = fullurl.replace(_var, ''),
                _var = /[?&](?:[a-z0-9])=(.*)/g;
            if (!config.isCurrentServer(_domain)) return;
            $(this).on('mouseover', function(event){
                if (event.target){
                    var offset = $(event.target).offset(),
                        isNew = $(event.target).hasClass('new'),
                        $preview_wrapper = $('<section class="ArticlePreview article-preview preview-box" id="article-preview" />'),
                        $preview = $('<div class="preview preview-wrapper" id="article-preview-wrapper" />'),
                        $preview_arrow = $('<a href="#article-preview" class="preview-arrow" id="preview-arrow" />'),
                        $preview_container = $('<figure class="ArticlePreviewContainer preview-container" id="preview-container" />'),
                        $preview_toolbar = $('<nav class="ArticlePreviewTools ArticlePreviewToolbar preview-toolbar" id="preview-container" />'),
                        shorturl = config.shorten(fullurl),
                        buttons = {
                            'Edit': {
                                icon: 'ion-edit',
                                link: fullurl + '?action=edit',
                                condition: isNew === false
                            },
                            'Create': {
                                icon: 'ion-plus',
                                link: fullurl + '?action=edit&source=redlink',
                                condition: isNew === true
                            },
                            'Delete': {
                                icon: 'ion-trash-a',
                                link: fullurl + '?action=delete',
                                condition: Array.prototype.some.call(wgUserGroups, function(group){
                                    return ['sysop', 'bureaucrat', 'vstf', 'helper', 'staff'].indexOf(group) > -1;
                                })
                            },
                            'History': {
                                icon: 'ion-archive',
                                link: fullurl + '?action=history'
                            },
                            'Go To Page': {
                                icon: 'ion-arrow-right-a',
                                link: fullurl
                            }
                        };
                    
                    $preview_arrow.html(function(){
                        if (config.collapsed){
                            $preview_container.addClass('collapsed').css('top', (-$container.height() - 20) + 'px').hide();
                            return $('<i class="icon ion-chevron-down" />');
                        } else {
                            return $('<i class="icon ion-chevron-up" />');
                        }
                    }).on('click', function(event){
                        var $container = $('#preview-container');
                        if ($container.hasClass('collapsed')){
                            $container.removeClass('collapsed').animate({
                                'top': (-$container.height() - 20) + 'px'
                            }, 500).fadeOut();
                        } else {
                            $container.addClass('collapsed').animate({
                                'top': '0'
                            }, 500).fadeIn();
                        }
                    });
                    
                    $.ajax({
                        method: 'GET',
                        dataType: 'json',
                        url: mw.util.wikiScript('api'),
                        data: {
                            page: shorturl.replace('/wiki/', ''),
                            action: 'parse',
                            format: 'json'
                        }
                    }).done(function(result){
                        var code = result.parse.text['*'],
                            $header = $('<h2 class="preview-heading" />').text(shorturl.replace('/wiki/', '').replace('_', ' ')),
                            image_src = $(code).find('img').eq(0).attr('src') || 'https://vignette.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png/revision/latest?cb=20170506185541',
                            $image = $('<img class="preview-image" id="preview-image" />').attr('src', image_src),
                            is_data_image = /data:image\/(.*)/g,
                            paragraph = $(code).find('> p').eq(0).html(),
                            $description = $('<figcaption class="preview-description" />').html(paragraph);
                            
                        if (is_data_image){
                          	image_src = 'https://vignette.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png/revision/latest?cb=20170506185541';
                        }
                      
                        $preview_toolbar.html(Object.keys(buttons).map(function(name, index){
                            var button_config = buttons[name],
                                $button = $('<a class="toolbar-button preview-button" />'),
                                condition = button_config.condition,
                                link = button_config.link,
                                icon = button_config.icon;
                            if (typeof condition !== 'undefined'){
                                if (condition === true){
                                    $button.attr('href', link.replace('<page>', fullurl));
                                    $button.html(name + ' <i class="icon ' + icon + '"></i>');
                                    return $button;
                                }
                            } else {
                                $button.attr('href', link.replace('<page>', fullurl));
                                $button.html(name + ' <i class="icon ' + icon + '"></i>');
                                return $button;
                            }
                        }));
                        
                        $preview_container.html([$header, $image, $description]);
                        $preview.html([$preview_arrow, $preview_container, $preview_toolbar]);
                        
                        $preview_wrapper.html($preview).css({
                            'left': offset.left + 'px',
                            'top': (offset.top + height) + 'px'
                        });
                        
                        if (!$('#article-preview').exists()){
                            $('.WikiaSiteWrapper').append($preview_wrapper);
                        }
                    }).fail(function(error){
                        var image_src = 'https://vignette.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png/revision/latest?cb=20170506185541',
                            $image = $('<img class="preview-image" id="preview-image />').attr('src', image_src),
                            paragraph = 'Error: Either this page has not been found or the page could not be fetched.',
                            $description = $('<figcaption class="preview-description" />').html(paragraph),
                            $header = $('<h2 class="preview-heading" />').text(shorturl.replace('/wiki/', '').replace('_', ' '));
                        $preview_toolbar.html(Object.keys(config.buttons).map(function(name, index){
                            var button_config = config.buttons[name],
                                $button = $('<a class="toolbar-button preview-button" />'),
                                condition = button_config.condition,
                                link = button_config.link,
                                icon = button_config.icon;
                            if (typeof condition !== 'undefined'){
                                if (condition === true){
                                    $button.attr('href', link.replace('<page>', fullurl));
                                    $button.html(name + ' <i class="icon ' + icon + '"></i>');
                                    return $button;
                                }
                            } else {
                                $button.attr('href', link.replace('<page>', fullurl));
                                $button.html(name + ' <i class="icon ' + icon + '"></i>');
                                return $button;
                            }
                        }));
                        
                        $preview_container.html([$header, $image, $description]);
                        
                        $preview.html([$preview_arrow, $preview_container, $preview_toolbar]);
                        
                        $preview_wrapper.html($preview).css({
                            'left': offset.left + 'px',
                            'top': (offset.top + height) + 'px'
                        });
                        
                        if (!$('.preview-box').exists()){
                            $('.WikiaSiteWrapper').append($preview_wrapper);
                        }
                        
                        throw new Error(error);
                    });
                }
            });
            
            $(document.body).on('click', '*', function(event){
                var elem = '#article-preview, #article-preview *';
                if (!$(event.target).is(elem)){
                    if ($('#article-preview').exists()){
                        $('#article-preview').remove();
                    }
                }
            });
        });
    });
})(this.mediaWiki, this.jQuery, this.ArticlePreview = window.ArticlePreview || {});