(function() { 
    if (window.AthenaEditor) {
        return false;
    }
    window.AthenaEditor = {
        loaded: 2,
        onload: function(type, arg) {
            switch (type) {
                case 'api':
                    this.api = new mw.Api();
                    break;
            }
            if (--this.loaded) return;
            this.init();
        },
        config: mw.config.get([
            'wgArticleId'
        ]),
        getJSON: function(id) {
            if (!id) {
                id = this.config.wgArticleId;
            }
            return this.api.get({
                action: 'parse',
                text: '{{#invoke:Atenea|exportToJSON|' + id + '}}'
            }).then(function(data) {
                return JSON.parse(data.parse.text['*'].replace(/^<p>([\s\S]*)<\/p>[\s\S]*/, '$1'));
            });
        },
        onLoadJson: function(d) {
            console.log(d);
        },
        init: function() {
             this.getJSON().then(this.onLoadJson.bind(this));
        }
    };
    
    mw.loader.using('mediawiki.api').then(AthenaEditor.onload.bind(AthenaEditor, 'api'));
    require(['jquery', 'mw', 'BannerNotification', 'wikia.ui.factory'], AthenaEditor.onload.bind(AthenaEditor, 'retardedDependencies'));
})();