(function(window, $, mw){
    mw.loader.using(['mediawiki.api']).then(function(){
        if (((window.Util || {}).GetPages || {}).loaded) return;

        var GetPages = {
            pagePattern: /\\/,
            formattedNamespaces: mw.config.get("wgFormattedNamespaces"),
            namespaces: {}
        };

        $.extend(GetPages, {
            getNamespaces: function(){
                var namespaceIDs = Object.keys(this.formattedNames).map(Number).sort(),
                    namespaceIDstring = namespaceIDs.map(String);
                while (namespaceIDstring.length){
                    var ns = namespaceIDstring.shift(),
                        fullns = this.formattedNamespaces[ns];
                    this.namespaces[fullns] = ns;
                }
                this.formattedNamespaces = mw.config.get("wgFormattedNamespaces");
            },
            load: function(by){
                if (!(Object(by) instanceof String)) by = "title";
            }
        });
    });
}(this, jQuery, mediaWiki));