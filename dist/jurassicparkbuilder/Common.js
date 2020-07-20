/*global mw, $, importArticles, addOnloadHook */
/*jshint browser:true, curly:false, eqnull:true, strict:false */
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:AjaxRC/code.js'
    ]
});

/* End of mw.loader.using callback; code should be added above this line */
} );
/* DO NOT ADD CODE BELOW THIS LINE */