// namespace
window.hpw = window.hpw || {};
window.notiplus = window.notiplus || {};

// notiplus settings
notiplus.cookiePrefix = 'HPW';
notiplus.consentRequired = false;
notiplus.reverseOrder = true;

// Programmatic Wiki Backgrounds
// preloads and displays bg
hpw.bgPreloader = function(src) {
	var img = new Image();
	img.onload = function() {
		$('body.skin-oasis').css('background-image', 'url('+img.src+')');
	}
	img.src = src;
}

// the array of bg images, start hour (inclusive), end hour (exclusive)
hpw.hourTimedBgArray = [
	['https://vignette.wikia.nocookie.net/hitlerparody/images/b/ba/Wikibg_jan17_night.jpg', 18, 06],
	['https://vignette.wikia.nocookie.net/hitlerparody/images/7/7c/Wikibg_jan17_day.jpg', 06, 18]
];

// change the bg depending on time range
hpw.hourTimedBackground = function(ar) {
	var hour = new Date().getHours();
	for(var i=0; i<ar.length; i++) {
		if (hour>=ar[i][1] && hour<ar[i][2]) {
			hpw.bgPreloader(ar[i][0]);
			return;
		} else if (ar[i][2]<ar[i][1] && (hour>=ar[i][1] || hour<ar[i][2]) ) { // ranges wrap across midnight
			hpw.bgPreloader(ar[i][0]);
			return;
		}
	}
}
// call the fn
hpw.hourTimedBackground(hpw.hourTimedBgArray);
// END programmatic bgs

// Wiki Navigation additions
// -go through each nav-item
$("#WikiHeader .nav-item a").each(function(){
	// check that text matches those of the default tab
	if ($(this).text()==='On the Wiki') {
		// appends HTML to it
		$(this).next().append('<li><a class="subnav-2a" data-canonical="news" href="/wiki/Hitler_Parody_Wiki:News">News</a></li><li><a class="subnav-2a" data-canonical="featured-content" href="/wiki/Hitler_Parody_Wiki:Featured">Featured</a></li>');
	}
});
// contribute menu additions (create blog post)
$('.wikia-menu-button.contribute a[data-id=createpage]').parent().after('<li><a href="/wiki/Special:CreateBlogPage">Create blog post</a></li>');

/* HOME PAGE ADDITIONS */
if ( mw.config.get('wgPageName') == "Hitler_Parody_Wiki" ) {
    importArticles({
        type: "script",
        articles: [
            "user:Mfaizsyahmi/scrollgallery.js"
        ]
    }, {
        type: "style",
        article: "user:Mfaizsyahmi/scrollgallery.css"
    });
}


// for the Background template, use with caution
$(".backgroundcssinject").first().each(function(){
    bgurl = $(".backgroundcssinject .url").text();
    bgcolor = $(".backgroundcssinject .color").text();
    bgrpt = $(".backgroundcssinject .repeat").text();
    bgatt = $(".backgroundcssinject .attachment").text();
    bgpos = $(".backgroundcssinject .position").text();
    $("body").addClass('custom').css('background', bgcolor + ' url(' +bgurl+ ') ' +bgrpt+ ' ' +bgatt+ ' ' +bgpos);
});

// 3spooky5me
/*$('<audio id="halloweenbg" src="https://vignette.wikia.nocookie.net/hitlerparody/images/b/b1/Halloweenbgreupload.ogg/revision/latest?cb=20161002063536" loop controls></audio>').appendTo('.wordmark');

// button to stop bg music if there's any
// 22 Oct 12: made to also remove halloween background music
if ($("#yolo, #halloweenbg").length) $("header nav > ul> li:first-child > ul.subnav-2").append('<li id="stopmusic">:stopmusic:<div><input id="stopmusicforgood" type=checkbox>For good?</input></div></li>');
$("#stopmusic").click(function(){
    $("#yolo, #halloweenbg").remove();
    if ( $('input', this).attr('checked') ) $.cookie("HPW-nomusic", true, { expires: 100 } )
});*/


// Add post id (#) to thread posts
$(".Thread ul.comments ul.replies li").each(function(){
    $("div.edited-by",this).append( '<span class="postId">(#' + $(this).attr("id") + ')</span>' );
});

// In FC suggestions thread, automatically scrolls down to the last post
// this works, right? {{:MediaWiki:FcThread}}
$('body.page-Thread_17521').animate({
         scrollTop: $("li.message:last").offset().top
     }, 800);