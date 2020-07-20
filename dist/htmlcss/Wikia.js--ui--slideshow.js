(function(mw, $, window){
    function Slideshow(){}
    
    $.extend(Slideshow.prototype, {
        firstIndex: 0,
        lastIndex: 0,
        length: 0,
        items: [],
        delay: 500,
        animation: '',
        animations: {},
        hasDescription: false,
        chatLimit: 90,
        imageSize: { width: 500, height: 300 },
        set: function(key, value){
            var immutable = (['items', 'length', 'firstIndex', 'lastIndex'].indexOf(key) > -1) && (typeof this[key] == 'function');
            if (!immutable) this[key] = value;
        },
        get: function(key){
            if (typeof this[key] !== 'undefined') return this[key];
            else return null;
        }
    });
    
    Slideshow.prototype._getContent = function(settings, callback){
        var api = new mw.Api();
        api.get(settings).done($.proxy(function(response){
            var pageid = response.query.pageids[0],
                page = response.query.pages[pageid],
                exists = response.query.pages['-1'] ? false : true,
                content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '';
            if (exists) callback.apply(this, [content, 'success']);
            else callback.apply(this, ['', 'error']);
        }, this)).fail($.proxy(function(error){
            callback.apply(this, ['', 'error']);
        }, this));
    };
    
    Slideshow.prototype.getFromJSON = function(source){
        var settings = {
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',
            titles: source.split('|')[0],
            rvprop: 'content',
            rvlimit: 1,
            indexpageids: true,
            format: 'json'
        };
        this._getContent(settings, function(response, status){
            if (status === 'error') return;
        });
    };
}(mediaWiki, jQuery, window));