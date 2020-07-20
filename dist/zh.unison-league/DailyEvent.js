/* JS控制的每天活動時間表 template:Slider */
$(function JSTimeTable(){
    var t = new Date();
    var Day = t.getDay();
    var date = t.getDate();
    var month = t.getMonth()+1;
    $(".Today").text(month+"月"+date+"日");
    switch (Day) {
        /*星期日*/
        case 0:
            $(".test").text(t);
            $(".EggsKeys1").text("13:00~14:59");
            $(".EggsKeys2").text("21:00~22:59");
            $(".EggsKeys3").text("00:00~01:59");
            $(".EggsPassa1").text("11:00~12:59");
            $(".EggsPassa2").text("19:00~20:59");
            $(".EggsPassa3").text("待更新");
            $(".KeysPassa1").text("09:00~10:59");
            $(".KeysPassa2").text("17:00~18:59");
            $(".KeysPassa3").text("待更新");
            $(".Passa1").text("07:00~08:59");
            $(".Passa2").text("15:00~16:59");
            $(".Passa3").text("23:00~23:59");
            $(".Augment1").text("09:00~10:59");
            $(".Augment2").text("15:00~16:59");
            $(".Augment3").text("21:30~21:59");
            $(".Augment4").text("22:30~23:59");
            $(".Augment5").text("00:00~01:59");
            break;
        /*星期一&五*/
        case 1:
        case 5:
            $(".test").text(t);
            $(".EggsKeys1").text("13:00~14:59");$(".EggsKeys2").text("21:00~22:59");$(".EggsKeys3").text("待更新");
            $(".EggsPassa1").text("11:00~12:59");$(".EggsPassa2").text("19:00~20:59");$(".EggsPassa3").text("待更新");
            $(".KeysPassa1").text("09:00~10:59");$(".KeysPassa2").text("17:00~18:59");$(".KeysPassa3").text("00:00~01:59");
            $(".Passa1").text("07:00~08:59");$(".Passa2").text("15:00~16:59");$(".Passa3").text("23:00~23:59");
            $(".Augment1").text("12:30~12:59");
            $(".Augment2").text("13:30~14:59");
            $(".Augment3").text("18:30~18:59");
            $(".Augment4").text("19:30~20:59");
            $(".Augment5").text("待更新");
            break;
        /*星期二*/
        case 2:
        case 6:
            $(".test").text(t);
            $(".EggsKeys1").text("09:00~10:59");$(".EggsKeys2").text("17:00~18:59");$(".EggsKeys3").text("00:00~01:59");
            $(".EggsPassa1").text("07:00~08:59");$(".EggsPassa2").text("15:00~16:59");$(".EggsPassa3").text("23:00~23:59");
            $(".KeysPassa1").text("13:00~14:59");$(".KeysPassa2").text("21:00~22:59");$(".KeysPassa3").text("待更新");
            $(".Passa1").text("11:00~12:59");$(".Passa2").text("19:00~20:59");$(".Passa3").text("待更新");
            $(".Augment1").text("07:00~08:59");
            $(".Augment2").text("12:30~12:59");
            $(".Augment3").text("13:30~14:59");
            $(".Augment4").text("18:30~18:59");
            $(".Augment5").text("19:30~20:59");
            break;
        /*星期三*/
        case 3:
            $(".test").text(t);
            $(".EggsKeys1").text("13:00~14:59");
            $(".EggsKeys2").text("21:00~22:59");
            $(".EggsKeys3").text("待更新");
            $(".EggsPassa1").text("11:00~12:59");
            $(".EggsPassa2").text("19:00~20:59");
            $(".EggsPassa3").text("待更新");
            $(".KeysPassa1").text("09:00~10:59");
            $(".KeysPassa2").text("17:00~18:59");
            $(".KeysPassa3").text("00:00~01:59");
            $(".Passa1").text("07:00~08:59");
            $(".Passa2").text("15:00~16:59");
            $(".Passa3").text("23:00~23:59");
            $(".Augment1").text("09:00~10:59");
            $(".Augment2").text("15:00~16:59");
            $(".Augment3").text("21:30~21:59");
            $(".Augment4").text("22:30~23:59");
            $(".Augment5").text("待更新");
            break;
        /*星期四*/
        case 4:
            $(".test").text(t);
            $(".EggsKeys1").text("09:00~10:59");
            $(".EggsKeys2").text("17:00~18:59");
            $(".EggsKeys3").text("00:00~01:59");
            $(".EggsPassa1").text("07:00~08:59");
            $(".EggsPassa2").text("15:00~16:59");
            $(".EggsPassa3").text("23:00~23:59");
            $(".KeysPassa1").text("13:00~14:59");
            $(".KeysPassa2").text("21:00~22:59");
            $(".KeysPassa3").text("待更新");
            $(".Passa1").text("11:00~12:59");
            $(".Passa2").text("19:00~20:59");
            $(".Passa3").text("待更新");
            $(".Augment1").text("11:00~11:59");
            $(".Augment2").text("17:00~17:59");
            $(".Augment3").text("21:30~21:59");
            $(".Augment4").text("22:30~23:59");
            $(".Augment5").text("00:00~01:59");
            break;
        }
});