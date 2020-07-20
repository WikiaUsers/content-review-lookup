$(function toggle1() {
   $("#txt1").click((function(){
   $("#img1").css("display", "");
   $("#img2").css("display", "none");
   $("#img3").css("display", "none");
   $("#img4").css("display", "none");
}))});
$(function toggle2(){
   $("#txt2").click((function(){
   $("#img1").css("display", "none");
   $("#img2").css("display", "");
   $("#img3").css("display", "none");
   $("#img4").css("display", "none");
}))});
$(function toggle3(){
   $("#txt3").click((function(){
   $("#img1").css("display", "none");
   $("#img2").css("display", "none");
   $("#img3").css("display", "");
   $("#img4").css("display", "none");
}))});
$(function toggle4(){
   $("#txt4").click((function(){
   $("#img1").css("display", "none");
   $("#img2").css("display", "none");
   $("#img3").css("display", "none");
   $("#img4").css("display", "");
}))});