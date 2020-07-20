// Rules button for Wiki Navigation
 
$(function() {
    $('.WikiHeader nav ul li.marked ul').append('<li style="background-color:skyblue;height:32px;"><a class="subnav-2a" href="/wiki/Skyscraper Wiki:Rules">Rules</a></li>');
});
 
// Import Scripts
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PurgeButton/code.js'
    ]
});