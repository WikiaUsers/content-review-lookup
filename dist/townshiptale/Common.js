/* Any JavaScript here will be loaded for all users on every page load. */

var pageContent = mw.hook('wikipage.content');

function map($class, $function)
{
	pageContent.add(function($content) {
	    var $items = $content.find($class);
	    if (!$items.length) return;
	
	    $items.each(function() {
	    	var $this = $(this);
	    	
	    	$function($this);
	    });
	});
}

map('.att-news', function($div)
{
	var blogApi = "https://strapi.townshiptale.dev/graphql?query={posts(limit:7,%20sort:%22date:desc%22){title,date,slug}}&format=txt&format=txt&origin=*";

	$div = $div.children(":first");
	    		
	fetch(blogApi)
	    .then(function(response) {return response.json();})
	    .then(function(response) {
	    	var posts = response.data.posts;
	    	
	    	$div.children('.rss_item').remove();
	    	
	    	posts.forEach(function($post)
	    	{
	    		var itemHtml = '<div class="rss_item"><div class="plainlinks"><a target="_blank" rel="nofollow noreferrer noopener" class="external text" href="https://townshiptale.com/news/' +
	    		$post.slug + 
	    		'">' + 
	    		$post.title + 
	    		'</a></div><div class="date_epoch">' + 
	    		$post.date + 
	    		'</div></div></div>';
	    		
	    		$div.append(itemHtml);
	    	});
	     });
});