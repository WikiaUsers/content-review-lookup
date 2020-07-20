window.Slideshow = (function(window, $, mw){
    var config = $.extend({}, window.slideshow);
    
    function val(){
        var args = [].slice.call(arguments),
            len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    }
    
    function Slideshow($elem, index){
        this.addDescription = val(config.addDescription, true);
        this.showDescription = val(config.showDescription, false);
        this.imageHeight = val(config.imageHeight, 500);
        this.imageWidth = val(config.imageWidth, 300);
        this.delay = val(config.delay, 100);
        this.$data = val(config.$elem, $elem);
        this.loadFromPage = val(!!Number(this.$data.data('load')), false);
        this.title = val(this.$data.data('title'), '');
        this.source = val(this.$data.data('source'), this.title, '');
        this.index = val(index, 0);
        this.fallback = val(config.fallback, '');
        this.defaultIndex = 0;
        this.currentIndex = this.defaultIndex;
        this.items = [];
    }
    
    Slideshow.prototype.loadItems = function(){
        var replace = val(arguments[0], false);
        if (this.loadFromPage && this.source){
            this.loadItemsFromPage($.proxy(this.parse, this), replace);
        } else {
            this.$data.find('.slide-data').each($.proxy(this.addItem, this));
        }
    };
    
    Slideshow.prototype.addItem = function(index, elem){
        var $target = $(elem), obj = {}, len = this.items.length;
        obj.title = val($target.data('title'), '');
        obj.link = val($target.data('link'), '');
        obj.fullurl = (new mw.Title(obj.link)).getUrl();
        obj.file = val($target.data('file-source'), '');
        obj.imgSrc = val($target.find('img').attr('src'), '');
        obj.description = val($target.html(), '');
        obj.index = 0;
        obj.show = obj.index == this.defaultIndex;
        this.items[len] = obj;
    };
    
    Slideshow.prototype.loadItemsFromPage = function(callback, replace){
        var Api = new mw.Api();
        if (typeof replace == 'boolean' && replace){
            this.params = {};
            this.params.action = 'query';
            this.params.format = 'json';
            this.params.prop = 'revisions';
            this.params.rvprop = 'content';
            this.params.titles = this.source;
            this.params.indexpageids = 1;
        } else {
            this.params = $.extend({}, this.params);
            this.params.action = val(this.params.action, 'query');
            this.params.format = val(this.params.format, 'json');
            this.params.prop = val(this.params.prop, 'revisions');
            this.params.rvprop = val(this.params.rvprop, 'content');
            this.params.titles = val(this.params.titles, this.source);
            this.params.indexpageids = val(this.params.indexpageids, 1);
        }
        Api.get(this.params).always(callback);
    };
    
    Slideshow.prototype.parse = function(response){
        var result = null, s = '',
            pages = response.query && response.query.pages,
            pageid = response.query && response.query.pageids[0];
        if (pages && pageid){
            var page = pages[pageid], rev = page.revisions;
            s = String(rev[0]['*'])
                .trim().replace(/\/\*[\s\S]*?\*\//g, '');
            try {
                result = JSON.parse(s);
            } catch (e){
                result = null;
            }
        }
        if (result === null) return;
        if (Array.isArray(result))
            this.items = result.map(function(obj, index){
                obj.index = index;
                return obj;
            });
        else
            this.items = Object.keys(result).map(function(key, index){
                var obj = result[key];
                obj.title = key;
                obj.index = index;
                obj.imgSrc = val(obj.imgSrc, '');
                return obj;
            });
    };
    
    Slideshow.prototype.create = function(){
        var len = this.items.length;
        this.$wrapper = $('<section>').addClass('slideshow-wrap')
            .attr('id', 'slideshow-wrap-'.concat(String(this.index)));
        this.$container = $('<div>').addClass('slideshow-inner');
        this.$list = $('<ul>').addClass('slideshow');
        // Slideshow items
        this.$items = this.items.map($.proxy(this.createItem, this));
        this.$list.html(this.$items);
        this.$container.html(this.$list);
        // Slideshow controls
        this.$controls = $('<nav>').addClass('slideshow-controls');
        this.$prev = $('<a>').addClass('slideshow-prev slideshow-button')
            .attr('href', '#').text('Prev')
            .on('click', $.proxy(this.prev, this));
        this.$count = $('<div>').addClass('slideshow-count');
        this.$next = $('<a>').addClass('slideshow-next slideshow-button')
            .attr('href', '#').text('Next')
            .on('click', $.proxy(this.next, this));
        this.$controls.html([this.$prev, this.$count, this.$next]);
        // Slideshow description
        this.$descriptionWrapper = $('<div>').addClass('slideshow-description-wrapper');
        this.$titleWrapper = $('<h2>').addClass('slideshow-title');
        this.$title = $('<span>').addClass('slideshow-title-text');
        this.$goto = $('<a>').addClass('slideshow-goto slideshow-button')
            .text('Go To Page');
        this.$descriptionToggle = $('<a>').addClass('slideshow-description-toggle slideshow-button').text('Hide')
            .attr('href', '#').on('click', $.proxy(this.toggle, this));
        this.$description = $('<p>').addClass('slideshow-description');
        this.$descriptionWrapper.html([this.$title, this.$description, this.$descriptionToggle]);
        this.$wrapper.html([this.$container, this.$controls, this.$descriptionWrapper]);
    };
    
    Slideshow.prototype.createItem = function(item){
        var $slide = $('<li>').addClass('slideshow-item slide'),
            $image = $('<img>').addClass('slideshow-image image');
        $image.attr({ 'src': item.imgSrc, 'alt': item.title })
            .css({ 'width': this.width, 'height': this.height });
        $slide.attr({ 
            'data-title': item.title,
            'data-link': item.link,
            'data-image-source': item.file,
            'data-index': item.index
        }).html($image);
        return $slide;
    };
    
    Slideshow.prototype.loadImages = function(){
        this.items.forEach($.proxy(function(item, index){
            var params = {}, Api = new mw.Api();
            params.action = 'query';
            params.format = 'json';
            params.prop = 'imageinfo';
            params.iiprop = 'url';
            params.titles = 'File:' + item.file;
            params.indexpageids = 1;
            Api.get(params).done($.proxy(function(response){
                var result = null,
                    pages = response.query && response.query.pages,
                    pageid = response.query && response.query.pageids[0];
                if (pages && pageid){
                    var page = pages[pageid], ii = page.imageinfo,
                        image = ii && ii[0].url;
                    if (image){
                        this.items[index].imgSrc = image;
                    } else {
                        this.items[index].imgSrc = this.fallback;
                    }
                } else {
                    this.items[index].imgSrc = this.fallback;
                }
            }, this));
        }, this));
    };
    
    Slideshow.prototype.toggle = function(event){
        event.preventDefault();
        var $target = $(event.delegateTarget);
        if (this.$description.is(':hidden')){
            this.$description.slideDown();
            $target.text('Hide');
        } else {
            this.$description.slideUp();
            $target.text('Show');
        }
    };
    
    Slideshow.prototype.prev = function(event){
        event.preventDefault();
        var currIndex = this.currentIndex, length = this.items.length,
            prevIndex = ((currIndex === 0) ? length : currIndex) - 1,
            slideObj = this.items[prevIndex];
        this.$list.find('.slideshow-item')
            .eq(currIndex).delay(this.delay)
            .animate({ 'opacity': 0, 'left': '-=' + String(this.width+200) + 'px' })
            .promise().done($.proxy(function(elem){
                var $activeSlide = $(elem);
                $activeSlide.removeClass('active');
                this.$list.find('.slideshow-item')
                    .eq(prevIndex).addClass('active')
                    .css('opacity', 1);
                this.$goto.attr('href', slideObj.fullurl);
                this.$count.html(String(prevIndex + 1) + ' of ' + length);
                this.$title.html(slideObj.title);
                if (this.addDescription){
                    this.$description.html(slideObj.description);
                }
            }, this));
        this.currentIndex = prevIndex;
    };
    
    Slideshow.prototype.next = function(event){
        event.preventDefault();
        var currIndex = this.currentIndex, length = this.items.length,
            lastIndex = length - 1, nextIndex = ((currIndex === lastIndex) ?
                0 : currIndex + 1),
            slideObj = this.items[nextIndex];
        this.$list.find('.slideshow-item')
            .eq(currIndex).delay(this.delay)
            .animate({ 'opacity': 0, 'left': '+=' + String(this.width+200) + 'px' })
            .promise().done($.proxy(function(elem){
                var $activeSlide = $(elem);
                $activeSlide.removeClass('active');
                this.$list.find('.slideshow-item')
                    .eq(nextIndex).addClass('active')
                    .css('opacity', 1);
                this.$count.html(String(nextIndex + 1) + ' of ' + length);
                this.$goto.attr('href', slideObj.fullurl);
                this.$title.html(slideObj.title);
                if (this.addDescription){
                    this.$description.html(slideObj.description);
                }
            }, this));
        this.currentIndex = nextIndex;
    };
    
    Slideshow.prototype.init = function(){
        var defIndex = this.defaultIndex,
            slideObj = this.items[defIndex],
            length = this.items.length;
        this.$list.find('.slideshow-item')
            .eq(defIndex).addClass('active');
        this.$count.html(String(defIndex + 1) + ' of ' + length);
        this.$goto.attr('href', slideObj.fullurl);
        this.$title.html(slideObj.title);
        if (this.addDescription){
            this.$description.html(slideObj.description);
        }
        this.currentIndex = defIndex;
        this.$data.replaceWith(this.$wrapper);
    };
    
    return Slideshow;
}(window, jQuery, mediaWiki));