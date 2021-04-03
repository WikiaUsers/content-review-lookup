importArticle({
        type: 'script',
        article: 'u:pt.starwars:MediaWiki:ICP.js'
    });

mw.hook("dev.icp").add(function(icpModule) {
  console.log(icpModule);
});