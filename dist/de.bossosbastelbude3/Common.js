/***** Any JavaScript here will be applied to all skins on the entire site. *****/

importScriptPage('MediaWiki:VideoIntegrator/VideoIntegrator.js', 'dev');

/* background Wikia Adventskalender 2013 */
$('body').bind('click', function(e) { var obj = (e.target ? e.target : e.srcElement); if (obj.tagName != 'BODY') return true; window.location.href = 'http://bit.ly/WikiasWunderhuebscherAdventskalender'; return false; });

/* Skin */
/** Recent changes arrows **/
if(wgPageName == "Special:RecentChanges") {
	addOnloadHook(function() {
		$('.mw-rc-openarrow img').attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/90/Icon-Recent_Changes_arrow.png');
 
		$('.mw-rc-closearrow img').attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/2c/Icon-Recent_Changes_arrow_down.png');
	});
}
 
/** Redirect arrow **/
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/e/e6/Icon-Redirect.png');
 
/* Main page */
if(wgPageName == "Shadow_of_Mordor_Wikia") {
	addOnloadHook(function() {
		/** Chat button icon **/
		$('.mainpage-box-chat .ChatModule .wikia-button').prepend('<img class="chat-icon" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/7/72/Icon-Chat.png" />');
 
		/** Poll text **/
		$('.mainpage-box-poll .total').parent().addClass('pollText'); 
 
		/** Blogs button icon **/
		$('.mainpage-box-blogfeed .blog-button').prepend('<a href="/wiki/Special:CreateBlogPage" class="wikia-button"><img src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/6/66/Icon-Blogs.png" class="blog-icon">Create news</a>');
 
		/** Change chat text **/
		$('.mainpage-box-chat .ChatModule .chat-name').text('Shadow of Mordor Wikia');
 
		/** Move chat button for logged out users **/
		if(!wgUserName) {
			$('.mainpage-box-chat .ChatModule .chat-join').css('position','static');
		}
	});
}
 
/* General */
/** Tooltips **/
importScriptPage('MediaWiki:Common.js/tooltip', 'shadowofmordor');
 
/** Collapsible elements **/
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 3 };
 
/** Blog social media icons **/
if(wgCanonicalNamespace == "User_blog") {
        addOnloadHook(function() {
                var blogImage = new Image(); blogImage.src = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/4/4c/Blog_icon_active.png';
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/5/53/Facebook_icon_active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/91/Twitter_icon_active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/18/Google%2B_icon_active.png';
                var rssImage = new Image(); rssImage.src = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/10/RSS_icon_active.png';
 
                $('.news-share .blog img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/4/4c/Blog_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/22/Blog_icon.png');
                });  
 
                $('.news-share .facebook img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/5/53/Facebook_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/3/3f/Facebook_icon.png');
                });  				
 
                $('.news-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/91/Twitter_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Twitter_icon.png');
                });  				
 
                $('.news-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/18/Google%2B_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/d/d6/Google%2B_icon.png');
                });  				
 
                $('.news-share .rss img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/10/RSS_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/b1/RSS_icon.png');
                });  					
        });
}