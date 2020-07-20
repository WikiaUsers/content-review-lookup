/* 此乃控制怪物頁面之"連鎖技能"1,2,3之閃動效果 */
var eTimeout1;
var eTimeout2;
var eTimeout3;
$(function boxSwitch(){
    clearTimeout(eTimeout1);
    eTimeout1=setTimeout(function(){
        $("#currentEvents .block1").fadeIn();
        $("#currentEvents .block2").hide();
        $("#currentEvents .block3").hide();
        clearTimeout(eTimeout2);    
        eTimeout2=setTimeout(function(){
            $("#currentEvents .block1").hide();
            $("#currentEvents .block2").fadeIn();
            $("#currentEvents .block3").hide();
            clearTimeout(eTimeout3);    
            eTimeout3=setTimeout(function(){
                $("#currentEvents .block1").hide();
                $("#currentEvents .block2").hide();
                $("#currentEvents .block3").fadeIn();
                boxSwitch();
            }, 1500);
        }, 1500);
    }, 1500);
});