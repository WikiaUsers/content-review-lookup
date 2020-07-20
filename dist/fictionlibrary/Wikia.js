// Null out other variables to avoid conflicts
var fictionlibrary = null;
 
// Redefine
var fictionlibrary = {};
 
// Dynamically built
fictionlibrary.articles = [];
/**
 * To stop a script from loading set load to false
 */
fictionlibrary.scripts = [
    {
        load: true,
        page: 'MediaWiki:Spoiler.js'
    },
    {
        load: true,
        page: 'MediaWiki:Blogs.js'
    }
];
fictionlibrary.loadArticles = function() {
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
 
fictionlibrary.usernameReplace = function() {
    $("span.insertusername").html(mw.config.get('wgUserName'));
};
 
fictionlibrary.init = function() {
    this.loadArticles();
    this.usernameReplace();
};
 
$(document).ready(function() {
    fictionlibrary.init();
});