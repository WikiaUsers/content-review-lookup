
var url = "https://roblox.fandom.com/ru/api.php";
var randomParams = {
    action: 'query',
    format: 'json',
    list: 'random',
    rnlimit: '1',
    rnnamespace: 0,
}, url = url + "?origin=*";

Object.keys(randomParams).forEach(function (key) { url += "&" + key + "=" + randomParams[key]; });
mw.hook('dev.fetch').add(function (fetch) {
    fetch({
    	url: url,
    	lang: "ru",
    })
        .then(function (response) { return response.json(); })
        .then(function (response) {
            var page = response.query.random[0];
            var templ = document.getElementById("RandomPageTemplate");
            if (templ) {
                document.getElementById("RandomPageTemplateTitle").InnerHTML = "<h2>".concat(page.title, "</h2>");
                console.log("hi");
            }
        })
        .catch(function (error) { console.log(error); });
    }
)
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Fetch.js'
});