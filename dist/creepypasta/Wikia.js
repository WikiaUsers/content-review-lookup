// Null out other variables to avoid conflicts
var creepypasta = null;

// Redefine
var creepypasta = {};

// Dynamically built
creepypasta.articles = [];

/**
 * To stop a script from loading set load to false
 */
creepypasta.scripts = [
    {
        load: false,
        page: 'MediaWiki:Rewrite.js'
    },
    {
        load: true,
        page: 'MediaWiki:Blogs.js'
    },
    {
        load: true,
        page: 'MediaWiki:Sandbox.js'
    },
    {
        load: true,
        page: 'MediaWiki:Complete.js'
    }
];

creepypasta.loadArticles = function() {
    for (var i = 0; i < this.scripts.length; i++) {
        if (this.scripts[i].load === true) {
            this.articles.push(this.scripts[i].page);
        }
    }
    
    if (this.articles.length > -1) {
        importArticles({
            type: "script",
            articles: this.articles
        });
    }
};

creepypasta.usernameReplace = function() {
    $("span.insertusername").html(mw.config.get('wgUserName'));
};

creepypasta.init = function() {
    this.loadArticles();
    this.usernameReplace();
};

$(function() {
    creepypasta.init();
});