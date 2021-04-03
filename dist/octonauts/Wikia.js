$(".image-resize").each(function() {
	var a = $(this).children(".image-resize-new").text().split("_")
		img = $(this).find("img");
	if (!isNaN(Number(a[1])) && !isNaN(Number(a[1]))) {
		img.attr({
			width: a[0],
			height: a[1]
		});
	}
});

var myNoti = new BannerNotification('<a href="https://octonauts.fandom.com/wiki/User_blog:Golfpecks256/The_Caves_of_Sac_Actun_Movie_has_Premiered!">🚨NEW MOVIE PREMIERE🚨 - English version now avaliable on Netflix. Let us know your thoughts!</a>', 'notify');
myNoti.show();