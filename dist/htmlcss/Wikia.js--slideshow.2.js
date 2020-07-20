(function($, mw){
    var wk_slideshow = {};
    
    wk_slideshow.data = function(config){
        this.fileSource = config.fileSource;
        this.max = config.max;
        this.length = 0;
        this.defIndex = config.defIndex || 0;
        this.loaded = $.Deferred();
        this.api = new mw.Api();
        this.$el = config.$el;
    };
    
    wk_slideshow.data.prototype.getFromEl = function(attr, name){
        var value = this.$el.attr('data-' + name);
        if (typeof value !== 'undefined' || value !== '' || value !== null){
            this[attr] = value;
        }
    };
    
    wk_slideshow.data.prototype.setParams = function(){
        this.params = {
            action: 'query',
            prop: 'info|revisions',
            intoken: 'edit',
            titles: this.fileSource,
            rvprop: 'content',
            rvlimit: 1,
            indexpageids: true,
            format: 'json'
        };
    };
    
    wk_slideshow.data.prototype.send = function(){
        $.when(this.loaded).done(this.parse);
        this.setParams();
        this.api.get(this.params).done($.proxy(function(data){
            if (!data.error){
                var query = data.query, page = query.pages[query.pageids[0]],
                    isMissing = query.pages['-1'] ? true : false;
                if (!isMissing){
                    var content = typeof page.revisions !== 'undefined' ? page.revisions[0]['*'] : '',
                        parsed = JSON.parse(content.trim()
                                        .replace(/\/\/.*?(\n|$)/g, '$1')
                                        .replace(/\/\*[\s\S]*?\*\//g, '')
                                        .replace(/;$/, ''));
                    this.loaded.resolve(parsed);
                } else {
                    this.loaded.reject(query);
                }
            } else {
                this.loaded.reject(data);
            }
        }, this));
    };
    
    wk_slideshow.data.prototype.parse = function(){};
}(jQuery, mediaWiki));