/**
 * @title           Plugins
 * @author          Ultimate Dark Carnage
 * @version         v1.0
 **/

require(["wikia.window", "jquery", "mw"], function(window, $, mw){
    function _default(){
        var args = [].slice.call(arguments);
        while (args.length){
            var value = args.shift();
            if (!(typeof value === "undefined" || value === null)) 
                return value;
        }
        return null;
    }
    
    function Plugins(options){
        if (!(this instanceof Plugins)) return new Plugins(options);
        options = $.extend({}, options);
        
        this.styles = [];
        this.scripts = [];
        this.base = _default(options.base, "MediaWiki:Plugins/");
        this.page = _default(options.page, "MediaWiki:Custom-Plugins");
        this.onload = _default(options.onload, $.noop);
        return this;
    }
    
    (function(){
        this.constructor = Plugins;
        this.load = function(){
            $.ajax({
                method: "GET",
                url: "/api.php",
                dataType: "json",
                data: {
                    action: "query",
                    format: "json",
                    prop: "revisions",
                    rvprop: "content",
                    titles: this.page,
                    indexpageids: true,
                    cb: Date.now()
                }
            }).done($.proxy(function(data){
                if (data.error) return;
                var res = "", q = data.query && data.query.pages,
                    pageId = data.query.pageids[0],
                    page = q[pageId];
                
                if ("-1" in q) return;
                
                var rev = "revisions" in page && page.revisions[0];
                
                if (!rev) return;
                
                res = rev["*"];
                
                res = this.processText(res);
                
                var pageList = res.split(/\n/g).map(function(n){ return n.trim(); });
                
                pageList = pageList.filter(function(n){
                    return !(/[Ss]pecial:[uU]ser[lL]ogout/i.test(n));
                });
                
                while (pageList.length){
                    var currPage = pageList.shift(),
                        curr = "",
                        rjs = /(?:.*)\.js$/i,
                        rcss = /(?:.*)\.css$/i;
                    
                    if (currPage === "") continue;
                    
                    if (rjs.test(currPage)){
                        curr = this.base + currPage;
                        this.scripts.push(curr);
                    } else if (rcss.test(currPage)){
                        curr = this.base + currPage;
                        this.styles.push(curr);
                    }
                }
            }, this));
        };
        
        this.processText = function(text){
            text = text.trim().replace(/\/\*[\s\S]*?\*\//g, '');
            text = text.trim().replace(/==(?:\s+)?(?:.*)(?:\s+)?==/g, '');
            return text.trim();
        };
        
        this.add = function(){
            var jsParam = { type: "script", articles: this.scripts },
                cssParam = { type: "style", articles: this.styles };
                
            $(importArticles(jsParam, cssParam)).on("load", $.proxy(this.onload, this));
        };
    }).call(Plugins.prototype);
});