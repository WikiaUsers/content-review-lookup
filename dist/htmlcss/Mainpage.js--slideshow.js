function WikiSlideshow(selector, options){
    if (options === void 0) options = {};
    this.showDescription = options.showDescription || false;
    this.source = options.source;
    this.size = options.size || [500, 300]; // [width, height]
    this.selector = selector;
    this.loaded = $.Deferred();
    this.wdsLoaded = $.Deferred();
    this.colorsLoaded = $.Deferred();
    this.imagesLoaded = $.Deferred();
    this.currentIndex = options.index || 0;
    this.items = [];
    this.param = {};
    this.param.action = 'query';
    this.param.prop = 'info|revisions';
    this.param.intoken = 'edit';
    this.param.titles = 'MediaWiki:Custom-' + this.source + '.json';
    this.param.rvprop = 'content';
    this.param.rvlimit = '1';
    this.param.indexpageids = 'true';
    this.param.format = 'json';
    this.api = new mw.Api();
    this.load.call(this);
    $.when(
        this.wdsLoaded,
        this.colorsLoaded
    ).done($.proxy(this.getItems, this));
    $.when(this.loaded).done($.proxy(this.create, this));
}

WikiSlideshow.prototype = {
    constructor: WikiSlideshow,
    load: function(){
        mw.hook('dev.colors').add($.proxy(function(colors){
            this.colorsLoaded.resolve(colors);
        }, this));
        mw.hook('dev.wds').add($.proxy(function(wds){
            this.wdsLoaded.resolve(wds);
        }, this));
    },
    seek: function(index){
        var len = this.items.length, newIndex,
            currentIndex = this.currentIndex;
        if (typeof index === 'string'){
            var pattern = /([\-\+])([\d].?)/g;
            if (pattern.test(index)){
                newIndex = parseInt(
                    index.replace(pattern, function(match, sign, number){
                        if (sign === '-'){
                            return len - parseInt(number, 10);
                        } else if (sign === '+'){
                            return currentIndex + parseInt(number, 10);
                        } else return match;
                    })
                , 10);
                if (isNaN(newIndex)) return void 0;
            } else if (!isNaN(index)){
                newIndex = parseInt(index, 10);
            } else return void 0;
        } else if (typeof index === 'number'){
            if (!isFinite(index)) return;
            if (index < 0) newIndex = len - index;
            else newIndex = index;
        } else if (typeof index === 'function'){
            newIndex = index.apply(this, [len]);
            if (isNaN(newIndex)) return void 0;
        } else return void 0;
        this.currentIndex = newIndex;
        this.update.call(this);
    },
    prev: function(){
        this.seek.call(this, '-1');
    },
    next: function(){
        this.seek.call(this, '+1');
    },
    seekTo: function(index){
        if (index < 0) return;
        this.seek.call(this, index);
    },
    getItems: function(wds, colors){
        this.wds = wds;
        this.colors = colors;
        this.api.get(this.params)
            .always($.proxy(function(data){
                var result = '',
                    page = data.query.pages[data.query.pageids[0]],
                    revisions = page.revisions;
                if (revisions){
                    result = revisions[0]['*'];
                }
                this.createData(result);
            }, this));
    },
    createData: function(result){
        var json = this.parseData(result),
            items = this.jsonToArray(json, 'name');
        this.items = items;
        this.loaded.resolve();
    },
    jsonToArray: function(json, prop){
        var keys = Object.keys(json), index = 0, array = [];
        while ((key = keys[index])){
            var value = json[key];
            obj[prop] = value;
            array[array.length] = obj;
            index++;
        }
        return array;
    },
    parseData: function(result){
        var json = {};
        result = this.removeComments(result);
        try {
            json = JSON.parse(result);
        } catch (e){
        }
        return json;
    },
    removeComments: function(jsonString){
        var result = jsonString.trim()
            .replace(/\/\*[\s\S]*?\*\//mg, '') // Block comments
            .replace(/\/\/[\s\S]*?/g, ''); // Inline comments
        return result;
    },
    create: function(){
        var $slideshowElem = $('<section>').addClass('WikiSlideshow slideshow'),
            $slideshowInner = $('<div>').addClass('WikiSlideshowInner slideshow-inner'),
            $slideshowButtons = $('<nav>').addClass('WikiSlideshowButtons slideshow-buttons slideshow-arrows'),
            $slideshowDescription = $('<div>').addClass('WikiSlideshowDescription slideshow-description'),
            $slideshowCollection = $('<nav>').addClass('WikiSlideshowCollection slideshow-collection');
        $.when(this.imagesLoaded)
         .done($.proxy(function(){
            var $slideshowItems = this.items.map($.proxy(function(item){
                    var imageSrc = item.imageSrc,
                        title = item.name,
                        link = item.link || item.href || '#',
                        description = item.description || '',
                        $slideshowItemWrapper = $('<li>').addClass('WikiSlideshowItemWrapper slideshow-item__wrapper').css({ 
                            'width': this.size[0], 
                            'height': this.size[1] 
                        }),
                        $slideshowItem = $('<figure>').addClass('WikiSlideshowItem slideshow-item'),
                        $slideshowImage = $('<img>')
                            .attr({ 'src': imageSrc, 'alt': title })
                            .addClass('WikiSlideshowImage slideshow-image'),
                        $slideshowDescription, $slideshowItemHTML = [];
                    
                }, this)),
                $slideshowCollectionItems = this.items.map($.proxy(function(item){
                    
                }, this)),
                $slideshowContainer = $('<ul>').addClass('WikiSlideshowContainer slideshow-container');
            $slideshowContainer.html($slideshowItems);
            $slideshowCollection.html($slideshowCollectionItems);
         }, this));
    }
};