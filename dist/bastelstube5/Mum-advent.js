//<script>
$("body.page-MeerUndMehr_Adventskalender_2014").append(function(refreshAdvent){
$(".boxAdv").fadeOut();

setTimeout(function () {
        //Array for image file links. Put the image links at the end of the array, in the order in which they should appear (it's important!)
        //For example, image for #boxAdv6 must be sixth in the list (do not look at the first element, "" - it has number "zero"
        var ImageLinks = ["", "https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png","https://images.wikia.nocookie.net/__cb20140730183523/meerundmehr/images/thumb/9/99/Mum_icons_neu.png/150px-Mum_icons_neu.png" ];

        //Array for regular links. The rules for adding regular links are the same as for the image links.
        var RegularLinks = ["", 
		"http://bit.ly/10H92Gj", 
		"http://bit.ly/10H9mVs", 
		"http://bit.ly/1sx0mc7", 
		"http://bit.ly/1qJVT6v", 
		"http://bit.ly/1qJW6Xf", 
		"http://bit.ly/1qJWdC6", 
		"http://bit.ly/1qJWhSk", 
		"http://bit.ly/1qJWkOa", 
		"http://bit.ly/1qJWq8c", 
		"http://bit.ly/1qJWtAW", 
		"http://bit.ly/1qJWuox", 
		"http://bit.ly/1qJWyVf", // dec 12
		"http://bit.ly/1qJWAMV", 
		"http://bit.ly/1qJWHIi", 
		"http://bit.ly/1qJWRPV", 
		"http://bit.ly/1qJWR2D", //dec 16
		"http://bit.ly/1yw9oxa", 
		"http://bit.ly/1yw9AfP", 
		"http://bit.ly/1yw9Hbf", 
		"http://bit.ly/1yw9R2q", // dec 20 
		"http://bit.ly/1ywa05W", 
		"http://bit.ly/1ywahWA", 
		"http://bit.ly/1ywaJ7e", 
		"http://bit.ly/1ILHrpM" ];

        // Array with special dates 
        var SpecialDates = ['2013-11-25', '2013-11-26', '2013-11-27', '2013-11-28', '2013-11-29', '2013-11-30'];

        var today = new Date();
        var d = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();

        //today = "2014-12-8";
		//d = 20;
        today = yyyy + "-" + mm + "-" + d;
		if (d > 24 && mm > 11 || yyyy > 2014) {
		d = 24;
		}

        $(document).ready(function () {
            $(".boxAdv").addClass("notreached").fadeOut();


                //Making sure that today is December, 2014
				//if (yyyy == "2014" /*&& mm == "12"*/) {
                    for (i = 1; i < d + 1; i++) {
                        $("#boxAdv" + i).addClass("passed").fadeIn();
                        //$("#boxAdv" + i + ".passed img[data-image-name='Adv-blank.png']").attr("src", ImageLinks[i]).addClass("opacity2");
                        $("#boxAdv" + i + "> div:first-child a").attr('href', RegularLinks[i]).attr("target", "_blank");
						$("a.image").removeClass("image-thumbnail").removeClass("image");
                    }
                //}
		});
    }, 1000);
});
//</script>