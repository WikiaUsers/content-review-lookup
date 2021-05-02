/**
 * ArticlePreview v1.0.1
 * - Allows a user to see a preview of an article by hovering on a local link
 * - Allows a user to go to a page by clicking on the link
 *
 * Updates:
 * - Version 1.0.1
 * -- Allows a user to create a new page if it does not exist
 * - Version 1.1
 * -- Added support to default colors
 * - Version 1.1.1
 * -- Minor fixes for UCP - HumansCanWinElves
 *
 * @author Ultimate Dark Carnage
 **/

// Used files: [[File:Image_Placeholder.png]]

;(function(mw, $, module){
    // Importing the required stylesheet
    importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:ArticlePreview.css'
        ]
    }, {
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Colors/code.js'
        ]
    });
    // Creating default CSS for the module
    mw.hook('dev.colors').add(function(colors){
        var offset = $('.article-preview').offset(),
            _css_ =
            '.article-preview { \
                background-color: $menu; \
                border: 1px solid $border; \
                box-shadow: $shadow; \
            } \
            .article-preview .mw-content-text h2 { \
                border-bottom: 2px solid $header; \
            } \
            .article-preview .see-more { \
                color: $more_link; \
            }';
        colors.css(_css_, {
            'shadow': (function(){
                var border = colors.wikia.border,
                    parsed = colors.parse(border),
                    res = parsed.lighten(5);
                return res.hex();
            })(),
            'more_link': (function(){
                var link = colors.wikia.link,
                    parsed = colors.parse(link),
                    res = parsed.lighten(8);
                return res.hex();
            })()
        });
    });
    // Setting MediaWiki variables
    var mwVars = mw.config.get([
            'wgServer', // host (server) name
            'wgPageName', // page name
            'wgNamespaceNumber', // namespace number
            'wgArticlePath' // article path
        ]),
        // Setting default configurations for the module
        config = $.extend(module, {
            version: '1.0.1 beta',
            // Create the database name from host
            dbName: mwVars.wgServer.replace(/https?:\/\/(.+)\.(?:wikia|fandom)\.(?:com|org)/g, '$1'),
            // Array of selectors that will be excluded
            exceptions: ['.free', '.toc a', '.wikia-button', '.button a', '.wikia-menu-button a'],
            // Get all links that are not excluded
            // @returns jQuery object
            links: function(){
                return $('#WikiaRail .module a, #WikiaRail .rail-module a, #mw-content-text a').filter(function(){
                    var isNormalLink = !$(this).is(config.exceptions.join(', '));
                    return isNormalLink;
                });
            },
            // Check if the database name of the link matches the
            // database name of the current wiki
            // @returns Boolean
            isCurrentServer: function(link){
                var link_regex = /https?:\/\/(.+)\.(?:wikia|fandom)\.(?:com|org)\/(?:.*)/g,
                    link_dbname = link.replace(link_regex, '$1'),
                    value = null;
                if (link_dbname == config.dbName){
                    value = true;
                } else {
                    value = false;
                }
                return value;
            },
            // Shortens the URL
            // @returns String
            shorten: function(fullurl){
                var link_regex = /https?:\/\/(.+)\.(?:wikia|fandom)\.(?:com|org)\/(?:.*)/g;
                if (link_regex.test(fullurl))
                    return fullurl.replace(wgServer, '');
                else
                    return fullurl;
            },
            // Lengthens the URL
            // @returns String
            lengthen: function(url){
                var link_regex = /https?:\/\/(.+)\.(?:wikia|fandom)\.(?:com|org)\/(?:.*)/g;
                if (link_regex.test(url))
                    return url;
                else
                    return wgServer + url;
            }
        });

    $(document).ready(function initialize(){
        // Setting a variable for the links that will have a mouse event
        var $links = config.links();
        // Binding all links
        $links.each(function bind(){
            // returns a hyperlink
            var link = $(this).attr('href'),
                // returns the element's height
                height = $(this).height(),
                // lengthens the hyperlink
                link_l = config.lengthen(link),
                // regex to check if the link contains a url variable
                varr = /(?:.*)[?&](?:[a-z0-9])=(.*)/g,
                // namespaces to be excluded
                ns = ['Template', 'MediaWiki', 'Category', 'Forum'],
                // regex for the excluded namespaces
                nsr = new RegExp('http\:\\/\\/(?:.*)\\.(?:wikia|fandom)\.(?:com|org)\/wiki\/(' + ns.join('|') + ')\:(?:.*)');
            // if the link has a url variable, an excluded namespace, or is not local, do not run
            if (varr.test(link) || !config.isCurrentServer(link_l) || nsr.test(link_l)) return;
            // otherwise, bind the element with a "mouseover" event to add the module
            $(this).on('mouseover', function show(event){
                var offset = $(event.target).offset(), // returns the link's offset
                    isNew = $(event.target).hasClass('new'), // checks to see if the link is new
                    $preview_wrapper = $('<section class="article-preview" id="article-preview" />'), // article preview module
                    $header = $('<h2 class="preview-header" />').text($(event.target).text()), // article preview header
                    $container = $('<div class="preview-container mw-content-text" />'), // article preview container
                    $more_button = $('<a href="$link" class="see-more" />').text('See More'), // see more link
                    link_s = config.shorten(link_l); // shorten long url
                $more_button.attr('href', $more_button.attr('href').replace('$link', link_l)); // replace the "$link" variable with the long link
                // ...then run the AJAX request
                $.ajax({
                    method: 'GET',
                    dataType: 'json',
                    url: mw.util.wikiScript('api'),
                    data: {
                        page: decodeURIComponent(link_s.replace('/wiki/', '')), // remove the "/wiki/" from the short link
                        action: 'parse',
                        format: 'json'
                    }
                }).done(function add_preview(data){
                    // parse HTML from the page
                    if (!data || data.error) return;
                    var code = data.parse.text['*'],
                        // Find the source of the first image
                        image_src = $(code).find('img').eq(0).attr('src') || 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png',
                        is_data_image = /data:image\/(.*)/g.test(image_src);
                        $image = $('<img class="preview-image" />').attr('src', image_src),
                        paragraph = $(code).find('p').eq(0).html(),
                        $description = $('<p class="preview-description" />').html(paragraph);

                    if (is_data_image){
                        // The 'data:image' source has been found not to look good on the preview. Therefore, it will be replaced by the default image.
                        image_src ='https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png';
                    }

                    // If this is a redlink, change the configurations
                    if (isNew){
                        image_src = 'https://images.wikia.nocookie.net/dev/images/2/20/Image_Placeholder.png';
                        $description.html('This page does not exist yet. Do you want to create the page?');
                        $more_button.attr('href', $more_button.attr('href') + '?action=edit');
                        $more_button.text('Create Page');
                    }

                    $container.html([$image, $description]); // apply HTML to the container
                    // apply all parts of the module and set the position of the module
                    $preview_wrapper.html([$header, $container, $more_button]).css({
                        'left': offset.left + 'px',
                        'top': (offset.top + height) + 'px'
                    });
                    // prevent the module from appending twice
                    if (!$('#article-preview').length)
                        $('.WikiaSiteWrapper').append($preview_wrapper);
                });
            });
            // ...then create a "mouseout" to remove the module
            $(this).on('mouseout', function hide(event){
                if ($('#article-preview').length){
                    $('#article-preview').remove();
                }
            });
        });
    });
})(this.mediaWiki, this.jQuery, (window.preview = window.preview || {}));