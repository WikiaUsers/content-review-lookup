/* Replace "comments" with "reviews" */
 
if (wgPageName == "User_blog:XD1/Battleship_Film_Review_Round-up") {
	function replaceComments() {
                var comments = $(".commentsbubble").html();
		$('a[data-id="comment"]').html("Reviews<span class=\"commentsbubble\">" + comments + "</span>");
		$("#article-comments-counter-header").html(comments + ' reviews');
	}
 
	addOnloadHook(replaceComments);
}
 
/* End replace "comments" with "reviews" */