/* 此乃控制怪物頁面之"連鎖技能"1,2之閃動效果 */
var eTimeout1;
var eTimeout2;
var eTimeout3;
$(function boxSwitch(){
    clearTimeout(eTimeout1);
    eTimeout1=setTimeout(function(){
        $("#currentEvents .twoblock1").fadeIn();
        $("#currentEvents .twoblock2").hide();
    }, 1500);
    clearTimeout(eTimeout2);    
    eTimeout2=setTimeout(function(){
        $("#currentEvents .twoblock1").hide();
        $("#currentEvents .twoblock2").fadeIn();
    }, 1500);
    boxSwitch();
});