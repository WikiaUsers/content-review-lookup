/* Any JavaScript here will be loaded for all users on every page load. */
/* Add social media buttons to blog posts to replace the one Wikia removed
 * By: [[w:c:avatar:User:The 888th Avatar]]
 */

!function (d,s,id) {
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)) {
		js=d.createElement(s);
		js.id=id;
		js.src="//platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
} (document,"script","twitter-wjs");

$(function() {
	if (wgCanonicalNamespace == 'User_blog') {
		$('#WikiaUserPagesHeader .author-details').prepend('<div style="float:right;"><fb:like show_faces="false" layout="box_count"></fb:like></div>');
	}
});