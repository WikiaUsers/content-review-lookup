importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
	]
});

$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href
});