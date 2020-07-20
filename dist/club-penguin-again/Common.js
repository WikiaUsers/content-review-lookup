/* Any JavaScript here will be loaded for all users on every page load. */

/* ====================================================================== *\
	# hide toc for [[template:hidetoc]]
\* ====================================================================== */
 
if ($(".hidetoc").length > 0) {
	$(document).ready(function() {
		$("#toc").addClass("tochidden");
		$("#toc td > ul").css("display","none");
		$("#toc .toctoggle a").text("show");
	});
}

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
 });