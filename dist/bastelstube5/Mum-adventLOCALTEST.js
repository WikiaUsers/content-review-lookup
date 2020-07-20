//<script>
$("body.page-Mum_advent").append(function(refreshAdvent){
setTimeout(function() {
                                




var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
 
var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} 
 
today = "2013-12-01";
// today = yyyy +"-"+ mm +"-"+ dd;
 
$(document).ready(function() {
$(".boxAdv").addClass("notreached");

// ################ pre-dec ########
if (today == "2013-11-25") {
 
$(".boxAdv").addClass("notreached");
 
}
 
if (today == "2013-11-26") {
 
$(".boxAdv").addClass("notreached");
 
}
 
if (today == "2013-11-27") {
 
$(".boxAdv").addClass("notreached");
 
}
 
if (today == "2013-11-28") {
 
$(".boxAdv").addClass("notreached");
 
}
 
if (today == "2013-11-29") {
 
$(".boxAdv").addClass("notreached");
 
}
 
if (today == "2013-11-30") {
 
$(".boxAdv").addClass("notreached");
 
}
// ################## december ##########
// forsearch-day 1 
if (today == "2013-12-01") {
 
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
//??? ggf für alles bg-image separat erstellen - wie umgehen? ------- background-image: bla
 
}
if (today == "2013-12-02") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
}
if (today == "2013-12-03") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
}
if (today == "2013-12-04") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-05") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-06") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
}
if (today == "2013-12-07") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-08") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
}
if (today == "2013-12-09") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-10") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-11") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-12") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
}
if (today == "2013-12-13") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
}
if (today == "2013-12-14") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-15") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
}
if (today == "2013-12-16") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
}
if (today == "2013-12-17") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
}
if (today == "2013-12-18") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-19") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-20") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 20
$("#boxAdv20").addClass("passed");
$("#boxAdv20.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv20 a").attr("href", "http://mum.wikia.com");
 
}
if (today == "2013-12-21") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 20
$("#boxAdv20").addClass("passed");
$("#boxAdv20.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv20 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 21
$("#boxAdv21").addClass("passed");
$("#boxAdv21.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv21 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Verh%C3%A4ngnisvolle_Folgen");
 
}
if (today == "2013-12-22") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 20
$("#boxAdv20").addClass("passed");
$("#boxAdv20.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv20 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 21
$("#boxAdv21").addClass("passed");
$("#boxAdv21.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv21 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Verh%C3%A4ngnisvolle_Folgen");
 
// forsearch-day 22
$("#boxAdv22").addClass("passed");
$("#boxAdv22.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv22 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_202");
 
}
if (today == "2013-12-23") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 20
$("#boxAdv20").addClass("passed");
$("#boxAdv20.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv20 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 21
$("#boxAdv21").addClass("passed");
$("#boxAdv21.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv21 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Verh%C3%A4ngnisvolle_Folgen");
 
// forsearch-day 22
$("#boxAdv22").addClass("passed");
$("#boxAdv22.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv22 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_202");
 
// forsearch-day 23
$("#boxAdv23").addClass("passed");
$("#boxAdv23.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv23 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
}
if (today == "2013-12-24") {
 
// forsearch-day 1
$("#boxAdv1").addClass("passed");
$("#boxAdv1.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv1 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_199");
 
// forsearch-day 2
$("#boxAdv2").addClass("passed");
$("#boxAdv2.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv2 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_für_Waddle_8/Eine_Rückkehr,_die_für_Wirbel_sorgt");
 
// forsearch-day 3
$("#boxAdv3").addClass("passed");
$("#boxAdv3.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv3 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 4
$("#boxAdv4").addClass("passed");
$("#boxAdv4.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv4 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 5
$("#boxAdv5").addClass("passed");
$("#boxAdv5 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 6
$("#boxAdv6").addClass("passed");
$("#boxAdv6.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/7/7a/Adv-fss2.png");
$("#boxAdv6 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Flat_Share_Society_-_Die_Chaostage/Palindrom");
 
// forsearch-day 7
$("#boxAdv7").addClass("passed");
$("#boxAdv7.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv7 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 8
$("#boxAdv8").addClass("passed");
$("#boxAdv8.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv8 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_200");
 
// forsearch-day 9
$("#boxAdv9").addClass("passed");
$("#boxAdv9.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv9 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 10
$("#boxAdv10").addClass("passed");
$("#boxAdv10.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv10 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 11
$("#boxAdv11").addClass("passed");
$("#boxAdv11 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 12
$("#boxAdv12").addClass("passed");
$("#boxAdv12.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv12 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Professionelle_Arbeitsatmosph%C3%A4ren");
 
// forsearch-day 13
$("#boxAdv13").addClass("passed");
$("#boxAdv13.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv13 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 14
$("#boxAdv14").addClass("passed");
$("#boxAdv14.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv14 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 15
$("#boxAdv15").addClass("passed");
$("#boxAdv15.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv15 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_201");
 
// forsearch-day 16
$("#boxAdv16").addClass("passed");
$("#boxAdv16.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv16 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Alles_f%C3%BCr_die_Gerechtigkeit");
 
// forsearch-day 17
$("#boxAdv17").addClass("passed");
$("#boxAdv17.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/3/3c/Adv-vk.png");
$("#boxAdv17 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 18
$("#boxAdv18").addClass("passed");
$("#boxAdv18 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 19
$("#boxAdv19").addClass("passed");
$("#boxAdv19.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv19 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 20
$("#boxAdv20").addClass("passed");
$("#boxAdv20.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/f/f6/Adv-k-psalm.png");
$("#boxAdv20 a").attr("href", "http://mum.wikia.com");
 
// forsearch-day 21
$("#boxAdv21").addClass("passed");
$("#boxAdv21.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv21 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Verh%C3%A4ngnisvolle_Folgen");
 
// forsearch-day 22
$("#boxAdv22").addClass("passed");
$("#boxAdv22.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/9/9e/Adv-reh.png");
$("#boxAdv22 a").attr("href", "http://mum.wikia.com/wiki/Geschichte:Reise_eines_Helden/Kapitel_202");
 
// forsearch-day 23
$("#boxAdv23").addClass("passed");
$("#boxAdv23.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv23 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Comic:AfW8/Eine_R%C3%BCckkehr,_die_f%C3%BCr_Wirbel_sorgt");
 
// forsearch-day 24
$("#boxAdv24").addClass("passed");
$("#boxAdv24.passed img[data-image-name='Adv-blank.png']").attr("src", "https://images.wikia.nocookie.net/test/de/images/6/6c/Adv-afw8.png");
$("#boxAdv24 a").attr("href", "http://de.fanfictions.wikia.com/wiki/Geschichte:Alarm_f%C3%BCr_Waddle_8/Ein_Fest_f%C3%BCr_die_Ewigkeit");
 
}
});
//
//
//


                        },1000);
                        refreshAdvent++;
                        });
//</script>