$(document).ready(function() {

	$commentDiv = $("#comments");
	
	$.get("https://disqus.com/api/3.0/forums/listPosts.json?forum=cflib&limit=10&related=thread&api_key=vSK5ndtqzaZGn4aEsYsR9xCrV1z656kxT0VODoLLbCOQvFQezy6wtBWNe9Jy3GW4", function(res, code) {
		//Good response?
		if(res.code === 0) {
			var result = "";
			for(var i=0, len=res.response.length; i<len; i++) {
				var post = res.response[i];
				console.dir(post);
				var html = "<div class='comment'>";
				html += "<img src='" + post.author.avatar.small.permalink + "'>";
				html += "<a href='"+ post.author.profileUrl + "'>" + post.author.name + "</a>";
				html += "<p>"+post.raw_message+"</p>";
				html += "<p class='postRef'>Posted at " + post.createdAt + " on <a href='"+ post.thread.link + "'>" + post.thread.title + "</a></p>";
				html += "</div>";
				
				result+=html;
			}
			$commentDiv.html(result);
		}
	});
});