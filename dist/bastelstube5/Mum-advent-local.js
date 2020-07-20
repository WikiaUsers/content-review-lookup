//<script>
//$("body.page-MeerUndMehr_Adventskalender_2013").append(function(refreshAdvent){

setTimeout(function () {
        //Array for image file links. Put the image links at the end of the array, in the order in which they should appear (it's important!)
        //For example, image for #boxAdv6 must be sixth in the list (do not look at the first element, "" - it has number "zero"
        var ImageLinks = ["", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png", "https://images.wikia.nocookie.net/__cb20131130161833/bastelstube5/images/d/d4/Adv-blank.png", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png", "https://images.wikia.nocookie.net/__cb20131130161833/bastelstube5/images/d/d4/Adv-blank.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png", "https://images.wikia.nocookie.net/__cb20131130161833/bastelstube5/images/d/d4/Adv-blank.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png" ];

        //Array for regular links. The rules for adding regular links are the same as for the image links.
        var RegularLinks = ["", "http://bit.ly/mum-adv2013-reh-199", "http://bit.ly/mum-adv2013-afw8-28-1", "http://bit.ly/mum-adv2013-comic-afw8-28-1", "http://bit.ly/mum-adv2013-vk-4-3", "http://bit.ly/mum-adv2013-rhabarberkuchen1", "http://bit.ly/mum-adv2013-fss2-14", "http://bit.ly/mum-adv2013-kirby-weisheiten", "http://bit.ly/mum-adv2013-reh-200", "http://bit.ly/mum-adv2013-kirby-weisheiten", "http://bit.ly/mum-adv2013-vk-4-4", "http://bit.ly/mum-adv2013-rhabarberkuchen2", "http://bit.ly/mum-adv2013-afw8-28-2", "http://bit.ly/mum-adv2013-comic-afw8-28-1", "http://bit.ly/mum-adv2013-kirby-weisheiten", "http://bit.ly/mum-adv2013-reh-201", "http://bit.ly/mum-adv2013-afw8-28-3", "http://bit.ly/mum-adv2013-vk-5-1", "", "http://bit.ly/mum-adv2013-kirby-weisheiten", "http://bit.ly/mum-adv2013-kirby-weisheiten", "http://bit.ly/mum-adv2013-afw8-28-4",  "http://bit.ly/mum-adv2013-reh-202", "http://bit.ly/mum-adv2013-comic-afw8-28-1", "http://bit.ly/mum-adv2013-afw8-28-5"];

        // Array with special dates 
        var SpecialDates = ['2013-11-25', '2013-11-26', '2013-11-27', '2013-11-28', '2013-11-29', '2013-11-30'];

var today = "2013-12-24";
//        var today = new Date();
        var d = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();

        //today = "2013-12-1";
        today = yyyy + "-" + mm + "-" + d;

        $(document).ready(function () {
            $(".boxAdv").addClass("notreached");


            for (SpecialDatesCount = 0; SpecialDatesCount < SpecialDates.length; SpecialDatesCount++) {
                if (today == SpecialDates[SpecialDatesCount]) {
                    $(".boxAdv").addClass("notreached");
                }
                //Making sure that today is December, 2013
                if (yyyy == "2013" && mm == "12") {
                    for (i = 1; i < d + 1; i++) {
                        $("#boxAdv" + i).addClass("passed");
                        $("#boxAdv" + i + ".passed img[data-image-name='Adv-blank.png']").attr("src", ImageLinks[i]);
                        $("#boxAdv" + i + " a").attr("href", RegularLinks[i]);
                    }
                }
            }
        });
    }, 1000);
//});
//</script>