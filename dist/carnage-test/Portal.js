require([
    "wikia.window", 
    "wikia.document",
    "jquery",
    "mw",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(wk, wd, $, mw, Spinner){
    "use strict";
    const PORTAL_ELEM = document.getElementsByClassName("portal-d");
    if (!PORTAL_ELEM.length) return;
    
    Array.from(PORTAL_ELEM).forEach(function(elem, index){
        elem.dataset["portal-index"] = index;
    });
    
    var Portal = (function(){
        function Portal(){
            this.__target = null;
            this.__state = "";
            this.source = null;
            return this.process();
        }
        
        Portal.prototype.getFromElement = function(elem){
            this.__target = elem;
            return this;
        };
        
        Portal.prototype.loadContent = function(){
            var t = this;
            return new Promise(function(resolve, reject){
                if (t.source === null || t.source === "" || t.source === void 0) return reject();
                mw.loader.using(["mediawiki.api"]).then(function(){
                    var A = new mw.Api();
                    $.when(A.get({
                        action: "query",
                        prop: "revisions",
                        titles: "MediaWiki:Custom-Portal-" + this.source,
                        rvprop: "content",
                        indexpageids: true,
                        cb: Date.now()
                    })).done(function(response){
                        if (response.error) return reject(response.error);
                        var query = response.query;
                        if (query.pageids.indexOf("-1") > -1) return reject();
                        var pageid = query.pageids[0], page = query.pages[pageid];
                        
                        var rev = page.revisions[0]["*"],
                            list = rev.split(/\n|\r\n|\r/g);
                    }).fail(reject);
                });
            });
        };
    })(undefined);
    window.Portal = Portal;
});