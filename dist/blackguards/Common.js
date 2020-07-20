/* Any JavaScript here will be loaded for all users on every page load. */

/** Blog social media icons **/
if(wgCanonicalNamespace == "User_blog") {
        addOnloadHook(function() {
                var blogImage = new Image(); blogImage.src = 'https://images.wikia.nocookie.net/blackguards/images/4/4c/Blog_icon_active.png';
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/blackguards/images/5/53/Facebook_icon_active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/blackguards/images/9/91/Twitter_icon_active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/blackguards/images/1/18/Google%2B_icon_active.png';
                var rssImage = new Image(); rssImage.src = 'https://images.wikia.nocookie.net/blackguards/images/1/10/RSS_icon_active.png';
        
                $('.news-share .blog img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/4/4c/Blog_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/2/22/Blog_icon.png');
                });  
				
                $('.news-share .facebook img').hover(function() {
                        $(this).attr('src',https://images.wikia.nocookie.net/blackguards/images/5/53/Facebook_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/3/3f/Facebook_icon.png');
                });  				
				
                $('.news-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/9/91/Twitter_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/f/f3/Twitter_icon.png');
                });  				
				
                $('.news-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/1/18/Google%2B_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/d/d6/Google%2B_icon.png');
                });  				
				
                $('.news-share .rss img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/1/10/RSS_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/blackguards/images/b/b1/RSS_icon.png');
                });  					
        });
}