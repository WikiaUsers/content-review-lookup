/*<pre>*/

/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ListFiles/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:PurgeButton/code.js',
        'MediaWiki:Common.js/FairUseUpload.js',
        'u:dev:MassProtect/code.js',
        'u:dev:AjaxBatchDelete/code.2.js'
    ]
});
/* Cross Wiki Redirect by [[User:FortressMaximus]] */
jQuery( document ).ready( function( $ ) {
        if(document.getElementById("Article")!=null){

                window.location.href = "http://" + document.getElementById("Wiki-name").innerHTML + ".wikia.com/wiki/" + document.getElementById("Article").innerHTML;
        }
} );
/*</pre>*/