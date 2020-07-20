(function(mw, $, factory){
    if ($('.fandom-slider-data').length && ['edit', 'history', 'submit'].indexOf(mw.config.get('wgAction') === -1)){
        $.when(
            $.getScript('http://dev.wikia.com/index.php?title=MediaWiki:Colors/code.js&action=raw&ctype=text/javascript'),
            $.getScript('http://dev.wikia.com/index.php?title=MediaWiki:WDSIcons/code.js&action=raw&ctype=text/javascript')
        ).done(function(){
            require(['fosl.wds'], function(wds){
                mw.hook('dev.colors').add(function(colors){
                    factory(mw, $, wds, colors);
                });
            });
        });
    }
}(this.mediaWiki, this.jQuery, function(mw, $, wds, colors){
    var slideshow = {};
    slideshow.init = function(){
        $.extend(this, {
            hasDescription: true,
            imageSize: {
                height: 300,
                width: 500
            },
            items: [],
            startIndex: 0
        }, arguments[0] || {});
        return this;
    };
    slideshow.init.prototype.loadIonicons = function(){
        var $ionicons = $('<link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" id="ionicons-css" />');
        $ionicons.on('load', function(event){
            if (event.target.href.indexOf('ionicons') > -1){
                console.log('Ionicons have been loaded!');
            }
        });
        if (!$('link#ionicons-css').length) $(document.head).append($ionicons);
    };
}));