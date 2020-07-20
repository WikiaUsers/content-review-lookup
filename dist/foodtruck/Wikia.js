/* Replace "Comments" with "Reviews" */
 
if (wgCanonicalNamespace === ""  && wgIsMainpage == false) {
	function replaceComments() {
                var comments = $(".commentsbubble").html();
		$('a[data-id="comment"]').html("Reviews<span class=\"commentsbubble\">" + comments + "</span>");
		$("#article-comments-counter-header").html(comments + ' reviews</h1>');
	}
 
	addOnloadHook(replaceComments);
}
 
/* End replace "Comments" with "Reviews" */