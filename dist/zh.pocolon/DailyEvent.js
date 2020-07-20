/* 此乃用以控制 "波波龍時間表" 的每日分組活動 */
$(function strengthenTime(){
    var timestmp = (Math.ceil((new Date().getTime())/(86400000)+0.333))%5;
    var today = new Date();
    var tomorrow = new Date();
    var Month = today.getMonth()+1;
    var date = today.getDate();
    tomorrow.setTime(today.getTime()+86400000);
    $(".date").text(Month+"/"+date);
    Month = tomorrow.getMonth()+1;
    date = tomorrow.getDate();
    $(".dateNext").text(Month+"/"+date);
    
    switch(timestmp) {
        case 0:
            $(".groupADaytime").text("11:00");$(".groupBDaytime").text("12:00");$(".groupCDaytime").text("13:00");$(".groupDDaytime").text("09:00");$(".groupEDaytime").text("10:00");
            $(".groupANighttime").text("20:00");$(".groupBNighttime").text("21:00");$(".groupCNighttime").text("22:00");$(".groupDNighttime").text("18:00");$(".groupENighttime").text("19:00");
            $(".groupADaytimeNext").text("10:00");$(".groupBDaytimeNext").text("11:00");$(".groupCDaytimeNext").text("12:00");$(".groupDDaytimeNext").text("13:00");$(".groupEDaytimeNext").text("09:00");
            $(".groupANighttimeNext").text("19:00");$(".groupBNighttimeNext").text("20:00");$(".groupCNighttimeNext").text("21:00");$(".groupDNighttimeNext").text("22:00");$(".groupENighttimeNext").text("18:00");
            break;
        case 1:
            $(".groupADaytime").text("10:00");$(".groupBDaytime").text("11:00");$(".groupCDaytime").text("12:00");$(".groupDDaytime").text("13:00");$(".groupEDaytime").text("09:00");
            $(".groupANighttime").text("19:00");$(".groupBNighttime").text("20:00");$(".groupCNighttime").text("21:00");$(".groupDNighttime").text("22:00");$(".groupENighttime").text("18:00");
            $(".groupADaytimeNext").text("09:00");$(".groupBDaytimeNext").text("10:00");$(".groupCDaytimeNext").text("11:00");$(".groupDDaytimeNext").text("12:00");$(".groupEDaytimeNext").text("13:00");
            $(".groupANighttimeNext").text("18:00");$(".groupBNighttimeNext").text("19:00");$(".groupCNighttimeNext").text("20:00");$(".groupDNighttimeNext").text("21:00");$(".groupENighttimeNext").text("22:00");
            break;
        case 2:
            $(".groupADaytime").text("09:00");$(".groupBDaytime").text("10:00");$(".groupCDaytime").text("11:00");$(".groupDDaytime").text("12:00");$(".groupEDaytime").text("13:00");
            $(".groupANighttime").text("18:00");$(".groupBNighttime").text("19:00");$(".groupCNighttime").text("20:00");$(".groupDNighttime").text("21:00");$(".groupENighttime").text("22:00");
            $(".groupADaytimeNext").text("13:00");$(".groupBDaytimeNext").text("09:00");$(".groupCDaytimeNext").text("10:00");$(".groupDDaytimeNext").text("11:00");$(".groupEDaytimeNext").text("12:00");
            $(".groupANighttimeNext").text("22:00");$(".groupBNighttimeNext").text("18:00");$(".groupCNighttimeNext").text("19:00");$(".groupDNighttimeNext").text("20:00");$(".groupENighttimeNext").text("21:00");
            break;
        case 3:
            $(".groupADaytime").text("13:00");$(".groupBDaytime").text("09:00");$(".groupCDaytime").text("10:00");$(".groupDDaytime").text("11:00");$(".groupEDaytime").text("12:00");
            $(".groupANighttime").text("22:00");$(".groupBNighttime").text("18:00");$(".groupCNighttime").text("19:00");$(".groupDNighttime").text("20:00");$(".groupENighttime").text("21:00");
            $(".groupADaytimeNext").text("12:00");$(".groupBDaytimeNext").text("13:00");$(".groupCDaytimeNext").text("09:00");$(".groupDDaytimeNext").text("10:00");$(".groupEDaytimeNext").text("11:00");
            $(".groupANighttimeNext").text("21:00");$(".groupBNighttimeNext").text("22:00");$(".groupCNighttimeNext").text("18:00");$(".groupDNighttimeNext").text("19:00");$(".groupENighttimeNext").text("20:00");
            break;
        case 4:
            $(".groupADaytime").text("12:00");$(".groupBDaytime").text("13:00");$(".groupCDaytime").text("09:00");$(".groupDDaytime").text("10:00");$(".groupEDaytime").text("11:00");
            $(".groupANighttime").text("21:00");$(".groupBNighttime").text("22:00");$(".groupCNighttime").text("18:00");$(".groupDNighttime").text("19:00");$(".groupENighttime").text("20:00");
            $(".groupADaytimeNext").text("11:00");$(".groupBDaytimeNext").text("12:00");$(".groupCDaytimeNext").text("13:00");$(".groupDDaytimeNext").text("09:00");$(".groupEDaytimeNext").text("10:00");
            $(".groupANighttimeNext").text("20:00");$(".groupBNighttimeNext").text("21:00");$(".groupCNighttimeNext").text("22:00");$(".groupDNighttimeNext").text("18:00");$(".groupENighttimeNext").text("19:00");
            break;
    }   
});