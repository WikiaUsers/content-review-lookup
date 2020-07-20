/* Mainpage */
if( wgPageName === "Wiki_Ever_After_High" ) {
/** Poll button **/
	$('.mainpage-box-poll .ajax-poll input[type="submit"]').attr("value","");

/** Box size **/
	var royalsHeight = $('.mainpage-box-characters .rebels').height();
	$('.mainpage-box-characters .royals').css('height',royalsHeight);
 
	$(window).on('resize',function() {
		var royalsHeight = $('.mainpage-box-characters .rebels').height();
		$('.mainpage-box-characters .royals').css('height',royalsHeight);
	});	
}

/* General */
/** Wiki navigation **/
$(function() {
        $('#WikiHeader .WikiNav > ul').append(
                '<li class="nav-item">\
                        <a href="http://community.wikia.com/wiki/c:MonsterHigh:Monster_High_Wiki">MH Wiki</a>\
                        <ul class="subnav-2 accent" style="display:none;">\
                                <li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Monster_High_(franchise)">Franchise</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Trademark">Trademark</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Characters">Cast</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Merchandise">Merchandise</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Monster_High_(website)">Website</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Monster_High_(cartoon)">Cartoon</a>\
                                </li><li class="subnav-2-item">\
                                        <a class="subnav-2a" href="http://community.wikia.com/wiki/c:MonsterHigh:Books">Books</a>\
                                </li>\
                        </ul>\
                </li>'
        );
 
        WikiHeader.init();
});

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