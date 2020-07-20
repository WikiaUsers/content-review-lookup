(function(window, $, mw){
    function SpecialPageMaker(name){
        this.loaded = {};
        this.loaded.css = false;
        this.loaded.js = false;
        this.loaded.json = false;
        this.loaded.page = false;
        this.deferred = {};
        this.deferred.css = $.Deferred();
        this.deferred.js = $.Deferred();
        this.deferred.json = $.Deferred();
        this.json = {};
        this.name = name || '';
        this.alt = '';
    }
    
    SpecialPageMaker.prototype = $.extend(SpecialPageMaker.prototype, {
        prefix: {
            css: 'MediaWiki:',
            js: 'MediaWiki:',
            json: 'MediaWiki:Custom-'
        },
        suffix: {
            css: '.css',
            js: '.js',
            json: '.json'
        },
        base: 'Special:Blank/',
        title: [mw.config.get('wgSiteName'), 'FANDOM powered by Wikia'],
        set: function(prop, value){
            if (value === void 0) return this;
            this[prop] = value;
            return this;
        },
        get: function(prop){
            if (this[prop] === void 0) return null;
            return this[prop];
        },
        importCSS: function(name){
            var deferred = $.Deferred();
            $(importArticle({
                type: 'style',
                article: name
            })).on('load', function(){
                deferred.resolve();
            });
            return $.when(deferred);
        },
        importJS: function(name){
            var deferred = $.Deferred();
            $(importArticle({
                type: 'script',
                article: name
            })).on('load', function(){
                deferred.resolve();
            });
            return $.when(deferred);
        },
        importJSON: function(name){
            var deferred = $.Deferred();
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: {
                    action: 'query',
                    format: 'json',
                    prop: 'revisions',
                    rvprop: 'content',
                    titles: name,
                    indexpageids: true
                }
            }).always(function(data){
                var res = '', page = data.query && data.query.pages[data.query.pageids[0]],
                    rev = page && page.revisions;
                if (rev) res = rev[0]['*'];
                deferred.resolve(res);
            });
            return $.when(deferred);
        },
        parseJSON: function(string){
            var json = {}, result;
            try {
                result = string.trim().replace(/\/\*[\s\S]*?\*\//g, '');
                json = JSON.parse(result);
            } catch (e){
                return false;
            }
            return json;
        },
        loadCSS: function(){
            var name = this.prefix.css + name + this.suffix.css;
            this.importCSS(name).done($.proxy(function(){
                this.deferred.css.resolve();
            }, this));
            $.when(this.deferred.css).done($.proxy(function(){
                this.loaded.css = true;
            }, this));
            return this;
        },
        loadJS: function(){
            var name = this.prefix.js + name + this.suffix.js;
            this.importJS(name).done($.proxy(function(){
                this.deferred.js.resolve();
            }, this));
            $.when(this.deferred.js).done($.proxy(function(){
                this.loaded.js = true;
            }, this));
            return this;
        },
        loadJSON: function(replace){
            if (replace === void 0) replace = false;
            var name = this.prefix.json + name + this.suffix.json;
            this.importJSON(name).done($.proxy(function(data){
                var json = this.parseJSON(data);
                if (!json) json = null;
                this.deferred.json.resolve(json);
            }, this));
            $.when(this.deferred.json).done($.proxy(function(json){
                this.setJSON(json, replace);
                this.loaded.json = true;
            }, this));
            return this;
        },
        setJSON: function(json, replace){
            if (replace) this.json = json;
            else this.json = $.extend(this.json, json);
            return this;
        },
        clearContent: function(){
            $('#mw-content-text').empty();
            return this;
        },
        insertContent: function(){
            $('#mw-content-text').html(this.content);
            return this;
        },
        isPage: function(){
            var page = this.base + this.name;
            return mw.config.get('wgPageName') === page;
        },
        load: function(callback){
            var isPage = this.isPage();
            if (isPage){
                this.loaded.page = true;
                this.clearContent();
                return callback.call(this);
            } else return null;
        }
    });
}(window, jQuery, mediaWiki));