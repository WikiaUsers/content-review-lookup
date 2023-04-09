$(function() {
	$("ul.gallery").each(function(index) { $(this).attr("rel","gallery-"+index); });
	$("ul.gallery a.image").each(function(index) { $(this).attr("rel",$(this).parents("ul.gallery").attr("rel")); });
	$("ul.gallery a.image").colorbox({
		href: function() { 
			temp = $(this).find("img").attr("src");
			return (temp.indexOf("/thumb") == -1) ? temp : temp.replace("/thumb","").substring(0,temp.replace("/thumb","").lastIndexOf("/"));
		},
		title: function() {
			t = $(this).parents("li.gallerybox").find("div.gallerytext").text();
			if (t == "") t = $(this).attr("href").substring(1);
			return '<a href="'+$(this).attr("href")+'" target="_blank">'+t+'</a>';
		},
		current: "{current} of {total}",
		maxHeight: function() { return $(window).innerHeight() * 0.9; },
		maxWidth: function() { return $(window).innerWidth() * 0.9; },
		scrolling: false
	});
});