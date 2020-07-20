/* General */
/** Social Media buttons **/
var SocialMediaButtonsNamespaces = [0, 14, 500];
var SocialMediaButtons = { 
        position: "bottom",
        colorScheme: "light",
        buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

/* Templates */
/** News footer **/
if(wgCanonicalNamespace == "User_blog") {
        addOnloadHook(function() {
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/everafterhigh/images/a/a2/Facebook_icon-active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/everafterhigh/images/2/2a/Twitter_icon-active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/everafterhigh/images/e/ea/Google_icon-active.png';

                $('.news-share .facebook img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/a/a2/Facebook_icon-active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/3/3f/Facebook_icon.png');
                });  				
 
                $('.news-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/2/2a/Twitter_icon-active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/f/f3/Twitter_icon.png');
                });  				
 
                $('.news-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/e/ea/Google_icon-active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/everafterhigh/images/e/e9/Google_icon.png');
                });  								
        });
}