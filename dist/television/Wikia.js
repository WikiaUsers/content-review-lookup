/* Add header to Community Choice Awards top 10 lists */
$(function() {
	if (wgCanonicalNamespace == 'Top_10_list') {   
		var replaceParagraph = $('#WikiaArticle #mw-content-text > p');
		var replaceParagraphContent = $('#WikiaArticle #mw-content-text > p').html();
		if(replaceParagraphContent == "Vote on more Community Choice Awards here!") {
			var replaceText = '<a href="http://www.wikia.com/Entertainment"; title="Vote on more Community Choice Awards here!"><img src="https://images.wikia.nocookie.net/wikiaglobal/images/7/78/Wikia_Community_Choice_awards.jpeg" alt="Vote on more Community Choice Awards here!" /></a>';
			replaceParagraph.html(replaceText);
		}
	}
});

/* Social media icons */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');

if (mediaWiki.config.get( 'wgPageName' ) === "User_blog:Gcheung28/Holiday_Know_Days:_Community_Choice_Awards" && mediaWiki.config.get( 'wgCanonicalNamespace' ) === 'User_blog') {
	setTimeout(function() {
		var blogURL = 'http://on.wikia.com/rcBZP';
		var shareURL = "https://twitter.com/intent/tweet?original_referer=" + blogURL + "&text=I+voted+in+@Wikia's+Community+Choice+Awards!&url=" + blogURL;
		$('.socialmedia-share .twitter').parent().attr('href', shareURL);
	},750);
}

if(wgCanonicalNamespace == "User_blog") {
        addOnloadHook(function() {
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/entertainment1/images/4/40/Facebook_active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/entertainment1/images/f/f1/Twitter_active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/entertainment1/images/b/b2/Google_active.png';
 
                $('.communitychoiceawards-share .facebook img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/4/40/Facebook_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/3/3f/Facebook_icon.png');
                });  				
 
                $('.communitychoiceawards-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/f/f1/Twitter_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/2/22/Twitter_icon_2.png');
                });  				
 
                $('.communitychoiceawards-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/b/b2/Google_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/entertainment1/images/d/d6/Google%2B_icon.png');
                });
	});
}