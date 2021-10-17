var footerId = document.getElementsByTagName("footer")[0];
var scrollTopId = document.createElement("span");
scrollTopId.setAttribute("id","scroll-top");
scrollTopId.setAttribute("title","Wróć na górę");
footerId.appendChild(scrollTopId);
 
function scrollTop(){
    $(window).scroll(function(e) {
    if($(window).scrollTop()>0)
    $("#scroll-top").fadeIn(300);
    else
    $("#scroll-top").fadeOut(300);
    });
};
$(function(){
    $("#scroll-top").click(function(e) {
        $('body,html').animate({scrollTop:0},300);
    });
    scrollTop();
})