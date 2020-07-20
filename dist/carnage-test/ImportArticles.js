/**
 * This is an updated version of the importArticles script.
 **/

(function($, mw){
    function ScriptLoader(scripts){
        this.scripts = scripts;
        this.baseURI = mw.config.get('wgLoadScript') + '?';
        this.load = $.Deferred();
        this.loaded = false;
        this.cache = {};
        this.config = {
            debug: mw.config.get('debug'),
            lang: mw.config.get('wgUserLanguage'),
            mode: 'articles',
            skin: mw.config.get('skin')
        };
        this.slice = [].slice;
        this.loadIndex = 1;
        this.loadedScripts = {};
        return this;
    }
    
    ScriptLoader.prototype.importJS = function(page, server){
        var chars = { '%2F': '/', '%3A': ':' },
            URI = '/index.php?title=' + encodeURIComponent(page.replace(/\s+/g, '_'));
        for (var l in chars){
            URI = URI.replace(l, chars[l]);
        }
        URI += '&action=raw&ctype=text/javascript';
        if (typeof server == "string") {
            if (server.indexOf('://') == -1 && server.substring(0, 2) !== '//'){
                    URI = 'https://' + server + '.' + mw.config.get('wgWikiaBaseDomain') + URI;
            } else {
                URI = server + URI;
            }
        }
        return $.proxy(this.importScript, this)(URI);
    };
    ScriptLoader.prototype.importCSS = function(page){
        var chars = { '%2F': '/', '%3A': ':' },
            URI = '/index.php?title=' + encodeURIComponent(page.replace(/\s+/g, '_'));
        for (var l in chars){
            URI = URI.replace(l, chars[l]);
        }
        URI += '&action=raw&ctype=text/css';
        if (typeof server == "string") {
            if (server.indexOf('://') == -1 && server.substring(0, 2) !== '//'){
                    URI = 'https://' + server + '.' + mw.config.get('wgWikiaBaseDomain') + URI;
            } else {
                URI = server + URI;
            }
        }
        return $.proxy(this.importStyle, this)(URI);
    };
    ScriptLoader.prototype.importScript = function(url){
        url = maybeMakeProtocolRelative(forceReviewedContent(url));
        if (this.loadedScripts[url]){
            return null;
        }
        this.loadedScripts[url] = !0;
        var s = document.createElement('script');
        s.setAttribute('src', url);
        s.setAttribute('type', 'text/javascript');
        document.head.appendChild(s);
        return s;
    };
    ScriptLoader.prototype.importStyle = function(url){
        url = maybeMakeProtocolRelative(forceReviewedContent(url));
        if (this.loadedScripts[url]){
            return null;
        }
        this.loadedScripts[url] = !0;
        var s = document.createElement('link');
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('href', url);
        s.setAttribute('type', 'text/css');
        document.head.appendChild(s);
        return s;
    }
    ScriptLoader.prototype.progress = function(callback){
        this.load.progress($.proxy(callback, this));
    };
    ScriptLoader.prototype.exec = function(){
        if (typeof scripts !== 'undefined'){
            if (typeof scripts === 'object'){
                var i = 0, l, module, uri, name, method, type, ext, modules = this.scripts, obj = (!Array.isArray(scripts) ? scripts : {});
                scripts = Array.isArray(scripts) ? scripts : Object.keys(scripts);
                for (i, l = modules.length; i < l; i++){
                    module = $.extend({}, defaults);
                    name = modules[i];
                    ext = name.split(name.indexOf('.'), name.length);
                    type = ({
                        '.css': 'style',
                        '.js': 'script'
                    })[ext] || '';
                    module.articles = name;
                    this.cache[name] = $.Deferred();
                    if (!obj[name]) continue;
                    if (typeof obj[name] === 'function'){
                        obj[name].apply(this, []);
                    }
                    if (!module.articles){
                        $.when(this.cache[name]).fail();
                        this.cache[name].reject();
                        continue;
                    }
                    $.when(this.cache[name]).done();
                    if (mw.config.get('wgContentReviewExtEnabled')){
                        if (module.articles.search(/mediawiki:/i) != -1){
                            if (mw.config.get('wgContentReviewTestModeEnabled')){
                                module.current = mw.confif.get('wgScriptsTimestamp');
                            } else {
                                module.reviewed = mw.config.get('wgReviewedScriptsTimestamp');
                            }
                        }
                    }
                    method = ({
                        'script': this.importJS,
                        'style': this.importCSS
                    })[type] || $.noop;
                    if (!method){
                        $.when(this.cache[name]).fail();
                        this.cache[name].reject();
                        continue;
                    }
                    module.only = module.type + s;
                    delete module.type;
                    uri = this.baseURI + $.param(module);
                    if (this.loadedScripts[uri]) continue;
                    this.loadedScripts[uri] = !0;
                    $.when(this.cache[name]).done($.proxy(function(){
                        var loaded = this.loadIndex,
                            total = l,
                            complete = (loaded === total);
                        this.load.notify({
                            loaded: loaded,
                            total: total,
                            complete: complete
                        });
                        this.loadIndex++;
                    }, this));
                    $(method.apply(this, [uri])).on('load', $.proxy(function(){
                        this.cache[name].resolve();
                    }, this));
                }
            }
        }
        return this;
    };
}(jQuery, mediaWiki));