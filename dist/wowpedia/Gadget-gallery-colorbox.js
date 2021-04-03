$(function() {
	$("ul.gallery").each(function(index) { $(this).attr("rel","gallery-"+index); });
	$("ul.gallery a.image").each(function(index) { $(this).attr("rel",$(this).parents("ul.gallery").attr("rel")); });
	$("ul.gallery a.image").colorbox({
		href: function() { 
			temp = $(this).find("img").attr("src");
			return (temp.indexOf("/thumb") == -1) ? temp : temp.replace("/thumb","").substring(0,temp.replace("/thumb","").lastIndexOf("/"));
		},
		title: function() {
			t = $(this).parents("li.gallerybox").find("div.gallerytext").text().trim();
			if (t == "") t = $(this).find("img").attr("alt");
			return '<a href="'+$(this).attr("href")+'" target="_blank">'+t+'</a>';
		},
		current: "{current} of {total}",
		maxHeight: function() { return $(window).innerHeight() * 0.9; },
		maxWidth: function() { return $(window).innerWidth() * 0.9; },
		scrolling: false,
        className: function() {
			if ($(this).find("img").css("filter").indexOf("blur") != -1) return "nsfw-cbox";
			return false;
        }
	});
	$("div.thumbinner a.image").colorbox({
		href: function() { 
			temp = $(this).find("img").attr("src");
			return (temp.indexOf("/thumb") == -1) ? temp : temp.replace("/thumb","").substring(0,temp.replace("/thumb","").lastIndexOf("/"));
		},
		title: function() {
			t = $(this).parents("div.thumbinner").find("div.thumbcaption").text().trim();
			if (t == "") t = $(this).find("img").attr("alt");
			return '<a href="'+$(this).attr("href")+'" target="_blank">'+t+'</a>';
		},
		maxHeight: function() { return $(window).innerHeight() * 0.9; },
		maxWidth: function() { return $(window).innerWidth() * 0.9; },
		scrolling: false,
        className: function() {
			if ($(this).find("img").css("filter").indexOf("blur") != -1) return "nsfw-cbox";
			return false;
        }
	});
});