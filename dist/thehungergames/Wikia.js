/* Replace "comments" with "reviews" */
 
if (wgPageName == "User_blog:XD1/Hunger_Games_Film_Review_Round-up") {
	function replaceComments() {
                var comments = $(".commentsbubble").html();
		$('a[data-id="comment"]').html("Reviews<span class=\"commentsbubble\">" + comments + "</span>");
		$("#article-comments-counter-header").html(comments + ' reviews');
	}
 
	addOnloadHook(replaceComments);
}
 
/* End replace "comments" with "reviews" */


/* ==============
  Quiz
   ============== */
 
 /* Right rail CTA */
   $(function () {
        $('#WikiaRail').append("<iframe width='290' height='700' style='margin:0 auto' src='https://fandomrewards.typeform.com/to/kJuoCK'></iframe>");
    });