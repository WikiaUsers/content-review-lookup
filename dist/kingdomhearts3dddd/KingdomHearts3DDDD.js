;(function($, mw, _){
    if ("string" !== typeof _.stopScripts && _.stopScripts === true) return;
    var plugins = [],
        action = {
            'Username Replace': function(config){
                if (config.stopUsernameReplace) return;
                function parse(text){
                    let regex = {
                        link: /\%(.*)\%/g,
                        avatar: /\#(.*)\#/g
                    };
                }
            }
        };
    if ("object" === typeof _.defaultPlugins){
        var _plugins = _.defaultPlugins;
        for (let name in _plugins){
            let handler = _plugins[name];
            plugins[plugins.length] = new KHPlugin(name, handler);
        }
    }
})(this.jQuery, this.mediaWiki, (typeof this.KingdomHearts3DDDD !== 'undefined' ? this.KingdomHearts3DDDD : {}));