/**
 * @module          main-page
 * @description     Allows the main page to be fully functional
 * @version         1.2
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA
 **/
 
(function($, mw, window){
    function MainPageSlideshow($element){
        this.$slideshow = $element;
        this.$items = [];
        this.slideshowMax = parseInt($element.attr('data-max')) || 5;
        this.slideshowSrc = (typeof $element.attr('data-source') == 'undefined') ? $element.attr('data-source') : '';
        this.isAjax = (this.slideshowSrc !== '') ? true : false;
        this.id = $element.attr('data-id');
        return this;
    }
    
    MainPageSlideshow.prototype.stripComments = function(json){
        var result = json.trim(), patterns = [/\/\/[^\n]*/g, /\/\*[\s\S]*?\*\//g, /;$/];
        for (var i = 0; i < patterns.length; i++){
            var pattern = patterns[i];
            result = result.replace(pattern, '');
        }
        return result;
    };
    
    MainPageSlideshow.prototype.ajax = function(){
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/api.php',
            data: {
                action: 'query',
                prop: 'info|revisions',
                intoken: 'edit',
                titles: 'MediaWiki:Custom-slideshow-'+ this.slideshowSrc + '.json',
                rvprop: 'content',
                rvlimit: 1,
                indexpageids: true,
                format: 'json'
            },
            success: $.proxy(function(response){
                var page = response.query.pages[response.query.pageids[0]],
                    pageExists = response.query.pages['-1'] ? false : true,
                    content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '';
                if (pageExists){
                    var json = this.stripComments(content),
                        json_obj = JSON.parse(json);
                }
            }, this)
        });
    };
}(jQuery, mediaWiki, (this === window) ? this : window));