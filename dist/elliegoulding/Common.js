/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page */

/* Photo feed Instagram */

$("#instagram").append("<iframe src='https://instansive.com/widgets/490aac8daf88ffcf3d0fbba595c1fbbb322de524.html' id='instansive_490aac8daf' name='instansive_490aac8daf' scrolling='no' allowtransparency='true' class='instansive-widget' style='width: 100%; border: 0; overflow: hidden;'></iframe>");

/*Vevo embedder*/

importScriptPage('MediaWiki:VevoEmbedder/VevoEmbedder.js', 'dev');


/* YOUTUBE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});

/* VEVO */
importScriptPage('MediaWiki:VevoEmbedder/VevoEmbedder.js', 'dev');