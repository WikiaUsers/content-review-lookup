;(function(mw, $, mainRoom, config){
    if (config.noop) return;
    config = $.extend(config, {
        version: '2.0.0',
        wikiName: mw.config.get('wgMainpage', wgMainPage),
        scrollNumber: 80,
        resources: [
            // Scripts
            'u:dev:Colors/code.js',
            'u:dev:WgMessageWallsExist/code.js',
            'u:dev:FandomizedChat/events.js',
            'u:dev:FandomizedChat/library.js',
            // Stylesheets
            'u:dev:FandomizedChat/code.2.css'
        ],
        toolbar: true,
        menu: true
    });
    
    if (config.toolbar === true){
        config.resources[config.resources.length] = 'u:dev:FandomizedChat/toolbar.js';
    }
    
    if (config.menu === true){
        config.resources[config.resources.length] = 'u:dev:FandomizedChat/menu.js';
    }
    /**
     * Adding polyfills
     **/
    if (typeof String.prototype.startsWith !== 'function'){
        String.prototype.startsWith = function startsWith(str){
            return this.slice(0, str.length) == str;
        };
    }
    if (typeof String.prototype.endsWith !== 'function'){
        String.prototype.endsWith = function endsWith(str){
            return this.slice(-str.length) == str;
        };
    }
    
    /**
     * @function importResources:
     * @param resource
     **/
    function importResources(resources){
        var _css = [],
            _js = [];
        Array.prototype.forEach.call(resources, function(resource){
            if (resource.endsWith('.css')){
                _css[_css.length] = resource;
            } else if (resource.endsWith('.js')){
                _js[_js.length] = resource;
            } else return;
        });
        
        importArticles({
            type: 'script',
            articles: _js
        }, {
            type: 'style',
            articles: _css
        });
    }
    
    importResources(config.resources);
})(this.mediaWiki, this.jQuery, mainRoom, this.FandomizedChat = this.FandomizedChat || {});