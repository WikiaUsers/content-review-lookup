/*jshint loopfunc: true*/
 
(function(mw, $, config){
    if (typeof mw.Api == 'undefined') mw.loader.load('mediawiki.api');
    mw.loader.load('http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
    var wikiSlider = $.extend(true, Object.create(null), config);
    wikiSlider.api = new mw.Api();
    wikiSlider.getType = function(value){
        var canonicalTypes = {
            'String': typeof value == 'string',
            'Array': typeof value == 'object' && Array.isArray(value),
            'Object': typeof value == 'object' && !Array.isArray(value),
            'Date': typeof value == 'object' && value instanceof Date,
            'Number': typeof value == 'number',
            'Boolean': typeof value == 'boolean',
            'RegExp': typeof value == 'object' && value instanceof RegExp,
            'Function': typeof value == 'function',
            'Undefined': typeof value == 'undefined',
        }, type = '';
        for (var t in canonicalTypes){
            var condition = canonicalTypes[t];
            if (condition){
                type = t;
                break;
            }
        }
        if (type === '') return 'Null';
        return type;
    };
    wikiSlider.sanitize = function(string){
        var re = [
                ['<script', '&lt;script'], ['</script>', '&lt;/script&gt;'],
                ['<style', '&lt;style'], ['</style>', '&lt;/style&gt;'],
                [/<link ([^>]+)\/>/g, '&lt;link $1&gt;'],
                [/<meta ([^>]+)\/>/g, '&lt;meta $1&gt;'],
            ];
        re.forEach(function(arr){
            var prev = arr[0],
                res = arr[1];
            string = string.replace(prev, res);
        });
        return string;
    };
    wikiSlider.isEmpty = function(value, res){
        res = res || void 0;
        var type = this.getType(value), bool;
        switch (type){
            case 'String':
                bool = value === '';
                break;
            case 'Array':
                bool = value.length === 0;
                break;
            case 'Object':
                for (var o in value){
                    bool = false;
                }
                if (typeof bool === 'undefined') bool = true;
                break;
            case 'Boolean':
                bool = value;
                break;
            case 'Number':
                bool = [0, NaN, Infinity].indexOf(value) > -1;
                break;
            case 'Undefined':
                bool = true;
                break;
            default:
                bool = null;
                break;
        }
        if (typeof res !== 'undefined'){
            if (bool === true){
                return res;
            }
        }
        return bool;
    };
    wikiSlider.has = function(prop, cb){
        cb = cb || void 0;
        var that = this;
        if (typeof prop == 'object' && Array.isArray(prop)){
            var obj = Object.create(null), keys = null;
            for (var p = 0, len = prop.length; p < len; p++){
                var key = prop[p], value = this[key];
                value = this.isEmpty(value, null);
                if (value === null) continue;
                obj[key] = value;
            }
            if (typeof cb == 'function'){
                keys = Object.keys(obj);
                keys.forEach(function(k){
                    var v = obj[k];
                    if (!that.isEmpty(v)){
                        cb.apply(that, [v]);
                    }
                });
            } else {
                keys = Object.keys(obj);
                keys.forEach(function(k){
                    var v = obj[k];
                    if (that.isEmpty(v)) obj[k] = false;
                    else obj[k] = true;
                });
                return obj;
            }
        } else if (typeof prop =='string'){
            return !that.isEmpty(v);
        }
    };
    wikiSlider.createElement = function(){
        var $slider = $('<section />', {
            'class': ['WikiSlider', 'wiki-slideshow', 'slideshow'].join(' '),
            'id': 'WikiSlider',
            html: [
                $('<a />', { 'class': 'wiki-slideshow-arrow arrow-left', 'href': '#WikiSlideshow', on: { 'click': this.changeSliderItem('left') }, html: '<i class="icon ion-chevron-left"></i>' }),
                $('<ul />', { 'class': 'WikiSliderContent wiki-slideshow-content slideshow-content', 'id': 'WikiSliderContent' }),
                $('<a />', { 'class': 'wiki-slideshow-arrow arrow-right', 'href': '#WikiSlideshow', on: { 'click': this.changeSliderItem('right') }, html: '<i class="icon ion-chevron-right"></i>' })
            ]
        });
        return $slider;
    };
    wikiSlider.changeSliderItem = function(pos){
        if (pos instanceof jQuery){
            if (pos.parentsUntil('#WikiSlider #WikiSliderContent').length > 0){
                var width = pos.width();
            }
        } else {
            if (pos === 'left'){
                
            }
        }
    };
    wikiSlider.createSliderContent = function($slider){
        var that = this;
        this.api.get({
            'action': 'query',
            'titles': 'MediaWiki:Custom-SliderContent',
            'prop': 'info|revisions',
            'intoken': 'edit',
            'rvprop': 'content',
            'rvlimit': '1',
            'indexpageids': 'true',
            'format': 'json'
        }, function(response){
            var page = response.query.pages[response.query.pageids[0]],
                pageExists = response.query.pages['-1'] ? false : true,
                content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '';
            if (pageExists){
                content = content.split(/\n/g);
                content.forEach(function(item, index){
                    var item_arr = item.split('|'),
                        image_name = item_arr[0],
                        title = item_arr[1],
                        description = item_arr[2] || '';
                    that.api.get({
                        'action': 'query',
                        'titles': image_name,
                        'iiprop': 'url',
                        'prop': 'imageinfo',
                        'indexpageids': 'true',
                        'format': 'json'
                    }, function(data){
                        var p = data.query.pages[data.query.pageids[0]],
                            pe = data.query.pages['-1'] ? false : true,
                            imageinfo = p.imageinfo[0],
                            imgurl = imageinfo.url,
                            $item = pe ? $('<li />', {
                                'class': 'WikiSliderItem slideshow-item',
                                'id': 'slideshow-item-' + index,
                                html: $('<figure />', {
                                    'class': 'WikiSliderItemWrapper slideshow-item-wrapper',
                                    html: [
                                        $('<img />', {
                                            'class': 'WikiSliderImage slideshow-image',
                                            'alt': that.sanitize(title),
                                            'src': imgurl || ''
                                        }),
                                        $('<figcaption />', {
                                            'class': 'WikiSliderDescriptionWrapper slideshow-description-wrapper',
                                            html: [
                                                $('<h3 />', {
                                                    'class': 'WikiSliderTitle slideshow-title',
                                                    html: that.sanitize(title)
                                                }),
                                                $('<p />', {
                                                    'class': 'WikiSliderDescription slideshow-description',
                                                    html: that.sanitize(description)
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }) : '';
                        if ($item !== ''){
                            $slider.find('ul#WikiSliderContent').append($item);
                        }
                    });
                });
            }
        });
    };
    wikiSlider.init = function(){
        var element = this.createElement();
        this.createSliderContent(element);
        if ($('.mw-content-text div.slider-wrapper').length){
            $('.mw-content-text div.slider-wrapper').replaceWith(element);
        }
    };
 
    $(document).ready($.proxy(wikiSlider.init, wikiSlider));
    window.WikiSliderObj = wikiSlider;
}(this.mediaWiki, this.jQuery, typeof this.WikiSlider == 'object' ? this.WikiSlider : {}));