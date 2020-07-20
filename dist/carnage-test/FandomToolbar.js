(function(mw, $, config){
    if (config.load && config.load === false){
        return;
    } else if (typeof config.load === 'undefined'){
        return;
    } else {
        var toolbar = Object.create(config);
        toolbar.processRequest = function(username){
            params = {
                mode: 'articles',
                only: 'styles',
                debug: 'true',
                articles: 'u:community:User:' + username.replace(/\s+/g, '_') + '/Toolbar'
            };
            
            if (toolbar.isAnonymous(username)){
                params.articles = 'u:dev:MediaWiki:Custom-Toolbar';
            }
            $.get('/load.php', params, function(data){
                if (!data){}
                data = toolbar.parseData(data);
                toolbar.createItems(data);
            });
        };
        toolbar.parseData = function(string){
            string = string.trim().split(/\n+/);
            
            var invalidLink = true,
                parsed = [],
                patterns = {
                    relativeLink: /\/(wiki\/|(?:index|load|api|wikia)\.php|d)/,
                    
                };
        };
    }
}(this.mediaWiki, this.jQuery, this.Toolbar = this.Toolbar || {}));