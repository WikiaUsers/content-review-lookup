/* Replace "Comments" with "Reviews" */
 
if (wgPageName == "User_blog:XD1/Community_Interview-_John_M._Levin") {
	function replaceComments() {
                var comments = $(".commentsbubble").html();
		$('a[data-id="comment"]').html("Questions<span class=\"commentsbubble\">" + comments + "</span>");
		$("#article-comments-counter-header").html(comments + ' questions');
	}
 
	addOnloadHook(replaceComments);
}
 
/* End replace "Comments" with "Reviews" */

/* Social Icons */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');