/***** Any JavaScript here will be applied to the Wikia/Oasis on the entire site. *****/
/* Skin */

/* Main page */
if( wgPageName === "Sensei_Wars_Wikia") {
	/** Make sure the Sensei Wars News and Community Blogs boxes are the same height **/
	var communityBlogsHeight = $('.mainpage-box-communityblogs').height();
	var newsTopMargin = $('.mainpage-box-news').css('marginBottom');
	var newsBoxHeight = parseInt(communityBlogsHeight) + parseInt(newsTopMargin) + 'px';
	var newsBoxRSSHeight = parseInt(communityBlogsHeight) - 27 + 'px';
	$('.mainpage-box-news').css('height',newsBoxHeight);
	$('.mainpage-box-news .wikiaRssPlaceholder').css('height',newsBoxRSSHeight);
 
	$(window).on('resize',function() {
		var communityBlogsHeight = $('.mainpage-box-communityblogs').height();
		var newsTopMargin = $('.mainpage-box-news').css('marginBottom');
		var newsBoxHeight = parseInt(communityBlogsHeight) + parseInt(newsTopMargin) + 'px';
		var newsBoxRSSHeight = parseInt(communityBlogsHeight) - 27 + 'px';
		$('.mainpage-box-news').css('height',newsBoxHeight);
		$('.mainpage-box-news .wikiaRssPlaceholder').css('height',newsBoxRSSHeight);
	});
}

/* General */
/** Social Media icons **/
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');