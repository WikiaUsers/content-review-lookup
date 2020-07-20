(function($, mw, $content){
    var MainPage = new Object(null);
    MainPage.UI = new Object(null);
    // Slideshow
    MainPage.UI.Slideshow = function($target){
        var dimensions = $target.attr('data-dimensions'),
            dimensions_arr = dimensions.indexOf('x', 0) > -1 ? dimensions.split('x') : [dimensions, dimensions];
        dimensions_arr = dimensions_arr.map(function(value, index){
            if (isNaN(value)){
                if (index === 0) return 500;
                else if (index === 1) return 300;
            } else return parseInt(value, 10);
        });
        this.title = $target.attr('data-title');
        this.dimensions = dimensions;
        this.id = $target.attr('data-id');
        this.theme = $target.attr('data-theme');
        this.$items = $target.find('.slideshow-items');
        this.$target = $target;
        this.autoRun = $target.attr('data-autorun') === "true";
        this.createHTML();
        return this;
    };
    
    MainPage.UI.Slideshow.prototype.createHTML = function(){
        var $html = $('<section />', { 'class': 'MainPageSlideshow slideshow', 'id': this.id });
        if (this.theme && this.theme !== ''){
            var classes = this.theme.split(/\s+/g);
            classes = classes.map(function(cn){
                return 'slideshow-theme-' + cn;
            }).join(' ');
            $html.addClass(classes);
        }
        this.$element = $html;
        return this;
    };
    
    MainPage.UI.Slideshow.prototype.createItems = function($li){
        var settings = {
                title: $li.find('span.slideshow-title').text(),
                id: $li.attr('data-id'),
                image: $li.attr('data-image'),
                description: $li.find('p.slideshow-description').html(),
                link: $li.attr('data-location') || $li.attr('data-href') || $li.attr('data-link')
            }, $html = $('<li />', { 'class': 'MainPageSlideshowItem slideshow-item', 'id': settings.id, 'data-title': settings.title });
        $html.html($('<figure />', {
            'class': 'MainPageSlideshowItemWrapper slideshow-item-wrapper',
            'data-image-source': settings.image,
            html: function(){
                var _html = [
                    $('<img />', { 'class': 'MainPageSlideshowImage slideshow-image', 'alt': settings.title })
                ];
                
                if (settings.description && settings.description !== ''){
                    _html = _html.concat($('<figcaption />', {
                        'class': 'MainPageSlideshowDescription slideshow-description',
                        html: function(){
                            var item_html = [];
                            if (settings.title && settings.title !== ''){
                                item_html = item_html.concat($('<h3 />', {
                                    'class': 'MainPageSlideshowTitle slideshow-title',
                                    text: settings.title,
                                }));
                            }
                            item_html = item_html.concat($('<blockquote />', {
                                'class': 'MainPageSlideshowDescriptionText slideshow-description-text',
                                html: settings.description
                            }));
                            if (settings.link && settings.link !== ''){
                                item_html = item_html.concat($('<a />', {
                                    'href': settings.link,
                                    'class': 'slideshow-see-more see-more',
                                    text: 'See More',
                                }));
                            }
                            return item_html;
                        }
                    }));
                }
                
                return _html;
            }
        }));
        return $html;
    };
    
    MainPage.UI.Slideshow.prototype.loadImage = function($elem, image){
        return new Promise(function(resolve, reject){
            var API = new mw.Api();
            API.get({
                'action': 'query',
                'titles': image,
                'prop': 'imageinfo',
                'iiprop': 'url',
                'indexpageids': '1',
                'format': 'json'
            }).done(function(data){
                if (!data.error){
                    var pageid = data.query.pageids[0],
                        page = data.query.pages[pageid];
                    if (page.imageinfo && page.imageinfo.length){
                        var image = page.imageinfo[0],
                            image_url = image.url;
                        resolve(image_url, $elem);
                    }
                } else reject();
            });
        });
    };
    
    MainPage.UI.Slideshow.prototype.addItems = function(){
        var $items = this.$items,
            $items_html = $('<nav />', { 'class': 'MainPageSlideshowWrapper slideshow-wrapper' }),
            $ul = $('<ul />', { 'class': 'MainPageSlideshowItems slideshow-items'});
        $items.each($.proxy(function(index, element){
            var $li = $(element),
                $html = this.createItems($li);
            $ul.append($html);
        }, this));
        $items_html.html($ul);
        if (!this.$element.has('.slideshow-wrapper')){
            this.$element.append($items_html);
        }
        return this;
    };
    
    MainPage.UI.Slideshow.prototype.init = function(){
        this.addItems();
        var $element = this.$element, that = this;
        $element.find('.slideshow-item-wrapper').each(function(){
            var $wrapper = $(this),
                image_source = $wrapper.attr('data-image-source'),
                $image = $wrapper.find('.slideshow-image');
            that.loadImage($image, image_source).then(function(image_src, $elem){
               $elem.attr('src', image_src); 
            });
        });
        $element.css({ 'width': this.dimensions[0], 'height': this.dimensions[1] });
        this.$target.replaceWith($element);
    };
    
    $content.find('.slideshow-data').each(function(){
        var slideshow = new MainPage.UI.Slideshow($(this));
        slideshow.init();
    });
}(jQuery, mediaWiki, jQuery('#mw-content-text')));